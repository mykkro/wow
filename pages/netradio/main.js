module.exports = function(window, $, SVG, i18n) {
	return {
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
			$("#labelRadioTitle").text(radio.name)
			self.link = $("<a>").attr("href", radio.src).appendTo($("body")).playable()
			self.link.click()
		},
		stopPlaying: function() {
			var playable = self.link.data('playable')
			if(playable) playable.stop(true)
			self.link.remove()
		},
		init: function(Widgetizer, data, next) {
			var self = this
			/* widgetization complete! */
			Widgetizer.get("quitButton").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})
			Widgetizer.get("homeButton").click(function() {
				// move back to previous page...
				window.location.href = "/pages/home"
			})
			Widgetizer.get("prevButton").click(function() {
				self.playPreviousTrack()
			})
			Widgetizer.get("nextButton").click(function() {
				self.playNextTrack()
			})
			
			// put an internet radio here...
			var title = "Radio ZUSA"
			var freq = ""
			var url = self.radios[6].src

			$.playable('/swf/')			

			$("#labelRadioTitle").text(title)
			$("#labelRadioFreq").text(freq)
			
			this.startPlaying(this.radios[this.currentTrack])


			/* continue when finished */
			if(next) next(this)
		}
	}

}