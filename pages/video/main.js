module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var Base = require("basejs")
	var SelectChain = require("../../js/selectchain")($, Base)

	var Auth  = {}//require("../lib/auth")(window)

	var VideoPage = BasePage.extend({
		init: function(Widgetizer, data, next) {
			var W = Widgetizer
			var server = Widgetizer.rpc
          	var videoId = data.query.id
			var userId = "555" //Auth.getLoggedUser().id
			var self = this

			/* use data to modify page */
			var quitBtn = W.get("quitButton")
			var favButton = W.get("favButton")
			var unfavButton = W.get("unfavButton")
			function setFavState(flag) {
				self.selectChain.hide()
				if(flag) {
					favButton.disable()
					unfavButton.enable()
				} else {
					favButton.enable()
					unfavButton.disable()
				}
				self.selectChain.show()
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
			self.play = function() {
				window.player.playVideo()
				W.get("playButton").disable()
				W.get("pauseButton").enable()
				W.get("stopButton").enable()
			}
			self.pause = function() {
				window.player.pauseVideo()
				W.get("playButton").enable()
				W.get("pauseButton").disable()
				W.get("stopButton").enable()
			}
			self.stop = function() {
				window.player.seekTo(0)
				window.player.stopVideo()
				W.get("playButton").enable()
				W.get("pauseButton").disable()
				W.get("stopButton").disable()
			}
			W.get("playButton").click(function() {
				self.play()
			})
			W.get("pauseButton").click(function() {
				self.pause()
			})
			W.get("stopButton").click(function() {
				self.stop()
			})

			$(window).unload(function(){
			  console.log("Bye.")
			  window.player.stopVideo()
			});
			this.selectChain = new SelectChain([favButton.element, unfavButton.element, quitBtn.element])
			/* continue when finished */
			if(next) next(this)
		},
		handleEvent: function(evt) {
			if(evt.device == "virtual") {
				switch(evt.control) {
					case "home":
						this.goToHomePage()
						break;
					case "play":
						this.play()
						break;
					case "pause":
						this.pause()
						break;
					case "stop":
						this.stop()
						break;
					case "up":
						this.selectChain.selectPrevious()
						break;
					case "down":
						this.selectChain.selectNext()
						break;
					case "select":
						$(this.selectChain.current()).click()
						this.selectChain.update()
						break;
				}
			}
		}

	})
	return VideoPage

}