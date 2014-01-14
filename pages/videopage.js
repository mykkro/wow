module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* use data to modify page */
				var quitBtn = Widgetizer.get("quitButton")
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				Widgetizer.get("playButton").click(function() {
					window.player.playVideo()
				})
				Widgetizer.get("pauseButton").click(function() {
					window.player.pauseVideo()
				})
				Widgetizer.get("stopButton").click(function() {
					window.player.seekTo(0)
					window.player.stopVideo()
					// TODO rewind video to start
				})
				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}