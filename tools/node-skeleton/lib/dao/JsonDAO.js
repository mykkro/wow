/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/json.defaults.json")

var schema = require("../../entity/json.schema.json")

/**
 * ## JsonDAO
 * JSON Data.
 */
var JsonDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("jsons"), schema, defaults)
	}
})

module.exports = JsonDAO
