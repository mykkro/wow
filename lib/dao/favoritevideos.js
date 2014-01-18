var Storage = require("../storage")
var crud = Storage.crud("favoritevideos")
var dateFormat = require('dateformat')


var FavoriteVideos = {
	star: function(userId, videoId, cb) {
		var date = new Date()
		crud.create({userId: userId, videoId: videoId, created: dateFormat(date, "isoDateTime")}, cb)
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
		crud.find({userId:userId})
			.sort({created:"asc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
}

module.exports = FavoriteVideos

