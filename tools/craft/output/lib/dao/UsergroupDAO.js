/* File autogenerated by craft  */

var Storage = require("../Storage")
var NodeDAO = require("./NodeDAO")

var defaults = require("../../entity/usergroup.defaults.json")

var schema = require("../../entity/usergroup.schema.json")

/**
 * ## UsergroupDAO
 * User group.
 */
var UsergroupDAO = NodeDAO.extend({
	constructor: function() {
		this.base(Storage.collection("usergroups"), schema, defaults)
	}
})

module.exports = UsergroupDAO

