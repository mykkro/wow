#!/usr/bin/env node

var spawn = require('child_process').spawn;
var WowServer = require("./server")
var argv = require('yargs').argv;

/**
 *  Available options:
 *  --serveronly - does not run Chrome/Chromium browser
 *  --windowed   - runs in window mode (in contrast to kiosk mode)
 */
WowServer.start(function(srv) {
	console.log("wow server is running!")
	if(argv.serveronly) return;

	var baseURL = "http://localhost:" + WowServer.port + "/";

	var runtime = argv.runtime 
		? argv.runtime 
		: ((process.platform === 'win32') 
			? "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
			: "chromium-browser") // linux
		
	console.log("Using runtime: "+runtime)

	var args = [
		'--force-app-mode',
		argv.windowed ? '' : '--kiosk',
		'--window-size=960,600',
		'--app-window-size=960,600',
		'--enable-crxless-web-apps',
		'--user-data-dir=' + __dirname+"/cache",
		baseURL
	];

	var chrome = spawn(runtime, args);
	chrome.on('close', function (code) {
  		console.log('child process exited with code ' + code);
  		// also stop server...
  		srv.stop(function() {
  			console.log("Server stopped")
  		})
	});

	WowServer.chrome = chrome
	
})

