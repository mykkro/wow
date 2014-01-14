var Base = require("basejs")

module.exports = function($) {

	var Widget = Base.extend({
		constructor: function(data) {
			this.element = data.element
			this.type = data.type
			this.id = data.id
			this.bounds = data.bounds
			this.dim = data.dim
		},
		click: function(cb) {
			if(!$(this.element).hasClass("disabled"))
				$(this.element).click(cb)
		},
		disable: function() {
			$(this.element).addClass("disabled")
			// TODO set attribute disabled
		},
		enable: function() {
			$(this.element).removeClass("disabled")
		}
	})

	return Widget
}
