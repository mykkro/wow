var fs = require('fs');
var request = require('request');
var progress = require('request-progress');

// var src = 'http://google.com/doodle.png'
var src = "http://upload.wikimedia.org/wikipedia/commons/a/a1/Exploration_Flight_Test-1_insignia.png"
var dst = "downloads/downloaded.png"
// Note that the options argument is optional
progress(request(src), {
    throttle: 2000,  // Throttle the progress event to 2000ms, defaults to 1000ms
    delay: 1000      // Only start to emit after 1000ms delay, defaults to 0ms
})
.on('progress', function (state) {
    console.log('received size in bytes', state.received);
    // The properties bellow can be null if response does not contain
    // the content-length header
    console.log('total size in bytes', state.total);
    console.log('percent', state.percent);
})
.on('error', function (err) {
    // Do something with err
})
.pipe(fs.createWriteStream(dst))
.on('error', function (err) {
    // Do something with err
})
.on('close', function (err) {
    // Saved to doogle.png!
})
