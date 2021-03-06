var Storage = require("../Storage")
var DAO = require("./DAO")
var crud = new DAO(Storage.collection("imports"))
var dateFormat = require('dateformat')

var Imports = {
	create: function(adminId, data, cb) {
		var date = new Date()
		var obj = {
			// default manifest
			apptype: "basic", // default value
			title: data.originalName,
			description: "",
			author: "",
			version: "",
			uri: "",
			created: dateFormat(date, "isoDateTime"),
			autogenerated: true,
			adminId: adminId
		}
		for(var key in data) obj[key] = data[key]
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
	list: function(data, start, limit, cb) {
		crud.find(data)
			.sort({"title":"asc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	},
	listNewest: function(data, start, limit, cb) {
		crud.find(data)
			.sort({"_id":"desc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
}

module.exports = Imports

