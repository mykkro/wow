module.exports = function(window, $, SVG, i18n) {

	var Auth  = require("../lib/auth")(window)
	var FavVids = require("../lib/dao/favoritevideos")

	var page = {
		init: function(data, next) {
			var W = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			W.useCommonWidgets()

			var url = require("url")
        	var parsedUrl = url.parse(window.location.href, true)
          	var videoId = parsedUrl.query.id
			var userId = Auth.getLoggedUser().id

			/* transform wow:markup to SVG and widgets */
			W.widgetize(window.document, function() {
				/* use data to modify page */
				var quitBtn = W.get("quitButton")
				var favButton = W.get("favButton")
				var unfavButton = W.get("unfavButton")
				function setFavState(flag) {
					if(flag) {
						favButton.disable()
						unfavButton.enable()
					} else {
						favButton.enable()
						unfavButton.disable()
					}
				}
				FavVids.starred(userId, videoId, function(err, data) {
					setFavState(!err && data)
				})
				favButton.click(function() {
					FavVids.star(userId, videoId, function(err, data) {
						if(!err) setFavState(true)
					})					
				})
				unfavButton.click(function() {
					FavVids.unstar(userId, videoId, function(err, data) {
						if(!err) setFavState(false)
					})					
				})
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