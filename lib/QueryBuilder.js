/**
 * Creates query object for TingoDb database queries
 * e.g. API.findNodes(q)
 */

var merge = require("merge")
var Base = require("basejs")

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}	

var QueryBuilder = Base.extend({
	constructor: function() {
		this.query = {
			query: {}
		}
	},
	q: function() {
		return this.query;
	},
	skip: function(/* int */n) {
		this.query.skip = n
		return this
	},
	limit: function(/* int */n) {
		this.query.limit = n
		return this
	},
	sort: function(/* string */key, /* boolean */dir) {
		if(!this.query.sort) this.query.sort = [];
		this.query.sort.push([key, dir?'asc':'desc'])
		return this
	},
	cond: function(/* object */cond) {
		this.query.query = cond
		return this
	},
	/* database queries... */
	eq: function(key, value) {
		var out = {}
		out[key] = value
		return out
	},
	/* database queries... */
	regex: function(key, regexstr) {
		var out = {}
		out[key] = {$regex: escapeRegExp(regexstr), $options: 'i'} 
		return out
	},
	and: function(conds) {
		return { "$and": conds }
	},
	or: function(conds) {
		return { "$or": conds }
	}
})

module.exports = QueryBuilder