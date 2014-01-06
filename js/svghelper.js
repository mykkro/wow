
var SvgHelper = function(window) {
	var document = window.document
	var svgNS = "http://www.w3.org/2000/svg"
	var htmlNS = "http://www.w3.org/1999/xhtml"
	return {
		svg: function(dim, vbox, par) {
			if(!dim) dim = {}				
		    var bbe = document.createElementNS(svgNS, "svg");
			bbe.setAttribute("width", dim.width || 10);         
			bbe.setAttribute("height", dim.height || 10);			
			if(vbox) {
				bbe.setAttribute("viewBox", vbox.x+" "+vbox.y+" "+vbox.width+" "+vbox.height);			
			}
			if(par) {
				bbe.setAttribute("preserveAspectRatio", par)
			}
			return bbe;
		},
		box: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "rect");
			bbe.setAttribute("x", bbox.x || 0);             
			bbe.setAttribute("y", bbox.y || 0);
			bbe.setAttribute("width", bbox.width || 10);         
			bbe.setAttribute("height", bbox.height || 10);
			bbe.setAttribute("fill", bbox.fill || "none");  
			bbe.setAttribute("stroke", bbox.stroke || "black");  
			return bbe;
		},
		mtext: function(text, options) {				
		    var bbe = this.foreignObject(options)
			if(options) this.attrs(bbe, options)
			var p = document.createElementNS(htmlNS, "p")
			p.textContent = text
			bbe.appendChild(p)
			return bbe;
		},
		group: function(options) {
			var grp = document.createElementNS(svgNS, "g");
			if(options) this.attrs(grp, options)
			return grp
		},
		text: function(text, options) {
			var txt = document.createElementNS(svgNS, "text")
			txt.textContent = text
			if(options) this.attrs(txt, options)
			return txt
		},
		foreignObject: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "foreignObject");
			bbe.setAttribute("x", bbox.x || 0);             
			bbe.setAttribute("y", bbox.y || 0);
			bbe.setAttribute("width", bbox.width || 10);         
			bbe.setAttribute("height", bbox.height || 10);
			return bbe;
		},
		attrs: function(node, attrs) {
			for(var key in attrs) {
				node.setAttribute(key, attrs[key])
			}
			return node
		},
		attr: function(node, attr, value) {
			node.setAttribute(attr, value)
			return node
		},
		transform: function(node, tr) {
			node.setAttribute("transform", tr)
			return node
		},
		measure: function(node, tempGroupId) {
			if(node.nodeName == "svg" || node.nodename=="foreignObject") {
				/* svg and foreign object must be handled as special case */
				return { 
					x: parseFloat(node.getAttribute("x") || 0),
					y: parseFloat(node.getAttribute("y") || 0),
					width: parseFloat(node.getAttribute("width")),
					height: parseFloat(node.getAttribute("height"))
				}
			} 
  			var tempGroup = document.getElementById(tempGroupId || "tempgroup")
		    tempGroup.appendChild(node)
		    var bbox = node.getBBox()
		    tempGroup.removeChild(node)
		    return bbox
		}

	}
}

module.exports = SvgHelper