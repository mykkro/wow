var Storage = require("../Storage")

var defaults = {
	"title": "User",
	"description": "",
	"usesPassword": false,
	"password": "wow"
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
			"required":false
		},
		"usesPassword": {
			"type":"boolean",
			"required":false
		},
		"title": {
			"type":"string",
			"required":true
		}
	}
}

var UserDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("users"), schema, defaults)
	}
})

module.exports = UserDAO

