module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* widgetization complete! */
				$("g[name=quitButton]").click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				$(".book-button .overlay").click(function() {
					// show book page...
					window.location = "gui.html?view=bookspage"
				})

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}