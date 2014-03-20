
module.exports = function($) {
	var Widget = require("./widget")($)

	var InputWidget = Widget.extend({
		constructor: function(data) {
			this.base(data)
			this.val(data.value)
		},
		val: function(value) {
			if(arguments.length==0) {
				// getter
				return this.value
			} else {
				// setter
				this._setValue(value)
				// update widget
				this.setValue(value)
			}
		},
		// call this if the view is changed 
		// so the event wil not propagate back
		_setValue: function(value) {
			this.value = value
			$(this.element).attr("value", value)
		},
		// to be overridden in subclasses... 
		setValue: function(value) {
			console.log("Updating value: "+value)
		},
		focus: function() {
			console.log("Focused!")
		},
		blur: function() {
			console.log("Unfocused!")
		}
	})

	return InputWidget
}
