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
        var name = $e.attr("name")
        var width = $e.attr("width") || 100
        var height = $e.attr("height") || 100
        var fill = $e.attr("fill") || "gray"
        var stroke = $e.attr("stroke") || "black"
        var newElement = SvgHelper.box({
            width: width,
            height: height,
            fill: fill,
            stroke: stroke
        })
        var ww = Widgetizer.widget(widgetname, name, newElement)
        $e.moveChildren(ww.element)
        if (done) done(ww)
        return ww
    }
    /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
