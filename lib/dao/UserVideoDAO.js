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
		"ytId": {
			"type":"string",
			"required":true
		},
		"title": {
			"type":"string",
			"required":true
		},
		"description": {
			"type":"string",
			"required":false
		},
		"duration": {
			"type":"number",
			"required":false
		},
		"aspectRatio": {
			"type":"string",
			"required":false
		},
		"rating": {
			"type":"number",
			"required":false
		},
		"likeCount": {
			"type":"number",
			"required":false
		},
		"ratingCount": {
			"type":"number",
			"required":false
		},
		"viewCount": {
			"type":"number",
			"required":false
		},
		"favoriteCount": {
			"type":"number",
			"required":false
		},
		"commentCount": {
			"type":"number",
			"required":false
		}
	}
}

var UserVideoDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("uservideos"), schema, defaults)
	}
})

module.exports = UserVideoDAO

