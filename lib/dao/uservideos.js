var Storage = require("../storage")
var crud = Storage.crud("uservideos")
var dateFormat = require('dateformat')

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
	listNewest: function(adminId, start, limit, cb) {
		crud.find({adminId:adminId})
			.sort({"_id":"desc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
}

module.exports = UserVideos

