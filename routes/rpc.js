module.exports = function(app) {
	var rpcMethods = require('../lib/rpc/methods');

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
}