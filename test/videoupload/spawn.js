
var cp = require('child_process');

var children = []

/**
 * Spawns background process for video converting.
 * @param {object} params Conversion parameters. Required fields: file, outfile; optional fields: progress, finished, error
 * @return {object} the child process
 */
var spawnVideoConverter = function(params) {
	var child = cp.fork('./converter');
	child.onUnexpectedExit = function (code, signal) {
	  console.log("Child process terminated with code: " + code);
	  process.exit(1);
	}
	child.on("exit", child.onUnexpectedExit);
	// A helper function to shut down the child.
	child.shutdown = function () {
	  // Get rid of the exit listener since this is a planned exit.
	  this.removeListener("exit", this.onUnexpectedExit);
	  this.kill("SIGTERM");
	}
	/* message handler */
	child.on('message', function(m) {
	  // Receive results from child process
	  if(m.type == "finished") {
	  	// converting finished!
	  	child.shutdown()
	  	if(params.finished) params.finished(m.data)
	  } else if(m.type == "started") {
	  	if(params.started) params.started(m.data)
	  } else if(m.type == "progress") {
	  	if(params.progress) params.progress(m.data)
	  } else if(m.type == "error") {
	  	if(params.error) params.error(m.message, m)
	  } else {
	  	if(params.error) params.error("Unknown message: "+m.type, m)
	  }
	});
	// trigger the processing...
	child.send({"type":"start", data: params});
	children.push(child)
	return child
}

var shutdownChildren = function() {
	while(children.length) {
		var c = children.shift()
		c.shutdown()
	}
}

// SIGTERM AND SIGINT will trigger the exit event.
process.once("SIGTERM", function () {
  process.exit(0);
});
process.once("SIGINT", function () {
  process.exit(0);
});
// And the exit event shuts down the child.
process.once("exit", function () {
  shutdownChildren()
});
 
// This is a somewhat ugly approach, but it has the advantage of working
// in conjunction with most of what third parties might choose to do with
// uncaughtException listeners, while preserving whatever the exception is.
process.once("uncaughtException", function (error) {
  // If this was the last of the listeners, then shut down the child and rethrow.
  // Our assumption here is that any other code listening for an uncaught
  // exception is going to do the sensible thing and call process.exit().
  if (process.listeners("uncaughtException").length === 0) {
    shutdownChildren()
    throw error;
  }
});

module.exports = spawnVideoConverter