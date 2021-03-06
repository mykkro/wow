var DAO = require("./DAO")
var merge = require('merge')
var Storage = require("../Storage")
var dateFormat = require('dateformat')
var Validator = require('jsonschema').Validator;

var SchemedDAO = DAO.extend({
	constructor: function(collection, schema, defaults) {
		this.base(collection)
		this.schema = schema
		this.defaults = defaults
	},
	create: function(data, cb) {
		// console.log("SchemedDAO.create", data)
		var obj = merge(
			{},
			this.defaults, 
			{ created: dateFormat(new Date(), "isoDateTime") }, 
			data
		)
		// console.log("SchemedDAO.create", obj)
		var v = new Validator();
		var res = v.validate(obj, this.schema)
		if(res.errors.length) {
			console.error(res.errors)
			cb("schema validation failed")
		} else {
			this.base(obj, cb)
		}
	}
	// TODO validate after update/set operations
})

module.exports = SchemedDAO

