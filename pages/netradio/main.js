module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var Base = require("basejs")
	var SelectChain = require("../../js/selectchain")($, Base)

	$.playable('/swf/')			

	return BasePage.extend({
		radios: [
		  { "name": "Klassik Radio", "src": "http://edge.live.mp3.mdn.newmedia.nacamar.net/klassikradio128/livestream.mp3"},
		  { "name": "Sport 1 FM", "src": "http://stream.sport1.fm/api/livestream-redirect/SPORT1FM_24_7.mp3"},
		  { "name": "Antenne 1", "src": "http://stream.antenne1.de/stream1/livestream.mp3"},
		  { "name": "Radio FFN", "src": "http://player.ffn.de/ffn.mp3"},
		  { "name": "Ostseewelle", "src": "http://edge.live.mp3.mdn.newmedia.nacamar.net/ostseewellelive/livestream.mp3"},
		  { "name": "Radio 21", "src": "http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-radio21/livestream.mp3"},
		  { "name": "Radio ZUSA", "src": "http://stream.radio-zusa.net:8000/zusa-hifi.ogg"},
		  { "name": "Kronhit 90sDance", "src": "http://onair.krone.at/kronehit-90sdance.mp3"} 
		],
		currentTrack: 6,
		playPreviousTrack: function() {
			this.stopPlaying()
			this.currentTrack = (this.currentTrack + this.radios.length - 1) % this.radios.length;
			this.startPlaying(this.radios[this.currentTrack])
		},
		playNextTrack: function() {
			this.stopPlaying()
			this.currentTrack = (this.currentTrack + 1) % this.radios.length;
			this.startPlaying(this.radios[this.currentTrack])
		},
		startPlaying: function(radio) {
			var self = this
			$("#labelRadioTitle").text(radio.name)
			$("#labelRadioFreq").text("")
			self.link = $(self.playlist.children()[self.currentTrack])
			self.link.click()
		},
		stopPlaying: function() {
			soundManager.stopAll()
		},
		createPlaylist: function() {
			var out = $('<div id="netradio-playlist" style="display: none;">')
			for(var i=0;i<this.radios.length; i++) {
				out.append($("<a>").text(this.radios[i].name).attr("href", this.radios[i].src))
			}
			return out
		},
		init: function(data, next) {
			var self = this
			/* widgetization complete! */
			this.getWidget("quitButton").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})
			this.getWidget("homeButton").click(function() {
				// move back to previous page...
				window.location.href = "/pages/home"
			})
			this.getWidget("prevButton").click(function() {
				self.playPreviousTrack()
			})
			this.getWidget("nextButton").click(function() {
				self.playNextTrack()
			})
			
			
			self.playlist = self.createPlaylist().appendTo($("body"))
			self.playlist = $(self.playlist).playable()
						
			this.startPlaying(this.radios[this.currentTrack])

			this.selectChain = new SelectChain([
				self.getWidget("homeButton").element,
				self.getWidget("quitButton").element
			])

			/* continue when finished */
			if(next) next(this)
		},
		onVirtualControl: function(evt) {
			switch(evt.control) {
				case "home":
					this.goToHomePage()
					break;
				case "left":
					this.playPreviousTrack()
					break;
				case "right":
					this.playNextTrack()
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
	})

}