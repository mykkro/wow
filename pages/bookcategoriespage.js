module.exports = function(window, $, SVG, i18n) {
	return {
		init: function(Widgetizer, data, next) {
			$("g[name=quitButton]").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})
			$(".book-button .overlay").click(function() {
				// show book page...
				window.location = "index.html?view=bookspage"
			})

			/* continue when finished */
			if(next) next(this)
		}
	}
}