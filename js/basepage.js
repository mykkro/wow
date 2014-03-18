var Base = require("basejs")

var BasePage = Base.extend({
	init: function(Widgetizer, data, next) {
		// initializations happens here...
		// ...
		// call this after you finish
		if(next) next(this)
	},
	handleEvent: function(evt) {
		// incoming events are handled here...
		console.log("BasePage event:", evt)
	}
})

module.exports = BasePage
