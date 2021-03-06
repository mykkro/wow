/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/preset.defaults.json")

var schema = require("../../entity/preset.schema.json")

/**
 * ## PresetDAO
 * Preset
 */
var PresetDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("presets"), schema, defaults)
	}
})

module.exports = PresetDAO

