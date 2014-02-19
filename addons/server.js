var express = require('express');
var path = require("path")
var http = require('http');
var fs = require("fs-extra")


var TestServer = {
	port: 9999,
	start: function(afterInit) {
		var self = this
		var app = express()

    app.configure(function(){

      app.use(express.favicon());
      app.use(express.cookieParser());
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use( app.router );
      app.use(express.static(path.join(__dirname, "/games")))
    });

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });
     
    app.configure('production', function(){
      app.use(express.errorHandler()); 
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

TestServer.start()
