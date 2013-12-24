
var SvgHelper = function(document) {
	var svgNS = "http://www.w3.org/2000/svg"
	return {
		box: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "rect");
			bbe.setAttribute("x", bbox.x || 0);             
			bbe.setAttribute("y", bbox.y || 0);
			bbe.setAttribute("width", bbox.width || 10);         
			bbe.setAttribute("height", bbox.height || 10);
			bbe.setAttribute("fill", "none");  
			return bbe;
		},
		group: function() {
			var grp = document.createElementNS(svgNS, "g");
			return grp
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
  			var tempGroup = document.getElementById(tempGroupId || "tempgroup")
		    tempGroup.appendChild(node)
		    var bbox = node.getBBox()
		    tempGroup.removeChild(node)
		    return bbox
		}

	}
}

module.exports = SvgHelper