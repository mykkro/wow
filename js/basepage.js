var Base = require("basejs")
var url = require("url")

var BasePage = Base.extend({
	constructor: function(Wow) {
		this.wow = Wow
		this.wtr = Wow.Widgetizer
	},
	init: function(data, next) {
		// initializations happens here...
		// ...
		// call this after you finish
		if(next) next(this)
	},
	handleEvent: function(evt) {
		// incoming events are handled here...
		// console.log("BasePage event:", evt)
	},
	updateBrowserQuery: function(page, query) {
		var newQuery = "?page="+page
		window.History.replaceState({}, "", newQuery)
	},
	getQueryString: function(dpage) {
		var parsedUrl = url.parse(window.location.href, true)
		var pg = parseInt(parsedUrl.query.page || 1)
		if(dpage) pg += dpage
		if(pg<1) pg=1
		parsedUrl.query.page = pg
		parsedUrl.search = null
		return url.format(parsedUrl)
	},
	goToPreviousPage: function() {
		var href = this.getQueryString(-1)
		window.location.href = href
	},
	goToNextPage: function() {
		var href = this.getQueryString(1)
		window.location.href = href
	},
	goToImportPage: function(name) {
		window.location.href = "/pages/app?importname="+name
	},
	goToHomePage: function() {
		window.location = "/pages/home"
	},
	goToVideoPage: function(ytId) {
		window.location.href = "/pages/video?id="+ytId
	},
	getWidget: function(name) {
		return this.wtr.get(name)
	}

})

module.exports = BasePage
