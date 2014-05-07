var Storage = require("../storage")
var crud = Storage.crud("favoritevideos")
var dateFormat = require('dateformat')
var youtube = require('youtube-feeds')
var _ = require("underscore")


var FavoriteVideos = {
	star: function(userId, videoId, cb) {
		var date = new Date()
		crud.create({userId: userId, videoId: videoId, created: dateFormat(date, "isoDateTime")}, cb)
		// TODO also add to user videos		
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
	listNewestIDs: function(data, start, limit, cb) {
		crud.find(data)
			.sort({"_id":"desc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	},
	// start is zero-based!
	listNewest: function(data, start, limit, cb) {
		var self = this
		crud.countItems(data, function(err, cnt) {
			if(err) cb(err);
			else self.listNewestIDs(data, start, limit, function(err, res) {
				if(err) cb(err)
				else {
					// TODO use batch processing...
					// problem with IDs starting with hyphens
					// removing hyphens does not work, either
					var query = _.map(res, function(it) {
						var id = it.videoId
						return id
					}).join("|")			
					var qq = {q:query, 'max-results':res.length, 'start-index':start+1}
					youtube.feeds.videos(qq, function(err, res2) {
						if(!err) {
							res2.itemsPerPage = limit
							res2.startIndex = start+1
							res2.totalItems = cnt
						}
						cb(err, res2)
					})
				}
			})
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

