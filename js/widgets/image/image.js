module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SVG = Widgetizer.SVG
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
		var newElement = SVG.image(attrs, isTrueAttr($e, "embed")) 
        var ww = Widgetizer.widget(widgetname, newElement, {width:attrs.width,height:attrs.height})
		$e.moveChildren(ww.element)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }