var spawnVideoConverter = require("./spawn")

// Send child process some work
var args = process.argv.slice(2);
var file = args.length ? args[0] : '../fluent-ffmpeg/media/test.mp4'
var outfile = "../fluent-ffmpeg/output/test.webm"

spawnVideoConverter({
	"file": file,
	"outfile": outfile, 
	finished: function(data) {
		console.log("Processing finished!", data)
	},
	progress: function(data) {
		console.log("Progress: "+ data.percent)
	},
	error: function(msg, data) {
		console.error(msg, data)
	}
})
