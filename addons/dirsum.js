// generate hash of directory and store into .hash
// mode: write, verify

var dirsum = require('./my-dirsum');
var fs = require("fs")
var path = require("path")

var dir = "games/raphatris"
var mode = "verify"

dirsum.digest(dir, 'sha1', function(err, hashes) {
  if (err) throw err;
  if(mode == "write") {
  	console.log("Writing hash: "+hashes.hash);
  	fs.writeFileSync(path.join(dir, ".hash"), hashes.hash)
  } else if(mode == "verify") {
 	var hash = fs.readFileSync(path.join(dir, ".hash"))
 	var valid = (hashes.hash == hash)
 	console.log("Hash valid: " + valid)
  }
});