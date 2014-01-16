module.exports = function(window, $, SVG, i18n) {
	var page = {
		init: function(data, next) {
			var draw = SVG('svg1')

			// create image
			var image = draw.image('icons/SVG/air.svg')		
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
	}
	return page

}