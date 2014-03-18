module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	return BasePage.extend({
		init: function(Widgetizer, data, next) {
			$("g[name=quitButton]").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})
			$(".book-button .overlay").click(function() {
				// show book page...
				window.location = "/pages/books"
			})

			/* continue when finished */
			if(next) next(this)
		}
	})
}