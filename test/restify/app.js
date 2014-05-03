var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// use with:
// curl -X GET localhost:8888/hello/world
