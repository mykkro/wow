module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    var widgetname = "button"

    var factory = function(element, done) {
        var $e = $(element)
        var name = $e.attr("name")
        var attrs = {
            gap: 20,
            iconAt: "left",
            iconSize: 40,
            fontSize: 20,
            inset: 5
        }
        Widgetizer.getAttrs($e, attrs, {
            "icon": "string",
            "iconAt": "string",
            "gap": "number",
            "iconSize": "number",
            "fontSize": "number",
            "inset": "number",
            "width": "number",
            "height": "number"
        })
        var text = $e.text()
        var textElement = SvgHelper.text("", {
            "class": "wow-button-text"
        })
        var tspanElement = SvgHelper.tspan(text, {
            "font-size": attrs.fontSize + "px"
        })
        textElement.appendChild(tspanElement)
        var iconElement = SvgHelper.image({
            "width": attrs.iconSize,
            "height": attrs.iconSize,
            "class": "wow-button-icon",
            "src": attrs.icon
        })
        var box1 = SvgHelper.measure(textElement)
        var box2 = SvgHelper.measure(iconElement)
        var gap = 10
        var tx = 0
        var ty = 0
        var ww, hh
        switch (attrs.iconAt) {
            case "left":
                $(textElement).attr({
                    "text-anchor": "start",
                    "x": gap + box2.width,
                    "y": (box2.height + box1.height * 0.7) / 2
                })
                ww = box1.width + box2.width + gap
                hh = Math.max(box1.height, box2.height)
                tx = 0
                break;
            case "right":
                $(textElement).attr({
                    "text-anchor": "end",
                    "x": -gap,
                    "y": (box2.height + box1.height * 0.7) / 2
                })
                ww = box1.width + box2.width + gap
                hh = Math.max(box1.height, box2.height)
                tx = box1.width + gap
                break;
            case "top":
                $(textElement).attr({
                    "text-anchor": "middle",
                    "x": box2.width / 2,
                    "y": (box2.height + box1.height * 0.7 + gap)
                })
                tx = Math.max(box1.width / 2 - box2.width / 2, 0)
                hh = box1.height + box2.height + gap
                ww = Math.max(box1.width, box2.width)
                break;
            case "bottom":
                $(textElement).attr({
                    "text-anchor": "middle",
                    "x": box2.width / 2,
                    "y": -gap
                })
                ty = gap + box1.height
                tx = Math.max(box1.width / 2 - box2.width / 2, 0)
                hh = box1.height + box2.height + gap
                ww = Math.max(box1.width, box2.width)
                break;
        }
        tx += attrs.inset
        ty += attrs.inset
        hh += 2 * attrs.inset
        ww += 2 * attrs.inset
        if (attrs.width) {
            ww = attrs.width
        }
        if (attrs.height) {
            hh = attrs.height
        }
        var groupElement = SvgHelper.group({
            "transform": "translate(" + tx + "," + ty + ")"
        }, [textElement, iconElement])
        var ww = Widgetizer.widget(widgetname, name, groupElement, {
            width: ww,
            height: hh
        })
        if ($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
        if ($e.attr("class")) SvgHelper.attr(ww.element, "class", $e.attr("class"))
        if (done) done(ww)
        return ww
    }
    /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
