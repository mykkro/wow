var connect = require('connect'),
    http = require('http'),
    directory = './test/youtube';


exports.start = function(port) {
	connect()
	    .use(connect.static(directory))
	    .listen(port);

	console.log('Listening on port '+port);
}