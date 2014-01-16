module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
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