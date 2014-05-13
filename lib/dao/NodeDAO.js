var SchemedDAO = require("./SchemedDAO")

var NodeDAO = SchemedDAO.extend({
	constructor: function(collection, schema, defaults) {
		this.base(collection, schema, defaults)
	}
})

module.exports = NodeDAO

