module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "image"
		
	/* copy non null attributes to an object... */
	var getAttrs = function(e, obj, attrmap) {
		for(var key in attrmap) {
			var type = attrmap[key] || "string"
			var val = e.attr(key)
			if(val) {
				/* type check... */
				if(type == "number") {
					val = parseFloat(val)
				}
				obj[key] = val
			}
		}
		return obj
	}
	
	isTrueAttr = function(e, attrName) {
		var attr = e.attr(attrName)
		if(attr=="true" || attr=="yes") return true;
		return false;		
	}
		
	var factory = function(element) {
        var $e = $(element)
		var attrs = { width: 100, height: 100 }
		getAttrs($e, attrs, { "width":"number", "height":"number", "src":"string", "class":"string", "name":"string"})
		var embed = isTrueAttr($e, "embed")
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
				$svg.find('*').removeAttr("fill");

				$svg.attr("width", attrs.width);         
				$svg.attr("height", attrs.height);
				console.log("SVG embedded!")
				$(ww.element).find("image").replaceWith($svg)

			}, 'xml');
		
		}

		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }