module.exports = function(window, $, SVG, i18n) {
	return {
		init: function(Widgetizer, data, next) {
			/* widgetization complete! */
			Widgetizer.get("quitButton").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})

			/* continue when finished */
			if(next) next(this)
		}
	}

}