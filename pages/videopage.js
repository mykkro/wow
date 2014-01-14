module.exports = function(window, $, SVG) {
	var page = {
		init: function(data, next) {
			var W = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			W.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			W.widgetize(window.document, function() {
				/* use data to modify page */
				var quitBtn = W.get("quitButton")
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				W.get("playButton").click(function() {
					window.player.playVideo()
					W.get("playButton").disable()
					W.get("pauseButton").enable()
					W.get("stopButton").enable()
				})
				W.get("pauseButton").click(function() {
					window.player.pauseVideo()
					W.get("playButton").enable()
					W.get("pauseButton").disable()
					W.get("stopButton").enable()
				})
				W.get("stopButton").click(function() {
					window.player.seekTo(0)
					window.player.stopVideo()
					W.get("playButton").enable()
					W.get("pauseButton").disable()
					W.get("stopButton").disable()
				})
				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}