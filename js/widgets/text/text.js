module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "text"
		
	var factory = function(element, done) {
        var $e = $(element)
		var name = $e.attr("name")
		var width = parseFloat($e.attr("width") || 100)
		var height = parseFloat($e.attr("height") || 100)
		var klass = $e.attr("class")
		var text = $e.text()
		// TODO add class attribute to more widgets...
		// TODO correct calculation of bounding box
		var newElement = SvgHelper.mtext(text, {width:width,height:height,"class":klass})
        var ww = Widgetizer.widget(widgetname, name, newElement, {width:width, height:height})
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }