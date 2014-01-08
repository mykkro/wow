module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			//var $ = Widgetizer.$
			var _ = Widgetizer._

			/* load widgets... */
			require("../js/widgets/piechart/piechart")(Widgetizer)
			require("../js/widgets/box/box")(Widgetizer)
			require("../js/widgets/grid/grid")(Widgetizer)
			require("../js/widgets/flow/flow")(Widgetizer)
			require("../js/widgets/textbox/textbox")(Widgetizer)
			require("../js/widgets/text/text")(Widgetizer)
			require("../js/widgets/viewport/viewport")(Widgetizer)
			require("../js/widgets/image/image")(Widgetizer)

			/* widgetize the entire page */
			Widgetizer.widgetize()
			
			// search for widgetized elements: $("[data-wow]")
			if(next) next(page)
		}
	}
	return page

}