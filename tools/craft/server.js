/* wow server */

var express = require('express');
var path = require("path")
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")
var mv = require('mv')
var uuid = require('node-uuid');
var cfg = require("./craft.json")

var app = express()

var API = require("./output/lib/api/API")
var REST = require("./output/lib/api/REST")
var Storage = require("./output/lib/Storage")
var Uploader = require("./output/lib/Uploader")

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var allowedFiletypes = {
  "jpg":1, "png":1, "gif":1
}

var allowedFilesize = 10000000


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


// Test it:
// curl -F "file=@./media/golf_ball.png" localhost:9999/upload
app.post('/upload', function(req, res) {
    var fileInfo = req.files.file
    var uuid = req.body.uuid
    var ext = getExtension(fileInfo.path).toLowerCase()
    var size = fileInfo.size
    if(size > allowedFilesize) {
      res.send({
        error: "File too big: "+size+", allowed: "+allowedFilesize
      })
      return
    }
    if(!(ext in allowedFiletypes)) {
      res.send({
        error: "Unsupported file type: "+ext
      })
      return
    }
    // do upload...      
    console.log("Uploading "+fileInfo.name+" as "+fileInfo.path+", extension: "+ext+" size: "+size+" uuid: "+uuid)    
    Uploader.copy({
        path: fileInfo.path, 
        originalFilename: 
        fileInfo.name, 
        moveFile: true, 
        ownerAdminId: -1,
        uuid: uuid
      },
      function(err, file) {
        if(err) {
          console.error(err)
          res.send({
            error: 'Ah crap! Something bad happened',
            details: err
          });
          return;
        }
        res.send({
          uuid: file.uuid,
          uri: '/uploads/'+path.relative(Storage.uploadDir, file.path),
          thumbnailUri: file.thumbnailPath ? '/uploads/' + path.relative(Storage.uploadDir, file.thumbnailPath) : null,
          size: file.size,
          type: file.type,
          name: path.basename(file.path),
          originalFilename: fileInfo.originalFilename
        });
      }
    );

});

Storage.init(function() {
  var port = cfg.options.testserver.port
  app.listen(port, function() {
    console.log('Listening on port '+port);
  });
})
