var youtube = require('youtube-feeds')
module.exports = {
	search: function(data, next) {
		youtube.feeds.videos(data, next)
	}
}
