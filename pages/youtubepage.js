module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			var node = window.document
			Widgetizer.widgetize(node, function() {
				/* widgetization complete! */

				var quitBtn = Widgetizer.get("quitButton")
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				Widgetizer.get("homeButton").click(function() {
					// move back to main page
					window.location = "gui.html"
				})
				Widgetizer.get("searchButton").click(function() {
					window.alert("Searching!")
				})

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}