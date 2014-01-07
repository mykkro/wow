module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SVG = Widgetizer.SVG
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "box"
		
	var factory = function(element) {
        var $e = $(element)
		var width = $e.attr("width") || 100
		var height = $e.attr("height") || 100
		var fill = $e.attr("fill") || "gray"
		var newElement = SVG.box({width:width,height:height,fill:fill})
        var ww = Widgetizer.widget(widgetname, newElement)
		$e.moveChildren(ww.element)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }