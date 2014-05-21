/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/albumNode.defaults.json")

var schema = require("../../entity/albumNode.schema.json")

/**
 * ## AlbumNodeDAO
 * AlbumNode
 */
var AlbumNodeDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("albumNodes"), schema, defaults)
	}
})

module.exports = AlbumNodeDAO
