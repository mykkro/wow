/* wow server */

var express = require('express');
var path = require("path")
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")

var cfg = require("./craft.json")

var app = express()

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use( app.router );
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/../../public'));
});

var port = cfg.options.testserver.port
app.listen(port, function() {
	console.log('Listening on port '+port);
});
