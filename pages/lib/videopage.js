var FavVids = require("../../lib/dao/favoritevideos")
module.exports = {
	isStarred: function(data, next) {
		FavVids.starred(data.userId, data.videoId, next)
	},
	star: function(data, next) {
		FavVids.star(data.userId, data.videoId, next)
	},
	unstar: function(data, next) {
		FavVids.unstar(data.userId, data.videoId, next)
	}
}
