module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SVG = Widgetizer.SVG
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	/* widget name */
	var widgetname = "piechart"
	var PieChart = require("../../piechart")(window)
		
	/* the factory method */
	/* the actual implementation goes here... */
	var factory = function(element) {
      /* pie chart has several slices */
      var slices = $(element).filterNode("wow:pieslice")
      slices = _.map(slices, function(s) {
        var $s = $(s)
        return {label:$s.attr("label"), value:parseFloat($s.attr("value")), color:$s.attr("color")}
      })

      /* create pie chart */
      var newElement = PieChart(slices, 50, 50, 40, 110, 10)

	  return Widgetizer.widget(widgetname, newElement)
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory
	
	/* return instance */
	return factory
	
 }