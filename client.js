var rpcMethods = require('./lib/rpc/methods');
var http = require('http');


var WowClient = {
    port: 9999,
    /* Local call */
    // TODO:return values should have the same structure as in remote calls... */
    loc: function(method, params, next) {
        if(rpcMethods[method]) {
            rpcMethods[method](params, function(err, res) {
                if(err) next({message:'Failed', data:error});
                else next(null, {result:res, error: null})
            })
        } else {
            next({message:"Method not found"})
        }
    },
    /* Remote call */
    rpc: function(method, params, next) {
        var rpcObj = {"jsonrpc":"2.0", method:method, params: params}
        var rpcStr = JSON.stringify(rpcObj)
        var headers = {
          'Content-Type': 'application/json',
          'Content-Length': rpcStr.length
        };
        var options = {
          host: 'localhost',
          port: this.port,
          path: '/rpc',
          method: 'POST',
          headers: headers
        };

        // Setup the request.  The options parameter is
        // the object we defined above.
        var req = http.request(options, function(res) {
          res.setEncoding('utf-8');
          var responseString = '';
          res.on('data', function(data) {
            responseString += data;
          });
          res.on('end', function() {
            var resultObject = JSON.parse(responseString);
            next(null, resultObject)
          });
        });
        req.on('error', function(e) {
          next(e)
        });
        req.write(rpcStr);
        req.end();

    }

}

module.exports = WowClient
