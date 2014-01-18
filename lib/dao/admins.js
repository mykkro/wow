var Storage = require("../storage")
var crud = Storage.crud("admins")
var dateFormat = require('dateformat')

var Admins = {
	/*
	create: function(userId, data, cb) {
		var date = new Date()
		var obj = {
			// default admin data
		}
		for(var key in data) obj[key] = data[key]
		obj.userId = userId
		crud.create(obj, cb)
	},
	update: function(data, cb) {
		crud.update(data, cb)
	},
	remove: function(importId, cb) {
		crud.remove(importId, cb)
	},
	list: function(userId, start, limit, cb) {
		crud.find({userId:userId})
			.sort({"title":"asc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
	*/
}

module.exports = Imports

