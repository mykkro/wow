var SchemedDAO = require("./SchemedDAO")
var merge = require('merge')
var Storage = require("../Storage")

var defaults = {
	"title": "Administrator",
	"description": "",
	"canCreateAdmins": false,
	"canCreateUsers": true,
	"canImportApps": true,
	"password": "admin" // unless specified otherwise
}

var schema = {
	"type":"object",
	"$schema": "http://json-schema.org/draft-03/schema",
	"id": "http://jsonschema.net",
	"required":false,
	"properties":{
		"ownerAdminId": {
			"type":"number",
			"required":true
		},
		"canCreateAdmins": {
			"type":"boolean",
			"required":false
		},
		"canCreateUsers": {
			"type":"boolean",
			"required":false
		},
		"canImportApps": {
			"type":"boolean",
			"required":false
		},
		"created": {
			"type":"string",
			"required":false
		},
		"description": {
			"type":"string",
			"required":false
		},
		"password": {
			"type":"string",
			"required":true
		},
		"title": {
			"type":"string",
			"required":true
		}
	}
}

var AdminDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("admins"), schema, defaults)
	}
})

module.exports = AdminDAO

// REPL testing:
//
// var dao = new (require("./lib/dao/AdminDAO"))()
// 
// dao.create({}, console.log) 
// -> schema validation failed
// dao.create({ownerAdminId: 111, title: "My Administrator"}, console.log)
// -> ok