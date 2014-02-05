var spawn = require('child_process').spawn;
var WowServer = require("./server")

WowServer.start(function(srv) {
	console.log("wow server is running!")
	var baseURL = "http://localhost:" + WowServer.port + "/";

	var runtime = 
		(process.platform === 'win32') 
			? "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
			: "chromium-browser" // linux

	var args = [
		'--app='+baseURL,
		'--force-app-mode',
		'--kiosk',
		//'--app-window-size=960,600',
		//'--enable-crxless-web-apps',
		'--user-data-dir=' + __dirname+"/cache"
	];

	var chrome = spawn(runtime, args);
	
})

