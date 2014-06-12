module.exports = function(Widgetizer) {
    /* common fields... */
    var window = Widgetizer.window
    var SvgHelper = Widgetizer.SvgHelper
    var $ = Widgetizer.$
    var _ = Widgetizer._

    /***********************************************************************************************************/
    /* widget name */
    var widgetname = "piechart"
    var PieChart = require("../../PieChart")(window)

    /* the factory method */
    /* the actual implementation goes here... */
    var factory = function(element, done) {
            /* pie chart has several slices */
            var name = $(element).attr("name")
            var slices = $(element).filterNode("wow:pieslice")
            slices = _.map(slices, function(s) {
                var $s = $(s)
                return {
                    label: $s.attr("label"),
                    value: parseFloat($s.attr("value")),
                    color: $s.attr("color")
                }
            })

            /* create pie chart */
            var newElement = PieChart(slices, 50, 50, 40, 110, 10)

            var ww = Widgetizer.widget(widgetname, name, newElement)
            if (done) done(ww)
            return ww
        }
        /***********************************************************************************************************/

    /* register it... */
    Widgetizer.widgetizers[widgetname] = factory

    /* return instance */
    return factory

}
