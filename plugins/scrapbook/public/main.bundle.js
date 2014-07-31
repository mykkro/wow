//
//  jquery.xmlns.js:  xml-namespace selector support for jQuery
//
//  This plugin modifies the jQuery tag and attribute selectors to
//  support optional namespace specifiers as defined in CSS 3:
//
//    $("elem")      - matches 'elem' nodes in the default namespace
//    $("|elem")     - matches 'elem' nodes that don't have a namespace
//    $("NS|elem")   - matches 'elem' nodes in declared namespace 'NS'
//    $("*|elem")    - matches 'elem' nodes in any namespace
//    $("NS|*")      - matches any nodes in declared namespace 'NS'
//
//  A similar synax is also supported for attribute selectors, but note
//  that the default namespace does *not* apply to attributes - a missing
//  or empty namespace selector selects only attributes with no namespace.
//
//  In a slight break from the W3C standards, and with a nod to ease of
//  implementation, the empty namespace URI is treated as equivalent to
//  an unspecified namespace.  Plenty of browsers seem to make the same
//  assumption...
//
//  Namespace declarations live in the $.xmlns object, which is a simple
//  mapping from namespace ids to namespace URIs.  The default namespace
//  is determined by the value associated with the empty string.
//
//    $.xmlns.D = "DAV:"
//    $.xmlns.FOO = "http://www.foo.com/xmlns/foobar"
//    $.xmlns[""] = "http://www.example.com/new/default/namespace/"
//
//  Unfortunately this is a global setting - I can't find a way to do
//  query-object-specific namespaces since the jQuery selector machinery
//  is stateless.  However, you can use the 'xmlns' function to push and
//  pop namespace delcarations with ease:
//
//    $().xmlns({D:"DAV:"})     // pushes the DAV: namespace
//    $().xmlns("DAV:")         // makes DAV: the default namespace
//    $().xmlns(false)          // pops the namespace we just pushed
//    $().xmlns(false)          // pops again, returning to defaults
//
//  To execute this as a kind of "transaction", pass a function as the
//  second argument.  It will be executed in the context of the current
//  jQuery object:
//
//    $().xmlns("DAV:",function() {
//      //  The default namespace is DAV: within this function,
//      //  but it is reset to the previous value on exit.
//      return this.find("response").each(...);
//    }).find("div")
//
//  If you pass a string as a function, it will be executed against the
//  current jQuery object using find(); i.e. the following will find all
//  "href" elements in the "DAV:" namespace:
//
//    $().xmlns("DAV:","href")
//
// 
//  And finally, the legal stuff:
//
//    Copyright (c) 2009, Ryan Kelly.
//    TAG and ATTR functions derived from jQuery's selector.js.
//    Dual licensed under the MIT and GPL licenses.
//    http://docs.jquery.com/License
//

(function($) {

var jquery_gt_18 = jQuery.fn.jquery >= "1.8";
//  Some common default namespaces, that are treated specially by browsers.
//
var default_xmlns = {
    "xml": "http://www.w3.org/XML/1998/namespace",
    "xmlns": "http://www.w3.org/2000/xmlns/",
    "html": "http://www.w3.org/1999/xhtml/"
};
 
rbackslash = /\\(?!\\)/g;

//  A reverse mapping for common namespace prefixes.
//
var default_xmlns_rev = {}
for(var k in default_xmlns) {
    default_xmlns_rev[default_xmlns[k]] = k;
}


//  $.xmlns is a mapping from namespace identifiers to namespace URIs.
//  The default default-namespace is "*", and we provide some additional
//  defaults that are specified in the XML Namespaces standard.
//
$.extend({xmlns: $.extend({},default_xmlns,{"":"*"})});


//  jQuery method to push/pop namespace declarations.
//
//  If a single argument is specified:
//    * if it's a mapping, push those namespaces onto the stack
//    * if it's a string, push that as the default namespace
//    * if it evaluates to false, pop the latest namespace
//
//  If two arguments are specified, the second is executed "transactionally"
//  using the namespace declarations found in the first.  It can be either a
//  a selector string (in which case it is passed to this.find()) or a function
//  (in which case it is called in the context of the current jQuery object).
//  The given namespace mapping is automatically pushed before executing and
//  popped afterwards.
//
var xmlns_stack = [];
$.fn.extend({xmlns: function(nsmap,func) {
    if(typeof nsmap == "string") {
        nsmap = {"":nsmap};
    }
    if(nsmap) {
        xmlns_stack.push($.xmlns);
        $.xmlns = $.extend({},$.xmlns,nsmap);
        if(func !== undefined) {
            if(typeof func == "string") {
                return this.find(func).xmlns(undefined)
            } else {
                var self = this;
                try {
                    self = func.call(this);
                    if(!self) {
                        self = this;
                    }
                } finally {
                    self.xmlns(undefined);
                }
                return self
            }
        } else {
            return this;
        }
    } else {
        $.xmlns = (xmlns_stack ? xmlns_stack.pop() : {});
        return this;
    }
}});


//  Convert a namespace prefix into a namespace URI, based
//  on the delcarations made in $.xmlns.
//
var getNamespaceURI = function(id) {
    // No namespace id, use the default.
    if(!id) {
        return $.xmlns[""];
    }
    // Strip the pipe character from the specifier
    id = id.substr(0,id.length-1);
    // Certain special namespaces aren't mapped to a URI
    if(id == "" || id == "*") {
        return id;
    }
    var ns = $.xmlns[id];
    if(typeof(ns) == "undefined") {
        throw "Syntax error, undefined namespace prefix '" + id + "'";
    }
    return ns;
};


//  Update the regex used by $.expr to parse selector components for a
//  particular type of selector (e.g. "TAG" or "ATTR").
//
//  This logic is taken straight from the jQuery/Sizzle sources.
//
var setExprMatchRegex = (jquery_gt_18) ? function(type,regex) {
        $.expr.match[type] = regex;
    } : function(type,regex) {
      $.expr.match[type] = new RegExp(regex.source + /(?![^\[]*\])(?![^\(]*\))/.source);
      if($.expr.leftMatch) {
          $.expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + $.expr.match[type].source.replace(/\\(\d+)/g, function(all, num){
              return "\\" + (num - 0 + 1);
          }));
      }
    };

//  Modify the TAG match regexp to include optional namespace selector.
//  This is basically (namespace|)?(tagname).
//
if (jquery_gt_18) {
    setExprMatchRegex("TAG",/^((?:((?:\\.|[-\w*]|[^\x00-\xa0])+\|)?((?:\\.|[-\w*]|[^\x00-\xa0])+)))/);
} else {
    setExprMatchRegex("TAG",/^((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)))/);
}

//  Perform some capability-testing.
//
var div = document.createElement("div");

//  Sometimes getElementsByTagName("*") will return comment nodes,
//  which we will have to remove from the results.
//
var gebtn_yields_comments = false;
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length > 0) {
    gebtn_yields_comments = true;
}

//  Some browsers return node.localName in upper case, some in lower case.
//
var localname_is_uppercase = true;
if(div.localName && div.localName == "div") {
    localname_is_uppercase = false;
}

//  Allow the testing div to be garbage-collected.
//
div = null;

//  Modify the TAG find function to account for a namespace selector.
//
$.expr.find.TAG = function(match,context,isXML) {
    if (!jQuery.isArray(match)) {
        if ( typeof context.getElementsByTagName !== "undefined" ) {
            return context.getElementsByTagName(match);
        }
    }
    var ns = getNamespaceURI(match[2]);
    var ln = match[3];
    var res;
    if(typeof context.getElementsByTagNameNS != "undefined") {
        //  Easy case - we have getElementsByTagNameNS
        res = context.getElementsByTagNameNS(ns,ln);
    } else if(typeof context.selectNodes != "undefined") {
        //  Use xpath if possible (not available on HTML DOM nodes in IE)
        if(context.ownerDocument) {
            context.ownerDocument.setProperty("SelectionLanguage","XPath");
        } else {
            context.setProperty("SelectionLanguage","XPath");
        }
        var predicate = "";
        if(ns != "*") {
            if(ln != "*") {
                predicate="namespace-uri()='"+ns+"' and local-name()='"+ln+"'";
            } else {
                predicate="namespace-uri()='"+ns+"'";
            }
        } else {
            if(ln != "*") {
                predicate="local-name()='"+ln+"'";
            }
        }
        if(predicate) {
            res = context.selectNodes("descendant-or-self::*["+predicate+"]");
        } else {
            res = context.selectNodes("descendant-or-self::*");
        }
    } else {
        //  Otherwise, we need to simulate using getElementsByTagName
        res = context.getElementsByTagName(ln); 
        if(gebtn_yields_comments && ln == "*") {
            var tmp = [];
            for(var i=0; res[i]; i++) {
                if(res[i].nodeType == 1) {
                    tmp.push(res[i]);
                }
            }
            res = tmp;
        }
        if(res && ns != "*") {
            var tmp = [];
            for(var i=0; res[i]; i++) {
               if(res[i].namespaceURI == ns || res[i].tagUrn == ns) {
                   tmp.push(res[i]);
               }
            }
            res = tmp;
        }
    }
    return res;
};


//  Check whether a node is part of an XML document.
//  Copied verbatim from jQuery sources, needed in TAG preFilter below.
//
var isXML = function(elem){
    return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
            !!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
};

//  Modify the TAG preFilter function to work with modified match regexp.
//  This normalises case of the tag name if we're in a HTML document.
//
$.expr.preFilter.TAG = function(match, curLoop, inplace, result, not, isXML) {
  var ln = match[3];
  if(!isXML) {
      if(localname_is_uppercase) {
          ln = ln.toUpperCase();
      } else {
          ln = ln.toLowerCase();
      }
  }
  return [match[0],getNamespaceURI(match[2]),ln];
};

function filter_tag(ns, ln) {
    return function( elem ) {
        var e_ns = elem.namespaceURI ? elem.namespaceURI : elem.tagUrn;
        var e_ln = elem.localName ? elem.localName : elem.tagName;
        if(ns == "*" || e_ns == ns || (ns == "" && !e_ns)) {
            return ((ln == "*" && elem.nodeType == 1)  || e_ln == ln);
        }
        
        return false;
    };
};

//Modify the TAG filter function to account for a namespace selector.
//
$.expr.filter.TAG = (jquery_gt_18)? filter_tag : function(elem, match) {
    var ns = match[1];
    var ln = match[2];
    return filter_tag(ns, ln).call(this, elem, null);
};

//  Modify the ATTR match regexp to extract a namespace selector.
//  This is basically ([namespace|])(attrname)(op)(quote)(pattern)(quote)
//
if (jquery_gt_18) {
    setExprMatchRegex("ATTR",/^\[[\x20\t\r\n\f]*(((?:\\.|[-\w]|[^\x00-\xa0])+\|)?((?:\\.|[-\w]|[^\x00-\xa0])+))[\x20\t\r\n\f]*(?:([*^$|!~]?=)[\x20\t\r\n\f]*(?:(['"])((?:\\.|[^\\])*?)\5|((?:\\.|[-\w]|[^\x00-\xa0])+\|)?((?:\\.|[-\w#]|[^\x00-\xa0])+)|)|)[\x20\t\r\n\f]*\]/);
} else {
    setExprMatchRegex("ATTR",/\[\s*((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF_-]|\\.)+)))\s*(?:(\S?=)\s*(['"]*)(.*?)\5|)\s*\]/);
}

//  Modify the ATTR preFilter function to account for new regexp match groups,
//  and normalise the namespace URI.
//
$.expr.preFilter.ATTR = (jquery_gt_18)? function( match, context, isXml ) {
    var name = match[1].replace(rbackslash, "");
    
    if( match[4] == "~=" ) {
        match[6] = " " + match[6] + " ";
    }
    
    // Move the given value to match[5] whether quoted or unquoted
    match[5] = ( match[6] || match[7] || "" ).replace( rbackslash, "" );
    
    if(!match[2] || match[2] == "|") {
        match[2] = "";
    } else {
        match[2] = getNamespaceURI(match[2]);
    }
    
    return match.slice( 0, 6 );
} : function(match, curLoop, inplace, result, not, isXML) {
    var name = match[3].replace(/\\/g, "");
    if(!isXML && $.expr.attrMap[name]) {
        match[3] = $.expr.attrMap[name];
    }
    if( match[4] == "~=" ) {
        match[6] = " " + match[6] + " ";
    }
    if(!match[2] || match[2] == "|") {
        match[2] = "";
    } else {
        match[2] = getNamespaceURI(match[2]);
    }
    return match;
};



var attr_op_eval = function(result, operator, check) {
    if ( result == null ) {
        return operator === "!=";
    }
    
    if ( !operator ) {
        return true;
    }
    
    result += "";

    return operator === "=" ? result === check :
        operator === "!=" ? result !== check :
        operator === "^=" ? check && result.indexOf( check ) === 0 :
        operator === "*=" ? check && result.indexOf( check ) > -1 :
        operator === "$=" ? check && result.substr( result.length - check.length ) === check :
        operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
        operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
        false;
};

//Modify the ATTR filter function to account for namespace selector.
//Unfortunately this means factoring out the attribute-checking code
//into a separate function, since it might be called multiple times.
//
function filter_attr( prefixedName, ns, name, op, check ) {
    return function( elem, context ) {
        if(ns == "") {
            var result = $(elem).attr(name);
            return attr_op_eval(result, op, check);
        } else {
            if(ns != "*" && typeof elem.getAttributeNS != "undefined") {
                return attr_op_eval(elem.getAttributeNS(ns,name), op, check);
            }
            
            //  Need to iterate over all attributes, either because we couldn't
            //  look it up or because we need to match all namespaces.
            var attrs = elem.attributes;
            for (var i=0; attrs[i]; i++) {
                var ln = attrs[i].localName;
                if(!ln) {
                    ln = attrs[i].nodeName;
                    var idx = ln.indexOf(":");
                    if(idx >= 0) {
                        ln = ln.substr(idx+1);
                    }
                }
                if(ln == name) {
                    result = attrs[i].nodeValue;
                    if(ns == "*" || attrs[i].namespaceURI == ns) {
                        if(attr_op_eval(result, op, check)) {
                            return true;
                        }
                    }
                    if(attrs[i].namespaceURI === "" && attrs[i].prefix) {
                        if(attrs[i].prefix == default_xmlns_rev[ns]) {
                            if(attr_op_eval(result, op, check)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
    };
};

$.expr.filter.ATTR = (jquery_gt_18)? filter_attr : function(elem, match) {
    var ns = match[2];
    var name = match[3];
    var type = match[4];
    var check = match[6];
    return filter_attr(null, ns, name, type, check).call(this, elem, null);
};


})(jQuery);
;/**
 * jQuery JSON plugin 2.4-alpha
 *
 * @author Brantley Harris, 2009-2011
 * @author Timo Tijhof, 2011-2012
 * @source This plugin is heavily influenced by MochiKit's serializeJSON, which is
 *         copyrighted 2005 by Bob Ippolito.
 * @source Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 *         website's http://www.json.org/json2.js, which proclaims:
 *         "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 *         I uphold.
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
(function ($) {
	'use strict';

	var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		hasOwn = Object.prototype.hasOwnProperty;

	/**
	 * jQuery.toJSON
	 * Converts the given argument into a JSON representation.
	 *
	 * @param o {Mixed} The json-serializable *thing* to be converted
	 *
	 * If an object has a toJSON prototype, that will be used to get the representation.
	 * Non-integer/string keys are skipped in the object, as are keys that point to a
	 * function.
	 *
	 */
	$.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
		if (o === null) {
			return 'null';
		}

		var pairs, k, name, val,
			type = $.type(o);

		if (type === 'undefined') {
			return undefined;
		}

		// Also covers instantiated Number and Boolean objects,
		// which are typeof 'object' but thanks to $.type, we
		// catch them here. I don't know whether it is right
		// or wrong that instantiated primitives are not
		// exported to JSON as an {"object":..}.
		// We choose this path because that's what the browsers did.
		if (type === 'number' || type === 'boolean') {
			return String(o);
		}
		if (type === 'string') {
			return $.quoteString(o);
		}
		if (typeof o.toJSON === 'function') {
			return $.toJSON(o.toJSON());
		}
		if (type === 'date') {
			var month = o.getUTCMonth() + 1,
				day = o.getUTCDate(),
				year = o.getUTCFullYear(),
				hours = o.getUTCHours(),
				minutes = o.getUTCMinutes(),
				seconds = o.getUTCSeconds(),
				milli = o.getUTCMilliseconds();

			if (month < 10) {
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}
			if (hours < 10) {
				hours = '0' + hours;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			if (milli < 100) {
				milli = '0' + milli;
			}
			if (milli < 10) {
				milli = '0' + milli;
			}
			return '"' + year + '-' + month + '-' + day + 'T' +
				hours + ':' + minutes + ':' + seconds +
				'.' + milli + 'Z"';
		}

		pairs = [];

		if ($.isArray(o)) {
			for (k = 0; k < o.length; k++) {
				pairs.push($.toJSON(o[k]) || 'null');
			}
			return '[' + pairs.join(',') + ']';
		}

		// Any other object (plain object, RegExp, ..)
		// Need to do typeof instead of $.type, because we also
		// want to catch non-plain objects.
		if (typeof o === 'object') {
			for (k in o) {
				// Only include own properties,
				// Filter out inherited prototypes
				if (hasOwn.call(o, k)) {
					// Keys must be numerical or string. Skip others
					type = typeof k;
					if (type === 'number') {
						name = '"' + k + '"';
					} else if (type === 'string') {
						name = $.quoteString(k);
					} else {
						continue;
					}
					type = typeof o[k];

					// Invalid values like these return undefined
					// from toJSON, however those object members
					// shouldn't be included in the JSON string at all.
					if (type !== 'function' && type !== 'undefined') {
						val = $.toJSON(o[k]);
						pairs.push(name + ':' + val);
					}
				}
			}
			return '{' + pairs.join(',') + '}';
		}
	};

	/**
	 * jQuery.evalJSON
	 * Evaluates a given json string.
	 *
	 * @param str {String}
	 */
	$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
		/*jshint evil: true */
		return eval('(' + str + ')');
	};

	/**
	 * jQuery.secureEvalJSON
	 * Evals JSON in a way that is *more* secure.
	 *
	 * @param str {String}
	 */
	$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
		var filtered =
			str
			.replace(/\\["\\\/bfnrtu]/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

		if (/^[\],:{}\s]*$/.test(filtered)) {
			/*jshint evil: true */
			return eval('(' + str + ')');
		}
		throw new SyntaxError('Error parsing JSON, source is not valid.');
	};

	/**
	 * jQuery.quoteString
	 * Returns a string-repr of a string, escaping quotes intelligently.
	 * Mostly a support function for toJSON.
	 * Examples:
	 * >>> jQuery.quoteString('apple')
	 * "apple"
	 *
	 * >>> jQuery.quoteString('"Where are we going?", she asked.')
	 * "\"Where are we going?\", she asked."
	 */
	$.quoteString = function (str) {
		if (str.match(escape)) {
			return '"' + str.replace(escape, function (a) {
				var c = meta[a];
				if (typeof c === 'string') {
					return c;
				}
				c = a.charCodeAt();
				return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + str + '"';
	};

}(jQuery));
;/*
 * transform: A jQuery cssHooks adding cross-browser 2d transform capabilities to $.fn.css() and $.fn.animate()
 *
 * limitations:
 * - requires jQuery 1.4.3+
 * - Should you use the *translate* property, then your elements need to be absolutely positionned in a relatively positionned wrapper **or it will fail in IE678**.
 * - transformOrigin is not accessible
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery.transform.js
 *
 * Copyright 2011 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 *
 */
(function( $, window, document, Math, undefined ) {

/*
 * Feature tests and global variables
 */
var div = document.createElement("div"),
	divStyle = div.style,
	suffix = "Transform",
	testProperties = [
		"O" + suffix,
		"ms" + suffix,
		"Webkit" + suffix,
		"Moz" + suffix
	],
	i = testProperties.length,
	supportProperty,
	supportMatrixFilter,
	supportFloat32Array = "Float32Array" in window,
	propertyHook,
	propertyGet,
	rMatrix = /Matrix([^)]*)/,
	rAffine = /^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,
	_transform = "transform",
	_transformOrigin = "transformOrigin",
	_translate = "translate",
	_rotate = "rotate",
	_scale = "scale",
	_skew = "skew",
	_matrix = "matrix";

// test different vendor prefixes of these properties
while ( i-- ) {
	if ( testProperties[i] in divStyle ) {
		$.support[_transform] = supportProperty = testProperties[i];
		$.support[_transformOrigin] = supportProperty + "Origin";
		continue;
	}
}
// IE678 alternative
if ( !supportProperty ) {
	$.support.matrixFilter = supportMatrixFilter = divStyle.filter === "";
}

// px isn't the default unit of these properties
$.cssNumber[_transform] = $.cssNumber[_transformOrigin] = true;

/*
 * fn.css() hooks
 */
if ( supportProperty && supportProperty != _transform ) {
	// Modern browsers can use jQuery.cssProps as a basic hook
	$.cssProps[_transform] = supportProperty;
	$.cssProps[_transformOrigin] = supportProperty + "Origin";

	// Firefox needs a complete hook because it stuffs matrix with "px"
	if ( supportProperty == "Moz" + suffix ) {
		propertyHook = {
			get: function( elem, computed ) {
				return (computed ?
					// remove "px" from the computed matrix
					$.css( elem, supportProperty ).split("px").join(""):
					elem.style[supportProperty]
				);
			},
			set: function( elem, value ) {
				// add "px" to matrices
				elem.style[supportProperty] = /matrix\([^)p]*\)/.test(value) ?
					value.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, _matrix+"$1$2px,$3px"):
					value;
			}
		};
	/* Fix two jQuery bugs still present in 1.5.1
	 * - rupper is incompatible with IE9, see http://jqbug.com/8346
	 * - jQuery.css is not really jQuery.cssProps aware, see http://jqbug.com/8402
	 */
	} else if ( /^1\.[0-5](?:\.|$)/.test($.fn.jquery) ) {
		propertyHook = {
			get: function( elem, computed ) {
				return (computed ?
					$.css( elem, supportProperty.replace(/^ms/, "Ms") ):
					elem.style[supportProperty]
				);
			}
		};
	}
	/* TODO: leverage hardware acceleration of 3d transform in Webkit only
	else if ( supportProperty == "Webkit" + suffix && support3dTransform ) {
		propertyHook = {
			set: function( elem, value ) {
				elem.style[supportProperty] = 
					value.replace();
			}
		}
	}*/

} else if ( supportMatrixFilter ) {
	propertyHook = {
		get: function( elem, computed, asArray ) {
			var elemStyle = ( computed && elem.currentStyle ? elem.currentStyle : elem.style ),
				matrix, data;

			if ( elemStyle && rMatrix.test( elemStyle.filter ) ) {
				matrix = RegExp.$1.split(",");
				matrix = [
					matrix[0].split("=")[1],
					matrix[2].split("=")[1],
					matrix[1].split("=")[1],
					matrix[3].split("=")[1]
				];
			} else {
				matrix = [1,0,0,1];
			}

			if ( ! $.cssHooks[_transformOrigin] ) {
				matrix[4] = elemStyle ? parseInt(elemStyle.left, 10) || 0 : 0;
				matrix[5] = elemStyle ? parseInt(elemStyle.top, 10) || 0 : 0;

			} else {
				data = $._data( elem, "transformTranslate", undefined );
				matrix[4] = data ? data[0] : 0;
				matrix[5] = data ? data[1] : 0;
			}

			return asArray ? matrix : _matrix+"(" + matrix + ")";
		},
		set: function( elem, value, animate ) {
			var elemStyle = elem.style,
				currentStyle,
				Matrix,
				filter,
				centerOrigin;

			if ( !animate ) {
				elemStyle.zoom = 1;
			}

			value = matrix(value);

			// rotate, scale and skew
			Matrix = [
				"Matrix("+
					"M11="+value[0],
					"M12="+value[2],
					"M21="+value[1],
					"M22="+value[3],
					"SizingMethod='auto expand'"
			].join();
			filter = ( currentStyle = elem.currentStyle ) && currentStyle.filter || elemStyle.filter || "";

			elemStyle.filter = rMatrix.test(filter) ?
				filter.replace(rMatrix, Matrix) :
				filter + " progid:DXImageTransform.Microsoft." + Matrix + ")";

			if ( ! $.cssHooks[_transformOrigin] ) {

				// center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
				if ( (centerOrigin = $.transform.centerOrigin) ) {
					elemStyle[centerOrigin == "margin" ? "marginLeft" : "left"] = -(elem.offsetWidth/2) + (elem.clientWidth/2) + "px";
					elemStyle[centerOrigin == "margin" ? "marginTop" : "top"] = -(elem.offsetHeight/2) + (elem.clientHeight/2) + "px";
				}

				// translate
				// We assume that the elements are absolute positionned inside a relative positionned wrapper
				elemStyle.left = value[4] + "px";
				elemStyle.top = value[5] + "px";

			} else {
				$.cssHooks[_transformOrigin].set( elem, value );
			}
		}
	};
}
// populate jQuery.cssHooks with the appropriate hook if necessary
if ( propertyHook ) {
	$.cssHooks[_transform] = propertyHook;
}
// we need a unique setter for the animation logic
propertyGet = propertyHook && propertyHook.get || $.css;

/*
 * fn.animate() hooks
 */
$.fx.step.transform = function( fx ) {
	var elem = fx.elem,
		start = fx.start,
		end = fx.end,
		pos = fx.pos,
		transform = "",
		precision = 1E5,
		i, startVal, endVal, unit;

	// fx.end and fx.start need to be converted to interpolation lists
	if ( !start || typeof start === "string" ) {

		// the following block can be commented out with jQuery 1.5.1+, see #7912
		if ( !start ) {
			start = propertyGet( elem, supportProperty );
		}

		// force layout only once per animation
		if ( supportMatrixFilter ) {
			elem.style.zoom = 1;
		}

		// replace "+=" in relative animations (-= is meaningless with transforms)
		end = end.split("+=").join(start);

		// parse both transform to generate interpolation list of same length
		$.extend( fx, interpolationList( start, end ) );
		start = fx.start;
		end = fx.end;
	}

	i = start.length;

	// interpolate functions of the list one by one
	while ( i-- ) {
		startVal = start[i];
		endVal = end[i];
		unit = +false;

		switch ( startVal[0] ) {

			case _translate:
				unit = "px";
			case _scale:
				unit || ( unit = "");

				transform = startVal[0] + "(" +
					Math.round( (startVal[1][0] + (endVal[1][0] - startVal[1][0]) * pos) * precision ) / precision + unit +","+
					Math.round( (startVal[1][1] + (endVal[1][1] - startVal[1][1]) * pos) * precision ) / precision + unit + ")"+
					transform;
				break;

			case _skew + "X":
			case _skew + "Y":
			case _rotate:
				transform = startVal[0] + "(" +
					Math.round( (startVal[1] + (endVal[1] - startVal[1]) * pos) * precision ) / precision +"rad)"+
					transform;
				break;
		}
	}

	fx.origin && ( transform = fx.origin + transform );

	propertyHook && propertyHook.set ?
		propertyHook.set( elem, transform, +true ):
		elem.style[supportProperty] = transform;
};

/*
 * Utility functions
 */

// turns a transform string into its "matrix(A,B,C,D,X,Y)" form (as an array, though)
function matrix( transform ) {
	transform = transform.split(")");
	var
			trim = $.trim
		, i = -1
		// last element of the array is an empty string, get rid of it
		, l = transform.length -1
		, split, prop, val
		, prev = supportFloat32Array ? new Float32Array(6) : []
		, curr = supportFloat32Array ? new Float32Array(6) : []
		, rslt = supportFloat32Array ? new Float32Array(6) : [1,0,0,1,0,0]
		;

	prev[0] = prev[3] = rslt[0] = rslt[3] = 1;
	prev[1] = prev[2] = prev[4] = prev[5] = 0;

	// Loop through the transform properties, parse and multiply them
	while ( ++i < l ) {
		split = transform[i].split("(");
		prop = trim(split[0]);
		val = split[1];
		curr[0] = curr[3] = 1;
		curr[1] = curr[2] = curr[4] = curr[5] = 0;

		switch (prop) {
			case _translate+"X":
				curr[4] = parseInt(val, 10);
				break;

			case _translate+"Y":
				curr[5] = parseInt(val, 10);
				break;

			case _translate:
				val = val.split(",");
				curr[4] = parseInt(val[0], 10);
				curr[5] = parseInt(val[1] || 0, 10);
				break;

			case _rotate:
				val = toRadian(val);
				curr[0] = Math.cos(val);
				curr[1] = Math.sin(val);
				curr[2] = -Math.sin(val);
				curr[3] = Math.cos(val);
				break;

			case _scale+"X":
				curr[0] = +val;
				break;

			case _scale+"Y":
				curr[3] = val;
				break;

			case _scale:
				val = val.split(",");
				curr[0] = val[0];
				curr[3] = val.length>1 ? val[1] : val[0];
				break;

			case _skew+"X":
				curr[2] = Math.tan(toRadian(val));
				break;

			case _skew+"Y":
				curr[1] = Math.tan(toRadian(val));
				break;

			case _matrix:
				val = val.split(",");
				curr[0] = val[0];
				curr[1] = val[1];
				curr[2] = val[2];
				curr[3] = val[3];
				curr[4] = parseInt(val[4], 10);
				curr[5] = parseInt(val[5], 10);
				break;
		}

		// Matrix product (array in column-major order)
		rslt[0] = prev[0] * curr[0] + prev[2] * curr[1];
		rslt[1] = prev[1] * curr[0] + prev[3] * curr[1];
		rslt[2] = prev[0] * curr[2] + prev[2] * curr[3];
		rslt[3] = prev[1] * curr[2] + prev[3] * curr[3];
		rslt[4] = prev[0] * curr[4] + prev[2] * curr[5] + prev[4];
		rslt[5] = prev[1] * curr[4] + prev[3] * curr[5] + prev[5];

		prev = [rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]];
	}
	return rslt;
}

// turns a matrix into its rotate, scale and skew components
// algorithm from http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp
function unmatrix(matrix) {
	var
			scaleX
		, scaleY
		, skew
		, A = matrix[0]
		, B = matrix[1]
		, C = matrix[2]
		, D = matrix[3]
		;

	// Make sure matrix is not singular
	if ( A * D - B * C ) {
		// step (3)
		scaleX = Math.sqrt( A * A + B * B );
		A /= scaleX;
		B /= scaleX;
		// step (4)
		skew = A * C + B * D;
		C -= A * skew;
		D -= B * skew;
		// step (5)
		scaleY = Math.sqrt( C * C + D * D );
		C /= scaleY;
		D /= scaleY;
		skew /= scaleY;
		// step (6)
		if ( A * D < B * C ) {
			A = -A;
			B = -B;
			skew = -skew;
			scaleX = -scaleX;
		}

	// matrix is singular and cannot be interpolated
	} else {
		// In this case the elem shouldn't be rendered, hence scale == 0
		scaleX = scaleY = skew = 0;
	}

	// The recomposition order is very important
	// see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
	return [
		[_translate, [+matrix[4], +matrix[5]]],
		[_rotate, Math.atan2(B, A)],
		[_skew + "X", Math.atan(skew)],
		[_scale, [scaleX, scaleY]]
	];
}

// build the list of transform functions to interpolate
// use the algorithm described at http://dev.w3.org/csswg/css3-2d-transforms/#animation
function interpolationList( start, end ) {
	var list = {
			start: [],
			end: []
		},
		i = -1, l,
		currStart, currEnd, currType;

	// get rid of affine transform matrix
	( start == "none" || isAffine( start ) ) && ( start = "" );
	( end == "none" || isAffine( end ) ) && ( end = "" );

	// if end starts with the current computed style, this is a relative animation
	// store computed style as the origin, remove it from start and end
	if ( start && end && !end.indexOf("matrix") && toArray( start ).join() == toArray( end.split(")")[0] ).join() ) {
		list.origin = start;
		start = "";
		end = end.slice( end.indexOf(")") +1 );
	}

	if ( !start && !end ) { return; }

	// start or end are affine, or list of transform functions are identical
	// => functions will be interpolated individually
	if ( !start || !end || functionList(start) == functionList(end) ) {

		start && ( start = start.split(")") ) && ( l = start.length );
		end && ( end = end.split(")") ) && ( l = end.length );

		while ( ++i < l-1 ) {
			start[i] && ( currStart = start[i].split("(") );
			end[i] && ( currEnd = end[i].split("(") );
			currType = $.trim( ( currStart || currEnd )[0] );

			append( list.start, parseFunction( currType, currStart ? currStart[1] : 0 ) );
			append( list.end, parseFunction( currType, currEnd ? currEnd[1] : 0 ) );
		}

	// otherwise, functions will be composed to a single matrix
	} else {
		list.start = unmatrix(matrix(start));
		list.end = unmatrix(matrix(end))
	}

	return list;
}

function parseFunction( type, value ) {
	var
		// default value is 1 for scale, 0 otherwise
		defaultValue = +(!type.indexOf(_scale)),
		scaleX,
		// remove X/Y from scaleX/Y & translateX/Y, not from skew
		cat = type.replace( /e[XY]/, "e" );

	switch ( type ) {
		case _translate+"Y":
		case _scale+"Y":

			value = [
				defaultValue,
				value ?
					parseFloat( value ):
					defaultValue
			];
			break;

		case _translate+"X":
		case _translate:
		case _scale+"X":
			scaleX = 1;
		case _scale:

			value = value ?
				( value = value.split(",") ) &&	[
					parseFloat( value[0] ),
					parseFloat( value.length>1 ? value[1] : type == _scale ? scaleX || value[0] : defaultValue+"" )
				]:
				[defaultValue, defaultValue];
			break;

		case _skew+"X":
		case _skew+"Y":
		case _rotate:
			value = value ? toRadian( value ) : 0;
			break;

		case _matrix:
			return unmatrix( value ? toArray(value) : [1,0,0,1,0,0] );
			break;
	}

	return [[ cat, value ]];
}

function isAffine( matrix ) {
	return rAffine.test(matrix);
}

function functionList( transform ) {
	return transform.replace(/(?:\([^)]*\))|\s/g, "");
}

function append( arr1, arr2, value ) {
	while ( value = arr2.shift() ) {
		arr1.push( value );
	}
}

// converts an angle string in any unit to a radian Float
function toRadian(value) {
	return ~value.indexOf("deg") ?
		parseInt(value,10) * (Math.PI * 2 / 360):
		~value.indexOf("grad") ?
			parseInt(value,10) * (Math.PI/200):
			parseFloat(value);
}

// Converts "matrix(A,B,C,D,X,Y)" to [A,B,C,D,X,Y]
function toArray(matrix) {
	// remove the unit of X and Y for Firefox
	matrix = /([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(matrix);
	return [matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]];
}

$.transform = {
	centerOrigin: "margin"
};

})( jQuery, window, document, Math );
;/*
jQuery grab 
https://github.com/jussi-kalliokoski/jQuery.grab
Ported from Jin.js::gestures   
https://github.com/jussi-kalliokoski/jin.js/
Created by Jussi Kalliokoski
Licensed under MIT License. 

Includes fix for IE
*/


(function($){
	var	extend		= $.extend,
		mousedown	= 'mousedown',
		mousemove	= 'mousemove',
		mouseup		= 'mouseup',
		touchstart	= 'touchstart',
		touchmove	= 'touchmove',
		touchend	= 'touchend',
		touchcancel	= 'touchcancel';

	function unbind(elem, type, func){
		if (type.substr(0,5) !== 'touch'){ // A temporary fix for IE8 data passing problem in Jin.
			return $(elem).unbind(type, func);
		}
		var fnc, i;
		for (i=0; i<bind._binds.length; i++){
			if (bind._binds[i].elem === elem && bind._binds[i].type === type && bind._binds[i].func === func){
				if (document.addEventListener){
					elem.removeEventListener(type, bind._binds[i].fnc, false);
				} else {
					elem.detachEvent('on'+type, bind._binds[i].fnc);
				}
				bind._binds.splice(i--, 1);
			}
		}
	}

	function bind(elem, type, func, pass){
		if (type.substr(0,5) !== 'touch'){ // A temporary fix for IE8 data passing problem in Jin.
			return $(elem).bind(type, pass, func);
		}
		var fnc, i;
		if (bind[type]){
			return bind[type].bind(elem, type, func, pass);
		}
		fnc = function(e){
			if (!e){ // Fix some ie bugs...
				e = window.event;
			}
			if (!e.stopPropagation){
				e.stopPropagation = function(){ this.cancelBubble = true; };
			}
			e.data = pass;
			func.call(elem, e);
		};
		if (document.addEventListener){
			elem.addEventListener(type, fnc, false);
		} else {
			elem.attachEvent('on' + type, fnc);
		}
		bind._binds.push({elem: elem, type: type, func: func, fnc: fnc});
	}

	function grab(elem, options)
	{
		var data = {
			move: {x: 0, y: 0},
			offset: {x: 0, y: 0},
			position: {x: 0, y: 0},
			start: {x: 0, y: 0},
			affects: document.documentElement,
			stopPropagation: false,
			preventDefault: true,
			touch: true // Implementation unfinished, and doesn't support multitouch
		};
		extend(data, options);
		data.element = elem;
		bind(elem, mousedown, mouseDown, data);
		if (data.touch){
			bind(elem, touchstart, touchStart, data);
		}
	}
	function ungrab(elem){
		unbind(elem, mousedown, mousedown);
	}
	function mouseDown(e){
		e.data.position.x = e.pageX;
		e.data.position.y = e.pageY;
		e.data.start.x = e.pageX;
		e.data.start.y = e.pageY;
		e.data.event = e;
		if (e.data.onstart && e.data.onstart.call(e.data.element, e.data)){
			return;
		}
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.stopPropagation){
			e.stopPropagation();
		}
		bind(e.data.affects, mousemove, mouseMove, e.data);
		bind(e.data.affects, mouseup, mouseUp, e.data);
	}
	function mouseMove(e){
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.preventDefault){
			e.stopPropagation();
		}
		e.data.move.x = e.pageX - e.data.position.x;
		e.data.move.y = e.pageY - e.data.position.y;
		e.data.position.x = e.pageX;
		e.data.position.y = e.pageY;
		e.data.offset.x = e.pageX - e.data.start.x;
		e.data.offset.y = e.pageY - e.data.start.y;
		e.data.event = e;
		if (e.data.onmove){
			e.data.onmove.call(e.data.element, e.data);
		}
	}
	function mouseUp(e){
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.stopPropagation){
			e.stopPropagation();
		}
		unbind(e.data.affects, mousemove, mouseMove);
		unbind(e.data.affects, mouseup, mouseUp);
		e.data.event = e;
		if (e.data.onfinish){
			e.data.onfinish.call(e.data.element, e.data);
		}
	}
	function touchStart(e){
		e.data.position.x = e.touches[0].pageX;
		e.data.position.y = e.touches[0].pageY;
		e.data.start.x = e.touches[0].pageX;
		e.data.start.y = e.touches[0].pageY;
		e.data.event = e;
		if (e.data.onstart && e.data.onstart.call(e.data.element, e.data)){
			return;
		}
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.stopPropagation){
			e.stopPropagation();
		}
		bind(e.data.affects, touchmove, touchMove, e.data);
		bind(e.data.affects, touchend, touchEnd, e.data);
	}
	function touchMove(e){
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.stopPropagation){
			e.stopPropagation();
		}
		e.data.move.x = e.touches[0].pageX - e.data.position.x;
		e.data.move.y = e.touches[0].pageY - e.data.position.y;
		e.data.position.x = e.touches[0].pageX;
		e.data.position.y = e.touches[0].pageY;
		e.data.offset.x = e.touches[0].pageX - e.data.start.x;
		e.data.offset.y = e.touches[0].pageY - e.data.start.y;
		e.data.event = e;
		if (e.data.onmove){
			e.data.onmove.call(e.data.elem, e.data);
		}
	}
	function touchEnd(e){
		if (e.preventDefault && e.data.preventDefault){
			e.preventDefault();
		}
		if (e.stopPropagation && e.data.stopPropagation){
			e.stopPropagation();
		}
		unbind(e.data.affects, touchmove, touchMove);
		unbind(e.data.affects, touchend, touchEnd);
		e.data.event = e;
		if (e.data.onfinish){
			e.data.onfinish.call(e.data.element, e.data);
		}
	}

	bind._binds = [];

	$.fn.grab = function(a, b){
		return this.each(function(){
			return grab(this, a, b);
		});
	};
	$.fn.ungrab = function(a){
		return this.each(function(){
			return ungrab(this, a);
		});
	};
})(jQuery);;/*
 * purecssmatrix.js, version 0.10, part of:
 * http://janne.aukia.com/zoomooz
 *
 * 0.10 initial stand-alone version
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */
 
 PureCSSMatrix = (function() {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var regexp_is_deg = /deg$/;
    var regexp_filter_number = /([0-9.\-e]+)/g;
    var regexp_trans_splitter = /([a-zA-Z]+)\(([^\)]+)\)/g;
    
    //**********************************//
    //***  WebKitCSSMatrix in        ***//
    //***  pure Javascript           ***//
    //**********************************//
    
    function cssMatrix(trans) {
        if(trans && trans !== null && trans!="none") {
            if(trans instanceof Matrix) {
                this.setMatrix(trans);
            } else {
                this.setMatrixValue(trans);
            }
        } else {
            this.m = Matrix.I(3);
        }
    }
    
    cssMatrix.prototype.setMatrix = function(matr) {
        this.m = matr;
    };
    
    function rawRotationToRadians(raw) {
        var rot = parseFloat(filterNumber(raw));
        if(raw.match(regexp_is_deg)) {
            rot = (2*Math.PI)*rot/360.0;
        }
        return rot;
    }
    
    cssMatrix.prototype.setMatrixValue = function(transString) {
        var mtr = Matrix.I(3);
        var items;
        while((items = regexp_trans_splitter.exec(transString)) !== null) {
            var action = items[1].toLowerCase();
            var val = items[2].split(",");
            var trans;
            if(action=="matrix") {
                trans = Matrix.create([[parseFloat(val[0]),parseFloat(val[2]),parseFloat(filterNumber(val[4]))],
                               [parseFloat(val[1]),parseFloat(val[3]),parseFloat(filterNumber(val[5]))],
                               [                0,                0,                              1]]);
            } else if(action=="translate") {
                trans = Matrix.I(3);
                trans.elements[0][2] = parseFloat(filterNumber(val[0]));
                trans.elements[1][2] = parseFloat(filterNumber(val[1]));
            } else if(action=="scale") {
                var sx = parseFloat(val[0]);
                var sy;
                if(val.length>1) {
                    sy = parseFloat(val[1]);
                } else {
                    sy = sx;
                }
                trans = Matrix.create([[sx, 0, 0], [0, sy, 0], [0, 0, 1]]);
            } else if(action=="rotate") {
                trans = Matrix.RotationZ(rawRotationToRadians(val[0]));
            } else if(action=="skew" || action=="skewx") {
                // TODO: supports only one parameter skew
                trans = Matrix.I(3);
                trans.elements[0][1] = Math.tan(rawRotationToRadians(val[0]));
            } else if(action=="skewy") {
                // TODO: test that this works (or unit test them all!)
                trans = Matrix.I(3);
                trans.elements[1][0] = Math.tan(rawRotationToRadians(val[0]));
            } else {
                console.log("Problem with setMatrixValue", action, val);
            }
            
            mtr = mtr.multiply(trans);
        }
        
        this.m = mtr;
    };
    
    cssMatrix.prototype.multiply = function(m2) {
        return new cssMatrix(this.m.multiply(m2.m));
    };
    
    cssMatrix.prototype.inverse = function() {
        if(Math.abs(this.m.elements[0][0])<0.000001) {
            /* fixes a weird displacement problem with 90 deg rotations */
            this.m.elements[0][0] = 0;
        }
        return new cssMatrix(this.m.inverse());
    };
    
    cssMatrix.prototype.translate = function(x,y) {
        var trans = Matrix.I(3);
        trans.elements[0][2] = x;
        trans.elements[1][2] = y;
        return new cssMatrix(this.m.multiply(trans));
    };
    
    cssMatrix.prototype.scale = function(sx,sy) {
        var trans = Matrix.create([[sx, 0, 0], [0, sy, 0], [0, 0, 1]]);
        return new cssMatrix(this.m.multiply(trans));    
    };
    
    cssMatrix.prototype.rotate = function(rot) {
        var trans = Matrix.RotationZ(rot);
        return new cssMatrix(this.m.multiply(trans));
    };
    
    cssMatrix.prototype.toString = function() {
        var e = this.m.elements;
        var pxstr = "";
        if($.browser.mozilla || $.browser.opera) {
            pxstr = "px";
        }
        return "matrix("+printFixedNumber(e[0][0])+", "+printFixedNumber(e[1][0])+", "+
                         printFixedNumber(e[0][1])+", "+printFixedNumber(e[1][1])+", "+
                         printFixedNumber(e[0][2])+pxstr+", "+printFixedNumber(e[1][2])+pxstr+")";
    };
    
    //****************************************//
    //***  Not part of the WebkitCSSMatrix ***//
    //***  interface (but used in Zoomooz) ***//
    //****************************************//
    
    cssMatrix.prototype.elements = function() {
        var mv = this.m.elements;
        return {"a":mv[0][0],"b":mv[1][0],"c":mv[0][1],
                "d":mv[1][1],"e":mv[0][2],"f":mv[1][2]};
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function filterNumber(x) {
        return x.match(regexp_filter_number);
    }
    
    function printFixedNumber(x) {
        return Number(x).toFixed(6);
    }

    return cssMatrix;
})();
/*
 * jquery.zoomooz-helpers.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */
 
/*jslint sub: true */

if(!$.zoomooz) {
    $.zoomooz = {};
}

 $.zoomooz.helpers = (function($, ns) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var browser_prefixes = ["-moz-","-webkit-","-o-","-ms-"];
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    ns.forEachPrefix = function(func,includeNoPrefix) {
        for(var i=0;i<browser_prefixes.length;i++) {
            func(browser_prefixes[i]);
        }
        if(includeNoPrefix) {
            func("");
        }
    }
    
    ns.getElementTransform = function(elem) {
        var retVal;
        ns.forEachPrefix(function(prefix) {
            retVal = retVal || $(elem).css(prefix+"transform");
        },true);
        return retVal;
    }
    
    return ns;
    
})(jQuery, {});
/*
 * jquery.zoomooz-anim.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 * LICENCE INFORMATION FOR DERIVED FUNCTIONS:
 *
 * Functions CubicBezierAtPosition and  
 * CubicBezierAtTime are written by Christian Effenberger, 
 * and correspond 1:1 to WebKit project functions.
 * "WebCore and JavaScriptCore are available under the 
 * Lesser GNU Public License. WebKit is available under 
 * a BSD-style license."
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var animation_start_time;
    var animation_interval_timer;
    
    var regexp_filter_number = /([0-9.\-e]+)/g;
    var regexp_trans_splitter = /([a-z]+)\(([^\)]+)\)/g;
    var regexp_is_deg = /deg$/;

    var helpers = $.zoomooz.helpers;

    var default_settings = {
        duration: 450,
        easing: "ease",
        /* Native animation may cause issues with pixelated content while zooming,
           and there might be other issues with browser compatibility etc. so use
           it with care and test on your target devices/browsers :). */
        nativeanimation: false
    };
    
    var endCallbackTimeout;

    //**********************************//
    //***  Setup css hook for IE     ***//
    //**********************************//
    
    jQuery.cssHooks["MsTransform"] = {
        set: function( elem, value ) {
            elem.style.msTransform = value;
        }
    };
    
    jQuery.cssHooks["MsTransformOrigin"] = {
        set: function( elem, value ) {
            elem.style.msTransformOrigin = value;
        }
    };

    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
      
    $.fn.animateTransformation = function(transformation, settings, animateEndCallback, animateStartedCallback) {
        settings = jQuery.extend({}, default_settings, settings);
        
        var useNativeAnim = ($.browser.webkit && settings.nativeanimation);
        
        // FIXME: what would be the best way to handle leftover animations?
        if(endCallbackTimeout) {
            clearTimeout(endCallbackTimeout);
            endCallbackTimeout = null;
        }

        if(useNativeAnim && animateEndCallback) {
            endCallbackTimeout = setTimeout(animateEndCallback, settings.duration);
        }
        
        this.each(function() {
            var $target = $(this);
            
            if(!transformation) transformation = new PureCSSMatrix();
            
            var current_affine = constructAffineFixingRotation($target);
            var final_affine = fixRotationToSameLap(current_affine, affineTransformDecompose(transformation));
            
            if(useNativeAnim) {
                $target.css(constructZoomRootCssTransform(matrixCompose(final_affine), settings.duration, settings.easing));
                if(animateStartedCallback) {
                    animateStartedCallback();
                }
            } else {
                animateTransition($target, current_affine, final_affine, settings, animateEndCallback, animateStartedCallback);
            }
        });
    }
    
    $.fn.setTransformation = function(transformation) {
        this.each(function() {
            var $target = $(this);
            var current_affine = constructAffineFixingRotation($target);
            var final_affine = fixRotationToSameLap(current_affine, affineTransformDecompose(transformation));
            $target.css(constructZoomRootCssTransform(matrixCompose(final_affine)));
        });
    }
    
    //**********************************//
    //***  Element positioning       ***//
    //**********************************//
    
    function constructZoomRootCssTransform(trans, duration, easing) {
        var propMap = {};
        
        helpers.forEachPrefix(function(prefix) {
            propMap[prefix+"transform"] = trans;
        },true);
        
        if(duration) { 
            var transdur = roundNumber(duration/1000,6)+"s";
            propMap["-webkit-transition-duration"] = transdur;
            propMap["-o-transition-duration"] = transdur;
            propMap["-moz-transition-duration"] = transdur;
        }
        
        if(easing) {
            var transtiming = constructEasingCss(easing);
            propMap["-webkit-transition-timing-function"] = transtiming;
            propMap["-o-transition-timing-function"] = transtiming;
            propMap["-moz-transition-timing-function"] = transdur;
        }
        
        return propMap;
    }
    
    //**********************************//
    //***  Non-native animation      ***//
    //**********************************//
    
    function animateTransition($target, st, et, settings, animateEndCallback, animateStartedCallback) {
        
        if(!st) {
            st = affineTransformDecompose(new PureCSSMatrix());
        }
        animation_start_time = (new Date()).getTime();
        if(animation_interval_timer) {
            clearInterval(animation_interval_timer);
            animation_interval_timer = null;
        }
        if(settings.easing) {
            settings.easingfunction = constructEasingFunction(settings.easing, settings.duration);
        }
        
        // first step
        animationStep($target, st, et, settings, animateEndCallback);
        if(animateStartedCallback) {
            animateStartedCallback();
        }
        
        animation_interval_timer = setInterval(function() { animationStep($target, st, et, settings, animateEndCallback); }, 1);    
    }
    
    function animationStep($target, affine_start, affine_end, settings, animateEndCallback) {
        var current_time = (new Date()).getTime() - animation_start_time;
        var time_value;
        if(settings.easingfunction) {
            time_value = settings.easingfunction(current_time/settings.duration);
        } else {
            time_value = current_time/settings.duration;
        }
        
        $target.css(constructZoomRootCssTransform(matrixCompose(interpolateArrays(affine_start, affine_end, time_value))));
    
        if(current_time>settings.duration) {
            clearInterval(animation_interval_timer);
            animation_interval_timer = null;
            time_value=1.0;
            if(animateEndCallback) {
                animateEndCallback();
            }
        }
        
    }
    
    /* Based on pseudo-code in:
     * https://bugzilla.mozilla.org/show_bug.cgi?id=531344
     */
    function affineTransformDecompose(matrix) {
        var m = matrix.elements();
        var a=m.a, b=m.b, c=m.c, d=m.d, e=m.e, f=m.f;
        
        if(Math.abs(a*d-b*c)<0.01) {
            console.log("fail!");
            return;
        }
        
        var tx = e, ty = f;
        
        var sx = Math.sqrt(a*a+b*b);
        a = a/sx;
        b = b/sx;
        
        var k = a*c+b*d;
        c -= a*k;
        d -= b*k;
        
        var sy = Math.sqrt(c*c+d*d);
        c = c/sy;
        d = d/sy;
        k = k/sy;
        
        if((a*d-b*c)<0.0) {
            a = -a;
            b = -b;
            c = -c;
            d = -d;
            sx = -sx;
            sy = -sy;
        }
    
        var r = Math.atan2(b,a);
        return {"tx":tx, "ty":ty, "r":r, "k":Math.atan(k), "sx":sx, "sy":sy};
    }
    
    function matrixCompose(ia) {
        var ret = "";
        /* this probably made safari 5.1.1. + os 10.6.8 + non-unibody mac? */
        //ret += "translateZ(0) ";
        ret += "translate("+roundNumber(ia.tx,6)+"px,"+roundNumber(ia.ty,6)+"px) ";
        ret += "rotate("+roundNumber(ia.r,6)+"rad) skewX("+roundNumber(ia.k,6)+"rad) ";
        ret += "scale("+roundNumber(ia.sx,6)+","+roundNumber(ia.sy,6)+")";
        return ret;
    }
    
    //**********************************//
    //***  Easing functions          ***//
    //**********************************//
    
    function constructEasingCss(input) {
        if((input instanceof Array)) {
            return "cubic-bezier("+roundNumber(input[0],6)+","+roundNumber(input[1],6)+","+
                                   roundNumber(input[2],6)+","+roundNumber(input[3],6)+")";
        } else {
            return input;
        }
    }
    
    function constructEasingFunction(input, dur) {
        var params = [];
        if((input instanceof Array)) {
            params = input;
        } else {
            switch(input) {
                case "linear": params = [0.0,0.0,1.0,1.0]; break;
                case "ease": params = [0.25,0.1,0.25,1.0]; break;
                case "ease-in": params = [0.42,0.0,1.0,1.0]; break;
                case "ease-out": params = [0.0,0.0,0.58,1.0]; break;
                case "ease-in-out": params = [0.42,0.0,0.58,1.0]; break;
            }
        }
        
        var easingFunc = function(t) {
            return CubicBezierAtTime(t, params[0], params[1], params[2], params[3], dur);
        };
        
        return easingFunc;
    }
    
    // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
    function CubicBezierAtPosition(t,P1x,P1y,P2x,P2y) {
        var x,y,k=((1-t)*(1-t)*(1-t));
        x=P1x*(3*t*t*(1-t))+P2x*(3*t*(1-t)*(1-t))+k;
        y=P1y*(3*t*t*(1-t))+P2y*(3*t*(1-t)*(1-t))+k;
        return {x:Math.abs(x),y:Math.abs(y)};
    }
    
    // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
    // 1:1 conversion to js from webkit source files
    // UnitBezier.h, WebCore_animation_AnimationBase.cpp
    function CubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
        var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;}
        function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;}
        function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;}
        // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
        // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.
        function solveEpsilon(duration) {return 1.0/(200.0*duration);}
        function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));}
        // Given an x value, find a parametric value it came from.
        function solveCurveX(x,epsilon) {var t0,t1,t2,x2,d2,i;
            function fabs(n) {if(n>=0) {return n;}else {return 0-n;}}
            // First try a few iterations of Newton's method -- normally very fast.
            for(t2=x, i=0; i<8; i++) {x2=sampleCurveX(t2)-x; if(fabs(x2)<epsilon) {return t2;} d2=sampleCurveDerivativeX(t2); if(fabs(d2)<1e-6) {break;} t2=t2-x2/d2;}
            // Fall back to the bisection method for reliability.
            t0=0.0; t1=1.0; t2=x; if(t2<t0) {return t0;} if(t2>t1) {return t1;}
            while(t0<t1) {x2=sampleCurveX(t2); if(fabs(x2-x)<epsilon) {return t2;} if(x>x2) {t0=t2;}else {t1=t2;} t2=(t1-t0)*0.5+t0;}
            return t2; // Failure.
        }
        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
        cx=3.0*p1x; bx=3.0*(p2x-p1x)-cx; ax=1.0-cx-bx; cy=3.0*p1y; by=3.0*(p2y-p1y)-cy; ay=1.0-cy-by;
        // Convert from input time to parametric value in curve, then from that to output time.
        return solve(t, solveEpsilon(duration));
    }

    //**********************************//
    //***  CSS Matrix helpers        ***//
    //**********************************//
    
    function constructAffineFixingRotation(elem) {
        var rawTrans = helpers.getElementTransform(elem);
        var matr;
        if(!rawTrans) {
            matr = new PureCSSMatrix();
        } else {
            matr = new PureCSSMatrix(rawTrans);
        }
        var current_affine = affineTransformDecompose(matr);
        current_affine.r = getTotalRotation(rawTrans);
        return current_affine;
    }
    
    function getTotalRotation(transString) {
        var totalRot = 0;
        var items;
        while((items = regexp_trans_splitter.exec(transString)) !== null) {
            var action = items[1].toLowerCase();
            var val = items[2].split(",");
            if(action=="matrix") {
                var recomposedTransItem = action+"("+items[2]+")";
                totalRot += affineTransformDecompose(new PureCSSMatrix(recomposedTransItem)).r;
            } else if(action=="rotate") {
                var raw = val[0];
                var rot = parseFloat(filterNumber(raw));
                if(raw.match(regexp_is_deg)) {
                    rot = (2*Math.PI)*rot/360.0;
                }
                totalRot += rot;
            }
        }
        return totalRot;
    }
    
    // TODO: use modulo instead of loops
    function fixRotationToSameLap(current_affine, final_affine) {
        
        if(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
            if(final_affine.r<current_affine.r) {
                while(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
                    final_affine.r+=(2*Math.PI);
                }
            } else {
                while(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
                    final_affine.r-=(2*Math.PI);
                }
            }
        }
        return final_affine;
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function interpolateArrays(st, et, pos) {
        var it = {};
        for(var i in st) {
            if (st.hasOwnProperty(i)) {
                it[i] = st[i]+(et[i]-st[i])*pos;
            }
        }
        return it;
    }
    
    function roundNumber(number, precision) {
        precision = Math.abs(parseInt(precision,10)) || 0;
        var coefficient = Math.pow(10, precision);
        return Math.round(number*coefficient)/coefficient;
    }
    
    function filterNumber(x) {
        return x.match(regexp_filter_number);
    }
    
})(jQuery);
/*
 * jquery.zoomooz-core.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * Version history:
 * 1.04 fixed examples, iphone tuneups, transform offset fix
 * 1.03 added closeclick, code structuring
 * 1.02 bug fix on endcallback resetting for native animation
 * 1.01 declarative syntax and fixes
 * 0.92 working scrolling
 * 0.91 simplifying code base and scrolling for non-body zoom roots
 * 0.90 fixing margin on first body child
 * 0.89 support for jquery 1.7
 * 0.88 fixed a bug with 90 deg rotations
 * 0.87 fixed a bug with settings and a couple of demos
 * 0.86 fixed a bug with non-body zoom root
 * 0.85 basic IE9 support
 * 0.81 basic support for scrolling
 * 0.80 refactored position code to a separate file
 * 0.72 fixed a bug with skew in Webkit
 * 0.71 fixed bugs with FF4
 * 0.70 support for non-body zoom root
 * 0.69 better settings management
 * 0.68 root element tuning
 * 0.67 adjustable zoom origin (not fully working yet)
 * 0.65 zoom origin to center
 * 0.63 basic Opera support
 * 0.61 refactored to use CSSMatrix classes
 * 0.51 initial public version
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 * LICENCE INFORMATION FOR DERIVED FUNCTIONS:
 *
 * Function computeTotalTransformation based
 * on jquery.fn.offset, copyright John Resig, 2010
 * (MIT and GPL Version 2).
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var helpers = $.zoomooz.helpers;
    
    var animationSettings = ["duration", "easing", "nativeanimation"];
    
    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    setupCssStyles();
    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    /* this can be used for setting the default settings for zoomooz explicitly. */
    $.zoomooz.setup = function(settings) {
        $.zoomooz.defaultSettings = jQuery.extend(constructDefaultSettings(), settings);
    };
    
    /* returns the zooming settings of a particular element. used by zoomTarget. */
    $.fn.zoomSettings = function(settings) {
        var retValue;
        this.each(function() {
            var $elem = $(this);
            retValue = setupElementSettings($elem, settings);
        });
        return retValue;
    }
    
    /* the main zooming method. */
    $.fn.zoomTo = function(settings, skipElementSettings) {
        this.each(function() {
            var $this = $(this);
            
            if(!skipElementSettings) {
                settings = $this.zoomSettings(settings);
            }
            
            zoomTo($this, settings);
            
            if(settings.debug) {
            	if($("#debug").length===0) {
					$(settings.root).append('<div id="debug"><div>');
				} else {
					$("#debug").html("");
				}
				showDebug($this,settings);
            } else {
            	if($("#debug").length!==0) {
					$("#debug").html("");
				}
            }
        });
        
        return this;
    };
    
    //**********************************//
    //***  Setup functions           ***//
    //**********************************//
    
    function setupElementSettings($elem, baseSettings) {
    
        var settings = jQuery.extend({}, baseSettings);
        
        if(!$.zoomooz.defaultSettings) {
            $.zoomooz.setup();
        }
        
        var defaultSettings = $.zoomooz.defaultSettings;
        var elementSettings = jQuery.extend({},settings);
        
        for(var key in defaultSettings) {
            if (defaultSettings.hasOwnProperty(key) && !elementSettings[key]) {
                elementSettings[key] = $elem.data(key);
            }
        }
        
        // FIXME: it would be better, that the animationSettings
        // would come from the jquery.zoomooz-anim file somehow
        for(var i=0;i<animationSettings.length;i++) {
            var key = animationSettings[i];
            if(!elementSettings[key]) {
                elementSettings[key] = $elem.data(key);
            }
        }
        
        return jQuery.extend({}, defaultSettings, elementSettings);
    }
    
    /* setup css styles in javascript to not need an extra zoomooz.css file for the user to load.
       having the styles here helps also at keeping the css requirements minimal. */
    function setupCssStyles() {
        var style = document.createElement('style');
        style.type = 'text/css';
        
        var transformOrigin = "";
        helpers.forEachPrefix(function(prefix) {
            transformOrigin += prefix+"transform-origin: 0 0;";
        },true);
           
        // FIXME: how to remove the html height requirement?
        // FIXME: how to remove the transform origin?
        style.innerHTML = "html {height:100%;}" +
                          ".noScroll{overflow:hidden !important;}" +
                          "body.noScroll,html.noScroll body{margin-right:15px;}" +
                          "* {"+transformOrigin+"}";
        
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    function constructDefaultSettings() {
        return {
            targetsize: 0.9,
            scalemode: "both",
            root: $(document.body),
            debug: false,
            animationendcallback: null,
            closeclick: false
        };
    }
    
    //**********************************//
    //***  Main zoom function        ***//
    //**********************************//
    
    function zoomTo(elem, settings) {
    
        var scrollData = handleScrolling(elem, settings);
        
        var rootTransformation;
        var animationendcallback = null;
        
        setTransformOrigin(settings.root);
        
        // computeTotalTransformation does not work correctly if the
        // element and the root are the same
        if(elem[0] !== settings.root[0]) {
            var inv = computeTotalTransformation(elem, settings.root).inverse();
            rootTransformation = computeViewportTransformation(elem, inv, settings);
        	
        	if(settings.animationendcallback) {
                animationendcallback = function() {
                    settings.animationendcallback.call(elem[0]);
                };
            }
        	
        } else {
        
            
            rootTransformation = (new PureCSSMatrix()).translate(-scrollData.x,-scrollData.y);
            animationendcallback = function() {
                var $root = $(settings.root);
                var $scroll = scrollData.elem;
                
                $scroll.removeClass("noScroll");
                
                $root.setTransformation(new PureCSSMatrix());
                $root.data("original-scroll",null);
                
                $(document).off("touchmove");
                
                // this needs to be after the setTransformation and
                // done with window.scrollTo to not have iPhone repaints
                if($scroll[0]==document.body || $scroll[0]==window) {
                    window.scrollTo(scrollData.x,scrollData.y);
                } else {
                    $scroll.scrollLeft(scrollData.x);
                    $scroll.scrollTop(scrollData.y);
                }
                
                if(settings.animationendcallback) {
                    settings.animationendcallback.call(elem[0]);
                }
            };
        }
        
        var animationstartedcallback = null;
        if(scrollData && scrollData.animationstartedcallback) {
            animationstartedcallback = scrollData.animationstartedcallback;
        }
        
        $(settings.root).animateTransformation(rootTransformation, settings, animationendcallback, animationstartedcallback);
        
    }
    
    //**********************************//
    //***  Handle scrolling          ***//
    //**********************************//
    
    function handleScrolling(elem, settings) {
    	
    	var $root = settings.root;
    	var $scroll = $root.parent();
    	
    	if(elem[0] === $root[0]) {
        
            var scrollData = $root.data("original-scroll");
            if(scrollData) {
                return scrollData;
            } else {
                return {"elem": $scroll, "x":0,"y:":0};
            }
            
        } else if(!$root.data("original-scroll")) {
        
            // safari
            var scrollY = $root.scrollTop();
            var scrollX = $root.scrollLeft();
            var elem = $root;
            
            // moz
            if(!scrollY) {
                scrollY = $scroll.scrollTop();
                scrollX = $scroll.scrollLeft();
                elem = $scroll;
            }
            
            var scrollData = {"elem":elem,"x":scrollX,"y":scrollY};
            $root.data("original-scroll",scrollData);
            
            $(document).on("touchmove", function(e) {
                e.preventDefault();
            });
            
            var transformStr = "translate(-"+scrollX+"px,-"+scrollY+"px)";
            helpers.forEachPrefix(function(prefix) {
                $root.css(prefix+"transform", transformStr);
            });
            
            elem.addClass("noScroll");
            
            scrollData.animationstartedcallback = function() {
                
                // this needs to be after the setTransformation and
                // done with window.scrollTo to not have iPhone repaints
                if(elem[0]==document.body || elem[0]==document) {
                    window.scrollTo(0,0);
                } else {
                    elem.scrollLeft(0);
                    elem.scrollTop(0);
                }
                
            };
            
            return scrollData;
	    }
	}
			
    //**********************************//
    //***  Element positioning       ***//
    //**********************************//
    
    function setTransformOrigin(zoomParent) {
        var zoomViewport = $(zoomParent).parent();
        
        var dw = zoomViewport.width();
        var dh = zoomViewport.height();
        
        var xrotorigin = dw/2.0;
        var yrotorigin = dh/2.0;
        
        var offsetStr = printFixedNumber(xrotorigin)+"px "+printFixedNumber(yrotorigin)+"px";
        
        helpers.forEachPrefix(function(prefix) {
             zoomParent.css(prefix+"transform-origin", offsetStr);
        });    
    }
    
    function computeViewportTransformation(elem, endtrans, settings) {
        var zoomAmount = settings.targetsize;
        var zoomMode = settings.scalemode;
        var zoomParent = settings.root;
        var zoomViewport = $(zoomParent).parent();
        
        var dw = zoomViewport.width();
        var dh = zoomViewport.height();
        
        var relw = dw/elem.outerWidth();
        var relh = dh/elem.outerHeight();
        
        var scale;
        if(zoomMode=="width") {
            scale = zoomAmount*relw;
        } else if(zoomMode=="height") {
            scale = zoomAmount*relh;
        } else if(zoomMode=="both") {
            scale = zoomAmount*Math.min(relw,relh);
        } else if(zoomMode=="scale") {
        	scale = zoomAmount;
        } else {
            console.log("wrong zoommode");
            return;
        }
        
        var xoffset = (dw-elem.outerWidth()*scale)/2.0;
        var yoffset = (dh-elem.outerHeight()*scale)/2.0;
        
        var xrotorigin = dw/2.0;
        var yrotorigin = dh/2.0;
        
        /* fix for body margins, hope that this does not break anything .. */
        /* see also the part of the fix that is in computeTotalTransformation! */
        var xmarginfix = -parseFloat(zoomParent.css("margin-left")) || 0;
        var ymarginfix = -parseFloat(zoomParent.css("margin-top")) || 0;
        
        var viewportTransformation = 
            (new PureCSSMatrix())
            .translate(xmarginfix,ymarginfix)
            .translate(-xrotorigin,-yrotorigin)
            .translate(xoffset,yoffset)
            .scale(scale,scale)
            .multiply(endtrans)
            .translate(xrotorigin,yrotorigin);
        
        return viewportTransformation;
    }
    
    //**********************************//
    //***  Debugging positioning     ***//
    //**********************************//
    
    function calcPoint(e,x,y) {
        return [e.a*x+e.c*y+e.e,e.b*x+e.d*y+e.f];
    }
    
    function showDebug(elem, settings) {
        var e = computeTotalTransformation(elem, settings.root).elements();
        displayLabel(calcPoint(e,0,0));
        displayLabel(calcPoint(e,0,elem.outerHeight()));
        displayLabel(calcPoint(e,elem.outerWidth(),elem.outerHeight()));
        displayLabel(calcPoint(e,elem.outerWidth(),0));
    }
    
    function displayLabel(pos) {
        var labelStyle = "width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";
        labelStyle += 'left:'+pos[0]+'px;top:'+pos[1]+'px;';
        var label = '<div class="debuglabel" style="'+labelStyle+'"></div>';
        $("#debug").append(label);
    }
    
    //**********************************//
    //***  Calculating element       ***//
    //***  total transformation      ***//
    //**********************************//
    
    /* Based on:
     * jQuery.fn.offset
     */
    function computeTotalTransformation(input, transformationRootElement) {
        var elem = input[0];
        if( !elem || !elem.ownerDocument ) {
            return null;
        }
        
        var totalTransformation = new PureCSSMatrix();
        
        var trans;
        if ( elem === elem.ownerDocument.body ) {
            var bOffset = jQuery.offset.bodyOffset( elem );
            trans = new PureCSSMatrix();
            trans = trans.translate(bOffset.left, bOffset.top);
            totalTransformation = totalTransformation.multiply(trans);
            return totalTransformation;
        }
        
        var support;
        if(jQuery.offset.initialize) {
            jQuery.offset.initialize();
            support = {
                fixedPosition:jQuery.offset.supportsFixedPosition,
                doesNotAddBorder:jQuery.offset.doesNotAddBorder,
                doesAddBorderForTableAndCells:jQuery.support.doesAddBorderForTableAndCells,
                subtractsBorderForOverflowNotVisible:jQuery.offset.subtractsBorderForOverflowNotVisible
            }
        } else {
            support = jQuery.support;
        }
        
        var offsetParent = elem.offsetParent;
        var doc = elem.ownerDocument;
        var computedStyle;
        var docElem = doc.documentElement;
        var body = doc.body;
        var root = transformationRootElement[0];
        var defaultView = doc.defaultView;
        var prevComputedStyle;
        if(defaultView) {
            prevComputedStyle = defaultView.getComputedStyle( elem, null );
        } else {
            prevComputedStyle = elem.currentStyle;
        }
        
        /*
        function offsetParentInsideRoot($elem, $root) {
            // FIXME:
            // wondering, should this be $root.closest()
            // or $root.parent().closest...
            var $viewport = $root.parent();
            var $offsetParent = $elem.offsetParent();
            return ($viewport[0]==$offsetParent[0]) || $viewport.closest($offsetParent).length==0;
        }
        
        console.log("inside root",offsetParentInsideRoot(input, transformationRootElement));
        */
        
        var top = elem.offsetTop;
        var left = elem.offsetLeft;
        
        var transformation = constructTransformation().translate(left,top);
        transformation = transformation.multiply(constructTransformation(elem));
        totalTransformation = transformation.multiply((totalTransformation));
        // loop from node down to root
        while ( (elem = elem.parentNode) && elem !== root) {
            top = 0; left = 0;
            if ( support.fixedPosition && prevComputedStyle.position === "fixed" ) {
                break;
            }
            computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
            top  -= elem.scrollTop;
            left -= elem.scrollLeft;
            if ( elem === offsetParent ) {
                top  += elem.offsetTop;
                left += elem.offsetLeft;
                if ( support.doesNotAddBorder && !(support.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName)) ) {
                    top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
                    left += parseFloat( computedStyle.borderLeftWidth ) || 0;
                }
                offsetParent = elem.offsetParent;
            }
            if ( support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
                top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
                left += parseFloat( computedStyle.borderLeftWidth ) || 0;
            }
            prevComputedStyle = computedStyle;
            
            if(elem.offsetParent==root) {
                top -= parseFloat($(elem.offsetParent).css("margin-top")) || 0;
                left -= parseFloat($(elem.offsetParent).css("margin-left")) || 0;
            }
            
            transformation = constructTransformation().translate(left,top);
            transformation = transformation.multiply(constructTransformation(elem));
            totalTransformation = transformation.multiply(totalTransformation);
        
        }
        
        top = 0;
        left = 0;
        
        // fixme: should disable these for non-body roots?
        if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
            top  += body.offsetTop;
            left += body.offsetLeft;
        }
        if ( support.fixedPosition && prevComputedStyle.position === "fixed" ) {
            top  += Math.max( docElem.scrollTop, body.scrollTop );
            left += Math.max( docElem.scrollLeft, body.scrollLeft );
        }
        
        var itertrans = (new PureCSSMatrix()).translate(left,top);
        totalTransformation = totalTransformation.multiply(itertrans);
        
        return totalTransformation;
        
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function printFixedNumber(x) {
        return Number(x).toFixed(6);
    }
    
    function constructTransformation(elem) {
        var rawTrans = helpers.getElementTransform(elem);
        if(!rawTrans) {
            return new PureCSSMatrix();
        } else {
            return new PureCSSMatrix(rawTrans);
        }
    }  
    
})(jQuery);
/*
 * jquery.zoomooz-zoomtarget.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var helpers = $.zoomooz.helpers;
    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    $.fn.zoomTarget = function(baseSettings) {
        this.each(function() {
            var settings = $(this).zoomSettings(baseSettings);
            setupClickHandler($(this),$(this),settings);
        });
    }
    
    //**********************************//
    //***  Helper functions          ***//
    //**********************************//
    
    function setupClickHandler(clickTarget, zoomTarget, settings) {
        clickTarget.addClass("zoomTarget");
    
        if(!settings.animationendcallback) {
            if(!settings.closeclick) {
                settings.animationendcallback = function() {
                    $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                    clickTarget.addClass("selectedZoomTarget zoomNotClickable");
                };
            } else {
                settings.animationendcallback = function() {
                    $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                    clickTarget.addClass("selectedZoomTarget");
                };
            }
        }
        
        var zoomContainer = zoomTarget.closest(".zoomContainer");
        if(zoomContainer.length!=0) {
            settings.root = zoomContainer;
        }
        
        var $root = settings.root;
            
        if(!$root.hasClass("zoomTarget")) {
        
            var rootSettings = $root.zoomSettings({});
            
            rootSettings.animationendcallback = function() {
                var $elem = $(this);
                $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                $elem.addClass("selectedZoomTarget zoomNotClickable");
                $elem.parent().addClass("selectedZoomTarget zoomNotClickable");
            };
            
            setupClickHandler($root,$root,rootSettings);
            setupClickHandler($root.parent(),$root,rootSettings);
            
            // FIXME: there could be many of these called simultaneously,
            // don't know what would happen then
            $root.click();
        }
        
        clickTarget.on("click", function(evt) {
            
            // closeclick not available here...
            if(settings.closeclick && zoomTarget.hasClass("selectedZoomTarget")) {
                settings.root.click();
            } else {
                zoomTarget.zoomTo(settings);
            }
            evt.stopPropagation();
        });
    }
    
    //**********************************//
    //***  Setup functions           ***//
    //**********************************//
    
    /* setup css styles in javascript to not need an extra zoomooz.css file for the user to load.
       having the styles here helps also at keeping the css requirements minimal. */
    function setupCssStyles() {
        var style = document.createElement('style');
        style.type = 'text/css';
        
        function setupSelectionCss(enabled) {
            var selectionString = "-webkit-touch-callout: "+(enabled?"default":"none")+";";
            helpers.forEachPrefix(function(prefix) {
                selectionString += prefix+"user-select:"+(enabled?"text":"none")+";";
            },true);
            return selectionString;
        }
                   
        // FIXME: how to remove the html height requirement?
        // FIXME: how to remove the transform origin?
        style.innerHTML = ".zoomTarget{"+setupSelectionCss(false)+"}"+
                          ".zoomTarget:hover{cursor:pointer!important;}"+
                          ".zoomNotClickable{"+setupSelectionCss(true)+"}"+
                          ".zoomNotClickable:hover{cursor:auto!important;}"+
                          /* padding to fix margin collapse issues */
                          ".zoomContainer{position:relative;padding:1px;margin:-1px;}";
                          
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    setupCssStyles();
    
    // make all elements with the zoomTarget class zooming
    $(document).ready(function() {
        // this needs to be after the "$.fn.zoomTarget" has been initialized
        $(".zoomTarget").zoomTarget();
    });

})(jQuery);

/*
 * jquery.zoomooz-container.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    //var helpers = $.zoomooz.helpers;

    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    $.fn.zoomContainer = function(settings) {
    
        // add next and previous calls to the canvas
        // (auto detect next and previous buttons)
    
    }

    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    // FIXME: move zoomContainer styling here?
    //setupCssStyles();
    
    // make all elements with the zoomContainer class zooming containers
    $(document).ready(function() {
        // this needs to be after the "$.fn.zoomContainer" has been initialized
        $(".zoomContainer").zoomContainer();
    });
    
})(jQuery);

// Everything but the relevant parts stripped out by Janne Aukia
// for Zoomooz on April 4 2012 by using jscoverage coverage analysis tool.

// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

var Sylvester = {
  version: '0.1.3',
  precision: 1e-6
};

function Matrix() {}
Matrix.prototype = {

  // Returns a copy of the matrix
  dup: function() {
    return Matrix.create(this.elements);
  },
  
  // Maps the matrix to another matrix (of the same dimensions) according to the given function
  /*map: function(fn) {
    var els = [], ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      els[i] = [];
      do { j = kj - nj;
        els[i][j] = fn(this.elements[i][j], i + 1, j + 1);
      } while (--nj);
    } while (--ni);
    return Matrix.create(els);
  },*/

  // Returns true iff the matrix can multiply the argument from the left
  canMultiplyFromLeft: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    // this.columns should equal matrix.rows
    return (this.elements[0].length == M.length);
  },
  
  // Returns the result of multiplying the matrix from the right by the argument.
  // If the argument is a scalar then just multiply all the elements. If the argument is
  // a vector, a vector is returned, which saves you having to remember calling
  // col(1) on the result.
  multiply: function(matrix) {
    /*if (!matrix.elements) {
      return this.map(function(x) { return x * matrix; });
    }*/
    var returnVector = matrix.modulus ? true : false;
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (!this.canMultiplyFromLeft(M)) { return null; }
    var ni = this.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    var cols = this.elements[0].length, elements = [], sum, nc, c;
    do { i = ki - ni;
      elements[i] = [];
      nj = kj;
      do { j = kj - nj;
        sum = 0;
        nc = cols;
        do { c = cols - nc;
          sum += this.elements[i][c] * M[c][j];
        } while (--nc);
        elements[i][j] = sum;
      } while (--nj);
    } while (--ni);
    var M = Matrix.create(elements);
    return returnVector ? M.col(1) : M;
  },

  // Returns true iff the matrix is square
  isSquare: function() {
    return (this.elements.length == this.elements[0].length);
  },

  // Make the matrix upper (right) triangular by Gaussian elimination.
  // This method only adds multiples of rows to other rows. No rows are
  // scaled up or switched, and the determinant is preserved.
  toRightTriangular: function() {
    var M = this.dup(), els;
    var n = this.elements.length, k = n, i, np, kp = this.elements[0].length, p;
    do { i = k - n;
      if (M.elements[i][i] == 0) {
        for (j = i + 1; j < k; j++) {
          if (M.elements[j][i] != 0) {
            els = []; np = kp;
            do { p = kp - np;
              els.push(M.elements[i][p] + M.elements[j][p]);
            } while (--np);
            M.elements[i] = els;
            break;
          }
        }
      }
      if (M.elements[i][i] != 0) {
        for (j = i + 1; j < k; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i];
          els = []; np = kp;
          do { p = kp - np;
            // Elements with column numbers up to an including the number
            // of the row that we're subtracting can safely be set straight to
            // zero, since that's the point of this routine and it avoids having
            // to loop over and correct rounding errors later
            els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier);
          } while (--np);
          M.elements[j] = els;
        }
      }
    } while (--n);
    return M;
  },

  // Returns the determinant for square matrices
  determinant: function() {
    if (!this.isSquare()) { return null; }
    var M = this.toRightTriangular();
    var det = M.elements[0][0], n = M.elements.length - 1, k = n, i;
    do { i = k - n + 1;
      det = det * M.elements[i][i];
    } while (--n);
    return det;
  },

  // Returns true iff the matrix is singular
  isSingular: function() {
    return (this.isSquare() && this.determinant() === 0);
  },

  // Returns the result of attaching the given argument to the right-hand side of the matrix
  augment: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    var T = this.dup(), cols = T.elements[0].length;
    var ni = T.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    if (ni != M.length) { return null; }
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        T.elements[i][cols + j] = M[i][j];
      } while (--nj);
    } while (--ni);
    return T;
  },

  // Returns the inverse (if one exists) using Gauss-Jordan
  inverse: function() {
    if (!this.isSquare() || this.isSingular()) { return null; }
    var ni = this.elements.length, ki = ni, i, j;
    var M = this.augment(Matrix.I(ni)).toRightTriangular();
    var np, kp = M.elements[0].length, p, els, divisor;
    var inverse_elements = [], new_element;
    // Matrix is non-singular so there will be no zeros on the diagonal
    // Cycle through rows from last to first
    do { i = ni - 1;
      // First, normalise diagonal elements to 1
      els = []; np = kp;
      inverse_elements[i] = [];
      divisor = M.elements[i][i];
      do { p = kp - np;
        new_element = M.elements[i][p] / divisor;
        els.push(new_element);
        // Shuffle of the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= ki) { inverse_elements[i].push(new_element); }
      } while (--np);
      M.elements[i] = els;
      // Then, subtract this row from those above it to
      // give the identity matrix on the left hand side
      for (j = 0; j < i; j++) {
        els = []; np = kp;
        do { p = kp - np;
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
        } while (--np);
        M.elements[j] = els;
      }
    } while (--ni);
    return Matrix.create(inverse_elements);
  },

  // Set the matrix's elements from an array. If the argument passed
  // is a vector, the resulting matrix will be a single column.
  setElements: function(els) {
    var i, elements = els.elements || els;
    if (typeof(elements[0][0]) != 'undefined') {
      var ni = elements.length, ki = ni, nj, kj, j;
      this.elements = [];
      do { i = ki - ni;
        nj = elements[i].length; kj = nj;
        this.elements[i] = [];
        do { j = kj - nj;
          this.elements[i][j] = elements[i][j];
        } while (--nj);
      } while(--ni);
      return this;
    }
    var n = elements.length, k = n;
    this.elements = [];
    do { i = k - n;
      this.elements.push([elements[i]]);
    } while (--n);
    return this;
  }
};

// Constructor function
Matrix.create = function(elements) {
  var M = new Matrix();
  return M.setElements(elements);
};

// Identity matrix of size n
Matrix.I = function(n) {
  var els = [], k = n, i, nj, j;
  do { i = k - n;
    els[i] = []; nj = k;
    do { j = k - nj;
      els[i][j] = (i == j) ? 1 : 0;
    } while (--nj);
  } while (--n);
  return Matrix.create(els);
};
;(function($, window, documentElement, height, width) {
    
    // browser detection code courtesy of quirksmode, http://www.quirksmode.org/js/detect.html
    // slightly simplified, as well as minor changes for readability purposes

    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },

        searchString: function (data) {
            for (var i=0;i<data.length;i++)    {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },

        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },

        dataBrowser: [
            { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome"                            },
            { string: navigator.vendor,    subString: "Apple",   identity: "Safari",  versionSearch: "Version" },
            { prop: window.opera,                                identity: "Opera",   versionSearch: "Version" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox"                           },
            { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer", versionSearch: "MSIE"   }
        ],

        dataOS : [
            { string: navigator.platform,  subString: "Win",    identity: "Windows"     },
            { string: navigator.platform,  subString: "Mac",    identity: "Mac"         },
            { string: navigator.platform,  subString: "Linux",  identity: "Linux"       }
        ]

    };

    BrowserDetect.init();
    // Browser name: BrowserDetect.browser
    // Browser version: BrowserDetect.version
    // OS name: BrowserDetect.OS
    
    // here are major browsers' keyboard mapping for triggering fullscreen on/off
    var keys = {
        "MSIE": {
            "Windows": { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               }
        },
        "Firefox": {
            "Windows": { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Linux":   { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Mac":     { ctrlKey: false, altKey: false, metaKey: true,  shiftKey: true,  which:  70, string: "&#x21E7;&#x2318;F", alt: "Shift+Command+F"   }
        },
        "Chrome": {
            "Windows": { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Linux":   { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Mac":     { ctrlKey: false, altKey: false, metaKey: true,  shiftKey: true,  which:  70, string: "&#x21E7;&#x2318;F", alt: "Shift+Command+F"   }
        },
        "Safari": { // still missing Safari on Windows... help!
            "Mac":     { ctrlKey: true,  altKey: false, metaKey: false, shiftKey: true,  which:  70, string: "^&#x2318;F",        alt: "Control+Command+F" }
        },
        "Opera": {
            "Windows": { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Linux":   { ctrlKey: false, altKey: false, metaKey: false, shiftKey: false, which: 122, string: "F11",               alt: "F11"               },
            "Mac":     { ctrlKey: false, altKey: false, metaKey: true,  shiftKey: true,  which:  70, string: "&#x21E7;&#x2318;F", alt: "Shift+Command+F"   }
        },

    };

    var 
        isFullScreen = function() {
            return (documentElement.clientHeight == height && documentElement.clientWidth == width) ||
                window.fullScreen ||
                (window.outerHeight == height && window.outerWidth == width) ||
                (BrowserDetect.browser == "Safari" && window.outerHeight == (height - 40) && window.outerWidth == width)
            ;
        }
        ,$window = $(window)
    ;
    
    var thisKeys = keys[BrowserDetect.browser][BrowserDetect.OS];
    var shortcut = { shortcut: thisKeys.string, longform: thisKeys.alt };

    $window
        .data('fullscreen-state', isFullScreen())
        .data('fullscreen-key',   shortcut)
        .resize(function() {
            var fullscreenState = isFullScreen();
            
            if ($window.data('fullscreen-state') && !fullscreenState) {
                $window
                    .data('fullscreen-state', fullscreenState)
                    .trigger('fullscreen-toggle', [false])
                    .trigger('fullscreen-off')
                ;
            }
            else if (!$window.data('fullscreen-state') && fullscreenState) {
                $window
                    .data('fullscreen-state', fullscreenState)
                    .trigger('fullscreen-toggle', [true])
                    .trigger('fullscreen-on')
                ;
            }
        })
        .keydown(function(e) {
            if (thisKeys && e.ctrlKey == thisKeys.ctrlKey && e.altKey == thisKeys.altKey && e.metaKey == thisKeys.metaKey && e.shiftKey == thisKeys.shiftKey && e.which == thisKeys.which)
                $window.trigger('fullscreen-key', [thisKeys.string, thisKeys.alt]);
        })
    ;

})(jQuery, this, document.documentElement, screen.height, screen.width);
;/*
 * qTip2 - Pretty powerful tooltips - v2.1.1
 * http://qtip2.com
 *
 * Copyright (c) 2013 Craig Michael Thompson
 * Released under the MIT, GPL licenses
 * http://jquery.org/license
 *
 * Date: Sat Jul 20 2013 02:23 UTC+0000
 * Plugins: tips svg modal
 * Styles: basic css3
 */
/*global window: false, jQuery: false, console: false, define: false */

/* Cache window, document, undefined */
(function( window, document, undefined ) {

// Uses AMD or browser globals to create a jQuery plugin.
(function( factory ) {
	"use strict";
	if(typeof define === 'function' && define.amd) {
		define(['jquery', 'imagesloaded'], factory);
	}
	else if(jQuery && !jQuery.fn.qtip) {
		factory(jQuery);
	}
}
(function($) {
	/* This currently causes issues with Safari 6, so for it's disabled */
	//"use strict"; // (Dis)able ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

;// Munge the primitives - Paul Irish tip
var TRUE = true,
FALSE = false,
NULL = null,

// Common variables
X = 'x', Y = 'y',
WIDTH = 'width',
HEIGHT = 'height',

// Positioning sides
TOP = 'top',
LEFT = 'left',
BOTTOM = 'bottom',
RIGHT = 'right',
CENTER = 'center',

// Position adjustment types
FLIP = 'flip',
FLIPINVERT = 'flipinvert',
SHIFT = 'shift',

// Shortcut vars
QTIP, PROTOTYPE, CORNER, CHECKS,
PLUGINS = {},
NAMESPACE = 'qtip',
ATTR_HAS = 'data-hasqtip',
ATTR_ID = 'data-qtip-id',
WIDGET = ['ui-widget', 'ui-tooltip'],
SELECTOR = '.'+NAMESPACE,
INACTIVE_EVENTS = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '),

CLASS_FIXED = NAMESPACE+'-fixed',
CLASS_DEFAULT = NAMESPACE + '-default',
CLASS_FOCUS = NAMESPACE + '-focus',
CLASS_HOVER = NAMESPACE + '-hover',
CLASS_DISABLED = NAMESPACE+'-disabled',

replaceSuffix = '_replacedByqTip',
oldtitle = 'oldtitle',
trackingBound;

// Browser detection
BROWSER = {
	/*
	 * IE version detection
	 *
	 * Adapted from: http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
	 * Credit to James Padolsey for the original implemntation!
	 */
	ie: (function(){
		var v = 3, div = document.createElement('div');
		while ((div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->')) {
			if(!div.getElementsByTagName('i')[0]) { break; }
		}
		return v > 4 ? v : NaN;
	}()),
 
	/*
	 * iOS version detection
	 */
	iOS: parseFloat( 
		('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
		.replace('undefined', '3_2').replace('_', '.').replace('_', '')
	) || FALSE
};

;function QTip(target, options, id, attr) {
	// Elements and ID
	this.id = id;
	this.target = target;
	this.tooltip = NULL;
	this.elements = elements = { target: target };

	// Internal constructs
	this._id = NAMESPACE + '-' + id;
	this.timers = { img: {} };
	this.options = options;
	this.plugins = {};

	// Cache object
	this.cache = cache = {
		event: {},
		target: $(),
		disabled: FALSE,
		attr: attr,
		onTooltip: FALSE,
		lastClass: ''
	};

	// Set the initial flags
	this.rendered = this.destroyed = this.disabled = this.waiting = 
		this.hiddenDuringWait = this.positioning = this.triggering = FALSE;
}
PROTOTYPE = QTip.prototype;

PROTOTYPE.render = function(show) {
	if(this.rendered || this.destroyed) { return this; } // If tooltip has already been rendered, exit

	var self = this,
		options = this.options,
		cache = this.cache,
		elements = this.elements,
		text = options.content.text,
		title = options.content.title,
		button = options.content.button,
		posOptions = options.position,
		namespace = '.'+this._id+' ',
		deferreds = [];

	// Add ARIA attributes to target
	$.attr(this.target[0], 'aria-describedby', this._id);

	// Create tooltip element
	this.tooltip = elements.tooltip = tooltip = $('<div/>', {
		'id': this._id,
		'class': [ NAMESPACE, CLASS_DEFAULT, options.style.classes, NAMESPACE + '-pos-' + options.position.my.abbrev() ].join(' '),
		'width': options.style.width || '',
		'height': options.style.height || '',
		'tracking': posOptions.target === 'mouse' && posOptions.adjust.mouse,

		/* ARIA specific attributes */
		'role': 'alert',
		'aria-live': 'polite',
		'aria-atomic': FALSE,
		'aria-describedby': this._id + '-content',
		'aria-hidden': TRUE
	})
	.toggleClass(CLASS_DISABLED, this.disabled)
	.attr(ATTR_ID, this.id)
	.data(NAMESPACE, this)
	.appendTo(posOptions.container)
	.append(
		// Create content element
		elements.content = $('<div />', {
			'class': NAMESPACE + '-content',
			'id': this._id + '-content',
			'aria-atomic': TRUE
		})
	);

	// Set rendered flag and prevent redundant reposition calls for now
	this.rendered = -1;
	this.positioning = TRUE;

	// Create title...
	if(title) {
		this._createTitle();

		// Update title only if its not a callback (called in toggle if so)
		if(!$.isFunction(title)) {
			deferreds.push( this._updateTitle(title, FALSE) );
		}
	}

	// Create button
	if(button) { this._createButton(); }

	// Set proper rendered flag and update content if not a callback function (called in toggle)
	if(!$.isFunction(text)) {
		deferreds.push( this._updateContent(text, FALSE) );
	}
	this.rendered = TRUE;

	// Setup widget classes
	this._setWidget();

	// Assign passed event callbacks (before plugins!)
	$.each(options.events, function(name, callback) {
		$.isFunction(callback) && tooltip.bind(
			(name === 'toggle' ? ['tooltipshow','tooltiphide'] : ['tooltip'+name])
				.join(namespace)+namespace, callback
		);
	});

	// Initialize 'render' plugins
	$.each(PLUGINS, function(name) {
		var instance;
		if(this.initialize === 'render' && (instance = this(self))) {
			self.plugins[name] = instance;
		}
	});

	// Assign events
	this._assignEvents();

	// When deferreds have completed
	$.when.apply($, deferreds).then(function() {
		// tooltiprender event
		self._trigger('render');

		// Reset flags
		self.positioning = FALSE;

		// Show tooltip if not hidden during wait period
		if(!self.hiddenDuringWait && (options.show.ready || show)) {
			self.toggle(TRUE, cache.event, FALSE);
		}
		self.hiddenDuringWait = FALSE;
	});

	// Expose API
	QTIP.api[this.id] = this;

	return this;
};

PROTOTYPE.destroy = function(immediate) {
	// Set flag the signify destroy is taking place to plugins
	// and ensure it only gets destroyed once!
	if(this.destroyed) { return this.target; }

	function process() {
		if(this.destroyed) { return; }
		this.destroyed = TRUE;
		
		var target = this.target,
			title = target.attr(oldtitle);

		// Destroy tooltip if rendered
		if(this.rendered) {
			this.tooltip.stop(1,0).find('*').remove().end().remove();
		}

		// Destroy all plugins
		$.each(this.plugins, function(name) {
			this.destroy && this.destroy();
		});

		// Clear timers and remove bound events
		clearTimeout(this.timers.show);
		clearTimeout(this.timers.hide);
		this._unassignEvents();

		// Remove api object and ARIA attributes
		target.removeData(NAMESPACE).removeAttr(ATTR_ID)
			.removeAttr('aria-describedby');

		// Reset old title attribute if removed
		if(this.options.suppress && title) {
			target.attr('title', title).removeAttr(oldtitle);
		}

		// Remove qTip events associated with this API
		this._unbind(target);

		// Remove ID from used id objects, and delete object references
		// for better garbage collection and leak protection
		this.options = this.elements = this.cache = this.timers = 
			this.plugins = this.mouse = NULL;

		// Delete epoxsed API object
		delete QTIP.api[this.id];
	}

	// If an immediate destory is needed
	if(immediate !== TRUE && this.rendered) {
		tooltip.one('tooltiphidden', $.proxy(process, this));
		!this.triggering && this.hide();
	}

	// If we're not in the process of hiding... process
	else { process.call(this); }

	return this.target;
};

;function invalidOpt(a) {
	return a === NULL || $.type(a) !== 'object';
}

function invalidContent(c) {
	return !( $.isFunction(c) || (c && c.attr) || c.length || ($.type(c) === 'object' && (c.jquery || c.then) ));
}

// Option object sanitizer
function sanitizeOptions(opts) {
	var content, text, ajax, once;

	if(invalidOpt(opts)) { return FALSE; }

	if(invalidOpt(opts.metadata)) {
		opts.metadata = { type: opts.metadata };
	}

	if('content' in opts) {
		content = opts.content;

		if(invalidOpt(content) || content.jquery || content.done) {
			content = opts.content = {
				text: (text = invalidContent(content) ? FALSE : content)
			};
		}
		else { text = content.text; }

		// DEPRECATED - Old content.ajax plugin functionality
		// Converts it into the proper Deferred syntax
		if('ajax' in content) {
			ajax = content.ajax;
			once = ajax && ajax.once !== FALSE;
			delete content.ajax;

			content.text = function(event, api) {
				var loading = text || $(this).attr(api.options.content.attr) || 'Loading...',

				deferred = $.ajax(
					$.extend({}, ajax, { context: api })
				)
				.then(ajax.success, NULL, ajax.error)
				.then(function(content) {
					if(content && once) { api.set('content.text', content); }
					return content;
				},
				function(xhr, status, error) {
					if(api.destroyed || xhr.status === 0) { return; }
					api.set('content.text', status + ': ' + error);
				});

				return !once ? (api.set('content.text', loading), deferred) : loading;
			};
		}

		if('title' in content) {
			if(!invalidOpt(content.title)) {
				content.button = content.title.button;
				content.title = content.title.text;
			}

			if(invalidContent(content.title || FALSE)) {
				content.title = FALSE;
			}
		}
	}

	if('position' in opts && invalidOpt(opts.position)) {
		opts.position = { my: opts.position, at: opts.position };
	}

	if('show' in opts && invalidOpt(opts.show)) {
		opts.show = opts.show.jquery ? { target: opts.show } : 
			opts.show === TRUE ? { ready: TRUE } : { event: opts.show };
	}

	if('hide' in opts && invalidOpt(opts.hide)) {
		opts.hide = opts.hide.jquery ? { target: opts.hide } : { event: opts.hide };
	}

	if('style' in opts && invalidOpt(opts.style)) {
		opts.style = { classes: opts.style };
	}

	// Sanitize plugin options
	$.each(PLUGINS, function() {
		this.sanitize && this.sanitize(opts);
	});

	return opts;
}

// Setup builtin .set() option checks
CHECKS = PROTOTYPE.checks = {
	builtin: {
		// Core checks
		'^id$': function(obj, o, v, prev) {
			var id = v === TRUE ? QTIP.nextid : v,
				new_id = NAMESPACE + '-' + id;

			if(id !== FALSE && id.length > 0 && !$('#'+new_id).length) {
				this._id = new_id;

				if(this.rendered) {
					this.tooltip[0].id = this._id;
					this.elements.content[0].id = this._id + '-content';
					this.elements.title[0].id = this._id + '-title';
				}
			}
			else { obj[o] = prev; }
		},
		'^prerender': function(obj, o, v) {
			v && !this.rendered && this.render(this.options.show.ready);
		},

		// Content checks
		'^content.text$': function(obj, o, v) {
			this._updateContent(v);
		},
		'^content.attr$': function(obj, o, v, prev) {
			if(this.options.content.text === this.target.attr(prev)) {
				this._updateContent( this.target.attr(v) );
			}
		},
		'^content.title$': function(obj, o, v) {
			// Remove title if content is null
			if(!v) { return this._removeTitle(); }

			// If title isn't already created, create it now and update
			v && !this.elements.title && this._createTitle();
			this._updateTitle(v);
		},
		'^content.button$': function(obj, o, v) {
			this._updateButton(v);
		},
		'^content.title.(text|button)$': function(obj, o, v) {
			this.set('content.'+o, v); // Backwards title.text/button compat
		}, 

		// Position checks
		'^position.(my|at)$': function(obj, o, v){
			'string' === typeof v && (obj[o] = new CORNER(v, o === 'at'));
		},
		'^position.container$': function(obj, o, v){
			this.tooltip.appendTo(v);
		},

		// Show checks
		'^show.ready$': function(obj, o, v) {
			v && (!this.rendered && this.render(TRUE) || this.toggle(TRUE));
		},

		// Style checks
		'^style.classes$': function(obj, o, v, p) {
			this.tooltip.removeClass(p).addClass(v);
		},
		'^style.width|height': function(obj, o, v) {
			this.tooltip.css(o, v);
		},
		'^style.widget|content.title': function() {
			this._setWidget();
		},
		'^style.def': function(obj, o, v) {
			this.tooltip.toggleClass(CLASS_DEFAULT, !!v);
		},

		// Events check
		'^events.(render|show|move|hide|focus|blur)$': function(obj, o, v) {
			tooltip[($.isFunction(v) ? '' : 'un') + 'bind']('tooltip'+o, v);
		},

		// Properties which require event reassignment
		'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function() {
			var posOptions = this.options.position;

			// Set tracking flag
			tooltip.attr('tracking', posOptions.target === 'mouse' && posOptions.adjust.mouse);

			// Reassign events
			this._unassignEvents();
			this._assignEvents();
		}
	}
};

// Dot notation converter
function convertNotation(options, notation) {
	var i = 0, obj, option = options,

	// Split notation into array
	levels = notation.split('.');

	// Loop through
	while( option = option[ levels[i++] ] ) {
		if(i < levels.length) { obj = option; }
	}

	return [obj || options, levels.pop()];
}

PROTOTYPE.get = function(notation) {
	if(this.destroyed) { return this; }

	var o = convertNotation(this.options, notation.toLowerCase()),
		result = o[0][ o[1] ];

	return result.precedance ? result.string() : result;
};

function setCallback(notation, args) {
	var category, rule, match;

	for(category in this.checks) {
		for(rule in this.checks[category]) {
			if(match = (new RegExp(rule, 'i')).exec(notation)) {
				args.push(match);

				if(category === 'builtin' || this.plugins[category]) {
					this.checks[category][rule].apply(
						this.plugins[category] || this, args
					);
				}
			}
		}
	}
}

var rmove = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
	rrender = /^prerender|show\.ready/i;

PROTOTYPE.set = function(option, value) {
	if(this.destroyed) { return this; }

	var rendered = this.rendered,
		reposition = FALSE,
		options = this.options,
		checks = this.checks,
		name;

	// Convert singular option/value pair into object form
	if('string' === typeof option) {
		name = option; option = {}; option[name] = value;
	}
	else { option = $.extend({}, option); }

	// Set all of the defined options to their new values
	$.each(option, function(notation, value) {
		if(!rendered && !rrender.test(notation)) {
			delete option[notation]; return;
		}

		// Set new obj value
		var obj = convertNotation(options, notation.toLowerCase()), previous;
		previous = obj[0][ obj[1] ];
		obj[0][ obj[1] ] = value && value.nodeType ? $(value) : value;

		// Also check if we need to reposition
		reposition = rmove.test(notation) || reposition;

		// Set the new params for the callback
		option[notation] = [obj[0], obj[1], value, previous];
	});

	// Re-sanitize options
	sanitizeOptions(options);

	/*
	 * Execute any valid callbacks for the set options
	 * Also set positioning flag so we don't get loads of redundant repositioning calls.
	 */
	this.positioning = TRUE;
	$.each(option, $.proxy(setCallback, this));
	this.positioning = FALSE;

	// Update position if needed
	if(this.rendered && this.tooltip[0].offsetWidth > 0 && reposition) {
		this.reposition( options.position.target === 'mouse' ? NULL : this.cache.event );
	}

	return this;
};

;PROTOTYPE._update = function(content, element, reposition) {
	var self = this,
		cache = this.cache;

	// Make sure tooltip is rendered and content is defined. If not return
	if(!this.rendered || !content) { return FALSE; }

	// Use function to parse content
	if($.isFunction(content)) {
		content = content.call(this.elements.target, cache.event, this) || '';
	}

	// Handle deferred content
	if($.isFunction(content.then)) {
		cache.waiting = TRUE;
		return content.then(function(c) {
			cache.waiting = FALSE;
			return self._update(c, element);
		}, NULL, function(e) {
			return self._update(e, element);
		});
	}

	// If content is null... return false
	if(content === FALSE || (!content && content !== '')) { return FALSE; }

	// Append new content if its a DOM array and show it if hidden
	if(content.jquery && content.length > 0) {
		element.children().detach().end().append( content.css({ display: 'block' }) );
	}

	// Content is a regular string, insert the new content
	else { element.html(content); }

	// If imagesLoaded is included, ensure images have loaded and return promise
	cache.waiting = TRUE;

	return ( $.fn.imagesLoaded ? element.imagesLoaded() : $.Deferred().resolve($([])) )
		.done(function(images) {
			cache.waiting = FALSE;

			// Reposition if rendered
			if(images.length && self.rendered && self.tooltip[0].offsetWidth > 0) {
				self.reposition(cache.event, !images.length);
			}
		})
		.promise();
};

PROTOTYPE._updateContent = function(content, reposition) {
	this._update(content, this.elements.content, reposition);
};

PROTOTYPE._updateTitle = function(content, reposition) {
	if(this._update(content, this.elements.title, reposition) === FALSE) {
		this._removeTitle(FALSE);
	}
};

PROTOTYPE._createTitle = function()
{
	var elements = this.elements,
		id = this._id+'-title';

	// Destroy previous title element, if present
	if(elements.titlebar) { this._removeTitle(); }

	// Create title bar and title elements
	elements.titlebar = $('<div />', {
		'class': NAMESPACE + '-titlebar ' + (this.options.style.widget ? createWidgetClass('header') : '')
	})
	.append(
		elements.title = $('<div />', {
			'id': id,
			'class': NAMESPACE + '-title',
			'aria-atomic': TRUE
		})
	)
	.insertBefore(elements.content)

	// Button-specific events
	.delegate('.qtip-close', 'mousedown keydown mouseup keyup mouseout', function(event) {
		$(this).toggleClass('ui-state-active ui-state-focus', event.type.substr(-4) === 'down');
	})
	.delegate('.qtip-close', 'mouseover mouseout', function(event){
		$(this).toggleClass('ui-state-hover', event.type === 'mouseover');
	});

	// Create button if enabled
	if(this.options.content.button) { this._createButton(); }
};

PROTOTYPE._removeTitle = function(reposition)
{
	var elements = this.elements;

	if(elements.title) {
		elements.titlebar.remove();
		elements.titlebar = elements.title = elements.button = NULL;

		// Reposition if enabled
		if(reposition !== FALSE) { this.reposition(); }
	}
};

;PROTOTYPE.reposition = function(event, effect) {
	if(!this.rendered || this.positioning || this.destroyed) { return this; }

	// Set positioning flag
	this.positioning = TRUE;

	var cache = this.cache,
		tooltip = this.tooltip,
		posOptions = this.options.position,
		target = posOptions.target,
		my = posOptions.my,
		at = posOptions.at,
		viewport = posOptions.viewport,
		container = posOptions.container,
		adjust = posOptions.adjust,
		method = adjust.method.split(' '),
		elemWidth = tooltip.outerWidth(FALSE),
		elemHeight = tooltip.outerHeight(FALSE),
		targetWidth = 0,
		targetHeight = 0,
		type = tooltip.css('position'),
		position = { left: 0, top: 0 },
		visible = tooltip[0].offsetWidth > 0,
		isScroll = event && event.type === 'scroll',
		win = $(window),
		doc = container[0].ownerDocument,
		mouse = this.mouse,
		pluginCalculations, offset;

	// Check if absolute position was passed
	if($.isArray(target) && target.length === 2) {
		// Force left top and set position
		at = { x: LEFT, y: TOP };
		position = { left: target[0], top: target[1] };
	}

	// Check if mouse was the target
	else if(target === 'mouse' && ((event && event.pageX) || cache.event.pageX)) {
		// Force left top to allow flipping
		at = { x: LEFT, y: TOP };

		// Use cached event if one isn't available for positioning
		event = mouse && mouse.pageX && (adjust.mouse || !event || !event.pageX) ? mouse :
			(event && (event.type === 'resize' || event.type === 'scroll') ? cache.event :
			event && event.pageX && event.type === 'mousemove' ? event :
			(!adjust.mouse || this.options.show.distance) && cache.origin && cache.origin.pageX ? cache.origin :
			event) || event || cache.event || mouse || {};

		// Calculate body and container offset and take them into account below
		if(type !== 'static') { position = container.offset(); }
		if(doc.body.offsetWidth !== (window.innerWidth || doc.documentElement.clientWidth)) { offset = $(doc.body).offset(); }

		// Use event coordinates for position
		position = {
			left: event.pageX - position.left + (offset && offset.left || 0),
			top: event.pageY - position.top + (offset && offset.top || 0)
		};

		// Scroll events are a pain, some browsers
		if(adjust.mouse && isScroll) {
			position.left -= mouse.scrollX - win.scrollLeft();
			position.top -= mouse.scrollY - win.scrollTop();
		}
	}

	// Target wasn't mouse or absolute...
	else {
		// Check if event targetting is being used
		if(target === 'event' && event && event.target && event.type !== 'scroll' && event.type !== 'resize') {
			cache.target = $(event.target);
		}
		else if(target !== 'event'){
			cache.target = $(target.jquery ? target : elements.target);
		}
		target = cache.target;

		// Parse the target into a jQuery object and make sure there's an element present
		target = $(target).eq(0);
		if(target.length === 0) { return this; }

		// Check if window or document is the target
		else if(target[0] === document || target[0] === window) {
			targetWidth = BROWSER.iOS ? window.innerWidth : target.width();
			targetHeight = BROWSER.iOS ? window.innerHeight : target.height();

			if(target[0] === window) {
				position = {
					top: (viewport || target).scrollTop(),
					left: (viewport || target).scrollLeft()
				};
			}
		}

		// Check if the target is an <AREA> element
		else if(PLUGINS.imagemap && target.is('area')) {
			pluginCalculations = PLUGINS.imagemap(this, target, at, PLUGINS.viewport ? method : FALSE);
		}

		// Check if the target is an SVG element
		else if(PLUGINS.svg && target[0].ownerSVGElement) {
			pluginCalculations = PLUGINS.svg(this, target, at, PLUGINS.viewport ? method : FALSE);
		}

		// Otherwise use regular jQuery methods
		else {
			targetWidth = target.outerWidth(FALSE);
			targetHeight = target.outerHeight(FALSE);
			position = target.offset();
		}

		// Parse returned plugin values into proper variables
		if(pluginCalculations) {
			targetWidth = pluginCalculations.width;
			targetHeight = pluginCalculations.height;
			offset = pluginCalculations.offset;
			position = pluginCalculations.position;
		}

		// Adjust position to take into account offset parents
		position = this.reposition.offset(target, position, container);

		// Adjust for position.fixed tooltips (and also iOS scroll bug in v3.2-4.0 & v4.3-4.3.2)
		if((BROWSER.iOS > 3.1 && BROWSER.iOS < 4.1) || 
			(BROWSER.iOS >= 4.3 && BROWSER.iOS < 4.33) || 
			(!BROWSER.iOS && type === 'fixed')
		){
			position.left -= win.scrollLeft();
			position.top -= win.scrollTop();
		}

		// Adjust position relative to target
		if(!pluginCalculations || (pluginCalculations && pluginCalculations.adjustable !== FALSE)) {
			position.left += at.x === RIGHT ? targetWidth : at.x === CENTER ? targetWidth / 2 : 0;
			position.top += at.y === BOTTOM ? targetHeight : at.y === CENTER ? targetHeight / 2 : 0;
		}
	}

	// Adjust position relative to tooltip
	position.left += adjust.x + (my.x === RIGHT ? -elemWidth : my.x === CENTER ? -elemWidth / 2 : 0);
	position.top += adjust.y + (my.y === BOTTOM ? -elemHeight : my.y === CENTER ? -elemHeight / 2 : 0);

	// Use viewport adjustment plugin if enabled
	if(PLUGINS.viewport) {
		position.adjusted = PLUGINS.viewport(
			this, position, posOptions, targetWidth, targetHeight, elemWidth, elemHeight
		);

		// Apply offsets supplied by positioning plugin (if used)
		if(offset && position.adjusted.left) { position.left += offset.left; }
		if(offset && position.adjusted.top) {  position.top += offset.top; }
	}

	// Viewport adjustment is disabled, set values to zero
	else { position.adjusted = { left: 0, top: 0 }; }

	// tooltipmove event
	if(!this._trigger('move', [position, viewport.elem || viewport], event)) { return this; }
	delete position.adjusted;

	// If effect is disabled, target it mouse, no animation is defined or positioning gives NaN out, set CSS directly
	if(effect === FALSE || !visible || isNaN(position.left) || isNaN(position.top) || target === 'mouse' || !$.isFunction(posOptions.effect)) {
		tooltip.css(position);
	}

	// Use custom function if provided
	else if($.isFunction(posOptions.effect)) {
		posOptions.effect.call(tooltip, this, $.extend({}, position));
		tooltip.queue(function(next) {
			// Reset attributes to avoid cross-browser rendering bugs
			$(this).css({ opacity: '', height: '' });
			if(BROWSER.ie) { this.style.removeAttribute('filter'); }

			next();
		});
	}

	// Set positioning flag
	this.positioning = FALSE;

	return this;
};

// Custom (more correct for qTip!) offset calculator
PROTOTYPE.reposition.offset = function(elem, pos, container) {
	if(!container[0]) { return pos; }

	var ownerDocument = $(elem[0].ownerDocument),
		quirks = !!BROWSER.ie && document.compatMode !== 'CSS1Compat',
		parent = container[0],
		scrolled, position, parentOffset, overflow;

	function scroll(e, i) {
		pos.left += i * e.scrollLeft();
		pos.top += i * e.scrollTop();
	}

	// Compensate for non-static containers offset
	do {
		if((position = $.css(parent, 'position')) !== 'static') {
			if(position === 'fixed') {
				parentOffset = parent.getBoundingClientRect();
				scroll(ownerDocument, -1);
			}
			else {
				parentOffset = $(parent).position();
				parentOffset.left += (parseFloat($.css(parent, 'borderLeftWidth')) || 0);
				parentOffset.top += (parseFloat($.css(parent, 'borderTopWidth')) || 0);
			}

			pos.left -= parentOffset.left + (parseFloat($.css(parent, 'marginLeft')) || 0);
			pos.top -= parentOffset.top + (parseFloat($.css(parent, 'marginTop')) || 0);

			// If this is the first parent element with an overflow of "scroll" or "auto", store it
			if(!scrolled && (overflow = $.css(parent, 'overflow')) !== 'hidden' && overflow !== 'visible') { scrolled = $(parent); }
		}
	}
	while((parent = parent.offsetParent));

	// Compensate for containers scroll if it also has an offsetParent (or in IE quirks mode)
	if(scrolled && (scrolled[0] !== ownerDocument[0] || quirks)) {
		scroll(scrolled, 1);
	}

	return pos;
};

// Corner class
var C = (CORNER = PROTOTYPE.reposition.Corner = function(corner, forceY) {
	corner = ('' + corner).replace(/([A-Z])/, ' $1').replace(/middle/gi, CENTER).toLowerCase();
	this.x = (corner.match(/left|right/i) || corner.match(/center/) || ['inherit'])[0].toLowerCase();
	this.y = (corner.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase();
	this.forceY = !!forceY;

	var f = corner.charAt(0);
	this.precedance = (f === 't' || f === 'b' ? Y : X);
}).prototype;

C.invert = function(z, center) {
	this[z] = this[z] === LEFT ? RIGHT : this[z] === RIGHT ? LEFT : center || this[z];	
};

C.string = function() {
	var x = this.x, y = this.y;
	return x === y ? x : this.precedance === Y || (this.forceY && y !== 'center') ? y+' '+x : x+' '+y;
};

C.abbrev = function() {
	var result = this.string().split(' ');
	return result[0].charAt(0) + (result[1] && result[1].charAt(0) || '');
};

C.clone = function() {
	return new CORNER( this.string(), this.forceY );
};;
PROTOTYPE.toggle = function(state, event) {
	var cache = this.cache,
		options = this.options,
		tooltip = this.tooltip;

	// Try to prevent flickering when tooltip overlaps show element
	if(event) {
		if((/over|enter/).test(event.type) && (/out|leave/).test(cache.event.type) &&
			options.show.target.add(event.target).length === options.show.target.length &&
			tooltip.has(event.relatedTarget).length) {
			return this;
		}

		// Cache event
		cache.event = $.extend({}, event);
	}
		
	// If we're currently waiting and we've just hidden... stop it
	this.waiting && !state && (this.hiddenDuringWait = TRUE);

	// Render the tooltip if showing and it isn't already
	if(!this.rendered) { return state ? this.render(1) : this; }
	else if(this.destroyed || this.disabled) { return this; }

	var type = state ? 'show' : 'hide',
		opts = this.options[type],
		otherOpts = this.options[ !state ? 'show' : 'hide' ],
		posOptions = this.options.position,
		contentOptions = this.options.content,
		width = this.tooltip.css('width'),
		visible = this.tooltip[0].offsetWidth > 0,
		animate = state || opts.target.length === 1,
		sameTarget = !event || opts.target.length < 2 || cache.target[0] === event.target,
		identicalState, allow, showEvent, delay;

	// Detect state if valid one isn't provided
	if((typeof state).search('boolean|number')) { state = !visible; }

	// Check if the tooltip is in an identical state to the new would-be state
	identicalState = !tooltip.is(':animated') && visible === state && sameTarget;

	// Fire tooltip(show/hide) event and check if destroyed
	allow = !identicalState ? !!this._trigger(type, [90]) : NULL;

	// If the user didn't stop the method prematurely and we're showing the tooltip, focus it
	if(allow !== FALSE && state) { this.focus(event); }

	// If the state hasn't changed or the user stopped it, return early
	if(!allow || identicalState) { return this; }

	// Set ARIA hidden attribute
	$.attr(tooltip[0], 'aria-hidden', !!!state);

	// Execute state specific properties
	if(state) {
		// Store show origin coordinates
		cache.origin = $.extend({}, this.mouse);

		// Update tooltip content & title if it's a dynamic function
		if($.isFunction(contentOptions.text)) { this._updateContent(contentOptions.text, FALSE); }
		if($.isFunction(contentOptions.title)) { this._updateTitle(contentOptions.title, FALSE); }

		// Cache mousemove events for positioning purposes (if not already tracking)
		if(!trackingBound && posOptions.target === 'mouse' && posOptions.adjust.mouse) {
			$(document).bind('mousemove.'+NAMESPACE, this._storeMouse);
			trackingBound = TRUE;
		}

		// Update the tooltip position (set width first to prevent viewport/max-width issues)
		if(!width) { tooltip.css('width', tooltip.outerWidth(FALSE)); }
		this.reposition(event, arguments[2]);
		if(!width) { tooltip.css('width', ''); }

		// Hide other tooltips if tooltip is solo
		if(!!opts.solo) {
			(typeof opts.solo === 'string' ? $(opts.solo) : $(SELECTOR, opts.solo))
				.not(tooltip).not(opts.target).qtip('hide', $.Event('tooltipsolo'));
		}
	}
	else {
		// Clear show timer if we're hiding
		clearTimeout(this.timers.show);

		// Remove cached origin on hide
		delete cache.origin;

		// Remove mouse tracking event if not needed (all tracking qTips are hidden)
		if(trackingBound && !$(SELECTOR+'[tracking="true"]:visible', opts.solo).not(tooltip).length) {
			$(document).unbind('mousemove.'+NAMESPACE);
			trackingBound = FALSE;
		}

		// Blur the tooltip
		this.blur(event);
	}

	// Define post-animation, state specific properties
	after = $.proxy(function() {
		if(state) {
			// Prevent antialias from disappearing in IE by removing filter
			if(BROWSER.ie) { tooltip[0].style.removeAttribute('filter'); }

			// Remove overflow setting to prevent tip bugs
			tooltip.css('overflow', '');

			// Autofocus elements if enabled
			if('string' === typeof opts.autofocus) {
				$(this.options.show.autofocus, tooltip).focus();
			}

			// If set, hide tooltip when inactive for delay period
			this.options.show.target.trigger('qtip-'+this.id+'-inactive');
		}
		else {
			// Reset CSS states
			tooltip.css({
				display: '',
				visibility: '',
				opacity: '',
				left: '',
				top: ''
			});
		}

		// tooltipvisible/tooltiphidden events
		this._trigger(state ? 'visible' : 'hidden');
	}, this);

	// If no effect type is supplied, use a simple toggle
	if(opts.effect === FALSE || animate === FALSE) {
		tooltip[ type ]();
		after();
	}

	// Use custom function if provided
	else if($.isFunction(opts.effect)) {
		tooltip.stop(1, 1);
		opts.effect.call(tooltip, this);
		tooltip.queue('fx', function(n) {
			after(); n();
		});
	}

	// Use basic fade function by default
	else { tooltip.fadeTo(90, state ? 1 : 0, after); }

	// If inactive hide method is set, active it
	if(state) { opts.target.trigger('qtip-'+this.id+'-inactive'); }

	return this;
};

PROTOTYPE.show = function(event) { return this.toggle(TRUE, event); };

PROTOTYPE.hide = function(event) { return this.toggle(FALSE, event); };

;PROTOTYPE.focus = function(event) {
	if(!this.rendered || this.destroyed) { return this; }

	var qtips = $(SELECTOR),
		tooltip = this.tooltip,
		curIndex = parseInt(tooltip[0].style.zIndex, 10),
		newIndex = QTIP.zindex + qtips.length,
		focusedElem;

	// Only update the z-index if it has changed and tooltip is not already focused
	if(!tooltip.hasClass(CLASS_FOCUS)) {
		// tooltipfocus event
		if(this._trigger('focus', [newIndex], event)) {
			// Only update z-index's if they've changed
			if(curIndex !== newIndex) {
				// Reduce our z-index's and keep them properly ordered
				qtips.each(function() {
					if(this.style.zIndex > curIndex) {
						this.style.zIndex = this.style.zIndex - 1;
					}
				});

				// Fire blur event for focused tooltip
				qtips.filter('.' + CLASS_FOCUS).qtip('blur', event);
			}

			// Set the new z-index
			tooltip.addClass(CLASS_FOCUS)[0].style.zIndex = newIndex;
		}
	}

	return this;
};

PROTOTYPE.blur = function(event) {
	if(!this.rendered || this.destroyed) { return this; }

	// Set focused status to FALSE
	this.tooltip.removeClass(CLASS_FOCUS);

	// tooltipblur event
	this._trigger('blur', [ this.tooltip.css('zIndex') ], event);

	return this;
};

;PROTOTYPE.disable = function(state) {
	if(this.destroyed) { return this; }

	if('boolean' !== typeof state) {
		state = !(this.tooltip.hasClass(CLASS_DISABLED) || this.disabled);
	}

	if(this.rendered) {
		this.tooltip.toggleClass(CLASS_DISABLED, state)
			.attr('aria-disabled', state);
	}

	this.disabled = !!state;

	return this;
};

PROTOTYPE.enable = function() { return this.disable(FALSE); };

;PROTOTYPE._createButton = function()
{
	var self = this,
		elements = this.elements,
		tooltip = elements.tooltip,
		button = this.options.content.button,
		isString = typeof button === 'string',
		close = isString ? button : 'Close tooltip';

	if(elements.button) { elements.button.remove(); }

	// Use custom button if one was supplied by user, else use default
	if(button.jquery) {
		elements.button = button;
	}
	else {
		elements.button = $('<a />', {
			'class': 'qtip-close ' + (this.options.style.widget ? '' : NAMESPACE+'-icon'),
			'title': close,
			'aria-label': close
		})
		.prepend(
			$('<span />', {
				'class': 'ui-icon ui-icon-close',
				'html': '&times;'
			})
		);
	}

	// Create button and setup attributes
	elements.button.appendTo(elements.titlebar || tooltip)
		.attr('role', 'button')
		.click(function(event) {
			if(!tooltip.hasClass(CLASS_DISABLED)) { self.hide(event); }
			return FALSE;
		});
};

PROTOTYPE._updateButton = function(button)
{
	// Make sure tooltip is rendered and if not, return
	if(!this.rendered) { return FALSE; }

	var elem = this.elements.button;
	if(button) { this._createButton(); }
	else { elem.remove(); }
};

;// Widget class creator
function createWidgetClass(cls) {
	return WIDGET.concat('').join(cls ? '-'+cls+' ' : ' ');
}

// Widget class setter method
PROTOTYPE._setWidget = function()
{
	var on = this.options.style.widget,
		elements = this.elements,
		tooltip = elements.tooltip,
		disabled = tooltip.hasClass(CLASS_DISABLED);

	tooltip.removeClass(CLASS_DISABLED);
	CLASS_DISABLED = on ? 'ui-state-disabled' : 'qtip-disabled';
	tooltip.toggleClass(CLASS_DISABLED, disabled);

	tooltip.toggleClass('ui-helper-reset '+createWidgetClass(), on).toggleClass(CLASS_DEFAULT, this.options.style.def && !on);
	
	if(elements.content) {
		elements.content.toggleClass( createWidgetClass('content'), on);
	}
	if(elements.titlebar) {
		elements.titlebar.toggleClass( createWidgetClass('header'), on);
	}
	if(elements.button) {
		elements.button.toggleClass(NAMESPACE+'-icon', !on);
	}
};;function showMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED)) { return FALSE; }

	// Clear hide timers
	clearTimeout(this.timers.show);
	clearTimeout(this.timers.hide);

	// Start show timer
	var callback = $.proxy(function(){ this.toggle(TRUE, event); }, this);
	if(this.options.show.delay > 0) {
		this.timers.show = setTimeout(callback, this.options.show.delay);
	}
	else{ callback(); }
}

function hideMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED)) { return FALSE; }

	// Check if new target was actually the tooltip element
	var relatedTarget = $(event.relatedTarget),
		ontoTooltip = relatedTarget.closest(SELECTOR)[0] === this.tooltip[0],
		ontoTarget = relatedTarget[0] === this.options.show.target[0];

	// Clear timers and stop animation queue
	clearTimeout(this.timers.show);
	clearTimeout(this.timers.hide);

	// Prevent hiding if tooltip is fixed and event target is the tooltip.
	// Or if mouse positioning is enabled and cursor momentarily overlaps
	if(this !== relatedTarget[0] && 
		(this.options.position.target === 'mouse' && ontoTooltip) || 
		(this.options.hide.fixed && (
			(/mouse(out|leave|move)/).test(event.type) && (ontoTooltip || ontoTarget))
		))
	{
		try {
			event.preventDefault();
			event.stopImmediatePropagation();
		} catch(e) {}

		return;
	}

	// If tooltip has displayed, start hide timer
	var callback = $.proxy(function(){ this.toggle(FALSE, event); }, this);
	if(this.options.hide.delay > 0) {
		this.timers.hide = setTimeout(callback, this.options.hide.delay);
	}
	else{ callback(); }
}

function inactiveMethod(event) {
	if(this.tooltip.hasClass(CLASS_DISABLED) || !this.options.hide.inactive) { return FALSE; }

	// Clear timer
	clearTimeout(this.timers.inactive);
	this.timers.inactive = setTimeout(
		$.proxy(function(){ this.hide(event); }, this), this.options.hide.inactive
	);
}

function repositionMethod(event) {
	if(this.rendered && this.tooltip[0].offsetWidth > 0) { this.reposition(event); }
}

// Store mouse coordinates
PROTOTYPE._storeMouse = function(event) {
	this.mouse = {
		pageX: event.pageX,
		pageY: event.pageY,
		type: 'mousemove',
		scrollX: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
		scrollY: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
	};
};

// Bind events
PROTOTYPE._bind = function(targets, events, method, suffix, context) {
	var ns = '.' + this._id + (suffix ? '-'+suffix : '');
	events.length && $(targets).bind(
		(events.split ? events : events.join(ns + ' ')) + ns,
		$.proxy(method, context || this)
	);
};
PROTOTYPE._unbind = function(targets, suffix) {
	$(targets).unbind('.' + this._id + (suffix ? '-'+suffix : ''));
};

// Apply common event handlers using delegate (avoids excessive .bind calls!)
var ns = '.'+NAMESPACE;
function delegate(selector, events, method) {	
	$(document.body).delegate(selector,
		(events.split ? events : events.join(ns + ' ')) + ns,
		function() {
			var api = QTIP.api[ $.attr(this, ATTR_ID) ];
			api && !api.disabled && method.apply(api, arguments);
		}
	);
}

$(function() {
	delegate(SELECTOR, ['mouseenter', 'mouseleave'], function(event) {
		var state = event.type === 'mouseenter',
			tooltip = $(event.currentTarget),
			target = $(event.relatedTarget || event.target),
			options = this.options;

		// On mouseenter...
		if(state) {
			// Focus the tooltip on mouseenter (z-index stacking)
			this.focus(event);

			// Clear hide timer on tooltip hover to prevent it from closing
			tooltip.hasClass(CLASS_FIXED) && !tooltip.hasClass(CLASS_DISABLED) && clearTimeout(this.timers.hide);
		}

		// On mouseleave...
		else {
			// Hide when we leave the tooltip and not onto the show target (if a hide event is set)
			if(options.position.target === 'mouse' && options.hide.event && 
				options.show.target && !target.closest(options.show.target[0]).length) {
				this.hide(event);
			}
		}

		// Add hover class
		tooltip.toggleClass(CLASS_HOVER, state);
	});

	// Define events which reset the 'inactive' event handler
	delegate('['+ATTR_ID+']', INACTIVE_EVENTS, inactiveMethod);
});

// Event trigger
PROTOTYPE._trigger = function(type, args, event) {
	var callback = $.Event('tooltip'+type);
	callback.originalEvent = (event && $.extend({}, event)) || this.cache.event || NULL;

	this.triggering = TRUE;
	this.tooltip.trigger(callback, [this].concat(args || []));
	this.triggering = FALSE;

	return !callback.isDefaultPrevented();
};

// Event assignment method
PROTOTYPE._assignEvents = function() {
	var options = this.options,
		posOptions = options.position,

		tooltip = this.tooltip,
		showTarget = options.show.target,
		hideTarget = options.hide.target,
		containerTarget = posOptions.container,
		viewportTarget = posOptions.viewport,
		documentTarget = $(document),
		bodyTarget = $(document.body),
		windowTarget = $(window),

		showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
		hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [],
		toggleEvents = [];

	// Hide tooltips when leaving current window/frame (but not select/option elements)
	if(/mouse(out|leave)/i.test(options.hide.event) && options.hide.leave === 'window') {
		this._bind(documentTarget, ['mouseout', 'blur'], function(event) {
			if(!/select|option/.test(event.target.nodeName) && !event.relatedTarget) {
				this.hide(event);
			}
		});
	}

	// Enable hide.fixed by adding appropriate class
	if(options.hide.fixed) {
		hideTarget = hideTarget.add( tooltip.addClass(CLASS_FIXED) );
	}

	/*
	 * Make sure hoverIntent functions properly by using mouseleave to clear show timer if
	 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
	 */
	else if(/mouse(over|enter)/i.test(options.show.event)) {
		this._bind(hideTarget, 'mouseleave', function() {
			clearTimeout(this.timers.show);
		});
	}

	// Hide tooltip on document mousedown if unfocus events are enabled
	if(('' + options.hide.event).indexOf('unfocus') > -1) {
		this._bind(containerTarget.closest('html'), ['mousedown', 'touchstart'], function(event) {
			var elem = $(event.target),
				enabled = this.rendered && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0,
				isAncestor = elem.parents(SELECTOR).filter(this.tooltip[0]).length > 0;

			if(elem[0] !== this.target[0] && elem[0] !== this.tooltip[0] && !isAncestor &&
				!this.target.has(elem[0]).length && enabled
			) {
				this.hide(event);
			}
		});
	}

	// Check if the tooltip hides when inactive
	if('number' === typeof options.hide.inactive) {
		// Bind inactive method to show target(s) as a custom event
		this._bind(showTarget, 'qtip-'+this.id+'-inactive', inactiveMethod);

		// Define events which reset the 'inactive' event handler
		this._bind(hideTarget.add(tooltip), QTIP.inactiveEvents, inactiveMethod, '-inactive');
	}

	// Apply hide events (and filter identical show events)
	hideEvents = $.map(hideEvents, function(type) {
		var showIndex = $.inArray(type, showEvents);

		// Both events and targets are identical, apply events using a toggle
		if((showIndex > -1 && hideTarget.add(showTarget).length === hideTarget.length)) {
			toggleEvents.push( showEvents.splice( showIndex, 1 )[0] ); return;
		}

		return type;
	});

	// Apply show/hide/toggle events
	this._bind(showTarget, showEvents, showMethod);
	this._bind(hideTarget, hideEvents, hideMethod);
	this._bind(showTarget, toggleEvents, function(event) {
		(this.tooltip[0].offsetWidth > 0 ? hideMethod : showMethod).call(this, event);
	});


	// Mouse movement bindings
	this._bind(showTarget.add(tooltip), 'mousemove', function(event) {
		// Check if the tooltip hides when mouse is moved a certain distance
		if('number' === typeof options.hide.distance) {
			var origin = this.cache.origin || {},
				limit = this.options.hide.distance,
				abs = Math.abs;

			// Check if the movement has gone beyond the limit, and hide it if so
			if(abs(event.pageX - origin.pageX) >= limit || abs(event.pageY - origin.pageY) >= limit) {
				this.hide(event);
			}
		}

		// Cache mousemove coords on show targets
		this._storeMouse(event);
	});

	// Mouse positioning events
	if(posOptions.target === 'mouse') {
		// If mouse adjustment is on...
		if(posOptions.adjust.mouse) {
			// Apply a mouseleave event so we don't get problems with overlapping
			if(options.hide.event) {
				// Track if we're on the target or not
				this._bind(showTarget, ['mouseenter', 'mouseleave'], function(event) {
					this.cache.onTarget = event.type === 'mouseenter';
				});
			}

			// Update tooltip position on mousemove
			this._bind(documentTarget, 'mousemove', function(event) {
				// Update the tooltip position only if the tooltip is visible and adjustment is enabled
				if(this.rendered && this.cache.onTarget && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0) {
					this.reposition(event);
				}
			});
		}
	}

	// Adjust positions of the tooltip on window resize if enabled
	if(posOptions.adjust.resize || viewportTarget.length) {
		this._bind( $.event.special.resize ? viewportTarget : windowTarget, 'resize', repositionMethod );
	}

	// Adjust tooltip position on scroll of the window or viewport element if present
	if(posOptions.adjust.scroll) {
		this._bind( windowTarget.add(posOptions.container), 'scroll', repositionMethod );
	}
};

// Un-assignment method
PROTOTYPE._unassignEvents = function() {
	var targets = [
		this.options.show.target[0],
		this.options.hide.target[0],
		this.rendered && this.tooltip[0],
		this.options.position.container[0],
		this.options.position.viewport[0],
		this.options.position.container.closest('html')[0], // unfocus
		window,
		document
	];

	// Check if tooltip is rendered
	if(this.rendered) {
		this._unbind($([]).pushStack( $.grep(targets, function(i) {
			return typeof i === 'object';
		})));
	}

	// Tooltip isn't yet rendered, remove render event
	else { $(targets[0]).unbind('.'+this._id+'-create'); }
};

;// Initialization method
function init(elem, id, opts)
{
	var obj, posOptions, attr, config, title,

	// Setup element references
	docBody = $(document.body),

	// Use document body instead of document element if needed
	newTarget = elem[0] === document ? docBody : elem,

	// Grab metadata from element if plugin is present
	metadata = (elem.metadata) ? elem.metadata(opts.metadata) : NULL,

	// If metadata type if HTML5, grab 'name' from the object instead, or use the regular data object otherwise
	metadata5 = opts.metadata.type === 'html5' && metadata ? metadata[opts.metadata.name] : NULL,

	// Grab data from metadata.name (or data-qtipopts as fallback) using .data() method,
	html5 = elem.data(opts.metadata.name || 'qtipopts');

	// If we don't get an object returned attempt to parse it manualyl without parseJSON
	try { html5 = typeof html5 === 'string' ? $.parseJSON(html5) : html5; } catch(e) {}

	// Merge in and sanitize metadata
	config = $.extend(TRUE, {}, QTIP.defaults, opts,
		typeof html5 === 'object' ? sanitizeOptions(html5) : NULL,
		sanitizeOptions(metadata5 || metadata));

	// Re-grab our positioning options now we've merged our metadata and set id to passed value
	posOptions = config.position;
	config.id = id;

	// Setup missing content if none is detected
	if('boolean' === typeof config.content.text) {
		attr = elem.attr(config.content.attr);

		// Grab from supplied attribute if available
		if(config.content.attr !== FALSE && attr) { config.content.text = attr; }

		// No valid content was found, abort render
		else { return FALSE; }
	}

	// Setup target options
	if(!posOptions.container.length) { posOptions.container = docBody; }
	if(posOptions.target === FALSE) { posOptions.target = newTarget; }
	if(config.show.target === FALSE) { config.show.target = newTarget; }
	if(config.show.solo === TRUE) { config.show.solo = posOptions.container.closest('body'); }
	if(config.hide.target === FALSE) { config.hide.target = newTarget; }
	if(config.position.viewport === TRUE) { config.position.viewport = posOptions.container; }

	// Ensure we only use a single container
	posOptions.container = posOptions.container.eq(0);

	// Convert position corner values into x and y strings
	posOptions.at = new CORNER(posOptions.at, TRUE);
	posOptions.my = new CORNER(posOptions.my);

	// Destroy previous tooltip if overwrite is enabled, or skip element if not
	if(elem.data(NAMESPACE)) {
		if(config.overwrite) {
			elem.qtip('destroy');
		}
		else if(config.overwrite === FALSE) {
			return FALSE;
		}
	}

	// Add has-qtip attribute
	elem.attr(ATTR_HAS, id);

	// Remove title attribute and store it if present
	if(config.suppress && (title = elem.attr('title'))) {
		// Final attr call fixes event delegatiom and IE default tooltip showing problem
		elem.removeAttr('title').attr(oldtitle, title).attr('title', '');
	}

	// Initialize the tooltip and add API reference
	obj = new QTip(elem, config, id, !!attr);
	elem.data(NAMESPACE, obj);

	// Catch remove/removeqtip events on target element to destroy redundant tooltip
	elem.one('remove.qtip-'+id+' removeqtip.qtip-'+id, function() { 
		var api; if((api = $(this).data(NAMESPACE))) { api.destroy(); }
	});

	return obj;
}

// jQuery $.fn extension method
QTIP = $.fn.qtip = function(options, notation, newValue)
{
	var command = ('' + options).toLowerCase(), // Parse command
		returned = NULL,
		args = $.makeArray(arguments).slice(1),
		event = args[args.length - 1],
		opts = this[0] ? $.data(this[0], NAMESPACE) : NULL;

	// Check for API request
	if((!arguments.length && opts) || command === 'api') {
		return opts;
	}

	// Execute API command if present
	else if('string' === typeof options)
	{
		this.each(function()
		{
			var api = $.data(this, NAMESPACE);
			if(!api) { return TRUE; }

			// Cache the event if possible
			if(event && event.timeStamp) { api.cache.event = event; }

			// Check for specific API commands
			if(notation && (command === 'option' || command === 'options')) {
				if(newValue !== undefined || $.isPlainObject(notation)) {
					api.set(notation, newValue);
				}
				else {
					returned = api.get(notation);
					return FALSE;
				}
			}

			// Execute API command
			else if(api[command]) {
				api[command].apply(api, args);
			}
		});

		return returned !== NULL ? returned : this;
	}

	// No API commands. validate provided options and setup qTips
	else if('object' === typeof options || !arguments.length)
	{
		opts = sanitizeOptions($.extend(TRUE, {}, options));

		// Bind the qTips
		return QTIP.bind.call(this, opts, event);
	}
};

// $.fn.qtip Bind method
QTIP.bind = function(opts, event)
{
	return this.each(function(i) {
		var options, targets, events, namespace, api, id;

		// Find next available ID, or use custom ID if provided
		id = $.isArray(opts.id) ? opts.id[i] : opts.id;
		id = !id || id === FALSE || id.length < 1 || QTIP.api[id] ? QTIP.nextid++ : id;

		// Setup events namespace
		namespace = '.qtip-'+id+'-create';

		// Initialize the qTip and re-grab newly sanitized options
		api = init($(this), id, opts);
		if(api === FALSE) { return TRUE; }
		else { QTIP.api[id] = api; }
		options = api.options;

		// Initialize plugins
		$.each(PLUGINS, function() {
			if(this.initialize === 'initialize') { this(api); }
		});

		// Determine hide and show targets
		targets = { show: options.show.target, hide: options.hide.target };
		events = {
			show: $.trim('' + options.show.event).replace(/ /g, namespace+' ') + namespace,
			hide: $.trim('' + options.hide.event).replace(/ /g, namespace+' ') + namespace
		};

		/*
		 * Make sure hoverIntent functions properly by using mouseleave as a hide event if
		 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
		 */
		if(/mouse(over|enter)/i.test(events.show) && !/mouse(out|leave)/i.test(events.hide)) {
			events.hide += ' mouseleave' + namespace;
		}

		/*
		 * Also make sure initial mouse targetting works correctly by caching mousemove coords
		 * on show targets before the tooltip has rendered.
		 *
		 * Also set onTarget when triggered to keep mouse tracking working
		 */
		targets.show.bind('mousemove'+namespace, function(event) {
			api._storeMouse(event);
			api.cache.onTarget = TRUE;
		});

		// Define hoverIntent function
		function hoverIntent(event) {
			function render() {
				// Cache mouse coords,render and render the tooltip
				api.render(typeof event === 'object' || options.show.ready);

				// Unbind show and hide events
				targets.show.add(targets.hide).unbind(namespace);
			}

			// Only continue if tooltip isn't disabled
			if(api.disabled) { return FALSE; }

			// Cache the event data
			api.cache.event = $.extend({}, event);
			api.cache.target = event ? $(event.target) : [undefined];

			// Start the event sequence
			if(options.show.delay > 0) {
				clearTimeout(api.timers.show);
				api.timers.show = setTimeout(render, options.show.delay);
				if(events.show !== events.hide) {
					targets.hide.bind(events.hide, function() { clearTimeout(api.timers.show); });
				}
			}
			else { render(); }
		}

		// Bind show events to target
		targets.show.bind(events.show, hoverIntent);

		// Prerendering is enabled, create tooltip now
		if(options.show.ready || options.prerender) { hoverIntent(event); }
	});
};

// Populated in render method
QTIP.api = {};
;$.each({
	/* Allow other plugins to successfully retrieve the title of an element with a qTip applied */
	attr: function(attr, val) {
		if(this.length) {
			var self = this[0],
				title = 'title',
				api = $.data(self, 'qtip');

			if(attr === title && api && 'object' === typeof api && api.options.suppress) {
				if(arguments.length < 2) {
					return $.attr(self, oldtitle);
				}

				// If qTip is rendered and title was originally used as content, update it
				if(api && api.options.content.attr === title && api.cache.attr) {
					api.set('content.text', val);
				}

				// Use the regular attr method to set, then cache the result
				return this.attr(oldtitle, val);
			}
		}

		return $.fn['attr'+replaceSuffix].apply(this, arguments);
	},

	/* Allow clone to correctly retrieve cached title attributes */
	clone: function(keepData) {
		var titles = $([]), title = 'title',

		// Clone our element using the real clone method
		elems = $.fn['clone'+replaceSuffix].apply(this, arguments);

		// Grab all elements with an oldtitle set, and change it to regular title attribute, if keepData is false
		if(!keepData) {
			elems.filter('['+oldtitle+']').attr('title', function() {
				return $.attr(this, oldtitle);
			})
			.removeAttr(oldtitle);
		}

		return elems;
	}
}, function(name, func) {
	if(!func || $.fn[name+replaceSuffix]) { return TRUE; }

	var old = $.fn[name+replaceSuffix] = $.fn[name];
	$.fn[name] = function() {
		return func.apply(this, arguments) || old.apply(this, arguments);
	};
});

/* Fire off 'removeqtip' handler in $.cleanData if jQuery UI not present (it already does similar).
 * This snippet is taken directly from jQuery UI source code found here:
 *     http://code.jquery.com/ui/jquery-ui-git.js
 */
if(!$.ui) {
	$['cleanData'+replaceSuffix] = $.cleanData;
	$.cleanData = function( elems ) {
		for(var i = 0, elem; (elem = $( elems[i] )).length; i++) {
			if(elem.attr(ATTR_HAS)) {
				try { elem.triggerHandler('removeqtip'); } 
				catch( e ) {}
			}
		}
		$['cleanData'+replaceSuffix].apply(this, arguments);
	};
}

;// qTip version
QTIP.version = '2.1.1';

// Base ID for all qTips
QTIP.nextid = 0;

// Inactive events array
QTIP.inactiveEvents = INACTIVE_EVENTS;

// Base z-index for all qTips
QTIP.zindex = 15000;

// Define configuration defaults
QTIP.defaults = {
	prerender: FALSE,
	id: FALSE,
	overwrite: TRUE,
	suppress: TRUE,
	content: {
		text: TRUE,
		attr: 'title',
		title: FALSE,
		button: FALSE
	},
	position: {
		my: 'top left',
		at: 'bottom right',
		target: FALSE,
		container: FALSE,
		viewport: FALSE,
		adjust: {
			x: 0, y: 0,
			mouse: TRUE,
			scroll: TRUE,
			resize: TRUE,
			method: 'flipinvert flipinvert'
		},
		effect: function(api, pos, viewport) {
			$(this).animate(pos, {
				duration: 200,
				queue: FALSE
			});
		}
	},
	show: {
		target: FALSE,
		event: 'mouseenter',
		effect: TRUE,
		delay: 90,
		solo: FALSE,
		ready: FALSE,
		autofocus: FALSE
	},
	hide: {
		target: FALSE,
		event: 'mouseleave',
		effect: TRUE,
		delay: 0,
		fixed: FALSE,
		inactive: FALSE,
		leave: 'window',
		distance: FALSE
	},
	style: {
		classes: '',
		widget: FALSE,
		width: FALSE,
		height: FALSE,
		def: TRUE
	},
	events: {
		render: NULL,
		move: NULL,
		show: NULL,
		hide: NULL,
		toggle: NULL,
		visible: NULL,
		hidden: NULL,
		focus: NULL,
		blur: NULL
	}
};

;var TIP,

// .bind()/.on() namespace
TIPNS = '.qtip-tip',

// Common CSS strings
MARGIN = 'margin',
BORDER = 'border',
COLOR = 'color',
BG_COLOR = 'background-color',
TRANSPARENT = 'transparent',
IMPORTANT = ' !important',

// Check if the browser supports <canvas/> elements
HASCANVAS = !!document.createElement('canvas').getContext,

// Invalid colour values used in parseColours()
INVALID = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

// Camel-case method, taken from jQuery source
// http://code.jquery.com/jquery-1.8.0.js
function camel(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/*
 * Modified from Modernizr's testPropsAll()
 * http://modernizr.com/downloads/modernizr-latest.js
 */
var cssProps = {}, cssPrefixes = ["Webkit", "O", "Moz", "ms"];
function vendorCss(elem, prop) {
	var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		props = (prop + ' ' + cssPrefixes.join(ucProp + ' ') + ucProp).split(' '),
		cur, val, i = 0;

	// If the property has already been mapped...
	if(cssProps[prop]) { return elem.css(cssProps[prop]); }

	while((cur = props[i++])) {
		if((val = elem.css(cur)) !== undefined) {
			return cssProps[prop] = cur, val;
		}
	}
}

// Parse a given elements CSS property into an int
function intCss(elem, prop) {
	return parseInt(vendorCss(elem, prop), 10);
}


// VML creation (for IE only)
if(!HASCANVAS) {
	createVML = function(tag, props, style) {
		return '<qtipvml:'+tag+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(props||'')+
			' style="behavior: url(#default#VML); '+(style||'')+ '" />';
	};
}



function Tip(qtip, options) {
	this._ns = 'tip';
	this.options = options;
	this.offset = options.offset;
	this.size = [ options.width, options.height ];

	// Initialize
	this.init( (this.qtip = qtip) );
}

$.extend(Tip.prototype, {
	init: function(qtip) {
		var context, tip;

		// Create tip element and prepend to the tooltip
		tip = this.element = qtip.elements.tip = $('<div />', { 'class': NAMESPACE+'-tip' }).prependTo(qtip.tooltip);

		// Create tip drawing element(s)
		if(HASCANVAS) {
			// save() as soon as we create the canvas element so FF2 doesn't bork on our first restore()!
			context = $('<canvas />').appendTo(this.element)[0].getContext('2d');

			// Setup constant parameters
			context.lineJoin = 'miter';
			context.miterLimit = 100;
			context.save();
		}
		else {
			context = createVML('shape', 'coordorigin="0,0"', 'position:absolute;');
			this.element.html(context + context);

			// Prevent mousing down on the tip since it causes problems with .live() handling in IE due to VML
			qtip._bind( $('*', tip).add(tip), ['click', 'mousedown'], function(event) { event.stopPropagation(); }, this._ns);
		}

		// Bind update events
		qtip._bind(qtip.tooltip, 'tooltipmove', this.reposition, this._ns, this);

		// Create it
		this.create();
	},

	_swapDimensions: function() {
		this.size[0] = this.options.height;
		this.size[1] = this.options.width;
	},
	_resetDimensions: function() {
		this.size[0] = this.options.width;
		this.size[1] = this.options.height;
	},

	_useTitle: function(corner) {
		var titlebar = this.qtip.elements.titlebar;
		return titlebar && (
			corner.y === TOP || (corner.y === CENTER && this.element.position().top + (this.size[1] / 2) + this.options.offset < titlebar.outerHeight(TRUE))
		);
	},

	_parseCorner: function(corner) {
		var my = this.qtip.options.position.my;

		// Detect corner and mimic properties
		if(corner === FALSE || my === FALSE) {
			corner = FALSE;
		}
		else if(corner === TRUE) {
			corner = new CORNER( my.string() );
		}
		else if(!corner.string) {
			corner = new CORNER(corner);
			corner.fixed = TRUE;
		}

		return corner;
	},

	_parseWidth: function(corner, side, use) {
		var elements = this.qtip.elements,
			prop = BORDER + camel(side) + 'Width';

		return (use ? intCss(use, prop) : (
			intCss(elements.content, prop) ||
			intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) ||
			intCss(tooltip, prop)
		)) || 0;
	},

	_parseRadius: function(corner) {
		var elements = this.qtip.elements,
			prop = BORDER + camel(corner.y) + camel(corner.x) + 'Radius';

		return BROWSER.ie < 9 ? 0 :
			intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) || 
			intCss(elements.tooltip, prop) || 0;
	},

	_invalidColour: function(elem, prop, compare) {
		var val = elem.css(prop);
		return !val || (compare && val === elem.css(compare)) || INVALID.test(val) ? FALSE : val;
	},

	_parseColours: function(corner) {
		var elements = this.qtip.elements,
			tip = this.element.css('cssText', ''),
			borderSide = BORDER + camel(corner[ corner.precedance ]) + camel(COLOR),
			colorElem = this._useTitle(corner) && elements.titlebar || elements.content,
			css = this._invalidColour, color = [];

		// Attempt to detect the background colour from various elements, left-to-right precedance
		color[0] = css(tip, BG_COLOR) || css(colorElem, BG_COLOR) || css(elements.content, BG_COLOR) || 
			css(tooltip, BG_COLOR) || tip.css(BG_COLOR);

		// Attempt to detect the correct border side colour from various elements, left-to-right precedance
		color[1] = css(tip, borderSide, COLOR) || css(colorElem, borderSide, COLOR) || 
			css(elements.content, borderSide, COLOR) || css(tooltip, borderSide, COLOR) || tooltip.css(borderSide);

		// Reset background and border colours
		$('*', tip).add(tip).css('cssText', BG_COLOR+':'+TRANSPARENT+IMPORTANT+';'+BORDER+':0'+IMPORTANT+';');

		return color;
	},

	_calculateSize: function(corner) {
		var y = corner.precedance === Y,
			width = this.options[ y ? 'height' : 'width' ],
			height = this.options[ y ? 'width' : 'height' ],
			isCenter = corner.abbrev() === 'c',
			base = width * (isCenter ? 0.5 : 1),
			pow = Math.pow,
			round = Math.round,
			bigHyp, ratio, result,

		smallHyp = Math.sqrt( pow(base, 2) + pow(height, 2) ),
		hyp = [ (this.border / base) * smallHyp, (this.border / height) * smallHyp ];

		hyp[2] = Math.sqrt( pow(hyp[0], 2) - pow(this.border, 2) );
		hyp[3] = Math.sqrt( pow(hyp[1], 2) - pow(this.border, 2) );

		bigHyp = smallHyp + hyp[2] + hyp[3] + (isCenter ? 0 : hyp[0]);
		ratio = bigHyp / smallHyp;

		result = [ round(ratio * width), round(ratio * height) ];

		return y ? result : result.reverse();
	},

	// Tip coordinates calculator
	_calculateTip: function(corner) {	
		var width = this.size[0], height = this.size[1],
			width2 = Math.ceil(width / 2), height2 = Math.ceil(height / 2),

		// Define tip coordinates in terms of height and width values
		tips = {
			br:	[0,0,		width,height,	width,0],
			bl:	[0,0,		width,0,		0,height],
			tr:	[0,height,	width,0,		width,height],
			tl:	[0,0,		0,height,		width,height],
			tc:	[0,height,	width2,0,		width,height],
			bc:	[0,0,		width,0,		width2,height],
			rc:	[0,0,		width,height2,	0,height],
			lc:	[width,0,	width,height,	0,height2]
		};

		// Set common side shapes
		tips.lt = tips.br; tips.rt = tips.bl;
		tips.lb = tips.tr; tips.rb = tips.tl;

		return tips[ corner.abbrev() ];
	},

	create: function() {
		// Determine tip corner
		var c = this.corner = (HASCANVAS || BROWSER.ie) && this._parseCorner(this.options.corner);
		
		// If we have a tip corner...
		if( (this.enabled = !!this.corner && this.corner.abbrev() !== 'c') ) {
			// Cache it
			this.qtip.cache.corner = c.clone();

			// Create it
			this.update();
		}

		// Toggle tip element
		this.element.toggle(this.enabled);

		return this.corner;
	},

	update: function(corner, position) {
		if(!this.enabled) { return this; }

		var elements = this.qtip.elements,
			tip = this.element,
			inner = tip.children(),
			options = this.options,
			size = this.size,
			mimic = options.mimic,
			round = Math.round,
			color, precedance, context,
			coords, translate, newSize, border;

		// Re-determine tip if not already set
		if(!corner) { corner = this.qtip.cache.corner || this.corner; }

		// Use corner property if we detect an invalid mimic value
		if(mimic === FALSE) { mimic = corner; }

		// Otherwise inherit mimic properties from the corner object as necessary
		else {
			mimic = new CORNER(mimic);
			mimic.precedance = corner.precedance;

			if(mimic.x === 'inherit') { mimic.x = corner.x; }
			else if(mimic.y === 'inherit') { mimic.y = corner.y; }
			else if(mimic.x === mimic.y) {
				mimic[ corner.precedance ] = corner[ corner.precedance ];
			}
		}
		precedance = mimic.precedance;

		// Ensure the tip width.height are relative to the tip position
		if(corner.precedance === X) { this._swapDimensions(); }
		else { this._resetDimensions(); }

		// Update our colours
		color = this.color = this._parseColours(corner);

		// Detect border width, taking into account colours
		if(color[1] !== TRANSPARENT) {
			// Grab border width
			border = this.border = this._parseWidth(corner, corner[corner.precedance]);

			// If border width isn't zero, use border color as fill (1.0 style tips)
			if(options.border && border < 1) { color[0] = color[1]; }

			// Set border width (use detected border width if options.border is true)
			this.border = border = options.border !== TRUE ? options.border : border;
		}

		// Border colour was invalid, set border to zero
		else { this.border = border = 0; }

		// Calculate coordinates
		coords = this._calculateTip(mimic);

		// Determine tip size
		newSize = this.size = this._calculateSize(corner);
		tip.css({
			width: newSize[0],
			height: newSize[1],
			lineHeight: newSize[1]+'px'
		});

		// Calculate tip translation
		if(corner.precedance === Y) {
			translate = [
				round(mimic.x === LEFT ? border : mimic.x === RIGHT ? newSize[0] - size[0] - border : (newSize[0] - size[0]) / 2),
				round(mimic.y === TOP ? newSize[1] - size[1] : 0)
			];
		}
		else {
			translate = [
				round(mimic.x === LEFT ? newSize[0] - size[0] : 0),
				round(mimic.y === TOP ? border : mimic.y === BOTTOM ? newSize[1] - size[1] - border : (newSize[1] - size[1]) / 2)
			];
		}

		// Canvas drawing implementation
		if(HASCANVAS) {
			// Set the canvas size using calculated size
			inner.attr(WIDTH, newSize[0]).attr(HEIGHT, newSize[1]);

			// Grab canvas context and clear/save it
			context = inner[0].getContext('2d');
			context.restore(); context.save();
			context.clearRect(0,0,3000,3000);

			// Set properties
			context.fillStyle = color[0];
			context.strokeStyle = color[1];
			context.lineWidth = border * 2;

			// Draw the tip
			context.translate(translate[0], translate[1]);
			context.beginPath();
			context.moveTo(coords[0], coords[1]);
			context.lineTo(coords[2], coords[3]);
			context.lineTo(coords[4], coords[5]);
			context.closePath();

			// Apply fill and border
			if(border) {
				// Make sure transparent borders are supported by doing a stroke
				// of the background colour before the stroke colour
				if(tooltip.css('background-clip') === 'border-box') {
					context.strokeStyle = color[0];
					context.stroke();
				}
				context.strokeStyle = color[1];
				context.stroke();
			}
			context.fill();
		}

		// VML (IE Proprietary implementation)
		else {
			// Setup coordinates string
			coords = 'm' + coords[0] + ',' + coords[1] + ' l' + coords[2] +
				',' + coords[3] + ' ' + coords[4] + ',' + coords[5] + ' xe';

			// Setup VML-specific offset for pixel-perfection
			translate[2] = border && /^(r|b)/i.test(corner.string()) ? 
				BROWSER.ie === 8 ? 2 : 1 : 0;

			// Set initial CSS
			inner.css({
				coordsize: (size[0]+border) + ' ' + (size[1]+border),
				antialias: ''+(mimic.string().indexOf(CENTER) > -1),
				left: translate[0] - (translate[2] * Number(precedance === X)),
				top: translate[1] - (translate[2] * Number(precedance === Y)),
				width: size[0] + border,
				height: size[1] + border
			})
			.each(function(i) {
				var $this = $(this);

				// Set shape specific attributes
				$this[ $this.prop ? 'prop' : 'attr' ]({
					coordsize: (size[0]+border) + ' ' + (size[1]+border),
					path: coords,
					fillcolor: color[0],
					filled: !!i,
					stroked: !i
				})
				.toggle(!!(border || i));

				// Check if border is enabled and add stroke element
				!i && $this.html( createVML(
					'stroke', 'weight="'+(border*2)+'px" color="'+color[1]+'" miterlimit="1000" joinstyle="miter"'
				) );
			});
		}

		// Position if needed
		if(position !== FALSE) { this.calculate(corner); }
	},

	calculate: function(corner) {
		if(!this.enabled) { return FALSE; }

		var self = this,
			elements = this.qtip.elements,
			tip = this.element,
			userOffset = this.options.offset,
			isWidget = this.qtip.tooltip.hasClass('ui-widget'),
			position = {  },
			precedance, size, corners;

		// Inherit corner if not provided
		corner = corner || this.corner;
		precedance = corner.precedance;

		// Determine which tip dimension to use for adjustment
		size = this._calculateSize(corner);

		// Setup corners and offset array
		corners = [ corner.x, corner.y ];
		if(precedance === X) { corners.reverse(); }

		// Calculate tip position
		$.each(corners, function(i, side) {
			var b, bc, br;

			if(side === CENTER) {
				b = precedance === Y ? LEFT : TOP;
				position[ b ] = '50%';
				position[MARGIN+'-' + b] = -Math.round(size[ precedance === Y ? 0 : 1 ] / 2) + userOffset;
			}
			else {
				b = self._parseWidth(corner, side, elements.tooltip);
				bc = self._parseWidth(corner, side, elements.content);
				br = self._parseRadius(corner);

				position[ side ] = Math.max(-self.border, i ? bc : (userOffset + (br > b ? br : -b)));
			}
		});

		// Adjust for tip size
		position[ corner[precedance] ] -= size[ precedance === X ? 0 : 1 ];

		// Set and return new position
		tip.css({ margin: '', top: '', bottom: '', left: '', right: '' }).css(position);
		return position;
	},

	reposition: function(event, api, pos, viewport) {
		if(!this.enabled) { return; }

		var cache = api.cache,
			newCorner = this.corner.clone(),
			adjust = pos.adjusted,
			method = api.options.position.adjust.method.split(' '),
			horizontal = method[0],
			vertical = method[1] || method[0],
			shift = { left: FALSE, top: FALSE, x: 0, y: 0 },
			offset, css = {}, props;

		// If our tip position isn't fixed e.g. doesn't adjust with viewport...
		if(this.corner.fixed !== TRUE) {
			// Horizontal - Shift or flip method
			if(horizontal === SHIFT && newCorner.precedance === X && adjust.left && newCorner.y !== CENTER) {
				newCorner.precedance = newCorner.precedance === X ? Y : X;
			}
			else if(horizontal !== SHIFT && adjust.left){
				newCorner.x = newCorner.x === CENTER ? (adjust.left > 0 ? LEFT : RIGHT) : (newCorner.x === LEFT ? RIGHT : LEFT);
			}

			// Vertical - Shift or flip method
			if(vertical === SHIFT && newCorner.precedance === Y && adjust.top && newCorner.x !== CENTER) {
				newCorner.precedance = newCorner.precedance === Y ? X : Y;
			}
			else if(vertical !== SHIFT && adjust.top) {
				newCorner.y = newCorner.y === CENTER ? (adjust.top > 0 ? TOP : BOTTOM) : (newCorner.y === TOP ? BOTTOM : TOP);
			}

			// Update and redraw the tip if needed (check cached details of last drawn tip)
			if(newCorner.string() !== cache.corner.string() && (cache.cornerTop !== adjust.top || cache.cornerLeft !== adjust.left)) {
				this.update(newCorner, FALSE);
			}
		}

		// Setup tip offset properties
		offset = this.calculate(newCorner, adjust);

		// Readjust offset object to make it left/top
		if(offset.right !== undefined) { offset.left = -offset.right; }
		if(offset.bottom !== undefined) { offset.top = -offset.bottom; }
		offset.user = this.offset;

		// Viewport "shift" specific adjustments
		if(shift.left = (horizontal === SHIFT && !!adjust.left)) {
			if(newCorner.x === CENTER) {
				css[MARGIN+'-left'] = shift.x = offset[MARGIN+'-left'] - adjust.left;
			}
			else {
				props = offset.right !== undefined ?
					[ adjust.left, -offset.left ] : [ -adjust.left, offset.left ];

				if( (shift.x = Math.max(props[0], props[1])) > props[0] ) {
					pos.left -= adjust.left;
					shift.left = FALSE;
				}
				
				css[ offset.right !== undefined ? RIGHT : LEFT ] = shift.x;
			}
		}
		if(shift.top = (vertical === SHIFT && !!adjust.top)) {
			if(newCorner.y === CENTER) {
				css[MARGIN+'-top'] = shift.y = offset[MARGIN+'-top'] - adjust.top;
			}
			else {
				props = offset.bottom !== undefined ?
					[ adjust.top, -offset.top ] : [ -adjust.top, offset.top ];

				if( (shift.y = Math.max(props[0], props[1])) > props[0] ) {
					pos.top -= adjust.top;
					shift.top = FALSE;
				}

				css[ offset.bottom !== undefined ? BOTTOM : TOP ] = shift.y;
			}
		}

		/*
		* If the tip is adjusted in both dimensions, or in a
		* direction that would cause it to be anywhere but the
		* outer border, hide it!
		*/
		this.element.css(css).toggle(
			!((shift.x && shift.y) || (newCorner.x === CENTER && shift.y) || (newCorner.y === CENTER && shift.x))
		);

		// Adjust position to accomodate tip dimensions
		pos.left -= offset.left.charAt ? offset.user : horizontal !== SHIFT || shift.top || !shift.left && !shift.top ? offset.left : 0;
		pos.top -= offset.top.charAt ? offset.user : vertical !== SHIFT || shift.left || !shift.left && !shift.top ? offset.top : 0;

		// Cache details
		cache.cornerLeft = adjust.left; cache.cornerTop = adjust.top;
		cache.corner = newCorner.clone();
	},

	destroy: function() {
		// Unbind events
		this.qtip._unbind(this.qtip.tooltip, this._ns);

		// Remove the tip element(s)
		if(this.qtip.elements.tip) {
			this.qtip.elements.tip.find('*')
				.remove().end().remove();
		}
	}
});

TIP = PLUGINS.tip = function(api) {
	return new Tip(api, api.options.style.tip);
};

// Initialize tip on render
TIP.initialize = 'render';

// Setup plugin sanitization options
TIP.sanitize = function(options) {
	if(options.style && 'tip' in options.style) {
		opts = options.style.tip;
		if(typeof opts !== 'object') { opts = options.style.tip = { corner: opts }; }
		if(!(/string|boolean/i).test(typeof opts.corner)) { opts.corner = TRUE; }
	}
};

// Add new option checks for the plugin
CHECKS.tip = {
	'^position.my|style.tip.(corner|mimic|border)$': function() {
		// Make sure a tip can be drawn
		this.create();
		
		// Reposition the tooltip
		this.qtip.reposition();
	},
	'^style.tip.(height|width)$': function(obj) {
		// Re-set dimensions and redraw the tip
		this.size = size = [ obj.width, obj.height ];
		this.update();

		// Reposition the tooltip
		this.qtip.reposition();
	},
	'^content.title|style.(classes|widget)$': function() {
		this.update();
	}
};

// Extend original qTip defaults
$.extend(TRUE, QTIP.defaults, {
	style: {
		tip: {
			corner: TRUE,
			mimic: FALSE,
			width: 6,
			height: 6,
			border: TRUE,
			offset: 0
		}
	}
});

;PLUGINS.polys = {
	// POLY area coordinate calculator
	//	Special thanks to Ed Cradock for helping out with this.
	//	Uses a binary search algorithm to find suitable coordinates.
	polygon: function(baseCoords, corner) {
		var result = {
			width: 0, height: 0,
			position: {
				top: 1e10, right: 0,
				bottom: 0, left: 1e10
			},
			adjustable: FALSE
		},
		i = 0, next,
		coords = [],
		compareX = 1, compareY = 1,
		realX = 0, realY = 0,
		newWidth, newHeight;

		// First pass, sanitize coords and determine outer edges
		i = baseCoords.length; while(i--) {
			next = [ parseInt(baseCoords[--i], 10), parseInt(baseCoords[i+1], 10) ];

			if(next[0] > result.position.right){ result.position.right = next[0]; }
			if(next[0] < result.position.left){ result.position.left = next[0]; }
			if(next[1] > result.position.bottom){ result.position.bottom = next[1]; }
			if(next[1] < result.position.top){ result.position.top = next[1]; }

			coords.push(next);
		}

		// Calculate height and width from outer edges
		newWidth = result.width = Math.abs(result.position.right - result.position.left);
		newHeight = result.height = Math.abs(result.position.bottom - result.position.top);

		// If it's the center corner...
		if(corner.abbrev() === 'c') {
			result.position = {
				left: result.position.left + (result.width / 2),
				top: result.position.top + (result.height / 2)
			};
		}
		else {
			// Second pass, use a binary search algorithm to locate most suitable coordinate
			while(newWidth > 0 && newHeight > 0 && compareX > 0 && compareY > 0)
			{
				newWidth = Math.floor(newWidth / 2);
				newHeight = Math.floor(newHeight / 2);

				if(corner.x === LEFT){ compareX = newWidth; }
				else if(corner.x === RIGHT){ compareX = result.width - newWidth; }
				else{ compareX += Math.floor(newWidth / 2); }

				if(corner.y === TOP){ compareY = newHeight; }
				else if(corner.y === BOTTOM){ compareY = result.height - newHeight; }
				else{ compareY += Math.floor(newHeight / 2); }

				i = coords.length; while(i--)
				{
					if(coords.length < 2){ break; }

					realX = coords[i][0] - result.position.left;
					realY = coords[i][1] - result.position.top;

					if((corner.x === LEFT && realX >= compareX) ||
					(corner.x === RIGHT && realX <= compareX) ||
					(corner.x === CENTER && (realX < compareX || realX > (result.width - compareX))) ||
					(corner.y === TOP && realY >= compareY) ||
					(corner.y === BOTTOM && realY <= compareY) ||
					(corner.y === CENTER && (realY < compareY || realY > (result.height - compareY)))) {
						coords.splice(i, 1);
					}
				}
			}
			result.position = { left: coords[0][0], top: coords[0][1] };
		}

		return result;
	},

	rect: function(ax, ay, bx, by, corner) {
		return {
			width: Math.abs(bx - ax),
			height: Math.abs(by - ay),
			position: {
				left: Math.min(ax, bx),
				top: Math.min(ay, by)
			}
		};
	},

	_angles: {
		tc: 3 / 2, tr: 7 / 4, tl: 5 / 4, 
		bc: 1 / 2, br: 1 / 4, bl: 3 / 4, 
		rc: 2, lc: 1, c: 0
	},
	ellipse: function(cx, cy, rx, ry, corner) {
		var c = PLUGINS.polys._angles[ corner.abbrev() ],
			rxc = rx * Math.cos( c * Math.PI ),
			rys = ry * Math.sin( c * Math.PI );

		return {
			width: (rx * 2) - Math.abs(rxc),
			height: (ry * 2) - Math.abs(rys),
			position: {
				left: cx + rxc,
				top: cy + rys
			},
			adjustable: FALSE
		};
	},
	circle: function(cx, cy, r, corner) {
		return PLUGINS.polys.ellipse(cx, cy, r, r, corner);
	}
};;PLUGINS.svg = function(api, svg, corner, adjustMethod)
{
	var doc = $(document),
		elem = svg[0],
		result = {},
		name, box, position, dimensions;

	// Ascend the parentNode chain until we find an element with getBBox()
	while(!elem.getBBox) { elem = elem.parentNode; }
	if(!elem.getBBox || !elem.parentNode) { return FALSE; }

	// Determine which shape calculation to use
	switch(elem.nodeName) {
		case 'rect':
			position = PLUGINS.svg.toPixel(elem, elem.x.baseVal.value, elem.y.baseVal.value);
			dimensions = PLUGINS.svg.toPixel(elem,
				elem.x.baseVal.value + elem.width.baseVal.value,
				elem.y.baseVal.value + elem.height.baseVal.value
			);

			result = PLUGINS.polys.rect(
				position[0], position[1],
				dimensions[0], dimensions[1],
				corner
			);
		break;

		case 'ellipse':
		case 'circle':
			position = PLUGINS.svg.toPixel(elem,
				elem.cx.baseVal.value,
				elem.cy.baseVal.value
			);

			result = PLUGINS.polys.ellipse(
				position[0], position[1],
				(elem.rx || elem.r).baseVal.value, 
				(elem.ry || elem.r).baseVal.value,
				corner
			);
		break;

		case 'line':
		case 'polygon':
		case 'polyline':
			points = elem.points || [
				{ x: elem.x1.baseVal.value, y: elem.y1.baseVal.value },
				{ x: elem.x2.baseVal.value, y: elem.y2.baseVal.value }
			];

			for(result = [], i = -1, len = points.numberOfItems || points.length; ++i < len;) {
				next = points.getItem ? points.getItem(i) : points[i];
				result.push.apply(result, PLUGINS.svg.toPixel(elem, next.x, next.y));
			}

			result = PLUGINS.polys.polygon(result, corner);
		break;

		// Unknown shape... use bounding box as fallback
		default: 
			box = elem.getBBox();
			mtx = elem.getScreenCTM();
			root = elem.farthestViewportElement || elem;

			// Return if no createSVGPoint method is found
			if(!root.createSVGPoint) { return FALSE; }

			// Create our point var
			point = root.createSVGPoint();

			// Adjust top and left
			point.x = box.x;
			point.y = box.y;
			tPoint = point.matrixTransform(mtx);
			result.position = {
				left: tPoint.x, top: tPoint.y
			};

			// Adjust width and height
			point.x += box.width;
			point.y += box.height;
			tPoint = point.matrixTransform(mtx);
			result.width = tPoint.x - result.position.left;
			result.height = tPoint.y - result.position.top;
		break;
	}

	// Adjust by scroll offset
	result.position.left += doc.scrollLeft();
	result.position.top += doc.scrollTop();

	return result;
};

PLUGINS.svg.toPixel = function(elem, x, y) {
	var mtx = elem.getScreenCTM(),
		root = elem.farthestViewportElement || elem,
		result, point;

	// Create SVG point
	if(!root.createSVGPoint) { return FALSE; }
	point = root.createSVGPoint();

	point.x = x; point.y = y;
	result = point.matrixTransform(mtx);
	return [ result.x, result.y ];
};;var MODAL, OVERLAY,
	MODALCLASS = 'qtip-modal',
	MODALSELECTOR = '.'+MODALCLASS;

OVERLAY = function()
{
	var self = this,
		focusableElems = {},
		current, onLast,
		prevState, elem;

	// Modified code from jQuery UI 1.10.0 source
	// http://code.jquery.com/ui/1.10.0/jquery-ui.js
	function focusable(element) {
		// Use the defined focusable checker when possible
		if($.expr[':'].focusable) { return $.expr[':'].focusable; }

		var isTabIndexNotNaN = !isNaN($.attr(element, 'tabindex')),
			nodeName = element.nodeName && element.nodeName.toLowerCase(),
			map, mapName, img;

		if('area' === nodeName) {
			map = element.parentNode;
			mapName = map.name;
			if(!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
				return false;
			}
			img = $('img[usemap=#' + mapName + ']')[0];
			return !!img && img.is(':visible');
		}
		return (/input|select|textarea|button|object/.test( nodeName ) ?
				!element.disabled :
				'a' === nodeName ? 
					element.href || isTabIndexNotNaN : 
					isTabIndexNotNaN
			);
	}

	// Focus inputs using cached focusable elements (see update())
	function focusInputs(blurElems) {
		// Blurring body element in IE causes window.open windows to unfocus!
		if(focusableElems.length < 1 && blurElems.length) { blurElems.not('body').blur(); }

		// Focus the inputs
		else { focusableElems.first().focus(); }
	}

	// Steal focus from elements outside tooltip
	function stealFocus(event) {
		if(!elem.is(':visible')) { return; }

		var target = $(event.target),
			tooltip = current.tooltip,
			container = target.closest(SELECTOR),
			targetOnTop;

		// Determine if input container target is above this
		targetOnTop = container.length < 1 ? FALSE :
			(parseInt(container[0].style.zIndex, 10) > parseInt(tooltip[0].style.zIndex, 10));

		// If we're showing a modal, but focus has landed on an input below
		// this modal, divert focus to the first visible input in this modal
		// or if we can't find one... the tooltip itself
		if(!targetOnTop && target.closest(SELECTOR)[0] !== tooltip[0]) {
			focusInputs(target);
		}

		// Detect when we leave the last focusable element...
		onLast = event.target === focusableElems[focusableElems.length - 1];
	}

	$.extend(self, {
		init: function() {
			// Create document overlay
			elem = self.elem = $('<div />', {
				id: 'qtip-overlay',
				html: '<div></div>',
				mousedown: function() { return FALSE; }
			})
			.hide();

			// Update position on window resize or scroll
			function resize() {
				var win = $(this);
				elem.css({
					height: win.height(),
					width: win.width()
				});
			}
			$(window).bind('resize'+MODALSELECTOR, resize);
			resize(); // Fire it initially too

			// Make sure we can't focus anything outside the tooltip
			$(document.body).bind('focusin'+MODALSELECTOR, stealFocus);

			// Apply keyboard "Escape key" close handler
			$(document).bind('keydown'+MODALSELECTOR, function(event) {
				if(current && current.options.show.modal.escape && event.keyCode === 27) {
					current.hide(event);
				}
			});

			// Apply click handler for blur option
			elem.bind('click'+MODALSELECTOR, function(event) {
				if(current && current.options.show.modal.blur) {
					current.hide(event);
				}
			});

			return self;
		},

		update: function(api) {
			// Update current API reference
			current = api;

			// Update focusable elements if enabled
			if(api.options.show.modal.stealfocus !== FALSE) {
				focusableElems = api.tooltip.find('*').filter(function() {
					return focusable(this);
				});
			}
			else { focusableElems = []; }
		},

		toggle: function(api, state, duration) {
			var docBody = $(document.body),
				tooltip = api.tooltip,
				options = api.options.show.modal,
				effect = options.effect,
				type = state ? 'show': 'hide',
				visible = elem.is(':visible'),
				visibleModals = $(MODALSELECTOR).filter(':visible:not(:animated)').not(tooltip),
				zindex;

			// Set active tooltip API reference
			self.update(api);

			// If the modal can steal the focus...
			// Blur the current item and focus anything in the modal we an
			if(state && options.stealfocus !== FALSE) {
				focusInputs( $(':focus') );
			}

			// Toggle backdrop cursor style on show
			elem.toggleClass('blurs', options.blur);

			// Set position and append to body on show
			if(state) {
				elem.css({ left: 0, top: 0 })
					.appendTo(document.body);
			}

			// Prevent modal from conflicting with show.solo, and don't hide backdrop is other modals are visible
			if((elem.is(':animated') && visible === state && prevState !== FALSE) || (!state && visibleModals.length)) {
				return self;
			}

			// Stop all animations
			elem.stop(TRUE, FALSE);

			// Use custom function if provided
			if($.isFunction(effect)) {
				effect.call(elem, state);
			}

			// If no effect type is supplied, use a simple toggle
			else if(effect === FALSE) {
				elem[ type ]();
			}

			// Use basic fade function
			else {
				elem.fadeTo( parseInt(duration, 10) || 90, state ? 1 : 0, function() {
					if(!state) { elem.hide(); }
				});
			}

			// Reset position and detach from body on hide
			if(!state) {
				elem.queue(function(next) {
					elem.css({ left: '', top: '' });
					if(!$(MODALSELECTOR).length) { elem.detach(); }
					next();
				});
			}

			// Cache the state
			prevState = state;

			// If the tooltip is destroyed, set reference to null
			if(current.destroyed) { current = NULL; }

			return self;
		}
	});	

	self.init();
};
OVERLAY = new OVERLAY();

function Modal(api, options) {
	this.options = options;
	this._ns = '-modal';

	this.init( (this.qtip = api) );
}

$.extend(Modal.prototype, {
	init: function(qtip) {
		var tooltip = qtip.tooltip;

		// If modal is disabled... return
		if(!this.options.on) { return this; }

		// Set overlay reference
		qtip.elements.overlay = OVERLAY.elem;

		// Add unique attribute so we can grab modal tooltips easily via a SELECTOR, and set z-index
		tooltip.addClass(MODALCLASS).css('z-index', PLUGINS.modal.zindex + $(MODALSELECTOR).length);
		
		// Apply our show/hide/focus modal events
		qtip._bind(tooltip, ['tooltipshow', 'tooltiphide'], function(event, api, duration) {
			var oEvent = event.originalEvent;

			// Make sure mouseout doesn't trigger a hide when showing the modal and mousing onto backdrop
			if(event.target === tooltip[0]) {
				if(oEvent && event.type === 'tooltiphide' && /mouse(leave|enter)/.test(oEvent.type) && $(oEvent.relatedTarget).closest(overlay[0]).length) {
					try { event.preventDefault(); } catch(e) {}
				}
				else if(!oEvent || (oEvent && !oEvent.solo)) {
					this.toggle(event, event.type === 'tooltipshow', duration);
				}
			}
		}, this._ns, this);

		// Adjust modal z-index on tooltip focus
		qtip._bind(tooltip, 'tooltipfocus', function(event, api) {
			// If focus was cancelled before it reached us, don't do anything
			if(event.isDefaultPrevented() || event.target !== tooltip[0]) { return; }

			var qtips = $(MODALSELECTOR),

			// Keep the modal's lower than other, regular qtips
			newIndex = PLUGINS.modal.zindex + qtips.length,
			curIndex = parseInt(tooltip[0].style.zIndex, 10);

			// Set overlay z-index
			OVERLAY.elem[0].style.zIndex = newIndex - 1;

			// Reduce modal z-index's and keep them properly ordered
			qtips.each(function() {
				if(this.style.zIndex > curIndex) {
					this.style.zIndex -= 1;
				}
			});

			// Fire blur event for focused tooltip
			qtips.filter('.' + CLASS_FOCUS).qtip('blur', event.originalEvent);

			// Set the new z-index
			tooltip.addClass(CLASS_FOCUS)[0].style.zIndex = newIndex;

			// Set current
			OVERLAY.update(api);

			// Prevent default handling
			try { event.preventDefault(); } catch(e) {}
		}, this._ns, this);

		// Focus any other visible modals when this one hides
		qtip._bind(tooltip, 'tooltiphide', function(event) {
			if(event.target === tooltip[0]) {
				$(MODALSELECTOR).filter(':visible').not(tooltip).last().qtip('focus', event);
			}
		}, this._ns, this);
	},

	toggle: function(event, state, duration) {
		// Make sure default event hasn't been prevented
		if(event && event.isDefaultPrevented()) { return this; }

		// Toggle it
		OVERLAY.toggle(this.qtip, !!state, duration);
	},

	destroy: function() {
		// Remove modal class
		this.qtip.tooltip.removeClass(MODALCLASS);

		// Remove bound events
		this.qtip._unbind(this.qtip.tooltip, this._ns);

		// Delete element reference
		OVERLAY.toggle(this.qtip, FALSE);
		delete this.qtip.elements.overlay;
	}
});


MODAL = PLUGINS.modal = function(api) {
	return new Modal(api, api.options.show.modal);
};

// Setup sanitiztion rules
MODAL.sanitize = function(opts) {
	if(opts.show) { 
		if(typeof opts.show.modal !== 'object') { opts.show.modal = { on: !!opts.show.modal }; }
		else if(typeof opts.show.modal.on === 'undefined') { opts.show.modal.on = TRUE; }
	}
};

// Base z-index for all modal tooltips (use qTip core z-index as a base)
MODAL.zindex = QTIP.zindex - 200;

// Plugin needs to be initialized on render
MODAL.initialize = 'render';

// Setup option set checks
CHECKS.modal = {
	'^show.modal.(on|blur)$': function() {
		// Initialise
		this.destroy();
		this.init();
		
		// Show the modal if not visible already and tooltip is visible
		this.qtip.elems.overlay.toggle(
			this.qtip.tooltip[0].offsetWidth > 0
		);
	}
};

// Extend original api defaults
$.extend(TRUE, QTIP.defaults, {
	show: {
		modal: {
			on: FALSE,
			effect: TRUE,
			blur: TRUE,
			stealfocus: TRUE,
			escape: TRUE
		}
	}
});
;}));
}( window, document ));


;/*
 * ScaleRaphael 0.8 by Zevan Rosser 2010 
 * For use with Raphael library : www.raphaeljs.com
 * Licensed under the MIT license.
 *
 * www.shapevent.com/scaleraphael/
 */
(function(){
  window.ScaleRaphael = function(container, width, height){
    var wrapper = (typeof container == 'string') ? document.getElementById(container) : container;
    if (!wrapper.style.position) wrapper.style.position = "relative";
    wrapper.style.width = width + "px";
    wrapper.style.height = height + "px";
    wrapper.style.overflow = "hidden";
    
    var nestedWrapper;
      
    if (Raphael.type == "VML"){
      wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup'><\/rvml:group>";
      nestedWrapper = document.getElementById("vmlgroup");
    }else{
      wrapper.innerHTML = "<div id='svggroup'><\/div>";
      nestedWrapper = document.getElementById("svggroup");
    }
 
    var paper = new Raphael(nestedWrapper, width, height);
    var vmlDiv;
    
    if (Raphael.type == "SVG"){
      paper.canvas.setAttribute("viewBox", "0 0 "+width+" "+height);
    }else{
      vmlDiv = wrapper.getElementsByTagName("div")[0];
    }
    
    paper.changeSize = function(w, h, center, clipping){
      clipping = !clipping;
      
      var ratioW = w / width;
      var ratioH = h / height;
      var scale = ratioW < ratioH ? ratioW : ratioH;
      
      var newHeight = parseInt(height * scale);
      var newWidth = parseInt(width * scale);
      
      if (Raphael.type == "VML"){
         // scale the textpaths
       var txt = document.getElementsByTagName("textpath");
        for (var i in txt){
          var curr = txt[i];
          if (curr.style){
            if(!curr._fontSize){
              var mod = curr.style.font.split("px");
              curr._fontSize = parseInt(mod[0]);
              curr._font = mod[1];
            }
            curr.style.font = curr._fontSize * scale + "px" + curr._font;
          }
        }
        var newSize; 
        if (newWidth < newHeight){
         newSize = newWidth * 1000 / width;
        }else{
         newSize = newHeight * 1000 / height;
        }
        newSize = parseInt(newSize);
        nestedWrapper.style.width = newSize + "px";
        nestedWrapper.style.height = newSize + "px";
        if (clipping){
          nestedWrapper.style.left = parseInt((w - newWidth) / 2) + "px";
          nestedWrapper.style.top = parseInt((h - newHeight) / 2) + "px";
        }
        vmlDiv.style.overflow = "visible";
      }
      
      if (clipping){
        newWidth = w;
        newHeight = h;
      }
      
      wrapper.style.width = newWidth + "px";
      wrapper.style.height = newHeight + "px";
      paper.setSize(newWidth, newHeight);
      
      if (center){
        wrapper.style.position = "absolute";
        wrapper.style.left = parseInt((w - newWidth) / 2) + "px";
        wrapper.style.top = parseInt((h - newHeight) / 2) + "px";
      }
    }
    
    paper.scaleAll = function(amount){
      paper.changeSize(width * amount, height * amount);
    }
    
    paper.changeSize(width, height);
    
    paper.w = width;
    paper.h = height;
    
    return paper;
  }
})();
;/**
 * turn.js 3rd release
 * www.turnjs.com
 *
 * Copyright (C) 2012, Emmanuel Garcia.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Any redistribution, use, or modification is done solely for personal 
 * benefit and not for any commercial purpose or for monetary gain.
 * 
 **/

(function($) {

'use strict';

var has3d,

	vendor ='',

	PI = Math.PI,

	A90 = PI/2,

	isTouch = 'ontouchstart' in window,

	events = (isTouch) ? {start: 'touchstart', move: 'touchmove', end: 'touchend'}
			: {start: 'mousedown', move: 'mousemove', end: 'mouseup'},

	// Contansts used for each corner
	// tl * tr
	// *     *
	// bl * br

	corners = {
		backward: ['bl', 'tl'],
		forward: ['br', 'tr'],
		all: ['tl', 'bl', 'tr', 'br']
	},

	displays = ['single', 'double'],

	// Default options

	turnOptions = {

		// First page

		page: 1,
		
		// Enables gradients

		gradients: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true,

		// Display

		display: 'double',

		// Events

		when: null
	},

	flipOptions = {

		// Back page
		
		folding: null,

		// Corners
		// backward: Activates both tl and bl corners
		// forward: Activates both tr and br corners
		// all: Activates all the corners

		corners: 'forward',
		
		// Size of the active zone of each corner

		cornerSize: 100,

		// Enables gradients

		gradients: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true
	},

	// Number of pages in the DOM, minimum value: 6

	pagesInDOM = 6,
	
	pagePosition = {0: {top: 0, left: 0, right: 'auto', bottom: 'auto'},
					1: {top: 0, right: 0, left: 'auto', bottom: 'auto'}},

	// Gets basic attributes for a layer

	divAtt = function(top, left, zIndex, overf) {
		return {'css': {
					position: 'absolute',
					top: top,
					left: left,
					'overflow': overf || 'hidden',
					'z-index': zIndex || 'auto'
					}
			};
	},

	// Gets a 2D point from a bezier curve of four points

	bezier = function(p1, p2, p3, p4, t) {
		var mum1 = 1 - t,
			mum13 = mum1 * mum1 * mum1,
			mu3 = t * t * t;

		return point2D(Math.round(mum13*p1.x + 3*t*mum1*mum1*p2.x + 3*t*t*mum1*p3.x + mu3*p4.x),
						Math.round(mum13*p1.y + 3*t*mum1*mum1*p2.y + 3*t*t*mum1*p3.y + mu3*p4.y));
	},
	
	// Converts an angle from degrees to radians

	rad = function(degrees) {
		return degrees/180*PI;
	},

	// Converts an angle from radians to degrees

	deg = function(radians) {
		return radians/PI*180;
	},

	// Gets a 2D point

	point2D = function(x, y) {
		return {x: x, y: y};
	},

	// Returns the traslate value

	translate = function(x, y, use3d) {
		return (has3d && use3d) ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
	},

	// Returns the rotation value

	rotate = function(degrees) {
		return ' rotate(' + degrees + 'deg) ';
	},

	// Checks if a property belongs to an object

	has = function(property, object) {
		return Object.prototype.hasOwnProperty.call(object, property);
	},

	// Gets the CSS3 vendor prefix

	getPrefix = function() {
		var vendorPrefixes = ['Moz','Webkit','Khtml','O','ms'],
			len = vendorPrefixes.length,
			vendor = '';

		while (len--)
			if ((vendorPrefixes[len] + 'Transform') in document.body.style)
				vendor='-'+vendorPrefixes[len].toLowerCase()+'-';

		return vendor;
	},

	// Adds gradients

	gradient = function(obj, p0, p1, colors, numColors) {
	
		var j, cols = [];

		if (vendor=='-webkit-') {
		
			for (j = 0; j<numColors; j++)
					cols.push('color-stop('+colors[j][0]+', '+colors[j][1]+')');
			
			obj.css({'background-image': '-webkit-gradient(linear, '+p0.x+'% '+p0.y+'%,  '+p1.x+'% '+p1.y+'%, '+ cols.join(',') +' )'});

		} else {

			// This procedure makes the gradients for non-webkit browsers
			// It will be reduced to one unique way for gradients in next versions
			
			p0 = {x:p0.x/100 * obj.width(), y:p0.y/100 * obj.height()};
			p1 = {x:p1.x/100 * obj.width(), y:p1.y/100 * obj.height()};

			var dx = p1.x-p0.x,
				dy = p1.y-p0.y,
				angle = Math.atan2(dy, dx),
				angle2 = angle - Math.PI/2,
				diagonal = Math.abs(obj.width()*Math.sin(angle2)) + Math.abs(obj.height()*Math.cos(angle2)),
				gradientDiagonal = Math.sqrt(dy*dy + dx*dx),
				corner = point2D((p1.x<p0.x) ? obj.width() : 0, (p1.y<p0.y) ? obj.height() : 0),
				slope = Math.tan(angle),
				inverse = -1/slope,
				x = (inverse*corner.x - corner.y - slope*p0.x + p0.y) / (inverse-slope),
				c = {x: x, y: inverse*x - inverse*corner.x + corner.y},
				segA = (Math.sqrt( Math.pow(c.x-p0.x,2) + Math.pow(c.y-p0.y,2)));

				for (j = 0; j<numColors; j++)
					cols.push(' '+colors[j][1]+' '+(( segA + gradientDiagonal*colors[j][0] )*100/diagonal)+'%');
		
				obj.css({'background-image': vendor+'linear-gradient(' + (-angle) + 'rad,' + cols.join(',') + ')'});
		}
	},

turnMethods = {

	// Singleton constructor
	// $('#selector').turn([options]);

	init: function(opts) {

		// Define constants
		if (has3d===undefined) {
			has3d = 'WebKitCSSMatrix' in window || 'MozPerspective' in document.body.style;
			vendor = getPrefix();
		}

		var i, data = this.data(), ch = this.children();
	
		opts = $.extend({width: this.width(), height: this.height()}, turnOptions, opts);
		data.opts = opts;
		data.pageObjs = {};
		data.pages = {};
		data.pageWrap = {};
		data.pagePlace = {};
		data.pageMv = [];
		data.totalPages = opts.pages || 0;

		if (opts.when)
			for (i in opts.when)
				if (has(i, opts.when))
					this.bind(i, opts.when[i]);


		this.css({position: 'relative', width: opts.width, height: opts.height});

		this.turn('display', opts.display);

		if (has3d && !isTouch && opts.acceleration)
			this.transform(translate(0, 0, true));
	
		for (i = 0; i<ch.length; i++)
			this.turn('addPage', ch[i], i+1);
	
		this.turn('page', opts.page);

        // allow setting active corners as an option
        corners = $.extend({}, corners, opts.corners);

		// Event listeners

		$(this).bind(events.start, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages) && flipMethods._eventStart.call(data.pages[page], e)===false)
					return false;
		});
			
		$(document).bind(events.move, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages))
					flipMethods._eventMove.call(data.pages[page], e);
		}).
		bind(events.end, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages))
					flipMethods._eventEnd.call(data.pages[page], e);

		});

		data.done = true;

		return this;
	},

	// Adds a page from external data

	addPage: function(element, page) {

		var incPages = false,
			data = this.data(),
			lastPage = data.totalPages+1;

		if (page) {
			if (page==lastPage) {
				page = lastPage;
				incPages = true;
			} else if (page>lastPage)
				throw new Error ('It is impossible to add the page "'+page+'", the maximum value is: "'+lastPage+'"');

		} else {
			page = lastPage;
			incPages = true;
		}

		if (page>=1 && page<=lastPage) {

			// Stop animations
			if (data.done) this.turn('stop');

			// Move pages if it's necessary
			if (page in data.pageObjs)
				turnMethods._movePages.call(this, page, 1);

			// Update number of pages
			if (incPages)
				data.totalPages = lastPage;

			// Add element
			data.pageObjs[page] = $(element).addClass('turn-page p' + page);

			// Add page
			turnMethods._addPage.call(this, page);

			// Update view
			if (data.done)
				this.turn('update');

			turnMethods._removeFromDOM.call(this);
		}

		return this;
	},

	// Adds a page from internal data

	_addPage: function(page) {
		
		var data = this.data(),
			element = data.pageObjs[page];

		if (element)
			if (turnMethods._necessPage.call(this, page)) {
				
				if (!data.pageWrap[page]) {

					var pageWidth = (data.display=='double') ? this.width()/2 : this.width(),
						pageHeight = this.height();

					element.css({width:pageWidth, height:pageHeight});

					// Place
					data.pagePlace[page] = page;

					// Wrapper
					data.pageWrap[page] = $('<div/>', {'class': 'turn-page-wrapper',
													page: page,
													css: {position: 'absolute',
													overflow: 'hidden',
													width: pageWidth,
													height: pageHeight}}).
													css(pagePosition[(data.display=='double') ? page%2 : 0]);

					// Append to this
					this.append(data.pageWrap[page]);

					// Move data.pageObjs[page] (element) to wrapper
					data.pageWrap[page].prepend(data.pageObjs[page]);
				}

				// If the page is in the current view, create the flip effect
				if (!page || turnMethods._setPageLoc.call(this, page)==1)
					turnMethods._makeFlip.call(this, page);
				
			} else {

				// Place
				data.pagePlace[page] = 0;

				// Remove element from the DOM
				if (data.pageObjs[page])
					data.pageObjs[page].remove();

			}

	},

	// Checks if a page is in memory
	
	hasPage: function(page) {

		return page in this.data().pageObjs;
	
	},

	// Prepares the flip effect for a page

	_makeFlip: function(page) {

		var data = this.data();

		if (!data.pages[page] && data.pagePlace[page]==page) {

			var single = data.display=='single',
				even = page%2;
			
			data.pages[page] = data.pageObjs[page].
								css({width: (single) ? this.width() : this.width()/2, height: this.height()}).
								flip({page: page,
									next: (single && page === data.totalPages) ? page -1 : ((even || single) ? page+1 : page-1),
									turn: this,
									duration: data.opts.duration,
									acceleration : data.opts.acceleration,
									corners: (single) ? 'all' : ((even) ? 'forward' : 'backward'),
									backGradient: data.opts.gradients,
									frontGradient: data.opts.gradients
									}).
									flip('disable', data.disabled).
									bind('pressed', turnMethods._pressed).
									bind('released', turnMethods._released).
									bind('start', turnMethods._start).
									bind('end', turnMethods._end).
									bind('flip', turnMethods._flip);
		}
		return data.pages[page];
	},

	// Makes pages within a range

	_makeRange: function() {

		var page,
			data = this.data(),
			range = this.turn('range');

			for (page = range[0]; page<=range[1]; page++)
				turnMethods._addPage.call(this, page);

	},

	// Returns a range of `pagesInDOM` pages that should be in the DOM
	// Example:
	// - page of the current view, return true
	// * page is in the range, return true
	// 0 page is not in the range, return false
	//
	// 1 2-3 4-5 6-7 8-9 10-11 12-13
	//    **  **  --   **  **

	range: function(page) {

		var remainingPages, left, right,
			data = this.data();
			page = page || data.tpage || data.page;
			var view = turnMethods._view.call(this, page);

			if (page<1 || page>data.totalPages)
				throw new Error ('"'+page+'" is not a page for range');
		
			view[1] = view[1] || view[0];
			
			if (view[0]>=1 && view[1]<=data.totalPages) {

				remainingPages = Math.floor((pagesInDOM-2)/2);

				if (data.totalPages-view[1] > view[0]) {
					left = Math.min(view[0]-1, remainingPages);
					right = 2*remainingPages-left;
				} else {
					right = Math.min(data.totalPages-view[1], remainingPages);
					left = 2*remainingPages-right;
				}

			} else {
				left = pagesInDOM-1;
				right = pagesInDOM-1;
			}

			return [Math.max(1, view[0]-left), Math.min(data.totalPages, view[1]+right)];

	},

	// Detects if a page is within the range of `pagesInDOM` from the current view

	_necessPage: function(page) {
		
		if (page===0)
			return true;

		var range = this.turn('range');

		return page>=range[0] && page<=range[1];
		
	},

	// Releases memory by removing pages from the DOM

	_removeFromDOM: function() {

		var page, data = this.data();

		for (page in data.pageWrap)
			if (has(page, data.pageWrap) && !turnMethods._necessPage.call(this, page))
				turnMethods._removePageFromDOM.call(this, page);
		

	},

	// Removes a page from DOM and its internal references

	_removePageFromDOM: function(page) {

		var data = this.data();

		if (data.pages[page]) {
			var dd = data.pages[page].data();
			if (dd.f && dd.f.fwrapper)
				dd.f.fwrapper.remove();
			data.pages[page].remove();
			delete data.pages[page];
		}

		if (data.pageObjs[page])
			data.pageObjs[page].remove();

		if (data.pageWrap[page]) {
			data.pageWrap[page].remove();
			delete data.pageWrap[page];
		}

		delete data.pagePlace[page];

	},

	// Removes a page

	removePage: function(page) {

		var data = this.data();

		if (data.pageObjs[page]) {
			// Stop animations
			this.turn('stop');

			// Remove `page`
			turnMethods._removePageFromDOM.call(this, page);
			delete data.pageObjs[page];

			// Move the pages behind `page`
			turnMethods._movePages.call(this, page, -1);

			// Resize the size of this magazine
			data.totalPages = data.totalPages-1;
			turnMethods._makeRange.call(this);

			// Check the current view
			if (data.page>data.totalPages)
				this.turn('page', data.totalPages);
		}

		return this;
	
	},

	// Moves pages

	_movePages: function(from, change) {

		var page,
			data = this.data(),
			single = data.display=='single',
			move = function(page) {

				var next = page + change,
					odd = next%2;

				if (data.pageObjs[page])
					data.pageObjs[next] = data.pageObjs[page].removeClass('page' + page).addClass('page' + next);

				if (data.pagePlace[page] && data.pageWrap[page]) {
					data.pagePlace[next] = next;
					data.pageWrap[next] = data.pageWrap[page].css(pagePosition[(single) ? 0 : odd]).attr('page', next);
					
					if (data.pages[page])
						data.pages[next] = data.pages[page].flip('options', {
							page: next,
							next: (single || odd) ? next+1 : next-1,
							corners: (single) ? 'all' : ((odd) ? 'forward' : 'backward')
						});

					if (change) {
						delete data.pages[page];
						delete data.pagePlace[page];
						delete data.pageObjs[page];
						delete data.pageWrap[page];
						delete data.pageObjs[page];
					}
			}
		};

		if (change>0)
			for (page=data.totalPages; page>=from; page--) move(page);
		else
			for (page=from; page<=data.totalPages; page++) move(page);

	},

	// Sets or Gets the display mode

	display: function(display) {

		var data = this.data(),
			currentDisplay = data.display;

		if (display) {

			if ($.inArray(display, displays)==-1)
				throw new Error ('"'+display + '" is not a value for display');
			
			if (display=='single') {
				if (!data.pageObjs[0]) {
					this.turn('stop').
						css({'overflow': 'hidden'});
					data.pageObjs[0] = $('<div />', {'class': 'turn-page p-temporal'}).
									css({width: this.width(), height: this.height()}).
										appendTo(this);
				}
			} else {
				if (data.pageObjs[0]) {
					this.turn('stop').
						css({'overflow': ''});
					data.pageObjs[0].remove();
					delete data.pageObjs[0];
				}
			}

			data.display = display;

			if (currentDisplay) {
				var size = this.turn('size');
				turnMethods._movePages.call(this, 1, 0);
				this.turn('size', size.width, size.height).
						turn('update');
			}

			return this;

		} else
			return currentDisplay;
	
	},

	// Detects if the pages are being animated

	animating: function() {

		return this.data().pageMv.length>0;

	},

	// Disables and enables the effect

	disable: function(bool) {

		var page,
			data = this.data(),
			view = this.turn('view');

			data.disabled = bool===undefined || bool===true;

		for (page in data.pages)
			if (has(page, data.pages))
				data.pages[page].flip('disable', bool ? $.inArray(page, view) : false );

		return this;

	},

	// Gets and sets the size

	size: function(width, height) {

		if (width && height) {

			var data = this.data(), pageWidth = (data.display=='double') ? width/2 : width, page;

			this.css({width: width, height: height});

			if (data.pageObjs[0])
				data.pageObjs[0].css({width: pageWidth, height: height});
			
			for (page in data.pageWrap) {
				if (!has(page, data.pageWrap)) continue;
				data.pageObjs[page].css({width: pageWidth, height: height});
				data.pageWrap[page].css({width: pageWidth, height: height});
				if (data.pages[page])
					data.pages[page].css({width: pageWidth, height: height});
			}

			this.turn('resize');

			return this;

		} else {
			
			return {width: this.width(), height: this.height()};

		}
	},

	// Resizes each page

	resize: function() {

		var page, data = this.data();

		if (data.pages[0]) {
			data.pageWrap[0].css({left: -this.width()});
			data.pages[0].flip('resize', true);
		}

		for (page = 1; page <= data.totalPages; page++)
			if (data.pages[page])
				data.pages[page].flip('resize', true);


	},

	// Removes an animation from the cache

	_removeMv: function(page) {

		var i, data = this.data();
			
		for (i=0; i<data.pageMv.length; i++)
			if (data.pageMv[i]==page) {
				data.pageMv.splice(i, 1);
				return true;
			}

		return false;

	},

	// Adds an animation to the cache
	
	_addMv: function(page) {

		var data = this.data();

		turnMethods._removeMv.call(this, page);
		data.pageMv.push(page);

	},

	// Gets indexes for a view

	_view: function(page) {
	
		var data = this.data();
		page = page || data.page;

		if (data.display=='double')
			return (page%2) ? [page-1, page] : [page, page+1];
		else
			return [page];

	},

	// Gets a view

	view: function(page) {

		var data = this.data(), view = turnMethods._view.call(this, page);

		return (data.display=='double') ? [(view[0]>0) ? view[0] : 0, (view[1]<=data.totalPages) ? view[1] : 0]
				: [(view[0]>0 && view[0]<=data.totalPages) ? view[0] : 0];

	},

	// Stops animations

	stop: function(ok) {

		var i, opts, data = this.data(), pages = data.pageMv;

		data.pageMv = [];

		if (data.tpage) {
			data.page = data.tpage;
			delete data['tpage'];
		}

		for (i in pages) {
			if (!has(i, pages)) continue;
			opts = data.pages[pages[i]].data().f.opts;
			flipMethods._moveFoldingPage.call(data.pages[pages[i]], null);
			data.pages[pages[i]].flip('hideFoldedPage');
			data.pagePlace[opts.next] = opts.next;
			
			if (opts.force) {
				opts.next = (opts.page%2===0) ? opts.page-1 : opts.page+1;
				delete opts['force'];
			}

		}

		this.turn('update');

		return this;
	},

	// Gets and sets the number of pages

	pages: function(pages) {

		var data = this.data();

		if (pages) {
			if (pages<data.totalPages) {

				for (var page = pages+1; page<=data.totalPages; page++)
					this.turn('removePage', page);

				if (this.turn('page')>pages)
					this.turn('page', pages);
			}

			data.totalPages = pages;

			return this;
		} else
			return data.totalPages;

	},

	// Sets a page without effect

	_fitPage: function(page, ok) {
		
		var data = this.data(), newView = this.turn('view', page);
		
		if (data.page!=page) {
			this.trigger('turning', [page, newView]);
			if ($.inArray(1, newView)!=-1) this.trigger('first');
			if ($.inArray(data.totalPages, newView)!=-1) this.trigger('last');
		}

		if (!data.pageObjs[page])
			return;

		data.tpage = page;

		this.turn('stop', ok);
		turnMethods._removeFromDOM.call(this);
		turnMethods._makeRange.call(this);
		this.trigger('turned', [page, newView]);

	},
	
	// Turns to a page

	_turnPage: function(page) {

		var current, next,
			data = this.data(),
			view = this.turn('view'),
			newView = this.turn('view', page);
	
		if (data.page!=page) {
			this.trigger('turning', [page, newView]);
			if ($.inArray(1, newView)!=-1) this.trigger('first');
			if ($.inArray(data.totalPages, newView)!=-1) this.trigger('last');
		}

		if (!data.pageObjs[page])
			return;

		data.tpage = page;

		this.turn('stop');

		turnMethods._makeRange.call(this);

		if (data.display=='single') {
			current = view[0];
			next = newView[0];
		} else if (view[1] && page>view[1]) {
			current = view[1];
			next = newView[0];
		} else if (view[0] && page<view[0]) {
			current = view[0];
			next = newView[1];
		}

		if (data.pages[current]) {

			var opts = data.pages[current].data().f.opts;
			data.tpage = next;
			
			if (opts.next!=next) {
				opts.next = next;
				data.pagePlace[next] = opts.page;
				opts.force = true;
			}

			if (data.display=='single')
				data.pages[current].flip('turnPage', (newView[0] > view[0]) ? 'br' : 'bl');
			else
				data.pages[current].flip('turnPage');
		}

	},

	// Gets and sets a page

	page: function(page) {

		page = parseInt(page, 10);

		var data = this.data();

		if (page>0 && page<=data.totalPages) {
			if (!data.done || $.inArray(page, this.turn('view'))!=-1)
				turnMethods._fitPage.call(this, page);
			else
				turnMethods._turnPage.call(this, page);
		
			return this;

		} else
			return data.page;
	
	},

	// Turns to the next view

	next: function() {

		var data = this.data();
		return this.turn('page', turnMethods._view.call(this, data.page).pop() + 1);
	
	},

	// Turns to the previous view

	previous: function() {
		
		var data = this.data();
		return this.turn('page', turnMethods._view.call(this, data.page).shift() - 1);

	},

	// Adds a motion to the internal list

	_addMotionPage: function() {

		var opts = $(this).data().f.opts,
			turn = opts.turn,
			dd = turn.data();

		opts.pageMv = opts.page;
		turnMethods._addMv.call(turn, opts.pageMv);
		dd.pagePlace[opts.next] = opts.page;
		turn.turn('update');

	},

	// This event is called in context of flip

	_start: function(e, opts, corner) {

			var data = opts.turn.data(),
				event = $.Event('start');

			e.stopPropagation();

			opts.turn.trigger(event, [opts, corner]);

			if (event.isDefaultPrevented()) {
				e.preventDefault();
				return;
			}
		
		if (data.display=='single') {

			var left = corner.charAt(1)=='l';
			if ((opts.page==1 && left) || (opts.page==data.totalPages && !left))
				e.preventDefault();
			else {
				if (left) {
					opts.next = (opts.next<opts.page) ? opts.next : opts.page-1;
					opts.force = true;
				} else
					opts.next = (opts.next>opts.page) ? opts.next : opts.page+1;
			}

		}

		turnMethods._addMotionPage.call(this);
	},

	// This event is called in context of flip

	_end: function(e, turned) {
		
		var that = $(this),
			data = that.data().f,
			opts = data.opts,
			turn = opts.turn,
			dd = turn.data();

		e.stopPropagation();

		if (turned || dd.tpage) {

			if (dd.tpage==opts.next || dd.tpage==opts.page) {
				delete dd['tpage'];
				turnMethods._fitPage.call(turn, dd.tpage || opts.next, true);
			}

		} else {
			turnMethods._removeMv.call(turn, opts.pageMv);
			turn.turn('update');
		}
		
	},
	
	// This event is called in context of flip

	_pressed: function() {

		var page,
			that = $(this),
			data = that.data().f,
			turn = data.opts.turn,
			pages = turn.data().pages;
	
		for (page in pages)
			if (page!=data.opts.page)
				pages[page].flip('disable', true);

		return data.time = new Date().getTime();

	},

	// This event is called in context of flip

	_released: function(e, point) {
		
		var that = $(this),
			data = that.data().f;

			e.stopPropagation();

		if ((new Date().getTime())-data.time<200 || point.x<0 || point.x>$(this).width()) {
			e.preventDefault();
			data.opts.turn.data().tpage = data.opts.next;
			data.opts.turn.turn('update');
			$(that).flip('turnPage');
		}

	},

	// This event is called in context of flip
	
	_flip: function() {

		var opts = $(this).data().f.opts;

		opts.turn.trigger('turn', [opts.next]);

	},

	// Calculate the z-index value for pages during the animation

	calculateZ: function(mv) {

		var i, page, nextPage, placePage, dpage,
			that = this,
			data = this.data(),
			view = this.turn('view'),
			currentPage = view[0] || view[1],
			r = {pageZ: {}, partZ: {}, pageV: {}},

			addView = function(page) {
				var view = that.turn('view', page);
				if (view[0]) r.pageV[view[0]] = true;
				if (view[1]) r.pageV[view[1]] = true;
			};
		
			for (i = 0; i<mv.length; i++) {
				page = mv[i];
				nextPage = data.pages[page].data().f.opts.next;
				placePage = data.pagePlace[page];
				addView(page);
				addView(nextPage);
				dpage = (data.pagePlace[nextPage]==nextPage) ? nextPage : page;
				r.pageZ[dpage] = data.totalPages - Math.abs(currentPage-dpage);
				r.partZ[placePage] = data.totalPages*2 + Math.abs(currentPage-dpage);
			}

		return r;
	},

	// Updates the z-index and display property of every page

	update: function() {

		var page,
			data = this.data();

		if (data.pageMv.length && data.pageMv[0]!==0) {

			// Update motion

			var apage,
				pos = this.turn('calculateZ', data.pageMv),
				view = this.turn('view', data.tpage);
		
			if (data.pagePlace[view[0]]==view[0]) apage = view[0];
			else if (data.pagePlace[view[1]]==view[1]) apage = view[1];
		
			for (page in data.pageWrap) {

				if (!has(page, data.pageWrap)) continue;

				data.pageWrap[page].css({display: (pos.pageV[page]) ? '' : 'none', 'z-index': pos.pageZ[page] || 0});

				if (data.pages[page]) {
					data.pages[page].flip('z', pos.partZ[page] || null);

					if (pos.pageV[page])
						data.pages[page].flip('resize');

					if (data.tpage)
						data.pages[page].flip('disable', true); // data.disabled || page!=apage
				}
			}
				
		} else {

			// Update static pages

			for (page in data.pageWrap) {
				if (!has(page, data.pageWrap)) continue;
					var pageLocation = turnMethods._setPageLoc.call(this, page);
					if (data.pages[page])
						data.pages[page].flip('disable', data.disabled || pageLocation!=1).flip('z', null);
			}
		}
	},

	// Sets the z-index and display property of a page
	// It depends on the current view

	_setPageLoc: function(page) {

		var data = this.data(),
			view = this.turn('view');

		if (page==view[0] || page==view[1]) {
			data.pageWrap[page].css({'z-index': data.totalPages, display: ''});
			return 1;
		} else if ((data.display=='single' && page==view[0]+1) || (data.display=='double' && page==view[0]-2 || page==view[1]+2)) {
			data.pageWrap[page].css({'z-index': data.totalPages-1, display: ''});
			return 2;
		} else {
			data.pageWrap[page].css({'z-index': 0, display: 'none'});
			return 0;
		}
	}
},

// Methods and properties for the flip page effect

flipMethods = {

	// Constructor

	init: function(opts) {

		if (opts.gradients) {
			opts.frontGradient = true;
			opts.backGradient = true;
		}

		this.data({f: {}});
		this.flip('options', opts);

		flipMethods._addPageWrapper.call(this);

		return this;
	},

	setData: function(d) {
		
		var data = this.data();

		data.f = $.extend(data.f, d);

		return this;
	},

	options: function(opts) {
		
		var data = this.data().f;

		if (opts) {
			flipMethods.setData.call(this, {opts: $.extend({}, data.opts || flipOptions, opts) });
			return this;
		} else
			return data.opts;

	},

	z: function(z) {

		var data = this.data().f;
		data.opts['z-index'] = z;
		data.fwrapper.css({'z-index': z || parseInt(data.parent.css('z-index'), 10) || 0});

		return this;
	},

	_cAllowed: function() {

		return corners[this.data().f.opts.corners] || this.data().f.opts.corners;

	},

	_cornerActivated: function(e) {
		if (e.originalEvent === undefined) {
			return false;
		}		

		e = (isTouch) ? e.originalEvent.touches : [e];

		var data = this.data().f,
			pos = data.parent.offset(),
			width = this.width(),
			height = this.height(),
			c = {x: Math.max(0, e[0].pageX-pos.left), y: Math.max(0, e[0].pageY-pos.top)},
			csz = data.opts.cornerSize,
			allowedCorners = flipMethods._cAllowed.call(this);

			if (c.x<=0 || c.y<=0 || c.x>=width || c.y>=height) return false;

			if (c.y<csz) c.corner = 't';
			else if (c.y>=height-csz) c.corner = 'b';
			else return false;
			
			if (c.x<=csz) c.corner+= 'l';
			else if (c.x>=width-csz) c.corner+= 'r';
			else return false;

		return ($.inArray(c.corner, allowedCorners)==-1) ? false : c;

	},

	_c: function(corner, opts) {

		opts = opts || 0;
		return ({tl: point2D(opts, opts),
				tr: point2D(this.width()-opts, opts),
				bl: point2D(opts, this.height()-opts),
				br: point2D(this.width()-opts, this.height()-opts)})[corner];

	},

	_c2: function(corner) {

		return {tl: point2D(this.width()*2, 0),
				tr: point2D(-this.width(), 0),
				bl: point2D(this.width()*2, this.height()),
				br: point2D(-this.width(), this.height())}[corner];

	},

	_foldingPage: function(corner) {

		var opts = this.data().f.opts;
		
		if (opts.folding) return opts.folding;
		else if(opts.turn) {
			var data = opts.turn.data();
			if (data.display == 'single')
				return (data.pageObjs[opts.next]) ? data.pageObjs[0] : null;
			else
				return data.pageObjs[opts.next];
		}

	},

	_backGradient: function() {

		var data =	this.data().f,
			turn = data.opts.turn,
			gradient = data.opts.backGradient &&
						(!turn || turn.data().display=='single' || (data.opts.page!=2 && data.opts.page!=turn.data().totalPages-1) );


		if (gradient && !data.bshadow)
			data.bshadow = $('<div/>', divAtt(0, 0, 1)).
				css({'position': '', width: this.width(), height: this.height()}).
					appendTo(data.parent);

		return gradient;

	},

	resize: function(full) {
		
		var data = this.data().f,
			width = this.width(),
			height = this.height(),
			size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));

		if (full) {
			data.wrapper.css({width: size, height: size});
			data.fwrapper.css({width: size, height: size}).
				children(':first-child').
					css({width: width, height: height});

			data.fpage.css({width: height, height: width});

			if (data.opts.frontGradient)
				data.ashadow.css({width: height, height: width});

			if (flipMethods._backGradient.call(this))
				data.bshadow.css({width: width, height: height});
		}

		if (data.parent.is(':visible')) {
			data.fwrapper.css({top: data.parent.offset().top,
				left: data.parent.offset().left});

			if (data.opts.turn)
				data.fparent.css({top: -data.opts.turn.offset().top, left: -data.opts.turn.offset().left});
		}

		this.flip('z', data.opts['z-index']);

	},

	// Prepares the page by adding a general wrapper and another objects

	_addPageWrapper: function() {

		var att,
			data = this.data().f,
			parent = this.parent();

		if (!data.wrapper) {

			var left = this.css('left'),
				top = this.css('top'),
				width = this.width(),
				height = this.height(),
				size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));
			
			data.parent = parent;
			data.fparent = (data.opts.turn) ? data.opts.turn.data().fparent : $('#turn-fwrappers');

			if (!data.fparent) {
				var fparent = $('<div/>', {css: {'pointer-events': 'none'}}).hide();
					fparent.data().flips = 0;

				if (data.opts.turn) {
					fparent.css(divAtt(-data.opts.turn.offset().top, -data.opts.turn.offset().left, 'auto', 'visible').css).
							appendTo(data.opts.turn);
					
					data.opts.turn.data().fparent = fparent;
				} else {
					fparent.css(divAtt(0, 0, 'auto', 'visible').css).
						attr('id', 'turn-fwrappers').
							appendTo($('body'));
				}

				data.fparent = fparent;
			}

			this.css({position: 'absolute', top: 0, left: 0, bottom: 'auto', right: 'auto'});

			data.wrapper = $('<div/>', divAtt(0, 0, this.css('z-index'))).
								appendTo(parent).
									prepend(this);

			data.fwrapper = $('<div/>', divAtt(parent.offset().top, parent.offset().left)).
								hide().
									appendTo(data.fparent);

			data.fpage = $('<div/>', {css: {cursor: 'default'}}).
					appendTo($('<div/>', divAtt(0, 0, 0, 'visible')).
								appendTo(data.fwrapper));

			if (data.opts.frontGradient)
				data.ashadow = $('<div/>', divAtt(0, 0,  1)).
					appendTo(data.fpage);

			// Save data

			flipMethods.setData.call(this, data);

			// Set size
			flipMethods.resize.call(this, true);
		}

	},

	// Takes a 2P point from the screen and applies the transformation

	_fold: function(point) {

		var that = this,
			a = 0,
			alpha = 0,
			beta,
			px,
			gradientEndPointA,
			gradientEndPointB,
			gradientStartV,
			gradientSize,
			gradientOpacity,
			mv = point2D(0, 0),
			df = point2D(0, 0),
			tr = point2D(0, 0),
			width = this.width(),
			height = this.height(),
			folding = flipMethods._foldingPage.call(this),
			tan = Math.tan(alpha),
			data = this.data().f,
			ac = data.opts.acceleration,
			h = data.wrapper.height(),
			o = flipMethods._c.call(this, point.corner),
			top = point.corner.substr(0, 1) == 't',
			left = point.corner.substr(1, 1) == 'l',

			compute = function() {
				var rel = point2D((o.x) ? o.x - point.x : point.x, (o.y) ? o.y - point.y : point.y),
					tan = (Math.atan2(rel.y, rel.x)),
					middle;

				alpha = A90 - tan;
				a = deg(alpha);
				middle = point2D((left) ? width - rel.x/2 : point.x + rel.x/2, rel.y/2);

				var gamma = alpha - Math.atan2(middle.y, middle.x),
					distance =  Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));

					tr = point2D(distance * Math.sin(alpha), distance * Math.cos(alpha));

					if (alpha > A90) {
					
						tr.x = tr.x + Math.abs(tr.y * Math.tan(tan));
						tr.y = 0;

						if (Math.round(tr.x*Math.tan(PI-alpha)) < height) {

							point.y = Math.sqrt(Math.pow(height, 2)+2 * middle.x * rel.x);
							if (top) point.y =  height - point.y;
							return compute();

						}
					}
			
				if (alpha>A90) {
					var beta = PI-alpha, dd = h - height/Math.sin(beta);
					mv = point2D(Math.round(dd*Math.cos(beta)), Math.round(dd*Math.sin(beta)));
					if (left) mv.x = - mv.x;
					if (top) mv.y = - mv.y;
				}

				px = Math.round(tr.y/Math.tan(alpha) + tr.x);
			
				var side = width - px,
					sideX = side*Math.cos(alpha*2),
					sideY = side*Math.sin(alpha*2);
					df = point2D(Math.round( (left ? side -sideX : px+sideX)), Math.round((top) ? sideY : height - sideY));
					
				
				// GRADIENTS

					gradientSize = side*Math.sin(alpha);
						var endingPoint = flipMethods._c2.call(that, point.corner),
						far = Math.sqrt(Math.pow(endingPoint.x-point.x, 2)+Math.pow(endingPoint.y-point.y, 2));

					gradientOpacity = (far<width) ? far/width : 1;


				if (data.opts.frontGradient) {

					gradientStartV = gradientSize>100 ? (gradientSize-100)/gradientSize : 0;
					gradientEndPointA = point2D(gradientSize*Math.sin(A90-alpha)/height*100, gradientSize*Math.cos(A90-alpha)/width*100);
				
					if (top) gradientEndPointA.y = 100-gradientEndPointA.y;
					if (left) gradientEndPointA.x = 100-gradientEndPointA.x;
				}

				if (flipMethods._backGradient.call(that)) {

					gradientEndPointB = point2D(gradientSize*Math.sin(alpha)/width*100, gradientSize*Math.cos(alpha)/height*100);
					if (!left) gradientEndPointB.x = 100-gradientEndPointB.x;
					if (!top) gradientEndPointB.y = 100-gradientEndPointB.y;
				}
				//

				tr.x = Math.round(tr.x);
				tr.y = Math.round(tr.y);

				return true;
			},

			transform = function(tr, c, x, a) {
			
				var f = ['0', 'auto'], mvW = (width-h)*x[0]/100, mvH = (height-h)*x[1]/100,
					v = {left: f[c[0]], top: f[c[1]], right: f[c[2]], bottom: f[c[3]]},
					aliasingFk = (a!=90 && a!=-90) ? (left ? -1 : 1) : 0;

					x = x[0] + '% ' + x[1] + '%';

				that.css(v).transform(rotate(a) + translate(tr.x + aliasingFk, tr.y, ac), x);

				data.fpage.parent().css(v);
				data.wrapper.transform(translate(-tr.x + mvW-aliasingFk, -tr.y + mvH, ac) + rotate(-a), x);

				data.fwrapper.transform(translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH, ac) + rotate(-a), x);
				data.fpage.parent().transform(rotate(a) + translate(tr.x + df.x - mv.x, tr.y + df.y - mv.y, ac), x);

				if (data.opts.frontGradient)
					gradient(data.ashadow,
							point2D(left?100:0, top?100:0),
							point2D(gradientEndPointA.x, gradientEndPointA.y),
							[[gradientStartV, 'rgba(0,0,0,0)'],
							[((1-gradientStartV)*0.8)+gradientStartV, 'rgba(0,0,0,'+(0.2*gradientOpacity)+')'],
							[1, 'rgba(255,255,255,'+(0.2*gradientOpacity)+')']],
							3,
							alpha);
		
				if (flipMethods._backGradient.call(that))
					gradient(data.bshadow,
							point2D(left?0:100, top?0:100),
							point2D(gradientEndPointB.x, gradientEndPointB.y),
							[[0.8, 'rgba(0,0,0,0)'],
							[1, 'rgba(0,0,0,'+(0.3*gradientOpacity)+')'],
							[1, 'rgba(0,0,0,0)']],
							3);
				
			};

		switch (point.corner) {
			case 'tl' :
				point.x = Math.max(point.x, 1);
				compute();
				transform(tr, [1,0,0,1], [100, 0], a);
				data.fpage.transform(translate(-height, -width, ac) + rotate(90-a*2) , '100% 100%');
				folding.transform(rotate(90) + translate(0, -height, ac), '0% 0%');
			break;
			case 'tr' :
				point.x = Math.min(point.x, width-1);
				compute();
				transform(point2D(-tr.x, tr.y), [0,0,0,1], [0, 0], -a);
				data.fpage.transform(translate(0, -width, ac) + rotate(-90+a*2) , '0% 100%');
				folding.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');
			break;
			case 'bl' :
				point.x = Math.max(point.x, 1);
				compute();
				transform(point2D(tr.x, -tr.y), [1,1,0,0], [100, 100], -a);
				data.fpage.transform(translate(-height, 0, ac) + rotate(-90+a*2), '100% 0%');
				folding.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');
			break;
			case 'br' :
				point.x = Math.min(point.x, width-1);
				compute();
				transform(point2D(-tr.x, -tr.y), [0,1,1,0], [0, 100], a);
				data.fpage.transform(rotate(90-a*2), '0% 0%');
				folding.transform(rotate(90) + translate(0, -height, ac), '0% 0%');

			break;
		}

		data.point = point;
	
	},

	_moveFoldingPage: function(bool) {

		var data = this.data().f,
			folding = flipMethods._foldingPage.call(this);

		if (folding) {
			if (bool) {
				if (!data.fpage.children()[data.ashadow? '1' : '0']) {
					flipMethods.setData.call(this, {backParent: folding.parent()});
					data.fpage.prepend(folding);
				}
			} else {
				if (data.backParent)
					data.backParent.prepend(folding);

			}
		}

	},

	_showFoldedPage: function(c, animate) {

		var folding = flipMethods._foldingPage.call(this),
			dd = this.data(),
			data = dd.f;

		if (!data.point || data.point.corner!=c.corner) {
			var event = $.Event('start');
			this.trigger(event, [data.opts, c.corner]);

			if (event.isDefaultPrevented())
				return false;
		}


		if (folding) {

			if (animate) {

				var that = this, point = (data.point && data.point.corner==c.corner) ? data.point : flipMethods._c.call(this, c.corner, 1);
			
				this.animatef({from: [point.x, point.y], to:[c.x, c.y], duration: 500, frame: function(v) {
					c.x = Math.round(v[0]);
					c.y = Math.round(v[1]);
					flipMethods._fold.call(that, c);
				}});

			} else	{

				flipMethods._fold.call(this, c);
				if (dd.effect && !dd.effect.turning)
					this.animatef(false);

			}

			if (!data.fwrapper.is(':visible')) {
				data.fparent.show().data().flips++;
				flipMethods._moveFoldingPage.call(this, true);
				data.fwrapper.show();

				if (data.bshadow)
					data.bshadow.show();
			}

			return true;
		}

		return false;
	},

	hide: function() {

		var data = this.data().f,
			folding = flipMethods._foldingPage.call(this);

		if ((--data.fparent.data().flips)===0)
			data.fparent.hide();

		this.css({left: 0, top: 0, right: 'auto', bottom: 'auto'}).transform('', '0% 100%');

		data.wrapper.transform('', '0% 100%');

		data.fwrapper.hide();

		if (data.bshadow)
			data.bshadow.hide();

		folding.transform('', '0% 0%');

		return this;
	},

	hideFoldedPage: function(animate) {

		var data = this.data().f;

		if (!data.point) return;

		var that = this,
			p1 = data.point,
			hide = function() {
				data.point = null;
				that.flip('hide');
				that.trigger('end', [false]);
			};

		if (animate) {
			var p4 = flipMethods._c.call(this, p1.corner),
				top = (p1.corner.substr(0,1)=='t'),
				delta = (top) ? Math.min(0, p1.y-p4.y)/2 : Math.max(0, p1.y-p4.y)/2,
				p2 = point2D(p1.x, p1.y+delta),
				p3 = point2D(p4.x, p4.y-delta);
		
			this.animatef({
				from: 0,
				to: 1,
				frame: function(v) {
					var np = bezier(p1, p2, p3, p4, v);
					p1.x = np.x;
					p1.y = np.y;
					flipMethods._fold.call(that, p1);
				},
				complete: hide,
				duration: 800,
				hiding: true
				});

		} else {
			this.animatef(false);
			hide();
		}
	},

	turnPage: function(corner) {

		var that = this,
			data = this.data().f;

		corner = {corner: (data.corner) ? data.corner.corner : corner || flipMethods._cAllowed.call(this)[0]};

		var p1 = data.point || flipMethods._c.call(this, corner.corner, (data.opts.turn) ? data.opts.turn.data().opts.elevation : 0),
			p4 = flipMethods._c2.call(this, corner.corner);

			this.trigger('flip').
				animatef({
					from: 0,
					to: 1,
					frame: function(v) {
						var np = bezier(p1, p1, p4, p4, v);
						corner.x = np.x;
						corner.y = np.y;
						flipMethods._showFoldedPage.call(that, corner);
					},
					
					complete: function() {
						that.trigger('end', [true]);
					},
					duration: data.opts.duration,
					turning: true
				});

			data.corner = null;
	},

	moving: function() {

		return 'effect' in this.data();
	
	},

	isTurning: function() {

		return this.flip('moving') && this.data().effect.turning;
	
	},

	_eventStart: function(e) {

		var data = this.data().f;

		if (!data.disabled && !this.flip('isTurning')) {
			data.corner = flipMethods._cornerActivated.call(this, e);
			if (data.corner && flipMethods._foldingPage.call(this, data.corner)) {
				flipMethods._moveFoldingPage.call(this, true);
				this.trigger('pressed', [data.point]);
				return false;
			} else
				data.corner = null;
		}

	},

	_eventMove: function(e) {

		var data = this.data().f;

		if (!data.disabled) {
			e = (isTouch) ? e.originalEvent.touches : [e];
		
			if (data.corner) {

				var pos = data.parent.offset();

				data.corner.x = e[0].pageX-pos.left;
				data.corner.y = e[0].pageY-pos.top;

				flipMethods._showFoldedPage.call(this, data.corner);
			
			} else if (!this.data().effect && this.is(':visible')) { // roll over
				
				var corner = flipMethods._cornerActivated.call(this, e[0]);
				if (corner) {
					var origin = flipMethods._c.call(this, corner.corner, data.opts.cornerSize/2);
					corner.x = origin.x;
					corner.y = origin.y;
					flipMethods._showFoldedPage.call(this, corner, true);
				} else
					flipMethods.hideFoldedPage.call(this, true);

			}
		}
	},

	_eventEnd: function() {

		var data = this.data().f;

		if (!data.disabled && data.point) {
			var event = $.Event('released');
			this.trigger(event, [data.point]);
			if (!event.isDefaultPrevented())
				flipMethods.hideFoldedPage.call(this, true);
		}

		data.corner = null;

	},

	disable: function(disable) {

		flipMethods.setData.call(this, {'disabled': disable});
		return this;

	}
},

cla = function(that, methods, args) {

	if (!args[0] || typeof(args[0])=='object')
		return methods.init.apply(that, args);
	else if(methods[args[0]] && args[0].toString().substr(0, 1)!='_')
		return methods[args[0]].apply(that, Array.prototype.slice.call(args, 1));
	else
		throw args[0] + ' is an invalid value';
};

$.extend($.fn, {

	flip: function(req, opts) {
		return cla(this, flipMethods, arguments);
	},

	turn: function(req) {
		return cla(this, turnMethods, arguments);
	},

	transform: function(transform, origin) {

		var properties = {};
		
		if (origin)
			properties[vendor+'transform-origin'] = origin;
		
		properties[vendor+'transform'] = transform;
	
		return this.css(properties);

	},

	animatef: function(point) {

		var data = this.data();

		if (data.effect)
			clearInterval(data.effect.handle);

		if (point) {

			if (!point.to.length) point.to = [point.to];
			if (!point.from.length) point.from = [point.from];
			if (!point.easing) point.easing = function (x, t, b, c, data) { return c * Math.sqrt(1 - (t=t/data-1)*t) + b; };

			var j, diff = [],
				len = point.to.length,
				that = this,
				fps = point.fps || 30,
				time = - fps,
				f = function() {
					var j, v = [];
					time = Math.min(point.duration, time + fps);
	
					for (j = 0; j < len; j++)
						v.push(point.easing(1, time, point.from[j], diff[j], point.duration));

					point.frame((len==1) ? v[0] : v);

					if (time==point.duration) {
						clearInterval(data.effect.handle);
						delete data['effect'];
						that.data(data);
						if (point.complete)
							point.complete();
						}
					};

			for (j = 0; j < len; j++)
				diff.push(point.to[j] - point.from[j]);

			data.effect = point;
			data.effect.handle = setInterval(f, fps);
			this.data(data);
			f();
		} else {
			delete data['effect'];
		}
	}
});


$.isTouch = isTouch;

})(jQuery);;/*!
 * jQuery TubePlayer Plugin
 * 
 * version: 1.1.0 (1-Oct-2012)
 * @requires v1.3.2 or later
 *
 * @imports SWFObject - http://code.google.com/p/swfobject/
 *	- Degrades to flash based player if not HTML5/iframe option 
 *
 * Author: Nirvana Tikku (@ntikku / ntikku@gmail.com)
 * Documentation:
 * 		http://www.tikku.com/jquery-youtube-tubeplayer-plugin
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html 
 */
;(function($){
    
    "use strict";
	
	// tubeplayer namespace
	
	var TUBEPLAYER = ".tubeplayer",
	
		TUBE_PLAYER_CLASS = "jquery-youtube-tubeplayer",
		
		OPTS = "opts"+TUBEPLAYER;
	
	//	
	//
	// TubePlayer package 
	//
	//
	var TubePlayer = {};
	
	// all the instances that exist
	TubePlayer.ytplayers = {}; 
	
	// local init functions for multiple iframe players
	TubePlayer.inits = []; 
	
	// no need to import the iframe script multiple times
	TubePlayer.iframeScriptInited = false; 
	
	// tubeplayer inited flag - for destroy/re-init
	TubePlayer.inited = false;
	
	//
	//
	// public facing defaults
	//
	//
	
	$.tubeplayer = {};
	$.tubeplayer.TubePlayer = TubePlayer;
	
	// events cache -- used by flashplayer version of video player
	$.tubeplayer.events = {};
	
	/**
	 * These are all the events that are bound to the YouTube Player
	 * the events can be overridden as they are public.
	 * 
	 * There are several functions that serve as wrappers to be utilized
	 * internally - stateChange, onError, qualityChange. Change them at your 
	 * own risk.
	 */
	$.tubeplayer.defaults = {
	
		afterReady: function($player){},
		
		stateChange: function(player){
			
			var _ret = this.onPlayer;
			
			return function(state){
			    
				if(typeof(state)==="object")
					state = state.data;
				
				switch(state){
					
					case -1: return _ret.unstarted[player]();
					
					case 0: return _ret.ended[player]();
					
					case 1: return _ret.playing[player]();
					
					case 2: return _ret.paused[player]();
					
					case 3: return _ret.buffering[player]();
					
					case 5: return _ret.cued[player]();
					
					default: return null;
					
				}
			}
			
		},
		
		onError: function(player){
			
			var _ret = this.onErr;
			
			return function(errorCode){
				
				if(typeof(errorCode)==="object")
					errorCode = errorCode.data;
					
				switch(errorCode){
					
					case 2: return _ret.invalidParameter[player]();
					
					case 100: return _ret.notFound[player]();
					
					case 101:
					case 150: return _ret.notEmbeddable[player]();
					
					default: return null;
					
				}
				
			}
			
		},
		
		qualityChange: function(player){
			
			var _this = this;
			
			return function(suggested){
				
				if(typeof(suggested)==="object")
					suggested = suggested.data;
					
				return _this.onQualityChange[player](suggested);
				
			}
			
		},
		
		onQualityChange:{},
		
		onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},
		
		onErr:{notFound:{},notEmbeddable:{},invalidParameter:{}}
		
	};
	
	/**
	 * These are the internal defaults for the TubePlayer
	 * plugin to work without providing any parameters. They
	 * are merged with the users options.
	 */
	var defaults = {
		
		// public facing
		width: 425,
		height: 355,
		allowFullScreen: "true",
		initialVideo: "DkoeNLuMbcI",
		start: 0,
		preferredQuality: "default",
		showControls: true,
		showRelated: false,
		annotations: true,
		autoPlay: false,
		autoHide: true,
		loop: 0,
		theme: 'dark', // 'dark' or 'light'
		color: 'red', // 'red' or 'white'
		showinfo: false,
		modestbranding: true,
		protocol: 'http', // set to 'https' for compatibility on SSL-enabled pages
		
		// with respect to [wmode] - 'transparent' maintains z-index, but disables GPU acceleration
		wmode: 'transparent', // you probably want to use 'window' when optimizing for mobile devices
		swfobjectURL: "ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", // exclude the protocol, it will be read from the 'protocol' property
		loadSWFObject: true, // by default, we will attempt to load the swfobject script, if utilizing the flash player
		
		// privately used
		allowScriptAccess: "always",
		playerID: "tubeplayer-player-container",
		
		// html5 specific attrs
		iframed: true,
				
		// trigger fn's
		onPlay: function(id){},
		onPause: function(){},
		onStop: function(){},
		onSeek: function(time){},
		onMute: function(){},
		onUnMute: function(){},
		
		// player fn's
		onPlayerUnstarted: function(){},
		onPlayerEnded: function(){},
		onPlayerPlaying: function(){},
		onPlayerPaused: function(){},
		onPlayerBuffering: function(){},
		onPlayerCued: function(){},
		onQualityChange: function(){},
		
		// error fn's
		onErrorNotFound: function(){},
		onErrorNotEmbeddable: function(){},
		onErrorInvalidParameter: function(){}
		
	};
	
	/**
	 * The TubePlayer plugin bound to the jQuery object's prototype. 
	 * This method acts as an interface to instantiate a TubePlayer, 
	 * as well as invoke events that are attached - typically getters/setters
	 */
	$.fn.tubeplayer = function(input, xtra){
		
		var $this = $(this);
		
		var type = typeof input;
		
		if( arguments.length === 0 || type === "object" )
		
			return $this.each(function(){
				
				TubePlayer.init( $(this), input );
				
			});
			
		else if( type === "string" )
		
			return $this.triggerHandler( input+TUBEPLAYER, xtra || null );
			
	};
	
		
	/**
	 * This method is the base method for all the events
	 * that are bound to the TubePlayer. 
	 */
	var buildFN = function(fn, after){
		
		return function(evt,param){
			
			var p = TubePlayer.getPkg(evt);
			
			if(p.ytplayer) { 
				
				var ret = fn(evt, param, p);
				
				if(typeof(ret)==="undefined") 
					ret = p.$player;
					
				return ret;
				
			}
			
			return p.$player;
			
		};
		
	};
	
	/**
	 * Public method to get all the player instances
	 */
	$.tubeplayer.getPlayers = function(){
		
		return TubePlayer.ytplayers;
		
	};
	
	
	/**
	 * Initialize a YouTube player; 
	 *
	 *	First check to see if TubePlayer has been init'd
	 *	if it has then return, otherwise:
	 *		> add the tubeplayer class (used to denote a player)
	 *		> provide local data access to the options and store it
	 *		> initialize the default events on the jQuery instance
	 *		> create the container for the player
	 *		> initialize the player (iframe/HTML5 vs flash based)
	 * 
	 *	@param $player - the instance being created on
	 *	@param opts - the user's options
	 */
	TubePlayer.init = function($player, opts){
	
		if( $player.hasClass(TUBE_PLAYER_CLASS) )
			return $player;
		
		var o = $.extend({}, defaults, opts);
			
		o.playerID += "-" + guid();
			
		$player.addClass(TUBE_PLAYER_CLASS).data(OPTS, o);
		
		for(var event in PLAYER) 
			$player.bind(event+TUBEPLAYER, $player, PLAYER[event]);
			
		// initialize the default event methods
		TubePlayer.initDefaults($.tubeplayer.defaults, o);
	
		// insert the player container
		$("<div></div>").attr("id", o.playerID).appendTo($player);
		
		// append the player into the container
		TubePlayer.initPlayer($player, o);
		
		return $player; 
		
	};
	
	/**
	 * Every method needs these items
	 */
	TubePlayer.getPkg = function(evt){
		
		var $player = evt.data;
		
		var opts = $player.data(OPTS);
		
		var ytplayer = TubePlayer.ytplayers[opts.playerID];
		
		return {
			
			$player: $player,
			
			opts: opts,
			
			ytplayer: ytplayer
			
		}
		
	};
	
	/**
	 * This method handles the player init. Since 
	 * onYouTubePlayerReady is called when the script
	 * has been evaluated, we want all the instances
	 * to get init'd. For this we have a init queue.
	 * If the script has been init'd, we automatically
	 * pop the method off the queue and init the player.
	 */
	TubePlayer.iframeReady = function(o){
		
		TubePlayer.inits.push(function(){
			
			new YT.Player(o.playerID, {
				
				videoId: o.initialVideo,
				
				width: o.width,
				
				height: o.height,
				
				playerVars: { 
					
					'autoplay': (o.autoPlay?1:0), 
					
					'autohide': (o.autoHide?1:0),
					
					'controls': (o.showControls?1:0),
					
					'loop': (o.loop?1:0),
					
					'playlist': (o.loop ? o.initialVideo : ""),

					'rel': (o.showRelated?1:0),
					
					'fs': (o.allowFullScreen?1:0),
					
					'wmode': o.wmode,
					
					'showinfo': (o.showinfo?1:0),
					
					'modestbranding': (o.modestbranding?1:0),
					
					'iv_load_policy': (o.annotations?1:3),
					
					'start': o.start,
					
					'theme': o.theme,
					
					'color': o.color
					
				},
				
				events: {
					
					'onReady': function(evt){
						
						TubePlayer.ytplayers[o.playerID] = evt.target;
						
						var $player = $(evt.target).parents("."+TUBE_PLAYER_CLASS);
						
						$.tubeplayer.defaults.afterReady($player);
						
					},
					
					'onPlaybackQualityChange': $.tubeplayer.defaults.qualityChange(o.playerID),
					
					'onStateChange': $.tubeplayer.defaults.stateChange(o.playerID),
				
					'onError': $.tubeplayer.defaults.onError(o.playerID)
					
				}
				
			});
			
		});
		
		// stacked init method
		if(TubePlayer.inits.length>=1 && !TubePlayer.inited){
			
			return function(){
				
				for(var i=0; i<TubePlayer.inits.length; i++){

					TubePlayer.inits[i]();
					
				}
				
				TubePlayer.inited = true;
				
			};
			
		}
		
		// if we've inited already, just call the init fn
		if(TubePlayer.inited){
			
			( TubePlayer.inits.pop() )();
			
		}
		
		return window.onYouTubePlayerAPIReady;
		
	};
	
	/**
	 * check to see if iframe option is plausible
	 */
	TubePlayer.supportsHTML5 = function(){
		
		return !!document.createElement('video').canPlayType;
		
	};
	
	/**
	 * @param d - the defaults
	 * @param o - the options w/ methods to attach
	 */
	TubePlayer.initDefaults = function(d, o){
	
		var ID = o.playerID; 
		
		// default onPlayer events
		var dp = d.onPlayer;
		dp.unstarted[ID] = o.onPlayerUnstarted;
		dp.ended[ID] = o.onPlayerEnded;
		dp.playing[ID] = o.onPlayerPlaying;
		dp.paused[ID] = o.onPlayerPaused;
		dp.buffering[ID] = o.onPlayerBuffering;
		dp.cued[ID] = o.onPlayerCued;
		
		// default onQualityChange
		d.onQualityChange[ID] = o.onQualityChange;
		
		// default onError events
		var de = d.onErr;
		de.notFound[ID] = o.onErrorNotFound;
		de.notEmbeddable[ID] = o.onErrorNotEmbeddable;
		de.invalidParameter[ID] = o.onErrorInvalidParameter;
		
	};
	
	/**
	 * init the iframed option if its requested and supported
	 * otherwise initialize the flash based player
	 * @param $player - the player that the tubeplayer binds to
	 * @param o - the init options
	 */
	TubePlayer.initPlayer = function($player, o){
		
		if(o.iframed && TubePlayer.supportsHTML5())
		
			TubePlayer.initIframePlayer($player, o);
			
		else
		
			TubePlayer.initFlashPlayer($player, o);
			
	};
	
	/**
	 * Initialize an iframe player
	 */
	TubePlayer.initIframePlayer = function($player, o){
		
		if(!TubePlayer.iframeScriptInited){
		
			// write the api script tag
			var tag = document.createElement('script');
		
			tag.src = o.protocol + "://www.youtube.com/iframe_api";
		
			var firstScriptTag = document.getElementsByTagName('script')[0];
		
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
			TubePlayer.iframeScriptInited = true;
		
		};
		
		// init the iframe player
		window.onYouTubePlayerAPIReady = TubePlayer.iframeReady(o);
		
	};
	
	/**
	 * Flash player initialization
	 *  -> if 'loadSWFObject' is set to true, player will only be init'd
	 *      when the swfobject script request has completed successfully
	 *  -> if 'loadSWFObject' is set to false, assumes that you have 
	 *      imported your own SWFObject, prior to TubePlayer's initialization
	 * @imports swfobject automatically
	 */
	TubePlayer.initFlashPlayer = function($player, o){
		
		if(o.loadSWFObject){
		    
		    // cleanup swfobjectURL to re-apply the protocol
		    o.swfobjectURL = o.swfobjectURL.replace('http://', '');
		    o.swfobjectURL = o.swfobjectURL.replace('https://', '');
		    o.swfobjectURL = o.protocol + '://' + o.swfobjectURL;
		    
		    $.getScript(o.swfobjectURL, TubePlayer.initFlashPlayerFN(o));
		    
		} else {
		    
		    TubePlayer.initFlashPlayerFN(o)();
		    
		}
		
	};
	
	TubePlayer.initFlashPlayerFN = function(o){
	  
	    return function(){
		
			var url =  ["//www.youtube.com/v/"]
			url.push( o.initialVideo );
			url.push( "?&enablejsapi=1&version=3" );
			url.push( "&playerapiid=" + o.playerID );
			url.push( "&rel= " + (o.showRelated?1:0) );
			url.push( "&autoplay=" + (o.autoPlay?1:0) );
			url.push( "&autohide=" + (o.autoHide?1:0) );
			url.push( "&loop=" + (o.loop?1:0) );
			url.push( "&playlist=" + (o.loop ? o.initialVideo : ""));
			url.push( "&controls=" + (o.showControls?1:0) );
			url.push( "&showinfo=" + (o.showinfo?1:0) );
			url.push( "&modestbranding=" + (o.modestbranding?1:0) );
			url.push( "&iv_load_policy=" + (o.annotations?1:3) );
			url.push( "&start=" + o.start );
			url.push( "&theme=" + o.theme );
			url.push( "&color=" + o.color );
			url.push( "&fs=" + (o.allowFullScreen?1:0) );
			
			swfobject.embedSWF(url.join(""), o.playerID, 
				o.width, 
				o.height, 
				"8", null, null, 
				{ 
					allowScriptAccess: o.allowScriptAccess, 
					wmode: o.wmode, 
					allowFullScreen: o.allowFullScreen 
				}, 
				{ id: o.playerID }
			);
			
			// init the player ready fn
			window.onYouTubePlayerReady = function(playerId) { 
				
				var player = document.getElementById(playerId);
				
                var pid = playerId.replace(/-/g,'');
                
                var d = $.tubeplayer.defaults;
                $.tubeplayer.events[pid] = {
                    "stateChange": d.stateChange(playerId),
                    "error": d.onError(playerId),
                    "qualityChange": d.qualityChange(playerId)
                };
                
				player.addEventListener("onStateChange", "$.tubeplayer.events."+pid+".stateChange"); 
				player.addEventListener("onError", "$.tubeplayer.events."+pid+".error");
				player.addEventListener("onPlaybackQualityChange", "$.tubeplayer.events."+pid+".qualityChange");
				
				TubePlayer.ytplayers[playerId] = player;
				
                var $player = $(player).parents("."+TUBE_PLAYER_CLASS);
				
				$.tubeplayer.defaults.afterReady($player);
				
			};
			
		}
	    
	};
	
	// fmt: youtube.com/watch?x=[anything]&v=[desired-token]&
	TubePlayer.getVideoIDFromURL = function(sURL){
		
		sURL = sURL || ""; // make sure it's a string; sometimes the YT player API returns undefined, and then indexOf() below will fail
		
		var qryParamsStart = sURL.indexOf("?");
		
		var qryParams = sURL.substring(qryParamsStart, sURL.length);
		
		var videoStart = qryParams.indexOf("v=");
		if( videoStart > -1 ) { 
		    var videoEnd = qryParams.indexOf("&", videoStart);
		    if( videoEnd === -1 ) { 
		        videoEnd = qryParams.length;
		    }
		    return qryParams.substring(videoStart+"v=".length, videoEnd);
		}
		
		return "";
		
	};
	
	/**
	 * All the events that are bound to a TubePlayer instance
	 */
	var PLAYER = {
		
		cue: buildFN(function(evt,param,p){ 
			
			p.ytplayer.cueVideoById(param, p.opts.preferredQuality);
			
		}),
		
		play: buildFN(function(evt,param,p){
			
			if(typeof(param)==='object') 
				p.ytplayer.loadVideoById(param.id,param.time, p.opts.preferredQuality); 
		
			else if(param) 
				p.ytplayer.loadVideoById(param, 0, p.opts.preferredQuality); 
	
			else
				p.ytplayer.playVideo(); 
				
			p.opts.onPlay(param);
			
		}),
		
		pause: buildFN(function(evt,param,p){
			
			p.ytplayer.pauseVideo();
			
			p.opts.onPause(p);
			
		}),
		
		stop: buildFN(function(evt,param,p){
			
			p.ytplayer.stopVideo();
			
			p.opts.onStop(p);
			
		}),
		
		seek: buildFN(function(evt,param,p){
			
			p.ytplayer.seekTo(param, true);
			
			p.opts.onSeek(param);
			
		}),
		
		mute: buildFN(function(evt,param,p){
			
			p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());
			
			p.ytplayer.mute(); 
			
			p.opts.onMute(p);
			
		}),
		
		unmute: buildFN(function(evt,param,p){
			
			p.ytplayer.unMute(); 
			
			p.ytplayer.setVolume( ( p.$player.attr("data-prev-mute-volume") || 50 ) );
			
			p.opts.onUnMute();
			
		}),
		
		isMuted: buildFN(function(evt,param,p){
			
			return p.ytplayer.isMuted();
			
		}),
		
		volume: buildFN(function(evt,param,p){
			
			if(param) {
				
				p.ytplayer.setVolume(param);
				
				p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());
				
			}	else  {
				
				return p.ytplayer.getVolume() || 0; // 0 because iframe's currently in labs
				
			}
		
		}),
		
		quality: buildFN(function(evt,param,p){
			
			if(param) 
				p.ytplayer.setPlaybackQuality(param); 
				
			else 
				return p.ytplayer.getPlaybackQuality();
				
		}),
		
		data: buildFN(function(evt,param,p){
			
			var ret = {}; 
			
			var P = p.ytplayer;
			
			ret.bytesLoaded = P.getVideoBytesLoaded(); 
			
			ret.bytesTotal = P.getVideoBytesTotal();
			
			ret.startBytes= P.getVideoStartBytes();
			
			ret.state = P.getPlayerState();
			
			ret.currentTime = P.getCurrentTime();
			
			ret.duration = P.getDuration();
			
			ret.videoURL = P.getVideoUrl();
			
			ret.getVideoEmbedCode = P.getVideoEmbedCode();
			
			ret.videoID = TubePlayer.getVideoIDFromURL(ret.videoURL);
			
			ret.availableQualityLevels = P.getAvailableQualityLevels();
            
			return ret;
			
		}),
		
		videoId: buildFN(function(evt,param,p){
			
			return TubePlayer.getVideoIDFromURL( p.ytplayer.getVideoUrl() );
			
		}),
		
		size: buildFN(function(evt, param, p){
			
			if(param.width && param.height) { 
				
				p.ytplayer.setSize(param.width, param.height);
				
				$(p.ytplayer).css(param);
				
			}
			
		}),
		
		destroy: buildFN(function(evt, param, p){

			p.$player.removeClass(TUBE_PLAYER_CLASS)
				.data(OPTS, null)
				.unbind(TUBEPLAYER)
				.html("");
				
			delete TubePlayer.ytplayers[p.opts.playerID];
			
			// cleanup callback handler references..
			var d = $.tubeplayer.defaults;
			
			var events = ['unstarted','ended','playing','paused','buffering','cued'];
			for(var _event in events) 
			    delete d.onPlayer[events[_event]][p.opts.playerID];
			    
			events = ['notFound','notEmbeddable','invalidParameter'];
			for(var _event in events) 
			    delete d.onErr[events[_event]][p.opts.playerID];
			    
			delete d.onQualityChange[p.opts.playerID];
			
			delete $.tubeplayer.events[p.opts.playerID]; // flash callback ref's
			
			$(p.ytplayer).remove();
			
			return null;		
			
		}),
		
		player: buildFN(function(evt, param, p){
			
			return p.ytplayer;
			
		})
		
	};
	
	// used in case of multiple players
	function guid(){
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });;
	};
	
})(jQuery);;/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));
;/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  $.transit = {
    version: "0.9.9",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionEnd',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof properties.easing !== 'undefined') {
      easing = properties.easing;
      delete properties.easing;
    }

    if (typeof properties.duration !== 'undefined') {
      duration = properties.duration;
      delete properties.duration;
    }

    if (typeof properties.complete !== 'undefined') {
      callback = properties.complete;
      delete properties.complete;
    }

    if (typeof properties.queue !== 'undefined') {
      queue = properties.queue;
      delete properties.queue;
    }

    if (typeof properties.delay !== 'undefined') {
      delay = properties.delay;
      delete properties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(properties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(properties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      self.each(function() {
        if (i > 0) {
          this.style[support.transition] = transitionValue;
        }
        $(this).css(properties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
        this.offsetWidth; // force a repaint
        run(next);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform');
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transit:transform');
        t.setFromString(prop, value);

        $(elem).css({ 'transit:transform': t });
      }
    };

  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  //     toMS('fast')   //=> '400ms'
  //     toMS(10)       //=> '10ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow for string durations like 'fast'.
    if ($.fx.speeds[i]) { i = $.fx.speeds[i]; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;
})(jQuery);
;/*! JsRender v1.0pre: http://github.com/BorisMoore/jsrender */
/*
* Optimized version of jQuery Templates, for rendering to string.
* Does not require jQuery, or HTML DOM
* Integrates with JsViews (http://github.com/BorisMoore/jsviews)
* Copyright 2012, Boris Moore
* Released under the MIT License.
*/
// informal pre beta commit counter: 22

(function(global, jQuery, undefined) {
	// global is the this object, which is window when running in the usual browser environment.
	"use strict";

	if (jQuery && jQuery.views || global.jsviews) { return; } // JsRender is already loaded

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0pre",

		$, jsvStoreName, rTag, rTmplString,
//TODO	tmplFnsCache = {},
		delimOpenChar0 = "{", delimOpenChar1 = "{", delimCloseChar0 = "}", delimCloseChar1 = "}", linkChar = "^",
		FALSE = false, TRUE = true,

		rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
		//                                     object     helper    view  viewProperty pathTokens      leafToken

		rParams = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,
		//          lftPrn        lftPrn2                 path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot        rtPrn   prn2   space
		// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space

		rNewLine = /\r?\n/g,
		rUnescapeQuotes = /\\(['"])/g,
		// escape quotes and \ character
		rEscapeQuotes = /([\\'"])/g,
		rBuildHash = /\x08(~)?([^\x08]+)\x08/g,
		rTestElseIf = /^if\s/,
		rFirstElem = /<(\w+)[>\s]/,
		rPrevElem = /<(\w+)[^>\/]*>[^>]*$/,
		autoTmplName = 0,
		viewId = 0,
		escapeMapForHtml = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;"
		},
        attrEncodeChars = /[<"'&]/g,
		htmlEncodeChars = /[\x00<>"'&]/g,
		tmplAttr = "data-jsv-tmpl",
		fnDeclStr = "var j=j||" + (jQuery ? "jQuery." : "js") + "views,",
		slice = [].slice,

		$render = {},
		jsvStores = {
			template: {
				compile: compileTmpl
			},
			tag: {
				compile: compileTag
			},
			helper: {},
			converter: {}
		},

		// jsviews object ($.views if jQuery is loaded)
		$views = {
			jsviews: versionNumber,
			render: $render,
			View: View,
			settings: {
				delimiters: $viewsDelimiters,
				debugMode: TRUE
			},
			sub: {
				// subscription, e.g. JsViews integration
				Error: JsViewsError,
				tmplFn: tmplFn,
				parse: parseParams,
				extend: $extend,
				error: error
//TODO			invoke: $invoke
			},
			_cnvt: convertVal,
			_tag: renderTag,

			// TODO provide better debug experience - e.g. support $.views.onError callback
			_err: function(e) {
				// Place a breakpoint here to intercept template rendering errors
				return $viewsSettings.debugMode ? ("Error: " + (e.message || e)) + ". " : '';
			}
		};

		function JsViewsError(message, object) {
			// Error exception type for JsViews/JsRender
			// Override of $.views.sub.Error is possible
			if (object && object.onError) {
				if (object.onError(message) === FALSE) {
					return;
				}
			}
			this.name = "JsRender Error";
			this.message = message || "JsRender error";
		}

		function $extend(target, source) {
			var name;
			target = target || {};
			for (name in source) {
				target[name] = source[name];
			}
			return target;
		}

//TODO		function $invoke() {
//			try {
//				return arguments[1].apply(arguments[0], arguments[2]);
//			}
//			catch(e) {
//				throw new $views.sub.Error(e, arguments[0]);
//			}
//		}

		(JsViewsError.prototype = new Error()).constructor = JsViewsError;

	//========================== Top-level functions ==========================

	//===================
	// jsviews.delimiters
	//===================

	function $viewsDelimiters(openChars, closeChars, link) {
		// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
		// openChars, closeChars: opening and closing strings, each with two characters

		if (!$views.rTag || arguments.length) {
			delimOpenChar0 = openChars ? openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
			delimOpenChar1 = openChars ? openChars.charAt(1) : delimOpenChar1;
			delimCloseChar0 = closeChars ? closeChars.charAt(0) : delimCloseChar0;
			delimCloseChar1 = closeChars ? closeChars.charAt(1) : delimCloseChar1;
			linkChar = link || linkChar;
			openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1;  // Default is "{^{"
			closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
			// Build regex with new delimiters
			//          tag    (followed by / space or })   or cvtr+colon or html or code
			rTag = "(?:(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))"
				+ "\\s*((?:[^\\" + delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

			// make rTag available to JsViews (or other components) for parsing binding expressions
			$views.rTag = rTag + ")";

			rTag = new RegExp(openChars + rTag + "(\\/)?|(?:\\/(\\w+)))" + closeChars, "g");

			// Default:    bind           tag       converter colon html     comment            code      params            slash   closeBlock
			//           /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

			rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
			// rTmplString looks for html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}. Each of these strings are considered NOT to be jQuery selectors
		}
		return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar];
	}

	//=========
	// View.get
	//=========

	function getView(type) {
		// TODO complete/test/provide samples for this
		// If type is undefined, returns root view (view under top view).
		var view = this,
			root = !type || type === "root";
		while (root && view.parent.parent || view && view.type !== type) {
			view = view.parent;
		}
		return view;
	}

	//==========
	// View._hlp
	//==========

	function getHelper(helper) {
		// Helper method called as view._hlp(key) from compiled template, for helper functions or template parameters ~foo
		var wrapped,
			view = this,
			viewCtx = view.ctx ||{},
			tmplHelpers = view.tmpl.helpers || {};

		helper = (
			viewCtx[helper] !== undefined
				? viewCtx
				: tmplHelpers[helper] !== undefined
					? tmplHelpers
					: $helpers[helper] !== undefined
						? $helpers
						: {}
		)[helper];

		if (helper) {
			if (typeof helper === "function") {
				wrapped = function() {
						// If it is of type function, we will wrap it so it gets called with view as 'this' context.
						// If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
						// However note that helper functions on deeper paths will not have access to view and tagCtx.
						// For example, ~util.foo() will have the ~util object as 'this' pointer
						var i,
							args = arguments;

						for (i in args) {
							if (typeof args[i] === "function") {
								args[i] = args[i].call(view.data);
							}
						}
						return helper.apply(view, args);
					};
				wrapped.depends = helper.depends;
			}
		}
		return wrapped || helper;
	}

	//==============
	// jsviews._cnvt
	//==============

	function convertVal(converter, view, self, tagCtx, bindingPaths, text) {
		// self is template object or linkCtx object
		if (converter || bindingPaths) {
			var tmplConverter,
				linkCtx = !self.markup && self,
				tag = {
					tagName:  converter + ":",
					tagCtx: tagCtx
				},
				args = tagCtx.args = slice.call(arguments, 5);

			tagCtx.view = view;
			tagCtx.bind = !!(linkCtx || bindingPaths);

			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
				tagCtx.ctx = extendCtx(tagCtx.ctx, linkCtx.view.ctx);
			}
			tag.ctx = tagCtx.ctx || {};
			delete tagCtx.ctx;

			if (converter) {
				// A call to {{cnvt: ... }} or {^{cnvt: ... }} or data-link="{cnvt: ... }"
				tmplConverter = view.tmpl.converters;
				tmplConverter = tmplConverter && tmplConverter[converter] || $converters[converter];
				if (tmplConverter || error("Unknown converter: {{"+ converter + ":")) {
					text = tmplConverter.apply(tag, args);
				}
			}
			if (bindingPaths) {
				// A call to {^{: ... }} or {^{cnvt: ... }}
				bindingPaths = view.tmpl.bnds[bindingPaths-1];
				linkCtx.paths = bindingPaths;
				// Consider being able to switch off binding if parent view is not currently bound.
				view._.tag = tag; // Provide this tag on view, for markerNode on bound tags, and for getting the tagCtx and linkCtx during rendering.
				// Provide this tag on view, for addMarkerNode on bound tags to add the tag to view._.bnds, associated with the tag id,
				// and so when rendering subsequent {{else}}, will be associated with this tag
				//TODO does this work with nested elses and with {^{foo:...}} which also adds tag to view, for markerNodes.
				text = view._.onRender(text, view, TRUE);
	//Example:  text = '<script type="jsv123"></script>' + text + '<script type="jsv123/"></script>';
			}
		}
		return text;
	}

	//=============
	// jsviews._tag
	//=============

	function renderTag(tagName, parentView, self, content, tagCtx, bind) {
		// Called from within compiled template function, to render a template tag
		// Returns the rendered tag

		var ret, render, ctx, elses, tag, tags,
			tmpl = self.markup && self,
			// self is either a template object (if rendering a tag) or a linkCtx object (if linking using a link tag)
			linkCtx = !tmpl && self,
			parentView_ = parentView._,
			parentTmpl = tmpl || parentView.tmpl,
			tmplTags = parentTmpl.tags,
			childTemplates = parentTmpl.templates,
			tagDef = tmplTags && tmplTags[tagName] || $tags[tagName],
			args = tagCtx.args = arguments.length > 6 ? slice.call(arguments, 6) : [],
			props = tagCtx.props || {};

		tagCtx.view = parentView;
		tagCtx.ctx = extendCtx(tagCtx.ctx, parentView.ctx); // Extend parentView.ctx
		ctx = tagCtx.ctx || {};
		delete tagCtx.ctx;

		if (!tagDef) {
			error("Unknown tag: {{"+ tagName + "}}");
			return "";
		}
		tmpl = props.tmpl;

		// Set the tmpl property to the content of the block tag, unless set as an override property on the tag
		content = content && parentTmpl.tmpls[content - 1];
		tmpl = tmpl || content || tagDef.template || undefined;
		tmpl = "" + tmpl === tmpl // if a string
			? childTemplates && childTemplates[tmpl] || $templates[tmpl] || $templates(tmpl)
			: tmpl;

		if (tagName === "else") {
			tag = parentView._.tag;
			// Switch current tagCtx of tag instance to this {{else ...}}
			elses = tag._elses = tag._elses || [];
			elses.push(tmpl);
			tagCtx.isElse = elses.length;
			render = tag.render;
		}
		if (tagDef.init) {
			// init is the constructor for the tag/control instance

			// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
			tags = ctx.tags = parentView.ctx && extendCtx(ctx.tags, parentView.ctx.tags) || {};

			tag = tag || linkCtx.tag;
			if (tag) {
				// tag has already been instantiated, so keep it, but attach the current context, which may have changed
				// Add tag to tags hash
				tags[tagName] = tag;
			} else {
				// If the tag has not already been instantiated, we will create a new instance and add to the tags hash,
				// so ~tags.tagName will access the tag, even within the rendering of the template content of this tag
//	TODO provide error handling owned by the tag - using tag.onError
//			try {
					tag = tags[tagName] = new tagDef.init(tagCtx, linkCtx, ctx);
//				}
//				catch(e) {
//					tagDef.onError(e);
//				}
				tag.tmpl = tmpl;

				if (linkCtx) {
					tag.attr =
						// Setting attr on tag so renderContent knows whether to include script node markers.
						linkCtx.attr =
							// Setting attr on self to ensure outputting to the correct target attribute.
							linkCtx.attr || tagDef.attr || "";
				}
			}
			ctx.tag = tag;
		} else {
			// This is a simple tag declared as a function. We won't instantiate a specific tag constructor - just a standard instance object.
			tag = tag || {
				// tag instance object if no init constructor
				render: tagDef.render,
				renderContent: renderContent,
				tmpl: tmpl,
				tagName: tagName
			};
		}

		// Provide tagCtx, linkCtx and ctx access from tag
		tag.tagCtx = tagCtx;
		tag.ctx = ctx;
		if (linkCtx) {
			linkCtx.tag = tag;
			tag.linkCtx = linkCtx;
		}

		tag._is = "tag";
		tag._done = tagCtx.isElse ? tag._done : FALSE; // If not an {{else}} this is a new
		tmpl = tmpl || tag.tmpl;
		elses = tag._elses;

//TODO The above works for initial rendering, but when refreshing {^{foo}} need also to associate with {{else}} tags. Use compilation to bind else content templates and expressions with the primary tag template and expression.

		parentView_.tag = tag;
		// Provide this tag on view, for addMarkerNode on bound tags to add the tag to view._.bnds, associated with the tag id,
		// for getting the tagCtx and linkCtx during rendering, and so when rendering subsequent {{else}}, will be associated with this tag
		//TODO does this work with nested elses and with {^{foo:...}} which also adds tag to view, for markerNodes.

//		while (tmpl) {
			// If tagDef has a 'render' function, call it.
			// If the return result is undefined, return "", or, if a template (or content) is provided,
			// return the rendered template(using the current data or the first parameter as data);
			if (render = render || tag.render) {
				ret = render.apply(tag, args);

//	TODO		ret = $invoke(tag, render, args);
			}
			ret = ret !== undefined
				? ret    // Return result of render function unless it is undefined, in which case return rendered template
				: tmpl
					// render template on args[0] if defined, or otherwise on the current data item
					? tag.renderContent(tagCtx.data !== undefined ? tagCtx.data : parentView.data, undefined, parentView)
					: ""; // No return value from render, and no template defined, so return ::

//			tmpl = (tag !== "else" && elses) ? (tagCtx.isElse = tagCtx.isElse || 0, elses[tagCtx.isElse++]) : undefined;
//}

		// If bind, for {^{tag ... }}, insert script marker nodes
		return bind ? parentView_.onRender(ret, parentView, bind) : ret;
	}

	//=================
	// View constructor
	//=================

	function View(context, type, parentView, data, template, key, onRender) {
		// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
		var views, parentView_,
			isArray = type === "array",
			self_ = {
				key: 0,
				useKey: isArray ? 0 : 1,
				id: "" + viewId++,
				onRender: onRender,
				bnd: {}
			},
			self = {
				data: data,
				tmpl: template,
				views: isArray ? [] : {},
				parent: parentView,
				ctx: context,
				type: type,
				// If the data is an array, this is an 'array view' with a views array for each child 'item view'
				// If the data is not an array, this is an 'item view' with a views 'map' object for any child nested views
				// _useKey is non zero if is not an 'array view' (owning a data array). Uuse this as next key for adding to child views map
				get: getView,
				_hlp: getHelper,
				_: self_
		};

		if (parentView) {
			views = parentView.views;
			parentView_ = parentView._;
			if (parentView_.useKey) {
				// Parent is an 'item view'. Add this view to its views object
				// self._key = is the key in the parent view map
				views[self_.key = "_" + parentView_.useKey++] = self;
			} else {
				// Parent is an 'array view'. Add this view to its views array
				views.splice(
					// self._.key = self.index - the index in the parent view array
					self_.key = self.index =
						key !== undefined
							? key
							: views.length,
				0, self);
			}
			// If no context was passed in, use parent context
			// If context was passed in, it should have been merged already with parent context
			self.ctx = context || parentView.ctx;
		}
		return self;
	}

	//=============
	// Registration
	//=============

	function compileChildResources(parentTmpl) {
		var storeName, resources, resourceName, settings, compile;
		for (storeName in jsvStores) {
			settings = jsvStores[storeName];
			if ((compile = settings.compile) && (resources = parentTmpl[storeName + "s"])) {
				for (resourceName in resources) {
					// compile child resource declarations (templates, tags, converters or helpers)
					resources[resourceName] = compile(resourceName, resources[resourceName], parentTmpl, storeName, settings);
				}
			}
		}
	}

	function compileTag(name, item, parentTmpl) {
		var init, tmpl;
		if (typeof item === "function") {
			// Simple tag declared as function. No presenter instantation.
			item = {
				tagName: name,
				render: item,
				depends: item.depends
			};
		} else {
			// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
			item.tagName = name;
			if (tmpl = item.template) {
				item.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
			}
			if (item.init !== FALSE) {
				init = item.init = item.init || function(tagCtx) {};
				init.prototype = item;
				(init.prototype = item).constructor = init;
			}
		}
		item.renderContent = renderContent;
		item.attr = "html";
		if (parentTmpl) {
			item._parentTmpl = parentTmpl;
		}
//TODO	item.onError = function(e) {
//			var error;
//			if (error = this.prototype.onError) {
//				error.call(this, e);
//			} else {
//				throw e;
//			}
//		}
		return item;
	}

	function compileTmpl(name, tmpl, parentTmpl, storeName, storeSettings, options) {
		// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

		//==== nested functions ====
		function tmplOrMarkupFromStr(value) {
			// If value is of type string - treat as selector, or name of compiled template
			// Return the template object, if already compiled, or the markup string

			if (("" + value === value) || value.nodeType > 0) {
				try {
					elem = value.nodeType > 0
					? value
					: !rTmplString.test(value)
					// If value is a string and does not contain HTML or tag content, then test as selector
						&& jQuery && jQuery(value)[0];
					// If selector is valid and returns at least one element, get first element
					// If invalid, jQuery will throw. We will stay with the original string.
				} catch (e) { }

				if (elem) {
					// Generally this is a script element.
					// However we allow it to be any element, so you can for example take the content of a div,
					// use it as a template, and replace it by the same content rendered against data.
					// e.g. for linking the content of a div to a container, and using the initial content as template:
					// $.link("#content", model, {tmpl: "#content"});

					// Create a name for compiled template if none provided
					value = $templates[elem.getAttribute(tmplAttr)];
					if (!value) {
						// Not already compiled and cached, so compile and cache the name
						name = name || "_" + autoTmplName++;
						elem.setAttribute(tmplAttr, name);
						$templates[name] = value = compileTmpl(name, elem.innerHTML, parentTmpl, storeName, storeSettings, options); // Use tmpl as options
					}
				}
				return value;
			}
			// If value is not a string, return undefined
		}

		var tmplOrMarkup, elem;

		//==== Compile the template ====
		tmpl = tmpl || "";
		tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

		// If options, then this was already compiled from a (script) element template declaration.
		// If not, then if tmpl is a template object, use it for options
		options = options || (tmpl.markup ? tmpl : {});
		options.tmplName = name;
		if (parentTmpl) {
			options._parentTmpl = parentTmpl;
		}
		// If tmpl is not a markup string or a selector string, then it must be a template object
		// In that case, get it from the markup property of the object
		if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
			if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
				// if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
				tmplOrMarkup = tmplOrMarkup.markup;
			}
		}
		if (tmplOrMarkup !== undefined) {
			if (name && !parentTmpl) {
				$render[name] = function() {
					return tmpl.render.apply(tmpl, arguments);
				};
			}
			if (tmplOrMarkup.fn || tmpl.fn) {
				// tmpl is already compiled, so use it, or if different name is provided, clone it
				if (tmplOrMarkup.fn) {
					if (name && name !== tmplOrMarkup.name) {
						tmpl = extendCtx(options, tmplOrMarkup);
					} else {
						tmpl = tmplOrMarkup;
					}
				}
			} else {
				// tmplOrMarkup is a markup string, not a compiled template
				// Create template object
				tmpl = TmplObject(tmplOrMarkup, options);
				// Compile to AST and then to compiled function
				tmplFn(tmplOrMarkup, tmpl);
			}
			compileChildResources(options);
			return tmpl;
		}
	}
	//==== /end of function compile ====

	function TmplObject(markup, options) {
		// Template object constructor
		var htmlTag,
			wrapMap = $viewsSettings.wrapMap || {},
			tmpl = $extend(
				{
					markup: markup,
					tmpls: [],
					links: {},
					bnds: [],
					render: renderContent
				},
				options
			);

		if (!options.htmlTag) {
			// Set tmpl.tag to the top-level HTML tag used in the template, if any...
			htmlTag = rFirstElem.exec(markup);
			tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
		}
		htmlTag = wrapMap[tmpl.htmlTag];
		if (htmlTag && htmlTag !== wrapMap.div) {
			// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
			tmpl.markup = $.trim(tmpl.markup);
			tmpl._elCnt = TRUE; // element content model (no rendered text nodes), not phrasing content model
		}

		return tmpl;
	}

	function registerStore(storeName, storeSettings) {

		function theStore(name, item, parentTmpl) {
			// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

			// For store of name 'thing', Call as:
			//    $.views.things(items[, parentTmpl]),
			// or $.views.things(name, item[, parentTmpl])

			var onStore, compile, items, itemName, childTemplates, childTemplate, thisStore, childStoreName;

			if (name && "" + name !== name && !name.nodeType && !name.markup) {
				// Call to $.views.things(items[, parentTmpl]),

				// Adding items to the store
				// If name is a map, then item is parentTmpl. Iterate over map and call store for key.
				for (itemName in name) {
					theStore(itemName, name[itemName], item);
				}
				return $views;
			}
			thisStore = parentTmpl ? parentTmpl[storeNames] = parentTmpl[storeNames] || {} : theStore;

			// Adding a single unnamed item to the store
			if (item === undefined) {
				item = name;
				name = undefined;
			}
			compile = storeSettings.compile;
			if (onStore = $viewsSub.onBeforeStoreItem) {
				// e.g. provide an external compiler or preprocess the item.
				compile = onStore(thisStore, name, item, compile) || compile;
			}
			if (!name) {
				item = compile(undefined, item);
			} else if ("" + name === name) { // name must be a string
				if (item === null) {
					// If item is null, delete this entry
					delete thisStore[name];
				} else {
					thisStore[name] = compile ? (item = compile(name, item, parentTmpl, storeName, storeSettings)) : item;
					if (storeName === "template" && (childTemplates = thisStore[name].templates)) {
						// This is a template which has child templates defined. We will copy child items of parent template to each
						// child template, since items registered with the parent templates must also be accessible from the child template
						for (childStoreName in jsvStores) {
							// Find child items registered for this parent template
							childStoreName += "s";
							if (items = item[childStoreName]) {
								// Copy these items to each child template
								for (childTemplate in childTemplates ) {
									childTemplate = childTemplates[childTemplate];
									// Copy parent items except if overridden by item of same name in child template
									childTemplate[childStoreName] = extendCtx(childTemplate[childStoreName], items);
								}
							}
						}
					}
				}
			}
			if (item) {
				item._is = storeName;
			}
			if (onStore = $viewsSub.onStoreItem) {
				// e.g. JsViews integration
				onStore(thisStore, name, item, compile);
			}
			return item;
		}

		var storeNames = storeName + "s";

		$views[storeNames] = theStore;
		jsvStores[storeName] = storeSettings;
	}

	//==============
	// renderContent
	//==============

	function renderContent(data, context, parentView, key, isLayout, onRender) {
		// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
		// If the data is the parent view, treat as layout template, re-render with the same data context.
		var i, l, dataItem, newView, childView, itemResult, parentContext, props, swapContent, tagCtx, isTag, outerOnRender,
			self = this,
			tmpl = self,
			allowDataLink = self.attr === undefined || self.attr === "html",
			result = "";

		if (key === TRUE) {
			swapContent = TRUE;
			key = 0;
		}
		if (isTag = self._is === "tag") {
			tagCtx = self.tagCtx;
			// This is a call from renderTag
			tmpl = tagCtx.isElse ? self._elses[tagCtx.isElse-1] : self.tmpl;
			context = extendCtx(context, self.ctx);
			props = tagCtx.props || {};
			if ( props.link === FALSE ) {
				// link=false setting on block tag
				// We will override inherited value of link by the explicit setting link=false taken from props
				// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
				context =  context || {};
				context.link = FALSE;
			}
			parentView = parentView || tagCtx.view;
		} else {
			tmpl = self.jquery && (self[0] || error('Unknown template: "' + self.selector + '"')) // This is a call from $(selector).render
				|| self;
		}
		if (tmpl) {
			if (parentView) {
				onRender = onRender || parentView._.onRender;
				parentContext = parentView.ctx;
				if (data === parentView) {
					// Inherit the data from the parent view.
					// This may be the contents of an {{if}} block
					// Set isLayout = true so we don't iterate the if block if the data is an array.
					data = parentView.data;
					isLayout = TRUE;
				}
			}

			// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
			// Note: If no jQuery, $extend does not support chained copies - so limit extend() to two parameters
			context = extendCtx(context, parentContext);

			if (!tmpl.fn) {
				tmpl = $templates[tmpl] || $templates(tmpl);
			}

			if (tmpl) {
				onRender = (context && context.link) !== FALSE && allowDataLink && onRender;
				// If link===false, do not call onRender, so no data-linking marker nodes
				outerOnRender = onRender;
				if (onRender === TRUE) {
					// Used by view.refresh(). Don't create a new wrapper view.
					outerOnRender = undefined;
					onRender = parentView._.onRender;
				}
				if ($.isArray(data) && !isLayout) {
					// Create a view for the array, whose child views correspond to each data item.
					// (Note: if key and parentView are passed in along with parent view, treat as
					// insert -e.g. from view.addViews - so parentView is already the view item for array)
					newView = swapContent ? parentView : (key !== undefined && parentView) || View(context, "array", parentView, data, tmpl, key, onRender);
					for (i = 0, l = data.length; i < l; i++) {
						// Create a view for each data item.
						dataItem = data[i];
						childView = View(context, "item", newView, dataItem, tmpl, (key || 0) + i, onRender);
						itemResult = tmpl.fn(dataItem, childView, $views);
						result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
					}
				} else {
					// Create a view for singleton data object.
					newView = swapContent ? parentView : View(context, "data", parentView, data, tmpl, key, onRender);
					result += tmpl.fn(data, newView, $views);
				}
				return outerOnRender ? outerOnRender(result, newView) : result;
			}
		}
		return "";
	}

	//===========================
	// Build and compile template
	//===========================

	// Generate a reusable function that will serve to render a template against data
	// (Compile AST then build template function)

	function error(message) {
		if ($viewsSettings.debugMode) {
			throw new $views.sub.Error(message);
		}
	}

	function syntaxError(message) {
		error("Syntax error\n" + message);
	}

	function tmplFn(markup, tmpl, isLinkExpression) {
		// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
		// Used for compiling templates, and also by JsViews to build functions for data link expressions


		//==== nested functions ====
		function pushprecedingContent(shift) {
			shift -= loc;
			if (shift) {
				content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
			}
		}

		function blockTagCheck(tagName) {
			tagName && syntaxError('Unmatched or missing tag: "{{/' + tagName + '}}" in template:\n' + markup);
		}

		function parseTag(all, bind, tagName, converter, colon, html, comment, codeTag, params, slash, closeBlock, index) {

			//    bind         tag        converter colon html     comment            code      params            slash   closeBlock
			// /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

			// Build abstract syntax tree (AST): [ tagName, converter, params, content, hash, bindings, contentMarkup ]
			if (html) {
				colon = ":";
				converter = "html";
			}
			var current0,
				pathBindings = [],
				code = "",
				hash = "",
				passedCtx = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
				block = !slash && !colon && !comment && !isLinkExpression;

			//==== nested helper function ====
			tagName = tagName || colon;
			pushprecedingContent(index);
			loc = index + all.length; // location marker - parsed up to here
			if (codeTag) {
				if (allowCode) {
					content.push(["*", "\n" + params.replace(rUnescapeQuotes, "$1") + "\n"]);
				}
			} else if (tagName) {
				if (tagName === "else") {
					if (rTestElseIf.test(params)) {
						syntaxError('for "{{else if expr}}" use "{{else expr}}"');
					}
					current[6] = markup.substring(current[6], index); // contentMarkup for block tag
					current = stack.pop();
					content = current[3];
					block = TRUE;
				}
				if (params) {
					code = parseParams(params, pathBindings)
						.replace(rBuildHash, function(all, isCtx, keyValue) {
							if (isCtx) {
								passedCtx += keyValue + ",";
							} else {
								hash += keyValue + ",";
							}
							return "";
						});
				}
				hash = hash.slice(0, -1);
				code = code.slice(0, -1);
				newNode = [
						tagName,
						converter || "",
						code,
						block && [],
						"{" + (hash ? ("props:{" + hash + "},") : "") + 'params:"' + params + '"' + (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : "") + "},",
						bind && pathBindings || 0
					];
				content.push(newNode);
				if (block) {
					stack.push(current);
					current = newNode;
					current[6] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				}
			} else if (closeBlock) {
				current0 = current[0];
				blockTagCheck(closeBlock !== current0 && current0 && current0 !== "else");
				current[6] = markup.substring(current[6], index); // contentMarkup for block tag
				current = stack.pop();
			}
			blockTagCheck(!current && closeBlock);
			content = current[3];
		}
		//==== /end of nested functions ====

		var newNode,
			allowCode = tmpl && tmpl.allowCode,
			astTop = [],
			loc = 0,
			stack = [],
			content = astTop,
			current = [, , , astTop];

		markup = markup.replace(rEscapeQuotes, "\\$1");

//TODO	result = tmplFnsCache[markup];  // Only cache if template is not named and markup length < ..., and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;

		blockTagCheck(stack[0] && stack[0][3].pop()[0]);

		// Build the AST (abstract syntax tree) under astTop
		markup.replace(rTag, parseTag);

		pushprecedingContent(markup.length);

		if (loc = astTop[astTop.length-1]) {
			blockTagCheck("" + loc !== loc && (+loc[6] === loc[6]) && loc[0]);
		}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}
		return buildCode(astTop, tmpl);
	}

	function buildCode(ast, tmpl) {
		// Build the template function code from the AST nodes, and set as property on the passed-in template object
		// Used for compiling templates, and also by JsViews to build functions for data link expressions
		var i, node, hasTag, hasEncoder, getsValue, hasConverter, hasViewPath, tagName, converter, params, hash, bindings, bindingPaths, nestedTmpls, nestedTmpl, allowCode, content, markup,
			code = "",
			tmplOptions = {},
			l = ast.length;

		if (tmpl) {
			if (allowCode = tmpl.allowCode) {
				tmplOptions.allowCode = TRUE;
			}
			if (tmpl.debug) {
				tmplOptions.debug = TRUE;
			}
			bindings = tmpl.bnds;
			nestedTmpls = tmpl.tmpls;
		}

		for (i = 0; i < l; i++) {
			// AST nodes: [ tagName, converter, params, content, hash, bindings, contentMarkup, link ]
			node = ast[i];

			// Add newline for each callout to t() c() etc. and each markup string
			//TODO consider changing to ret += t()...; so debug break points can be inserted on each callout.
			code += "\nret+=";
			if ("" + node === node) {
				// a markup string to be inserted
				code += '"' + node + '";';
			} else {
				// a compiled tag expression to be inserted
				tagName = node[0];
				if (tagName === "*") {
					// If this {{* }} tag is at the beginning of the template, start with var ret="";
					// Otherwise remove the last "+\n" characters and replace with ";" to complete the ret += ...; statement, prior to inserted user code,
					code = (i ? code.slice(0, -5) : "") + node[1];
				} else {
					converter = node[1];
					params = node[2];
					content = node[3];
					hash = node[4];
					bindingPaths = node[5];
					markup = node[6];

					if (content) {
						// Create template object for nested template
						nestedTmpl = TmplObject(markup, tmplOptions);
						// Compile to AST and then to compiled function
						buildCode(content, nestedTmpl);
						nestedTmpls.push(nestedTmpl);
					}
					if (bindingPaths) {
						// Add leaf binding paths to template
						bindings.push(bindingPaths);
						bindingPaths = bindings.length;
					}
					hasViewPath = hasViewPath || hash.indexOf("view") > -1;
					// Add newline for each callout to t() c() etc.

					//TODO consider changing to ret += t()...; so debug break points can be inserted on each callout. At the same time, pass in ret to c() and t()
					// so they can look at the previous ret, and detect whether this is a jsrender tag within an HTML element tag. If so, don't insert marker nodes,
					// and make the databinding trigger view refresh on parent view... No need for people to set link=false.
					code += tagName === ":"
					? (converter === "html" && !bindingPaths
						? (hasEncoder = TRUE, "h(" + params+ ");")
						: converter || bindingPaths // Call _cnvt if there is a converter, or binding: {{cnvt: ... }}, {^{: ... }} or {^{cnvt: ... }}
							? (hasConverter = TRUE, 'c("' + converter + '",view,this,' + hash + bindingPaths + "," + params + ");")
							: (getsValue = TRUE, "(v=" + params + ')!=u?v:"";')
					)
					: (hasTag = TRUE, 't("' + tagName + '",view,this,'
						+ (content ? nestedTmpls.length : '""') // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ "," + hash + bindingPaths + (params ? "," : "") + params) + ");";
				}
			}
		}

		// Include only the var references that are needed in the code
		code = fnDeclStr
		+ (getsValue ? "v," : "")
		+ (hasTag ? "t=j._tag," : "")
		+ (hasConverter ? "c=j._cnvt," : "")
		+ (hasEncoder ? "h=j.converters.html," : "")
		+ 'ret=""; try{\n'
		+ (tmplOptions.debug ? "debugger;" : "")
		+ code + "\nreturn ret;\n\n}catch(e){return j._err(e);}";

		try {
			code = new Function("data, view, j, u", code);
		} catch (e) {
			syntaxError("Compiled template code:\n\n" + code, e);
		}

		if (tmpl) {
			tmpl.fn = code;
		}
		return code;
	}

	function parseParams(params, bindings) {

		function parseTokens(all, lftPrn0, lftPrn, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, prn2, space) {
			// rParams = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$^.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$^.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)
			//          lftPrn0-flwed by (- lftPrn               path    operator err                                                eq         path2       prn    comma   lftPrn3   apos quot        rtPrn   prn2   space
			// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
			operator = operator || "";
			lftPrn = lftPrn || lftPrn0 || lftPrn2;
			path = path || path2;
			prn = prn || prn2 || "";

			function parsePath(all, object, helper, view, viewProperty, pathTokens, leafToken) {
				// rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
				//                                        object   helper    view  viewProperty pathTokens       leafToken

				if (object) {
					bindings.push(path);
					if (object !== ".") {
						var leaf,
							ret = (helper
								? 'view._hlp("' + helper + '")'
								: view
									? "view"
									: "data")
							+ (leafToken
								? (viewProperty
									? "." + viewProperty
									: helper
										? ""
										: (view ? "" : "." + object)
									) + (pathTokens || "")
								: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

						leaf = (leafToken ? "." + leafToken : "");
						ret = ret + leaf;
						ret = ret.slice(0, 9) === "view.data"
						? ret.slice(5) // convert #view.data... to data...
						: ret;
						return ret;
					}
				}
				return all;
			}

			if (err) {
				syntaxError(params);
			} else {
				return (aposed
					// within single-quoted string
					? (aposed = !apos, (aposed ? all : '"'))
					: quoted
					// within double-quoted string
						? (quoted = !quot, (quoted ? all : '"'))
						:
					(
						(lftPrn
								? (parenDepth++, lftPrn)
								: "")
						+ (space
							? (parenDepth
								? ""
								: named
									? (named = FALSE, "\b")
									: ","
							)
							: eq
					// named param
								? (parenDepth && syntaxError(params), named = TRUE, '\b' + path + ':')
								: path
					// path
									? (path.split("^").join(".").replace(rPath, parsePath)
										+ (prn
											? (fnCall[++parenDepth] = TRUE, prn)
											: operator)
									)
									: operator
										? operator
										: rtPrn
					// function
											? ((fnCall[parenDepth--] = FALSE, rtPrn)
												+ (prn
													? (fnCall[++parenDepth] = TRUE, prn)
													: "")
											)
											: comma
												? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
												: lftPrn0
													? ""
													: (aposed = apos, quoted = quot, '"')
					))
				);
			}
		}
		var named,
			fnCall = {},
			parenDepth = 0,
			quoted = FALSE, // boolean for string content in double quotes
			aposed = FALSE; // or in single quotes

		bindings.expr = params.replace(rUnescapeQuotes, "$1");
		return (params + " ").replace(rParams, parseTokens);
	}

	//==========
	// Utilities
	//==========

	// HTML encoding helper
	function replacerForHtml(ch) {
		// Original code from Mike Samuel <msamuel@google.com>
		return escapeMapForHtml[ch]
			// Intentional assignment that caches the result of encoding ch.
			|| (escapeMapForHtml[ch] = "&#" + ch.charCodeAt(0) + ";");
	}

	// Merge objects, in particular contexts which inherit from parent contexts
	function extendCtx(context, parentContext) {
		// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
		// If neither context nor parentContext are undefined, return undefined
		return context && context !== parentContext
			? (parentContext
				? $extend($extend({}, parentContext), context)
				: context)
			: parentContext && $extend({}, parentContext);
	}

	//========================== Initialize ==========================

	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	var $templates = $views.templates,
		$converters = $views.converters,
		$helpers = $views.helpers,
		$tags = $views.tags,
		$viewsSub = $views.sub,
		$viewsSettings = $views.settings;

	if (jQuery) {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is loaded, so make $ the jQuery object
		$ = jQuery;
		$.render = $render;
		$.views = $views;
		$.templates = $templates = $views.templates;
		$.fn.render = renderContent;

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = global.jsviews = $views;

		$.isArray = Array && Array.isArray || function(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};
	}

	//========================== Register tags ==========================

	$tags({
		"if": function(val) {
			var self = this;
				// If not done and val is truey, set done=true on tag instance and render content. Otherwise return ""
				// On else will call this function again on the same tag instance.
			return (self._done || arguments.length && !val)
				? ""
				: (self._done = true,
					// Test is satisfied, so render content on current context. Rather than return undefined
					// (which will render the tmpl/content on the current context but will iterate if it is an array),
					// we pass in the view. This ensures treating as a layout template - with no iteration
					self.renderContent(self.tagCtx.view));
		},
// Temporary fix for binding to {{if}}
//	"if": {
//		render: function(val) {
//			var self = this;
//			return (self._done || arguments.length && !val) ? "" : (self._done = true, self.renderContent(self.tagCtx.view));
//		}
//	},
		"else": function() {}, // Does nothing but ensures {{else}} tags are recognized as valid
		"for": function() {
			var i, arg, undef,
				self = this,
				tagCtx = self.tagCtx,
				result = "",
				args = arguments,
				done = 0,
				l = args.length;

			if (!l) {
				return tagCtx.done
					? ""
					: (tagCtx.done = TRUE,
						// Test is satisfied, so render content on current context. Rather than return undefined
						// (which will render the tmpl/content on the current context but will iterate if it is an array),
						// we pass in the view. This ensures treating as a layout template - with no iteration
						self.renderContent(tagCtx.view));
			}
			for (i = 0; i < l; i++) {
				arg = args[i];
				undef = arg === undefined;
				if (!undef) {
					done += $.isArray(arg) ? arg.length : 1;
					result += self.renderContent(arg);
				} else {
					return "";
				}
			}
			tagCtx.done = done;
			return result;
		},
		"*": function(value) {
			return value;
		}
	});

	//========================== Register global helpers ==========================

	//	$helpers({ // Global helper functions
	//		// TODO add any useful built-in helper functions
	//	});

	//========================== Register converters ==========================

	$converters({
		html: function(text) {
			// HTML encoding helper: Replace < > & and ' and " by corresponding entities.
			return text != undefined ? String(text).replace(htmlEncodeChars, replacerForHtml) : "";
		},
		attr: function(text) {
			// Attribute encoding helper: Replace < & ' and " by corresponding entities.
			return text != undefined ? String(text).replace(attrEncodeChars, replacerForHtml) : "";
		},
		url: function(text) {
			// TODO - support chaining {{attr|url:....}} to protect against injection attacks from url parameters containing " or '.
			// URL encoding helper.
			return text != undefined ? encodeURI(String(text)) : "";
		}
	});

	//========================== Define default delimiters ==========================
	$viewsDelimiters();

})(this, this.jQuery);
;require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Base = require("basejs")
var url = require("url")

var BasicLayer = require("./BasicLayer")
var SoftwareKeyboard = require("./SoftwareKeyboard")

/**
 * ## Generic class for all pages.
 */
var BasePage = BasicLayer.extend({
    constructor: function(Wow, options) {
        this.base(Wow, options)
        this.overlays = []
        this.overlayGroup = document.getElementById("overlaygroup")
    },
    showSoftwareKeybard: function(onEntered) {
        var sk = new SoftwareKeyboard(this.wow)
        var self = this
        sk.onClosed = function() {
            self.removeOverlay(sk)
        }
        sk.onTextEntered = function(txt) {
            self.removeOverlay(sk)
            if (onEntered) onEntered(txt)
        }
        this.addOverlay(sk)
    },
    parseUrl: function(myUrl) {
        return url.parse(myUrl, true)
    },
    formatUrl: function(q) {
        return url.format(q)
    },
    updateBrowserQuery: function(changes) {
        var parsedUrl = url.parse(window.location.href, true)
        for (key in changes) {
            parsedUrl.query[key] = changes[key]
        }
        parsedUrl.search = null
        window.History.replaceState({}, "", url.format(parsedUrl))
    },
    getQueryString: function(dpage) {
        var parsedUrl = url.parse(window.location.href, true)
        var pg = parseInt(parsedUrl.query.page || 1)
        if (dpage) pg += dpage
        if (pg < 1) pg = 1
        parsedUrl.query.page = pg
        parsedUrl.search = null
        return url.format(parsedUrl)
    },
    goTo: function(url) {
        window.location.href = url
    },
    goBack: function() {
        window.history.go(-1)
    },
    goToPreviousPage: function() {
        this.goTo(this.getQueryString(-1))
    },
    goToNextPage: function() {
        this.goTo(this.getQueryString(1))
    },
    // TODO take lang info from this page's query string
    // or i18n object
    goToImportPage: function(name) {
        this.goTo("/plugins/app?importname=" + name + "&lang=de")
    },
    goToGameAppPage: function(name) {
        this.goTo("/plugins/game?importname=" + name + "&lang=de")
    },
    goToRuleGamePage: function(name) {
        this.goTo("/plugins/rulegame?importname=" + name + "&lang=de")
    },
    goToAppPage: function(name, apptype) {
        var targetName = name
        var targetApptype = apptype
        if (targetName) {
            if (targetApptype == "wow/app/game") {
                this.goToGameAppPage(targetName)
            } else if (targetApptype == "wow/app/rulegame") {
                this.goToRuleGamePage(targetName)
            } else {
                this.goToImportPage(targetName)
            }
        }
    },
    goToHomePage: function() {
        this.goTo("/plugins/homepage")
    },
    goToVideoPage: function(ytId) {
        this.goTo("/plugins/youtubevideo?id=" + ytId)
    },
    handleEvent: function(evt) {
        for (var i = this.overlays.length - 1; i >= 0; i--) {
            if (!this.overlays[i].transparent && this.overlays[i].visible) {
                this.overlays[i].handleEvent(evt)
                return
            }
        }
        this.base(evt)
    },
    // overlays should not be reused...
    addOverlay: function(o) {
        this.overlays.push(o)
        $(o.paperElement()).appendTo($(this.overlayGroup))
        o.show()
    },
    // overlays should not be reused...
    removeOverlay: function(o) {
        o.hide()
        $(o.paperElement()).detach()
        var idx = this.overlays.indexOf(o)
        if (idx != -1) {
            this.overlays.splice(idx, 1)
        }
    },
    removeOverlays: function() {
        $(this.overlayGroup).empty()
        this.overlays = []
    }

})

module.exports = BasePage

},{"./BasicLayer":2,"./SoftwareKeyboard":5,"basejs":6,"url":14}],2:[function(require,module,exports){
var Base = require("basejs")

var BasicLayer = Base.extend({
    constructor: function(Wow, options) {
        this.options = options || {}
        this.wow = Wow
        this.wtr = Wow.Widgetizer
        this.SVG = this.wtr.SVGDoc
        var klass = "wow-overlay"
        if (this.options.cssClass) klass += " " + this.options.cssClass
        this.paper = this.SVG.group().attr("class", klass)
    },
    paperElement: function() {
        return this.paper.node;
    },
    getWidget: function(name) {
        if (typeof name == "string") {
            return this.wtr.get(name)
        } else {
            var el = $(name)
            if (el.data("wow") && el.attr("id")) {
                return this.wtr.get("#" + el.attr("id"))
            } else {
                return null // DOM element is not a widget
            }
        }
    },
    handleEvent: function(evt) {
        switch (evt.device) {
            case "virtual":
                this.onVirtualControl(evt)
                break
            case "keyboard":
                this.onKeyboard(evt)
                break
            case "gamepad":
                this.onGamepad(evt)
                break
            case "mouse":
                this.onMouse(evt)
                break
            default:
                this.onEvent(evt)
        }
    },
    onVirtualControl: function(evt) {
        // handle virtual controller...
        //console.log(evt)
    },
    onEvent: function(evt) {
        // handler for other devices...
        //console.log(evt)
    },
    onKeyboard: function(evt) {
        // handler for keyboard
        //console.log(evt)
    },
    onGamepad: function(evt) {
        // handler for keyboard
        //console.log(evt)
    },
    onMouse: function(evt) {
        // handler for mouse
        //console.log(evt)
    }
})

module.exports = BasicLayer

},{"basejs":6}],3:[function(require,module,exports){
var BasicLayer = require("./BasicLayer")

var Overlay = BasicLayer.extend({
    constructor: function(Wow, options) {
        this.base(Wow, options)
        // set this to true if you wish to pass events through
        this.transparent = this.options.transparent
        if (!this.transparent) {
            this.paper.rect(960, 600).attr("class", "wow-overlay-background")
        } else {
            this.paper.attr("class", this.paper.attr("class") + " transparent")
        }
        this.hide()
    },
    init: function(data, next) {
        this.base(data, next)
    },
    show: function() {
        this.setVisible(true)
    },
    hide: function() {
        this.setVisible(false)
    },
    setVisible: function(flag) {
        this.visible = flag
        if (flag) this.paper.show();
        else this.paper.hide()
    }
})

module.exports = Overlay

},{"./BasicLayer":2}],4:[function(require,module,exports){
var Base = require("basejs")

var SelectChain = Base.extend({
    /* widgets: an array of DOM/jQuery elements representing widgets */
    constructor: function(widgets, currentIndex) {
        this.widgets = [];
        if (widgets) {
            for (var i = 0; i < widgets.length; i++) this.append(widgets[i])
        }
        this.currentIndex = currentIndex || 0
        this.update()
    },
    copy: function() {
        return new SelectChain(this.widgets, this.currentIndex)
    },
    append: function(el) {
        this.widgets.push(el)
        return this
    },
    clear: function() {
        this.unselect()
        this.currentIndex = 0
        this.widgets = []
    },
    /* select either by index or by element */
    select: function(index) {
        if (typeof index == "number") {
            this.currentIndex = index
        } else {
            var i = this.widgets.length - 1
            while (i >= 0) {
                if (this.widgets[i] == index) break
                i--
            }
            this.currentIndex = i
        }
        this.update()
        return this
    },
    selectPrevious: function() {
        if (this.currentIndex >= 0) {
            this.currentIndex =
                this.widgets.length ? ((this.currentIndex + this.widgets.length - 1) % this.widgets.length) : 0
            this.update()
        }
        return this
    },
    selectNext: function() {
        if (this.currentIndex >= 0) {
            this.currentIndex =
                this.widgets.length > 0 ? ((this.currentIndex + 1) % this.widgets.length) : 0
            this.update()
        }
        return this
    },
    unselect: function() {
        this.currentIndex = -1
        this.update()
        return this
    },
    show: function() {
        this.update()
        this.hidden = false
    },
    hide: function() {
        for (var i = 0; i < this.widgets.length; i++) {
            var el = this.widgets[i]
            $(el).removeClass("glow2")
        }
        this.hidden = true
        return this
    },
    update: function() {
        for (var i = 0; i < this.widgets.length; i++) {
            var el = this.widgets[i]
            if (i == this.currentIndex) {
                $(el).addClass("glow2")
            } else {
                $(el).removeClass("glow2")
            }
        }
        return this
    },
    current: function() {
        return (this.widgets.length && !this.hidden) ? this.widgets[this.currentIndex] : null
    }
})

module.exports = SelectChain

},{"basejs":6}],5:[function(require,module,exports){
var Overlay = require("./Overlay")
var _ = require("underscore")
var SelectChain = require("./SelectChain")


var SoftwareKeyboard = Overlay.extend({
    constructor: function(Wow, options) {
        options = options || {}
        options.cssClass = "softwarekeyboard"
        options.transparent = false
        this.base(Wow, options)

        this.size = 60
        this.gap = 5
        this.selectChain = new SelectChain()
        this.useLayout("DeutschColor")
    },
    useLayout: function(layoutName) {
        this.layout = SoftwareKeyboard.layouts[layoutName]
        this.mapping = SoftwareKeyboard.mappings[layoutName]
        this.keyboard = this.drawKeyboard(this.layout)
        this.textfieldBack = this.paper.rect(500, 50).attr({
            rx: this.gap,
            ry: this.gap
        }).move(230, 105).attr("fill", "#eee")
        this.textfield = this.paper.text("").attr({
            "class": "softkey-textfield",
            "text-anchor": "middle",
            "font-weight": "bold",
            "font-size": 40
        }).move(480, 100)
        this.setText("")
    },
    setText: function(text) {
        this.text = text
        $(this.textfield.node).find("tspan").text(text)
    },
    drawKeyboard: function(layout) {
        var self = this
        var grp = this.paper.group()
        var rect = grp.rect().attr("rx", this.gap).attr("ry", this.gap)
        var keys = []
            // layout is array of rows (lines)
        var x = 0
        var y = 0
        var w = 1
        var h = 1
        var a = 6
        var f = 6
        var t = "#333"
        var c = "#fff"
        var x2 = 0
        var y2 = 0
        var w2 = 0
        var h2 = 0
        var ndx = 0
        var backcolor = "#eeeeee"
        var maxw = 0
        var maxh = 0
        var rr = 0
        self.keys = {}
        self.keysArray = []
        _.each(layout, function(row, i) {
            x = 0
            if (!(row instanceof Array)) {
                backcolor = row.backcolor
            } else {
                _.each(row, function(key, j) {
                    if (typeof(key) == "string") {
                        // create a key...
                        var keyid = "key" + (ndx++)
                        self.keys[keyid] = self.drawKey(grp, keyid, key, {
                            x: x,
                            y: y,
                            w: w,
                            h: h,
                            c: c,
                            t: t,
                            a: a,
                            f: f,
                            x2: x2,
                            y2: y2,
                            w2: w2,
                            h2: h2,
                            index: ndx,
                            row: rr
                        })
                        self.keysArray.push(self.keys[keyid])
                        self.selectChain.append(self.keys[keyid].element)
                        x += w
                        w = 1
                        h = 1
                        w2 = 0
                        h2 = 0
                        x2 = 0
                        y2 = 0
                    } else {
                        // object data - set for next key...
                        if (key.w) w = key.w
                        if (key.h) h = key.h
                        if (key.x) x += key.x
                        if (key.y) y += key.y
                        if (key.f) f = key.f
                        if (key.a) a = key.a
                        if (key.c) c = key.c
                        if (key.t) t = key.t
                        if (key.x2) x2 = key.x2
                        if (key.y2) y2 = key.y2
                        if (key.h2) h2 = key.h2
                        if (key.w2) w2 = key.w2
                    }
                    maxw = Math.max(maxw, x)
                })
            }
            y++
            rr++
            maxh = y
        })
        this.rows = maxh
        this.columns = maxw
        rect.attr("fill", backcolor)
        var wwww = maxw * (this.size + this.gap) + this.gap
        var hhhh = maxh * (this.size + this.gap) + this.gap
        rect.attr("width", wwww)
        rect.attr("height", hhhh)
        rect.move(-this.gap, -this.gap)
        grp.move((960 - wwww) / 2, 170)
        var self = this
        $(grp.node).find(".keywrapper").each(function() {
            var el = $(this)
            el.click(function() {
                self.selectChain.select(el.get(0))
                self.pressKey()
            })
        })
        this.selectChain.update()
        return grp
    },
    drawKey: function(root, keyid, label, opts) {
        var size = this.size
        var gap = this.gap
        var grp = root.group().attr("class", "keywrapper")
        var ww = opts.w * size + (opts.w - 1) * gap
        var hh = opts.h * size + (opts.h - 1) * gap
        grp.rect(ww, hh).attr({
            "class": "key",
            "rx": 10,
            "ry": 10,
            "fill": opts.c
        })
        if (opts.h2 && opts.w2) {
            var ww2 = opts.w2 * size + (opts.w2 - 1) * gap
            var hh2 = opts.h2 * size + (opts.h2 - 1) * gap
            var xx2 = opts.x2 * size + (opts.x2) * gap
            var yy2 = opts.y2 * size + (opts.y2) * gap
            grp.rect(ww2, hh2).attr({
                "class": "key",
                "rx": 10,
                "ry": 10,
                "fill": opts.c
            }).move(xx2, yy2)
        }
        var lines = label.split("\n")
        var label1 = ""
        var label2 = ""
        lines = _.filter(lines, function(e) {
            return e.trim() != "";
        })
        if (lines.length > 0) {
            label1 = lines[0].trim()
            grp.text(lines[0]).attr({
                "class": "label",
                "fill": opts.t,
                "font-size": Math.round(opts.f * 2.5),
                "text-anchor": "middle"
            }).x((ww - gap) / 2).y((hh - gap) * 0.2)
            if (lines.length >= 2) {
                label2 = lines[1].trim()
                grp.text(lines[1]).attr({
                    "class": "label",
                    "fill": opts.t,
                    "font-size": Math.round(opts.a * 2.5),
                    "text-anchor": "middle"
                }).x((ww - gap) / 2).y((hh - gap) * 0.7)
            }
        }
        grp.attr("data-keyid", keyid)
        grp.move((size + gap) * opts.x, (size + gap) * opts.y)
        return $.extend(opts, {
            svg: grp,
            element: grp.node,
            label: label,
            label1: label1,
            label2: label2
        })
    },
    init: function(data, next) {
        this.base(data, next)
    },
    getSelectedKey: function() {
        var keyElement = this.selectChain.current()
        return this.keys[$(keyElement).data("keyid")]
    },
    onClosed: function(text) {
        // this is called after the keyboard is closed
    },
    onTextEntered: function(text) {
        alert(text)
    },
    findBelowKey: function(key) {
        var ndx = key.index
        var row = key.row
        var x = key.x
        var w = key.w
        do {
            ndx++
            if (ndx >= this.keysArray.length) ndx = 0
            var key2 = this.keysArray[ndx]
            if (key2.row != row && !(key.x + key.w <= key2.x || key2.x + key2.w <= key.x)) break
        } while (ndx != key.index)
        return this.keysArray[ndx]
    },
    findAboveKey: function(key) {
        var ndx = key.index
        var row = key.row
        var x = key.x
        var w = key.w
        do {
            ndx--
            if (ndx < 0) ndx = this.keysArray.length - 1
            var key2 = this.keysArray[ndx]
            if (key2.row != row && !(key.x + key.w <= key2.x || key2.x + key2.w <= key.x)) break
        } while (ndx != key.index)
        return this.keysArray[ndx]
    },
    pressKey: function() {
        var key = this.getSelectedKey()
        var txt = this.text
        var instr = this.mapping[key.label]
        switch (instr) {
            case "backspace":
                txt = txt.slice(0, -1)
                break
            case "enter":
                this.onClosed()
                this.onTextEntered(this.text)
                break;
            case "space":
                txt += " "
                break
            case "escape":
                this.onClosed()
                return
            default:
                txt += key.label1
        }
        // is it number or letter?
        this.setText(txt)
    },
    onVirtualControl: function(evt) {
        var self = this
        switch (evt.control) {
            case "up":
                var key = this.getSelectedKey()
                var key2 = this.findAboveKey(key)
                this.selectChain.select(key2.element)
                break;
            case "down":
                var key = this.getSelectedKey()
                var key2 = this.findBelowKey(key)
                this.selectChain.select(key2.element)
                break;
            case "home":
                // works like escape key
                this.onClosed()
                break;
            case "left":
                this.selectChain.selectPrevious()
                break;
            case "right":
                this.selectChain.selectNext()
                break;
            case "select":
                this.pressKey()
                break;
        }
    }

}, {
    layouts: {
        // let's use layouts from http://www.keyboard-layout-editor.com/
        "Numeric": [
            ["Num Lock", "/", "*", "-"],
            ["7\nHome", "8\n↑", "9\nPgUp", {
                h: 2
            }, "+"],
            ["4\n←", "5", "6\n→"],
            ["1\nEnd", "2\n↓", "3\nPgDn", {
                h: 2
            }, "Enter"],
            [{
                w: 2
            }, "0\nIns", ".\nDel"]
        ],
        "ANSI 104": [
            ["Esc", {
                "x": 1
            }, "F1", "F2", "F3", "F4", {
                "x": 0.5
            }, "F5", "F6", "F7", "F8", {
                "x": 0.5
            }, "F9", "F10", "F11", "F12", {
                "x": 0.5
            }, "PrtSc", "Scroll Lock", "Pause\nBreak"],
            [{
                "y": 0.5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", {
                "w": 2
            }, "Backspace", {
                "x": 0.5
            }, "Insert", "Home", "PgUp", {
                "x": 0.5
            }, "Num Lock", "/", "*", "-"],
            [{
                "w": 1.5
            }, "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", {
                "w": 1.5
            }, "|\n\\", {
                "x": 0.5
            }, "Delete", "End", "PgDn", {
                "x": 0.5
            }, "7\nHome", "8\n↑", "9\nPgUp", {
                "h": 2
            }, "+"],
            [{
                "w": 1.75
            }, "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n'", {
                "w": 2.25
            }, "Enter", {
                "x": 4
            }, "4\n←", "5", "6\n→"],
            [{
                "w": 2.25
            }, "Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", {
                "w": 2.75
            }, "Shift", {
                "x": 1.5
            }, "↑", {
                "x": 1.5
            }, "1\nEnd", "2\n↓", "3\nPgDn", {
                "h": 2
            }, "Enter"],
            [{
                "w": 1.25
            }, "Ctrl", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Alt", {
                "w": 6.25
            }, "", {
                "w": 1.25
            }, "Alt", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Menu", {
                "w": 1.25
            }, "Ctrl", {
                "x": 0.5
            }, "←", "↓", "→", {
                "x": 0.5,
                "w": 2
            }, "0\nIns", ".\nDel"]
        ],
        "ANSI 104 (big-ass enter)": [
            ["Esc", {
                "x": 1
            }, "F1", "F2", "F3", "F4", {
                "x": 0.5
            }, "F5", "F6", "F7", "F8", {
                "x": 0.5
            }, "F9", "F10", "F11", "F12", {
                "x": 0.5
            }, "PrtSc", "Scroll Lock", "Pause\nBreak"],
            [{
                "y": 0.5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", "|\n\\", "Back Space", {
                "x": 0.5
            }, "Insert", "Home", "PgUp", {
                "x": 0.5
            }, "Num Lock", "/", "*", "-"],
            [{
                "w": 1.5
            }, "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", {
                "w": 1.5,
                "h": 2,
                "w2": 2.25,
                "h2": 1,
                "x2": -0.75,
                "y2": 1
            }, "Enter", {
                "x": 0.5
            }, "Delete", "End", "PgDn", {
                "x": 0.5
            }, "7\nHome", "8\n↑", "9\nPgUp", {
                "h": 2
            }, "+"],
            [{
                "w": 1.75
            }, "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n'", {
                "x": 6.25
            }, "4\n←", "5", "6\n→"],
            [{
                "w": 2.25
            }, "Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", {
                "w": 2.75
            }, "Shift", {
                "x": 1.5
            }, "↑", {
                "x": 1.5
            }, "1\nEnd", "2\n↓", "3\nPgDn", {
                "h": 2
            }, "Enter"],
            [{
                "w": 1.25
            }, "Ctrl", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Alt", {
                "w": 6.25
            }, "", {
                "w": 1.25
            }, "Alt", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Menu", {
                "w": 1.25
            }, "Ctrl", {
                "x": 0.5
            }, "←", "↓", "→", {
                "x": 0.5,
                "w": 2
            }, "0\nIns", ".\nDel"]
        ],
        "Dark": [{
                backcolor: "#222222"
            },
            [{
                c: "#7b9b48",
                t: "#e4dedd",
                p: "DSA",
                a: 7,
                f: 4
            }, "ESC", {
                x: 1,
                c: "#483527",
                f: 3
            }, "F1", "F2", "F3", "F4", {
                x: 0.5,
                c: "#733636"
            }, "F5", "F6", "F7", "F8", {
                x: 0.5,
                c: "#483527"
            }, "F9", "F10", "F11", "F12", {
                x: 0.5,
                c: "#733636"
            }, "PRINT", {
                f: 2
            }, "SCROLL LOCK", {
                f: 3
            }, "PAUSE\nBreak"],
            [{
                y: 0.5,
                c: "#483527",
                a: 5,
                f: 5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", {
                c: "#733636",
                a: 7,
                f: 3,
                w: 2
            }, "BACK SPACE", {
                x: 0.5
            }, "INS", "HOME", "PAGE UP", {
                x: 0.5
            }, "NUM LOCK", {
                f: 6
            }, "/", "*", "&ndash;"],
            [{
                f: 3,
                w: 1.5
            }, "TAB", {
                c: "#483527",
                f: 8
            }, "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", {
                a: 5,
                f: 5
            }, "{\n[", "}\n]", {
                w: 1.5
            }, "|\n\\", {
                x: 0.5,
                c: "#733636",
                a: 7,
                f: 3
            }, "DEL", "END", "PAGE DOWN", {
                x: 0.5,
                c: "#483527",
                f: 8
            }, "7\nHome", "8\nâ†‘", "9\nPgUp", {
                c: "#733636",
                f: 6,
                h: 2
            }, "+"],
            [{
                f: 3,
                w: 1.75
            }, "CAPS LOCK", {
                c: "#483527",
                f: 8
            }, "A", "S", "D", "F", "G", "H", "J", "K", "L", {
                a: 5,
                f: 5
            }, ":\n;", "\"\n'", {
                c: "#7b9b48",
                a: 7,
                f: 3,
                w: 2.25
            }, "RETURN", {
                x: 4,
                c: "#483527",
                f: 8
            }, "4\nâ† ", "5", "6\nâ†’"],
            [{
                c: "#733636",
                f: 3,
                w: 2.25
            }, "SHIFT", {
                c: "#483527",
                f: 8
            }, "Z", "X", "C", "V", "B", "N", "M", {
                a: 5,
                f: 5
            }, "<\n,", ">\n.", "?\n/", {
                c: "#733636",
                a: 7,
                f: 3,
                w: 2.75
            }, "SHIFT", {
                x: 1.5,
                f: 6
            }, "&#9652;", {
                x: 1.5,
                c: "#483527",
                f: 8
            }, "1\nEnd", "2\nâ†“", "3\nPgDn", {
                c: "#733636",
                f: 3,
                h: 2
            }, "ENTER"],
            [{
                w: 1.25
            }, "CTRL", {
                w: 1.25
            }, "WIN", {
                w: 1.25
            }, "ALT", {
                c: "#483527",
                p: "DSA SPACE",
                w: 6.25
            }, "", {
                c: "#733636",
                p: "DSA",
                w: 1.25
            }, "ALT", {
                w: 1.25
            }, "WIN", {
                w: 1.25
            }, "MENU", {
                w: 1.25
            }, "CTRL", {
                x: 0.5,
                f: 6
            }, "&#9666;", "&#9662;", "&#9656;", {
                x: 0.5,
                c: "#483527",
                f: 8,
                w: 2
            }, "0\nIns", ".\nDel"]
        ],
        "Deutsch": [
            [{
                a: 5,
                f: 8
            }, "\n\n\n\n\n\n1", "\n\n\n\n\n\n2", "\n\n\n\n\n\n3", "\n\n\n\n\n\n4", "\n\n\n\n\n\n5", "\n\n\n\n\n\n6", "\n\n\n\n\n\n7", "\n\n\n\n\n\n8", "\n\n\n\n\n\n9", "\n\n\n\n\n\n0", "\n\n\n\n\n\nß", {
                f: 9,
                w: 2
            }, "←\n←\n\n\n\n\n←"],
            [{
                x: 0.5,
                f: 8
            }, "\n\n\n\n\n\nQ", "\n\n\n\n\n\nW", "\n\n\n\n\n\nE", "\n\n\n\n\n\nR", "\n\n\n\n\n\nT", "\n\n\n\n\n\nZ", "\n\n\n\n\n\nU", "\n\n\n\n\n\nI", "\n\n\n\n\n\nO", "\n\n\n\n\n\nP", "\n\n\n\n\n\nÜ", {
                x: 0.25,
                f: 9,
                w: 1.25,
                h: 2,
                w2: 1.5,
                h2: 1,
                x2: -0.25
            }, "\n\n\n\n\n\n↵"],
            [{
                x: 0.75,
                f: 8
            }, "\n\n\n\n\n\nA", "\n\n\n\n\n\nS", "\n\n\n\n\n\nD", "\n\n\n\n\n\nF", "\n\n\n\n\n\nG", "\n\n\n\n\n\nH", "\n\n\n\n\n\nJ", "\n\n\n\n\n\nK", "\n\n\n\n\n\nL", "\n\n\n\n\n\nÖ", "\n\n\n\n\n\nÄ"],
            [{
                x: 1.25
            }, "\n\n\n\n\n\nY", "\n\n\n\n\n\nX", "\n\n\n\n\n\nC", "\n\n\n\n\n\nV", "\n\n\n\n\n\nB", "\n\n\n\n\n\nN", "\n\n\n\n\n\nM", {
                x: 0.25,
                a: 4,
                f: 9,
                w: 0.75
            }, "\n,", {
                w: 0.75
            }, "\n.", {
                a: 5,
                f: 8
            }, "←", "→", {
                f: 6
            }, "\n\n\n\n\n\nEntf"],
            [{
                x: 3.75,
                a: 4,
                f: 3,
                w: 6.25
            }, ""]
        ],
        "DeutschColor": [
            [{
                c: "#CD96CD",
                a: 5,
                f: 8
            }, "\n\n\n\n\n\n1", "\n\n\n\n\n\n2", "\n\n\n\n\n\n3", "\n\n\n\n\n\n4", "\n\n\n\n\n\n5", "\n\n\n\n\n\n6", "\n\n\n\n\n\n7", "\n\n\n\n\n\n9", "\n\n\n\n\n\n0", {
                c: "#FFD39B"
            }, "\n\n\n\n\n\nß", {
                c: "#FF6A6A",
                f: 9,
                w: 3
            }, "←\n←\n\n\n\n\n←"],
            [{
                x: 0.5,
                c: "#FFD39B",
                f: 8
            }, "\n\n\n\n\n\nQ", "\n\n\n\n\n\nW", "\n\n\n\n\n\nE", "\n\n\n\n\n\nR", "\n\n\n\n\n\nT", "\n\n\n\n\n\nZ", "\n\n\n\n\n\nU", "\n\n\n\n\n\nI", "\n\n\n\n\n\nO", "\n\n\n\n\n\nP", "\n\n\n\n\n\nÜ", {
                x: 0.25,
                c: "#32CD32",
                f: 9,
                w: 1.25,
                h: 2,
                w2: 1.5,
                h2: 1,
                x2: -0.25
            }, "\n\n\n\n\n\n↵"],
            [{
                x: 0.75,
                c: "#FFD39B",
                f: 8
            }, "\n\n\n\n\n\nA", "\n\n\n\n\n\nS", "\n\n\n\n\n\nD", "\n\n\n\n\n\nF", "\n\n\n\n\n\nG", "\n\n\n\n\n\nH", "\n\n\n\n\n\nJ", "\n\n\n\n\n\nK", "\n\n\n\n\n\nL", "\n\n\n\n\n\nÖ", "\n\n\n\n\n\nÄ"],
            [{
                x: 1.25
            }, "\n\n\n\n\n\nY", "\n\n\n\n\n\nX", "\n\n\n\n\n\nC", "\n\n\n\n\n\nV", "\n\n\n\n\n\nB", "\n\n\n\n\n\nN", "\n\n\n\n\n\nM", {
                x: 0.25,
                a: 4,
                f: 9,
                w: 0.75
            }, "\n,", {
                w: 0.75
            }, "\n.", {
                c: "#79CDCD",
                a: 5,
                f: 8
            }, "←", "→", {
                c: "#FF6A6A",
                f: 6
            }, "\n\n\n\n\n\nEntf"],
            [{
                x: 3.75,
                c: "#FFD39B",
                a: 4,
                f: 3,
                w: 6.25
            }, ""]
        ]
    },
    mappings: {
        "Deutsch": {
            "\n\n\n\n\n\nEntf": "escape",
            "←\n←\n\n\n\n\n←": "backspace",
            "\n\n\n\n\n\n↵": "enter",
            "": "space"
        },
        "DeutschColor": {
            "\n\n\n\n\n\nEntf": "escape",
            "←\n←\n\n\n\n\n←": "backspace",
            "\n\n\n\n\n\n↵": "enter",
            "": "space"
        },
        "Dark": {
            "ESC": "escape",
            "BACK SPACE": "backspace",
            "RETURN": "enter",
            "": "space"
        },
        "Numeric": {
            "Num Lock": "numlock",
            "Enter": "enter"
        }
    }
})

module.exports = SoftwareKeyboard

},{"./Overlay":3,"./SelectChain":4,"underscore":7}],6:[function(require,module,exports){
/*
  Based on Base.js 1.1a (c) 2006-2010, Dean Edwards
  Updated to pass JSHint and converted into a module by Kenneth Powers
  License: http://www.opensource.org/licenses/mit-license.php
*/
/*global define:true module:true*/
/*jshint eqeqeq:true*/
(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define !== 'undefined' && typeof define.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Base', this, function () {
  // Base Object
  var Base = function () {};

  // Implementation
  Base.extend = function (_instance, _static) { // subclass
    var extend = Base.prototype.extend;
    // build the prototype
    Base._prototyping = true;
    var proto = new this();
    extend.call(proto, _instance);
    proto.base = function () {
      // call this method from any other method to invoke that method's ancestor
    };
    delete Base._prototyping;
    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function () {
        if (!Base._prototyping) {
          if (this._constructing || this.constructor === klass) { // instantiation
            this._constructing = true;
            constructor.apply(this, arguments);
            delete this._constructing;
          } else if (arguments[0] !== null) { // casting
            return (arguments[0].extend || extend).call(arguments[0], proto);
          }
        }
      };
    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function (type) {
      return (type === 'object') ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialization
    if (typeof klass.init === 'function') klass.init();
    return klass;
  };

  Base.prototype = {
    extend: function (source, value) {
      if (arguments.length > 1) { // extending with a name/value pair
        var ancestor = this[source];
        if (ancestor && (typeof value === 'function') && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() !== value.valueOf()) && /\bbase\b/.test(value)) {
          // get the underlying method
          var method = value.valueOf();
          // override
          value = function () {
            var previous = this.base || Base.prototype.base;
            this.base = ancestor;
            var returnValue = method.apply(this, arguments);
            this.base = previous;
            return returnValue;
          };
          // point to the underlying method
          value.valueOf = function (type) {
            return (type === 'object') ? value : method;
          };
          value.toString = Base.toString;
        }
        this[source] = value;
      } else if (source) { // extending with an object literal
        var extend = Base.prototype.extend;
        // if this object has a customized extend method then use it
        if (!Base._prototyping && typeof this !== 'function') {
          extend = this.extend || extend;
        }
        var proto = {
          toSource: null
        };
        // do the "toString" and other methods manually
        var hidden = ['constructor', 'toString', 'valueOf'];
        // if we are prototyping then include the constructor
        for (var i = Base._prototyping ? 0 : 1; i < hidden.length; i++) {
          var h = hidden[i];
          if (source[h] !== proto[h])
            extend.call(this, h, source[h]);
        }
        // copy each of the source object's properties to this object
        for (var key in source) {
          if (!proto[key]) extend.call(this, key, source[key]);
        }
      }
      return this;
    }
  };

  // initialize
  Base = Base.extend({
    constructor: function () {
      this.extend(arguments[0]);
    }
  }, {
    ancestor: Object,
    version: '1.1',
    forEach: function (object, block, context) {
      for (var key in object) {
        if (this.prototype[key] === undefined) {
          block.call(context, object[key], key, object);
        }
      }
    },
    implement: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
          // if it's a function, call it
          arguments[i](this.prototype);
        } else {
          // add the interface using the extend method
          this.prototype.extend(arguments[i]);
        }
      }
      return this;
    },
    toString: function () {
      return String(this.valueOf());
    }
  });

  // Return Base implementation
  return Base;
});

},{}],7:[function(require,module,exports){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}],8:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("+NscNm"))
},{"+NscNm":9}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],10:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],13:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":11,"./encode":12}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":10,"querystring":13}],15:[function(require,module,exports){
var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")
var Empty = require("./Empty")

var AudioDecorator = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    init: function() {
        this.slot = $("<div>").addClass("slot");
        this.setSlot('content', new Empty());
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.audio.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.audio.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        // regenerate player...
        this.refresh();
        this.onStop();
    },
    _kill: function() {
        this.audio.get(0).pause();
        this.audio.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.audio.get(0).volume = vol / 100.0;
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.slot.html(value.get());
        return this;
    },
    _addSource: function(uri, type) {
        if(uri) $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.audio);
    },
    refresh: function() {
        this.base();
        var self = this;
        this.audio = $("<audio>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.slot)
            .append(this.pane)
            .append(this.audio);

        // incorrect... and unnecessary: this.audio.remove("source");
        this.audio.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg') ? this.options.uri : '';
            this.options.mp3 = (ext == 'mp3') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'audio/ogg; codecs="vorbis"');
        this._addSource(this.options.mp3, 'audio/mpeg; codecs="mp3"');
        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
    },
    _klass: "audio-decorator decorator thing",
    _type: "audio-decorator",
    _defaults: {
        'ogg': "",
        'mp3': "",
        'uri': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
       "type":"object",
       "properties":{
          "uri":{
             "type":"string",
             "format": "my-voice-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "volume":{
             "type":"integer",
             "required":true // TODO
          },
          "autoplay":{
             "type":"boolean",
             "required":true // TODO
          },
          "loop":{
             "type":"boolean",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});


module.exports = AudioDecorator
},{"./CenteringDecorator":20,"./Empty":23,"./PlayerControls":32,"./Thing":41}],16:[function(require,module,exports){
var Decorator = require("./Decorator")

var BackgroundDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        if(this.options['image']) 
            this.element.css('background-image','url("'+this.options['image']+'")');
        else 
            this.element.css('background-image','');
        this.element.css('background-position',this.options['position']);
        this.element.css('background-repeat',this.options['repeat']);
        this.element.css('background-color',this.options['color']);
        this.element.css('background-size',this.options['size']);
    },
    _klass: "background-decorator decorator thing",
    _type: "background-decorator",
    _defaults: {
        'image': "",
        'repeat': 'no-repeat',
        'position': 'center center',
        'color': 'white',
        'size': 'cover'
    },
    _schema: {
       "type":"object",
       "properties":{
          "image":{
             "type":"string",
             "format": "my-image-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "repeat":{
             "enum": ["repeat","no-repeat","repeat-x","repeat-y"],
             "type":"string",
             "required":true // TODO
          },
          "position":{
             "type":"string",
             "required":true // TODO
          },
          "size":{
             "type":"string",
             "enum": ["cover","contain"],
             "required":true // TODO
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = BackgroundDecorator


},{"./Decorator":22}],17:[function(require,module,exports){
var GrowableLayout = require("./GrowableLayout")

var Book = GrowableLayout.extend({
    currentPage: 0,
    init: function() {
        this.base();
        console.log("Book created")
        console.log(this)
    },
    refresh: function() {
        this.base();
    },
    // TODO tohle se muze zavolat jen pokud jsou stranky uz vlozena do DOMu
    makeDisplay: function() {
        var self = this;
	    // kniha = <div class="mykkro-book> <div class="mykkro-slot"> .. </div>
	    this.element.addClass(this.options.display);
	    switch(this.options.display) {
	      case 'basic':
	        // add page numbers...
	        break;
	      case "turnable":
	        this.element.turn({gradients: true, acceleration: true});
            this.element.bind("start", function(ev, pageObject, corner) { 
                self.onTurnStart(ev, pageObject, corner); })
            this.element.bind("turning", function(ev, page, pageObject) { 
                self.onTurning(ev, page, pageObject); })
            this.element.bind("turned", function(ev, page, view) { 
                self.onTurned(ev, page, view); })
            this.element.bind("end", function(ev, pageObject, turned) { 
                self.onTurnEnd(ev, pageObject, turned); })
	        break;
	    }
    },
    _setPage: function(page) {
        if(!this.currentPage) {
            // page 1 became visible
            this.onPageVisibilityChange(page, true);
        }
        else if(this.currentPage>>1 == page>>1) {
            // je videt porad stejna dvoustrana
        } else {            
            // visibility changed
            var oldPages = 2*(Math.floor(this.currentPage / 2));
            var newPages = 2*(Math.floor(page / 2));
            this.onPageVisibilityChange(oldPages, false);
            this.onPageVisibilityChange(oldPages+1, false);
            this.onPageVisibilityChange(newPages, true);
            this.onPageVisibilityChange(newPages+1, true);
        }
        this.currentPage = page;
        // notifikovat stranky pokud se jejich viditelnost zmenila
        this.onPageChange(page);
    },
    // TODO udelat si na to taky bind funkci
    onPageVisibilityChange: function(page, visible) {
        if(typeof(page)=='function') this._onPageVisibilityChange = page;  
        else {
            // mame takovou stranku?
            var name = page-1;
            if(this.slots[name]) {
                this._updatePageVisibility(page, visible);
                if(this._onPageVisibilityChange) this._onPageVisibilityChange(page, visible);
            }
        }
    },
    _updatePageVisibility: function(page, visible) {
        // pri zviditelneni musim refereshnout vsechny audio-decoratory a video-thingy
        // pri zneviditelneni vypnout jejich playback
        //log("Page: "+page+" visibility: "+visible);
        var name = page-1;
        var thing = this.slots[name];
        var media = [];
        thing.findSlotsByType('audio-decorator', media);
        thing.findSlotsByType('video-thing', media)
        //log(audio.length+","+video.length);
        if(visible) {
            // page became visible...
            for(var i=0; i<media.length; i++) {
                media[i].refresh();
                if(media[i].options['autoplay']) {
                    media[i].play();
                }
            }
        } else {
            // TODO stop only if playing...
            for(var i=0; i<media.length; i++) media[i]._kill();
        }
    },
    onPageChange: function(ev) {
        if(typeof(ev)=='function') this._onPageChange = ev;  
        else {
            if(this._onPageChange) this._onPageChange(ev);
        }
    },
    onInit: function(ev) {
        if(typeof(ev)=='function') this._onInit = ev;  
        else {
            this._setPage(1);
            if(this._onInit) this._onInit();
        }
    },
    onExit: function(ev) {
        if(typeof(ev)=='function') this._onExit = ev;  
        else {
            if(this._onExit) this._onExit();
        }
    },
    onTurnStart: function(ev, pageObject, corner) {
        if(typeof(ev)=='function') this._onTurnStart = ev;  
        else {
            if(this._onTurnStart) this._onTurnStart(ev, pageObject, corner);
        }
    }, 
    onTurning: function(ev, page, pageObject) {
        if(typeof(ev)=='function') this._onTurning = ev;  
        else {
            if(this._onTurning) this._onTurning(ev, page, pageObject);
        }
    }, 
    onTurned: function(ev, page, view) { 
        if(typeof(ev)=='function') this._onTurned = ev;  
        else {
            this._setPage(page);
            if(this._onTurned) this._onTurned(ev, page, view);
        }
    }, 
    onTurnEnd: function(ev, pageObject, turned) { // nefunguje
        if(typeof(ev)=='function') this._onTurnEnd = ev;  
        else {
            if(this._onTurnEnd) this._onTurnEnd(ev, pageObject, corner);
        }
    }, 
    _klass: "book growable-layout layout thing",
    _type: "book",
    _defaults: {
        "title": "My Book",
	    "display": "basic"
    },
    _schema: {
       "type":"object",
       "properties":{
          "title":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = Book

},{"./GrowableLayout":26}],18:[function(require,module,exports){
var Base = require("basejs")
var Thing = require("./Thing")
var Things = require("./Things")


// TODO udelat z toho Thing
// TODO k ikonam pridat tooltipy

var BookViewer = Base.extend({
    constructor: function(options) {
        this.bookData = options.data;
        this.bookUrl = options.url;
        this.uuid = options.uuid
        this.fullscreen = options.fullscreen;
        this.logger = options.logger;
        this.defaultWidth = 920;
        this.defaultHeight = 600;
        this.tools = {};
        this.bookContent = null;
        this.targetDiv = options.targetDiv || "#content"
    },
    makeIcon: function(icon, title) {
        return $("<div>").addClass('icon icon-48 icon-'+icon).css('display','inline-block').attr("title", title);
    },
    makeTool: function(icon, label, left/*bool*/, top, click) {
        this.tools[icon] = this.makeIcon(icon, label).css({position:'absolute', top: top}).css(left ? {'left':'6px'}:{'right':'6px'}).click(click).appendTo($("#book-wrapper"));
        return this.tools[icon];
    },
    showIcon: function(icon, enable) {
        if(enable) this.tools[icon].show() ; else this.tools[icon].hide();
    },
    turnNext: function() {
        this.bookContent.get().turn("next");
    },
    turnPrevious: function() {
        this.bookContent.get().turn("previous");
    },
    turnFirst: function() {
        this.bookContent.get().turn("page", 1);
    },
    close: function() {
        this.logEvent('book_close', this.bookUrl);
    },
    closeBook: function() {
        // normal viewer only turns to page 1
        this.turnFirst()
    },
    _setPageBackgrounds: function(bookContent, o) {
        var totalPages = bookContent.length()
        for(var i=0; i<totalPages; i++) {
            var slot = bookContent.nth(i)
            var elem = slot.element
            var css = { "background-size": "cover", "background-color": "white"}
            if(i==0) {
                // first page
                css["background-image"] = 'url('+o.frontpage_image_url+')'
            } else if(i == totalPages-1 && i%2!=0) {
                // last page, must be odd
                css["background-image"] = 'url('+o.backpage_image_url+')'
            } else if(i%2==0) {
                // even page
                css["background-image"] = 'url('+o.evenpage_image_url+')'
            } else {
                // odd page
                css["background-image"] = 'url('+o.oddpage_image_url+')'
            }
            elem.css(css)
        }
    },
    _makeWrapper: function(o) {
        return $("<div>")
            .attr("id", "book-wrapper")
            .css('position','relative')
            .css("background-image", 'url('+o.background_image_url+')')
    },
    _makeReferences: function(bookContent) {
        // gather references...
        var refs = [];
        bookContent.findSlotsByType('ref-decorator', refs);
        for(var i=0; i<refs.length; i++) {
            refs[i].options.label = (i+1)+""
            refs[i].refresh()
        }
        // TODO find reference-page layout and fill it by reference info...
        var reflists = [];
        bookContent.findSlotsByType('ref-list', reflists);
        // only the first will be used; later: we can split reference items into multiple ref lists
        if(reflists.length>0) {
            reflists[0].setReferences(refs);
        }
    },
    _monitorMediaEvents: function(bookContent) {
        // find audio and video Things and monitor their play, stop, pause, kill events
        var media = [];
        var self = this;
        bookContent.findSlotsByType('audio-decorator', media);
        bookContent.findSlotsByType('video-thing', media);
        for(var i=0; i<media.length; i++) {
            var m = media[i]; 
            var src = m.options.uri;           
            (function(){
                m.onPlay(function() { self.logEvent('book_media_play', src); });
                m.onPause(function() { self.logEvent('book_media_pause', src); });
                m.onStop(function() { self.logEvent('book_media_stop', src); });
                m.onKill(function() { self.logEvent('book_media_kill', src); });
            })();
        }
    },
    init: function() {
        /* display book... */
        var self = this;
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        var o = this.bookData.options      
        // create wrapper...
        var wrapper = this._makeWrapper(o);
        wrapper.appendTo(this.targetDiv);
        this.bookContent = Things.create(this.bookData, {"display":"turnable"});

        this._setPageBackgrounds(this.bookContent, o)
        this._makeReferences(this.bookContent)
        this._monitorMediaEvents(this.bookContent)
        
        // init book...
        this.bookContent.onInit();
        $("#book-wrapper").css({width:width+"px", height:height+"px"}).html(this.bookContent.get());
        this.bookContent.makeDisplay();

        // events...
        $(window).unload(function() {
            self.bookContent.onExit(); // TODO tohle mi nejak nefunguje...
        });
        $(window).resize(function() {
            if(self.fullscreen) {
                self.updateToolbar(self.recreate());
            }
        });
        $(window).bind("fullscreen-toggle", function(e, state) {
            self.setFullscreen(state);
        });
        this.bookContent.get().bind("turned", function(event, page, view) {
            self.updateToolbar();
            self.logEvent('book_page_turn', self.bookUrl, self.bookContent.get().turn("page"));
        });
        this.makeTool('turn-right', __('Previous page'), true, '50%', function() { self.turnPrevious();});
        this.makeTool('turn-left', __('Next page'), false, '50%', function() { self.turnNext();});

        // update icons...
        $("#book-wrapper >.icon-turn-left").css("background-image", 'url('+o.turnleft_image_url+')')
        $("#book-wrapper >.icon-turn-right").css("background-image", 'url('+o.turnright_image_url+')')

        this.updateToolbar();
        this.logEvent('book_open', this.bookUrl);
    },
    logEvent: function(type, src, data) {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        this.logSingleEvent({"type":type, "bookId":this.uuid, "src":src, "data":data, "timestamp":timestamp});
    },
    logSingleEvent: function(evt) {
        if(this.logger) {
            this.logger.log(evt)
        }
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.bookContent.get().turn('disable', true);
        if(this.fullscreen) {
            $("#book-wrapper").appendTo($("#fullscreen"));
            $("#container").hide();
            $("#fullscreen").show();            
        } else {
            $("#book-wrapper").appendTo($("#content"));
            $("#container").show();
            $("#fullscreen").hide();

        }
        this.bookContent.get().turn('disable', false);
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    },
    recreate: function() {
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        // kniha je velka 800x560 - pomer stran cca 1:sqrt(2) ~ 1:1.428
        if(this.fullscreen) {
            var ww = $(window).width();
            var hh = $(window).height();
            var scaleFactor = ww/width;
            var scaleFactor2 = hh/height;
            var scale = Math.min(scaleFactor, scaleFactor2);
            width = /*Math.floor(width*scale);*/ww;
            height = /*Math.floor(height*scale);*/hh;
        } 
        // resize wrapper and pages...
        $("#book-wrapper").css({width:width+"px", height:height+"px"});
        if(this.fullscreen) {
            // na okrajich musi zbyt 8% mista; to odpovida 60px 
            var sidex = Math.max(Math.floor(width*0.08), 60);
            var newWidth = width - 2*sidex;
            var newHeight = Math.floor(newWidth/1.428);
            var maxHeight = height-40;
            if(newHeight > maxHeight) {
                newWidth = Math.floor(newWidth*maxHeight/newHeight);
                newHeight = maxHeight;
            }
        } else {
            var newWidth = width - 120;
            var newHeight = height - 40;
        }
        this.bookContent.get().turn('size', newWidth, newHeight);
        return newWidth;
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit
        
        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+3*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
        }
    }
});

module.exports = BookViewer

},{"./Thing":41,"./Things":42,"basejs":6}],19:[function(require,module,exports){
var Decorator = require("./Decorator")

// TODO sloucit nejak s rounded decoratorem
var BorderDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('border-width', this.options['width']);
        this.element.css('border-style',this.options['style']);
        this.element.css('border-color',this.options['color']);
    },
    _klass: "border-decorator decorator thing",
    _type: "border-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black'
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "style":{
             "type":"string",
             "enum": ["none","solid","dotted","dashed","double","groove","ridge","inset","outset"],
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = BorderDecorator

},{"./Decorator":22}],20:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

var CenteringDecorator = Thing.extend({
    init: function() {
        this.inner = $("<div>").addClass('content-inner').appendTo(
            $("<div>").addClass('center3').appendTo(
                $("<div>").addClass('center2').appendTo(
                    this.element
                )
            )
        );
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.inner.html(value.get());
        return this;
    },
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('text-align',this.options['x-align']);
        this.element.children(".center2").css('vertical-align',this.options['y-align']);
        this.inner.css('width',this.options['content-width']);
        this.inner.css('height',this.options['content-height']);
    },
    _klass: "centering-decorator decorator thing",
    _type: "centering-decorator",
    _defaults: {
        'x-align': "center",
        'y-align': 'center',
        'content-width': '',
        'content-height': ''
    },
    _schema: {
       "type":"object",
       "properties":{
          "x-align":{
             "enum": ["left","center","right"],
             "type":"string",
             "required":true // TODO
          },
          "y-align":{
             "enum": ["top","middle","bottom"],
             "type":"string",
             "required":true // TODO
          },
          "content-width":{
             "type":"string",
             "required":true // TODO
          },
          "content-height":{
             "type":"string",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = CenteringDecorator

},{"./Empty":23,"./Thing":41}],21:[function(require,module,exports){
var RaphaelThing = require("./RaphaelThing")

// TODO kdyz zmenim parametry hodin a ulozim, nepromitne se to do inputu

var Clock = RaphaelThing.extend({
    refresh: function() {
        this.base();
        var 
            o = this.options,
            size = o.size,
            canvas = this.canvas,
            clock = canvas.circle(size*.5,size*.5, size * .475);
        clock.attr({"fill":o.fillColor,"stroke":o.strokeColor,"stroke-width":(size*.025)})
        var hour_sign;
        for(i=0;i<12;i++){
            var start_x = size*.5+Math.round((size*.4)*Math.cos(30*i*Math.PI/180));
            var start_y = size*.5+Math.round((size*.4)*Math.sin(30*i*Math.PI/180));
            var end_x = size*.5+Math.round((size*.45)*Math.cos(30*i*Math.PI/180));
            var end_y = size*.5+Math.round((size*.45)*Math.sin(30*i*Math.PI/180));
            hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
        }
        this.hour_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.25) + "");
        this.hour_hand.attr({stroke: o.hourHandColor, "stroke-width": size*.03});
        this.minute_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.2) + "");
        this.minute_hand.attr({stroke: o.minuteHandColor, "stroke-width": size*.02});
        this.second_hand = canvas.path("M" + size*.5 + " " + (size*.55) + "L" + size*.5 + " " + (size*.125) + "");
        this.second_hand.attr({stroke: o.secondHandColor, "stroke-width": size*.01});
        var pin = canvas.circle(size*.5, size*.5, size*.025);
        pin.attr("fill", o.pinColor);

        var self = this;
        var updater = function() {
            self.update();
        };
        updater();
        setInterval(updater,1000); 
    },
    update: function() {
        var self = this,
            size = this.options.size,
            now = new Date(),
            hours = now.getHours(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds(),
            cc = ","+(size*.5)+","+(size*.5);
        self.hour_hand.transform('r'+(30*hours+(minutes/2.5))+cc);
        self.minute_hand.transform('r'+(6*minutes)+cc);
        self.second_hand.transform('r'+(6*seconds)+cc);
    },
    _klass: "clock raphael-thing thing",
    _type: "clock",
    _defaults: {
        width: 100,
        height: 100,
        size: 100,
        fillColor: "white", 
        strokeColor: "black", 
        pinColor: "gray",
        hourHandColor:"black", 
        minuteHandColor:"black",
        secondHandColor:"black"
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "size":{
             "type":"integer",
             "required":true
          },
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "fillColor":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "strokeColor": { "type": "string", "required": true, "format": "color" },
          "pinColor": { "type": "string", "required": true, "format": "color" },
          "hourHandColor": { "type": "string", "required": true, "format": "color" },
          "minuteHandColor": { "type": "string", "required": true, "format": "color" },
          "secondHandColor": { "type": "string", "required": true, "format": "color" }
       },
       "additionalProperties":true
    }
});

module.exports = Clock

},{"./RaphaelThing":33}],22:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

// decorator = thing with a single slot named 'content'

// TODO podedit toto vsechno od 'Decorator'
// kvuli reverzibilite dekoratoru by bylo dobre kdyby kazdy menil css properties 'wrapper' divu
var Decorator = Thing.extend({
    init: function() {
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.html(value.get());
        return this;
    },
    unwrap: function() {
        this.replaceWith(this.getSlot('content'));
    },
    _klass: "decorator thing",
    _type: "decorator"
});


module.exports = Decorator
















},{"./Empty":23,"./Thing":41}],23:[function(require,module,exports){
var Thing = require("./Thing")

var Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
        /*
        if(this.parent) this.element.html(
            $("<div>").text(this.parent.getType()+"#"+this.name)
        );
        */
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Empty

},{"./Thing":41}],24:[function(require,module,exports){
var BookViewer = require("./BookViewer")

var ExportBookViewer = BookViewer.extend({
    constructor: function(options) {
        this.base(options);
        this.targetDiv = "#fullscreen"
    },
    init: function() {
        this.base()
        this.setFullscreen(true);
    },
    closeBook: function() {
        // export viewer closes the book
        this.close()
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit

        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+2*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
        }
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    }
});

module.exports = ExportBookViewer


},{"./BookViewer":18}],25:[function(require,module,exports){
var Layout = require("./Layout")
var Empty = require("./Empty")

var GridLayout = Layout.extend({
    init: function() {
        // TODO create grid and slots
        this.cellCount = 0;
        this.cells = {};
        for(var i=0; i<this.options.rows; i++) {
            for(var j=0; j<this.options.columns; j++) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
        }
    },
    // options changed...
    refresh: function() {
        this.base();
        var gap = this.options.gap;
        var cols = this.options.columns;
        var rows = this.options.rows;
        if(cols*rows != this.cellCount) {
          // resize grid...
          if(cols*rows < this.cellCount) {
            // truncate array...
            while(this.cellCount > rows*cols) {
                this.cellCount--;
                this.removeSlot(this.cellCount)
            }
          } else {
            // expand array by adding new elements
            while(this.cellCount<rows*cols) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
          }          
        }
        var ww = Math.round(10*(100 - (cols-1)*gap)/cols)/10;
        var hh = Math.round(10*(100 - (rows-1)*gap)/rows)/10;
        var xx = 0;
        var yy = 0;
        var ndx = 0;
        for(var i=0; i<rows; i++) {
            for(var j=0; j<cols; j++) {
                this.cells[ndx].css({
                    "width": ww+"%",
                    "height": hh+"%",
                    "left": xx+"%",
                    "top": yy+"%"
                });
                ndx++;
                xx += ww + gap;
            }
            xx = 0;
            yy += hh + gap;
        }
    },
    setSlot: function(key, value) {
        if(!!this.cells[key]) {
          this.base(key, value);
          this.cells[key].empty().append(value.get());
        }
        return this;
    },
    removeSlot: function(key) {
        if(this.hasSlot(key)) {
          this.cells[key].remove()
          delete this.cells[key]                
          this.base(key);
        }
    },
    _klass: "grid-layout layout thing",
    _type: "grid-layout",
    _defaults: {
        rows: 3, // nemelo by se menit za behu
        columns: 3, // nemelo by se menit za behu
        gap: 2 // v procentech
    },
    _schema: {
       "type":"object",
       "properties":{
          "rows":{
             "type":"integer",
             "required":true
          },
          "columns":{
             "type":"integer",
             "required":true
          },
          "gap":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = GridLayout


},{"./Empty":23,"./Layout":30}],26:[function(require,module,exports){
var Layout = require("./Layout")
var Slot = require("./Slot")

// TODO metody na prohazovani elementu - move to front/back, move up, move down
// TODO metody insert/delete?
// TODO -> DynamicLayout


var GrowableLayout = Layout.extend({
    init: function() {
        this.cells = []; // v tomto poradi budou v this.element!
        this.cellMap = {}; 
    },
    // remove all slots
    // TODO obsolete, use removeSlots instead
    clear: function() {
        this.element.empty();
        this.cells = [];
        this.cellMap = {};
    },
    length: function() {
        return this.cells.length;
    },
    first: function() {
        return this.cells.length ? this.cells[0] : undefined;
    },
    last: function() {
        return this.cells.length ? this.cells[this.cells.length-1] : undefined;
    },
    nth: function(ndx) {
        return (ndx>=0 && ndx<this.cells.length) ? this.cells[ndx] : undefined;
    },
    isEmpty: function() {
        return this.cells.length;
    },
    // dynamically add slot
    add: function(thing) {        
        var ndx = this.cells.length;
        var slot = new Slot(this, ndx);
        slot.element.appendTo(this.element);
        this.cells.push(slot);
        this.cellMap[ndx] = slot;
        this.setSlot(ndx, thing);
        return slot;
    },
    setSlot: function(key, value) {
        // TODO implement hasSlot
        this.base(key, value);
        this.cellMap[key].set(value);
        return this;
    },
    removeSlots: function() {
        // remove slot content...
        this.clearSlots(); 
        // remove slots proper...
        this.element.empty();
        this.slots = {};
        this.cells = [];
        this.cellMap = {};
    },
    setSlots: function(slots) {
        // remove existing slots...
        this.removeSlots();
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.add(slots[key]);
            }
        }
    },
    _klass: "growable-layout layout thing",
    _type: "growable-layout",
    _defaults: {
        "css": "" //"mykkro-flow-layout"
    },
    _schema: {
       "type":"object",
       "properties":{
          "css":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }
});

module.exports = GrowableLayout



},{"./Layout":30,"./Slot":38}],27:[function(require,module,exports){
var Thing = require("./Thing")

var Html = Thing.extend({
    init: function() {
        this.inner = $("<div>");
        this.element.html(this.inner);
    },
    refresh: function() {
        this.base();
        this.inner.html(this.options.html).attr('class',this.options.innerCss);
    },
    _klass: "html thing",
    _type: "html",
    _defaults: {
        html: ""
    },
    _schema: {
       "type":"object",
       "description":"Html properties",
       "properties":{
          "html":{
             "type":"string",
             "required":true
          },
          "css":{
             "type":"string",
             "required":false
          },
          "innerCss":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});

module.exports = Html


},{"./Thing":41}],28:[function(require,module,exports){
var Thing = require("./Thing")

var Imager = Thing.extend({
    refresh: function() {
        var img = $("<div>")
            .css("background-image",'url("'+this.options.url+'")')
            .css('background-position',this.options['position'])
            .css('background-repeat',this.options['repeat'])
            .css('background-color',this.options['color'])
            .css('background-size',this.options['size'])
            .css('-moz-background-size',this.options['size'])
            .css('-webkit-background-size',this.options['size']);
        this.element.html(img);
    },
    _klass: "imager thing",
    _type: "imager",
    _defaults: {
        "url": "images/demo/australie1.jpg",
        "repeat": "no-repeat",
        "position": "center center",
        "color": "white",
        "size": "cover" 
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "color": {
			    "type":"string",
			    "id": "color",
			    "required":true,
                "format": "color"
		    },
		    "position": {
			    "type":"string",
			    "id": "position",
			    "required":true
		    },
		    "repeat": {
			    "type":"string",
			    "id": "repeat",
			    "required":true
		    },
		    "size": {
			    "type":"string",
			    "id": "size",
                "enum":["cover","contain"],
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "my-image-uri",
			    "required":true
		    }
	    }
    }

});

module.exports = Imager

},{"./Thing":41}],29:[function(require,module,exports){
var Decorator = require("./Decorator")

var InsetDecorator = Decorator.extend({
    refresh: function() {
	this.base();
        this.element.css('padding',this.options.top+'% '+this.options.right+"% "+this.options.bottom+"% "+this.options.left+"%");
    },
    _klass: "inset-decorator decorator thing",
    _type: "inset-decorator",
    _defaults: {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
    },
    _schema: {
	"type":"object",
	"$schema": "http://json-schema.org/draft-03/schema",
	"properties":{
		"bottom": {
			"type":"number",
			"id": "bottom",
			"required":true
		},
		"left": {
			"type":"number",
			"id": "left",
			"required":true
		},
		"right": {
			"type":"number",
			"id": "right",
			"required":true
		},
		"top": {
			"type":"number",
			"id": "top",
			"required":true
		}
	},
       "additionalProperties":true
    }

});


module.exports = InsetDecorator
},{"./Decorator":22}],30:[function(require,module,exports){
var Thing = require("./Thing")

var Layout = Thing.extend({
    _klass: "layout thing",
    _type: "layout"
});

module.exports = Layout








},{"./Thing":41}],31:[function(require,module,exports){
var Decorator = require("./Decorator")

var OpacityDecorator = Decorator.extend({
    refresh: function() {
      this.base();
      this.element.css('opacity',this.options.opacity);
    },
    _klass: "opacity-decorator decorator thing",
    _type: "opacity-decorator",
    _defaults: {
        opacity: 0.8
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "opacity":{
             "type":"number",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = OpacityDecorator
},{"./Decorator":22}],32:[function(require,module,exports){
var Thing = require("./Thing")

var PlayerControls = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    init: function() {
        var self = this;
        var cont = $("<div>").addClass('controls').appendTo(this.element);
        this._playBtn = $("<button>")
            .addClass("play").append($("<span>").text("Play"))
            .appendTo(cont).click(function() { self.onPlay(); });
        this._pauseBtn = $("<button>")
            .addClass("pause").append($("<span>").text("Pause"))
            .appendTo(cont).click(function() { self.onPause(); });
        this._stopBtn = $("<button>")
            .addClass("stop").append($("<span>").text("Stop"))
            .appendTo(cont).click(function() { self.onStop(); });
        this.controls = cont;
        this.playing = false;
        this.paused = false;
    },
    refresh: function() {
        this.base();
        this.controls.toggleClass('playing', this.playing);
        this._playBtn.prop('disabled', this.playing);
        this._pauseBtn.prop('disabled', !this.playing);
        this._stopBtn.prop('disabled', !(this.playing/* || this.paused*/));    
        if(this.playing) {
            this._playBtn.hide();
            this._pauseBtn.show();
        } else {
            this._playBtn.show();
            this._pauseBtn.hide();
        }        
        if(this.playing/* || this.paused*/) {
            this._stopBtn.show();
        } else {
            this._stopBtn.hide();
        }
    },
    updateGui: function(playing, paused) {
        this.playing = playing;
        this.paused = paused;
        this.refresh();
    },
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this.updateGui(true, false);
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this.updateGui(false, true);
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this.updateGui(false, false);
            this._onstop(kb);
        }
    },
    _klass: "player-controls thing",
    _type: "player-controls",
    _defaults: {
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
	    }
    }
});

module.exports = PlayerControls

},{"./Thing":41}],33:[function(require,module,exports){
var Thing = require("./Thing")

var RaphaelThing = Thing.extend({
    refresh: function() {
        var o = this.options;
        var div = $("<div>");
        this.element.html(div);
        var paper = Raphael(div.get(0), "100%","100%");
        paper.setViewBox(0, 0, o.width, o.height, true);
        this.canvas = paper;
    },
    _klass: "raphael-thing thing",
    _type: "raphael-thing",
    _defaults: {
        width: 100,
        height: 100
    },
    _schema: {
       "type":"object",
       "description":"RaphaelThing properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RaphaelThing

},{"./Thing":41}],34:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

var RefDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>").addClass("mykkro-ref-decorator-content")
        this._control = $("<a>").addClass('ref-link mykkro-ref-decorator-control')
        this._tooltip = $("<div>").addClass("hidden ref-tooltip")
        this.element.append(
            this._content,
            this._tooltip,
            this._control
        )
        this._control.qtip({content: { text: this._tooltip } })
        this.setSlot('content', new Empty())
    },
    refresh: function() {
        this.base()
        var label = this.options.label || "?"
        var src = this.options.source
        this._tooltip.empty().append($("<p>").text(__("Originally from:")))
        // TODO tohle nejak blbne...
        //if(Common.isValidUrl(src)) {
        if(src.startsWith("http")) {
            this._tooltip.append(
                $("<p>").append($("<a>").attr("href", src).text(src))
            )
            this._control.text(label).attr("href", src)
        } else {
            this._tooltip.append(
                $("<p>").text(src)
            )
            this._control.text(label).attr("href", "#").click(function() { return false;})
        }
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this._content.html(value.get());
        return this;
    },
    showToolbar: function() {
        this.options.hidden = false;
        this.refresh();
    },
    hideToolbar: function() {
        this.options.hidden = true;
        this.refresh();
    },
    /*
    serialize: function() {
        return this.getSlot('content').serialize();
    },
    */
    // pouziva se toto nekde?
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    /* ref decorator won't be editable */
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "ref-decorator thing",
    _type: "ref-decorator",
    _defaults: {
        label: null,
        source: "http://www.google.com"
    },
    _schema: {
       "type":"object",
       "properties":{
          "label":{
             "type":"string",
             "required":false
          },
          "source":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RefDecorator

},{"./Empty":23,"./Thing":41}],35:[function(require,module,exports){
var Thing = require("./Thing")

var RefList = Thing.extend({
    init: function() {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
    },
    refresh: function() {
        this.base();
    },
    // refs = array of ref decorator objects
    setReferences: function(refs) {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
      var list = $("<ul>").appendTo(this.element)
      if(refs) {
        for(var i=0; i<refs.length; i++) {
          list.append(this.makeReference(refs[i], i))
        }
      } else {
        this.element.append($("<p>").text(__("No references found.")))
      }
    },
    makeReference: function(ref, index) {
      return $("<li>").append(
        $("<span>").addClass("ref-link").text(index+1),
        $("<span>").addClass("ref-label").text(ref.options.source)
      )
    },
    _klass: "ref-list thing",
    _type: "ref-list",
    _defaults: {
    },
    _schema: {
       "type":"object",
       "description":"References List properties",
       "properties":{
       },
       "additionalProperties":true
    }

});

module.exports = RefList
},{"./Thing":41}],36:[function(require,module,exports){
var BorderDecorator = require("./BorderDecorator")

var RoundedDecorator = BorderDecorator.extend({
    refresh: function() {
        this.base();
        var br = this.options.radius;
        // TODO individualne vsechny 4 rohy
        this.element.css('border-radius',br);
        this.element.css('-webkit-border-radius',br);
        this.element.css('-moz-border-radius',br);
    },
    _klass: "rounded-decorator decorator thing",
    _type: "rounded-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black',
        radius: "5%"
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "style":{
             "type":"string",
             "enum": ["none","solid","dotted","dashed","double","groove","ridge","inset","outset"],
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "radius":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = RoundedDecorator


},{"./BorderDecorator":19}],37:[function(require,module,exports){
var Decorator = require("./Decorator")

var ShadowDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
	this.base();
        var br = this.options['h-shadow']+" "+this.options['v-shadow']+" "+this.options.blur+" "+this.options.spread+" "+this.options.color;
        this.element.css('box-shadow',br);
        this.element.css('-webkit-box-shadow',br);
    },
    _klass: "shadow-decorator decorator thing",
    _type: "shadow-decorator",
    _defaults: {
        'h-shadow': "5px",
        'v-shadow': "5px",
        blur: "5px",
        spread: "5px",
        color: "#666"
    },
    _schema: {
       "type":"object",
       "properties":{
          "h-shadow":{
             "type":"string",
             "required":true
          },
          "v-shadow":{
             "type":"string",
             "required":true
          },
          "blur":{
             "type":"string",
             "required":true
          },
          "spread":{
             "type":"string",
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = ShadowDecorator


},{"./Decorator":22}],38:[function(require,module,exports){
var Base = require("basejs")

var Slot = Base.extend({
    constructor: function(parent, name) {
        this.name = name;
        this.parent = parent;
        this.element = $("<div>").addClass("mykkro-slot").attr('data-name', name);
        this.thing = null;
    },
    empty: function() {
        this.element.empty();
        this.thing = null;
    },
    set: function(thing) {
        this.element.empty().append(thing.get());
        this.thing = thing;
    },
    get: function() {
        return this.thing;
    }
});

module.exports = Slot

},{"basejs":6}],39:[function(require,module,exports){
var Layout = require("./Layout")
var Empty = require("./Empty")

// TODO vertical split
var SplitLayout = Layout.extend({
    init: function() {
        this.first = $("<div>");
        this.second = $("<div>");
        this.element.append(this.first).append(this.second);
        this.setSlot('first', new Empty());
        this.setSlot('second', new Empty());
    },
    // options changed...
    refresh: function() {
        this.base();
        var first = this.options.ratio + "%";
        var gap = this.options.gap + "%";
        var xx = (this.options.ratio + this.options.gap) + "%";
        var second = (100 - this.options.ratio - this.options.gap) + "%";
        if(this.options.horizontal) {
            this.first.css("left","0px").css("top","0px").css("width",first).css('height','100%');
            this.second.css("left",xx).css("top","0px").css("width",second).css('height','100%');
        } else {
            this.first.css("left","0px").css("top","0px").css("height",first).css('width','100%');
            this.second.css("left","0px").css("top",xx).css("height",second).css('width','100%');
        }
    },
    setSlot: function(key, value) {
        // TODO implement hasSlot
        this.base(key, value);
        if(key=='first') {
            this.first.empty().append(value.get());
        }
        if(key=='second') {
            this.second.empty().append(value.get());
        }
        return this;
    },
    _klass: "split-layout layout thing",
    _type: "split-layout",
    _defaults: {
        ratio: 70, // v %
        gap: 2, // v %
        horizontal: false
    },
    _schema: {
       "type":"object",
       "properties":{
          "horizontal":{
             "type":"boolean",
             "required":true
          },
          "ratio":{
             "type":"integer",
             "required":true
          },
          "gap":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = SplitLayout

},{"./Empty":23,"./Layout":30}],40:[function(require,module,exports){
var Html = require("./Html")

var TextThing = Html.extend({
    refresh: function() {
        this.base();
        var o = this.options;
        if(o['h-align'] && o['h-align'] != 'center') this.inner.addClass(o['h-align']);
        if(o['v-align'] && o['v-align'] != 'center') this.inner.addClass(o['v-align']);
        this.inner.css('font-size', o['font-size']);
        this.inner.css('font-family', o['font-family']);
    },
    _klass: "text-thing html thing",
    _type: "text-thing",
    _defaults: {
        "html": "",
        "css": "",
        "h-align": "center",
        "v-align": "center",
        "font-size": "20px",
        "font-family": "Georgia, serif"
    },
    _schema: {
       "type":"object",
       "properties":{
          "html":{
             "type":"string",
	     "format":"richtext",
             "required":true
          },
          "h-align":{
             "type":"string",
             "enum":["left","center","right"],
             "required":false
          },
          "v-align":{
             "type":"string",
             "enum":["top","center","bottom"],
             "required":false
          },
          "font-size":{
             "type":"string",
             "enum":["50%","60%","75%", "85%", "100%", "120%", "150%", "175%", "200%", "250%"],
             "required":false
          },
          "font-family":{
             "type":"string",
             "enum":[
'Arial,Arial,Helvetica,sans-serif',
'Arial Black,Arial Black,Gadget,sans-serif',
'Comic Sans MS,Comic Sans MS,cursive',
'Courier New,Courier New,Courier,monospace',
'Georgia,Georgia,serif',
'Impact,Charcoal,sans-serif',
'Lucida Console,Monaco,monospace',
'Lucida Sans Unicode,Lucida Grande,sans-serif',
'Palatino Linotype,Book Antiqua,Palatino,serif',
'Tahoma,Geneva,sans-serif',
'Times New Roman,Times,serif',
'Trebuchet MS,Helvetica,sans-serif',
'Verdana,Geneva,sans-serif' 
],
             /*"format":"font",*/
             "required":false
          }
       },
       "additionalProperties":true
    }
});


module.exports = TextThing
},{"./Html":27}],41:[function(require,module,exports){
var Base = require("basejs")

Array.prototype.toObject = function() {
    var out = {};
    for(var i=0; i<this.length; i++) {
        out[i] = this[i];
    }
    return out;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var DEBUG = false

var _Empty
// kazda 'vec' ma options (s defaultni hodnotou) a slots
var Thing = Base.extend({
    constructor: function(options, slots) {
        this.options = $.extend({}, this.defaults(), options);        
        this.tid = Thing.tid++;
        Thing.things[this.tid] = this;
        this.element = $("<div>").addClass(this.getClass()).attr("data-tid", this.tid);
        if(DEBUG) {
            this.element.css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));
        }
        this.slots = {};
        this.parent = null;
        this.name = null;
        // initializing...
	    this.slotChanged($.noop);
        this.init();
        this.setSlots(slots);
        // display update
        this.refresh();
    },
    copy: function() {
        return Thing.create(this.serialize());
    },
    remove: function() {
        this.replaceWith(new _Empty());        
    },
    replaceWith: function(thing) {
        if(this.parent) {
            this.parent.setSlot(this.name, thing);
            this.parent = null;
            this.name = null;           
            Thing.things[this.tid] = null;
        }
    },
    // obali this dekoratorem
    decorate: function(deco) {
        if(this.parent) {
            var par = this.parent;
            var slot = this.name;
            deco.setSlot('content', this);
            par.setSlot(slot, deco);
            return deco;
        }
    },
    serialize: function() {
        var slots = {};
        var numslots = 0;
        for(var key in this.slots) {
            slots[key] = this.slots[key].serialize();
            numslots++;
        }
        var obj = {
            type: this.getType(),
            options: this.options
        };
        if(numslots) obj.slots = slots
        return obj;
    },
    getType: function() {
        return this._type;
    },
    getClass: function() {
        return this._klass.split(" ").map(function(a){return "mykkro-"+a;}).join(" ");
    },
    init: function() {
        // create structure and variables
    },
    refresh: function() {
        // options changed...
        this.element.attr('class','');
        this.element.addClass(this.getClass());
        this.element.addClass(this.options.css);
    },
    get: function() {
        return this.element;
    },
    defaults: function() {
        return this._defaults;
    },
    // muzeme se dostat takhle i ke slotu ve slotu
    content: function(key, value) {
        var ndx = key.indexOf(".");
        if(ndx>=0) {
            // odkazujeme se na slot ve slotu
            var newKey = key.substring(0,ndx);
            var rest = key.substring(ndx+1);
            return this.getSlot(newKey).content(rest, value);
        }
        if(this.hasSlot(key)) {
            if(value) {
                // setter
                this.setSlot(key, value);
                return this;
            } else {
                // getter
                return this.getSlot(key);
            }
        } else {
            // unknown slot!
            return null;
        }
    },
    hasSlot: function(key) {
        return !!this.slots[key];
    },
    getSlot: function(key) {
        return this.slots[key];
    },
    setSlot: function(key, thing) {
        this.slots[key] = thing;
        thing._setParent(this, key);
        // DOM manipulation - to be overridden
	    this.slotChanged(key);
        return this;
    },
    removeSlot: function(key) {
        delete this.slots[key]
    },
    clearSlots: function() {
        for(var key in this.slots) {
            this.setSlot(key, new _Empty());
        }
    },
    setOptions: function(opts) {
        this.options = $.extend(this.options, opts);
        this.refresh();
	    this.slotChanged('options');
    },
    setSlots: function(slots) {
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.setSlot(key, slots[key]);
            }
        }
    },
    _setParent: function(parent, key) {
        this.parent = parent;
        this.name = key;
    },
    isEmpty: function() {
        return this.getType() == "empty";
    },
    slotChanged: function(arg) {
        if(typeof arg == "function") {
            this.onslotchanged = arg;
        } else {
            return this.onslotchanged(this, arg);
        }
    },    
    // bez parametru vraci rekurzivne vsechny sloty
    findSlots: function(predicate, out) {
        if(!predicate) predicate = function() { return true; };
        if(!out) out = [];
        if(predicate(this)) out.push(this);
        for(var key in this.slots) {
            this.slots[key].findSlots(predicate, out);
        }
        return out;
    },
    findEmptySlots: function(out) {
        return this.findSlots(function(thing) { return thing.isEmpty(); }, out)
    },
    findSlotsByType: function(type, out) {
        return this.findSlots(function(thing) { return thing.getType() == type; }, out)
    },
    getTree: function() {
        var node = { type: this.getType(), children: {} };
        for(var key in this.slots) {
            node.children[key] = this.slots[key].getTree();
        }
        return node;
    },
    _toggleTreeView: function(node) {
        node.children(".slots").toggleClass('collapsed');
    },
    // TODO mohlo by si to pamatovat expands/collapse mezi updaty
    /* example decorator:
        decorator = function(thing, node) {
            $("<div>").addClass("toolz").insertAfter(node.find(">h2"));
        };
    */
    getTreeView: function(decorator) {
        var self = this;
        var node = $("<div>").addClass('node').attr('data-type', this.getType()).attr('data-tid', this.tid);
        var hdr = $("<h2>").text(this.getType()).appendTo(node);
        var slots = $("<div>").addClass('slots').appendTo(node);
        hdr.click(function() {
            self._toggleTreeView(node);
        });
        for(var key in this.slots) {
            (function(){
                var subtree = self.slots[key].getTreeView(decorator);
                var subheading = $("<h3>").text(key).click(function() {
                    $(this).toggleClass('collapsed');
                    self._toggleTreeView(subtree);
                });
                slots.append(subheading);
                slots.append(subtree);
            })();
        }
        node.append($("<div>").addClass('clear'));
        if(decorator) decorator(this, node);
        return node;
    },
    _type: "thing",
    _defaults: {
        "css": ""
    },
    _klass: "thing",
    _schema: {
       "type":"object",
       "properties":{
       },
       "additionalProperties":true
    }

}, {
    tid: 0,
    things: {}
});

_Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Thing

},{"basejs":6}],42:[function(require,module,exports){
var Thing = require("./Thing")

var convertUri = function(uri, baseUri) {
    // TODO if uri starts with '/' or 'http://', leave it be
    // else prepend baseUri
    return baseUri + "/" + uri
}

var Things = {
    klasses: {
        "audio-decorator": require("./AudioDecorator"),
        "book": require("./Book"),
        "background-decorator": require("./BackgroundDecorator"),
        "border-decorator": require("./BorderDecorator"),
        "clock": require("./Clock"),
        "empty": require("./Empty"),
        "grid-layout": require("./GridLayout"),
        "growablelayout": require("./GrowableLayout"),
        "imager": require("./Imager"),
        "inset-decorator": require("./InsetDecorator"),
        "layout": require("./Layout"),
        "opacity-decorator": require("./OpacityDecorator"),
        "ref-decorator": require("./RefDecorator"),
        "ref-list": require("./RefList"),
        "rounded-decorator": require("./RoundedDecorator"),
        "shadow-decorator": require("./ShadowDecorator"),
        "split-layout": require("./SplitLayout"),
        "text-thing": require("./TextThing"),
        "tubeplayer-thing": require("./TubeplayerThing"),
        "video-thing": require("./VideoThing"),
    },
    create: function(def, opts) {
        if(!def) {
            return new Empty();
        }
        // udelat deserializaci
        // { type, options, slots }
        var klassName = def.type.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
        klassName = klassName.capitalize();
        var klazz = Things.klasses[def.type];
        if(!klazz) {
            throw new Error("Unknown thing type: "+def.type)
        }
        var slots = def.slots;
        var oid = def.id;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.create(slots[key]);
        }
        var thing = new klazz($.extend(def.options, opts), slots);
        thing.oid = oid
        return thing
    },
    convertURIs: function(def, baseUri) {
        if(!def || !baseUri) {
            return def
        }
        var out = $.extend({}, def)
        var type = out.type
        if(type == "book") {
            out.options.background_image_url = convertUri(out.options.background_image_url, baseUri)
            out.options.frontpage_image_url = convertUri(out.options.frontpage_image_url, baseUri)
            out.options.backpage_image_url = convertUri(out.options.backpage_image_url, baseUri)
            out.options.oddpage_image_url = convertUri(out.options.oddpage_image_url, baseUri)
            out.options.evenpage_image_url = convertUri(out.options.evenpage_image_url, baseUri)
            out.options.turnleft_image_url = convertUri(out.options.turnleft_image_url, baseUri)
            out.options.turnright_image_url = convertUri(out.options.turnright_image_url, baseUri)
        } else if(type == "imager") {
            out.options.url = convertUri(out.options.url, baseUri)
        } else if(type == "audio-decorator") {
            out.options.uri = convertUri(out.options.uri, baseUri)
        } else if(type == "video-thing") {
            out.options.uri = convertUri(out.options.uri, baseUri)
        }
        var slots = out.slots;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.convertURIs(slots[key], baseUri);
        }
        return out
    }    
}


module.exports = Things

},{"./AudioDecorator":15,"./BackgroundDecorator":16,"./Book":17,"./BorderDecorator":19,"./Clock":21,"./Empty":23,"./GridLayout":25,"./GrowableLayout":26,"./Imager":28,"./InsetDecorator":29,"./Layout":30,"./OpacityDecorator":31,"./RefDecorator":34,"./RefList":35,"./RoundedDecorator":36,"./ShadowDecorator":37,"./SplitLayout":39,"./TextThing":40,"./Thing":41,"./TubeplayerThing":43,"./VideoThing":44}],43:[function(require,module,exports){
var Thing = require("./Thing")

$.tubeplayer.defaults.afterReady = function($player) {
    console.log($player)
    // TODO resize only single player
	$(".tubeplayer-wrapper").resize()
}

var TubeplayerThing = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    thumbnailUrl: function() {
        return $.jYoutube(this.options.name, 'small');
    },
    init: function() {
    	this.wrapper = $("<div>").addClass("tubeplayer-wrapper")
        this.glasspane = $("<div>").addClass("tubeplayer-glasspane")        
        var self = this
		self.wrapper.resize(function(e) {
			console.log("Resizing! width="+self.wrapper.width()+", height="+self.wrapper.height())
			self.adjustPlayerSize()
		})        
		console.log("Initialized!")
    },
    play: function() {
        this._play();
    },
    _play: function() {
        this.player.tubeplayer("play")
        this.onPlay();
    },
    _pause: function() {
        this.player.tubeplayer("pause")
        this.onPause();
    },
    _stop: function() {
        this.player.tubeplayer("stop")
        this.onStop();
    },
    _kill: function() {
        this.player.tubeplayer("destroy")
        this.player.remove()
        this.player = null
        this.onKill();
    },
    _setVolume: function(vol) {
        this.player.tubeplayer("volume", vol)
    },
    adjustPlayerSize: function() {
    	var self = this    	
    	console.log("Adjusting player size! width="+self.wrapper.width()+", height="+self.wrapper.height())
        self.player.tubeplayer("size", {
			width: self.wrapper.width(), 
			height: self.wrapper.height()
		})
    },
    refresh: function() {
        this.base();
        if(this.player) {
            //this.player.tubeplayer("destroy")
            this.player.remove()
            this.player = null
        }
        this.player = $("<div>").addClass("tubeplayer-container")
        this.element.html(this.wrapper.empty().append(
            this.player
            // this.glasspane
        ))
        var self = this;
        var o = self.options
		self.player.tubeplayer({
			allowFullScreen: false,
			autoPlay: false,
			showControls: 0,
            initialVideo: o.name,
            preferredQuality: o.quality,
            autoPlay: o.autoplay,
            onPlayerUnstarted: function(){},
			onPlay: function(id){}, // after the play method is called
			onPause: function(){}, // after the pause method is called
			onStop: function(){}, // after the player is stopped
			onSeek: function(time){}, // after the video has been seeked to a defined point
			onMute: function(){}, // after the player is muted
			onUnMute: function(){} // after the player is unmuted
		})		
        // console.log(self.player.tubeplayer("player"))
        self._setVolume(o.volume)
    },
    _klass: "tubeplayer-thing thing",
    _type: "tubeplayer-thing",
    _defaults: {
        "name": "ydRAb9cwHnA",
        'quality': "default",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "name": {
			    "type":"string",
                "format": "string",
			    "required":true
    	    },
		    "quality": {
			    "type":"string",
                "format": "string",
			    "required":true
    	    },
            "volume":{
                "type":"integer",
                "required":true // TODO
            },
            "autoplay":{
                "type":"boolean",
                "required":true // TODO
            },
            "loop":{
                "type":"boolean",
                "required":true // TODO
            }
	    }
    }

});

module.exports = TubeplayerThing
},{"./Thing":41}],44:[function(require,module,exports){
var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")

var VideoThing = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    init: function() {
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.video.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.video.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        //this.video.get(0).pause();
        //this.video.get(0).currentTime = 0;
        // regenerate player...
        this.refresh();  // TODO udelat to lepe
        this.onStop();
    },
    _kill: function() {
        this.video.get(0).pause();
        this.video.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.video.get(0).volume = vol / 100.0;
    },
    _addSource: function(uri, type) {
        if(uri) {
            $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.video);
        }
    },
    refresh: function() {
        this.base();
        var self = this;
        this.video = $("<video>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.video)
            .append(this.pane);

        this.video.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg' || ext == 'ogv') ? this.options.uri : '';
            this.options.mp4 = (ext == 'mp4') ? this.options.uri : '';
            this.options.webm = (ext == 'webm') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'video/ogg; codecs="theora, vorbis"');
        this._addSource(this.options.mp4, 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        this._addSource(this.options.webm, 'video/webm; codecs="vp8, vorbis"');
        ////this.video.get(0).src = this.options.uri;
        // TODO tohle nejak zlobi v Chrome, pri znovuvytvareni videi... ale ve FF to zda se funguje

        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
        this.video.on('canplay canplaythrough', function(){
            console.log('canplay event fired');
        });
    },
    _klass: "video-thing thing",
    _type: "video-thing",
    _defaults: {
        "uri": "",
        'ogg': "",
        'mp4': "",
        'webm': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "uri": {
			    "type":"string",
                "format": "my-video-uri",
			    "required":true
    	    },
            "volume":{
                "type":"integer",
                "required":true // TODO
            },
            "autoplay":{
                "type":"boolean",
                "required":true // TODO
            },
            "loop":{
                "type":"boolean",
                "required":true // TODO
            }
	    }
    }

});


/*

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('vid');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var cw = canvas.clientWidth;
    var ch = canvas.clientHeight;
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context);
    },false);

},false);

var mode = 'stretch';
function draw(v,c) {
    var canvas = document.getElementById('canvas');
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if(v.paused || v.ended) return false;
    if(mode == 'stretch') {
        c.drawImage(v,0,0,w,h); //-> stretch
    } else if(mode == 'cover') {
        // TODO tady je neco spatne
        var sx=0, sy=0, sw=v.width, sh=v.height;
        if(sw/sh < w/h) {
            sy = (sh - h*sw/w)/2;
            sh = h*sw/w;
        } else {
            sx = (sw - w*sh/h)/2;
            sw = w*sh/h;
        }
        c.drawImage(v,sx,sy,sw,sh,0,0,w,h); 
    } else { // contain
        var ww = v.width;
        var hh = v.height;
        var x = y = 0;
        if(ww/hh < w/h) {
            x = (w-ww*h/hh)/2;
            c.drawImage(v,x,0,ww*h/hh,h); 
        } else {
            y = (h-hh*w/ww)/2;
            c.drawImage(v,0,y,w,hh*w/ww); 
        }
    }
    setTimeout(draw,20,v,c);
}

<canvas id="canvas"></canvas>

*/

module.exports = VideoThing

},{"./CenteringDecorator":20,"./PlayerControls":32,"./Thing":41}],"pagescript":[function(require,module,exports){
module.exports=require('Bkkh3s');
},{}],"Bkkh3s":[function(require,module,exports){
module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var ExportBookViewer = require("./js/things/ExportBookViewer")
    var Things = require("./js/things/Things")
    var SelectChain = require("../../../js/SelectChain")

    var path = require("path")

    var ScrapbookPage = BasePage.extend({
        init: function(data, next) {
            var url = require("url")
            var appName = data.query.importname
            var self = this

            /* use data to modify page */
            var quitBtn = this.getWidget("quitButton")
            var favButton = this.getWidget("favButton")
            var unfavButton = this.getWidget("unfavButton")

            function setFavState(flag) {
                if (flag) {
                    favButton.disable()
                    unfavButton.enable()
                } else {
                    favButton.enable()
                    unfavButton.disable()
                }
            }
            /*
			FavApps.starred(userId, appId, function(err, data) {
				setFavState(!err && data)
			})
			favButton.click(function() {
				FavApps.star(userId, appId, function(err, data) {
					if(!err) setFavState(true)
				})					
			})
			unfavButton.click(function() {
				FavApps.unstar(userId, appId, function(err, data) {
					if(!err) setFavState(false)
				})					
			})
*/
            quitBtn.click(function() {
                // move back to previous page...
                self.goBack()
            })

            this.selectChain = new SelectChain([
                quitBtn.element
            ])

            var baseUrl = "/imports/" + appName
            var metadataUrl = baseUrl + "/book.json"

            var bookView
            $.getJSON(metadataUrl).done(function(book) {
                // convert all relative URIs
                book = Things.convertURIs(book, baseUrl)
                // create book view...
                bookView = new ExportBookViewer({data:book, fullscreen:true, logger: Wow.logger, uuid: appName});
                bookView.init();
                self.bookView = bookView
                // continue when finished 
                if (next) next(self)
            }).fail(function(err) {
                console.error(err)
                if (next) next(self)
            })
        },
        onVirtualControl: function(evt) {
            switch (evt.control) {
                case "home":
                    this.goToHomePage()
                    break;
                case "left":
                    this.bookView.turnNext()
                    break;
                case "right":
                    this.bookView.turnPrevious()
                    break;
                case "up":
                    this.selectChain.selectPrevious()
                    break;
                case "down":
                    this.selectChain.selectNext()
                    break;
                case "select":
                    $(this.selectChain.current()).click()
                    this.selectChain.update()
                    break;
            }
        }

    })
    return ScrapbookPage

}

},{"../../../js/BasePage":1,"../../../js/SelectChain":4,"./js/things/ExportBookViewer":24,"./js/things/Things":42,"path":8,"url":14}]},{},["Bkkh3s"]);