var ffmpeg = require('fluent-ffmpeg');

var proc = new ffmpeg({ source: 'media/test.mov' })
  .withSize('640x360')
  .keepPixelAspect(true)
//  .applyAutopadding(true, 'white')
  .saveToFile('output/test.webm', function(stdout, stderr) {
    console.log('file has been converted succesfully');
  });
