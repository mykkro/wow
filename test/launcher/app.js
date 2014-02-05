#!/usr/bin/env node

var nc = require('node-chrome');

// chromium-browser --kiosk --url http://localhost:9999 --no-proxy-server

var opts = {
  runtime: "chromium-browser",
  files: "./ui",
  port: 7777,
  index: "/index.html",
  width: 1024,
  height: 760
};

nc(opts, function(websocket, chrome) {

  // output from the socket.
  websocket.on('message', function(message) {
    console.log(message);
  });

  // output from the chrome runtime.
  chrome.stdout.on('data', function (data) {
    console.log(data);
  });

  // when the user quits the app.
  chrome.on('exit', function (code) {
    process.exit(0);
  });
});