// configuration file
var DEBUG = false;

var Config = {
};
var __ = function(arg) {
    return LocaleStrings[arg] || arg;
}

/*
	Base.js, version 1.1
	Copyright 2006-2007, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
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
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	},

	base: function() {
		// call this method from any other method to invoke that method's ancestor
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});

// requires: jquery

var log = function(what) {
    $("body").prepend($("<pre>").text(what));
}

var ajaxify = function(sel) {
    $(sel || ".ajaxify").each(function() {
        $(this).load($(this).data("target"));
    })
}

// From http://www.terrainformatica.com/?p=13
var delegate = function( that, thatMethod )
{
    if(arguments.length > 2)
    {
        var _params = [];
        for(var n = 2; n < arguments.length; ++n) _params.push(arguments[n]);
        return function() { return thatMethod.apply(that,_params); };
    }
    else
      return function() { return thatMethod.call(that); };
}

var delegate_cp = function( that, thatMethod ) {
    return function() { return thatMethod.apply(that,arguments); }
};

function utf8_encode( s ) {
  return unescape( encodeURIComponent( s ) );
}

function utf8_decode( s ) {
  return decodeURIComponent( escape( s ) );
}

function html_encode( input ) {
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '\'')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function html_decode( input ) {
    return String(input)
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '\"')
        .replace(/'/g, '\'')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

function base64_decode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Thunder.m
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  // *     returns 1: 'Kevin van Zonneveld'
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['atob'] == 'function') {
  //    return atob(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}



function base64_encode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] == 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}

/**
 * Returns the first data element of an object, regardless on its key name.
 */
var extractRoot = function(data) {
  for(var key in data) {
    return data[key];
  }
}


Array.prototype.toObject = function() {
    var out = {};
    for(var i=0; i<this.length; i++) {
        out[i] = this[i];
    }
    return out;
}

// Array.copy() - Copy an array
if( typeof Array.prototype.copy==='undefined' ) {
 Array.prototype.copy = function() {
  var a = [], i = this.length;
  while( i-- ) {
   a[i] = typeof this[i].copy!=='undefined' ? this[i].copy() : this[i];
  }
  return a;
 };
}

// Array.insert( index, value ) - Insert value at index, without overwriting existing keys
Array.prototype.insert = function( i, v ) {
 if( i>=0 ) {
  var a = this.slice(), b = a.splice( i );
  a[i] = v;
  return a.concat( b );
 }
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// Array.random( range ) - Return a random element, optionally up to or from range
Array.prototype.random = function( r ) {
 var i = 0, l = this.length;
 if( !r ) { r = this.length; }
 else if( r > 0 ) { r = r % l; }
 else { i = r; r = l + r % l; }
 return this[ Math.floor( r * Math.random() - i ) ];
};

// Array.shuffle( deep ) - Randomly interchange elements
Array.prototype.shuffle = function( b ) {
 var i = this.length, j, t;
 while( i ) {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }
 return this;
};

// Array.unique( strict ) - Remove duplicate values
Array.prototype.unique = function( b ) {
 var a = [], i, l = this.length;
 for( i=0; i<l; i++ ) {
  if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
 }
 return a;
};

// Array.walk() - Change each value according to a callback function
Array.prototype.walk = function( f ) {
 var a = [], i = this.length;
 while(i--) { a.push( f( this[i] ) ); }
 return a.reverse();
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};

// deprecated: use trimLeft, trimRight
/*
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');}

String.prototype.rtrim=function(){return this.replace(/\s+$/,'');}
*/
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');}

String.prototype.camelCase = function() { 
    var s = this.trim();
    return ( /\S[A-Z]/.test( s ) ) ?
        s.replace( /(.)([A-Z])/g, function(t,a,b) { return a + ' ' + b.toLowerCase(); } ) :
        s.replace( /( )([a-z])/g, function(t,a,b) { return b.toUpperCase(); } );
}

// code generation utilities

var CodeGenUtils = {
    getSetterName: function(name) {
        return "set" + name.capitalize();
    },
    getGetterName: function(name, isBoolean) {
        return (isBoolean ? "is" : "get") + name.capitalize();
    }
}



String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
};


jQuery.fn.swap = function(b) {
    b = jQuery(b)[0];
    var a = this[0];

    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);

    return this;
};


// smallest jQuery plugin :)
jQuery.fn.reverse = [].reverse;


$.extend({
  jYoutube: function( url, size ){
    if(url === null){ return ""; }

    size = (size === null) ? "big" : size;
    var vid;
    var results;

    results = url.match("[\\?&amp;]v=([^&amp;#]*)");

    vid = ( results === null ) ? url : results[1];

    if(size == "small"){
      return "http://img.youtube.com/vi/"+vid+"/2.jpg";
    }else {
      return "http://img.youtube.com/vi/"+vid+"/0.jpg";
    }
  }
});

var makeSvgScalable = function(svg) {
    var el = svg[0];
    var ww = el.getAttribute("width");
    var hh = el.getAttribute("height");
    el.setAttribute('width', '100%');
    el.setAttribute('height', '100%');
    el.setAttribute('viewBox', '0 0 '+ww+' '+hh);
    el.setAttribute('preserveAspectRatio', 'xMidyMid meet');
};

var Common = {
    postJsonData: function(url, data, success, error) {
        $.ajax({
            type: "post",       // Request method: post, get
            url: url,
            data: JSON.stringify(data), 
            dataType: "json",    // Expected response type
            contentType: "application/json",
            cache: false,
            success: success || $.noop,
            error: error || $.noop
        });
    },
    isValidUrl: function(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    }
};

var JQ = {
    button: function(caption, click, parent) {
        var btn = $("<button>").text(caption);
        if(click) btn.click(click);
        if(parent) btn.appendTo(parent);
        return btn;
    },
    linkButton: function(content, click, parent) {
        var btn = JQ.put($("<a>"), content);
        if(click) btn.click(click);
        if(parent) btn.appendTo(parent);
        return btn;
    },
    link: function(content, href, tooltip, parent) {
        var link = JQ.put($("<a>"), content).attr({"title":tooltip, "href":href});
        if(parent) link.appendTo(parent);
        return link;
    },
    ul: function(parent) {
        var ul = $("<ul>");
        if(parent) ul.appendTo(parent);
        return ul;
    },
    li: function(klass, parent) {
        var li = $("<li>").addClass(klass);
        if(parent) li.appendTo(parent);
        return li;
    },
    checkbox: function(name, checked, parent) {
        var input = $("<input>").attr({'type':'checkbox', 'name':name}).prop("checked", checked);
        if(parent) input.appendTo(parent);
        return input;
    },
    textfield: function(name, value, parent) {
        var input = $("<input>").attr({'type':'text', 'name':name, "value":value});
        if(parent) input.appendTo(parent);
        return input;
    },
    span: function(content, klass, parent) {
        var span = JQ.put("span", content).addClass(klass);
        if(parent) span.appendTo(parent);
        return span;
    },
    div: function(content, klass, parent) {
        var div = JQ.put("div", content).addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    p: function(content, klass, parent) {
        var p = JQ.put("p", content).addClass(klass);
        if(parent) p.appendTo(parent);
        return p;
    },
    h1: function(content, klass, parent) {
        return JQ.hN(1, content, klass, parent);
    },
    h2: function(content, klass, parent) {
        return JQ.hN(2, content, klass, parent);
    },
    h3: function(content, klass, parent) {
        return JQ.hN(3, content, klass, parent);
    },
    h4: function(content, klass, parent) {
        return JQ.hN(4, content, klass, parent);
    },
    h5: function(content, klass, parent) {
        return JQ.hN(5, content, klass, parent);
    },
    h6: function(content, klass, parent) {
        return JQ.hN(6, content, klass, parent);
    },
    hN: function(level, content, klass, parent) {
        var heading = JQ.put("h"+level, content).addClass(klass);
        if(parent) heading.appendTo(parent);
        return heading;
    },
    label: function(content, klass, parent) {
        var label = JQ.put("label", content).addClass(klass);
        if(parent) label.appendTo(parent);
        return label;
    },
    clear: function(parent) {
        var clr = $("<div>").addClass("clear");
        if(parent) clr.appendTo(parent);
        return clr;
    },
    show: function(elem, enabled) {
        if(enabled) elem.show(); else elem.hide();
    },
    form: function(klass, parent) {
        var div = $("<form>").addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    fieldset: function(klass, parent) {
        var div = $("<fieldset>").addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    toggleLink: function(captionOn, captionOff, target, parent) {
        var visible = target.is(":visible");
        var btn = JQ.put("a", visible ? captionOn : captionOff).click(function() {
            var visible = target.is(":visible");
            if(visible) {
                target.hide();
                btn.text(captionOff);
            } else {
                target.show();
                btn.text(captionOn);
            }
        });
        if(parent) btn.appendTo(parent);
        return btn;
    },
    linkExt: function(caption, href, tooltip, parent) {
        return JQ.link(caption, href, tooltip, parent).attr("target","_blank");
    },
    put: function(where, what) {
        if(typeof(where) == "string") {
            where = $("<"+where+">");
        }
        if(what) {
            if(typeof(what) == "string") {
                where.text(what);
            } else {
                where.append(what);
            }
        }
        return where;
    }
};

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
        this.replaceWith(Thing.empty());        
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
            this.setSlot(key, Thing.empty());
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

},{    
    tid: 0,
    things: {},
    create: function(def, opts) {
        if(!def) {
            return Thing.empty();
        }
        // udelat deserializaci
        // { type, options, slots }
        var klassName = def.type.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
        klassName = klassName.capitalize();
        var klazz = window[klassName];
        var slots = def.slots;
        var oid = def.id;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Thing.create(slots[key]);
        }
        var thing = new klazz($.extend(def.options, opts), slots);
        thing.oid = oid
        return thing
    },
    empty: function(options) {
        return new Empty(options);
    }
});



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


var CanvasThing = Thing.extend({
    init: function() {
        var o = this.options;
        var self = this;
        this.canvas = $("<canvas>").appendTo(this.element).attr({width:o.width, height:o.height});
        // pouziva CSS transformaci, rastr je porad stejne velky
        if(o.autoscale) {
            this.element.resize(function() {
                var el = $(this);
                var o = self.options;
                var zoom = Math.min(el.width()/o.width, el.height()/o.height);
                el.css({
                    "-moz-transform": "scale("+zoom+")", 
                    "-webkit-transform": "scale("+zoom+")", 
                    "-moz-transform-origin":"0px 0px", 
                    "-webkit-transform-origin":"0px 0px"
                });
            });
        }
        // zvetsuje fyzicky pocet pixelu rastru
        if(o.autoresize) {
            this.element.resize(function() {
                var el = $(this);
                var ww = el.width();
                var hh = el.height();
                if(o.keepaspectratio) { var asp = o.width/o.height; if(ww/hh > asp) ww = hh*asp; else hh = ww/asp; }
                self.canvas.attr({
                    "width": ww, 
                    "height": hh
                });
                self.refresh();
            });
            var el = this.element;
            var ww = el.width();
            var hh = el.height();
            if(o.keepaspectratio) { var asp = o.width/o.height; if(ww/hh > asp) ww = hh*asp; else hh = ww/asp; }
            this.canvas.attr({
                "width": ww, 
                "height": hh
            });            
        }
    },
    refresh: function() {
        var context = this.canvas.get(0).getContext('2d');
        if (context) {
            this.draw(context, this.canvas.width() || this.options.width, this.canvas.height() || this.options.height);
        }
    },
    draw: function(g, w, h) {
        /* by default, draws only rectangle... */
        g.strokeRect(0,  0, w, h);
    },
    _klass: "canvas-thing thing",
    _type: "canvas-thing",
    _defaults: {
        width: 100,
        height: 100,
        autoscale: false,
        autoresize: true,
        keepaspectratio: true
    },
    _schema: {
       "type":"object",
       "description":"CanvasThing properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "autoscale":{
             "type":"boolean",
             "required":false
          }
       },
       "additionalProperties":true
    }

});


// http://www.nihilogic.dk/labs/javascript_canvas_fractals/
var Fractal = CanvasThing.extend({
    draw: function(ctx, w, h) {
        var smoothColors = this.options.smoothcolors;
        var vx = this.options.vx;
        var vy = this.options.vy;
        var zoom = this.options.zoom;

        var imageData = !!ctx.getImageData;
        var startit = 30;
        var xmin, xmax, ymin, ymax, dx, dy;
        var er = 2;

        var colors = {
	        red : [[0,0,1],[0,1,0],[0,1,0]],
	        blue : [[0,0,0],[0,1,0],[0,1,1]],
	        green : [[0,1,0],[0,0,1],[0,1,0]],
	        orange : [[1,1,1],[0,1,0],[0,0,0]],
	        magenta : [[0,0,1],[0,0.1,0.5],[0,0,1]],
	        yellow : [[0.2,0.2,1],[0.2,0.2,1],[0,0,0.2]],

        };

        var log2 = 1 / Math.log(2.0);
        var sin = Math.sin;
        var cos = Math.cos;
        var exp = Math.exp;
        var phi = 1.6180339887;
        function cosh(a) {
            return (exp(a) + exp(-a))/2;
        }
        function sinh(a) {
            return (exp(a) - exp(-a))/2;
        }
        function csin(x,y) {
	        return [sin(x) * cosh(y), cos(x) * sinh(y)];
        }
        function ccos(x,y) {
	        return [cos(x)*cosh(y), -sin(x)*sinh(y)];
        }
        function cexp(x,y) {
	        return [exp(x)*cos(y), exp(x)*sin(y)];
        }
        function cmul(c1,c2) {
	        return [
		        c1[0]*c2[0]-c1[1]*c2[1],
		        c1[0]*c2[1]+c1[1]*c2[0]
	        ];
        }

        var fractals = {

	        mandelbrot : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        var lastxx, lastyy;
		        do {
			        y = (x+x)*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2) {

				        y = (x+x)*y + y0; // iterate once for more for smoother colors
				        x = xx - yy + x0;
				        yy = y*y;
				        xx = x*x;

				        break;
			        }
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliacubed : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {

			        tx = x;
			        ty = y;

			        tx2 = x*x-y*y;
			        ty2 = 2*x*y;

			        x = tx2*tx-ty2*ty + 1-phi;
			        y = tx2*ty+ty2*tx + 0.3;

			        xx = x*x;
			        yy = y*y;

			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot3 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var tx, ty, tx2, ty2;
		        var xx = x*x, yy = y*y;
		        do {
			        tx = x;
			        ty = y;
			        tx2 = xx-yy;
			        ty2 = 2*x*y;
			        x = tx2*tx-ty2*ty + x0;
			        y = tx2*ty+ty2*tx + y0;
			        xx = x*x;
			        yy = y*y;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot4 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot8 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        burningship : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*Math.abs(x*y) - y0;
			        x = xx - yy - x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        tricorn : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = -y;

			        y = (x+x)*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        julia_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        do {
			        y = (x+x)*y + ci;
			        x = xx - yy + cr;
			        yy = y*y;
			        xx = x*x;

			        if (xx+yy > er2) {
				        y = (x+x)*y + ci;
				        x = xx - yy + cr;
				        yy = y*y;
				        xx = x*x;

				        break;
			        }
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        julia1 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, phi - 2, phi - 1);
	        },

	        julia2 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 1-phi, 0);
	        },

	        julia3 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0.285, 0);
	        },

	        julia4 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0.285, 0.01);
	        },

	        julia5 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.835, -0.2321);
	        },

	        julia6 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.7, -0.3);
	        },

	        julia7 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0, 1);
	        },

	        julia8 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.391, -0.587);
	        },

	        julia9 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.123, 0.745);
	        },

	        julia10 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.75, 0);
	        },

	        julia11 : function(x, y, it, er2) {
		        var zr, zi;
		        var cr = 0.6;
		        var ci = 1.1;
		        var xx = x*x, yy = y*y;
		        do {
			        zr = x - (x?(x<0?-1:1):0);
			        zi = y;
			        x = cr*zr-ci*zi;
			        y = cr*zi+ci*zr;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliasine_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [cr, ci];
		        do {
			        //z = csin(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [sin(x) * (expy + expmy)/2, cos(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliasine : function(x, y, it, er2) {
		        return fractals["juliasine_base"](x, y, it, er2, 1, 0.1);
	        },

	        juliasine2 : function(x, y, it, er2) {
		        return fractals["juliasine_base"](x, y, it, er2, 1, 0.3);
	        },

	        juliacosine_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [cr, ci];
		        do {
			        //z = ccos(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [cos(x) * (expy + expmy)/2, -sin(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliacosine : function(x, y, it, er2) {
		        return fractals["juliacosine_base"](x, y, it, er2, 1, 0.6);
	        },

	        juliacosine2 : function(x, y, it, er2) {
		        return fractals["juliacosine_base"](x, y, it, er2, Math.PI/2 * 1.5, Math.PI/2 * 0.05);
	        },

	        juliacosine3 : function(x, y, it, er2) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [1, 0.1];
		        do {
			        //z = ccos(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [cos(x) * (expy + expmy)/2, -sin(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        tx = x;
			        x = -y;
			        y = tx;

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

        };

        // from http://www.nihilogic.dk/labs/javascript_canvas_fractals/
        function render(fncFrac, colWeights) {
	        var time = new Date().getTime();

	        ctx.fillStyle = "#000000";
	        ctx.fillRect(0,0,w,h);

	        if (imageData) {
		        var data = ctx.getImageData(0,0,w,h);
		        var pixels = data.data;
	        }

	        var mi = Math.max(startit, Math.round(Math.max(Math.log(zoom),1) * startit));
	        var itfac = 1/mi*startit

	        xmin = vx - 2/zoom;
	        xmax = vx + 2/zoom;
	        ymin = vy - 2/zoom;
	        ymax = vy + 2/zoom;

	        dx = xmax-xmin;
	        dy = ymax-ymin;

	        var px, py, it;

	        var er2 = er*er;

	        var c1, c2, c3, m;
	        var col1, col2, col3;
	        var cw0 = colWeights[0], cw1 = colWeights[1], cw2 = colWeights[2];

	        var i = (w*h)-1;
	        do {
		        var offset = i*4;

		        px = (i%w);
		        py = h-((i/w)|0);

		        var res = fncFrac(
			        xmin + px/w * dx, 
			        ymin + py/h * dy, 
			        mi, er2
		        )

		        it = mi - res.it;

		        var mag = smoothColors ? 
				        (it * itfac) - (Math.log(Math.log(res.xx+res.yy))) * log2
				        : it * itfac;

		        //if (color == "bw") {
			    //    c1 = c2 = c3 = 
				//        (res.it==mi) ? 255 : 255 - mag/startit * 255;
		        //} else {
			        if (res.it == 0)
				        continue;

			        if (mag < startit/3) {
				        m = (mag*3);
				        col1 = m * 4;
				        col2 = m * 4;
				        col3 = m * 10;
			        } else if (mag < startit/1.5) {
				        m = (mag-startit/3)*3;
				        col1 = 80 + m * 8;
				        col2 = 80 + m * 8;
				        col3 = 200 + m * 2.5;
			        } else {
				        m = (mag-2*startit/3)*3
				        col1 = 220 + m * 1.5;
				        col2 = 220 + m * 1.5;
				        col3 = 255;
			        }

			        c1 = col1*cw0[0] + col2*cw0[1] + col3*cw0[2];
			        c2 = col1*cw1[0] + col2*cw1[1] + col3*cw1[2];
			        c3 = col1*cw2[0] + col2*cw2[1] + col3*cw2[2];
		        //}

		        c1 = c1 < 0 ? 0 : c1;
		        c2 = c2 < 0 ? 0 : c2;
		        c3 = c3 < 0 ? 0 : c3;

		        c1 = c1 > 255 ? 255 : c1;
		        c2 = c2 > 255 ? 255 : c2;
		        c3 = c3 > 255 ? 255 : c3;

		        if (!imageData) {
			        ctx.fillStyle = "rgb(" + (c1|0) + "," + (c2|0) + "," + (c3|0) + ")";
			        ctx.fillRect((px|0), h-((py|0)), 1, 1);
		        } else {
			        pixels[offset] = c1;
			        pixels[offset+1] = c2;
			        pixels[offset+2] = c3;
		        }

	        } while(--i);

	        if (imageData) {
		        ctx.putImageData(data,0,0);
		        ctx.fillRect(0,0,0,0);
	        }
        };

        render(fractals[this.options.algorithm], colors[this.options.color]);
    },
    _klass: "fractal thing",
    _type: "fractal",
    _defaults: {
        width: 300,
        height: 300,
        autoscale: false,
        autoresize: true,
        keepaspectratio: true,
        algorithm: "mandelbrot",
        color: "yellow",
        smoothcolors: true,
        vx: 0.3,
        vy: 0,
        zoom: 10
    },
    _schema: {
       "type":"object",
       "description":"Fractal properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "autoscale":{
             "type":"boolean",
             "required":false
          }
       },
       "additionalProperties":true
    }
});


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


var Svg = Thing.extend({
    init: function() {
    },
    refresh: function() {
        this.base();
        this.element.html(this.options.svg);
    },
    _klass: "svg thing",
    _type: "svg",
    _defaults: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'
    },
    _schema: {
       "type":"object",
       "description":"Svg properties",
       "properties":{
          "svg":{
             "type":"string",
             "required":true
          },
          "width":{
             "type":"string",
             "required":false
          },
          "height":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});


var SvgEditor = Thing.extend({
    change: function(arg) {
        if(typeof arg == 'function') {
            this.onchange = arg;
        } else {
            this.onchange(arg);
        }
    },
    init: function() {
        var self = this;
        self.onchange = $.noop;
        self.frame = $('<iframe src="'+baseUrl+'testing/svgedit">').attr('width',self.options.width).attr('height', self.options.height);
        self.frame.ready(function() {
            // http://code.google.com/p/svg-edit/wiki/TipsAndTricks
            // waiting for real load
            (function(){
                try {
                    var cw = self.frame[0].contentWindow;
                    var md = cw.methodDraw;
                    md.ready(function() {     
                        cw.svgCanvas.setSvgString(self.options.svg);
                    });        
                    md.addExtension("server_opensave", {
                        callback: function() {
                            md.setCustomHandlers({
	                            save: function(win, data) {
		                            self.options.svg = data;
                                    self.onchange(data);
	                            }
                            });
                        }
                    });
                }
                catch (Ex){
                    setTimeout(arguments.callee, 1000);
                }
            })();
        });
        self.frame.appendTo(self.element);
    },
    refresh: function() {
        this.base();
    },
    _klass: "svg-editor thing",
    _type: "svg-editor",
    _defaults: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100"></svg>',
        width: "800px",
        height: "600px"
    },
    _schema: {
       "type":"object",
       "description":"SvgEditor properties",
       "properties":{
          "svg":{
             "type":"string",
             "required":true
          },
          "width":{
             "type":"string",
             "required":false
          },
          "height":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});


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


var Templated = Thing.extend({
    refresh: function() {
        var tmpl = $.templates( "#"+this.options.template+"Template" );
        var html = tmpl.render(this.options);
        this.element.html(html);
        this.element.find("[data-slot]").each(function() { 
            $(this).html(Thing.empty().get()); 
        });
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.find("[data-slot='"+key+"']").html(value.get());
        return this;
    },
    _klass: "templated thing",
    _type: "templated",
    _defaults: {
        template: "demo",
        name: "Myrousz"
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "template": {
			    "type":"string",
			    "required":true
		    },
		    "name": {
			    "type":"string",
			    "required":true
		    }
	    }
    }
});


var Snippet = Thing.extend({
    refresh: function() {
        var o = this.options;
        var code = $("<pre>").text(o.code);
        this.element.html(code);
        SyntaxHighlighter.highlight({title: o.title, 'brush':o.lang}, code.get(0));        
    },
    _klass: "snippet thing",
    _type: "snippet",
    _defaults: {
        "title": "",
        "lang": "js",
        "code": ""
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "title": {
			    "type":"string",
			    "required":false
		    },
		    "lang": {
			    "type":"string",
                "enum":["js","php","plain"],
			    "required":true
		    },
		    "code": {
			    "type":"string",
			    "required":true
		    }
	    }
    }
});


var SoftKeyboard = Thing.extend({
    init: function() {
        this.keys = {};
        this.onkeypress = $.noop;
    },
    refresh: function() {
        var kbd = $("<div>");
        var rows = this.options.rows;
        var cols = this.options.rows;
        for(var key in this.options.keys) {
            var k = this.options.keys[key];
            var kk = this._makeKey(key, k).appendTo(kbd);
            this.keys[key] = kk;
        }
        this.element.html(kbd);
    },
    getKeyButton: function(key) {
        return {"name":key, "button":this.keys[key], "key":this.options.keys[key]};
    },
    _makeKey: function(name, k) {
        var self = this;
        var o = this.options;
        var top = Math.floor(100*k.top/o.rows) + "%";
        var left = Math.floor(100*k.left/o.columns) + "%";
        var ww = k.size || k.width;
        var hh = k.size || k.height;
        var mm = 2;
        var width = Math.floor(100*ww/o.columns) + "%";
        var height = Math.floor(100*hh/o.rows) + "%";
        var div = $("<button>").addClass("key key-"+name).css({'top':top, 'left':left, 'width':width, 'height':height}).append($("<div>").text(k.label));
        div.click(function() {
            if(k['switch']) {
                div.toggleClass("active");
            }
            self.keyPressed(self.getKeyButton(name));
        });
        return div;
    },
    keyPressed: function(kb) {
        if(typeof kb == 'function') {
            this.onkeypress = kb;
        } else {
            this.onkeypress(kb);
        }
    },
    getSwitchState: function(name) {
        if(this.options.keys[name] && this.options.keys[name]['switch']) {
            return this.keys[name].hasClass("active");
        } else {
            return false;
        }
    },    
    _klass: "soft-keyboard thing",
    _type: "soft-keyboard",
    _defaults: {
        "rows": 8,
        "columns": 20,
        "keys": {
            "q" : { "left":0, "top":0, "size":2, "label":"Q"},
            "w" : { "left":2, "top":0, "size":2, "label":"W"},
            "e" : { "left":4, "top":0, "size":2, "label":"E"},
            "r" : { "left":6, "top":0, "size":2, "label":"R"},
            "t" : { "left":8, "top":0, "size":2, "label":"T"},
            "y" : { "left":10, "top":0, "size":2, "label":"Y"},
            "u" : { "left":12, "top":0, "size":2, "label":"U"},
            "i" : { "left":14, "top":0, "size":2, "label":"I"},
            "o" : { "left":16, "top":0, "size":2, "label":"O"},
            "p" : { "left":18, "top":0, "size":2, "label":"P"},
            "a" : { "left":1, "top":2, "size":2, "label":"A"},
            "s" : { "left":3, "top":2, "size":2, "label":"S"},
            "d" : { "left":5, "top":2, "size":2, "label":"D"},
            "f" : { "left":7, "top":2, "size":2, "label":"F"},
            "g" : { "left":9, "top":2, "size":2, "label":"G"},
            "h" : { "left":11, "top":2, "size":2, "label":"H"},
            "j" : { "left":13, "top":2, "size":2, "label":"J"},
            "k" : { "left":15, "top":2, "size":2, "label":"K"},
            "l" : { "left":17, "top":2, "size":2, "label":"L"},
            "caps" : { "left":0, "top":4, "width":3, "height":2, "label":__("caps"), "switch":true},
            "z" : { "left":3, "top":4, "size":2, "label":"Z"},
            "x" : { "left":5, "top":4, "size":2, "label":"X"},
            "c" : { "left":7, "top":4, "size":2, "label":"C"},
            "v" : { "left":9, "top":4, "size":2, "label":"V"},
            "b" : { "left":11, "top":4, "size":2, "label":"B"},
            "n" : { "left":13, "top":4, "size":2, "label":"N"},
            "m" : { "left":15, "top":4, "size":2, "label":"M"},
            "del" : { "left":17, "top":4, "width":3, "height":2, "label":__("del")},
            "nums" : { "left":0, "top":6, "width":4, "height":2, "label":__("?123")},
            "comma" : { "left":4, "top":6, "width":3, "height":2, "label":","},
            "space" : { "left":7, "top":6, "width":6, "height":2, "label":__("space")},
            "dot" : { "left":13, "top":6, "width":3, "height":2, "label":"."},
            "enter" : { "left":16, "top":6, "width":4, "height":2, "label":__("enter")}
        }
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "rows": {
			    "type":"integer",
			    "required":true
		    },
		    "columns": {
			    "type":"integer",
			    "required":true
		    }
	    }
    }
});


var SoftTextEditor = Thing.extend({
    init: function() {
        var self = this;
        this.onchange = $.noop;
        this.keyboard = new SoftKeyboard();
        this.keyboard.keyPressed(function(kb) {
            self._keyPressed(kb);
        });
        this.textfield = $("<textarea>").val(this.options.value).change(function() {
            self.options.value = $(this).val();
        });
        this.buttonOk = $("<button>").addClass('done').text(__("Done")).click(function() {
            self.change(self.textfield.val());
        });
        this.element
            .append($("<div>").addClass("textfield").append(this.textfield))
            .append($("<div>").addClass("btn").append(this.buttonOk))            
            .append(this.keyboard.get());
    },
    refresh: function() {
        this.textfield.val(this.options.value);
    },
    // TODO napojit
    change: function(arg) {
        if(typeof arg == 'function') {
            this.onchange = arg;
        } else {
            this.onchange(arg);
        }
    },
    _keyPressed: function(kb) {
        var cc = kb.name;
        switch(cc) {
            case 'caps': 
                this.capsLock = this.keyboard.getSwitchState('caps');
                break;
            case 'del':
                // delete last character
                this.options.value = this.options.value.slice(0, -1);
                this.refresh();
                break;
            case 'nums': 
                break;
            case 'enter':
                this.options.value += "\n";
                this.refresh();
                break;
            case 'comma':
                this.options.value += ",";
                this.refresh();
                break;
            case 'space':
                this.options.value += " ";
                this.refresh();
                break;
            case 'dot':
                this.options.value += ".";
                this.refresh();
                break;
            default:
                if(this.capsLock) {
                    // invert case...
                    cc = ( cc >= 'A' && cc <= 'Z' ) ? cc.toLowerCase() : cc.toUpperCase();
                }
                this.options.value += cc;
                this.refresh();
        }
    },
    _klass: "soft-text-editor thing",
    _type: "soft-text-editor",
    _defaults: {
        "value": ""
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "value": {
			    "type":"string",
			    "required":true
		    }
	    }
    }
});



var HolidayCalendar = {
    // kdy je velikonocni nedele - bozi hod velikonocni?
    easter: {
        "2012": {month: 4, day: 8},
        "2013": {month: 3, day: 31},
        "2014": {month: 4, day: 20},
        "2015": {month: 4, day: 5}
    },
    data: 
// BEGIN JSON DATA
[
    {
        "month": "Leden",
        "days": [
            {
                "number": "1",
                "names": [
                    "Nový rok"/*,
                    "Den obnovy samostatného českého státu"*/
                ],
                "holiday": true
            },
            {
                "number": "2",
                "names": [
                    "Karina"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Radmila"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Diana"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Dalimil"
                ]
            },
            {
                "number": "6",
                "names": [
                    /*"Kašpar",
                    "Melichar",
                    "Baltazar"*/"Tři králové"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Vilma"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Čestmír"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Vladan"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Břetislav"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Bohdana"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Pravoslav"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Edita"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Radovan"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Alice"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Ctirad"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Drahoslav"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Vladislav"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Sára/Doubravka"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Ilona"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Běla"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Slavomír"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Zdeněk"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Milena"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Miloš"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Zora"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Ingrid"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Otýlie"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Zdislava"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Robin"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Marika"
                ]
            }
        ]
    },
    {
        "month": "Únor",
        "days": [
            {
                "number": "1",
                "names": [
                    "Hynek"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Nela"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Blažej"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Jarmila"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Dobromila"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Vanda"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Veronika"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Milada"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Apolena"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Mojmír"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Božena"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Slavěna"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Věnceslav"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Valentýn"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Jiřina"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Ljuba"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Miloslava"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Gizela"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Patrik"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Oldřich"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Lenka"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Petr"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Svatopluk"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Matěj"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Liliana"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Dorota"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Alexandr"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Lumír"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Horymír"
                ]
            }
        ]
    },
    {
        "month": "Březen",
        "days": [
            {
                "number": "1",
                "names": [
                    "Bedřich"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Anežka"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Kamil"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Stela"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Kazimír"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Miroslav"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Tomáš"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Gabriela"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Františka"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Viktorie"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Anděla"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Řehoř"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Růžena"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Matylda/Rút"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Ida"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Herbert/Elena"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Vlastimil"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Eduard"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Josef"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Světlana"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Radek"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Leona"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Ivona"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Gabriel"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Marian"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Emanuel"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Dita"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Soňa"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Taťána"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Arnošt"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Kvido"
                ]
            }
        ]
    },
    {
        "month": "Duben",
        "days": [
            {
                "number": "1",
                "names": [
                    "Hugo"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Erika"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Richard"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Ivana"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Miroslava"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Vendula"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Hermína/Herman"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Ema"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Dušan"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Darja"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Izabela"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Július"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Aleš"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Vincenc"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Anastázie"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Irena"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Rudolf"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Valérie"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Rostislav"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Marcela"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Alexandra"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Evženie"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Vojtěch"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Jiří"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Marek"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Oto"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Jaroslav"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Vlastislav"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Robert"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Blahoslav"
                ]
            }
        ]
    },
    {
        "month": "Květen",
        "days": [
            {
                "number": "1",
                "names": [
                    "Svátek práce"
                ],
                "holiday": true
            },
            {
                "number": "2",
                "names": [
                    "Zikmund"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Alexej"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Květoslav"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Klaudie"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Radoslav"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Stanislav"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Den vítězství"
                ],
                "holiday": true
            },
            {
                "number": "9",
                "names": [
                    "Ctibor"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Blažena"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Svatava"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Pankrác"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Servác"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Bonifác"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Žofie"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Přemysl"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Aneta"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Nataša"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Ivo"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Zbyšek"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Monika"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Emil"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Vladimír"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Jana"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Viola"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Filip"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Valdemar"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Vilém"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Maxmilián"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Ferdinand"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Kamila"
                ]
            }
        ]
    },
    {
        "month": "Červen",
        "days": [
            {
                "number": "1",
                "names": [
                    "Laura"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Jarmil"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Tamara"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Dalibor"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Dobroslav"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Norbert"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Iveta"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Medard"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Stanislava"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Gita"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Bruno"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Antonie"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Antonín"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Roland"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Vít"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Zbyněk"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Adolf"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Milan"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Leoš"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Květa"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Alois"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Pavla"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Zdeňka"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Jan"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Ivan"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Adriana"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Ladislav"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Lubomír"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Petr a Pavel"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Šárka"
                ]
            }
        ]
    },
    {
        "month": "Červenec",
        "days": [
            {
                "number": "1",
                "names": [
                    "Jaroslava"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Patricie"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Radomír"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Prokop"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Cyril a Metoděj"
                ],
                "holiday": true
            },
            {
                "number": "6",
                "names": [
                    /*"Den upálení Mistra Jana Husa"*/"Jan Hus"
                ],
                "holiday": true
            },
            {
                "number": "7",
                "names": [
                    "Bohuslava"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Nora"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Drahoslava"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Libuše/Amálie"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Olga"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Bořek"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Markéta"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Karolína"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Jindřich"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Luboš"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Martina"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Drahomíra"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Čeněk"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Ilja/Eliáš"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Vítězslav"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Magdalena"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Libor"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Kristýna"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Jakub"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Anna"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Věroslav"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Viktor"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Marta"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Bořivoj"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Ignác"
                ]
            }
        ]
    },
    {
        "month": "Srpen",
        "days": [
            {
                "number": "1",
                "names": [
                    "Oskar"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Gustav"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Miluše"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Dominik"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Kristián"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Oldřiška"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Lada"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Soběslav"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Roman"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Vavřinec"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Zuzana"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Klára"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Alena"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Alan"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Hana"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Jáchym"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Petra"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Helena"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Ludvík"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Bernard"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Johana"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Bohuslav"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Sandra"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Bartoloměj"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Radim"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Luděk"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Otakar"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Augustýn"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Evelína"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Vladěna"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Pavlína"
                ]
            }
        ]
    },
    {
        "month": "Září",
        "days": [
            {
                "number": "1",
                "names": [
                    "Linda/Samuel"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Adéla"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Bronislav"
                    /* /Bronislava"*/
                ]
            },
            {
                "number": "4",
                "names": [
                    "Jindřiška"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Boris"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Boleslav"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Regina"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Mariana"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Daniela"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Irma"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Denisa"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Marie"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Lubor"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Radka"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Jolana"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Ludmila"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Naděžda"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Kryštof"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Zita"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Oleg"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Matouš"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Darina"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Berta"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Jaromír"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Zlata"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Andrea"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Jonáš"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Václav"/*,
                    "Den české státnosti"*/
                ],
                "holiday": true
            },
            {
                "number": "29",
                "names": [
                    "Michal"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Jeroným"
                ]
            }
        ]
    },
    {
        "month": "Říjen",
        "days": [
            {
                "number": "1",
                "names": [
                    "Igor"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Olivie/Oliver"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Bohumil"
                ]
            },
            {
                "number": "4",
                "names": [
                    "František"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Eliška"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Hanuš"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Justýna"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Věra"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Štefan/Sára"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Marina"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Andrej"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Marcel"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Renáta"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Agáta"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Tereza"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Havel"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Hedvika"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Lukáš"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Michaela"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Vendelín"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Brigita"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Sabina"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Teodor"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Nina"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Beáta"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Erik"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Šarlota/Zoe"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Státní svátek"/*,
                    "Den vzniku samostatného československého státu"*/
                ],
                "holiday": true
            },
            {
                "number": "29",
                "names": [
                    "Silvie"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Tadeáš"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Štěpánka"
                ]
            }
        ]
    },
    {
        "month": "Listopad",
        "days": [
            {
                "number": "1",
                "names": [
                    "Felix"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Památka zesnulých"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Hubert"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Karel"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Miriam"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Liběna"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Saskie"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Bohumír"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Bohdan"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Evžen"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Martin"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Benedikt"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Tibor"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Sáva"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Leopold"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Otmar"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Mahulena"/*,
                    "Den boje za svobodu a demokracii"*/
                ],
                "holiday": true
            },
            {
                "number": "18",
                "names": [
                    "Romana"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Alžběta"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Nikola"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Albert"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Cecílie"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Klement"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Emílie"
                ]
            },
            {
                "number": "25",
                "names": [
                    "Kateřina"
                ]
            },
            {
                "number": "26",
                "names": [
                    "Artur"
                ]
            },
            {
                "number": "27",
                "names": [
                    "Xenie"
                ]
            },
            {
                "number": "28",
                "names": [
                    "René"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Zina"
                ]
            },
            {
                "number": "30",
                "names": [
                    "Ondřej"
                ]
            }
        ]
    },
    {
        "month": "Prosinec",
        "days": [
            {
                "number": "1",
                "names": [
                    "Iva"
                ]
            },
            {
                "number": "2",
                "names": [
                    "Blanka"
                ]
            },
            {
                "number": "3",
                "names": [
                    "Svatoslav"
                ]
            },
            {
                "number": "4",
                "names": [
                    "Barbora"
                ]
            },
            {
                "number": "5",
                "names": [
                    "Jitka"
                ]
            },
            {
                "number": "6",
                "names": [
                    "Mikuláš"
                ]
            },
            {
                "number": "7",
                "names": [
                    "Ambrož/Benjamín"
                ]
            },
            {
                "number": "8",
                "names": [
                    "Květoslava"
                ]
            },
            {
                "number": "9",
                "names": [
                    "Vratislav"
                ]
            },
            {
                "number": "10",
                "names": [
                    "Julie"
                ]
            },
            {
                "number": "11",
                "names": [
                    "Dana"
                ]
            },
            {
                "number": "12",
                "names": [
                    "Simona"
                ]
            },
            {
                "number": "13",
                "names": [
                    "Lucie"
                ]
            },
            {
                "number": "14",
                "names": [
                    "Lydie"
                ]
            },
            {
                "number": "15",
                "names": [
                    "Radana"
                ]
            },
            {
                "number": "16",
                "names": [
                    "Albína"
                ]
            },
            {
                "number": "17",
                "names": [
                    "Daniel"
                ]
            },
            {
                "number": "18",
                "names": [
                    "Miloslav"
                ]
            },
            {
                "number": "19",
                "names": [
                    "Ester"
                ]
            },
            {
                "number": "20",
                "names": [
                    "Dagmar"
                ]
            },
            {
                "number": "21",
                "names": [
                    "Natálie"
                ]
            },
            {
                "number": "22",
                "names": [
                    "Šimon"
                ]
            },
            {
                "number": "23",
                "names": [
                    "Vlasta"
                ]
            },
            {
                "number": "24",
                "names": [
                    "Adam a Eva"/*,
                    "Štědrý den"*/
                ],
                "holiday": true
            },
            {
                "number": "25",
                "names": [
                    "Boží hod vánoční"
                ],
                "holiday": true
            },
            {
                "number": "26",
                "names": [
                    "Štěpán"/*,
                    "Druhý svátek vánoční"*/
                ],
                "holiday": true
            },
            {
                "number": "27",
                "names": [
                    "Žaneta"
                ]
            },
            {
                "number": "28",
                "names": [
                    "Bohumila"
                ]
            },
            {
                "number": "29",
                "names": [
                    "Judita"
                ]
            },
            {
                "number": "30",
                "names": [
                    "David"
                ]
            },
            {
                "number": "31",
                "names": [
                    "Silvestr"
                ]
            }
        ]
    }
]
// END JSON DATA
};

var Calendar = RaphaelThing.extend({
    /* canvas size: 1000x1000 */
    refresh: function() { 
        this.base();   
        var d = this.options;
        this.paper = this.canvas;
        this.paper.clear();
        this.lineAttr = { "fill": "none", "stroke": d.lineColor};
        this.monthNameAttr = { "stroke": "none", "fill": d.fontColor, "font-family":d.fontFamily, "font-size":d.titleFontSize, "font-style":d.fontStyle, "text-anchor":"end"};
        this.monthCapAttr = { "fill": d.fontColor, "stroke": "none", "font-family":d.fontFamily, "font-size":d.dayCapFontSize, "font-style":d.fontStyle};
        this.dayNumAttr = { "stroke": "none", "fill":d.fontColor, "font-family":d.fontFamily, "font-weight":"bold", "font-size":d.numbersFontSize, "font-style":d.fontStyle, "text-anchor":"end"};
        this.dayNameAttr = { "stroke": "none", "fill": d.fontColor, "font-family":d.fontFamily, "font-size":d.namesFontSize, "font-style":d.fontStyle, "text-anchor":"end"};
        this.dayNumAttrHigh = { "stroke": "none", "fill": d.fontColorHigh, "font-family":d.fontFamily, "font-weight":"bold", "font-size":d.numbersFontSize, "font-style":d.fontStyle, "text-anchor":"end"};
        this.dayNameAttrHigh = { "stroke": "none", "fill": d.fontColorHigh, "font-family":d.fontFamily, "font-size":d.namesFontSize, "font-style":d.fontStyle, "text-anchor":"end"};

        this.monthCapOffset = 12;
        this.boxWidth = 142;
        this.boxHeight = 142;
        this.drawMonth(d.year, d.month);
        // HACK: https://github.com/DmitryBaranovskiy/raphael/issues/491
        this.element.find("tspan").attr("dy", 0);
    },

    drawMonthGrid: function(rows, x, y) {
        // draws grid 7x5 with day captions
        for(var i=0; i<=7; i++) {
            // draw captions
            // draw vertical lines
            var xx = x + i*this.boxWidth;
            var str = "M"+xx+","+y+"l0,"+rows*this.boxHeight;
            this.paper.path(str).attr(this.lineAttr); 
            if(i<7) this.paper.text(xx+this.boxWidth/2, y-this.monthCapOffset, this.locale[this.currentLocale].daysOfWeek[i]).attr(this.monthCapAttr);
        }
        for(var j=0; j<=rows; j++) {
            // draw horizontal lines
            var yy = y + j*this.boxHeight;
            var str = "M"+x+","+yy+"l"+7*this.boxWidth+",0";
            this.paper.path(str).attr(this.lineAttr);            
        }                    
    },

    drawDayBox: function(row, column, year, month, day, x, y) {
        // is day sunday?
        var sunday = this.getDayOfWeek(year, month, day) == 0;
        // is day holiday?
        var holiday = HolidayCalendar.data[month-1].days[day-1].holiday;

        var xx = x + (column+1)*this.boxWidth - 5;
        // print number...
        var yy = y + (row+1-0.45)*this.boxHeight - 5;
        this.paper.text(xx, yy, day).attr((sunday || holiday) ? this.dayNumAttrHigh : this.dayNumAttr);
        // print name
        var yy = y + (row+1-0.1)*this.boxHeight - 5;
        this.paper.text(xx, yy, HolidayCalendar.data[month-1].days[day-1].names[0]).attr(holiday ? this.dayNameAttrHigh : this.dayNameAttr);
    },

    drawMonth: function(year, month) {
        var x = 0;
        var column = this.getDayOfWeek(year, month, 1);
        // nedele = 0! pondeli 1...
        column = (column==0) ? 6 : column-1;
        // how many total rows?
        lastColumn = column+HolidayCalendar.data[month-1].days.length;
        var totalRows = Math.floor((lastColumn+6)/7);
        var y = 7*this.boxHeight - totalRows*this.boxHeight;
        // draw month name
        var mn = this.locale[this.currentLocale].months[month-1] + " "+year;
        this.drawMonthGrid(totalRows, x, y);
        this.paper.text(x+7*this.boxWidth, y-0.7*this.boxHeight, mn).attr(this.monthNameAttr);
        var row = 0;
        for(var i=0; i<HolidayCalendar.data[month-1].days.length; i++) {
            this.drawDayBox(row, column, year, month, i+1, x, y);
            column++;
            if(column == 7) {
                column = 0;
                row++;
            }
        }

    },
    locale: {
        "en": {
            "months": [
                "January","February","March","April","May","June","July","August","September","October","November","December"
            ],
            "daysOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ]
        },
        "cz": {
            "months": [
                "Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"
            ],
            "daysOfWeek": [
                "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"
            ]
        }
    },
    currentLocale: 'cz',
    getDayOfWeek: function(year, month, day) {
        var d = new Date(year, month-1, day, 0, 0, 0, 0);
        return d.getDay();
    },
    isLeapYear: function(yr) {
        return new Date(yr,2-1,29).getDate()==29;
    },

    _klass: "calendar raphael-thing thing",
    _type: "calendar",
    _defaults: {
        width: 1000,
        height: 1000,
        year: 2012,
        month: 12,
        fontFamily: "Arial", 
        fontStyle: "italic", 
        lineColor: "black",
        fontColor: "black",
        fontColorHigh: "red",
        titleFontSize: "40",
        dayCapFontSize: "20",
        numbersFontSize: "60",
        namesFontSize: "16"
    },
    _schema: {
       "type":"object",
       "description":"Calendar properties",
       "properties":{
          "year":{
             "type":"string",
             "enum":["2012", "2013","2014","2015"],
             "required":true
          },
          "month":{
             "type":"string",
             "enum":["1", "2","3","4","5","6","7","8","9","10","11","12"],
             "required":true
          },
            // .....
          "titleFontSize":{
             "type":"string",
             "enum":["15", "20", "30","40","50", "60", "70", "80"],
             "required":false
          },
          "dayCapFontSize":{
             "type":"string",
             "enum":["15", "20", "30","40","50", "60", "70", "80"],
             "required":false
          },
          "numbersFontSize":{
             "type":"string",
             "enum":["15", "20", "30","40","50", "60", "70", "80"],
             "required":false
          },
          "namesFontSize":{
             "type":"string",
             "enum":["15", "20", "30","40","50", "60", "70", "80"],
             "required":false
          },
          "fontFamily":{
             "type":"string",
             "enum":["Georgia, serif","Arial, Helvetica, sans-serif","Impact, Charcoal, sans-serif", "Tahoma, Geneva, sans-serif", "Verdana, Geneva, sans-serif", "Monaco, monospace"],
             "required":true
          },
          "fontStyle":{
             "type":"string",
             "enum":["regular","italic","monospace"],
             "required":true
          }
       },
       "additionalProperties":true
    }
});



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


var Modal = Thing.extend({
    init: function() {
        this.setSlot('content', Thing.empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.html($("<p>").html(value.get()));
        this.refresh();
        return this;
    },
    _fullOpts: function() {
      return $.extend({modal: true}, this.options)
    },
    show: function() {
        var self = this;
	    $(self.element).dialog(this._fullOpts());
	    $(self.element).dialog('open');
    },
    close: function() {
	    $(this.element).dialog('close');
    },
    refresh: function() {
    	$(this.element).dialog(this._fullOpts());
    },
    _klass: "modal thing",
    _type: "modal",
    _defaults: {
        autoOpen: false,
        minHeight: 608, // 560,  
        minWidth: 760, //740
        title: 'Dialog',
        closeOnEscape: true
    },
    _schema: {
       "type":"object",
       "properties":{
          "title": {
             "type": "string",
             "required": false
          },
          "autoOpen":{
             "type":"boolean",
             "required":true
          },
          "minHeight":{
             "type":"string",
             "required":true
          },
          "minWidth":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }

}, {
    show: function(thing, opts) {
        var modal = new Modal(opts);
        modal.content('content',thing);
        modal.show();
        return modal;
    }
});


var Dummy = Html.extend({
    refresh: function() {
        this.base();
        this.element.css('width', this.options['width']);
        this.element.css('height',this.options['height']);
        this.element.css('color',this.options['color']);
        this.element.css('background-color',this.options['background-color']);
    },
    _klass: "dummy html thing",
    _type: "dummy",
    _defaults: {
        html: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim et est porttitor semper at vitae augue. Proin at nulla at dui mattis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem convallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare, tellus est consequat nunc, quis blandit elit odio eu arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidunt orci id commodo. Aliquam non magna quis tortor malesuada aliquam eget ut lacus. Nam ut vestibulum est. Praesent volutpat tellus in eros dapibus elementum. Nam laoreet risus non nulla mollis ac luctus felis dapibus. Pellentesque mattis elementum augue non sollicitudin. Nullam lobortis fermentum elit ac mollis. Nam ac varius risus. Cras faucibus euismod nulla, ac auctor diam rutrum sit amet. Nulla vel odio erat, ac mattis enim.",
        'width': "",
        'height': '',
        'color': '',
        'background-color': ''
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "background-color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

// decorator = thing with a single slot named 'content'

// TODO podedit toto vsechno od 'Decorator'
// kvuli reverzibilite dekoratoru by bylo dobre kdyby kazdy menil css properties 'wrapper' divu
var Decorator = Thing.extend({
    init: function() {
        this.setSlot('content', Thing.empty());
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


















var Clickable = Thing.extend({
    init: function() {
        this.pane = $("<div>").addClass("clickable-pane");
        this.setSlot('content', Thing.empty());
        this.click($.noop);
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.empty()
            .append(value.get())
            .append(this.pane);
        return this;
    },
    refresh: function() {
      this.base();
      this.pane.attr('title', this.options.tooltip);
    },
    click: function(arg) {
        if(arg) {
            this.onclick = arg;
            this.pane.click(this.onclick);
        } else {
            return this.onclick();
        }
    },
    _klass: "clickable thing",
    _type: "clickable",
    _defaults: {
      "tooltip": ""
    }
});


var Editable = Thing.extend({
    init: function() {
        this.onchanged = $.noop;
        this.editor = $("<div>").addClass("editable-editor");
        this.pane = $("<div>").addClass("editable-pane");
        this.element.append(this.pane).append(this.editor);
        this.setSlot('content', Thing.empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        var self = this;
        var schema = value._schema;
        this.editor.empty();
        if(!schema) {
            // pouzit radsi json editor
        } else {
            this.editor.jsonform({schema: value._schema, value: value.options, name: __("Properties")+" - "+value._type});
            this.editor.jsonform('change', function() {
                self._save(true);
            });
            this.editor.jsonform('save', function() {
                self._save();
            });
        }
        this.pane.html(value.get());
        return this;
    },
    _save: function(stay) {
        var self = this;
        // value changed in editor...
        var newVal = self.editor.jsonform('value');
        self.getSlot('content').setOptions(newVal);
        if(!stay) self.onchanged(newVal);
    },
    _klass: "editable thing",
    _type: "editable",
    _defaults: {}
}, {
    edit: function(thing, changed) {
        var edt = new Editable();
        edt.setSlot('content', thing.copy());
        var modal = Modal.show(edt, {height: 630, minHeight: 630, width: 840, minWidth: 840, resizable: false, draggable: true, title:__('Properties')});
        edt.onchanged = function(newVal) {
            modal.close();
            if(changed) changed(newVal);
        };
    }
});



var ToolbarDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>")
            .addClass("mykkro-toolbar-decorator-content")
            .appendTo(this.element);
        this.setSlot('content', Thing.empty());
    },
    refresh: function() {
	    this.base();
        if(this.options.hidden) {
            this.element.toolbar({tools:{}});
        } else {
            this.element.toolbar({tools:this.options.tools});
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
    serialize: function() {
        // toolbar decorator se nebude serializovat (aspon automaticky ne)
        return this.getSlot('content').serialize();
    },
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "toolbar-decorator thing",
    _type: "toolbar-decorator",
    _defaults: {
        tools: {}
    } 
});


var ContextmenuDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>")
            .addClass("mykkro-contextmenu-decorator-content")
            .appendTo(this.element);
        this.setSlot('content', Thing.empty());
    },
    refresh: function() {
	    this.base();
        if(this.options.hidden) {
            this.element.toolbar({tools:{}});
        } else {
            this.element.toolbar({tools:this.options.tools});
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
    serialize: function() {
        // toolbar decorator se nebude serializovat (aspon automaticky ne)
        return this.getSlot('content').serialize();
    },
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "contextmenu-decorator thing",
    _type: "contextmenu-decorator",
    _defaults: {
        tools: {}
    } 
});


var Page = Decorator.extend({
    // options changed...
    refresh: function() {
        this.element.css({
          'width': this.options['width'],
          'height': this.options['height'],
          'background-size': 'cover',
          'background-image': 'url('+this.options['background_url']+')'
        })
    },
    _klass: "page decorator thing",
    _type: "page",
    _defaults: {
        'width': '500px',
        'height': '700px',
        'background_url': ''
    },
    _schema: {
       "type":"object",
       "description":"Page properties",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


var Preview = Decorator.extend({
    // options changed...
    refresh: function() {
        this.element.css('width',this.options['width']);
        this.element.css('height',this.options['height']);
    },
    _klass: "preview decorator thing",
    _type: "preview",
    _defaults: {
        'width': '80px',
        'height': '110px',
        'label': 'preview',
        'description': ''
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          },
          "label":{
             "type":"string",
             "required":false
          },
          "description":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }
});


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



var PageDecorator = Thing.extend({
    init: function() {
        this.base();
        this.pageContent = $("<div>").addClass("page-content").appendTo(this.element);
        this.pageInfo = $("<div>").addClass('page-info').appendTo(this.element);
        this.setSlot('content', Thing.empty());
    },
    // options changed...
    refresh: function() {
        // TODO text mask?
        this.base();
        if(this.options.showInfo) this.pageInfo.show(); else this.pageInfo.hide();
        this.pageInfo.text("Page "+this.options.pageNumber);
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.pageContent.html(value.get());
        return this;
    },
    _klass: "page-decorator thing",
    _type: "page-decorator",
    _defaults: {
        'showInfo' : false,
        'pageNumber': 2,
        'pagesTotal' : 3,
        'recordsTotal' : 10
    },
    _schema: {
       "type":"object",
       "properties":{
          "showInfo":{
             "type":"boolean",
             "required":true
          },
          "pageNumber":{
             "type":"integer",
             "required":true
          },
          "pagesTotal":{
             "type":"integer",
             "required":true
          },
          "recordsTotal":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


var CenteringDecorator = Thing.extend({
    init: function() {
        this.inner = $("<div>").addClass('content-inner').appendTo(
            $("<div>").addClass('center3').appendTo(
                $("<div>").addClass('center2').appendTo(
                    this.element
                )
            )
        );
        this.setSlot('content', Thing.empty());
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
        this.setSlot('content', Thing.empty())
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


var Ajax = Decorator.extend({
    init: function() {
        this.loaded($.noop);
        this.received(function(data) { return data; });
        this.transform(function(data) { return Thing.create(data); })
        this.base();
        this.reload();
    },
    reload: function() {
        var url = this.options.url;
        var self = this;
        if(url) {
            $.ajax({
              url: url,
              dataType: 'json',
              //data: data,
              success: function(data) {
                var thing = self.transform(self.received(data));
                self.setSlot('content', thing);
                self.loaded(thing);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // TODO dat tam misto toho chyb. panel
                alert("AJAX failed! "+textStatus);
              }
            });
        }
        if(this.options.reloadInterval) {
            var fun = function() { self.reload(); };
            setTimeout(fun, 1000*this.options.reloadInterval);
        }
    },
    loaded: function(arg) {
        if(typeof arg == 'function') {
            this.onloaded = arg;
        } else {
            return this.onloaded(arg);
        }
    },
    received: function(arg) {
        if(typeof arg == 'function') {
            this.onreceive = arg;
        } else {
            return this.onreceive(arg);
        }
    },
    transform: function(arg) {
        if(typeof arg == 'function') {
            this.ontransform = arg;
        } else {
            return this.ontransform(arg);
        }
    },
    _klass: "ajax thing",
    _type: "ajax",
    _defaults: {
        url: '', //"testing/thing.json",
        reloadInterval: 0 //60 // in seconds
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "reloadInterval": {
			    "type":"integer",
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "uri",
			    "required":true
		    }
	    }
    }
});




var AjaxPager = Thing.extend({
    init: function() {
        var self = this;
        this.base();
        this.page = new Ajax();
        this.page.received(function(data) { return self._dataReceived(data);});
        this.page.transform(function(data) { return self._dataTransform(data);});
        this.page.loaded(function(ajax) {self._pageLoaded(ajax);});
        this.page.get().appendTo(this.element);
        this.createControls();
        this.setPage(this.options.page);
    },
    createControls: function() {
        this.pagerControls = $("<div>").addClass('pager-controls');
        if(!this.options.disablePagerControl) this.pagerControls.appendTo(this.element);
    },
    refreshView: function() {
        this.setPage(this.options.page);
    },
    setPage: function(num) {
        this.options.page = num;
        var url = null;
        if(this.options.page && this.options.baseUrl) {
            url = this.getPageUrl(this.options.page);
            this.page.options.url = url;
            this.page.reload();
        } else {
            // signal error
        }
    },
    getPageUrl: function(page) {
        return this.options.baseUrl + page + ".json";
    },
    // muzeme podedit pokud potrebujeme jine chovani, transformaci dat aj.
    _dataReceived: function(data) {
        return data;
    },
    _dataTransform: function(data) {
        return Thing.create(data);
    },
    _pageLoaded: function(ajax) {
        this.pagerControls.empty();
        if(ajax instanceof PageDecorator) {
            // rebuild page controls
            this._buildPageControls(ajax);
        }
    },
    _buildPageControls: function(paged) {
        // TODO udelat PagerControls jako Thing
        // stranky jsou cislovany od jedne, nejmensi cislo je 1
        var o = paged.options;
        if(o.pageNumber>1) {
            // add first link
            this.pagerControls.append(this._makePageLink(1, "first"));
        }
        if(o.pageNumber>1) {
            // add previous link
            this.pagerControls.append(this._makePageLink(o.pageNumber-1, "previous"));
        }
        this.pagerControls
            .append($("<span>").text(__("Page")+" "+o.pageNumber+" "+__("from")+" "+o.pagesTotal));        
        if(o.pageNumber<o.pagesTotal) {
            // add previous link
            this.pagerControls.append(this._makePageLink(o.pageNumber+1, "next"));
        }
        if(o.pageNumber<o.pagesTotal) {
            // add first link
            this.pagerControls.append(this._makePageLink(o.pagesTotal, "last"));
        }
    },
    _makePageLink: function(pageno, type) {
        var self = this;
        return $('<a href="#">').text(type).click(function() {
            self.setPage(pageno);
            return false;
        });
    },
    _klass: "ajax-pager thing",
    _type: "ajax-pager",
    _defaults: {
        baseUrl: '',// 'testing/multi/',
        page: 1,
        disablePagerControl: false
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "page": {
			    "type":"integer",
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "uri",
			    "required":true
		    }
	    }
    }
});


var Layout = Thing.extend({
    _klass: "layout thing",
    _type: "layout"
});









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



// TODO metody na prohazovani elementu - move to front/back, move up, move down
// TODO metody insert/delete?
// TODO -> DynamicLayout
// TODO ze by se to poradi slotu dalo ulozit?
var OrderableLayout = GrowableLayout.extend({
    init: function() {
        this.cells = []; // v tomto poradi budou v this.element!
        this.cellMap = {}; 
    },
    // what muze byt Slot nebo Thing
    getSlotIndex: function(what) {
        if(what && typeof what === 'object') {
            for(var i=0; i<this.cells.length; i++) {
                if(this.cells[i] == what || this.cells[i].get() == what) return i;
            }
            return -1;
        } else {
            if(what>=0 && what < this.cells.length) return what;
            return -1;
        }
    },
    moveSlotUp: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>0) {
            // swap slots 'i-1' and 'i'
            this.swapSlots(slot-1, slot);
        }
    },
    moveSlotDown: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>=0 && slot<this.cells.length-1) {
            // swap slots 'i' and 'i+1'
            this.swapSlots(slot, slot+1);
        }
    },
    moveSlotToTop: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>0) {
            this.swapSlots(0, slot);
        }
    },
    moveSlotToBottom: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>=0 && slot<this.cells.length-1) {
            this.swapSlots(slot, this.cells.length-1);
        }
    },
    swapSlots: function(slot1, slot2) {
        slot1 = this.getSlotIndex(slot1);
        slot2 = this.getSlotIndex(slot2);
        if(slot1 != slot2) {
            // prohodit to v DOM...
            this.cells[slot1].element.swap(this.cells[slot2].element);
            var tmp = this.cells[slot1];
            this.cells[slot1] = this.cells[slot2];
            this.cells[slot2] = tmp;
        }
    },
    shuffle: function() {
        var len = this.cells.length;
        for (var i = len-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            this.swapSlots(randomIndex, i);
        }
    },
    remove: function(what) {        
        var ndx = this.getSlotIndex(what);
        if(ndx>=0) {
            var slot = this.cells[ndx];
            this.cellMap[slot.name] = null;
            // remove from array
            this.cells.remove(ndx);
            // remove from DOM
            slot.element.remove();
            this.refresh();
        }
    },
    _klass: "orderable-layout growable-layout layout thing",
    _type: "orderable-layout",
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



var PreviewPager = AjaxPager.extend({
    constructor: function(options, callback) {
        this.base(options); // baseUrl, query, includePublic, allTags, disableSearchBox
        this.onselected = callback || $.noop;
    },
    createControls: function() {
        this.base();
        var self = this
        var changer = function() {
            self.refreshView()
        }
        this.searchBox = $('<input type="text" name="sf-text" class="search rounded" placeholder="Search...">').attr("value", this.options.query).on("change keyup paste", changer)
        this.publicCBox = $('<input type="checkbox" name="sf-public">').prop('checked', this.options.includePublic).change(changer)
        this.allCBox = $('<input type="checkbox" name="sf-all">').prop("checked", this.options.allTags).change(changer)
        if(!this.options.disableSearchBox) {
            var sc = $("<div>")
                .addClass('search-controls')
                .appendTo(this.element)
                .append(
                    $('<label>').append(this.searchBox), 
                    $('<label>').append(this.publicCBox, $('<span>Include public content</span>')),
                    $('<label>').append(this.allCBox, $('<span>Use all tags</span>'))
                );
        }
    },
    getPageUrl: function(page) {
        var text = encodeURIComponent(this.searchBox.val())
        var publ = this.publicCBox.is(':checked') ? 'true' : 'false'
        var all = this.allCBox.is(':checked') ? 'true' : 'false'
        return this.base(page) + "?public="+publ+"&text="+text+"&all="+all
    },
    _dataReceived: function(data) {
        return data;
    },
    _dataTransform: function(data) {
        var self = this;
        var ol = new OrderableLayout({"css":"mykkro-flow-layout"});
        for(var i=0; i<data.items.length; i++) {
            var thing = Thing.create(data.items[i].preview);
            var clickable = new Clickable({tooltip: data.items[i].title});
            clickable.setSlot('content', thing);
            (function() {
                var url = data.items[i].url;
                clickable.click(function() {
                    self._selected(url);
                });
/*
                // TODO settings - otevre formular
                // Thing ma definovane schema pro validaci options
                var st = makeSettingsToolbar(function(){
                    // change thing's settings
                    self._selected(url, true);
                });
                st.setSlot('content', clickable);
                ol.add(st);
*/
                ol.add(clickable);
            })();
        }
        var pd = new PageDecorator({
            'pageNumber': data.page,
            'pagesTotal' : data.pagesTotal,
            'recordsTotal' : data.itemsTotal            
        });
        pd.setSlot('content', ol);
        return pd;
    },
    _selected: function(url, editSettings) {
        var self = this;
         $.ajax({
              url: url,
              dataType: 'json',
              //data: data,
              success: function(data) {
                   console.log("Selected:")
                   console.log(data)
                  if(editSettings) {
                     // ziskat schema, zobrazit formular, nastavit data.options                    
                  }
                  var thing = Thing.create(data);
                  self.onselected(thing);
              }
          });
    },
    _type: "preview-pager"
}, {
    choose: function(type, callback, options) {
        options = options || {}
	    var mm = {};
        var url = baseUrl+'api/pagedpreviews/'+type+'/';
        var ap = new PreviewPager($.extend({baseUrl:url}, options), function(thing) { 
            mm.modal.close();
            if(callback) callback(thing);
        });
        /**/options.resizable = false/**/
        mm.modal = Modal.show(ap, options);
    }
});


// TODO vertical split
var SplitLayout = Layout.extend({
    init: function() {
        this.first = $("<div>");
        this.second = $("<div>");
        this.element.append(this.first).append(this.second);
        this.setSlot('first', Thing.empty());
        this.setSlot('second', Thing.empty());
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
                this.setSlot(this.cellCount, Thing.empty());
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
                this.setSlot(this.cellCount, Thing.empty());
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



var SwitchLayout = GrowableLayout.extend({
    refresh: function() {
        this.base();
        var index = parseInt(this.options.index)+1;
        this.element.children().hide();
        this.element.find("div:nth-child("+index+")").show();
    },
    setIndex: function(ndx) {
        this.options.index = ndx;
        this.refresh();
    },
    add: function(thing) {
        var slot = this.base(thing);
        this.refresh();
        return slot;
    },
    _klass: "switch-layout growable-layout layout thing",
    _type: "switch-layout",
    _defaults: {
        "css": "", //"mykkro-flow-layout"
        index: 0
    },
    _schema: {
       "type":"object",
       "properties":{
          "css":{
             "type":"string",
             "required":false
          },
          "index":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


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


var Quest = Thing.extend({
    init: function() {
        this.status = 'active';
        this.finished($.noop);
    },
    refresh: function() {
        this.base();
        //this.inner.html(this.options.html).attr('class',this.options.innerCss);
    },
    finished: function(arg) {
        if(typeof arg == 'function') {
            this.onfinished = arg;
        } else {
            return this.onfinished(arg);
        }
    },
    pass: function() {
        this.status = 'passed';
        this.finished({'quest':this, 'status':this.status});
    },
    fail: function() {
        this.status = 'failed';
        this.finished({'quest':this, 'status':this.status});
    },
    _klass: "quest thing",
    _type: "quest",
    _defaults: {
        //html: ""
    },
    _schema: {
       "type":"object",
       "description":"Quest properties",
       "properties":{
/*
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
*/
       },
       "additionalProperties":true
    }

});

var DemoQuest = Quest.extend({
    init: function() {
        this.base();
        var self = this;
        this.passButton = $("<button>").text("Pass").click(function() { self.pass(); }).appendTo(this.element);
        this.failButton = $("<button>").text("Fail").click(function() { self.fail(); }).appendTo(this.element);
        this.statusBar = $("<span>").appendTo(this.element);
        this.statusBar.text('active');
    },
    pass: function() {
        this.statusBar.text('passed');
        this.passButton.prop('disabled', true);
        this.failButton.prop('disabled', true);
        this.base();
    },
    fail: function() {
        this.statusBar.text('failed');
        this.passButton.prop('disabled', true);
        this.failButton.prop('disabled', true);
        this.base();
    },
    _klass: "demo-quest quest thing",
    _type: "demo-quest",
    _defaults: {
        //html: ""
    },
    _schema: {
       "type":"object",
       "description":"Demo Quest properties",
       "properties":{
/*
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
*/
       },
       "additionalProperties":true
    }

});

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
        this.setSlot('content', Thing.empty());
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

// TODO udelat z toho Thing
// TODO k ikonam pridat tooltipy

var BookViewer = Base.extend({
    constructor: function(options) {
        this.bookData = options.data;
        this.bookUrl = options.url;
        this.eventUrl = options.eventUrl;
        this.fullscreen = options.fullscreen;
        this.logger = options.logger;
        this.defaultWidth = 920;
        this.defaultHeight = 600;
        this.tools = {};
        this.bookContent = null;
        this.eventHistory = [];
        this.targetDiv = "#content"
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
    goHome: function() {
        this.logEvent('book_close', this.bookUrl);
        window.location.href = this.bookUrl;
    },
    // v Chrome to nejak nefunguje...
    close: function() {
        this.logEvent('book_close', this.bookUrl);
        window.open('','_self','');
        window.close();
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
        this.bookContent = Thing.create(this.bookData, {"display":"turnable"});

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
        this.makeTool('closebook', __('Close book'), false, '16px', function() { self.closeBook();});
        // reduce close icon in size...
        this.tools['closebook'].css({top: '16px', width: "24px", height: "24px"});

        // update icons...
        $("#book-wrapper >.icon-turn-left").css("background-image", 'url('+o.turnleft_image_url+')')
        $("#book-wrapper >.icon-turn-right").css("background-image", 'url('+o.turnright_image_url+')')

        this.updateToolbar();
        this.logEvent('book_open', this.bookUrl);
    },
    logEvent: function(type, src, data) {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        this.logSingleEvent({"type":type,"src":src,"data":data,"timestamp":timestamp});
        if(type == 'book_close') {  
            // flush events...
            this.flushEventLog();
        }
    },
    logSingleEvent: function(evt) {
        if(this.logger) {
            this.logger(evt)
        }
        this.eventHistory.push(evt);
        if(this.eventUrl) {
            Common.postJsonData(this.eventUrl+".json", evt);
        }
    },
    flushEventLog: function() {
        // TODO odesilat eventy pres AJAX
        console.log(JSON.stringify(this.eventHistory, null, 4));
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
        //this.showIcon('fullscreen-on', !this.fullscreen);
        //this.showIcon('fullscreen-off', this.fullscreen);
        
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
            //this.tools['fullscreen-on'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            //this.tools['fullscreen-off'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['closebook'].css({top: '16px', width: iconSizeHalf+"px", height: iconSizeHalf+"px"});
            //if(this.bookUrl) this.tools['home'].css({top: '16px', width: iconSize+"px", height: iconSize+"px"});
        }
    }
});

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
            this.tools['closebook'].css({top: '16px', width: iconSizeHalf+"px", height: iconSizeHalf+"px"});
        }
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    }
});



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

// uses: jquery, common, base

// tohle projde markup a vytvori widgety tam kde jsou na to pripravena data
// widget ma serverovou cast/sablonu a JS na klientovi ktery z toho muze vyrobit
// treba graficky editor nebo embedded SVG

function valueDecode(value) {
    if((/^!/).test(value)) {
        // je to bud base64 nebo to zacina vykricnikem
        value = value.substring(1);
        if(!(/^!/).test(value)) {
            // je to base64
            value = JSON.parse(utf8_decode(base64_decode(value)));
        } else {
            value = html_decode(value);
        }
    } else {
        value = html_decode(value);
    }
    return value;
}

function valueEncode(value) {
    if(jQuery.isPlainObject(value)) {
        return '!' + base64_encode(utf8_encode(JSON.stringify(value)));
    } else {
        var out = html_encode(value);
        if(out.startsWith('!')) out = "!" + out;
    }
    return out;
}

function widgetize(what) {
    what.reverse().each(function() {
        var self = $(this);        
        // find the widget class...
        var csss = self.attr("class").split(" ");
        for(var i=0; i<csss.length; i++) {
            // je to widget?
            if(csss[i].endsWith("-widget")) {
                var widgetClass = csss[i].replace(/-widget$/, "");
                // gather all data-attributes
                var data = self.data();        
                for(var key in data) {
                    var value = data[key];
                    data[key] = valueDecode(data[key]);
                    self.data(key, data[key]);
                }
                // vytvorime widget - zavolame JS/jQuery plugin a predame mu parametry v data
                console.log(data)
                self[widgetClass](data);
                break;
            }
        }
    });
}


var Widget = Base.extend({
    constructor: function(element, options) {
        this.element = element;
        this.options = $.extend({}, options);
        // promenne widgetu...
        this.wid = Widget.getUniqueId();
        this.element.data('wid', this.wid);
        Widget.cache[this.wid] = this;
    },
    init: function() {
        // inicializace ramce pro widget (toho co se nemeni)
    },
    refresh: function() {
        // volat pokazde pokud se zmeni data
    },
    destroy: function() {
        // uvedeni widgetu do puvodniho stavu
    }
},{
    wid: 1,
    getUniqueId: function() {
        return 'widget'+Widget.wid++;
    },
    cache: {}
});







var ThingWidget = Widget.extend({
    init: function() {
        var self = this;
        var def = this.options.def;
        if(def) {
            var thing = Thing.create(def);
            this.element.empty().append(thing.get());
        }
        self.refresh();
    },
    refresh: function() {
    }
});

// widgety...
(function($){

    var defaultOptions = { def: { type: "empty" } };

    var methods = {
        init : function(options) {
            var settings = $.extend({}, defaultOptions, options);
            return this.each(function() {
                var $this = $(this);
                var widget = new ThingWidget($this, settings);
                widget.init();
            });
        }
    };

    $.fn.thing = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.thing' );
        }    
    };

})(jQuery);


// TODO rozeznavani 'media' podle pripony

var _audioPlayerIndex = 1;
var makeAudioPlayer = function(parent, media) {
    var id = _audioPlayerIndex++;
    var playerId = 'jquery_cplayer_'+id;
    var containerId = 'cp_container_'+id;
    var html = $.render.circlePlayer({playerId: playerId, containerId: containerId});
    var div = $("<div>").html(html);
    parent.append(div);
    // ensure that player div is at the root of body
    $("#"+playerId).appendTo($("body"));

	var myCirclePlayer = new CirclePlayer("#"+playerId, media, {
		cssSelectorAncestor: "#"+containerId
	});
    return div;
};

var _videoPlayerIndex = 1;
var makeVideoPlayer = function(parent, media) {
    var id = _videoPlayerIndex++;
    var playerId = 'jquery_jplayer_'+id;
    var containerId = 'jp_container_'+id;
    var html = $.render.videoPlayer({playerId: playerId, containerId: containerId});
    var div = $("<div>").html(html).appendTo(parent);
    $("#"+playerId).jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", media);
        },
        swfPath: "/js",
        supplied: "m4v, ogv",
        cssSelectorAncestor: "#"+containerId
    });    
    return div;
};

// initialization...
$(document).ready(function() {

    // widgetizer...
    widgetize($(".widget"));

});