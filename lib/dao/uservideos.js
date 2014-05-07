var Storage = require("../storage")
var crud = Storage.crud("uservideos")
var dateFormat = require('dateformat')
var youtube = require('youtube-feeds')
var _ = require("underscore")

/* videos preselected by the admin for individual users */
var UserVideos = {
	add: function(adminId, userId, videoId, title, cb) {
		var date = new Date()
		crud.create({adminId:adminId, userId: userId, videoId: videoId, title:title, created: dateFormat(date, "isoDateTime")}, cb)
	},
	remove: function(adminId, userId, videoId, cb) {
		crud.removeItems({adminId:adminId, userId: userId, videoId: videoId}, cb)
	},
	has: function(adminId, userId, videoId, cb) {
		crud.countItems({adminId:adminId, userId: userId, videoId: videoId}, function(err, count) {
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
					var query = _.map(res, function(it) {
						return it.videoId
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
	findVideos: function(q, start, limit, cb) {
		youtube.feeds.videos(q, cb)
	}
}

module.exports = UserVideos

// REPL testing
//
// var UserVideos = require("./lib/dao/uservideos")
//


