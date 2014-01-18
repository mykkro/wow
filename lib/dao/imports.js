var Storage = require("../storage")
var crud = Storage.crud("imports")
var dateFormat = require('dateformat')

var Imports = {
	create: function(userId, data, cb) {
		var date = new Date()
		var obj = {
			// default manifest
			apptype: "basic", // default value
			title: "Imported Application",
			description: "",
			author: "",
			version: "",
			uri: "",
			imported: dateFormat(date, "isoDateTime")
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
	get: function(importId, cb) {
		crud.get(importId, cb)
	},
	list: function(userId, start, limit, cb) {
		crud.find({userId:userId})
			.sort({"title":"asc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
}

module.exports = Imports

