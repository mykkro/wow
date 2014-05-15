var Storage = require("../Storage")
var DAO = require("./DAO")
var crud = new DAO(Storage.collection("userradios"))
var dateFormat = require('dateformat')
var _ = require("underscore")

/* videos preselected by the admin for individual users */
var UserRadios = {
	add: function(adminId, userId, url, title, cb) {
		var date = new Date()
		crud.create({adminId:adminId, userId: userId, url: url, title:title, created: dateFormat(date, "isoDateTime")}, cb)
	},
	remove: function(adminId, userId, url, cb) {
		crud.removeItems({adminId:adminId, userId: userId, url: url}, cb)
	},
	has: function(adminId, userId, url, cb) {
		crud.countItems({adminId:adminId, userId: userId, url: url}, function(err, count) {
			if(err) cb(err);
			else cb(null, count>0)
		})

	},
	listNewest: function(data, start, limit, cb) {
		crud.countItems(data, function(err, cnt) {
			if(err) cb(err);
			else crud.find(data)
			.sort({"_id":"desc"})
			.limit(limit)
			.skip(start)
			.toArray(function(err, items) {
				if(err) cb(err);
				else cb(null, { 
					itemsPerPage: limit,
					startIndex: start+1,
					totalItems: cnt,
					items: items 
				})
			})
		})
	}
}

module.exports = UserRadios

