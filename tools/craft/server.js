/* wow server */

var express = require('express');
var path = require("path")
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")

var cfg = require("./craft.json")

var app = express()

var API = require("./output/lib/api/API")
var REST = require("./output/lib/api/REST")

app.configure(function(){
	app.use(express.json());
	app.use(express.urlencoded());   
	app.use(express.methodOverride());
  	app.use(express.cookieParser());
  	app.use( app.router );
  	app.use('/js', express.static(__dirname + '/js'));
  	app.use(express.static(__dirname + '/output/public'));
  	app.use(express.static(__dirname + '/../../public'));

  	REST(app, API)
});

var port = cfg.options.testserver.port
app.listen(port, function() {
	console.log('Listening on port '+port);
});
