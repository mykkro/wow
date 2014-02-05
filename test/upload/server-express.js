'use strict';

var express = require('express');
var upload = require('jquery-file-upload-middleware');

var app = express()

    // configure upload middleware
    upload.configure({
        uploadDir: __dirname + '/public/files',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });
    upload.on('end', function (fileInfo) {
        console.log("File uploaded!")
        console.log(fileInfo)
    });

app.configure(function() {
  app.set("view options", {layout: false});
  app.use('/fileupload', function(req, res, next) {
    upload.fileHandler()(req, res, next)
  });
  /* shows list of files in the upload directory */
  app.get('/filelist', function (req, res, next) {
      upload.fileManager().getFiles(function (files) {
          res.json(files);
      });
  });  

  // express bodyparser must be AFTER the fileupload middleware!
  // or, more exactly, fileupload must be BEFORE the other middlewares 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use("/js", express.static("./js"))
  app.use("/public", express.static("./public"))
  app.use("/uploads", express.static("./public/files"))
  app.get('/', function(req, res) {
    res.sendfile('index-express.html');
  });  
  app.listen(9999)
})



