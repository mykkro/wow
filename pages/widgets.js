module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(Widgetizer, data, next) {
			/* continue when finished */
			if(next) next(page)
		}
	}
	return page

}