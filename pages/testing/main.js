module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var page = BasePage.extend({
		init: function(Widgetizer, data, next) {
			var draw = Widgetizer.SVGDoc

			// create image
			var image = draw.image('/icons/SVG/air.svg')		
			$("#btn1").click(function() {
			  var anim = image.animate(1000, SVG.easing.bounce).move(100, 100)
			})
		
			// create text
			var text = draw.text("Multiline\ntext").move(500, 0)
			text.font({
			  family: 'Source Sans Pro'
			, weight: 300
			, size: 30
			, style: 'italic'
			, anchor: 'middle'
			, leading: '1em'
			})
			if(next) next(page)
		}
	})
	return page

}