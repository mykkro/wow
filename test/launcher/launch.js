var spawn = require('child_process').spawn;

var opts = {
	runtime: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
	//runtime: "chromium-browser" // linux
};

var args = [
	'--app=http://localhost:9999',
	'--force-app-mode',
	'--kiosk',
	//'--app-window-size=960,600',
	//'--enable-crxless-web-apps',
	'--user-data-dir=' + __dirname
];

var chrome = spawn(opts.runtime, args);
