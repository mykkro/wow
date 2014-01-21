/* this does not work! unknown module: node-webkit */
/* http://blog.csainty.com/2012/01/running-nodejs-server-alongside-your.html */
var nwebkit = require('node-webkit'),
    http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.end('Hello');
}).listen(3000, '127.0.0.1');

nwebkit.init({
    'url' : 'index.html',
    'width' : 800,
    'height' : 600,
    'onclose': function() {
        server.close();
    }
});