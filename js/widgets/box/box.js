module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "box"
		
	var factory = function(element, done) {
        var $e = $(element)
		var width = $e.attr("width") || 100
		var height = $e.attr("height") || 100
		var fill = $e.attr("fill") || "gray"
		var newElement = SvgHelper.box({width:width,height:height,fill:fill})
        var ww = Widgetizer.widget(widgetname, newElement)
		$e.moveChildren(ww.element)
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }