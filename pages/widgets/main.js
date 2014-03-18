module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var page = BasePage.extend({
		init: function(Widgetizer, data, next) {
			/* continue when finished */
			if(next) next(page)
		}
	})
	return page

}