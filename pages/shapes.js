module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(data, next) {
			if(next) next(page)
		}
	}
	return page

}