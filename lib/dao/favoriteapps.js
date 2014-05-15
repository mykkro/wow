var Storage = require("../Storage")
var DAO = require("./DAO")
var crud = new DAO(Storage.collection("favapps"))
var dateFormat = require('dateformat')


var FavoriteApps = {
	star: function(userId, appId, cb) {
		var date = new Date()
		crud.create({userId: userId, appId: appId, created: dateFormat(date, "isoDateTime")}, cb)
	},
	unstar: function(userId, appId, cb) {
		crud.removeItems({userId: userId, appId: appId}, cb)
	},
	starred: function(userId, appId, cb) {
		crud.countItems({userId: userId, appId: appId}, function(err, count) {
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

module.exports = FavoriteApps

