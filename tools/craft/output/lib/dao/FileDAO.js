/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/file.defaults.json")

var schema = require("../../entity/file.schema.json")

/**
 * ## FileDAO
 * Uploaded file.
 */
var FileDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("files"), schema, defaults)
	}
})

module.exports = FileDAO

