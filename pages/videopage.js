module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* use data to modify page */
				$("g[name=quitButton]").click(function() {
					window.alert("Click!")
				})
				$("g[name=playButton]").click(function() {
					window.player.playVideo()
				})
				$("g[name=pauseButton]").click(function() {
					window.player.pauseVideo()
				})
				$("g[name=stopButton]").click(function() {
					window.player.stopVideo()
				})
				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}