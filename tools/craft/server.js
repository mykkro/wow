/* wow server */

var path = require("path")
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")
var mv = require('mv')
var uuid = require('node-uuid');
var cfg = require("./craft.json")
var merge = require("merge")
var io = require('socket.io')
var _ = require("lodash")

var express = require('express')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var mustacheExpress = require('mustache-express');

var API = require("./output/lib/api/API")
var REST = require("./output/lib/api/REST")
var Storage = require("./output/lib/Storage")
var Uploader = require("./output/lib/Uploader")
var uploader = new Uploader()
var Importer = require("./output/lib/Importer")
var importer = new Importer()
var Downloader = require("./output/lib/Downloader")

var SessionStore = require("sessionstore")

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

var Auth = {
  isAuthenticated: function (req, res, next) {
    console.log("Auth: isAuthenticated: "+req.isAuthenticated())
      if(req.isAuthenticated()){
          next();
      }else{
          res.redirect("/login");
      }
  },
  userExist: function(req, res, next) {
      //User.count({
        //  email: req.body.email
      //}, function (err, count) {
        //  if (count === 0) {
              next();
          //} else {
            //  res.redirect("/signup");
          //}
      //});
  }
}


// see: http://danialk.github.io/blog/2013/02/23/authentication-using-passportjs/
// https://github.com/DanialK/PassportJS-Authentication
var UsersAPI = API.user
var bcrypt = require("bcrypt-nodejs")


passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },  
  function(username, password, done) {
    UsersAPI.findOne({ username : username }, function(err, user) {
        if(err) { return done(err); }
        if(!user){
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.usesPassword && !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);        
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});


passport.deserializeUser(function(id, done) {
    UsersAPI.get(id, function(err,user) {
      if(err) done(err);
      done(null,user);
    })
});


function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var allowedFiletypes = {
  "jpg":1, 
  "png":1, 
  "gif":1, 
  "svg": 1,
  "jpeg":1, 
  "avi":1, 
  "mp4":1, 
  "ogv": 1, 
  "webm":1, 
  "3gp":1, 
  "mov": 1, 
  "flv": 1,
  "mpg": 1,
  "mpeg": 1,
  "wav": 1,
  "ogg": 1,
  "mp3": 1,
  "zip": 1,
  "pdf": 1,
  "m4v": 1
}

var allowedFilesize = 10000000

var downloader = new Downloader({allowedExtensions:allowedFiletypes, maxFilesize:allowedFilesize})

app.configure(function(){
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/../../views/mustache');
	app.use(express.json());
	app.use(express.urlencoded());   
	app.use(express.limit(allowedFilesize));
	app.use(express.multipart());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
      secret: 'keyboard cat'
  }))
  app.use(passport.initialize());
  app.use(passport.session());
	app.use( app.router );
	app.use('/js', express.static(__dirname + '/js'));
	app.use('/css', express.static(__dirname + '/css'));
	app.use(express.static(__dirname + '/output/public'));
	app.use(express.static(__dirname + '/../../public'));
	app.use('/uploads',express.static(Storage.uploadDir));
  app.use("/imports", express.static(Storage.importDir))

	REST(app, API, uploader, importer)
});

var sendError = function(res, msg, details) {
    res.send({
      error: msg,
      details: details
    })
}

/**
 * Transforms path and thumbnailPath fields to uri and thumbnailUri
 * @param {object} File descriptor
 * @return {object} File descriptor with fields uri, thumbnailUri
 */
var withLinks = function(file) {
    var links = { 
      uri: '/uploads/'+path.relative(Storage.uploadDir, file.path),
      thumbnailUri: file.thumbnailPath ? '/uploads/' + path.relative(Storage.uploadDir, file.thumbnailPath) : null
    }
    var out = merge(links, file)
    delete out.path
    delete out.thumbnailPath
    return out
}

/**
 * Fills out password if left blank (necessary for passwordless accounts).
 */
var passwordFillerMiddleware = function(req, res, next) {
    if(!req.body.password) req.body.password = 'x'
    next();
}

app.get("/", Auth.isAuthenticated, function(req, res){ 
    res.sendfile(__dirname+'/output/public/index.html');
});

app.get("/userlogin", function(req, res) {
  UsersAPI.find({}, function(err, users) {
    if(err) {
       res.status(500);
       res.send(err.message);
    } else {
      _.each(users, function(u) {
        u.avatarUri = UsersAPI.getThumbnailUri(u) || UsersAPI.getTypeThumbnailUri()
      })
      console.log(users)      
      res.render('userlogin', {users: users})
    }
  })
})

app.get("/profile", Auth.isAuthenticated , function(req, res){ 
    res.send("profile: " + JSON.stringify(req.user));
});

app.get('/login', function(req, res) {
  res.redirect('/userlogin')
});

app.post('/login',
  passwordFillerMiddleware,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/loginFailure'
  })
);
 
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

app.get('/upload/:uuid/thumb', function(req, res) {
  var uuid = req.params.uuid
  uploader.get(uuid, function(err, resp) {
    if(err) {
      sendError(res, err)
    } else {
      var thumbnailUri = '/uploads/' + path.relative(Storage.uploadDir, resp.thumbnailPath)
      res.writeHead(302, {location: thumbnailUri });
      res.end();      
    }
  })
})

app.get('/upload/:uuid', function(req, res) {
  var uuid = req.params.uuid
  uploader.get(uuid, function(err, resp) {
    if(err) {
      sendError(res, err)
    } else if(!resp) {
      sendError(res, "File not found")
    } else {      
      res.send(withLinks(resp))
    }
  })
})


app.delete('/upload/:uuid', function(req, res) {
  var uuid = req.params.uuid
  uploader.remove(uuid, function(err, resp) {
    if(err) {
      sendError(res, err)
    } else {
      console.log("File deleted!", resp)
      res.send({"deleted":uuid})
    }
  })
})

// Downloads file from URL and uploads it to local storage.
// Test it:
// curl -X POST  -H "Accept: application/json" -H "Content-Type: application/json" -d '{"url":"http://th00.deviantart.net/fs71/PRE/f/2013/191/3/b/mtg__urabrask_the_hidden_by_cryptcrawler-d39big4.jpg"}' http://localhost:9999/download
app.post('/download', function(req, res) {
  console.log(req.body)
  var src = req.body.url
  var uuid = req.body.uuid
  downloader.download(src, function(err, fileInfo) {
    if(err) {
      sendError(res, err)
      return
    }
    uploadFile(fileInfo, uuid, res)
  })
})


// Test it:
// curl -F "file=@./media/golf_ball.png" localhost:9999/upload
app.post('/upload', function(req, res) {
    var fileInfo = req.files.file
    var uuid = req.body.uuid
    uploadFile(fileInfo, uuid, res)
})

var uploadFile = function(fileInfo, uuid, res) {
    var ext = getExtension(fileInfo.path).toLowerCase()
    var size = fileInfo.size
    if(size > allowedFilesize) {
      sendError(res, "File too big: "+size+", allowed: "+allowedFilesize)
      return
    }
    if(!(ext in allowedFiletypes)) {
      sendError(res, "Unsupported file type: "+ext)
      return
    }
    // do upload...      
    console.log("server.uploadFile: Uploading "+fileInfo.name+" as "+fileInfo.path+", extension: "+ext+" size: "+size+" uuid: "+uuid)    
    uploader.copy({
        path: fileInfo.path, 
        originalFilename: fileInfo.name, 
        type: fileInfo.type,
        moveFile: true, 
        ownerAdminId: -1,
        uuid: uuid
      },
      function(err, file) {
        // console.log("server.uploadFile ended")
        if(err) {
		      console.error(err)
          sendError(res, err)
          return;
        }
        res.send(withLinks({
          uuid: file.uuid,
          path: file.path,
          thumbnailPath: file.thumbnailPath,
          size: file.size,
          type: file.type,
          name: path.basename(file.path),
          originalFilename: fileInfo.originalFilename
        }));
      }
    );

}

// demo code for socket.io
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

Storage.init(function() {
  var port = cfg.options.testserver.port
  server.listen(port, function() {
    console.log('Listening on port '+port);
  });
})
