module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "image"
				
	var factory = function(element, done) {
        var $e = $(element)
		var attrs = { width: 100, height: 100 }
		Widgetizer.getAttrs($e, attrs, { "width":"number", "height":"number", "src":"string", "class":"string", "name":"string"})
		var embed = Widgetizer.isTrueAttr($e, "embed")
		var newElement = SvgHelper.image(attrs) 
        var ww = Widgetizer.widget(widgetname, newElement, {width:attrs.width,height:attrs.height})
		if(embed) {
			// from: http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
			$.get(attrs.src, function(data) {
				// TODO this does not work here!
				console.log("Loading image for embedding...")
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg.removeAttr('xmlns:a');
				$svg.removeAttr('xml:space');
				$svg.removeAttr('enable-background');
				// remove fill attribute from svg subelements...
				//////$svg.find('*').removeAttr("fill");

				$svg.attr("width", attrs.width);         
				$svg.attr("height", attrs.height);
				console.log("SVG embedded!")
				$(ww.element).find("image").replaceWith($svg)
				if(done) done(ww)

			}, 'xml');
		
		} else {
			if(done) done(ww)
		}
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }