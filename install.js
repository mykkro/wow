#!/usr/bin/env node

var makestuff = require("./tools/makestuff")

console.log("This script will prepare the application.")

makestuff(function(err) {
	if(err) {
		console.error(err)
	} else {
		console.log("OK!")
		// TODO for each plugin, run wow plugin install
	}
})