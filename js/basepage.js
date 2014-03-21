var Base = require("basejs")
var url = require("url")

var BasicLayer = require("./basiclayer")
var Overlay = require("./overlay")

var BasePage = BasicLayer.extend({
	constructor: function(Wow, options) {
		this.base(Wow, options)
		this.overlays = []
		this.overlayGroup = document.getElementById("overlaygroup")
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
	handleEvent: function(evt) {
		console.log("Handling event: ", evt)
		for(var i=this.overlays.length-1; i>=0; i--) {
			console.log("Checking overlay: ", i)
			if(!this.overlays[i].transparent && this.overlays[i].visible) {
				this.overlays[i].handleEvent(evt)
				return
			}
		}
		this.base(evt)
	},	
	// overlays should not be reused...
	addOverlay: function(o) {
		this.overlays.push(o)
		$(o.paperElement()).appendTo($(this.overlayGroup))
		o.show()
	},
	// overlays should not be reused...
	removeOverlay: function(o) {
		o.hide()
		$(o.paperElement()).detach()
		var idx = this.overlays.indexOf(o)
		if(idx != -1) {
			this.overlays.splice(idx, 1)
		}
	},
	removeOverlays: function() {
		$(this.overlayGroup).empty()
		this.overlays = []
	}

})

module.exports = BasePage
