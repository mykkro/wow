module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	return BasePage.extend({
		init: function(Widgetizer, data, next) {
			if(next) next(this)
		}
	})
}