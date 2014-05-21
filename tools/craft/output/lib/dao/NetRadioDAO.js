/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/netRadio.defaults.json")

var schema = require("../../entity/netRadio.schema.json")

/**
 * ## NetRadioDAO
 * Internet Radio.
 */
var NetRadioDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("netradios"), schema, defaults)
	}
})

module.exports = NetRadioDAO
