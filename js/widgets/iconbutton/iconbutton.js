module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    var widgetname = "iconbutton"

    var factory = function(element, done) {
            var $e = $(element)
            var name = $e.attr("name")
            var attrs = {
                width: 100,
                height: 100
            }
            Widgetizer.getAttrs($e, attrs, {
                "width": "number",
                "height": "number",
                "src": "string"
            })
            if (!attrs.src.startsWith(".")) {
                attrs.src = "/assets/buttons/" + attrs.src + ".svg"
            }
            var newElement = SvgHelper.image(attrs)
            var ww = Widgetizer.widget(widgetname, name, newElement, {
                width: attrs.width,
                height: attrs.height
            })
            if ($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
                // TODO addClass 
            if ($e.attr("class")) SvgHelper.attr(ww.element, "class", $e.attr("class"))
            Widgetizer.loadSvg(attrs, function($svg) {
                console.log("SVG embedded!")
                $(ww.element).find("image").replaceWith($svg)
                if (done) done(ww)
            })
            return ww
        }
        /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
