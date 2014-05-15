var Storage = require("../Storage")
var DAO = require("./DAO")
var crud = new DAO(Storage.collection("admins"))
var dateFormat = require('dateformat')

var Admins = {
	create: function(adminId, data, cb) {
		var date = new Date()
		var obj = {
			title: "Administrator",
			description: "",
			created: dateFormat(date, "isoDateTime"),
			adminId: adminId, // who created this admin 
			canCreateAdmins: false,
			canCreateUsers: true,
			canImportApps: true,
			password: "admin" // unless specified otherwise
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
	list: function(adminId, start, limit, cb) {
		crud.find({adminId:adminId})
			.sort({"title":"asc"})
			.limit(limit)
			.skip(start)
			.toArray(cb)
	}
}

module.exports = Admins

