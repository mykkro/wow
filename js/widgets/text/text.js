module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SVG = Widgetizer.SVG
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "text"
		
	var factory = function(element) {
        var $e = $(element)
		var width = parseFloat($e.attr("width") || 100)
		var height = parseFloat($e.attr("height") || 100)
		var klass = $e.attr("class")
		var text = $e.text()
		// TODO add class attribute to more widgets...
		// TODO correct calculation of bounding box
		var newElement = SVG.mtext(text, {width:width,height:height,"class":klass})
        var ww = Widgetizer.widget(widgetname, newElement, {width:width, height:height})
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }