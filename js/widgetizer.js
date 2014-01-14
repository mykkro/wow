module.exports = function(window, $) {
  console.log("Widgetizer script loading...")
  var document = window.document
  var Commons = require("./commons")
  var SvgHelper = require("./svghelper")(window)
  var _ = require("underscore")

	/* Finds all nodes with nodeName == name */
	$.fn.filterNode = function(name) {
	  return this.find('*').filter(function() {
		return this.nodeName === name;
	  });
	};

	/* Finds all nodes with name NAME:sometag */
	$.fn.filterByPrefix = function(name) {
	  return this.find('*').filter(function() {
		return this.nodeName.split(':')[0] === name;
	  });
	};


	/* copy contents from old element to new one */
	/* uses jQuery */
	$.fn.moveChildren = function(to) {
		this.children().each(function() {
				$(to).append($(this))
		})
	}

  
  var Widgetizer = {
	wowNS: "http://example.org/wow",
	svgNS: "http://www.w3.org/2000/svg",
	window: window,
	SvgHelper: SvgHelper,
    $: $,
	_: _,
	widgets: {},
	widgetizers: {},
	widgetId: 1,
	debug: false,
	newWidgetId: function(prefix) {
		return (prefix || "wow-widget-")+(this.widgetId++)
	},
	widget: function(type, element, dim) {
		var id = this.newWidgetId()
		var group = SvgHelper.attrs(SvgHelper.group(), {
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
		var bbox = SvgHelper.measure(group)
		if(!dim) dim = { 
			width: bbox.x+bbox.width,
			height: bbox.y+bbox.height
		}

		if(this.debug) {
			// add text with size info and ID
			var txt = SvgHelper.text(id+" ("+(dim.width).toFixed(1)+", "+(dim.height).toFixed(1)+")", {"x":dim.width, "y":10, "fill":"#333", "font-size":10, "font-family":"Verdana", "text-anchor":"end"})
			group.appendChild(txt)
			
			// add widget bounding box...
			var bbe = SvgHelper.box(bbox)
			SvgHelper.attr(bbe, "stroke", "blue");
			group.appendChild(bbe);   

			// add size box...
			var bbe = SvgHelper.box(dim)
			SvgHelper.attr(bbe, "stroke", "gray");
			group.appendChild(bbe);   
		}

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
	  widgetize: function(node, done) {
		var self = this
		var node = node || document
		var nodes = this.findWowNodes(node, [], true)
		var fun = function(ndx, next)  {
			if(ndx>=nodes.length) {
				if(done) done()
			} else {
				self.makeWidget(nodes[ndx], function() {				
					fun(ndx+1, next)
				})
			}
		}
		fun(0, done)
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
	  makeWidget: function(element, done) {
		/* if the widget has subwidgets, create them... */
		this.widgetize(element)
		/* create the widget */
		var type = element.nodeName.split(":")[1]
		var widgetizer = this.widgetizers[type]
		if(widgetizer) {
		  /* we can run widgetizer on an element... */
		  return widgetizer(element, function(w) {
			// replace element with output
			$(element).replaceWith(w.element)
			// console.log(output) -> this causes error under node=webkit on Windows
			if(done) done(w);
		  })
		} else {
		  console.warn("Unknown widget type: "+type)
		  if(done) done(null)
		  return null
		}
	  },
	  uses: function(widgets) {
		var self = this
		_.each(widgets, function(w){
			/* load widgets... */
			var widgetPath = "../js/widgets/"+w+"/"+w
			require(widgetPath)(self)
		})
	  },
	  useCommonWidgets: function() {
	  	this.uses([
	  		"piechart", 
	  		"box", 
	  		"grid", 
	  		"flow", 
	  		"textbox", 
	  		"viewport", 
	  		"image", 
	  		"text", 
	  		"iconbutton"
	  	])	  	
	  },
	  /* some utility methods */
	  	/* copy non null attributes to an object... */
		getAttrs: function(e, obj, attrmap) {
			for(var key in attrmap) {
				var type = attrmap[key] || "string"
				var val = e.attr(key)
				if(val) {
					/* type check... */
					if(type == "number") {
						val = parseFloat(val)
					}
					obj[key] = val
				}
			}
			return obj
		},
		isTrueAttr: function(e, attrName) {
			var attr = e.attr(attrName)
			if(attr=="true" || attr=="yes") return true;
			return false;		
		}

	}

	return Widgetizer 
}