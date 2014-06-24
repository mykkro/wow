// Commons.js

// commonly used functions.
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        }
    });
}

var Commons = {
    doAjax: function(method, uri, data, cb) {
        var opts = (method == "GET" || method == 'DELETE') ? {
            url: uri,
            type: method,
            contentType: "application/json; charset=utf-8"
        } : {
            url: uri,
            type: method,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        }
        $.ajax(opts).then(function(res) {
            if (!res.error) {
                cb(null, res)
            } else {
                cb(res.error)
            }
        })
    },
    /* find topmost nodes satisfying a condition */
    findTopmostNodes: function(node, inNodes, childrenOnly, condition) {
        if (!inNodes) inNodes = []
        if (!childrenOnly && node.nodeType == 1) {
            if (condition(node)) {
                inNodes.push(node)
                // do not search deeper in this subtree...
                return inNodes
            }
        }
        var children = node.children
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeType == 1) {
                // element --> recurse
                inNodes = this.findTopmostNodes(children[i], inNodes, false, condition)
            }
        }
        return inNodes
    }

}

module.exports = Commons
