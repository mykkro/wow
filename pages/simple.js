module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(data, next) {
			// do something...
			if(next) next(page)
		}
	}
	return page

}