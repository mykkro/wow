var Storage = require("../Storage")
var SchemedDAO = require("./SchemedDAO")

var defaults = {
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
		"userId": {
			"type":"number",
			"required":true
		},
		"created": {
			"type":"string",
			"required":false
		},
		"title": {
			"type":"string",
			"required":true
		},
		"url": {
			"type":"string",
			"required":true
		}
	}
}

var UserRadioDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("userradios"), schema, defaults)
	}
})

module.exports = UserRadioDAO

