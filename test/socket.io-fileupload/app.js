// Require the libraries:
var SocketIOFileUploadServer = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');

// Make your Express server:
var app = express()
    .use(SocketIOFileUploadServer.router)
    .use(express.static(__dirname + "/public"))
    .listen(8888);

// Start up Socket.IO:
var io = socketio.listen(app);
io.sockets.on("connection", function(socket){

    // Make an instance of SocketIOFileUploadServer and listen on this socket:
    var uploader = new SocketIOFileUploadServer();
    uploader.dir =__dirname + "/uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});