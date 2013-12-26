/* Commonly used pieces of javascript */

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

/* Reverses a selection */
$.fn.reverse = [].reverse


/* Various polyfills */

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

/* commonly used DOM namespaces */
var wowNS = "http://example.org/wow"
var svgNS = "http://www.w3.org/2000/svg"


