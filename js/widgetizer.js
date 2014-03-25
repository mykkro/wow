// create a browserified version of widgetizer:
//  browserify -r./js/widgetizer:widgetizer -o public/js/widgetizer-bundle.js
module.exports = function(window, $, SVG) {
  console.log("Widgetizer script loading...")
  var document = window.document
  var Commons = require("./commons")
  var SvgHelper = require("./svghelper")(window)
  var Widget = require("./widget")($)
  var InputWidget = require("./inputwidget")($)
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
	SVG: SVG,
	SVGDoc: SVG('svg'),
    $: $,
	_: _,
	widgets: {},
	widgetizers: {},
	widgetId: 1,
	debug: false,
	Widget: Widget,
	newWidgetId: function(prefix) {
		return (prefix || "wow-widget-")+(this.widgetId++)
	},
	prepareWidgetData: function(type, name, element, dim) {
		var id = this.newWidgetId()
		var groupAttrs = {
		  "data-wow": type,
		  "id": id,
		  "class": "wow-widget "+type
		}
		if(name) groupAttrs.name = name
		var group = SvgHelper.attrs(SvgHelper.group(), groupAttrs)
		if(element) {
			if(element.length) {
			  // it is an array of elements!
			  _.each(element, function(e) {
				group.appendChild(e)
			  })
			} else {
			  // it is only one element
			  group.appendChild(element)
			}
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

		return {
		  element: group,
		  type: type,
		  id: id,
		  name: name,
		  bounds: {x:bbox.x, y:bbox.y, width:bbox.width,height:bbox.height},
		  dim: dim
		}
	  },
	  // TODO ability to create widgets of other classes than Widget
	  widget: function(type, name, element, dim) {
	  	return this.widgetByClass(type, name, Widget, element, dim)
	  },
	  widgetByClass: function(type, name, klass, element, dim) {
	  	var data = this.prepareWidgetData(type, name, element, dim)
	  	var w = new klass(data)
	  	this.widgets[data.id] = w
	  	return w
	  },
	  inputWidget: function(type, name, element, value, dim) {
	  	var data = this.prepareWidgetData(type, name, element, dim)
	  	data.value = value
	  	var w = new InputWidget(data)
	  	this.widgets[data.id] = w
	  	return w
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
	  findWidgetByName: function(node, name) {
	  	var id = $(node).find("g[name="+name+"]").attr("id")
	  	return this.widgets[id]
	  },
	  findWidgetById: function(node, id) {
	  	return this.widgets[id]
	  },
	  get: function(node, name) {
	  	if(!name) {
	  		name=node
	  		node=document
	  	}
	  	if(name.startsWith("#")) {
	  		return this.findWidgetById(node, name.substr(1))
	  	} else {
	  		return this.findWidgetByName(node, name)
	  	}
	  },
	  /* 
	   * Creates widget from wow: markup.
	   * element: DOM element to be transformed to Widget
	   * done: function(aWidget)  - callback to be called after widgetization
	   */
	  makeWidget: function(element, done) {
		/* if the widget has subwidgets, create them... */
		this.widgetize(element)
		/* create the widget */
		/* nodename has always prefix wow: */
		var type = element.nodeName.split(":")[1]
		/* locate a widgetizer... */
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
		  /* wrap the element to basic 'plain' Widget */
		  if(done) done(null)
		  return null
		}
	  },
	  /* 
	   * Creates a plain widget from an element
	   * element: DOM element to be transformed to Widget
	   * done: function(aWidget)  - callback to be called after widgetization
	   */
	  makePlainWidget: function(element, done) {
	  	/* create the wrapping group... */
	  	var grp = SvgHelper.group()
	  	$(element).replaceWith(grp)
	  	grp.appendChild(element)
	  	element = grp
		this.widgetize(element)
		/* create the widget */
		/* nodename has always prefix wow: */
		var type = "plain"
		/* locate a widgetizer... */
		var widgetizer = this.widgetizers[type]
	  	/* we can run widgetizer on an element... */
	  	return widgetizer(element, function(w) {
			// replace element with output
			$(element).replaceWith(w.element)
			// console.log(output) -> this causes error under node=webkit on Windows
			if(done) done(w);
	  	})
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
	  	/*
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
	  	*/	  	
	  	// browserify does not like dynamic requires...
		var self = this
		require("./widgets/piechart/piechart")(self)
		require("./widgets/box/box")(self)
		require("./widgets/grid/grid")(self)
		require("./widgets/flow/flow")(self)
		require("./widgets/textbox/textbox")(self)
		require("./widgets/viewport/viewport")(self)
		require("./widgets/image/image")(self)
		require("./widgets/text/text")(self)
		require("./widgets/iconbutton/iconbutton")(self)
		require("./widgets/bigbutton/bigbutton")(self)
		require("./widgets/plain/plain")(self)
		require("./widgets/button/button")(self)
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
		},
		// attrs = {width: height: src: }
		loadSvg: function(attrs, done) {
			$.get(attrs.src, function(data) {
				// TODO this does not work here!
				console.log("Loading image for embedding...")
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg.removeAttr('xmlns:a');
				$svg.removeAttr('xml:space');
				$svg.removeAttr('enable-background');

				$svg.attr("width", attrs.width);         
				$svg.attr("height", attrs.height);
				done($svg)

			}, 'xml');
		},
		rpc: function(method, params, cb) {
	        $.ajax({
	            type:"POST",
	            url: "http://localhost:9999/rpc",
	            data:{"jsonrpc":"2.0", "method":method, "params":params},
	            success: function (response){
	                cb(null, response)

	            },
	            fail: function(err) {
	                cb(err)
	            }
	        });
	    }

	}

	return Widgetizer 
}