#!/usr/bin/env node

var plugins = require("./plugins.json")
var sys = require('sys')
var exec = require('child_process').exec;

for(var pl in plugins.plugins) {
	var cmd = "(cd "+pl+" && grunt)"
	console.log(cmd)
	exec(cmd, console.log);
}