/* wow server */

var express = require('express');
var routescan = require('express-routescan');	
var path = require("path")
var storage = require("./lib/storage")
var rpcMethods = require('./lib/rpc/methods');

var WowServer = {
	port: 9999,
	start: function() {
		var app = express()
		var currentDir = process.cwd() // __dirname does not work in node-webkit


        app.configure(function(){
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use( app.router );
    		routescan(app) // this must be AFTER bodyparser/etc. to make RPC work
	        app.use("/imports", express.static(storage.importDir))
	        app.use(express.static(currentDir + '/public'));
        });

        app.configure('development', function(){
          app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        });
         
        app.configure('production', function(){
          app.use(express.errorHandler()); 
        });

        app.post('/rpc', function(req, res) {
          res.header('Content-Type', 'application/json');
          var data = req.body, err = null, rpcMethod;
          if (!err && data.jsonrpc !== '2.0') {
            onError({
              code: -32600,
              message: 'Bad Request. JSON RPC version is invalid or missing',
              data: null
            }, 400);
            return;
          }
         
          if (!err && !(rpcMethod = rpcMethods[data.method])) {
            onError({
              code: -32601,
              message: 'Method not found : ' + data.method
            }, 404);
            return;
          }
         
          try {
            rpcMethod(data.params, {
              onSuccess: function(result) {
                res.send(JSON.stringify({
                  jsonrpc: '2.0',
                  result: result,
                  error : null,
                  id: data.id
                }), 200);
              },
              onFailure: function(error) {
                onError({
                  code: -32603,
                  message: 'Failed',
                  data: error
                }, 500);
              }
            });
          } catch (e) {
            onError({
              code: -32603,
              message: 'Excaption at method call',
              data: e
            }, 500);
          }
          return;
         
          function onError(err, statusCode) {
            res.send(JSON.stringify({
              jsonrpc: '2.0',
              error: err,
              id: data.id
            }), statusCode);
          }
        });

		app.listen(this.port);
		console.log('Listening on port '+this.port);
	}

}

module.exports = WowServer
