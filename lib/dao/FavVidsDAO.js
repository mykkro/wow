var Storage = require("../storage")
var SchemedDAO = require("./SchemedDAO")

var defaults = {
}

var schema = {
	"type":"object",
	"$schema": "http://json-schema.org/draft-03/schema",
	"id": "http://jsonschema.net",
	"required":false,
	"properties":{
		"userId": {
			"type":"number",
			"required":true
		},
		"videoId": {
			"type":"number",
			"required":true
		},
		"created": {
			"type":"string",
			"required":false
		}
	}
}

var FavVidsDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("favoritevideos"), schema, defaults)
	},
	star: function(userId, appId, cb) {
		var date = new Date()
		this.create({userId: userId, appId: appId}, cb)
	},
	unstar: function(userId, appId, cb) {
		this.removeItems({userId: userId, appId: appId}, cb)
	},
	starred: function(userId, appId, cb) {
		this.countItems({userId: userId, appId: appId}, function(err, count) {
			if(err) cb(err);
			else cb(null, count>0)
		})

	}
})

module.exports = FavVidsDAO

