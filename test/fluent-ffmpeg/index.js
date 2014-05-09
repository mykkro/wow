var ffmpeg = require('fluent-ffmpeg');
var sys = require("sys")

var args = process.argv.slice(2);
var file = args.length>0 ? args[0] : 'media/test.3gp'

// progress now works, after upgrading to fluent-ffmpeg v1.7.1

var proc = new ffmpeg({ source: file })
  .withAspect('4:3')
  .withSize('640x480')
  .onProgress(function(progress) {
    console.log(progress);
  })
  .saveToFile('output/converted.webm', function(stdout, stderr) {
    console.log('file has been converted succesfully');
  });