var merge = require("merge")
var fs = require('fs'); // require the filesystem api
var path = require("path")
var mustache = require("mustache")
var Base = require("basejs")

var __previewTemplate = null
var previewTemplate = function() {
	if(!__previewTemplate)
		__previewTemplate = fs.readFileSync(path.join(__dirname, "../../templates/nodes/preview.html"), "utf8")
	return __previewTemplate
}

/* Business-logic object */
var NodeAPI = Base.extend({
	constructor: function(name, dao, tpl) {
		this.name = name
		this.dao = dao
		this.tpl = tpl
	},
	create: function(data, next) {
		console.log("create: ", this.name, data)
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
	get: function(id, next) {
		this.dao().get(id, next)
	},
	find: function(data, next) {
		this.dao().findItems(data, next)
	},
	findOne: function(data, next) {
		this.dao().findOne(data, next)
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
	getThumbnailUri: function() {
		return null
	},
	renderView: function(data, view) {
		view = view || 'default'
		// TODO use correct template...
		return mustache.render(this.tpl(), data)
	},
	renderPreview: function(data) {
		console.log("Rendering preview", data)
		var obj = {
			title: data.title,
			typeThumbnailUrl: this.getTypeThumbnailUri(),
			thumbnailUrl: this.getThumbnailUri()
		}
		return mustache.render(previewTemplate(), obj)
	}
})

module.exports = NodeAPI