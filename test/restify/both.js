// wil not work...
// see: http://stackoverflow.com/questions/20321488/node-js-using-express-and-restify-together-in-one-app
// "For all intents and purposes restify and express can't coexist in the same node process, because for unfortunate reasons, they both try to overwrite the prototype of the http request/response API, and you end up with unpredictable behavior of which one has done what. We can safely use the restify client in an express app, but not two servers."

var express = require('express'),
    restify = require('restify'),
    expressApp = express(),
    restifyApp = restify.createServer();

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

restifyApp.get('/hello/:name', respond);

expressApp.use(expressApp.router);
expressApp.use(express.static(__dirname + "/public"));
expressApp.use('/api', restifyApp); // use your restify server as a handler in express

expressApp.listen(8888, function() {
  console.log('Server listening at http://localhost:8888');
})
