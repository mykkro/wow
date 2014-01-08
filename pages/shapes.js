module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			if(next) next(page)
		}
	}
	return page

}