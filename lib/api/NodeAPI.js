var merge = require("merge")
var fs = require('fs'); // require the filesystem api
var path = require("path")
var mustache = require("mustache")
var Base = require("basejs")
var Q = require("q")

var __previewTemplate = null
var previewTemplate = function() {
	if(!__previewTemplate)
		__previewTemplate = fs.readFileSync(path.join(__dirname, "../../views/mustache/nodes/preview.mustache"), "utf8")
	return __previewTemplate
}

var __previewTemplateShort = null
var previewTemplateShort = function() {
	if(!__previewTemplateShort)
		__previewTemplateShort = fs.readFileSync(path.join(__dirname, "../../views/mustache/nodes/preview-short.mustache"), "utf8")
	return __previewTemplateShort
}

/* Business-logic object */
var NodeAPI = Base.extend({
	constructor: function(name, dao, opts) {
		this.name = name
		this.dao = dao
		this.tpl = {}
		this.options = opts
		this.metadata = require("../../entity/"+name+".schema.json")
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
	viewTemplate: function(viewName) {
		viewName = viewName || 'default'
		if(!(viewName in this.tpl)) {
			this.tpl[viewName] = fs.readFileSync(path.join(__dirname, "../../views/mustache/nodes/"+this.name+"."+viewName+".mustache"), "utf8")
		}
		return this.tpl[viewName]
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
		return mustache.render(this.viewTemplate(view), data)
	},
	renderPreview: function(data, options) {
		options = options || { previewType: "default" }
		// console.log("Render preview: ", data, options)
		var obj = {
			title: data.title,
			description: data.description,
			tags: data.tags,
			created: data.created,
			typeThumbnailUrl: this.getTypeThumbnailUri(),
			typeTitle: this.metadata.title,
			thumbnailUrl: this.getThumbnailUri(data) || this.getTypeThumbnailUri()
		}
		var tpl = null
		switch(options.previewType) {
			case "default":
				tpl = previewTemplate()
				break
			case "short":
				tpl = previewTemplateShort()
				break
			default:
				return "Template not found: "+options.previewType
		}
		return mustache.render(tpl, obj)
	},
	thumbFromUUID: function(uuid) {
		return uuid ? '/uploads/thumbs/'+uuid+'.png' : null

	},
	getMetaInfo: function() {
		var type = this.name
		var schema = require("../../entity/"+type+".schema.json")
		var defaults = require("../../entity/"+type+".defaults.json")
		var addForm = require("../../entity/forms/"+type+".add.json")
		// TODO check for other forms
		var forms = {
			"add": addForm
		}
		return {
			"name":type,
			"thumbnailUri": this.getTypeThumbnailUri(),
			"schema": schema,
			"defaults": defaults,
			"forms": forms
		}
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