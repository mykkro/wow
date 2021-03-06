/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/video.defaults.json")

var schema = require("../../entity/video.schema.json")

/**
 * ## VideoDAO
 * Video clip.
 */
var VideoDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("videos"), schema, defaults)
	}
})

module.exports = VideoDAO

