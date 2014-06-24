var merge = require("merge")
var Base = require("basejs")

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}	

/**
 * ## QueryBuilder
 * Utility class for creating query objects for TingoDB/MongoDB database queries, eg. in API.findNodes(q)
 */		
var QueryBuilder = Base.extend({
	constructor: function() {
		this.query = {
			query: {}
		}
	},
	/**
 	 * ## QueryBuilder.prototype.q
	 * Returns the query object.
	 * @returns {object} the query object
	 */		
	q: function() {
		return this.query;
	},
	/**
 	 * ## QueryBuilder.prototype.skip
	 * Set skip parameter.
	 * @param {integer} n number of records to skip
	 * @returns {object} this
	 */		
	skip: function(/* int */n) {
		this.query.skip = n
		return this
	},
	/**
 	 * ## QueryBuilder.prototype.limit
	 * Set limit parameter.
	 * @param {integer} n max number of records in result
	 * @returns {object} this
	 */		
	limit: function(/* int */n) {
		this.query.limit = n
		return this
	},
	/**
 	 * ## QueryBuilder.prototype.sort
	 * Set sort parameter. There can be multiple of them.
	 * @param {string} key the key to be sorted
	 * @param {boolean} direction the sort direction (true for ascending)
	 * @returns {object} this
	 */		
	sort: function(/* string */key, /* boolean */dir) {
		if(!this.query.sort) this.query.sort = [];
		this.query.sort.push([key, dir?'asc':'desc'])
		return this
	},
	/**
 	 * ## QueryBuilder.prototype.cond
	 * Set query condition parameter. There is only one parameter; more complex queries must be created by AND or OR of other queries.
	 * @param {object} the query condition
	 * @returns {object} this
	 */		
	cond: function(/* object */cond) {
		this.query.query = cond
		return this
	},
	/**
 	 * ## QueryBuilder.prototype.eq
	 * Creates equality condition (the field with specified name must be equal to specified value).
	 * @param {string} key the key to be compared
	 * @param {string} value the expected value
	 * @returns {object} the condition object
	 */		
	eq: function(key, value) {
		var out = {}
		out[key] = value
		return out
	},
	/**
 	 * ## QueryBuilder.prototype.regex
	 * Creates regex match condition (the field with specified name must match specified regex).
	 * @param {string} key the key to be compared
	 * @param {string} regexstr the regular expression string
	 * @returns {object} the condition object
	 */		
	regex: function(key, regexstr) {
		var out = {}
		out[key] = {$regex: escapeRegExp(regexstr), $options: 'i'} 
		return out
	},
	/**
 	 * ## QueryBuilder.prototype.and
	 * Creates AND condition from target conditions. 
	 * @param {array} conds the array of condition objects.
	 * @returns {object} the condition object
	 */		
	and: function(conds) {
		return { "$and": conds }
	},
	/**
 	 * ## QueryBuilder.prototype.or
	 * Creates OR condition from target conditions. 
	 * @param {array} conds the array of condition objects.
	 * @returns {object} the condition object
	 */		
	or: function(conds) {
		return { "$or": conds }
	},
	/**
 	 * ## QueryBuilder.prototype.inArray
	 * Creates test whether the value of specified field is in the target array. Note: in TingoDB, it seems this works only for integers.
	 * @param {string} key the name of field to be tested
	 * @param {array} array the array of values
	 * @returns {object} the condition object
	 */		
	inArray: function(key, array) {
		var out = {}
		out[key] = {$in: array} 
		return out
	}
})

module.exports = QueryBuilder