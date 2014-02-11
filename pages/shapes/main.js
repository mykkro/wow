module.exports = function(window, $, SVG, i18n) {
	return {
		init: function(Widgetizer, data, next) {
			if(next) next(this)
		}
	}
}