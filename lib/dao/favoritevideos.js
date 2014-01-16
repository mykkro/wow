var Storage = require("../storage")
var crud = Storage.crud("favoritevideos")


var FavoriteVideos = {
	star: function(userId, videoId, cb) {
		crud.create({userId: userId, videoId: videoId}, cb)
	},
	unstar: function(userId, videoId, cb) {
		crud.removeItems({userId: userId, videoId: videoId}, cb)
	},
	starred: function(userId, videoId, cb) {
		crud.countItems({userId: userId, videoId: videoId}, function(err, count) {
			if(err) cb(err);
			else cb(null, count>0)
		})

	},
	list: function(userId, start, limit, cb) {

	}
}

module.exports = FavoriteVideos

