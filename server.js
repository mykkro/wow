/* wow server */

var express = require('express');
var routescan = require('express-routescan');	
var path = require("path")
var storage = require("./lib/storage")
var rpcMethods = require('./lib/rpc/methods');
var http = require('http');
var fs = require('fs')
var mustache = require('mustache')

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
          app.use("/locales", express.static(currentDir+"/locales"))
          app.use("/assets", express.static(currentDir+"/assets"))
          app.use("/fonts", express.static(currentDir+"/fonts"))
	        app.use(express.static(currentDir + '/public'));
        });

        app.configure('development', function(){
          app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        });
         
        app.configure('production', function(){
          app.use(express.errorHandler()); 
        });

        app.get('/pages/:name', function(req, res) {
          var name = req.params.name
/*

          var scriptName = pageInfo.script || pageInfo.view
          var pageName = pageInfo.view
          var allData = $.extend(data, pageInfo)
          $.get("pages/"+pageName+".wow").done(function(response) {        
            var html = mustache.to_html(response, allData);
            $('#top-wrapper').html(html);  
            Widgetizer.useCommonWidgets()
            var node = window.document
            Widgetizer.widgetize(node, function() {
              // TODO get rid of dynamic require - browserify does not like it
              var scr = require("../pages/"+scriptName+".js")(window, $, SVG, i18n)
              scr.init(Widgetizer, allData, function(pg) {
                PageLoader.fixBackspace()      
                if(next) next(pg)
              })
*/
          var view = fs.readFileSync("pages/"+name+".wow", "utf8")
          var viewData = {query:req.query}
          var viewHtml = mustache.to_html(view, viewData)
          var page = fs.readFileSync("templates/master.html", "utf8")
          var data = {query:req.query, "name":name, "content":viewHtml}
          var html = mustache.to_html(page, data); 
          res.send(html)
        })

        /* example testing:
          curl -X POST -d '{"jsonrpc":"2.0", "method":"hello", "params":{"name":"abc"}}' -H "Content-Type: application/json" localhost:9999/rpc 
        */
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
            rpcMethod(data.params, 
              function(error, result) {
                if(!error) {
                    res.send(JSON.stringify({
                      jsonrpc: '2.0',
                      result: result,
                      error : null,
                      id: data.id
                    }), 200)
                } else {
                    onError({
                      code: -32603,
                      message: 'Failed',
                      data: error
                    }, 500)            
                }
            });
          } catch (e) {
            onError({
              code: -32603,
              message: 'Exception at method call',
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
