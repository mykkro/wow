'use strict';

var path = require("path")
var http = require('http');
var express = require('express')
var app = express()
var server = http.createServer(app)


var i18next = require('i18next');
i18next.init({ 
	lng: 'de',
	ns: { 
    	namespaces: ['core', 'admin'], 
    	defaultNs: 'core'
  	} 
}, function(__) {
		var x = __("app.district")
		var y = __("admin:welcome")
		console.log("Translation obtained: ", x, y)
});

app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/locales', express.static(path.join(__dirname, 'locales')));

var port = 9999
server.listen(port, function() {
  console.log('Listening on port '+port);
});
  
