// TODO not working...

'use strict';

var express = require('express');

var app = express()


app.configure(function() {
  app.set("view options", {layout: false});
  //app.use(express.bodyParser());
  app.use(express.bodyParser({ 
    keepExtensions: true, 
    uploadDir: __dirname + "/public/files" 
  }))
  app.post('/fileupload', uploadFile, addFile)
 
  // file is automatically saved to /public/uploads, let's just set 
  function uploadFile(req, res, next) {
    if (req.files) {
      req.body.url = "http://myawesomesite.com/" + req.files.file.path.split("/").slice(-2).join("/")
      req.body.path = req.files.file.path.split("/").slice(-2).join("/")
    }
    next()
  }
   
  // file upload is optional, it could have come before
  function addFile(req, res) {
    var eventId = req.param("eventId")
    var e = req.body
    var userId = e.userId ? new ObjectId(e.userId) : undefined
    var photo = {
        userId        : userId
      , eventId       : new ObjectId(e.eventId)
      , latitude      : e.latitude
      , longitude     : e.longitude
      , path          : e.path
      , url           : e.url
      , type          : e.type
      , title         : e.title
      , description   : e.description
    }
    
    //photo.save(function(err) {
      //if (err) return res.send(err.message, 500)
      res.json(photo)
    //})
  }  

  app.use("/js", express.static("./js"))
  app.use("/public", express.static("./public"))
  app.use("/uploads", express.static("./public/files"))
  app.get('/', function(req, res) {
    res.sendfile('index-simple.html');
  });  
  app.listen(9999)
})



