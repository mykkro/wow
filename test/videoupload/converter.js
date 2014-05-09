var ffmpeg = require('fluent-ffmpeg');
var sys = require("sys")

process.on('message', function(m) {
	if(m.type == "start") {
		var data = m.data
  		process.send({"type":"started", "data": data});
		var file = data.file
		var outfile = data.outfile
	  	// Do work  (in this case just up-case the string
	  	console.log("Received arguments: ", m)
		var proc = new ffmpeg({ source: file })
		  .withAspect('4:3')
		  .withSize('640x480')
		  .onProgress(function(progress) {
	  		process.send({"type":"progress", "data": progress});
		  })
		  .saveToFile(outfile, function(stdout, stderr) {
	  		process.send({"type":"finished", "data": { "path" : data.outfile }});
		  });
	} else {
		process.send({"type":"error", "message":"Unrecognized message", "data": m})
	}
});