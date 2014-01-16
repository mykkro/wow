module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* widgetization complete! */
				Widgetizer.get("quitButton").click(function() {
					// move back to previous page...
					window.history.go(-1)
				})

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}