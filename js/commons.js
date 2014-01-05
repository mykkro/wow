if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}


var Commons = {
	/* find topmost nodes satisfying a condition */
	findTopmostNodes: function(node, inNodes, childrenOnly, condition) {
		if(!inNodes) inNodes = []
		if(!childrenOnly && node.nodeType == 1) {
			if(condition(node)) {
				inNodes.push(node)	
				// do not search deeper in this subtree...
				return inNodes
			}
		}		
		var children = node.children
		for(var i=0; i<children.length; i++) {
			if(children[i].nodeType == 1) {
				// element --> recurse
				inNodes = this.findTopmostNodes(children[i], inNodes, false, condition)
			}
		}
		return inNodes
	}
	  

}

module.exports = Commons