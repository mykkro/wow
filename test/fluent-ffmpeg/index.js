var ffmpeg = require('fluent-ffmpeg');

var proc = new ffmpeg({ source: 'source.avi' })
  .withAspect('4:3')
  .withSize('640x480')
  .applyAutopadding(true, 'white')
  .saveToFile('output.avi', function(stdout, stderr) {
    console.log('file has been converted succesfully');
  });
