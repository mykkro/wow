/* wow server */

var express = require('express');
var routescan = require('express-routescan');	
var path = require("path")
var storage = require("./lib/storage")
var rpcMethods = require('./lib/rpc/methods');
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")
var unzip = require("unzip")
var temp = require("temp")

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var Auth = require('./lib/middlewares/authorization.js');
var Imports = require("./lib/dao/imports")
var 
  Hashids = require('hashids'),
  hashids = new Hashids('this is my salt', 8);
    
    // ensure that some directories exist...
    storage.init()

// use this: https://npmjs.org/package/express-restify-mongoose

var adminId = "123"

var WowServer = {
	port: 9999,
  chrome: null,
	start: function(afterInit) {
		var self = this
		var app = express()
		var currentDir = process.cwd() // __dirname does not work in node-webkit

        // see: http://danialk.github.io/blog/2013/02/23/authentication-using-passportjs/
        // https://github.com/DanialK/PassportJS-Authentication
        passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        },function(username, password,done) {
          done(null, {name:username, id:1})
          /*
            Users.findOne({ username : username},function(err,user){
                if(err) { return done(err); }
                if(!user){
                    return done(null, false, { message: 'Incorrect username.' });
                }

                hash( password, user.salt, function (err, hash) {
                    if (err) { return done(err); }
                    if (hash == user.hash) return done(null, user);
                    done(null, false, { message: 'Incorrect password.' });
                });
            });
        */
        }));
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });


        passport.deserializeUser(function(id, done) {
          done(null, { id:id, name:"Dummy User #"+id })
          /*
            FbUsers.findById(id,function(err,user){
                if(err) done(err);
                if(user){
                    done(null,user);
                }else{
                    Users.findById(id, function(err,user){
                        if(err) done(err);
                        done(null,user);
                    });
                }
            });
        */
        });
        app.configure(function(){

          app.set('views', __dirname+'/views/jade');

          // Set our default template engine to "jade"
          // which prevents the need for extensions
          // (although you can still mix and match)
          app.set('view engine', 'jade');

          app.use(express.favicon());
          app.use(express.cookieParser());
          app.use(express.bodyParser());
          app.use(express.session({ secret: 'SECRET' }));
          app.use(passport.initialize());
          app.use(passport.session());
          app.use(express.methodOverride());
          app.use( app.router );
    		  routescan(app) // this must be AFTER bodyparser/etc. to make RPC work
	        app.use("/imports", express.static(storage.importDir))
          app.use("/locales", express.static(currentDir+"/locales"))
          app.use("/userdata", express.static(currentDir+"/userdata"))
	        app.use(express.static(currentDir + '/public'));

          // this will make public resources of individual pages accessible
          var dirs = fs.readdirSync(currentDir + "/pages")
          dirs.forEach(function(dir) {
            app.use("/pages/"+dir, express.static(currentDir+"/pages/"+dir+"/public"))
          })
        });

        app.configure('development', function(){
          app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        });
         
        app.configure('production', function(){
          app.use(express.errorHandler()); 
        });

        app.get('/pages/:name', function(req, res) {
          var name = req.params.name
          var page = fs.readFileSync("templates/master.html", "utf8")
          var defs = fs.readFileSync("public/assets/misc/defs", "utf8")
          if(fs.existsSync("pages/"+name+"/index.wow")) {
            // page is internal SVG content
            var view = fs.readFileSync("pages/"+name+"/index.wow", "utf8")
            var master = fs.readFileSync("templates/page.svg", "utf8")
            var viewSVG = mustache.to_html(master, {defs:defs, content:view})
            var viewHtml = mustache.to_html(viewSVG, {query:req.query})
            var html = mustache.to_html(page, {query:req.query, "name":name, "content":viewHtml}); 
          } else {
            // page is already a wrapped html page
            var view = fs.readFileSync("pages/"+name+"/index.html", "utf8")
            var viewSVG = mustache.to_html(view, {defs:defs, query:req.query})
            var viewHtml = viewSVG
            var html = mustache.to_html(page, {query:req.query, "name":name, "content":viewHtml});
          }
          res.send(html)
        })
/*
  app.get("/", function(req, res){ 
    if(req.isAuthenticated()){
      res.render("home", { user : req.user}); 
    }else{
      res.render("home", { user : null});
    }
  });
*/
  app.get("/login", function(req, res){ 
    res.render("login");
  });

  app.post("/login" 
    ,passport.authenticate('local',{
      successRedirect : "/",
      failureRedirect : "/login",
    })
  );

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

/*
  app.post("/signup", Auth.userExist, function (req, res, next) {
    User.signup(req.body.email, req.body.password, function(err, user){
      if(err) throw err;
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect("profile");
      });
    });
  });
*/
  app.get("/profile", Auth.isAuthenticated , function(req, res){ 
    res.render("profile", { user : req.user});
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });


        app.get('/admin', function(req, res) {
          var view = fs.readFileSync("templates/admin.html", "utf8")
          var viewData = {}

          var viewHtml = mustache.to_html(view, viewData)
          var page = fs.readFileSync("templates/master.html", "utf8")
          var data = {query:req.query, content:viewHtml}
          var html = mustache.to_html(page, data); 
          res.send(html)
        })


        /* example testing:
          curl -X POST -d '{"jsonrpc":"2.0", "method":"hello", "params":{"name":"abc"}}' -H "Content-Type: application/json" localhost:9999/rpc 
        */
        app.post('/rpc', function(req, res) {
          res.header('Content-Type', 'application/json');
          var data = req.body, err = null, rpcMethod;
          if (!err && data.jsonrpc !== '2.0') {
            onError({
              code: -32600,
              message: 'Bad Request. JSON RPC version is invalid or missing',
              data: null
            }, 400);
            return;
          }
         
          if (!err && !(rpcMethod = rpcMethods[data.method])) {
            onError({
              code: -32601,
              message: 'Method not found : ' + data.method
            }, 404);
            return;
          }
         
          try {
            rpcMethod(data.params, 
              function(error, result) {
                if(!error) {
                    res.send(JSON.stringify({
                      jsonrpc: '2.0',
                      result: result,
                      error : null,
                      id: data.id
                    }), 200)
                } else {
                    onError({
                      code: -32603,
                      message: 'Failed',
                      data: error
                    }, 500)            
                }
            });
          } catch (e) {
            onError({
              code: -32603,
              message: 'Exception at method call',
              data: e
            }, 500);
          }
          return;
         
          function onError(err, statusCode) {
            res.send(JSON.stringify({
              jsonrpc: '2.0',
              error: err,
              id: data.id
            }), statusCode);
          }
        });

  app.post("/shutdown", function(req, res) {
    // if started with browser, kill it...
    if(WowServer.chrome) WowServer.chrome.kill()
  })

    app.post('/imageupload', function(req, res) {
     
        var serverPath = 'userdata/' + req.files.userPhoto.name;
        var fs = require('fs-extra')
        fs.copy(
          req.files.userPhoto.path,
          serverPath,
          function(error) {
            if(error) {
              res.send({
                error: 'Ah crap! Something bad happened',
                data: error
              });
            } else {
              // TODO delete original file...
              res.send({
                url: '/'+serverPath
              });
            }
          }
        );
    });
	

function examineDirectory(dir, cb) {
  fs.readdir(dir, function(err, files) {
    if(err) cb(err)
    console.log(files)
    if(files.length==1 && fs.lstatSync(path.join(dir, files[0])).isDirectory()) {
      cb(null, {dirPath:path.join(dir, files[0])})
    } else {
      cb(null, {dirPath:dir})
    }
  })
}

app.post('/fileupload', function(req, res) {
    // file is in the temporary directory...
    var archivePath = req.files.archive.path
    // archive filename
    var archiveName = req.files.archive.name

    temp.mkdir('wowimport', function(err, dirPath) {
      console.log("Created temporary directory "+dirPath)
      // unpack archive...
      fs.createReadStream(archivePath)
        .pipe(unzip.Extract({ path: dirPath }))
        .on("close", function(err) {
          if(err) {
            console.log("Error while unpacking...")
             // TODO remove temporary directory
            // must set tracking for temp dir
            temp.cleanup()
            res.redirect("/uploaderror");
            res.end();
          } else {
            // unpacked OK!
            // let's find manifest if exists
            // or book.json
            console.log("App is unpacked and ready at "+dirPath)
            examineDirectory(dirPath, function(err, ddd) {
              if(!err) {
                // we look for wow.json or book.json
                console.log("Preparing to import...")
                var m = {
                  // title is archive name without extension...
                  title: archiveName.replace(/\.[^/.]+$/, "")
                } // empty manifest
                console.log("Manifest:", m)
                var data = m
                Imports.create(adminId, data, function(err, res2) {
                  if(!err) {
                    console.log("Data inserted! ID="+res2._id)
                    console.log(res2)
                    var newName = hashids.encrypt(res2._id.id)
                    console.log(newName)
                    var newPath = path.join(storage.importDir, newName)
                    fs.rename(ddd.dirPath, newPath, function(err) {
                      if(!err) {
                        res2.importName = newName
                        // update entry in database...
                        Imports.update(res2, function(err, res3) {
                          console.log("Import completed successfully.")
                          console.log(res2)    
                          /* signal that import finished OK */
                          res.redirect("/admin");
                          res.end();
                        })
                      } else {
                        res.redirect("/uploaderror");
                        res.end();
                      }
                    }); // fs.rename
                  } else {
                    res.redirect("/uploaderror");
                    res.end();
                  }
              })
           } else {
              res.redirect("/uploaderror");
              res.end();
            }
          })
        }

      })      
    });       
});


		this.server = app.listen(this.port, function() {
			console.log('Listening on port '+self.port);
			if(afterInit) afterInit(self)
		});

	},
  stop: function(cb) {
    this.server.close(cb)
  }

}

module.exports = WowServer
