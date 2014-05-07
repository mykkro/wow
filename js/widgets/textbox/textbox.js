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
            var $e = $(element)
            var maxChars = $e.attr("maxchars") || 20
            var newElement = SvgHelper.group()
            var newId = Widgetizer.newWidgetId("wow-textfield-")
            var text = $e.text() || $e.attr("value") || ""
            var tb = new textbox({
                id: newId,
                parentNode: newElement,
                defaultVal: text,
                maxChars: maxChars,
                x: 0,
                y: 0,
                boxWidth: parseInt($e.attr("width") || 200),
                boxHeight: parseInt($e.attr("height") || 30),
                textYOffset: 22,
                textStyles: {
                    "font-family": "Arial,Helvetica",
                    "font-size": 15,
                    "fill": "dimgray"
                },
                boxStyles: {
                    "fill": "white",
                    "stroke": "dimgray",
                    "stroke-width": 1.5
                },
                cursorStyles: {
                    "stroke": "red",
                    "stroke-width": 1.5
                },
                selBoxStyles: {
                    "fill": "blue",
                    "opacity": 0.5
                },
                allowedChars: "[a-zA-Z ]",
                functionToCall: function(textboxId, value, changeType, enterPressed) {
                    ww._setValue(value)
                    // HACK -> we need to catch ENTER press event to trigger searching
                    if (enterPressed && ww.onEnterPressed) ww.onEnterPressed()
                }
            });
            var name = $e.attr("name")
            var ww = Widgetizer.inputWidget(widgetname, name, newElement, tb.getValue())
            ww.focus = function() {
                tb.focus()
            }
            ww.blur = function() {
                tb.release()
            }
            ww.setValue = function(value) {
                tb.setValue(value)
            }
            ww.onFocused = function(fun) {
                tb.onFocused = fun
            }
            if ($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
            if (done) done(ww)
            return ww
        }
        /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
