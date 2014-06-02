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

