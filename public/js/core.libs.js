//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
;/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});
;(function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()})(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s=e.sessionStorage,s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window);/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){function SVGManager(){this._settings=[];this._extensions=[];this.regional=[];this.regional['']={errorLoadingText:'Error loading',notSupportedText:'This browser does not support SVG'};this.local=this.regional[''];this._uuid=new Date().getTime();this._renesis=detectActiveX('RenesisX.RenesisCtrl')}function detectActiveX(a){try{return!!(window.ActiveXObject&&new ActiveXObject(a))}catch(e){return false}}var q='svgwrapper';$.extend(SVGManager.prototype,{markerClassName:'hasSVG',svgNS:'http://www.w3.org/2000/svg',xlinkNS:'http://www.w3.org/1999/xlink',_wrapperClass:SVGWrapper,_attrNames:{class_:'class',in_:'in',alignmentBaseline:'alignment-baseline',baselineShift:'baseline-shift',clipPath:'clip-path',clipRule:'clip-rule',colorInterpolation:'color-interpolation',colorInterpolationFilters:'color-interpolation-filters',colorRendering:'color-rendering',dominantBaseline:'dominant-baseline',enableBackground:'enable-background',fillOpacity:'fill-opacity',fillRule:'fill-rule',floodColor:'flood-color',floodOpacity:'flood-opacity',fontFamily:'font-family',fontSize:'font-size',fontSizeAdjust:'font-size-adjust',fontStretch:'font-stretch',fontStyle:'font-style',fontVariant:'font-variant',fontWeight:'font-weight',glyphOrientationHorizontal:'glyph-orientation-horizontal',glyphOrientationVertical:'glyph-orientation-vertical',horizAdvX:'horiz-adv-x',horizOriginX:'horiz-origin-x',imageRendering:'image-rendering',letterSpacing:'letter-spacing',lightingColor:'lighting-color',markerEnd:'marker-end',markerMid:'marker-mid',markerStart:'marker-start',stopColor:'stop-color',stopOpacity:'stop-opacity',strikethroughPosition:'strikethrough-position',strikethroughThickness:'strikethrough-thickness',strokeDashArray:'stroke-dasharray',strokeDashOffset:'stroke-dashoffset',strokeLineCap:'stroke-linecap',strokeLineJoin:'stroke-linejoin',strokeMiterLimit:'stroke-miterlimit',strokeOpacity:'stroke-opacity',strokeWidth:'stroke-width',textAnchor:'text-anchor',textDecoration:'text-decoration',textRendering:'text-rendering',underlinePosition:'underline-position',underlineThickness:'underline-thickness',vertAdvY:'vert-adv-y',vertOriginY:'vert-origin-y',wordSpacing:'word-spacing',writingMode:'writing-mode'},_attachSVG:function(a,b){var c=(a.namespaceURI==this.svgNS?a:null);var a=(c?null:a);if($(a||c).hasClass(this.markerClassName)){return}if(typeof b=='string'){b={loadURL:b}}else if(typeof b=='function'){b={onLoad:b}}$(a||c).addClass(this.markerClassName);try{if(!c){c=document.createElementNS(this.svgNS,'svg');c.setAttribute('version','1.1');if(a.clientWidth>0){c.setAttribute('width',a.clientWidth)}if(a.clientHeight>0){c.setAttribute('height',a.clientHeight)}a.appendChild(c)}this._afterLoad(a,c,b||{})}catch(e){if($.browser.msie){if(!a.id){a.id='svg'+(this._uuid++)}this._settings[a.id]=b;a.innerHTML='<embed type="image/svg+xml" width="100%" '+'height="100%" src="'+(b.initPath||'')+'blank.svg" '+'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>'}else{a.innerHTML='<p class="svg_error">'+this.local.notSupportedText+'</p>'}}},_registerSVG:function(){for(var i=0;i<document.embeds.length;i++){var a=document.embeds[i].parentNode;if(!$(a).hasClass($.svg.markerClassName)||$.data(a,q)){continue}var b=null;try{b=document.embeds[i].getSVGDocument()}catch(e){setTimeout($.svg._registerSVG,250);return}b=(b?b.documentElement:null);if(b){$.svg._afterLoad(a,b)}}},_afterLoad:function(a,b,c){var c=c||this._settings[a.id];this._settings[a?a.id:'']=null;var d=new this._wrapperClass(b,a);$.data(a||b,q,d);try{if(c.loadURL){d.load(c.loadURL,c)}if(c.settings){d.configure(c.settings)}if(c.onLoad&&!c.loadURL){c.onLoad.apply(a||b,[d])}}catch(e){alert(e)}},_getSVG:function(a){a=(typeof a=='string'?$(a)[0]:(a.jquery?a[0]:a));return $.data(a,q)},_destroySVG:function(a){var b=$(a);if(!b.hasClass(this.markerClassName)){return}b.removeClass(this.markerClassName);if(a.namespaceURI!=this.svgNS){b.empty()}$.removeData(a,q)},addExtension:function(a,b){this._extensions.push([a,b])},isSVGElem:function(a){return(a.nodeType==1&&a.namespaceURI==$.svg.svgNS)}});function SVGWrapper(a,b){this._svg=a;this._container=b;for(var i=0;i<$.svg._extensions.length;i++){var c=$.svg._extensions[i];this[c[0]]=new c[1](this)}}$.extend(SVGWrapper.prototype,{_width:function(){return(this._container?this._container.clientWidth:this._svg.width)},_height:function(){return(this._container?this._container.clientHeight:this._svg.height)},root:function(){return this._svg},configure:function(a,b,c){if(!a.nodeName){c=b;b=a;a=this._svg}if(c){for(var i=a.attributes.length-1;i>=0;i--){var d=a.attributes.item(i);if(!(d.nodeName=='onload'||d.nodeName=='version'||d.nodeName.substring(0,5)=='xmlns')){a.attributes.removeNamedItem(d.nodeName)}}}for(var e in b){a.setAttribute($.svg._attrNames[e]||e,b[e])}return this},getElementById:function(a){return this._svg.ownerDocument.getElementById(a)},change:function(a,b){if(a){for(var c in b){if(b[c]==null){a.removeAttribute($.svg._attrNames[c]||c)}else{a.setAttribute($.svg._attrNames[c]||c,b[c])}}}return this},_args:function(b,c,d){c.splice(0,0,'parent');c.splice(c.length,0,'settings');var e={};var f=0;if(b[0]!=null&&b[0].jquery){b[0]=b[0][0]}if(b[0]!=null&&!(typeof b[0]=='object'&&b[0].nodeName)){e['parent']=null;f=1}for(var i=0;i<b.length;i++){e[c[i+f]]=b[i]}if(d){$.each(d,function(i,a){if(typeof e[a]=='object'){e.settings=e[a];e[a]=null}})}return e},title:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'title',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},describe:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'desc',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},defs:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'defs',$.extend((d.id?{id:d.id}:{}),d.settings||{}))},symbol:function(a,b,c,d,e,f,g){var h=this._args(arguments,['id','x1','y1','width','height']);return this._makeNode(h.parent,'symbol',$.extend({id:h.id,viewBox:h.x1+' '+h.y1+' '+h.width+' '+h.height},h.settings||{}))},marker:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','refX','refY','mWidth','mHeight','orient'],['orient']);return this._makeNode(i.parent,'marker',$.extend({id:i.id,refX:i.refX,refY:i.refY,markerWidth:i.mWidth,markerHeight:i.mHeight,orient:i.orient||'auto'},i.settings||{}))},style:function(a,b,c){var d=this._args(arguments,['styles']);var e=this._makeNode(d.parent,'style',$.extend({type:'text/css'},d.settings||{}));e.appendChild(this._svg.ownerDocument.createTextNode(d.styles));if($.browser.opera){$('head').append('<style type="text/css">'+d.styles+'</style>')}return e},script:function(a,b,c,d){var e=this._args(arguments,['script','type'],['type']);var f=this._makeNode(e.parent,'script',$.extend({type:e.type||'text/javascript'},e.settings||{}));f.appendChild(this._svg.ownerDocument.createTextNode(e.script));if(!$.browser.mozilla){$.globalEval(e.script)}return f},linearGradient:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','stops','x1','y1','x2','y2'],['x1']);var j=$.extend({id:i.id},(i.x1!=null?{x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2}:{}));return this._gradient(i.parent,'linearGradient',$.extend(j,i.settings||{}),i.stops)},radialGradient:function(a,b,c,d,e,r,f,g,h){var i=this._args(arguments,['id','stops','cx','cy','r','fx','fy'],['cx']);var j=$.extend({id:i.id},(i.cx!=null?{cx:i.cx,cy:i.cy,r:i.r,fx:i.fx,fy:i.fy}:{}));return this._gradient(i.parent,'radialGradient',$.extend(j,i.settings||{}),i.stops)},_gradient:function(a,b,c,d){var e=this._makeNode(a,b,c);for(var i=0;i<d.length;i++){var f=d[i];this._makeNode(e,'stop',$.extend({offset:f[0],stopColor:f[1]},(f[2]!=null?{stopOpacity:f[2]}:{})))}return e},pattern:function(a,b,x,y,c,d,e,f,g,h,i){var j=this._args(arguments,['id','x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var k=$.extend({id:j.id,x:j.x,y:j.y,width:j.width,height:j.height},(j.vx!=null?{viewBox:j.vx+' '+j.vy+' '+j.vwidth+' '+j.vheight}:{}));return this._makeNode(j.parent,'pattern',$.extend(k,j.settings||{}))},clipPath:function(a,b,c,d){var e=this._args(arguments,['id','units']);e.units=e.units||'userSpaceOnUse';return this._makeNode(e.parent,'clipPath',$.extend({id:e.id,clipPathUnits:e.units},e.settings||{}))},mask:function(a,b,x,y,c,d,e){var f=this._args(arguments,['id','x','y','width','height']);return this._makeNode(f.parent,'mask',$.extend({id:f.id,x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}))},createPath:function(){return new SVGPath()},createText:function(){return new SVGText()},svg:function(a,x,y,b,c,d,e,f,g,h){var i=this._args(arguments,['x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var j=$.extend({x:i.x,y:i.y,width:i.width,height:i.height},(i.vx!=null?{viewBox:i.vx+' '+i.vy+' '+i.vwidth+' '+i.vheight}:{}));return this._makeNode(i.parent,'svg',$.extend(j,i.settings||{}))},group:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'g',$.extend({id:d.id},d.settings||{}))},use:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);if(typeof f.x=='string'){f.ref=f.x;f.settings=f.y;f.x=f.y=f.width=f.height=null}var g=this._makeNode(f.parent,'use',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},link:function(a,b,c){var d=this._args(arguments,['ref']);var e=this._makeNode(d.parent,'a',d.settings);e.setAttributeNS($.svg.xlinkNS,'href',d.ref);return e},image:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);var g=this._makeNode(f.parent,'image',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},path:function(a,b,c){var d=this._args(arguments,['path']);return this._makeNode(d.parent,'path',$.extend({d:(d.path.path?d.path.path():d.path)},d.settings||{}))},rect:function(a,x,y,b,c,d,e,f){var g=this._args(arguments,['x','y','width','height','rx','ry'],['rx']);return this._makeNode(g.parent,'rect',$.extend({x:g.x,y:g.y,width:g.width,height:g.height},(g.rx?{rx:g.rx,ry:g.ry}:{}),g.settings||{}))},circle:function(a,b,c,r,d){var e=this._args(arguments,['cx','cy','r']);return this._makeNode(e.parent,'circle',$.extend({cx:e.cx,cy:e.cy,r:e.r},e.settings||{}))},ellipse:function(a,b,c,d,e,f){var g=this._args(arguments,['cx','cy','rx','ry']);return this._makeNode(g.parent,'ellipse',$.extend({cx:g.cx,cy:g.cy,rx:g.rx,ry:g.ry},g.settings||{}))},line:function(a,b,c,d,e,f){var g=this._args(arguments,['x1','y1','x2','y2']);return this._makeNode(g.parent,'line',$.extend({x1:g.x1,y1:g.y1,x2:g.x2,y2:g.y2},g.settings||{}))},polyline:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polyline',d.points,d.settings)},polygon:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polygon',d.points,d.settings)},_poly:function(a,b,c,d){var e='';for(var i=0;i<c.length;i++){e+=c[i].join()+' '}return this._makeNode(a,b,$.extend({points:$.trim(e)},d||{}))},text:function(a,x,y,b,c){var d=this._args(arguments,['x','y','value']);if(typeof d.x=='string'&&arguments.length<4){d.value=d.x;d.settings=d.y;d.x=d.y=null}return this._text(d.parent,'text',d.value,$.extend({x:(d.x&&isArray(d.x)?d.x.join(' '):d.x),y:(d.y&&isArray(d.y)?d.y.join(' '):d.y)},d.settings||{}))},textpath:function(a,b,c,d){var e=this._args(arguments,['path','value']);var f=this._text(e.parent,'textPath',e.value,e.settings||{});f.setAttributeNS($.svg.xlinkNS,'href',e.path);return f},_text:function(a,b,c,d){var e=this._makeNode(a,b,d);if(typeof c=='string'){e.appendChild(e.ownerDocument.createTextNode(c))}else{for(var i=0;i<c._parts.length;i++){var f=c._parts[i];if(f[0]=='tspan'){var g=this._makeNode(e,f[0],f[2]);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else if(f[0]=='tref'){var g=this._makeNode(e,f[0],f[2]);g.setAttributeNS($.svg.xlinkNS,'href',f[1]);e.appendChild(g)}else if(f[0]=='textpath'){var h=$.extend({},f[2]);h.href=null;var g=this._makeNode(e,f[0],h);g.setAttributeNS($.svg.xlinkNS,'href',f[2].href);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else{e.appendChild(e.ownerDocument.createTextNode(f[1]))}}}return e},other:function(a,b,c){var d=this._args(arguments,['name']);return this._makeNode(d.parent,d.name,d.settings||{})},_makeNode:function(a,b,c){a=a||this._svg;var d=this._svg.ownerDocument.createElementNS($.svg.svgNS,b);for(var b in c){var e=c[b];if(e!=null&&e!=null&&(typeof e!='string'||e!='')){d.setAttribute($.svg._attrNames[b]||b,e)}}a.appendChild(d);return d},add:function(b,c){var d=this._args((arguments.length==1?[null,b]:arguments),['node']);var f=this;d.parent=d.parent||this._svg;d.node=(d.node.jquery?d.node:$(d.node));try{if($.svg._renesis){throw'Force traversal';}d.parent.appendChild(d.node.cloneNode(true))}catch(e){d.node.each(function(){var a=f._cloneAsSVG(this);if(a){d.parent.appendChild(a)}})}return this},clone:function(b,c){var d=this;var e=this._args((arguments.length==1?[null,b]:arguments),['node']);e.parent=e.parent||this._svg;e.node=(e.node.jquery?e.node:$(e.node));var f=[];e.node.each(function(){var a=d._cloneAsSVG(this);if(a){a.id='';e.parent.appendChild(a);f.push(a)}});return f},_cloneAsSVG:function(a){var b=null;if(a.nodeType==1){b=this._svg.ownerDocument.createElementNS($.svg.svgNS,this._checkName(a.nodeName));for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(c.nodeName!='xmlns'&&c.nodeValue){if(c.prefix=='xlink'){b.setAttributeNS($.svg.xlinkNS,c.localName||c.baseName,c.nodeValue)}else{b.setAttribute(this._checkName(c.nodeName),c.nodeValue)}}}for(var i=0;i<a.childNodes.length;i++){var d=this._cloneAsSVG(a.childNodes[i]);if(d){b.appendChild(d)}}}else if(a.nodeType==3){if($.trim(a.nodeValue)){b=this._svg.ownerDocument.createTextNode(a.nodeValue)}}else if(a.nodeType==4){if($.trim(a.nodeValue)){try{b=this._svg.ownerDocument.createCDATASection(a.nodeValue)}catch(e){b=this._svg.ownerDocument.createTextNode(a.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'))}}}return b},_checkName:function(a){a=(a.substring(0,1)>='A'&&a.substring(0,1)<='Z'?a.toLowerCase():a);return(a.substring(0,4)=='svg:'?a.substring(4):a)},load:function(j,k){k=(typeof k=='boolean'?{addTo:k}:(typeof k=='function'?{onLoad:k}:(typeof k=='string'?{parent:k}:(typeof k=='object'&&k.nodeName?{parent:k}:(typeof k=='object'&&k.jquery?{parent:k}:k||{})))));if(!k.parent&&!k.addTo){this.clear(false)}var l=[this._svg.getAttribute('width'),this._svg.getAttribute('height')];var m=this;var n=function(a){a=$.svg.local.errorLoadingText+': '+a;if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m,a])}else{m.text(null,10,20,a)}};var o=function(a){var b=new ActiveXObject('Microsoft.XMLDOM');b.validateOnParse=false;b.resolveExternals=false;b.async=false;b.loadXML(a);if(b.parseError.errorCode!=0){n(b.parseError.reason);return null}return b};var p=function(a){if(!a){return}if(a.documentElement.nodeName!='svg'){var b=a.getElementsByTagName('parsererror');var c=(b.length?b[0].getElementsByTagName('div'):[]);n(!b.length?'???':(c.length?c[0]:b[0]).firstChild.nodeValue);return}var d=(k.parent?$(k.parent)[0]:m._svg);var f={};for(var i=0;i<a.documentElement.attributes.length;i++){var g=a.documentElement.attributes.item(i);if(!(g.nodeName=='version'||g.nodeName.substring(0,5)=='xmlns')){f[g.nodeName]=g.nodeValue}}m.configure(d,f,!k.parent);var h=a.documentElement.childNodes;for(var i=0;i<h.length;i++){try{if($.svg._renesis){throw'Force traversal';}d.appendChild(m._svg.ownerDocument.importNode(h[i],true));if(h[i].nodeName=='script'){$.globalEval(h[i].textContent)}}catch(e){m.add(d,h[i])}}if(!k.changeSize){m.configure(d,{width:l[0],height:l[1]})}if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m])}};if(j.match('<svg')){p($.browser.msie?o(j):new DOMParser().parseFromString(j,'text/xml'))}else{$.ajax({url:j,dataType:($.browser.msie?'text':'xml'),success:function(a){p($.browser.msie?o(a):a)},error:function(a,b,c){n(b+(c?' '+c.message:''))}})}return this},remove:function(a){a=(a.jquery?a[0]:a);a.parentNode.removeChild(a);return this},clear:function(a){if(a){this.configure({},true)}while(this._svg.firstChild){this._svg.removeChild(this._svg.firstChild)}return this},toSVG:function(a){a=a||this._svg;return(typeof XMLSerializer=='undefined'?this._toSVG(a):new XMLSerializer().serializeToString(a))},_toSVG:function(a){var b='';if(!a){return b}if(a.nodeType==3){b=a.nodeValue}else if(a.nodeType==4){b='<![CDATA['+a.nodeValue+']]>'}else{b='<'+a.nodeName;if(a.attributes){for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(!($.trim(c.nodeValue)==''||c.nodeValue.match(/^\[object/)||c.nodeValue.match(/^function/))){b+=' '+(c.namespaceURI==$.svg.xlinkNS?'xlink:':'')+c.nodeName+'="'+c.nodeValue+'"'}}}if(a.firstChild){b+='>';var d=a.firstChild;while(d){b+=this._toSVG(d);d=d.nextSibling}b+='</'+a.nodeName+'>'}else{b+='/>'}}return b}});function SVGPath(){this._path=''}$.extend(SVGPath.prototype,{reset:function(){this._path='';return this},move:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'m':'M'),x,y)},line:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'l':'L'),x,y)},horiz:function(x,a){this._path+=(a?'h':'H')+(isArray(x)?x.join(' '):x);return this},vert:function(y,a){this._path+=(a?'v':'V')+(isArray(y)?y.join(' '):y);return this},curveC:function(a,b,c,d,x,y,e){e=(isArray(a)?b:e);return this._coords((e?'c':'C'),a,b,c,d,x,y)},smoothC:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'s':'S'),a,b,x,y)},curveQ:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'q':'Q'),a,b,x,y)},smoothQ:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'t':'T'),x,y)},_coords:function(a,b,c,d,e,f,g){if(isArray(b)){for(var i=0;i<b.length;i++){var h=b[i];this._path+=(i==0?a:' ')+h[0]+','+h[1]+(h.length<4?'':' '+h[2]+','+h[3]+(h.length<6?'':' '+h[4]+','+h[5]))}}else{this._path+=a+b+','+c+(d==null?'':' '+d+','+e+(f==null?'':' '+f+','+g))}return this},arc:function(a,b,c,d,e,x,y,f){f=(isArray(a)?b:f);this._path+=(f?'a':'A');if(isArray(a)){for(var i=0;i<a.length;i++){var g=a[i];this._path+=(i==0?'':' ')+g[0]+','+g[1]+' '+g[2]+' '+(g[3]?'1':'0')+','+(g[4]?'1':'0')+' '+g[5]+','+g[6]}}else{this._path+=a+','+b+' '+c+' '+(d?'1':'0')+','+(e?'1':'0')+' '+x+','+y}return this},close:function(){this._path+='z';return this},path:function(){return this._path}});SVGPath.prototype.moveTo=SVGPath.prototype.move;SVGPath.prototype.lineTo=SVGPath.prototype.line;SVGPath.prototype.horizTo=SVGPath.prototype.horiz;SVGPath.prototype.vertTo=SVGPath.prototype.vert;SVGPath.prototype.curveCTo=SVGPath.prototype.curveC;SVGPath.prototype.smoothCTo=SVGPath.prototype.smoothC;SVGPath.prototype.curveQTo=SVGPath.prototype.curveQ;SVGPath.prototype.smoothQTo=SVGPath.prototype.smoothQ;SVGPath.prototype.arcTo=SVGPath.prototype.arc;function SVGText(){this._parts=[]}$.extend(SVGText.prototype,{reset:function(){this._parts=[];return this},string:function(a){this._parts[this._parts.length]=['text',a];return this},span:function(a,b){this._parts[this._parts.length]=['tspan',a,b];return this},ref:function(a,b){this._parts[this._parts.length]=['tref',a,b];return this},path:function(a,b,c){this._parts[this._parts.length]=['textpath',b,$.extend({href:a},c||{})];return this}});$.fn.svg=function(a){var b=Array.prototype.slice.call(arguments,1);if(typeof a=='string'&&a=='get'){return $.svg['_'+a+'SVG'].apply($.svg,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){$.svg['_'+a+'SVG'].apply($.svg,[this].concat(b))}else{$.svg._attachSVG(this,a||{})}})};function isArray(a){return(a&&a.constructor==Array)}$.svg=new SVGManager()})(jQuery);;/* http://keith-wood.name/svg.html
   jQuery DOM compatibility for jQuery SVG v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){$.fn.addClass=function(e){return function(d){d=d||'';return this.each(function(){if($.svg.isSVGElem(this)){var c=this;$.each(d.split(/\s+/),function(i,a){var b=(c.className?c.className.baseVal:c.getAttribute('class'));if($.inArray(a,b.split(/\s+/))==-1){b+=(b?' ':'')+a;(c.className?c.className.baseVal=b:c.setAttribute('class',b))}})}else{e.apply($(this),[d])}})}}($.fn.addClass);$.fn.removeClass=function(e){return function(d){d=d||'';return this.each(function(){if($.svg.isSVGElem(this)){var c=this;$.each(d.split(/\s+/),function(i,a){var b=(c.className?c.className.baseVal:c.getAttribute('class'));b=$.grep(b.split(/\s+/),function(n,i){return n!=a}).join(' ');(c.className?c.className.baseVal=b:c.setAttribute('class',b))})}else{e.apply($(this),[d])}})}}($.fn.removeClass);$.fn.toggleClass=function(c){return function(a,b){return this.each(function(){if($.svg.isSVGElem(this)){if(typeof b!=='boolean'){b=!$(this).hasClass(a)}$(this)[(b?'add':'remove')+'Class'](a)}else{c.apply($(this),[a,b])}})}}($.fn.toggleClass);$.fn.hasClass=function(d){return function(b){b=b||'';var c=false;this.each(function(){if($.svg.isSVGElem(this)){var a=(this.className?this.className.baseVal:this.getAttribute('class')).split(/\s+/);c=($.inArray(b,a)>-1)}else{c=(d.apply($(this),[b]))}return!c});return c}}($.fn.hasClass);$.fn.attr=function(h){return function(b,c,d){if(typeof b==='string'&&c===undefined){var e=h.apply(this,[b]);if(e&&e.baseVal&&e.baseVal.numberOfItems!=null){c='';e=e.baseVal;if(b=='transform'){for(var i=0;i<e.numberOfItems;i++){var f=e.getItem(i);switch(f.type){case 1:c+=' matrix('+f.matrix.a+','+f.matrix.b+','+f.matrix.c+','+f.matrix.d+','+f.matrix.e+','+f.matrix.f+')';break;case 2:c+=' translate('+f.matrix.e+','+f.matrix.f+')';break;case 3:c+=' scale('+f.matrix.a+','+f.matrix.d+')';break;case 4:c+=' rotate('+f.angle+')';break;case 5:c+=' skewX('+f.angle+')';break;case 6:c+=' skewY('+f.angle+')';break}}e=c.substring(1)}else{e=e.getItem(0).valueAsString}}return(e&&e.baseVal?e.baseVal.valueAsString:e)}var g=b;if(typeof b==='string'){g={};g[b]=c}return this.each(function(){if($.svg.isSVGElem(this)){for(var n in g){var a=($.isFunction(g[n])?g[n]():g[n]);(d?this.style[n]=a:this.setAttribute(n,a))}}else{h.apply($(this),[b,c,d])}})}}($.fn.attr);$.fn.removeAttr=function(b){return function(a){return this.each(function(){if($.svg.isSVGElem(this)){(this[a]&&this[a].baseVal?this[a].baseVal.value='':this.setAttribute(a,''))}else{b.apply($(this),[a])}})}}($.fn.removeAttr);$.extend($.cssNumber,{'stopOpacity':true,'strokeMitrelimit':true,'strokeOpacity':true});if($.cssProps){$.css=function(e){return function(a,b,c){var d=(b.match(/^svg.*/)?$(a).attr($.cssProps[b]||b):'');return d||e(a,b,c)}}($.css)}function anySVG(a){for(var i=0;i<a.length;i++){if(a[i].nodeType==1&&a[i].namespaceURI==$.svg.svgNS){return true}}return false}$.expr.relative['+']=function(d){return function(a,b,c){d(a,b,c||anySVG(a))}}($.expr.relative['+']);$.expr.relative['>']=function(d){return function(a,b,c){d(a,b,c||anySVG(a))}}($.expr.relative['>']);$.expr.relative['']=function(d){return function(a,b,c){d(a,b,c||anySVG(a))}}($.expr.relative['']);$.expr.relative['~']=function(d){return function(a,b,c){d(a,b,c||anySVG(a))}}($.expr.relative['~']);$.expr.find.ID=function(d){return function(a,b,c){return($.svg.isSVGElem(b)?[b.ownerDocument.getElementById(a[1])]:d(a,b,c))}}($.expr.find.ID);var j=document.createElement('div');j.appendChild(document.createComment(''));if(j.getElementsByTagName('*').length>0){$.expr.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==='*'){var d=[];for(var i=0;c[i]||c.item(i);i++){if((c[i]||c.item(i)).nodeType===1){d.push(c[i]||c.item(i))}}c=d}return c}}$.expr.preFilter.CLASS=function(a,b,c,d,f,g){a=' '+a[1].replace(/\\/g,'')+' ';if(g){return a}for(var i=0,elem={};elem!=null;i++){elem=b[i];if(!elem){try{elem=b.item(i)}catch(e){}}if(elem){var h=(!$.svg.isSVGElem(elem)?elem.className:(elem.className?elem.className.baseVal:'')||elem.getAttribute('class'));if(f^(h&&(' '+h+' ').indexOf(a)>-1)){if(!c)d.push(elem)}else if(c){b[i]=false}}}return false};$.expr.filter.CLASS=function(a,b){var c=(!$.svg.isSVGElem(a)?a.className:(a.className?a.className.baseVal:a.getAttribute('class')));return(' '+c+' ').indexOf(b)>-1};$.expr.filter.ATTR=function(g){return function(c,d){var e=null;if($.svg.isSVGElem(c)){e=d[1];$.expr.attrHandle[e]=function(a){var b=a.getAttribute(e);return b&&b.baseVal||b}}var f=g(c,d);if(e){$.expr.attrHandle[e]=null}return f}}($.expr.filter.ATTR)})(jQuery);;function Matrix(){}var Sylvester={version:"0.1.3",precision:1e-6};Matrix.prototype={dup:function(){return Matrix.create(this.elements)},canMultiplyFromLeft:function(e){var t=e.elements||e;return t[0][0]===void 0&&(t=Matrix.create(t).elements),this.elements[0].length==t.length},multiply:function(e){var t=e.modulus?!0:!1,n=e.elements||e;if(n[0][0]===void 0&&(n=Matrix.create(n).elements),!this.canMultiplyFromLeft(n))return null;var r,o,a,i,s,l,u=this.elements.length,c=u,f=n[0].length,m=this.elements[0].length,d=[];do{r=c-u,d[r]=[],o=f;do{a=f-o,i=0,s=m;do l=m-s,i+=this.elements[r][l]*n[l][a];while(--s);d[r][a]=i}while(--o)}while(--u);return n=Matrix.create(d),t?n.col(1):n},isSquare:function(){return this.elements.length==this.elements[0].length},toRightTriangular:function(){var e,t,n,r,o=this.dup(),a=this.elements.length,i=a,s=this.elements[0].length;do{if(t=i-a,0===o.elements[t][t])for(j=t+1;i>j;j++)if(0!==o.elements[j][t]){e=[],n=s;do r=s-n,e.push(o.elements[t][r]+o.elements[j][r]);while(--n);o.elements[t]=e;break}if(0!==o.elements[t][t])for(j=t+1;i>j;j++){var l=o.elements[j][t]/o.elements[t][t];e=[],n=s;do r=s-n,e.push(t>=r?0:o.elements[j][r]-o.elements[t][r]*l);while(--n);o.elements[j]=e}}while(--a);return o},determinant:function(){if(!this.isSquare())return null;var e,t=this.toRightTriangular(),n=t.elements[0][0],r=t.elements.length-1,o=r;do e=o-r+1,n*=t.elements[e][e];while(--r);return n},isSingular:function(){return this.isSquare()&&0===this.determinant()},augment:function(e){var t=e.elements||e;t[0][0]===void 0&&(t=Matrix.create(t).elements);var n,r,o,a=this.dup(),i=a.elements[0].length,s=a.elements.length,l=s,u=t[0].length;if(s!=t.length)return null;do{n=l-s,r=u;do o=u-r,a.elements[n][i+o]=t[n][o];while(--r)}while(--s);return a},inverse:function(){if(!this.isSquare()||this.isSingular())return null;var e,t,n,r,o,a,i,s=this.elements.length,l=s,u=this.augment(Matrix.I(s)).toRightTriangular(),c=u.elements[0].length,f=[];do{e=s-1,o=[],n=c,f[e]=[],a=u.elements[e][e];do r=c-n,i=u.elements[e][r]/a,o.push(i),r>=l&&f[e].push(i);while(--n);for(u.elements[e]=o,t=0;e>t;t++){o=[],n=c;do r=c-n,o.push(u.elements[t][r]-u.elements[e][r]*u.elements[t][e]);while(--n);u.elements[t]=o}}while(--s);return Matrix.create(f)},setElements:function(e){var t,n=e.elements||e;if(n[0][0]!==void 0){var r,o,a,i=n.length,s=i;this.elements=[];do{t=s-i,r=n[t].length,o=r,this.elements[t]=[];do a=o-r,this.elements[t][a]=n[t][a];while(--r)}while(--i);return this}var l=n.length,u=l;this.elements=[];do t=u-l,this.elements.push([n[t]]);while(--l);return this}},Matrix.create=function(e){var t=new Matrix;return t.setElements(e)},Matrix.I=function(e){var t,n,r,o=[],a=e;do{t=a-e,o[t]=[],n=a;do r=a-n,o[t][r]=t==r?1:0;while(--n)}while(--e);return Matrix.create(o)},PureCSSMatrix=function(){"use strict";function e(e){e&&null!==e&&"none"!=e?e instanceof Matrix?this.setMatrix(e):this.setMatrixValue(e):this.m=Matrix.I(3)}function t(e){var t=parseFloat(n(e));return e.match(o)&&(t=2*Math.PI*t/360),t}function n(e){return e.match(a)}function r(e){return Number(e).toFixed(6)}var o=/deg$/,a=/([0-9.\-e]+)/g,i=/([a-zA-Z]+)\(([^\)]+)\)/g;return e.prototype.setMatrix=function(e){this.m=e},e.prototype.setMatrixValue=function(e){for(var r,o=Matrix.I(3);null!==(r=i.exec(e));){var a,s=r[1].toLowerCase(),l=r[2].split(",");if("matrix"==s)a=Matrix.create([[parseFloat(l[0]),parseFloat(l[2]),parseFloat(n(l[4]))],[parseFloat(l[1]),parseFloat(l[3]),parseFloat(n(l[5]))],[0,0,1]]);else if("translate"==s)a=Matrix.I(3),a.elements[0][2]=parseFloat(n(l[0])),a.elements[1][2]=parseFloat(n(l[1]));else if("scale"==s){var u,c=parseFloat(l[0]);u=l.length>1?parseFloat(l[1]):c,a=Matrix.create([[c,0,0],[0,u,0],[0,0,1]])}else"rotate"==s?a=Matrix.RotationZ(t(l[0])):"skew"==s||"skewx"==s?(a=Matrix.I(3),a.elements[0][1]=Math.tan(t(l[0]))):"skewy"==s?(a=Matrix.I(3),a.elements[1][0]=Math.tan(t(l[0]))):console.log("Problem with setMatrixValue",s,l);o=o.multiply(a)}this.m=o},e.prototype.multiply=function(t){return new e(this.m.multiply(t.m))},e.prototype.inverse=function(){return 1e-6>Math.abs(this.m.elements[0][0])&&(this.m.elements[0][0]=0),new e(this.m.inverse())},e.prototype.translate=function(t,n){var r=Matrix.I(3);return r.elements[0][2]=t,r.elements[1][2]=n,new e(this.m.multiply(r))},e.prototype.scale=function(t,n){var r=Matrix.create([[t,0,0],[0,n,0],[0,0,1]]);return new e(this.m.multiply(r))},e.prototype.rotate=function(t){var n=Matrix.RotationZ(t);return new e(this.m.multiply(n))},e.prototype.toString=function(){var e=this.m.elements,t="";return($.browser.mozilla||$.browser.opera)&&(t="px"),"matrix("+r(e[0][0])+", "+r(e[1][0])+", "+r(e[0][1])+", "+r(e[1][1])+", "+r(e[0][2])+t+", "+r(e[1][2])+t+")"},e.prototype.elements=function(){var e=this.m.elements;return{a:e[0][0],b:e[1][0],c:e[0][1],d:e[1][1],e:e[0][2],f:e[1][2]}},e}(),$.zoomooz||($.zoomooz={}),$.zoomooz.helpers=function(e,t){"use strict";var n=["-moz-","-webkit-","-o-","-ms-"];return t.forEachPrefix=function(e,t){for(var r=0;n.length>r;r++)e(n[r]);t&&e("")},t.getElementTransform=function(n){var r;return t.forEachPrefix(function(t){r=r||e(n).css(t+"transform")},!0),r},t}(jQuery,{}),function(e){"use strict";function t(e,t,n){var r={};if(b.forEachPrefix(function(t){r[t+"transform"]=e},!0),t){var o=d(t/1e3,6)+"s";r["-webkit-transition-duration"]=o,r["-o-transition-duration"]=o,r["-moz-transition-duration"]=o}if(n){var a=i(n);r["-webkit-transition-timing-function"]=a,r["-o-transition-timing-function"]=a,r["-moz-transition-timing-function"]=a}return r}function n(e,t,n,a,i,l){t||(t=o(new PureCSSMatrix)),p=(new Date).getTime(),v&&(clearInterval(v),v=null),a.easing&&(a.easingfunction=s(a.easing,a.duration)),r(e,t,n,a,i),l&&l(),v=setInterval(function(){r(e,t,n,a,i)},1)}function r(e,n,r,o,i){var s,l=(new Date).getTime()-p;s=o.easingfunction?o.easingfunction(l/o.duration):l/o.duration,e.css(t(a(m(n,r,s)))),l>o.duration&&(clearInterval(v),v=null,s=1,i&&i())}function o(e){var t=e.elements(),n=t.a,r=t.b,o=t.c,a=t.d,i=t.e,s=t.f;if(.01>Math.abs(n*a-r*o))return console.log("fail!"),void 0;var l=i,u=s,c=Math.sqrt(n*n+r*r);n/=c,r/=c;var f=n*o+r*a;o-=n*f,a-=r*f;var m=Math.sqrt(o*o+a*a);o/=m,a/=m,f/=m,0>n*a-r*o&&(n=-n,r=-r,o=-o,a=-a,c=-c,m=-m);var d=Math.atan2(r,n);return{tx:l,ty:u,r:d,k:Math.atan(f),sx:c,sy:m}}function a(e){var t="";return t+="translate("+d(e.tx,6)+"px,"+d(e.ty,6)+"px) ",t+="rotate("+d(e.r,6)+"rad) skewX("+d(e.k,6)+"rad) ",t+="scale("+d(e.sx,6)+","+d(e.sy,6)+")"}function i(e){return e instanceof Array?"cubic-bezier("+d(e[0],6)+","+d(e[1],6)+","+d(e[2],6)+","+d(e[3],6)+")":e}function s(e,t){var n=[];if(e instanceof Array)n=e;else switch(e){case"linear":n=[0,0,1,1];break;case"ease":n=[.25,.1,.25,1];break;case"ease-in":n=[.42,0,1,1];break;case"ease-out":n=[0,0,.58,1];break;case"ease-in-out":n=[.42,0,.58,1]}var r=function(e){return l(e,n[0],n[1],n[2],n[3],t)};return r}function l(e,t,n,r,o,a){function i(e){return((m*e+d)*e+h)*e}function s(e){return((p*e+v)*e+g)*e}function l(e){return(3*m*e+2*d)*e+h}function u(e){return 1/(200*e)}function c(e,t){return s(f(e,t))}function f(e,t){function n(e){return e>=0?e:0-e}var r,o,a,s,u,c;for(a=e,c=0;8>c;c++){if(s=i(a)-e,t>n(s))return a;if(u=l(a),1e-6>n(u))break;a-=s/u}if(r=0,o=1,a=e,r>a)return r;if(a>o)return o;for(;o>r;){if(s=i(a),t>n(s-e))return a;e>s?r=a:o=a,a=.5*(o-r)+r}return a}var m=0,d=0,h=0,p=0,v=0,g=0;return h=3*t,d=3*(r-t)-h,m=1-h-d,g=3*n,v=3*(o-n)-g,p=1-g-v,c(e,u(a))}function u(e,t){var n,r=b.getElementTransform(e);n=r?new PureCSSMatrix(r):new PureCSSMatrix,t&&(n=n.translate(t.x,t.y));var a=o(n);return a.r=c(r),a}function c(e){for(var t,n=0;null!==(t=y.exec(e));){var r=t[1].toLowerCase(),a=t[2].split(",");if("matrix"==r){var i=r+"("+t[2]+")";n+=o(new PureCSSMatrix(i)).r}else if("rotate"==r){var s=a[0],l=parseFloat(h(s));s.match(z)&&(l=2*Math.PI*l/360),n+=l}}return n}function f(e,t){if(Math.abs(e.r-t.r)>Math.PI)if(t.r<e.r)for(;Math.abs(e.r-t.r)>Math.PI;)t.r+=2*Math.PI;else for(;Math.abs(e.r-t.r)>Math.PI;)t.r-=2*Math.PI;return t}function m(e,t,n){var r={};for(var o in e)e.hasOwnProperty(o)&&(r[o]=e[o]+(t[o]-e[o])*n);return r}function d(e,t){t=Math.abs(parseInt(t,10))||0;var n=Math.pow(10,t);return Math.round(e*n)/n}function h(e){return e.match(x)}var p,v,g,x=/([0-9.\-e]+)/g,y=/([a-z]+)\(([^\)]+)\)/g,z=/deg$/,b=e.zoomooz.helpers,w={duration:450,easing:"ease",nativeanimation:!1};jQuery.cssHooks.MsTransform={set:function(e,t){e.style.msTransform=t}},jQuery.cssHooks.MsTransformOrigin={set:function(e,t){e.style.msTransformOrigin=t}},e.fn.animateTransformation=function(r,i,s,l,c){i=jQuery.extend({},w,i),g&&(clearTimeout(g),g=null),i.nativeanimation&&l&&(g=setTimeout(l,i.duration)),this.each(function(){var m=e(this);r||(r=new PureCSSMatrix);var d=u(m,s),h=f(d,o(r));i.nativeanimation?(m.css(t(a(h),i.duration,i.easing)),c&&c()):n(m,d,h,i,l,c)})},e.fn.setTransformation=function(n){this.each(function(){var r=e(this),i=u(r),s=f(i,o(n));r.css(t(a(s)))})}}(jQuery),function(e){"use strict";function t(t,n){var r=jQuery.extend({},n);e.zoomooz.defaultSettings||e.zoomooz.setup();var o,a=e.zoomooz.defaultSettings,i=jQuery.extend({},r);for(o in a)a.hasOwnProperty(o)&&!i[o]&&(i[o]=t.data(o));for(var s=0;v.length>s;s++)o=v[s],i[o]||(i[o]=t.data(o));return jQuery.extend({},a,i)}function n(){var t=document.createElement("style");t.type="text/css";var n="";p.forEachPrefix(function(e){n+=e+"transform-origin: 0 0;"},!0),t.innerHTML="html {height:100%;}.noScroll{overflow:hidden !important;}* {"+n+"}",document.getElementsByTagName("head")[0].appendChild(t),e(document).ready(function(){var n=window.innerWidth-e("body").width();t.innerHTML+="body.noScroll,html.noScroll body{margin-right:"+n+"px;}"})}function r(){var t={targetsize:.9,scalemode:"both",root:e(document.body),debug:!1,animationendcallback:null,closeclick:!1},n=void 0!==window.mozInnerScreenX;return t.scrollresetbeforezoom=n,t}function o(t,n){var r,o=n.scrollresetbeforezoom,u=null;(function(){var e=n.root,s=e.parent();t[0]===e[0]?u=a(e,s):e.data("original-scroll")?o||(u=a(e,s)):(r=!0,u=i(e,s,o))})();var c,f=null;s(n.root);var d=null;if(t[0]!==n.root[0]){var h=m(t,n.root).inverse();o||(d=u),c=l(t,h,d,n),n.animationendcallback&&(f=function(){n.animationendcallback.call(t[0])})}else o&&(c=(new PureCSSMatrix).translate(-u.x,-u.y)),f=function(){var r=e(n.root),a=u.elem;a.removeClass("noScroll"),r.setTransformation(new PureCSSMatrix),r.data("original-scroll",null),e(document).off("touchmove"),o&&(a[0]==document.body||a[0]==window?window.scrollTo(u.x,u.y):(a.scrollLeft(u.x),a.scrollTop(u.y))),n.animationendcallback&&n.animationendcallback.call(t[0])};var p=null;o&&u&&u.animationstartedcallback&&(p=u.animationstartedcallback),r||(d=!1),e(n.root).animateTransformation(c,n,d,f,p)}function a(e,t){var n=e.data("original-scroll");return n||(n={elem:t,x:0,"y:":0}),n}function i(t,n,r){var o=t.scrollTop(),a=t.scrollLeft(),i=t;o||(o=n.scrollTop(),a=n.scrollLeft(),i=n);var s={elem:i,x:a,y:o};t.data("original-scroll",s),e(document).on("touchmove",function(e){e.preventDefault()});var l="translate(-"+a+"px,-"+o+"px)";return p.forEachPrefix(function(e){t.css(e+"transform",l)}),i.addClass("noScroll"),r&&(s.animationstartedcallback=function(){i[0]==document.body||i[0]==document?window.scrollTo(0,0):(i.scrollLeft(0),i.scrollTop(0))}),s}function s(t){var n=e(t).parent(),r=n.width(),o=n.height(),a=r/2,i=o/2,s=d(a)+"px "+d(i)+"px";p.forEachPrefix(function(e){t.css(e+"transform-origin",s)})}function l(t,n,r,o){var a,i=o.targetsize,s=o.scalemode,l=o.root,u=e(l).parent(),c=u.width(),f=u.height(),m=c/t.outerWidth(),d=f/t.outerHeight();if("width"==s)a=i*m;else if("height"==s)a=i*d;else if("both"==s)a=i*Math.min(m,d);else{if("scale"!=s)return console.log("wrong zoommode"),void 0;a=i}var h=(c-t.outerWidth()*a)/2,p=(f-t.outerHeight()*a)/2,v=c/2,g=f/2,x=-parseFloat(l.css("margin-left"))||0,y=-parseFloat(l.css("margin-top"))||0,z=new PureCSSMatrix;r&&(z=z.translate(r.x,r.y));var b=z.translate(x,y).translate(-v,-g).translate(h,p).scale(a,a).multiply(n).translate(v,g);return b}function u(e,t,n){return[e.a*t+e.c*n+e.e,e.b*t+e.d*n+e.f]}function c(e,t){var n=m(e,t.root).elements();f(u(n,0,0)),f(u(n,0,e.outerHeight())),f(u(n,e.outerWidth(),e.outerHeight())),f(u(n,e.outerWidth(),0))}function f(t){var n="width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";n+="left:"+t[0]+"px;top:"+t[1]+"px;";var r='<div class="debuglabel" style="'+n+'"></div>';e("#debug").append(r)}function m(t,n){var r=t[0];if(!r||!r.ownerDocument)return null;var o,a=new PureCSSMatrix;if(r===r.ownerDocument.body){var i=jQuery.offset.bodyOffset(r);return o=new PureCSSMatrix,o=o.translate(i.left,i.top),a=a.multiply(o)}var s;jQuery.offset.initialize?(jQuery.offset.initialize(),s={fixedPosition:jQuery.offset.supportsFixedPosition,doesNotAddBorder:jQuery.offset.doesNotAddBorder,doesAddBorderForTableAndCells:jQuery.support.doesAddBorderForTableAndCells,subtractsBorderForOverflowNotVisible:jQuery.offset.subtractsBorderForOverflowNotVisible}):s=jQuery.support;var l,u,c=r.offsetParent,f=r.ownerDocument,m=f.documentElement,d=f.body,p=n[0],v=f.defaultView;u=v?v.getComputedStyle(r,null):r.currentStyle;var g=r.offsetTop,x=r.offsetLeft,y=h().translate(x,g);for(y=y.multiply(h(r)),a=y.multiply(a);(r=r.parentNode)&&r!==p&&(g=0,x=0,!s.fixedPosition||"fixed"!==u.position);)l=v?v.getComputedStyle(r,null):r.currentStyle,g-=r.scrollTop,x-=r.scrollLeft,r===c&&(g+=r.offsetTop,x+=r.offsetLeft,!s.doesNotAddBorder||s.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(r.nodeName)||(g+=parseFloat(l.borderTopWidth)||0,x+=parseFloat(l.borderLeftWidth)||0),c=r.offsetParent),s.subtractsBorderForOverflowNotVisible&&"visible"!==l.overflow&&(g+=parseFloat(l.borderTopWidth)||0,x+=parseFloat(l.borderLeftWidth)||0),u=l,r.offsetParent==p&&(g-=parseFloat(e(r.offsetParent).css("margin-top"))||0,x-=parseFloat(e(r.offsetParent).css("margin-left"))||0),y=h().translate(x,g),y=y.multiply(h(r)),a=y.multiply(a);g=0,x=0,("relative"===u.position||"static"===u.position)&&(g+=d.offsetTop,x+=d.offsetLeft),s.fixedPosition&&"fixed"===u.position&&(g+=Math.max(m.scrollTop,d.scrollTop),x+=Math.max(m.scrollLeft,d.scrollLeft));var z=(new PureCSSMatrix).translate(x,g);return a=a.multiply(z)}function d(e){return Number(e).toFixed(6)}function h(e){var t=p.getElementTransform(e);return t?new PureCSSMatrix(t):new PureCSSMatrix}var p=e.zoomooz.helpers,v=["duration","easing","nativeanimation"];n(),e.zoomooz||(e.zoomooz={}),e.zoomooz.setup=function(t){e.zoomooz.defaultSettings=jQuery.extend(r(),t)},e.fn.zoomSettings=function(n){var r;return this.each(function(){var o=e(this);r=t(o,n)}),r},e.fn.zoomTo=function(t,n){return this.each(function(){var r=e(this);n||(t=r.zoomSettings(t)),o(r,t),t.debug?(0===e("#debug").length?e(t.root).append('<div id="debug"><div>'):e("#debug").html(""),c(r,t)):0!==e("#debug").length&&e("#debug").html("")}),this}}(jQuery),function(e){"use strict";function t(n,r,o){n.addClass("zoomTarget"),o.animationendcallback||(o.animationendcallback=o.closeclick?function(){e(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),n.addClass("selectedZoomTarget")}:function(){e(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),n.addClass("selectedZoomTarget zoomNotClickable")});var a=r.closest(".zoomContainer");0!==a.length&&(o.root=a);var i=o.root;if(!i.hasClass("zoomTarget")){var s=i.zoomSettings({});s.animationendcallback=function(){var t=e(this);e(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable"),t.addClass("selectedZoomTarget zoomNotClickable"),t.parent().addClass("selectedZoomTarget zoomNotClickable")},t(i,i,s),t(i.parent(),i,s),i.click()}n.on("click",function(e){o.closeclick&&r.hasClass("selectedZoomTarget")?o.root.click():r.zoomTo(o),e.stopPropagation()})}function n(){function e(e){var t="-webkit-touch-callout: "+(e?"default":"none")+";";return r.forEachPrefix(function(n){t+=n+"user-select:"+(e?"text":"none")+";"},!0),t}var t=document.createElement("style");t.type="text/css",t.innerHTML=".zoomTarget{"+e(!1)+"}"+".zoomTarget:hover{cursor:pointer!important;}"+".zoomNotClickable{"+e(!0)+"}"+".zoomNotClickable:hover{cursor:auto!important;}"+".zoomContainer{position:relative;padding:1px;margin:-1px;}",document.getElementsByTagName("head")[0].appendChild(t)}e.zoomooz||(e.zoomooz={});var r=e.zoomooz.helpers;e.fn.zoomTarget=function(n){this.each(function(){var r=e(this).zoomSettings(n);t(e(this),e(this),r)})},n(),e(document).ready(function(){e(".zoomTarget").zoomTarget()})}(jQuery),function(e){"use strict";e.zoomooz||(e.zoomooz={}),e.fn.zoomContainer=function(){},e(document).ready(function(){e(".zoomContainer").zoomContainer()})}(jQuery),function(e){function t(t,r){var o=n(),a=jQuery.extend({},r);for(var i in o)o.hasOwnProperty(i)&&!a[i]&&(a[i]=o[i]instanceof jQuery?e(t.data(i)):t.data(i));return jQuery.extend({},o,a)}function n(){return{type:"next",root:e(document.body),wrap:"true"}}function r(e,t){e.addClass("zoomButton");var n;n=t.root.hasClass("zoomContainer")?t.root:t.root.find(".zoomContainer");var r=function(){function e(e){return i.indexOf(e)}function t(t){var n=e(t)+1;return i.length>n&&0!==n?i[n]:null}function r(t){var n=e(t)-1;return 0>n?null:i[n]}function o(){return i[0]}function a(){return i[i.length-1]}var i=jQuery.makeArray(n.find(".zoomTarget"));return{next:t,prev:r,last:a,first:o}}();e.on("click",function(e){var o,a=!0,i=n.find(".selectedZoomTarget");0===i.length&&(i=r.first()),0===t.type.indexOf("prev")?(o=r.prev(i[0]),null===o&&(t.wrap?o=r.last():a=!1)):(o=r.next(i[0]),null===o&&(t.wrap?o=r.first():a=!1)),a&&o.click(),e.stopPropagation()})}e.zoomooz||(e.zoomooz={}),e.zoomooz.helpers,e.fn.zoomButton=function(n){this.each(function(){var o=t(e(this),n);r(e(this),o)})},e(document).ready(function(){e(".zoomButton").zoomButton()})}(jQuery);;/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
// 
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
// 
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
// 
// About: Release History
// 
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // A jQuery object containing all non-window elements to which the resize
  // event is bound.
  var elems = $([]),
    
    // Extend $.resize if it already exists, otherwise create it.
    jq_resize = $.resize = $.extend( $.resize, {} ),
    
    timeout_id,
    
    // Reused strings.
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
  
  // Property: jQuery.resize.delay
  // 
  // The numeric interval (in milliseconds) at which the resize event polling
  // loop executes. Defaults to 250.
  
  jq_resize[ str_delay ] = 250;
  
  // Property: jQuery.resize.throttleWindow
  // 
  // Throttle the native window object resize event to fire no more than once
  // every <jQuery.resize.delay> milliseconds. Defaults to true.
  // 
  // Because the window object has its own resize event, it doesn't need to be
  // provided by this plugin, and its execution can be left entirely up to the
  // browser. However, since certain browsers fire the resize event continuously
  // while others do not, enabling this will throttle the window resize event,
  // making event behavior consistent across all elements in all browsers.
  // 
  // While setting this property to false will disable window object resize
  // event throttling, please note that this property must be changed before any
  // window object resize event callbacks are bound.
  
  jq_resize[ str_throttle ] = true;
  
  // Event: resize event
  // 
  // Fired when an element's width or height changes. Because browsers only
  // provide this event for the window element, for other elements a polling
  // loop is initialized, running every <jQuery.resize.delay> milliseconds
  // to see if elements' dimensions have changed. You may bind with either
  // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
  // 
  // Usage:
  // 
  // > jQuery('selector').bind( 'resize', function(e) {
  // >   // element's width or height has changed!
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * The polling loop is not created until at least one callback is actually
  //   bound to the 'resize' event, and this single polling loop is shared
  //   across all elements.
  // 
  // Double firing issue in jQuery 1.3.2:
  // 
  // While this plugin works in jQuery 1.3.2, if an element's event callbacks
  // are manually triggered via .trigger( 'resize' ) or .resize() those
  // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
  // events system. This is not an issue when using jQuery 1.4+.
  // 
  // > // While this works in jQuery 1.4+
  // > $(elem).css({ width: new_w, height: new_h }).resize();
  // > 
  // > // In jQuery 1.3.2, you need to do this:
  // > var elem = $(elem);
  // > elem.css({ width: new_w, height: new_h });
  // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
  // > elem.resize();
      
  $.event.special[ str_resize ] = {
    
    // Called only when the first 'resize' event callback is bound per element.
    setup: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will bind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Add this element to the list of internal elements to monitor.
      elems = elems.add( elem );
      
      // Initialize data store on the element.
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );
      
      // If this is the first element added, start the polling loop.
      if ( elems.length === 1 ) {
        loopy();
      }
    },
    
    // Called only when the last 'resize' event callback is unbound per element.
    teardown: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will unbind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Remove this element from the list of internal elements to monitor.
      elems = elems.not( elem );
      
      // Remove any data stored on the element.
      elem.removeData( str_data );
      
      // If this is the last element removed, stop the polling loop.
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },
    
    // Called every time a 'resize' event callback is bound per element (new in
    // jQuery 1.4).
    add: function( handleObj ) {
      // Since window has its own native 'resize' event, return false so that
      // jQuery doesn't modify the event object. Unless, of course, we're
      // throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var old_handler;
      
      // The new_handler function is executed every time the event is triggered.
      // This is used to update the internal element data store with the width
      // and height when the event is triggered manually, to avoid double-firing
      // of the event callback. See the "Double firing issue in jQuery 1.3.2"
      // comments above for more information.
      
      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data );
        
        // If called from the polling loop, w and h will be passed in as
        // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
        // those values will need to be computed.
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();
        
        old_handler.apply( this, arguments );
      };
      
      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
    
  };
  
  function loopy() {
    
    // Start the polling loop, asynchronously.
    timeout_id = window[ str_setTimeout ](function(){
      
      // Iterate over all elements to which the 'resize' event is bound.
      elems.each(function(){
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );
        
        // If element size has changed since the last time, update the element
        // data store and trigger the 'resize' event.
        if ( width !== data.w || height !== data.h ) {
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }
        
      });
      
      // Loop.
      loopy();
      
    }, jq_resize[ str_delay ] );
    
  };
  
})(jQuery,this);
;d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(){}function o(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function a(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var e=0,r=fa.length;r>e;++e){var u=fa[e]+t;if(u in n)return u}}function c(){}function s(){}function l(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,i=e.indexOf(o)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function f(){Bo.event.preventDefault()}function h(){for(var n,t=Bo.event;n=t.sourceEvent;)t=n;return t}function g(n){for(var t=new s,e=0,r=arguments.length;++e<r;)t[arguments[e]]=l(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=Bo.event;u.target=n,Bo.event=u,t[u.type].apply(e,r)}finally{Bo.event=i}}},t}function p(n){return ga(n,ya),n}function v(n){return"function"==typeof n?n:function(){return pa(n,this)}}function d(n){return"function"==typeof n?n:function(){return va(n,this)}}function m(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=Bo.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?i:u}function y(n){return n.trim().replace(/\s+/g," ")}function x(n){return new RegExp("(?:^|\\s+)"+Bo.requote(n)+"(?:\\s+|$)","g")}function M(n){return n.trim().split(/^|\s+/)}function _(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=M(n).map(b);var u=n.length;return"function"==typeof t?r:e}function b(n){var t=x(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",y(u+" "+n))):e.setAttribute("class",y(u.replace(t," ")))}}function w(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function S(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function k(n){return"function"==typeof n?n:(n=Bo.ns.qualify(n)).local?function(){return this.ownerDocument.createElementNS(n.space,n.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,n)}}function E(n){return{__data__:n}}function A(n){return function(){return ma(this,n)}}function C(n){return arguments.length||(n=Bo.ascending),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function N(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,e);return n}function L(n){return ga(n,Ma),n}function T(n){var t,e;return function(r,u,i){var o,a=n[i].update,c=a.length;for(i!=e&&(e=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function q(){var n=this.__transition__;n&&++n.active}function z(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=s(t,Jo(arguments));r.call(this),this.addEventListener(n,this[o]=u,u.$=e),u._=t}function i(){var t,e=new RegExp("^__on([^.]+)"+Bo.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),s=R;a>0&&(n=n.substring(0,a));var l=ba.get(n);return l&&(n=l,s=D),a?t?u:r:t?c:i}function R(n,t){return function(e){var r=Bo.event;Bo.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{Bo.event=r}}}function D(n,t){var e=R(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function P(){var n=".dragsuppress-"+ ++Sa,t="click"+n,e=Bo.select(Qo).on("touchmove"+n,f).on("dragstart"+n,f).on("selectstart"+n,f);if(wa){var r=Ko.style,u=r[wa];r[wa]="none"}return function(i){function o(){e.on(t,null)}e.on(n,null),wa&&(r[wa]=u),i&&(e.on(t,function(){f(),o()},!0),setTimeout(o,0))}}function U(n,t){t.changedTouches&&(t=t.changedTouches[0]);var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>ka&&(Qo.scrollX||Qo.scrollY)){e=Bo.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var u=e[0][0].getScreenCTM();ka=!(u.f||u.e),e.remove()}return ka?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function j(n){return n>0?1:0>n?-1:0}function H(n){return n>1?0:-1>n?Ea:Math.acos(n)}function F(n){return n>1?Ca:-1>n?-Ca:Math.asin(n)}function O(n){return((n=Math.exp(n))-1/n)/2}function Y(n){return((n=Math.exp(n))+1/n)/2}function I(n){return((n=Math.exp(2*n))-1)/(n+1)}function Z(n){return(n=Math.sin(n/2))*n}function V(){}function X(n,t,e){return new $(n,t,e)}function $(n,t,e){this.h=n,this.s=t,this.l=e}function B(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*r(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,i=2*e-o,at(u(n+120),u(n),u(n-120))}function W(n,t,e){return new J(n,t,e)}function J(n,t,e){this.h=n,this.c=t,this.l=e}function G(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),K(e,Math.cos(n*=Ta)*t,Math.sin(n)*t)}function K(n,t,e){return new Q(n,t,e)}function Q(n,t,e){this.l=n,this.a=t,this.b=e}function nt(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=et(u)*Ya,r=et(r)*Ia,i=et(i)*Za,at(ut(3.2404542*u-1.5371385*r-.4985314*i),ut(-.969266*u+1.8760108*r+.041556*i),ut(.0556434*u-.2040259*r+1.0572252*i))}function tt(n,t,e){return n>0?W(Math.atan2(e,t)*qa,Math.sqrt(t*t+e*e),n):W(0/0,0/0,n)}function et(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function rt(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function ut(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function it(n){return at(n>>16,255&n>>8,255&n)}function ot(n){return it(n)+""}function at(n,t,e){return new ct(n,t,e)}function ct(n,t,e){this.r=n,this.g=t,this.b=e}function st(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function lt(n,t,e){var r,u,i,o=0,a=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(pt(u[0]),pt(u[1]),pt(u[2]))}return(i=$a.get(n))?t(i.r,i.g,i.b):(null!=n&&"#"===n.charAt(0)&&(4===n.length?(o=n.charAt(1),o+=o,a=n.charAt(2),a+=a,c=n.charAt(3),c+=c):7===n.length&&(o=n.substring(1,3),a=n.substring(3,5),c=n.substring(5,7)),o=parseInt(o,16),a=parseInt(a,16),c=parseInt(c,16)),t(o,a,c))}function ft(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=0/0,u=c>0&&1>c?0:r),X(r,u,c)}function ht(n,t,e){n=gt(n),t=gt(t),e=gt(e);var r=rt((.4124564*n+.3575761*t+.1804375*e)/Ya),u=rt((.2126729*n+.7151522*t+.072175*e)/Ia),i=rt((.0193339*n+.119192*t+.9503041*e)/Za);return K(116*u-16,500*(r-u),200*(u-i))}function gt(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function pt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function vt(n){return"function"==typeof n?n:function(){return n}}function dt(n){return n}function mt(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),yt(t,e,n,r)}}function yt(n,t,e,r){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(i,c)}catch(r){return o.error.call(i,r),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=Bo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,s=null;return!Qo.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=Bo.event;Bo.event=n;try{o.progress.call(i,c)}finally{Bo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(s=n,i):s},i.response=function(n){return e=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Jo(arguments)))}}),i.send=function(e,r,u){if(2===arguments.length&&"function"==typeof r&&(u=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var l in a)c.setRequestHeader(l,a[l]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=s&&(c.responseType=s),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==r?null:r),i},i.abort=function(){return c.abort(),i},Bo.rebind(i,o,"on"),null==r?i:i.get(xt(r))}function xt(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Mt(){var n=_t(),t=bt()-n;t>24?(isFinite(t)&&(clearTimeout(Ga),Ga=setTimeout(Mt,t)),Ja=0):(Ja=1,Qa(Mt))}function _t(){var n=Date.now();for(Ka=Ba;Ka;)n>=Ka.t&&(Ka.f=Ka.c(n-Ka.t)),Ka=Ka.n;return n}function bt(){for(var n,t=Ba,e=1/0;t;)t.f?t=n?n.n=t.n:Ba=t.n:(t.t<e&&(e=t.t),t=(n=t).n);return Wa=n,e}function wt(n,t){var e=Math.pow(10,3*ca(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function St(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function kt(n){return n+""}function Et(){}function At(n,t,e){var r=e.s=n+t,u=r-n,i=r-u;e.t=n-i+(t-u)}function Ct(n,t){n&&fc.hasOwnProperty(n.type)&&fc[n.type](n,t)}function Nt(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1],r[2]);t.lineEnd()}function Lt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)Nt(n[e],t,1);t.polygonEnd()}function Tt(){function n(n,t){n*=Ta,t=t*Ta/2+Ea/4;var e=n-r,o=Math.cos(t),a=Math.sin(t),c=i*a,s=u*o+c*Math.cos(e),l=c*Math.sin(e);gc.add(Math.atan2(l,s)),r=n,u=o,i=a}var t,e,r,u,i;pc.point=function(o,a){pc.point=n,r=(t=o)*Ta,u=Math.cos(a=(e=a)*Ta/2+Ea/4),i=Math.sin(a)},pc.lineEnd=function(){n(t,e)}}function qt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function zt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Rt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Dt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function Pt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Ut(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function jt(n){return[Math.atan2(n[1],n[0]),F(n[2])]}function Ht(n,t){return ca(n[0]-t[0])<Na&&ca(n[1]-t[1])<Na}function Ft(n,t){n*=Ta;var e=Math.cos(t*=Ta);Ot(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function Ot(n,t,e){++vc,mc+=(n-mc)/vc,yc+=(t-yc)/vc,xc+=(e-xc)/vc}function Yt(){function n(n,u){n*=Ta;var i=Math.cos(u*=Ta),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),s=Math.atan2(Math.sqrt((s=e*c-r*a)*s+(s=r*o-t*c)*s+(s=t*a-e*o)*s),t*o+e*a+r*c);dc+=s,Mc+=s*(t+(t=o)),_c+=s*(e+(e=a)),bc+=s*(r+(r=c)),Ot(t,e,r)}var t,e,r;Ec.point=function(u,i){u*=Ta;var o=Math.cos(i*=Ta);t=o*Math.cos(u),e=o*Math.sin(u),r=Math.sin(i),Ec.point=n,Ot(t,e,r)}}function It(){Ec.point=Ft}function Zt(){function n(n,t){n*=Ta;var e=Math.cos(t*=Ta),o=e*Math.cos(n),a=e*Math.sin(n),c=Math.sin(t),s=u*c-i*a,l=i*o-r*c,f=r*a-u*o,h=Math.sqrt(s*s+l*l+f*f),g=r*o+u*a+i*c,p=h&&-H(g)/h,v=Math.atan2(h,g);wc+=p*s,Sc+=p*l,kc+=p*f,dc+=v,Mc+=v*(r+(r=o)),_c+=v*(u+(u=a)),bc+=v*(i+(i=c)),Ot(r,u,i)}var t,e,r,u,i;Ec.point=function(o,a){t=o,e=a,Ec.point=n,o*=Ta;var c=Math.cos(a*=Ta);r=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),Ot(r,u,i)},Ec.lineEnd=function(){n(t,e),Ec.lineEnd=It,Ec.point=Ft}}function Vt(){return!0}function Xt(n,t,e,r,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(Ht(e,r)){u.lineStart();for(var a=0;t>a;++a)u.point((e=n[a])[0],e[1]);return u.lineEnd(),void 0}var c=new Bt(e,n,null,!0),s=new Bt(e,null,c,!1);c.o=s,i.push(c),o.push(s),c=new Bt(r,n,null,!1),s=new Bt(r,null,c,!0),c.o=s,i.push(c),o.push(s)}}),o.sort(t),$t(i),$t(o),i.length){for(var a=0,c=e,s=o.length;s>a;++a)o[a].e=c=!c;for(var l,f,h=i[0];;){for(var g=h,p=!0;g.v;)if((g=g.n)===h)return;l=g.z,u.lineStart();do{if(g.v=g.o.v=!0,g.e){if(p)for(var a=0,s=l.length;s>a;++a)u.point((f=l[a])[0],f[1]);else r(g.x,g.n.x,1,u);g=g.n}else{if(p){l=g.p.z;for(var a=l.length-1;a>=0;--a)u.point((f=l[a])[0],f[1])}else r(g.x,g.p.x,-1,u);g=g.p}g=g.o,l=g.z,p=!p}while(!g.v);u.lineEnd()}}}function $t(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.n=e=n[r],e.p=u,u=e;u.n=e=n[0],e.p=u}}function Bt(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Wt(n,t,e,r){return function(u,i){function o(t,e){var r=u(t,e);n(t=r[0],e=r[1])&&i.point(t,e)}function a(n,t){var e=u(n,t);d.point(e[0],e[1])}function c(){y.point=a,d.lineStart()}function s(){y.point=o,d.lineEnd()}function l(n,t){v.push([n,t]);var e=u(n,t);M.point(e[0],e[1])}function f(){M.lineStart(),v=[]}function h(){l(v[0][0],v[0][1]),M.lineEnd();var n,t=M.clean(),e=x.buffer(),r=e.length;if(v.pop(),p.push(v),v=null,r){if(1&t){n=e[0];var u,r=n.length-1,o=-1;for(i.lineStart();++o<r;)i.point((u=n[o])[0],u[1]);return i.lineEnd(),void 0}r>1&&2&t&&e.push(e.pop().concat(e.shift())),g.push(e.filter(Jt))}}var g,p,v,d=t(i),m=u.invert(r[0],r[1]),y={point:o,lineStart:c,lineEnd:s,polygonStart:function(){y.point=l,y.lineStart=f,y.lineEnd=h,g=[],p=[],i.polygonStart()},polygonEnd:function(){y.point=o,y.lineStart=c,y.lineEnd=s,g=Bo.merge(g);var n=Qt(m,p);g.length?Xt(g,Kt,n,e,i):n&&(i.lineStart(),e(null,null,1,i),i.lineEnd()),i.polygonEnd(),g=p=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}},x=Gt(),M=t(x);return y}}function Jt(n){return n.length>1}function Gt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:c,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Kt(n,t){return((n=n.x)[0]<0?n[1]-Ca-Na:Ca-n[1])-((t=t.x)[0]<0?t[1]-Ca-Na:Ca-t[1])}function Qt(n,t){var e=n[0],r=n[1],u=[Math.sin(e),-Math.cos(e),0],i=0,o=0;gc.reset();for(var a=0,c=t.length;c>a;++a){var s=t[a],l=s.length;if(l)for(var f=s[0],h=f[0],g=f[1]/2+Ea/4,p=Math.sin(g),v=Math.cos(g),d=1;;){d===l&&(d=0),n=s[d];var m=n[0],y=n[1]/2+Ea/4,x=Math.sin(y),M=Math.cos(y),_=m-h,b=ca(_)>Ea,w=p*x;if(gc.add(Math.atan2(w*Math.sin(_),v*M+w*Math.cos(_))),i+=b?_+(_>=0?Aa:-Aa):_,b^h>=e^m>=e){var S=Rt(qt(f),qt(n));Ut(S);var k=Rt(u,S);Ut(k);var E=(b^_>=0?-1:1)*F(k[2]);(r>E||r===E&&(S[0]||S[1]))&&(o+=b^_>=0?1:-1)}if(!d++)break;h=m,p=x,v=M,f=n}}return(-Na>i||Na>i&&0>gc)^1&o}function ne(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?Ea:-Ea,c=ca(i-e);ca(c-Ea)<Na?(n.point(e,r=(r+o)/2>0?Ca:-Ca),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(i,r),t=0):u!==a&&c>=Ea&&(ca(e-u)<Na&&(e-=u*Na),ca(i-a)<Na&&(i-=a*Na),r=te(e,r,i,o),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=i,r=o),u=a},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function te(n,t,e,r){var u,i,o=Math.sin(n-e);return ca(o)>Na?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+r)/2}function ee(n,t,e,r){var u;if(null==n)u=e*Ca,r.point(-Ea,u),r.point(0,u),r.point(Ea,u),r.point(Ea,0),r.point(Ea,-u),r.point(0,-u),r.point(-Ea,-u),r.point(-Ea,0),r.point(-Ea,u);else if(ca(n[0]-t[0])>Na){var i=n[0]<t[0]?Ea:-Ea;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function re(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function e(n){var e,i,c,s,l;return{lineStart:function(){s=c=!1,l=1},point:function(f,h){var g,p=[f,h],v=t(f,h),d=o?v?0:u(f,h):v?u(f+(0>f?Ea:-Ea),h):0;if(!e&&(s=c=v)&&n.lineStart(),v!==c&&(g=r(e,p),(Ht(e,g)||Ht(p,g))&&(p[0]+=Na,p[1]+=Na,v=t(p[0],p[1]))),v!==c)l=0,v?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(a&&e&&o^v){var m;d&i||!(m=r(p,e,!0))||(l=0,o?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!v||e&&Ht(e,p)||n.point(p[0],p[1]),e=p,c=v,i=d},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return l|(s&&c)<<1}}}function r(n,t,e){var r=qt(n),u=qt(t),o=[1,0,0],a=Rt(r,u),c=zt(a,a),s=a[0],l=c-s*s;if(!l)return!e&&n;var f=i*c/l,h=-i*s/l,g=Rt(o,a),p=Pt(o,f),v=Pt(a,h);Dt(p,v);var d=g,m=zt(p,d),y=zt(d,d),x=m*m-y*(zt(p,p)-1);if(!(0>x)){var M=Math.sqrt(x),_=Pt(d,(-m-M)/y);if(Dt(_,p),_=jt(_),!e)return _;var b,w=n[0],S=t[0],k=n[1],E=t[1];w>S&&(b=w,w=S,S=b);var A=S-w,C=ca(A-Ea)<Na,N=C||Na>A;if(!C&&k>E&&(b=k,k=E,E=b),N?C?k+E>0^_[1]<(ca(_[0]-w)<Na?k:E):k<=_[1]&&_[1]<=E:A>Ea^(w<=_[0]&&_[0]<=S)){var L=Pt(d,(-m+M)/y);return Dt(L,p),[_,jt(L)]}}}function u(t,e){var r=o?n:Ea-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}var i=Math.cos(n),o=i>0,a=ca(i)>Na,c=Te(n,6*Ta);return Wt(t,e,c,o?[0,-n]:[-Ea,n-Ea])}function ue(n,t,e,r){return function(u){var i,o=u.a,a=u.b,c=o.x,s=o.y,l=a.x,f=a.y,h=0,g=1,p=l-c,v=f-s;if(i=n-c,p||!(i>0)){if(i/=p,0>p){if(h>i)return;g>i&&(g=i)}else if(p>0){if(i>g)return;i>h&&(h=i)}if(i=e-c,p||!(0>i)){if(i/=p,0>p){if(i>g)return;i>h&&(h=i)}else if(p>0){if(h>i)return;g>i&&(g=i)}if(i=t-s,v||!(i>0)){if(i/=v,0>v){if(h>i)return;g>i&&(g=i)}else if(v>0){if(i>g)return;i>h&&(h=i)}if(i=r-s,v||!(0>i)){if(i/=v,0>v){if(i>g)return;i>h&&(h=i)}else if(v>0){if(h>i)return;g>i&&(g=i)}return h>0&&(u.a={x:c+h*p,y:s+h*v}),1>g&&(u.b={x:c+g*p,y:s+g*v}),u}}}}}}function ie(n,t,e,r){function u(r,u){return ca(r[0]-n)<Na?u>0?0:3:ca(r[0]-e)<Na?u>0?2:1:ca(r[1]-t)<Na?u>0?1:0:u>0?3:2}function i(n,t){return o(n.x,t.x)}function o(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function c(n){for(var t=0,e=m.length,r=n[1],u=0;e>u;++u)for(var i,o=1,a=m[u],c=a.length,l=a[0];c>o;++o)i=a[o],l[1]<=r?i[1]>r&&s(l,i,n)>0&&++t:i[1]<=r&&s(l,i,n)<0&&--t,l=i;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function l(i,a,c,s){var l=0,f=0;if(null==i||(l=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do s.point(0===l||3===l?n:e,l>1?r:t);while((l=(l+c+4)%4)!==f)}else s.point(a[0],a[1])}function f(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function h(n,t){f(n,t)&&a.point(n,t)}function g(){L.point=v,m&&m.push(y=[]),k=!0,S=!1,b=w=0/0}function p(){d&&(v(x,M),_&&S&&C.rejoin(),d.push(C.buffer())),L.point=h,S&&a.lineEnd()}function v(n,t){n=Math.max(-Cc,Math.min(Cc,n)),t=Math.max(-Cc,Math.min(Cc,t));var e=f(n,t);if(m&&y.push([n,t]),k)x=n,M=t,_=e,k=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&S)a.point(n,t);else{var r={a:{x:b,y:w},b:{x:n,y:t}};N(r)?(S||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),E=!1):e&&(a.lineStart(),a.point(n,t),E=!1)}b=n,w=t,S=e}var d,m,y,x,M,_,b,w,S,k,E,A=a,C=Gt(),N=ue(n,t,e,r),L={point:h,lineStart:g,lineEnd:p,polygonStart:function(){a=C,d=[],m=[],E=!0},polygonEnd:function(){a=A,d=Bo.merge(d);var t=c([n,r]),e=E&&t,u=d.length;(e||u)&&(a.polygonStart(),e&&(a.lineStart(),l(null,null,1,a),a.lineEnd()),u&&Xt(d,i,t,l,a),a.polygonEnd()),d=m=y=null}};return L}}function oe(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function ae(n){var t=0,e=Ea/3,r=we(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*Ea/180,e=n[1]*Ea/180):[180*(t/Ea),180*(e/Ea)]},u}function ce(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),o-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),o=Math.sqrt(i)/u;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/u,F((i-(n*n+e*e)*u*u)/(2*u))]},e}function se(){function n(n,t){Lc+=u*n-r*t,r=n,u=t}var t,e,r,u;Dc.point=function(i,o){Dc.point=n,t=r=i,e=u=o},Dc.lineEnd=function(){n(t,e)}}function le(n,t){Tc>n&&(Tc=n),n>zc&&(zc=n),qc>t&&(qc=t),t>Rc&&(Rc=t)}function fe(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function u(){o.push("Z")}var i=he(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return i=he(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function he(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function ge(n,t){mc+=n,yc+=t,++xc}function pe(){function n(n,r){var u=n-t,i=r-e,o=Math.sqrt(u*u+i*i);Mc+=o*(t+n)/2,_c+=o*(e+r)/2,bc+=o,ge(t=n,e=r)}var t,e;Uc.point=function(r,u){Uc.point=n,ge(t=r,e=u)}}function ve(){Uc.point=ge}function de(){function n(n,t){var e=n-r,i=t-u,o=Math.sqrt(e*e+i*i);Mc+=o*(r+n)/2,_c+=o*(u+t)/2,bc+=o,o=u*n-r*t,wc+=o*(r+n),Sc+=o*(u+t),kc+=3*o,ge(r=n,u=t)}var t,e,r,u;Uc.point=function(i,o){Uc.point=n,ge(t=r=i,e=u=o)},Uc.lineEnd=function(){n(t,e)}}function me(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,o,0,Aa)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:c};return a}function ye(n){function t(n){return(a?r:e)(n)}function e(t){return _e(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){x=0/0,S.point=i,t.lineStart()}function i(e,r){var i=qt([e,r]),o=n(e,r);u(x,M,y,_,b,w,x=o[0],M=o[1],y=e,_=i[0],b=i[1],w=i[2],a,t),t.point(x,M)}function o(){S.point=e,t.lineEnd()}function c(){r(),S.point=s,S.lineEnd=l}function s(n,t){i(f=n,h=t),g=x,p=M,v=_,d=b,m=w,S.point=i}function l(){u(x,M,y,_,b,w,g,p,f,v,d,m,a,t),S.lineEnd=o,o()}var f,h,g,p,v,d,m,y,x,M,_,b,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function u(t,e,r,a,c,s,l,f,h,g,p,v,d,m){var y=l-t,x=f-e,M=y*y+x*x;if(M>4*i&&d--){var _=a+g,b=c+p,w=s+v,S=Math.sqrt(_*_+b*b+w*w),k=Math.asin(w/=S),E=ca(ca(w)-1)<Na||ca(r-h)<Na?(r+h)/2:Math.atan2(b,_),A=n(E,k),C=A[0],N=A[1],L=C-t,T=N-e,q=x*L-y*T;(q*q/M>i||ca((y*L+x*T)/M-.5)>.3||o>a*g+c*p+s*v)&&(u(t,e,r,a,c,s,C,N,E,_/=S,b/=S,w,d,m),m.point(C,N),u(C,N,E,_,b,w,l,f,h,g,p,v,d,m))}}var i=.5,o=Math.cos(30*Ta),a=16;return t.precision=function(n){return arguments.length?(a=(i=n*n)>0&&16,t):Math.sqrt(i)},t}function xe(n){var t=ye(function(t,e){return n([t*qa,e*qa])});return function(n){return Se(t(n))}}function Me(n){this.stream=n}function _e(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function be(n){return we(function(){return n})()}function we(n){function t(n){return n=a(n[0]*Ta,n[1]*Ta),[n[0]*h+c,s-n[1]*h]}function e(n){return n=a.invert((n[0]-c)/h,(s-n[1])/h),n&&[n[0]*qa,n[1]*qa]}function r(){a=oe(o=Ae(m,y,x),i);var n=i(v,d);return c=g-n[0]*h,s=p+n[1]*h,u()}function u(){return l&&(l.valid=!1,l=null),t}var i,o,a,c,s,l,f=ye(function(n,t){return n=i(n,t),[n[0]*h+c,s-n[1]*h]}),h=150,g=480,p=250,v=0,d=0,m=0,y=0,x=0,M=Ac,_=dt,b=null,w=null;return t.stream=function(n){return l&&(l.valid=!1),l=Se(M(o,f(_(n)))),l.valid=!0,l},t.clipAngle=function(n){return arguments.length?(M=null==n?(b=n,Ac):re((b=+n)*Ta),u()):b},t.clipExtent=function(n){return arguments.length?(w=n,_=n?ie(n[0][0],n[0][1],n[1][0],n[1][1]):dt,u()):w},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],r()):[g,p]},t.center=function(n){return arguments.length?(v=n[0]%360*Ta,d=n[1]%360*Ta,r()):[v*qa,d*qa]},t.rotate=function(n){return arguments.length?(m=n[0]%360*Ta,y=n[1]%360*Ta,x=n.length>2?n[2]%360*Ta:0,r()):[m*qa,y*qa,x*qa]},Bo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function Se(n){return _e(n,function(t,e){n.point(t*Ta,e*Ta)})}function ke(n,t){return[n,t]}function Ee(n,t){return[n>Ea?n-Aa:-Ea>n?n+Aa:n,t]}function Ae(n,t,e){return n?t||e?oe(Ne(n),Le(t,e)):Ne(n):t||e?Le(t,e):Ee}function Ce(n){return function(t,e){return t+=n,[t>Ea?t-Aa:-Ea>t?t+Aa:t,e]}}function Ne(n){var t=Ce(n);return t.invert=Ce(-n),t}function Le(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*r+a*u;return[Math.atan2(c*i-l*o,a*r-s*u),F(l*i+c*o)]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*i-c*o;return[Math.atan2(c*i+s*o,a*r+l*u),F(l*r-a*u)]},e}function Te(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=qe(e,u),i=qe(e,i),(o>0?i>u:u>i)&&(u+=o*Aa)):(u=n+o*Aa,i=n-.5*c);for(var s,l=u;o>0?l>i:i>l;l-=c)a.point((s=jt([e,-r*Math.cos(l),-r*Math.sin(l)]))[0],s[1])}}function qe(n,t){var e=qt(t);e[0]-=n,Ut(e);var r=H(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Na)%(2*Math.PI)}function ze(n,t,e){var r=Bo.range(n,t-Na,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function Re(n,t,e){var r=Bo.range(n,t-Na,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function De(n){return n.source}function Pe(n){return n.target}function Ue(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(r),a=Math.sin(r),c=u*Math.cos(n),s=u*Math.sin(n),l=o*Math.cos(e),f=o*Math.sin(e),h=2*Math.asin(Math.sqrt(Z(r-t)+u*o*Z(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*l,u=e*s+t*f,o=e*i+t*a;return[Math.atan2(u,r)*qa,Math.atan2(o,Math.sqrt(r*r+u*u))*qa]}:function(){return[n*qa,t*qa]};return p.distance=h,p}function je(){function n(n,u){var i=Math.sin(u*=Ta),o=Math.cos(u),a=ca((n*=Ta)-t),c=Math.cos(a);jc+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*i-e*o*c)*a),e*i+r*o*c),t=n,e=i,r=o}var t,e,r;Hc.point=function(u,i){t=u*Ta,e=Math.sin(i*=Ta),r=Math.cos(i),Hc.point=n},Hc.lineEnd=function(){Hc.point=Hc.lineEnd=c}}function He(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,r*o),Math.asin(r&&e*i/r)]},e}function Fe(n,t){function e(n,t){var e=ca(ca(t)-Ca)<Na?0:o/Math.pow(u(t),i);return[e*Math.sin(i*n),o-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(Ea/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),o=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=o-t,r=j(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(o/r,1/i))-Ca]},e):Ye}function Oe(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return ca(u)<Na?ke:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-j(u)*Math.sqrt(n*n+e*e)]},e)}function Ye(n,t){return[n,Math.log(Math.tan(Ea/4+t/2))]}function Ie(n){var t,e=be(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=i.apply(e,arguments);if(o===e){if(t=null==n){var a=Ea*r(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ze(n,t){return[Math.log(Math.tan(Ea/4+t/2)),-n]}function Ve(n){return n[0]}function Xe(n){return n[1]}function $e(n,t,e,r){var u,i,o,a,c,s,l;return u=r[n],i=u[0],o=u[1],u=r[t],a=u[0],c=u[1],u=r[e],s=u[0],l=u[1],(l-o)*(a-i)-(c-o)*(s-i)>0}function Be(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function We(n,t,e,r){var u=n[0],i=e[0],o=t[0]-u,a=r[0]-i,c=n[1],s=e[1],l=t[1]-c,f=r[1]-s,h=(a*(c-s)-f*(u-i))/(f*o-a*l);return[u+h*o,c+h*l]}function Je(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Ge(){yr(this),this.edge=this.site=this.circle=null}function Ke(n){var t=Gc.pop()||new Ge;return t.site=n,t}function Qe(n){sr(n),Bc.remove(n),Gc.push(n),yr(n)}function nr(n){var t=n.circle,e=t.x,r=t.cy,u={x:e,y:r},i=n.P,o=n.N,a=[n];Qe(n);for(var c=i;c.circle&&ca(e-c.circle.x)<Na&&ca(r-c.circle.cy)<Na;)i=c.P,a.unshift(c),Qe(c),c=i;a.unshift(c),sr(c);for(var s=o;s.circle&&ca(e-s.circle.x)<Na&&ca(r-s.circle.cy)<Na;)o=s.N,a.push(s),Qe(s),s=o;a.push(s),sr(s);var l,f=a.length;for(l=1;f>l;++l)s=a[l],c=a[l-1],vr(s.edge,c.site,s.site,u);c=a[0],s=a[f-1],s.edge=gr(c.site,s.site,null,u),cr(c),cr(s)}function tr(n){for(var t,e,r,u,i=n.x,o=n.y,a=Bc._;a;)if(r=er(a,o)-i,r>Na)a=a.L;else{if(u=i-rr(a,o),!(u>Na)){r>-Na?(t=a.P,e=a):u>-Na?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var c=Ke(n);if(Bc.insert(t,c),t||e){if(t===e)return sr(t),e=Ke(t.site),Bc.insert(c,e),c.edge=e.edge=gr(t.site,c.site),cr(t),cr(e),void 0;if(!e)return c.edge=gr(t.site,c.site),void 0;sr(t),sr(e);var s=t.site,l=s.x,f=s.y,h=n.x-l,g=n.y-f,p=e.site,v=p.x-l,d=p.y-f,m=2*(h*d-g*v),y=h*h+g*g,x=v*v+d*d,M={x:(d*y-g*x)/m+l,y:(h*x-v*y)/m+f};vr(e.edge,s,p,M),c.edge=gr(s,n,null,M),e.edge=gr(n,p,null,M),cr(t),cr(e)}}function er(n,t){var e=n.site,r=e.x,u=e.y,i=u-t;if(!i)return r;var o=n.P;if(!o)return-1/0;e=o.site;var a=e.x,c=e.y,s=c-t;if(!s)return a;var l=a-r,f=1/i-1/s,h=l/s;return f?(-h+Math.sqrt(h*h-2*f*(l*l/(-2*s)-c+s/2+u-i/2)))/f+r:(r+a)/2}function rr(n,t){var e=n.N;if(e)return er(e,t);var r=n.site;return r.y===t?r.x:1/0}function ur(n){this.site=n,this.edges=[]}function ir(n){for(var t,e,r,u,i,o,a,c,s,l,f=n[0][0],h=n[1][0],g=n[0][1],p=n[1][1],v=$c,d=v.length;d--;)if(i=v[d],i&&i.prepare())for(a=i.edges,c=a.length,o=0;c>o;)l=a[o].end(),r=l.x,u=l.y,s=a[++o%c].start(),t=s.x,e=s.y,(ca(r-t)>Na||ca(u-e)>Na)&&(a.splice(o,0,new dr(pr(i.site,l,ca(r-f)<Na&&p-u>Na?{x:f,y:ca(t-f)<Na?e:p}:ca(u-p)<Na&&h-r>Na?{x:ca(e-p)<Na?t:h,y:p}:ca(r-h)<Na&&u-g>Na?{x:h,y:ca(t-h)<Na?e:g}:ca(u-g)<Na&&r-f>Na?{x:ca(e-g)<Na?t:f,y:g}:null),i.site,null)),++c)}function or(n,t){return t.angle-n.angle}function ar(){yr(this),this.x=this.y=this.arc=this.site=this.cy=null}function cr(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,u=n.site,i=e.site;if(r!==i){var o=u.x,a=u.y,c=r.x-o,s=r.y-a,l=i.x-o,f=i.y-a,h=2*(c*f-s*l);if(!(h>=-La)){var g=c*c+s*s,p=l*l+f*f,v=(f*g-s*p)/h,d=(c*p-l*g)/h,f=d+a,m=Kc.pop()||new ar;m.arc=n,m.site=u,m.x=v+o,m.y=f+Math.sqrt(v*v+d*d),m.cy=f,n.circle=m;for(var y=null,x=Jc._;x;)if(m.y<x.y||m.y===x.y&&m.x<=x.x){if(!x.L){y=x.P;break}x=x.L}else{if(!x.R){y=x;break}x=x.R}Jc.insert(y,m),y||(Wc=m)}}}}function sr(n){var t=n.circle;t&&(t.P||(Wc=t.N),Jc.remove(t),Kc.push(t),yr(t),n.circle=null)}function lr(n){for(var t,e=Xc,r=ue(n[0][0],n[0][1],n[1][0],n[1][1]),u=e.length;u--;)t=e[u],(!fr(t,n)||!r(t)||ca(t.a.x-t.b.x)<Na&&ca(t.a.y-t.b.y)<Na)&&(t.a=t.b=null,e.splice(u,1))}function fr(n,t){var e=n.b;if(e)return!0;var r,u,i=n.a,o=t[0][0],a=t[1][0],c=t[0][1],s=t[1][1],l=n.l,f=n.r,h=l.x,g=l.y,p=f.x,v=f.y,d=(h+p)/2,m=(g+v)/2;
if(v===g){if(o>d||d>=a)return;if(h>p){if(i){if(i.y>=s)return}else i={x:d,y:c};e={x:d,y:s}}else{if(i){if(i.y<c)return}else i={x:d,y:s};e={x:d,y:c}}}else if(r=(h-p)/(v-g),u=m-r*d,-1>r||r>1)if(h>p){if(i){if(i.y>=s)return}else i={x:(c-u)/r,y:c};e={x:(s-u)/r,y:s}}else{if(i){if(i.y<c)return}else i={x:(s-u)/r,y:s};e={x:(c-u)/r,y:c}}else if(v>g){if(i){if(i.x>=a)return}else i={x:o,y:r*o+u};e={x:a,y:r*a+u}}else{if(i){if(i.x<o)return}else i={x:a,y:r*a+u};e={x:o,y:r*o+u}}return n.a=i,n.b=e,!0}function hr(n,t){this.l=n,this.r=t,this.a=this.b=null}function gr(n,t,e,r){var u=new hr(n,t);return Xc.push(u),e&&vr(u,n,t,e),r&&vr(u,t,n,r),$c[n.i].edges.push(new dr(u,n,t)),$c[t.i].edges.push(new dr(u,t,n)),u}function pr(n,t,e){var r=new hr(n,null);return r.a=t,r.b=e,Xc.push(r),r}function vr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function dr(n,t,e){var r=n.a,u=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(u.x-r.x,r.y-u.y):Math.atan2(r.x-u.x,u.y-r.y)}function mr(){this._=null}function yr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function xr(n,t){var e=t,r=t.R,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function Mr(n,t){var e=t,r=t.L,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function _r(n){for(;n.L;)n=n.L;return n}function br(n,t){var e,r,u,i=n.sort(wr).pop();for(Xc=[],$c=new Array(n.length),Bc=new mr,Jc=new mr;;)if(u=Wc,i&&(!u||i.y<u.y||i.y===u.y&&i.x<u.x))(i.x!==e||i.y!==r)&&($c[i.i]=new ur(i),tr(i),e=i.x,r=i.y),i=n.pop();else{if(!u)break;nr(u.arc)}t&&(lr(t),ir(t));var o={cells:$c,edges:Xc};return Bc=Jc=Xc=$c=null,o}function wr(n,t){return t.y-n.y||t.x-n.x}function Sr(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function kr(n){return n.x}function Er(n){return n.y}function Ar(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function Cr(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var o=.5*(e+u),a=.5*(r+i),c=t.nodes;c[0]&&Cr(n,c[0],e,r,o,a),c[1]&&Cr(n,c[1],o,r,u,a),c[2]&&Cr(n,c[2],e,a,o,i),c[3]&&Cr(n,c[3],o,a,u,i)}}function Nr(n,t){n=Bo.rgb(n),t=Bo.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,o=t.g-r,a=t.b-u;return function(n){return"#"+st(Math.round(e+i*n))+st(Math.round(r+o*n))+st(Math.round(u+a*n))}}function Lr(n,t){var e,r={},u={};for(e in n)e in t?r[e]=zr(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function Tr(n,t){return t-=n=+n,function(e){return n+t*e}}function qr(n,t){var e,r,u,i,o,a=0,c=0,s=[],l=[];for(n+="",t+="",ns.lastIndex=0,r=0;e=ns.exec(t);++r)e.index&&s.push(t.substring(a,c=e.index)),l.push({i:s.length,x:e[0]}),s.push(null),a=ns.lastIndex;for(a<t.length&&s.push(t.substring(a)),r=0,i=l.length;(e=ns.exec(n))&&i>r;++r)if(o=l[r],o.x==e[0]){if(o.i)if(null==s[o.i+1])for(s[o.i-1]+=o.x,s.splice(o.i,1),u=r+1;i>u;++u)l[u].i--;else for(s[o.i-1]+=o.x+s[o.i+1],s.splice(o.i,2),u=r+1;i>u;++u)l[u].i-=2;else if(null==s[o.i+1])s[o.i]=o.x;else for(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1),u=r+1;i>u;++u)l[u].i--;l.splice(r,1),i--,r--}else o.x=Tr(parseFloat(e[0]),parseFloat(o.x));for(;i>r;)o=l.pop(),null==s[o.i+1]?s[o.i]=o.x:(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1)),i--;return 1===s.length?null==s[0]?(o=l[0].x,function(n){return o(n)+""}):function(){return t}:function(n){for(r=0;i>r;++r)s[(o=l[r]).i]=o.x(n);return s.join("")}}function zr(n,t){for(var e,r=Bo.interpolators.length;--r>=0&&!(e=Bo.interpolators[r](n,t)););return e}function Rr(n,t){var e,r=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(zr(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;o>e;++e)u[e]=t[e];return function(n){for(e=0;a>e;++e)u[e]=r[e](n);return u}}function Dr(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function Pr(n){return function(t){return 1-n(1-t)}}function Ur(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function jr(n){return n*n}function Hr(n){return n*n*n}function Fr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Or(n){return function(t){return Math.pow(t,n)}}function Yr(n){return 1-Math.cos(n*Ca)}function Ir(n){return Math.pow(2,10*(n-1))}function Zr(n){return 1-Math.sqrt(1-n*n)}function Vr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Aa*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Aa/t)}}function Xr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function $r(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Br(n,t){n=Bo.hcl(n),t=Bo.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,o=t.c-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return G(e+i*n,r+o*n,u+a*n)+""}}function Wr(n,t){n=Bo.hsl(n),t=Bo.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,o=t.s-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return B(e+i*n,r+o*n,u+a*n)+""}}function Jr(n,t){n=Bo.lab(n),t=Bo.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,o=t.a-r,a=t.b-u;return function(n){return nt(e+i*n,r+o*n,u+a*n)+""}}function Gr(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Kr(n){var t=[n.a,n.b],e=[n.c,n.d],r=nu(t),u=Qr(t,e),i=nu(tu(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*qa,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*qa:0}function Qr(n,t){return n[0]*t[0]+n[1]*t[1]}function nu(n){var t=Math.sqrt(Qr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function tu(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function eu(n,t){var e,r=[],u=[],i=Bo.transform(n),o=Bo.transform(t),a=i.translate,c=o.translate,s=i.rotate,l=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:Tr(a[0],c[0])},{i:3,x:Tr(a[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),s!=l?(s-l>180?l+=360:l-s>180&&(s+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:Tr(s,l)})):l&&r.push(r.pop()+"rotate("+l+")"),f!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:Tr(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:Tr(g[0],p[0])},{i:e-2,x:Tr(g[1],p[1])})):(1!=p[0]||1!=p[1])&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function ru(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function uu(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function iu(n){for(var t=n.source,e=n.target,r=au(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function ou(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function au(n,t){if(n===t)return n;for(var e=ou(n),r=ou(t),u=e.pop(),i=r.pop(),o=null;u===i;)o=u,u=e.pop(),i=r.pop();return o}function cu(n){n.fixed|=2}function su(n){n.fixed&=-7}function lu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function fu(n){n.fixed&=-5}function hu(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(hu(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var s=t*e[n.point.index];n.charge+=n.pointCharge=s,r+=s*n.point.x,u+=s*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function gu(n,t){return Bo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=mu,n}function pu(n){return n.children}function vu(n){return n.value}function du(n,t){return t.value-n.value}function mu(n){return Bo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function yu(n){return n.x}function xu(n){return n.y}function Mu(n,t,e){n.y0=t,n.y=e}function _u(n){return Bo.range(n.length)}function bu(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function wu(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function Su(n){return n.reduce(ku,0)}function ku(n,t){return n+t[1]}function Eu(n,t){return Au(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function Au(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function Cu(n){return[Bo.min(n),Bo.max(n)]}function Nu(n,t){return n.parent==t.parent?1:2}function Lu(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function Tu(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function qu(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=qu(e[i],t),n)>0&&(n=r);return n}function zu(n,t){return n.x-t.x}function Ru(n,t){return t.x-n.x}function Du(n,t){return n.depth-t.depth}function Pu(n,t){function e(n,r){var u=n.children;if(u&&(o=u.length))for(var i,o,a=null,c=-1;++c<o;)i=u[c],e(i,a),a=i;t(n,r)}e(n,null)}function Uu(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function ju(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function Hu(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function Fu(n,t){return n.value-t.value}function Ou(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Yu(n,t){n._pack_next=t,t._pack_prev=n}function Iu(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return.999*u*u>e*e+r*r}function Zu(n){function t(n){l=Math.min(n.x-n.r,l),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(s=e.length)){var e,r,u,i,o,a,c,s,l=1/0,f=-1/0,h=1/0,g=-1/0;if(e.forEach(Vu),r=e[0],r.x=-r.r,r.y=0,t(r),s>1&&(u=e[1],u.x=u.r,u.y=0,t(u),s>2))for(i=e[2],Bu(r,u,i),t(i),Ou(r,i),r._pack_prev=i,Ou(i,u),u=r._pack_next,o=3;s>o;o++){Bu(r,u,i=e[o]);var p=0,v=1,d=1;for(a=u._pack_next;a!==u;a=a._pack_next,v++)if(Iu(a,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==a._pack_prev&&!Iu(c,i);c=c._pack_prev,d++);p?(d>v||v==d&&u.r<r.r?Yu(r,u=a):Yu(r=c,u),o--):(Ou(r,i),u=i,t(i))}var m=(l+f)/2,y=(h+g)/2,x=0;for(o=0;s>o;o++)i=e[o],i.x-=m,i.y-=y,x=Math.max(x,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=x,e.forEach(Xu)}}function Vu(n){n._pack_next=n._pack_prev=n}function Xu(n){delete n._pack_next,delete n._pack_prev}function $u(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,o=u.length;++i<o;)$u(u[i],t,e,r)}function Bu(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var o=t.r+e.r,a=u*u+i*i;o*=o,r*=r;var c=.5+(r-o)/(2*a),s=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+c*u+s*i,e.y=n.y+c*i-s*u}else e.x=n.x+r,e.y=n.y}function Wu(n){return 1+Bo.max(n,function(n){return n.y})}function Ju(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Gu(n){var t=n.children;return t&&t.length?Gu(t[0]):n}function Ku(n){var t,e=n.children;return e&&(t=e.length)?Ku(e[t-1]):n}function Qu(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function ni(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function ti(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function ei(n){return n.rangeExtent?n.rangeExtent():ti(n.range())}function ri(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function ui(n,t){var e,r=0,u=n.length-1,i=n[r],o=n[u];return i>o&&(e=r,r=u,u=e,e=i,i=o,o=e),n[r]=t.floor(i),n[u]=t.ceil(o),n}function ii(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:ls}function oi(n,t,e,r){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(e(n[o-1],n[o])),i.push(r(t[o-1],t[o]));return function(t){var e=Bo.bisect(n,t,1,a)-1;return i[e](u[e](t))}}function ai(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?oi:ri,c=r?uu:ru;return o=u(n,t,c,e),a=u(t,n,c,zr),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Gr)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return fi(n,t)},i.tickFormat=function(t,e){return hi(n,t,e)},i.nice=function(t){return si(n,t),u()},i.copy=function(){return ai(n,t,e,r)},u()}function ci(n,t){return Bo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function si(n,t){return ui(n,ii(li(n,t)[2]))}function li(n,t){null==t&&(t=10);var e=ti(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function fi(n,t){return Bo.range.apply(Bo,li(n,t))}function hi(n,t,e){var r=li(n,t);return Bo.format(e?e.replace(ic,function(n,t,e,u,i,o,a,c,s,l){return[t,e,u,i,o,a,c,s||"."+pi(l,r),l].join("")}):",."+gi(r[2])+"f")}function gi(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function pi(n,t){var e=gi(t[2]);return n in fs?Math.abs(e-gi(Math.max(Math.abs(t[0]),Math.abs(t[1]))))+ +("e"!==n):e-2*("%"===n)}function vi(n,t,e,r){function u(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(u)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(u)),o):t},o.nice=function(){var t=ui(r.map(u),e?Math:gs);return n.domain(t),r=t.map(i),o},o.ticks=function(){var n=ti(r),o=[],a=n[0],c=n[1],s=Math.floor(u(a)),l=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(l-s)){if(e){for(;l>s;s++)for(var h=1;f>h;h++)o.push(i(s)*h);o.push(i(s))}else for(o.push(i(s));s++<l;)for(var h=f-1;h>0;h--)o.push(i(s)*h);for(s=0;o[s]<a;s++);for(l=o.length;o[l-1]>c;l--);o=o.slice(s,l)}return o},o.tickFormat=function(n,t){if(!arguments.length)return hs;arguments.length<2?t=hs:"function"!=typeof t&&(t=Bo.format(t));var r,a=Math.max(.1,n/o.ticks().length),c=e?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+r))<=a?t(n):""}},o.copy=function(){return vi(n.copy(),t,e,r)},ci(o,n)}function di(n,t,e){function r(t){return n(u(t))}var u=mi(t),i=mi(1/t);return r.invert=function(t){return i(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(u)),r):e},r.ticks=function(n){return fi(e,n)},r.tickFormat=function(n,t){return hi(e,n,t)},r.nice=function(n){return r.domain(si(e,n))},r.exponent=function(o){return arguments.length?(u=mi(t=o),i=mi(1/t),n.domain(e.map(u)),r):t},r.copy=function(){return di(n.copy(),t,e)},ci(r,n)}function mi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function yi(n,t){function e(e){return o[((i.get(e)||"range"===t.t&&i.set(e,n.push(e)))-1)%o.length]}function r(t,e){return Bo.range(n.length).map(function(n){return t+e*n})}var i,o,a;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var o,a=-1,c=r.length;++a<c;)i.has(o=r[a])||i.set(o,n.push(o));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(o=n,a=0,t={t:"range",a:arguments},e):o},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],s=u[1],l=(s-c)/(Math.max(1,n.length-1)+i);return o=r(n.length<2?(c+s)/2:c+l*i/2,l),a=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=(f-l)/(n.length-i+2*c);return o=r(l+h*c,h),s&&o.reverse(),a=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=Math.floor((f-l)/(n.length-i+2*c)),g=f-l-(n.length-i)*h;return o=r(l+Math.round(g/2),h),s&&o.reverse(),a=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return a},e.rangeExtent=function(){return ti(t.a[0])},e.copy=function(){return yi(n,t)},e.domain(n)}function xi(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=Bo.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?void 0:t[Bo.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(Bo.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.invertExtent=function(e){return e=t.indexOf(e),0>e?[0/0,0/0]:[e>0?u[e-1]:n[0],e<u.length?u[e]:n[n.length-1]]},r.copy=function(){return xi(n,t)},e()}function Mi(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),o=e.length-1,r}var i,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},r.copy=function(){return Mi(n,t,e)},u()}function _i(n,t){function e(e){return e>=e?t[Bo.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return _i(n,t)},e}function bi(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return fi(n,t)},t.tickFormat=function(t,e){return hi(n,t,e)},t.copy=function(){return bi(n)},t}function wi(n){return n.innerRadius}function Si(n){return n.outerRadius}function ki(n){return n.startAngle}function Ei(n){return n.endAngle}function Ai(n){function t(t){function o(){s.push("M",i(n(l),a))}for(var c,s=[],l=[],f=-1,h=t.length,g=vt(e),p=vt(r);++f<h;)u.call(this,c=t[f],f)?l.push([+g.call(this,c,f),+p.call(this,c,f)]):l.length&&(o(),l=[]);return l.length&&o(),s.length?s.join(""):null}var e=Ve,r=Xe,u=Vt,i=Ci,o=i.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=Ms.get(n)||Ci).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function Ci(n){return n.join("L")}function Ni(n){return Ci(n)+"Z"}function Li(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&u.push("H",r[0]),u.join("")}function Ti(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function qi(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function zi(n,t){return n.length<4?Ci(n):n[1]+Pi(n.slice(1,n.length-1),Ui(n,t))}function Ri(n,t){return n.length<3?Ci(n):n[0]+Pi((n.push(n[0]),n),Ui([n[n.length-2]].concat(n,[n[1]]),t))}function Di(n,t){return n.length<3?Ci(n):n[0]+Pi(n,Ui(n,t))}function Pi(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Ci(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(e&&(r+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,r+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var s=2;s<t.length;s++,c++)i=n[c],a=t[s],r+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(e){var l=n[c];r+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+l[0]+","+l[1]}return r}function Ui(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)e=i,i=o,o=n[a],r.push([u*(o[0]-e[0]),u*(o[1]-e[1])]);return r}function ji(n){if(n.length<3)return Ci(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],o=[u,u,u,(r=n[1])[0]],a=[i,i,i,r[1]],c=[u,",",i,"L",Yi(ws,o),",",Yi(ws,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Ii(c,o,a);return n.pop(),c.push("L",r),c.join("")}function Hi(n){if(n.length<4)return Ci(n);for(var t,e=[],r=-1,u=n.length,i=[0],o=[0];++r<3;)t=n[r],i.push(t[0]),o.push(t[1]);for(e.push(Yi(ws,i)+","+Yi(ws,o)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),Ii(e,i,o);return e.join("")}function Fi(n){for(var t,e,r=-1,u=n.length,i=u+4,o=[],a=[];++r<4;)e=n[r%u],o.push(e[0]),a.push(e[1]);for(t=[Yi(ws,o),",",Yi(ws,a)],--r;++r<i;)e=n[r%u],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Ii(t,o,a);return t.join("")}function Oi(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],o=n[0][1],a=n[e][0]-i,c=n[e][1]-o,s=-1;++s<=e;)r=n[s],u=s/e,r[0]=t*r[0]+(1-t)*(i+u*a),r[1]=t*r[1]+(1-t)*(o+u*c);return ji(n)}function Yi(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Ii(n,t,e){n.push("C",Yi(_s,t),",",Yi(_s,e),",",Yi(bs,t),",",Yi(bs,e),",",Yi(ws,t),",",Yi(ws,e))}function Zi(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Vi(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],o=r[0]=Zi(u,i);++t<e;)r[t]=(o+(o=Zi(u=i,i=n[t+1])))/2;return r[t]=o,r}function Xi(n){for(var t,e,r,u,i=[],o=Vi(n),a=-1,c=n.length-1;++a<c;)t=Zi(n[a],n[a+1]),ca(t)<Na?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*e,o[a+1]=u*r));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function $i(n){return n.length<3?Ci(n):n[0]+Pi(n,Xi(n))}function Bi(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+ys,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Wi(n){function t(t){function c(){v.push("M",a(n(m),f),l,s(n(d.reverse()),f),"Z")}for(var h,g,p,v=[],d=[],m=[],y=-1,x=t.length,M=vt(e),_=vt(u),b=e===r?function(){return g}:vt(r),w=u===i?function(){return p}:vt(i);++y<x;)o.call(this,h=t[y],y)?(d.push([g=+M.call(this,h,y),p=+_.call(this,h,y)]),m.push([+b.call(this,h,y),+w.call(this,h,y)])):d.length&&(c(),d=[],m=[]);return d.length&&c(),v.length?v.join(""):null}var e=Ve,r=Ve,u=0,i=Xe,o=Vt,a=Ci,c=a.key,s=a,l="L",f=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=Ms.get(n)||Ci).key,s=a.reverse||a,l=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function Ji(n){return n.radius}function Gi(n){return[n.x,n.y]}function Ki(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+ys;return[e*Math.cos(r),e*Math.sin(r)]}}function Qi(){return 64}function no(){return"circle"}function to(n){var t=Math.sqrt(n/Ea);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function eo(n,t){return ga(n,Ns),n.id=t,n}function ro(n,t,e,r){var u=n.id;return N(n,"function"==typeof e?function(n,i,o){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,o)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function uo(n){return null==n&&(n=""),function(){this.textContent=n}}function io(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),o=i[e];if(!o){var a=r.time;o=i[e]={tween:new u,time:a,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,Bo.timer(function(r){function u(r){return i.active>e?s():(i.active=e,o.event&&o.event.start.call(n,l,t),o.tween.forEach(function(e,r){(r=r.call(n,l,t))&&v.push(r)}),Bo.timer(function(){return p.c=c(r||1)?Vt:c,1},0,a),void 0)}function c(r){if(i.active!==e)return s();for(var u=r/g,a=f(u),c=v.length;c>0;)v[--c].call(n,a);return u>=1?(o.event&&o.event.end.call(n,l,t),s()):void 0}function s(){return--i.count?delete i[e]:delete n.__transition__,1}var l=n.__data__,f=o.ease,h=o.delay,g=o.duration,p=Ka,v=[];return p.t=h+a,r>=h?u(r-h):(p.c=u,void 0)},0,a)}}function oo(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function ao(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function co(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function so(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new Ps(e-1)),1),e}function i(n,e){return t(n=new Ps(+n),e),n}function o(n,r,i){var o=u(n),a=[];if(i>1)for(;r>o;)e(o)%i||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{Ps=co;var r=new co;return r._=n,o(r,t,e)}finally{Ps=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=lo(n);return c.floor=c,c.round=lo(r),c.ceil=lo(u),c.offset=lo(i),c.range=a,n}function lo(n){return function(t,e){try{Ps=co;var r=new co;return r._=t,n(r,e)._}finally{Ps=Date}}}function fo(n){function t(t){for(var r,u,i,o=[],a=-1,c=0;++a<e;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=tl[r=n.charAt(++a)])&&(r=n.charAt(++a)),(i=el[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),o.push(r),c=a+1);return o.push(n.substring(c,a)),o.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},r=ho(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+12*e.p);var u=null!=e.Z&&Ps!==co,i=new(u?co:Ps);return"j"in e?i.setFullYear(e.y,0,e.j):"w"in e&&("W"in e||"U"in e)?(i.setFullYear(e.y,0,1),i.setFullYear(e.y,0,"W"in e?(e.w+6)%7+7*e.W-(i.getDay()+5)%7:e.w+7*e.U-(i.getDay()+6)%7)):i.setFullYear(e.y,e.m,e.d),i.setHours(e.H+Math.floor(e.Z/100),e.M+e.Z%100,e.S,e.L),u?i._:i},t.toString=function(){return n},t}function ho(n,t,e,r){for(var u,i,o,a=0,c=t.length,s=e.length;c>a;){if(r>=s)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=rl[o in tl?t.charAt(a++):o],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function go(n){return new RegExp("^(?:"+n.map(Bo.requote).join("|")+")","i")}function po(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function vo(n,t,e){var r=0>n?"-":"",u=(r?-n:n)+"",i=u.length;return r+(e>i?new Array(e-i+1).join(t)+u:u)}function mo(n,t,e){Bs.lastIndex=0;var r=Bs.exec(t.substring(e));return r?(n.w=Ws.get(r[0].toLowerCase()),e+r[0].length):-1}function yo(n,t,e){Xs.lastIndex=0;var r=Xs.exec(t.substring(e));return r?(n.w=$s.get(r[0].toLowerCase()),e+r[0].length):-1}function xo(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Mo(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e));return r?(n.U=+r[0],e+r[0].length):-1}function _o(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e));return r?(n.W=+r[0],e+r[0].length):-1}function bo(n,t,e){Ks.lastIndex=0;var r=Ks.exec(t.substring(e));return r?(n.m=Qs.get(r[0].toLowerCase()),e+r[0].length):-1}function wo(n,t,e){Js.lastIndex=0;var r=Js.exec(t.substring(e));return r?(n.m=Gs.get(r[0].toLowerCase()),e+r[0].length):-1}function So(n,t,e){return ho(n,el.c.toString(),t,e)}function ko(n,t,e){return ho(n,el.x.toString(),t,e)}function Eo(n,t,e){return ho(n,el.X.toString(),t,e)}function Ao(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Co(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.y=Lo(+r[0]),e+r[0].length):-1}function No(n,t,e){return/^[+-]\d{4}$/.test(t=t.substring(e,e+5))?(n.Z=+t,e+5):-1}function Lo(n){return n+(n>68?1900:2e3)}function To(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function qo(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function zo(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function Ro(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function Do(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function Po(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function Uo(n,t,e){ul.lastIndex=0;var r=ul.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function jo(n,t,e){var r=il.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function Ho(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(ca(t)/60),u=ca(t)%60;return e+vo(r,"0",2)+vo(u,"0",2)}function Fo(n,t,e){nl.lastIndex=0;var r=nl.exec(t.substring(e,e+1));return r?e+r[0].length:-1}function Oo(n){function t(n){try{Ps=co;var t=new Ps;return t._=n,e(t)}finally{Ps=Date}}var e=fo(n);return t.parse=function(n){try{Ps=co;var t=e.parse(n);return t&&t._}finally{Ps=Date}},t.toString=e.toString,t}function Yo(n){return n.toISOString()}function Io(n,t,e){function r(t){return n(t)}function u(n,e){var r=n[1]-n[0],u=r/e,i=Bo.bisect(al,u);return i==al.length?[t.year,li(n.map(function(n){return n/31536e6}),e)[2]]:i?t[u/al[i-1]<al[i]/u?i-1:i]:[fl,li(n,e)[2]]}return r.invert=function(t){return Zo(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Zo)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,Zo(+e+1),t).length}var i=r.domain(),o=ti(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),r.domain(ui(i,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=Zo(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=Zo(+t+1);return t}}:n))},r.ticks=function(n,t){var e=ti(r.domain()),i=null==n?u(e,10):"number"==typeof n?u(e,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(e[0],Zo(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return Io(n.copy(),t,e)},ci(r,n)}function Zo(n){return new Date(n)}function Vo(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function Xo(n){return JSON.parse(n.responseText)}function $o(n){var t=Go.createRange();return t.selectNode(Go.body),t.createContextualFragment(n.responseText)}var Bo={version:"3.3.13"};Date.now||(Date.now=function(){return+new Date});var Wo=[].slice,Jo=function(n){return Wo.call(n)},Go=document,Ko=Go.documentElement,Qo=window;try{Jo(Ko.childNodes)[0].nodeType}catch(na){Jo=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}try{Go.createElement("div").style.setProperty("opacity",0,"")}catch(ta){var ea=Qo.Element.prototype,ra=ea.setAttribute,ua=ea.setAttributeNS,ia=Qo.CSSStyleDeclaration.prototype,oa=ia.setProperty;ea.setAttribute=function(n,t){ra.call(this,n,t+"")},ea.setAttributeNS=function(n,t,e){ua.call(this,n,t,e+"")},ia.setProperty=function(n,t,e){oa.call(this,n,t+"",e)}}Bo.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},Bo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},Bo.min=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&e>r&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&e>r&&(e=r)}return e},Bo.max=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&r>e&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&r>e&&(e=r)}return e},Bo.extent=function(n,t){var e,r,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(e=u=n[i])&&e>=e);)e=u=void 0;for(;++i<o;)null!=(r=n[i])&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<o&&!(null!=(e=u=t.call(n,n[i],i))&&e>=e);)e=void 0;for(;++i<o;)null!=(r=t.call(n,n[i],i))&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},Bo.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},Bo.mean=function(t,e){var r,u=t.length,i=0,o=-1,a=0;if(1===arguments.length)for(;++o<u;)n(r=t[o])&&(i+=(r-i)/++a);else for(;++o<u;)n(r=e.call(t,t[o],o))&&(i+=(r-i)/++a);return a?i:void 0},Bo.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;
return i?u+i*(n[r]-u):u},Bo.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?Bo.quantile(t.sort(Bo.ascending),.5):void 0},Bo.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var aa=Bo.bisector(function(n){return n});Bo.bisectLeft=aa.left,Bo.bisect=Bo.bisectRight=aa.right,Bo.shuffle=function(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n},Bo.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},Bo.pairs=function(n){for(var t,e=0,r=n.length-1,u=n[0],i=new Array(0>r?0:r);r>e;)i[e]=[t=u,u=n[++e]];return i},Bo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=Bo.min(arguments,t),r=new Array(e);++n<e;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},Bo.transpose=function(n){return Bo.zip.apply(Bo,n)},Bo.keys=function(n){var t=[];for(var e in n)t.push(e);return t},Bo.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},Bo.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},Bo.merge=function(n){for(var t,e,r,u=n.length,i=-1,o=0;++i<u;)o+=n[i].length;for(e=new Array(o);--u>=0;)for(r=n[u],t=r.length;--t>=0;)e[--o]=r[t];return e};var ca=Math.abs;Bo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var u,i=[],o=e(ca(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(u=n+r*++a)>t;)i.push(u/o);else for(;(u=n+r*++a)<t;)i.push(u/o);return i},Bo.map=function(n){var t=new u;if(n instanceof u)n.forEach(function(n,e){t.set(n,e)});else for(var e in n)t.set(e,n[e]);return t},r(u,{has:function(n){return sa+n in this},get:function(n){return this[sa+n]},set:function(n,t){return this[sa+n]=t},remove:function(n){return n=sa+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===la&&n.call(this,t.substring(1),this[t])}});var sa="\x00",la=sa.charCodeAt(0);Bo.nest=function(){function n(t,a,c){if(c>=o.length)return r?r.call(i,a):e?a.sort(e):a;for(var s,l,f,h,g=-1,p=a.length,v=o[c++],d=new u;++g<p;)(h=d.get(s=v(l=a[g])))?h.push(l):d.set(s,[l]);return t?(l=t(),f=function(e,r){l.set(e,n(t,r,c))}):(l={},f=function(e,r){l[e]=n(t,r,c)}),d.forEach(f),l}function t(n,e){if(e>=o.length)return n;var r=[],u=a[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},o=[],a=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(Bo.map,e,0),0)},i.key=function(n){return o.push(n),i},i.sortKeys=function(n){return a[o.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},Bo.set=function(n){var t=new i;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},r(i,{has:function(n){return sa+n in this},add:function(n){return this[sa+n]=!0,n},remove:function(n){return n=sa+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===la&&n.call(this,t.substring(1))}}),Bo.behavior={},Bo.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=o(n,t,t[e]);return n};var fa=["webkit","ms","moz","Moz","o","O"];Bo.dispatch=function(){for(var n=new s,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=l(n);return n},s.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},Bo.event=null,Bo.requote=function(n){return n.replace(ha,"\\$&")};var ha=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ga={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},pa=function(n,t){return t.querySelector(n)},va=function(n,t){return t.querySelectorAll(n)},da=Ko[a(Ko,"matchesSelector")],ma=function(n,t){return da.call(n,t)};"function"==typeof Sizzle&&(pa=function(n,t){return Sizzle(n,t)[0]||null},va=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},ma=Sizzle.matchesSelector),Bo.selection=function(){return _a};var ya=Bo.selection.prototype=[];ya.select=function(n){var t,e,r,u,i=[];n=v(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var c=-1,s=r.length;++c<s;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c,o)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return p(i)},ya.selectAll=function(n){var t,e,r=[];n=d(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(e=o[a])&&(r.push(t=Jo(n.call(e,e.__data__,a,u))),t.parentNode=e);return p(r)};var xa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Bo.ns={prefix:xa,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),xa.hasOwnProperty(e)?{space:xa[e],local:n}:n}},ya.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=Bo.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(m(t,n[t]));return this}return this.each(m(n,t))},ya.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=M(n)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!x(n[u]).test(t))return!1;return!0}for(t in n)this.each(_(t,n[t]));return this}return this.each(_(n,t))},ya.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(w(e,n[e],t));return this}if(2>r)return Qo.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(w(n,t,e))},ya.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(S(t,n[t]));return this}return this.each(S(n,t))},ya.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},ya.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},ya.append=function(n){return n=k(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},ya.insert=function(n,t){return n=k(n),t=v(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},ya.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},ya.data=function(n,t){function e(n,e){var r,i,o,a=n.length,f=e.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),v=new Array(a);if(t){var d,m=new u,y=new u,x=[];for(r=-1;++r<a;)d=t.call(i=n[r],i.__data__,r),m.has(d)?v[r]=i:m.set(d,i),x.push(d);for(r=-1;++r<f;)d=t.call(e,o=e[r],r),(i=m.get(d))?(g[r]=i,i.__data__=o):y.has(d)||(p[r]=E(o)),y.set(d,o),m.remove(d);for(r=-1;++r<a;)m.has(x[r])&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],o=e[r],i?(i.__data__=o,g[r]=i):p[r]=E(o);for(;f>r;++r)p[r]=E(e[r]);for(;a>r;++r)v[r]=n[r]}p.update=g,p.parentNode=g.parentNode=v.parentNode=n.parentNode,c.push(p),s.push(g),l.push(v)}var r,i,o=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(n[o]=i.__data__);return n}var c=L([]),s=p([]),l=p([]);if("function"==typeof n)for(;++o<a;)e(r=this[o],n.call(r,r.parentNode.__data__,o));else for(;++o<a;)e(r=this[o],n);return s.enter=function(){return c},s.exit=function(){return l},s},ya.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},ya.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=A(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a,i)&&t.push(r)}return p(u)},ya.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},ya.sort=function(n){n=C.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},ya.each=function(n){return N(this,function(t,e,r){n.call(t,t.__data__,e,r)})},ya.call=function(n){var t=Jo(arguments);return n.apply(t[0]=this,t),this},ya.empty=function(){return!this.node()},ya.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null},ya.size=function(){var n=0;return this.each(function(){++n}),n};var Ma=[];Bo.selection.enter=L,Bo.selection.enter.prototype=Ma,Ma.append=ya.append,Ma.empty=ya.empty,Ma.node=ya.node,Ma.call=ya.call,Ma.size=ya.size,Ma.select=function(n){for(var t,e,r,u,i,o=[],a=-1,c=this.length;++a<c;){r=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var s=-1,l=u.length;++s<l;)(i=u[s])?(t.push(r[s]=e=n.call(u.parentNode,i.__data__,s,a)),e.__data__=i.__data__):t.push(null)}return p(o)},Ma.insert=function(n,t){return arguments.length<2&&(t=T(this)),ya.insert.call(this,n,t)},ya.transition=function(){for(var n,t,e=ks||++Ls,r=[],u=Es||{time:Date.now(),ease:Fr,delay:0,duration:250},i=-1,o=this.length;++i<o;){r.push(n=[]);for(var a=this[i],c=-1,s=a.length;++c<s;)(t=a[c])&&io(t,c,e,u),n.push(t)}return eo(r,e)},ya.interrupt=function(){return this.each(q)},Bo.select=function(n){var t=["string"==typeof n?pa(n,Go):n];return t.parentNode=Ko,p([t])},Bo.selectAll=function(n){var t=Jo("string"==typeof n?va(n,Go):n);return t.parentNode=Ko,p([t])};var _a=Bo.select(Ko);ya.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(z(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(z(n,t,e))};var ba=Bo.map({mouseenter:"mouseover",mouseleave:"mouseout"});ba.forEach(function(n){"on"+n in Go&&ba.remove(n)});var wa="onselectstart"in Go?null:a(Ko.style,"userSelect"),Sa=0;Bo.mouse=function(n){return U(n,h())};var ka=/WebKit/.test(Qo.navigator.userAgent)?-1:0;Bo.touches=function(n,t){return arguments.length<2&&(t=h().touches),t?Jo(t).map(function(t){var e=U(n,t);return e.identifier=t.identifier,e}):[]},Bo.behavior.drag=function(){function n(){this.on("mousedown.drag",o).on("touchstart.drag",a)}function t(){return Bo.event.changedTouches[0].identifier}function e(n,t){return Bo.touches(n).filter(function(n){return n.identifier===t})[0]}function r(n,t,e,r){return function(){function o(){var n=t(l,g),e=n[0]-v[0],r=n[1]-v[1];d|=e|r,v=n,f({type:"drag",x:n[0]+c[0],y:n[1]+c[1],dx:e,dy:r})}function a(){m.on(e+"."+p,null).on(r+"."+p,null),y(d&&Bo.event.target===h),f({type:"dragend"})}var c,s=this,l=s.parentNode,f=u.of(s,arguments),h=Bo.event.target,g=n(),p=null==g?"drag":"drag-"+g,v=t(l,g),d=0,m=Bo.select(Qo).on(e+"."+p,o).on(r+"."+p,a),y=P();i?(c=i.apply(s,arguments),c=[c.x-v[0],c.y-v[1]]):c=[0,0],f({type:"dragstart"})}}var u=g(n,"drag","dragstart","dragend"),i=null,o=r(c,Bo.mouse,"mousemove","mouseup"),a=r(t,e,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},Bo.rebind(n,u,"on")};var Ea=Math.PI,Aa=2*Ea,Ca=Ea/2,Na=1e-6,La=Na*Na,Ta=Ea/180,qa=180/Ea,za=Math.SQRT2,Ra=2,Da=4;Bo.interpolateZoom=function(n,t){function e(n){var t=n*y;if(m){var e=Y(v),o=i/(Ra*h)*(e*I(za*t+v)-O(v));return[r+o*s,u+o*l,i*e/Y(za*t+v)]}return[r+n*s,u+n*l,i*Math.exp(za*t)]}var r=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],s=o-r,l=a-u,f=s*s+l*l,h=Math.sqrt(f),g=(c*c-i*i+Da*f)/(2*i*Ra*h),p=(c*c-i*i-Da*f)/(2*c*Ra*h),v=Math.log(Math.sqrt(g*g+1)-g),d=Math.log(Math.sqrt(p*p+1)-p),m=d-v,y=(m||Math.log(c/i))/za;return e.duration=1e3*y,e},Bo.behavior.zoom=function(){function n(n){n.on(A,s).on(ja+".zoom",h).on(C,p).on("dblclick.zoom",v).on(L,l)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function e(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function r(n){S.k=Math.max(E[0],Math.min(E[1],n))}function u(n,t){t=e(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){_&&_.domain(M.range().map(function(n){return(n-S.x)/S.k}).map(M.invert)),w&&w.domain(b.range().map(function(n){return(n-S.y)/S.k}).map(b.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function s(){function n(){l=1,u(Bo.mouse(r),h),a(i)}function e(){f.on(C,Qo===r?p:null).on(N,null),g(l&&Bo.event.target===s),c(i)}var r=this,i=T.of(r,arguments),s=Bo.event.target,l=0,f=Bo.select(Qo).on(C,n).on(N,e),h=t(Bo.mouse(r)),g=P();q.call(r),o(i)}function l(){function n(){var n=Bo.touches(p);return g=S.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=t(n))}),n}function e(){for(var t=Bo.event.changedTouches,e=0,i=t.length;i>e;++e)d[t[e].identifier]=null;var o=n(),c=Date.now();if(1===o.length){if(500>c-x){var s=o[0],l=d[s.identifier];r(2*S.k),u(s,l),f(),a(v)}x=c}else if(o.length>1){var s=o[0],h=o[1],g=s[0]-h[0],p=s[1]-h[1];m=g*g+p*p}}function i(){for(var n,t,e,i,o=Bo.touches(p),c=0,s=o.length;s>c;++c,i=null)if(e=o[c],i=d[e.identifier]){if(t)break;n=e,t=i}if(i){var l=(l=e[0]-n[0])*l+(l=e[1]-n[1])*l,f=m&&Math.sqrt(l/m);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],r(f*g)}x=null,u(n,t),a(v)}function h(){if(Bo.event.touches.length){for(var t=Bo.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var u in d)return void n()}b.on(M,null).on(_,null),w.on(A,s).on(L,l),k(),c(v)}var g,p=this,v=T.of(p,arguments),d={},m=0,y=Bo.event.changedTouches[0].identifier,M="touchmove.zoom-"+y,_="touchend.zoom-"+y,b=Bo.select(Qo).on(M,i).on(_,h),w=Bo.select(p).on(A,null).on(L,e),k=P();q.call(p),e(),o(v)}function h(){var n=T.of(this,arguments);y?clearTimeout(y):(q.call(this),o(n)),y=setTimeout(function(){y=null,c(n)},50),f();var e=m||Bo.mouse(this);d||(d=t(e)),r(Math.pow(2,.002*Pa())*S.k),u(e,d),a(n)}function p(){d=null}function v(){var n=T.of(this,arguments),e=Bo.mouse(this),i=t(e),s=Math.log(S.k)/Math.LN2;o(n),r(Math.pow(2,Bo.event.shiftKey?Math.ceil(s)-1:Math.floor(s)+1)),u(e,i),a(n),c(n)}var d,m,y,x,M,_,b,w,S={x:0,y:0,k:1},k=[960,500],E=Ua,A="mousedown.zoom",C="mousemove.zoom",N="mouseup.zoom",L="touchstart.zoom",T=g(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=T.of(this,arguments),t=S;ks?Bo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var e=k[0],r=k[1],u=e/2,i=r/2,o=Bo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,e/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,e/t.k]);return function(t){var r=o(t),c=e/r[2];this.__chart__=S={x:u-r[0]*c,y:i-r[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(E=null==t?Ua:[+t[0],+t[1]],n):E},n.center=function(t){return arguments.length?(m=t&&[+t[0],+t[1]],n):m},n.size=function(t){return arguments.length?(k=t&&[+t[0],+t[1]],n):k},n.x=function(t){return arguments.length?(_=t,M=t.copy(),S={x:0,y:0,k:1},n):_},n.y=function(t){return arguments.length?(w=t,b=t.copy(),S={x:0,y:0,k:1},n):w},Bo.rebind(n,T,"on")};var Pa,Ua=[0,1/0],ja="onwheel"in Go?(Pa=function(){return-Bo.event.deltaY*(Bo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in Go?(Pa=function(){return Bo.event.wheelDelta},"mousewheel"):(Pa=function(){return-Bo.event.detail},"MozMousePixelScroll");V.prototype.toString=function(){return this.rgb()+""},Bo.hsl=function(n,t,e){return 1===arguments.length?n instanceof $?X(n.h,n.s,n.l):lt(""+n,ft,X):X(+n,+t,+e)};var Ha=$.prototype=new V;Ha.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),X(this.h,this.s,this.l/n)},Ha.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),X(this.h,this.s,n*this.l)},Ha.rgb=function(){return B(this.h,this.s,this.l)},Bo.hcl=function(n,t,e){return 1===arguments.length?n instanceof J?W(n.h,n.c,n.l):n instanceof Q?tt(n.l,n.a,n.b):tt((n=ht((n=Bo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):W(+n,+t,+e)};var Fa=J.prototype=new V;Fa.brighter=function(n){return W(this.h,this.c,Math.min(100,this.l+Oa*(arguments.length?n:1)))},Fa.darker=function(n){return W(this.h,this.c,Math.max(0,this.l-Oa*(arguments.length?n:1)))},Fa.rgb=function(){return G(this.h,this.c,this.l).rgb()},Bo.lab=function(n,t,e){return 1===arguments.length?n instanceof Q?K(n.l,n.a,n.b):n instanceof J?G(n.l,n.c,n.h):ht((n=Bo.rgb(n)).r,n.g,n.b):K(+n,+t,+e)};var Oa=18,Ya=.95047,Ia=1,Za=1.08883,Va=Q.prototype=new V;Va.brighter=function(n){return K(Math.min(100,this.l+Oa*(arguments.length?n:1)),this.a,this.b)},Va.darker=function(n){return K(Math.max(0,this.l-Oa*(arguments.length?n:1)),this.a,this.b)},Va.rgb=function(){return nt(this.l,this.a,this.b)},Bo.rgb=function(n,t,e){return 1===arguments.length?n instanceof ct?at(n.r,n.g,n.b):lt(""+n,at,B):at(~~n,~~t,~~e)};var Xa=ct.prototype=new V;Xa.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),at(Math.min(255,~~(t/n)),Math.min(255,~~(e/n)),Math.min(255,~~(r/n)))):at(u,u,u)},Xa.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),at(~~(n*this.r),~~(n*this.g),~~(n*this.b))},Xa.hsl=function(){return ft(this.r,this.g,this.b)},Xa.toString=function(){return"#"+st(this.r)+st(this.g)+st(this.b)};var $a=Bo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});$a.forEach(function(n,t){$a.set(n,it(t))}),Bo.functor=vt,Bo.xhr=mt(dt),Bo.dsv=function(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var o=yt(n,t,null==e?r:u(e),i);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:u(n)):e},o}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function o(t){return t.map(a).join(n)}function a(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=new RegExp('["'+n+"\n]"),s=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(l>=c)return o;if(u)return u=!1,i;var t=l;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}l=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,10===n.charCodeAt(e+2)&&++l):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>l;){var r=n.charCodeAt(l++),a=1;if(10===r)u=!0;else if(13===r)u=!0,10===n.charCodeAt(l)&&(++l,++a);else if(r!==s)continue;return n.substring(t,l-a)}return n.substring(t)}for(var r,u,i={},o={},a=[],c=n.length,l=0,f=0;(r=e())!==o;){for(var h=[];r!==i&&r!==o;)h.push(r),r=e();(!t||(h=t(h,f++)))&&a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new i,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(a).join(n)].concat(t.map(function(t){return u.map(function(n){return a(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(o).join("\n")},e},Bo.csv=Bo.dsv(",","text/csv"),Bo.tsv=Bo.dsv("	","text/tab-separated-values");var Ba,Wa,Ja,Ga,Ka,Qa=Qo[a(Qo,"requestAnimationFrame")]||function(n){setTimeout(n,17)};Bo.timer=function(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var u=e+t,i={c:n,t:u,f:!1,n:null};Wa?Wa.n=i:Ba=i,Wa=i,Ja||(Ga=clearTimeout(Ga),Ja=1,Qa(Mt))},Bo.timer.flush=function(){_t(),bt()};var nc=".",tc=",",ec=[3,3],rc="$",uc=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(wt);Bo.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=Bo.round(n,St(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((0>=e?e+1:e-1)/3)))),uc[8+e/3]},Bo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},Bo.format=function(n){var t=ic.exec(n),e=t[1]||" ",r=t[2]||">",u=t[3]||"",i=t[4]||"",o=t[5],a=+t[6],c=t[7],s=t[8],l=t[9],f=1,h="",g=!1;switch(s&&(s=+s.substring(1)),(o||"0"===e&&"="===r)&&(o=e="0",r="=",c&&(a-=Math.floor((a-1)/4))),l){case"n":c=!0,l="g";break;case"%":f=100,h="%",l="f";break;case"p":f=100,h="%",l="r";break;case"b":case"o":case"x":case"X":"#"===i&&(i="0"+l.toLowerCase());case"c":case"d":g=!0,s=0;break;case"s":f=-1,l="r"}"#"===i?i="":"$"===i&&(i=rc),"r"!=l||s||(l="g"),null!=s&&("g"==l?s=Math.max(1,Math.min(21,s)):("e"==l||"f"==l)&&(s=Math.max(0,Math.min(20,s)))),l=oc.get(l)||kt;var p=o&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):u;if(0>f){var v=Bo.formatPrefix(n,s);n=v.scale(n),h=v.symbol}else n*=f;n=l(n,s);var d=n.lastIndexOf("."),m=0>d?n:n.substring(0,d),y=0>d?"":nc+n.substring(d+1);!o&&c&&(m=ac(m));var x=i.length+m.length+y.length+(p?0:t.length),M=a>x?new Array(x=a-x+1).join(e):"";return p&&(m=ac(M+m)),t+=i,n=m+y,("<"===r?t+n+M:">"===r?M+t+n:"^"===r?M.substring(0,x>>=1)+t+n+M.substring(x):t+(p?n:M+n))+h}};var ic=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,oc=Bo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=Bo.round(n,St(n,t))).toFixed(Math.max(0,Math.min(20,St(n*(1+1e-15),t))))}}),ac=dt;if(ec){var cc=ec.length;ac=function(n){for(var t=n.length,e=[],r=0,u=ec[0];t>0&&u>0;)e.push(n.substring(t-=u,t+u)),u=ec[r=(r+1)%cc];return e.reverse().join(tc)}}Bo.geo={},Et.prototype={s:0,t:0,add:function(n){At(n,this.t,sc),At(sc.s,this.s,this),this.s?this.t+=sc.t:this.s=sc.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var sc=new Et;Bo.geo.stream=function(n,t){n&&lc.hasOwnProperty(n.type)?lc[n.type](n,t):Ct(n,t)};var lc={Feature:function(n,t){Ct(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)Ct(e[r].geometry,t)}},fc={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){Nt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Nt(e[r],t,0)},Polygon:function(n,t){Lt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Lt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)Ct(e[r],t)}};Bo.geo.area=function(n){return hc=0,Bo.geo.stream(n,pc),hc};var hc,gc=new Et,pc={sphere:function(){hc+=4*Ea},point:c,lineStart:c,lineEnd:c,polygonStart:function(){gc.reset(),pc.lineStart=Tt},polygonEnd:function(){var n=2*gc;hc+=0>n?4*Ea+n:n,pc.lineStart=pc.lineEnd=pc.point=c}};Bo.geo.bounds=function(){function n(n,t){x.push(M=[l=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,e){var r=qt([t*Ta,e*Ta]);if(m){var u=Rt(m,r),i=[u[1],-u[0],0],o=Rt(i,u);Ut(o),o=jt(o);var c=t-p,s=c>0?1:-1,v=o[0]*qa*s,d=ca(c)>180;if(d^(v>s*p&&s*t>v)){var y=o[1]*qa;y>g&&(g=y)}else if(v=(v+360)%360-180,d^(v>s*p&&s*t>v)){var y=-o[1]*qa;f>y&&(f=y)}else f>e&&(f=e),e>g&&(g=e);d?p>t?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t):h>=l?(l>t&&(l=t),t>h&&(h=t)):t>p?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t)}else n(t,e);m=r,p=t}function e(){_.point=t}function r(){M[0]=l,M[1]=h,_.point=n,m=null}function u(n,e){if(m){var r=n-p;y+=ca(r)>180?r+(r>0?360:-360):r}else v=n,d=e;pc.point(n,e),t(n,e)}function i(){pc.lineStart()}function o(){u(v,d),pc.lineEnd(),ca(y)>Na&&(l=-(h=180)),M[0]=l,M[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function s(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var l,f,h,g,p,v,d,m,y,x,M,_={point:n,lineStart:e,lineEnd:r,polygonStart:function(){_.point=u,_.lineStart=i,_.lineEnd=o,y=0,pc.polygonStart()},polygonEnd:function(){pc.polygonEnd(),_.point=n,_.lineStart=e,_.lineEnd=r,0>gc?(l=-(h=180),f=-(g=90)):y>Na?g=90:-Na>y&&(f=-90),M[0]=l,M[1]=h}};return function(n){g=h=-(l=f=1/0),x=[],Bo.geo.stream(n,_);var t=x.length;if(t){x.sort(c);for(var e,r=1,u=x[0],i=[u];t>r;++r)e=x[r],s(e[0],u)||s(e[1],u)?(a(u[0],e[1])>a(u[0],u[1])&&(u[1]=e[1]),a(e[0],u[1])>a(u[0],u[1])&&(u[0]=e[0])):i.push(u=e);for(var o,e,p=-1/0,t=i.length-1,r=0,u=i[t];t>=r;u=e,++r)e=i[r],(o=a(u[1],e[0]))>p&&(p=o,l=e[0],h=u[1])}return x=M=null,1/0===l||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[l,f],[h,g]]}}(),Bo.geo.centroid=function(n){vc=dc=mc=yc=xc=Mc=_c=bc=wc=Sc=kc=0,Bo.geo.stream(n,Ec);var t=wc,e=Sc,r=kc,u=t*t+e*e+r*r;return La>u&&(t=Mc,e=_c,r=bc,Na>dc&&(t=mc,e=yc,r=xc),u=t*t+e*e+r*r,La>u)?[0/0,0/0]:[Math.atan2(e,t)*qa,F(r/Math.sqrt(u))*qa]};var vc,dc,mc,yc,xc,Mc,_c,bc,wc,Sc,kc,Ec={sphere:c,point:Ft,lineStart:Yt,lineEnd:It,polygonStart:function(){Ec.lineStart=Zt},polygonEnd:function(){Ec.lineStart=Yt}},Ac=Wt(Vt,ne,ee,[-Ea,-Ea/2]),Cc=1e9;Bo.geo.clipExtent=function(){var n,t,e,r,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=ie(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(Bo.geo.conicEqualArea=function(){return ae(ce)}).raw=ce,Bo.geo.albers=function(){return Bo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},Bo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,e(i,o),t||(r(i,o),t)||u(i,o),t}var t,e,r,u,i=Bo.geo.albers(),o=Bo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=Bo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=i.scale(),e=i.translate(),r=(n[0]-e[0])/t,u=(n[1]-e[1])/t;return(u>=.12&&.234>u&&r>=-.425&&-.214>r?o:u>=.166&&.234>u&&r>=-.214&&-.115>r?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,u){t.point(n,u),e.point(n,u),r.point(n,u)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var s=i.scale(),l=+t[0],f=+t[1];return e=i.translate(t).clipExtent([[l-.455*s,f-.238*s],[l+.455*s,f+.238*s]]).stream(c).point,r=o.translate([l-.307*s,f+.201*s]).clipExtent([[l-.425*s+Na,f+.12*s+Na],[l-.214*s-Na,f+.234*s-Na]]).stream(c).point,u=a.translate([l-.205*s,f+.212*s]).clipExtent([[l-.214*s+Na,f+.166*s+Na],[l-.115*s-Na,f+.234*s-Na]]).stream(c).point,n},n.scale(1070)};var Nc,Lc,Tc,qc,zc,Rc,Dc={point:c,lineStart:c,lineEnd:c,polygonStart:function(){Lc=0,Dc.lineStart=se},polygonEnd:function(){Dc.lineStart=Dc.lineEnd=Dc.point=c,Nc+=ca(Lc/2)}},Pc={point:le,lineStart:c,lineEnd:c,polygonStart:c,polygonEnd:c},Uc={point:ge,lineStart:pe,lineEnd:ve,polygonStart:function(){Uc.lineStart=de},polygonEnd:function(){Uc.point=ge,Uc.lineStart=pe,Uc.lineEnd=ve}};Bo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),Bo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var e,r,u,i,o,a=4.5;return n.area=function(n){return Nc=0,Bo.geo.stream(n,u(Dc)),Nc},n.centroid=function(n){return mc=yc=xc=Mc=_c=bc=wc=Sc=kc=0,Bo.geo.stream(n,u(Uc)),kc?[wc/kc,Sc/kc]:bc?[Mc/bc,_c/bc]:xc?[mc/xc,yc/xc]:[0/0,0/0]},n.bounds=function(n){return zc=Rc=-(Tc=qc=1/0),Bo.geo.stream(n,u(Pc)),[[Tc,qc],[zc,Rc]]},n.projection=function(n){return arguments.length?(u=(e=n)?n.stream||xe(n):dt,t()):e},n.context=function(n){return arguments.length?(i=null==(r=n)?new fe:new me(n),"function"!=typeof a&&i.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(Bo.geo.albersUsa()).context(null)},Bo.geo.transform=function(n){return{stream:function(t){var e=new Me(t);for(var r in n)e[r]=n[r];return e}}},Me.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()
},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},Bo.geo.projection=be,Bo.geo.projectionMutator=we,(Bo.geo.equirectangular=function(){return be(ke)}).raw=ke.invert=ke,Bo.geo.rotation=function(n){function t(t){return t=n(t[0]*Ta,t[1]*Ta),t[0]*=qa,t[1]*=qa,t}return n=Ae(n[0]%360*Ta,n[1]*Ta,n.length>2?n[2]*Ta:0),t.invert=function(t){return t=n.invert(t[0]*Ta,t[1]*Ta),t[0]*=qa,t[1]*=qa,t},t},Ee.invert=ke,Bo.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=Ae(-n[0]*Ta,-n[1]*Ta,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=qa,n[1]*=qa}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=Te((t=+r)*Ta,u*Ta),n):t},n.precision=function(r){return arguments.length?(e=Te(t*Ta,(u=+r)*Ta),n):u},n.angle(90)},Bo.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Ta,u=n[1]*Ta,i=t[1]*Ta,o=Math.sin(r),a=Math.cos(r),c=Math.sin(u),s=Math.cos(u),l=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((e=f*o)*e+(e=s*l-c*f*a)*e),c*l+s*f*a)},Bo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return Bo.range(Math.ceil(i/d)*d,u,d).map(h).concat(Bo.range(Math.ceil(s/m)*m,c,m).map(g)).concat(Bo.range(Math.ceil(r/p)*p,e,p).filter(function(n){return ca(n%d)>Na}).map(l)).concat(Bo.range(Math.ceil(a/v)*v,o,v).filter(function(n){return ca(n%m)>Na}).map(f))}var e,r,u,i,o,a,c,s,l,f,h,g,p=10,v=p,d=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(s).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],s=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),s>c&&(t=s,s=c,c=t),n.precision(y)):[[i,s],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],m=+t[1],n):[d,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],v=+t[1],n):[p,v]},n.precision=function(t){return arguments.length?(y=+t,l=ze(a,o,90),f=Re(r,e,y),h=ze(s,c,90),g=Re(i,u,y),n):y},n.majorExtent([[-180,-90+Na],[180,90-Na]]).minorExtent([[-180,-80-Na],[180,80+Na]])},Bo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=De,u=Pe;return n.distance=function(){return Bo.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},Bo.geo.interpolate=function(n,t){return Ue(n[0]*Ta,n[1]*Ta,t[0]*Ta,t[1]*Ta)},Bo.geo.length=function(n){return jc=0,Bo.geo.stream(n,Hc),jc};var jc,Hc={sphere:c,point:c,lineStart:je,lineEnd:c,polygonStart:c,polygonEnd:c},Fc=He(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(Bo.geo.azimuthalEqualArea=function(){return be(Fc)}).raw=Fc;var Oc=He(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},dt);(Bo.geo.azimuthalEquidistant=function(){return be(Oc)}).raw=Oc,(Bo.geo.conicConformal=function(){return ae(Fe)}).raw=Fe,(Bo.geo.conicEquidistant=function(){return ae(Oe)}).raw=Oe;var Yc=He(function(n){return 1/n},Math.atan);(Bo.geo.gnomonic=function(){return be(Yc)}).raw=Yc,Ye.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Ca]},(Bo.geo.mercator=function(){return Ie(Ye)}).raw=Ye;var Ic=He(function(){return 1},Math.asin);(Bo.geo.orthographic=function(){return be(Ic)}).raw=Ic;var Zc=He(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(Bo.geo.stereographic=function(){return be(Zc)}).raw=Zc,Ze.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Ca]},(Bo.geo.transverseMercator=function(){var n=Ie(Ze),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[-n[1],n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},n.rotate([0,0])}).raw=Ze,Bo.geom={},Bo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u,i,o,a,c,s,l,f,h,g,p,v=vt(e),d=vt(r),m=n.length,y=m-1,x=[],M=[],_=0;if(v===Ve&&r===Xe)t=n;else for(i=0,t=[];m>i;++i)t.push([+v.call(this,u=n[i],i),+d.call(this,u,i)]);for(i=1;m>i;++i)(t[i][1]<t[_][1]||t[i][1]==t[_][1]&&t[i][0]<t[_][0])&&(_=i);for(i=0;m>i;++i)i!==_&&(c=t[i][1]-t[_][1],a=t[i][0]-t[_][0],x.push({angle:Math.atan2(c,a),index:i}));for(x.sort(function(n,t){return n.angle-t.angle}),g=x[0].angle,h=x[0].index,f=0,i=1;y>i;++i){if(o=x[i].index,g==x[i].angle){if(a=t[h][0]-t[_][0],c=t[h][1]-t[_][1],s=t[o][0]-t[_][0],l=t[o][1]-t[_][1],a*a+c*c>=s*s+l*l){x[i].index=-1;continue}x[f].index=-1}g=x[i].angle,f=i,h=o}for(M.push(_),i=0,o=0;2>i;++o)x[o].index>-1&&(M.push(x[o].index),i++);for(p=M.length;y>o;++o)if(!(x[o].index<0)){for(;!$e(M[p-2],M[p-1],x[o].index,t);)--p;M[p++]=x[o].index}var b=[];for(i=p-1;i>=0;--i)b.push(n[M[i]]);return b}var e=Ve,r=Xe;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},Bo.geom.polygon=function(n){return ga(n,Vc),n};var Vc=Bo.geom.polygon.prototype=[];Vc.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],u=0;++t<e;)n=r,r=this[t],u+=n[1]*r[0]-n[0]*r[1];return.5*u},Vc.centroid=function(n){var t,e,r=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++r<u;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[i*n,o*n]},Vc.clip=function(n){for(var t,e,r,u,i,o,a=Je(n),c=-1,s=this.length-Je(this),l=this[s-1];++c<s;){for(t=n.slice(),n.length=0,u=this[c],i=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Be(o,l,u)?(Be(i,l,u)||n.push(We(i,o,l,u)),n.push(o)):Be(i,l,u)&&n.push(We(i,o,l,u)),i=o;a&&n.push(n[0]),l=u}return n};var Xc,$c,Bc,Wc,Jc,Gc=[],Kc=[];ur.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(or),t.length},dr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},mr.prototype={insert:function(n,t){var e,r,u;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=_r(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(u=r.R,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.R&&(xr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,Mr(this,r))):(u=r.L,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.L&&(Mr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,xr(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,u=n.U,i=n.L,o=n.R;if(e=i?o?_r(o):i:o,u?u.L===n?u.L=e:u.R=e:this._=e,i&&o?(r=e.C,e.C=n.C,e.L=i,i.U=e,e!==o?(u=e.U,e.U=n.U,n=e.R,u.L=n,e.R=o,o.U=e):(e.U=u,u=e,n=e.R)):(r=n.C,n=e),n&&(n.U=u),!r){if(n&&n.C)return n.C=!1,void 0;do{if(n===this._)break;if(n===u.L){if(t=u.R,t.C&&(t.C=!1,u.C=!0,xr(this,u),t=u.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,Mr(this,t),t=u.R),t.C=u.C,u.C=t.R.C=!1,xr(this,u),n=this._;break}}else if(t=u.L,t.C&&(t.C=!1,u.C=!0,Mr(this,u),t=u.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,xr(this,t),t=u.L),t.C=u.C,u.C=t.L.C=!1,Mr(this,u),n=this._;break}t.C=!0,n=u,u=u.U}while(!n.C);n&&(n.C=!1)}}},Bo.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],u=a[0][1],i=a[1][0],o=a[1][1];return br(e(n),a).cells.forEach(function(e,a){var c=e.edges,s=e.site,l=t[a]=c.length?c.map(function(n){var t=n.start();return[t.x,t.y]}):s.x>=r&&s.x<=i&&s.y>=u&&s.y<=o?[[r,o],[i,o],[i,u],[r,u]]:[];l.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(i(n,t)/Na)*Na,y:Math.round(o(n,t)/Na)*Na,i:t}})}var r=Ve,u=Xe,i=r,o=u,a=Qc;return n?t(n):(t.links=function(n){return br(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return br(e(n)).cells.forEach(function(e,r){for(var u,i,o=e.site,a=e.edges.sort(or),c=-1,s=a.length,l=a[s-1].edge,f=l.l===o?l.r:l.l;++c<s;)u=l,i=f,l=a[c].edge,f=l.l===o?l.r:l.l,r<i.i&&r<f.i&&Sr(o,i,f)<0&&t.push([n[r],n[i.i],n[f.i]])}),t},t.x=function(n){return arguments.length?(i=vt(r=n),t):r},t.y=function(n){return arguments.length?(o=vt(u=n),t):u},t.clipExtent=function(n){return arguments.length?(a=null==n?Qc:n,t):a===Qc?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===Qc?null:a&&a[1]},t)};var Qc=[[-1e6,-1e6],[1e6,1e6]];Bo.geom.delaunay=function(n){return Bo.geom.voronoi().triangles(n)},Bo.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,l=n.y;if(null!=c)if(ca(c-e)+ca(l-r)<.01)s(n,t,e,r,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,s(n,f,c,l,u,i,o,a),s(n,t,e,r,u,i,o,a)}else n.x=e,n.y=r,n.point=t}else s(n,t,e,r,u,i,o,a)}function s(n,t,e,r,u,o,a,c){var s=.5*(u+a),l=.5*(o+c),f=e>=s,h=r>=l,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=Ar()),f?u=s:a=s,h?o=l:c=l,i(n,t,e,r,u,o,a,c)}var l,f,h,g,p,v,d,m,y,x=vt(a),M=vt(c);if(null!=t)v=t,d=e,m=r,y=u;else if(m=y=-(v=d=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)l=n[g],l.x<v&&(v=l.x),l.y<d&&(d=l.y),l.x>m&&(m=l.x),l.y>y&&(y=l.y),f.push(l.x),h.push(l.y);else for(g=0;p>g;++g){var _=+x(l=n[g],g),b=+M(l,g);v>_&&(v=_),d>b&&(d=b),_>m&&(m=_),b>y&&(y=b),f.push(_),h.push(b)}var w=m-v,S=y-d;w>S?y=d+w:m=v+S;var k=Ar();if(k.add=function(n){i(k,n,+x(n,++g),+M(n,g),v,d,m,y)},k.visit=function(n){Cr(n,k,v,d,m,y)},g=-1,null==t){for(;++g<p;)i(k,n[g],f[g],h[g],v,d,m,y);--g}else n.forEach(k.add);return f=h=n=l=null,k}var o,a=Ve,c=Xe;return(o=arguments.length)?(a=kr,c=Er,3===o&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,e],[r,u]]},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r-t,u-e]},i)},Bo.interpolateRgb=Nr,Bo.interpolateObject=Lr,Bo.interpolateNumber=Tr,Bo.interpolateString=qr;var ns=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;Bo.interpolate=zr,Bo.interpolators=[function(n,t){var e=typeof t;return("string"===e?$a.has(t)||/^(#|rgb\(|hsl\()/.test(t)?Nr:qr:t instanceof V?Nr:"object"===e?Array.isArray(t)?Rr:Lr:Tr)(n,t)}],Bo.interpolateArray=Rr;var ts=function(){return dt},es=Bo.map({linear:ts,poly:Or,quad:function(){return jr},cubic:function(){return Hr},sin:function(){return Yr},exp:function(){return Ir},circle:function(){return Zr},elastic:Vr,back:Xr,bounce:function(){return $r}}),rs=Bo.map({"in":dt,out:Pr,"in-out":Ur,"out-in":function(n){return Ur(Pr(n))}});Bo.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=es.get(e)||ts,r=rs.get(r)||dt,Dr(r(e.apply(null,Wo.call(arguments,1))))},Bo.interpolateHcl=Br,Bo.interpolateHsl=Wr,Bo.interpolateLab=Jr,Bo.interpolateRound=Gr,Bo.transform=function(n){var t=Go.createElementNS(Bo.ns.prefix.svg,"g");return(Bo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new Kr(e?e.matrix:us)})(n)},Kr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var us={a:1,b:0,c:0,d:1,e:0,f:0};Bo.interpolateTransform=eu,Bo.layout={},Bo.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(iu(n[e]));return t}},Bo.layout.chord=function(){function n(){var n,s,f,h,g,p={},v=[],d=Bo.range(i),m=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(s=0,g=-1;++g<i;)s+=u[h][g];v.push(s),m.push(Bo.range(i)),n+=s}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&m.forEach(function(n,t){n.sort(function(n,e){return a(u[t][n],u[t][e])})}),n=(Aa-l*i)/n,s=0,h=-1;++h<i;){for(f=s,g=-1;++g<i;){var y=d[h],x=m[y][g],M=u[y][x],_=s,b=s+=M*n;p[y+"-"+x]={index:y,subindex:x,startAngle:_,endAngle:b,value:M}}r[y]={index:y,startAngle:f,endAngle:s,value:(s-f)/n},s+=l}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,o,a,c,s={},l=0;return s.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,s):u},s.padding=function(n){return arguments.length?(l=n,e=r=null,s):l},s.sortGroups=function(n){return arguments.length?(o=n,e=r=null,s):o},s.sortSubgroups=function(n){return arguments.length?(a=n,e=null,s):a},s.sortChords=function(n){return arguments.length?(c=n,e&&t(),s):c},s.chords=function(){return e||n(),e},s.groups=function(){return r||n(),r},s},Bo.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=1/Math.sqrt(i*i+o*o);if(v>(u-e)*a){var c=t.charge*a*a;return n.px-=i*c,n.py-=o*c,!0}if(t.point&&isFinite(a)){var c=t.pointCharge*a*a;n.px-=i*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=Bo.event.x,n.py=Bo.event.y,a.resume()}var e,r,u,i,o,a={},c=Bo.dispatch("start","tick","end"),s=[1,1],l=.9,f=is,h=os,g=-30,p=.1,v=.8,d=[],m=[];return a.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,a,f,h,v,y,x,M,_=d.length,b=m.length;for(e=0;b>e;++e)a=m[e],f=a.source,h=a.target,x=h.x-f.x,M=h.y-f.y,(v=x*x+M*M)&&(v=r*i[e]*((v=Math.sqrt(v))-u[e])/v,x*=v,M*=v,h.x-=x*(y=f.weight/(h.weight+f.weight)),h.y-=M*y,f.x+=x*(y=1-y),f.y+=M*y);if((y=r*p)&&(x=s[0]/2,M=s[1]/2,e=-1,y))for(;++e<_;)a=d[e],a.x+=(x-a.x)*y,a.y+=(M-a.y)*y;if(g)for(hu(t=Bo.geom.quadtree(d),r,o),e=-1;++e<_;)(a=d[e]).fixed||t.visit(n(a));for(e=-1;++e<_;)a=d[e],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*l,a.y-=(a.py-(a.py=a.y))*l);c.tick({type:"tick",alpha:r})},a.nodes=function(n){return arguments.length?(d=n,a):d},a.links=function(n){return arguments.length?(m=n,a):m},a.size=function(n){return arguments.length?(s=n,a):s},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(l=+n,a):l},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.gravity=function(n){return arguments.length?(p=+n,a):p},a.theta=function(n){return arguments.length?(v=+n,a):v},a.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),Bo.timer(a.tick)),a):r},a.start=function(){function n(n,r){if(!e){for(e=new Array(c),a=0;c>a;++a)e[a]=[];for(a=0;s>a;++a){var u=m[a];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var i,o=e[t],a=-1,s=o.length;++a<s;)if(!isNaN(i=o[a][n]))return i;return Math.random()*r}var t,e,r,c=d.length,l=m.length,p=s[0],v=s[1];for(t=0;c>t;++t)(r=d[t]).index=t,r.weight=0;for(t=0;l>t;++t)r=m[t],"number"==typeof r.source&&(r.source=d[r.source]),"number"==typeof r.target&&(r.target=d[r.target]),++r.source.weight,++r.target.weight;for(t=0;c>t;++t)r=d[t],isNaN(r.x)&&(r.x=n("x",p)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof f)for(t=0;l>t;++t)u[t]=+f.call(this,m[t],t);else for(t=0;l>t;++t)u[t]=f;if(i=[],"function"==typeof h)for(t=0;l>t;++t)i[t]=+h.call(this,m[t],t);else for(t=0;l>t;++t)i[t]=h;if(o=[],"function"==typeof g)for(t=0;c>t;++t)o[t]=+g.call(this,d[t],t);else for(t=0;c>t;++t)o[t]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return e||(e=Bo.behavior.drag().origin(dt).on("dragstart.force",cu).on("drag.force",t).on("dragend.force",su)),arguments.length?(this.on("mouseover.force",lu).on("mouseout.force",fu).call(e),void 0):e},Bo.rebind(a,c,"on")};var is=20,os=1;Bo.layout.hierarchy=function(){function n(t,o,a){var c=u.call(e,t,o);if(t.depth=o,a.push(t),c&&(s=c.length)){for(var s,l,f=-1,h=t.children=new Array(s),g=0,p=o+1;++f<s;)l=h[f]=n(c[f],p,a),l.parent=t,g+=l.value;r&&h.sort(r),i&&(t.value=g)}else delete t.children,i&&(t.value=+i.call(e,t,o)||0);return t}function t(n,r){var u=n.children,o=0;if(u&&(a=u.length))for(var a,c=-1,s=r+1;++c<a;)o+=t(u[c],s);else i&&(o=+i.call(e,n,r)||0);return i&&(n.value=o),o}function e(t){var e=[];return n(t,0,e),e}var r=du,u=pu,i=vu;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},Bo.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(o=i.length)){var o,a,c,s=-1;for(r=t.value?r/t.value:0;++s<o;)n(a=i[s],e,c=a.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var o=r.call(this,e,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var r=Bo.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},gu(e,r)},Bo.layout.pie=function(){function n(i){var o=i.map(function(e,r){return+t.call(n,e,r)}),a=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/Bo.sum(o),s=Bo.range(i.length);null!=e&&s.sort(e===as?function(n,t){return o[t]-o[n]}:function(n,t){return e(i[n],i[t])});var l=[];return s.forEach(function(n){var t;l[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),l}var t=Number,e=as,r=0,u=Aa;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var as={};Bo.layout.stack=function(){function n(a,c){var s=a.map(function(e,r){return t.call(n,e,r)}),l=s.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),o.call(n,t,e)]})}),f=e.call(n,l,c);s=Bo.permute(s,f),l=Bo.permute(l,f);var h,g,p,v=r.call(n,l,c),d=s.length,m=s[0].length;for(g=0;m>g;++g)for(u.call(n,s[0][g],p=v[g],l[0][g][1]),h=1;d>h;++h)u.call(n,s[h][g],p+=l[h-1][g][1],l[h][g][1]);return a}var t=dt,e=_u,r=bu,u=Mu,i=yu,o=xu;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:cs.get(t)||_u,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:ss.get(t)||bu,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var cs=Bo.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(wu),i=n.map(Su),o=Bo.range(r).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,s=[],l=[];for(t=0;r>t;++t)e=o[t],c>a?(a+=i[e],s.push(e)):(c+=i[e],l.push(e));return l.reverse().concat(s)},reverse:function(n){return Bo.range(n.length).reverse()},"default":_u}),ss=Bo.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,o=[],a=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;i>e;++e)c[e]=(a-o[e])/2;return c},wiggle:function(n){var t,e,r,u,i,o,a,c,s,l=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=s=0,e=1;h>e;++e){for(t=0,u=0;l>t;++t)u+=n[t][e][1];for(t=0,i=0,a=f[e][0]-f[e-1][0];l>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;i+=o*n[t][e][1]}g[e]=c-=u?i/u*a:0,s>c&&(s=c)}for(e=0;h>e;++e)g[e]-=s;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,o=1/u,a=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=o}for(e=0;i>e;++e)a[e]=0;return a},zero:bu});Bo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],s=n.map(e,this),l=r.call(this,s,i),f=u.call(this,l,s,i),i=-1,h=s.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=s[i],a>=l[0]&&a<=l[1]&&(o=c[Bo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,e=Number,r=Cu,u=Eu;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=vt(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return Au(n,t)}:vt(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},Bo.layout.tree=function(){function n(n,i){function o(n,t){var r=n.children,u=n._tree;if(r&&(i=r.length)){for(var i,a,s,l=r[0],f=l,h=-1;++h<i;)s=r[h],o(s,a),f=c(s,a,f),a=s;Uu(n);var g=.5*(l._tree.prelim+s._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function c(n,t,r){if(t){for(var u,i=n,o=n,a=t,c=n.parent.children[0],s=i._tree.mod,l=o._tree.mod,f=a._tree.mod,h=c._tree.mod;a=Tu(a),i=Lu(i),a&&i;)c=Lu(c),o=Tu(o),o._tree.ancestor=n,u=a._tree.prelim+f-i._tree.prelim-s+e(a,i),u>0&&(ju(Hu(a,n,r),n,u),s+=u,l+=u),f+=a._tree.mod,s+=i._tree.mod,h+=c._tree.mod,l+=o._tree.mod;a&&!Tu(o)&&(o._tree.thread=a,o._tree.mod+=f-l),i&&!Lu(c)&&(c._tree.thread=i,c._tree.mod+=s-h,r=n)}return r}var s=t.call(this,n,i),l=s[0];Pu(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),o(l),a(l,-l._tree.prelim);var f=qu(l,Ru),h=qu(l,zu),g=qu(l,Du),p=f.x-e(f,h)/2,v=h.x+e(h,f)/2,d=g.depth||1;return Pu(l,u?function(n){n.x*=r[0],n.y=n.depth*r[1],delete n._tree}:function(n){n.x=(n.x-p)/(v-p)*r[0],n.y=n.depth/d*r[1],delete n._tree}),s}var t=Bo.layout.hierarchy().sort(null).value(null),e=Nu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},gu(n,t)},Bo.layout.pack=function(){function n(n,i){var o=e.call(this,n,i),a=o[0],c=u[0],s=u[1],l=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,Pu(a,function(n){n.r=+l(n.value)}),Pu(a,Zu),r){var f=r*(t?1:Math.max(2*a.r/c,2*a.r/s))/2;Pu(a,function(n){n.r+=f}),Pu(a,Zu),Pu(a,function(n){n.r-=f})}return $u(a,c/2,s/2,t?1:1/Math.max(2*a.r/c,2*a.r/s)),o}var t,e=Bo.layout.hierarchy().sort(Fu),r=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},gu(n,e)},Bo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],s=0;Pu(c,function(n){var t=n.children;t&&t.length?(n.x=Ju(t),n.y=Wu(t)):(n.x=o?s+=e(n,o):0,n.y=0,o=n)});var l=Gu(c),f=Ku(c),h=l.x-e(l,f)/2,g=f.x+e(f,l)/2;return Pu(c,u?function(n){n.x=(n.x-c.x)*r[0],n.y=(c.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(g-h)*r[0],n.y=(1-(c.y?n.y/c.y:1))*r[1]}),a}var t=Bo.layout.hierarchy().sort(null).value(null),e=Nu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},gu(n,t)},Bo.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var o,a,c,s=f(e),l=[],h=i.slice(),p=1/0,v="slice"===g?s.dx:"dice"===g?s.dy:"slice-dice"===g?1&e.depth?s.dy:s.dx:Math.min(s.dx,s.dy);for(n(h,s.dx*s.dy/e.value),l.area=0;(c=h.length)>0;)l.push(o=h[c-1]),l.area+=o.area,"squarify"!==g||(a=r(l,v))<=p?(h.pop(),p=a):(l.area-=l.pop().area,u(l,v,s,!1),v=Math.min(s.dx,s.dy),l.length=l.area=0,p=1/0);l.length&&(u(l,v,s,!0),l.length=l.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,o=f(t),a=r.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,o=n.length,a=e.x,s=e.y,l=t?c(n.area/t):0;if(t==e.dx){for((r||l>e.dy)&&(l=e.dy);++i<o;)u=n[i],u.x=a,u.y=s,u.dy=l,a+=u.dx=Math.min(e.x+e.dx-a,l?c(u.area/l):0);u.z=!0,u.dx+=e.x+e.dx-a,e.y+=l,e.dy-=l}else{for((r||l>e.dx)&&(l=e.dx);++i<o;)u=n[i],u.x=a,u.y=s,u.dx=l,s+=u.dy=Math.min(e.y+e.dy-s,l?c(u.area/l):0);u.z=!1,u.dy+=e.y+e.dy-s,e.x+=l,e.dx-=l}}function i(r){var u=o||a(r),i=u[0];return i.x=0,i.y=0,i.dx=s[0],i.dy=s[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?e:t)(i),h&&(o=u),u}var o,a=Bo.layout.hierarchy(),c=Math.round,s=[1,1],l=null,f=Qu,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(s=n,i):s},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?Qu(t):ni(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return ni(t,n)}if(!arguments.length)return l;var r;return f=null==(l=n)?Qu:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},gu(i,a)},Bo.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=2*Math.random()-1,r=2*Math.random()-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=Bo.random.normal.apply(Bo,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=Bo.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},Bo.scale={};var ls={floor:dt,ceil:dt};Bo.scale.linear=function(){return ai([0,1],[0,1],zr,!1)};var fs={s:1,g:1,p:1,r:1,e:1};Bo.scale.log=function(){return vi(Bo.scale.linear().domain([0,1]),10,!0,[1,10])};var hs=Bo.format(".0e"),gs={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};Bo.scale.pow=function(){return di(Bo.scale.linear(),1,[0,1])},Bo.scale.sqrt=function(){return Bo.scale.pow().exponent(.5)},Bo.scale.ordinal=function(){return yi([],{t:"range",a:[[]]})},Bo.scale.category10=function(){return Bo.scale.ordinal().range(ps)},Bo.scale.category20=function(){return Bo.scale.ordinal().range(vs)},Bo.scale.category20b=function(){return Bo.scale.ordinal().range(ds)},Bo.scale.category20c=function(){return Bo.scale.ordinal().range(ms)};var ps=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(ot),vs=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(ot),ds=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(ot),ms=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(ot);Bo.scale.quantile=function(){return xi([],[])},Bo.scale.quantize=function(){return Mi(0,1,[0,1])},Bo.scale.threshold=function(){return _i([.5],[0,1])},Bo.scale.identity=function(){return bi([0,1])},Bo.svg={},Bo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),o=r.apply(this,arguments)+ys,a=u.apply(this,arguments)+ys,c=(o>a&&(c=o,o=a,a=c),a-o),s=Ea>c?"0":"1",l=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);return c>=xs?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+s+",0 "+n*l+","+n*f+"Z":"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=wi,e=Si,r=ki,u=Ei;return n.innerRadius=function(e){return arguments.length?(t=vt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=vt(t),n):e},n.startAngle=function(t){return arguments.length?(r=vt(t),n):r},n.endAngle=function(t){return arguments.length?(u=vt(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+ys;return[Math.cos(i)*n,Math.sin(i)*n]},n};var ys=-Ca,xs=Aa-Na;Bo.svg.line=function(){return Ai(dt)};var Ms=Bo.map({linear:Ci,"linear-closed":Ni,step:Li,"step-before":Ti,"step-after":qi,basis:ji,"basis-open":Hi,"basis-closed":Fi,bundle:Oi,cardinal:Di,"cardinal-open":zi,"cardinal-closed":Ri,monotone:$i});Ms.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var _s=[0,2/3,1/3,0],bs=[0,1/3,2/3,0],ws=[0,1/6,2/3,1/6];Bo.svg.line.radial=function(){var n=Ai(Bi);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},Ti.reverse=qi,qi.reverse=Ti,Bo.svg.area=function(){return Wi(dt)},Bo.svg.area.radial=function(){var n=Wi(Bi);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},Bo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),s=t(this,o,n,a);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,s)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,s.r,s.p0)+r(s.r,s.p1,s.a1-s.a0)+u(s.r,s.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=a.call(n,u,r),o=c.call(n,u,r)+ys,l=s.call(n,u,r)+ys;return{r:i,a0:o,a1:l,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(l),i*Math.sin(l)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Ea)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=De,o=Pe,a=Ji,c=ki,s=Ei;return n.radius=function(t){return arguments.length?(a=vt(t),n):a},n.source=function(t){return arguments.length?(i=vt(t),n):i},n.target=function(t){return arguments.length?(o=vt(t),n):o},n.startAngle=function(t){return arguments.length?(c=vt(t),n):c},n.endAngle=function(t){return arguments.length?(s=vt(t),n):s},n},Bo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=e.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=De,e=Pe,r=Gi;return n.source=function(e){return arguments.length?(t=vt(e),n):t},n.target=function(t){return arguments.length?(e=vt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},Bo.svg.diagonal.radial=function(){var n=Bo.svg.diagonal(),t=Gi,e=n.projection;return n.projection=function(n){return arguments.length?e(Ki(t=n)):t},n},Bo.svg.symbol=function(){function n(n,r){return(Ss.get(t.call(this,n,r))||to)(e.call(this,n,r))}var t=no,e=Qi;return n.type=function(e){return arguments.length?(t=vt(e),n):t},n.size=function(t){return arguments.length?(e=vt(t),n):e},n};var Ss=Bo.map({circle:to,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Cs)),e=t*Cs;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"
},"triangle-down":function(n){var t=Math.sqrt(n/As),e=t*As/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/As),e=t*As/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});Bo.svg.symbolTypes=Ss.keys();var ks,Es,As=Math.sqrt(3),Cs=Math.tan(30*Ta),Ns=[],Ls=0;Ns.call=ya.call,Ns.empty=ya.empty,Ns.node=ya.node,Ns.size=ya.size,Bo.transition=function(n){return arguments.length?ks?n.transition():n:_a.transition()},Bo.transition.prototype=Ns,Ns.select=function(n){var t,e,r,u=this.id,i=[];n=v(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],s=-1,l=c.length;++s<l;)(r=c[s])&&(e=n.call(r,r.__data__,s,o))?("__data__"in r&&(e.__data__=r.__data__),io(e,s,u,r.__transition__[u]),t.push(e)):t.push(null)}return eo(i,u)},Ns.selectAll=function(n){var t,e,r,u,i,o=this.id,a=[];n=d(n);for(var c=-1,s=this.length;++c<s;)for(var l=this[c],f=-1,h=l.length;++f<h;)if(r=l[f]){i=r.__transition__[o],e=n.call(r,r.__data__,f,c),a.push(t=[]);for(var g=-1,p=e.length;++g<p;)(u=e[g])&&io(u,g,o,i),t.push(u)}return eo(a,o)},Ns.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=A(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var e=this[i],a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a,i)&&t.push(r)}return eo(u,this.id)},Ns.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):N(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},Ns.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?eu:zr,a=Bo.ns.qualify(n);return ro(this,"attr."+n,t,a.local?i:u)},Ns.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=Bo.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},Ns.style=function(n,t,e){function r(){this.style.removeProperty(n)}function u(t){return null==t?r:(t+="",function(){var r,u=Qo.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=zr(u,t),function(t){this.style.setProperty(n,r(t),e)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}return ro(this,"style."+n,t,u)},Ns.styleTween=function(n,t,e){function r(r,u){var i=t.call(this,r,u,Qo.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},Ns.text=function(n){return ro(this,"text",n,uo)},Ns.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Ns.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=Bo.ease.apply(Bo,arguments)),N(this,function(e){e.__transition__[t].ease=n}))},Ns.delay=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=+n.call(e,e.__data__,r,u)}:(n=+n,function(e){e.__transition__[t].delay=n}))},Ns.duration=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u))}:(n=Math.max(1,n),function(e){e.__transition__[t].duration=n}))},Ns.each=function(n,t){var e=this.id;if(arguments.length<2){var r=Es,u=ks;ks=e,N(this,function(t,r,u){Es=t.__transition__[e],n.call(t,t.__data__,r,u)}),Es=r,ks=u}else N(this,function(r){var u=r.__transition__[e];(u.event||(u.event=Bo.dispatch("start","end"))).on(n,t)});return this},Ns.transition=function(){for(var n,t,e,r,u=this.id,i=++Ls,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],s=0,l=t.length;l>s;s++)(e=t[s])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,io(e,s,i,r)),n.push(e)}return eo(o,i)},Bo.svg.axis=function(){function n(n){n.each(function(){var n,s=Bo.select(this),l=this.__chart__||e,f=this.__chart__=e.copy(),h=null==c?f.ticks?f.ticks.apply(f,a):f.domain():c,g=null==t?f.tickFormat?f.tickFormat.apply(f,a):dt:t,p=s.selectAll(".tick").data(h,f),v=p.enter().insert("g",".domain").attr("class","tick").style("opacity",Na),d=Bo.transition(p.exit()).style("opacity",Na).remove(),m=Bo.transition(p).style("opacity",1),y=ei(f),x=s.selectAll(".domain").data([0]),M=(x.enter().append("path").attr("class","domain"),Bo.transition(x));v.append("line"),v.append("text");var _=v.select("line"),b=m.select("line"),w=p.select("text").text(g),S=v.select("text"),k=m.select("text");switch(r){case"bottom":n=oo,_.attr("y2",u),S.attr("y",Math.max(u,0)+o),b.attr("x2",0).attr("y2",u),k.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+i+"V0H"+y[1]+"V"+i);break;case"top":n=oo,_.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),b.attr("x2",0).attr("y2",-u),k.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+-i+"V0H"+y[1]+"V"+-i);break;case"left":n=ao,_.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),b.attr("x2",-u).attr("y2",0),k.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),M.attr("d","M"+-i+","+y[0]+"H0V"+y[1]+"H"+-i);break;case"right":n=ao,_.attr("x2",u),S.attr("x",Math.max(u,0)+o),b.attr("x2",u).attr("y2",0),k.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),M.attr("d","M"+i+","+y[0]+"H0V"+y[1]+"H"+i)}if(f.rangeBand){var E=f,A=E.rangeBand()/2;l=f=function(n){return E(n)+A}}else l.rangeBand?l=f:d.call(n,f);v.call(n,l),m.call(n,f)})}var t,e=Bo.scale.linear(),r=Ts,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in qs?t+"":Ts,n):r},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(u=+t,i=+arguments[e-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Ts="bottom",qs={top:1,right:1,bottom:1,left:1};Bo.svg.brush=function(){function n(i){i.each(function(){var i=Bo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(d,dt);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return zs[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,f=Bo.transition(i),h=Bo.transition(o);c&&(l=ei(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),e(f)),s&&(l=ei(s),h.attr("y",l[0]).attr("height",l[1]-l[0]),r(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+l[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function e(n){n.select(".extent").attr("x",l[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",l[1]-l[0])}function r(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==Bo.event.keyCode&&(C||(x=null,L[0]-=l[1],L[1]-=h[1],C=2),f())}function g(){32==Bo.event.keyCode&&2==C&&(L[0]+=l[1],L[1]+=h[1],C=0,f())}function d(){var n=Bo.mouse(_),u=!1;M&&(n[0]+=M[0],n[1]+=M[1]),C||(Bo.event.altKey?(x||(x=[(l[0]+l[1])/2,(h[0]+h[1])/2]),L[0]=l[+(n[0]<x[0])],L[1]=h[+(n[1]<x[1])]):x=null),E&&m(n,c,0)&&(e(S),u=!0),A&&m(n,s,1)&&(r(S),u=!0),u&&(t(S),w({type:"brush",mode:C?"move":"resize"}))}function m(n,t,e){var r,u,a=ei(t),c=a[0],s=a[1],f=L[e],g=e?h:l,d=g[1]-g[0];return C&&(c-=f,s-=d+f),r=(e?v:p)?Math.max(c,Math.min(s,n[e])):n[e],C?u=(r+=f)+d:(x&&(f=Math.max(c,Math.min(s,2*x[e]-r))),r>f?(u=r,r=f):u=f),g[0]!=r||g[1]!=u?(e?o=null:i=null,g[0]=r,g[1]=u,!0):void 0}function y(){d(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),Bo.select("body").style("cursor",null),T.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),N(),w({type:"brushend"})}var x,M,_=this,b=Bo.select(Bo.event.target),w=a.of(_,arguments),S=Bo.select(_),k=b.datum(),E=!/^(n|s)$/.test(k)&&c,A=!/^(e|w)$/.test(k)&&s,C=b.classed("extent"),N=P(),L=Bo.mouse(_),T=Bo.select(Qo).on("keydown.brush",u).on("keyup.brush",g);if(Bo.event.changedTouches?T.on("touchmove.brush",d).on("touchend.brush",y):T.on("mousemove.brush",d).on("mouseup.brush",y),S.interrupt().selectAll("*").interrupt(),C)L[0]=l[0]-L[0],L[1]=h[0]-L[1];else if(k){var q=+/w$/.test(k),z=+/^n/.test(k);M=[l[1-q]-L[0],h[1-z]-L[1]],L[0]=l[q],L[1]=h[z]}else Bo.event.altKey&&(x=L.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),Bo.select("body").style("cursor",b.style("cursor")),w({type:"brushstart"}),d()}var i,o,a=g(n,"brushstart","brush","brushend"),c=null,s=null,l=[0,0],h=[0,0],p=!0,v=!0,d=Rs[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:l,y:h,i:i,j:o},e=this.__chart__||t;this.__chart__=t,ks?Bo.select(this).transition().each("start.brush",function(){i=e.i,o=e.j,l=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=Rr(l,t.x),r=Rr(h,t.y);return i=o=null,function(u){l=t.x=e(u),h=t.y=r(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,d=Rs[!c<<1|!s],n):c},n.y=function(t){return arguments.length?(s=t,d=Rs[!c<<1|!s],n):s},n.clamp=function(t){return arguments.length?(c&&s?(p=!!t[0],v=!!t[1]):c?p=!!t:s&&(v=!!t),n):c&&s?[p,v]:c?p:s?v:null},n.extent=function(t){var e,r,u,a,f;return arguments.length?(c&&(e=t[0],r=t[1],s&&(e=e[0],r=r[0]),i=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(f=e,e=r,r=f),(e!=l[0]||r!=l[1])&&(l=[e,r])),s&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],s.invert&&(u=s(u),a=s(a)),u>a&&(f=u,u=a,a=f),(u!=h[0]||a!=h[1])&&(h=[u,a])),n):(c&&(i?(e=i[0],r=i[1]):(e=l[0],r=l[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(f=e,e=r,r=f))),s&&(o?(u=o[0],a=o[1]):(u=h[0],a=h[1],s.invert&&(u=s.invert(u),a=s.invert(a)),u>a&&(f=u,u=a,a=f))),c&&s?[[e,u],[r,a]]:c?[e,r]:s&&[u,a])},n.clear=function(){return n.empty()||(l=[0,0],h=[0,0],i=o=null),n},n.empty=function(){return!!c&&l[0]==l[1]||!!s&&h[0]==h[1]},Bo.rebind(n,a,"on")};var zs={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Rs=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Ds=Bo.time={},Ps=Date,Us=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];co.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){js.setUTCDate.apply(this._,arguments)},setDay:function(){js.setUTCDay.apply(this._,arguments)},setFullYear:function(){js.setUTCFullYear.apply(this._,arguments)},setHours:function(){js.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){js.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){js.setUTCMinutes.apply(this._,arguments)},setMonth:function(){js.setUTCMonth.apply(this._,arguments)},setSeconds:function(){js.setUTCSeconds.apply(this._,arguments)},setTime:function(){js.setTime.apply(this._,arguments)}};var js=Date.prototype,Hs="%a %b %e %X %Y",Fs="%m/%d/%Y",Os="%H:%M:%S",Ys=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Is=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Zs=["January","February","March","April","May","June","July","August","September","October","November","December"],Vs=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Ds.year=so(function(n){return n=Ds.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),Ds.years=Ds.year.range,Ds.years.utc=Ds.year.utc.range,Ds.day=so(function(n){var t=new Ps(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),Ds.days=Ds.day.range,Ds.days.utc=Ds.day.utc.range,Ds.dayOfYear=function(n){var t=Ds.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},Us.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=Ds[n]=so(function(n){return(n=Ds.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=Ds.year(n).getDay();return Math.floor((Ds.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});Ds[n+"s"]=e.range,Ds[n+"s"].utc=e.utc.range,Ds[n+"OfYear"]=function(n){var e=Ds.year(n).getDay();return Math.floor((Ds.dayOfYear(n)+(e+t)%7)/7)}}),Ds.week=Ds.sunday,Ds.weeks=Ds.sunday.range,Ds.weeks.utc=Ds.sunday.utc.range,Ds.weekOfYear=Ds.sundayOfYear,Ds.format=fo;var Xs=go(Ys),$s=po(Ys),Bs=go(Is),Ws=po(Is),Js=go(Zs),Gs=po(Zs),Ks=go(Vs),Qs=po(Vs),nl=/^%/,tl={"-":"",_:" ",0:"0"},el={a:function(n){return Is[n.getDay()]},A:function(n){return Ys[n.getDay()]},b:function(n){return Vs[n.getMonth()]},B:function(n){return Zs[n.getMonth()]},c:fo(Hs),d:function(n,t){return vo(n.getDate(),t,2)},e:function(n,t){return vo(n.getDate(),t,2)},H:function(n,t){return vo(n.getHours(),t,2)},I:function(n,t){return vo(n.getHours()%12||12,t,2)},j:function(n,t){return vo(1+Ds.dayOfYear(n),t,3)},L:function(n,t){return vo(n.getMilliseconds(),t,3)},m:function(n,t){return vo(n.getMonth()+1,t,2)},M:function(n,t){return vo(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return vo(n.getSeconds(),t,2)},U:function(n,t){return vo(Ds.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return vo(Ds.mondayOfYear(n),t,2)},x:fo(Fs),X:fo(Os),y:function(n,t){return vo(n.getFullYear()%100,t,2)},Y:function(n,t){return vo(n.getFullYear()%1e4,t,4)},Z:Ho,"%":function(){return"%"}},rl={a:mo,A:yo,b:bo,B:wo,c:So,d:qo,e:qo,H:Ro,I:Ro,j:zo,L:Uo,m:To,M:Do,p:jo,S:Po,U:Mo,w:xo,W:_o,x:ko,X:Eo,y:Co,Y:Ao,Z:No,"%":Fo},ul=/^\s*\d+/,il=Bo.map({am:0,pm:1});fo.utc=Oo;var ol=Oo("%Y-%m-%dT%H:%M:%S.%LZ");fo.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Yo:ol,Yo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Yo.toString=ol.toString,Ds.second=so(function(n){return new Ps(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),Ds.seconds=Ds.second.range,Ds.seconds.utc=Ds.second.utc.range,Ds.minute=so(function(n){return new Ps(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),Ds.minutes=Ds.minute.range,Ds.minutes.utc=Ds.minute.utc.range,Ds.hour=so(function(n){var t=n.getTimezoneOffset()/60;return new Ps(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),Ds.hours=Ds.hour.range,Ds.hours.utc=Ds.hour.utc.range,Ds.month=so(function(n){return n=Ds.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),Ds.months=Ds.month.range,Ds.months.utc=Ds.month.utc.range;var al=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],cl=[[Ds.second,1],[Ds.second,5],[Ds.second,15],[Ds.second,30],[Ds.minute,1],[Ds.minute,5],[Ds.minute,15],[Ds.minute,30],[Ds.hour,1],[Ds.hour,3],[Ds.hour,6],[Ds.hour,12],[Ds.day,1],[Ds.day,2],[Ds.week,1],[Ds.month,1],[Ds.month,3],[Ds.year,1]],sl=[[fo("%Y"),Vt],[fo("%B"),function(n){return n.getMonth()}],[fo("%b %d"),function(n){return 1!=n.getDate()}],[fo("%a %d"),function(n){return n.getDay()&&1!=n.getDate()}],[fo("%I %p"),function(n){return n.getHours()}],[fo("%I:%M"),function(n){return n.getMinutes()}],[fo(":%S"),function(n){return n.getSeconds()}],[fo(".%L"),function(n){return n.getMilliseconds()}]],ll=Vo(sl);cl.year=Ds.year,Ds.scale=function(){return Io(Bo.scale.linear(),cl,ll)};var fl={range:function(n,t,e){return Bo.range(+n,+t,e).map(Zo)},floor:dt,ceil:dt},hl=cl.map(function(n){return[n[0].utc,n[1]]}),gl=[[Oo("%Y"),Vt],[Oo("%B"),function(n){return n.getUTCMonth()}],[Oo("%b %d"),function(n){return 1!=n.getUTCDate()}],[Oo("%a %d"),function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],[Oo("%I %p"),function(n){return n.getUTCHours()}],[Oo("%I:%M"),function(n){return n.getUTCMinutes()}],[Oo(":%S"),function(n){return n.getUTCSeconds()}],[Oo(".%L"),function(n){return n.getUTCMilliseconds()}]],pl=Vo(gl);return hl.year=Ds.year.utc,Ds.scale.utc=function(){return Io(Bo.scale.linear(),hl,pl)},Bo.text=mt(function(n){return n.responseText}),Bo.json=function(n,t){return yt(n,"application/json",Xo,t)},Bo.html=function(n,t){return yt(n,"text/html",$o,t)},Bo.xml=mt(function(n){return n.responseXML}),Bo}();;!function(){if(this.SVG=function(t){return SVG.supported?new SVG.Doc(t):void 0},SVG.ns="http://www.w3.org/2000/svg",SVG.xlink="http://www.w3.org/1999/xlink",SVG.did=1e3,SVG.eid=function(t){return"Svgjs"+t.charAt(0).toUpperCase()+t.slice(1)+SVG.did++},SVG.create=function(t){var e=document.createElementNS(this.ns,t);return e.setAttribute("id",this.eid(t)),e},SVG.extend=function(){var t,e,i,n;for(t=[].slice.call(arguments),e=t.pop(),n=t.length-1;n>=0;n--)if(t[n])for(i in e)t[n].prototype[i]=e[i];SVG.Set&&SVG.Set.inherit&&SVG.Set.inherit()},SVG.get=function(t){var e=document.getElementById(t);return e?e.instance:void 0},SVG.supported=function(){return!!document.createElementNS&&!!document.createElementNS(SVG.ns,"svg").createSVGRect}(),!SVG.supported)return!1;SVG.regex={test:function(t,e){return this[e].test(t)},unit:/^(-?[\d\.]+)([a-z%]{0,2})$/,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isStyle:/^font|text|leading|cursor/,isBlank:/^(\s+)?$/,isNumber:/^-?[\d\.]+$/,isPercent:/^-?[\d\.]+%$/},SVG.defaults={matrix:"1 0 0 1 0 0",attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000"},trans:function(){return{x:0,y:0,scaleX:1,scaleY:1,rotation:0,skewX:0,skewY:0,matrix:this.matrix,a:1,b:0,c:0,d:1,e:0,f:0}}},SVG.Color=function(t){var e;this.r=0,this.g=0,this.b=0,"string"==typeof t?SVG.regex.isRgb.test(t)?(e=SVG.regex.rgb.exec(t.replace(/\s/g,"")),this.r=parseInt(e[1]),this.g=parseInt(e[2]),this.b=parseInt(e[3])):SVG.regex.isHex.test(t)&&(e=SVG.regex.hex.exec(this._fullHex(t)),this.r=parseInt(e[1],16),this.g=parseInt(e[2],16),this.b=parseInt(e[3],16)):"object"==typeof t&&(this.r=t.r,this.g=t.g,this.b=t.b)},SVG.extend(SVG.Color,{toString:function(){return this.toHex()},toHex:function(){return"#"+this._compToHex(this.r)+this._compToHex(this.g)+this._compToHex(this.b)},toRgb:function(){return"rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return.3*(this.r/255)+.59*(this.g/255)+.11*(this.b/255)},_fullHex:function(t){return 4==t.length?["#",t.substring(1,2),t.substring(1,2),t.substring(2,3),t.substring(2,3),t.substring(3,4),t.substring(3,4)].join(""):t},_compToHex:function(t){var e=t.toString(16);return 1==e.length?"0"+e:e}}),SVG.Color.test=function(t){return t+="",SVG.regex.isHex.test(t)||SVG.regex.isRgb.test(t)},SVG.Color.isRgb=function(t){return t&&"number"==typeof t.r},SVG.Array=function(t,e){t=(t||[]).valueOf(),0==t.length&&e&&(t=e.valueOf()),this.value=this.parse(t)},SVG.extend(SVG.Array,{morph:function(t){if(this.destination=this.parse(t),this.value.length!=this.destination.length){for(var e=this.value[this.value.length-1],i=this.destination[this.destination.length-1];this.value.length>this.destination.length;)this.destination.push(i);for(;this.value.length<this.destination.length;)this.value.push(e)}return this},settle:function(){var t,e=[];for(t=this.value.length-1;t>=0;t--)-1==e.indexOf(this.value[t])&&e.push(this.value[t]);return this.value=e},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];i>e;e++)n.push(this.value[e]+(this.destination[e]-this.value[e])*t);return new SVG.Array(n)},toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)},split:function(t){return t.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"").split(" ")}}),SVG.PointArray=function(){this.constructor.apply(this,arguments)},SVG.PointArray.prototype=new SVG.Array,SVG.extend(SVG.PointArray,{toString:function(){for(var t=0,e=this.value.length,i=[];e>t;t++)i.push(this.value[t].join(","));return i.join(" ")},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];i>e;e++)n.push([this.value[e][0]+(this.destination[e][0]-this.value[e][0])*t,this.value[e][1]+(this.destination[e][1]-this.value[e][1])*t]);return new SVG.PointArray(n)},parse:function(t){if(t=t.valueOf(),Array.isArray(t))return t;t=this.split(t);for(var e,i=0,n=t.length,s=[];n>i;i++)e=t[i].split(","),s.push([parseFloat(e[0]),parseFloat(e[1])]);return s},move:function(t,e){var i=this.bbox();t-=i.x,e-=i.y;for(var n=this.value.length-1;n>=0;n--)this.value[n]=[this.value[n][0]+t,this.value[n][1]+e];return this},size:function(t,e){var i,n=this.bbox();for(i=this.value.length-1;i>=0;i--)this.value[i][0]=(this.value[i][0]-n.x)*t/n.width+n.x,this.value[i][1]=(this.value[i][1]-n.y)*e/n.height+n.x;return this},bbox:function(){if(0==this.value.length)return{x:0,y:0,width:0,height:0};var t,e=this.value[0][0],i=this.value[0][1],n={x:e,y:i};for(t=this.value.length-1;t>=0;t--)this.value[t][0]<n.x&&(n.x=this.value[t][0]),this.value[t][1]<n.y&&(n.y=this.value[t][1]),this.value[t][0]>e&&(e=this.value[t][0]),this.value[t][1]>i&&(i=this.value[t][1]);return n.width=e-n.x,n.height=i-n.y,n}}),SVG.Number=function(t){switch(this.value=0,this.unit="",typeof t){case"number":this.value=isNaN(t)?0:isFinite(t)?t:0>t?-3.4e38:3.4e38;break;case"string":var e=t.match(SVG.regex.unit);e&&(this.value=parseFloat(e[1]),"%"==e[2]&&(this.value/=100),this.unit=e[2]);break;default:t instanceof SVG.Number&&(this.value=t.value,this.unit=t.unit)}},SVG.extend(SVG.Number,{toString:function(){return("%"==this.unit?~~(1e8*this.value)/1e6:this.value)+this.unit},valueOf:function(){return this.value},to:function(t){return"string"==typeof t&&(this.unit=t),this},plus:function(t){return this.value=this+new SVG.Number(t),this},minus:function(t){return this.plus(-new SVG.Number(t))},times:function(t){return this.value=this*new SVG.Number(t),this},divide:function(t){return this.value=this/new SVG.Number(t),this}}),SVG.ViewBox=function(t){var e,i,n,s,r=t.bbox(),h=(t.attr("viewBox")||"").match(/-?[\d\.]+/g);this.x=r.x,this.y=r.y,this.width=t.node.clientWidth||t.node.getBoundingClientRect().width,this.height=t.node.clientHeight||t.node.getBoundingClientRect().height,h&&(e=parseFloat(h[0]),i=parseFloat(h[1]),n=parseFloat(h[2]),s=parseFloat(h[3]),this.zoom=this.width/this.height>n/s?this.height/s:this.width/n,this.x=e,this.y=i,this.width=n,this.height=s),this.zoom=this.zoom||1},SVG.extend(SVG.ViewBox,{toString:function(){return this.x+" "+this.y+" "+this.width+" "+this.height}}),SVG.BBox=function(t){var e;if(this.x=0,this.y=0,this.width=0,this.height=0,t){try{e=t.node.getBBox()}catch(i){e={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight}}this.x=e.x+t.trans.x,this.y=e.y+t.trans.y,this.width=e.width*t.trans.scaleX,this.height=e.height*t.trans.scaleY}this.cx=this.x+this.width/2,this.cy=this.y+this.height/2},SVG.extend(SVG.BBox,{merge:function(t){var e=new SVG.BBox;return e.x=Math.min(this.x,t.x),e.y=Math.min(this.y,t.y),e.width=Math.max(this.x+this.width,t.x+t.width)-e.x,e.height=Math.max(this.y+this.height,t.y+t.height)-e.y,e.cx=e.x+e.width/2,e.cy=e.y+e.height/2,e}}),SVG.RBox=function(t){var e,i,n={};if(this.x=0,this.y=0,this.width=0,this.height=0,t){for(e=t.doc().parent,i=t.doc().viewbox().zoom,n=t.node.getBoundingClientRect(),this.x=n.left,this.y=n.top,this.x-=e.offsetLeft,this.y-=e.offsetTop;e=e.offsetParent;)this.x-=e.offsetLeft,this.y-=e.offsetTop;for(e=t;e=e.parent;)"svg"==e.type&&e.viewbox&&(i*=e.viewbox().zoom,this.x-=e.x()||0,this.y-=e.y()||0)}this.x/=i,this.y/=i,this.width=n.width/=i,this.height=n.height/=i,this.cx=this.x+this.width/2,this.cy=this.y+this.height/2},SVG.extend(SVG.RBox,{merge:function(t){var e=new SVG.RBox;return e.x=Math.min(this.x,t.x),e.y=Math.min(this.y,t.y),e.width=Math.max(this.x+this.width,t.x+t.width)-e.x,e.height=Math.max(this.y+this.height,t.y+t.height)-e.y,e.cx=e.x+e.width/2,e.cy=e.y+e.height/2,e}}),SVG.Element=function(t){this._stroke=SVG.defaults.attrs.stroke,this.styles={},this.trans=SVG.defaults.trans(),(this.node=t)&&(this.type=t.nodeName,this.node.instance=this)},SVG.extend(SVG.Element,{x:function(t){return t&&(t=new SVG.Number(t),t.value/=this.trans.scaleX),this.attr("x",t)},y:function(t){return t&&(t=new SVG.Number(t),t.value/=this.trans.scaleY),this.attr("y",t)},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t){return null==t?this.bbox().cy:this.y(t-this.bbox().height/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){return this.attr({width:new SVG.Number(t),height:new SVG.Number(e)})},clone:function(){var t,e,i=this.type;return t="rect"==i||"ellipse"==i?this.parent[i](0,0):"line"==i?this.parent[i](0,0,0,0):"image"==i?this.parent[i](this.src):"text"==i?this.parent[i](this.content):"path"==i?this.parent[i](this.attr("d")):"polyline"==i||"polygon"==i?this.parent[i](this.attr("points")):"g"==i?this.parent.group():this.parent[i](),e=this.attr(),delete e.id,t.attr(e),t.trans=this.trans,t.transform({})},remove:function(){return this.parent&&this.parent.removeElement(this),this},doc:function(t){return this._parent(t||SVG.Doc)},attr:function(t,e,i){if(null==t){for(t={},e=this.node.attributes,i=e.length-1;i>=0;i--)t[e[i].nodeName]=SVG.regex.test(e[i].nodeValue,"isNumber")?parseFloat(e[i].nodeValue):e[i].nodeValue;return t}if("object"==typeof t)for(e in t)this.attr(e,t[e]);else if(null===e)this.node.removeAttribute(t);else{if(null==e)return this._isStyle(t)?"text"==t?this.content:"leading"==t&&this.leading?this.leading():this.style(t):(e=this.node.getAttribute(t),null==e?SVG.defaults.attrs[t]:SVG.regex.test(e,"isNumber")?parseFloat(e):e);if("style"==t)return this.style(e);if("x"==t&&Array.isArray(this.lines))for(i=this.lines.length-1;i>=0;i--)this.lines[i].attr(t,e);"stroke-width"==t?this.attr("stroke",parseFloat(e)>0?this._stroke:null):"stroke"==t&&(this._stroke=e),SVG.Color.test(e)||SVG.Color.isRgb(e)?e=new SVG.Color(e):"number"==typeof e?e=new SVG.Number(e):Array.isArray(e)&&(e=new SVG.Array(e)),null!=i?this.node.setAttributeNS(i,t,e.toString()):this.node.setAttribute(t,e.toString()),this._isStyle(t)&&("text"==t?this.text(e):"leading"==t&&this.leading?this.leading(e):this.style(t,e),this.rebuild&&this.rebuild(t,e))}return this},transform:function(t,e){if(0==arguments.length)return this.trans;if("string"==typeof t){if(arguments.length<2)return this.trans[t];var i={};return i[t]=e,this.transform(i)}var i=[];t=this._parseMatrix(t);for(e in t)null!=t[e]&&(this.trans[e]=t[e]);return this.trans.matrix=this.trans.a+" "+this.trans.b+" "+this.trans.c+" "+this.trans.d+" "+this.trans.e+" "+this.trans.f,t=this.trans,t.matrix!=SVG.defaults.matrix&&i.push("matrix("+t.matrix+")"),0!=t.rotation&&i.push("rotate("+t.rotation+" "+(null==t.cx?this.bbox().cx:t.cx)+" "+(null==t.cy?this.bbox().cy:t.cy)+")"),(1!=t.scaleX||1!=t.scaleY)&&i.push("scale("+t.scaleX+" "+t.scaleY+")"),0!=t.skewX&&i.push("skewX("+t.skewX+")"),0!=t.skewY&&i.push("skewY("+t.skewY+")"),(0!=t.x||0!=t.y)&&i.push("translate("+new SVG.Number(t.x/t.scaleX)+" "+new SVG.Number(t.y/t.scaleY)+")"),this._offset&&0!=this._offset.x&&0!=this._offset.y&&i.push("translate("+-this._offset.x+" "+-this._offset.y+")"),0==i.length?this.node.removeAttribute("transform"):this.node.setAttribute("transform",i.join(" ")),this},style:function(t,e){if(0==arguments.length)return this.attr("style")||"";if(arguments.length<2)if("object"==typeof t)for(e in t)this.style(e,t[e]);else{if(!SVG.regex.isCss.test(t))return this.styles[t];t=t.split(";");for(var i=0;i<t.length;i++)e=t[i].split(":"),2==e.length&&this.style(e[0].replace(/\s+/g,""),e[1].replace(/^\s+/,"").replace(/\s+$/,""))}else null===e||SVG.regex.test(e,"isBlank")?delete this.styles[t]:this.styles[t]=e;t="";for(e in this.styles)t+=e+":"+this.styles[e]+";";return""==t?this.node.removeAttribute("style"):this.node.setAttribute("style",t),this},data:function(t,e,i){if(arguments.length<2)try{return JSON.parse(this.attr("data-"+t))}catch(n){return this.attr("data-"+t)}else this.attr("data-"+t,null===e?null:i===!0||"string"==typeof e||"number"==typeof e?e:JSON.stringify(e));return this},bbox:function(){return new SVG.BBox(this)},rbox:function(){return new SVG.RBox(this)},inside:function(t,e){var i=this.bbox();return t>i.x&&e>i.y&&t<i.x+i.width&&e<i.y+i.height},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return"none"!=this.style("display")},toString:function(){return this.attr("id")},_parent:function(t){for(var e=this;null!=e&&!(e instanceof t);)e=e.parent;return e},_isStyle:function(t){return"string"==typeof t?SVG.regex.test(t,"isStyle"):!1},_parseMatrix:function(t){if(t.matrix){var e=t.matrix.replace(/\s/g,"").split(",");6==e.length&&(t.a=parseFloat(e[0]),t.b=parseFloat(e[1]),t.c=parseFloat(e[2]),t.d=parseFloat(e[3]),t.e=parseFloat(e[4]),t.f=parseFloat(e[5]))}return t}}),SVG.Parent=function(t){this.constructor.call(this,t)},SVG.Parent.prototype=new SVG.Element,SVG.extend(SVG.Parent,{children:function(){return this._children||(this._children=[])},add:function(t,e){if(!this.has(t)){if(e=null==e?this.children().length:e,t.parent){var i=t.parent.children().indexOf(t);t.parent.children().splice(i,1)}this.children().splice(e,0,t),this.node.insertBefore(t.node,this.node.childNodes[e]||null),t.parent=this}return this._defs&&(this.node.removeChild(this._defs.node),this.node.appendChild(this._defs.node)),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.children().indexOf(t)>=0},get:function(t){return this.children()[t]},first:function(){return this.children()[0]},last:function(){return this.children()[this.children().length-1]},each:function(t,e){var i,n,s=this.children();for(i=0,n=s.length;n>i;i++)s[i]instanceof SVG.Element&&t.apply(s[i],[i,s]),e&&s[i]instanceof SVG.Container&&s[i].each(t,e);return this},removeElement:function(t){var e=this.children().indexOf(t);return this.children().splice(e,1),this.node.removeChild(t.node),t.parent=null,this},clear:function(){for(var t=this.children().length-1;t>=0;t--)this.removeElement(this.children()[t]);return this._defs&&this._defs.clear(),this},defs:function(){return this.doc().defs()}}),SVG.Container=function(t){this.constructor.call(this,t)},SVG.Container.prototype=new SVG.Parent,SVG.extend(SVG.Container,{viewbox:function(t){return 0==arguments.length?new SVG.ViewBox(this):(t=1==arguments.length?[t.x,t.y,t.width,t.height]:[].slice.call(arguments),this.attr("viewBox",t))}}),SVG.FX=function(t){this.target=t},SVG.extend(SVG.FX,{animate:function(t,e,i){var n,s,r,h,o=this.target,a=this;return"object"==typeof t&&(i=t.delay,e=t.ease,t=t.duration),t=null==t?1e3:t,e=e||"<>",a.to=function(t){var i;if(t=0>t?0:t>1?1:t,null==n){n=[];for(h in a.attrs)n.push(h);if(o.morphArray){var u,l=new o.morphArray(a._plot||o.points.toString());a._size&&l.size(a._size.width.to,a._size.height.to),u=l.bbox(),a._x?l.move(a._x.to,u.y):a._cx&&l.move(a._cx.to-u.width/2,u.y),u=l.bbox(),a._y?l.move(u.x,a._y.to):a._cy&&l.move(u.x,a._cy.to-u.height/2),delete a._x,delete a._y,delete a._cx,delete a._cy,delete a._size,a._plot=o.points.morph(l)}}if(null==s){s=[];for(h in a.trans)s.push(h)}if(null==r){r=[];for(h in a.styles)r.push(h)}for(t="<>"==e?-Math.cos(t*Math.PI)/2+.5:">"==e?Math.sin(t*Math.PI/2):"<"==e?-Math.cos(t*Math.PI/2)+1:"-"==e?t:"function"==typeof e?e(t):t,a._x?o.x(a._at(a._x,t)):a._cx&&o.cx(a._at(a._cx,t)),a._y?o.y(a._at(a._y,t)):a._cy&&o.cy(a._at(a._cy,t)),a._size&&o.size(a._at(a._size.width,t),a._at(a._size.height,t)),a._plot&&o.plot(a._plot.at(t)),a._viewbox&&o.viewbox(a._at(a._viewbox.x,t),a._at(a._viewbox.y,t),a._at(a._viewbox.width,t),a._at(a._viewbox.height,t)),i=n.length-1;i>=0;i--)o.attr(n[i],a._at(a.attrs[n[i]],t));for(i=s.length-1;i>=0;i--)o.transform(s[i],a._at(a.trans[s[i]],t));for(i=r.length-1;i>=0;i--)o.style(r[i],a._at(a.styles[r[i]],t));a._during&&a._during.call(o,t,function(e,i){return a._at({from:e,to:i},t)})},"number"==typeof t&&(this.timeout=setTimeout(function(){var e=1e3/60,i=(new Date).getTime(),n=i+t;a.interval=setInterval(function(){var e=(new Date).getTime(),s=e>n?1:(e-i)/t;a.to(s),e>n&&(a._plot&&o.plot(new SVG.PointArray(a._plot.destination).settle()),clearInterval(a.interval),a._after?a._after.apply(o,[a]):a.stop())},t>e?e:t)},i||0)),this},bbox:function(){return this.target.bbox()},attr:function(t,e){if("object"==typeof t)for(var i in t)this.attr(i,t[i]);else this.attrs[t]={from:this.target.attr(t),to:e};return this},transform:function(t,e){if(1==arguments.length){t=this.target._parseMatrix(t),delete t.matrix;for(e in t)this.trans[e]={from:this.target.trans[e],to:t[e]}}else{var i={};i[t]=e,this.transform(i)}return this},style:function(t,e){if("object"==typeof t)for(var i in t)this.style(i,t[i]);else this.styles[t]={from:this.target.style(t),to:e};return this},x:function(t){return this._x={from:this.target.x(),to:t},this},y:function(t){return this._y={from:this.target.y(),to:t},this},cx:function(t){return this._cx={from:this.target.cx(),to:t},this},cy:function(t){return this._cy={from:this.target.cy(),to:t},this},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){if(this.target instanceof SVG.Text)this.attr("font-size",t);else{var i=this.target.bbox();this._size={width:{from:i.width,to:t},height:{from:i.height,to:e}}}return this},plot:function(t){return this._plot=t,this},viewbox:function(t,e,i,n){if(this.target instanceof SVG.Container){var s=this.target.viewbox();this._viewbox={x:{from:s.x,to:t},y:{from:s.y,to:e},width:{from:s.width,to:i},height:{from:s.height,to:n}}}return this},update:function(t){return this.target instanceof SVG.Stop&&(null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new SVG.Number(t.offset))),this},during:function(t){return this._during=t,this},after:function(t){return this._after=t,this},stop:function(){return clearTimeout(this.timeout),clearInterval(this.interval),this.attrs={},this.trans={},this.styles={},delete this._x,delete this._y,delete this._cx,delete this._cy,delete this._size,delete this._plot,delete this._after,delete this._during,delete this._viewbox,this},_at:function(t,e){return"number"==typeof t.from?t.from+(t.to-t.from)*e:SVG.regex.unit.test(t.to)?new SVG.Number(t.to).minus(new SVG.Number(t.from)).times(e).plus(new SVG.Number(t.from)):t.to&&(t.to.r||SVG.Color.test(t.to))?this._color(t,e):1>e?t.from:t.to},_color:function(t,e){var i,n;return e=0>e?0:e>1?1:e,i=new SVG.Color(t.from),n=new SVG.Color(t.to),new SVG.Color({r:~~(i.r+(n.r-i.r)*e),g:~~(i.g+(n.g-i.g)*e),b:~~(i.b+(n.b-i.b)*e)}).toHex()}}),SVG.extend(SVG.Element,{animate:function(t,e,i){return(this.fx||(this.fx=new SVG.FX(this))).stop().animate(t,e,i)},stop:function(){return this.fx&&this.fx.stop(),this}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","mouseenter","mouseleave"].forEach(function(t){SVG.Element.prototype[t]=function(e){var i=this;return this.node["on"+t]="function"==typeof e?function(){return e.apply(i,arguments)}:null,this}}),SVG.on=function(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent("on"+e,i)},SVG.off=function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent("on"+e,i)},SVG.extend(SVG.Element,{on:function(t,e){return SVG.on(this.node,t,e),this},off:function(t,e){return SVG.off(this.node,t,e),this}}),SVG.Defs=function(){this.constructor.call(this,SVG.create("defs"))},SVG.Defs.prototype=new SVG.Container,SVG.G=function(){this.constructor.call(this,SVG.create("g"))},SVG.G.prototype=new SVG.Container,SVG.extend(SVG.G,{x:function(t){return null==t?this.trans.x:this.transform("x",t)},y:function(t){return null==t?this.trans.y:this.transform("y",t)}}),SVG.extend(SVG.Container,{group:function(){return this.put(new SVG.G)}}),SVG.extend(SVG.Element,{siblings:function(){return this.parent.children()},position:function(){var t=this.siblings();return t.indexOf(this)},next:function(){return this.siblings()[this.position()+1]},previous:function(){return this.siblings()[this.position()-1]},forward:function(){var t=this.position();return this.parent.removeElement(this).put(this,t+1)},backward:function(){var t=this.position();return t>0&&this.parent.removeElement(this).add(this,t-1),this},front:function(){return this.parent.removeElement(this).put(this)},back:function(){return this.position()>0&&this.parent.removeElement(this).add(this,0),this},before:function(t){t.remove();var e=this.position();return this.parent.add(t,e),this},after:function(t){t.remove();var e=this.position();return this.parent.add(t,e+1),this}}),SVG.Mask=function(){this.constructor.call(this,SVG.create("mask")),this.targets=[]},SVG.Mask.prototype=new SVG.Container,SVG.extend(SVG.Mask,{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unmask();return delete this.targets,this.parent.removeElement(this),this}}),SVG.extend(SVG.Element,{maskWith:function(t){return this.masker=t instanceof SVG.Mask?t:this.parent.mask().add(t),this.masker.targets.push(this),this.attr("mask",'url("#'+this.masker.attr("id")+'")')},unmask:function(){return delete this.masker,this.attr("mask",null)}}),SVG.extend(SVG.Container,{mask:function(){return this.defs().put(new SVG.Mask)}}),SVG.Clip=function(){this.constructor.call(this,SVG.create("clipPath")),this.targets=[]},SVG.Clip.prototype=new SVG.Container,SVG.extend(SVG.Clip,{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unclip();return delete this.targets,this.parent.removeElement(this),this}}),SVG.extend(SVG.Element,{clipWith:function(t){return this.clipper=t instanceof SVG.Clip?t:this.parent.clip().add(t),this.clipper.targets.push(this),this.attr("clip-path",'url("#'+this.clipper.attr("id")+'")')},unclip:function(){return delete this.clipper,this.attr("clip-path",null)}}),SVG.extend(SVG.Container,{clip:function(){return this.defs().put(new SVG.Clip)}}),SVG.Gradient=function(t){this.constructor.call(this,SVG.create(t+"Gradient")),this.type=t},SVG.Gradient.prototype=new SVG.Container,SVG.extend(SVG.Gradient,{from:function(t,e){return"radial"==this.type?this.attr({fx:new SVG.Number(t),fy:new SVG.Number(e)}):this.attr({x1:new SVG.Number(t),y1:new SVG.Number(e)})},to:function(t,e){return"radial"==this.type?this.attr({cx:new SVG.Number(t),cy:new SVG.Number(e)}):this.attr({x2:new SVG.Number(t),y2:new SVG.Number(e)})},radius:function(t){return"radial"==this.type?this.attr({r:new SVG.Number(t)}):this},at:function(t){return this.put(new SVG.Stop(t))},update:function(t){return this.clear(),t(this),this},fill:function(){return"url(#"+this.attr("id")+")"},toString:function(){return this.fill()}}),SVG.extend(SVG.Defs,{gradient:function(t,e){var i=this.put(new SVG.Gradient(t));return e(i),i}}),SVG.extend(SVG.Container,{gradient:function(t,e){return this.defs().gradient(t,e)}}),SVG.Stop=function(t){this.constructor.call(this,SVG.create("stop")),this.update(t)},SVG.Stop.prototype=new SVG.Element,SVG.extend(SVG.Stop,{update:function(t){return null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new SVG.Number(t.offset)),this}}),SVG.Doc=function(t){this.parent="string"==typeof t?document.getElementById(t):t,this.constructor.call(this,"svg"==this.parent.nodeName?this.parent:SVG.create("svg")),this.attr({xmlns:SVG.ns,version:"1.1",width:"100%",height:"100%"}).attr("xlink",SVG.xlink,SVG.ns),this._defs=new SVG.Defs,this.node.appendChild(this._defs.node),"svg"!=this.parent.nodeName&&this.stage()},SVG.Doc.prototype=new SVG.Container,SVG.extend(SVG.Doc,{stage:function(){var t,e=this,i=document.createElement("div");return i.style.cssText="position:relative;height:100%;",e.parent.appendChild(i),i.appendChild(e.node),t=function(){"complete"===document.readyState?(e.style("position:absolute;"),setTimeout(function(){e.style("position:relative;overflow:hidden;"),e.parent.removeChild(e.node.parentNode),e.node.parentNode.removeChild(e.node),e.parent.appendChild(e.node),e.fixSubPixelOffset(),SVG.on(window,"resize",function(){e.fixSubPixelOffset()})},5)):setTimeout(t,10)},t(),this},defs:function(){return this._defs},fixSubPixelOffset:function(){var t=this.node.getScreenCTM();this.style("left",-t.e%1+"px").style("top",-t.f%1+"px")}}),SVG.Shape=function(t){this.constructor.call(this,t)},SVG.Shape.prototype=new SVG.Element,SVG.Use=function(){this.constructor.call(this,SVG.create("use"))},SVG.Use.prototype=new SVG.Shape,SVG.extend(SVG.Use,{element:function(t){return this.target=t,this.attr("href","#"+t,SVG.xlink)}}),SVG.extend(SVG.Container,{use:function(t){return this.put(new SVG.Use).element(t)}}),SVG.Rect=function(){this.constructor.call(this,SVG.create("rect"))},SVG.Rect.prototype=new SVG.Shape,SVG.extend(SVG.Container,{rect:function(t,e){return this.put((new SVG.Rect).size(t,e))}}),SVG.Ellipse=function(){this.constructor.call(this,SVG.create("ellipse"))},SVG.Ellipse.prototype=new SVG.Shape,SVG.extend(SVG.Ellipse,{x:function(t){return null==t?this.cx()-this.attr("rx"):this.cx(t+this.attr("rx"))},y:function(t){return null==t?this.cy()-this.attr("ry"):this.cy(t+this.attr("ry"))},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",new SVG.Number(t).divide(this.trans.scaleX))},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",new SVG.Number(t).divide(this.trans.scaleY))},size:function(t,e){return this.attr({rx:new SVG.Number(t).divide(2),ry:new SVG.Number(e).divide(2)})}}),SVG.extend(SVG.Container,{circle:function(t){return this.ellipse(t,t)},ellipse:function(t,e){return this.put(new SVG.Ellipse).size(t,e).move(0,0)}}),SVG.Line=function(){this.constructor.call(this,SVG.create("line"))},SVG.Line.prototype=new SVG.Shape,SVG.extend(SVG.Line,{x:function(t){var e=this.bbox();return null==t?e.x:this.attr({x1:this.attr("x1")-e.x+t,x2:this.attr("x2")-e.x+t})},y:function(t){var e=this.bbox();return null==t?e.y:this.attr({y1:this.attr("y1")-e.y+t,y2:this.attr("y2")-e.y+t})},cx:function(t){var e=this.bbox().width/2;return null==t?this.x()+e:this.x(t-e)},cy:function(t){var e=this.bbox().height/2;return null==t?this.y()+e:this.y(t-e)},size:function(t,e){var i=this.bbox();return this.attr(this.attr("x1")<this.attr("x2")?"x2":"x1",i.x+t).attr(this.attr("y1")<this.attr("y2")?"y2":"y1",i.y+e)},plot:function(t,e,i,n){return this.attr({x1:t,y1:e,x2:i,y2:n})}}),SVG.extend(SVG.Container,{line:function(t,e,i,n){return this.put((new SVG.Line).plot(t,e,i,n))}}),SVG.Polyline=function(){this.constructor.call(this,SVG.create("polyline"))},SVG.Polyline.prototype=new SVG.Shape,SVG.Polygon=function(){this.constructor.call(this,SVG.create("polygon"))},SVG.Polygon.prototype=new SVG.Shape,SVG.extend(SVG.Polyline,SVG.Polygon,{morphArray:SVG.PointArray,plot:function(t){return this.attr("points",this.points=new SVG.PointArray(t,[[0,0]]))},move:function(t,e){return this.attr("points",this.points.move(t,e))},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},size:function(t,e){return this.attr("points",this.points.size(t,e))}}),SVG.extend(SVG.Container,{polyline:function(t){return this.put(new SVG.Polyline).plot(t)},polygon:function(t){return this.put(new SVG.Polygon).plot(t)}}),SVG.Path=function(t){this.constructor.call(this,SVG.create("path")),this.unbiased=!!t},SVG.Path.prototype=new SVG.Shape,SVG.extend(SVG.Path,{_plot:function(t){return this.attr("d",t||"M0,0")}}),SVG.extend(SVG.Container,{path:function(t,e){return this.put(new SVG.Path(e)).plot(t)}}),SVG.extend(SVG.Path,{x:function(t){return null==t?this.bbox().x:this.transform("x",t)},y:function(t){return null==t?this.bbox().y:this.transform("y",t)},size:function(t,e){var i=t/this._offset.width;return this.transform({scaleX:i,scaleY:null!=e?e/this._offset.height:i})},plot:function(t){var e=this.trans.scaleX,i=this.trans.scaleY;return this._plot(t),this._offset=this.transform({scaleX:1,scaleY:1}).bbox(),this.unbiased?this._offset.x=this._offset.y=0:(this._offset.x-=this.trans.x,this._offset.y-=this.trans.y),this.transform({scaleX:e,scaleY:i})}}),SVG.Image=function(){this.constructor.call(this,SVG.create("image"))},SVG.Image.prototype=new SVG.Shape,SVG.extend(SVG.Image,{load:function(t){return t?this.attr("href",this.src=t,SVG.xlink):this}}),SVG.extend(SVG.Container,{image:function(t,e,i){return e=null!=e?e:100,this.put((new SVG.Image).load(t).size(e,null!=i?i:e))}});var t="size family weight stretch variant style".split(" ");SVG.Text=function(){this.constructor.call(this,SVG.create("text")),this.styles={"font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"},this._leading=new SVG.Number("1.2em"),this._rebuild=!0},SVG.Text.prototype=new SVG.Shape,SVG.extend(SVG.Text,{x:function(t,e){return null==t?e?this.attr("x"):this.bbox().x:(e||(e=this.style("text-anchor"),t="start"==e?t:"end"==e?t+this.bbox().width:t+this.bbox().width/2),this.textPath||this.lines.each(function(){this.newLined&&this.x(t)}),this.attr("x",t))},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t,e){return null==t?this.bbox().cy:this.y(e?t:t-this.bbox().height/2)},move:function(t,e,i){return this.x(t,i).y(e)},center:function(t,e,i){return this.cx(t,i).cy(e,i)},text:function(t){if(null==t)return this.content;if(this.clear(),"function"==typeof t)this._rebuild=!1,t(this);else{this._rebuild=!0,t=SVG.regex.isBlank.test(t)?"text":t;var e,i,n=t.split("\n");for(e=0,i=n.length;i>e;e++)this.tspan(n[e]).newLine();this.rebuild()}return this},tspan:function(t){var e=this.textPath?this.textPath.node:this.node,i=(new SVG.TSpan).text(t),n=this.style();return e.appendChild(i.node),this.lines.add(i),SVG.regex.isBlank.test(n)||i.style(n),this.content+=t,i.parent=this,i},size:function(t){return this.attr("font-size",t)},leading:function(t){return null==t?this._leading:(t=new SVG.Number(t),this._leading=t,this.lines.each(function(){this.newLined&&this.attr("dy",t)}),this)},rebuild:function(){return this._rebuild&&this.lines.attr({x:this.attr("x"),dy:this._leading,style:this.style()}),this},clear:function(){for(var t=this.textPath?this.textPath.node:this.node;t.hasChildNodes();)t.removeChild(t.lastChild);return delete this.lines,this.lines=new SVG.Set,this.content="",this}}),SVG.extend(SVG.Container,{text:function(t){return this.put(new SVG.Text).text(t)}}),SVG.TSpan=function(){this.constructor.call(this,SVG.create("tspan"))},SVG.TSpan.prototype=new SVG.Shape,SVG.extend(SVG.TSpan,{text:function(t){return this.node.appendChild(document.createTextNode(t)),this},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){return this.newLined=!0,this.parent.content+="\n",this.dy(this.parent._leading),this.attr("x",this.parent.x())}}),SVG.TextPath=function(){this.constructor.call(this,SVG.create("textPath"))},SVG.TextPath.prototype=new SVG.Element,SVG.extend(SVG.Text,{path:function(t){for(this.textPath=new SVG.TextPath;this.node.hasChildNodes();)this.textPath.node.appendChild(this.node.firstChild);return this.node.appendChild(this.textPath.node),this.track=this.doc().defs().path(t,!0),this.textPath.parent=this,this.textPath.attr("href","#"+this.track,SVG.xlink),this},plot:function(t){return this.track&&this.track.plot(t),this}}),SVG.Nested=function(){this.constructor.call(this,SVG.create("svg")),this.style("overflow","visible")},SVG.Nested.prototype=new SVG.Container,SVG.extend(SVG.Container,{nested:function(){return this.put(new SVG.Nested)}}),SVG._stroke=["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],SVG._fill=["color","opacity","rule"];var e=function(t,e){return"color"==e?t:t+"-"+e};["fill","stroke"].forEach(function(t){var i={};i[t]=function(i){if("string"==typeof i||SVG.Color.isRgb(i)||i&&"function"==typeof i.fill)this.attr(t,i);else for(index=SVG["_"+t].length-1;index>=0;index--)null!=i[SVG["_"+t][index]]&&this.attr(e(t,SVG["_"+t][index]),i[SVG["_"+t][index]]);return this},SVG.extend(SVG.Element,SVG.FX,i)}),SVG.extend(SVG.Element,SVG.FX,{rotate:function(t,e,i){return this.transform({rotation:t||0,cx:e,cy:i})},skew:function(t,e){return this.transform({skewX:t||0,skewY:e||0})},scale:function(t,e){return this.transform({scaleX:t,scaleY:null==e?t:e})},translate:function(t,e){return this.transform({x:t,y:e})},matrix:function(t){return this.transform({matrix:t})},opacity:function(t){return this.attr("opacity",t)}}),SVG.Text&&SVG.extend(SVG.Text,SVG.FX,{font:function(e){for(var i in e)"anchor"==i?this.attr("text-anchor",e[i]):t.indexOf(i)>-1?this.attr("font-"+i,e[i]):this.attr(i,e[i]);return this}}),SVG.Set=function(){this.clear()},SVG.SetFX=function(t){this.set=t},SVG.extend(SVG.Set,{add:function(){var t,e,i=[].slice.call(arguments);
for(t=0,e=i.length;e>t;t++)this.members.push(i[t]);return this},remove:function(t){var e=this.members.indexOf(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;i>e;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},valueOf:function(){return this.members}}),SVG.Set.inherit=function(){var t,e=[];for(var t in SVG.Shape.prototype)"function"==typeof SVG.Shape.prototype[t]&&"function"!=typeof SVG.Set.prototype[t]&&e.push(t);e.forEach(function(t){SVG.Set.prototype[t]=function(){for(var e=0,i=this.members.length;i>e;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return"animate"==t?this.fx||(this.fx=new SVG.SetFX(this)):this}}),e=[];for(var t in SVG.FX.prototype)"function"==typeof SVG.FX.prototype[t]&&"function"!=typeof SVG.SetFX.prototype[t]&&e.push(t);e.forEach(function(t){SVG.SetFX.prototype[t]=function(){for(var e=0,i=this.set.members.length;i>e;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this}})},SVG.extend(SVG.Container,{set:function(){return new SVG.Set}}),SVG.extend(SVG.Element,{remember:function(t,e){if("object"==typeof arguments[0])for(var e in t)this.remember(e,t[e]);else{if(1==arguments.length)return this.memory()[t];this.memory()[t]=e}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),"function"==typeof define&&define.amd?define(function(){return SVG}):"undefined"!=typeof exports&&(exports.SVG=SVG)}.call(this);;// svg.easing.js 0.2 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license
SVG.easing={backIn:function(e){var t=1.70158;return e*e*((t+1)*e-t)},backOut:function(e){e=e-1;var t=1.70158;return e*e*((t+1)*e+t)+1},bounce:function(e){var t=7.5625,n=2.75,r;if(e<1/n){r=t*e*e}else{if(e<2/n){e-=1.5/n;r=t*e*e+.75}else{if(e<2.5/n){e-=2.25/n;r=t*e*e+.9375}else{e-=2.625/n;r=t*e*e+.984375}}}return r},elastic:function(e){if(e==!!e)return e;return Math.pow(2,-10*e)*Math.sin((e-.075)*2*Math.PI/.3)+1}};// svg.filter.js 0.1 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license
;(function() {

  SVG.Filter = function() {
    this.constructor.call(this, SVG.create('filter'))
  }

  // Inherit from SVG.Container
  SVG.Filter.prototype = new SVG.Container

  //
  SVG.extend(SVG.Filter, {
    // Static strings
    source:           'SourceGraphic'
  , sourceAlpha:      'SourceAlpha'
  , background:       'BackgroundImage'
  , backgroundAlpha:  'BackgroundAlpha'
  , fill:             'FillPaint'
  , stroke:           'StrokePaint'
    // Custom put method for leaner code
  , put: function(element, i) {
      this.add(element, i)

      return element.attr({
        in:     this.source
      , result: element
      })
    }
    // Blend effect
  , blend: function(in1, in2, mode) {
      return this.put(new SVG.BlendEffect).attr({ in: in1, in2: in2, mode: mode || 'normal' })
    }
    // ColorMatrix effect
  , colorMatrix: function(type, values) {
      if (type == 'matrix')
        values = normaliseMatrix(values)

      return this.put(new SVG.ColorMatrixEffect).attr({
        type:   type
      , values: typeof values == 'undefined' ? null : values
      })
    }
    // ConvolveMatrix effect
  , convolveMatrix: function(matrix) {
      matrix = normaliseMatrix(matrix)

      return this.put(new SVG.ConvolveMatrixEffect).attr({
        order:        Math.sqrt(matrix.split(' ').length)
      , kernelMatrix: matrix
      })
    }
    // ComponentTransfer effect
  , componentTransfer: function(compontents) {
      var transfer = new SVG.ComponentTransferEffect

      /* create rgb set */
      transfer.rgb = new SVG.Set

      /* create components */
      ;(['r', 'g', 'b', 'a']).forEach(function(c) {
        /* create component */
        transfer[c] = new SVG['Func' + c.toUpperCase()]().attr('type', 'identity')

        /* store component in set */
        transfer.rgb.add(transfer[c])

        /* add component node */
        transfer.node.appendChild(transfer[c].node)
      })

      /* set components */
      if (compontents) {
        if (compontents.rgb) {
          /* set bundled components */
          ;(['r', 'g', 'b']).forEach(function(c) {
            transfer[c].attr(compontents.rgb)
          })

          delete compontents.rgb
        }
        
        /* set individual components */
        for (var c in compontents)
          transfer[c].attr(compontents[c])
      }
      
      return this.put(transfer) 
    }
    // Composite effect
  , composite: function(in1, in2, operator) {
      return this.put(new SVG.CompositeEffect).attr({ in: in1, in2: in2, operator: operator })
    }
    // Flood effect
  , flood: function(color) {
      return this.put(new SVG.FloodEffect).attr({ 'flood-color': color })
    }
    // Offset effect
  , offset: function(x, y) {
      return this.put(new SVG.OffsetEffect).attr({ dx: x, dy: y })
    }
    // Image effect
  , image: function(src) {
      return this.put(new SVG.ImageEffect).attr('href', src, SVG.xlink)
    }
    // Merge effect
  , merge: function() {
      // to be implemented
    }
    // Gaussian Blur effect
  , gaussianBlur: function(deviation) {
      return this.put(new SVG.GaussianBlurEffect).attr('stdDeviation', deviation)
    }
    // Default string value
  , toString: function() {
      return 'url(#' + this.attr('id') + ')'
    }

  })

  //
  SVG.extend(SVG.Defs, {
    // Define filter
    filter: function(block) {
      var filter = this.put(new SVG.Filter)
      
      /* invoke passed block */
      if (typeof block === 'function')
        block(filter)
      
      return filter
    }
    
  })

  //
  SVG.extend(SVG.Container, {
    // Define filter on defs
    filter: function(block) {
      return this.defs().filter(block)
    }
    
  })

  //
  SVG.extend(SVG.Element, {
    // Create filter element in defs and store reference
    filter: function(block) {
      this.filterer = block instanceof SVG.Element ?
        block : this.doc().filter(block)

      this.attr('filter', this.filterer)

      return this.filterer
    }
    // Remove filter
  , unfilter: function() {
      delete this.filterer
      return this.attr('filter', null)
    }
    // Convencience blur
  , blur: function(radius) {

    }

  })

  // Create wrapping SVG.Effect class
  SVG.Effect = function() {}

  // Inherit from SVG.Element
  SVG.Effect.prototype = new SVG.Element

  SVG.extend(SVG.Effect, {
    // Set in attribute
    in: function(effect) {
      return this.attr('in', effect)
    }
    // Named result
  , result: function() {
      return this.attr('id') + 'Out'
    }
    // Stringification
  , toString: function() {
      return this.result()
    }

  })

  // Create all different effects
  var effects = [
      'blend'
    , 'colorMatrix'
    , 'componentTransfer'
    , 'composite'
    , 'convolveMatrix'
    , 'diffuseLighting'
    , 'displacementMap'
    , 'flood'
    , 'gaussianBlur'
    , 'image'
    , 'merge'
    , 'morphology'
    , 'offset'
    , 'specularLighting'
    , 'tile'
    , 'turbulence'
    , 'distantLight'
    , 'pointLight'
    , 'spotLight'
  ]

  effects.forEach(function(effect) {
    /* capitalize name */
    var name = effect.charAt(0).toUpperCase() + effect.slice(1)

    /* create class */
    SVG[name + 'Effect'] = function() {
      this.constructor.call(this, SVG.create('fe' + name))
    }

    /* inherit from SVG.Effect */
    SVG[name + 'Effect'].prototype = new SVG.Effect

    /* make all effects interchainable */
    effects.forEach(function(e) {

      SVG[name + 'Effect'].prototype[e] = function() {
        return this.parent[e].apply(this.parent, arguments).in(this)
      }

    })

  })

  // Create compontent functions
  ;(['r', 'g', 'b', 'a']).forEach(function(c) {
    /* create class */
    SVG['Func' + c.toUpperCase()] = function() {
      this.constructor.call(this, SVG.create('feFunc' + c.toUpperCase()))
    }

    /* inherit from SVG.Element */
    SVG['Func' + c.toUpperCase()].prototype = new SVG.Element

  })


  // Effect-specific extensions
  SVG.extend(SVG.FloodEffect, {
    // implement flood-color and flood-opacity
  })


  // Helpers
  function normaliseMatrix(matrix) {
    /* convert possible array value to string */
    if (Array.isArray(matrix))
      matrix = new SVG.Array(matrix)

    /* ensure there are no leading, tailing or double spaces */
    return matrix.toString().replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/g, ' ')
  }

}).call(this)






























;/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20131201
 */

/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio, opera */
/*jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true, todo: true */

/**
 * About this file
 * -------------------------------------------------------------------------------------
 * This is the fully-commented source version of the SoundManager 2 API,
 * recommended for use during development and testing.
 *
 * See soundmanager2-nodebug-jsmin.js for an optimized build (~11KB with gzip.)
 * http://schillmania.com/projects/soundmanager2/doc/getstarted/#basic-inclusion
 * Alternately, serve this file with gzip for 75% compression savings (~30KB over HTTP.)
 *
 * You may notice <d> and </d> comments in this source; these are delimiters for
 * debug blocks which are removed in the -nodebug builds, further optimizing code size.
 *
 * Also, as you may note: Whoa, reliable cross-platform/device audio support is hard! ;)
 */

(function(window, _undefined) {

"use strict";

var soundManager = null;

/**
 * The SoundManager constructor.
 *
 * @constructor
 * @param {string} smURL Optional: Path to SWF files
 * @param {string} smID Optional: The ID to use for the SWF container element
 * @this {SoundManager}
 * @return {SoundManager} The new SoundManager instance
 */

function SoundManager(smURL, smID) {

  /**
   * soundManager configuration options list
   * defines top-level configuration properties to be applied to the soundManager instance (eg. soundManager.flashVersion)
   * to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
   */

  this.setupOptions = {

    'url': (smURL || null),             // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
    'flashVersion': 8,                  // flash build to use (8 or 9.) Some API features require 9.
    'debugMode': true,                  // enable debugging output (console.log() with HTML fallback)
    'debugFlash': false,                // enable debugging output inside SWF, troubleshoot Flash/browser issues
    'useConsole': true,                 // use console.log() if available (otherwise, writes to #soundmanager-debug element)
    'consoleOnly': true,                // if console is being used, do not create/write to #soundmanager-debug
    'waitForWindowLoad': false,         // force SM2 to wait for window.onload() before trying to call soundManager.onload()
    'bgColor': '#ffffff',               // SWF background color. N/A when wmode = 'transparent'
    'useHighPerformance': false,        // position:fixed flash movie can help increase js/flash speed, minimize lag
    'flashPollingInterval': null,       // msec affecting whileplaying/loading callback frequency. If null, default of 50 msec is used.
    'html5PollingInterval': null,       // msec affecting whileplaying() for HTML5 audio, excluding mobile devices. If null, native HTML5 update events are used.
    'flashLoadTimeout': 1000,           // msec to wait for flash movie to load before failing (0 = infinity)
    'wmode': null,                      // flash rendering mode - null, 'transparent', or 'opaque' (last two allow z-index to work)
    'allowScriptAccess': 'always',      // for scripting the SWF (object/embed property), 'always' or 'sameDomain'
    'useFlashBlock': false,             // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
    'useHTML5Audio': true,              // use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (no MP3/MP4.) Ideally, transparent vs. Flash API where possible.
    'html5Test': /^(probably|maybe)$/i, // HTML5 Audio() format support test. Use /^probably$/i; if you want to be more conservative.
    'preferFlash': false,               // overrides useHTML5audio, will use Flash for MP3/MP4/AAC if present. Potential option if HTML5 playback with these formats is quirky.
    'noSWFCache': false,                // if true, appends ?ts={date} to break aggressive SWF caching.
    'idPrefix': 'sound'                 // if an id is not provided to createSound(), this prefix is used for generated IDs - 'sound0', 'sound1' etc.

  };

  this.defaultOptions = {

    /**
     * the default configuration for sound objects made with createSound() and related methods
     * eg., volume, auto-load behaviour and so forth
     */

    'autoLoad': false,        // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
    'autoPlay': false,        // enable playing of file as soon as possible (much faster if "stream" is true)
    'from': null,             // position to start playback within a sound (msec), default = beginning
    'loops': 1,               // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
    'onid3': null,            // callback function for "ID3 data is added/available"
    'onload': null,           // callback function for "load finished"
    'whileloading': null,     // callback function for "download progress update" (X of Y bytes received)
    'onplay': null,           // callback for "play" start
    'onpause': null,          // callback for "pause"
    'onresume': null,         // callback for "resume" (pause toggle)
    'whileplaying': null,     // callback during play (position update)
    'onposition': null,       // object containing times and function callbacks for positions of interest
    'onstop': null,           // callback for "user stop"
    'onfailure': null,        // callback function for when playing fails
    'onfinish': null,         // callback function for "sound finished playing"
    'multiShot': true,        // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
    'multiShotEvents': false, // fire multiple sound events (currently onfinish() only) when multiShot is enabled
    'position': null,         // offset (milliseconds) to seek to within loaded sound data.
    'pan': 0,                 // "pan" settings, left-to-right, -100 to 100
    'stream': true,           // allows playing before entire file has loaded (recommended)
    'to': null,               // position to end playback within a sound (msec), default = end
    'type': null,             // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
    'usePolicyFile': false,   // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
    'volume': 100             // self-explanatory. 0-100, the latter being the max.

  };

  this.flash9Options = {

    /**
     * flash 9-only options,
     * merged into defaultOptions if flash 9 is being used
     */

    'isMovieStar': null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
    'usePeakData': false,     // enable left/right channel peak (level) data
    'useWaveformData': false, // enable sound spectrum (raw waveform data) - NOTE: May increase CPU load.
    'useEQData': false,       // enable sound EQ (frequency spectrum data) - NOTE: May increase CPU load.
    'onbufferchange': null,   // callback for "isBuffering" property change
    'ondataerror': null       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)

  };

  this.movieStarOptions = {

    /**
     * flash 9.0r115+ MPEG4 audio options,
     * merged into defaultOptions if flash 9+movieStar mode is enabled
     */

    'bufferTime': 3,          // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
    'serverURL': null,        // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
    'onconnect': null,        // rtmp: callback for connection to flash media server
    'duration': null          // rtmp: song duration (msec)

  };

  this.audioFormats = {

    /**
     * determines HTML5 support + flash requirements.
     * if no support (via flash and/or HTML5) for a "required" format, SM2 will fail to start.
     * flash fallback is used for MP3 or MP4 if HTML5 can't play it (or if preferFlash = true)
     */

    'mp3': {
      'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
      'required': true
    },

    'mp4': {
      'related': ['aac','m4a','m4b'], // additional formats under the MP4 container
      'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
      'required': false
    },

    'ogg': {
      'type': ['audio/ogg; codecs=vorbis'],
      'required': false
    },

    'opus': {
      'type': ['audio/ogg; codecs=opus', 'audio/opus'],
      'required': false
    },

    'wav': {
      'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
      'required': false
    }

  };

  // HTML attributes (id + class names) for the SWF container

  this.movieID = 'sm2-container';
  this.id = (smID || 'sm2movie');

  this.debugID = 'soundmanager-debug';
  this.debugURLParam = /([#?&])debug=1/i;

  // dynamic attributes

  this.versionNumber = 'V2.97a.20131201';
  this.version = null;
  this.movieURL = null;
  this.altURL = null;
  this.swfLoaded = false;
  this.enabled = false;
  this.oMC = null;
  this.sounds = {};
  this.soundIDs = [];
  this.muted = false;
  this.didFlashBlock = false;
  this.filePattern = null;

  this.filePatterns = {

    'flash8': /\.mp3(\?.*)?$/i,
    'flash9': /\.mp3(\?.*)?$/i

  };

  // support indicators, set at init

  this.features = {

    'buffering': false,
    'peakData': false,
    'waveformData': false,
    'eqData': false,
    'movieStar': false

  };

  // flash sandbox info, used primarily in troubleshooting

  this.sandbox = {

    // <d>
    'type': null,
    'types': {
      'remote': 'remote (domain-based) rules',
      'localWithFile': 'local with file access (no internet access)',
      'localWithNetwork': 'local with network (internet access only, no local access)',
      'localTrusted': 'local, trusted (local+internet access)'
    },
    'description': null,
    'noRemote': null,
    'noLocal': null
    // </d>

  };

  /**
   * format support (html5/flash)
   * stores canPlayType() results based on audioFormats.
   * eg. { mp3: boolean, mp4: boolean }
   * treat as read-only.
   */

  this.html5 = {
    'usingFlash': null // set if/when flash fallback is needed
  };

  // file type support hash
  this.flash = {};

  // determined at init time
  this.html5Only = false;

  // used for special cases (eg. iPad/iPhone/palm OS?)
  this.ignoreFlash = false;

  /**
   * a few private internals (OK, a lot. :D)
   */

  var SMSound,
  sm2 = this, globalHTML5Audio = null, flash = null, sm = 'soundManager', smc = sm + ': ', h5 = 'HTML5::', id, ua = navigator.userAgent, wl = window.location.href.toString(), doc = document, doNothing, setProperties, init, fV, on_queue = [], debugOpen = true, debugTS, didAppend = false, appendSuccess = false, didInit = false, disabled = false, windowLoaded = false, _wDS, wdCount = 0, initComplete, mixin, assign, extraOptions, addOnEvent, processOnEvents, initUserOnload, delayWaitForEI, waitForEI, rebootIntoHTML5, setVersionInfo, handleFocus, strings, initMovie, preInit, domContentLoaded, winOnLoad, didDCLoaded, getDocument, createMovie, catchError, setPolling, initDebug, debugLevels = ['log', 'info', 'warn', 'error'], defaultFlashVersion = 8, disableObject, failSafely, normalizeMovieURL, oRemoved = null, oRemovedHTML = null, str, flashBlockHandler, getSWFCSS, swfCSS, toggleDebug, loopFix, policyFix, complain, idCheck, waitingForEI = false, initPending = false, startTimer, stopTimer, timerExecute, h5TimerCount = 0, h5IntervalTimer = null, parseURL, messages = [],
  canIgnoreFlash, needsFlash = null, featureCheck, html5OK, html5CanPlay, html5Ext, html5Unload, domContentLoadedIE, testHTML5, event, slice = Array.prototype.slice, useGlobalHTML5Audio = false, lastGlobalHTML5URL, hasFlash, detectFlash, badSafariFix, html5_events, showSupport, flushMessages, wrapCallback, idCounter = 0,
  is_iDevice = ua.match(/(ipad|iphone|ipod)/i), isAndroid = ua.match(/android/i), isIE = ua.match(/msie/i), isWebkit = ua.match(/webkit/i), isSafari = (ua.match(/safari/i) && !ua.match(/chrome/i)), isOpera = (ua.match(/opera/i)),
  mobileHTML5 = (ua.match(/(mobile|pre\/|xoom)/i) || is_iDevice || isAndroid),
  isBadSafari = (!wl.match(/usehtml5audio/i) && !wl.match(/sm2\-ignorebadua/i) && isSafari && !ua.match(/silk/i) && ua.match(/OS X 10_6_([3-7])/i)), // Safari 4 and 5 (excluding Kindle Fire, "Silk") occasionally fail to load/play HTML5 audio on Snow Leopard 10.6.3 through 10.6.7 due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Confirmed bug. https://bugs.webkit.org/show_bug.cgi?id=32159
  hasConsole = (window.console !== _undefined && console.log !== _undefined), isFocused = (doc.hasFocus !== _undefined?doc.hasFocus():null), tryInitOnFocus = (isSafari && (doc.hasFocus === _undefined || !doc.hasFocus())), okToDisable = !tryInitOnFocus, flashMIME = /(mp3|mp4|mpa|m4a|m4b)/i, msecScale = 1000,
  emptyURL = 'about:blank', // safe URL to unload, or load nothing from (flash 8 + most HTML5 UAs)
  emptyWAV = 'data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==', // tiny WAV for HTML5 unloading
  overHTTP = (doc.location?doc.location.protocol.match(/http/i):null),
  http = (!overHTTP ? 'http:/'+'/' : ''),
  // mp3, mp4, aac etc.
  netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
  // Flash v9.0r115+ "moviestar" formats
  netStreamTypes = ['mpeg4', 'aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'm4b', 'mp4v', '3gp', '3g2'],
  netStreamPattern = new RegExp('\\.(' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');

  this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // default mp3 set

  // use altURL if not "online"
  this.useAltURL = !overHTTP;

  swfCSS = {

    'swfBox': 'sm2-object-box',
    'swfDefault': 'movieContainer',
    'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
    'swfTimedout': 'swf_timedout',
    'swfLoaded': 'swf_loaded',
    'swfUnblocked': 'swf_unblocked', // or loaded OK
    'sm2Debug': 'sm2_debug',
    'highPerf': 'high_performance',
    'flashDebug': 'flash_debug'

  };

  /**
   * basic HTML5 Audio() support test
   * try...catch because of IE 9 "not implemented" nonsense
   * https://github.com/Modernizr/Modernizr/issues/224
   */

  this.hasHTML5 = (function() {
    try {
      // new Audio(null) for stupid Opera 9.64 case, which throws not_enough_arguments exception otherwise.
      return (Audio !== _undefined && (isOpera && opera !== _undefined && opera.version() < 10 ? new Audio(null) : new Audio()).canPlayType !== _undefined);
    } catch(e) {
      return false;
    }
  }());

  /**
   * Public SoundManager API
   * -----------------------
   */

  /**
   * Configures top-level soundManager properties.
   *
   * @param {object} options Option parameters, eg. { flashVersion: 9, url: '/path/to/swfs/' }
   * onready and ontimeout are also accepted parameters. call soundManager.setup() to see the full list.
   */

  this.setup = function(options) {

    var noURL = (!sm2.url);

    // warn if flash options have already been applied

    if (options !== _undefined && didInit && needsFlash && sm2.ok() && (options.flashVersion !== _undefined || options.url !== _undefined || options.html5Test !== _undefined)) {
      complain(str('setupLate'));
    }

    // TODO: defer: true?

    assign(options);

    // special case 1: "Late setup". SM2 loaded normally, but user didn't assign flash URL eg., setup({url:...}) before SM2 init. Treat as delayed init.

    if (options) {

      if (noURL && didDCLoaded && options.url !== _undefined) {
        sm2.beginDelayedInit();
      }

      // special case 2: If lazy-loading SM2 (DOMContentLoaded has already happened) and user calls setup() with url: parameter, try to init ASAP.

      if (!didDCLoaded && options.url !== _undefined && doc.readyState === 'complete') {
        setTimeout(domContentLoaded, 1);
      }

    }

    return sm2;

  };

  this.ok = function() {

    return (needsFlash ? (didInit && !disabled) : (sm2.useHTML5Audio && sm2.hasHTML5));

  };

  this.supported = this.ok; // legacy

  this.getMovie = function(smID) {

    // safety net: some old browsers differ on SWF references, possibly related to ExternalInterface / flash version
    return id(smID) || doc[smID] || window[smID];

  };

  /**
   * Creates a SMSound sound object instance.
   *
   * @param {object} oOptions Sound options (at minimum, id and url parameters are required.)
   * @return {object} SMSound The new SMSound object.
   */

  this.createSound = function(oOptions, _url) {

    var cs, cs_string, options, oSound = null;

    // <d>
    cs = sm + '.createSound(): ';
    cs_string = cs + str(!didInit?'notReady':'notOK');
    // </d>

    if (!didInit || !sm2.ok()) {
      complain(cs_string);
      return false;
    }

    if (_url !== _undefined) {
      // function overloading in JS! :) ..assume simple createSound(id, url) use case
      oOptions = {
        'id': oOptions,
        'url': _url
      };
    }

    // inherit from defaultOptions
    options = mixin(oOptions);

    options.url = parseURL(options.url);

    // generate an id, if needed.
    if (options.id === undefined) {
      options.id = sm2.setupOptions.idPrefix + (idCounter++);
    }

    // <d>
    if (options.id.toString().charAt(0).match(/^[0-9]$/)) {
      sm2._wD(cs + str('badID', options.id), 2);
    }

    sm2._wD(cs + options.id + (options.url ? ' (' + options.url + ')' : ''), 1);
    // </d>

    if (idCheck(options.id, true)) {
      sm2._wD(cs + options.id + ' exists', 1);
      return sm2.sounds[options.id];
    }

    function make() {

      options = loopFix(options);
      sm2.sounds[options.id] = new SMSound(options);
      sm2.soundIDs.push(options.id);
      return sm2.sounds[options.id];

    }

    if (html5OK(options)) {

      oSound = make();
      sm2._wD(options.id + ': Using HTML5');
      oSound._setup_html5(options);

    } else {

      if (sm2.html5Only) {
        sm2._wD(options.id + ': No HTML5 support for this sound, and no Flash. Exiting.');
        return make();
      }

      // TODO: Move HTML5/flash checks into generic URL parsing/handling function.

      if (sm2.html5.usingFlash && options.url && options.url.match(/data\:/i)) {
        // data: URIs not supported by Flash, either.
        sm2._wD(options.id + ': data: URIs not supported via Flash. Exiting.');
        return make();
      }

      if (fV > 8) {
        if (options.isMovieStar === null) {
          // attempt to detect MPEG-4 formats
          options.isMovieStar = !!(options.serverURL || (options.type ? options.type.match(netStreamMimeTypes) : false) || (options.url && options.url.match(netStreamPattern)));
        }
        // <d>
        if (options.isMovieStar) {
          sm2._wD(cs + 'using MovieStar handling');
          if (options.loops > 1) {
            _wDS('noNSLoop');
          }
        }
        // </d>
      }

      options = policyFix(options, cs);
      oSound = make();

      if (fV === 8) {
        flash._createSound(options.id, options.loops||1, options.usePolicyFile);
      } else {
        flash._createSound(options.id, options.url, options.usePeakData, options.useWaveformData, options.useEQData, options.isMovieStar, (options.isMovieStar?options.bufferTime:false), options.loops||1, options.serverURL, options.duration||null, options.autoPlay, true, options.autoLoad, options.usePolicyFile);
        if (!options.serverURL) {
          // We are connected immediately
          oSound.connected = true;
          if (options.onconnect) {
            options.onconnect.apply(oSound);
          }
        }
      }

      if (!options.serverURL && (options.autoLoad || options.autoPlay)) {
        // call load for non-rtmp streams
        oSound.load(options);
      }

    }

    // rtmp will play in onconnect
    if (!options.serverURL && options.autoPlay) {
      oSound.play();
    }

    return oSound;

  };

  /**
   * Destroys a SMSound sound object instance.
   *
   * @param {string} sID The ID of the sound to destroy
   */

  this.destroySound = function(sID, _bFromSound) {

    // explicitly destroy a sound before normal page unload, etc.

    if (!idCheck(sID)) {
      return false;
    }

    var oS = sm2.sounds[sID], i;

    // Disable all callbacks while the sound is being destroyed
    oS._iO = {};

    oS.stop();
    oS.unload();

    for (i = 0; i < sm2.soundIDs.length; i++) {
      if (sm2.soundIDs[i] === sID) {
        sm2.soundIDs.splice(i, 1);
        break;
      }
    }

    if (!_bFromSound) {
      // ignore if being called from SMSound instance
      oS.destruct(true);
    }

    oS = null;
    delete sm2.sounds[sID];

    return true;

  };

  /**
   * Calls the load() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {object} oOptions Optional: Sound options
   */

  this.load = function(sID, oOptions) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].load(oOptions);

  };

  /**
   * Calls the unload() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   */

  this.unload = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].unload();

  };

  /**
   * Calls the onPosition() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {number} nPosition The position to watch for
   * @param {function} oMethod The relevant callback to fire
   * @param {object} oScope Optional: The scope to apply the callback to
   * @return {SMSound} The SMSound object
   */

  this.onPosition = function(sID, nPosition, oMethod, oScope) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].onposition(nPosition, oMethod, oScope);

  };

  // legacy/backwards-compability: lower-case method name
  this.onposition = this.onPosition;

  /**
   * Calls the clearOnPosition() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {number} nPosition The position to watch for
   * @param {function} oMethod Optional: The relevant callback to fire
   * @return {SMSound} The SMSound object
   */

  this.clearOnPosition = function(sID, nPosition, oMethod) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].clearOnPosition(nPosition, oMethod);

  };

  /**
   * Calls the play() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {object} oOptions Optional: Sound options
   * @return {SMSound} The SMSound object
   */

  this.play = function(sID, oOptions) {

    var result = null,
        // legacy function-overloading use case: play('mySound', '/path/to/some.mp3');
        overloaded = (oOptions && !(oOptions instanceof Object));

    if (!didInit || !sm2.ok()) {
      complain(sm + '.play(): ' + str(!didInit?'notReady':'notOK'));
      return false;
    }

    if (!idCheck(sID, overloaded)) {

      if (!overloaded) {
        // no sound found for the given ID. Bail.
        return false;
      }

      if (overloaded) {
        oOptions = {
          url: oOptions
        };
      }

      if (oOptions && oOptions.url) {
        // overloading use case, create+play: .play('someID', {url:'/path/to.mp3'});
        sm2._wD(sm + '.play(): Attempting to create "' + sID + '"', 1);
        oOptions.id = sID;
        result = sm2.createSound(oOptions).play();
      }

    } else if (overloaded) {

      // existing sound object case
      oOptions = {
        url: oOptions
      };

    }

    if (result === null) {
      // default case
      result = sm2.sounds[sID].play(oOptions);
    }

    return result;

  };

  this.start = this.play; // just for convenience

  /**
   * Calls the setPosition() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {number} nMsecOffset Position (milliseconds)
   * @return {SMSound} The SMSound object
   */

  this.setPosition = function(sID, nMsecOffset) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].setPosition(nMsecOffset);

  };

  /**
   * Calls the stop() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.stop = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }

    sm2._wD(sm + '.stop(' + sID + ')', 1);
    return sm2.sounds[sID].stop();

  };

  /**
   * Stops all currently-playing sounds.
   */

  this.stopAll = function() {

    var oSound;
    sm2._wD(sm + '.stopAll()', 1);

    for (oSound in sm2.sounds) {
      if (sm2.sounds.hasOwnProperty(oSound)) {
        // apply only to sound objects
        sm2.sounds[oSound].stop();
      }
    }

  };

  /**
   * Calls the pause() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.pause = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].pause();

  };

  /**
   * Pauses all currently-playing sounds.
   */

  this.pauseAll = function() {

    var i;
    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
      sm2.sounds[sm2.soundIDs[i]].pause();
    }

  };

  /**
   * Calls the resume() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.resume = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].resume();

  };

  /**
   * Resumes all currently-paused sounds.
   */

  this.resumeAll = function() {

    var i;
    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
      sm2.sounds[sm2.soundIDs[i]].resume();
    }

  };

  /**
   * Calls the togglePause() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.togglePause = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].togglePause();

  };

  /**
   * Calls the setPan() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {number} nPan The pan value (-100 to 100)
   * @return {SMSound} The SMSound object
   */

  this.setPan = function(sID, nPan) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].setPan(nPan);

  };

  /**
   * Calls the setVolume() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @param {number} nVol The volume value (0 to 100)
   * @return {SMSound} The SMSound object
   */

  this.setVolume = function(sID, nVol) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].setVolume(nVol);

  };

  /**
   * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
   *
   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
   */

  this.mute = function(sID) {

    var i = 0;

    if (sID instanceof String) {
      sID = null;
    }

    if (!sID) {

      sm2._wD(sm + '.mute(): Muting all sounds');
      for (i = sm2.soundIDs.length-1; i >= 0; i--) {
        sm2.sounds[sm2.soundIDs[i]].mute();
      }
      sm2.muted = true;

    } else {

      if (!idCheck(sID)) {
        return false;
      }
      sm2._wD(sm + '.mute(): Muting "' + sID + '"');
      return sm2.sounds[sID].mute();

    }

    return true;

  };

  /**
   * Mutes all sounds.
   */

  this.muteAll = function() {

    sm2.mute();

  };

  /**
   * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
   *
   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
   */

  this.unmute = function(sID) {

    var i;

    if (sID instanceof String) {
      sID = null;
    }

    if (!sID) {

      sm2._wD(sm + '.unmute(): Unmuting all sounds');
      for (i = sm2.soundIDs.length-1; i >= 0; i--) {
        sm2.sounds[sm2.soundIDs[i]].unmute();
      }
      sm2.muted = false;

    } else {

      if (!idCheck(sID)) {
        return false;
      }
      sm2._wD(sm + '.unmute(): Unmuting "' + sID + '"');
      return sm2.sounds[sID].unmute();

    }

    return true;

  };

  /**
   * Unmutes all sounds.
   */

  this.unmuteAll = function() {

    sm2.unmute();

  };

  /**
   * Calls the toggleMute() method of a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.toggleMute = function(sID) {

    if (!idCheck(sID)) {
      return false;
    }
    return sm2.sounds[sID].toggleMute();

  };

  /**
   * Retrieves the memory used by the flash plugin.
   *
   * @return {number} The amount of memory in use
   */

  this.getMemoryUse = function() {

    // flash-only
    var ram = 0;

    if (flash && fV !== 8) {
      ram = parseInt(flash._getMemoryUse(), 10);
    }

    return ram;

  };

  /**
   * Undocumented: NOPs soundManager and all SMSound objects.
   */

  this.disable = function(bNoDisable) {

    // destroy all functions
    var i;

    if (bNoDisable === _undefined) {
      bNoDisable = false;
    }

    if (disabled) {
      return false;
    }

    disabled = true;
    _wDS('shutdown', 1);

    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
      disableObject(sm2.sounds[sm2.soundIDs[i]]);
    }

    // fire "complete", despite fail
    initComplete(bNoDisable);
    event.remove(window, 'load', initUserOnload);

    return true;

  };

  /**
   * Determines playability of a MIME type, eg. 'audio/mp3'.
   */

  this.canPlayMIME = function(sMIME) {

    var result;

    if (sm2.hasHTML5) {
      result = html5CanPlay({type:sMIME});
    }

    if (!result && needsFlash) {
      // if flash 9, test netStream (movieStar) types as well.
      result = (sMIME && sm2.ok() ? !!((fV > 8 ? sMIME.match(netStreamMimeTypes) : null) || sMIME.match(sm2.mimePattern)) : null); // TODO: make less "weird" (per JSLint)
    }

    return result;

  };

  /**
   * Determines playability of a URL based on audio support.
   *
   * @param {string} sURL The URL to test
   * @return {boolean} URL playability
   */

  this.canPlayURL = function(sURL) {

    var result;

    if (sm2.hasHTML5) {
      result = html5CanPlay({url: sURL});
    }

    if (!result && needsFlash) {
      result = (sURL && sm2.ok() ? !!(sURL.match(sm2.filePattern)) : null);
    }

    return result;

  };

  /**
   * Determines playability of an HTML DOM &lt;a&gt; object (or similar object literal) based on audio support.
   *
   * @param {object} oLink an HTML DOM &lt;a&gt; object or object literal including href and/or type attributes
   * @return {boolean} URL playability
   */

  this.canPlayLink = function(oLink) {

    if (oLink.type !== _undefined && oLink.type) {
      if (sm2.canPlayMIME(oLink.type)) {
        return true;
      }
    }

    return sm2.canPlayURL(oLink.href);

  };

  /**
   * Retrieves a SMSound object by ID.
   *
   * @param {string} sID The ID of the sound
   * @return {SMSound} The SMSound object
   */

  this.getSoundById = function(sID, _suppressDebug) {

    if (!sID) {
      return null;
    }

    var result = sm2.sounds[sID];

    // <d>
    if (!result && !_suppressDebug) {
      sm2._wD(sm + '.getSoundById(): Sound "' + sID + '" not found.', 2);
    }
    // </d>

    return result;

  };

  /**
   * Queues a callback for execution when SoundManager has successfully initialized.
   *
   * @param {function} oMethod The callback method to fire
   * @param {object} oScope Optional: The scope to apply to the callback
   */

  this.onready = function(oMethod, oScope) {

    var sType = 'onready',
        result = false;

    if (typeof oMethod === 'function') {

      // <d>
      if (didInit) {
        sm2._wD(str('queue', sType));
      }
      // </d>

      if (!oScope) {
        oScope = window;
      }

      addOnEvent(sType, oMethod, oScope);
      processOnEvents();

      result = true;

    } else {

      throw str('needFunction', sType);

    }

    return result;

  };

  /**
   * Queues a callback for execution when SoundManager has failed to initialize.
   *
   * @param {function} oMethod The callback method to fire
   * @param {object} oScope Optional: The scope to apply to the callback
   */

  this.ontimeout = function(oMethod, oScope) {

    var sType = 'ontimeout',
        result = false;

    if (typeof oMethod === 'function') {

      // <d>
      if (didInit) {
        sm2._wD(str('queue', sType));
      }
      // </d>

      if (!oScope) {
        oScope = window;
      }

      addOnEvent(sType, oMethod, oScope);
      processOnEvents({type:sType});

      result = true;

    } else {

      throw str('needFunction', sType);

    }

    return result;

  };

  /**
   * Writes console.log()-style debug output to a console or in-browser element.
   * Applies when debugMode = true
   *
   * @param {string} sText The console message
   * @param {object} nType Optional log level (number), or object. Number case: Log type/style where 0 = 'info', 1 = 'warn', 2 = 'error'. Object case: Object to be dumped.
   */

  this._writeDebug = function(sText, sTypeOrObject) {

    // pseudo-private console.log()-style output
    // <d>

    var sDID = 'soundmanager-debug', o, oItem;

    if (!sm2.debugMode) {
      return false;
    }

    if (hasConsole && sm2.useConsole) {
      if (sTypeOrObject && typeof sTypeOrObject === 'object') {
        // object passed; dump to console.
        console.log(sText, sTypeOrObject);
      } else if (debugLevels[sTypeOrObject] !== _undefined) {
        console[debugLevels[sTypeOrObject]](sText);
      } else {
        console.log(sText);
      }
      if (sm2.consoleOnly) {
        return true;
      }
    }

    o = id(sDID);

    if (!o) {
      return false;
    }

    oItem = doc.createElement('div');

    if (++wdCount % 2 === 0) {
      oItem.className = 'sm2-alt';
    }

    if (sTypeOrObject === _undefined) {
      sTypeOrObject = 0;
    } else {
      sTypeOrObject = parseInt(sTypeOrObject, 10);
    }

    oItem.appendChild(doc.createTextNode(sText));

    if (sTypeOrObject) {
      if (sTypeOrObject >= 2) {
        oItem.style.fontWeight = 'bold';
      }
      if (sTypeOrObject === 3) {
        oItem.style.color = '#ff3333';
      }
    }

    // top-to-bottom
    // o.appendChild(oItem);

    // bottom-to-top
    o.insertBefore(oItem, o.firstChild);

    o = null;
    // </d>

    return true;

  };

  // <d>
  // last-resort debugging option
  if (wl.indexOf('sm2-debug=alert') !== -1) {
    this._writeDebug = function(sText) {
      window.alert(sText);
    };
  }
  // </d>

  // alias
  this._wD = this._writeDebug;

  /**
   * Provides debug / state information on all SMSound objects.
   */

  this._debug = function() {

    // <d>
    var i, j;
    _wDS('currentObj', 1);

    for (i = 0, j = sm2.soundIDs.length; i < j; i++) {
      sm2.sounds[sm2.soundIDs[i]]._debug();
    }
    // </d>

  };

  /**
   * Restarts and re-initializes the SoundManager instance.
   *
   * @param {boolean} resetEvents Optional: When true, removes all registered onready and ontimeout event callbacks.
   * @param {boolean} excludeInit Options: When true, does not call beginDelayedInit() (which would restart SM2).
   * @return {object} soundManager The soundManager instance.
   */

  this.reboot = function(resetEvents, excludeInit) {

    // reset some (or all) state, and re-init unless otherwise specified.

    // <d>
    if (sm2.soundIDs.length) {
      sm2._wD('Destroying ' + sm2.soundIDs.length + ' SMSound object' + (sm2.soundIDs.length !== 1 ? 's' : '') + '...');
    }
    // </d>

    var i, j, k;

    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
      sm2.sounds[sm2.soundIDs[i]].destruct();
    }

    // trash ze flash (remove from the DOM)

    if (flash) {

      try {

        if (isIE) {
          oRemovedHTML = flash.innerHTML;
        }

        oRemoved = flash.parentNode.removeChild(flash);

      } catch(e) {

        // Remove failed? May be due to flash blockers silently removing the SWF object/embed node from the DOM. Warn and continue.

        _wDS('badRemove', 2);

      }

    }

    // actually, force recreate of movie.

    oRemovedHTML = oRemoved = needsFlash = flash = null;

    sm2.enabled = didDCLoaded = didInit = waitingForEI = initPending = didAppend = appendSuccess = disabled = useGlobalHTML5Audio = sm2.swfLoaded = false;

    sm2.soundIDs = [];
    sm2.sounds = {};

    idCounter = 0;

    if (!resetEvents) {
      // reset callbacks for onready, ontimeout etc. so that they will fire again on re-init
      for (i in on_queue) {
        if (on_queue.hasOwnProperty(i)) {
          for (j = 0, k = on_queue[i].length; j < k; j++) {
            on_queue[i][j].fired = false;
          }
        }
      }
    } else {
      // remove all callbacks entirely
      on_queue = [];
    }

    // <d>
    if (!excludeInit) {
      sm2._wD(sm + ': Rebooting...');
    }
    // </d>

    // reset HTML5 and flash canPlay test results

    sm2.html5 = {
      'usingFlash': null
    };

    sm2.flash = {};

    // reset device-specific HTML/flash mode switches

    sm2.html5Only = false;
    sm2.ignoreFlash = false;

    window.setTimeout(function() {

      preInit();

      // by default, re-init

      if (!excludeInit) {
        sm2.beginDelayedInit();
      }

    }, 20);

    return sm2;

  };

  this.reset = function() {

    /**
     * Shuts down and restores the SoundManager instance to its original loaded state, without an explicit reboot. All onready/ontimeout handlers are removed.
     * After this call, SM2 may be re-initialized via soundManager.beginDelayedInit().
     * @return {object} soundManager The soundManager instance.
     */

    _wDS('reset');
    return sm2.reboot(true, true);

  };

  /**
   * Undocumented: Determines the SM2 flash movie's load progress.
   *
   * @return {number or null} Percent loaded, or if invalid/unsupported, null.
   */

  this.getMoviePercent = function() {

    /**
     * Interesting syntax notes...
     * Flash/ExternalInterface (ActiveX/NPAPI) bridge methods are not typeof "function" nor instanceof Function, but are still valid.
     * Additionally, JSLint dislikes ('PercentLoaded' in flash)-style syntax and recommends hasOwnProperty(), which does not work in this case.
     * Furthermore, using (flash && flash.PercentLoaded) causes IE to throw "object doesn't support this property or method".
     * Thus, 'in' syntax must be used.
     */

    return (flash && 'PercentLoaded' in flash ? flash.PercentLoaded() : null); // Yes, JSLint. See nearby comment in source for explanation.

  };

  /**
   * Additional helper for manually invoking SM2's init process after DOM Ready / window.onload().
   */

  this.beginDelayedInit = function() {

    windowLoaded = true;
    domContentLoaded();

    setTimeout(function() {

      if (initPending) {
        return false;
      }

      createMovie();
      initMovie();
      initPending = true;

      return true;

    }, 20);

    delayWaitForEI();

  };

  /**
   * Destroys the SoundManager instance and all SMSound instances.
   */

  this.destruct = function() {

    sm2._wD(sm + '.destruct()');
    sm2.disable(true);

  };

  /**
   * SMSound() (sound object) constructor
   * ------------------------------------
   *
   * @param {object} oOptions Sound options (id and url are required attributes)
   * @return {SMSound} The new SMSound object
   */

  SMSound = function(oOptions) {

    var s = this, resetProperties, add_html5_events, remove_html5_events, stop_html5_timer, start_html5_timer, attachOnPosition, onplay_called = false, onPositionItems = [], onPositionFired = 0, detachOnPosition, applyFromTo, lastURL = null, lastHTML5State, urlOmitted;

    lastHTML5State = {
      // tracks duration + position (time)
      duration: null,
      time: null
    };

    this.id = oOptions.id;

    // legacy
    this.sID = this.id;

    this.url = oOptions.url;
    this.options = mixin(oOptions);

    // per-play-instance-specific options
    this.instanceOptions = this.options;

    // short alias
    this._iO = this.instanceOptions;

    // assign property defaults
    this.pan = this.options.pan;
    this.volume = this.options.volume;

    // whether or not this object is using HTML5
    this.isHTML5 = false;

    // internal HTML5 Audio() object reference
    this._a = null;

    // for flash 8 special-case createSound() without url, followed by load/play with url case
    urlOmitted = (this.url ? false : true);

    /**
     * SMSound() public methods
     * ------------------------
     */

    this.id3 = {};

    /**
     * Writes SMSound object parameters to debug console
     */

    this._debug = function() {

      // <d>
      sm2._wD(s.id + ': Merged options:', s.options);
      // </d>

    };

    /**
     * Begins loading a sound per its *url*.
     *
     * @param {object} oOptions Optional: Sound options
     * @return {SMSound} The SMSound object
     */

    this.load = function(oOptions) {

      var oSound = null, instanceOptions;

      if (oOptions !== _undefined) {
        s._iO = mixin(oOptions, s.options);
      } else {
        oOptions = s.options;
        s._iO = oOptions;
        if (lastURL && lastURL !== s.url) {
          _wDS('manURL');
          s._iO.url = s.url;
          s.url = null;
        }
      }

      if (!s._iO.url) {
        s._iO.url = s.url;
      }

      s._iO.url = parseURL(s._iO.url);

      // ensure we're in sync
      s.instanceOptions = s._iO;

      // local shortcut
      instanceOptions = s._iO;

      sm2._wD(s.id + ': load (' + instanceOptions.url + ')');

      if (!instanceOptions.url && !s.url) {
        sm2._wD(s.id + ': load(): url is unassigned. Exiting.', 2);
        return s;
      }

      // <d>
      if (!s.isHTML5 && fV === 8 && !s.url && !instanceOptions.autoPlay) {
        // flash 8 load() -> play() won't work before onload has fired.
        sm2._wD(s.id + ': Flash 8 load() limitation: Wait for onload() before calling play().', 1);
      }
      // </d>

      if (instanceOptions.url === s.url && s.readyState !== 0 && s.readyState !== 2) {
        _wDS('onURL', 1);
        // if loaded and an onload() exists, fire immediately.
        if (s.readyState === 3 && instanceOptions.onload) {
          // assume success based on truthy duration.
          wrapCallback(s, function() {
            instanceOptions.onload.apply(s, [(!!s.duration)]);
          });
        }
        return s;
      }

      // reset a few state properties

      s.loaded = false;
      s.readyState = 1;
      s.playState = 0;
      s.id3 = {};

      // TODO: If switching from HTML5 -> flash (or vice versa), stop currently-playing audio.

      if (html5OK(instanceOptions)) {

        oSound = s._setup_html5(instanceOptions);

        if (!oSound._called_load) {

          s._html5_canplay = false;

          // TODO: review called_load / html5_canplay logic

          // if url provided directly to load(), assign it here.

          if (s.url !== instanceOptions.url) {

            sm2._wD(_wDS('manURL') + ': ' + instanceOptions.url);

            s._a.src = instanceOptions.url;

            // TODO: review / re-apply all relevant options (volume, loop, onposition etc.)

            // reset position for new URL
            s.setPosition(0);

          }

          // given explicit load call, try to preload.

          // early HTML5 implementation (non-standard)
          s._a.autobuffer = 'auto';

          // standard property, values: none / metadata / auto
          // reference: http://msdn.microsoft.com/en-us/library/ie/ff974759%28v=vs.85%29.aspx
          s._a.preload = 'auto';

          s._a._called_load = true;

        } else {

          sm2._wD(s.id + ': Ignoring request to load again');

        }

      } else {

        if (sm2.html5Only) {
          sm2._wD(s.id + ': No flash support. Exiting.');
          return s;
        }

        if (s._iO.url && s._iO.url.match(/data\:/i)) {
          // data: URIs not supported by Flash, either.
          sm2._wD(s.id + ': data: URIs not supported via Flash. Exiting.');
          return s;
        }

        try {
          s.isHTML5 = false;
          s._iO = policyFix(loopFix(instanceOptions));
          // re-assign local shortcut
          instanceOptions = s._iO;
          if (fV === 8) {
            flash._load(s.id, instanceOptions.url, instanceOptions.stream, instanceOptions.autoPlay, instanceOptions.usePolicyFile);
          } else {
            flash._load(s.id, instanceOptions.url, !!(instanceOptions.stream), !!(instanceOptions.autoPlay), instanceOptions.loops||1, !!(instanceOptions.autoLoad), instanceOptions.usePolicyFile);
          }
        } catch(e) {
          _wDS('smError', 2);
          debugTS('onload', false);
          catchError({type:'SMSOUND_LOAD_JS_EXCEPTION', fatal:true});
        }

      }

      // after all of this, ensure sound url is up to date.
      s.url = instanceOptions.url;

      return s;

    };

    /**
     * Unloads a sound, canceling any open HTTP requests.
     *
     * @return {SMSound} The SMSound object
     */

    this.unload = function() {

      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty URL
      // Flash 9/AS3: Close stream, preventing further load
      // HTML5: Most UAs will use empty URL

      if (s.readyState !== 0) {

        sm2._wD(s.id + ': unload()');

        if (!s.isHTML5) {

          if (fV === 8) {
            flash._unload(s.id, emptyURL);
          } else {
            flash._unload(s.id);
          }

        } else {

          stop_html5_timer();

          if (s._a) {

            s._a.pause();

            // update empty URL, too
            lastURL = html5Unload(s._a);

          }

        }

        // reset load/status flags
        resetProperties();

      }

      return s;

    };

    /**
     * Unloads and destroys a sound.
     */

    this.destruct = function(_bFromSM) {

      sm2._wD(s.id + ': Destruct');

      if (!s.isHTML5) {

        // kill sound within Flash
        // Disable the onfailure handler
        s._iO.onfailure = null;
        flash._destroySound(s.id);

      } else {

        stop_html5_timer();

        if (s._a) {
          s._a.pause();
          html5Unload(s._a);
          if (!useGlobalHTML5Audio) {
            remove_html5_events();
          }
          // break obvious circular reference
          s._a._s = null;
          s._a = null;
        }

      }

      if (!_bFromSM) {
        // ensure deletion from controller
        sm2.destroySound(s.id, true);
      }

    };

    /**
     * Begins playing a sound.
     *
     * @param {object} oOptions Optional: Sound options
     * @return {SMSound} The SMSound object
     */

    this.play = function(oOptions, _updatePlayState) {

      var fN, allowMulti, a, onready,
          audioClone, onended, oncanplay,
          startOK = true,
          exit = null;

      // <d>
      fN = s.id + ': play(): ';
      // </d>

      // default to true
      _updatePlayState = (_updatePlayState === _undefined ? true : _updatePlayState);

      if (!oOptions) {
        oOptions = {};
      }

      // first, use local URL (if specified)
      if (s.url) {
        s._iO.url = s.url;
      }

      // mix in any options defined at createSound()
      s._iO = mixin(s._iO, s.options);

      // mix in any options specific to this method
      s._iO = mixin(oOptions, s._iO);

      s._iO.url = parseURL(s._iO.url);

      s.instanceOptions = s._iO;

      // RTMP-only
      if (!s.isHTML5 && s._iO.serverURL && !s.connected) {
        if (!s.getAutoPlay()) {
          sm2._wD(fN +' Netstream not connected yet - setting autoPlay');
          s.setAutoPlay(true);
        }
        // play will be called in onconnect()
        return s;
      }

      if (html5OK(s._iO)) {
        s._setup_html5(s._iO);
        start_html5_timer();
      }

      if (s.playState === 1 && !s.paused) {
        allowMulti = s._iO.multiShot;
        if (!allowMulti) {
          sm2._wD(fN + 'Already playing (one-shot)', 1);
          if (s.isHTML5) {
            // go back to original position.
            s.setPosition(s._iO.position);
          }
          exit = s;
        } else {
          sm2._wD(fN + 'Already playing (multi-shot)', 1);
        }
      }

      if (exit !== null) {
        return exit;
      }

      // edge case: play() with explicit URL parameter
      if (oOptions.url && oOptions.url !== s.url) {

        // special case for createSound() followed by load() / play() with url; avoid double-load case.
        if (!s.readyState && !s.isHTML5 && fV === 8 && urlOmitted) {

          urlOmitted = false;

        } else {

          // load using merged options
          s.load(s._iO);

        }

      }

      if (!s.loaded) {

        if (s.readyState === 0) {

          sm2._wD(fN + 'Attempting to load');

          // try to get this sound playing ASAP
          if (!s.isHTML5 && !sm2.html5Only) {

            // flash: assign directly because setAutoPlay() increments the instanceCount
            s._iO.autoPlay = true;
            s.load(s._iO);

          } else if (s.isHTML5) {

            // iOS needs this when recycling sounds, loading a new URL on an existing object.
            s.load(s._iO);

          } else {

            sm2._wD(fN + 'Unsupported type. Exiting.');
            exit = s;

          }

          // HTML5 hack - re-set instanceOptions?
          s.instanceOptions = s._iO;

        } else if (s.readyState === 2) {

          sm2._wD(fN + 'Could not load - exiting', 2);
          exit = s;

        } else {

          sm2._wD(fN + 'Loading - attempting to play...');

        }

      } else {

        // "play()"
        sm2._wD(fN.substr(0, fN.lastIndexOf(':')));

      }

      if (exit !== null) {
        return exit;
      }

      if (!s.isHTML5 && fV === 9 && s.position > 0 && s.position === s.duration) {
        // flash 9 needs a position reset if play() is called while at the end of a sound.
        sm2._wD(fN + 'Sound at end, resetting to position:0');
        oOptions.position = 0;
      }

      /**
       * Streams will pause when their buffer is full if they are being loaded.
       * In this case paused is true, but the song hasn't started playing yet.
       * If we just call resume() the onplay() callback will never be called.
       * So only call resume() if the position is > 0.
       * Another reason is because options like volume won't have been applied yet.
       * For normal sounds, just resume.
       */

      if (s.paused && s.position >= 0 && (!s._iO.serverURL || s.position > 0)) {

        // https://gist.github.com/37b17df75cc4d7a90bf6
        sm2._wD(fN + 'Resuming from paused state', 1);
        s.resume();

      } else {

        s._iO = mixin(oOptions, s._iO);

        // apply from/to parameters, if they exist (and not using RTMP)
        if (s._iO.from !== null && s._iO.to !== null && s.instanceCount === 0 && s.playState === 0 && !s._iO.serverURL) {

          onready = function() {
            // sound "canplay" or onload()
            // re-apply from/to to instance options, and start playback
            s._iO = mixin(oOptions, s._iO);
            s.play(s._iO);
          };

          // HTML5 needs to at least have "canplay" fired before seeking.
          if (s.isHTML5 && !s._html5_canplay) {

            // this hasn't been loaded yet. load it first, and then do this again.
            sm2._wD(fN + 'Beginning load for from/to case');

            s.load({
              // note: custom HTML5-only event added for from/to implementation.
              _oncanplay: onready
            });

            exit = false;

          } else if (!s.isHTML5 && !s.loaded && (!s.readyState || s.readyState !== 2)) {

            // to be safe, preload the whole thing in Flash.

            sm2._wD(fN + 'Preloading for from/to case');

            s.load({
              onload: onready
            });

            exit = false;

          }

          if (exit !== null) {
            return exit;
          }

          // otherwise, we're ready to go. re-apply local options, and continue

          s._iO = applyFromTo();

        }

        // sm2._wD(fN + 'Starting to play');

        // increment instance counter, where enabled + supported
        if (!s.instanceCount || s._iO.multiShotEvents || (s.isHTML5 && s._iO.multiShot && !useGlobalHTML5Audio) || (!s.isHTML5 && fV > 8 && !s.getAutoPlay())) {
          s.instanceCount++;
        }

        // if first play and onposition parameters exist, apply them now
        if (s._iO.onposition && s.playState === 0) {
          attachOnPosition(s);
        }

        s.playState = 1;
        s.paused = false;

        s.position = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position : 0);

        if (!s.isHTML5) {
          s._iO = policyFix(loopFix(s._iO));
        }

        if (s._iO.onplay && _updatePlayState) {
          s._iO.onplay.apply(s);
          onplay_called = true;
        }

        s.setVolume(s._iO.volume, true);
        s.setPan(s._iO.pan, true);

        if (!s.isHTML5) {

          startOK = flash._start(s.id, s._iO.loops || 1, (fV === 9 ? s.position : s.position / msecScale), s._iO.multiShot || false);

          if (fV === 9 && !startOK) {
            // edge case: no sound hardware, or 32-channel flash ceiling hit.
            // applies only to Flash 9, non-NetStream/MovieStar sounds.
            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html#play%28%29
            sm2._wD(fN + 'No sound hardware, or 32-sound ceiling hit', 2);
            if (s._iO.onplayerror) {
              s._iO.onplayerror.apply(s);
            }

          }

        } else {

          if (s.instanceCount < 2) {

            // HTML5 single-instance case

            start_html5_timer();

            a = s._setup_html5();

            s.setPosition(s._iO.position);

            a.play();

          } else {

            // HTML5 multi-shot case

            sm2._wD(s.id + ': Cloning Audio() for instance #' + s.instanceCount + '...');

            audioClone = new Audio(s._iO.url);

            onended = function() {
              event.remove(audioClone, 'ended', onended);
              s._onfinish(s);
              // cleanup
              html5Unload(audioClone);
              audioClone = null;
            };

            oncanplay = function() {
              event.remove(audioClone, 'canplay', oncanplay);
              try {
                audioClone.currentTime = s._iO.position/msecScale;
              } catch(err) {
                complain(s.id + ': multiShot play() failed to apply position of ' + (s._iO.position/msecScale));
              }
              audioClone.play();
            };

            event.add(audioClone, 'ended', onended);

            // apply volume to clones, too
            if (s._iO.volume !== undefined) {
              audioClone.volume = Math.max(0, Math.min(1, s._iO.volume/100));
            }

            // playing multiple muted sounds? if you do this, you're weird ;) - but let's cover it.
            if (s.muted) {
              audioClone.muted = true;
            }

            if (s._iO.position) {
              // HTML5 audio can't seek before onplay() event has fired.
              // wait for canplay, then seek to position and start playback.
              event.add(audioClone, 'canplay', oncanplay);
            } else {
              // begin playback at currentTime: 0
              audioClone.play();
            }

          }

        }

      }

      return s;

    };

    // just for convenience
    this.start = this.play;

    /**
     * Stops playing a sound (and optionally, all sounds)
     *
     * @param {boolean} bAll Optional: Whether to stop all sounds
     * @return {SMSound} The SMSound object
     */

    this.stop = function(bAll) {

      var instanceOptions = s._iO,
          originalPosition;

      if (s.playState === 1) {

        sm2._wD(s.id + ': stop()');

        s._onbufferchange(0);
        s._resetOnPosition(0);
        s.paused = false;

        if (!s.isHTML5) {
          s.playState = 0;
        }

        // remove onPosition listeners, if any
        detachOnPosition();

        // and "to" position, if set
        if (instanceOptions.to) {
          s.clearOnPosition(instanceOptions.to);
        }

        if (!s.isHTML5) {

          flash._stop(s.id, bAll);

          // hack for netStream: just unload
          if (instanceOptions.serverURL) {
            s.unload();
          }

        } else {

          if (s._a) {

            originalPosition = s.position;

            // act like Flash, though
            s.setPosition(0);

            // hack: reflect old position for onstop() (also like Flash)
            s.position = originalPosition;

            // html5 has no stop()
            // NOTE: pausing means iOS requires interaction to resume.
            s._a.pause();

            s.playState = 0;

            // and update UI
            s._onTimer();

            stop_html5_timer();

          }

        }

        s.instanceCount = 0;
        s._iO = {};

        if (instanceOptions.onstop) {
          instanceOptions.onstop.apply(s);
        }

      }

      return s;

    };

    /**
     * Undocumented/internal: Sets autoPlay for RTMP.
     *
     * @param {boolean} autoPlay state
     */

    this.setAutoPlay = function(autoPlay) {

      sm2._wD(s.id + ': Autoplay turned ' + (autoPlay ? 'on' : 'off'));
      s._iO.autoPlay = autoPlay;

      if (!s.isHTML5) {
        flash._setAutoPlay(s.id, autoPlay);
        if (autoPlay) {
          // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
          if (!s.instanceCount && s.readyState === 1) {
            s.instanceCount++;
            sm2._wD(s.id + ': Incremented instance count to '+s.instanceCount);
          }
        }
      }

    };

    /**
     * Undocumented/internal: Returns the autoPlay boolean.
     *
     * @return {boolean} The current autoPlay value
     */

    this.getAutoPlay = function() {

      return s._iO.autoPlay;

    };

    /**
     * Sets the position of a sound.
     *
     * @param {number} nMsecOffset Position (milliseconds)
     * @return {SMSound} The SMSound object
     */

    this.setPosition = function(nMsecOffset) {

      if (nMsecOffset === _undefined) {
        nMsecOffset = 0;
      }

      var position, position1K,
          // Use the duration from the instance options, if we don't have a track duration yet.
          // position >= 0 and <= current available (loaded) duration
          offset = (s.isHTML5 ? Math.max(nMsecOffset, 0) : Math.min(s.duration || s._iO.duration, Math.max(nMsecOffset, 0)));

      s.position = offset;
      position1K = s.position/msecScale;
      s._resetOnPosition(s.position);
      s._iO.position = offset;

      if (!s.isHTML5) {

        position = (fV === 9 ? s.position : position1K);

        if (s.readyState && s.readyState !== 2) {
          // if paused or not playing, will not resume (by playing)
          flash._setPosition(s.id, position, (s.paused || !s.playState), s._iO.multiShot);
        }

      } else if (s._a) {

        // Set the position in the canplay handler if the sound is not ready yet
        if (s._html5_canplay) {

          if (s._a.currentTime !== position1K) {

            /**
             * DOM/JS errors/exceptions to watch out for:
             * if seek is beyond (loaded?) position, "DOM exception 11"
             * "INDEX_SIZE_ERR": DOM exception 1
             */
            sm2._wD(s.id + ': setPosition('+position1K+')');

            try {
              s._a.currentTime = position1K;
              if (s.playState === 0 || s.paused) {
                // allow seek without auto-play/resume
                s._a.pause();
              }
            } catch(e) {
              sm2._wD(s.id + ': setPosition(' + position1K + ') failed: ' + e.message, 2);
            }

          }

        } else if (position1K) {

          // warn on non-zero seek attempts
          sm2._wD(s.id + ': setPosition(' + position1K + '): Cannot seek yet, sound not ready', 2);
          return s;

        }

        if (s.paused) {

          // if paused, refresh UI right away
          // force update
          s._onTimer(true);

        }

      }

      return s;

    };

    /**
     * Pauses sound playback.
     *
     * @return {SMSound} The SMSound object
     */

    this.pause = function(_bCallFlash) {

      if (s.paused || (s.playState === 0 && s.readyState !== 1)) {
        return s;
      }

      sm2._wD(s.id + ': pause()');
      s.paused = true;

      if (!s.isHTML5) {
        if (_bCallFlash || _bCallFlash === _undefined) {
          flash._pause(s.id, s._iO.multiShot);
        }
      } else {
        s._setup_html5().pause();
        stop_html5_timer();
      }

      if (s._iO.onpause) {
        s._iO.onpause.apply(s);
      }

      return s;

    };

    /**
     * Resumes sound playback.
     *
     * @return {SMSound} The SMSound object
     */

    /**
     * When auto-loaded streams pause on buffer full they have a playState of 0.
     * We need to make sure that the playState is set to 1 when these streams "resume".
     * When a paused stream is resumed, we need to trigger the onplay() callback if it
     * hasn't been called already. In this case since the sound is being played for the
     * first time, I think it's more appropriate to call onplay() rather than onresume().
     */

    this.resume = function() {

      var instanceOptions = s._iO;

      if (!s.paused) {
        return s;
      }

      sm2._wD(s.id + ': resume()');
      s.paused = false;
      s.playState = 1;

      if (!s.isHTML5) {
        if (instanceOptions.isMovieStar && !instanceOptions.serverURL) {
          // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
          s.setPosition(s.position);
        }
        // flash method is toggle-based (pause/resume)
        flash._pause(s.id, instanceOptions.multiShot);
      } else {
        s._setup_html5().play();
        start_html5_timer();
      }

      if (!onplay_called && instanceOptions.onplay) {
        instanceOptions.onplay.apply(s);
        onplay_called = true;
      } else if (instanceOptions.onresume) {
        instanceOptions.onresume.apply(s);
      }

      return s;

    };

    /**
     * Toggles sound playback.
     *
     * @return {SMSound} The SMSound object
     */

    this.togglePause = function() {

      sm2._wD(s.id + ': togglePause()');

      if (s.playState === 0) {
        s.play({
          position: (fV === 9 && !s.isHTML5 ? s.position : s.position / msecScale)
        });
        return s;
      }

      if (s.paused) {
        s.resume();
      } else {
        s.pause();
      }

      return s;

    };

    /**
     * Sets the panning (L-R) effect.
     *
     * @param {number} nPan The pan value (-100 to 100)
     * @return {SMSound} The SMSound object
     */

    this.setPan = function(nPan, bInstanceOnly) {

      if (nPan === _undefined) {
        nPan = 0;
      }

      if (bInstanceOnly === _undefined) {
        bInstanceOnly = false;
      }

      if (!s.isHTML5) {
        flash._setPan(s.id, nPan);
      } // else { no HTML5 pan? }

      s._iO.pan = nPan;

      if (!bInstanceOnly) {
        s.pan = nPan;
        s.options.pan = nPan;
      }

      return s;

    };

    /**
     * Sets the volume.
     *
     * @param {number} nVol The volume value (0 to 100)
     * @return {SMSound} The SMSound object
     */

    this.setVolume = function(nVol, _bInstanceOnly) {

      /**
       * Note: Setting volume has no effect on iOS "special snowflake" devices.
       * Hardware volume control overrides software, and volume
       * will always return 1 per Apple docs. (iOS 4 + 5.)
       * http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingSoundtoCanvasAnimations/AddingSoundtoCanvasAnimations.html
       */

      if (nVol === _undefined) {
        nVol = 100;
      }

      if (_bInstanceOnly === _undefined) {
        _bInstanceOnly = false;
      }

      if (!s.isHTML5) {
        flash._setVolume(s.id, (sm2.muted && !s.muted) || s.muted?0:nVol);
      } else if (s._a) {
        if (sm2.muted && !s.muted) {
          s.muted = true;
          s._a.muted = true;
        }
        // valid range: 0-1
        s._a.volume = Math.max(0, Math.min(1, nVol/100));
      }

      s._iO.volume = nVol;

      if (!_bInstanceOnly) {
        s.volume = nVol;
        s.options.volume = nVol;
      }

      return s;

    };

    /**
     * Mutes the sound.
     *
     * @return {SMSound} The SMSound object
     */

    this.mute = function() {

      s.muted = true;

      if (!s.isHTML5) {
        flash._setVolume(s.id, 0);
      } else if (s._a) {
        s._a.muted = true;
      }

      return s;

    };

    /**
     * Unmutes the sound.
     *
     * @return {SMSound} The SMSound object
     */

    this.unmute = function() {

      s.muted = false;
      var hasIO = (s._iO.volume !== _undefined);

      if (!s.isHTML5) {
        flash._setVolume(s.id, hasIO?s._iO.volume:s.options.volume);
      } else if (s._a) {
        s._a.muted = false;
      }

      return s;

    };

    /**
     * Toggles the muted state of a sound.
     *
     * @return {SMSound} The SMSound object
     */

    this.toggleMute = function() {

      return (s.muted?s.unmute():s.mute());

    };

    /**
     * Registers a callback to be fired when a sound reaches a given position during playback.
     *
     * @param {number} nPosition The position to watch for
     * @param {function} oMethod The relevant callback to fire
     * @param {object} oScope Optional: The scope to apply the callback to
     * @return {SMSound} The SMSound object
     */

    this.onPosition = function(nPosition, oMethod, oScope) {

      // TODO: basic dupe checking?

      onPositionItems.push({
        position: parseInt(nPosition, 10),
        method: oMethod,
        scope: (oScope !== _undefined ? oScope : s),
        fired: false
      });

      return s;

    };

    // legacy/backwards-compability: lower-case method name
    this.onposition = this.onPosition;

    /**
     * Removes registered callback(s) from a sound, by position and/or callback.
     *
     * @param {number} nPosition The position to clear callback(s) for
     * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position
     * @return {SMSound} The SMSound object
     */

    this.clearOnPosition = function(nPosition, oMethod) {

      var i;

      nPosition = parseInt(nPosition, 10);

      if (isNaN(nPosition)) {
        // safety check
        return false;
      }

      for (i=0; i < onPositionItems.length; i++) {

        if (nPosition === onPositionItems[i].position) {
          // remove this item if no method was specified, or, if the method matches
          if (!oMethod || (oMethod === onPositionItems[i].method)) {
            if (onPositionItems[i].fired) {
              // decrement "fired" counter, too
              onPositionFired--;
            }
            onPositionItems.splice(i, 1);
          }
        }

      }

    };

    this._processOnPosition = function() {

      var i, item, j = onPositionItems.length;
		
      if (!j || !s.playState || onPositionFired >= j) {
        return false;
      }

      for (i=j-1; i >= 0; i--) {
        item = onPositionItems[i];
        if (!item.fired && s.position >= item.position) {
          item.fired = true;
          onPositionFired++;
          item.method.apply(item.scope, [item.position]);
		  j = onPositionItems.length; //  reset j -- onPositionItems.length can be changed in the item callback above... occasionally breaking the loop.
        }
      }
	
      return true;

    };

    this._resetOnPosition = function(nPosition) {

      // reset "fired" for items interested in this position
      var i, item, j = onPositionItems.length;

      if (!j) {
        return false;
      }

      for (i=j-1; i >= 0; i--) {
        item = onPositionItems[i];
        if (item.fired && nPosition <= item.position) {
          item.fired = false;
          onPositionFired--;
        }
      }

      return true;

    };

    /**
     * SMSound() private internals
     * --------------------------------
     */

    applyFromTo = function() {

      var instanceOptions = s._iO,
          f = instanceOptions.from,
          t = instanceOptions.to,
          start, end;

      end = function() {

        // end has been reached.
        sm2._wD(s.id + ': "To" time of ' + t + ' reached.');

        // detach listener
        s.clearOnPosition(t, end);

        // stop should clear this, too
        s.stop();

      };

      start = function() {

        sm2._wD(s.id + ': Playing "from" ' + f);

        // add listener for end
        if (t !== null && !isNaN(t)) {
          s.onPosition(t, end);
        }

      };

      if (f !== null && !isNaN(f)) {

        // apply to instance options, guaranteeing correct start position.
        instanceOptions.position = f;

        // multiShot timing can't be tracked, so prevent that.
        instanceOptions.multiShot = false;

        start();

      }

      // return updated instanceOptions including starting position
      return instanceOptions;

    };

    attachOnPosition = function() {

      var item,
          op = s._iO.onposition;

      // attach onposition things, if any, now.

      if (op) {

        for (item in op) {
          if (op.hasOwnProperty(item)) {
            s.onPosition(parseInt(item, 10), op[item]);
          }
        }

      }

    };

    detachOnPosition = function() {

      var item,
          op = s._iO.onposition;

      // detach any onposition()-style listeners.

      if (op) {

        for (item in op) {
          if (op.hasOwnProperty(item)) {
            s.clearOnPosition(parseInt(item, 10));
          }
        }

      }

    };

    start_html5_timer = function() {

      if (s.isHTML5) {
        startTimer(s);
      }

    };

    stop_html5_timer = function() {

      if (s.isHTML5) {
        stopTimer(s);
      }

    };

    resetProperties = function(retainPosition) {

      if (!retainPosition) {
        onPositionItems = [];
        onPositionFired = 0;
      }

      onplay_called = false;

      s._hasTimer = null;
      s._a = null;
      s._html5_canplay = false;
      s.bytesLoaded = null;
      s.bytesTotal = null;
      s.duration = (s._iO && s._iO.duration ? s._iO.duration : null);
      s.durationEstimate = null;
      s.buffered = [];

      // legacy: 1D array
      s.eqData = [];

      s.eqData.left = [];
      s.eqData.right = [];

      s.failures = 0;
      s.isBuffering = false;
      s.instanceOptions = {};
      s.instanceCount = 0;
      s.loaded = false;
      s.metadata = {};

      // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
      s.readyState = 0;

      s.muted = false;
      s.paused = false;

      s.peakData = {
        left: 0,
        right: 0
      };

      s.waveformData = {
        left: [],
        right: []
      };

      s.playState = 0;
      s.position = null;

      s.id3 = {};

    };

    resetProperties();

    /**
     * Pseudo-private SMSound internals
     * --------------------------------
     */

    this._onTimer = function(bForce) {

      /**
       * HTML5-only _whileplaying() etc.
       * called from both HTML5 native events, and polling/interval-based timers
       * mimics flash and fires only when time/duration change, so as to be polling-friendly
       */

      var duration, isNew = false, time, x = {};

      if (s._hasTimer || bForce) {

        // TODO: May not need to track readyState (1 = loading)

        if (s._a && (bForce || ((s.playState > 0 || s.readyState === 1) && !s.paused))) {

          duration = s._get_html5_duration();

          if (duration !== lastHTML5State.duration) {

            lastHTML5State.duration = duration;
            s.duration = duration;
            isNew = true;

          }

          // TODO: investigate why this goes wack if not set/re-set each time.
          s.durationEstimate = s.duration;

          time = (s._a.currentTime * msecScale || 0);

          if (time !== lastHTML5State.time) {

            lastHTML5State.time = time;
            isNew = true;

          }

          if (isNew || bForce) {

            s._whileplaying(time,x,x,x,x);

          }

        }/* else {

          // sm2._wD('_onTimer: Warn for "'+s.id+'": '+(!s._a?'Could not find element. ':'')+(s.playState === 0?'playState bad, 0?':'playState = '+s.playState+', OK'));

          return false;

        }*/

        return isNew;

      }

    };

    this._get_html5_duration = function() {

      var instanceOptions = s._iO,
          // if audio object exists, use its duration - else, instance option duration (if provided - it's a hack, really, and should be retired) OR null
          d = (s._a && s._a.duration ? s._a.duration*msecScale : (instanceOptions && instanceOptions.duration ? instanceOptions.duration : null)),
          result = (d && !isNaN(d) && d !== Infinity ? d : null);

      return result;

    };

    this._apply_loop = function(a, nLoops) {

      /**
       * boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
       * note that loop is either off or infinite under HTML5, unlike Flash which allows arbitrary loop counts to be specified.
       */

      // <d>
      if (!a.loop && nLoops > 1) {
        sm2._wD('Note: Native HTML5 looping is infinite.', 1);
      }
      // </d>

      a.loop = (nLoops > 1 ? 'loop' : '');

    };

    this._setup_html5 = function(oOptions) {

      var instanceOptions = mixin(s._iO, oOptions),
          a = useGlobalHTML5Audio ? globalHTML5Audio : s._a,
          dURL = decodeURI(instanceOptions.url),
          sameURL;

      /**
       * "First things first, I, Poppa..." (reset the previous state of the old sound, if playing)
       * Fixes case with devices that can only play one sound at a time
       * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
       */

      if (useGlobalHTML5Audio) {

        if (dURL === decodeURI(lastGlobalHTML5URL)) {
          // global HTML5 audio: re-use of URL
          sameURL = true;
        }

      } else if (dURL === decodeURI(lastURL)) {

        // options URL is the same as the "last" URL, and we used (loaded) it
        sameURL = true;

      }

      if (a) {

        if (a._s) {

          if (useGlobalHTML5Audio) {

            if (a._s && a._s.playState && !sameURL) {

              // global HTML5 audio case, and loading a new URL. stop the currently-playing one.
              a._s.stop();

            }

          } else if (!useGlobalHTML5Audio && dURL === decodeURI(lastURL)) {

            // non-global HTML5 reuse case: same url, ignore request
            s._apply_loop(a, instanceOptions.loops);

            return a;

          }

        }

        if (!sameURL) {

          // don't retain onPosition() stuff with new URLs.

          if (lastURL) {
            resetProperties(false);
          }

          // assign new HTML5 URL

          a.src = instanceOptions.url;

          s.url = instanceOptions.url;

          lastURL = instanceOptions.url;

          lastGlobalHTML5URL = instanceOptions.url;

          a._called_load = false;

        }

      } else {

        if (instanceOptions.autoLoad || instanceOptions.autoPlay) {

          s._a = new Audio(instanceOptions.url);
          s._a.load();

        } else {

          // null for stupid Opera 9.64 case
          s._a = (isOpera && opera.version() < 10 ? new Audio(null) : new Audio());

        }

        // assign local reference
        a = s._a;

        a._called_load = false;

        if (useGlobalHTML5Audio) {

          globalHTML5Audio = a;

        }

      }

      s.isHTML5 = true;

      // store a ref on the track
      s._a = a;

      // store a ref on the audio
      a._s = s;

      add_html5_events();

      s._apply_loop(a, instanceOptions.loops);

      if (instanceOptions.autoLoad || instanceOptions.autoPlay) {

        s.load();

      } else {

        // early HTML5 implementation (non-standard)
        a.autobuffer = false;

        // standard ('none' is also an option.)
        a.preload = 'auto';

      }

      return a;

    };

    add_html5_events = function() {

      if (s._a._added_events) {
        return false;
      }

      var f;

      function add(oEvt, oFn, bCapture) {
        return s._a ? s._a.addEventListener(oEvt, oFn, bCapture||false) : null;
      }

      s._a._added_events = true;

      for (f in html5_events) {
        if (html5_events.hasOwnProperty(f)) {
          add(f, html5_events[f]);
        }
      }

      return true;

    };

    remove_html5_events = function() {

      // Remove event listeners

      var f;

      function remove(oEvt, oFn, bCapture) {
        return (s._a ? s._a.removeEventListener(oEvt, oFn, bCapture||false) : null);
      }

      sm2._wD(s.id + ': Removing event listeners');
      s._a._added_events = false;

      for (f in html5_events) {
        if (html5_events.hasOwnProperty(f)) {
          remove(f, html5_events[f]);
        }
      }

    };

    /**
     * Pseudo-private event internals
     * ------------------------------
     */

    this._onload = function(nSuccess) {

      var fN,
          // check for duration to prevent false positives from flash 8 when loading from cache.
          loadOK = !!nSuccess || (!s.isHTML5 && fV === 8 && s.duration);

      // <d>
      fN = s.id + ': ';
      sm2._wD(fN + (loadOK ? 'onload()' : 'Failed to load / invalid sound?' + (!s.duration ? ' Zero-length duration reported.' : ' -') + ' (' + s.url + ')'), (loadOK ? 1 : 2));
      if (!loadOK && !s.isHTML5) {
        if (sm2.sandbox.noRemote === true) {
          sm2._wD(fN + str('noNet'), 1);
        }
        if (sm2.sandbox.noLocal === true) {
          sm2._wD(fN + str('noLocal'), 1);
        }
      }
      // </d>

      s.loaded = loadOK;
      s.readyState = loadOK?3:2;
      s._onbufferchange(0);

      if (s._iO.onload) {
        wrapCallback(s, function() {
          s._iO.onload.apply(s, [loadOK]);
        });
      }

      return true;

    };

    this._onbufferchange = function(nIsBuffering) {

      if (s.playState === 0) {
        // ignore if not playing
        return false;
      }

      if ((nIsBuffering && s.isBuffering) || (!nIsBuffering && !s.isBuffering)) {
        return false;
      }

      s.isBuffering = (nIsBuffering === 1);
      if (s._iO.onbufferchange) {
        sm2._wD(s.id + ': Buffer state change: ' + nIsBuffering);
        s._iO.onbufferchange.apply(s);
      }

      return true;

    };

    /**
     * Playback may have stopped due to buffering, or related reason.
     * This state can be encountered on iOS < 6 when auto-play is blocked.
     */

    this._onsuspend = function() {

      if (s._iO.onsuspend) {
        sm2._wD(s.id + ': Playback suspended');
        s._iO.onsuspend.apply(s);
      }

      return true;

    };

    /**
     * flash 9/movieStar + RTMP-only method, should fire only once at most
     * at this point we just recreate failed sounds rather than trying to reconnect
     */

    this._onfailure = function(msg, level, code) {

      s.failures++;
      sm2._wD(s.id + ': Failures = ' + s.failures);

      if (s._iO.onfailure && s.failures === 1) {
        s._iO.onfailure(s, msg, level, code);
      } else {
        sm2._wD(s.id + ': Ignoring failure');
      }

    };

    this._onfinish = function() {

      // store local copy before it gets trashed...
      var io_onfinish = s._iO.onfinish;

      s._onbufferchange(0);
      s._resetOnPosition(0);

      // reset some state items
      if (s.instanceCount) {

        s.instanceCount--;

        if (!s.instanceCount) {

          // remove onPosition listeners, if any
          detachOnPosition();

          // reset instance options
          s.playState = 0;
          s.paused = false;
          s.instanceCount = 0;
          s.instanceOptions = {};
          s._iO = {};
          stop_html5_timer();

          // reset position, too
          if (s.isHTML5) {
            s.position = 0;
          }

        }

        if (!s.instanceCount || s._iO.multiShotEvents) {
          // fire onfinish for last, or every instance
          if (io_onfinish) {
            sm2._wD(s.id + ': onfinish()');
            wrapCallback(s, function() {
              io_onfinish.apply(s);
            });
          }
        }

      }

    };

    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {

      var instanceOptions = s._iO;

      s.bytesLoaded = nBytesLoaded;
      s.bytesTotal = nBytesTotal;
      s.duration = Math.floor(nDuration);
      s.bufferLength = nBufferLength;

      if (!s.isHTML5 && !instanceOptions.isMovieStar) {

        if (instanceOptions.duration) {
          // use duration from options, if specified and larger. nobody should be specifying duration in options, actually, and it should be retired.
          s.durationEstimate = (s.duration > instanceOptions.duration) ? s.duration : instanceOptions.duration;
        } else {
          s.durationEstimate = parseInt((s.bytesTotal / s.bytesLoaded) * s.duration, 10);
        }

      } else {

        s.durationEstimate = s.duration;

      }

      // for flash, reflect sequential-load-style buffering
      if (!s.isHTML5) {
        s.buffered = [{
          'start': 0,
          'end': s.duration
        }];
      }

      // allow whileloading to fire even if "load" fired under HTML5, due to HTTP range/partials
      if ((s.readyState !== 3 || s.isHTML5) && instanceOptions.whileloading) {
        instanceOptions.whileloading.apply(s);
      }

    };

    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {

      var instanceOptions = s._iO,
          eqLeft;

      if (isNaN(nPosition) || nPosition === null) {
        // flash safety net
        return false;
      }

      // Safari HTML5 play() may return small -ve values when starting from position: 0, eg. -50.120396875. Unexpected/invalid per W3, I think. Normalize to 0.
      s.position = Math.max(0, nPosition);

      s._processOnPosition();

      if (!s.isHTML5 && fV > 8) {

        if (instanceOptions.usePeakData && oPeakData !== _undefined && oPeakData) {
          s.peakData = {
            left: oPeakData.leftPeak,
            right: oPeakData.rightPeak
          };
        }

        if (instanceOptions.useWaveformData && oWaveformDataLeft !== _undefined && oWaveformDataLeft) {
          s.waveformData = {
            left: oWaveformDataLeft.split(','),
            right: oWaveformDataRight.split(',')
          };
        }

        if (instanceOptions.useEQData) {
          if (oEQData !== _undefined && oEQData && oEQData.leftEQ) {
            eqLeft = oEQData.leftEQ.split(',');
            s.eqData = eqLeft;
            s.eqData.left = eqLeft;
            if (oEQData.rightEQ !== _undefined && oEQData.rightEQ) {
              s.eqData.right = oEQData.rightEQ.split(',');
            }
          }
        }

      }

      if (s.playState === 1) {

        // special case/hack: ensure buffering is false if loading from cache (and not yet started)
        if (!s.isHTML5 && fV === 8 && !s.position && s.isBuffering) {
          s._onbufferchange(0);
        }

        if (instanceOptions.whileplaying) {
          // flash may call after actual finish
          instanceOptions.whileplaying.apply(s);
        }

      }

      return true;

    };

    this._oncaptiondata = function(oData) {

      /**
       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
       *
       * @param {object} oData
       */

      sm2._wD(s.id + ': Caption data received.');

      s.captiondata = oData;

      if (s._iO.oncaptiondata) {
        s._iO.oncaptiondata.apply(s, [oData]);
      }

    };

    this._onmetadata = function(oMDProps, oMDData) {

      /**
       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
       * RTMP may include song title, MovieStar content may include encoding info
       *
       * @param {array} oMDProps (names)
       * @param {array} oMDData (values)
       */

      sm2._wD(s.id + ': Metadata received.');

      var oData = {}, i, j;

      for (i = 0, j = oMDProps.length; i < j; i++) {
        oData[oMDProps[i]] = oMDData[i];
      }
      s.metadata = oData;

      if (s._iO.onmetadata) {
        s._iO.onmetadata.apply(s);
      }

    };

    this._onid3 = function(oID3Props, oID3Data) {

      /**
       * internal: flash 8 + flash 9 ID3 feature
       * may include artist, song title etc.
       *
       * @param {array} oID3Props (names)
       * @param {array} oID3Data (values)
       */

      sm2._wD(s.id + ': ID3 data received.');

      var oData = [], i, j;

      for (i = 0, j = oID3Props.length; i < j; i++) {
        oData[oID3Props[i]] = oID3Data[i];
      }
      s.id3 = mixin(s.id3, oData);

      if (s._iO.onid3) {
        s._iO.onid3.apply(s);
      }

    };

    // flash/RTMP-only

    this._onconnect = function(bSuccess) {

      bSuccess = (bSuccess === 1);
      sm2._wD(s.id + ': ' + (bSuccess ? 'Connected.' : 'Failed to connect? - ' + s.url), (bSuccess ? 1 : 2));
      s.connected = bSuccess;

      if (bSuccess) {

        s.failures = 0;

        if (idCheck(s.id)) {
          if (s.getAutoPlay()) {
            // only update the play state if auto playing
            s.play(_undefined, s.getAutoPlay());
          } else if (s._iO.autoLoad) {
            s.load();
          }
        }

        if (s._iO.onconnect) {
          s._iO.onconnect.apply(s, [bSuccess]);
        }

      }

    };

    this._ondataerror = function(sError) {

      // flash 9 wave/eq data handler
      // hack: called at start, and end from flash at/after onfinish()
      if (s.playState > 0) {
        sm2._wD(s.id + ': Data error: ' + sError);
        if (s._iO.ondataerror) {
          s._iO.ondataerror.apply(s);
        }
      }

    };

    // <d>
    this._debug();
    // </d>

  }; // SMSound()

  /**
   * Private SoundManager internals
   * ------------------------------
   */

  getDocument = function() {

    return (doc.body || doc.getElementsByTagName('div')[0]);

  };

  id = function(sID) {

    return doc.getElementById(sID);

  };

  mixin = function(oMain, oAdd) {

    // non-destructive merge
    var o1 = (oMain || {}), o2, o;

    // if unspecified, o2 is the default options object
    o2 = (oAdd === _undefined ? sm2.defaultOptions : oAdd);

    for (o in o2) {

      if (o2.hasOwnProperty(o) && o1[o] === _undefined) {

        if (typeof o2[o] !== 'object' || o2[o] === null) {

          // assign directly
          o1[o] = o2[o];

        } else {

          // recurse through o2
          o1[o] = mixin(o1[o], o2[o]);

        }

      }

    }

    return o1;

  };

  wrapCallback = function(oSound, callback) {

    /**
     * 03/03/2013: Fix for Flash Player 11.6.602.171 + Flash 8 (flashVersion = 8) SWF issue
     * setTimeout() fix for certain SMSound callbacks like onload() and onfinish(), where subsequent calls like play() and load() fail when Flash Player 11.6.602.171 is installed, and using soundManager with flashVersion = 8 (which is the default).
     * Not sure of exact cause. Suspect race condition and/or invalid (NaN-style) position argument trickling down to the next JS -> Flash _start() call, in the play() case.
     * Fix: setTimeout() to yield, plus safer null / NaN checking on position argument provided to Flash.
     * https://getsatisfaction.com/schillmania/topics/recent_chrome_update_seems_to_have_broken_my_sm2_audio_player
     */
    if (!oSound.isHTML5 && fV === 8) {
      window.setTimeout(callback, 0);
    } else {
      callback();
    }

  };

  // additional soundManager properties that soundManager.setup() will accept

  extraOptions = {
    'onready': 1,
    'ontimeout': 1,
    'defaultOptions': 1,
    'flash9Options': 1,
    'movieStarOptions': 1
  };

  assign = function(o, oParent) {

    /**
     * recursive assignment of properties, soundManager.setup() helper
     * allows property assignment based on whitelist
     */

    var i,
        result = true,
        hasParent = (oParent !== _undefined),
        setupOptions = sm2.setupOptions,
        bonusOptions = extraOptions;

    // <d>

    // if soundManager.setup() called, show accepted parameters.

    if (o === _undefined) {

      result = [];

      for (i in setupOptions) {

        if (setupOptions.hasOwnProperty(i)) {
          result.push(i);
        }

      }

      for (i in bonusOptions) {

        if (bonusOptions.hasOwnProperty(i)) {

          if (typeof sm2[i] === 'object') {

            result.push(i+': {...}');

          } else if (sm2[i] instanceof Function) {

            result.push(i+': function() {...}');

          } else {

            result.push(i);

          }

        }

      }

      sm2._wD(str('setup', result.join(', ')));

      return false;

    }

    // </d>

    for (i in o) {

      if (o.hasOwnProperty(i)) {

        // if not an {object} we want to recurse through...

        if (typeof o[i] !== 'object' || o[i] === null || o[i] instanceof Array || o[i] instanceof RegExp) {

          // check "allowed" options

          if (hasParent && bonusOptions[oParent] !== _undefined) {

            // valid recursive / nested object option, eg., { defaultOptions: { volume: 50 } }
            sm2[oParent][i] = o[i];

          } else if (setupOptions[i] !== _undefined) {

            // special case: assign to setupOptions object, which soundManager property references
            sm2.setupOptions[i] = o[i];

            // assign directly to soundManager, too
            sm2[i] = o[i];

          } else if (bonusOptions[i] === _undefined) {

            // invalid or disallowed parameter. complain.
            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);

            result = false;

          } else {

            /**
             * valid extraOptions (bonusOptions) parameter.
             * is it a method, like onready/ontimeout? call it.
             * multiple parameters should be in an array, eg. soundManager.setup({onready: [myHandler, myScope]});
             */

            if (sm2[i] instanceof Function) {

              sm2[i].apply(sm2, (o[i] instanceof Array? o[i] : [o[i]]));

            } else {

              // good old-fashioned direct assignment
              sm2[i] = o[i];

            }

          }

        } else {

          // recursion case, eg., { defaultOptions: { ... } }

          if (bonusOptions[i] === _undefined) {

            // invalid or disallowed parameter. complain.
            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);

            result = false;

          } else {

            // recurse through object
            return assign(o[i], i);

          }

        }

      }

    }

    return result;

  };

  function preferFlashCheck(kind) {

    // whether flash should play a given type
    return (sm2.preferFlash && hasFlash && !sm2.ignoreFlash && (sm2.flash[kind] !== _undefined && sm2.flash[kind]));

  }

  /**
   * Internal DOM2-level event helpers
   * ---------------------------------
   */

  event = (function() {

    // normalize event methods
    var old = (window.attachEvent),
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    // normalize "on" event prefix, optional capture argument
    function getArgs(oArgs) {

      var args = slice.call(oArgs),
          len = args.length;

      if (old) {
        // prefix
        args[1] = 'on' + args[1];
        if (len > 3) {
          // no capture
          args.pop();
        }
      } else if (len === 3) {
        args.push(false);
      }

      return args;

    }

    function apply(args, sType) {

      // normalize and call the event method, with the proper arguments
      var element = args.shift(),
          method = [evt[sType]];

      if (old) {
        // old IE can't do apply().
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }

    }

    function add() {

      apply(getArgs(arguments), 'add');

    }

    function remove() {

      apply(getArgs(arguments), 'remove');

    }

    return {
      'add': add,
      'remove': remove
    };

  }());

  /**
   * Internal HTML5 event handling
   * -----------------------------
   */

  function html5_event(oFn) {

    // wrap html5 event handlers so we don't call them on destroyed and/or unloaded sounds

    return function(e) {

      var s = this._s,
          result;

      if (!s || !s._a) {
        // <d>
        if (s && s.id) {
          sm2._wD(s.id + ': Ignoring ' + e.type);
        } else {
          sm2._wD(h5 + 'Ignoring ' + e.type);
        }
        // </d>
        result = null;
      } else {
        result = oFn.call(this, e);
      }

      return result;

    };

  }

  html5_events = {

    // HTML5 event-name-to-handler map

    abort: html5_event(function() {

      sm2._wD(this._s.id + ': abort');

    }),

    // enough has loaded to play

    canplay: html5_event(function() {

      var s = this._s,
          position1K;

      if (s._html5_canplay) {
        // this event has already fired. ignore.
        return true;
      }

      s._html5_canplay = true;
      sm2._wD(s.id + ': canplay');
      s._onbufferchange(0);

      // position according to instance options
      position1K = (s._iO.position !== _undefined && !isNaN(s._iO.position)?s._iO.position/msecScale:null);

      // set the position if position was set before the sound loaded
      if (s.position && this.currentTime !== position1K) {
        sm2._wD(s.id + ': canplay: Setting position to ' + position1K);
        try {
          this.currentTime = position1K;
        } catch(ee) {
          sm2._wD(s.id + ': canplay: Setting position of ' + position1K + ' failed: ' + ee.message, 2);
        }
      }

      // hack for HTML5 from/to case
      if (s._iO._oncanplay) {
        s._iO._oncanplay();
      }

    }),

    canplaythrough: html5_event(function() {

      var s = this._s;

      if (!s.loaded) {
        s._onbufferchange(0);
        s._whileloading(s.bytesLoaded, s.bytesTotal, s._get_html5_duration());
        s._onload(true);
      }

    }),

    // TODO: Reserved for potential use
    /*
    emptied: html5_event(function() {

      sm2._wD(this._s.id + ': emptied');

    }),
    */

    ended: html5_event(function() {

      var s = this._s;

      sm2._wD(s.id + ': ended');

      s._onfinish();

    }),

    error: html5_event(function() {

      sm2._wD(this._s.id + ': HTML5 error, code ' + this.error.code);
      /**
       * HTML5 error codes, per W3C
       * Error 1: Client aborted download at user's request.
       * Error 2: Network error after load started.
       * Error 3: Decoding issue.
       * Error 4: Media (audio file) not supported.
       * Reference: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
       */
      // call load with error state?
      this._s._onload(false);

    }),

    loadeddata: html5_event(function() {

      var s = this._s;

      sm2._wD(s.id + ': loadeddata');

      // safari seems to nicely report progress events, eventually totalling 100%
      if (!s._loaded && !isSafari) {
        s.duration = s._get_html5_duration();
      }

    }),

    loadedmetadata: html5_event(function() {

      sm2._wD(this._s.id + ': loadedmetadata');

    }),

    loadstart: html5_event(function() {

      sm2._wD(this._s.id + ': loadstart');
      // assume buffering at first
      this._s._onbufferchange(1);

    }),

    play: html5_event(function() {

      // sm2._wD(this._s.id + ': play()');
      // once play starts, no buffering
      this._s._onbufferchange(0);

    }),

    playing: html5_event(function() {

      sm2._wD(this._s.id + ': playing');
      // once play starts, no buffering
      this._s._onbufferchange(0);

    }),

    progress: html5_event(function(e) {

      // note: can fire repeatedly after "loaded" event, due to use of HTTP range/partials

      var s = this._s,
          i, j, progStr, buffered = 0,
          isProgress = (e.type === 'progress'),
          ranges = e.target.buffered,
          // firefox 3.6 implements e.loaded/total (bytes)
          loaded = (e.loaded||0),
          total = (e.total||1);

      // reset the "buffered" (loaded byte ranges) array
      s.buffered = [];

      if (ranges && ranges.length) {

        // if loaded is 0, try TimeRanges implementation as % of load
        // https://developer.mozilla.org/en/DOM/TimeRanges

        // re-build "buffered" array
        // HTML5 returns seconds. SM2 API uses msec for setPosition() etc., whether Flash or HTML5.
        for (i=0, j=ranges.length; i<j; i++) {
          s.buffered.push({
            'start': ranges.start(i) * msecScale,
            'end': ranges.end(i) * msecScale
          });
        }

        // use the last value locally
        buffered = (ranges.end(0) - ranges.start(0)) * msecScale;

        // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
        loaded = Math.min(1, buffered/(e.target.duration*msecScale));

        // <d>
        if (isProgress && ranges.length > 1) {
          progStr = [];
          j = ranges.length;
          for (i=0; i<j; i++) {
            progStr.push(e.target.buffered.start(i)*msecScale +'-'+ e.target.buffered.end(i)*msecScale);
          }
          sm2._wD(this._s.id + ': progress, timeRanges: ' + progStr.join(', '));
        }

        if (isProgress && !isNaN(loaded)) {
          sm2._wD(this._s.id + ': progress, ' + Math.floor(loaded*100) + '% loaded');
        }
        // </d>

      }

      if (!isNaN(loaded)) {

        // if progress, likely not buffering
        s._onbufferchange(0);
        // TODO: prevent calls with duplicate values.
        s._whileloading(loaded, total, s._get_html5_duration());
        if (loaded && total && loaded === total) {
          // in case "onload" doesn't fire (eg. gecko 1.9.2)
          html5_events.canplaythrough.call(this, e);
        }

      }

    }),

    ratechange: html5_event(function() {

      sm2._wD(this._s.id + ': ratechange');

    }),

    suspend: html5_event(function(e) {

      // download paused/stopped, may have finished (eg. onload)
      var s = this._s;

      sm2._wD(this._s.id + ': suspend');
      html5_events.progress.call(this, e);
      s._onsuspend();

    }),

    stalled: html5_event(function() {

      sm2._wD(this._s.id + ': stalled');

    }),

    timeupdate: html5_event(function() {

      this._s._onTimer();

    }),

    waiting: html5_event(function() {

      var s = this._s;

      // see also: seeking
      sm2._wD(this._s.id + ': waiting');

      // playback faster than download rate, etc.
      s._onbufferchange(1);

    })

  };

  html5OK = function(iO) {

    // playability test based on URL or MIME type

    var result;

    if (!iO || (!iO.type && !iO.url && !iO.serverURL)) {

      // nothing to check
      result = false;

    } else if (iO.serverURL || (iO.type && preferFlashCheck(iO.type))) {

      // RTMP, or preferring flash
      result = false;

    } else {

      // Use type, if specified. Pass data: URIs to HTML5. If HTML5-only mode, no other options, so just give 'er
      result = ((iO.type ? html5CanPlay({type:iO.type}) : html5CanPlay({url:iO.url}) || sm2.html5Only || iO.url.match(/data\:/i)));

    }

    return result;

  };

  html5Unload = function(oAudio) {

    /**
     * Internal method: Unload media, and cancel any current/pending network requests.
     * Firefox can load an empty URL, which allegedly destroys the decoder and stops the download.
     * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
     * However, Firefox has been seen loading a relative URL from '' and thus requesting the hosting page on unload.
     * Other UA behaviour is unclear, so everyone else gets an about:blank-style URL.
     */

    var url;

    if (oAudio) {

      // Firefox and Chrome accept short WAVe data: URIs. Chome dislikes audio/wav, but accepts audio/wav for data: MIME.
      // Desktop Safari complains / fails on data: URI, so it gets about:blank.
      url = (isSafari ? emptyURL : (sm2.html5.canPlayType('audio/wav') ? emptyWAV : emptyURL));

      oAudio.src = url;

      // reset some state, too
      if (oAudio._called_unload !== undefined) {
        oAudio._called_load = false;
      }

    }

    if (useGlobalHTML5Audio) {

      // ensure URL state is trashed, also
      lastGlobalHTML5URL = null;

    }

    return url;

  };

  html5CanPlay = function(o) {

    /**
     * Try to find MIME, test and return truthiness
     * o = {
     *  url: '/path/to/an.mp3',
     *  type: 'audio/mp3'
     * }
     */

    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
      return false;
    }

    var url = (o.url || null),
        mime = (o.type || null),
        aF = sm2.audioFormats,
        result,
        offset,
        fileExt,
        item;

    // account for known cases like audio/mp3

    if (mime && sm2.html5[mime] !== _undefined) {
      return (sm2.html5[mime] && !preferFlashCheck(mime));
    }

    if (!html5Ext) {
      html5Ext = [];
      for (item in aF) {
        if (aF.hasOwnProperty(item)) {
          html5Ext.push(item);
          if (aF[item].related) {
            html5Ext = html5Ext.concat(aF[item].related);
          }
        }
      }
      html5Ext = new RegExp('\\.('+html5Ext.join('|')+')(\\?.*)?$','i');
    }

    // TODO: Strip URL queries, etc.
    fileExt = (url ? url.toLowerCase().match(html5Ext) : null);

    if (!fileExt || !fileExt.length) {
      if (!mime) {
        result = false;
      } else {
        // audio/mp3 -> mp3, result should be known
        offset = mime.indexOf(';');
        // strip "audio/X; codecs..."
        fileExt = (offset !== -1?mime.substr(0,offset):mime).substr(6);
      }
    } else {
      // match the raw extension name - "mp3", for example
      fileExt = fileExt[1];
    }

    if (fileExt && sm2.html5[fileExt] !== _undefined) {
      // result known
      result = (sm2.html5[fileExt] && !preferFlashCheck(fileExt));
    } else {
      mime = 'audio/'+fileExt;
      result = sm2.html5.canPlayType({type:mime});
      sm2.html5[fileExt] = result;
      // sm2._wD('canPlayType, found result: ' + result);
      result = (result && sm2.html5[mime] && !preferFlashCheck(mime));
    }

    return result;

  };

  testHTML5 = function() {

    /**
     * Internal: Iterates over audioFormats, determining support eg. audio/mp3, audio/mpeg and so on
     * assigns results to html5[] and flash[].
     */

    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
      // without HTML5, we need Flash.
      sm2.html5.usingFlash = true;
      needsFlash = true;
      return false;
    }

    // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
    var a = (Audio !== _undefined ? (isOpera && opera.version() < 10 ? new Audio(null) : new Audio()) : null),
        item, lookup, support = {}, aF, i;

    function cp(m) {

      var canPlay, j,
          result = false,
          isOK = false;

      if (!a || typeof a.canPlayType !== 'function') {
        return result;
      }

      if (m instanceof Array) {
        // iterate through all mime types, return any successes
        for (i=0, j=m.length; i<j; i++) {
          if (sm2.html5[m[i]] || a.canPlayType(m[i]).match(sm2.html5Test)) {
            isOK = true;
            sm2.html5[m[i]] = true;
            // note flash support, too
            sm2.flash[m[i]] = !!(m[i].match(flashMIME));
          }
        }
        result = isOK;
      } else {
        canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
        result = !!(canPlay && (canPlay.match(sm2.html5Test)));
      }

      return result;

    }

    // test all registered formats + codecs

    aF = sm2.audioFormats;

    for (item in aF) {

      if (aF.hasOwnProperty(item)) {

        lookup = 'audio/' + item;

        support[item] = cp(aF[item].type);

        // write back generic type too, eg. audio/mp3
        support[lookup] = support[item];

        // assign flash
        if (item.match(flashMIME)) {

          sm2.flash[item] = true;
          sm2.flash[lookup] = true;

        } else {

          sm2.flash[item] = false;
          sm2.flash[lookup] = false;

        }

        // assign result to related formats, too

        if (aF[item] && aF[item].related) {

          for (i=aF[item].related.length-1; i >= 0; i--) {

            // eg. audio/m4a
            support['audio/'+aF[item].related[i]] = support[item];
            sm2.html5[aF[item].related[i]] = support[item];
            sm2.flash[aF[item].related[i]] = support[item];

          }

        }

      }

    }

    support.canPlayType = (a?cp:null);
    sm2.html5 = mixin(sm2.html5, support);

    sm2.html5.usingFlash = featureCheck();
    needsFlash = sm2.html5.usingFlash;

    return true;

  };

  strings = {

    // <d>
    notReady: 'Unavailable - wait until onready() has fired.',
    notOK: 'Audio support is not available.',
    domError: sm + 'exception caught while appending SWF to DOM.',
    spcWmode: 'Removing wmode, preventing known SWF loading issue(s)',
    swf404: smc + 'Verify that %s is a valid path.',
    tryDebug: 'Try ' + sm + '.debugFlash = true for more security details (output goes to SWF.)',
    checkSWF: 'See SWF output for more debug info.',
    localFail: smc + 'Non-HTTP page (' + doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
    waitFocus: smc + 'Special case: Waiting for SWF to load with window focus...',
    waitForever: smc + 'Waiting indefinitely for Flash (will recover if unblocked)...',
    waitSWF: smc + 'Waiting for 100% SWF load...',
    needFunction: smc + 'Function object expected for %s',
    badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
    currentObj: smc + '_debug(): Current sound objects',
    waitOnload: smc + 'Waiting for window.onload()',
    docLoaded: smc + 'Document already loaded',
    onload: smc + 'initComplete(): calling soundManager.onload()',
    onloadOK: sm + '.onload() complete',
    didInit: smc + 'init(): Already called?',
    secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
    badRemove: smc + 'Failed to remove Flash node.',
    shutdown: sm + '.disable(): Shutting down',
    queue: smc + 'Queueing %s handler',
    smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
    fbTimeout: 'No flash response, applying .'+swfCSS.swfTimedout+' CSS...',
    fbLoaded: 'Flash loaded',
    fbHandler: smc + 'flashBlockHandler()',
    manURL: 'SMSound.load(): Using manually-assigned URL',
    onURL: sm + '.load(): current URL already assigned.',
    badFV: sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
    as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
    noNSLoop: 'Note: Looping not implemented for MovieStar formats',
    needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
    mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
    needFlash: smc + 'Fatal error: Flash is needed to play some required formats, but is not available.',
    gotFocus: smc + 'Got window focus.',
    policy: 'Enabling usePolicyFile for data access',
    setup: sm + '.setup(): allowed parameters: %s',
    setupError: sm + '.setup(): "%s" cannot be assigned with this method.',
    setupUndef: sm + '.setup(): Could not find option "%s"',
    setupLate: sm + '.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().',
    noURL: smc + 'Flash URL required. Call soundManager.setup({url:...}) to get started.',
    sm2Loaded: 'SoundManager 2: Ready.',
    reset: sm + '.reset(): Removing event callbacks',
    mobileUA: 'Mobile UA detected, preferring HTML5 by default.',
    globalHTML5: 'Using singleton HTML5 Audio() pattern for this device.'
    // </d>

  };

  str = function() {

    // internal string replace helper.
    // arguments: o [,items to replace]
    // <d>

    var args,
        i, j, o,
        sstr;

    // real array, please
    args = slice.call(arguments);

    // first argument
    o = args.shift();

    sstr = (strings && strings[o] ? strings[o] : '');

    if (sstr && args && args.length) {
      for (i = 0, j = args.length; i < j; i++) {
        sstr = sstr.replace('%s', args[i]);
      }
    }

    return sstr;
    // </d>

  };

  loopFix = function(sOpt) {

    // flash 8 requires stream = false for looping to work
    if (fV === 8 && sOpt.loops > 1 && sOpt.stream) {
      _wDS('as2loop');
      sOpt.stream = false;
    }

    return sOpt;

  };

  policyFix = function(sOpt, sPre) {

    if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
      sm2._wD((sPre || '') + str('policy'));
      sOpt.usePolicyFile = true;
    }

    return sOpt;

  };

  complain = function(sMsg) {

    // <d>
    if (hasConsole && console.warn !== _undefined) {
      console.warn(sMsg);
    } else {
      sm2._wD(sMsg);
    }
    // </d>

  };

  doNothing = function() {

    return false;

  };

  disableObject = function(o) {

    var oProp;

    for (oProp in o) {
      if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
        o[oProp] = doNothing;
      }
    }

    oProp = null;

  };

  failSafely = function(bNoDisable) {

    // general failure exception handler

    if (bNoDisable === _undefined) {
      bNoDisable = false;
    }

    if (disabled || bNoDisable) {
      sm2.disable(bNoDisable);
    }

  };

  normalizeMovieURL = function(smURL) {

    var urlParams = null, url;

    if (smURL) {
      if (smURL.match(/\.swf(\?.*)?$/i)) {
        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
        if (urlParams) {
          // assume user knows what they're doing
          return smURL;
        }
      } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
        // append trailing slash, if needed
        smURL += '/';
      }
    }

    url = (smURL && smURL.lastIndexOf('/') !== - 1 ? smURL.substr(0, smURL.lastIndexOf('/') + 1) : './') + sm2.movieURL;

    if (sm2.noSWFCache) {
      url += ('?ts=' + new Date().getTime());
    }

    return url;

  };

  setVersionInfo = function() {

    // short-hand for internal use

    fV = parseInt(sm2.flashVersion, 10);

    if (fV !== 8 && fV !== 9) {
      sm2._wD(str('badFV', fV, defaultFlashVersion));
      sm2.flashVersion = fV = defaultFlashVersion;
    }

    // debug flash movie, if applicable

    var isDebug = (sm2.debugMode || sm2.debugFlash?'_debug.swf':'.swf');

    if (sm2.useHTML5Audio && !sm2.html5Only && sm2.audioFormats.mp4.required && fV < 9) {
      sm2._wD(str('needfl9'));
      sm2.flashVersion = fV = 9;
    }

    sm2.version = sm2.versionNumber + (sm2.html5Only?' (HTML5-only mode)':(fV === 9?' (AS3/Flash 9)':' (AS2/Flash 8)'));

    // set up default options
    if (fV > 8) {
      // +flash 9 base options
      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.flash9Options);
      sm2.features.buffering = true;
      // +moviestar support
      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.movieStarOptions);
      sm2.filePatterns.flash9 = new RegExp('\\.(mp3|' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
      sm2.features.movieStar = true;
    } else {
      sm2.features.movieStar = false;
    }

    // regExp for flash canPlay(), etc.
    sm2.filePattern = sm2.filePatterns[(fV !== 8?'flash9':'flash8')];

    // if applicable, use _debug versions of SWFs
    sm2.movieURL = (fV === 8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf', isDebug);

    sm2.features.peakData = sm2.features.waveformData = sm2.features.eqData = (fV > 8);

  };

  setPolling = function(bPolling, bHighPerformance) {

    if (!flash) {
      return false;
    }

    flash._setPolling(bPolling, bHighPerformance);

  };

  initDebug = function() {

    // starts debug mode, creating output <div> for UAs without console object

    // allow force of debug mode via URL
    // <d>
    if (sm2.debugURLParam.test(wl)) {
      sm2.debugMode = true;
    }

    if (id(sm2.debugID)) {
      return false;
    }

    var oD, oDebug, oTarget, oToggle, tmp;

    if (sm2.debugMode && !id(sm2.debugID) && (!hasConsole || !sm2.useConsole || !sm2.consoleOnly)) {

      oD = doc.createElement('div');
      oD.id = sm2.debugID + '-toggle';

      oToggle = {
        'position': 'fixed',
        'bottom': '0px',
        'right': '0px',
        'width': '1.2em',
        'height': '1.2em',
        'lineHeight': '1.2em',
        'margin': '2px',
        'textAlign': 'center',
        'border': '1px solid #999',
        'cursor': 'pointer',
        'background': '#fff',
        'color': '#333',
        'zIndex': 10001
      };

      oD.appendChild(doc.createTextNode('-'));
      oD.onclick = toggleDebug;
      oD.title = 'Toggle SM2 debug console';

      if (ua.match(/msie 6/i)) {
        oD.style.position = 'absolute';
        oD.style.cursor = 'hand';
      }

      for (tmp in oToggle) {
        if (oToggle.hasOwnProperty(tmp)) {
          oD.style[tmp] = oToggle[tmp];
        }
      }

      oDebug = doc.createElement('div');
      oDebug.id = sm2.debugID;
      oDebug.style.display = (sm2.debugMode?'block':'none');

      if (sm2.debugMode && !id(oD.id)) {
        try {
          oTarget = getDocument();
          oTarget.appendChild(oD);
        } catch(e2) {
          throw new Error(str('domError')+' \n'+e2.toString());
        }
        oTarget.appendChild(oDebug);
      }

    }

    oTarget = null;
    // </d>

  };

  idCheck = this.getSoundById;

  // <d>
  _wDS = function(o, errorLevel) {

    return (!o ? '' : sm2._wD(str(o), errorLevel));

  };

  toggleDebug = function() {

    var o = id(sm2.debugID),
    oT = id(sm2.debugID + '-toggle');

    if (!o) {
      return false;
    }

    if (debugOpen) {
      // minimize
      oT.innerHTML = '+';
      o.style.display = 'none';
    } else {
      oT.innerHTML = '-';
      o.style.display = 'block';
    }

    debugOpen = !debugOpen;

  };

  debugTS = function(sEventType, bSuccess, sMessage) {

    // troubleshooter debug hooks

    if (window.sm2Debugger !== _undefined) {
      try {
        sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
      } catch(e) {
        // oh well
        return false;
      }
    }

    return true;

  };
  // </d>

  getSWFCSS = function() {

    var css = [];

    if (sm2.debugMode) {
      css.push(swfCSS.sm2Debug);
    }

    if (sm2.debugFlash) {
      css.push(swfCSS.flashDebug);
    }

    if (sm2.useHighPerformance) {
      css.push(swfCSS.highPerf);
    }

    return css.join(' ');

  };

  flashBlockHandler = function() {

    // *possible* flash block situation.

    var name = str('fbHandler'),
        p = sm2.getMoviePercent(),
        css = swfCSS,
        error = {type:'FLASHBLOCK'};

    if (sm2.html5Only) {
      // no flash, or unused
      return false;
    }

    if (!sm2.ok()) {

      if (needsFlash) {
        // make the movie more visible, so user can fix
        sm2.oMC.className = getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null?css.swfTimedout:css.swfError);
        sm2._wD(name + ': ' + str('fbTimeout') + (p ? ' (' + str('fbLoaded') + ')' : ''));
      }

      sm2.didFlashBlock = true;

      // fire onready(), complain lightly
      processOnEvents({type:'ontimeout', ignoreInit:true, error:error});
      catchError(error);

    } else {

      // SM2 loaded OK (or recovered)

      // <d>
      if (sm2.didFlashBlock) {
        sm2._wD(name + ': Unblocked');
      }
      // </d>

      if (sm2.oMC) {
        sm2.oMC.className = [getSWFCSS(), css.swfDefault, css.swfLoaded + (sm2.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');
      }

    }

  };

  addOnEvent = function(sType, oMethod, oScope) {

    if (on_queue[sType] === _undefined) {
      on_queue[sType] = [];
    }

    on_queue[sType].push({
      'method': oMethod,
      'scope': (oScope || null),
      'fired': false
    });

  };

  processOnEvents = function(oOptions) {

    // if unspecified, assume OK/error

    if (!oOptions) {
      oOptions = {
        type: (sm2.ok() ? 'onready' : 'ontimeout')
      };
    }

    if (!didInit && oOptions && !oOptions.ignoreInit) {
      // not ready yet.
      return false;
    }

    if (oOptions.type === 'ontimeout' && (sm2.ok() || (disabled && !oOptions.ignoreInit))) {
      // invalid case
      return false;
    }

    var status = {
          success: (oOptions && oOptions.ignoreInit?sm2.ok():!disabled)
        },

        // queue specified by type, or none
        srcQueue = (oOptions && oOptions.type?on_queue[oOptions.type]||[]:[]),

        queue = [], i, j,
        args = [status],
        canRetry = (needsFlash && !sm2.ok());

    if (oOptions.error) {
      args[0].error = oOptions.error;
    }

    for (i = 0, j = srcQueue.length; i < j; i++) {
      if (srcQueue[i].fired !== true) {
        queue.push(srcQueue[i]);
      }
    }

    if (queue.length) {
      // sm2._wD(sm + ': Firing ' + queue.length + ' ' + oOptions.type + '() item' + (queue.length === 1 ? '' : 's'));
      for (i = 0, j = queue.length; i < j; i++) {
        if (queue[i].scope) {
          queue[i].method.apply(queue[i].scope, args);
        } else {
          queue[i].method.apply(this, args);
        }
        if (!canRetry) {
          // useFlashBlock and SWF timeout case doesn't count here.
          queue[i].fired = true;
        }
      }
    }

    return true;

  };

  initUserOnload = function() {

    window.setTimeout(function() {

      if (sm2.useFlashBlock) {
        flashBlockHandler();
      }

      processOnEvents();

      // call user-defined "onload", scoped to window

      if (typeof sm2.onload === 'function') {
        _wDS('onload', 1);
        sm2.onload.apply(window);
        _wDS('onloadOK', 1);
      }

      if (sm2.waitForWindowLoad) {
        event.add(window, 'load', initUserOnload);
      }

    },1);

  };

  detectFlash = function() {

    // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt

    if (hasFlash !== _undefined) {
      // this work has already been done.
      return hasFlash;
    }

    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = window.ActiveXObject;

    if (nP && nP.length) {
      type = 'application/x-shockwave-flash';
      types = n.mimeTypes;
      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
        hasPlugin = true;
      }
    } else if (AX !== _undefined && !ua.match(/MSAppHost/i)) {
      // Windows 8 Store Apps (MSAppHost) are weird (compatibility?) and won't complain here, but will barf if Flash/ActiveX object is appended to the DOM.
      try {
        obj = new AX('ShockwaveFlash.ShockwaveFlash');
      } catch(e) {
        // oh well
        obj = null;
      }
      hasPlugin = (!!obj);
      // cleanup, because it is ActiveX after all
      obj = null;
    }

    hasFlash = hasPlugin;

    return hasPlugin;

  };

  featureCheck = function() {

    var flashNeeded,
        item,
        formats = sm2.audioFormats,
        // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (original iPad) + iOS4 works.
        isSpecial = (is_iDevice && !!(ua.match(/os (1|2|3_0|3_1)/i)));

    if (isSpecial) {

      // has Audio(), but is broken; let it load links directly.
      sm2.hasHTML5 = false;

      // ignore flash case, however
      sm2.html5Only = true;

      // hide the SWF, if present
      if (sm2.oMC) {
        sm2.oMC.style.display = 'none';
      }

    } else {

      if (sm2.useHTML5Audio) {

        if (!sm2.html5 || !sm2.html5.canPlayType) {
          sm2._wD('SoundManager: No HTML5 Audio() support detected.');
          sm2.hasHTML5 = false;
        }

        // <d>
        if (isBadSafari) {
          sm2._wD(smc + 'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - ' + (!hasFlash ?' would use flash fallback for MP3/MP4, but none detected.' : 'will use flash fallback for MP3/MP4, if available'), 1);
        }
        // </d>

      }

    }

    if (sm2.useHTML5Audio && sm2.hasHTML5) {

      // sort out whether flash is optional, required or can be ignored.

      // innocent until proven guilty.
      canIgnoreFlash = true;

      for (item in formats) {
        if (formats.hasOwnProperty(item)) {
          if (formats[item].required) {
            if (!sm2.html5.canPlayType(formats[item].type)) {
              // 100% HTML5 mode is not possible.
              canIgnoreFlash = false;
              flashNeeded = true;
            } else if (sm2.preferFlash && (sm2.flash[item] || sm2.flash[formats[item].type])) {
              // flash may be required, or preferred for this format.
              flashNeeded = true;
            }
          }
        }
      }

    }

    // sanity check...
    if (sm2.ignoreFlash) {
      flashNeeded = false;
      canIgnoreFlash = true;
    }

    sm2.html5Only = (sm2.hasHTML5 && sm2.useHTML5Audio && !flashNeeded);

    return (!sm2.html5Only);

  };

  parseURL = function(url) {

    /**
     * Internal: Finds and returns the first playable URL (or failing that, the first URL.)
     * @param {string or array} url A single URL string, OR, an array of URL strings or {url:'/path/to/resource', type:'audio/mp3'} objects.
     */

    var i, j, urlResult = 0, result;

    if (url instanceof Array) {

      // find the first good one
      for (i=0, j=url.length; i<j; i++) {

        if (url[i] instanceof Object) {
          // MIME check
          if (sm2.canPlayMIME(url[i].type)) {
            urlResult = i;
            break;
          }

        } else if (sm2.canPlayURL(url[i])) {
          // URL string check
          urlResult = i;
          break;
        }

      }

      // normalize to string
      if (url[urlResult].url) {
        url[urlResult] = url[urlResult].url;
      }

      result = url[urlResult];

    } else {

      // single URL case
      result = url;

    }

    return result;

  };


  startTimer = function(oSound) {

    /**
     * attach a timer to this sound, and start an interval if needed
     */

    if (!oSound._hasTimer) {

      oSound._hasTimer = true;

      if (!mobileHTML5 && sm2.html5PollingInterval) {

        if (h5IntervalTimer === null && h5TimerCount === 0) {

          h5IntervalTimer = setInterval(timerExecute, sm2.html5PollingInterval);

        }

        h5TimerCount++;

      }

    }

  };

  stopTimer = function(oSound) {

    /**
     * detach a timer
     */

    if (oSound._hasTimer) {

      oSound._hasTimer = false;

      if (!mobileHTML5 && sm2.html5PollingInterval) {

        // interval will stop itself at next execution.

        h5TimerCount--;

      }

    }

  };

  timerExecute = function() {

    /**
     * manual polling for HTML5 progress events, ie., whileplaying() (can achieve greater precision than conservative default HTML5 interval)
     */

    var i;

    if (h5IntervalTimer !== null && !h5TimerCount) {

      // no active timers, stop polling interval.

      clearInterval(h5IntervalTimer);

      h5IntervalTimer = null;

      return false;

    }

    // check all HTML5 sounds with timers

    for (i = sm2.soundIDs.length-1; i >= 0; i--) {

      if (sm2.sounds[sm2.soundIDs[i]].isHTML5 && sm2.sounds[sm2.soundIDs[i]]._hasTimer) {

        sm2.sounds[sm2.soundIDs[i]]._onTimer();

      }

    }

  };

  catchError = function(options) {

    options = (options !== _undefined ? options : {});

    if (typeof sm2.onerror === 'function') {
      sm2.onerror.apply(window, [{type:(options.type !== _undefined ? options.type : null)}]);
    }

    if (options.fatal !== _undefined && options.fatal) {
      sm2.disable();
    }

  };

  badSafariFix = function() {

    // special case: "bad" Safari (OS X 10.3 - 10.7) must fall back to flash for MP3/MP4
    if (!isBadSafari || !detectFlash()) {
      // doesn't apply
      return false;
    }

    var aF = sm2.audioFormats, i, item;

    for (item in aF) {
      if (aF.hasOwnProperty(item)) {
        if (item === 'mp3' || item === 'mp4') {
          sm2._wD(sm + ': Using flash fallback for ' + item + ' format');
          sm2.html5[item] = false;
          // assign result to related formats, too
          if (aF[item] && aF[item].related) {
            for (i = aF[item].related.length-1; i >= 0; i--) {
              sm2.html5[aF[item].related[i]] = false;
            }
          }
        }
      }
    }

  };

  /**
   * Pseudo-private flash/ExternalInterface methods
   * ----------------------------------------------
   */

  this._setSandboxType = function(sandboxType) {

    // <d>
    var sb = sm2.sandbox;

    sb.type = sandboxType;
    sb.description = sb.types[(sb.types[sandboxType] !== _undefined?sandboxType:'unknown')];

    if (sb.type === 'localWithFile') {

      sb.noRemote = true;
      sb.noLocal = false;
      _wDS('secNote', 2);

    } else if (sb.type === 'localWithNetwork') {

      sb.noRemote = false;
      sb.noLocal = true;

    } else if (sb.type === 'localTrusted') {

      sb.noRemote = false;
      sb.noLocal = false;

    }
    // </d>

  };

  this._externalInterfaceOK = function(swfVersion) {

    // flash callback confirming flash loaded, EI working etc.
    // swfVersion: SWF build string

    if (sm2.swfLoaded) {
      return false;
    }

    var e;

    debugTS('swf', true);
    debugTS('flashtojs', true);
    sm2.swfLoaded = true;
    tryInitOnFocus = false;

    if (isBadSafari) {
      badSafariFix();
    }

    // complain if JS + SWF build/version strings don't match, excluding +DEV builds
    // <d>
    if (!swfVersion || swfVersion.replace(/\+dev/i,'') !== sm2.versionNumber.replace(/\+dev/i, '')) {

      e = sm + ': Fatal: JavaScript file build "' + sm2.versionNumber + '" does not match Flash SWF build "' + swfVersion + '" at ' + sm2.url + '. Ensure both are up-to-date.';

      // escape flash -> JS stack so this error fires in window.
      setTimeout(function versionMismatch() {
        throw new Error(e);
      }, 0);

      // exit, init will fail with timeout
      return false;

    }
    // </d>

    // IE needs a larger timeout
    setTimeout(init, isIE ? 100 : 1);

  };

  /**
   * Private initialization helpers
   * ------------------------------
   */

  createMovie = function(smID, smURL) {

    if (didAppend && appendSuccess) {
      // ignore if already succeeded
      return false;
    }

    function initMsg() {

      // <d>

      var options = [],
          title,
          msg = [],
          delimiter = ' + ';

      title = 'SoundManager ' + sm2.version + (!sm2.html5Only && sm2.useHTML5Audio ? (sm2.hasHTML5 ? ' + HTML5 audio' : ', no HTML5 audio support') : '');

      if (!sm2.html5Only) {

        if (sm2.preferFlash) {
          options.push('preferFlash');
        }

        if (sm2.useHighPerformance) {
          options.push('useHighPerformance');
        }

        if (sm2.flashPollingInterval) {
          options.push('flashPollingInterval (' + sm2.flashPollingInterval + 'ms)');
        }

        if (sm2.html5PollingInterval) {
          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
        }

        if (sm2.wmode) {
          options.push('wmode (' + sm2.wmode + ')');
        }

        if (sm2.debugFlash) {
          options.push('debugFlash');
        }

        if (sm2.useFlashBlock) {
          options.push('flashBlock');
        }

      } else {

        if (sm2.html5PollingInterval) {
          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
        }

      }

      if (options.length) {
        msg = msg.concat([options.join(delimiter)]);
      }

      sm2._wD(title + (msg.length ? delimiter + msg.join(', ') : ''), 1);

      showSupport();

      // </d>

    }

    if (sm2.html5Only) {

      // 100% HTML5 mode
      setVersionInfo();

      initMsg();
      sm2.oMC = id(sm2.movieID);
      init();

      // prevent multiple init attempts
      didAppend = true;

      appendSuccess = true;

      return false;

    }

    // flash path
    var remoteURL = (smURL || sm2.url),
    localURL = (sm2.altURL || remoteURL),
    swfTitle = 'JS/Flash audio component (SoundManager 2)',
    oTarget = getDocument(),
    extraClass = getSWFCSS(),
    isRTL = null,
    html = doc.getElementsByTagName('html')[0],
    oEmbed, oMovie, tmp, movieHTML, oEl, s, x, sClass;

    isRTL = (html && html.dir && html.dir.match(/rtl/i));
    smID = (smID === _undefined?sm2.id:smID);

    function param(name, value) {
      return '<param name="'+name+'" value="'+value+'" />';
    }

    // safety check for legacy (change to Flash 9 URL)
    setVersionInfo();
    sm2.url = normalizeMovieURL(overHTTP?remoteURL:localURL);
    smURL = sm2.url;

    sm2.wmode = (!sm2.wmode && sm2.useHighPerformance ? 'transparent' : sm2.wmode);

    if (sm2.wmode !== null && (ua.match(/msie 8/i) || (!isIE && !sm2.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
      /**
       * extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
       * does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
       * wmode breaks IE 8 on Vista + Win7 too in some cases, as of January 2011 (?)
       */
       messages.push(strings.spcWmode);
      sm2.wmode = null;
    }

    oEmbed = {
      'name': smID,
      'id': smID,
      'src': smURL,
      'quality': 'high',
      'allowScriptAccess': sm2.allowScriptAccess,
      'bgcolor': sm2.bgColor,
      'pluginspage': http+'www.macromedia.com/go/getflashplayer',
      'title': swfTitle,
      'type': 'application/x-shockwave-flash',
      'wmode': sm2.wmode,
      // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
      'hasPriority': 'true'
    };

    if (sm2.debugFlash) {
      oEmbed.FlashVars = 'debug=1';
    }

    if (!sm2.wmode) {
      // don't write empty attribute
      delete oEmbed.wmode;
    }

    if (isIE) {

      // IE is "special".
      oMovie = doc.createElement('div');
      movieHTML = [
        '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" title="' + oEmbed.title +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + http+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
        param('movie', smURL),
        param('AllowScriptAccess', sm2.allowScriptAccess),
        param('quality', oEmbed.quality),
        (sm2.wmode? param('wmode', sm2.wmode): ''),
        param('bgcolor', sm2.bgColor),
        param('hasPriority', 'true'),
        (sm2.debugFlash ? param('FlashVars', oEmbed.FlashVars) : ''),
        '</object>'
      ].join('');

    } else {

      oMovie = doc.createElement('embed');
      for (tmp in oEmbed) {
        if (oEmbed.hasOwnProperty(tmp)) {
          oMovie.setAttribute(tmp, oEmbed[tmp]);
        }
      }

    }

    initDebug();
    extraClass = getSWFCSS();
    oTarget = getDocument();

    if (oTarget) {

      sm2.oMC = (id(sm2.movieID) || doc.createElement('div'));

      if (!sm2.oMC.id) {

        sm2.oMC.id = sm2.movieID;
        sm2.oMC.className = swfCSS.swfDefault + ' ' + extraClass;
        s = null;
        oEl = null;

        if (!sm2.useFlashBlock) {
          if (sm2.useHighPerformance) {
            // on-screen at all times
            s = {
              'position': 'fixed',
              'width': '8px',
              'height': '8px',
              // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
              'bottom': '0px',
              'left': '0px',
              'overflow': 'hidden'
            };
          } else {
            // hide off-screen, lower priority
            s = {
              'position': 'absolute',
              'width': '6px',
              'height': '6px',
              'top': '-9999px',
              'left': '-9999px'
            };
            if (isRTL) {
              s.left = Math.abs(parseInt(s.left,10))+'px';
            }
          }
        }

        if (isWebkit) {
          // soundcloud-reported render/crash fix, safari 5
          sm2.oMC.style.zIndex = 10000;
        }

        if (!sm2.debugFlash) {
          for (x in s) {
            if (s.hasOwnProperty(x)) {
              sm2.oMC.style[x] = s[x];
            }
          }
        }

        try {
          if (!isIE) {
            sm2.oMC.appendChild(oMovie);
          }
          oTarget.appendChild(sm2.oMC);
          if (isIE) {
            oEl = sm2.oMC.appendChild(doc.createElement('div'));
            oEl.className = swfCSS.swfBox;
            oEl.innerHTML = movieHTML;
          }
          appendSuccess = true;
        } catch(e) {
          throw new Error(str('domError')+' \n'+e.toString());
        }

      } else {

        // SM2 container is already in the document (eg. flashblock use case)
        sClass = sm2.oMC.className;
        sm2.oMC.className = (sClass?sClass+' ':swfCSS.swfDefault) + (extraClass?' '+extraClass:'');
        sm2.oMC.appendChild(oMovie);
        if (isIE) {
          oEl = sm2.oMC.appendChild(doc.createElement('div'));
          oEl.className = swfCSS.swfBox;
          oEl.innerHTML = movieHTML;
        }
        appendSuccess = true;

      }

    }

    didAppend = true;
    initMsg();
    // sm2._wD(sm + ': Trying to load ' + smURL + (!overHTTP && sm2.altURL ? ' (alternate URL)' : ''), 1);

    return true;

  };

  initMovie = function() {

    if (sm2.html5Only) {
      createMovie();
      return false;
    }

    // attempt to get, or create, movie (may already exist)
    if (flash) {
      return false;
    }

    if (!sm2.url) {

      /**
       * Something isn't right - we've reached init, but the soundManager url property has not been set.
       * User has not called setup({url: ...}), or has not set soundManager.url (legacy use case) directly before init time.
       * Notify and exit. If user calls setup() with a url: property, init will be restarted as in the deferred loading case.
       */

       _wDS('noURL');
       return false;

    }

    // inline markup case
    flash = sm2.getMovie(sm2.id);

    if (!flash) {
      if (!oRemoved) {
        // try to create
        createMovie(sm2.id, sm2.url);
      } else {
        // try to re-append removed movie after reboot()
        if (!isIE) {
          sm2.oMC.appendChild(oRemoved);
        } else {
          sm2.oMC.innerHTML = oRemovedHTML;
        }
        oRemoved = null;
        didAppend = true;
      }
      flash = sm2.getMovie(sm2.id);
    }

    if (typeof sm2.oninitmovie === 'function') {
      setTimeout(sm2.oninitmovie, 1);
    }

    // <d>
    flushMessages();
    // </d>

    return true;

  };

  delayWaitForEI = function() {

    setTimeout(waitForEI, 1000);

  };

  rebootIntoHTML5 = function() {

    // special case: try for a reboot with preferFlash: false, if 100% HTML5 mode is possible and useFlashBlock is not enabled.

    window.setTimeout(function() {

      complain(smc + 'useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...');

      sm2.setup({
        preferFlash: false
      }).reboot();

      // if for some reason you want to detect this case, use an ontimeout() callback and look for html5Only and didFlashBlock == true.
      sm2.didFlashBlock = true;

      sm2.beginDelayedInit();

    }, 1);

  };

  waitForEI = function() {

    var p,
        loadIncomplete = false;

    if (!sm2.url) {
      // No SWF url to load (noURL case) - exit for now. Will be retried when url is set.
      return false;
    }

    if (waitingForEI) {
      return false;
    }

    waitingForEI = true;
    event.remove(window, 'load', delayWaitForEI);

    if (hasFlash && tryInitOnFocus && !isFocused) {
      // Safari won't load flash in background tabs, only when focused.
      _wDS('waitFocus');
      return false;
    }

    if (!didInit) {
      p = sm2.getMoviePercent();
      if (p > 0 && p < 100) {
        loadIncomplete = true;
      }
    }

    setTimeout(function() {

      p = sm2.getMoviePercent();

      if (loadIncomplete) {
        // special case: if movie *partially* loaded, retry until it's 100% before assuming failure.
        waitingForEI = false;
        sm2._wD(str('waitSWF'));
        window.setTimeout(delayWaitForEI, 1);
        return false;
      }

      // <d>
      if (!didInit) {

        sm2._wD(sm + ': No Flash response within expected time. Likely causes: ' + (p === 0 ? 'SWF load failed, ':'') + 'Flash blocked or JS-Flash security error.' + (sm2.debugFlash?' ' + str('checkSWF'):''), 2);

        if (!overHTTP && p) {

          _wDS('localFail', 2);

          if (!sm2.debugFlash) {
            _wDS('tryDebug', 2);
          }

        }

        if (p === 0) {

          // if 0 (not null), probably a 404.
          sm2._wD(str('swf404', sm2.url), 1);

        }

        debugTS('flashtojs', false, ': Timed out' + overHTTP?' (Check flash security or flash blockers)':' (No plugin/missing SWF?)');

      }
      // </d>

      // give up / time-out, depending

      if (!didInit && okToDisable) {

        if (p === null) {

          // SWF failed to report load progress. Possibly blocked.

          if (sm2.useFlashBlock || sm2.flashLoadTimeout === 0) {

            if (sm2.useFlashBlock) {

              flashBlockHandler();

            }

            _wDS('waitForever');

          } else {

            // no custom flash block handling, but SWF has timed out. Will recover if user unblocks / allows SWF load.

            if (!sm2.useFlashBlock && canIgnoreFlash) {

              rebootIntoHTML5();

            } else {

              _wDS('waitForever');

              // fire any regular registered ontimeout() listeners.
              processOnEvents({type:'ontimeout', ignoreInit: true, error: {type: 'INIT_FLASHBLOCK'}});

            }

          }

        } else {

          // SWF loaded? Shouldn't be a blocking issue, then.

          if (sm2.flashLoadTimeout === 0) {

            _wDS('waitForever');

          } else {

            if (!sm2.useFlashBlock && canIgnoreFlash) {

              rebootIntoHTML5();

            } else {

              failSafely(true);

            }

          }

        }

      }

    }, sm2.flashLoadTimeout);

  };

  handleFocus = function() {

    function cleanup() {
      event.remove(window, 'focus', handleFocus);
    }

    if (isFocused || !tryInitOnFocus) {
      // already focused, or not special Safari background tab case
      cleanup();
      return true;
    }

    okToDisable = true;
    isFocused = true;
    _wDS('gotFocus');

    // allow init to restart
    waitingForEI = false;

    // kick off ExternalInterface timeout, now that the SWF has started
    delayWaitForEI();

    cleanup();
    return true;

  };

  flushMessages = function() {

    // <d>

    // SM2 pre-init debug messages
    if (messages.length) {
      sm2._wD('SoundManager 2: ' + messages.join(' '), 1);
      messages = [];
    }

    // </d>

  };

  showSupport = function() {

    // <d>

    flushMessages();

    var item, tests = [];

    if (sm2.useHTML5Audio && sm2.hasHTML5) {
      for (item in sm2.audioFormats) {
        if (sm2.audioFormats.hasOwnProperty(item)) {
          tests.push(item + ' = ' + sm2.html5[item] + (!sm2.html5[item] && needsFlash && sm2.flash[item] ? ' (using flash)' : (sm2.preferFlash && sm2.flash[item] && needsFlash ? ' (preferring flash)': (!sm2.html5[item] ? ' (' + (sm2.audioFormats[item].required ? 'required, ':'') + 'and no flash support)' : ''))));
        }
      }
      sm2._wD('SoundManager 2 HTML5 support: ' + tests.join(', '), 1);
    }

    // </d>

  };

  initComplete = function(bNoDisable) {

    if (didInit) {
      return false;
    }

    if (sm2.html5Only) {
      // all good.
      _wDS('sm2Loaded');
      didInit = true;
      initUserOnload();
      debugTS('onload', true);
      return true;
    }

    var wasTimeout = (sm2.useFlashBlock && sm2.flashLoadTimeout && !sm2.getMoviePercent()),
        result = true,
        error;

    if (!wasTimeout) {
      didInit = true;
    }

    error = {type: (!hasFlash && needsFlash ? 'NO_FLASH' : 'INIT_TIMEOUT')};

    sm2._wD('SoundManager 2 ' + (disabled ? 'failed to load' : 'loaded') + ' (' + (disabled ? 'Flash security/load error' : 'OK') + ')', disabled ? 2: 1);

    if (disabled || bNoDisable) {
      if (sm2.useFlashBlock && sm2.oMC) {
        sm2.oMC.className = getSWFCSS() + ' ' + (sm2.getMoviePercent() === null?swfCSS.swfTimedout:swfCSS.swfError);
      }
      processOnEvents({type:'ontimeout', error:error, ignoreInit: true});
      debugTS('onload', false);
      catchError(error);
      result = false;
    } else {
      debugTS('onload', true);
    }

    if (!disabled) {
      if (sm2.waitForWindowLoad && !windowLoaded) {
        _wDS('waitOnload');
        event.add(window, 'load', initUserOnload);
      } else {
        // <d>
        if (sm2.waitForWindowLoad && windowLoaded) {
          _wDS('docLoaded');
        }
        // </d>
        initUserOnload();
      }
    }

    return result;

  };

  /**
   * apply top-level setupOptions object as local properties, eg., this.setupOptions.flashVersion -> this.flashVersion (soundManager.flashVersion)
   * this maintains backward compatibility, and allows properties to be defined separately for use by soundManager.setup().
   */

  setProperties = function() {

    var i,
        o = sm2.setupOptions;

    for (i in o) {

      if (o.hasOwnProperty(i)) {

        // assign local property if not already defined

        if (sm2[i] === _undefined) {

          sm2[i] = o[i];

        } else if (sm2[i] !== o[i]) {

          // legacy support: write manually-assigned property (eg., soundManager.url) back to setupOptions to keep things in sync
          sm2.setupOptions[i] = sm2[i];

        }

      }

    }

  };


  init = function() {

    // called after onload()

    if (didInit) {
      _wDS('didInit');
      return false;
    }

    function cleanup() {
      event.remove(window, 'load', sm2.beginDelayedInit);
    }

    if (sm2.html5Only) {
      if (!didInit) {
        // we don't need no steenking flash!
        cleanup();
        sm2.enabled = true;
        initComplete();
      }
      return true;
    }

    // flash path
    initMovie();

    try {

      // attempt to talk to Flash
      flash._externalInterfaceTest(false);

      // apply user-specified polling interval, OR, if "high performance" set, faster vs. default polling
      // (determines frequency of whileloading/whileplaying callbacks, effectively driving UI framerates)
      setPolling(true, (sm2.flashPollingInterval || (sm2.useHighPerformance ? 10 : 50)));

      if (!sm2.debugMode) {
        // stop the SWF from making debug output calls to JS
        flash._disableDebug();
      }

      sm2.enabled = true;
      debugTS('jstoflash', true);

      if (!sm2.html5Only) {
        // prevent browser from showing cached page state (or rather, restoring "suspended" page state) via back button, because flash may be dead
        // http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
        event.add(window, 'unload', doNothing);
      }

    } catch(e) {

      sm2._wD('js/flash exception: ' + e.toString());
      debugTS('jstoflash', false);
      catchError({type:'JS_TO_FLASH_EXCEPTION', fatal:true});
      // don't disable, for reboot()
      failSafely(true);
      initComplete();

      return false;

    }

    initComplete();

    // disconnect events
    cleanup();

    return true;

  };

  domContentLoaded = function() {

    if (didDCLoaded) {
      return false;
    }

    didDCLoaded = true;

    // assign top-level soundManager properties eg. soundManager.url
    setProperties();

    initDebug();

    /**
     * Temporary feature: allow force of HTML5 via URL params: sm2-usehtml5audio=0 or 1
     * Ditto for sm2-preferFlash, too.
     */
    // <d>
    (function(){

      var a = 'sm2-usehtml5audio=',
          a2 = 'sm2-preferflash=',
          b = null,
          b2 = null,
          l = wl.toLowerCase();

      if (l.indexOf(a) !== -1) {
        b = (l.charAt(l.indexOf(a)+a.length) === '1');
        if (hasConsole) {
          console.log((b?'Enabling ':'Disabling ')+'useHTML5Audio via URL parameter');
        }
        sm2.setup({
          'useHTML5Audio': b
        });
      }

      if (l.indexOf(a2) !== -1) {
        b2 = (l.charAt(l.indexOf(a2)+a2.length) === '1');
        if (hasConsole) {
          console.log((b2?'Enabling ':'Disabling ')+'preferFlash via URL parameter');
        }
        sm2.setup({
          'preferFlash': b2
        });
      }

    }());
    // </d>

    if (!hasFlash && sm2.hasHTML5) {
      sm2._wD('SoundManager 2: No Flash detected' + (!sm2.useHTML5Audio ? ', enabling HTML5.' : '. Trying HTML5-only mode.'), 1);
      sm2.setup({
        'useHTML5Audio': true,
        // make sure we aren't preferring flash, either
        // TODO: preferFlash should not matter if flash is not installed. Currently, stuff breaks without the below tweak.
        'preferFlash': false
      });
    }

    testHTML5();

    if (!hasFlash && needsFlash) {
      messages.push(strings.needFlash);
      // TODO: Fatal here vs. timeout approach, etc.
      // hack: fail sooner.
      sm2.setup({
        'flashLoadTimeout': 1
      });
    }

    if (doc.removeEventListener) {
      doc.removeEventListener('DOMContentLoaded', domContentLoaded, false);
    }

    initMovie();

    return true;

  };

  domContentLoadedIE = function() {

    if (doc.readyState === 'complete') {
      domContentLoaded();
      doc.detachEvent('onreadystatechange', domContentLoadedIE);
    }

    return true;

  };

  winOnLoad = function() {

    // catch edge case of initComplete() firing after window.load()
    windowLoaded = true;
    event.remove(window, 'load', winOnLoad);

  };

  /**
   * miscellaneous run-time, pre-init stuff
   */

  preInit = function() {

    if (mobileHTML5) {

      // prefer HTML5 for mobile + tablet-like devices, probably more reliable vs. flash at this point.

      // <d>
      if (!sm2.setupOptions.useHTML5Audio || sm2.setupOptions.preferFlash) {
        // notify that defaults are being changed.
        messages.push(strings.mobileUA);
      }
      // </d>

      sm2.setupOptions.useHTML5Audio = true;
      sm2.setupOptions.preferFlash = false;

      if (is_iDevice || (isAndroid && !ua.match(/android\s2\.3/i))) {
        // iOS and Android devices tend to work better with a single audio instance, specifically for chained playback of sounds in sequence.
        // common use case: exiting sound onfinish() -> createSound() -> play()
        // <d>
        messages.push(strings.globalHTML5);
        // </d>
        if (is_iDevice) {
          sm2.ignoreFlash = true;
        }
        useGlobalHTML5Audio = true;
      }

    }

  };

  preInit();

  // sniff up-front
  detectFlash();

  // focus and window load, init (primarily flash-driven)
  event.add(window, 'focus', handleFocus);
  event.add(window, 'load', delayWaitForEI);
  event.add(window, 'load', winOnLoad);

  if (doc.addEventListener) {

    doc.addEventListener('DOMContentLoaded', domContentLoaded, false);

  } else if (doc.attachEvent) {

    doc.attachEvent('onreadystatechange', domContentLoadedIE);

  } else {

    // no add/attachevent support - safe to assume no JS -> Flash either
    debugTS('onload', false);
    catchError({type:'NO_DOM2_EVENTS', fatal:true});

  }

} // SoundManager()

// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading

if (window.SM2_DEFER === undefined || !SM2_DEFER) {
  soundManager = new SoundManager();
}

/**
 * SoundManager public interfaces
 * ------------------------------
 */

window.SoundManager = SoundManager; // constructor
window.soundManager = soundManager; // public API, flash callbacks etc.

}(window));
;/*
 * jQuery Sound Manager Plugin
 * http://github.com/adriengibrat/jQuery-SoundManager
 *
 * Copyright (c) 2009 Adrien Gibrat
 * Dual licensed under the MIT and GPL licenses.
 * http://opensource.org/licenses/mit-license.php
 */
( function( $, sm ) {
	$.playable = $.extend( function( url, settings ) {
		if ( typeof url == 'object' && url.url ) { // Allow to pass all settings including URL in one single object
			settings = url;
			url = url.url;
			delete settings.url;
		}
		$.each( $.extend( true, $.playable.settings, settings || {}, {
			url : url, // Set Flash url
			debugMode : window.location.hash.match(/^#debug/i), // Activate Debugging with hash (#debug)
			consoleOnly : window.location.hash.match(/console$/i) // Debug in console only (#debugconsole)
		} ), function( key, value ) { // Parse settings to isolate SoundManager properties
			if ( $.inArray( key, $.playable.properties ) > 0 )
				sm[key] = ( key == 'flash9Options' || key == 'movieStarOptions' ) ? $.extend( sm[key], value ) : value;
			else 
				sm.defaultOptions[key] = value;
		} );
		$.each( $.playable.events, function( i, event ) { // Set Events Handler as element custom Handler
			sm.defaultOptions[event] = function() {
				$('#'+this.options.element).triggerHandler( event, this );
			};
		} );
	}, {
		settings : {
			autoStart : false,
			pauseOnly : false,
			playNext : true,
			loopNext : true,
			playAlone : true,
			doUnload : false,
			useFlashBlock : true
		},
		count : 0,
		current : null,
		searching : null,
		css : {
			playable: 'playable',
			loading : 'loading',
			playing : 'playing',
			paused : 'paused'
		},
		methods : ['play','stop','pause','resume','togglePause','mute','unmute','unload','setPosition','setVolume','setPan'],
		events : ['onload', 'onplay', 'onpause', 'onresume', 'onstop', 'onfinish'],
		properties :['allowPolling','allowScriptAccess','altURL','consoleOnly','debugFlash','debugMode','defaultOptions','flash9Options','features','flashLoadTimeout','flashVersion','movieStarOptions','nullURL','url','useConsole','useFastPolling','flashPollingInterval','useFlashBlock','useHighPerformance','useHTML5Audio','useMovieStar','wmode','waitForWindowLoad'],
		init : function( options, playlist ) {
			var options = $.extend( true, {playlist: playlist}, sm.defaultOptions, options ),
				self = $( this );
			if(self.data( 'playable')) // ensure to avoid multiple init
				return;
			self.addClass( $.playable.css.playable )
			.data( 'playable', sm.createSound( $.extend( options, {
				id : 'playable' + $.playable.count++,
				url : this.href,
				element : self.attr('id')
			} ) ) )
			.click( function( event ) {
				event.preventDefault();
				self.data( 'playable' ).togglePause();
				return false;
			} )
			.bind( 'onload.playable', function( event, sound ) {
				if ( sound.readyState == 2 )
					$.playable.next();
			} )
			.bind( 'onplay.playable', function() {
				if ( options.playAlone && $.playable.current && $.playable.current != self ) {
					current = $.playable.current.data( 'playable' );
					current && current[ options.pauseOnly ? 'pause' : 'stop' ]();
				}
				$.playable.current = self.focus();
			} )
			.bind( 'onresume.playable', function( event, sound ) {
				self.triggerHandler( 'onplay', sound );
			} )
			.bind( 'onstop.playable', function( event, sound ) {
				if ( options.doUnload )
					sound.unload();
			} )
			.bind( 'onfinish.playable', function( event, sound ) {
				self.triggerHandler( 'onstop', sound );
				if ( options.playNext )
					$.playable.next();
			} );
			$.each( $.playable.ui, function( i, ui ) { // Bind UIs
				ui.call( self, options );
			} );
		},
		ui : {
			basic : function() {
				var self = this
				.bind( 'onload.playable', function(){
					self.removeClass( $.playable.css.loading );
				} )
				.bind( 'onplay.playable', function(){
					self.removeClass( $.playable.css.paused ).addClass( $.playable.css.playing );
					if ( self.data( 'playable' ).readyState == 1 )
						self.addClass( $.playable.css.loading );
				} )
				.bind( 'onpause.playable', function(){
					if ( ! $.playable.searching )
						self.removeClass( $.playable.css.playing ).addClass( $.playable.css.paused );
				} )
				.bind( 'onstop.playable', function(){
					self.removeClass( [$.playable.css.playing, $.playable.css.loading, $.playable.css.paused].join(' ') );
				} );
			}
		},
		next : function( move ) {
			if ( ! this.current )
				return;
			var options  = this.current.data( 'playable' ).options,
				playlist = $( options.playlist ),
				songs    = playlist.is( 'a.playable' ) ? playlist : playlist.find( 'a.playable' ),
				move     = move || 1,
				next     = songs.eq( songs.index( $('#'+options.element) ) + move ).data( 'playable' );
			if ( ! next && options.loopNext )
				next = songs.eq( 0 ).data( 'playable' );
			if ( next && ! next.playState )
				next.play();
		}
	} );
	$.fn.playable = function( options ) {
		var playlist	= this.selector,
			songs		= this.is( 'a[href]' ) ? this : this.find( 'a[href]' ),
			options		= options || {};
		if ( typeof options == 'string' && $.inArray( options, $.playable.methods ) != -1 ) {
			var args = $.makeArray( arguments ).slice( 1 );
			songs.filter('.playable').each( function() {
				var sound = $( this ).data( 'playable' );
				sound && sound[options].apply( sound, args );
			} );
		} else {
			init = function(){
				songs.each(function(){
					if (sm.canPlayURL(this.href)) 
						$.playable.init.call(this, options, playlist);
				});
				if (options && options.autoStart) 
					songs.filter(':first').click();
			};
			sm.enabled ? init() : sm.onready(init);
		}
		return this;
	};
} )( jQuery, soundManager );;/**
 * Simple YouTube drop plugin.
 * 
 * Myrousz 2014
 *
 * MIT license.
 */
$.fn.youTubeDrop = function (settings) {
    $.event.props.push('dataTransfer');

    settings = $.extend({
        // css: 'dropzone'
    }, settings);

    var afterDrop = settings.dropped || $.noop

    function cancel(e) {
      if (e.preventDefault) e.preventDefault(); // required by FF + Safari
      return false; // required by IE
    }   

    function drop(e) {
        e.preventDefault();
        var found = false;
        var types = e.dataTransfer.types
        for(var i=0;i<types.length; i++) {
            if(types[i] == "text/uri-list") {
                found = true;
                break;
            }
        }
        var out = ""
        var videoId = null
        if(!found) {
            // not a link...
            out = "Not a link"
        } else {
            var url = e.dataTransfer.getData("Text")
            // check if it is youtube link...
            var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid != null) {
                videoId = videoid[1]
                var thumbUrl = "http://i3.ytimg.com/vi/"+videoId+"/default.jpg"
                //var bigThumbUrl = "http://i3.ytimg.com/vi/"+videoid[1]+"/0.jpg"
                out = $('<img src="'+thumbUrl+'" />')
            } else { 
               out = "Not youtube url.";
            }
        }
        $(this).html(out)
        if(videoId) afterDrop(videoId)
        return false;
      }

    return this.each(
        function() {
            var $this = $(this);
            $this
                .bind('drop', drop)
                .bind('dragover', cancel)
                .bind('dragenter', cancel)
                .bind('dragleave', cancel);
        }
    );
};
;/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( jQuery, undefined ){
	var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

	function newTmplItem( options, parentItem, fn, data ) {
		// Returns a template item data structure for a new rendered instance of a template (a 'template item').
		// The content field is a hierarchical array of strings and nested items (to be
		// removed and replaced by nodes field of dom elements, once inserted in DOM).
		var newItem = {
			data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
			_wrap: parentItem ? parentItem._wrap : null,
			tmpl: null,
			parent: parentItem || null,
			nodes: [],
			calls: tiCalls,
			nest: tiNest,
			wrap: tiWrap,
			html: tiHtml,
			update: tiUpdate
		};
		if ( options ) {
			jQuery.extend( newItem, options, { nodes: [], parent: parentItem });
		}
		if ( fn ) {
			// Build the hierarchical content to be used during insertion into DOM
			newItem.tmpl = fn;
			newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
			newItem.key = ++itemKey;
			// Keep track of new template item, until it is stored as jQuery Data on DOM element
			(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
		}
		return newItem;
	}

	// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

			appendToTmplItems = newTmplItems || {};
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				ret = this;
			} else {
				for ( i = 0, l = insert.length; i < l; i++ ) {
					cloneIndex = i;
					elems = (i > 0 ? this.clone(true) : this).get();
					jQuery( insert[i] )[ original ]( elems );
					ret = ret.concat( elems );
				}
				cloneIndex = 0;
				ret = this.pushStack( ret, name, insert.selector );
			}
			tmplItems = appendToTmplItems;
			appendToTmplItems = null;
			jQuery.tmpl.complete( tmplItems );
			return ret;
		};
	});

	jQuery.fn.extend({
		// Use first wrapped element as template markup.
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( data, options, parentItem ) {
			return jQuery.tmpl( this[0], data, options, parentItem );
		},

		// Find which rendered template item the first wrapped DOM element belongs to
		tmplItem: function() {
			return jQuery.tmplItem( this[0] );
		},

		// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
		template: function( name ) {
			return jQuery.template( name, this[0] );
		},

		domManip: function( args, table, callback, options ) {
			if ( args[0] && jQuery.isArray( args[0] )) {
				var dmArgs = jQuery.makeArray( arguments ), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
				while ( i < elemsLength && !(tmplItem = jQuery.data( elems[i++], "tmplItem" ))) {}
				if ( tmplItem && cloneIndex ) {
					dmArgs[2] = function( fragClone ) {
						// Handler called by oldManip when rendered template has been inserted into DOM.
						jQuery.tmpl.afterManip( this, fragClone, callback );
					};
				}
				oldManip.apply( this, dmArgs );
			} else {
				oldManip.apply( this, arguments );
			}
			cloneIndex = 0;
			if ( !appendToTmplItems ) {
				jQuery.tmpl.complete( newTmplItems );
			}
			return this;
		}
	});

	jQuery.extend({
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( tmpl, data, options, parentItem ) {
			var ret, topLevel = !parentItem;
			if ( topLevel ) {
				// This is a top-level tmpl call (not from a nested template using {{tmpl}})
				parentItem = topTmplItem;
				tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
				wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
			} else if ( !tmpl ) {
				// The template item is already associated with DOM - this is a refresh.
				// Re-evaluate rendered template for the parentItem
				tmpl = parentItem.tmpl;
				newTmplItems[parentItem.key] = parentItem;
				parentItem.nodes = [];
				if ( parentItem.wrapped ) {
					updateWrapped( parentItem, parentItem.wrapped );
				}
				// Rebuild, without creating a new template item
				return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
			}
			if ( !tmpl ) {
				return []; // Could throw...
			}
			if ( typeof data === "function" ) {
				data = data.call( parentItem || {} );
			}
			if ( options && options.wrapped ) {
				updateWrapped( options, options.wrapped );
			}
			ret = jQuery.isArray( data ) ?
				jQuery.map( data, function( dataItem ) {
					return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
				}) :
				[ newTmplItem( options, parentItem, tmpl, data ) ];
			return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
		},

		// Return rendered template item for an element.
		tmplItem: function( elem ) {
			var tmplItem;
			if ( elem instanceof jQuery ) {
				elem = elem[0];
			}
			while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
			return tmplItem || topTmplItem;
		},

		// Set:
		// Use $.template( name, tmpl ) to cache a named template,
		// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
		// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

		// Get:
		// Use $.template( name ) to access a cached template.
		// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
		// will return the compiled template, without adding a name reference.
		// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
		// to $.template( null, templateString )
		template: function( name, tmpl ) {
			if (tmpl) {
				// Compile template and associate with name
				if ( typeof tmpl === "string" ) {
					// This is an HTML string being passed directly in.
					tmpl = buildTmplFn( tmpl );
				} else if ( tmpl instanceof jQuery ) {
					tmpl = tmpl[0] || {};
				}
				if ( tmpl.nodeType ) {
					// If this is a template block, use cached copy, or generate tmpl function and cache.
					tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
					// Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
					// This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
					// To correct this, include space in tag: foo="${ x }" -> foo="value of x"
				}
				return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
			}
			// Return named compiled template
			return name ? (typeof name !== "string" ? jQuery.template( null, name ):
				(jQuery.template[name] ||
					// If not in map, and not containing at least on HTML tag, treat as a selector.
					// (If integrated with core, use quickExpr.exec)
					jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null;
		},

		encode: function( text ) {
			// Do HTML encoding replacing < > & and ' and " by corresponding entities.
			return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		}
	});

	jQuery.extend( jQuery.tmpl, {
		tag: {
			"tmpl": {
				_default: { $2: "null" },
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
				// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
				// This means that {{tmpl foo}} treats foo as a template (which IS a function).
				// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
			},
			"wrap": {
				_default: { $2: "null" },
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			"each": {
				_default: { $2: "$index, $value" },
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: { $1: "true" },
				open: "}else if(($notnull_1) && $1a){"
			},
			"html": {
				// Unecoded expression evaluation.
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				// Encoded expression evaluation. Abbreviated form is ${}.
				_default: { $1: "$data" },
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				// Comment tag. Skipped by parser
				open: ""
			}
		},

		// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
		complete: function( items ) {
			newTmplItems = {};
		},

		// Call this from code which overrides domManip, or equivalent
		// Manage cloning/storing template items etc.
		afterManip: function afterManip( elem, fragClone, callback ) {
			// Provides cloned fragment ready for fixup prior to and after insertion into DOM
			var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

			// Return fragment to original caller (e.g. append) for DOM insertion
			callback.call( elem, fragClone );

			// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
			storeTmplItems( content );
			cloneIndex++;
		}
	});

	//========================== Private helper functions, used by code above ==========================

	function build( tmplItem, nested, content ) {
		// Convert hierarchical content into flat string array
		// and finally return array of fragments ready for DOM insertion
		var frag, ret = content ? jQuery.map( content, function( item ) {
			return (typeof item === "string") ?
				// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
				// This is a child template item. Build nested template.
				build( item, tmplItem, item._ctnt );
		}) :
		// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
		tmplItem;
		if ( nested ) {
			return ret;
		}

		// top-level template
		ret = ret.join("");

		// Support templates which have initial or final text nodes, or consist only of text
		// Also support HTML entities within the HTML markup.
		ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
			frag = jQuery( middle ).get();

			storeTmplItems( frag );
			if ( before ) {
				frag = unencode( before ).concat(frag);
			}
			if ( after ) {
				frag = frag.concat(unencode( after ));
			}
		});
		return frag ? frag : unencode( ret );
	}

	function unencode( text ) {
		// Use createElement, since createTextNode will not render HTML entities correctly
		var el = document.createElement( "div" );
		el.innerHTML = text;
		return jQuery.makeArray(el.childNodes);
	}

	// Generate a reusable function that will serve to render a template against data
	function buildTmplFn( markup ) {
		return new Function("jQuery","$item",
			// Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
			"var $=jQuery,call,__=[],$data=$item.data;" +

			// Introduce the data as local variables using with(){}
			"with($data){__.push('" +

			// Convert the template into pure JavaScript
			jQuery.trim(markup)
				.replace( /([\\'])/g, "\\$1" )
				.replace( /[\r\t\n]/g, " " )
				.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
				.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function( all, slash, type, fnargs, target, parens, args ) {
					var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
					if ( !tag ) {
						throw "Unknown template tag: " + type;
					}
					def = tag._default || [];
					if ( parens && !/\w$/.test(target)) {
						target += parens;
						parens = "";
					}
					if ( target ) {
						target = unescape( target );
						args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
						// Support for target being things like a.toLowerCase();
						// In that case don't call with template item as 'this' pointer. Just evaluate...
						expr = parens ? (target.indexOf(".") > -1 ? target + unescape( parens ) : ("(" + target + ").call($item" + args)) : target;
						exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
					} else {
						exprAutoFnDetect = expr = def.$1 || "null";
					}
					fnargs = unescape( fnargs );
					return "');" +
						tag[ slash ? "close" : "open" ]
							.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
							.split( "$1a" ).join( exprAutoFnDetect )
							.split( "$1" ).join( expr )
							.split( "$2" ).join( fnargs || def.$2 || "" ) +
						"__.push('";
				}) +
			"');}return __;"
		);
	}
	function updateWrapped( options, wrapped ) {
		// Build the wrapped content.
		options._wrap = build( options, true,
			// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
		).join("");
	}

	function unescape( args ) {
		return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
	}
	function outerHtml( elem ) {
		var div = document.createElement("div");
		div.appendChild( elem.cloneNode(true) );
		return div.innerHTML;
	}

	// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
	function storeTmplItems( content ) {
		var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
		for ( i = 0, l = content.length; i < l; i++ ) {
			if ( (elem = content[i]).nodeType !== 1 ) {
				continue;
			}
			elems = elem.getElementsByTagName("*");
			for ( m = elems.length - 1; m >= 0; m-- ) {
				processItemKey( elems[m] );
			}
			processItemKey( elem );
		}
		function processItemKey( el ) {
			var pntKey, pntNode = el, pntItem, tmplItem, key;
			// Ensure that each rendered template inserted into the DOM has its own template item,
			if ( (key = el.getAttribute( tmplItmAtt ))) {
				while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
				if ( pntKey !== key ) {
					// The next ancestor with a _tmplitem expando is on a different key than this one.
					// So this is a top-level element within this template item
					// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
					pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
					if ( !(tmplItem = newTmplItems[key]) ) {
						// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
						tmplItem = wrappedItems[key];
						tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode] );
						tmplItem.key = ++itemKey;
						newTmplItems[itemKey] = tmplItem;
					}
					if ( cloneIndex ) {
						cloneTmplItem( key );
					}
				}
				el.removeAttribute( tmplItmAtt );
			} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
				// This was a rendered element, cloned during append or appendTo etc.
				// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
				cloneTmplItem( tmplItem.key );
				newTmplItems[tmplItem.key] = tmplItem;
				pntNode = jQuery.data( el.parentNode, "tmplItem" );
				pntNode = pntNode ? pntNode.key : 0;
			}
			if ( tmplItem ) {
				pntItem = tmplItem;
				// Find the template item of the parent element.
				// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
				while ( pntItem && pntItem.key != pntNode ) {
					// Add this element as a top-level node for this rendered template item, as well as for any
					// ancestor items between this item and the item of its parent element
					pntItem.nodes.push( el );
					pntItem = pntItem.parent;
				}
				// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
				delete tmplItem._ctnt;
				delete tmplItem._wrap;
				// Store template item as jQuery data on the element
				jQuery.data( el, "tmplItem", tmplItem );
			}
			function cloneTmplItem( key ) {
				key = key + keySuffix;
				tmplItem = newClonedItems[key] =
					(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent ));
			}
		}
	}

	//---- Helper functions for template item ----

	function tiCalls( content, tmpl, data, options ) {
		if ( !content ) {
			return stack.pop();
		}
		stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
	}

	function tiNest( tmpl, data, options ) {
		// nested template, using {{tmpl}} tag
		return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
	}

	function tiWrap( call, wrapped ) {
		// nested template, using {{wrap}} tag
		var options = call.options || {};
		options.wrapped = wrapped;
		// Apply the template, which may incorporate wrapped content,
		return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
	}

	function tiHtml( filter, textOnly ) {
		var wrapped = this._wrap;
		return jQuery.map(
			jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
			function(e) {
				return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
	}

	function tiUpdate() {
		var coll = this.nodes;
		jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
		jQuery( coll ).remove();
	}
})( jQuery );
;/*! 
 * jquery.event.drag - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
// Created: 2008-06-04 
// Updated: 2012-05-21
// REQUIRES: jquery 1.7.x

;(function( $ ){

// add the jquery instance method
$.fn.drag = function( str, arg, opts ){
	// figure out the event type
	var type = typeof str == "string" ? str : "",
	// figure out the event handler...
	fn = $.isFunction( str ) ? str : $.isFunction( arg ) ? arg : null;
	// fix the event type
	if ( type.indexOf("drag") !== 0 ) 
		type = "drag"+ type;
	// were options passed
	opts = ( str == fn ? arg : opts ) || {};
	// trigger or bind event handler
	return fn ? this.bind( type, opts, fn ) : this.trigger( type );
};

// local refs (increase compression)
var $event = $.event, 
$special = $event.special,
// configure the drag special event 
drag = $special.drag = {
	
	// these are the default settings
	defaults: {
		which: 1, // mouse button pressed to start drag sequence
		distance: 0, // distance dragged before dragstart
		not: ':input', // selector to suppress dragging on target elements
		handle: null, // selector to match handle target elements
		relative: false, // true to use "position", false to use "offset"
		drop: true, // false to suppress drop events, true or selector to allow
		click: false // false to suppress click events after dragend (no proxy)
	},
	
	// the key name for stored drag data
	datakey: "dragdata",
	
	// prevent bubbling for better performance
	noBubble: true,
	
	// count bound related events
	add: function( obj ){ 
		// read the interaction data
		var data = $.data( this, drag.datakey ),
		// read any passed options 
		opts = obj.data || {};
		// count another realted event
		data.related += 1;
		// extend data options bound with this event
		// don't iterate "opts" in case it is a node 
		$.each( drag.defaults, function( key, def ){
			if ( opts[ key ] !== undefined )
				data[ key ] = opts[ key ];
		});
	},
	
	// forget unbound related events
	remove: function(){
		$.data( this, drag.datakey ).related -= 1;
	},
	
	// configure interaction, capture settings
	setup: function(){
		// check for related events
		if ( $.data( this, drag.datakey ) ) 
			return;
		// initialize the drag data with copied defaults
		var data = $.extend({ related:0 }, drag.defaults );
		// store the interaction data
		$.data( this, drag.datakey, data );
		// bind the mousedown event, which starts drag interactions
		$event.add( this, "touchstart mousedown", drag.init, data );
		// prevent image dragging in IE...
		if ( this.attachEvent ) 
			this.attachEvent("ondragstart", drag.dontstart ); 
	},
	
	// destroy configured interaction
	teardown: function(){
		var data = $.data( this, drag.datakey ) || {};
		// check for related events
		if ( data.related ) 
			return;
		// remove the stored data
		$.removeData( this, drag.datakey );
		// remove the mousedown event
		$event.remove( this, "touchstart mousedown", drag.init );
		// enable text selection
		drag.textselect( true ); 
		// un-prevent image dragging in IE...
		if ( this.detachEvent ) 
			this.detachEvent("ondragstart", drag.dontstart ); 
	},
		
	// initialize the interaction
	init: function( event ){ 
		// sorry, only one touch at a time
		if ( drag.touched ) 
			return;
		// the drag/drop interaction data
		var dd = event.data, results;
		// check the which directive
		if ( event.which != 0 && dd.which > 0 && event.which != dd.which ) 
			return; 
		// check for suppressed selector
		if ( $( event.target ).is( dd.not ) ) 
			return;
		// check for handle selector
		if ( dd.handle && !$( event.target ).closest( dd.handle, event.currentTarget ).length ) 
			return;

		drag.touched = event.type == 'touchstart' ? this : null;
		dd.propagates = 1;
		dd.mousedown = this;
		dd.interactions = [ drag.interaction( this, dd ) ];
		dd.target = event.target;
		dd.pageX = event.pageX;
		dd.pageY = event.pageY;
		dd.dragging = null;
		// handle draginit event... 
		results = drag.hijack( event, "draginit", dd );
		// early cancel
		if ( !dd.propagates )
			return;
		// flatten the result set
		results = drag.flatten( results );
		// insert new interaction elements
		if ( results && results.length ){
			dd.interactions = [];
			$.each( results, function(){
				dd.interactions.push( drag.interaction( this, dd ) );
			});
		}
		// remember how many interactions are propagating
		dd.propagates = dd.interactions.length;
		// locate and init the drop targets
		if ( dd.drop !== false && $special.drop ) 
			$special.drop.handler( event, dd );
		// disable text selection
		drag.textselect( false ); 
		// bind additional events...
		if ( drag.touched )
			$event.add( drag.touched, "touchmove touchend", drag.handler, dd );
		else 
			$event.add( document, "mousemove mouseup", drag.handler, dd );
		// helps prevent text selection or scrolling
		if ( !drag.touched || dd.live )
			return false;
	},	
	
	// returns an interaction object
	interaction: function( elem, dd ){
		var offset = $( elem )[ dd.relative ? "position" : "offset" ]() || { top:0, left:0 };
		return {
			drag: elem, 
			callback: new drag.callback(), 
			droppable: [],
			offset: offset
		};
	},
	
	// handle drag-releatd DOM events
	handler: function( event ){ 
		// read the data before hijacking anything
		var dd = event.data;	
		// handle various events
		switch ( event.type ){
			// mousemove, check distance, start dragging
			case !dd.dragging && 'touchmove': 
				event.preventDefault();
			case !dd.dragging && 'mousemove':
				//  drag tolerance, x² + y² = distance²
				if ( Math.pow(  event.pageX-dd.pageX, 2 ) + Math.pow(  event.pageY-dd.pageY, 2 ) < Math.pow( dd.distance, 2 ) ) 
					break; // distance tolerance not reached
				event.target = dd.target; // force target from "mousedown" event (fix distance issue)
				drag.hijack( event, "dragstart", dd ); // trigger "dragstart"
				if ( dd.propagates ) // "dragstart" not rejected
					dd.dragging = true; // activate interaction
			// mousemove, dragging
			case 'touchmove':
				event.preventDefault();
			case 'mousemove':
				if ( dd.dragging ){
					// trigger "drag"		
					drag.hijack( event, "drag", dd );
					if ( dd.propagates ){
						// manage drop events
						if ( dd.drop !== false && $special.drop )
							$special.drop.handler( event, dd ); // "dropstart", "dropend"							
						break; // "drag" not rejected, stop		
					}
					event.type = "mouseup"; // helps "drop" handler behave
				}
			// mouseup, stop dragging
			case 'touchend': 
			case 'mouseup': 
			default:
				if ( drag.touched )
					$event.remove( drag.touched, "touchmove touchend", drag.handler ); // remove touch events
				else 
					$event.remove( document, "mousemove mouseup", drag.handler ); // remove page events	
				if ( dd.dragging ){
					if ( dd.drop !== false && $special.drop )
						$special.drop.handler( event, dd ); // "drop"
					drag.hijack( event, "dragend", dd ); // trigger "dragend"	
				}
				drag.textselect( true ); // enable text selection
				// if suppressing click events...
				if ( dd.click === false && dd.dragging )
					$.data( dd.mousedown, "suppress.click", new Date().getTime() + 5 );
				dd.dragging = drag.touched = false; // deactivate element	
				break;
		}
	},
		
	// re-use event object for custom events
	hijack: function( event, type, dd, x, elem ){
		// not configured
		if ( !dd ) 
			return;
		// remember the original event and type
		var orig = { event:event.originalEvent, type:event.type },
		// is the event drag related or drog related?
		mode = type.indexOf("drop") ? "drag" : "drop",
		// iteration vars
		result, i = x || 0, ia, $elems, callback,
		len = !isNaN( x ) ? x : dd.interactions.length;
		// modify the event type
		event.type = type;
		// remove the original event
		event.originalEvent = null;
		// initialize the results
		dd.results = [];
		// handle each interacted element
		do if ( ia = dd.interactions[ i ] ){
			// validate the interaction
			if ( type !== "dragend" && ia.cancelled )
				continue;
			// set the dragdrop properties on the event object
			callback = drag.properties( event, dd, ia );
			// prepare for more results
			ia.results = [];
			// handle each element
			$( elem || ia[ mode ] || dd.droppable ).each(function( p, subject ){
				// identify drag or drop targets individually
				callback.target = subject;
				// force propagtion of the custom event
				event.isPropagationStopped = function(){ return false; };
				// handle the event	
				result = subject ? $event.dispatch.call( subject, event, callback ) : null;
				// stop the drag interaction for this element
				if ( result === false ){
					if ( mode == "drag" ){
						ia.cancelled = true;
						dd.propagates -= 1;
					}
					if ( type == "drop" ){
						ia[ mode ][p] = null;
					}
				}
				// assign any dropinit elements
				else if ( type == "dropinit" )
					ia.droppable.push( drag.element( result ) || subject );
				// accept a returned proxy element 
				if ( type == "dragstart" )
					ia.proxy = $( drag.element( result ) || ia.drag )[0];
				// remember this result	
				ia.results.push( result );
				// forget the event result, for recycling
				delete event.result;
				// break on cancelled handler
				if ( type !== "dropinit" )
					return result;
			});	
			// flatten the results	
			dd.results[ i ] = drag.flatten( ia.results );	
			// accept a set of valid drop targets
			if ( type == "dropinit" )
				ia.droppable = drag.flatten( ia.droppable );
			// locate drop targets
			if ( type == "dragstart" && !ia.cancelled )
				callback.update(); 
		}
		while ( ++i < len )
		// restore the original event & type
		event.type = orig.type;
		event.originalEvent = orig.event;
		// return all handler results
		return drag.flatten( dd.results );
	},
		
	// extend the callback object with drag/drop properties...
	properties: function( event, dd, ia ){		
		var obj = ia.callback;
		// elements
		obj.drag = ia.drag;
		obj.proxy = ia.proxy || ia.drag;
		// starting mouse position
		obj.startX = dd.pageX;
		obj.startY = dd.pageY;
		// current distance dragged
		obj.deltaX = event.pageX - dd.pageX;
		obj.deltaY = event.pageY - dd.pageY;
		// original element position
		obj.originalX = ia.offset.left;
		obj.originalY = ia.offset.top;
		// adjusted element position
		obj.offsetX = obj.originalX + obj.deltaX; 
		obj.offsetY = obj.originalY + obj.deltaY;
		// assign the drop targets information
		obj.drop = drag.flatten( ( ia.drop || [] ).slice() );
		obj.available = drag.flatten( ( ia.droppable || [] ).slice() );
		return obj;	
	},
	
	// determine is the argument is an element or jquery instance
	element: function( arg ){
		if ( arg && ( arg.jquery || arg.nodeType == 1 ) )
			return arg;
	},
	
	// flatten nested jquery objects and arrays into a single dimension array
	flatten: function( arr ){
		return $.map( arr, function( member ){
			return member && member.jquery ? $.makeArray( member ) : 
				member && member.length ? drag.flatten( member ) : member;
		});
	},
	
	// toggles text selection attributes ON (true) or OFF (false)
	textselect: function( bool ){ 
		$( document )[ bool ? "unbind" : "bind" ]("selectstart", drag.dontstart )
			.css("MozUserSelect", bool ? "" : "none" );
		// .attr("unselectable", bool ? "off" : "on" )
		document.unselectable = bool ? "off" : "on"; 
	},
	
	// suppress "selectstart" and "ondragstart" events
	dontstart: function(){ 
		return false; 
	},
	
	// a callback instance contructor
	callback: function(){}
	
};

// callback methods
drag.callback.prototype = {
	update: function(){
		if ( $special.drop && this.available.length )
			$.each( this.available, function( i ){
				$special.drop.locate( this, i );
			});
	}
};

// patch $.event.$dispatch to allow suppressing clicks
var $dispatch = $event.dispatch;
$event.dispatch = function( event ){
	if ( $.data( this, "suppress."+ event.type ) - new Date().getTime() > 0 ){
		$.removeData( this, "suppress."+ event.type );
		return;
	}
	return $dispatch.apply( this, arguments );
};

// event fix hooks for touch events...
var touchHooks = 
$event.fixHooks.touchstart = 
$event.fixHooks.touchmove = 
$event.fixHooks.touchend =
$event.fixHooks.touchcancel = {
	props: "clientX clientY pageX pageY screenX screenY".split( " " ),
	filter: function( event, orig ) {
		if ( orig ){
			var touched = ( orig.touches && orig.touches[0] )
				|| ( orig.changedTouches && orig.changedTouches[0] )
				|| null; 
			// iOS webkit: touchstart, touchmove, touchend
			if ( touched ) 
				$.each( touchHooks.props, function( i, prop ){
					event[ prop ] = touched[ prop ];
				});
		}
		return event;
	}
};

// share the same special event configuration with related events...
$special.draginit = $special.dragstart = $special.dragend = drag;

})( jQuery );
;!function(a){"use strict";var b=function(){},c={getType:function(){return"null"},isSupported:function(){return!1},update:b},d=function(a){var c=this,d=window;this.update=b;this.requestAnimationFrame=a||d.requestAnimationFrame||d.webkitRequestAnimationFrame||d.mozRequestAnimationFrame;this.tickFunction=function(){c.update();c.startTicker()};this.startTicker=function(){c.requestAnimationFrame.apply(d,[c.tickFunction])}};d.prototype.start=function(a){this.update=a||b;this.startTicker()};var e=function(){};e.prototype.update=b;e.prototype.start=function(a){this.update=a||b};var f=function(a,b){this.listener=a;this.gamepadGetter=b;this.knownGamepads=[]};f.factory=function(a){var b=c,d=window&&window.navigator;d&&("undefined"!=typeof d.webkitGamepads?b=new f(a,function(){return d.webkitGamepads}):"undefined"!=typeof d.webkitGetGamepads&&(b=new f(a,function(){return d.webkitGetGamepads()})));return b};f.getType=function(){return"WebKit"},f.prototype.getType=function(){return f.getType()},f.prototype.isSupported=function(){return!0};f.prototype.update=function(){var a,b,c=this,d=Array.prototype.slice.call(this.gamepadGetter(),0);for(b=this.knownGamepads.length-1;b>=0;b--){a=this.knownGamepads[b];if(d.indexOf(a)<0){this.knownGamepads.splice(b,1);this.listener._disconnect(a)}}for(b=0;b<d.length;b++){a=d[b];if(a&&c.knownGamepads.indexOf(a)<0){c.knownGamepads.push(a);c.listener._connect(a)}}};var g=function(a){this.listener=a;window.addEventListener("gamepadconnected",function(b){a._connect(b.gamepad)});window.addEventListener("gamepaddisconnected",function(b){a._disconnect(b.gamepad)})};g.factory=function(a){var b=c;window&&"undefined"!=typeof window.addEventListener&&(b=new g(a));return b};g.getType=function(){return"Firefox"},g.prototype.getType=function(){return g.getType()},g.prototype.isSupported=function(){return!0};g.prototype.update=b;var h=function(a){this.updateStrategy=a||new d;this.gamepads=[];this.listeners={};this.platform=c;this.deadzone=.03;this.maximizeThreshold=.97};h.UpdateStrategies={AnimFrameUpdateStrategy:d,ManualUpdateStrategy:e};h.PlatformFactories=[f.factory,g.factory];h.Type={PLAYSTATION:"playstation",LOGITECH:"logitech",XBOX:"xbox",UNKNOWN:"unknown"};h.Event={CONNECTED:"connected",UNSUPPORTED:"unsupported",DISCONNECTED:"disconnected",TICK:"tick",BUTTON_DOWN:"button-down",BUTTON_UP:"button-up",AXIS_CHANGED:"axis-changed"};h.StandardButtons=["FACE_1","FACE_2","FACE_3","FACE_4","LEFT_TOP_SHOULDER","RIGHT_TOP_SHOULDER","LEFT_BOTTOM_SHOULDER","RIGHT_BOTTOM_SHOULDER","SELECT_BACK","START_FORWARD","LEFT_STICK","RIGHT_STICK","DPAD_UP","DPAD_DOWN","DPAD_LEFT","DPAD_RIGHT","HOME"];h.StandardAxes=["LEFT_STICK_X","LEFT_STICK_Y","RIGHT_STICK_X","RIGHT_STICK_Y"];var i=function(a,b,c){return b<a.length?a[b]:c+(b-a.length+1)};h.StandardMapping={env:{},buttons:{byButton:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},axes:{byAxis:[0,1,2,3]}};h.Mappings=[{env:{platform:g.getType(),type:h.Type.PLAYSTATION},buttons:{byButton:[14,13,15,12,10,11,8,9,0,3,1,2,4,6,7,5,16]},axes:{byAxis:[0,1,2,3]}},{env:{platform:f.getType(),type:h.Type.LOGITECH},buttons:{byButton:[1,2,0,3,4,5,6,7,8,9,10,11,11,12,13,14,10]},axes:{byAxis:[0,1,2,3]}},{env:{platform:g.getType(),type:h.Type.LOGITECH},buttons:{byButton:[0,1,2,3,4,5,-1,-1,6,7,8,9,11,12,13,14,10],byAxis:[-1,-1,-1,-1,-1,-1,[2,0,1],[2,0,-1]]},axes:{byAxis:[0,1,3,4]}}];h.prototype.init=function(){var a=h.resolvePlatform(this),b=this;this.platform=a;this.updateStrategy.start(function(){b._update()});return a.isSupported()};h.prototype.bind=function(a,b){"undefined"==typeof this.listeners[a]&&(this.listeners[a]=[]);this.listeners[a].push(b);return this};h.prototype.unbind=function(a,b){if("undefined"!=typeof a){if("undefined"!=typeof b){if("undefined"==typeof this.listeners[a])return!1;for(var c=0;c<this.listeners[a].length;c++)if(this.listeners[a][c]===b){this.listeners[a].splice(c,1);return!0}return!1}this.listeners[a]=[]}else this.listeners={}};h.prototype.count=function(){return this.gamepads.length};h.prototype._fire=function(a,b){if("undefined"!=typeof this.listeners[a])for(var c=0;c<this.listeners[a].length;c++)this.listeners[a][c].apply(this.listeners[a][c],[b])};h.getNullPlatform=function(){return Object.create(c)};h.resolvePlatform=function(a){var b,d=c;for(b=0;!d.isSupported()&&b<h.PlatformFactories.length;b++)d=h.PlatformFactories[b](a);return d};h.prototype._connect=function(a){var b,c,d=this._resolveMapping(a);a.state={};a.lastState={};a.updater=[];b=d.buttons.byButton.length;for(c=0;b>c;c++)this._addButtonUpdater(a,d,c);b=d.axes.byAxis.length;for(c=0;b>c;c++)this._addAxisUpdater(a,d,c);this.gamepads[a.index]=a;this._fire(h.Event.CONNECTED,a)};h.prototype._addButtonUpdater=function(a,c,d){var e=b,f=i(h.StandardButtons,d,"EXTRA_BUTTON_"),g=this._createButtonGetter(a,c.buttons,d),j=this,k={gamepad:a,control:f};a.state[f]=0;a.lastState[f]=0;e=function(){var b=g(),c=a.lastState[f],d=b>.5,e=c>.5;a.state[f]=b;d&&!e?j._fire(h.Event.BUTTON_DOWN,Object.create(k)):!d&&e&&j._fire(h.Event.BUTTON_UP,Object.create(k));0!==b&&1!==b&&b!==c&&j._fireAxisChangedEvent(a,f,b);a.lastState[f]=b};a.updater.push(e)};h.prototype._addAxisUpdater=function(a,c,d){var e=b,f=i(h.StandardAxes,d,"EXTRA_AXIS_"),g=this._createAxisGetter(a,c.axes,d),j=this;a.state[f]=0;a.lastState[f]=0;e=function(){var b=g(),c=a.lastState[f];a.state[f]=b;b!==c&&j._fireAxisChangedEvent(a,f,b);a.lastState[f]=b};a.updater.push(e)};h.prototype._fireAxisChangedEvent=function(a,b,c){var d={gamepad:a,axis:b,value:c};this._fire(h.Event.AXIS_CHANGED,d)};h.prototype._createButtonGetter=function(){var a=function(){return 0},b=function(b,c,d){var e=a;d>c?e=function(){var a=d-c,e=b();e=(e-c)/a;return 0>e?0:e}:c>d&&(e=function(){var a=c-d,e=b();e=(e-d)/a;return e>1?0:1-e});return e},c=function(a){return"[object Array]"===Object.prototype.toString.call(a)};return function(d,e,f){var g,h=a,i=this;g=e.byButton[f];if(-1!==g)"number"==typeof g&&g<d.buttons.length&&(h=function(){return d.buttons[g]});else if(e.byAxis&&f<e.byAxis.length){g=e.byAxis[f];if(c(g)&&3==g.length&&g[0]<d.axes.length){h=function(){var a=d.axes[g[0]];return i._applyDeadzoneMaximize(a)};h=b(h,g[1],g[2])}}return h}}();h.prototype._createAxisGetter=function(){var a=function(){return 0};return function(b,c,d){var e,f=a,g=this;e=c.byAxis[d];-1!==e&&"number"==typeof e&&e<b.axes.length&&(f=function(){var a=b.axes[e];return g._applyDeadzoneMaximize(a)});return f}}();h.prototype._disconnect=function(a){var b,c=[];"undefined"!=typeof this.gamepads[a.index]&&delete this.gamepads[a.index];for(b=0;b<this.gamepads.length;b++)"undefined"!=typeof this.gamepads[b]&&(c[b]=this.gamepads[b]);this.gamepads=c;this._fire(h.Event.DISCONNECTED,a)};h.prototype._resolveControllerType=function(a){a=a.toLowerCase();return-1!==a.indexOf("playstation")?h.Type.PLAYSTATION:-1!==a.indexOf("logitech")||-1!==a.indexOf("wireless gamepad")?h.Type.LOGITECH:-1!==a.indexOf("xbox")||-1!==a.indexOf("360")?h.Type.XBOX:h.Type.UNKNOWN};h.prototype._resolveMapping=function(a){var b,c,d=h.Mappings,e=null,f={platform:this.platform.getType(),type:this._resolveControllerType(a.id)};for(b=0;!e&&b<d.length;b++){c=d[b];h.envMatchesFilter(c.env,f)&&(e=c)}return e||h.StandardMapping};h.envMatchesFilter=function(a,b){var c,d=!0;for(c in a)a[c]!==b[c]&&(d=!1);return d};h.prototype._update=function(){this.platform.update();this.gamepads.forEach(function(a){a&&a.updater.forEach(function(a){a()})});this.gamepads.length>0&&this._fire(h.Event.TICK,this.gamepads)},h.prototype._applyDeadzoneMaximize=function(a,b,c){b="undefined"!=typeof b?b:this.deadzone;c="undefined"!=typeof c?c:this.maximizeThreshold;a>=0?b>a?a=0:a>c&&(a=1):a>-b?a=0:-c>a&&(a=-1);return a};a.Gamepad=h}("undefined"!=typeof module&&module.exports||window);;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));
;/*!
Alpaca Version 1.1.1

Copyright 2013 Gitana Software, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 

You may obtain a copy of the License at 
	http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License. 

For more information, please contact Gitana Software, Inc. at this
address:

  info@gitanasoftware.com
*/
(function(a,c,b){c[a]=b()})("Base",this,function(){var a=function(){};a.extend=function(c,f){var g=a.prototype.extend;a._prototyping=true;var e=new this();g.call(e,c);e.base=function(){};delete a._prototyping;var d=e.constructor;var b=e.constructor=function(){if(!a._prototyping){if(this._constructing||this.constructor===b){this._constructing=true;d.apply(this,arguments);delete this._constructing}else{if(arguments[0]!==null){return(arguments[0].extend||g).call(arguments[0],e)}}}};b.ancestor=this;b.extend=this.extend;b.forEach=this.forEach;b.implement=this.implement;b.prototype=e;b.toString=this.toString;b.valueOf=function(h){return(h==="object")?b:d.valueOf()};g.call(b,f);if(typeof b.init==="function"){b.init()}return b};a.prototype={extend:function(c,l){if(arguments.length>1){var g=this[c];if(g&&(typeof l==="function")&&(!g.valueOf||g.valueOf()!==l.valueOf())&&/\bbase\b/.test(l)){var b=l.valueOf();l=function(){var i=this.base||a.prototype.base;this.base=g;var h=b.apply(this,arguments);this.base=i;return h};l.valueOf=function(h){return(h==="object")?l:b};l.toString=a.toString}this[c]=l}else{if(c){var k=a.prototype.extend;if(!a._prototyping&&typeof this!=="function"){k=this.extend||k}var f={toSource:null};var j=["constructor","toString","valueOf"];for(var d=a._prototyping?0:1;d<j.length;d++){var e=j[d];if(c[e]!==f[e]){k.call(this,e,c[e])}}for(var m in c){if(!f[m]){k.call(this,m,c[m])}}}}return this}};a=a.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(b,e,d){for(var c in b){if(this.prototype[c]===undefined){e.call(d,b[c],c,b)}}},implement:function(){for(var b=0;b<arguments.length;b++){if(typeof arguments[b]==="function"){arguments[b](this.prototype)}else{this.prototype.extend(arguments[b])}}return this},toString:function(){return String(this.valueOf())}});return a});if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
/*!
 * JSONSchema Validator - Validates JavaScript objects using JSON Schemas
 *    (http://www.json.com/json-schema-proposal/)
 *
 * Copyright (c) 2007 Kris Zyp SitePen (www.sitepen.com)
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 To use the validator call the validate function with an instance object and an optional schema object.
 If a schema is provided, it will be used to validate. If the instance object refers to a schema (self-validating),
 that schema will be used to validate and the schema parameter is not necessary (if both exist,
 both validations will occur).
 The validate method will return an array of validation errors. If there are no errors, then an
 empty list will be returned. A validation error will have two properties:
 "property" which indicates which property had the error
 "message" which indicates what the error was
 */
(function(a){Validator={validate:function(b,c){return Validator._validate(b,c,{changing:false})},checkPropertyChange:function(d,b,c){return Validator._validate(d,b,{changing:c||"property"})},_validate:function(c,g,d){if(!d){d={}}var b=d.changing;var h=[];function f(r,n,v,p){var m;v+=v?typeof p=="number"?"["+p+"]":typeof p=="undefined"?"":"."+p:p;function w(i){h.push({property:v,message:i})}if((typeof n!="object"||n instanceof Array)&&(v||typeof n!="function")&&!(n&&n.type)){if(typeof n=="function"){if(!(r instanceof n)){w("is not an instance of the class/constructor "+n.name)}}else{if(n){w("Invalid schema/property definition "+n)}}return null}if(b&&n.readonly){w("is a readonly field, it can not be changed")}if(n["extends"]){f(r,n["extends"],v,p)}function k(z,A){if(z){if(typeof z=="string"&&z!="any"&&(z=="null"?A!==null:typeof A!=z)&&!(A instanceof Array&&z=="array")&&!(A instanceof Date&&z=="date")&&!(z=="integer"&&A%1===0)){return[{property:v,message:(typeof A)+" value found, but a "+z+" is required"}]}if(z instanceof Array){var y=[];for(var x=0;x<z.length;x++){if(!(y=k(z[x],A)).length){break}}if(y.length){return y}}else{if(typeof z=="object"){var i=h;h=[];f(A,z,v);var l=h;h=i;return l}}}return[]}if(r===undefined){if(n.required){w("is missing and it is required")}}else{h=h.concat(k(n.type,r));if(n.disallow&&!k(n.disallow,r).length){w(" disallowed value was matched")}if(r!==null){if(r instanceof Array){if(n.items){var s=n.items instanceof Array;var u=n.items;for(p=0,m=r.length;p<m;p+=1){if(s){u=n.items[p]}if(d.coerce){r[p]=d.coerce(r[p],u)}h.concat(f(r[p],u,v,p))}}if(n.minItems&&r.length<n.minItems){w("There must be a minimum of "+n.minItems+" in the array")}if(n.maxItems&&r.length>n.maxItems){w("There must be a maximum of "+n.maxItems+" in the array")}}else{if(n.properties||n.additionalProperties){h.concat(e(r,n.properties,v,n.additionalProperties))}}if(n.pattern&&typeof r=="string"&&!r.match(n.pattern)){w("does not match the regex pattern "+n.pattern)}if(n.maxLength&&typeof r=="string"&&r.length>n.maxLength){w("may only be "+n.maxLength+" characters long")}if(n.minLength&&typeof r=="string"&&r.length<n.minLength){w("must be at least "+n.minLength+" characters long")}if(typeof n.minimum!==undefined&&typeof r==typeof n.minimum&&n.minimum>r){w("must have a minimum value of "+n.minimum)}if(typeof n.maximum!==undefined&&typeof r==typeof n.maximum&&n.maximum<r){w("must have a maximum value of "+n.maximum)}if(n["enum"]){var q=n["enum"];m=q.length;var t;for(var o=0;o<m;o++){if(q[o]===r){t=1;break}}if(!t){w("does not have a value in the enumeration "+q.join(", "))}}if(typeof n.maxDecimal=="number"&&(r.toString().match(new RegExp("\\.[0-9]{"+(n.maxDecimal+1)+",}")))){w("may only have "+n.maxDecimal+" digits of decimal places")}}}return null}function e(j,k,p,o){if(typeof k=="object"){if(typeof j!="object"||j instanceof Array){h.push({property:p,message:"an object is required"})}for(var l in k){if(k.hasOwnProperty(l)){var n=j[l];if(n===undefined&&d.existingOnly){continue}var q=k[l];if(n===undefined&&q["default"]){n=j[l]=q["default"]}if(d.coerce&&l in j){n=j[l]=d.coerce(n,q)}f(n,q,p,l)}}}for(l in j){if(j.hasOwnProperty(l)&&!(l.charAt(0)=="_"&&l.charAt(1)=="_")&&k&&!k[l]&&o===false){if(d.filter){delete j[l];continue}else{h.push({property:p,message:(typeof n)+"The property "+l+" is not defined in the schema and the schema does not allow additional properties"})}}var m=k&&k[l]&&k[l].requires;if(m&&!(m in j)){h.push({property:p,message:"the presence of the property "+l+" requires that "+m+" also be present"})}n=j[l];if(o&&(!(k&&typeof k=="object")||!(l in k))){if(d.coerce){n=j[l]=d.coerce(n,o)}f(n,o,p,l)}if(!b&&n&&n.$schema){h=h.concat(f(n,n.$schema,p,l))}}return h}if(g){f(c,g,"",b||"")}if(!b&&c&&c.$schema){f(c,c.$schema,"","")}return{valid:!h.length,errors:h}},mustBeValid:function(b){if(!b.valid){throw new TypeError(b.errors.map(function(c){return"for property "+c.property+": "+c.message}).join(", \n"))}}};String.type="string";Boolean.type="boolean";Number.type="number";Integer={type:"integer"};Object.type="object";Array.type="array";Date.type="date";a.validator=window.Validator=Validator})(jQuery);
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(i,f){var t=i.fn.domManip,h="_tmplitem",u=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,p={},e={},y,x={key:0,data:{}},w=0,q=0,g=[];function k(B,A,D,E){var C={data:E||(E===0||E===false)?E:(A?A.data:{}),_wrap:A?A._wrap:null,tmpl:null,parent:A||null,nodes:[],calls:c,nest:b,wrap:n,html:r,update:z};if(B){i.extend(C,B,{nodes:[],parent:A})}if(D){C.tmpl=D;C._ctnt=C._ctnt||C.tmpl(i,C);C.key=++w;(g.length?e:p)[w]=C}return C}i.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(A,B){i.fn[A]=function(C){var F=[],I=i(C),E,G,D,J,H=this.length===1&&this[0].parentNode;y=p||{};if(H&&H.nodeType===11&&H.childNodes.length===1&&I.length===1){I[B](this[0]);F=this}else{for(G=0,D=I.length;G<D;G++){q=G;E=(G>0?this.clone(true):this).get();i(I[G])[B](E);F=F.concat(E)}q=0;F=this.pushStack(F,A,I.selector)}J=y;y=null;i.tmpl.complete(J);return F}});i.fn.extend({tmpl:function(C,B,A){return i.tmpl(this[0],C,B,A)},tmplItem:function(){return i.tmplItem(this[0])},template:function(A){return i.template(A,this[0])},domManip:function(E,H,G,I){if(E[0]&&i.isArray(E[0])){var B=i.makeArray(arguments),A=E[0],F=A.length,C=0,D;while(C<F&&!(D=i.data(A[C++],"tmplItem"))){}if(D&&q){B[2]=function(J){i.tmpl.afterManip(this,J,G)}}t.apply(this,B)}else{t.apply(this,arguments)}q=0;if(!y){i.tmpl.complete(p)}return this}});i.extend({tmpl:function(C,F,E,B){var D,A=!B;if(A){B=x;C=i.template[C]||i.template(null,C);e={}}else{if(!C){C=B.tmpl;p[B.key]=B;B.nodes=[];if(B.wrapped){s(B,B.wrapped)}return i(m(B,null,B.tmpl(i,B)))}}if(!C){return[]}if(typeof F==="function"){F=F.call(B||{})}if(E&&E.wrapped){s(E,E.wrapped)}D=i.isArray(F)?i.map(F,function(G){return G?k(E,B,C,G):null}):[k(E,B,C,F)];return A?i(m(B,null,D)):D},tmplItem:function(B){var A;if(B instanceof i){B=B[0]}while(B&&B.nodeType===1&&!(A=i.data(B,"tmplItem"))&&(B=B.parentNode)){}return A||x},template:function(B,A){if(A){if(typeof A==="string"){A=l(A)}else{if(A instanceof i){A=A[0]||{}}}if(A.nodeType){A=i.data(A,"tmpl")||i.data(A,"tmpl",l(A.innerHTML))}return typeof B==="string"?(i.template[B]=A):A}return B?(typeof B!=="string"?i.template(null,B):(i.template[B]||i.template(null,u.test(B)?B:i(B)))):null},encode:function(A){return(""+A).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});i.extend(i.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(A){p={}},afterManip:function v(C,A,D){var B=A.nodeType===11?i.makeArray(A.childNodes):A.nodeType===1?[A]:[];D.call(C,A);o(B);q++}});function m(A,E,C){var D,B=C?i.map(C,function(F){return(typeof F==="string")?(A.key?F.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+h+'="'+A.key+'" $2'):F):m(F,A,F._ctnt)}):A;if(E){return B}B=B.join("");B.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(G,H,F,I){D=i(F).get();o(D);if(H){D=a(H).concat(D)}if(I){D=D.concat(a(I))}});return D?D:a(B)}function a(B){var A=document.createElement("div");A.innerHTML=B;return i.makeArray(A.childNodes)}function l(A){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+i.trim(A).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(I,C,G,D,E,J,F){var L=i.tmpl.tag[G],B,H,K;if(!L){throw"Unknown template tag: "+G}B=L._default||[];if(J&&!/\w$/.test(E)){E+=J;J=""}if(E){E=j(E);F=F?(","+j(F)+")"):(J?")":"");H=J?(E.indexOf(".")>-1?E+j(J):("("+E+").call($item"+F)):E;K=J?H:"(typeof("+E+")==='function'?("+E+").call($item):("+E+"))"}else{K=H=B.$1||"null"}D=j(D);return"');"+L[C?"close":"open"].split("$notnull_1").join(E?"typeof("+E+")!=='undefined' && ("+E+")!=null":"true").split("$1a").join(K).split("$1").join(H).split("$2").join(D||B.$2||"")+"__.push('"})+"');}return __;")}function s(B,A){B._wrap=m(B,true,i.isArray(A)?A:[u.test(A)?A:i(A).html()]).join("")}function j(A){return A?A.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function d(A){var B=document.createElement("div");B.appendChild(A.cloneNode(true));return B.innerHTML}function o(G){var I="_"+q,B,A,E={},F,D,C;for(F=0,D=G.length;F<D;F++){if((B=G[F]).nodeType!==1){continue}A=B.getElementsByTagName("*");for(C=A.length-1;C>=0;C--){H(A[C])}H(B)}function H(O){var L,N=O,M,J,K;if((K=O.getAttribute(h))){while(N.parentNode&&(N=N.parentNode).nodeType===1&&!(L=N.getAttribute(h))){}if(L!==K){N=N.parentNode?(N.nodeType===11?0:(N.getAttribute(h)||0)):0;if(!(J=p[K])){J=e[K];J=k(J,p[N]||e[N]);J.key=++w;p[w]=J}if(q){P(K)}}O.removeAttribute(h)}else{if(q&&(J=i.data(O,"tmplItem"))){P(J.key);p[J.key]=J;N=i.data(O.parentNode,"tmplItem");N=N?N.key:0}}if(J){M=J;while(M&&M.key!=N){M.nodes.push(O);M=M.parent}delete J._ctnt;delete J._wrap;i.data(O,"tmplItem",J)}function P(Q){Q=Q+I;J=E[Q]=(E[Q]||k(J,p[J.parent.key+I]||J.parent))}}}function c(C,A,D,B){if(!C){return g.pop()}g.push({_:C,tmpl:A,item:this,data:D,options:B})}function b(A,C,B){return i.tmpl(i.template(A),C,B,this)}function n(C,A){var B=C.options||{};B.wrapped=A;return i.tmpl(i.template(C.tmpl),C.data,B,C.item)}function r(B,C){var A=this._wrap;return i.map(i(i.isArray(A)?A.join(""):A).filter(B||"*"),function(D){return C?D.innerText||D.textContent:D.outerHTML||d(D)})}function z(){var A=this.nodes;i.tmpl(null,null,null,this).insertBefore(A[0]);i(A).remove()}})(jQuery);function hoozit(a){if(a.constructor===String){return"string"}else{if(a.constructor===Boolean){return"boolean"}else{if(a.constructor===Number){if(isNaN(a)){return"nan"}else{return"number"}}else{if(typeof a==="undefined"){return"undefined"}else{if(a===null){return"null"}else{if(a instanceof Array){return"array"}else{if(a instanceof Date){return"date"}else{if(a instanceof RegExp){return"regexp"}else{if(typeof a==="object"){return"object"}else{if(a instanceof Function){return"function"}else{return undefined}}}}}}}}}}}function bindCallbacks(c,b,a){var d=hoozit(c);if(d){if(hoozit(b[d])==="function"){return b[d].apply(b,a)}else{return b[d]}}}var equiv=function(){var b;var c=[];var a=function(){function d(e,f){if(e instanceof f.constructor||f instanceof e.constructor){return f==e}else{return f===e}}return{string:d,"boolean":d,number:d,"null":d,"undefined":d,nan:function(e){return isNaN(e)},date:function(e,f){return hoozit(e)==="date"&&f.valueOf()===e.valueOf()},regexp:function(e,f){return hoozit(e)==="regexp"&&f.source===e.source&&f.global===e.global&&f.ignoreCase===e.ignoreCase&&f.multiline===e.multiline},"function":function(){var e=c[c.length-1];return e!==Object&&typeof e!=="undefined"},array:function(f,g){var h;var e;if(!(hoozit(f)==="array")){return false}e=g.length;if(e!==f.length){return false}for(h=0;h<e;h++){if(!b(g[h],f[h])){return false}}return true},object:function(f,g){var j;var e=true;var h=[],k=[];if(g.constructor!==f.constructor){return false}c.push(g.constructor);for(j in g){h.push(j);if(!b(g[j],f[j])){e=false}}c.pop();for(j in f){k.push(j)}return e&&b(h.sort(),k.sort())}}}();b=function(){var d=Array.prototype.slice.apply(arguments);if(d.length<2){return true}return(function(f,e){if(f===e){return true}else{if(f===null||e===null||typeof f==="undefined"||typeof e==="undefined"||hoozit(f)!==hoozit(e)){return false}else{return bindCallbacks(f,a,[e,f])}}})(d[0],d[1])&&arguments.callee.apply(this,d.splice(1,d.length-1))};return b}();(function(e){function g(){var i=document.createElement("input"),h="onpaste";i.setAttribute(h,"");return(typeof i[h]==="function")?"paste":"input"}var b=g()+".mask",d=navigator.userAgent,c=/iphone/i.test(d),a=/android/i.test(d),f;e.mask={definitions:{"9":"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"};e.fn.extend({caret:function(j,h){var i;if(this.length===0||this.is(":hidden")){return}if(typeof j=="number"){h=(typeof h==="number")?h:j;return this.each(function(){if(this.setSelectionRange){this.setSelectionRange(j,h)}else{if(this.createTextRange){i=this.createTextRange();i.collapse(true);i.moveEnd("character",h);i.moveStart("character",j);i.select()}}})}else{if(this[0].setSelectionRange){j=this[0].selectionStart;h=this[0].selectionEnd}else{if(document.selection&&document.selection.createRange){i=document.selection.createRange();j=0-i.duplicate().moveStart("character",-100000);h=j+i.text.length}}return{begin:j,end:h}}},unmask:function(){return this.trigger("unmask")},mask:function(j,n){var k,i,m,o,l,h;if(!j&&this.length>0){k=e(this[0]);return k.data(e.mask.dataName)()}n=e.extend({placeholder:e.mask.placeholder,completed:null},n);i=e.mask.definitions;m=[];o=h=j.length;l=null;e.each(j.split(""),function(p,q){if(q=="?"){h--;o=p}else{if(i[q]){m.push(new RegExp(i[q]));if(l===null){l=m.length-1}}else{m.push(null)}}});return this.trigger("unmask").each(function(){var y=e(this),t=e.map(j.split(""),function(C,B){if(C!="?"){return i[C]?n.placeholder:C}}),A=y.val();function x(B){while(++B<h&&!m[B]){}return B}function u(B){while(--B>=0&&!m[B]){}return B}function s(E,B){var D,C;if(E<0){return}for(D=E,C=x(B);D<h;D++){if(m[D]){if(C<h&&m[D].test(t[C])){t[D]=t[C];t[C]=n.placeholder}else{break}C=x(C)}}w();y.caret(Math.max(l,E))}function p(F){var D,E,B,C;for(D=F,E=n.placeholder;D<h;D++){if(m[D]){B=x(D);C=t[D];t[D]=E;if(B<h&&m[B].test(C)){E=C}else{break}}}}function v(E){var C=E.which,F,D,B;if(C===8||C===46||(c&&C===127)){F=y.caret();D=F.begin;B=F.end;if(B-D===0){D=C!==46?u(D):(B=x(D-1));B=C===46?x(B):B}q(D,B);s(D,B-1);E.preventDefault()}else{if(C==27){y.val(A);y.caret(0,r());E.preventDefault()}}}function z(E){var B=E.which,G=y.caret(),D,F,C;if(E.ctrlKey||E.altKey||E.metaKey||B<32){return}else{if(B){if(G.end-G.begin!==0){q(G.begin,G.end);s(G.begin,G.end-1)}D=x(G.begin-1);if(D<h){F=String.fromCharCode(B);if(m[D].test(F)){p(D);t[D]=F;w();C=x(D);if(a){setTimeout(e.proxy(e.fn.caret,y,C),0)}else{y.caret(C)}if(n.completed&&C>=h){n.completed.call(y)}}}E.preventDefault()}}}function q(D,B){var C;for(C=D;C<B&&C<h;C++){if(m[C]){t[C]=n.placeholder}}}function w(){y.val(t.join(""))}function r(C){var F=y.val(),E=-1,B,D;for(B=0,pos=0;B<h;B++){if(m[B]){t[B]=n.placeholder;while(pos++<F.length){D=F.charAt(pos-1);if(m[B].test(D)){t[B]=D;E=B;break}}if(pos>F.length){break}}else{if(t[B]===F.charAt(pos)&&B!==o){pos++;E=B}}}if(C){w()}else{if(E+1<o){y.val("");q(0,h)}else{w();y.val(y.val().substring(0,E+1))}}return(o?B:l)}y.data(e.mask.dataName,function(){return e.map(t,function(C,B){return m[B]&&C!=n.placeholder?C:null}).join("")});if(!y.attr("readonly")){y.one("unmask",function(){y.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(f);var C,B;A=y.val();if(A===""){q(0,h);w();C=0}else{C=r()}f=setTimeout(function(){w();if(C==j.length){y.caret(0,C)}else{y.caret(C)}},10)}).bind("blur.mask",function(){r();if(y.val()!=A){y.change()}}).bind("keydown.mask",v).bind("keypress.mask",z).bind(b,function(){setTimeout(function(){var B=r(true);y.caret(B);if(n.completed&&B==y.val().length){n.completed.call(y)}},0)})}r()})}})})(jQuery);(function(b){var a;a=function(){var g=a.makeArray(arguments);if(g.length===0){return a.throwDefaultError("You must supply at least one argument which is the element against which to apply the Alpaca generated form")}var e=g[0];var E=null;var s=null;var l=null;var o=null;var m=null;var h=null;var n=null;var c=null;var k=false;var D=false;var p={};var z=null;var v=null;var q=null;var f=null;if(g.length==1){var t=b(e).find(":first");var d=null;for(var x=0;x<t.length;x++){var B=t[x];var w=b(B).attr("alpaca-field-id");if(w){var u=a.fieldInstances[w];if(u){d=u}}}if(d!==null){return d}else{var j=b(e).html();b(e).html("");E=j}}if(g.length>=2){if(a.isObject(g[1])){E=g[1].data;s=g[1].schema;l=g[1].options;o=g[1].view;m=g[1].render;h=g[1].postRender;n=g[1].error;c=g[1].connector;z=g[1].dataSource;v=g[1].schemaSource;q=g[1].optionsSource;f=g[1].viewSource;if(g[1].ui){p.ui=g[1].ui}if(g[1].type){p.type=g[1].type}if(!a.isEmpty(g[1].notTopLevel)){k=g[1].notTopLevel}if(!a.isEmpty(g[1].isDynamicCreation)){D=g[1].isDynamicCreation}}else{E=g[1];if(a.isFunction(E)){E=E()}}}if(a.isEmpty(n)){n=a.defaultErrorCallback}if(a.isEmpty(c)){var y=a.getConnectorClass("default");c=new y("default")}if(e){if(a.isString(e)){e=b("#"+e)}}var A=c;if(k){var C=a.getConnectorClass("default");A=new C("default")}if(!l){l={}}if(a.isUndefined(l.focus)){l.focus=false}var r=function(i){if(l&&l.focus){if(l.focus===true){if(i.children&&i.children.length>0){if(i.children[0].field&&i.children[0].field[0]){b(i.children[0]).focus()}}}else{var F=i.getControlByPath(l.focus);if(F&&F.field){b(F).focus()}}}if(h){h(i)}};A.loadAll({data:E,schema:s,options:l,view:o,dataSource:z,schemaSource:v,optionsSource:q,viewSource:f},function(i,F,G,H){i=i?i:E;G=G?G:s;F=F?F:l;H=H?H:o;if(a.isEmpty(i)){if(a.isEmpty(G)&&(a.isEmpty(F)||a.isEmpty(F.type))){i="";if(a.isEmpty(F)){F="text"}else{if(l&&a.isObject(l)){F.type="text"}}}}return a.init(e,i,F,G,H,p,m,r,c,n,D)},function(i){n(i);return null});return b(e)};a.Fields={};a.Connectors={};b.extend(a,{VERSION:"0.1.0",makeArray:function(c){return Array.prototype.slice.call(c)},isFunction:function(c){return Object.prototype.toString.call(c)==="[object Function]"},isString:function(c){return(typeof c=="string")},isObject:function(c){if(c===true||c===false||a.isUndefined(c)||c===null){return false}return(typeof(c)==="object")&&(typeof(c.length)==="undefined")},isPlainObject:function(c){return b.isPlainObject(c)},isNumber:function(c){return(typeof c=="number")},isArray:function(c){if(c===true||c===false||a.isUndefined(c)||c===null){return false}return c.push&&c.slice},isBoolean:function(c){return(typeof c=="boolean")},isUndefined:function(c){return(typeof c=="undefined")},trim:function(d){var c=d;if(c&&a.isString(c)){c=c.replace(/^\s+|\s+$/g,"")}return c},safeDomParse:function(c){if(c&&a.isString(c)){c=a.trim(c);c=b(c)}return c},isEmpty:function(c){return a.isUndefined(c)||c===null},copyOf:function(d){var f=d;if(a.isArray(d)){f=[];for(var e=0;e<d.length;e++){f.push(a.copyOf(d[e]))}}else{if(a.isObject(d)){if(d instanceof Date){return new Date(d.getTime())}else{if(d instanceof RegExp){return new RegExp(d)}else{if(d.nodeType&&"cloneNode" in d){f=d.cloneNode(true)}else{if(b.isPlainObject(d)){f={};for(var c in d){if(d.hasOwnProperty(c)){f[c]=a.copyOf(d[c])}}}else{}}}}}}return f},cloneObject:function(c){return a.copyOf(c)},spliceIn:function(c,d,e){return c.substring(0,d)+e+c.substring(d,c.length)},compactArray:function(c){var f=[],d=c.length,e;for(e=0;e<d;e++){if(!lang.isNull(c[e])&&!lang.isUndefined(c[e])){f.push(c[e])}}return f},removeAccents:function(c){return c.replace(/[àáâãäå]/g,"a").replace(/[èéêë]/g,"e").replace(/[ìíîï]/g,"i").replace(/[òóôõö]/g,"o").replace(/[ùúûü]/g,"u").replace(/[ýÿ]/g,"y").replace(/[ñ]/g,"n").replace(/[ç]/g,"c").replace(/[œ]/g,"oe").replace(/[æ]/g,"ae")},indexOf:function(g,c,f){var d=c.length,e;if(!a.isFunction(f)){f=function(h,i){return h===i}}for(e=0;e<d;e++){if(f.call({},g,c[e])){return e}}return -1},log:function(c){if(typeof(console)!=="undefined"){console.log(c)}},uniqueIdCounter:0,defaultLocale:"en_US",setDefaultLocale:function(c){this.defaultLocale=c},defaultSchemaFieldMapping:{},registerDefaultSchemaFieldMapping:function(d,c){if(d&&c){this.defaultSchemaFieldMapping[d]=c}},defaultFormatFieldMapping:{},registerDefaultFormatFieldMapping:function(d,c){if(d&&c){this.defaultFormatFieldMapping[d]=c}},getSchemaType:function(c){if(a.isEmpty(c)){return"string"}if(a.isObject(c)){return"object"}if(a.isString(c)){return"string"}if(a.isNumber(c)){return"number"}if(a.isArray(c)){return"array"}if(a.isBoolean(c)){return"boolean"}if(typeof c=="object"){return"object"}},views:{},viewIdPrefix:"VIEW_",isValidViewId:function(c){return a.startsWith(c,this.viewIdPrefix)},generateViewId:function(){return this.viewIdPrefix+this.generateId()},registerView:function(d){var e=d.id;if(!e){return a.throwDefaultError("Cannot register view with missing view id: "+e)}var c=this.views[e];if(c){a.mergeObject(c,d)}else{this.views[e]=d}},defaultView:"VIEW_WEB_EDIT",setDefaultView:function(c){if(c&&this.views.hasOwnProperty(c)){this.defaultView=c}},getNormalizedView:function(c){return this.normalizedViews[c]},lookupNormalizedView:function(g,f){var d=null;for(var c in this.normalizedViews){var e=this.normalizedViews[c];if(e.ui==g&&e.type==f){d=c;break}}return d},registerTemplate:function(d,e,c){if(!c){c="VIEW_BASE"}if(!this.views[c]){this.views[c]={};this.views[c].id=c}if(!this.views[c].templates){this.views[c].templates={}}this.views[c].templates[d]=e},registerTemplates:function(e,c){for(var d in e){this.registerTemplate(d,e[d],c)}},registerMessage:function(d,e,c){if(!c){c="VIEW_BASE"}if(!this.views[c]){this.views[c]={};this.views[c].id=c}if(!this.views[c].messages){this.views[c].messages={}}this.views[c].messages[d]=e},registerMessages:function(e,c){for(var d in e){if(e.hasOwnProperty(d)){this.registerMessage(d,e[d],c)}}},fieldTemplatePostfix:{controlFieldMessageContainer:"-controlfield-message-container",controlFieldLabel:"-controlfield-label",controlFieldContainer:"-controlfield-container",controlFieldHelper:"-controlfield-helper",fieldSetLegend:"-fieldset-legend",fieldSetItemsContainer:"-fieldset-items-container",fieldSetHelper:"-fieldset-helper",fieldSetOuterEl:"-fieldset",formButtonsContainer:"-form-buttons-container",formFieldsContainer:"-form-fields-container"},fieldTemplate:function(e,c,d){var h=this;var k=e.data;var i=e.data.view;var g="";if(!c){c="controlFieldLabel"}var f=this.getTemplateDescriptor(i,c,k);if(d){var l=f.template.value;if(b(".alpaca"+this.fieldTemplatePostfix[c],a.safeDomParse(l)).length===0){if(this.fieldTemplatePostfix[c]){l=a.safeDomParse(l).addClass("alpaca"+this.fieldTemplatePostfix[c])}}g=a.safeDomParse(l).outerHTML(true)}else{var j=i.tmpl(f,e.data);if(j){if(this.fieldTemplatePostfix[c]){if(b(".alpaca"+this.fieldTemplatePostfix[c],j).length===0){j.addClass("alpaca"+this.fieldTemplatePostfix[c])}if(!j.attr("id")){j.attr("id",e.data.id+this.fieldTemplatePostfix[c])}}g=j.outerHTML(true)}else{g=""}}return g},defaultDateFormat:"mm/dd/yy",regexps:{email:/^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,url:/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i,password:/^[0-9a-zA-Z\x20-\x7E]*$/,date:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]\d\d$/,integer:/^([\+\-]?([1-9]\d*)|0)$/,number:/^([\+\-]?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/,phone:/^(\D?(\d{3})\D?\D?(\d{3})\D?(\d{4}))?$/,ipv4:/^(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)(?:\.(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)){3}$/,"zipcode-five":/^(\d{5})?$/,"zipcode-nine":/^(\d{5}(-\d{4})?)?$/},fieldInstances:{},fieldClassRegistry:{},registerFieldClass:function(c,d){this.fieldClassRegistry[c]=d},getFieldClass:function(c){return this.fieldClassRegistry[c]},getFieldClassType:function(d){for(var c in this.fieldClassRegistry){if(this.fieldClassRegistry.hasOwnProperty(c)){if(this.fieldClassRegistry[c]==d){return c}}}return null},connectorClassRegistry:{},registerConnectorClass:function(d,c){this.connectorClassRegistry[d]=c},getConnectorClass:function(c){return this.connectorClassRegistry[c]},replaceAll:function(e,c,d){return e.replace(new RegExp(c,"g"),d)},element:function(c,e,d,h){var g=b("<"+c+"/>");if(e){g.attr(e)}if(d){g.css(d)}if(h){for(var f in h){g.addClass(f)}}},elementFromTemplate:function(e,f){var d=e;if(f){for(var c in f){d=a.replaceAll(d,"${"+c+"}",f[c])}}return b(d)},generateId:function(){a.uniqueIdCounter++;return"alpaca"+a.uniqueIdCounter},later:function(l,e,n,h,i){l=l||0;e=e||{};var g=n,k=b.makeArray(h),j,c;if(typeof n==="string"){g=e[n]}if(!g){throw {name:"TypeError",message:"The function is undefined."}}j=function(){g.apply(e,k)};c=(i)?setInterval(j,l):setTimeout(j,l);return{id:c,interval:i,cancel:function(){if(this.interval){clearInterval(c)}else{clearTimeout(c)}}}},endsWith:function(d,c){return d.indexOf(c,d.length-c.length)!==-1},startsWith:function(d,c){return d.substr(0,c.length)===c},isUri:function(c){return a.isString(c)&&(a.startsWith(c,"http://")||a.startsWith(c,"https://")||a.startsWith(c,"/")||a.startsWith(c,"./")||a.startsWith(c,"../"))},traverseObject:function(c,g,f){if(a.isString(g)){g=g.split(".")}var e=null;var h=c;var d=null;do{d=g.shift();if(f&&d==f){d=g.shift()}if(!a.isEmpty(h[d])){h=h[d];if(g.length===0){e=h}}else{g=[]}}while(g.length>0);return e},each:function(f,e){if(a.isArray(f)){for(var d=0;d<f.length;d++){e.apply(f[d])}}else{if(a.isObject(f)){for(var c in f){e.apply(f[c])}}}},merge:function(g,f,d){if(!g){g={}}for(var c in f){var e=true;if(d){e=d(c)}if(e){if(a.isEmpty(f[c])){g[c]=f[c]}else{if(a.isObject(f[c])){if(!g[c]){g[c]={}}g[c]=a.merge(g[c],f[c])}else{g[c]=f[c]}}}}return g},mergeObject:function(d,c){if(!d){d={}}if(!c){c={}}this.mergeObject2(c,d);return d},mergeObject2:function(h,i){var d=a.isArray;var c=a.isObject;var f=a.isUndefined;var e=a.copyOf;var g=function(j,k){if(d(j)){if(d(k)){b.each(j,function(l){k.push(e(j[l]))})}else{}}else{if(c(j)){if(c(k)){b.each(j,function(l){if(f(k[l])){k[l]=e(j[l])}else{k[l]=g(j[l],k[l])}})}else{}}else{k=e(j)}}return k};g(h,i);return i},substituteTokens:function(h,d){if(!a.isEmpty(h)){for(var g=0;g<d.length;g++){var f="{"+g+"}";var c=h.indexOf(f);if(c>-1){var e=h.substring(0,c)+d[g]+h.substring(c+3);h=e}}}return h},compareObject:function(d,c){return equiv(d,c)},compareArrayContent:function(d,c){var e=d&&c&&(d.length==c.length);if(e){b.each(d,function(g,f){if(!e){return false}if(b.inArray(f,c)==-1){e=false}else{e=true}})}return e},isValEmpty:function(d){var c=false;if(a.isEmpty(d)){c=true}else{if(a.isString(d)&&d===""){c=true}if(a.isObject(d)&&b.isEmptyObject(d)){c=true}if(a.isArray(d)&&d.length===0){c=true}if(a.isNumber(d)&&isNaN(d)){c=true}}return c},init:function(c,g,p,f,l,d,n,j,e,i,k){var o=this;if(a.isObject(l)){var m=l.id;if(!m){l.id=this.generateViewId()}var h=l.parent;if(!h){l.parent="VIEW_WEB_EDIT"}this.registerView(l);l=l.id}this.compile(function(r){if(r.errors&&r.errors.length>0){for(var t=0;t<r.errors.length;t++){var q=r.errors[t].viewId;var s=r.errors[t].templateId;var u=r.errors[t].err;a.logError("The template: "+s+" for view: "+q+" failed to compile");a.logError(JSON.stringify(u))}return a.throwErrorWithCallback("View compilation failed, cannot initialize Alpaca.  Please check the error logs.",i)}o._init(c,g,p,f,l,d,n,j,e,i,k)},i)},_init:function(e,t,g,q,m,n,i,f,c,j,s){var l=null;var p=null;var r=null;if(b.mobile){l="mobile";if(t){p="edit";r="VIEW_MOBILE_EDIT"}else{p="create";r="VIEW_MOBILE_CREATE"}}var k=(typeof b().modal=="function");if(k){l="bootstrap";if(t){p="edit";r="VIEW_BOOTSTRAP_EDIT"}else{p="create";r="VIEW_BOOTSTRAP_CREATE"}}if(!m){var o=n.ui;var h=n.type;if(!o){if(!l){l=a.defaultUI}if(l){o=l}}if(o){if(!h){h=p?p:"edit"}a.logDebug("No view provided but found request for UI: "+o+" and type: "+h);m=this.lookupNormalizedView(o,h);if(m){a.logDebug("Found view: "+m)}else{a.logDebug("No view found for UI: "+o+" and type: "+h)}}}if(!m){a.logDebug("A view was not specified.");if(r){a.logDebug("Falling back to detected view: "+r);m=r}else{a.logDebug("Falling back to default view: "+this.defaultView);m=this.defaultView}}if(a.isString(m)){if(!this.normalizedViews[m]){return a.throwErrorWithCallback("The desired view: "+m+" could not be loaded.  Please make sure it is loaded and not misspelled.",j)}}var d=a.createFieldInstance(e,t,g,q,m,c,j);if(d){d.isDynamicCreation=s;a.fieldInstances[d.getId()]=d;d.allFieldInstances=function(){return a.fieldInstances};if(a.isEmpty(i)){i=d.view.render}if(a.isEmpty(f)){f=d.view.postRender}if(!a.isEmpty(i)){i(d,f)}else{d.render(f)}d.callback=i;d.renderedCallback=f}return d},createFieldInstance:function(c,f,k,e,j,d,g){if(a.isValEmpty(k)){k={}}if(a.isValEmpty(e)){e={}}if(k&&a.isString(k)){var h=k;k={};k.type=h}if(!k.type){if(!e.type){e.type=a.getSchemaType(f)}if(e&&e["enum"]){if(e["enum"].length>3){k.type="select"}else{k.type="radio"}}else{k.type=a.defaultSchemaFieldMapping[e.type]}if(e.format&&a.defaultFormatFieldMapping[e.format]){k.type=a.defaultFormatFieldMapping[e.format]}}var i=a.getFieldClass(k.type);if(!i){g({message:"Unable to find field class for type: "+k.type,reason:"FIELD_INSTANTIATION_ERROR"});return null}return new i(c,f,k,e,j,d,g)},parseJSON:function(c){if(!c){return null}return b.parseJSON(c)},compile:function(d,g){var k=this;var f={errors:[],count:0,successCount:0};var i=function(l){if(f.errors.length===0){for(var m in l){k.normalizedViews[m]=l[m]}}d(f)};var h=function(n,p,m,o,q,r){var l=m.id;f.count++;if(p){f.errors.push({view:l,template:o,err:p})}else{f.successCount++;m.compiledTemplates[o]=q}if(f.count==r){i(n)}};var c=function(v,r,t,u,m){var s=r.id;var p=null;if(a.isObject(u)){p=u.type;u=u.template}if(!p){p="text/x-jquery-tmpl"}var q=a.TemplateEngineRegistry.find(p);if(!q){a.logError("Cannot find template engine for type: "+p);var l=new Error("Cannot find template engine for type: "+p);h(v,l,r,t,n,m)}var n=s+"_"+t;if(q.isCached(n)){h(v,null,r,t,n,m)}else{var o=r.compiledTemplates["view-"+u];if(o){u=a.TemplateCache[o]}q.compile(n,u,function(w,x){h(v,w,r,t,n,m)})}};var j=function(s){var m=[];for(var q in s){var p=s[q];p.compiledTemplates={};if(p.templates){for(var l in p.templates){var r=p.templates[l];m.push(function(v,u,x,w){return function(y){c(v,u,x,w,y)}}(s,p,"view-"+l,r))}}if(p.fields){for(var t in p.fields){if(p.fields[t].templates){for(var l in p.fields[t].templates){var r=p.fields[t].templates[l];m.push(function(v,u,x,w){return function(y){c(v,u,x,w,y)}}(s,p,"field-"+t+"-"+l,r))}}}}if(p.layout&&p.layout.template){var r=p.layout.template;m.push(function(v,u,x,w){return function(y){c(v,u,x,w,y)}}(s,p,"layoutTemplate",r))}if(p.globalTemplate){var r=p.globalTemplate;m.push(function(v,u,x,w){return function(y){c(v,u,x,w,y)}}(s,p,"globalTemplate",r))}}var n=m.length;for(var o=0;o<m.length;o++){m[o](n)}};var e=function(){var m={};var o=0;if(!a.normalizedViews){a.normalizedViews={}}k.normalizedViews=a.normalizedViews;for(var l in k.views){if(!a.normalizedViews[l]){var n=new a.NormalizedView(l);if(n.normalize()){m[l]=n;o++}else{return a.throwErrorWithCallback("View normalization failed, cannot initialize Alpaca.  Please check the error logs.",g)}}}if(o>0){j(m)}else{i(m)}};e()},getTemplateDescriptor:function(i,d,j){var c={};var m;var e;if(i.templates&&i.templates[d]){m=i.templates[d];e="view"}if(j&&j.path){var n=j.path;if(i&&i.fields&&i.fields[n]&&i.fields[n].templates&&i.fields[n].templates[d]){m=i.fields[n].templates[d];e="field"}}if(d=="globalTemplate"){m="globalTemplate";e="global"}if(d=="layoutTemplate"){m="layoutTemplate";e="layout"}c.template={};c.template.id=d;c.template.type=e;c.template.value=m;var g=null;var l=m;if(a.isObject(l)){g=l.type;l=l.template}if(!g){g="text/x-jquery-tmpl"}var h=a.TemplateEngineRegistry.find(g);if(!h){return a.throwDefaultError("Cannot find template engine for type: "+g)}c.engine={};c.engine.type=g;c.engine.id=h.id;var k=null;if(e=="view"){k="view-"+d}else{if(e=="field"){k="field-"+j.path+"-"+d}else{if(e=="layout"){k="layoutTemplate"}else{if(e=="global"){k="globalTemplate"}}}}c.compiledTemplateId=k;var f=i.compiledTemplates[k];if(!f||!h.isCached(f)){return null}c.cache={};c.cache.key=f;return c},tmpl:function(d,c,e){if(a.isString(d)){d=this.normalizedViews[d]}var i=c.engine.type;var h=c.compiledTemplateId;var g=a.TemplateEngineRegistry.find(i);if(!g){return a.throwDefaultError("Cannot find template engine for type: "+i)}var j=c.cache.key;var f=g.execute(j,e,function(k){return a.throwDefaultError("The compiled template: "+h+" for view: "+d.id+" failed to execute: "+JSON.stringify(k))});return a.safeDomParse(f)}});a.DEBUG=0;a.INFO=1;a.WARN=2;a.ERROR=3;a.logLevel=a.WARN;a.logDebug=function(c){a.log(a.DEBUG,c)};a.logInfo=function(c){a.log(a.INFO,c)};a.logWarn=function(c){a.log(a.WARN,c)};a.logError=function(c){a.log(a.ERROR,c)};a.log=function(f,c){var e={0:"debug",1:"info",2:"warn",3:"error"};if(a.logLevel<=f){var d=e[f];if(typeof console!=="undefined"&&console[d]){if("debug"==d){console.debug(c)}else{if("info"==d){console.info(c)}else{if("warn"==d){console.warn(c)}else{if("error"==d){console.error(c)}else{console.log(c)}}}}}}};a.checked=function(c,d){return a.attrProp(c,"checked",d)};a.attrProp=function(d,c,e){if(!(typeof(e)==="undefined")){if(b(d).prop){b(d).prop(c,e)}else{if(e){b(d).attr(c,e)}else{b(d).removeAttr(c)}}}if(b(d).prop){return b(d).prop(c)}return b(d).attr(c)};a.loadRefSchemaOptions=function(h,g,i){if(g.indexOf("#/definitions/")>-1){var d=g.substring(14);var c=null;if(h.schema.definitions){c=h.schema.definitions[d]}var f=null;if(h.options.definitions){f=h.options.definitions[d]}i(c,f)}else{var e=a.resolveReference(h.schema,h.options,g);if(e){i(e.schema,e.options)}else{i()}}};a.DEFAULT_ERROR_CALLBACK=function(c){if(c&&c.message){a.logError(c.message);throw new Error("Alpaca caught an error with the default error handler: "+c.message)}};a.defaultErrorCallback=a.DEFAULT_ERROR_CALLBACK;a.throwDefaultError=function(d){if(d&&a.isObject(d)){d=JSON.stringify(d)}var c={message:d};a.defaultErrorCallback(c)};a.throwErrorWithCallback=function(e,c){if(e&&a.isObject(e)){e=JSON.stringify(e)}var d={message:e};if(c){c(d)}else{a.defaultErrorCallback(d)}};a.resolveReference=function(g,e,h){if(g.id==h){var d={};if(g){d.schema=g}if(e){d.options=e}return d}else{if(g&&g.properties){for(var i in g.properties){var f=g.properties[i];var j=null;if(e&&e.fields&&e.fields[i]){j=e.fields[i]}var c=a.resolveReference(f,j,h);if(c){return c}}}}return null};b.alpaca=window.Alpaca=a;b.fn.alpaca=function(){var d=a.makeArray(arguments);var c=[].concat(this,d);return a.apply(this,c)};b.fn.outerHTML=function(c){if(c){return b("<div></div>").append(this).html()}else{return b("<div></div>").append(this.clone()).html()}};b.fn.swapWith=function(c){return this.each(function(){var d=b(c).clone();var e=b(this).clone();b(c).replaceWith(e);b(this).replaceWith(d)})};b.fn.attrProp=function(c,d){return a.attrProp(b(this),c,d)};b.event.special.destroyed={remove:function(c){if(c.handler){c.handler()}}}})(jQuery);(function(){Alpaca.TemplateEngineRegistry=function(){var a={};return{register:function(c,b){a[c]=b},find:function(d){var e=null;if(a[d]){e=a[d]}else{for(var f in a){var c=a[f].supportedMimetypes();for(var b=0;b<c.length;b++){if(d.toLowerCase()==c[b].toLowerCase()){e=a[f];break}}}}return e},ids:function(){var b=[];for(var c in a){b.push(c)}return b}}}()})();(function(a){if(typeof(Alpaca.TemplateCache)=="undefined"){Alpaca.TemplateCache={}}Alpaca.AbstractTemplateEngine=Base.extend({constructor:function(b){this.base();this.id=b;this.cleanMarkup=function(c){var d=Alpaca.safeDomParse(c);if(a(d).length==1){if(a(d)[0].nodeName.toLowerCase()=="script"){c=a(d).html()}}return c}},compile:function(h,f,i){var b=this;var e="html";if(Alpaca.isString(f)){if(f.indexOf("./")===0||f.indexOf("/")===0||f.indexOf("../")===0){e="uri"}else{if(f.indexOf("#")===0||f.indexOf(".")===0||f.indexOf("[")===0){e="selector"}}}else{}if(e=="selector"){b._compile(h,f,i)}else{if(e=="uri"){var g=b.fileExtension();var c=f;if(c.indexOf("."+g)===-1){c+="."+g}a.ajax({url:c,dataType:"html",success:function(j){j=b.cleanMarkup(j);b._compile(h,j,i)},failure:function(j){i(j,null)}})}else{if(e=="html"){var d=f;if(d instanceof jQuery){d=Alpaca.safeDomParse(f).outerHTML()}b._compile(h,d,i)}else{i(new Error("Template engine cannot determine how to handle type: "+e))}}}},_compile:function(c,b,d){if(Alpaca.isEmpty(b)){b=""}b=Alpaca.trim(b);if(b.toLowerCase().indexOf("<script")===0){}else{b="<script type='"+this.supportedMimetypes()[0]+"'>"+b+"<\/script>"}Alpaca.logDebug("Compiling template: "+this.id+", cacheKey: "+c+", template: "+b);this.doCompile(c,b,d)},doCompile:function(c,b,d){},execute:function(e,b,f){Alpaca.logDebug("Executing template for cache key: "+e);var c=this.doExecute(e,b,f);var d=function(g){var h=Alpaca.safeDomParse(g);if(a(h).length==1){if(a(h)[0].nodeName.toLowerCase()=="script"){return a(h).html()}}return g};c=d(c);return c},doExecute:function(c,b,d){},fileExtension:function(){return"html"},supportedMimetypes:function(){return[]},isCached:function(b){}})})(jQuery);(function(a){Alpaca.JQueryTemplateEngine=Alpaca.AbstractTemplateEngine.extend({fileExtension:function(){return"html"},supportedMimetypes:function(){return["text/x-jquery-template","text/x-jquery-tmpl"]},doCompile:function(d,b,f){try{a.template(d,b)}catch(c){f(c);return}Alpaca.TemplateCache[d]=b;f()},doExecute:function(k,g,l){var m=this;var f=null;try{var b=a.tmpl(k,g);b=b.outerHTML();var d=-1;do{d=b.indexOf("_tmplitem=");if(d>-1){var c=b.indexOf(" ",d);if(c==-1){c=b.indexOf(">",d)}if(c==-1){l({message:"Should have found closing whitespace or '>' for _tmplitem attribute"});return}b=b.substring(0,d)+b.substring(c)}}while(d>-1);f=Alpaca.safeDomParse(b)}catch(h){l({message:h.message});return null}return f},isCached:function(b){return(Alpaca.TemplateCache[b]?true:false)}});Alpaca.TemplateEngineRegistry.register("tmpl",new Alpaca.JQueryTemplateEngine("tmpl"))})(jQuery);(function(a){Alpaca.EJSTemplateEngine=Alpaca.AbstractTemplateEngine.extend({fileExtension:function(){return"ejs"},supportedMimetypes:function(){return["text/x-ejs-template","text/x-ejs-tmpl"]},doCompile:function(f,c,g){var b=null;try{b=new EJS({name:f,text:c})}catch(d){g(d);return}Alpaca.TemplateCache[f]=b;g()},doExecute:function(g,c,h){var b=Alpaca.TemplateCache[g];var d=null;try{d=b.render(c)}catch(f){h(f);return null}return d},isCached:function(b){return(Alpaca.TemplateCache[b]?true:false)}});Alpaca.TemplateEngineRegistry.register("ejs",new Alpaca.EJSTemplateEngine("ejs"))})(jQuery);(function(a){Alpaca.HandlebarsTemplateEngine=Alpaca.AbstractTemplateEngine.extend({fileExtension:function(){return"html"},supportedMimetypes:function(){return["text/x-handlebars-template","text/x-handlebars-tmpl"]},doCompile:function(f,b,g){var c=null;try{c=Handlebars.compile(b)}catch(d){g(d);return}Alpaca.TemplateCache[f]=c;g()},doExecute:function(g,b,h){var d=Alpaca.TemplateCache[g];var c=null;try{c=d(b)}catch(f){h(f);return null}return c},isCached:function(b){return(Alpaca.TemplateCache[b]?true:false)}});Alpaca.TemplateEngineRegistry.register("handlebars",new Alpaca.HandlebarsTemplateEngine("handlebars"))})(jQuery);(function(b){var a=b.alpaca;a.styleInjections={};a.registerView({id:"VIEW_BASE",title:"Abstract base view",description:"Foundation view which provides an abstract view from which all other views extend.",messages:{countries:{afg:"Afghanistan",ala:"Aland Islands",alb:"Albania",dza:"Algeria",asm:"American Samoa",and:"Andorra",ago:"Angola",aia:"Anguilla",ata:"Antarctica",atg:"Antigua and Barbuda",arg:"Argentina",arm:"Armenia",abw:"Aruba",aus:"Australia",aut:"Austria",aze:"Azerbaijan",bhs:"Bahamas",bhr:"Bahrain",bgd:"Bangladesh",brb:"Barbados",blr:"Belarus",bel:"Belgium",blz:"Belize",ben:"Benin",bmu:"Bermuda",btn:"Bhutan",bol:"Bolivia",bih:"Bosnia and Herzegovina",bwa:"Botswana",bvt:"Bouvet Island",bra:"Brazil",iot:"British Indian Ocean Territory",brn:"Brunei Darussalam",bgr:"Bulgaria",bfa:"Burkina Faso",bdi:"Burundi",khm:"Cambodia",cmr:"Cameroon",can:"Canada",cpv:"Cape Verde",cym:"Cayman Islands",caf:"Central African Republic",tcd:"Chad",chl:"Chile",chn:"China",cxr:"Christmas Island",cck:"Cocos (Keeling), Islands",col:"Colombia",com:"Comoros",cog:"Congo",cod:"Congo, the Democratic Republic of the",cok:"Cook Islands",cri:"Costa Rica",hrv:"Croatia",cub:"Cuba",cyp:"Cyprus",cze:"Czech Republic",civ:"Cote d'Ivoire",dnk:"Denmark",dji:"Djibouti",dma:"Dominica",dom:"Dominican Republic",ecu:"Ecuador",egy:"Egypt",slv:"El Salvador",gnq:"Equatorial Guinea",eri:"Eritrea",est:"Estonia",eth:"Ethiopia",flk:"Falkland Islands (Malvinas),",fro:"Faroe Islands",fji:"Fiji",fin:"Finland",fra:"France",guf:"French Guiana",pyf:"French Polynesia",atf:"French Southern Territories",gab:"Gabon",gmb:"Gambia",geo:"Georgia",deu:"Germany",gha:"Ghana",gib:"Gibraltar",grc:"Greece",grl:"Greenland",grd:"Grenada",glp:"Guadeloupe",gum:"Guam",gtm:"Guatemala",ggy:"Guernsey",gin:"Guinea",gnb:"Guinea-Bissau",guy:"Guyana",hti:"Haiti",hmd:"Heard Island and McDonald Islands",vat:"Holy See (Vatican City State),",hnd:"Honduras",hkg:"Hong Kong",hun:"Hungary",isl:"Iceland",ind:"India",idn:"Indonesia",irn:"Iran, Islamic Republic of",irq:"Iraq",irl:"Ireland",imn:"Isle of Man",isr:"Israel",ita:"Italy",jam:"Jamaica",jpn:"Japan",jey:"Jersey",jor:"Jordan",kaz:"Kazakhstan",ken:"Kenya",kir:"Kiribati",prk:"Korea, Democratic People's Republic of",kor:"Korea, Republic of",kwt:"Kuwait",kgz:"Kyrgyzstan",lao:"Lao People's Democratic Republic",lva:"Latvia",lbn:"Lebanon",lso:"Lesotho",lbr:"Liberia",lby:"Libyan Arab Jamahiriya",lie:"Liechtenstein",ltu:"Lithuania",lux:"Luxembourg",mac:"Macao",mkd:"Macedonia, the former Yugoslav Republic of",mdg:"Madagascar",mwi:"Malawi",mys:"Malaysia",mdv:"Maldives",mli:"Mali",mlt:"Malta",mhl:"Marshall Islands",mtq:"Martinique",mrt:"Mauritania",mus:"Mauritius",myt:"Mayotte",mex:"Mexico",fsm:"Micronesia, Federated States of",mda:"Moldova, Republic of",mco:"Monaco",mng:"Mongolia",mne:"Montenegro",msr:"Montserrat",mar:"Morocco",moz:"Mozambique",mmr:"Myanmar",nam:"Namibia",nru:"Nauru",npl:"Nepal",nld:"Netherlands",ant:"Netherlands Antilles",ncl:"New Caledonia",nzl:"New Zealand",nic:"Nicaragua",ner:"Niger",nga:"Nigeria",niu:"Niue",nfk:"Norfolk Island",mnp:"Northern Mariana Islands",nor:"Norway",omn:"Oman",pak:"Pakistan",plw:"Palau",pse:"Palestinian Territory, Occupied",pan:"Panama",png:"Papua New Guinea",pry:"Paraguay",per:"Peru",phl:"Philippines",pcn:"Pitcairn",pol:"Poland",prt:"Portugal",pri:"Puerto Rico",qat:"Qatar",rou:"Romania",rus:"Russian Federation",rwa:"Rwanda",reu:"Reunion",blm:"Saint Barthelemy",shn:"Saint Helena",kna:"Saint Kitts and Nevis",lca:"Saint Lucia",maf:"Saint Martin (French part)",spm:"Saint Pierre and Miquelon",vct:"Saint Vincent and the Grenadines",wsm:"Samoa",smr:"San Marino",stp:"Sao Tome and Principe",sau:"Saudi Arabia",sen:"Senegal",srb:"Serbia",syc:"Seychelles",sle:"Sierra Leone",sgp:"Singapore",svk:"Slovakia",svn:"Slovenia",slb:"Solomon Islands",som:"Somalia",zaf:"South Africa",sgs:"South Georgia and the South Sandwich Islands",esp:"Spain",lka:"Sri Lanka",sdn:"Sudan",sur:"Suriname",sjm:"Svalbard and Jan Mayen",swz:"Swaziland",swe:"Sweden",che:"Switzerland",syr:"Syrian Arab Republic",twn:"Taiwan, Province of China",tjk:"Tajikistan",tza:"Tanzania, United Republic of",tha:"Thailand",tls:"Timor-Leste",tgo:"Togo",tkl:"Tokelau",ton:"Tonga",tto:"Trinidad and Tobago",tun:"Tunisia",tur:"Turkey",tkm:"Turkmenistan",tca:"Turks and Caicos Islands",tuv:"Tuvalu",uga:"Uganda",ukr:"Ukraine",are:"United Arab Emirates",gbr:"United Kingdom",usa:"United States",umi:"United States Minor Outlying Islands",ury:"Uruguay",uzb:"Uzbekistan",vut:"Vanuatu",ven:"Venezuela",vnm:"Viet Nam",vgb:"Virgin Islands, British",vir:"Virgin Islands, U.S.",wlf:"Wallis and Futuna",esh:"Western Sahara",yem:"Yemen",zmb:"Zambia",zwe:"Zimbabwe"},empty:"",required:"This field is required",valid:"",invalid:"This field is invalid",months:["January","February","March","April","May","June","July","August","September","October","November","December"],timeUnits:{SECOND:"seconds",MINUTE:"minutes",HOUR:"hours",DAY:"days",MONTH:"months",YEAR:"years"}}})})(jQuery);(function(b){var a=b.alpaca;a.styleInjections={};a.registerView({id:"VIEW_WEB_DISPLAY",parent:"VIEW_BASE",title:"Default Web Display View",description:"Default web edit view which goes though field hierarchy.",type:"view",platform:"web",displayReadonly:true,templates:{controlField:'<div class="alpaca-data-container">{{if options.label}}<div class="alpaca-data-label">${options.label}</div>{{/if}}<div class="alpaca-data">&nbsp;${data}</div></div>',fieldSetOuterEl:'<div class="ui-widget ui-widget-content">{{html this.html}}</div>',fieldSetLegend:'{{if options.label}}<div class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</div>{{/if}}',fieldSetItemsContainer:"<div>{{html this.html}}</div>",fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',controlFieldContainer:"<div>{{html this.html}}</div>",arrayToolbar:"",arrayItemToolbar:""}});a.registerView({id:"VIEW_WEB_EDIT",parent:"VIEW_BASE",title:"Default Web Edit View",description:"Default web edit view which goes though field hierarchy.",type:"edit",platform:"web",displayReadonly:true,templates:{controlFieldOuterEl:"<span>{{html this.html}}</span>",controlFieldMessage:'<div><span class="ui-icon ui-icon-alert"></span><span class="alpaca-controlfield-message-text">${message}</span></div>',controlFieldLabel:'{{if options.label}}<div class="{{if options.labelClass}}${options.labelClass}{{/if}}"><div>${options.label}</div></div>{{/if}}',controlFieldHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}"><span class="ui-icon ui-icon-info"></span><span class="alpaca-controlfield-helper-text">${options.helper}</span></div>{{/if}}',controlFieldContainer:"<div>{{html this.html}}</div>",controlField:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldLabel")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldContainer",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldHelper")}}{{/wrap}}{{/wrap}}',fieldSetOuterEl:"<fieldset>{{html this.html}}</fieldset>",fieldSetMessage:'<div><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><span>${message}</span></div>',fieldSetLegend:'{{if options.label}}<legend class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</div>{{/if}}',fieldSetItemsContainer:"<div>{{html this.html}}</div>",fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:"<div></div>",formFieldsContainer:"<div>{{html this.html}}</div>",formButtonsContainer:'<div>{{if options.buttons}}{{each(k,v) options.buttons}}<button data-key="${k}" class="alpaca-form-button alpaca-form-button-${k}" {{each(k1,v1) v}}${k1}="${v1}"{{/each}}>${v.value}</button>{{/each}}{{/if}}</div>',form:'<form>{{html Alpaca.fieldTemplate(this,"formFieldsContainer")}}{{html Alpaca.fieldTemplate(this,"formButtonsContainer")}}</form>',wizardStep:'<div class="alpaca-clear"></div>',wizardNavBar:"<div></div>",wizardPreButton:"<button>Back</button>",wizardNextButton:"<button>Next</button>",wizardDoneButton:"<button>Done</button>",wizardStatusBar:'<ol id="${id}">{{each(i,v) titles}}<li id="stepDesc${i}"><div><strong><span>${v.title}</span>${v.description}</strong></div></li>{{/each}}</ol>'}});a.registerView({id:"VIEW_WEB_CREATE",parent:"VIEW_WEB_EDIT",title:"Default Web Create View",description:"Default web create view which doesn't bind initial data.",type:"create",displayReadonly:false})})(jQuery);(function(c){var b=c.alpaca;var a={controlFieldOuterEl:'<span class="alpaca-view-web-list">{{html this.html}}</span>',controlFieldMessage:'<div><span class="ui-icon ui-icon-alert"></span><span class="alpaca-controlfield-message-text">${message}</span></div>',controlFieldLabel:'{{if options.label}}<label for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</label>{{/if}}',controlFieldHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}"><span class="ui-icon ui-icon-info"></span><span class="alpaca-controlfield-helper-text">${options.helper}</span></div>{{/if}}',controlFieldContainer:"<div>{{html this.html}}</div>",controlField:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldLabel")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldContainer",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldHelper")}}{{/wrap}}{{/wrap}}',fieldSetOuterEl:'<fieldset class="alpaca-view-web-list">{{html this.html}}</fieldset>',fieldSetMessage:'<div><span class="ui-icon ui-icon-alert alpaca-fieldset-message-list-view"></span><span>${message}</span></div>',fieldSetLegend:'{{if options.label}}<legend class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</div>{{/if}}',fieldSetItemsContainer:"<ol>{{html this.html}}</ol>",fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:'<li style="list-style:none;"></li>',itemLabel:'{{if options.itemLabel}}<label for="${id}" class="alpaca-controlfield-label alpaca-controlfield-label-list-view"><span class="alpaca-controlfield-item-label-list-view">${options.itemLabel}{{if index}} <span class="alpaca-item-label-counter">${index}</span></span>{{/if}}</label>{{/if}}'};b.registerView({id:"VIEW_WEB_DISPLAY_LIST",parent:"VIEW_WEB_DISPLAY",title:"Web Display View List Style",description:"Web display view based on list styles.",legendStyle:"link",templates:a,styles:{},fields:{"/":{templates:{fieldSetItemsContainer:'<ol class="alpaca-fieldset-itemscontainer-list-view-top">{{html this.html}}</ol>',fieldSetItemContainer:'<li class="alpaca-fieldset-itemcontainer-list-view-top"></li>'}}}});b.registerView({id:"VIEW_WEB_EDIT_LIST",parent:"VIEW_WEB_EDIT",title:"Web Edit View List Style",description:"Web edit view based on list styles.",legendStyle:"link",templates:a,styles:{},fields:{"/":{templates:{fieldSetItemsContainer:'<ol class="alpaca-fieldset-itemscontainer-list-view-top">{{html this.html}}</ol>',fieldSetItemContainer:'<li class="alpaca-fieldset-itemcontainer-list-view-top"></li>'}}}});b.registerView({id:"VIEW_WEB_CREATE_LIST",parent:"VIEW_WEB_CREATE",title:"Web Create View List Style",description:"Web create view based on list styles.",legendStyle:"link",templates:a,styles:{},fields:{"/":{templates:{fieldSetItemsContainer:'<ol class="alpaca-fieldset-itemscontainer-list-view-top">{{html this.html}}</ol>',fieldSetItemContainer:'<li class="alpaca-fieldset-itemcontainer-list-view-top"></li>'}}}})})(jQuery);(function(b){var a=b.alpaca;a.styleInjections["jquery-ui"]={field:function(c){c.addClass("ui-widget")},required:function(c){b('<span class="ui-icon ui-icon-star"></span>').prependTo(c)},error:function(c){c.addClass("ui-state-error")},errorMessage:function(c){c.addClass("ui-state-error-text")},removeError:function(c){c.removeClass("ui-state-error")},container:function(c){c.addClass("ui-widget-content")},wizardStatusBar:function(c){c.addClass("ui-widget-header ui-corner-all")},wizardCurrentStep:function(c){c.addClass("ui-state-highlight ui-corner-all")},wizardUnCurrentStep:function(c){c.removeClass("ui-state-highlight ui-corner-all")},containerExpandedIcon:"ui-icon-circle-arrow-s",containerCollapsedIcon:"ui-icon-circle-arrow-e",commonIcon:"ui-icon",addIcon:"ui-icon-circle-plus",removeIcon:"ui-icon-circle-minus",upIcon:"ui-icon-circle-arrow-n",downIcon:"ui-icon-circle-arrow-s",wizardPreIcon:"ui-icon-triangle-1-w",wizardNextIcon:"ui-icon-triangle-1-e",wizardDoneIcon:"ui-icon-triangle-1-e",buttonBeautifier:function(d,c,f){d.addClass("ui-button ui-widget ui-state-default ui-corner-all");if(f){d.addClass("ui-button-text-icon-primary")}else{d.addClass("ui-button-icon-only")}var e=d.html();d.attr("title",e);d.empty().append('<span class="ui-button-icon-primary ui-icon alpaca-fieldset-legend-button '+c+'"></span><span class="ui-button-text">'+e+"</span>");d.hover(function(){if(!d.hasClass("alpaca-fieldset-array-item-toolbar-disabled")){b(this).addClass("ui-state-hover")}},function(){if(!d.hasClass("alpaca-fieldset-array-item-toolbar-disabled")){b(this).removeClass("ui-state-hover")}})}};a.registerView({id:"VIEW_JQUERYUI_DISPLAY",parent:"VIEW_WEB_DISPLAY",title:"Web Display View for jQuery UI",description:"Web Display View for jQuery UI",style:"jquery-ui",ui:"jquery-ui"});a.registerView({id:"VIEW_JQUERYUI_EDIT",parent:"VIEW_WEB_EDIT",title:"Web Edit View for jQuery UI",description:"Web Edit View for jQuery UI",style:"jquery-ui",ui:"jquery-ui"});a.registerView({id:"VIEW_JQUERYUI_CREATE",parent:"VIEW_WEB_CREATE",title:"Web Create View for jQuery UI",description:"Web Create View for jQuery UI",style:"jquery-ui",ui:"jquery-ui"});a.registerView({id:"VIEW_JQUERYUI_EDIT_LIST",parent:"VIEW_WEB_EDIT_LIST",title:"JQuery UI Edit View List Style",description:"JQuery UI edit view based on list styles.",style:"jquery-ui",ui:"jquery-ui"});a.registerView({id:"VIEW_JQUERYUI_CREATE_LIST",parent:"VIEW_WEB_CREATE_LIST",title:"JQuery UI Create View List Style",description:"JQuery UI create view based on list styles.",style:"jquery-ui",ui:"jquery-ui"})})(jQuery);(function(c){var b=c.alpaca;b.styleInjections["jquery-mobile"]={array:function(d){if(d){if(d.find('[data-role="fieldcontain"]').fieldcontain){d.find('[data-role="fieldcontain"]').fieldcontain();d.find('[data-role="fieldcontain"]').find("[type='radio'], [type='checkbox']").checkboxradio();d.find('[data-role="fieldcontain"]').find("button, [data-role='button'], [type='button'], [type='submit'], [type='reset'], [type='image']").not(".ui-nojs").button();d.find('[data-role="fieldcontain"]').find("input, textarea").not("[type='radio'], [type='checkbox'], button, [type='button'], [type='submit'], [type='reset'], [type='image']").textinput();d.find('[data-role="fieldcontain"]').find("input, select").filter("[data-role='slider'], [data-type='range']").slider();d.find('[data-role="fieldcontain"]').find("select:not([data-role='slider'])").selectmenu();d.find('[data-role="button"]').buttonMarkup();d.find('[data-role="controlgroup"]').controlgroup()}}}};b.registerView({id:"VIEW_MOBILE_DISPLAY",parent:"VIEW_WEB_DISPLAY",title:"Mobile DISPLAY View",description:"Mobile display view using JQuery Mobile Library",type:"view",platform:"mobile",style:"jquery-mobile",ui:"mobile",legendStyle:"link",toolbarStyle:"link",buttonType:"link",templates:{controlField:'<ul data-role="listview"><li>{{if options.label}}<h4>${options.label}</h4>{{/if}}<p><strong>${data}</strong></p></li></ul>',fieldSetOuterEl:'<fieldset data-role="collapsible" id="${id}" data-collapsed="{{if options.collapsed}}true{{else}}false{{/if}}">{{html this.html}}</fieldset>',fieldSetMessage:"<div>* ${message}</div>",fieldSetLegend:'{{if options.label}}<legend for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<h3 class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</h3>{{/if}}',fieldSetItemsContainer:'<div data-role="controlgroup">{{html this.html}}</div>',fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:"<div></div>"},messages:{required:"Required Field",invalid:"Invalid Field"},render:function(e,f){var d=this;e.render(e.view,function(g){a(g.getEl());if(f){f.call(d,g)}})}});b.registerView({id:"VIEW_MOBILE_EDIT",parent:"VIEW_WEB_EDIT",title:"Mobile Edit View",description:"Mobile edit view using JQuery Mobile Library",type:"edit",platform:"mobile",style:"jquery-mobile",ui:"mobile",legendStyle:"link",toolbarStyle:"link",buttonType:"link",toolbarSticky:true,templates:{controlFieldOuterEl:'<div data-role="fieldcontain">{{html this.html}}</div>',controlFieldMessage:"<div>* ${message}</div>",controlFieldLabel:'{{if options.label}}<label for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</label>{{/if}}',controlFieldHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</div>{{/if}}',controlFieldContainer:'<div data-replace="true">{{html this.html}}</div>',controlField:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldLabel")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldContainer",true)}}{{/wrap}}{{html Alpaca.fieldTemplate(this,"controlFieldHelper")}}{{/wrap}}',fieldSetOuterEl:'<fieldset id="${id}" data-collapsed="{{if options.collapsed}}true{{else}}false{{/if}}">{{html this.html}}</fieldset>',fieldSetMessage:"<div>* ${message}</div>",fieldSetLegend:'{{if options.label}}<legend for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<h3 class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</h3>{{/if}}',fieldSetItemsContainer:'<div data-role="controlgroup">{{html this.html}}</div>',fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:"<div></div>",formFieldsContainer:'<div data-role="content">{{html this.html}}</div>',form:'<form>{{html Alpaca.fieldTemplate(this,"formFieldsContainer")}}{{html Alpaca.fieldTemplate(this,"formButtonsContainer")}}</form>',controlFieldRadio:'<fieldset data-role="controlgroup" class="alpaca-radio-fieldset" id="${id}">{{each selectOptions}}<input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" id="${id}-${$index}" value="${value}" {{if value == data}}checked="checked"{{/if}}/><label for="${id}-${$index}">${text}</label>{{/each}}</fieldset>',controlFieldCheckbox:'<fieldset data-role="controlgroup" class="alpaca-radio-fieldset" id="${id}-0"><input type="checkbox" id="${id}-1" name="${id}-1" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each options.data}}data-${fieldId}="${value}"{{/each}}/>{{if options.rightLabel}}<label for="${id}-1">${options.rightLabel}</label>{{else}}{{if options.label}}<label for="${id}-1">${options.label}?</label>{{/if}}{{/if}}</fieldset>',arrayItemToolbar:'<div class="alpaca-fieldset-array-item-toolbar" data-role="controlgroup" data-type="horizontal" data-mini="true"><span class="alpaca-fieldset-array-item-toolbar-add" data-role="button" data-icon="add" data-iconpos="notext">Add</span><span class="alpaca-fieldset-array-item-toolbar-remove" data-role="button" data-icon="delete" data-iconpos="notext">Delete</span><span class="alpaca-fieldset-array-item-toolbar-up" data-role="button" data-icon="arrow-u" data-iconpos="notext">Up</span><span class="alpaca-fieldset-array-item-toolbar-down" data-role="button" data-icon="arrow-d" data-iconpos="notext">Down</span></div>',arrayToolbar:'<div class="alpaca-fieldset-array-toolbar" data-role="controlgroup"  data-mini="true"><span class="alpaca-fieldset-array-toolbar-icon alpaca-fieldset-array-toolbar-add" data-role="button" data-icon="add" data-inline="true" title="Add">Add</span></div>'},messages:{required:"Required Field",invalid:"Invalid Field"},render:function(e,f){var d=this;e.render(function(g){a(g.getEl());if(f){f.call(d,g)}})}});var a=function(e){var d=e;while(!b.isEmpty(d)&&d.attr("data-role")!=="page"){d=d.parent()}if(!b.isEmpty(d)){c(d).trigger("pagecreate")}};b.registerView({id:"VIEW_MOBILE_CREATE",parent:"VIEW_MOBILE_EDIT",title:"Default Mobile Create View",description:"Default mobile create view which doesn't bind initial data.",type:"create",displayReadonly:false})})(jQuery);(function(b){var a=b.alpaca;a.styleInjections.bootstrap={error:function(e){e.addClass("control-group error")},errorMessage:function(e){e.addClass("")},removeError:function(e){e.removeClass("error")},tooltipErrorMessage:function(f,e){if(b.fn.tooltip){f.tooltip({html:e}).click()}},field:function(e){e.addClass("control-group")},required:function(e){b('<span class="icon-star"></span>&nbsp;').prependTo(e)},container:function(e){e.addClass("")},wizardStatusBar:function(e){e.addClass("ui-widget-header ui-corner-all")},wizardCurrentStep:function(e){e.addClass("ui-state-highlight ui-corner-all")},wizardUnCurrentStep:function(e){e.removeClass("ui-state-highlight ui-corner-all")},commonIcon:"",addIcon:"icon-plus-sign",removeIcon:"icon-minus-sign",upIcon:"icon-chevron-up",downIcon:"icon-chevron-down",wizardPreIcon:"ui-icon-triangle-1-w",wizardNextIcon:"ui-icon-triangle-1-e",wizardDoneIcon:"ui-icon-triangle-1-e",containerExpandedIcon:"icon-circle-arrow-down",containerCollapsedIcon:"icon-circle-arrow-right",buttonBeautifier:function(g,e,i){var h=g.html();g.attr("title",h);var f=i?h:"";g.empty().append('<b class="alpaca-fieldset-legend-button '+e+'"></b><span>'+f+"</span>")}};var d={controlFieldLabel:'{{if options.label}}<label class="control-label {{if options.labelClass}}${options.labelClass}{{/if}}" for="${id}">${options.label}</label>{{/if}}',controlFieldHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}"><i class="icon-info-sign"></i> <span class="alpaca-controlfield-helper-text">${options.helper}</span></div>{{/if}}',controlFieldMessage:'<div><span class="icon-exclamation-sign"></span><span class="alpaca-controlfield-message-text help-inline">${message}</span></div>',arrayToolbar:'<span class="alpaca-fieldset-array-toolbar"><button class="btn alpaca-fieldset-array-toolbar-icon alpaca-fieldset-array-toolbar-add">${addItemLabel}</button></span>',arrayItemToolbar:'<div class="btn-toolbar alpaca-fieldset-array-item-toolbar"><div class="btn-group">{{each(k,v) buttons}}<button class="btn btn-small alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-${v.feature}">${v.label}</button>{{/each}}</div></div>',controlFieldCheckbox:'<span>{{if options.rightLabel}}<label for="${id}" class="checkbox">{{/if}}<input type="checkbox" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>{{if options.rightLabel}}${options.rightLabel}</label>{{/if}}</span>',controlFieldRadio:'<div id="${id}" class="alpaca-controlfield-radio">{{if !required}}<label class="alpaca-controlfield-radio-label radio inline"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value=""/>None</label>{{/if}}{{each selectOptions}}<label class="alpaca-controlfield-radio-label radio inline"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value="${value}" {{if value == data}}checked="checked"{{/if}}/>${text}</label>{{/each}}</div>',fieldSetHelper:'{{if options.helper}}<p class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</p>{{/if}}'};var c=function(f,g){var e=this;f.render(function(h){b("select,input,textarea",h.outerEl).addClass("input-xlarge");b("button:submit, button:reset, .alpaca-form-button").addClass("btn");if(g){g.call(e,h)}})};a.registerView({id:"VIEW_BOOTSTRAP_DISPLAY",parent:"VIEW_WEB_DISPLAY",title:"Display View for Bootstrap",description:"Display View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c});a.registerView({id:"VIEW_BOOTSTRAP_EDIT",parent:"VIEW_WEB_EDIT",title:"Edit View for Bootstrap",description:"Edit View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c});a.registerView({id:"VIEW_BOOTSTRAP_CREATE",parent:"VIEW_WEB_CREATE",title:"Create View for Bootstrap",description:"Create View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c});a.registerView({id:"VIEW_BOOTSTRAP_DISPLAY_LIST",parent:"VIEW_WEB_DISPLAY_LIST",title:"Display List View for Bootstrap",description:"Display List View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c});a.registerView({id:"VIEW_BOOTSTRAP_EDIT_LIST",parent:"VIEW_WEB_EDIT_LIST",title:"Edit List View for Bootstrap",description:"Edit List View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c});a.registerView({id:"VIEW_BOOTSTRAP_CREATE_LIST",parent:"VIEW_WEB_CREATE_LIST",title:"Create List View for Bootstrap",description:"Create List View for Bootstrap",style:"bootstrap",ui:"bootstrap",templates:d,render:c})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_WEB_EDIT_TABLE",parent:"VIEW_WEB_EDIT",title:"Web Edit View Table Style",description:"Web edit view based on table styles.",type:"edit",displayReadonly:true,collapsible:false,legendStyle:"link",templates:{controlFieldOuterEl:null,controlFieldLabel:'<td>{{if options.label}}<label for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</label>{{/if}}</td>',controlFieldContainer:'<td data-control="append">{{html this.html}}</td>',controlFieldMessage:'<div><span class="ui-icon ui-icon-alert"></span><span class="alpaca-controlfield-message-text">${message}</span></div>',controlFieldHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}"><span class="ui-icon ui-icon-info"></span><span class="alpaca-controlfield-helper-text">${options.helper}</span></div>{{/if}}',controlField:'{{html Alpaca.fieldTemplate(this,"controlFieldLabel")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldContainer",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldHelper")}}{{/wrap}}',fieldSetOuterEl:'<fieldset class="alpaca-view-web-edit-table">{{html this.html}}</fieldset>',fieldSetMessage:'<div><span class="ui-icon ui-icon-alert alpaca-fieldset-message-table-view"></span><span>${message}</span></div>',fieldSetLegend:'{{if options.label}}<legend class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</div>{{/if}}',fieldSetItemsContainer:"<table><tbody>{{html this.html}}</tbody></table>",fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:"<tr></tr>",itemLabel:'{{if options.itemLabel}}<label for="${id}" class="alpaca-controlfield-label alpaca-controlfield-label-list-view"><span class="alpaca-controlfield-item-label-list-view">${options.itemLabel}{{if index}} <span class="alpaca-item-label-counter">${index}</span></span>{{/if}}</label>{{/if}}'},styles:{},fields:{"/":{templates:{fieldSetItemsContainer:'<table class="alpaca-fieldset-itemscontainer-list-view-top">{{html this.html}}</table>',fieldSetItemContainer:'<tr class="alpaca-fieldset-itemscontainer-list-view-top"></tr>'}}}});a.registerView({id:"VIEW_WEB_CREATE_TABLE",parent:"VIEW_WEB_EDIT_TABLE",title:"Default Web Create View Table Stle",description:"Default web create view (Table Style) which doesn't bind initial data.",type:"create",displayReadonly:false})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_WEB_EDIT_YAML",parent:"VIEW_WEB_EDIT",title:"Web Edit View List Style",description:"Web edit list styled to look like a YAML editor.",type:"edit",displayReadonly:true,collapsible:true,legendStyle:"link",templates:{controlFieldOuterEl:'<span class="alpaca-view-web-edit-yaml" title="${options.helper}">{{html this.html}}</span>',controlFieldMessage:'<div><span class="ui-icon ui-icon-alert"></span><span class="alpaca-controlfield-message-text">${message}</span></div>',controlFieldLabel:'{{if options.label}}<label for="${id}" class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}:</label>{{/if}}',controlFieldHelper:'<span style="display:none" />',controlFieldContainer:"<div>{{html this.html}}</div>",controlField:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldLabel")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"controlFieldContainer",true)}}{{html Alpaca.fieldTemplate(this,"controlFieldHelper")}}{{/wrap}}{{/wrap}}',fieldSetOuterEl:'<fieldset class="alpaca-view-web-edit-yaml">{{html this.html}}</fieldset>',fieldSetMessage:'<div><span class="ui-icon ui-icon-alert alpaca-fieldset-message-list-view"></span><span>${message}</span></div>',fieldSetLegend:'{{if options.label}}<legend class="{{if options.labelClass}}${options.labelClass}{{/if}}">${options.label}</legend>{{/if}}',fieldSetHelper:'{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}">${options.helper}</div>{{/if}}',fieldSetItemsContainer:"<ol>{{html this.html}}</ol>",fieldSet:'{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetOuterEl",true)}}{{html Alpaca.fieldTemplate(this,"fieldSetLegend")}}{{html Alpaca.fieldTemplate(this,"fieldSetHelper")}}{{wrap(null, {}) Alpaca.fieldTemplate(this,"fieldSetItemsContainer",true)}}{{/wrap}}{{/wrap}}',fieldSetItemContainer:'<li style="list-style:none;"></li>',itemLabel:'{{if options.itemLabel}}<label for="${id}" class="alpaca-controlfield-label alpaca-controlfield-label-list-view"><span class="alpaca-controlfield-item-label-list-view">${options.itemLabel}{{if index}} <span class="alpaca-item-label-counter">${index}</span></span>{{/if}}</label>{{/if}}'},styles:{},fields:{"/":{templates:{fieldSetItemsContainer:'<ol class="alpaca-fieldset-itemscontainer-list-view-top">{{html this.html}}</ol>',fieldSetItemContainer:'<li class="alpaca-fieldset-itemcontainer-list-view-top"></li>'}}}})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_WEB_EDIT_INLINE",parent:"VIEW_WEB_EDIT",title:"Default Web Edit with fields inlining capabilities",description:"Edit template with form fields inlining capabilities, via options.inline level to display some forms parts inline. Useful to display for example an ArrayField containing ObjectField items in a compact manner.",type:"edit",platform:"web",style:"jquery-ui",displayReadonly:true,templates:{fieldSetOuterEl:'<fieldset class="{{if options.inline}}alpaca-inline{{/if}}">{{html this.html}}</fieldset>',fieldSetItemContainer:'<div class="alpaca-inline-item-container"></div>',arrayItemToolbar:'<div class="alpaca-fieldset-array-item-toolbar" data-role="controlgroup" data-type="horizontal" data-mini="true"><span class="alpaca-fieldset-array-item-toolbar-add" data-role="button" data-icon="add" data-iconpos="notext">Add</span><span class="alpaca-fieldset-array-item-toolbar-remove" data-role="button" data-icon="delete" data-iconpos="notext">Delete</span><span class="alpaca-fieldset-array-item-toolbar-up" data-role="button" data-icon="arrow-u" data-iconpos="notext">Up</span><span class="alpaca-fieldset-array-item-toolbar-down" data-role="button" data-icon="arrow-d" data-iconpos="notext">Down</span></div>'}})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_WEB_EDIT",templates:{twoColumnLayout:'<div class="alpaca-layout-two-column-mask">{{if options.label}}<h3>${options.label}</h3>{{/if}}{{if options.helper}}<h4>${options.helper}</h4>{{/if}}<div class="alpaca-layout-two-column-left alpaca-layout-region"  id="leftcolumn"></div><div class="alpaca-layout-two-column-right alpaca-layout-region" id="rightcolumn"></div></div>'}});a.registerView({id:"VIEW_WEB_EDIT_LAYOUT_TWO_COLUMN",parent:"VIEW_WEB_EDIT",title:"Web Edit View with Two-Column Layout",description:"Web edit default view with two-column layout.",layout:{template:"twoColumnLayout"}});a.registerView({id:"VIEW_WEB_EDIT_LIST_LAYOUT_TWO_COLUMN",parent:"VIEW_WEB_EDIT_LIST",title:"Web List Edit View with Two-Column Layout",description:"Web edit list view with two-column layout.",layout:{template:"twoColumnLayout"}})})(jQuery);(function(b){var a=b.alpaca;a.NormalizedView=Base.extend({constructor:function(c){this.id=c},normalize:function(){var l=a.views[this.id];if(!l){a.logError("View compilation failed - view not found: "+this.id);return false}var c=[];var g=l;while(g){c.push(g);var f=g.parent;if(f){var j=a.views[g.parent];if(!j){a.logError("View compilation failed - cannot find parent view: "+f+" for view: "+g.id);return false}g=j}else{g=null}}c=c.reverse();var k=function(p,o,q){var n=o[q];var i=p[q];if(!a.isUndefined(i)&&!a.isUndefined(n)){a.logDebug("View property: "+q+" already has value: "+i+" and overwriting to: "+n)}if(!a.isUndefined(n)){p[q]=n}};var h=function(p,o,q){var n=o[q];var i=p[q];if(!a.isUndefined(i)&&!a.isUndefined(n)){a.logDebug("View property: "+q+" already has function, overwriting")}if(!a.isUndefined(n)){p[q]=n}};var m=function(n,i,p){var o=i[p];if(o){if(!n[p]){n[p]={}}a.mergeObject2(o,n[p])}};for(var e=0;e<c.length;e++){var d=c[e];k(this,d,"type");k(this,d,"displayReadonly");k(this,d,"platform");k(this,d,"device");k(this,d,"style");k(this,d,"ui");k(this,d,"collapsible");k(this,d,"legendStyle");k(this,d,"toolbarStyle");k(this,d,"buttonStyle");k(this,d,"toolbarSticky");k(this,d,"globalTemplate");h(this,d,"render");h(this,d,"postRender");m(this,d,"styles");m(this,d,"templates");m(this,d,"messages");m(this,d,"wizard");m(this,d,"fields");m(this,d,"layout");m(this,d,"compiledTemplates")}a.logDebug("View compilation complete for view: "+this.id);a.logDebug("Final view: ");a.logDebug(JSON.stringify(this,null,"   "));return true}})})(jQuery);(function(b){var a=b.alpaca;a.RuntimeView=Base.extend({constructor:function(c,d){this.field=d;this.setView(c)},setView:function(c){if(!c){this.id="VIEW_WEB_EDIT";return}var e=a.getNormalizedView(c);if(!e){throw new Error("Runtime view for view id: "+c+" could not find a normalized view")}for(var d in e){if(e.hasOwnProperty(d)){this[d]=e[d]}}},getWizard:function(){return this.getViewParam("wizard")},getGlobalTemplateDescriptor:function(){return this.getTemplateDescriptor("globalTemplate")},getLayout:function(){var c=this.getTemplateDescriptor("layoutTemplate");return{templateDescriptor:c,bindings:this.getViewParam(["layout","bindings"],true)}},getStyles:function(){return this.styles},getTemplateDescriptor:function(c){return a.getTemplateDescriptor(this,c)},getMessage:function(c){var d=this.getViewParam(["messages",a.defaultLocale,c]);return a.isEmpty(d)?this.getViewParam(["messages",c]):d},getViewParam:function(f,d){var c=this.field.path;if(this.fields&&this.fields[c]){var e=this._getConfigVal(this.fields[c],f);if(!a.isEmpty(e)){return e}}if(c&&c.indexOf("[")!=-1&&c.indexOf("]")!=-1){c=c.replace(/\[\d+\]/g,"[*]");if(this.fields&&this.fields[c]){var e=this._getConfigVal(this.fields[c],f);if(!a.isEmpty(e)){return e}}}if(!a.isEmpty(d)&&d&&this.field.path!="/"){return null}return this._getConfigVal(this,f)},_getConfigVal:function(d,e){if(a.isArray(e)){for(var c=0;c<e.length&&!a.isEmpty(d);c++){d=d[e[c]]}}else{if(!a.isEmpty(d)){d=d[e]}}return d},getInjectedStyle:function(f){var e=null;var c={};if(this.style){var d=a.styleInjections[this.style];if(d){a.mergeObject(d,c)}}return e[f]},tmpl:function(c,d){return a.tmpl(this,c,d)}})})(jQuery);(function(b){var a=b.alpaca;a.Field=Base.extend({constructor:function(d,h,l,g,j,f,i){var k=this;this.initializing=true;this.container=d;this.parent=null;this.data=h;this.options=l;this.schema=g;this.connector=f;this.errorCallback=function(m){if(i){i(m)}else{a.defaultErrorCallback.call(k,m)}};this.singleLevelRendering=false;this.view=new a.RuntimeView(j,this);var e=false;if(!this.options){this.options={};e=true}this.id=this.options.id;this.type=this.options.type;if(!this.id){this.id=a.generateId()}var c=false;if(!this.schema){this.schema={};c=true}if(!this.options.label&&this.schema.title!==null){this.options.label=this.schema.title}if(!this.options.helper&&this.schema.description!==null){this.options.helper=this.schema.description}if(a.isEmpty(this.options.readonly)&&!a.isEmpty(this.schema.readonly)){this.options.readonly=this.schema.readonly}if(a.isValEmpty(this.data)&&!a.isEmpty(this.schema["default"])){this.data=this.schema["default"];this.showingDefaultData=true}this.path="/";this.validation={};this._events={};this.isDisplayOnly=function(){return(k.view.type=="view")}},getDefaultFieldTemplateId:function(){return"controlField"},setDefaultTemplateDescriptor:function(){var c=this.view.getTemplateDescriptor(this.getDefaultFieldTemplateId());var d=this.view.getGlobalTemplateDescriptor();var e=this.view.getLayout();var f=false;if(!this.parent){if(d){this.setTemplateDescriptor(d);this.singleLevelRendering=true;f=true}else{if(e&&e.templateDescriptor){this.setTemplateDescriptor(e.templateDescriptor);f=true}}}if(!f&&c){this.setTemplateDescriptor(c)}},setup:function(){if(!this.initializing){this.data=this.getValue()}this.setDefaultTemplateDescriptor();if(a.isUndefined(this.schema.required)){this.schema.required=false}if(a.isUndefined(this.options.validate)){this.options.validate=true}if(a.isUndefined(this.options.disabled)){this.options.disabled=false}if(a.isUndefined(this.options.showMessages)){this.options.showMessages=true}},on:function(c,d){a.logDebug("Adding listener for event: "+c);this._events[c]=d;return this},triggerWithPropagation:function(c,d){this.trigger.call(this,c,d);if(this.parent){this.parent.triggerWithPropagation.call(this.parent,c,d)}},trigger:function(d,g){a.logDebug("Firing event: "+d);var f=this._events[d];var c=null;if(typeof(f)=="function"){a.logDebug("Found event handler, calling: "+d);try{c=f.call(this,g)}catch(h){a.logDebug("The event handler caught an exception: "+d)}}else{a.logDebug("Could not find an event handler for: "+d)}return c},bindData:function(){if(!a.isEmpty(this.data)){this.setValue(this.data)}},render:function(d,e){if(d&&(a.isString(d)||a.isObject(d))){this.view.setView(d)}else{if(a.isEmpty(e)&&a.isFunction(d)){e=d}}if(this.options.label===null&&this.propertyId){this.options.label=this.propertyId}if(this.options.name){this.name=this.options.name}if(!this.name){if(this.parent&&this.parent.name&&this.path){var c=this.path.substring(this.path.lastIndexOf("/")+1);if(c.indexOf("[")!=-1&&c.indexOf("]")!=-1){c=c.substring(c.indexOf("[")+1,c.indexOf("]"))}if(c){this.name=this.parent.name+"_"+c;this.nameCalculated=true}}else{if(this.path){this.name=this.path.replace(/\//g,"").replace(/\[/g,"_").replace(/\]/g,"");this.nameCalculated=true}}}this.setup();this._render(e)},_render:function(e){var d=this;if(this.getEl()){this.getEl().remove()}if(this.options.renderForm){this.options.form.viewType=this.view.type;var c=this.form;if(!c){c=new a.Form(this.container,this.options.form,this.view.id,this.connector,this.errorCallback)}c.render(function(f){d._processRender(f.formFieldsContainer,function(){d.getEl().appendTo(f.formFieldsContainer);f.topControl=d;if(d.view.type&&d.view.type!="view"){f.initEvents()}d.form=f;d.postRender();if(e&&a.isFunction(e)){e(d)}})})}else{this._processRender(this.container,function(){d.getEl().appendTo(d.container);d.postRender();if(e&&a.isFunction(e)){e(d)}})}},_processRender:function(e,h){var i=this;var d=this.getTemplateDescriptor();var c=this.data;if(this.isDisplayOnly()&&typeof(c)=="object"){c=JSON.stringify(c)}var f=i.view.tmpl(d,{id:this.getId(),options:this.options,schema:this.schema,data:c,view:this.view,path:this.path},{});f.appendTo(e);var g=f;if(f.size()>1){f.each(function(l,j){if(b(this).attr("data-control")=="append"){g=b(this)}})}this.setEl(g);if(!this.singleLevelRendering){if(!this.isDisplayOnly()||(!this.isControlField)){this.renderField(function(){if(h){h(this)}})}else{if(h){h(this)}}}else{if(h){h(this)}}},renderField:function(c){},getStyleInjection:function(e,f,d,c){if(this.view.style&&a.styleInjections[this.view.style]&&a.styleInjections[this.view.style][e]){a.styleInjections[this.view.style][e].call(this,f,d,c)}},postRender:function(){if(this.view.type!="view"){this.getStyleInjection("field",this.getEl());this.getEl().addClass("alpaca-field");if(this.getEl().attr("id")===null){this.getEl().attr("id",this.getId()+"-field-outer")}if(a.isEmpty(this.getEl().attr("alpaca-field-id"))){this.getEl().attr("alpaca-field-id",this.getId())}if(this.schema.required){this.getEl().addClass("alpaca-field-required")}else{this.getEl().addClass("alpaca-field-optional")}if(this.options.readonly){this.getEl().addClass("alpaca-field-readonly");b(":input",this.getEl()).attr("readonly","readonly");b("select",this.getEl()).attr("disabled","disabled");b(":radio",this.getEl()).attr("disabled","disabled");b(":checkbox",this.getEl()).attr("disabled","disabled")}var d=function(j,g){if(g){var h=0;var k=null;if(a.isArray(g)){for(h=0;h<g.length;h++){j.addClass(g[h])}}else{if(g.indexOf(",")>-1){k=g.split(",");for(h=0;h<k.length;h++){j.addClass(k[h])}}else{if(g.indexOf(" ")>-1){k=g.split(" ");for(h=0;h<k.length;h++){j.addClass(k[h])}}else{j.addClass(g)}}}}};d(this.getEl(),this.options.fieldClass);var e=this.view.getStyles();if(e){for(var c in e){b(c,this.container).css(e[c])}}if(this.labelDiv&&this.schema.required){this.getStyleInjection("required",this.labelDiv)}if(this.options.disabled){this.disable()}if(this.view.type&&this.view.type=="edit"){this.bindData()}else{if(this.showingDefaultData){this.bindData()}}if(this.view.type=="create"){a.logDebug("Skipping data binding for field: "+this.id+" since view mode is 'create'")}if(this.view.type&&this.view.type!="view"){this.initEvents()}}if(this.options.hidden){this.getEl().hide()}this.initializing=false;var f=(this.view.type=="create");this.hideInitValidationError=a.isValEmpty(this.options.hideInitValidationError)?f:this.options.hideInitValidationError;if(this.view.type!="view"){this.renderValidationState()}this.hideInitValidationError=false;if(!this.view.displayReadonly){b(".alpaca-field-readonly",this.getEl()).hide()}if(this.options.postRender){this.options.postRender(this)}},getEl:function(){return this.outerEl},setEl:function(c){this.outerEl=c},getId:function(){return this.id},getParent:function(){return this.parent},isTopLevel:function(){return a.isEmpty(this.parent)},getValue:function(){return this.data},setValue:function(c){this.data=c;this.triggerUpdate()},setDefault:function(){},getTemplateDescriptor:function(){return this.templateDescriptor},setTemplateDescriptor:function(c){this.templateDescriptor=c},displayMessage:function(d,c){var e=this;b("[id^='"+e.getId()+"-field-message']",e.getEl()).remove();if(d&&d.length>0){b.each(d,function(f,h){if(h.length>0){var g=e.view.getTemplateDescriptor("controlFieldMessage");if(g){e.messageElement=e.view.tmpl(g,{message:h});e.getStyleInjection("errorMessage",e.messageElement);if(e.hideInitValidationError){e.messageElement.addClass("alpaca-controlfield-message-hidden")}else{e.messageElement.addClass("alpaca-controlfield-message")}e.messageElement.attr("id",e.getId()+"-field-message-"+f);if(b(".alpaca-controlfield-message-container",e.getEl()).length){e.messageElement.appendTo(b(".alpaca-controlfield-message-container",e.getEl()))}else{e.messageElement.appendTo(e.getEl())}}e.getStyleInjection("tooltipErrorMessage",e.getEl(),h)}})}},renderValidationState:function(d){var c=function(g,n){if(this.options.validate){if(g&&this.children){for(var k=0;k<this.children.length;k++){c.call(this.children[k],g,true)}}var f=this.isValid();this.getStyleInjection("removeError",this.getEl());this.getEl().removeClass("alpaca-field-invalid alpaca-field-invalid-hidden alpaca-field-valid");if(this.validate()){this.triggerWithPropagation("validated");this.getEl().addClass("alpaca-field-valid")}else{this.triggerWithPropagation("invalidated");if(!this.options.readonly){if(!this.hideInitValidationError){this.getStyleInjection("error",this.getEl());this.getEl().addClass("alpaca-field-invalid")}else{this.getEl().addClass("alpaca-field-invalid-hidden")}}else{a.logWarn("The field (id="+this.getId()+", title="+this.getTitle()+", label="+this.options.label+") is invalid and also read-only")}}var e=this.isValid();if(this.options.showMessages){if(!this.initializing){if(!this.options.readonly){var j=[];for(var l in this.validation){if(!this.validation[l]["status"]){j.push(this.validation[l]["message"])}}this.displayMessage(j,f)}}}if(!n){var h=false;var m=this.parent;while(m){if(m.options&&(m.options.forceRevalidation||m.options.validator)){h=true}m=m.parent}if((f!=e&&this.parent&&this.parent.renderValidationState)||h){this.parent.renderValidationState()}}this._validateCustomValidator()}};c.call(this,d,false)},showHiddenMessages:function(){var c=b(".alpaca-field-invalid-hidden",this.outerEl);c.removeClass("alpaca-field-invalid-hidden");this.getStyleInjection("error",c);c.addClass("alpaca-field-invalid");b(".alpaca-controlfield-message-hidden",this.outerEl).removeClass("alpaca-controlfield-message-hidden").addClass("alpaca-controlfield-message")},updateValidationState:function(g,d){if(this.options.validate){var c=this.isValid();this.validation[g]=d;if(!this.hideInitValidationError){if(!this.options.readonly){if(d&&!d.status){this.getEl().removeClass("alpaca-field-valid");this.getStyleInjection("error",this.getEl());this.getEl().addClass("alpaca-field-invalid")}}}this.validation[g]=d;if(this.options.showMessages){if(!this.initializing){if(!this.hideInitValidationError){if(!this.options.readonly){var f=[];for(var e in this.validation){if(!this.validation[e]["status"]){f.push(this.validation[e]["message"])}}this.displayMessage(f,c)}}}}if(this.isValid()&&this.parent&&this.parent.renderValidationState){this.parent.renderValidationState()}}},validate:function(e){if(this.children&&e){for(var d=0;d<this.children.length;d++){var f=this.children[d];f.validate(e)}}var c=true;if(!this.initializing&&this.options.validate){c=this.handleValidate()}return c},handleValidate:function(){var d=this.validation;var c=this._validateOptional();d.notOptional={message:c?"":this.view.getMessage("notOptional"),status:c};c=this._validateDisallow();d.disallowValue={message:c?"":a.substituteTokens(this.view.getMessage("disallowValue"),[this.schema.disallow.join(",")]),status:c};return d.notOptional["status"]&&d.disallowValue["status"]},_validateCustomValidator:function(){var c=this;if(this.options.validator&&a.isFunction(this.options.validator)){this.options.validator(this,function(d){c.updateValidationState("customValidator",d)})}},_validateOptional:function(){if(this.schema.required&&this.isEmpty()){return false}return true},_validateDisallow:function(){if(!a.isValEmpty(this.schema.disallow)){var e=this.getValue();var d=this.schema.disallow;if(a.isArray(d)){var c=true;b.each(d,function(f,g){if((a.isObject(e)||a.isArray(e))&&a.isString(g)){g=a.parseJSON(g)}if(a.compareObject(e,g)){c=false}});return c}else{if((a.isObject(e)||a.isArray(e))&&a.isString(d)){d=a.parseJSON(d)}return !a.compareObject(e,d)}}return true},triggerUpdate:function(){this.getEl().trigger("fieldupdate")},disable:function(){},enable:function(){},focus:function(){},destroy:function(){if(a&&a.fieldInstances){if(a.fieldInstances[this.getId()]){delete a.fieldInstances[this.getId()]}}this.getEl().remove()},show:function(){if(this.options&&this.options.hidden){return}else{this.getEl().css({display:""});this.onShow()}},onShow:function(){},hide:function(){this.getEl().css({display:"none"});this.onHide()},onHide:function(){},isVisible:function(){return !this.isHidden()},isHidden:function(){return"none"==this.getEl().css("display")},print:function(){if(this.container.printArea){this.container.printArea()}},onDependentReveal:function(){},onDependentConceal:function(){},reload:function(){this.initializing=true;if(!a.isEmpty(this.callback)){this.callback(this,this.renderedCallback)}else{this.render(this.renderedCallback)}},clear:function(){var c=null;if(this.data){c=this.data}this.setValue(c)},isEmpty:function(){return a.isValEmpty(this.getValue())},isValid:function(c){if(c&&this.children){for(var e=0;e<this.children.length;e++){var f=this.children[e];if(!f.isValid(c)){return false}}}if(b.isEmptyObject(this.validation)){return true}else{for(var d in this.validation){if(!this.validation[d].status){return false}}return true}},initEvents:function(){var c=this;if(this.field){this.field.change(function(d){c.onChange.call(c,d);c.trigger("change",d)});this.field.focus(function(d){c.onFocus.call(c,d);c.trigger("focus",d)});this.field.blur(function(d){c.onBlur.call(c,d);c.trigger("blur",d)});this.field.mouseover(function(d){c.onMouseOver.call(c,d);c.trigger("mouseover",d)});this.field.mouseout(function(d){c.onMouseOut.call(c,d);c.trigger("mouseout",d)});b.each(this.options,function(d,f){if(a.startsWith(d,"onField")&&a.isFunction(f)){var e=d.substring(7).toLowerCase();c.field.on(e,function(g){f.call(c,g)})}})}},onFocus:function(c){this.getEl().removeClass("alpaca-field-empty");this.getEl().addClass("alpaca-field-focused")},onBlur:function(c){this.getEl().removeClass("alpaca-field-focused");this.renderValidationState()},onChange:function(c){this.data=this.getValue();this.triggerUpdate()},onMouseOver:function(c){},onMouseOut:function(c){},getControlByPath:function(f){var d=this;if(f){var e=f.split("/");for(var c=0;c<e.length;c++){if(!a.isValEmpty(e[c])){if(d&&d.childrenByPropertyId){if(d.childrenByPropertyId[e[c]]){d=d.childrenByPropertyId[e[c]]}else{return null}}else{return null}}else{return null}}return d}},getFieldType:function(){},getType:function(){}});a.registerMessages({disallowValue:"{0} are disallowed values.",notOptional:"This field is not optional."})})(jQuery);(function(b){var a=b.alpaca;a.ControlField=a.Field.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f);this.isControlField=true},setDefault:function(){var c=a.isEmpty(this.schema["default"])?"":this.schema["default"];this.setValue(c)},renderField:function(c){},injectField:function(e){var d=b(".alpaca-controlfield-container",this.outerEl);if(d.length){this.fieldContainer=d}else{this.fieldContainer=this.outerEl}var c=b(".alpaca-field-container-field",this.fieldContainer);if(c.length>0){if(c.attr("data-replace")=="true"){c.replaceWith(e)}else{e.appendTo(c)}}else{if(this.fieldContainer.attr("data-replace")=="true"){this.fieldContainer.replaceWith(e)}else{e.prependTo(this.fieldContainer)}}},postRender:function(){var d=b(".alpaca-controlfield-label",this.outerEl);if(d.length){this.labelDiv=d}var c=b(".alpaca-controlfield-helper",this.outerEl);if(c.length){this.helperDiv=c}this.base();this.outerEl.addClass("alpaca-controlfield")},_validateEnum:function(){if(this.schema["enum"]){var c=this.data;if(!this.schema.required&&a.isValEmpty(c)){return true}if(b.inArray(c,this.schema["enum"])>-1){return true}else{return false}}else{return true}},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateEnum();d.invalidValueOfEnum={message:c?"":a.substituteTokens(this.view.getMessage("invalidValueOfEnum"),[this.schema["enum"].join(",")]),status:c};return e&&d.invalidValueOfEnum["status"]},initEvents:function(){this.base();var c=this;if(this.field){this.field.keypress(function(d){c.onKeyPress.call(c,d);c.trigger("keypress",d)});this.field.keyup(function(d){c.onKeyUp.call(c,d);c.trigger("keyup",d)});this.field.keydown(function(d){c.onKeyDown.call(c,d);c.trigger("keydown",d)});this.field.click(function(d){c.onClick.call(c,d);c.trigger("click",d)})}},onKeyPress:function(f){var c=this;var d=this.isValid();if(!d){window.setTimeout(function(){c.renderValidationState()},50)}},onKeyDown:function(c){},onKeyUp:function(c){},onClick:function(c){}});a.registerMessages({invalidValueOfEnum:"This field should have one of the values in {0}."})})(jQuery);(function(b){var a=b.alpaca;a.ContainerField=a.Field.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();var c=true;if(!a.isEmpty(this.view.collapsible)){c=this.view.collapsible}if(!a.isEmpty(this.options.collapsible)){c=this.options.collapsible}this.options.collapsible=c;var d="button";if(!a.isEmpty(this.view.legendStyle)){d=this.view.legendStyle}if(!a.isEmpty(this.options.legendStyle)){d=this.options.legendStyle}this.options.legendStyle=d;this.lazyLoading=false;if(!a.isEmpty(this.options.lazyLoading)){this.lazyLoading=this.options.lazyLoading;if(this.lazyLoading){this.options.collapsed=true}}this.children=[];this.childrenById=[];this.childrenByPropertyId=[];this.expandedIcon="";this.collapsedIcon="";this.commonIcon="";this.addIcon="";this.removeIcon="";this.upIcon="";this.downIcon="";if(this.view.style&&a.styleInjections[this.view.style]){if(a.styleInjections[this.view.style]["commonIcon"]){this.commonIcon=a.styleInjections[this.view.style]["commonIcon"]}if(a.styleInjections[this.view.style]["containerExpandedIcon"]){this.expandedIcon=a.styleInjections[this.view.style]["containerExpandedIcon"]}if(a.styleInjections[this.view.style]["containerCollapsedIcon"]){this.collapsedIcon=a.styleInjections[this.view.style]["containerCollapsedIcon"]}if(a.styleInjections[this.view.style]["buttonBeautifier"]){this.buttonBeautifier=a.styleInjections[this.view.style]["buttonBeautifier"]}if(a.styleInjections[this.view.style]["addIcon"]){this.addIcon=a.styleInjections[this.view.style]["addIcon"]}if(a.styleInjections[this.view.style]["removeIcon"]){this.removeIcon=a.styleInjections[this.view.style]["removeIcon"]}if(a.styleInjections[this.view.style]["upIcon"]){this.upIcon=a.styleInjections[this.view.style]["upIcon"]}if(a.styleInjections[this.view.style]["downIcon"]){this.downIcon=a.styleInjections[this.view.style]["downIcon"]}}},getDefaultFieldTemplateId:function(){return"fieldSet"},setDefaultTemplateDescriptor:function(){this.base()},addChild:function(d,c){if(!a.isEmpty(c)){this.children.splice(c,0,d)}else{this.children.push(d)}this.childrenById[d.getId()]=d;if(d.propertyId){this.childrenByPropertyId[d.propertyId]=d}d.parent=this},initEvents:function(){var d=this;if(this.labelDiv){if(this.options.collapsible){this.labelDiv.addClass("legend-expanded");this.fieldSetDiv.addClass("fieldset-expanded");var c=this.expandedIcon;if(!a.isEmpty(this.options.collapsed)&&this.options.collapsed){c=this.collapsedIcon;this.labelDiv.nextAll(".alpaca-fieldset-helper").slideToggle(500);this.labelDiv.nextAll(".alpaca-fieldset-items-container").slideToggle(500);this.labelDiv.nextAll(".alpaca-fieldset-array-toolbar").slideToggle(500);this.fieldSetDiv.toggleClass("fieldset-expanded");this.fieldSetDiv.toggleClass("fieldset-collapsed");this.labelDiv.toggleClass("legend-expanded");this.labelDiv.toggleClass("legend-collapsed")}if(this.options.legendStyle=="link"){b('<span class="'+this.commonIcon+" "+c+' alpaca-fieldset-legend-link"></span>').prependTo(this.labelDiv);this.labelDiv.click(function(){d.fieldSetDiv.toggleClass("fieldset-collapsed");d.fieldSetDiv.toggleClass("fieldset-expanded");b(this).toggleClass("legend-collapsed");b(this).toggleClass("legend-expanded");b(".alpaca-fieldset-legend-link",this).toggleClass(d.collapsedIcon).toggleClass(d.expandedIcon);b(this).nextAll(".alpaca-fieldset-helper").slideToggle(500);b(this).nextAll(".alpaca-fieldset-items-container").slideToggle(500);b(this).nextAll(".alpaca-fieldset-array-toolbar").slideToggle(500)})}if(this.options.legendStyle=="button"){if(this.buttonBeautifier){this.buttonBeautifier.call(this,this.labelDiv,c,true)}this.labelDiv.click(function(){d.fieldSetDiv.toggleClass("fieldset-collapsed");d.fieldSetDiv.toggleClass("fieldset-expanded");b(this).toggleClass("legend-collapsed");b(this).toggleClass("legend-expanded");b(".alpaca-fieldset-legend-button",this).toggleClass(d.collapsedIcon).toggleClass(d.expandedIcon);b(this).nextAll(".alpaca-fieldset-helper").slideToggle(500);b(this).nextAll(".alpaca-fieldset-items-container").slideToggle(500);b(this).nextAll(".alpaca-fieldset-array-toolbar").slideToggle(500)})}}}},clear:function(c){a.each(this.children,function(){this.clear(false)});if(!c){this.triggerUpdate()}},setDefault:function(){if(a.isEmpty(this.schema["default"])){a.each(this.children,function(){this.setDefault()})}else{this.setValue(this.schema["default"])}},destroy:function(){if(this.form){this.form.destroy(true);delete this.form}a.each(this.children,function(){this.destroy()});this.base()},renderItemContainer:function(k,j,f){var h=this;var g=this.view.getTemplateDescriptor("fieldSetItemContainer");if(g){var d=h.view.tmpl(g,{});if(d.attr("data-replace")=="true"){return this.fieldContainer}else{if(k){b("#"+k+"-item-container",this.outerEl).after(d)}else{var e=this.fieldContainer;var c=this.view.getLayout().bindings;if(c){var i=c[f];if(i&&b("#"+i,e).length>0){e=b("#"+i,e)}}d.appendTo(e)}}return d}else{return this.fieldContainer}},renderField:function(f){var g=this;this.getStyleInjection("container",this.outerEl);var d=b(".alpaca-fieldset-legend",this.outerEl);if(d.length){this.labelDiv=d}else{this.outerEl.addClass("alpaca-fieldset-no-legend")}var c=b(".alpaca-fieldset",this.outerEl);if(c.length){this.fieldSetDiv=c}else{this.fieldSetDiv=this.outerEl}var e=b(".alpaca-fieldset-items-container",this.outerEl);if(e.length){this.fieldContainer=e}else{this.fieldContainer=this.outerEl}if(!this.singleLevelRendering&&!this.lazyLoading){this.renderItems()}if(this.lazyLoading){if(this.labelDiv){b(this.labelDiv).click(function(){if(g.lazyLoading){g.renderItems();g.lazyLoading=false}})}}if(f){f()}},onDependentReveal:function(){for(var c=0;c<this.children.length;c++){this.children[c].onDependentReveal()}},onDependentConceal:function(){for(var c=0;c<this.children.length;c++){this.children[c].onDependentConceal()}},renderItems:function(c){}})})(jQuery);(function(b){var a=b.alpaca;a.Connector=Base.extend({constructor:function(c){this.id=c},connect:function(d,c){if(d&&a.isFunction(d)){d()}},loadTemplate:function(d,e,c){if(!a.isEmpty(d)){if(a.isUri(d)){this.loadUri(d,false,function(f){if(e&&a.isFunction(e)){e(f)}},function(f){if(c&&a.isFunction(c)){c(f)}})}else{e(d)}}else{c({message:"Empty data source.",reason:"TEMPLATE_LOADING_ERROR"})}},loadData:function(f,c,d){var e=function(){return !a.isEmpty(f)&&a.isUri(f)};if(e()){this.loadJson(f,function(g){c(g)},d)}else{c(f)}},loadSchema:function(f,c,d){var e=function(){return !a.isEmpty(f)&&a.isUri(f)};if(e()){this.loadJson(f,function(g){c(g)},d)}else{c(f)}},loadOptions:function(f,c,d){var e=function(){return !a.isEmpty(f)&&a.isUri(f)};if(e()){this.loadJson(f,function(g){c(g)},d)}else{c(f)}},loadView:function(f,c,d){var e=function(){return !a.isEmpty(f)&&a.isUri(f)};if(e()){this.loadJson(f,function(g){c(g)},d)}else{c(f)}},loadAll:function(d,k,i){var c=d.dataSource;var l=d.schemaSource;var n=d.optionsSource;var j=d.viewSource;if(!l){l=d.schema}if(!n){n=d.options}if(!j){j=d.view}var g={};var e=0;var m=0;var f=function(){if(e===m){if(k&&a.isFunction(k)){k(g.data,g.options,g.schema,g.view)}}};var h=function(o){if(i&&a.isFunction(i)){i(o)}};if(c){m++}if(l){m++}if(n){m++}if(j){m++}if(m===0){f();return}if(c){this.loadData(c,function(o){g.data=o;e++;f()},h)}if(l){this.loadSchema(l,function(o){g.schema=o;e++;f()},h)}if(n){this.loadOptions(n,function(o){g.options=o;e++;f()},h)}if(j){this.loadView(j,function(o){g.view=o;e++;f()},h)}},loadJson:function(d,e,c){this.loadUri(d,true,e,c)},loadUri:function(e,c,g,d){var f={url:e,type:"get",success:function(h){if(g&&a.isFunction(g)){g(h)}},error:function(h,j,i){if(d&&a.isFunction(d)){d({message:"Unable to load data from uri : "+e,stage:"DATA_LOADING_ERROR",details:{jqXHR:h,textStatus:j,errorThrown:i}})}}};if(c){f.dataType="json"}else{f.dataType="text"}b.ajax(f)}});a.registerConnectorClass("default",a.Connector)})(jQuery);(function(b){var a=b.alpaca;a.Form=Base.extend({constructor:function(e,g,c,d,f){var h=this;this.container=e;this.parent=null;this.connector=d;this.errorCallback=f;this.options=g;if(this.options.attributes){this.attributes=this.options.attributes}else{this.attributes={}}if(this.options.buttons){if(this.options.buttons.submit){if(!this.options.buttons.submit.type){this.options.buttons.submit.type="submit"}if(!this.options.buttons.submit.name){this.options.buttons.submit.name="submit"}if(!this.options.buttons.submit.value){this.options.buttons.submit.value="Submit"}}if(this.options.buttons.reset){if(!this.options.buttons.reset.type){this.options.buttons.reset.type="reset"}if(!this.options.buttons.reset.name){this.options.buttons.reset.name="reset"}if(!this.options.buttons.reset.value){this.options.buttons.reset.value="Reset"}}}if(this.attributes.id){this.id=this.attributes.id}else{this.id=a.generateId();this.attributes.id=this.id}if(this.options.buttons&&this.options.buttons.submit&&a.isUndefined(this.options.toggleSubmitValidState)){this.options.toggleSubmitValidState=true}this.viewType=g.viewType;this.view=new a.RuntimeView(c,this)},render:function(c){var d=this;this.templateDescriptor=this.view.getTemplateDescriptor("form");if(this.outerEl){this.outerEl.remove()}this.processRender(this.container,function(){d.outerEl.appendTo(d.container);d.outerEl.addClass("alpaca-form");if(c){c(d)}})},isFormValid:function(){this.topControl.validate(true);var c=this.topControl.isValid(true);this.renderValidationState();return c},validate:function(c){return this.topControl.validate(c)},enableSubmitButton:function(){b(".alpaca-form-button-submit").attrProp("disabled",false);if(b.mobile){try{b(".alpaca-form-button-submit").button("refresh")}catch(c){}}},disableSubmitButton:function(){b(".alpaca-form-button-submit").attrProp("disabled",true);if(b.mobile){try{b(".alpaca-form-button-submit").button("refresh")}catch(c){}}},adjustSubmitButtonState:function(){this.disableSubmitButton();var c=this.isFormValid();console.log("isFormValid: "+c);if(this.isFormValid()){this.enableSubmitButton()}},processRender:function(e,g){var h=this;var c=this.getTemplateDescriptor();var d={id:this.getId(),options:this.options,view:this.view};var f=h.view.tmpl(c,d,{});f.appendTo(e);this.outerEl=f;if(a.isEmpty(this.outerEl.attr("id"))){this.outerEl.attr("id",this.getId()+"-form-outer")}if(a.isEmpty(this.outerEl.attr("alpaca-field-id"))){this.outerEl.attr("alpaca-field-id",this.getId())}if(b(".alpaca-form-fields-container",this.outerEl)){this.formFieldsContainer=b(".alpaca-form-fields-container",this.outerEl)}else{this.formFieldsContainer=this.outerEl}this.field=b("form",this.container);if(this.field){this.field.attr(this.attributes)}this.buttons={};b.each(b(".alpaca-form-button",this.container),function(j,i){b(i).mousedown(function(){var k=b(this);k.attr("button-pushed","true");setTimeout(function(){if(k.attr("button-pushed")&&k.attr("button-pushed")=="true"){k.click()}},150)});b(i).click(function(){b(this).removeAttr("button-pushed")});h.buttons[b(i).attr("data-key")]=b(i)});g()},getEl:function(){return this.outerEl},getId:function(){return this.id},getType:function(){return this.type},getParent:function(){return this.parent},getValue:function(){return this.topControl.getValue()},setValue:function(c){this.topControl.setValue(c)},initEvents:function(){var d=this;if(this.field){var c=this.getValue();b(this.field).submit(c,function(f){return d.onSubmit(f,d)})}if(this.options.toggleSubmitValidState){b(d.topControl.getEl()).bind("fieldupdate",function(){d.adjustSubmitButtonState()});this.adjustSubmitButtonState()}},onSubmit:function(f,d){if(this.submitHandler){f.stopPropagation();var c=this.submitHandler(f,d);if(a.isUndefined(c)){c=false}return c}},registerSubmitHandler:function(c){if(a.isFunction(c)){this.submitHandler=c}},renderValidationState:function(c){this.topControl.renderValidationState(c)},disable:function(){this.topControl.disable()},enable:function(){this.topControl.enable()},focus:function(){this.topControl.focus()},destroy:function(c){this.getEl().remove();if(!c){this.parent.destroy()}},show:function(){this.getEl().css({display:""})},hide:function(){this.getEl().css({display:"none"})},clear:function(c){this.topControl.clear(c)},isEmpty:function(){return this.topControl.isEmpty()},getTemplateDescriptor:function(){return this.templateDescriptor},setTemplateDescriptor:function(c){this.templateDescriptor=c}})})(jQuery);(function(b){var a=b.alpaca;a.Fields.TextField=a.ControlField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.size){this.options.size=40}this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldText")},destroy:function(){this.base();if(this.field&&this.field.typeahead&&this.options.typeahead){b(this.field).typeahead("destroy")}},renderField:function(c){var d=this;if(this.controlFieldTemplateDescriptor){this.field=d.view.tmpl(this.controlFieldTemplateDescriptor,{id:this.getId(),name:this.name,options:this.options});this.injectField(this.field)}if(c){c()}},postRender:function(){var e=this;this.base();if(this.field){if(this.field&&this.field.mask&&this.options.maskString){this.field.mask(this.options.maskString)}if(this.field&&this.field.typeahead&&this.options.typeahead){var c={};for(var d in this.options.typeahead){c[d]=this.options.typeahead[d]}if(!c.name){c.name=this.getId()}b(this.field).typeahead(c);b(this.field).on("typeahead:autocompleted",function(g,f){e.setValue(f.value)});b(this.field).on("typeahead:selected",function(g,f){e.setValue(f.value)});if(c.events){if(c.events.autocompleted){b(this.field).on("typeahead:autocompleted",function(g,f){c.events.autocompleted(g,f)})}if(c.events.selected){b(this.field).on("typeahead:selected",function(g,f){c.events.selected(g,f)})}}}if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-text")}}},getValue:function(){var c=null;if(this.field){c=this.field.val()}else{c=this.base()}return c},setValue:function(c){if(this.field){if(a.isEmpty(c)){this.field.val("")}else{this.field.val(c)}}this.base(c)},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validatePattern();d.invalidPattern={message:c?"":a.substituteTokens(this.view.getMessage("invalidPattern"),[this.schema.pattern]),status:c};c=this._validateMaxLength();d.stringTooLong={message:c?"":a.substituteTokens(this.view.getMessage("stringTooLong"),[this.schema.maxLength]),status:c};c=this._validateMinLength();d.stringTooShort={message:c?"":a.substituteTokens(this.view.getMessage("stringTooShort"),[this.schema.minLength]),status:c};return e&&d.invalidPattern["status"]&&d.stringTooLong["status"]&&d.stringTooShort["status"]},_validatePattern:function(){if(this.schema.pattern){var c=this.getValue();if(c===""&&this.options.allowOptionalEmpty&&!this.schema.required){return true}if(a.isEmpty(c)){c=""}if(!c.match(this.schema.pattern)){return false}}return true},_validateMinLength:function(){if(!a.isEmpty(this.schema.minLength)){var c=this.getValue();if(c===""&&this.options.allowOptionalEmpty&&!this.schema.required){return true}if(a.isEmpty(c)){c=""}if(c.length<this.schema.minLength){return false}}return true},_validateMaxLength:function(){if(!a.isEmpty(this.schema.maxLength)){var c=this.getValue();if(c===""&&this.options.allowOptionalEmpty&&!this.schema.required){return true}if(a.isEmpty(c)){c=""}if(c.length>this.schema.maxLength){return false}}return true},disable:function(){if(this.field){this.field.disabled=true}},enable:function(){if(this.field){this.field.disabled=false}},focus:function(){if(this.field){this.field.focus()}}});a.registerTemplate("controlFieldText",'<input type="text" id="${id}"  {{if options.placeholder}}placeholder="${options.placeholder}"{{/if}} {{if options.size}}size="${options.size}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');a.registerMessages({invalidPattern:"This field should have pattern {0}",stringTooShort:"This field should contain at least {0} numbers or characters",stringTooLong:"This field should contain at most {0} numbers or characters"});a.registerFieldClass("text",a.Fields.TextField);a.registerDefaultSchemaFieldMapping("string","text")})(jQuery);(function(b){var a=b.alpaca;a.Fields.TextAreaField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.rows){this.options.rows=5}if(!this.options.cols){this.options.cols=40}this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldTextarea")},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-textarea")}},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateWordCount();d.wordLimitExceeded={message:c?"":a.substituteTokens(this.view.getMessage("wordLimitExceeded"),[this.options.wordlimit]),status:c};return e&&d.wordLimitExceeded["status"]},_validateWordCount:function(){if(this.options.wordlimit&&this.options.wordlimit>-1){var d=this.data;if(d){var c=d.split(" ").length;if(c>this.options.wordlimit){return false}}}return true},setValue:function(c){b(this.field).val(c);this.base(c)},getValue:function(){return b(this.field).val()}});a.registerMessages({wordLimitExceeded:"The maximum word limit of {0} has been exceeded."});a.registerTemplate("controlFieldTextarea",'<textarea id="${id}" {{if options.rows}}rows="${options.rows}"{{/if}} {{if options.cols}}cols="${options.cols}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each options.data}}data-${fieldId}="${value}"{{/each}}/>');a.registerFieldClass("textarea",a.Fields.TextAreaField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.CheckBoxField=a.ControlField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.rightLabel){this.options.rightLabel=""}},onClick:function(c){this.renderValidationState()},renderField:function(d){var e=this;var c=this.view.getTemplateDescriptor("controlFieldCheckbox");if(c){this.field=e.view.tmpl(c,{id:this.getId(),name:this.name,options:this.options});this.injectField(this.field);this.field=b('input[id="'+this.getId()+'"]',this.field);if(this.data){this.setValue(true)}}if(d){d()}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-checkbox")}},getValue:function(){return a.checked(this.field)},setValue:function(c){if(a.isString(c)){c=(c==="true")}a.checked(this.field,c);this.base(c)},disable:function(){this.field.disabled=true},enable:function(){this.field.disabled=false}});a.registerTemplate("controlFieldCheckbox",'<span><input type="checkbox" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>{{if options.rightLabel}}<label for="${id}">${options.rightLabel}</label>{{/if}}</span>');a.registerFieldClass("checkbox",a.Fields.CheckBoxField);a.registerDefaultSchemaFieldMapping("boolean","checkbox")})(jQuery);(function(b){var a=b.alpaca;a.Fields.FileField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldFile")},setValue:function(d){var c=this.field;this.field=b(".alpaca-filefield-control",this.fieldContainer);this.base(d);this.field=c},onChange:function(c){this.base(c);if(this.options.selectionHandler){this.processSelectionHandler(c.target.files)}},processSelectionHandler:function(g){if(g&&g.length>0){if(typeof(FileReader)!=="undefined"){var e=[];var f=0;var c=new FileReader();c.onload=(function(){var h=this;return function(j){var i=j.target.result;e.push(i);f++;if(f===g.length){h.options.selectionHandler.call(h,g,e)}}}).call(this);for(var d=0;d<g.length;d++){c.readAsDataURL(g[d])}}}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-file")}}});a.registerTemplate("controlFieldFile",'<input type="file" id="${id}" {{if options.size}}size="${options.size}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');a.registerFieldClass("file",a.Fields.FileField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.ListField=a.ControlField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){var c=this;c.base();c.selectOptions=[];if(c.getEnum()){b.each(c.getEnum(),function(d,e){var f=e;if(c.options.optionLabels){if(!a.isEmpty(c.options.optionLabels[d])){f=c.options.optionLabels[d]}else{if(!a.isEmpty(c.options.optionLabels[e])){f=c.options.optionLabels[e]}}}c.selectOptions.push({value:e,text:f})})}},getEnum:function(){if(this.schema&&this.schema["enum"]){return this.schema["enum"]}},getValue:function(c){var d=this;if(a.isArray(c)){b.each(c,function(e,f){b.each(d.selectOptions,function(h,g){if(g.value==f){c[e]=g.value}})})}else{b.each(this.selectOptions,function(f,e){if(e.value==c){c=e.value}})}return c},renderField:function(e){var f=this;if(this.options.dataSource){if(a.isFunction(this.options.dataSource)){this.options.dataSource(this,function(){f._renderField(e)})}else{if(a.isUri(this.options.dataSource)){b.ajax({url:this.options.dataSource,type:"get",dataType:"json",success:function(h){var g=h;if(f.options.dsTransformer&&a.isFunction(f.options.dsTransformer)){g=f.options.dsTransformer(g)}if(g){if(a.isArray(g)){b.each(g,function(i,j){f.selectOptions.push({value:j,text:j})})}if(a.isObject(g)){b.each(g,function(i,j){f.selectOptions.push({value:i,text:j})})}}f._renderField(e)},error:function(g,i,h){f.errorCallback({message:"Unable to load data from uri : "+f.options.dataSource,stage:"DATASOURCE_LOADING_ERROR",details:{jqXHR:g,textStatus:i,errorThrown:h}})}})}else{var d=this.options.dataSource;if(f.options.dsTransformer&&a.isFunction(f.options.dsTransformer)){d=f.options.dsTransformer(d)}if(d){if(a.isArray(d)){b.each(d,function(g,h){f.selectOptions.push({value:h,text:h})})}if(a.isObject(d)){for(var c in d){f.selectOptions.push({value:c,text:d[c]})}}f._renderField(e)}}}}else{this._renderField(e)}}})})(jQuery);(function(b){var a=b.alpaca;a.Fields.RadioField=a.Fields.ListField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(this.options.name){this.name=this.options.name}else{if(!this.name){this.name=this.getId()+"-name"}}if(a.isUndefined(this.options.emptySelectFirst)){this.options.emptySelectFirst=false}},getValue:function(){var c=this.base(b("input:radio[name="+this.name+"]:checked",this.field).val());b.each(this.selectOptions,function(){if(String(this["value"])==c){c=this["value"]}});return c},setValue:function(c){if(c!=this.getValue()){b.each(b("input:radio[name="+this.name+"]",this.field),function(){if(b(this).val()==c){b(this).attr("checked","checked")}else{b(this).removeAttr("checked")}});if(this.options.emptySelectFirst){if(b("input:radio:checked",this.field).length===0){b("input:radio:first",this.field).attr("checked","checked")}}this.base(c)}},_renderField:function(d){var e=this;var c=this.view.getTemplateDescriptor("controlFieldRadio");if(c){this.field=e.view.tmpl(c,{id:this.getId(),options:this.options,selectOptions:this.selectOptions,required:this.schema.required,name:this.name,data:this.data});if(this.options.emptySelectFirst&&this.selectOptions&&this.selectOptions.length>0){this.data=this.selectOptions[0].value;if(b("input:radio:checked",this.field).length===0){b("input:radio:first",this.field).attr("checked","checked")}}if(this.options.vertical){b(".alpaca-controlfield-radio-item",this.field).css("display","block")}this.injectField(this.field)}if(d){d()}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-radio")}},onClick:function(c){this.base(c);var d=this;a.later(25,this,function(){var e=d.getValue();d.setValue(e);d.renderValidationState()})}});a.registerTemplate("controlFieldRadio",'<div id="${id}" class="alpaca-controlfield-radio">{{if !required}}<span class="alpaca-controlfield-radio-item"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value=""/><span class="alpaca-controlfield-radio-label">None</span></span>{{/if}}{{each selectOptions}}<span class="alpaca-controlfield-radio-item"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value="${value}" {{if value == data}}checked="checked"{{/if}}/><span class="alpaca-controlfield-radio-label">${text}</span></span>{{/each}}</div>');a.registerFieldClass("radio",a.Fields.RadioField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.SelectField=a.Fields.ListField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(a.isUndefined(this.options.emptySelectFirst)){this.options.emptySelectFirst=false}},getValue:function(){if(this.field){return this.base(this.field.val())}},setValue:function(c){if(a.isArray(c)){if(!a.compareArrayContent(c,this.getValue())){if(!a.isEmpty(c)&&this.field){this.field.val(c)}this.base(c)}}else{if(c!=this.getValue()){if(!a.isEmpty(c)&&this.field){this.field.val(c)}this.base(c)}}},getEnum:function(){if(this.schema){if(this.schema["enum"]){return this.schema["enum"]}else{if(this.schema.type&&this.schema.type=="array"&&this.schema.items&&this.schema.items["enum"]){return this.schema.items["enum"]}}}},_renderField:function(d){var e=this;if(this.schema.type&&this.schema.type=="array"){this.options.multiple=true}var c;if(this.options.multiple&&a.isArray(this.data)){c=this.view.getTemplateDescriptor("controlFieldSelectMultiple")}else{c=this.view.getTemplateDescriptor("controlFieldSelect")}if(c){this.field=e.view.tmpl(c,{id:this.getId(),options:this.options,required:this.schema.required,selectOptions:this.selectOptions,name:this.name,data:this.data});if(a.isUndefined(this.data)&&this.options.emptySelectFirst&&this.selectOptions&&this.selectOptions.length>0){this.data=this.selectOptions[0].value}this.injectField(this.field);if(this.data){this.setValue(this.data)}}if(d){d()}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-select")}},_validateEnum:function(){if(this.schema["enum"]){var d=this.data;if(!this.schema.required&&a.isValEmpty(d)){return true}if(this.options.multiple){var c=true;var e=this;b.each(d,function(g,f){if(b.inArray(f,e.schema["enum"])<=-1){c=false;return false}});return c}else{return(b.inArray(d,this.schema["enum"])>-1)}}else{return true}},onChange:function(c){this.base(c);var d=this;a.later(25,this,function(){var e=d.getValue();d.setValue(e);d.renderValidationState()})},_validateMinItems:function(){if(this.schema.items&&this.schema.items.minItems){if(b(":selected",this.field).length<this.schema.items.minItems){return false}}return true},_validateMaxItems:function(){if(this.schema.items&&this.schema.items.maxItems){if(b(":selected",this.field).length>this.schema.items.maxItems){return false}}return true},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateMaxItems();d.tooManyItems={message:c?"":a.substituteTokens(this.view.getMessage("tooManyItems"),[this.schema.items.maxItems]),status:c};c=this._validateMinItems();d.notEnoughItems={message:c?"":a.substituteTokens(this.view.getMessage("notEnoughItems"),[this.schema.items.minItems]),status:c};return e&&d.tooManyItems["status"]&&d.notEnoughItems["status"]}});a.registerTemplate("controlFieldSelect",'<select id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if options.multiple}}multiple{{/if}} {{if options.size}}size="${options.size}"{{/if}} {{if name}}name="${name}"{{/if}}>{{if !required}}<option value="">None</option>{{/if}}{{each(i,value) selectOptions}}<option value="${value}" {{if value == data}}selected="selected"{{/if}}>${text}</option>{{/each}}</select>');a.registerTemplate("controlFieldSelectMultiple",'<select id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if options.multiple}}multiple="multiple"{{/if}} {{if options.size}}size="${options.size}"{{/if}} {{if name}}name="${name}"{{/if}}>{{if !required}}<option value="">None</option>{{/if}}{{each(i,value) selectOptions}}<option value="${value}" {{each(j,val) data}}{{if value == val}}selected="selected"{{/if}}{{/each}}>${text}</option>{{/each}}</select>');a.registerFieldClass("select",a.Fields.SelectField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.NumberField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},getValue:function(){var c=this.field.val();if(a.isValEmpty(c)){return -1}else{return parseFloat(c)}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-number")}},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateNumber();d.stringNotANumber={message:c?"":this.view.getMessage("stringNotANumber"),status:c};c=this._validateDivisibleBy();d.stringDivisibleBy={message:c?"":a.substituteTokens(this.view.getMessage("stringDivisibleBy"),[this.schema.divisibleBy]),status:c};c=this._validateMaximum();d.stringValueTooLarge={message:"",status:c};if(!c){if(this.schema.exclusiveMaximum){d.stringValueTooLarge["message"]=a.substituteTokens(this.view.getMessage("stringValueTooLargeExclusive"),[this.schema.maximum])}else{d.stringValueTooLarge["message"]=a.substituteTokens(this.view.getMessage("stringValueTooLarge"),[this.schema.maximum])}}c=this._validateMinimum();d.stringValueTooSmall={message:"",status:c};if(!c){if(this.schema.exclusiveMinimum){d.stringValueTooSmall["message"]=a.substituteTokens(this.view.getMessage("stringValueTooSmallExclusive"),[this.schema.minimum])}else{d.stringValueTooSmall["message"]=a.substituteTokens(this.view.getMessage("stringValueTooSmall"),[this.schema.minimum])}}return e&&d.stringNotANumber["status"]&&d.stringDivisibleBy["status"]&&d.stringValueTooLarge["status"]&&d.stringValueTooSmall["status"]},_validateNumber:function(){var c=this.field.val();if(a.isValEmpty(c)){return true}var d=this.getValue();if(isNaN(d)){return false}if(!c.match(a.regexps.number)){return false}return true},_validateDivisibleBy:function(){var c=this.getValue();if(!a.isEmpty(this.schema.divisibleBy)){if(c%this.schema.divisibleBy!==0){return false}}return true},_validateMaximum:function(){var c=this.getValue();if(!a.isEmpty(this.schema.maximum)){if(c>this.schema.maximum){return false}if(!a.isEmpty(this.schema.exclusiveMaximum)){if(c==this.schema.maximum&&this.schema.exclusiveMaximum){return false}}}return true},_validateMinimum:function(){var c=this.getValue();if(!a.isEmpty(this.schema.minimum)){if(c<this.schema.minimum){return false}if(!a.isEmpty(this.schema.exclusiveMinimum)){if(c==this.schema.minimum&&this.schema.exclusiveMinimum){return false}}}return true}});a.registerMessages({stringValueTooSmall:"The minimum value for this field is {0}",stringValueTooLarge:"The maximum value for this field is {0}",stringValueTooSmallExclusive:"Value of this field must be greater than {0}",stringValueTooLargeExclusive:"Value of this field must be less than {0}",stringDivisibleBy:"The value must be divisible by {0}",stringNotANumber:"This value is not a number."});a.registerFieldClass("number",a.Fields.NumberField);a.registerDefaultSchemaFieldMapping("number","number")})(jQuery);(function(b){var a=b.alpaca;a.Fields.ArrayField=a.ContainerField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.options.toolbarStyle=a.isEmpty(this.view.toolbarStyle)?"button":this.view.toolbarStyle;if(!this.options.items){this.options.items={}}var c=false;if(!a.isEmpty(this.view.toolbarSticky)){c=this.view.toolbarSticky}if(!a.isEmpty(this.options.toolbarSticky)){c=this.options.toolbarSticky}if(a.isEmpty(this.options.items.showMoveUpItemButton)){this.options.items.showMoveUpItemButton=true}if(a.isEmpty(this.options.items.showMoveDownItemButton)){this.options.items.showMoveDownItemButton=true}this.options.toolbarSticky=c;if(this.schema.items&&this.schema.uniqueItems){a.mergeObject(this.options,{forceRevalidation:true})}if(a.isEmpty(this.data)){return}if(!a.isArray(this.data)){if(!a.isString(this.data)){return}else{try{this.data=a.parseJSON(this.data);if(!a.isArray(this.data)){a.logWarn("ArrayField parsed data but it was not an array: "+JSON.stringify(this.data));return}}catch(d){this.data=[this.data]}}}},setValue:function(e){var f=this;if(!e||!a.isArray(e)){return}for(var d=0;d<this.children.length;d++){var c=this.children[d];if(e.length>d){c.setValue(e[d])}else{this.removeItem(c.id)}}f.resolveItemSchemaOptions(function(h,g){while(d<e.length){f.addItem(d,h,g,e[d]);d++}})},getValue:function(){if(this.children.length===0&&!this.schema.required){return}var e=[];for(var d=0;d<this.children.length;d++){var c=this.children[d].getValue();if(typeof(c)!=="undefined"){e.push(c)}}return e},getSize:function(){return this.children.length},updateChildrenPathAndName:function(c){var d=this;if(c.children){b.each(c.children,function(f,e){if(c.prePath&&a.startsWith(e.path,c.prePath)){e.prePath=e.path;e.path=e.path.replace(c.prePath,c.path)}if(c.preName&&a.startsWith(e.name,c.preName)){e.preName=e.name;e.name=e.name.replace(c.preName,c.name);if(e.field){b(e.field).attr("name",e.name)}}d.updateChildrenPathAndName(e)})}},updatePathAndName:function(){var c=this;if(this.children){b.each(this.children,function(g,f){var d=f.path.lastIndexOf("/");var e=f.path.substring(d+1);if(e.indexOf("[")!=-1&&e.indexOf("]")!=-1){e=e.substring(e.indexOf("[")+1,e.indexOf("]"))}if(e!=g){f.prePath=f.path;f.path=f.path.substring(0,d)+"/["+g+"]"}if(f.nameCalculated){f.preName=f.name;if(f.parent&&f.parent.name&&f.path){f.name=f.parent.name+"_"+g}else{if(f.path){f.name=f.path.replace(/\//g,"").replace(/\[/g,"_").replace(/\]/g,"")}}b(f.field).attr("name",f.name)}if(!f.prePath){f.prePath=f.path}c.updateChildrenPathAndName(f)})}},moveItem:function(c,d){var e=this;if(this.childrenById[c]){b.each(this.children,function(g,l){if(l.getId()==c){var j;if(d===true){j=g-1;if(j<0){j=e.children.length-1}}else{j=g+1;if(j>=e.children.length){j=0}}if(e.children[j]){var f=e.children[j].getId();var k=b("#"+c+"-item-container");var i=b("#"+f+"-item-container");e.reRenderItem(e.children[g],i);e.reRenderItem(e.children[j],k);var h=e.children[g];e.children[g]=e.children[j];e.children[j]=h;e.updatePathAndName();return false}}})}},removeItem:function(c){if(this._validateEqualMinItems()){this.children=b.grep(this.children,function(e,d){return(e.getId()!=c)});delete this.childrenById[c];b("#"+c+"-item-container",this.outerEl).remove();this.renderValidationState();this.updateToolbarItemsStatus();this.updatePathAndName();this.triggerUpdate()}},updateToolbarItemsStatus:function(){var c=this;if(c._validateEqualMaxItems()){b(".alpaca-fieldset-array-item-toolbar-add",this.outerEl).each(function(d){b(this).removeClass("alpaca-fieldset-array-item-toolbar-disabled")})}else{b(".alpaca-fieldset-array-item-toolbar-add",this.outerEl).each(function(d){b(this).addClass("alpaca-fieldset-array-item-toolbar-disabled")})}if(c._validateEqualMinItems()){b(".alpaca-fieldset-array-item-toolbar-remove",this.outerEl).each(function(d){b(this).removeClass("alpaca-fieldset-array-item-toolbar-disabled")})}else{b(".alpaca-fieldset-array-item-toolbar-remove",this.outerEl).each(function(d){b(this).addClass("alpaca-fieldset-array-item-toolbar-disabled")})}if(this.getSize()===0){this.renderArrayToolbar(this.outerEl)}else{if(this.arrayToolbar){this.arrayToolbar.remove()}}b(".alpaca-item-label-counter",this.outerEl).each(function(d){b(this).html(d+1)})},renderToolbar:function(c){var k=this;if(!this.options.readonly){var j=c.attr("alpaca-id");var f=this.childrenById[j];var h=this.view.getTemplateDescriptor("arrayItemToolbar");if(h){var g=[{feature:"add",icon:k.addIcon,label:(k.options.items&&k.options.items.addItemLabel)?k.options.items.addItemLabel:"Add Item",clickCallback:function(l,i){k.resolveItemSchemaOptions(function(n,m){var o=i.addItem(c.index()+1,n,m,null,l,true);i.enrichElements(o)});return false}},{feature:"remove",icon:k.removeIcon,label:(k.options.items&&k.options.items.removeItemLabel)?k.options.items.removeItemLabel:"Remove Item",clickCallback:function(l,i){i.removeItem(l)}}];if((k.options.items&&k.options.items.showMoveUpItemButton)){g.push({feature:"up",icon:k.upIcon,label:(k.options.items&&k.options.items.moveUpItemLabel)?k.options.items.moveUpItemLabel:"Move Up",clickCallback:function(l,i){i.moveItem(l,true)}})}if((k.options.items&&k.options.items.showMoveDownItemButton)){g.push({feature:"down",icon:k.downIcon,label:(k.options.items&&k.options.items.moveDownItemLabel)?k.options.items.moveDownItemLabel:"Move Down",clickCallback:function(l,i){i.moveItem(l,false)}})}if(k.options.items&&k.options.items.extraToolbarButtons){g=b.merge(g,k.options.items.extraToolbarButtons)}var e=k.view.tmpl(h,{id:j,buttons:g});if(e.attr("id")===null){e.attr("id",j+"-item-toolbar")}for(var d in g){(function(l){var i=e.find(".alpaca-fieldset-array-item-toolbar-"+l.feature);i.click(function(m){return l.clickCallback(j,k,m)});if(k.buttonBeautifier){k.buttonBeautifier.call(k,i,l.icon)}})(g[d])}if(this.options.toolbarSticky){e.prependTo(c)}else{e.hide().prependTo(c);c.hover(function(){b(".alpaca-fieldset-array-item-toolbar",this).show()},function(){b(".alpaca-fieldset-array-item-toolbar",this).hide()})}}}},renderArrayToolbar:function(c){var h=this;var g=c.attr("alpaca-id");var f=this.view.getTemplateDescriptor("arrayToolbar");if(f){var e=h.view.tmpl(f,{id:g,addItemLabel:(h.options.items&&h.options.items.addItemLabel)?h.options.items.addItemLabel:"Add Item"});if(e.attr("id")===null){e.attr("id",g+"-array-toolbar")}if(this.options.toolbarStyle=="link"){b(".alpaca-fieldset-array-toolbar-add",e).click(function(){h.resolveItemSchemaOptions(function(j,i){var k=h.addItem(0,j,i,"",g,true);h.enrichElements(k)})})}else{var d=b(".alpaca-fieldset-array-toolbar-add",e);if(h.buttonBeautifier){h.buttonBeautifier.call(h,d,h.addIcon,true)}d.click(function(){h.resolveItemSchemaOptions(function(j,i){h.addItem(0,j,i,"",g,true)});return false}).wrap("<small></small>")}e.appendTo(c);this.arrayToolbar=e}},reRenderItem:function(d,c){d.container=c;d.render();c.attr("id",d.getId()+"-item-container");c.attr("alpaca-id",d.getId());c.addClass("alpaca-item-container");b(".alpaca-fieldset-array-item-toolbar",c).remove();this.renderToolbar(c);this.enrichElements(c)},addItem:function(d,f,e,c,g,h){return this._addItem(d,f,e,c,g,h)},_addItem:function(e,g,f,d,h,i){var j=this;if(j._validateEqualMaxItems()){if(f===null&&j.options&&j.options.fields&&j.options.fields.item){f=j.options.fields.item}var c=j.renderItemContainer(h);c.alpaca({data:d,options:f,schema:g,view:this.view.id?this.view.id:this.view,connector:this.connector,error:function(k){j.destroy();j.errorCallback.call(j,k)},notTopLevel:true,isDynamicCreation:(i||this.isDynamicCreation),render:function(m){m.parent=j;m.path=j.path+"["+e+"]";m.nameCalculated=true;m.render();c.attr("id",m.getId()+"-item-container");c.attr("alpaca-id",m.getId());c.addClass("alpaca-item-container");if(j.options&&j.options.itemLabel){var k=j.view.getTemplateDescriptor("itemLabel");var l=j.view.tmpl(k,{options:j.options,index:e?e+1:1,id:j.id});l.prependTo(c)}j.addChild(m,e);j.renderToolbar(c);j.renderValidationState();j.updatePathAndName();j.triggerUpdate();if(b(c).siblings().addBack().length>0){b(c).parent().removeClass("alpaca-fieldset-items-container-empty");b(c).siblings().addBack().removeClass("alpaca-item-container-first");b(c).siblings().addBack().removeClass("alpaca-item-container-last");b(c).siblings().addBack().first().addClass("alpaca-item-container-first");b(c).siblings().addBack().last().addClass("alpaca-item-container-last")}b(c).attr("data-alpaca-item-container-item-key",e)}});this.updateToolbarItemsStatus(this.outerEl);return c}},enrichElements:function(c){this.getStyleInjection("array",c)},resolveItemSchemaOptions:function(i){var h=this;var e;if(h.options&&h.options.fields&&h.options.fields.item){e=h.options.fields.item}var d;if(h.schema&&h.schema.items){d=h.schema.items}if(d&&d["$ref"]){var f=d["$ref"];var g=this;var c=[g];while(g.parent){g=g.parent;c.push(g)}a.loadRefSchemaOptions(g,f,function(n,m){var j=0;for(var k=0;k<c.length;k++){if(c[k].schema&&c[k].schema.id===f){j++}}var l=(j>1);if(n){n=a.copyOf(n);delete n.id}if(m){m=a.copyOf(m)}i(n,m,l)})}else{i(d,e)}},renderItems:function(){var c=this;b(this.fieldContainer).addClass("alpaca-fieldset-items-container-empty");if(this.data){c.resolveItemSchemaOptions(function(e,d){b.each(c.data,function(f,g){c.addItem(f,e,d,g,false)});c.updateToolbarItemsStatus()})}else{this.updateToolbarItemsStatus()}},_validateEqualMaxItems:function(){if(this.schema.items&&this.schema.items.maxItems){if(this.getSize()>=this.schema.items.maxItems){return false}}return true},_validateEqualMinItems:function(){if(this.schema.items&&this.schema.items.minItems){if(this.getSize()<=this.schema.items.minItems){return false}}return true},_validateMinItems:function(){if(this.schema.items&&this.schema.items.minItems){if(this.getSize()<this.schema.items.minItems){return false}}return true},_validateMaxItems:function(){if(this.schema.items&&this.schema.items.maxItems){if(this.getSize()>this.schema.items.maxItems){return false}}return true},_validateUniqueItems:function(){if(this.schema.items&&this.schema.uniqueItems){var e={};for(var d=0,c=this.children.length;d<c;++d){if(!e.hasOwnProperty(this.children[d])){e[this.children[d]]=true}else{return false}}}return true},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateUniqueItems();d.valueNotUnique={message:c?"":this.view.getMessage("valueNotUnique"),status:c};c=this._validateMaxItems();d.tooManyItems={message:c?"":a.substituteTokens(this.view.getMessage("tooManyItems"),[this.schema.items.maxItems]),status:c};c=this._validateMinItems();d.notEnoughItems={message:c?"":a.substituteTokens(this.view.getMessage("notEnoughItems"),[this.schema.items.minItems]),status:c};return e&&d.valueNotUnique["status"]&&d.tooManyItems["status"]&&d.notEnoughItems["status"]}});a.registerTemplate("itemLabel",'{{if options.itemLabel}}<div class="alpaca-controlfield-label"><div>${options.itemLabel}{{if index}} <span class="alpaca-item-label-counter">${index}</span>{{/if}}</div></div>{{/if}}');a.registerTemplate("arrayToolbar",'<span class="ui-widget ui-corner-all alpaca-fieldset-array-toolbar"><button class="alpaca-fieldset-array-toolbar-icon alpaca-fieldset-array-toolbar-add">${addItemLabel}</button></span>');a.registerTemplate("arrayItemToolbar",'<div class="ui-widget-header ui-corner-all alpaca-fieldset-array-item-toolbar">{{each(k,v) buttons}}<button class="alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-${v.feature}">${v.label}</button>{{/each}}</div>');a.registerMessages({notEnoughItems:"The minimum number of items is {0}",tooManyItems:"The maximum number of items is {0}",valueNotUnique:"Values are not unique",notAnArray:"This value is not an Array"});a.registerFieldClass("array",a.Fields.ArrayField);a.registerDefaultSchemaFieldMapping("array","array")})(jQuery);(function(b){var a=b.alpaca;a.Fields.ObjectField=a.ContainerField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.wizardPreIcon="";this.wizardNextIcon="";this.wizardDoneIcon="";if(this.view.style&&a.styleInjections[this.view.style]){if(a.styleInjections[this.view.style]["wizardPreIcon"]){this.wizardPreIcon=a.styleInjections[this.view.style]["wizardPreIcon"]}if(a.styleInjections[this.view.style]["wizardNextIcon"]){this.wizardNextIcon=a.styleInjections[this.view.style]["wizardNextIcon"]}if(a.styleInjections[this.view.style]["wizardDoneIcon"]){this.wizardDoneIcon=a.styleInjections[this.view.style]["wizardDoneIcon"]}}if(a.isEmpty(this.data)){return}if(!a.isObject(this.data)){if(!a.isString(this.data)){return}else{try{this.data=a.parseJSON(this.data);if(!a.isObject(this.data)){a.logWarn("ObjectField parsed data but it was not an object: "+JSON.stringify(this.data));return}}catch(c){return}}}},setValue:function(f){if(!f||!a.isObject(f)){return}for(var c in this.childrenById){var g=this.childrenById[c].propertyId;var e=a.traverseObject(f,g);if(!a.isEmpty(e)){var d=this.childrenById[c];d.setValue(e)}}},getValue:function(){if(this.children.length===0&&!this.schema.required){return}var f={};for(var c=0;c<this.children.length;c++){var e=this.children[c].propertyId;var d=this.children[c].getValue();if(typeof(d)!=="undefined"){if(this.determineAllDependenciesValid(e)){f[e]=d}}}return f},postRender:function(){this.base();if(this.isTopLevel()){if(this.view){this.wizardConfigs=this.view.getWizard();if(this.wizardConfigs){if(a.isUndefined(this.wizardConfigs.validation)){this.wizardConfigs.validation=true}if(!this.wizardConfigs.buttons){this.wizardConfigs.buttons={}}if(!this.wizardConfigs.buttons.done){this.wizardConfigs.buttons.done={}}if(a.isUndefined(this.wizardConfigs.buttons.done.validateOnClick)){this.wizardConfigs.buttons.done.validateOnClick=true}if(!this.wizardConfigs.buttons.prev){this.wizardConfigs.buttons.prev={}}if(a.isUndefined(this.wizardConfigs.buttons.prev.validateOnClick)){this.wizardConfigs.buttons.prev.validateOnClick=true}if(!this.wizardConfigs.buttons.next){this.wizardConfigs.buttons.next={}}if(a.isUndefined(this.wizardConfigs.buttons.next.validateOnClick)){this.wizardConfigs.buttons.next.validateOnClick=true}}var c=this.view.getLayout().templateDescriptor;if(this.wizardConfigs&&this.wizardConfigs.renderWizard){if(c){this.wizard()}else{this.autoWizard()}}}}},getIndex:function(e){if(a.isEmpty(e)){return -1}for(var d=0;d<this.children.length;d++){var c=this.children[d].propertyId;if(c==e){return d}}return -1},resolvePropertySchemaOptions:function(h,j){var i=this;var e=null;if(i.schema&&i.schema.properties&&i.schema.properties[h]){e=i.schema.properties[h]}var c={};if(i.options&&i.options.fields&&i.options.fields[h]){c=i.options.fields[h]}if(e&&e["$ref"]){var f=e["$ref"];var g=this;var d=[g];while(g.parent){g=g.parent;d.push(g)}a.loadRefSchemaOptions(g,f,function(n,l){var k=0;for(var m=0;m<d.length;m++){if(d[m].schema&&d[m].schema.id===f){k++}}var o=(k>1);if(n){n=a.copyOf(n);delete n.id}if(l){l=a.copyOf(l)}j(n,l,o)})}else{j(e,c)}},removeItem:function(d){this.children=b.grep(this.children,function(f,e){return(f.getId()!=d)});var c=this.childrenById[d];delete this.childrenById[d];if(c.propertyId){delete this.childrenByPropertyId[c.propertyId]}c.destroy();this.renderValidationState();this.triggerUpdate()},addItem:function(i,f,e,d,g,h){var j=this;var c=j.renderItemContainer(g,this,i);c.alpaca({data:d,options:e,schema:f,view:this.view.id?this.view.id:this.view,connector:this.connector,error:function(k){j.destroy();j.errorCallback.call(j,k)},notTopLevel:true,isDynamicCreation:(h||this.isDynamicCreation),render:function(l){l.parent=j;l.propertyId=i;if(j.path!="/"){l.path=j.path+"/"+i}else{l.path=j.path+i}l.render();c.attr("id",l.getId()+"-item-container");c.attr("alpaca-id",l.getId());c.addClass("alpaca-fieldset-item-container");if(a.isEmpty(g)){j.addChild(l)}else{var k=j.getIndex(g);if(k!=-1){j.addChild(l,k+1)}else{j.addChild(l)}}if(g){j.renderValidationState()}if(b(c).siblings().addBack().length>0){b(c).parent().removeClass("alpaca-fieldset-items-container-empty");b(c).siblings().addBack().removeClass("alpaca-item-container-first");b(c).siblings().addBack().removeClass("alpaca-item-container-last");b(c).siblings().addBack().first().addClass("alpaca-item-container-first");b(c).siblings().addBack().last().addClass("alpaca-item-container-last")}b(c).attr("data-alpaca-item-container-item-key",i);j.triggerUpdate()}})},renderItems:function(){var i=this;var f={};for(var g in i.data){f[g]=g}var j=i.data;if(i.schema&&i.schema.properties){j=i.schema.properties}var c=function(m){var n=[];for(var l in f){n.push(l)}if(n.length>0){a.logDebug("There were "+n.length+" extra data keys that were not part of the schema "+JSON.stringify(n))}for(var o in j){i.showOrHidePropertyBasedOnDependencies(o)}for(var o in j){i.bindDependencyFieldUpdateEvent(o)}i.renderValidationState()};var k=0;for(var h in j){k++}var d=0;for(var h in j){var e=null;if(i.data){e=i.data[h]}i.resolvePropertySchemaOptions(h,function(n,l,m){if(m){return a.throwErrorWithCallback("Circular reference detected for schema: "+n,i.errorCallback)}if(!n){a.logError("Unable to resolve schema for property: "+h)}i.addItem(h,n,l,e);delete f[h];d++;if(d===k){c()}})}},showOrHidePropertyBasedOnDependencies:function(f){var c=this;var e=this.childrenByPropertyId[f];if(!e){return a.throwErrorWithCallback("Missing property: "+f,c.errorCallback)}var d=this.determineAllDependenciesValid(f);if(d){e.show();e.onDependentReveal()}else{e.hide();e.onDependentConceal()}},determineAllDependenciesValid:function(g){var d=this;var f=this.childrenByPropertyId[g];if(!f){return a.throwErrorWithCallback("Missing property: "+g,d.errorCallback)}var c=f.schema.dependencies;if(!c){return true}var e=true;if(a.isString(c)){e=d.determineSingleDependencyValid(g,c)}else{if(a.isArray(c)){b.each(c,function(h,i){e=e&&d.determineSingleDependencyValid(g,i)})}}return e},bindDependencyFieldUpdateEvent:function(g){var d=this;var e=this.childrenByPropertyId[g];if(!e){return a.throwErrorWithCallback("Missing property: "+g,d.errorCallback)}var c=e.schema.dependencies;if(!c){return true}var f=function(j,i){var h=d.childrenByPropertyId[i];if(h){h.getEl().bind("fieldupdate",function(l){d.showOrHidePropertyBasedOnDependencies(j);for(var k in d.schema.properties){var n=d.schema.properties[k];if(n.dependencies){var m=d.childrenByPropertyId[k];if(a.isString(n.dependencies)&&n.dependencies==j){d.showOrHidePropertyBasedOnDependencies(k);m.triggerUpdate()}else{if(a.isArray(n.dependencies)){b.each(n.dependencies,function(o,p){if(p==j){d.showOrHidePropertyBasedOnDependencies(k);m.triggerUpdate()}})}}}}})}};if(a.isString(c)){f(g,c)}else{if(a.isArray(c)){b.each(c,function(h,i){f(g,i)})}}},determineSingleDependencyValid:function(h,j){var i=this.childrenByPropertyId[j];if(!i){return false}var f=false;var d=this.childrenByPropertyId[h].options.dependencies;if(!d||d.length===0){if(i.getType()==="boolean"&&!this.childrenByPropertyId[h].options.dependencies&&!i.data){f=false}else{f=!a.isValEmpty(i.data)}}else{var e=this.childrenByPropertyId[j];var c=e.data;if(e.getType()==="boolean"&&!c){c=false}if(!a.isEmpty(d[j])&&a.isFunction(d[j])){f=d[j].call(this,c)}else{f=true;if(a.isArray(d[j])){if(d[j]&&b.inArray(c,d[j])==-1){f=false}}else{if(!a.isEmpty(d[j])&&d[j]!=c){f=false}}}}var g=this.childrenByPropertyId[j];if(g&&g.isHidden()){f=false}return f},wizard:function(){var h=this;var f=this.outerEl;var d=b(".alpaca-wizard-step",f);var g=d.size();this.totalSteps=g;var e=[];if(this.wizardConfigs.stepTitles){e=this.wizardConfigs.stepTitles}else{d.each(function(k){var j={title:"",description:""};if(b(".alpaca-wizard-step-title",this)){j.title=b(".alpaca-wizard-step-title",this).html();b(".alpaca-wizard-step-title",this).hide()}if(b(".alpaca-wizard-step-description",this)){j.description=b(".alpaca-wizard-step-description",this).html();b(".alpaca-wizard-step-description",this).hide()}e.push(j)})}var c=this._renderWizardStatusBar(e);if(c){b(f).before(c)}d.each(function(o){var t=b(this).attr("id");var n="step"+o;var r=h.view.getTemplateDescriptor("wizardStep");if(r){var s=h.view.tmpl(r,{});s.attr("id",n);b(this).wrap(s)}var v=n+"-nav-bar";var q=h.view.getTemplateDescriptor("wizardNavBar");if(q){var j=h.view.tmpl(q,{});j.attr("id",v);j.addClass("alpaca-wizard-nav-bar");b(this).append(j)}var l={};var k=h.view.getLayout().bindings;for(var p in k){var u=k[p];if(u==t){l[p]=t}}var m=function(w,i){return function(){var x=true;if(h.wizardConfigs&&h.wizardConfigs.validation){if(i){b.each(i,function(z,y){x=x&h.childrenByPropertyId[z].validate();h.childrenByPropertyId[z].renderValidationState()})}}return x}}(o,l);if(o===0){h._createNextButton(o,true,m);h._selectStep(o)}else{if(o==g-1){b("#step"+o).hide();h._createPrevButton(o,false);h._createDoneButton(o,true,m)}else{b("#step"+o).hide();h._createPrevButton(o,false);h._createNextButton(o,true,m)}}})},autoWizard:function(){var l=this;var d=this.wizardConfigs.steps;if(!d){d=1}this.totalSteps=d;var e=this.wizardConfigs.bindings;if(!e){e={}}for(var k in this.childrenByPropertyId){if(!e.hasOwnProperty(k)){e[k]=1}}for(var j=0;j<d;j++){var f=j+1;var r=[];for(var k in e){if(e[k]==f){if(this.childrenByPropertyId&&this.childrenByPropertyId[k]){r.push("#"+this.childrenByPropertyId[k].container.attr("id"))}}}var h="step"+j;var n=this.view.getTemplateDescriptor("wizardStep");if(n){var o=l.view.tmpl(n,{});o.attr("id",h);b(r.join(",")).wrapAll(o)}var p=h+"-nav-bar";var m=this.view.getTemplateDescriptor("wizardNavBar");if(m){var c=l.view.tmpl(m,{});c.attr("id",p);c.addClass("alpaca-wizard-nav-bar");b("#"+h,this.outerEl).append(c)}}var q=this._renderWizardStatusBar(this.wizardConfigs.stepTitles);if(q){q.prependTo(this.fieldContainer)}for(var j=0;j<d;j++){var g=function(s,i){return function(){var t=true;if(l.view&&l.wizardConfigs&&l.wizardConfigs.validation){if(i){b.each(i,function(v,u){if(u==s+1&&t){t=l.childrenByPropertyId[v].validate();l.childrenByPropertyId[v].validate()}})}}return t}}(j,e);if(j===0){l._createNextButton(j,false,g);l._selectStep(j)}else{if(j==d-1){b("#step"+j).hide();l._createPrevButton(j,false);l._createDoneButton(j,true,g)}else{b("#step"+j).hide();l._createPrevButton(j,false);l._createNextButton(j,false,g)}}}},_renderWizardStatusBar:function(e){var g=this;var f=this.wizardConfigs.statusBar;if(f&&e){var d=this.view.getTemplateDescriptor("wizardStatusBar");if(d){var c=g.view.tmpl(d,{id:this.getId()+"-wizard-status-bar",titles:e});c.addClass("alpaca-wizard-status-bar");this.getStyleInjection("wizardStatusBar",c);return c}}},_createPrevButton:function(f,d,e){if(this.wizardConfigs.buttons&&this.wizardConfigs.buttons.prev){if(!this.wizardConfigs.buttons.prev.validateOnClick){e=null}}var j="step"+f;var h=this;var c=this.view.getTemplateDescriptor("wizardPreButton");if(c){var g=h.view.tmpl(c,{});g.attr("id",j+"-button-pre");g.addClass("alpaca-wizard-button-pre");if(h.buttonBeautifier){h.buttonBeautifier.call(h,g,this.wizardPreIcon,true)}g.click(function(l,k,i){return function(){var m=true;if(i){m=i(l,k)}if(m){b("#"+l).hide();b("#step"+(f-1)).show();h._selectStep(f-1);if(h.wizardConfigs.buttons.prev&&h.wizardConfigs.buttons.prev.onClick){h.wizardConfigs.buttons.prev.onClick()}}return false}}(j,f,e));b("#"+j+"-nav-bar").append(g);if(d){b("#"+j+"-nav-bar").parent().append("<div style='clear:both'></div>")}}},_createNextButton:function(f,c,d){if(this.wizardConfigs.buttons&&this.wizardConfigs.buttons.next){if(!this.wizardConfigs.buttons.next.validateOnClick){d=null}}var j="step"+f;var h=this;var g=this.view.getTemplateDescriptor("wizardNextButton");if(g){var e=h.view.tmpl(g,{});e.attr("id",j+"-button-next");e.addClass("alpaca-wizard-button-next");if(h.buttonBeautifier){h.buttonBeautifier.call(h,e,this.wizardNextIcon,true)}e.click(function(l,k,i){return function(){var m=true;if(i){m=i(l,k)}if(m){b("#"+l).hide();b("#step"+(k+1)).show();h._selectStep(k+1);if(h.wizardConfigs.buttons.next&&h.wizardConfigs.buttons.next.onClick){h.wizardConfigs.buttons.next.onClick()}}return false}}(j,f,d));b("#"+j+"-nav-bar").append(e);if(c){b("#"+j+"-nav-bar").parent().append("<div style='clear:both'></div>")}}},_createDoneButton:function(f,c,d){if(this.wizardConfigs.buttons&&this.wizardConfigs.buttons.done){if(!this.wizardConfigs.buttons.done.validateOnClick){d=null}}var j="step"+f;var h=this;var g=this.view.getTemplateDescriptor("wizardDoneButton");if(g){var e=h.view.tmpl(g,{});e.attr("id",j+"-button-done");e.addClass("alpaca-wizard-button-done");if(h.buttonBeautifier){h.buttonBeautifier.call(h,e,this.wizardDoneIcon,true)}e.click(function(l,k,i){return function(){var m=true;if(i){m=i(l,k)}if(m){b("#"+l+"-nav-bar").append(e);if(c){b("#"+l+"-nav-bar").parent().append("<div style='clear:both'></div>")}if(h.wizardConfigs.buttons.done&&h.wizardConfigs.buttons.done.onClick){h.wizardConfigs.buttons.done.onClick()}}return false}}(j,f,d));b("#"+j+"-nav-bar").append(e);if(c){b("#"+j+"-nav-bar").parent().append("<div style='clear:both'></div>")}}},_selectStep:function(d){var c=b("#"+this.getId()+"-wizard-status-bar li");c.removeClass("current current-has-next");this.getStyleInjection("wizardUnCurrentStep",c);var e=b("#stepDesc"+d);e.addClass("current");this.getStyleInjection("wizardCurrentStep",e);if(d<this.totalSteps-1){b("#stepDesc"+d).addClass("current-has-next")}}});a.registerFieldClass("object",a.Fields.ObjectField);a.registerDefaultSchemaFieldMapping("object","object")})(jQuery);(function(b){var a=b.alpaca;a.Fields.AnyField=a.ControlField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldAny")},renderField:function(c){if(this.controlFieldTemplateDescriptor){this.field=this.view.tmpl(this.controlFieldTemplateDescriptor,{id:this.getId(),name:this.name,options:this.options});this.injectField(this.field)}if(c){c()}},postRender:function(){this.base()},getValue:function(){return this.field.val()},setValue:function(c){if(a.isEmpty(c)){this.field.val("")}else{this.field.val(c)}this.base(c)},handleValidate:function(){var c=this.base();return c},disable:function(){this.field.disabled=true},enable:function(){this.field.disabled=false},focus:function(){this.field.focus()}});a.registerTemplate("controlFieldAny",'<input type="text" id="${id}" size="40" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');a.registerFieldClass("any",a.Fields.AnyField);a.registerDefaultSchemaFieldMapping("any","any")})(jQuery);(function(b){var a=b.alpaca;a.Fields.HiddenField=a.ControlField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.size){this.options.size=40}this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldHidden")},renderField:function(c){var d=this;if(this.controlFieldTemplateDescriptor){this.field=d.view.tmpl(this.controlFieldTemplateDescriptor,{id:this.getId(),name:this.name,options:this.options});this.injectField(this.field)}if(c){c()}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-hidden")}},getValue:function(){return this.field.val()},setValue:function(c){if(a.isEmpty(c)){this.field.val("")}else{this.field.val(c)}this.base(c)},getTitle:function(){return"Hidden"},getDescription:function(){return"Field for a hidden HTML input"},getType:function(){return"string"},getFieldType:function(){return"hidden"}});a.registerTemplate("controlFieldHidden",'<input type="hidden" id="${id}" {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');a.registerFieldClass("hidden",a.Fields.HiddenField)})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_BASE",messages:{zh_CN:{required:"&#27492;&#22495;&#24517;&#39035;",invalid:"&#27492;&#22495;&#19981;&#21512;&#26684;",months:["&#19968;&#26376;","&#20108;&#26376;","&#19977;&#26376;","&#22235;&#26376;","&#20116;&#26376;","&#20845;&#26376;","&#19971;&#26376;","&#20843;&#26376;","&#20061;&#26376;","&#21313;&#26376;","&#21313;&#19968;&#26376;","&#21313;&#20108;&#26376;"],timeUnits:{SECOND:"&#31186;",MINUTE:"&#20998;",HOUR:"&#26102;",DAY:"&#26085;",MONTH:"&#26376;",YEAR:"&#24180;"},notOptional:"&#27492;&#22495;&#38750;&#20219;&#36873;",disallowValue:"&#38750;&#27861;&#36755;&#20837;&#21253;&#25324; {0}.",invalidValueOfEnum:"&#20801;&#35768;&#36755;&#20837;&#21253;&#25324; {0}.",notEnoughItems:"&#26368;&#23567;&#20010;&#25968; {0}",tooManyItems:"&#26368;&#22823;&#20010;&#25968; {0}",valueNotUnique:"&#36755;&#20837;&#20540;&#19981;&#29420;&#29305;",notAnArray:"&#19981;&#26159;&#25968;&#32452;",invalidDate:"&#26085;&#26399;&#26684;&#24335;&#22240;&#35813;&#26159; {0}",invalidEmail:"&#20234;&#22969;&#20799;&#26684;&#24335;&#19981;&#23545;, ex: info@cloudcms.com",stringNotAnInteger:"&#19981;&#26159;&#25972;&#25968;.",invalidIPv4:"&#19981;&#26159;&#21512;&#27861;IP&#22320;&#22336;, ex: 192.168.0.1",stringValueTooSmall:"&#26368;&#23567;&#20540;&#26159; {0}",stringValueTooLarge:"&#26368;&#22823;&#20540;&#26159; {0}",stringValueTooSmallExclusive:"&#20540;&#24517;&#39035;&#22823;&#20110; {0}",stringValueTooLargeExclusive:"&#20540;&#24517;&#39035;&#23567;&#20110; {0}",stringDivisibleBy:"&#20540;&#24517;&#39035;&#33021;&#34987; {0} &#25972;&#38500;",stringNotANumber:"&#19981;&#26159;&#25968;&#23383;.",invalidPassword:"&#38750;&#27861;&#23494;&#30721;",invalidPhone:"&#38750;&#27861;&#30005;&#35805;&#21495;&#30721;, ex: (123) 456-9999",invalidPattern:"&#27492;&#22495;&#39035;&#26377;&#26684;&#24335; {0}",stringTooShort:"&#27492;&#22495;&#33267;&#23569;&#38271;&#24230; {0}",stringTooLong:"&#27492;&#22495;&#26368;&#22810;&#38271;&#24230; {0}"}}})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_BASE",messages:{es_ES:{required:"Este campo es obligatorio",invalid:"Este campo es inválido",months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],timeUnits:{SECOND:"segundos",MINUTE:"minutos",HOUR:"horas",DAY:"días",MONTH:"meses",YEAR:"años"},notOptional:"Este campo no es opcional.",disallowValue:"{0} son los valores rechazados.",invalidValueOfEnum:"Este campo debe tener uno de los valores adentro {0}.",notEnoughItems:"El número mínimo de artículos es {0}",tooManyItems:"El número máximo de artículos es {0}",valueNotUnique:"Los valores no son únicos",notAnArray:"Este valor no es un arsenal",invalidDate:"Fecha inválida para el formato {0}",invalidEmail:"Email address inválido, ex: info@cloudcms.com",stringNotAnInteger:"Este valor no es un número entero.",invalidIPv4:"Dirección inválida IPv4, ex: 192.168.0.1",stringValueTooSmall:"El valor mínimo para este campo es {0}",stringValueTooLarge:"El valor míximo para este campo es {0}",stringValueTooSmallExclusive:"El valor de este campo debe ser mayor que {0}",stringValueTooLargeExclusive:"El valor de este campo debe ser menos que {0}",stringDivisibleBy:"El valor debe ser divisible cerca {0}",stringNotANumber:"Este valor no es un número.",invalidPassword:"Contraseña inválida",invalidPhone:"Número de teléfono inválido, ex: (123) 456-9999",invalidPattern:"Este campo debe tener patrón {0}",stringTooShort:"Este campo debe contener por lo menos {0} números o caracteres",stringTooLong:"Este campo debe contener a lo más {0} números o caracteres"}}})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_BASE",messages:{fr_FR:{required:"Ce champ est requis",invalid:"Ce champ est invalide",months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],timeUnits:{SECOND:"secondes",MINUTE:"minutes",HOUR:"heures",DAY:"jours",MONTH:"mois",YEAR:"années"},notOptional:"Ce champ n'est pas optionnel.",disallowValue:"{0} sont des valeurs interdites.",invalidValueOfEnum:"Ce champ doit prendre une des valeurs suivantes : {0}.",notEnoughItems:"Le nombre minimum d'éléments est {0}",tooManyItems:"Le nombre maximum d'éléments est {0}",valueNotUnique:"Les valeurs sont uniques",notAnArray:"Cette valeur n'est pas une liste",invalidDate:"Cette date ne correspond pas au format {0}",invalidEmail:"Adresse de courriel invalide, ex: info@cloudcms.com",stringNotAnInteger:"Cette valeur n'est pas un nombre entier.",invalidIPv4:"Adresse IPv4 invalide, ex: 192.168.0.1",stringValueTooSmall:"La valeur minimale pour ce champ est {0}",stringValueTooLarge:"La valeur maximale pour ce champ est {0}",stringValueTooSmallExclusive:"La valeur doit-être supérieure à {0}",stringValueTooLargeExclusive:"La valeur doit-être inférieure à {0}",stringDivisibleBy:"La valeur doit-être divisible par {0}",stringNotANumber:"Cette valeur n'est pas un nombre.",invalidPassword:"Mot de passe invalide",invalidPhone:"Numéro de téléphone invalide, ex: (123) 456-9999",invalidPattern:"Ce champ doit correspondre au motif {0}",stringTooShort:"Ce champ doit contenir au moins {0} caractères",stringTooLong:"Ce champ doit contenir au plus {0} caractères"}}})})(jQuery);(function(b){var a=b.alpaca;a.registerView({id:"VIEW_BASE",messages:{de_AT:{required:"Eingabe erforderlich",invalid:"Eingabe invalid",months:["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],timeUnits:{SECOND:"Sekunden",MINUTE:"Minuten",HOUR:"Stunden",DAY:"Tage",MONTH:"Monate",YEAR:"Jahre"},notOptional:"Dieses Feld ist nicht optional",disallowValue:"Diese Werte sind nicht erlaubt: {0}",invalidValueOfEnum:"Diese Feld sollte einen der folgenden Werte enthalten: {0}",notEnoughItems:"Die Mindestanzahl von Elementen ist {0}",tooManyItems:"Die Maximalanzahl von Elementen ist {0}",valueNotUnique:"Diese Werte sind nicht eindeutig",notAnArray:"Keine Liste von Werten",invalidDate:"Falsches Datumsformat: {0}",invalidEmail:"Ungültige e-Mail Adresse, z.B.: info@cloudcms.com",stringNotAnInteger:"Eingabe ist keine Ganz Zahl.",invalidIPv4:"Ungültige IPv4 Adresse, z.B.: 192.168.0.1",stringValueTooSmall:"Die Mindestanzahl von Zeichen ist {0}",stringValueTooLarge:"Die Maximalanzahl von Zeichen ist {0}",stringValueTooSmallExclusive:"Die Anzahl der Zeichen muss größer sein als {0}",stringValueTooLargeExclusive:"Die Anzahl der Zeichen muss kleiner sein als {0}",stringDivisibleBy:"Der Wert muss durch {0} dividierbar sein",stringNotANumber:"Die Eingabe ist keine Zahl",invalidPassword:"Ungültiges Passwort.",invalidPhone:"Ungültige Telefonnummer, z.B.: (123) 456-9999",invalidPattern:"Diese Feld stimmt nicht mit folgender Vorgabe überein {0}",stringTooShort:"Dieses Feld sollte mindestens {0} Zeichen enthalten",stringTooLong:"Dieses Feld sollte höchstens {0} Zeichen enthalten"}}})})(jQuery);
/*!
Alpaca Version 1.1.1

Copyright 2013 Gitana Software, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 

You may obtain a copy of the License at 
	http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License. 

For more information, please contact Gitana Software, Inc. at this
address:

  info@gitanasoftware.com
*/
(function(b){var a=b.alpaca;a.Fields.AddressField=a.Fields.ObjectField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.schema={title:"Home Address",type:"object",properties:{street:{title:"Street",type:"array",items:{type:"string",maxLength:30,minItems:0,maxItems:3}},city:{title:"City",type:"string"},state:{title:"State",type:"string","enum":["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FM","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MH","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PW","PA","PR","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY"]},zip:{title:"Zip Code",type:"string",pattern:/^(\d{5}(-\d{4})?)?$/}}};a.merge(this.options,{fields:{zip:{maskString:"99999",size:5},state:{optionLabels:["ALABAMA","ALASKA","AMERICANSAMOA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICTOFCOLUMBIA","FEDERATEDSTATESOFMICRONESIA","FLORIDA","GEORGIA","GUAM","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MARSHALLISLANDS","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","MONTANA","NEBRASKA","NEVADA","NEWHAMPSHIRE","NEWJERSEY","NEWMEXICO","NEWYORK","NORTHCAROLINA","NORTHDAKOTA","NORTHERNMARIANAISLANDS","OHIO","OKLAHOMA","OREGON","PALAU","PENNSYLVANIA","PUERTORICO","RHODEISLAND","SOUTHCAROLINA","SOUTHDAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGINISLANDS","VIRGINIA","WASHINGTON","WESTVIRGINIA","WISCONSIN","WYOMING"]}}});if(a.isEmpty(this.options.addressValidation)){this.options.addressValidation=true}},getAddress:function(){var d=this.getValue();if(this.view.type=="view"){d=this.data}var c="";if(d){if(d.street){b.each(d.street,function(e,f){c+=f+" "})}if(d.city){c+=d.city+" "}if(d.state){c+=d.state+" "}if(d.zip){c+=d.zip}}return c},renderField:function(c){this.base();var e=this;b(this.fieldContainer).addClass("alpaca-addressfield");if(this.options.addressValidation&&!this.isDisplayOnly()){b('<div style="clear:both;"></div>').appendTo(this.fieldContainer);var d=b('<div class="alpaca-form-button">Google Map</div>').appendTo(this.fieldContainer);if(d.button){d.button({text:true})}d.click(function(){if(google&&google.maps){var g=new google.maps.Geocoder();var f=e.getAddress();if(g){g.geocode({address:f},function(k,i){if(i==google.maps.GeocoderStatus.OK){var j=e.getId()+"-map-canvas";if(b("#"+j).length===0){b("<div id='"+j+"' class='alpaca-controlfield-address-mapcanvas'></div>").appendTo(e.fieldContainer)}var l=new google.maps.Map(document.getElementById(e.getId()+"-map-canvas"),{zoom:10,center:k[0].geometry.location,mapTypeId:google.maps.MapTypeId.ROADMAP});var h=new google.maps.Marker({map:l,position:k[0].geometry.location})}else{e.displayMessage("Geocoding failed: "+i)}})}}else{e.displayMessage("Google Map API is not installed.")}}).wrap("<small/>");if(this.options.showMapOnLoad){d.click()}}if(c){c()}}});a.registerFieldClass("address",a.Fields.AddressField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.DateField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.dateFormat){this.options.dateFormat=a.defaultDateFormat}if(!this.options.dateFormatRegex){this.options.dateFormatRegex=a.regexps.date}},postRender:function(){this.base();if(this.field&&b.datepicker){var c=this.options.datepicker;if(!c){c={changeMonth:true,changeYear:true}}if(!c.dateFormat){c.dateFormat=this.options.dateFormat}this.field.datepicker(c);if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-date")}}},onChange:function(c){this.base();this.renderValidationState()},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateDateFormat();d.invalidDate={message:c?"":a.substituteTokens(this.view.getMessage("invalidDate"),[this.options.dateFormat]),status:c};return e&&d.invalidDate["status"]},_validateDateFormat:function(){var c=this.field.val();if(b.datepicker){try{b.datepicker.parseDate(this.options.dateFormat,c);return true}catch(d){return false}}else{return c.match(this.options.dateFormatRegex)}},setValue:function(c){if(c===""){this.base(c);return}this.base(c)}});a.registerMessages({invalidDate:"Invalid date for format {0}"});a.registerFieldClass("date",a.Fields.DateField);a.registerDefaultFormatFieldMapping("date","date")})(jQuery);(function(b){var a=b.alpaca;a.Fields.DatetimeField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base()},postRender:function(){var c=this;this.base();if(this.field){if(this.field.datetimepicker){this.field.hover(function(){if(!b(this).hasClass("hasDatepicker")){var d=c.options.timepicker;if(!d){d=c.options.timepicker}if(!d){d={changeYear:true,changeMonth:true}}b(this).datetimepicker(d)}});if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-datetime")}}}},setValue:function(c){if(c){if(a.isNumber()){c=new Date(c)}if(Object.prototype.toString.call(c)=="[object Date]"){this.base((c.getMonth()+1)+"/"+c.getDate()+"/"+c.getFullYear()+" "+c.getHours()+":"+c.getMinutes())}else{this.base(c)}}else{this.base(c)}},getValue:function(){return this.base()},getDatetime:function(){try{return this.field.datetimepicker("getDate")}catch(c){return this.getValue()}}});a.registerFieldClass("datetime",a.Fields.DatetimeField);a.registerDefaultFormatFieldMapping("datetime","datetime")})(jQuery);(function(b){var a=b.alpaca;a.Fields.EditorField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldEditor")},postRender:function(){this.base();var d=this;if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-editor");b(this.fieldContainer).parent().css("width","100%");var e=this.options.aceHeight;if(e){b(this.fieldContainer).css("height",e)}var c=this.options.aceWidth;if(!c){c="100%"}b(this.fieldContainer).css("width",c)}var g=b(this.fieldContainer).find(".control-field-editor-el")[0];if(!ace&&window.ace){ace=window.ace}this.editor=ace.edit(g);var f=this.options.aceTheme;if(!f){f="ace/theme/chrome"}this.editor.setTheme(f);var i=this.options.aceMode;if(!i){i="ace/mode/json"}this.editor.getSession().setMode(i);this.editor.renderer.setHScrollBarAlwaysVisible(false);this.editor.setShowPrintMargin(false);this.editor.setValue(this.data);this.editor.clearSelection();if(this.options.aceFitContentHeight){var h=function(){var j=d.editor.getSession().getScreenLength()*d.editor.renderer.lineHeight+d.editor.renderer.scrollBar.getWidth();b(d.fieldContainer).height(j.toString()+"px");d.editor.resize()};h();d.editor.getSession().on("change",h)}if(this.schema.readonly){this.editor.setReadOnly(true)}b(g).bind("destroyed",function(){if(d.editor){d.editor.destroy();d.editor=null}})},destroy:function(){if(this.editor){this.editor.destroy();this.editor=null}this.base()},getEditor:function(){return this.editor},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateWordCount();d.wordLimitExceeded={message:c?"":a.substituteTokens(this.view.getMessage("wordLimitExceeded"),[this.options.wordlimit]),status:c};return e&&d.wordLimitExceeded["status"]},_validateWordCount:function(){if(this.options.wordlimit&&this.options.wordlimit>-1){var d=this.editor.getValue();if(d){var c=d.split(" ").length;if(c>this.options.wordlimit){return false}}}return true},onDependentReveal:function(){this.editor.resize()},setValue:function(d){var c=this;if(this.editor){this.editor.setValue(d)}this.base(d)},getValue:function(){var c=null;if(this.editor){c=this.editor.getValue()}return c}});a.registerMessages({wordLimitExceeded:"The maximum word limit of {0} has been exceeded."});a.registerTemplate("controlFieldEditor",'<div id="${id}" class="control-field-editor-el"></div>');a.registerFieldClass("editor",a.Fields.EditorField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.EmailField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.schema.pattern){this.schema.pattern=a.regexps.email}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-email")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){c.invalidPattern["message"]=this.view.getMessage("invalidEmail")}return d}});a.registerMessages({invalidEmail:"Invalid Email address e.g. info@cloudcms.com"});a.registerFieldClass("email",a.Fields.EmailField);a.registerDefaultFormatFieldMapping("email","email")})(jQuery);(function(b){var a=b.alpaca;a.Fields.IntegerField=a.Fields.NumberField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},getValue:function(){var c=this.field.val();if(a.isValEmpty(c)){return -1}else{return parseInt(c,10)}},onChange:function(c){this.base();if(this.slider){this.slider.slider("value",this.getValue())}},postRender:function(){this.base();var c=this;if(this.options.slider){if(!a.isEmpty(this.schema.maximum)&&!a.isEmpty(this.schema.minimum)){if(this.field){this.field.after('<div id="slider"></div>');this.slider=b("#slider",this.field.parent()).slider({value:this.getValue(),min:this.schema.minimum,max:this.schema.maximum,slide:function(d,e){c.setValue(e.value);c.renderValidationState()}})}}}if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-integer")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.stringNotANumber["status"]){c.stringNotANumber["message"]=this.view.getMessage("stringNotAnInteger")}return d},_validateNumber:function(){var c=this.field.val();if(a.isValEmpty(c)){return true}var d=this.getValue();if(isNaN(d)){return false}if(!c.match(a.regexps.integer)){return false}return true}});a.registerMessages({stringNotAnInteger:"This value is not an integer."});a.registerFieldClass("integer",a.Fields.IntegerField);a.registerDefaultSchemaFieldMapping("integer","integer")})(jQuery);(function(b){var a=b.alpaca;a.Fields.IPv4Field=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.schema.pattern){this.schema.pattern=a.regexps.ipv4}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-ipv4")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){c.invalidPattern["message"]=this.view.getMessage("invalidIPv4")}return d}});a.registerMessages({invalidIPv4:"Invalid IPv4 address, e.g. 192.168.0.1"});a.registerFieldClass("ipv4",a.Fields.IPv4Field);a.registerDefaultFormatFieldMapping("ip-address","ipv4")})(jQuery);(function(b){var a=b.alpaca;a.Fields.JSONField=a.Fields.TextAreaField.extend({constructor:function(f,j,h,i,e,d,g){this.base(f,j,h,i,e,d,g)},setValue:function(d){if(a.isObject(d)||typeof(d)=="object"){d=JSON.stringify(d,null,3)}this.base(d)},getValue:function(){var d=this.base();if(d&&a.isString(d)){d=JSON.parse(d)}return d},handleValidate:function(){var f=this.base();var e=this.validation;var d=this._validateJSON();e.stringNotAJSON={message:d.status?"":this.view.getMessage("stringNotAJSON")+" "+d.message,status:d.status};return f&&e.stringNotAJSON["status"]},_validateJSON:function(){var d=this.field.val();if(a.isValEmpty(d)){return{status:true}}try{var g=JSON.parse(d);this.setValue(JSON.stringify(g,null,3));return{status:true}}catch(f){return{status:false,message:f.message}}},postRender:function(){this.base();var d=this;if(this.field){this.field.bind("keypress",function(f){if(f.which==34){d.field.insertAtCaret('"')}if(f.which==123){d.field.insertAtCaret("}")}if(f.which==91){d.field.insertAtCaret("]")}});this.field.bind("keypress","Ctrl+l",function(){d.getEl().removeClass("alpaca-field-focused");d.renderValidationState()});this.field.attr("title","Type Ctrl+L to format and validate the JSON string.")}if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-json")}}});a.registerMessages({stringNotAJSON:"This value is not a valid JSON string."});a.registerFieldClass("json",a.Fields.JSONField);b.fn.insertAtCaret=function(d){return this.each(function(){if(document.selection){this.focus();sel=document.selection.createRange();sel.text=d;this.focus()}else{if(this.selectionStart||this.selectionStart=="0"){var f=this.selectionStart;var e=this.selectionEnd;var g=this.scrollTop;this.value=this.value.substring(0,f)+d+this.value.substring(e,this.value.length);this.focus();this.selectionStart=f;this.selectionEnd=f;this.scrollTop=g}else{this.value+=d;this.focus()}}})};jQuery.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}};function c(e){if(typeof e.data!=="string"){return}var d=e.handler,f=e.data.toLowerCase().split(" ");e.handler=function(o){if(this!==o.target&&(/textarea|select/i.test(o.target.nodeName)||o.target.type==="text")){return}var j=o.type!=="keypress"&&jQuery.hotkeys.specialKeys[o.which],p=String.fromCharCode(o.which).toLowerCase(),m,n="",h={};if(o.altKey&&j!=="alt"){n+="alt+"}if(o.ctrlKey&&j!=="ctrl"){n+="ctrl+"}if(o.metaKey&&!o.ctrlKey&&j!=="meta"){n+="meta+"}if(o.shiftKey&&j!=="shift"){n+="shift+"}if(j){h[n+j]=true}else{h[n+p]=true;h[n+jQuery.hotkeys.shiftNums[p]]=true;if(n==="shift+"){h[jQuery.hotkeys.shiftNums[p]]=true}}for(var k=0,g=f.length;k<g;k++){if(h[f[k]]){return d.apply(this,arguments)}}}}jQuery.each(["keydown","keyup","keypress"],function(){jQuery.event.special[this]={add:c}})})(jQuery);(function(b){var a=b.alpaca;a.Fields.IntegerField=a.Fields.NumberField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},getValue:function(){var c=this.field.val();if(a.isValEmpty(c)){return -1}else{return parseInt(c,10)}},onChange:function(c){this.base();if(this.slider){this.slider.slider("value",this.getValue())}},postRender:function(){this.base();var c=this;if(this.options.slider){if(!a.isEmpty(this.schema.maximum)&&!a.isEmpty(this.schema.minimum)){if(this.field){this.field.after('<div id="slider"></div>');this.slider=b("#slider",this.field.parent()).slider({value:this.getValue(),min:this.schema.minimum,max:this.schema.maximum,slide:function(d,e){c.setValue(e.value);c.renderValidationState()}})}}}if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-integer")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.stringNotANumber["status"]){c.stringNotANumber["message"]=this.view.getMessage("stringNotAnInteger")}return d},_validateNumber:function(){var c=this.field.val();if(a.isValEmpty(c)){return true}var d=this.getValue();if(isNaN(d)){return false}if(!c.match(a.regexps.integer)){return false}return true}});a.registerMessages({stringNotAnInteger:"This value is not an integer."});a.registerFieldClass("integer",a.Fields.IntegerField);a.registerDefaultSchemaFieldMapping("integer","integer")})(jQuery);(function(b){var a=b.alpaca;a.Fields.LowerCaseField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-lowercase")}},setValue:function(d){var c=d.toLowerCase();if(c!=this.getValue()){this.base(c)}},onKeyPress:function(c){this.base(c);var d=this;a.later(25,this,function(){var e=d.getValue();d.setValue(e)})}});a.registerFieldClass("lowercase",a.Fields.LowerCaseField);a.registerDefaultFormatFieldMapping("lowercase","lowercase")})(jQuery);(function(b){var a=b.alpaca;a.Fields.MapField=a.Fields.ArrayField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();a.mergeObject(this.options,{forceRevalidation:true});if(a.isEmpty(this.data)){return}if(!a.isArray(this.data)){if(a.isObject(this.data)){var c=[];b.each(this.data,function(d,e){var f=a.copyOf(e);f._key=d;c.push(f)});this.data=c}}},getValue:function(){if(this.children.length===0&&!this.schema.required){return}var f={};for(var e=0;e<this.children.length;e++){var c=this.children[e].getValue();var d=c._key;if(d){delete c._key;f[d]=c}}return f},handleValidate:function(){var e=this.base();var d=this.validation;var f=this._validateMapKeysNotEmpty();d.keyMissing={message:f?"":this.view.getMessage("keyMissing"),status:f};var c=this._validateMapKeysUnique();d.keyNotUnique={message:c?"":this.view.getMessage("keyNotUnique"),status:c};return e&&d.keyMissing["status"]&&d.keyNotUnique["status"]},_validateMapKeysNotEmpty:function(){var f=true;for(var e=0;e<this.children.length;e++){var c=this.children[e].getValue();var d=c._key;if(!d){f=false;break}}return f},_validateMapKeysUnique:function(){var g=true;var f={};for(var e=0;e<this.children.length;e++){var c=this.children[e].getValue();var d=c._key;if(f[d]){g=false}f[d]=d}return g},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-map")}}});a.registerFieldClass("map",a.Fields.MapField);a.registerMessages({keyNotUnique:"Keys of map field are not unique.",keyMissing:"Map contains an empty key."})})(jQuery);(function(b){var a=b.alpaca;a.Fields.PasswordField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.schema.pattern){this.schema.pattern=a.regexps.password}this.controlFieldTemplateDescriptor=this.view.getTemplateDescriptor("controlFieldPassword")},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-password")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){c.invalidPattern["message"]=this.view.getMessage("invalidPassword")}return d}});a.registerTemplate("controlFieldPassword",'<input type="password" id="${id}" {{if options.size}}size="${options.size}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');a.registerMessages({invalidPassword:"Invalid Password"});a.registerFieldClass("password",a.Fields.PasswordField);a.registerDefaultFormatFieldMapping("password","password")})(jQuery);(function(b){var a=b.alpaca;a.Fields.PersonalNameField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-personalname")}},setValue:function(d){var e="";for(var c=0;c<d.length;c++){if(c===0){e+=d.charAt(c).toUpperCase()}else{if(d.charAt(c-1)==" "||d.charAt(c-1)=="-"||d.charAt(c-1)=="'"){e+=d.charAt(c).toUpperCase()}else{e+=d.charAt(c)}}}if(e!=this.getValue()){this.base(e)}},onKeyPress:function(c){this.base(c);var d=this;a.later(25,this,function(){var e=d.getValue();d.setValue(e)})}});a.registerFieldClass("personalname",a.Fields.PersonalNameField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.PhoneField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.schema.pattern){this.schema.pattern=a.regexps.phone}if(a.isEmpty(this.options.maskString)){this.options.maskString="(999) 999-9999"}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-phone")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){c.invalidPattern["message"]=this.view.getMessage("invalidPhone")}return d}});a.registerMessages({invalidPhone:"Invalid Phone Number, e.g. (123) 456-9999"});a.registerFieldClass("phone",a.Fields.PhoneField);a.registerDefaultFormatFieldMapping("phone","phone")})(jQuery);(function(b){var a=b.alpaca;a.Fields.TagField=a.Fields.LowerCaseField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.separator){this.options.separator=","}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-tag")}},getValue:function(){var c=this.base();if(c===""){return[]}return c.split(this.options.separator)},setValue:function(c){if(c===""){return}this.base(c.join(this.options.separator))},onBlur:function(f){this.base(f);var c=this.getValue();var d=[];b.each(c,function(g,e){if(e.trim()!==""){d.push(e.trim())}});this.setValue(d)}});a.registerFieldClass("tag",a.Fields.TagField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.TimeField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.base();if(!this.options.timeFormat){this.options.timeFormat="hh:mm:ss"}if(!this.options.timeFormatRegex){this.options.timeFormatRegex=/^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/}if(a.isEmpty(this.options.maskString)){this.options.maskString="99:99:99"}},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-time")}},onChange:function(c){this.base();this.renderValidationState()},handleValidate:function(){var e=this.base();var d=this.validation;var c=this._validateTimeFormat();d.invalidTime={message:c?"":a.substituteTokens(this.view.getMessage("invalidTime"),[this.options.timeFormat]),status:c};return e&&d.invalidTime["status"]},_validateTimeFormat:function(){var c=this.field.val();if(!this.schema.required&&(a.isValEmpty(c)||c=="__:__:__")){return true}return c.match(this.options.timeFormatRegex)}});a.registerMessages({invalidTime:"Invalid time for format {0}"});a.registerFieldClass("time",a.Fields.TimeField);a.registerDefaultFormatFieldMapping("time","time")})(jQuery);(function(b){var a=b.alpaca;a.Fields.UpperCaseField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-uppercase")}},setValue:function(c){var d=c.toUpperCase();if(d!=this.getValue()){this.base(d)}},onKeyPress:function(c){this.base(c);var d=this;a.later(25,this,function(){var e=d.getValue();d.setValue(e)})}});a.registerFieldClass("uppercase",a.Fields.UpperCaseField);a.registerDefaultFormatFieldMapping("uppercase","uppercase")})(jQuery);(function(b){var a=b.alpaca;a.Fields.WysiwygField=a.Fields.TextAreaField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f);this.controlsConfig={};this.controlsConfig.simple={html:{visible:true},createLink:{visible:false},unLink:{visible:false},h1:{visible:false},h2:{visible:false},h3:{visible:false},indent:{visible:false},insertHorizontalRule:{visible:false},insertImage:{visible:false},insertOrderedList:{visible:false},insertTable:{visible:false},insertUnorderedList:{visible:false},justifyCenter:{visible:false},justifyFull:{visible:false},justifyLeft:{visible:false},justifyRight:{visible:false},outdent:{visible:false},redo:{visible:false},removeFormat:{visible:false},subscript:{visible:false},superscript:{visible:false},undo:{visible:false},code:{visible:false},strikeThrough:{visible:false}}},setup:function(){this.base();this.plugin=null},postRender:function(){this.base();var d=this;if(this.field&&b.wysiwyg){var c=this.options.wysiwyg?this.options.wysiwyg:{};if(c.controls){if(typeof(c.controls)==="string"){c.controls=this.controlsConfig[c.controls];if(!c.controls){c.controls={}}}}if(this.options.onDemand){this.outerEl.find("textarea").mouseover(function(){if(!d.plugin){d.plugin=b(this).wysiwyg(c);d.outerEl.find(".wysiwyg").mouseout(function(){if(d.plugin){d.plugin.wysiwyg("destroy")}d.plugin=null})}})}else{this.plugin=this.field.wysiwyg(c)}this.outerEl.find(".wysiwyg").mouseout(function(){d.data=d.getValue();d.renderValidationState()})}if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-wysiwyg")}}});a.registerFieldClass("wysiwyg",a.Fields.WysiwygField)})(jQuery);(function(b){var a=b.alpaca;a.Fields.StateField=a.Fields.SelectField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){if(a.isUndefined(this.options.capitalize)){this.options.capitalize=false}if(a.isUndefined(this.options.includeStates)){this.options.includeStates=true}if(a.isUndefined(this.options.includeTerritories)){this.options.includeTerritories=true}if(a.isUndefined(this.options.format)){this.options.format="name"}if(this.options.format=="name"||this.options.format=="code"){}else{a.logError("The configured state format: "+this.options.format+" is not a legal value [name, code]");this.options.format="name"}var c=a.retrieveUSHoldings(this.options.includeStates,this.options.includeTerritories,(this.options.format=="code"),this.options.capitalize);this.schema["enum"]=c.keys;this.options.optionLabels=c.values;this.base()},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-state")}},handleValidate:function(){var c=this.base();return c}});a.registerFieldClass("state",a.Fields.StateField);a.registerDefaultFormatFieldMapping("state","state");a.retrieveUSHoldings=function(){var c=[];c.push({name:"Arkansas",code:"AK",state:true,territory:false});c.push({name:"Alabama",code:"AL",state:true,territory:false});c.push({name:"American Samoa",code:"AS",state:false,territory:true});c.push({name:"Arizona",code:"AR",state:true,territory:false});c.push({name:"California",code:"CA",state:true,territory:false});c.push({name:"Colorado",code:"CO",state:true,territory:false});c.push({name:"Connecticut",code:"CT",state:true,territory:false});c.push({name:"Delaware",code:"DE",state:true,territory:false});c.push({name:"Distict of Columbia",code:"DC",state:false,territory:true});c.push({name:"Federated States of Micronesia",code:"FM",state:false,territory:true});c.push({name:"Florida",code:"FL",state:true,territory:false});c.push({name:"Georgia",code:"GA",state:true,territory:false});c.push({name:"Guam",code:"GU",state:false,territory:true});c.push({name:"Georgia",code:"GA",state:true,territory:false});c.push({name:"Hawaii",code:"HI",state:true,territory:false});c.push({name:"Idaho",code:"ID",state:true,territory:false});c.push({name:"Illinois",code:"IL",state:true,territory:false});c.push({name:"Indiana",code:"IN",state:true,territory:false});c.push({name:"Iowa",code:"IA",state:true,territory:false});c.push({name:"Kansas",code:"KS",state:true,territory:false});c.push({name:"Kentucky",code:"KY",state:true,territory:false});c.push({name:"Louisiana",code:"LA",state:true,territory:false});c.push({name:"Maine",code:"ME",state:true,territory:false});c.push({name:"Marshall Islands",code:"MH",state:false,territory:true});c.push({name:"Maryland",code:"MD",state:true,territory:false});c.push({name:"Massachusetts",code:"MA",state:true,territory:false});c.push({name:"Michigan",code:"MI",state:true,territory:false});c.push({name:"Minnesota",code:"MN",state:true,territory:false});c.push({name:"Mississippi",code:"MS",state:true,territory:false});c.push({name:"Missouri",code:"MO",state:true,territory:false});c.push({name:"Montana",code:"MT",state:true,territory:false});c.push({name:"Nebraska",code:"NE",state:true,territory:false});c.push({name:"Nevada",code:"NV",state:true,territory:false});c.push({name:"New Hampshire",code:"NH",state:true,territory:false});c.push({name:"New Jersey",code:"NJ",state:true,territory:false});c.push({name:"New Mexico",code:"NM",state:true,territory:false});c.push({name:"New York",code:"NY",state:true,territory:false});c.push({name:"North Carolina",code:"NC",state:true,territory:false});c.push({name:"North Dakota",code:"ND",state:true,territory:false});c.push({name:"Northern Mariana Islands",code:"MP",state:true,territory:false});c.push({name:"Ohio",code:"OH",state:true,territory:false});c.push({name:"Oklahoma",code:"OK",state:true,territory:false});c.push({name:"Oregon",code:"OR",state:true,territory:false});c.push({name:"Palau",code:"PW",state:false,territory:true});c.push({name:"Pennsylvania",code:"PA",state:true,territory:false});c.push({name:"Puerto Rico",code:"PR",state:false,territory:true});c.push({name:"Rhode Island",code:"RI",state:true,territory:false});c.push({name:"South Carolina",code:"SC",state:true,territory:false});c.push({name:"South Dakota",code:"SD",state:true,territory:false});c.push({name:"Tennessee",code:"TN",state:true,territory:false});c.push({name:"Texas",code:"TX",state:true,territory:false});c.push({name:"Utah",code:"UT",state:true,territory:false});c.push({name:"Vermont",code:"VT",state:true,territory:false});c.push({name:"Virgin Islands",code:"VI",state:false,territory:true});c.push({name:"Virginia",code:"VA",state:true,territory:false});c.push({name:"Washington",code:"WA",state:true,territory:false});c.push({name:"West Virginia",code:"WV",state:true,territory:false});c.push({name:"Wisconsin",code:"WI",state:true,territory:false});c.push({name:"Wyoming",code:"WY",state:true,territory:false});return function(l,e,h,g){var m={keys:[],values:[]};for(var f=0;f<c.length;f++){var d=false;if(c[f].state&&l){d=true}else{if(c[f].territory&&e){d=true}}if(d){var k=c[f].code;var j=c[f].name;if(h){j=c[f].code}if(g){j=j.toUpperCase()}m.keys.push(k);m.values.push(j)}}return m}}()})(jQuery);(function(b){var a=b.alpaca;a.Fields.CountryField=a.Fields.SelectField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){if(a.isUndefined(this.options.capitalize)){this.options.capitalize=false}this.schema["enum"]=[];this.options.optionLabels=[];var e=this.view.getMessage("countries");if(e){for(var d in e){this.schema["enum"].push(d);var c=e[d];if(this.options.capitalize){c=c.toUpperCase()}this.options.optionLabels.push(c)}}this.base()},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-country")}},handleValidate:function(){var c=this.base();return c}});a.registerFieldClass("country",a.Fields.CountryField);a.registerDefaultFormatFieldMapping("country","country")})(jQuery);(function(b){var a=b.alpaca;a.Fields.ZipcodeField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.options.format=(this.options.format?this.options.format:"nine");if(this.options.format=="nine"){this.schema.pattern=a.regexps["zipcode-nine"]}else{if(this.options.format=="five"){this.schema.pattern=a.regexps["zipcode-five"]}else{a.logError("The configured zipcode format: "+this.options.format+" is not a legal value [five, nine]");this.options.format="nine";this.schema.pattern=a.regexps["zipcode-nine"]}}if(this.options.format=="nine"){this.options.maskString="99999-9999"}else{if(this.options.format=="five"){this.options.maskString="99999"}}this.base()},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-zipcode")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){if(this.options.format=="nine"){c.invalidPattern["message"]=this.view.getMessage("invalidZipcodeFormatNine")}else{if(this.options.format=="five"){c.invalidPattern["message"]=this.view.getMessage("invalidZipcodeFormatFive")}}}return d}});a.registerMessages({invalidZipcodeFormatFive:"Invalid Five-Digit Zipcode (#####)",invalidZipcodeFormatNine:"Invalid Nine-Digit Zipcode (#####-####)"});a.registerFieldClass("zipcode",a.Fields.ZipcodeField);a.registerDefaultFormatFieldMapping("zipcode","zipcode")})(jQuery);(function(b){var a=b.alpaca;a.Fields.URLField=a.Fields.TextField.extend({constructor:function(e,i,g,h,d,c,f){this.base(e,i,g,h,d,c,f)},setup:function(){this.schema.pattern=a.regexps.url;this.schema.format="uri";this.base()},postRender:function(){this.base();if(this.fieldContainer){this.fieldContainer.addClass("alpaca-controlfield-url")}},handleValidate:function(){var d=this.base();var c=this.validation;if(!c.invalidPattern["status"]){c.invalidPattern["message"]=this.view.getMessage("invalidURLFormat")}return d}});a.registerMessages({invalidURLFormat:"The URL provided is not a valid web address."});a.registerFieldClass("url",a.Fields.URLField);a.registerDefaultFormatFieldMapping("url","url")})(jQuery);;//! moment.js
//! version : 2.5.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function c(a,b){return function(c){return k(a.call(this,c),b)}}function d(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function e(){}function f(a){w(a),h(this,a)}function g(a){var b=q(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function h(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function i(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&qb.hasOwnProperty(b)&&(c[b]=a[b]);return c}function j(a){return 0>a?Math.ceil(a):Math.floor(a)}function k(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function l(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&db.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function m(a){return"[object Array]"===Object.prototype.toString.call(a)}function n(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function o(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&s(a[d])!==s(b[d]))&&g++;return g+f}function p(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Tb[a]||Ub[b]||b}return a}function q(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=p(c),b&&(d[b]=a[c]));return d}function r(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}db[b]=function(e,f){var g,h,i=db.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=db().utc().set(d,a);return i.call(db.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function s(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function t(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function u(a){return v(a)?366:365}function v(a){return a%4===0&&a%100!==0||a%400===0}function w(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[jb]<0||a._a[jb]>11?jb:a._a[kb]<1||a._a[kb]>t(a._a[ib],a._a[jb])?kb:a._a[lb]<0||a._a[lb]>23?lb:a._a[mb]<0||a._a[mb]>59?mb:a._a[nb]<0||a._a[nb]>59?nb:a._a[ob]<0||a._a[ob]>999?ob:-1,a._pf._overflowDayOfYear&&(ib>b||b>kb)&&(b=kb),a._pf.overflow=b)}function x(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function y(a){return a?a.toLowerCase().replace("_","-"):a}function z(a,b){return b._isUTC?db(a).zone(b._offset||0):db(a).local()}function A(a,b){return b.abbr=a,pb[a]||(pb[a]=new e),pb[a].set(b),pb[a]}function B(a){delete pb[a]}function C(a){var b,c,d,e,f=0,g=function(a){if(!pb[a]&&rb)try{require("./lang/"+a)}catch(b){}return pb[a]};if(!a)return db.fn._lang;if(!m(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=y(a[f]).split("-"),b=e.length,d=y(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&o(e,d,!0)>=b-1)break;b--}f++}return db.fn._lang}function D(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function E(a){var b,c,d=a.match(vb);for(b=0,c=d.length;c>b;b++)d[b]=Yb[d[b]]?Yb[d[b]]:D(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function F(a,b){return a.isValid()?(b=G(b,a.lang()),Vb[b]||(Vb[b]=E(b)),Vb[b](a)):a.lang().invalidDate()}function G(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(wb.lastIndex=0;d>=0&&wb.test(a);)a=a.replace(wb,c),wb.lastIndex=0,d-=1;return a}function H(a,b){var c,d=b._strict;switch(a){case"DDDD":return Ib;case"YYYY":case"GGGG":case"gggg":return d?Jb:zb;case"Y":case"G":case"g":return Lb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Kb:Ab;case"S":if(d)return Gb;case"SS":if(d)return Hb;case"SSS":if(d)return Ib;case"DDD":return yb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Cb;case"a":case"A":return C(b._l)._meridiemParse;case"X":return Fb;case"Z":case"ZZ":return Db;case"T":return Eb;case"SSSS":return Bb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Hb:xb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return xb;default:return c=new RegExp(P(O(a.replace("\\","")),"i"))}}function I(a){a=a||"";var b=a.match(Db)||[],c=b[b.length-1]||[],d=(c+"").match(Qb)||["-",0,0],e=+(60*d[1])+s(d[2]);return"+"===d[0]?-e:e}function J(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[jb]=s(b)-1);break;case"MMM":case"MMMM":d=C(c._l).monthsParse(b),null!=d?e[jb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[kb]=s(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=s(b));break;case"YY":e[ib]=s(b)+(s(b)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":e[ib]=s(b);break;case"a":case"A":c._isPm=C(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[lb]=s(b);break;case"m":case"mm":e[mb]=s(b);break;case"s":case"ss":e[nb]=s(b);break;case"S":case"SS":case"SSS":case"SSSS":e[ob]=s(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=I(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function K(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=M(a),a._w&&null==a._a[kb]&&null==a._a[jb]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[ib]?db().weekYear():a._a[ib]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=Z(f(g.GG),g.W||1,g.E,4,1):(i=C(a._l),j=null!=g.d?V(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=Z(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[ib]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[ib]?d[ib]:a._a[ib],a._dayOfYear>u(e)&&(a._pf._overflowDayOfYear=!0),c=U(e,0,a._dayOfYear),a._a[jb]=c.getUTCMonth(),a._a[kb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[lb]+=s((a._tzm||0)/60),l[mb]+=s((a._tzm||0)%60),a._d=(a._useUTC?U:T).apply(null,l)}}function L(a){var b;a._d||(b=q(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],K(a))}function M(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function N(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=C(a._l),h=""+a._i,i=h.length,j=0;for(d=G(a._f,g).match(vb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(H(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Yb[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),J(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[lb]<12&&(a._a[lb]+=12),a._isPm===!1&&12===a._a[lb]&&(a._a[lb]=0),K(a),w(a)}function O(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function P(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Q(a){var c,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,a._d=new Date(0/0),void 0;for(f=0;f<a._f.length;f++)g=0,c=h({},a),c._pf=b(),c._f=a._f[f],N(c),x(c)&&(g+=c._pf.charsLeftOver,g+=10*c._pf.unusedTokens.length,c._pf.score=g,(null==e||e>g)&&(e=g,d=c));h(a,d||c)}function R(a){var b,c,d=a._i,e=Mb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Ob.length;c>b;b++)if(Ob[b][1].exec(d)){a._f=Ob[b][0]+(e[6]||" ");break}for(b=0,c=Pb.length;c>b;b++)if(Pb[b][1].exec(d)){a._f+=Pb[b][0];break}d.match(Db)&&(a._f+="Z"),N(a)}else a._d=new Date(d)}function S(b){var c=b._i,d=sb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?R(b):m(c)?(b._a=c.slice(0),K(b)):n(c)?b._d=new Date(+c):"object"==typeof c?L(b):b._d=new Date(c)}function T(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function U(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function V(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function W(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function X(a,b,c){var d=hb(Math.abs(a)/1e3),e=hb(d/60),f=hb(e/60),g=hb(f/24),h=hb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",hb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,W.apply({},i)}function Y(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=db(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function Z(a,b,c,d,e){var f,g,h=U(a,0,1).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:u(a-1)+g}}function $(a){var b=a._i,c=a._f;return null===b?db.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=C().preparse(b)),db.isMoment(b)?(a=i(b),a._d=new Date(+b._d)):c?m(c)?Q(a):N(a):S(a),new f(a))}function _(a,b){db.fn[a]=db.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),db.updateOffset(this),this):this._d["get"+c+b]()}}function ab(a){db.duration.fn[a]=function(){return this._data[a]}}function bb(a,b){db.duration.fn["as"+a]=function(){return+this/b}}function cb(a){var b=!1,c=db;"undefined"==typeof ender&&(a?(gb.moment=function(){return!b&&console&&console.warn&&(b=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),c.apply(null,arguments)},h(gb.moment,c)):gb.moment=db)}for(var db,eb,fb="2.5.1",gb=this,hb=Math.round,ib=0,jb=1,kb=2,lb=3,mb=4,nb=5,ob=6,pb={},qb={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},rb="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,sb=/^\/?Date\((\-?\d+)/i,tb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,ub=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,vb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,wb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,xb=/\d\d?/,yb=/\d{1,3}/,zb=/\d{1,4}/,Ab=/[+\-]?\d{1,6}/,Bb=/\d+/,Cb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Db=/Z|[\+\-]\d\d:?\d\d/gi,Eb=/T/i,Fb=/[\+\-]?\d+(\.\d{1,3})?/,Gb=/\d/,Hb=/\d\d/,Ib=/\d{3}/,Jb=/\d{4}/,Kb=/[+-]?\d{6}/,Lb=/[+-]?\d+/,Mb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Nb="YYYY-MM-DDTHH:mm:ssZ",Ob=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Pb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Qb=/([\+\-]|\d\d)/gi,Rb="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Sb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Tb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Ub={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Vb={},Wb="DDD w W M D d".split(" "),Xb="M D H h m s w W".split(" "),Yb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return k(this.year()%100,2)},YYYY:function(){return k(this.year(),4)},YYYYY:function(){return k(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+k(Math.abs(a),6)},gg:function(){return k(this.weekYear()%100,2)},gggg:function(){return k(this.weekYear(),4)},ggggg:function(){return k(this.weekYear(),5)},GG:function(){return k(this.isoWeekYear()%100,2)},GGGG:function(){return k(this.isoWeekYear(),4)},GGGGG:function(){return k(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return s(this.milliseconds()/100)},SS:function(){return k(s(this.milliseconds()/10),2)},SSS:function(){return k(this.milliseconds(),3)},SSSS:function(){return k(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+k(s(a/60),2)+":"+k(s(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+k(s(a/60),2)+k(s(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Zb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Wb.length;)eb=Wb.pop(),Yb[eb+"o"]=d(Yb[eb],eb);for(;Xb.length;)eb=Xb.pop(),Yb[eb+eb]=c(Yb[eb],2);for(Yb.DDDD=c(Yb.DDD,3),h(e.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=db.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=db([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return Y(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),db=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=c,g._f=d,g._l=e,g._strict=f,g._isUTC=!1,g._pf=b(),$(g)},db.utc=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=c,g._f=d,g._strict=f,g._pf=b(),$(g).utc()},db.unix=function(a){return db(1e3*a)},db.duration=function(a,b){var c,d,e,f=a,h=null;return db.isDuration(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(h=tb.exec(a))?(c="-"===h[1]?-1:1,f={y:0,d:s(h[kb])*c,h:s(h[lb])*c,m:s(h[mb])*c,s:s(h[nb])*c,ms:s(h[ob])*c}):(h=ub.exec(a))&&(c="-"===h[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},f={y:e(h[2]),M:e(h[3]),d:e(h[4]),h:e(h[5]),m:e(h[6]),s:e(h[7]),w:e(h[8])}),d=new g(f),db.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},db.version=fb,db.defaultFormat=Nb,db.updateOffset=function(){},db.lang=function(a,b){var c;return a?(b?A(y(a),b):null===b?(B(a),a="en"):pb[a]||C(a),c=db.duration.fn._lang=db.fn._lang=C(a),c._abbr):db.fn._lang._abbr},db.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),C(a)},db.isMoment=function(a){return a instanceof f||null!=a&&a.hasOwnProperty("_isAMomentObject")},db.isDuration=function(a){return a instanceof g},eb=Zb.length-1;eb>=0;--eb)r(Zb[eb]);for(db.normalizeUnits=function(a){return p(a)},db.invalid=function(a){var b=db.utc(0/0);return null!=a?h(b._pf,a):b._pf.userInvalidated=!0,b},db.parseZone=function(a){return db(a).parseZone()},h(db.fn=f.prototype,{clone:function(){return db(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=db(this).utc();return 0<a.year()&&a.year()<=9999?F(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):F(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return x(this)},isDSTShifted:function(){return this._a?this.isValid()&&o(this._a,(this._isUTC?db.utc(this._a):db(this._a)).toArray())>0:!1},parsingFlags:function(){return h({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=F(this,a||db.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?db.duration(+b,a):db.duration(a,b),l(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?db.duration(+b,a):db.duration(a,b),l(this,c,-1),this},diff:function(a,b,c){var d,e,f=z(a,this),g=6e4*(this.zone()-f.zone());return b=p(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-db(this).startOf("month")-(f-db(f).startOf("month")))/d,e-=6e4*(this.zone()-db(this).startOf("month").zone()-(f.zone()-db(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:j(e)},from:function(a,b){return db.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(db(),a)},calendar:function(){var a=z(db(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return v(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=V(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),db.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=p(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=p(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+db(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+db(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+z(a,this).startOf(b)},min:function(a){return a=db.apply(null,arguments),this>a?this:a},max:function(a){return a=db.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=I(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&l(this,db.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?db(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return t(this.year(),this.month())},dayOfYear:function(a){var b=hb((db(this).startOf("day")-db(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(a){var b=Y(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=Y(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=Y(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=p(a),this[a]()},set:function(a,b){return a=p(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=C(b),this)}}),eb=0;eb<Rb.length;eb++)_(Rb[eb].toLowerCase().replace(/s$/,""),Rb[eb]);_("year","FullYear"),db.fn.days=db.fn.day,db.fn.months=db.fn.month,db.fn.weeks=db.fn.week,db.fn.isoWeeks=db.fn.isoWeek,db.fn.toJSON=db.fn.toISOString,h(db.duration.fn=g.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=j(e/1e3),h.seconds=a%60,b=j(a/60),h.minutes=b%60,c=j(b/60),h.hours=c%24,f+=j(c/24),h.days=f%30,g+=j(f/30),h.months=g%12,d=j(g/12),h.years=d},weeks:function(){return j(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*s(this._months/12)},humanize:function(a){var b=+this,c=X(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=db.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=db.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=p(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=p(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:db.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(eb in Sb)Sb.hasOwnProperty(eb)&&(bb(eb,Sb[eb]),ab(eb.toLowerCase()));bb("Weeks",6048e5),db.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},db.lang("en",{ordinal:function(a){var b=a%10,c=1===s(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),function(a){a(db)}(function(a){return a.lang("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}})}),function(a){a(db)}(function(a){return a.lang("ar",{months:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),monthsShort:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}})}),function(a){a(db)}(function(a){return a.lang("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(b){function c(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+f(d[c],a)}function d(a){switch(e(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function e(a){return a>9?e(a%10):a}function f(a,b){return 2===b?g(a):a}function g(b){var c={m:"v",b:"v",d:"z"};return c[b.charAt(0)]===a?b:c[b.charAt(0)]+b.substring(1)}return b.lang("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY LT",LLLL:"dddd, D [a viz] MMMM YYYY LT"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:c,h:"un eur",hh:"%d eur",d:"un devezh",dd:c,M:"ur miz",MM:c,y:"ur bloaz",yy:d},ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}return a.lang("bs",{months:"januar_februar_mart_april_maj_juni_juli_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:b,mm:b,h:b,hh:b,d:"dan",dd:b,M:"mjesec",MM:b,y:"godinu",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"
},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a){return a>1&&5>a&&1!==~~(a/10)}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"pár vteřin":"pár vteřinami";case"m":return c?"minuta":e?"minutu":"minutou";case"mm":return c||e?f+(b(a)?"minuty":"minut"):f+"minutami";break;case"h":return c?"hodina":e?"hodinu":"hodinou";case"hh":return c||e?f+(b(a)?"hodiny":"hodin"):f+"hodinami";break;case"d":return c||e?"den":"dnem";case"dd":return c||e?f+(b(a)?"dny":"dní"):f+"dny";break;case"M":return c||e?"měsíc":"měsícem";case"MM":return c||e?f+(b(a)?"měsíce":"měsíců"):f+"měsíci";break;case"y":return c||e?"rok":"rokem";case"yy":return c||e?f+(b(a)?"roky":"let"):f+"lety"}}var d="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),e="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");return a.lang("cs",{months:d,monthsShort:e,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(d,e),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:c,m:c,mm:c,h:c,hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("cv",{months:"кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),monthsShort:"кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кç_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",L:"DD-MM-YYYY",LL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",LLL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",LLLL:"dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ĕнер] LT [сехетре]",nextWeek:"[Çитес] dddd LT [сехетре]",lastWeek:"[Иртнĕ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/çул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пĕр-ик çеккунт",m:"пĕр минут",mm:"%d минут",h:"пĕр сехет",hh:"%d сехет",d:"пĕр кун",dd:"%d кун",M:"пĕр уйăх",MM:"%d уйăх",y:"пĕр çул",yy:"%d çул"},ordinal:"%d-мĕш",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn àl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinal:function(a){var b=a,c="",d=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return b>20?c=40===b||50===b||60===b||80===b||100===b?"fed":"ain":b>0&&(c=d[b]),a+c},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D. MMMM, YYYY LT"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c){var d={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?d[c][0]:d[c][1]}return a.lang("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Uhr]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Heute um] LT",sameElse:"L",nextDay:"[Morgen um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gestern um] LT",lastWeek:"[letzten] dddd [um] LT"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:b,mm:"%d Minuten",h:b,hh:"%d Stunden",d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},longDateFormat:{LT:"h:mm A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:"[την προηγούμενη] dddd [{}] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return c.replace("{}",d%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinal:function(a){return a+"η"},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY LT",LLLL:"dddd, D MMMM, YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}})}),function(a){a(db)}(function(a){return a.lang("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY LT",LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinal:"%da",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:"ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c,d){var e={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[a+" minuti",a+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[a+" tunni",a+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[a+" kuu",a+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[a+" aasta",a+" aastat"]};return b?e[c][2]?e[c][2]:e[c][1]:d?e[c][0]:e[c][1]}return a.lang("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:b,m:b,mm:b,h:b,hh:b,d:b,dd:"%d päeva",M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] LT",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] LT",llll:"ddd, YYYY[ko] MMM D[a] LT"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){var b={1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"},c={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"};return a.lang("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},meridiem:function(a){return 12>a?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return c[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]}).replace(/,/g,"،")},ordinal:"%dم",week:{dow:6,doy:12}})}),function(a){a(db)}(function(a){function b(a,b,d,e){var f="";switch(d){case"s":return e?"muutaman sekunnin":"muutama sekunti";case"m":return e?"minuutin":"minuutti";case"mm":f=e?"minuutin":"minuuttia";break;case"h":return e?"tunnin":"tunti";case"hh":f=e?"tunnin":"tuntia";break;case"d":return e?"päivän":"päivä";case"dd":f=e?"päivän":"päivää";break;case"M":return e?"kuukauden":"kuukausi";case"MM":f=e?"kuukauden":"kuukautta";break;case"y":return e?"vuoden":"vuosi";case"yy":f=e?"vuoden":"vuotta"}return f=c(a,e)+" "+f}function c(a,b){return 10>a?b?e[a]:d[a]:a}var d="nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),e=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",d[7],d[8],d[9]];return a.lang("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] LT",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] LT",llll:"ddd, Do MMM YYYY, [klo] LT"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:b,m:b,mm:b,h:b,hh:b,d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D. MMMM, YYYY LT"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(a){return a+(1===a?"er":"")}})}),function(a){a(db)}(function(a){return a.lang("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(a){return a+(1===a?"er":"")},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return"uns segundos"===a?"nuns segundos":"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinal:"%dº",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY LT",LLLL:"dddd, D [ב]MMMM YYYY LT",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY LT",llll:"ddd, D MMM YYYY LT"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a+" שנים"}}})}),function(a){a(db)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};return a.lang("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 4>a?"रात":10>a?"सुबह":17>a?"दोपहर":20>a?"शाम":"रात"},week:{dow:0,doy:6}})}),function(a){a(db)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}return a.lang("hr",{months:"sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),monthsShort:"sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:b,mm:b,h:b,hh:b,d:"dan",dd:b,M:"mjesec",MM:b,y:"godinu",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function c(a){return(a?"":"[múlt] ")+"["+d[this.day()]+"] LT[-kor]"}var d="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");return a.lang("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D., LT",LLLL:"YYYY. MMMM D., dddd LT"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return c.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return c.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:b,m:b,mm:b,h:b,hh:b,d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a,b){var c={nominative:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),accusative:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function c(a){var b="հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");return b[a.month()]}function d(a){var b="կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");return b[a.day()]}return a.lang("hy-am",{months:b,monthsShort:c,weekdays:d,weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., LT",LLLL:"dddd, D MMMM YYYY թ., LT"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiem:function(a){return 4>a?"գիշերվա":12>a?"առավոտվա":17>a?"ցերեկվա":"երեկոյան"},ordinal:function(a,b){switch(b){case"DDD":case"w":case"W":case"DDDo":return 1===a?a+"-ին":a+"-րդ";default:return a}},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiem:function(a){return 11>a?"pagi":15>a?"siang":19>a?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a){return a%100===11?!0:a%10===1?!1:!0}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return c?"mínúta":"mínútu";case"mm":return b(a)?f+(c||e?"mínútur":"mínútum"):c?f+"mínúta":f+"mínútu";case"hh":return b(a)?f+(c||e?"klukkustundir":"klukkustundum"):f+"klukkustund";case"d":return c?"dagur":e?"dag":"degi";case"dd":return b(a)?c?f+"dagar":f+(e?"daga":"dögum"):c?f+"dagur":f+(e?"dag":"degi");case"M":return c?"mánuður":e?"mánuð":"mánuði";case"MM":return b(a)?c?f+"mánuðir":f+(e?"mánuði":"mánuðum"):c?f+"mánuður":f+(e?"mánuð":"mánuði");case"y":return c||e?"ár":"ári";case"yy":return b(a)?f+(c||e?"ár":"árum"):f+(c||e?"ár":"ári")}}return a.lang("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd, D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:c,m:c,mm:c,h:"klukkustund",hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})
}),function(a){a(db)}(function(a){return a.lang("it",{months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:"[lo scorso] dddd [alle] LT",sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日LT",LLLL:"YYYY年M月D日LT dddd"},meridiem:function(a){return 12>a?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}})}),function(a){a(db)}(function(a){function b(a,b){var c={nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},d=/D[oD] *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function c(a,b){var c={nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")},d=/(წინა|შემდეგ)/.test(b)?"accusative":"nominative";return c[d][a.day()]}return a.lang("ka",{months:b,monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:c,weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(a)?a.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinal:function(a){return 0===a?a:1===a?a+"-ლი":20>a||100>=a&&a%20===0||a%100===0?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 mm분",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 LT",LLLL:"YYYY년 MMMM D일 dddd LT"},meridiem:function(a){return 12>a?"오전":"오후"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇초",ss:"%d초",m:"일분",mm:"%d분",h:"한시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한달",MM:"%d달",y:"일년",yy:"%d년"},ordinal:"%d일",meridiemParse:/(오전|오후)/,isPM:function(a){return"오후"===a}})}),function(a){a(db)}(function(a){function b(a,b,c){var d={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],dd:[a+" Deeg",a+" Deeg"],M:["ee Mount","engem Mount"],MM:[a+" Méint",a+" Méint"],y:["ee Joer","engem Joer"],yy:[a+" Joer",a+" Joer"]};return b?d[c][0]:d[c][1]}function c(a){var b=a.substr(0,a.indexOf(" "));return g(b)?"a "+a:"an "+a}function d(a){var b=a.substr(0,a.indexOf(" "));return g(b)?"viru "+a:"virun "+a}function e(){var a=this.format("d");return f(a)?"[Leschte] dddd [um] LT":"[Leschten] dddd [um] LT"}function f(a){switch(a=parseInt(a,10)){case 0:case 1:case 3:case 5:case 6:return!0;default:return!1}}function g(a){if(a=parseInt(a,10),isNaN(a))return!1;if(0>a)return!0;if(10>a)return a>=4&&7>=a?!0:!1;if(100>a){var b=a%10,c=a/10;return 0===b?g(c):g(b)}if(1e4>a){for(;a>=10;)a/=10;return g(a)}return a/=1e3,g(a)}return a.lang("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:e},relativeTime:{future:c,past:d,s:"e puer Sekonnen",m:b,mm:"%d Minutten",h:b,hh:"%d Stonnen",d:b,dd:b,M:b,MM:b,y:b,yy:b},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function c(a,b,c,d){return b?e(c)[0]:d?e(c)[1]:e(c)[2]}function d(a){return a%10===0||a>10&&20>a}function e(a){return h[a].split("_")}function f(a,b,f,g){var h=a+" ";return 1===a?h+c(a,b,f[0],g):b?h+(d(a)?e(f)[1]:e(f)[0]):g?h+e(f)[1]:h+(d(a)?e(f)[1]:e(f)[2])}function g(a,b){var c=-1===b.indexOf("dddd LT"),d=i[a.weekday()];return c?d:d.substring(0,d.length-2)+"į"}var h={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"},i="pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");return a.lang("lt",{months:"sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:g,weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], LT [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], LT [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:b,m:c,mm:f,h:c,hh:f,d:c,dd:f,M:c,MM:f,y:c,yy:f},ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c){var d=a.split("_");return c?b%10===1&&11!==b?d[2]:d[3]:b%10===1&&11!==b?d[0]:d[1]}function c(a,c,e){return a+" "+b(d[e],a,c)}var d={mm:"minūti_minūtes_minūte_minūtes",hh:"stundu_stundas_stunda_stundas",dd:"dienu_dienas_diena_dienas",MM:"mēnesi_mēnešus_mēnesis_mēneši",yy:"gadu_gadus_gads_gadi"};return a.lang("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, LT",LLLL:"YYYY. [gada] D. MMMM, dddd, LT"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"%s vēlāk",past:"%s agrāk",s:"dažas sekundes",m:"minūti",mm:c,h:"stundu",hh:c,d:"dienu",dd:c,M:"mēnesi",MM:c,y:"gadu",yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Во изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Во изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiem:function(a){return 4>a?"രാത്രി":12>a?"രാവിലെ":17>a?"ഉച്ച കഴിഞ്ഞ്":20>a?"വൈകുന്നേരം":"രാത്രി"}})}),function(a){a(db)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};return a.lang("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%s नंतर",past:"%s पूर्वी",s:"सेकंद",m:"एक मिनिट",mm:"%d मिनिटे",h:"एक तास",hh:"%d तास",d:"एक दिवस",dd:"%d दिवस",M:"एक महिना",MM:"%d महिने",y:"एक वर्ष",yy:"%d वर्षे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 4>a?"रात्री":10>a?"सकाळी":17>a?"दुपारी":20>a?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}})}),function(a){a(db)}(function(a){return a.lang("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] LT",LLLL:"dddd, D MMMM YYYY [pukul] LT"},meridiem:function(a){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"H.mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){var b={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},c={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};return a.lang("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),longDateFormat:{LT:"Aको h:mm बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return c[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiem:function(a){return 3>a?"राती":10>a?"बिहान":15>a?"दिउँसो":18>a?"बेलुका":20>a?"साँझ":"राती"},calendar:{sameDay:"[आज] LT",nextDay:"[भोली] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडी",s:"केही समय",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){var b="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),c="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");return a.lang("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,d){return/-MMM-/.test(d)?c[a.month()]:b[a.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregående] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekund",m:"ett minutt",mm:"%d minutt",h:"en time",hh:"%d timar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a){return 5>a%10&&a%10>1&&~~(a/10)%10!==1}function c(a,c,d){var e=a+" ";switch(d){case"m":return c?"minuta":"minutę";case"mm":return e+(b(a)?"minuty":"minut");case"h":return c?"godzina":"godzinę";case"hh":return e+(b(a)?"godziny":"godzin");case"MM":return e+(b(a)?"miesiące":"miesięcy");case"yy":return e+(b(a)?"lata":"lat")}}var d="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),e="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");return a.lang("pl",{months:function(a,b){return/D MMMM/.test(b)?e[a.month()]:d[a.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:c,mm:c,h:c,hh:c,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:c,y:"rok",yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:"%dº"})}),function(a){a(db)}(function(a){return a.lang("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:"%dº",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c){var d={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},e=" ";return(a%100>=20||a>=100&&a%100===0)&&(e=" de "),a+e+d[c]}return a.lang("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian_feb_mar_apr_mai_iun_iul_aug_sep_oct_noi_dec".split("_"),weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:b,h:"o oră",hh:b,d:"o zi",dd:b,M:"o lună",MM:b,y:"un an",yy:b},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mesec":2===a||3===a||4===a?"meseca":"meseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}return a.lang("rs",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"par sekundi",m:b,mm:b,h:b,hh:b,d:"dan",dd:b,M:"mesec",MM:b,y:"godinu",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function c(a,c,d){var e={mm:"минута_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===d?c?"минута":"минуту":a+" "+b(e[d],+a)}function d(a,b){var c={nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function e(a,b){var c={nominative:"янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function f(a,b){var c={nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")},d=/\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(b)?"accusative":"nominative";return c[d][a.day()]}return a.lang("ru",{months:d,monthsShort:e,weekdays:f,weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),monthsParse:[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[й|я]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i],longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., LT",LLLL:"dddd, D MMMM YYYY г., LT"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(){return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT"},lastWeek:function(){switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:c,mm:c,h:"час",hh:c,d:"день",dd:c,M:"месяц",MM:c,y:"год",yy:c},meridiem:function(a){return 4>a?"ночи":12>a?"утра":17>a?"дня":"вечера"},ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){function b(a){return a>1&&5>a}function c(a,c,d,e){var f=a+" ";switch(d){case"s":return c||e?"pár sekúnd":"pár sekundami";case"m":return c?"minúta":e?"minútu":"minútou";case"mm":return c||e?f+(b(a)?"minúty":"minút"):f+"minútami";break;case"h":return c?"hodina":e?"hodinu":"hodinou";case"hh":return c||e?f+(b(a)?"hodiny":"hodín"):f+"hodinami";break;case"d":return c||e?"deň":"dňom";case"dd":return c||e?f+(b(a)?"dni":"dní"):f+"dňami";break;case"M":return c||e?"mesiac":"mesiacom";case"MM":return c||e?f+(b(a)?"mesiace":"mesiacov"):f+"mesiacmi";break;case"y":return c||e?"rok":"rokom";case"yy":return c||e?f+(b(a)?"roky":"rokov"):f+"rokmi"}}var d="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),e="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");return a.lang("sk",{months:d,monthsShort:e,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(d,e),weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd D. MMMM YYYY LT"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:c,m:c,mm:c,h:c,hh:c,d:c,dd:c,M:c,MM:c,y:c,yy:c},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){function b(a,b,c){var d=a+" ";switch(c){case"m":return b?"ena minuta":"eno minuto";case"mm":return d+=1===a?"minuta":2===a?"minuti":3===a||4===a?"minute":"minut";case"h":return b?"ena ura":"eno uro";case"hh":return d+=1===a?"ura":2===a?"uri":3===a||4===a?"ure":"ur";case"dd":return d+=1===a?"dan":"dni";case"MM":return d+=1===a?"mesec":2===a?"meseca":3===a||4===a?"mesece":"mesecev";case"yy":return d+=1===a?"leto":2===a?"leti":3===a||4===a?"leta":"let"}}return a.lang("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY LT",LLLL:"dddd, D. MMMM YYYY LT"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[prejšnja] dddd [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"%s nazaj",s:"nekaj sekund",m:b,mm:b,h:b,hh:b,d:"en dan",dd:b,M:"en mesec",MM:b,y:"eno leto",yy:b},ordinal:"%d.",week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Marte_E Mërkure_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Neser në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s me parë",s:"disa sekonda",m:"një minut",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinal:"%d.",week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"dddd LT",lastWeek:"[Förra] dddd[en] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":3===b?"e":"e";return a+c},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, LT",LLLL:"dddd, D MMMM YYYY, LT"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinal:function(a){return a+"வது"
},meridiem:function(a){return a>=6&&10>=a?" காலை":a>=10&&14>=a?" நண்பகல்":a>=14&&18>=a?" எற்பாடு":a>=18&&20>=a?" மாலை":a>=20&&24>=a?" இரவு":a>=0&&6>=a?" வைகறை":void 0},week:{dow:0,doy:6}})}),function(a){a(db)}(function(a){return a.lang("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),longDateFormat:{LT:"H นาฬิกา m นาที",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา LT",LLLL:"วันddddที่ D MMMM YYYY เวลา LT"},meridiem:function(a){return 12>a?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}})}),function(a){a(db)}(function(a){return a.lang("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM DD, YYYY LT"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinal:function(a){return a},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){var b={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"};return a.lang("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd, D MMMM YYYY LT"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinal:function(a){if(0===a)return a+"'ıncı";var c=a%10,d=a%100-c,e=a>=100?100:null;return a+(b[c]||b[d]||b[e])},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("tzm-la",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}})}),function(a){a(db)}(function(a){return a.lang("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"dddd D MMMM YYYY LT"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}})}),function(a){a(db)}(function(a){function b(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function c(a,c,d){var e={mm:"хвилина_хвилини_хвилин",hh:"година_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===d?c?"хвилина":"хвилину":"h"===d?c?"година":"годину":a+" "+b(e[d],+a)}function d(a,b){var c={nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")},d=/D[oD]? *MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function e(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function f(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}return a.lang("uk",{months:d,monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:e,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., LT",LLLL:"dddd, D MMMM YYYY р., LT"},calendar:{sameDay:f("[Сьогодні "),nextDay:f("[Завтра "),lastDay:f("[Вчора "),nextWeek:f("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return f("[Минулої] dddd [").call(this);case 1:case 2:case 4:return f("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:c,mm:c,h:"годину",hh:c,d:"день",dd:c,M:"місяць",MM:c,y:"рік",yy:c},meridiem:function(a){return 4>a?"ночі":12>a?"ранку":17>a?"дня":"вечора"},ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("uz",{months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY LT",LLLL:"D MMMM YYYY, dddd LT"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}})}),function(a){a(db)}(function(a){return a.lang("vn",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY LT",LLLL:"dddd, D MMMM [năm] YYYY LT",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY LT",llll:"ddd, D MMM YYYY LT"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinal:function(a){return a},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiem:function(a,b){var c=100*a+b;return 600>c?"凌晨":900>c?"早上":1130>c?"上午":1230>c?"中午":1800>c?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var b,c;return b=a().startOf("week"),c=this.unix()-b.unix()>=604800?"[下]":"[本]",0===this.minutes()?c+"dddAh点整":c+"dddAh点mm"},lastWeek:function(){var b,c;return b=a().startOf("week"),c=this.unix()<b.unix()?"[上]":"[本]",0===this.minutes()?c+"dddAh点整":c+"dddAh点mm"},sameElse:"LL"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1分钟",mm:"%d分钟",h:"1小时",hh:"%d小时",d:"1天",dd:"%d天",M:"1个月",MM:"%d个月",y:"1年",yy:"%d年"},week:{dow:1,doy:4}})}),function(a){a(db)}(function(a){return a.lang("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日LT",LLLL:"YYYY年MMMD日ddddLT",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日LT",llll:"YYYY年MMMD日ddddLT"},meridiem:function(a,b){var c=100*a+b;return 900>c?"早上":1130>c?"上午":1230>c?"中午":1800>c?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"一分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}})}),db.lang("en"),rb?(module.exports=db,cb(!0)):"function"==typeof define&&define.amd?define("moment",function(b,c,d){return d.config&&d.config()&&d.config().noGlobal!==!0&&cb(d.config().noGlobal===a),db}):cb()}).call(this);;// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
(function(n){var e,t,r="0.4.2",f="hasOwnProperty",i=/[\.\/]/,o="*",u=function(){},l=function(n,e){return n-e},s={n:{}},p=function(n,r){n+="";var f,i=t,o=Array.prototype.slice.call(arguments,2),u=p.listeners(n),s=0,a=[],c={},h=[],d=e;e=n,t=0;for(var g=0,v=u.length;v>g;g++)"zIndex"in u[g]&&(a.push(u[g].zIndex),0>u[g].zIndex&&(c[u[g].zIndex]=u[g]));for(a.sort(l);0>a[s];)if(f=c[a[s++]],h.push(f.apply(r,o)),t)return t=i,h;for(g=0;v>g;g++)if(f=u[g],"zIndex"in f)if(f.zIndex==a[s]){if(h.push(f.apply(r,o)),t)break;do if(s++,f=c[a[s]],f&&h.push(f.apply(r,o)),t)break;while(f)}else c[f.zIndex]=f;else if(h.push(f.apply(r,o)),t)break;return t=i,e=d,h.length?h:null};p._events=s,p.listeners=function(n){var e,t,r,f,u,l,p,a,c=n.split(i),h=s,d=[h],g=[];for(f=0,u=c.length;u>f;f++){for(a=[],l=0,p=d.length;p>l;l++)for(h=d[l].n,t=[h[c[f]],h[o]],r=2;r--;)e=t[r],e&&(a.push(e),g=g.concat(e.f||[]));d=a}return g},p.on=function(n,e){if(n+="","function"!=typeof e)return function(){};for(var t=n.split(i),r=s,f=0,o=t.length;o>f;f++)r=r.n,r=r.hasOwnProperty(t[f])&&r[t[f]]||(r[t[f]]={n:{}});for(r.f=r.f||[],f=0,o=r.f.length;o>f;f++)if(r.f[f]==e)return u;return r.f.push(e),function(n){+n==+n&&(e.zIndex=+n)}},p.f=function(n){var e=[].slice.call(arguments,1);return function(){p.apply(null,[n,null].concat(e).concat([].slice.call(arguments,0)))}},p.stop=function(){t=1},p.nt=function(n){return n?RegExp("(?:\\.|\\/|^)"+n+"(?:\\.|\\/|$)").test(e):e},p.nts=function(){return e.split(i)},p.off=p.unbind=function(n,e){if(!n)return p._events=s={n:{}},void 0;var t,r,u,l,a,c,h,d=n.split(i),g=[s];for(l=0,a=d.length;a>l;l++)for(c=0;g.length>c;c+=u.length-2){if(u=[c,1],t=g[c].n,d[l]!=o)t[d[l]]&&u.push(t[d[l]]);else for(r in t)t[f](r)&&u.push(t[r]);g.splice.apply(g,u)}for(l=0,a=g.length;a>l;l++)for(t=g[l];t.n;){if(e){if(t.f){for(c=0,h=t.f.length;h>c;c++)if(t.f[c]==e){t.f.splice(c,1);break}!t.f.length&&delete t.f}for(r in t.n)if(t.n[f](r)&&t.n[r].f){var v=t.n[r].f;for(c=0,h=v.length;h>c;c++)if(v[c]==e){v.splice(c,1);break}!v.length&&delete t.n[r].f}}else{delete t.f;for(r in t.n)t.n[f](r)&&t.n[r].f&&delete t.n[r].f}t=t.n}},p.once=function(n,e){var t=function(){return p.unbind(n,t),e.apply(this,arguments)};return p.on(n,t)},p.version=r,p.toString=function(){return"You are running Eve "+r},"undefined"!=typeof module&&module.exports?module.exports=p:"undefined"!=typeof define?define("eve",[],function(){return p}):n.eve=p})(this);(function(t,e){"function"==typeof define&&define.amd?define("raphael",["eve"],e):t.Raphael=e(t.eve)})(this,function(t){function e(n){if(e.is(n,"function"))return y?n():t.on("raphael.DOMload",n);if(e.is(n,W))return e._engine.create[T](e,n.splice(0,3+e.is(n[0],G))).add(n);var r=Array.prototype.slice.call(arguments,0);if(e.is(r[r.length-1],"function")){var i=r.pop();return y?i.call(e._engine.create[T](e,r)):t.on("raphael.DOMload",function(){i.call(e._engine.create[T](e,r))})}return e._engine.create[T](e,arguments)}function n(t){if(Object(t)!==t)return t;var e=new t.constructor;for(var r in t)t[B](r)&&(e[r]=n(t[r]));return e}function r(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return t.push(t.splice(n,1)[0])}function i(t,e,n){function i(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=i.cache=i.cache||{},u=i.count=i.count||[];return o[B](s)?(r(u,s),n?n(o[s]):o[s]):(u.length>=1e3&&delete o[u.shift()],u.push(s),o[s]=t[T](e,a),n?n(o[s]):o[s])}return i}function a(){return this.hex}function s(t,e){for(var n=[],r=0,i=t.length;i-2*!e>r;r+=2){var a=[{x:+t[r-2],y:+t[r-1]},{x:+t[r],y:+t[r+1]},{x:+t[r+2],y:+t[r+3]},{x:+t[r+4],y:+t[r+5]}];e?r?i-4==r?a[3]={x:+t[0],y:+t[1]}:i-2==r&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[i-2],y:+t[i-1]}:i-4==r?a[3]=a[2]:r||(a[0]={x:+t[r],y:+t[r+1]}),n.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return n}function o(t,e,n,r,i){var a=-3*e+9*n-9*r+3*i,s=t*a+6*e-12*n+6*r;return t*s-3*e+3*n}function u(t,e,n,r,i,a,s,u,l){null==l&&(l=1),l=l>1?1:0>l?0:l;for(var h=l/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;c>g;g++){var x=h*f[g]+h,v=o(x,t,n,i,s),m=o(x,e,r,a,u),y=v*v+m*m;d+=p[g]*D.sqrt(y)}return h*d}function l(t,e,n,r,i,a,s,o,l){if(!(0>l||l>u(t,e,n,r,i,a,s,o))){var h,c=1,f=c/2,p=c-f,d=.01;for(h=u(t,e,n,r,i,a,s,o,p);V(h-l)>d;)f/=2,p+=(l>h?1:-1)*f,h=u(t,e,n,r,i,a,s,o,p);return p}}function h(t,e,n,r,i,a,s,o){if(!(z(t,n)<O(i,s)||O(t,n)>z(i,s)||z(e,r)<O(a,o)||O(e,r)>z(a,o))){var u=(t*r-e*n)*(i-s)-(t-n)*(i*o-a*s),l=(t*r-e*n)*(a-o)-(e-r)*(i*o-a*s),h=(t-n)*(a-o)-(e-r)*(i-s);if(h){var c=u/h,f=l/h,p=+c.toFixed(2),d=+f.toFixed(2);if(!(+O(t,n).toFixed(2)>p||p>+z(t,n).toFixed(2)||+O(i,s).toFixed(2)>p||p>+z(i,s).toFixed(2)||+O(e,r).toFixed(2)>d||d>+z(e,r).toFixed(2)||+O(a,o).toFixed(2)>d||d>+z(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,n,r){var i=e.bezierBBox(t),a=e.bezierBBox(n);if(!e.isBBoxIntersect(i,a))return r?0:[];for(var s=u.apply(0,t),o=u.apply(0,n),l=~~(s/5),c=~~(o/5),f=[],p=[],d={},g=r?0:[],x=0;l+1>x;x++){var v=e.findDotsAtSegment.apply(e,t.concat(x/l));f.push({x:v.x,y:v.y,t:x/l})}for(x=0;c+1>x;x++)v=e.findDotsAtSegment.apply(e,n.concat(x/c)),p.push({x:v.x,y:v.y,t:x/c});for(x=0;l>x;x++)for(var m=0;c>m;m++){var y=f[x],b=f[x+1],_=p[m],w=p[m+1],k=.001>V(b.x-y.x)?"y":"x",B=.001>V(w.x-_.x)?"y":"x",S=h(y.x,y.y,b.x,b.y,_.x,_.y,w.x,w.y);if(S){if(d[S.x.toFixed(4)]==S.y.toFixed(4))continue;d[S.x.toFixed(4)]=S.y.toFixed(4);var C=y.t+V((S[k]-y[k])/(b[k]-y[k]))*(b.t-y.t),F=_.t+V((S[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);C>=0&&1>=C&&F>=0&&1>=F&&(r?g++:g.push({x:S.x,y:S.y,t1:C,t2:F}))}}return g}function f(t,n,r){t=e._path2curve(t),n=e._path2curve(n);for(var i,a,s,o,u,l,h,f,p,d,g=r?0:[],x=0,v=t.length;v>x;x++){var m=t[x];if("M"==m[0])i=u=m[1],a=l=m[2];else{"C"==m[0]?(p=[i,a].concat(m.slice(1)),i=p[6],a=p[7]):(p=[i,a,i,a,u,l,u,l],i=u,a=l);for(var y=0,b=n.length;b>y;y++){var _=n[y];if("M"==_[0])s=h=_[1],o=f=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,h,f,h,f],s=h,o=f);var w=c(p,d,r);if(r)g+=w;else{for(var k=0,B=w.length;B>k;k++)w[k].segment1=x,w[k].segment2=y,w[k].bez1=p,w[k].bez2=d;g=g.concat(w)}}}}}return g}function p(t,e,n,r,i,a){null!=t?(this.a=+t,this.b=+e,this.c=+n,this.d=+r,this.e=+i,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function d(){return this.x+E+this.y+E+this.width+" × "+this.height}function g(t,e,n,r,i,a){function s(t){return((c*t+h)*t+l)*t}function o(t,e){var n=u(t,e);return((d*n+p)*n+f)*n}function u(t,e){var n,r,i,a,o,u;for(i=t,u=0;8>u;u++){if(a=s(i)-t,e>V(a))return i;if(o=(3*c*i+2*h)*i+l,1e-6>V(o))break;i-=a/o}if(n=0,r=1,i=t,n>i)return n;if(i>r)return r;for(;r>n;){if(a=s(i),e>V(a-t))return i;t>a?n=i:r=i,i=(r-n)/2+n}return i}var l=3*e,h=3*(r-e)-l,c=1-l-h,f=3*n,p=3*(i-n)-f,d=1-f-p;return o(t,1/(200*a))}function x(t,e){var n=[],r={};if(this.ms=e,this.times=1,t){for(var i in t)t[B](i)&&(r[J(i)]=t[i],n.push(J(i)));n.sort(he)}this.anim=r,this.top=n[n.length-1],this.percents=n}function v(n,r,i,a,s,o){i=J(i);var u,l,h,c,f,d,x=n.ms,v={},m={},y={};if(a)for(w=0,k=on.length;k>w;w++){var b=on[w];if(b.el.id==r.id&&b.anim==n){b.percent!=i?(on.splice(w,1),h=1):l=b,r.attr(b.totalOrigin);break}}else a=+m;for(var w=0,k=n.percents.length;k>w;w++){if(n.percents[w]==i||n.percents[w]>a*n.top){i=n.percents[w],f=n.percents[w-1]||0,x=x/n.top*(i-f),c=n.percents[w+1],u=n.anim[i];break}a&&r.attr(n.anim[n.percents[w]])}if(u){if(l)l.initstatus=a,l.start=new Date-l.ms*a;else{for(var S in u)if(u[B](S)&&(ne[B](S)||r.paper.customAttributes[B](S)))switch(v[S]=r.attr(S),null==v[S]&&(v[S]=ee[S]),m[S]=u[S],ne[S]){case G:y[S]=(m[S]-v[S])/x;break;case"colour":v[S]=e.getRGB(v[S]);var C=e.getRGB(m[S]);y[S]={r:(C.r-v[S].r)/x,g:(C.g-v[S].g)/x,b:(C.b-v[S].b)/x};break;case"path":var F=Re(v[S],m[S]),T=F[1];for(v[S]=F[0],y[S]=[],w=0,k=v[S].length;k>w;w++){y[S][w]=[0];for(var A=1,P=v[S][w].length;P>A;A++)y[S][w][A]=(T[w][A]-v[S][w][A])/x}break;case"transform":var E=r._,R=Oe(E[S],m[S]);if(R)for(v[S]=R.from,m[S]=R.to,y[S]=[],y[S].real=!0,w=0,k=v[S].length;k>w;w++)for(y[S][w]=[v[S][w][0]],A=1,P=v[S][w].length;P>A;A++)y[S][w][A]=(m[S][w][A]-v[S][w][A])/x;else{var q=r.matrix||new p,j={_:{transform:E.transform},getBBox:function(){return r.getBBox(1)}};v[S]=[q.a,q.b,q.c,q.d,q.e,q.f],De(j,m[S]),m[S]=j._.transform,y[S]=[(j.matrix.a-q.a)/x,(j.matrix.b-q.b)/x,(j.matrix.c-q.c)/x,(j.matrix.d-q.d)/x,(j.matrix.e-q.e)/x,(j.matrix.f-q.f)/x]}break;case"csv":var D=M(u[S])[I](_),z=M(v[S])[I](_);if("clip-rect"==S)for(v[S]=z,y[S]=[],w=z.length;w--;)y[S][w]=(D[w]-v[S][w])/x;m[S]=D;break;default:for(D=[][L](u[S]),z=[][L](v[S]),y[S]=[],w=r.paper.customAttributes[S].length;w--;)y[S][w]=((D[w]||0)-(z[w]||0))/x}var O=u.easing,V=e.easing_formulas[O];if(!V)if(V=M(O).match(Z),V&&5==V.length){var X=V;V=function(t){return g(t,+X[1],+X[2],+X[3],+X[4],x)}}else V=fe;if(d=u.start||n.start||+new Date,b={anim:n,percent:i,timestamp:d,start:d+(n.del||0),status:0,initstatus:a||0,stop:!1,ms:x,easing:V,from:v,diff:y,to:m,el:r,callback:u.callback,prev:f,next:c,repeat:o||n.times,origin:r.attr(),totalOrigin:s},on.push(b),a&&!l&&!h&&(b.stop=!0,b.start=new Date-x*a,1==on.length))return ln();h&&(b.start=new Date-b.ms*a),1==on.length&&un(ln)}t("raphael.anim.start."+r.id,r,n)}}function m(t){for(var e=0;on.length>e;e++)on[e].el.paper==t&&on.splice(e--,1)}e.version="2.1.0",e.eve=t;var y,b,_=/[, ]+/,w={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},k=/\{(\d+)\}/g,B="hasOwnProperty",S={doc:document,win:window},C={was:Object.prototype[B].call(S.win,"Raphael"),is:S.win.Raphael},F=function(){this.ca=this.customAttributes={}},T="apply",L="concat",A="createTouch"in S.doc,P="",E=" ",M=String,I="split",R="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[I](E),q={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},j=M.prototype.toLowerCase,D=Math,z=D.max,O=D.min,V=D.abs,X=D.pow,Y=D.PI,G="number",N="string",W="array",$=Object.prototype.toString,H=(e._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),U={NaN:1,Infinity:1,"-Infinity":1},Z=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,Q=D.round,J=parseFloat,K=parseInt,te=M.prototype.toUpperCase,ee=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},ne=e._availableAnimAttrs={blur:G,"clip-rect":"csv",cx:G,cy:G,fill:"colour","fill-opacity":G,"font-size":G,height:G,opacity:G,path:"path",r:G,rx:G,ry:G,stroke:"colour","stroke-opacity":G,"stroke-width":G,transform:"transform",width:G,x:G,y:G},re=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,ie={hs:1,rg:1},ae=/,?([achlmqrstvxz]),?/gi,se=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,oe=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,ue=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,le=(e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,{}),he=function(t,e){return J(t)-J(e)},ce=function(){},fe=function(t){return t},pe=e._rectPath=function(t,e,n,r,i){return i?[["M",t+i,e],["l",n-2*i,0],["a",i,i,0,0,1,i,i],["l",0,r-2*i],["a",i,i,0,0,1,-i,i],["l",2*i-n,0],["a",i,i,0,0,1,-i,-i],["l",0,2*i-r],["a",i,i,0,0,1,i,-i],["z"]]:[["M",t,e],["l",n,0],["l",0,r],["l",-n,0],["z"]]},de=function(t,e,n,r){return null==r&&(r=n),[["M",t,e],["m",0,-r],["a",n,r,0,1,1,0,2*r],["a",n,r,0,1,1,0,-2*r],["z"]]},ge=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return de(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return de(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return pe(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return pe(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return pe(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return pe(e.x,e.y,e.width,e.height)}},xe=e.mapPath=function(t,e){if(!e)return t;var n,r,i,a,s,o,u;for(t=Re(t),i=0,s=t.length;s>i;i++)for(u=t[i],a=1,o=u.length;o>a;a+=2)n=e.x(u[a],u[a+1]),r=e.y(u[a],u[a+1]),u[a]=n,u[a+1]=r;return t};if(e._g=S,e.type=S.win.SVGAngle||S.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var ve,me=S.doc.createElement("div");if(me.innerHTML='<v:shape adj="1"/>',ve=me.firstChild,ve.style.behavior="url(#default#VML)",!ve||"object"!=typeof ve.adj)return e.type=P;me=null}e.svg=!(e.vml="VML"==e.type),e._Paper=F,e.fn=b=F.prototype=e.prototype,e._id=0,e._oid=0,e.is=function(t,e){return e=j.call(e),"finite"==e?!U[B](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||$.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,n,r,i,a,s){if(null==a){var o=t-r,u=n-i;return o||u?(180+180*D.atan2(-u,-o)/Y+360)%360:0}return e.angle(t,n,a,s)-e.angle(r,i,a,s)},e.rad=function(t){return t%360*Y/180},e.deg=function(t){return 180*t/Y%360},e.snapTo=function(t,n,r){if(r=e.is(r,"finite")?r:10,e.is(t,W)){for(var i=t.length;i--;)if(r>=V(t[i]-n))return t[i]}else{t=+t;var a=n%t;if(r>a)return n-a;if(a>t-r)return n-a+t}return n},e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=0|16*D.random(),n="x"==t?e:8|3&e;return n.toString(16)}),e.setWindow=function(n){t("raphael.setWindow",e,S.win,n),S.win=n,S.doc=S.win.document,e._engine.initWin&&e._engine.initWin(S.win)};var ye=function(t){if(e.vml){var n,r=/^\s+|\s+$/g;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),n=a.body}catch(s){n=createPopup().document.body}var o=n.createTextRange();ye=i(function(t){try{n.style.color=M(t).replace(r,P);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(i){return"none"}})}else{var u=S.doc.createElement("i");u.title="Raphaël Colour Picker",u.style.display="none",S.doc.body.appendChild(u),ye=i(function(t){return u.style.color=t,S.doc.defaultView.getComputedStyle(u,P).getPropertyValue("color")})}return ye(t)},be=function(){return"hsb("+[this.h,this.s,this.b]+")"},_e=function(){return"hsl("+[this.h,this.s,this.l]+")"},we=function(){return this.hex},ke=function(t,n,r){if(null==n&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(r=t.b,n=t.g,t=t.r),null==n&&e.is(t,N)){var i=e.getRGB(t);t=i.r,n=i.g,r=i.b}return(t>1||n>1||r>1)&&(t/=255,n/=255,r/=255),[t,n,r]},Be=function(t,n,r,i){t*=255,n*=255,r*=255;var a={r:t,g:n,b:r,hex:e.rgb(t,n,r),toString:we};return e.is(i,"finite")&&(a.opacity=i),a};e.color=function(t){var n;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(n=e.hsb2rgb(t),t.r=n.r,t.g=n.g,t.b=n.b,t.hex=n.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(n=e.hsl2rgb(t),t.r=n.r,t.g=n.g,t.b=n.b,t.hex=n.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(n=e.rgb2hsl(t),t.h=n.h,t.s=n.s,t.l=n.l,n=e.rgb2hsb(t),t.v=n.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=we,t},e.hsb2rgb=function(t,e,n,r){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(n=t.b,e=t.s,t=t.h,r=t.o),t*=360;var i,a,s,o,u;return t=t%360/60,u=n*e,o=u*(1-V(t%2-1)),i=a=s=n-u,t=~~t,i+=[u,o,0,0,o,u][t],a+=[o,u,u,o,0,0][t],s+=[0,0,o,u,u,o][t],Be(i,a,s,r)},e.hsl2rgb=function(t,e,n,r){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(n=t.l,e=t.s,t=t.h),(t>1||e>1||n>1)&&(t/=360,e/=100,n/=100),t*=360;var i,a,s,o,u;return t=t%360/60,u=2*e*(.5>n?n:1-n),o=u*(1-V(t%2-1)),i=a=s=n-u/2,t=~~t,i+=[u,o,0,0,o,u][t],a+=[o,u,u,o,0,0][t],s+=[0,0,o,u,u,o][t],Be(i,a,s,r)},e.rgb2hsb=function(t,e,n){n=ke(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,a,s;return a=z(t,e,n),s=a-O(t,e,n),r=0==s?null:a==t?(e-n)/s:a==e?(n-t)/s+2:(t-e)/s+4,r=60*((r+360)%6)/360,i=0==s?0:s/a,{h:r,s:i,b:a,toString:be}},e.rgb2hsl=function(t,e,n){n=ke(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,a,s,o,u;return s=z(t,e,n),o=O(t,e,n),u=s-o,r=0==u?null:s==t?(e-n)/u:s==e?(n-t)/u+2:(t-e)/u+4,r=60*((r+360)%6)/360,a=(s+o)/2,i=0==u?0:.5>a?u/(2*a):u/(2-2*a),{h:r,s:i,l:a,toString:_e}},e._path2string=function(){return this.join(",").replace(ae,"$1")},e._preload=function(t,e){var n=S.doc.createElement("img");n.style.cssText="position:absolute;left:-9999em;top:-9999em",n.onload=function(){e.call(this),this.onload=null,S.doc.body.removeChild(this)},n.onerror=function(){S.doc.body.removeChild(this)},S.doc.body.appendChild(n),n.src=t},e.getRGB=i(function(t){if(!t||(t=M(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(ie[B](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=ye(t));var n,r,i,s,o,u,l=t.match(H);return l?(l[2]&&(i=K(l[2].substring(5),16),r=K(l[2].substring(3,5),16),n=K(l[2].substring(1,3),16)),l[3]&&(i=K((o=l[3].charAt(3))+o,16),r=K((o=l[3].charAt(2))+o,16),n=K((o=l[3].charAt(1))+o,16)),l[4]&&(u=l[4][I](re),n=J(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=J(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),i=J(u[2]),"%"==u[2].slice(-1)&&(i*=2.55),"rgba"==l[1].toLowerCase().slice(0,4)&&(s=J(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100)),l[5]?(u=l[5][I](re),n=J(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=J(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),i=J(u[2]),"%"==u[2].slice(-1)&&(i*=2.55),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(n/=360),"hsba"==l[1].toLowerCase().slice(0,4)&&(s=J(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100),e.hsb2rgb(n,r,i,s)):l[6]?(u=l[6][I](re),n=J(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=J(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),i=J(u[2]),"%"==u[2].slice(-1)&&(i*=2.55),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(n/=360),"hsla"==l[1].toLowerCase().slice(0,4)&&(s=J(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100),e.hsl2rgb(n,r,i,s)):(l={r:n,g:r,b:i,toString:a},l.hex="#"+(16777216|i|r<<8|n<<16).toString(16).slice(1),e.is(s,"finite")&&(l.opacity=s),l)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=i(function(t,n,r){return e.hsb2rgb(t,n,r).hex}),e.hsl=i(function(t,n,r){return e.hsl2rgb(t,n,r).hex}),e.rgb=i(function(t,e,n){return"#"+(16777216|n|e<<8|t<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},n=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,0>=e.s&&(this.getColor.start={h:0,s:1,b:e.b})),n.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var n=Se(t);if(n.arr)return Fe(n.arr);var r={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},i=[];return e.is(t,W)&&e.is(t[0],W)&&(i=Fe(t)),i.length||M(t).replace(se,function(t,e,n){var a=[],s=e.toLowerCase();if(n.replace(ue,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(i.push([e][L](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)i.push([e][L](a));else for(;a.length>=r[s]&&(i.push([e][L](a.splice(0,r[s]))),r[s]););}),i.toString=e._path2string,n.arr=Fe(i),i},e.parseTransformString=i(function(t){if(!t)return null;var n=[];return e.is(t,W)&&e.is(t[0],W)&&(n=Fe(t)),n.length||M(t).replace(oe,function(t,e,r){var i=[];j.call(e),r.replace(ue,function(t,e){e&&i.push(+e)}),n.push([e][L](i))}),n.toString=e._path2string,n});var Se=function(t){var e=Se.ps=Se.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var n in e)e[B](n)&&n!=t&&(e[n].sleep--,!e[n].sleep&&delete e[n])}),e[t]};e.findDotsAtSegment=function(t,e,n,r,i,a,s,o,u){var l=1-u,h=X(l,3),c=X(l,2),f=u*u,p=f*u,d=h*t+3*c*u*n+3*l*u*u*i+p*s,g=h*e+3*c*u*r+3*l*u*u*a+p*o,x=t+2*u*(n-t)+f*(i-2*n+t),v=e+2*u*(r-e)+f*(a-2*r+e),m=n+2*u*(i-n)+f*(s-2*i+n),y=r+2*u*(a-r)+f*(o-2*a+r),b=l*t+u*n,_=l*e+u*r,w=l*i+u*s,k=l*a+u*o,B=90-180*D.atan2(x-m,v-y)/Y;return(x>m||y>v)&&(B+=180),{x:d,y:g,m:{x:x,y:v},n:{x:m,y:y},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,n,r,i,a,s,o,u){e.is(t,"array")||(t=[t,n,r,i,a,s,o,u]);var l=Ie.apply(null,t);return{x:l.min.x,y:l.min.y,x2:l.max.x,y2:l.max.y,width:l.max.x-l.min.x,height:l.max.y-l.min.y}},e.isPointInsideBBox=function(t,e,n){return e>=t.x&&t.x2>=e&&n>=t.y&&t.y2>=n},e.isBBoxIntersect=function(t,n){var r=e.isPointInsideBBox;return r(n,t.x,t.y)||r(n,t.x2,t.y)||r(n,t.x,t.y2)||r(n,t.x2,t.y2)||r(t,n.x,n.y)||r(t,n.x2,n.y)||r(t,n.x,n.y2)||r(t,n.x2,n.y2)||(t.x<n.x2&&t.x>n.x||n.x<t.x2&&n.x>t.x)&&(t.y<n.y2&&t.y>n.y||n.y<t.y2&&n.y>t.y)},e.pathIntersection=function(t,e){return f(t,e)},e.pathIntersectionNumber=function(t,e){return f(t,e,1)},e.isPointInsidePath=function(t,n,r){var i=e.pathBBox(t);return e.isPointInsideBBox(i,n,r)&&1==f(t,[["M",n,r],["H",i.x2+10]],1)%2},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ce=e.pathBBox=function(t){var e=Se(t);if(e.bbox)return n(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Re(t);for(var r,i=0,a=0,s=[],o=[],u=0,l=t.length;l>u;u++)if(r=t[u],"M"==r[0])i=r[1],a=r[2],s.push(i),o.push(a);else{var h=Ie(i,a,r[1],r[2],r[3],r[4],r[5],r[6]);s=s[L](h.min.x,h.max.x),o=o[L](h.min.y,h.max.y),i=r[5],a=r[6]}var c=O[T](0,s),f=O[T](0,o),p=z[T](0,s),d=z[T](0,o),g=p-c,x=d-f,v={x:c,y:f,x2:p,y2:d,width:g,height:x,cx:c+g/2,cy:f+x/2};return e.bbox=n(v),v},Fe=function(t){var r=n(t);return r.toString=e._path2string,r},Te=e._pathToRelative=function(t){var n=Se(t);if(n.rel)return Fe(n.rel);e.is(t,W)&&e.is(t&&t[0],W)||(t=e.parsePathString(t));var r=[],i=0,a=0,s=0,o=0,u=0;"M"==t[0][0]&&(i=t[0][1],a=t[0][2],s=i,o=a,u++,r.push(["M",i,a]));for(var l=u,h=t.length;h>l;l++){var c=r[l]=[],f=t[l];if(f[0]!=j.call(f[0]))switch(c[0]=j.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-i).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;d>p;p++)c[p]=+(f[p]-(p%2?i:a)).toFixed(3)}else{c=r[l]=[],"m"==f[0]&&(s=f[1]+i,o=f[2]+a);for(var g=0,x=f.length;x>g;g++)r[l][g]=f[g]}var v=r[l].length;switch(r[l][0]){case"z":i=s,a=o;break;case"h":i+=+r[l][v-1];break;case"v":a+=+r[l][v-1];break;default:i+=+r[l][v-2],a+=+r[l][v-1]}}return r.toString=e._path2string,n.rel=Fe(r),r},Le=e._pathToAbsolute=function(t){var n=Se(t);if(n.abs)return Fe(n.abs);if(e.is(t,W)&&e.is(t&&t[0],W)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var r=[],i=0,a=0,o=0,u=0,l=0;"M"==t[0][0]&&(i=+t[0][1],a=+t[0][2],o=i,u=a,l++,r[0]=["M",i,a]);for(var h,c,f=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),p=l,d=t.length;d>p;p++){if(r.push(h=[]),c=t[p],c[0]!=te.call(c[0]))switch(h[0]=te.call(c[0]),h[0]){case"A":h[1]=c[1],h[2]=c[2],h[3]=c[3],h[4]=c[4],h[5]=c[5],h[6]=+(c[6]+i),h[7]=+(c[7]+a);break;case"V":h[1]=+c[1]+a;break;case"H":h[1]=+c[1]+i;break;case"R":for(var g=[i,a][L](c.slice(1)),x=2,v=g.length;v>x;x++)g[x]=+g[x]+i,g[++x]=+g[x]+a;r.pop(),r=r[L](s(g,f));break;case"M":o=+c[1]+i,u=+c[2]+a;default:for(x=1,v=c.length;v>x;x++)h[x]=+c[x]+(x%2?i:a)}else if("R"==c[0])g=[i,a][L](c.slice(1)),r.pop(),r=r[L](s(g,f)),h=["R"][L](c.slice(-2));else for(var m=0,y=c.length;y>m;m++)h[m]=c[m];switch(h[0]){case"Z":i=o,a=u;break;case"H":i=h[1];break;case"V":a=h[1];break;case"M":o=h[h.length-2],u=h[h.length-1];default:i=h[h.length-2],a=h[h.length-1]}}return r.toString=e._path2string,n.abs=Fe(r),r},Ae=function(t,e,n,r){return[t,e,n,r,n,r]},Pe=function(t,e,n,r,i,a){var s=1/3,o=2/3;return[s*t+o*n,s*e+o*r,s*i+o*n,s*a+o*r,i,a]},Ee=function(t,e,n,r,a,s,o,u,l,h){var c,f=120*Y/180,p=Y/180*(+a||0),d=[],g=i(function(t,e,n){var r=t*D.cos(n)-e*D.sin(n),i=t*D.sin(n)+e*D.cos(n);return{x:r,y:i}});if(h)B=h[0],S=h[1],w=h[2],k=h[3];else{c=g(t,e,-p),t=c.x,e=c.y,c=g(u,l,-p),u=c.x,l=c.y;var x=(D.cos(Y/180*a),D.sin(Y/180*a),(t-u)/2),v=(e-l)/2,m=x*x/(n*n)+v*v/(r*r);m>1&&(m=D.sqrt(m),n=m*n,r=m*r);var y=n*n,b=r*r,_=(s==o?-1:1)*D.sqrt(V((y*b-y*v*v-b*x*x)/(y*v*v+b*x*x))),w=_*n*v/r+(t+u)/2,k=_*-r*x/n+(e+l)/2,B=D.asin(((e-k)/r).toFixed(9)),S=D.asin(((l-k)/r).toFixed(9));B=w>t?Y-B:B,S=w>u?Y-S:S,0>B&&(B=2*Y+B),0>S&&(S=2*Y+S),o&&B>S&&(B-=2*Y),!o&&S>B&&(S-=2*Y)}var C=S-B;if(V(C)>f){var F=S,T=u,A=l;S=B+f*(o&&S>B?1:-1),u=w+n*D.cos(S),l=k+r*D.sin(S),d=Ee(u,l,n,r,a,0,o,T,A,[S,F,w,k])}C=S-B;var P=D.cos(B),E=D.sin(B),M=D.cos(S),R=D.sin(S),q=D.tan(C/4),j=4/3*n*q,z=4/3*r*q,O=[t,e],X=[t+j*E,e-z*P],G=[u+j*R,l-z*M],N=[u,l];if(X[0]=2*O[0]-X[0],X[1]=2*O[1]-X[1],h)return[X,G,N][L](d);d=[X,G,N][L](d).join()[I](",");for(var W=[],$=0,H=d.length;H>$;$++)W[$]=$%2?g(d[$-1],d[$],p).y:g(d[$],d[$+1],p).x;return W},Me=function(t,e,n,r,i,a,s,o,u){var l=1-u;return{x:X(l,3)*t+3*X(l,2)*u*n+3*l*u*u*i+X(u,3)*s,y:X(l,3)*e+3*X(l,2)*u*r+3*l*u*u*a+X(u,3)*o}},Ie=i(function(t,e,n,r,i,a,s,o){var u,l=i-2*n+t-(s-2*i+n),h=2*(n-t)-2*(i-n),c=t-n,f=(-h+D.sqrt(h*h-4*l*c))/2/l,p=(-h-D.sqrt(h*h-4*l*c))/2/l,d=[e,o],g=[t,s];return V(f)>"1e12"&&(f=.5),V(p)>"1e12"&&(p=.5),f>0&&1>f&&(u=Me(t,e,n,r,i,a,s,o,f),g.push(u.x),d.push(u.y)),p>0&&1>p&&(u=Me(t,e,n,r,i,a,s,o,p),g.push(u.x),d.push(u.y)),l=a-2*r+e-(o-2*a+r),h=2*(r-e)-2*(a-r),c=e-r,f=(-h+D.sqrt(h*h-4*l*c))/2/l,p=(-h-D.sqrt(h*h-4*l*c))/2/l,V(f)>"1e12"&&(f=.5),V(p)>"1e12"&&(p=.5),f>0&&1>f&&(u=Me(t,e,n,r,i,a,s,o,f),g.push(u.x),d.push(u.y)),p>0&&1>p&&(u=Me(t,e,n,r,i,a,s,o,p),g.push(u.x),d.push(u.y)),{min:{x:O[T](0,g),y:O[T](0,d)},max:{x:z[T](0,g),y:z[T](0,d)}}}),Re=e._path2curve=i(function(t,e){var n=!e&&Se(t);if(!e&&n.curve)return Fe(n.curve);for(var r=Le(t),i=e&&Le(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e){var n,r;if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in{T:1,Q:1})&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][L](Ee[T](0,[e.x,e.y][L](t.slice(1))));break;case"S":n=e.x+(e.x-(e.bx||e.x)),r=e.y+(e.y-(e.by||e.y)),t=["C",n,r][L](t.slice(1));break;case"T":e.qx=e.x+(e.x-(e.qx||e.x)),e.qy=e.y+(e.y-(e.qy||e.y)),t=["C"][L](Pe(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][L](Pe(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][L](Ae(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][L](Ae(e.x,e.y,t[1],e.y));break;case"V":t=["C"][L](Ae(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][L](Ae(e.x,e.y,e.X,e.Y))}return t}),u=function(t,e){if(t[e].length>7){t[e].shift();for(var n=t[e];n.length;)t.splice(e++,0,["C"][L](n.splice(0,6)));t.splice(e,1),c=z(r.length,i&&i.length||0)}},l=function(t,e,n,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),n.bx=0,n.by=0,n.x=t[s][1],n.y=t[s][2],c=z(r.length,i&&i.length||0))},h=0,c=z(r.length,i&&i.length||0);c>h;h++){r[h]=o(r[h],a),u(r,h),i&&(i[h]=o(i[h],s)),i&&u(i,h),l(r,i,a,s,h),l(i,r,s,a,h);var f=r[h],p=i&&i[h],d=f.length,g=i&&p.length;a.x=f[d-2],a.y=f[d-1],a.bx=J(f[d-4])||a.x,a.by=J(f[d-3])||a.y,s.bx=i&&(J(p[g-4])||s.x),s.by=i&&(J(p[g-3])||s.y),s.x=i&&p[g-2],s.y=i&&p[g-1]}return i||(n.curve=Fe(r)),i?[r,i]:r},null,Fe),qe=(e._parseDots=i(function(t){for(var n=[],r=0,i=t.length;i>r;r++){var a={},s=t[r].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),n.push(a)}for(r=1,i=n.length-1;i>r;r++)if(!n[r].offset){for(var o=J(n[r-1].offset||0),u=0,l=r+1;i>l;l++)if(n[l].offset){u=n[l].offset;break}u||(u=100,l=i),u=J(u);for(var h=(u-o)/(l-r+1);l>r;r++)o+=h,n[r].offset=o+"%"}return n}),e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)}),je=(e._tofront=function(t,e){e.top!==t&&(qe(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},e._toback=function(t,e){e.bottom!==t&&(qe(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},e._insertafter=function(t,e,n){qe(t,n),e==n.top&&(n.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},e._insertbefore=function(t,e,n){qe(t,n),e==n.bottom&&(n.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},e.toMatrix=function(t,e){var n=Ce(t),r={_:{transform:P},getBBox:function(){return n}};return De(r,e),r.matrix}),De=(e.transformPath=function(t,e){return xe(t,je(t,e))},e._extractTransform=function(t,n){if(null==n)return t._.transform;n=M(n).replace(/\.{3}|\u2026/g,t._.transform||P);var r=e.parseTransformString(n),i=0,a=0,s=0,o=1,u=1,l=t._,h=new p;if(l.transform=r||[],r)for(var c=0,f=r.length;f>c;c++){var d,g,x,v,m,y=r[c],b=y.length,_=M(y[0]).toLowerCase(),w=y[0]!=_,k=w?h.invert():0;"t"==_&&3==b?w?(d=k.x(0,0),g=k.y(0,0),x=k.x(y[1],y[2]),v=k.y(y[1],y[2]),h.translate(x-d,v-g)):h.translate(y[1],y[2]):"r"==_?2==b?(m=m||t.getBBox(1),h.rotate(y[1],m.x+m.width/2,m.y+m.height/2),i+=y[1]):4==b&&(w?(x=k.x(y[2],y[3]),v=k.y(y[2],y[3]),h.rotate(y[1],x,v)):h.rotate(y[1],y[2],y[3]),i+=y[1]):"s"==_?2==b||3==b?(m=m||t.getBBox(1),h.scale(y[1],y[b-1],m.x+m.width/2,m.y+m.height/2),o*=y[1],u*=y[b-1]):5==b&&(w?(x=k.x(y[3],y[4]),v=k.y(y[3],y[4]),h.scale(y[1],y[2],x,v)):h.scale(y[1],y[2],y[3],y[4]),o*=y[1],u*=y[2]):"m"==_&&7==b&&h.add(y[1],y[2],y[3],y[4],y[5],y[6]),l.dirtyT=1,t.matrix=h}t.matrix=h,l.sx=o,l.sy=u,l.deg=i,l.dx=a=h.e,l.dy=s=h.f,1==o&&1==u&&!i&&l.bbox?(l.bbox.x+=+a,l.bbox.y+=+s):l.dirtyT=1}),ze=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},Oe=e._equaliseTransform=function(t,n){n=M(n).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],n=e.parseTransformString(n)||[];for(var r,i,a,s,o=z(t.length,n.length),u=[],l=[],h=0;o>h;h++){if(a=t[h]||ze(n[h]),s=n[h]||ze(a),a[0]!=s[0]||"r"==a[0].toLowerCase()&&(a[2]!=s[2]||a[3]!=s[3])||"s"==a[0].toLowerCase()&&(a[3]!=s[3]||a[4]!=s[4]))return;for(u[h]=[],l[h]=[],r=0,i=z(a.length,s.length);i>r;r++)r in a&&(u[h][r]=a[r]),r in s&&(l[h][r]=s[r])}return{from:u,to:l}};e._getContainer=function(t,n,r,i){var a;return a=null!=i||e.is(t,"object")?t:S.doc.getElementById(t),null!=a?a.tagName?null==n?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:n,height:r}:{container:1,x:t,y:n,width:r,height:i}:void 0},e.pathToRelative=Te,e._engine={},e.path2curve=Re,e.matrix=function(t,e,n,r,i,a){return new p(t,e,n,r,i,a)},function(t){function n(t){return t[0]*t[0]+t[1]*t[1]}function r(t){var e=D.sqrt(n(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,n,r,i,a){var s,o,u,l,h=[[],[],[]],c=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],f=[[t,n,i],[e,r,a],[0,0,1]];for(t&&t instanceof p&&(f=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),s=0;3>s;s++)for(o=0;3>o;o++){for(l=0,u=0;3>u;u++)l+=c[s][u]*f[u][o];h[s][o]=l}this.a=h[0][0],this.b=h[1][0],this.c=h[0][1],this.d=h[1][1],this.e=h[0][2],this.f=h[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new p(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new p(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){this.add(1,0,0,1,t,e)},t.scale=function(t,e,n,r){null==e&&(e=t),(n||r)&&this.add(1,0,0,1,n,r),this.add(t,0,0,e,0,0),(n||r)&&this.add(1,0,0,1,-n,-r)},t.rotate=function(t,n,r){t=e.rad(t),n=n||0,r=r||0;var i=+D.cos(t).toFixed(9),a=+D.sin(t).toFixed(9);this.add(i,a,-a,i,n,r),this.add(1,0,0,1,-n,-r)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[M.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var i=[[this.a,this.c],[this.b,this.d]];t.scalex=D.sqrt(n(i[0])),r(i[0]),t.shear=i[0][0]*i[1][0]+i[0][1]*i[1][1],i[1]=[i[1][0]-i[0][0]*t.shear,i[1][1]-i[0][1]*t.shear],t.scaley=D.sqrt(n(i[1])),r(i[1]),t.shear/=t.scaley;var a=-i[0][1],s=i[1][1];return 0>s?(t.rotate=e.deg(D.acos(s)),0>a&&(t.rotate=360-t.rotate)):t.rotate=e.deg(D.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t
},t.toTransformString=function(t){var e=t||this[I]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:P)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:P)+(e.rotate?"r"+[e.rotate,0,0]:P)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(p.prototype);var Ve=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);b.safari="Apple Computer, Inc."==navigator.vendor&&(Ve&&4>Ve[1]||"iP"==navigator.platform.slice(0,2))||"Google Inc."==navigator.vendor&&Ve&&8>Ve[1]?function(){var t=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){t.remove()})}:ce;for(var Xe=function(){this.returnValue=!1},Ye=function(){return this.originalEvent.preventDefault()},Ge=function(){this.cancelBubble=!0},Ne=function(){return this.originalEvent.stopPropagation()},We=function(){return S.doc.addEventListener?function(t,e,n,r){var i=A&&q[e]?q[e]:e,a=function(i){var a=S.doc.documentElement.scrollTop||S.doc.body.scrollTop,s=S.doc.documentElement.scrollLeft||S.doc.body.scrollLeft,o=i.clientX+s,u=i.clientY+a;if(A&&q[B](e))for(var l=0,h=i.targetTouches&&i.targetTouches.length;h>l;l++)if(i.targetTouches[l].target==t){var c=i;i=i.targetTouches[l],i.originalEvent=c,i.preventDefault=Ye,i.stopPropagation=Ne;break}return n.call(r,i,o,u)};return t.addEventListener(i,a,!1),function(){return t.removeEventListener(i,a,!1),!0}}:S.doc.attachEvent?function(t,e,n,r){var i=function(t){t=t||S.win.event;var e=S.doc.documentElement.scrollTop||S.doc.body.scrollTop,i=S.doc.documentElement.scrollLeft||S.doc.body.scrollLeft,a=t.clientX+i,s=t.clientY+e;return t.preventDefault=t.preventDefault||Xe,t.stopPropagation=t.stopPropagation||Ge,n.call(r,t,a,s)};t.attachEvent("on"+e,i);var a=function(){return t.detachEvent("on"+e,i),!0};return a}:void 0}(),$e=[],He=function(e){for(var n,r=e.clientX,i=e.clientY,a=S.doc.documentElement.scrollTop||S.doc.body.scrollTop,s=S.doc.documentElement.scrollLeft||S.doc.body.scrollLeft,o=$e.length;o--;){if(n=$e[o],A){for(var u,l=e.touches.length;l--;)if(u=e.touches[l],u.identifier==n.el._drag.id){r=u.clientX,i=u.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var h,c=n.el.node,f=c.nextSibling,p=c.parentNode,d=c.style.display;S.win.opera&&p.removeChild(c),c.style.display="none",h=n.el.paper.getElementByPoint(r,i),c.style.display=d,S.win.opera&&(f?p.insertBefore(c,f):p.appendChild(c)),h&&t("raphael.drag.over."+n.el.id,n.el,h),r+=s,i+=a,t("raphael.drag.move."+n.el.id,n.move_scope||n.el,r-n.el._drag.x,i-n.el._drag.y,r,i,e)}},Ue=function(n){e.unmousemove(He).unmouseup(Ue);for(var r,i=$e.length;i--;)r=$e[i],r.el._drag={},t("raphael.drag.end."+r.el.id,r.end_scope||r.start_scope||r.move_scope||r.el,n);$e=[]},Ze=e.el={},Qe=R.length;Qe--;)(function(t){e[t]=Ze[t]=function(n,r){return e.is(n,"function")&&(this.events=this.events||[],this.events.push({name:t,f:n,unbind:We(this.shape||this.node||S.doc,t,n,r||this)})),this},e["un"+t]=Ze["un"+t]=function(e){for(var n=this.events||[],r=n.length;r--;)if(n[r].name==t&&n[r].f==e)return n[r].unbind(),n.splice(r,1),!n.length&&delete this.events,this;return this}})(R[Qe]);Ze.data=function(n,r){var i=le[this.id]=le[this.id]||{};if(1==arguments.length){if(e.is(n,"object")){for(var a in n)n[B](a)&&this.data(a,n[a]);return this}return t("raphael.data.get."+this.id,this,i[n],n),i[n]}return i[n]=r,t("raphael.data.set."+this.id,this,r,n),this},Ze.removeData=function(t){return null==t?le[this.id]={}:le[this.id]&&delete le[this.id][t],this},Ze.getData=function(){return n(le[this.id]||{})},Ze.hover=function(t,e,n,r){return this.mouseover(t,n).mouseout(e,r||n)},Ze.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var Je=[];Ze.drag=function(n,r,i,a,s,o){function u(u){(u.originalEvent||u).preventDefault();var l=S.doc.documentElement.scrollTop||S.doc.body.scrollTop,h=S.doc.documentElement.scrollLeft||S.doc.body.scrollLeft;this._drag.x=u.clientX+h,this._drag.y=u.clientY+l,this._drag.id=u.identifier,!$e.length&&e.mousemove(He).mouseup(Ue),$e.push({el:this,move_scope:a,start_scope:s,end_scope:o}),r&&t.on("raphael.drag.start."+this.id,r),n&&t.on("raphael.drag.move."+this.id,n),i&&t.on("raphael.drag.end."+this.id,i),t("raphael.drag.start."+this.id,s||a||this,u.clientX+h,u.clientY+l,u)}return this._drag={},Je.push({el:this,start:u}),this.mousedown(u),this},Ze.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},Ze.undrag=function(){for(var n=Je.length;n--;)Je[n].el==this&&(this.unmousedown(Je[n].start),Je.splice(n,1),t.unbind("raphael.drag.*."+this.id));!Je.length&&e.unmousemove(He).unmouseup(Ue),$e=[]},b.circle=function(t,n,r){var i=e._engine.circle(this,t||0,n||0,r||0);return this.__set__&&this.__set__.push(i),i},b.rect=function(t,n,r,i,a){var s=e._engine.rect(this,t||0,n||0,r||0,i||0,a||0);return this.__set__&&this.__set__.push(s),s},b.ellipse=function(t,n,r,i){var a=e._engine.ellipse(this,t||0,n||0,r||0,i||0);return this.__set__&&this.__set__.push(a),a},b.path=function(t){t&&!e.is(t,N)&&!e.is(t[0],W)&&(t+=P);var n=e._engine.path(e.format[T](e,arguments),this);return this.__set__&&this.__set__.push(n),n},b.image=function(t,n,r,i,a){var s=e._engine.image(this,t||"about:blank",n||0,r||0,i||0,a||0);return this.__set__&&this.__set__.push(s),s},b.text=function(t,n,r){var i=e._engine.text(this,t||0,n||0,M(r));return this.__set__&&this.__set__.push(i),i},b.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var n=new cn(t);return this.__set__&&this.__set__.push(n),n.paper=this,n.type="set",n},b.setStart=function(t){this.__set__=t||this.set()},b.setFinish=function(){var t=this.__set__;return delete this.__set__,t},b.setSize=function(t,n){return e._engine.setSize.call(this,t,n)},b.setViewBox=function(t,n,r,i,a){return e._engine.setViewBox.call(this,t,n,r,i,a)},b.top=b.bottom=null,b.raphael=e;var Ke=function(t){var e=t.getBoundingClientRect(),n=t.ownerDocument,r=n.body,i=n.documentElement,a=i.clientTop||r.clientTop||0,s=i.clientLeft||r.clientLeft||0,o=e.top+(S.win.pageYOffset||i.scrollTop||r.scrollTop)-a,u=e.left+(S.win.pageXOffset||i.scrollLeft||r.scrollLeft)-s;return{y:o,x:u}};b.getElementByPoint=function(t,e){var n=this,r=n.canvas,i=S.doc.elementFromPoint(t,e);if(S.win.opera&&"svg"==i.tagName){var a=Ke(r),s=r.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=r.getIntersectionList(s,null);o.length&&(i=o[o.length-1])}if(!i)return null;for(;i.parentNode&&i!=r.parentNode&&!i.raphael;)i=i.parentNode;return i==n.canvas.parentNode&&(i=r),i=i&&i.raphael?n.getById(i.raphaelid):null},b.getElementsByBBox=function(t){var n=this.set();return this.forEach(function(r){e.isBBoxIntersect(r.getBBox(),t)&&n.push(r)}),n},b.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},b.forEach=function(t,e){for(var n=this.bottom;n;){if(t.call(e,n)===!1)return this;n=n.next}return this},b.getElementsByPoint=function(t,e){var n=this.set();return this.forEach(function(r){r.isPointInside(t,e)&&n.push(r)}),n},Ze.isPointInside=function(t,n){var r=this.realPath=this.realPath||ge[this.type](this);return e.isPointInsidePath(r,t,n)},Ze.getBBox=function(t){if(this.removed)return{};var e=this._;return t?((e.dirty||!e.bboxwt)&&(this.realPath=ge[this.type](this),e.bboxwt=Ce(this.realPath),e.bboxwt.toString=d,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&((e.dirty||!this.realPath)&&(e.bboxwt=0,this.realPath=ge[this.type](this)),e.bbox=Ce(xe(this.realPath,this.matrix)),e.bbox.toString=d,e.dirty=e.dirtyT=0),e.bbox)},Ze.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},Ze.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:t.opacity||.5,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},n=e.width/2,r=this.paper,i=r.set(),a=this.realPath||ge[this.type](this);a=this.matrix?xe(a,this.matrix):a;for(var s=1;n+1>s;s++)i.push(r.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/n*s).toFixed(3),opacity:+(e.opacity/n).toFixed(3)}));return i.insertBefore(this).translate(e.offsetx,e.offsety)};var tn=function(t,n,r,i,a,s,o,h,c){return null==c?u(t,n,r,i,a,s,o,h):e.findDotsAtSegment(t,n,r,i,a,s,o,h,l(t,n,r,i,a,s,o,h,c))},en=function(t,n){return function(r,i,a){r=Re(r);for(var s,o,u,l,h,c="",f={},p=0,d=0,g=r.length;g>d;d++){if(u=r[d],"M"==u[0])s=+u[1],o=+u[2];else{if(l=tn(s,o,u[1],u[2],u[3],u[4],u[5],u[6]),p+l>i){if(n&&!f.start){if(h=tn(s,o,u[1],u[2],u[3],u[4],u[5],u[6],i-p),c+=["C"+h.start.x,h.start.y,h.m.x,h.m.y,h.x,h.y],a)return c;f.start=c,c=["M"+h.x,h.y+"C"+h.n.x,h.n.y,h.end.x,h.end.y,u[5],u[6]].join(),p+=l,s=+u[5],o=+u[6];continue}if(!t&&!n)return h=tn(s,o,u[1],u[2],u[3],u[4],u[5],u[6],i-p),{x:h.x,y:h.y,alpha:h.alpha}}p+=l,s=+u[5],o=+u[6]}c+=u.shift()+u}return f.end=c,h=t?p:n?f:e.findDotsAtSegment(s,o,u[0],u[1],u[2],u[3],u[4],u[5],1),h.alpha&&(h={x:h.x,y:h.y,alpha:h.alpha}),h}},nn=en(1),rn=en(),an=en(0,1);e.getTotalLength=nn,e.getPointAtLength=rn,e.getSubpath=function(t,e,n){if(1e-6>this.getTotalLength(t)-n)return an(t,e).end;var r=an(t,n,1);return e?an(r,e).end:r},Ze.getTotalLength=function(){return"path"==this.type?this.node.getTotalLength?this.node.getTotalLength():nn(this.attrs.path):void 0},Ze.getPointAtLength=function(t){return"path"==this.type?rn(this.attrs.path,t):void 0},Ze.getSubpath=function(t,n){return"path"==this.type?e.getSubpath(this.attrs.path,t,n):void 0};var sn=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,n=D.sqrt(.1734+e*e),r=n-e,i=X(V(r),1/3)*(0>r?-1:1),a=-n-e,s=X(V(a),1/3)*(0>a?-1:1),o=i+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*D.sin((t-.075)*2*Y/.3)+1},bounce:function(t){var e,n=7.5625,r=2.75;return 1/r>t?e=n*t*t:2/r>t?(t-=1.5/r,e=n*t*t+.75):2.5/r>t?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e}};sn.easeIn=sn["ease-in"]=sn["<"],sn.easeOut=sn["ease-out"]=sn[">"],sn.easeInOut=sn["ease-in-out"]=sn["<>"],sn["back-in"]=sn.backIn,sn["back-out"]=sn.backOut;var on=[],un=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},ln=function(){for(var n=+new Date,r=0;on.length>r;r++){var i=on[r];if(!i.el.removed&&!i.paused){var a,s,o=n-i.start,u=i.ms,l=i.easing,h=i.from,c=i.diff,f=i.to,p=(i.t,i.el),d={},g={};if(i.initstatus?(o=(i.initstatus*i.anim.top-i.prev)/(i.percent-i.prev)*u,i.status=i.initstatus,delete i.initstatus,i.stop&&on.splice(r--,1)):i.status=(i.prev+(i.percent-i.prev)*(o/u))/i.anim.top,!(0>o))if(u>o){var x=l(o/u);for(var m in h)if(h[B](m)){switch(ne[m]){case G:a=+h[m]+x*u*c[m];break;case"colour":a="rgb("+[hn(Q(h[m].r+x*u*c[m].r)),hn(Q(h[m].g+x*u*c[m].g)),hn(Q(h[m].b+x*u*c[m].b))].join(",")+")";break;case"path":a=[];for(var y=0,b=h[m].length;b>y;y++){a[y]=[h[m][y][0]];for(var _=1,w=h[m][y].length;w>_;_++)a[y][_]=+h[m][y][_]+x*u*c[m][y][_];a[y]=a[y].join(E)}a=a.join(E);break;case"transform":if(c[m].real)for(a=[],y=0,b=h[m].length;b>y;y++)for(a[y]=[h[m][y][0]],_=1,w=h[m][y].length;w>_;_++)a[y][_]=h[m][y][_]+x*u*c[m][y][_];else{var k=function(t){return+h[m][t]+x*u*c[m][t]};a=[["m",k(0),k(1),k(2),k(3),k(4),k(5)]]}break;case"csv":if("clip-rect"==m)for(a=[],y=4;y--;)a[y]=+h[m][y]+x*u*c[m][y];break;default:var S=[][L](h[m]);for(a=[],y=p.paper.customAttributes[m].length;y--;)a[y]=+S[y]+x*u*c[m][y]}d[m]=a}p.attr(d),function(e,n,r){setTimeout(function(){t("raphael.anim.frame."+e,n,r)})}(p.id,p,i.anim)}else{if(function(n,r,i){setTimeout(function(){t("raphael.anim.frame."+r.id,r,i),t("raphael.anim.finish."+r.id,r,i),e.is(n,"function")&&n.call(r)})}(i.callback,p,i.anim),p.attr(f),on.splice(r--,1),i.repeat>1&&!i.next){for(s in f)f[B](s)&&(g[s]=i.totalOrigin[s]);i.el.attr(g),v(i.anim,i.el,i.anim.percents[0],null,i.totalOrigin,i.repeat-1)}i.next&&!i.stop&&v(i.anim,i.el,i.next,null,i.totalOrigin,i.repeat)}}}e.svg&&p&&p.paper&&p.paper.safari(),on.length&&un(ln)},hn=function(t){return t>255?255:0>t?0:t};Ze.animateWith=function(t,n,r,i,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var u=r instanceof x?r:e.animation(r,i,a,s);v(u,o,u.percents[0],null,o.attr());for(var l=0,h=on.length;h>l;l++)if(on[l].anim==n&&on[l].el==t){on[h-1].start=on[l].start;break}return o},Ze.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},x.prototype.delay=function(t){var e=new x(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},x.prototype.repeat=function(t){var e=new x(this.anim,this.ms);return e.del=this.del,e.times=D.floor(z(t,0))||1,e},e.animation=function(t,n,r,i){if(t instanceof x)return t;(e.is(r,"function")||!r)&&(i=i||r||null,r=null),t=Object(t),n=+n||0;var a,s,o={};for(s in t)t[B](s)&&J(s)!=s&&J(s)+"%"!=s&&(a=!0,o[s]=t[s]);return a?(r&&(o.easing=r),i&&(o.callback=i),new x({100:o},n)):new x(t,n)},Ze.animate=function(t,n,r,i){var a=this;if(a.removed)return i&&i.call(a),a;var s=t instanceof x?t:e.animation(t,n,r,i);return v(s,a,s.percents[0],null,a.attr()),a},Ze.setTime=function(t,e){return t&&null!=e&&this.status(t,O(e,t.ms)/t.ms),this},Ze.status=function(t,e){var n,r,i=[],a=0;if(null!=e)return v(t,this,-1,O(e,1)),this;for(n=on.length;n>a;a++)if(r=on[a],r.el.id==this.id&&(!t||r.anim==t)){if(t)return r.status;i.push({anim:r.anim,status:r.status})}return t?0:i},Ze.pause=function(e){for(var n=0;on.length>n;n++)on[n].el.id!=this.id||e&&on[n].anim!=e||t("raphael.anim.pause."+this.id,this,on[n].anim)!==!1&&(on[n].paused=!0);return this},Ze.resume=function(e){for(var n=0;on.length>n;n++)if(on[n].el.id==this.id&&(!e||on[n].anim==e)){var r=on[n];t("raphael.anim.resume."+this.id,this,r.anim)!==!1&&(delete r.paused,this.status(r.anim,r.status))}return this},Ze.stop=function(e){for(var n=0;on.length>n;n++)on[n].el.id!=this.id||e&&on[n].anim!=e||t("raphael.anim.stop."+this.id,this,on[n].anim)!==!1&&on.splice(n--,1);return this},t.on("raphael.remove",m),t.on("raphael.clear",m),Ze.toString=function(){return"Raphaël’s object"};var cn=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,n=t.length;n>e;e++)!t[e]||t[e].constructor!=Ze.constructor&&t[e].constructor!=cn||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},fn=cn.prototype;fn.push=function(){for(var t,e,n=0,r=arguments.length;r>n;n++)t=arguments[n],!t||t.constructor!=Ze.constructor&&t.constructor!=cn||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},fn.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},fn.forEach=function(t,e){for(var n=0,r=this.items.length;r>n;n++)if(t.call(e,this.items[n],n)===!1)return this;return this};for(var pn in Ze)Ze[B](pn)&&(fn[pn]=function(t){return function(){var e=arguments;return this.forEach(function(n){n[t][T](n,e)})}}(pn));return fn.attr=function(t,n){if(t&&e.is(t,W)&&e.is(t[0],"object"))for(var r=0,i=t.length;i>r;r++)this.items[r].attr(t[r]);else for(var a=0,s=this.items.length;s>a;a++)this.items[a].attr(t,n);return this},fn.clear=function(){for(;this.length;)this.pop()},fn.splice=function(t,e){t=0>t?z(this.length+t,0):t,e=z(0,O(this.length-t,e));var n,r=[],i=[],a=[];for(n=2;arguments.length>n;n++)a.push(arguments[n]);for(n=0;e>n;n++)i.push(this[t+n]);for(;this.length-t>n;n++)r.push(this[t+n]);var s=a.length;for(n=0;s+r.length>n;n++)this.items[t+n]=this[t+n]=s>n?a[n]:r[n-s];for(n=this.items.length=this.length-=e-s;this[n];)delete this[n++];return new cn(i)},fn.exclude=function(t){for(var e=0,n=this.length;n>e;e++)if(this[e]==t)return this.splice(e,1),!0},fn.animate=function(t,n,r,i){(e.is(r,"function")||!r)&&(i=r||null);var a,s,o=this.items.length,u=o,l=this;if(!o)return this;i&&(s=function(){!--o&&i.call(l)}),r=e.is(r,N)?r:s;var h=e.animation(t,n,r,s);for(a=this.items[--u].animate(h);u--;)this.items[u]&&!this.items[u].removed&&this.items[u].animateWith(a,h,h);return this},fn.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},fn.getBBox=function(){for(var t=[],e=[],n=[],r=[],i=this.items.length;i--;)if(!this.items[i].removed){var a=this.items[i].getBBox();t.push(a.x),e.push(a.y),n.push(a.x+a.width),r.push(a.y+a.height)}return t=O[T](0,t),e=O[T](0,e),n=z[T](0,n),r=z[T](0,r),{x:t,y:e,x2:n,y2:r,width:n-t,height:r-e}},fn.clone=function(t){t=this.paper.set();for(var e=0,n=this.items.length;n>e;e++)t.push(this.items[e].clone());return t},fn.toString=function(){return"Raphaël‘s set"},fn.glow=function(t){var e=this.paper.set();return this.forEach(function(n){var r=n.glow(t);null!=r&&r.forEach(function(t){e.push(t)})}),e},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},n=t.face["font-family"];for(var r in t.face)t.face[B](r)&&(e.face[r]=t.face[r]);if(this.fonts[n]?this.fonts[n].push(e):this.fonts[n]=[e],!t.svg){e.face["units-per-em"]=K(t.face["units-per-em"],10);for(var i in t.glyphs)if(t.glyphs[B](i)){var a=t.glyphs[i];if(e.glyphs[i]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[B](s)&&(e.glyphs[i].k[s]=a.k[s])}}return t},b.getFont=function(t,n,r,i){if(i=i||"normal",r=r||"normal",n=+n||{normal:400,bold:700,lighter:300,bolder:800}[n]||400,e.fonts){var a=e.fonts[t];if(!a){var s=RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,P)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[B](o)&&s.test(o)){a=e.fonts[o];break}}var u;if(a)for(var l=0,h=a.length;h>l&&(u=a[l],u.face["font-weight"]!=n||u.face["font-style"]!=r&&u.face["font-style"]||u.face["font-stretch"]!=i);l++);return u}},b.print=function(t,n,r,i,a,s,o){s=s||"middle",o=z(O(o||0,1),-1);var u,l=M(r)[I](P),h=0,c=0,f=P;if(e.is(i,"string")&&(i=this.getFont(i)),i){u=(a||16)/i.face["units-per-em"];for(var p=i.face.bbox[I](_),d=+p[0],g=p[3]-p[1],x=0,v=+p[1]+("baseline"==s?g+ +i.face.descent:g/2),m=0,y=l.length;y>m;m++){if("\n"==l[m])h=0,w=0,c=0,x+=g;else{var b=c&&i.glyphs[l[m-1]]||{},w=i.glyphs[l[m]];h+=c?(b.w||i.w)+(b.k&&b.k[l[m]]||0)+i.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",h*u,x*u,"s",u,u,d,v,"t",(t-d)/u,(n-v)/u]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},b.add=function(t){if(e.is(t,"array"))for(var n,r=this.set(),i=0,a=t.length;a>i;i++)n=t[i]||{},w[B](n.type)&&r.push(this[n.type]().attr(n));return r},e.format=function(t,n){var r=e.is(n,W)?[0][L](n):arguments;return t&&e.is(t,N)&&r.length-1&&(t=t.replace(k,function(t,e){return null==r[++e]?P:r[e]})),t||P},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,n=function(t,n,r){var i=r;return n.replace(e,function(t,e,n,r,a){e=e||r,i&&(e in i&&(i=i[e]),"function"==typeof i&&a&&(i=i()))}),i=(null==i||i==r?t:i)+""};return function(e,r){return(e+"").replace(t,function(t,e){return n(t,e,r)})}}(),e.ninja=function(){return C.was?S.win.Raphael=C.is:delete Raphael,e},e.st=fn,function(t,n,r){function i(){/in/.test(t.readyState)?setTimeout(i,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(n,r=function(){t.removeEventListener(n,r,!1),t.readyState="complete"},!1),t.readyState="loading"),i()}(document,"DOMContentLoaded"),C.was?S.win.Raphael=e:Raphael=e,t.on("raphael.DOMload",function(){y=!0}),e});(function(t,e){"function"==typeof define&&define.amd?require(["raphael"],e):t.Raphael&&e(t.Raphael)})(this,function(t){if(t.svg){var e="hasOwnProperty",r=String,n=parseFloat,i=parseInt,a=Math,s=a.max,o=a.abs,u=a.pow,h=/[, ]+/,l=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var x=function(n,i){if(i){"string"==typeof n&&(n=x(n));for(var a in i)i[e](a)&&("xlink:"==a.substring(0,6)?n.setAttributeNS(p,a.substring(6),r(i[a])):n.setAttribute(a,r(i[a])))}else n=t._g.doc.createElementNS("http://www.w3.org/2000/svg",n),n.style&&(n.style.webkitTapHighlightColor="rgba(0,0,0,0)");return n},v=function(e,i){var h="linear",l=e.id+i,f=.5,p=.5,d=e.node,g=e.paper,v=d.style,y=t._g.doc.getElementById(l);if(!y){if(i=r(i).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=n(e),p=n(r);var i=2*(p>.5)-1;u(f-.5,2)+u(p-.5,2)>.25&&(p=a.sqrt(.25-u(f-.5,2))*i+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*i)}return c}),i=i.split(/\s*\-\s*/),"linear"==h){var m=i.shift();if(m=-n(m),isNaN(m))return null;var b=[0,0,a.cos(t.rad(m)),a.sin(t.rad(m))],_=1/(s(o(b[2]),o(b[3]))||1);b[2]*=_,b[3]*=_,0>b[2]&&(b[0]=-b[2],b[2]=0),0>b[3]&&(b[1]=-b[3],b[3]=0)}var w=t._parseDots(i);if(!w)return null;if(l=l.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&l!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=x(h+"Gradient",{id:l}),e.gradient=y,x(y,"radial"==h?{fx:f,fy:p}:{x1:b[0],y1:b[1],x2:b[2],y2:b[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var k=0,C=w.length;C>k;k++)y.appendChild(x("stop",{offset:w[k].offset?w[k].offset:k?"100%":"0%","stop-color":w[k].color||"#fff"}))}}return x(d,{fill:"url(#"+l+")",opacity:1,"fill-opacity":1}),v.fill=c,v.opacity=1,v.fillOpacity=1,1},y=function(t){var e=t.getBBox(1);x(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},m=function(n,i,a){if("path"==n.type){for(var s,o,u,h,l,f=r(i).toLowerCase().split("-"),p=n.paper,v=a?"end":"start",y=n.node,m=n.attrs,b=m["stroke-width"],_=f.length,w="classic",k=3,C=3,B=5;_--;)switch(f[_]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":w=f[_];break;case"wide":C=5;break;case"narrow":C=2;break;case"long":k=5;break;case"short":k=2}if("open"==w?(k+=2,C+=2,B+=2,u=1,h=a?4:1,l={fill:"none",stroke:m.stroke}):(h=u=k/2,l={fill:m.stroke,stroke:"none"}),n._.arrows?a?(n._.arrows.endPath&&g[n._.arrows.endPath]--,n._.arrows.endMarker&&g[n._.arrows.endMarker]--):(n._.arrows.startPath&&g[n._.arrows.startPath]--,n._.arrows.startMarker&&g[n._.arrows.startMarker]--):n._.arrows={},"none"!=w){var S="raphael-marker-"+w,A="raphael-marker-"+v+w+k+C;t._g.doc.getElementById(S)?g[S]++:(p.defs.appendChild(x(x("path"),{"stroke-linecap":"round",d:d[w],id:S})),g[S]=1);var T,M=t._g.doc.getElementById(A);M?(g[A]++,T=M.getElementsByTagName("use")[0]):(M=x(x("marker"),{id:A,markerHeight:C,markerWidth:k,orient:"auto",refX:h,refY:C/2}),T=x(x("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+C/2+") ":c)+"scale("+k/B+","+C/B+")","stroke-width":(1/((k/B+C/B)/2)).toFixed(4)}),M.appendChild(T),p.defs.appendChild(M),g[A]=1),x(T,l);var F=u*("diamond"!=w&&"oval"!=w);a?(s=n._.arrows.startdx*b||0,o=t.getTotalLength(m.path)-F*b):(s=F*b,o=t.getTotalLength(m.path)-(n._.arrows.enddx*b||0)),l={},l["marker-"+v]="url(#"+A+")",(o||s)&&(l.d=Raphael.getSubpath(m.path,s,o)),x(y,l),n._.arrows[v+"Path"]=S,n._.arrows[v+"Marker"]=A,n._.arrows[v+"dx"]=F,n._.arrows[v+"Type"]=w,n._.arrows[v+"String"]=i}else a?(s=n._.arrows.startdx*b||0,o=t.getTotalLength(m.path)-s):(s=0,o=t.getTotalLength(m.path)-(n._.arrows.enddx*b||0)),n._.arrows[v+"Path"]&&x(y,{d:Raphael.getSubpath(m.path,s,o)}),delete n._.arrows[v+"Path"],delete n._.arrows[v+"Marker"],delete n._.arrows[v+"dx"],delete n._.arrows[v+"Type"],delete n._.arrows[v+"String"];for(l in g)if(g[e](l)&&!g[l]){var L=t._g.doc.getElementById(l);L&&L.parentNode.removeChild(L)}}},b={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},_=function(t,e,n){if(e=b[r(e).toLowerCase()]){for(var i=t.attrs["stroke-width"]||"1",a={round:i,square:i,butt:0}[t.attrs["stroke-linecap"]||n["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*i+(o%2?1:-1)*a;x(t.node,{"stroke-dasharray":s.join(",")})}},w=function(n,a){var u=n.node,l=n.attrs,f=u.style.visibility;u.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(l[d]=g,d){case"blur":n.blur(g);break;case"href":case"title":case"target":var b=u.parentNode;if("a"!=b.tagName.toLowerCase()){var w=x("a");b.insertBefore(w,u),w.appendChild(u),b=w}"target"==d?b.setAttributeNS(p,"show","blank"==g?"new":g):b.setAttributeNS(p,d,g);break;case"cursor":u.style.cursor=g;break;case"transform":n.transform(g);break;case"arrow-start":m(n,g);break;case"arrow-end":m(n,g,1);break;case"clip-rect":var k=r(g).split(h);if(4==k.length){n.clip&&n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);var B=x("clipPath"),S=x("rect");B.id=t.createUUID(),x(S,{x:k[0],y:k[1],width:k[2],height:k[3]}),B.appendChild(S),n.paper.defs.appendChild(B),x(u,{"clip-path":"url(#"+B.id+")"}),n.clip=S}if(!g){var A=u.getAttribute("clip-path");if(A){var T=t._g.doc.getElementById(A.replace(/(^url\(#|\)$)/g,c));T&&T.parentNode.removeChild(T),x(u,{"clip-path":c}),delete n.clip}}break;case"path":"path"==n.type&&(x(u,{d:g?l.path=t._pathToAbsolute(g):"M0,0"}),n._.dirty=1,n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1)));break;case"width":if(u.setAttribute(d,g),n._.dirty=1,!l.fx)break;d="x",g=l.x;case"x":l.fx&&(g=-l.x-(l.width||0));case"rx":if("rx"==d&&"rect"==n.type)break;case"cx":u.setAttribute(d,g),n.pattern&&y(n),n._.dirty=1;break;case"height":if(u.setAttribute(d,g),n._.dirty=1,!l.fy)break;d="y",g=l.y;case"y":l.fy&&(g=-l.y-(l.height||0));case"ry":if("ry"==d&&"rect"==n.type)break;case"cy":u.setAttribute(d,g),n.pattern&&y(n),n._.dirty=1;break;case"r":"rect"==n.type?x(u,{rx:g,ry:g}):u.setAttribute(d,g),n._.dirty=1;break;case"src":"image"==n.type&&u.setAttributeNS(p,"href",g);break;case"stroke-width":(1!=n._.sx||1!=n._.sy)&&(g/=s(o(n._.sx),o(n._.sy))||1),n.paper._vbSize&&(g*=n.paper._vbSize),u.setAttribute(d,g),l["stroke-dasharray"]&&_(n,l["stroke-dasharray"],a),n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1));break;case"stroke-dasharray":_(n,g,a);break;case"fill":var M=r(g).match(t._ISURL);if(M){B=x("pattern");var F=x("image");B.id=t.createUUID(),x(B,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),x(F,{x:0,y:0,"xlink:href":M[1]}),B.appendChild(F),function(e){t._preload(M[1],function(){var t=this.offsetWidth,r=this.offsetHeight;x(e,{width:t,height:r}),x(F,{width:t,height:r}),n.paper.safari()})}(B),n.paper.defs.appendChild(B),x(u,{fill:"url(#"+B.id+")"}),n.pattern=B,n.pattern&&y(n);break}var L=t.getRGB(g);if(L.error){if(("circle"==n.type||"ellipse"==n.type||"r"!=r(g).charAt())&&v(n,g)){if("opacity"in l||"fill-opacity"in l){var N=t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(N){var P=N.getElementsByTagName("stop");x(P[P.length-1],{"stop-opacity":("opacity"in l?l.opacity:1)*("fill-opacity"in l?l["fill-opacity"]:1)})}}l.gradient=g,l.fill="none";break}}else delete a.gradient,delete l.gradient,!t.is(l.opacity,"undefined")&&t.is(a.opacity,"undefined")&&x(u,{opacity:l.opacity}),!t.is(l["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&x(u,{"fill-opacity":l["fill-opacity"]});L[e]("opacity")&&x(u,{"fill-opacity":L.opacity>1?L.opacity/100:L.opacity});case"stroke":L=t.getRGB(g),u.setAttribute(d,L.hex),"stroke"==d&&L[e]("opacity")&&x(u,{"stroke-opacity":L.opacity>1?L.opacity/100:L.opacity}),"stroke"==d&&n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1));break;case"gradient":("circle"==n.type||"ellipse"==n.type||"r"!=r(g).charAt())&&v(n,g);break;case"opacity":l.gradient&&!l[e]("stroke-opacity")&&x(u,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(l.gradient){N=t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g,c)),N&&(P=N.getElementsByTagName("stop"),x(P[P.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=i(g,10)+"px");var E=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});u.style[E]=g,n._.dirty=1,u.setAttribute(d,g)}}C(n,a),u.style.visibility=f},k=1.2,C=function(n,a){if("text"==n.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=n.attrs,o=n.node,u=o.firstChild?i(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h,l=r(a.text).split("\n"),f=[],p=0,d=l.length;d>p;p++)h=x("tspan"),p&&x(h,{dy:u*k,x:s.x}),h.appendChild(t._g.doc.createTextNode(l[p])),o.appendChild(h),f[p]=h}else for(f=o.getElementsByTagName("tspan"),p=0,d=f.length;d>p;p++)p?x(f[p],{dy:u*k,x:s.x}):x(f[0],{dy:0});x(o,{x:s.x,y:s.y}),n._.dirty=1;var g=n._getBBox(),v=s.y-(g.y+g.height/2);v&&t.is(v,"finite")&&x(f[0],{dy:v})}},B=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},S=t.el;B.prototype=S,S.constructor=B,t._engine.path=function(t,e){var r=x("path");e.canvas&&e.canvas.appendChild(r);var n=new B(r,e);return n.type="path",w(n,{fill:"none",stroke:"#000",path:t}),n},S.rotate=function(t,e,i){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=n(t[1]),i=n(t[2])),t=n(t[0]),null==i&&(e=i),null==e||null==i){var a=this.getBBox(1);e=a.x+a.width/2,i=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,i]])),this},S.scale=function(t,e,i,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=n(t[1]),i=n(t[2]),a=n(t[3])),t=n(t[0]),null==e&&(e=t),null==a&&(i=a),null==i||null==a)var s=this.getBBox(1);return i=null==i?s.x+s.width/2:i,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,i,a]])),this},S.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=n(t[1])),t=n(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},S.transform=function(r){var n=this._;if(null==r)return n.transform;if(t._extractTransform(this,r),this.clip&&x(this.clip,{transform:this.matrix.invert()}),this.pattern&&y(this),this.node&&x(this.node,{transform:this.matrix}),1!=n.sx||1!=n.sy){var i=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":i})}return this},S.hide=function(){return!this.removed&&this.paper.safari(this.node.style.display="none"),this},S.show=function(){return!this.removed&&this.paper.safari(this.node.style.display=""),this},S.remove=function(){if(!this.removed&&this.node.parentNode){var e=this.paper;e.__set__&&e.__set__.exclude(this),l.unbind("raphael.*.*."+this.id),this.gradient&&e.defs.removeChild(this.gradient),t._tear(this,e),"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var r in this)this[r]="function"==typeof this[r]?t._removedFactory(r):null;this.removed=!0}},S._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e={};try{e=this.node.getBBox()}catch(r){}finally{e=e||{}}return t&&this.hide(),e},S.attr=function(r,n){if(this.removed)return this;if(null==r){var i={};for(var a in this.attrs)this.attrs[e](a)&&(i[a]=this.attrs[a]);return i.gradient&&"none"==i.fill&&(i.fill=i.gradient)&&delete i.gradient,i.transform=this._.transform,i}if(null==n&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},u=0,c=s.length;c>u;u++)r=s[u],o[r]=r in this.attrs?this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?this.paper.customAttributes[r].def:t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==n&&t.is(r,"array")){for(o={},u=0,c=r.length;c>u;u++)o[r[u]]=this.attr(r[u]);return o}if(null!=n){var f={};f[r]=n}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)l("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return w(this,f),this},S.toFront=function(){if(this.removed)return this;"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var e=this.paper;return e.top!=this&&t._tofront(this,e),this},S.toBack=function(){if(this.removed)return this;var e=this.node.parentNode;return"a"==e.tagName.toLowerCase()?e.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):e.firstChild!=this.node&&e.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper),this.paper,this},S.insertAfter=function(e){if(this.removed)return this;var r=e.node||e[e.length-1].node;return r.nextSibling?r.parentNode.insertBefore(this.node,r.nextSibling):r.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this},S.insertBefore=function(e){if(this.removed)return this;var r=e.node||e[0].node;return r.parentNode.insertBefore(this.node,r),t._insertbefore(this,e,this.paper),this},S.blur=function(e){var r=this;if(0!==+e){var n=x("filter"),i=x("feGaussianBlur");r.attrs.blur=e,n.id=t.createUUID(),x(i,{stdDeviation:+e||1.5}),n.appendChild(i),r.paper.defs.appendChild(n),r._blur=n,x(r.node,{filter:"url(#"+n.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter")},t._engine.circle=function(t,e,r,n){var i=x("circle");t.canvas&&t.canvas.appendChild(i);var a=new B(i,t);return a.attrs={cx:e,cy:r,r:n,fill:"none",stroke:"#000"},a.type="circle",x(i,a.attrs),a},t._engine.rect=function(t,e,r,n,i,a){var s=x("rect");t.canvas&&t.canvas.appendChild(s);var o=new B(s,t);return o.attrs={x:e,y:r,width:n,height:i,r:a||0,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",x(s,o.attrs),o},t._engine.ellipse=function(t,e,r,n,i){var a=x("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new B(a,t);return s.attrs={cx:e,cy:r,rx:n,ry:i,fill:"none",stroke:"#000"},s.type="ellipse",x(a,s.attrs),s},t._engine.image=function(t,e,r,n,i,a){var s=x("image");x(s,{x:r,y:n,width:i,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new B(s,t);return o.attrs={x:r,y:n,width:i,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,n,i){var a=x("text");e.canvas&&e.canvas.appendChild(a);var s=new B(a,e);return s.attrs={x:r,y:n,"text-anchor":"middle",text:i,font:t._availableAttrs.font,stroke:"none",fill:"#000"},s.type="text",w(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,n=e.x,i=e.y,a=e.width,s=e.height;if(!r)throw Error("SVG container not found.");var o,u=x("svg"),h="overflow:hidden;";return n=n||0,i=i||0,a=a||512,s=s||342,x(u,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg"}),1==r?(u.style.cssText=h+"position:absolute;left:"+n+"px;top:"+i+"px",t._g.doc.body.appendChild(u),o=1):(u.style.cssText=h+"position:relative",r.firstChild?r.insertBefore(u,r.firstChild):r.appendChild(u)),r=new t._Paper,r.width=a,r.height=s,r.canvas=u,r.clear(),r._left=r._top=0,o&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,n,i){l("raphael.setViewBox",this,this._viewBox,[t,e,r,n,i]);var a,o,u=s(r/this.width,n/this.height),h=this.top,c=i?"meet":"xMinYMin";for(null==t?(this._vbSize&&(u=1),delete this._vbSize,a="0 0 "+this.width+f+this.height):(this._vbSize=u,a=t+f+e+f+r+f+n),x(this.canvas,{viewBox:a,preserveAspectRatio:c});u&&h;)o="stroke-width"in h.attrs?h.attrs["stroke-width"]:1,h.attr({"stroke-width":o}),h._.dirty=1,h._.dirtyT=1,h=h.prev;return this._viewBox=[t,e,r,n,!!i],this},t.prototype.renderfix=function(){var t,e=this.canvas,r=e.style;try{t=e.getScreenCTM()||e.createSVGMatrix()}catch(n){t=e.createSVGMatrix()}var i=-t.e%1,a=-t.f%1;(i||a)&&(i&&(this._left=(this._left+i)%1,r.left=this._left+"px"),a&&(this._top=(this._top+a)%1,r.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=x("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=x("defs"))},t.prototype.remove=function(){l("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var A=t.st;for(var T in S)S[e](T)&&!A[e](T)&&(A[T]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(T))}});(function(t,e){"function"==typeof define&&define.amd?require(["raphael"],e):t.Raphael&&e(t.Raphael)})(this,function(t){if(t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},x=/([clmz]),?([^clmz]*)/gi,v=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(x,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o,l,h=n(e);s=[];for(var u=0,c=h.length;c>u;u++){o=h[u],l=h[u][0].toLowerCase(),"z"==l&&(l="x");for(var f=1,v=o.length;v>f;f++)l+=a(o[f]*b)+(f!=v-1?",":d);s.push(l)}return s.join(p)},C=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},B=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",x=b/e,v=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(x)+p+l(v),f.rotation=a*(0>e*r?-1:1),a){var y=C(a,i,n);i=y.dx,n=y.dy}if(0>e&&(g+="x"),0>r&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-x+p+n*-v,u||s.fillsize){var m=c.getElementsByTagName(h);m=m&&m[0],c.removeChild(m),u&&(y=C(a,o.x(u[0],u[1]),o.y(u[0],u[1])),m.position=y.dx*d+p+y.dy*d),s.fillsize&&(m.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(m)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,x=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),v=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),y=n;for(var m in l)l[e](m)&&(f[m]=l[m]);if(x&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||x)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],B(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),v){var C=+f.cx,A=+f.cy,N=+f.rx||+f.r||0,E=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((C-N)*b),a((A-E)*b),a((C+N)*b),a((A+E)*b),a(C*b))}if("clip-rect"in l){var M=r(l["clip-rect"]).split(u);if(4==M.length){M[2]=+M[2]+ +M[0],M[3]=+M[3]+ +M[1];var z=c.clipRect||t._g.doc.createElement("div"),F=z.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",M),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(z,c),z.appendChild(c),c.clipRect=z)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(y,l["arrow-start"]),"arrow-end"in l&&S(y,l["arrow-end"],1),null!=l.opacity||null!=l["stroke-width"]||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var P=c.getElementsByTagName(h),I=!1;if(P=P&&P[0],!P&&(I=P=L(h)),"image"==n.type&&l.src&&(P.src=l.src),l.fill&&(P.on=!0),(null==P.on||"none"==l.fill||null===l.fill)&&(P.on=!1),P.on&&l.fill){var j=r(l.fill).match(t._ISURL);if(j){P.parentNode==c&&c.removeChild(P),P.rotate=!0,P.src=j[1],P.type="tile";var q=n.getBBox(1);P.position=q.x+p+q.y,n._.fillpos=[q.x,q.y],t._preload(j[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else P.color=t.getRGB(l.fill).hex,P.src=d,P.type="solid",t.getRGB(l.fill).error&&(y.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(y,l.fill,P)&&(f.fill="none",f.gradient=l.fill,P.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var D=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);D=o(s(D,0),1),P.opacity=D,P.src&&(P.color="none")}c.appendChild(P);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],V=!1;!O&&(V=O=L("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var Y=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=Y.hex),D=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+Y.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(D=o(s(D,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&1>G&&(D*=G)&&(O.weight=1),O.opacity=D,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),l["stroke-dasharray"]){var W={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=W[e](l["stroke-dasharray"])?W[l["stroke-dasharray"]]:d}V&&c.appendChild(O)}if("text"==y.type){y.paper.canvas.style.display=d;var X=y.paper.span,H=100,U=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),U=i(f["font-size"]||U&&U[0])||10,g.fontSize=U*H+"px",y.textpath.string&&(X.innerHTML=r(y.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var $=X.getBoundingClientRect();y.W=f.w=($.right-$.left)/H,y.H=f.h=($.bottom-$.top)/H,y.X=f.x,y.Y=f.y+y.H/2,("x"in l||"y"in l)&&(y.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Z=["x","y","text","font","font-family","font-weight","font-style","font-size"],Q=0,J=Z.length;J>Q;Q++)if(Z[Q]in l){y._.dirty=1;break}switch(f["text-anchor"]){case"start":y.textpath.style["v-text-align"]="left",y.bbx=y.W/2;break;case"end":y.textpath.style["v-text-align"]="right",y.bbx=-y.W/2;break;default:y.textpath.style["v-text-align"]="center",y.bbx=0}y.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=(e.attrs,Math.pow),l="linear",h=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return l="radial",e&&r&&(e=i(e),r=i(r),o(e-.5,2)+o(r-.5,2)>.25&&(r=n.sqrt(.25-o(e-.5,2))*(2*(r>.5)-1)+.5),h=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==l){var u=a.shift();if(u=-i(u),isNaN(u))return null}var c=t._parseDots(a);if(!c)return null;if(e=e.shape||e.node,c.length){e.removeChild(s),s.on=!0,s.method="none",s.color=c[0].color,s.color2=c[c.length-1].color;for(var f=[],g=0,x=c.length;x>g;g++)c[g].offset&&f.push(c[g].offset+p+c[g].color);s.colors=f.length?f.join():"0% "+s.color,"radial"==l?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=h,s.angle=0):(s.type="gradient",s.angle=(270-u)%360),e.appendChild(s)}return 1},N=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;N.prototype=E,E.constructor=N,E.transform=function(e){if(null==e)return this._.transform;var i,n=this.paper._viewBoxShift,a=n?"s"+[n.scale,n.scale]+"-1-1t"+[n.dx,n.dy]:d;n&&(i=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,a+e);var s,o=this.matrix.clone(),l=this.skew,h=this.node,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(o.translate(-.5,-.5),c||u||"image"==this.type)if(l.matrix="1 0 0 1",l.offset="0 0",s=o.split(),u&&s.noRotation||!s.isSimple){h.style.filter=o.toFilter();var f=this.getBBox(),g=this.getBBox(1),x=f.x-g.x,v=f.y-g.y;h.coordorigin=x*-b+p+v*-b,B(this,1,1,x,v,0)}else h.style.filter=d,B(this,s.scalex,s.scaley,s.dx,s.dy,s.rotate);else h.style.filter=d,l.matrix=r(o),l.offset=o.offset();return i&&(this._.transform=i),this},E.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},E.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},E.hide=function(){return!this.removed&&(this.node.style.display="none"),this},E.show=function(){return!this.removed&&(this.node.style.display=d),this},E._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;f>l;l++)r=s[l],o[r]=r in this.attrs?this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?this.paper.customAttributes[r].def:t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;f>l;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var x in g)g[e](x)&&(p[x]=g[x])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},E.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},E.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},E.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},E.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},E.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;i=i.replace(v,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur)},t._engine.path=function(t,e){var r=L("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new N(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas.appendChild(r);var a=L("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path();return a.attrs,a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path();return n.attrs,n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),B(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=L("shape"),l=L("path"),h=L("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new N(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=L("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var o,l,h=this.width,u=this.height,c=1/s(i/h,n/u);return a&&(o=u/n,l=h/i,h>i*o&&(e-=(h-i*o)/2/o),u>n*l&&(r-=(u-n*l)/2/l)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:c},this.forEach(function(t){t.transform("...")}),this};var L;t._engine.initWin=function(t){var e=t.document;e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),L=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){L=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n=e.width,a=e.x,s=e.y;if(!r)throw Error("VML container not found.");var o=new t._Paper,l=o.canvas=t._g.doc.createElement("div"),h=l.style;return a=a||0,s=s||0,n=n||512,i=i||342,o.width=n,o.height=i,n==+n&&(n+="px"),i==+i&&(i+="px"),o.coordsize=1e3*b+p+1e3*b,o.coordorigin="0 0",o.span=t._g.doc.createElement("span"),o.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",l.appendChild(o.span),h.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",n,i),1==r?(t._g.doc.body.appendChild(l),h.left=a+"px",h.top=s+"px",h.position="absolute"):r.firstChild?r.insertBefore(l,r.firstChild):r.appendChild(l),o.renderfix=function(){},o},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var M=t.st;for(var z in E)E[e](z)&&!M[e](z)&&(M[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}});;/*
 * Raphaelicious 1.0 - Raphael Utility plugin
 *
 * Copyright (c) 2013 Myrousz <myrousz@gmail.com>
 * Dual-licensed under the GPL (http://www.opensource.org/licenses/gpl-3.0)
 * and the MIT (http://www.opensource.org/licenses/mit-license) licenses.
 */
(function() {

    /** 
     * Creates a grid set.
     * 
     * @name rxGrid
	 * @methodOf Raphael
     * 
     * @author <a href="mailto:myrousz@gmail.com">Myrousz</a>
     * @version 1.0.
     * @param number xMin minimum x coordinate
     * @param number yMin minimum y coordinate
     * @param number xMax maximum x coordinate
     * @param number yMax maximum y coordinate
     * @param number xCell cell width
     * @param number yCell cell height
     * @returns object Raphael set containing grid
     * 
     * @code paper.rxGrid(0, 0, 400, 400, 20, 20).attr("stroke", "#aaa");
     */
    Raphael.fn.rxGrid = function (xMin, yMin, xMax, yMax, xCell, yCell) {
        var st = this.set();
        for (var y = yMin; y <= yMax; y += yCell) {
            st.push(this.path("M" + xMin + " " + y + " L" + xMax + " " + y));
        }
        for (var x = xMin; x <= xMax; x += xCell) {
            st.push(this.path("M" + x + " " + yMin + "L" + x + " " + yMax));
        }
        return st;
    };

    /**
     * @name rxVector
	 * @methodOf Raphael
     * 
     * Creates a oriented line.
     * 
     * @param number x x coordinate of start point
     * @param number y x coordinate of start point
     * @param number dx x component of direction vector
     * @param number dy y component of direction vector
     * @returns object Raphael set containing vector
     * 
     * @code paper.rxVector(30, 40, 100, 150).attr("stroke", "#aaa");
     */
    Raphael.fn.rxVector = function (x, y, dx, dy) {
        var st = this.set();
        var def = "M" + x + " " + y + " L" + (x + dx) + " " + (y + dy);
        st.push(this.circle(x, y, 3).attr("fill", "#666"));
        st.push(this.path(def));
        return st;
    };

    /**
     * @name rxMakeDraggable
	 * @methodOf Raphael
	 * 
     * Makes Raphael element draggable.
     * 
     * @param object c Raphael object
     * @returns boolean true
     * 
     * @code var circ = paper.circle(50, 50, 30); 
     * @code var box = paper.rect(80, 60, 100, 40); 
     * @code paper.rxMakeDraggable(circ); 
     * @code paper.rxMakeDraggable(box);
     */
	Raphael.fn.rxMakeDraggable = function (c) {
		var drag = {
			x: 0,
			y: 0,
			state: false
		};
		c.attr('fill', '#80f');
		$(c.node).mousedown(function (e) {
			if (!drag.state) {
				c.attr({
					fill: '#808'
				});
                // make dragged element the topmost one...
                c.toFront();
				drag.x = e.pageX;
				drag.y = e.pageY;
				drag.state = true;
			}
			return false;
		});

		$(c.node).mousemove(function (e) {
			if (drag.state) {
				c.translate(e.pageX - drag.x, e.pageY - drag.y);
				drag.x = e.pageX;
				drag.y = e.pageY;
			}
		});

		$(c.node).mouseup(function () {
			c.attr({
				fill: '#80f'
			});
			drag.state = false;
		});

		$(c.node).mouseout(function () {
			$(c.node).mouseup();
		});
	};
	

})();
;/*
Yetii - Yet (E)Another Tab Interface Implementation
version 1.8
http://www.kminek.pl/lab/yetii/
Copyright (c) Grzegorz Wojcik
Code licensed under the BSD License:
http://www.kminek.pl/bsdlicense.txt
*/

function Yetii() {

    this.defaults = {
        id: null,
        active: 1,
        interval: null,
        wait: null,
        persist: null,
        tabclass: 'tab',
        activeclass: 'active',
        callback: null,
        leavecallback: null

    };

    this.activebackup = null;

    for (var n in arguments[0]) {
        this.defaults[n]=arguments[0][n];
    };

    this.getTabs = function() {
        var retnode = [];
        var elem = document.getElementById(this.defaults.id).getElementsByTagName('*');
        var regexp = new RegExp("(^|\\s)" + this.defaults.tabclass.replace(/\-/g, "\\-") + "(\\s|$)");
        for (var i = 0; i < elem.length; i++) {
            if (regexp.test(elem[i].className)) retnode.push(elem[i]);
        }
        return retnode;
    };

    this.links = document.getElementById(this.defaults.id + '-nav').getElementsByTagName('a');
    this.listitems = document.getElementById(this.defaults.id + '-nav').getElementsByTagName('li');

    this.show = function(number) {
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].style.display = ((i+1)==number) ? 'block' : 'none';
            if ((i+1)==number) {
                this.addClass(this.links[i], this.defaults.activeclass);
                this.addClass(this.listitems[i], this.defaults.activeclass + 'li');
            } else {
                this.removeClass(this.links[i], this.defaults.activeclass);
                this.removeClass(this.listitems[i], this.defaults.activeclass + 'li');
            }
        }
        if (this.defaults.leavecallback && (number != this.activebackup)) this.defaults.leavecallback(this.defaults.active);
        this.activebackup = number;
        this.defaults.active = number;
        if (this.defaults.callback) this.defaults.callback(number);
    };

    this.rotate = function(interval) {
        this.show(this.defaults.active);
        this.defaults.active++;
        if (this.defaults.active > this.tabs.length) this.defaults.active = 1;
        var self = this;
        if (this.defaults.wait) clearTimeout(this.timer2);
        this.timer1 = setTimeout(function(){
            self.rotate(interval);
        }, interval*1000);
    };

    this.next = function() {
        var _target = (this.defaults.active + 1 > this.tabs.length) ? 1 : this.defaults.active + 1;
        this.show(_target);
        this.defaults.active = _target;
    };

    this.previous = function() {
        var _target = ((this.defaults.active - 1) == 0) ? this.tabs.length : this.defaults.active - 1;
        this.show(_target);
        this.defaults.active = _target;
    };

    this.previous = function() {
        this.defaults.active--;
        if(!this.defaults.active) this.defaults.active = this.tabs.length;
        this.show(this.defaults.active);
    };

    this.gup = function(name) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null) return null;
        else return results[1];
    };
    
    this.guh = function() {
        var regexS = "#([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec(window.location.hash);
        if (results == null) return null;
        else return results[1];
    };

    this.parseurl = function(tabinterfaceid) {
        var result = this.gup(tabinterfaceid);
        if (result == null) result = this.guh();
        if (result == null) return null;
        if (parseInt(result)) return parseInt(result);
        if (document.getElementById(result)) {
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id == result) { 
                    return (i+1); 
                }
            }
        }
        return null;
    };

    this.createCookie = function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    this.readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    this.hasClass = function(el, className){
        var classes = el.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == className) return true;
        }
        return false;
    };

    this.addClass = function(el, className){
        if (!this.hasClass(el, className)) el.className = (el.className + ' ' + className).replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
    };

    this.removeClass = function(el, className){
        el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
        el.className.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
    };

    this.tabs = this.getTabs();
    this.defaults.active = (this.parseurl(this.defaults.id)) ? this.parseurl(this.defaults.id) : this.defaults.active;
    if (this.defaults.persist && this.readCookie(this.defaults.id)) this.defaults.active = this.readCookie(this.defaults.id);
    this.activebackup = this.defaults.active;
    this.show(this.defaults.active);

    var self = this;
    for (var i = 0; i < this.links.length; i++) {
        this.links[i].customindex = i+1;
        this.links[i].onclick = function(){

            if (self.timer1) clearTimeout(self.timer1);
            if (self.timer2) clearTimeout(self.timer2);

            self.show(this.customindex);
            if (self.defaults.persist) self.createCookie(self.defaults.id, this.customindex, 0);

            if (self.defaults.wait) self.timer2 = setTimeout(function(){
                self.rotate(self.defaults.interval);
            }, self.defaults.wait*1000);

            return false;
        };
    }

    if (this.defaults.interval) this.rotate(this.defaults.interval);

};