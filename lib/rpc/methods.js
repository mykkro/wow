var http = require('http');
var https = require('https');
var video = require("../../pages/lib/videopage")
var youtube = require("../../pages/lib/youtubepage")

module.exports = {
    hello: function(params, cb) {
        /* each rpc method has two arguments: */
        /* params - a params map */
        /* cb - function(error, result) */
        cb(null, {"greeting": "hello "+params.name})
    },
	videoIsStarred: function(params, cb) {
		video.isStarred(params, cb)
	},
	videoStar: function(params, cb) {
		video.star(params, cb)
	},
	videoUnstar: function(params, cb) {
		video.unstar(params, cb)
	},
	// https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20"
	weatherInfo: function(params, cb) {
		var url = 'https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20'
		https.get(url, function(res) {
		    var body = '';
		    res.on('data', function(chunk) {
		        body += chunk;
		    });

		    res.on('end', function() {
		        var fbResponse = JSON.parse(body)
		        cb(null, fbResponse)
		    });
		}).on('error', function(e) {
		   cb(e)
		});
	},
	youTubeSearch: function(params, cb) {
		var youtube = require('youtube-feeds')
		youtube.feeds.videos(params, cb)
	}

}
