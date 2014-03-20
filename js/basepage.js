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
	goTo: function(url) {
		window.location.href = url
	},
	goToPreviousPage: function() {
		this.goTo(this.getQueryString(-1))
	},
	goToNextPage: function() {
		this.goTo(this.getQueryString(1))
	},
	goToImportPage: function(name) {
		this.goTo("/pages/app?importname="+name)
	},
	goToHomePage: function() {
		this.goTo("/pages/home")
	},
	goToVideoPage: function(ytId) {
		this.goTo("/pages/video?id="+ytId)
	},
	getWidget: function(name) {
		if(typeof name == "string") {
			return this.wtr.get(name)
		} else {
			var el = $(name)
			if(el.data("wow") && el.attr("id")) {
				return this.wtr.get("#"+el.attr("id"))
			} else {
				return null // DOM element is not a widget
			}
		}
	},
	handleEvent: function(evt) {
		switch(evt.device) {
			case "virtual": 
				this.onVirtualControl(evt)
				break
			default:
				this.onEvent(evt)
		}
	},
	onVirtualControl: function(evt) {
		// handle virtual controller...
	},
	onEvent: function(evt) {
		// handler for other devices...
	}


})

module.exports = BasePage
