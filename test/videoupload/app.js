
var http = require('http')
var path = require('path')
  , fs = require('fs')
  , exec = require('child_process').exec
  , util = require('util')

var express = require('express')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var sanitize = require("sanitize-filename")

app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/upload', express.static(path.join(__dirname, 'upload'))); 

server.listen(9999);
 
 // convert video by ffmpeg...
var spawn = require("./spawn")

var files = {};

io.sockets.on('connection', function (socket) {
  socket.on('start', function (data) { 
    // data contains the variables that we passed through in the html file
    console.log("socket.start", data)
        var name = data.name;
        var filename = name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        var file = {  //Create a new Entry in The files Variable
            fileSize : data.size,
            data     : "",
            downloaded : 0,
            filename: filename
        }
        files[name] = file
        var place = 0;
        try{
            var stat = fs.statSync('temp/' +  filename);
            if(stat.isFile())
            {
                file.downloaded = stat.size;
                place = stat.size / 524288;
            }
        }
        catch(er){} //It's a New File
        fs.open("temp/" + filename, "a", 0755, function(err, fd){
            if(err)
            {
                console.log(err);
            }
            else
            {
                file.handler = fd; //We store the file handler so we can write to it later
                socket.emit('moreData', { 'place' : place, percent : 0 });
            }
        });
  });

  socket.on('upload', function (data){
        var name = data.name;
        var file = files[name]
        var filename = file.filename
        file.downloaded += data.data.length;
        file.data += data.data;
        if(file.downloaded == file.fileSize) //If File is Fully Uploaded
        {
            fs.write(file.handler, file.data, null, 'Binary', function(err, Writen){
                //Get Thumbnail Here
              var inp = fs.createReadStream("temp/" + filename);
              var out = fs.createWriteStream("upload/" + filename);


              inp.on('end', function() {
                out.end(function() {
                    //This Deletes The Temporary File
                    fs.unlink("temp/" + filename, function () { 
                        //Moving File Completed
                        //Let's create thumbnail!
                        exec("ffmpeg -i upload/" + filename  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg upload/" + filename  + ".jpg", function(err){
                            socket.emit('done', {'image' : 'upload/' + filename + '.jpg'});
                            // convert it!
                            spawn({
                                "file": "upload/"+filename,
                                "outfile": "upload/"+filename+".webm", 
                                started: function(data) {
                                    socket.emit("conversionStarts", data)
                                },
                                finished: function(data) {
                                    socket.emit("conversionFinished", data)
                                },
                                progress: function(data) {
                                    socket.emit("conversionProgress", data)
                                },
                                error: function(msg, data) {
                                    socket.emit("conversionError", {msg:msg, data:data})
                                }
                            })

                        });                                              
                    });
                });
              });

              inp.pipe(out, {end: false}); 
            });
        }
        else if(file.data.length > 10485760){ //If the data Buffer reaches 10MB
            fs.write(file.handler, file.data, null, 'Binary', function(err, Writen){
                files[name].data = ""; //Reset The Buffer
                var place = file.downloaded / 524288;
                var percent = (file.downloaded / file.fileSize) * 100;
                socket.emit('moreData', { 'place' : place, 'percent' :  percent});
            });
        }
        else
        {
            var place = file.downloaded / 524288;
            var percent = (file.downloaded / file.fileSize) * 100;
            socket.emit('moreData', { 'place' : place, 'percent' :  percent});
        }
    });
});


