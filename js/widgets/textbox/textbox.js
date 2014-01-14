module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._
	var svgsvg = window.document.getElementById("svg")
	var textbox = require("../../carto.net/textbox")(window, svgsvg)

	/***********************************************************************************************************/
	var widgetname = "textbox"
		
	var factory = function(element, done) {
		var maxChars = $(element).attr("maxchars") || 20
		var newElement = SvgHelper.group()
		var newId = Widgetizer.newWidgetId("wow-textfield-")
		var text = $(element).text() || $(element).attr("value") || ""
		var tb = new textbox({
			id: newId,
			parentNode: newElement,
			defaultVal: text, 
			maxChars: maxChars,
			x: 0,
			y: 0,
			boxWidth: parseInt($(element).attr("width") || 200),
			boxHeight: parseInt($(element).attr("height") || 30),
			textYOffset: 22,
			textStyles: {"font-family":"Arial,Helvetica","font-size":15,"fill":"dimgray"},
			boxStyles: {"fill":"white","stroke":"dimgray","stroke-width":1.5},
			cursorStyles: {"stroke":"red","stroke-width":1.5},
			selBoxStyles: {"fill":"blue","opacity":0.5},
			allowedChars: "[a-zA-Z ]",
			functionToCall: function(textboxId, value, changeType) { console.log(value); }
		});
		var ww = Widgetizer.widget(widgetname, newElement)
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }