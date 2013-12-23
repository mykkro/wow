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


/* commonly used DOM namespaces */
var wowNS = "http://example.org/wow"
var svgNS = "http://www.w3.org/2000/svg"
