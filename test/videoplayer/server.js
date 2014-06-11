'use strict';

var path = require("path")
var http = require('http');
var express = require('express')
var app = express()
var server = http.createServer(app)


app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'public')));

var port = 9999
server.listen(port, function() {
  console.log('Listening on port '+port);
});
  
