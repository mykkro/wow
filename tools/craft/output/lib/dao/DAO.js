var Base = require("basejs")
var merge = require("merge")

var DAO = Base.extend({
	constructor: function(collection) {
		this.coll = collection
	},
	/* next = function(err, result) */
	create: function(data, next) {
		this.coll.insert(data, next)
	},
	/* next = function(err, result) */
	/* updates item with an ID to new value */
	update: function(data, next) {
		this.coll.save(data, next)
	},
	/* get item and change only some of its data */
	set: function(id, data, next) {
		var self = this
		this.get(id, function(err, res) {
			if(err) return next(err);
			var newData = merge({}, res, data)
			self.update(newData, next)
		})
	},
	/* next = function(err, result) */
	/* data can be either id or removed entity with _id */
	/* returns: number of deleted records in result */
	remove: function(data, next) {
		this.coll.remove({_id: (typeof(data) == "object") ? data._id : data}, next)
	},
	removeItems: function(data, next) {
		this.coll.remove(data, next)
	},
	/* next = function(err, result) */
	/* result can be either null (not found) or a data object */
	get: function(_id, next) {
		this.coll.findOne({_id:_id}, next)
	},
	/* next = function(err, result) */
	findOne: function(data, next) {
		this.coll.findOne(data, next)
	},
	/* returns cursor */
	find: function(data) {
		return this.coll.find(data)
	},
	/* next = function(err, result) */
	countItems: function(data, next) {
		return this.find(data).count(next)
	},
	/* next = function(err, result) */
	findItems: function(data, next) {
		return this.find(data).toArray(next)
	},
	findWithOptions: function(d, next) {
		return this
			.find(d.query || {})
			.skip(d.skip || 0)
			.limit(d.limit || 10)
			.sort(d.sort || {})
			.toArray(next)
	}
})

module.exports = DAO