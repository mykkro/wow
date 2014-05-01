module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    var widgetname = "plain"

    var factory = function(element, done) {
            var $e = $(element)
            var name = $e.attr("name")
                // placeholder
            var newElement = SvgHelper.group()
            var ww = Widgetizer.widget(widgetname, name, newElement)
            ww.element.removeChild(newElement);
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
