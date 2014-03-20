module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "bigbutton"
		

	var BigButtonWidget = Widgetizer.Widget.extend({
		setCaption: function(text) {
			var $e = $(this.element)
			$e.find(".caption").text(text)
			return this
		}
	})

	var factory = function(element, done) {
        var $e = $(element)


		var width = parseFloat($e.attr("width") || 280)
		var height = parseFloat($e.attr("height") || 155)
		var klass = $e.attr("class")
		var name = $e.attr("name")
		var text = $e.text()
		var gg = SvgHelper.group()		

		// TODO creation of classed widgets is too complicated, simplify it...
        var ww = Widgetizer.widgetByClass(
        	widgetname, 
        	name,
        	BigButtonWidget, 
        	gg, 
        	{width:width, height:height}
        )
        if($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
		Widgetizer.loadSvg({src:"/assets/previews/Button.svg"}, function($svg) {
			$(ww.element).append($svg)
			$svg.find(".background").addClass(klass)
			$svg.find(".caption").text(text)
			if(done) done(ww)
		})


		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }