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
			var self = this
			$(this.element).click(function() {
				if(self.isEnabled()) cb()
			})			
		},
		disable: function() {
			$(this.element).addClass("disabled")
		},
		enable: function() {
			$(this.element).removeClass("disabled")
		},
		setEnabled: function(flag) {
			if(flag) {
				this.enable() 
			} else {
				this.disable()
			}
		},
		isEnabled: function() {
			return !$(this.element).hasClass("disabled")
		}
	})

	return Widget
}