var merge = require("merge")
var fs = require('fs'); // require the filesystem api
var path = require("path")
var mustache = require("mustache")
var Base = require("basejs")
var Q = require("q")

var __previewTemplate = null
var previewTemplate = function() {
	if(!__previewTemplate)
		__previewTemplate = fs.readFileSync(path.join(__dirname, "../../templates/nodes/preview.html"), "utf8")
	return __previewTemplate
}

/* Business-logic object */
var NodeAPI = Base.extend({
	constructor: function(name, dao, tpl, opts) {
		this.name = name
		this.dao = dao
		this.tpl = tpl
		this.options = opts
	},
	create: function(data, next) {
		this.dao().create(data, next)
	},
	set: function(id, data, next) {
		this.dao().set(id, data, next)
	},
	update: function(id, data, next) {
		var newData = merge({_id:id}, data)
		this.dao().update(newData, next)
	},
	delete: function(id, next) {
		this.dao().remove(id, next)
	},
	deleteItems: function(data, next) {
		this.dao().removeItems(data, next)
	},
	get: function(id, next) {
		this.dao().get(id, next)
	},
	find: function(data, next) {
		this.dao().findItems(data, next)
	},
	findOne: function(data, next) {
		this.dao().findOne(data, next)
	},
	findWithOptions: function(d, next) {
		return this.dao().findWithOptions(d, next)
	},
	count: function(data, next) {
		this.dao().countItems(data, next)
	},
	viewTemplate: function() {
		return this.tpl()
	},
	getTypeThumbnailUri: function() {
		return '/thumbs/'+this.name
	},
	getTypeColor: function() {
		return this.options.color
	},
	getThumbnailUri: function(data) {
		return null
	},
	renderView: function(data, view) {
		view = view || 'default'
		// TODO use correct template...
		return mustache.render(this.tpl(), data)
	},
	renderPreview: function(data) {
		var obj = {
			title: data.title,
			typeThumbnailUrl: this.getTypeThumbnailUri(),
			thumbnailUrl: this.getThumbnailUri(data) || this.getTypeThumbnailUri()
		}
		return mustache.render(previewTemplate(), obj)
	},
	thumbFromUUID: function(uuid) {
		return uuid ? '/uploads/thumbs/'+uuid+'.png' : null

	},
	/**
	 * Promise-based count
	 * @param {object} data
	 */
	countp: function(data) {
		var deferred = Q.defer();
		this.count(data, function (err, res) {
		    if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(res);
		    }
		});
		return deferred.promise;	
	},
	/**
	 * Promise-based create
	 * @param {object} data
	 */
	createp: function(data) {
		var deferred = Q.defer();
		this.create(data, function (err, res) {
		    if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(res);
		    }
		});
		return deferred.promise;	
	},
	/**
	 * Promise-based find
	 * @param {string} id
	 */
	findp: function(data) {
		var deferred = Q.defer();
		this.find(data, function (err, res) {
		    if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(res);
		    }
		});
		return deferred.promise;	
	},
	/**
	 * Promise-based findOne
	 * @param {string} id
	 */
	findOnep: function(data) {
		var deferred = Q.defer();
		this.findOne(data, function (err, res) {
		    if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(res);
		    }
		});
		return deferred.promise;	
	},
	/**
	 * Promise-based get
	 * @param {string} id
	 */
	getp: function(id) {
		var deferred = Q.defer();
		this.get(id, function (err, res) {
		    if (err) {
		        deferred.reject(new Error(err));
		    } else {
		        deferred.resolve(res);
		    }
		});
		return deferred.promise;	
	},
	/**
	 * Promise-based get
	 * @param {array} ids
	 */
	getMultip: function(ids) {
		var deferred = Q.defer();
		return this.findp({"_id": { $in: ids}})
	}
})

// Example usage:
// find newest 5 records created by specified admin
// eapi.findWithOptions({query:{ownerAdminId:-1},limit:5,sort:{created:-1}}, console.log)
// ...
// 
// Find multiple records by IDs:
// dao.findp({"_id": { $in: [47, 46, 48]}}).done(console.log)

module.exports = NodeAPI