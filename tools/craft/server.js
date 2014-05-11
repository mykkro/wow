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

var express = require('express')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var API = require("./output/lib/api/API")
var REST = require("./output/lib/api/REST")
var Storage = require("./output/lib/Storage")
var Uploader = require("./output/lib/Uploader")
var uploader = new Uploader()
var Downloader = require("./output/lib/Downloader")


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
  "mpeg": 1
}

var allowedFilesize = 10000000

var downloader = new Downloader({allowedExtensions:allowedFiletypes, maxFilesize:allowedFilesize})

app.configure(function(){
	app.use(express.json());
	app.use(express.urlencoded());   
	app.use(express.limit(allowedFilesize));
	app.use(express.multipart());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use( app.router );
	app.use('/js', express.static(__dirname + '/js'));
	app.use('/css', express.static(__dirname + '/css'));
	app.use(express.static(__dirname + '/output/public'));
	app.use(express.static(__dirname + '/../../public'));
	app.use('/uploads',express.static(Storage.uploadDir));

	REST(app, API)
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
    console.log("Uploading "+fileInfo.name+" as "+fileInfo.path+", extension: "+ext+" size: "+size+" uuid: "+uuid)    
    uploader.copy({
        path: fileInfo.path, 
        originalFilename: fileInfo.name, 
        type: fileInfo.type,
        moveFile: true, 
        ownerAdminId: -1,
        uuid: uuid
      },
      function(err, file) {
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
