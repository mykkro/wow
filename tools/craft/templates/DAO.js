/* File autogenerated by craft {{datetime}} */

var Storage = require("../Storage")
var SchemedDAO = require("./SchemedDAO")

var defaults = require("../../entity/{{name}}.defaults.json")

var schema = require("../../entity/{{name}}.schema.json")

/**
 * ## {{daoName}}
 * {{description}}
 */
var {{daoName}} = SchemedDAO.extend({
	constructor: function() {
		this.base(Storage.collection("{{collectionName}}"), schema, defaults)
	}
})

module.exports = {{daoName}}
