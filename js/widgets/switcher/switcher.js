module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "switcher"

  var SwitcherWidget = Widgetizer.Widget.extend({
    constructor: function(data) {
      this.base(data)
      this.setActive(0)
    },
    setActive: function(index) {
      this.active = index
      var $e = $(this.element)
      var opts = $e.children().first().children()
      opts.each(function(i) {
        var isActive = (i == index)
        $(this).css("display",isActive ? "inline" : "none")
      })
      return this
    }
  })
		
	var factory = function(element, done) {
      // children are already widgetized...
      var active = parseInt($(element).attr("active") || 0)
	    // we must find topmost widgets...
	    var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
      subwidgets = _.map(nodes, function(e) {
        return Widgetizer.widgets[e.getAttribute("id")]
      })
      var boxes = _.map(subwidgets, function(sw) {
        return { x:0, y:0, w:sw.dim.width, h:sw.dim.height }
      })
      var gg = SvgHelper.group({"class":"switcher-options"})
      var x = 0
      var y = 0
      var xmin=0,ymin=0,xmax=0,ymax=0
      var maxwidth=0, maxheight=0
      _.each(boxes, function(box) {
        maxwidth = Math.max(maxwidth, box.w)
        maxheight = Math.max(maxheight, box.h)
      })
      // lay out widgets...
      _.each(subwidgets, function(widget, i) {
        var grp = SvgHelper.group({"class":"switcher-option"})
        grp.appendChild(widget.element)
        gg.appendChild(grp)
      })
      var name = $(element).attr("name")
      var ww = Widgetizer.widgetByClass(
          widgetname, 
          name,
          SwitcherWidget, 
          gg, 
          {width:maxwidth, height:maxheight}
      )
	    if(done) done(ww)
	    return ww
    }

	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
