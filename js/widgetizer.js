module.exports = function(window, document, SVG) {
  var Commons = require("./commons")
  var _ = require("underscore")
  var $ = require("jquery")(window)

  var Widgetizer = {
	widgets: {},
	widgetizers: {},
	widgetId: 1,
	newWidgetId: function(prefix) {
		return (prefix || "wow-widget-")+(this.widgetId++)
	},
	widget: function(type, element, dim) {
		var id = this.newWidgetId()
		var group = SVG.attrs(SVG.group(), {
		  "data-wow": type,
		  "id": id
		})
		if(element.length) {
		  // it is an array of elements!
		  _.each(element, function(e) {
			group.appendChild(e)
		  })
		} else {
		  // it is only one element
		  group.appendChild(element)
		}

		// in order to get bounding box, the node must be inserted in the DOM
		var bbox = SVG.measure(group)
		if(!dim) dim = { 
			width: bbox.x+bbox.width,
			height: bbox.y+bbox.height
		}

		// add text with size info and ID
		var txt = SVG.text(id+" ("+(dim.width).toFixed(1)+", "+(dim.height).toFixed(1)+")", {"x":dim.width, "y":10, "fill":"#333", "font-size":10, "font-family":"Verdana", "text-anchor":"end"})
		group.appendChild(txt)
		
		// add widget bounding box...
		var bbe = SVG.box(bbox)
		SVG.attr(bbe, "stroke", "blue");
		group.appendChild(bbe);   

		// add size box...
		var bbe = SVG.box(dim)
		SVG.attr(bbe, "stroke", "gray");
		group.appendChild(bbe);   

		// return widget object
		this.widgets[id] = {
		  element: group,
		  type: type,
		  id: id,
		  bounds: {x:bbox.x, y:bbox.y, width:bbox.width,height:bbox.height},
		  dim: dim
		}
		return this.widgets[id]
	  },
	  /* make widgets from node's descendants... */
	  widgetize: function(node) {
		var self = this
		var node = node || document
		var nodes = this.findWowNodes(node, [], true)
		_.each(nodes, function(element) {
			self.makeWidget(element)
		})
	  },
	  findWidgetizedNodes: function(node, inNodes, childrenOnly) {
		return Commons.findTopmostNodes(node, inNodes, childrenOnly, function(node) {
			return !!$(node).attr("data-wow")
		})
	  },
	  findWowNodes: function(node, inNodes, childrenOnly) {
		return Commons.findTopmostNodes(node, inNodes, childrenOnly, function(node) {
			return node.nodeName.startsWith("wow:")
		})
	  },
	  makeWidget: function(element) {
		/* if the widget has subwidgets, create them... */
		this.widgetize(element)
		/* create the widget */
		var type = element.nodeName.split(":")[1]
		var widgetizer = this.widgetizers[type]
		if(widgetizer) {
		  /* we can run widgetizer on an element... */
		  var output = widgetizer(element)
		  if(output) {        
			// replace element with output
			$(element).replaceWith(output.element)
			// console.log(output) -> this causes error under node=webkit on Windows
			return output;
		  }
		} else {
		  console.warn("Unknown widget type: "+type)
		  return null
		}
	  }
	}

	return Widgetizer 
}