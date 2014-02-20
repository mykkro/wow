module.exports = function(window, $, SVG, i18n) {
	return {
		init: function(Widgetizer, data, next) {
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