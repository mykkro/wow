
module.exports = function(window, $, SVG, i18n) {
	var Auth  = {}//require("../lib/auth")(window)



	var page = {
		init: function(Widgetizer, data, next) {
			var W = Widgetizer
			var server = Widgetizer.rpc
          	var videoId = data.query.id
			var userId = "555" //Auth.getLoggedUser().id

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
			server("videoIsStarred", {userId:userId, videoId:videoId}, function(err, data) {
				setFavState(!err && data.result)
			})
			favButton.click(function() {
				server("videoStar", {userId:userId, videoId:videoId}, function(err, data) {
					if(!err) setFavState(true)
				})					
			})
			unfavButton.click(function() {
				server("videoUnstar", {userId:userId, videoId:videoId}, function(err, data) {
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

			$(window).unload(function(){
			  console.log("Bye.")
			  window.player.stopVideo()
			});

			/* continue when finished */
			if(next) next(page)
		}
	}
	return page

}