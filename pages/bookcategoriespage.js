module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.uses(["piechart", "box", "grid", "flow", "textbox", "viewport", "image", "text"])
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize()
			/* use data to modify page */
			// ...
			/* continue when finished */
			if(next) next(page)
		}
	}
	return page

}