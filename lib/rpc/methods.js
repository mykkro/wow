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
	}

}
