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


			// put an internet radio here...
			var title = "Radio ZUSA"
			var freq = ""
			var url = "http://stream.radio-zusa.net:8000/zusa-hifi.ogg"

			$.playable('/swf/')			

			var link = $("<a>").attr("href", url).appendTo($("body")).playable()
			link.click()

			$("#labelRadioTitle").text(title)
			$("#labelRadioFreq").text(freq)

			/* continue when finished */
			if(next) next(this)
		}
	}

}