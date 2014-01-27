/* wow server */

var express = require('express');
//var jsonrpc = require('node-express-json-rpc2')
var routescan = require('express-routescan');	
var path = require("path")
var storage = require("./lib/storage")

var WowServer = {
	port: 9999,
	start: function() {
		var app = express()
		var currentDir = process.cwd() // __dirname does not work in node-webkit


        app.configure(function(){
            //app.use( express.jsonrpc() );
    		routescan(app)
	        app.use("/imports", express.static(storage.importDir))
	        app.use(express.static(currentDir + '/public'));
            app.use( app.router );
        });
/*
        app.post('/rpc', function(req, res, next){
            // notification (no response expected)
            res.rpc('notification_method', function (params) {
                // do processing here
            });

            // non-notification (response expected)
            res.rpc('method_name', function(params, respond){
                // do processing here

                // if everything is OK return result object:
                respond({ result: 666 });

                // if something is wrong, return an error code:
                respond(jsonrpc.INVALID_PARAMS)
                // OR an extended error object:
                respond({
                    error: {
                        code: jsonrpc.INVALID_PARAMS,
                        message: 'You gave me invalid parameters!',
                        data: []
                    }
                });
            });
        });
*/
		app.listen(this.port);
		console.log('Listening on port '+this.port);
	}

}

module.exports = WowServer
