/* wow server */

var express = require('express');
var routescan = require('express-routescan');	
var path = require("path")
var storage = require("./lib/storage")

var WowServer = {
	port: 9999,
	start: function() {
		var app = express();
		var currentDir = process.cwd() // __dirname does not work in node-webkit

		routescan(app)
		app.use("/imports", express.static(storage.importDir))
		app.use(express.static(currentDir + '/public'));

		app.listen(this.port);
		console.log('Listening on port '+this.port);
	}

}

module.exports = WowServer