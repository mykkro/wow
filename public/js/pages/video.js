require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"82ps1T":[function(require,module,exports){

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
},{}],"pagescript":[function(require,module,exports){
module.exports=require('82ps1T');
},{}]},{},["82ps1T"])