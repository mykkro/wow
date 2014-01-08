module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			// do something...
			if(next) next(page)
		}
	}
	return page

}