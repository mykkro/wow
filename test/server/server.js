var http = require('http');

exports.start = function(port) {
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

process.on('uncaughtException', function(err) {
    console.error(err.stack);
});