module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    var widgetname = "image"


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
            "src": "string",
            "class": "string",
            "name": "string"
        })
        var embed = Widgetizer.isTrueAttr($e, "embed")
        var newElement = SvgHelper.image(attrs)
        var ww = Widgetizer.widget(widgetname, name, newElement, {
            width: attrs.width,
            height: attrs.height
        })
        if (embed) {
            Widgetizer.loadSvg(attrs, function($svg) {
                console.log("SVG embedded!")
                $(ww.element).find("image").replaceWith($svg)
                if (done) done(ww)
            })
        } else {
            if (done) done(ww)
        }
        return ww
    }
    /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
