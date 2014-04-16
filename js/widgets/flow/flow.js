module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    var widgetname = "flow"

    var factory = function(element, done) {
        // children are already widgetized...
        var direction = $(element).attr("direction") || "right"
        var gap = parseInt($(element).attr("gap") || 0)
        var anchor = $(element).attr("anchor") || "middle"
        // we must find topmost widgets...
        var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
        subwidgets = _.map(nodes, function(e) {
            return Widgetizer.widgets[e.getAttribute("id")]
        })
        var boxes = _.map(subwidgets, function(sw) {
            return {
                x: 0,
                y: 0,
                w: sw.dim.width,
                h: sw.dim.height
            }
        })
        var gg = SvgHelper.group()
        var x = 0
        var y = 0
        var xmin = 0,
            ymin = 0,
            xmax = 0,
            ymax = 0
        var maxwidth = 0,
            maxheight = 0
            _.each(boxes, function(box) {
                maxwidth = Math.max(maxwidth, box.w)
                maxheight = Math.max(maxheight, box.h)
            })
            var horiz = !(direction == "up" || direction == "down")
        // apply anchor...
        _.each(boxes, function(box) {
            if (horiz) {
                // set y coordinates
                var y = 0
                if (anchor == "bottom") {
                    y = maxheight - box.h
                } else if (anchor == "middle") {
                    y = (maxheight - box.h) / 2
                }
                box.y = y
            } else {
                // set x coordinates
                var x = 0
                if (anchor == "right") {
                    x = maxwidth - box.w
                } else if (anchor == "middle") {
                    x = (maxwidth - box.w) / 2
                }
                box.x = x
            }
        })
        // apply direction...
        _.each(boxes, function(box) {
            if (direction == "right") {
                box.x = x
                x += box.w
                x += gap
                xmax = x
                ymax = Math.max(ymax, box.h)
            } else if (direction == "left") {
                x -= box.w
                x -= gap
                box.x = x
                xmin = x
                ymax = Math.max(ymax, box.h)
            } else if (direction == "up") {
                y -= box.h
                y -= gap
                box.y = y
                ymin = y
                xmax = Math.max(xmax, box.w)
            } else if (direction == "down") {
                box.y = y
                y += box.h
                y += gap
                ymax = y
                xmax = Math.max(xmax, box.w)
            }
        })
        // lay out widgets...
        _.each(subwidgets, function(widget, i) {
            var grp = SvgHelper.group()
            grp.appendChild(widget.element)
            // do layout...
            var box = boxes[i]
            SvgHelper.transform(grp, "translate(" + box.x + ", " + box.y + ")")
            gg.appendChild(grp)
        })
        SvgHelper.transform(gg, "translate(" + (-xmin) + "," + (-ymin) + ")")
        var name = $(element).attr("name")
        var ww = Widgetizer.widget(widgetname, name, gg, {
            width: xmax - xmin,
            height: ymax - ymin
        })
        if ($(element).attr("class")) SvgHelper.attr(ww.element, "class", ww.element.getAttribute("class") + " " + $(element).attr("class"))
        if (done) done(ww)
        return ww
    }

    /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory
    /* return instance */
    return factory

}
