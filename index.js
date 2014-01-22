/* initialization code */
console.log("index.js module loaded")

var netutil = require("netutil");
var http = require('http');
/*
var server = function(port) {
    http.createServer(function(request, response) {
        if (request.url === '/favicon.ico') {
            response.writeHead(404);
            response.end();
            return;
        }

        response.writeHead(200, {
            'content-type': 'text/html; charset=UTF-8'
        });
        response.end("<b>hello</b>");
    }).listen(port);
};
netutil.findFreePort(20000, 40000, "localhost", function(err, port) {
	module.exports.serverPort = port
    server(port)
});
*/
/* exported symbols */
module.exports = {
	serverPort: 0,
	hello: function() {
		window.alert("Hello! "+this.serverPort)
	}
}