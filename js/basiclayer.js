var Base = require("basejs")

var BasicLayer = Base.extend({
	constructor: function(Wow, options) {
		this.options = options
		this.wow = Wow
		this.wtr = Wow.Widgetizer
		this.SVG = this.wtr.SVGDoc
		this.paper = this.SVG.group().attr("class","wow-overlay") 
	},
	paperElement: function() {
		return this.paper.node;
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

module.exports = BasicLayer
