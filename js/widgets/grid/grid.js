module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SVG = Widgetizer.SVG
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "grid"
		
	var factory = function(element) {
      // children are already widgetized...
      var uniformRows = ($(element).attr("uniformRows") == "true")
      var uniformColumns = ($(element).attr("uniformColumns") == "true")
      var rows = $(element).attr("rows") || 3
      var cols = $(element).attr("cols") || 3
      var halign = $(element).attr("halign") || "center"
      var valign = $(element).attr("valign") || "center"
	  // we must find topmost widgets...
	  var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
      subwidgets = _.map(nodes, function(e) {
        return Widgetizer.widgets[e.getAttribute("id")]
      })
      var boxes = _.map(subwidgets, function(sw) {
        return { x:0, y:0, w:sw.dim.width, h:sw.dim.height }
      })
      var gg = SVG.group()
      var x = 0
      var y = 0
      var xmin=0,ymin=0,xmax=0,ymax=0
      var maxwidth=0, maxheight=0
	  var maxwidths = []
	  var maxheights = []
	  for(var row=0; row<rows; row++) maxheights[row] = 0
	  for(var col=0; col<cols; col++) maxwidths[col] = 0	  
	  var col = 0
	  var row = 0
      _.each(boxes, function(box) {
        maxwidth = Math.max(maxwidth, box.w)
        maxheight = Math.max(maxheight, box.h)
		if(maxwidths[col] < box.w) maxwidths[col] = box.w
		if(maxheights[row] < box.h) maxheights[row] = box.h
		col++;
		if(col == cols) {
		  col = 0;
		  row++;
		}
		if(row == rows) {
			return
		}
      })
	  col = 0
	  row = 0
	  var x0 = 0
	  var y0 = 0
	  var cellWidth
	  var cellHeight
      _.each(subwidgets, function(widget) {
	    x = x0
		y = y0
		cellWidth = uniformColumns ?  maxwidth : maxwidths[col]
		cellHeight = uniformRows ? maxheight : maxheights[row]
		gg.appendChild(SVG.box({x:x, y:y, width:cellWidth, height:cellHeight, fill:((col+row)%2)?"#ffd":"#dff", stroke:"none"}))
		if(valign == "center") {
			y += (cellHeight-widget.dim.height)/2
		} else if(valign == "bottom") {
			y += (cellHeight-widget.dim.height)
		}
		if(halign == "center") {
			x += (cellWidth-widget.dim.width)/2
		} else if(halign == "right") {
			x += (cellWidth-widget.dim.width)
		}
		col++;
		x0 += cellWidth
		if(col == cols) {
		  col = 0;
		  x0 = 0
		  row++;
		  y0 += cellHeight
		}
        var grp = SVG.group()
        grp.appendChild(widget.element)		
        SVG.transform(grp, "translate("+x+", "+y+")")
        gg.appendChild(grp)
		if(row == rows) {
			return
		}
      })
      return Widgetizer.widget(widgetname, gg, {width: cols*maxwidth, height: rows*maxheight})
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }