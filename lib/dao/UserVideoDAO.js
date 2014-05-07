var Storage = require("../Storage")
var SchemedDAO = require("./SchemedDAO")
var YouTubeUtil = require("../YouTubeUtil")
var merge = require('merge')

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
		"url": {
			"type":"string",
			"required":true
		},
		"thumbnailUrl": {
			"type":"string",
			"required":true
		},
		"duration": {
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
/**
 * ## UserVideoDAO
 */
var UserVideoDAO = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("uservideos"), schema, defaults)
	},
	/**
	 * ## UserVideoDAO.prototype.createById
	 * Creates a video based on its YouTube ID
	 * @param  {int}   ownerAdminId
	 * @param  {int}   userId      
	 * @param  {string}   ytId     
	 * @param  {function} cb       
	 */
	createById: function(ownerAdminId, userId, ytId, cb) {
		var self = this
		YouTubeUtil.info(ytId, function(err, result) {
			if(err) {
				cb(err)
			} else {
				var obj = merge(result, {ownerAdminId:ownerAdminId, userId: userId})
				self.create(obj, cb)
			}
		})
	}
})

module.exports = UserVideoDAO

