module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "viewport"
		
	var factory = function(element, ww) {
        var $e = $(element)
		var width = parseFloat($e.attr("width") || 100)
		var height = parseFloat($e.attr("height") || 100)
		var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
		var dim = {width:width,height:height}
		var vbox = null // viewbox
		var vboxAttr = element.getAttribute("viewBox")
		var par = element.getAttribute("preserveAspectRatio") || "xMidYMid meet"
		// console.log($e.attr("preserveAspectRatio")) --> this does not work!
		if(!vboxAttr) {
			if(nodes.length == 1) {
				var widget = Widgetizer.widgets[nodes[0].getAttribute("id")]			
				// one single subwidget... get its size
				vbox = { x:0, y:0, width: widget.dim.width, height: widget.dim.height }
			} else {
				// get bounding box of the contents and set viewbox accordingly...
				var g = SvgHelper.group()
				$e.moveChildren(g)
				var bbox = SvgHelper.measure(g)
				vbox = { x:bbox.x, y:bbox.y, width: bbox.width, height: bbox.height }
				$(g).moveChildren($e)
			}
		} 
		var newElement = SvgHelper.svg(dim, vbox, par)
		if(vboxAttr) newElement.setAttribute("viewBox", vboxAttr)
		var name = $e.attr("name")
        var ww = Widgetizer.widget(widgetname, name, newElement, dim)
		$e.moveChildren(newElement)
		if(done) done(ww)		
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }