/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);
(function(l){var b=jQuery.fn.jquery>="1.8";var m={xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",html:"http://www.w3.org/1999/xhtml/"};rbackslash=/\\(?!\\)/g;var r={};for(var f in m){r[m[f]]=f}l.extend({xmlns:l.extend({},m,{"":"*"})});var n=[];l.fn.extend({xmlns:function(u,v){if(typeof u=="string"){u={"":u}}if(u){n.push(l.xmlns);l.xmlns=l.extend({},l.xmlns,u);if(v!==undefined){if(typeof v=="string"){return this.find(v).xmlns(undefined)}else{var t=this;try{t=v.call(this);if(!t){t=this}}finally{t.xmlns(undefined)}return t}}else{return this}}else{l.xmlns=(n?n.pop():{});return this}}});var p=function(u){if(!u){return l.xmlns[""]}u=u.substr(0,u.length-1);if(u==""||u=="*"){return u}var t=l.xmlns[u];if(typeof(t)=="undefined"){throw"Syntax error, undefined namespace prefix '"+u+"'"}return t};var g=(b)?function(t,u){l.expr.match[t]=u}:function(t,u){l.expr.match[t]=new RegExp(u.source+/(?![^\[]*\])(?![^\(]*\))/.source);if(l.expr.leftMatch){l.expr.leftMatch[t]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.expr.match[t].source.replace(/\\(\d+)/g,function(w,v){return"\\"+(v-0+1)}))}};if(b){g("TAG",/^((?:((?:\\.|[-\w*]|[^\x00-\xa0])+\|)?((?:\\.|[-\w*]|[^\x00-\xa0])+)))/)}else{g("TAG",/^((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)))/)}var a=document.createElement("div");var e=false;a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0){e=true}var s=true;if(a.localName&&a.localName=="div"){s=false}a=null;l.expr.find.TAG=function(w,t,B){if(!jQuery.isArray(w)){if(typeof t.getElementsByTagName!=="undefined"){return t.getElementsByTagName(w)}}var z=p(w[2]);var x=w[3];var y;if(typeof t.getElementsByTagNameNS!="undefined"){y=t.getElementsByTagNameNS(z,x)}else{if(typeof t.selectNodes!="undefined"){if(t.ownerDocument){t.ownerDocument.setProperty("SelectionLanguage","XPath")}else{t.setProperty("SelectionLanguage","XPath")}var A="";if(z!="*"){if(x!="*"){A="namespace-uri()='"+z+"' and local-name()='"+x+"'"}else{A="namespace-uri()='"+z+"'"}}else{if(x!="*"){A="local-name()='"+x+"'"}}if(A){y=t.selectNodes("descendant-or-self::*["+A+"]")}else{y=t.selectNodes("descendant-or-self::*")}}else{y=t.getElementsByTagName(x);if(e&&x=="*"){var v=[];for(var u=0;y[u];u++){if(y[u].nodeType==1){v.push(y[u])}}y=v}if(y&&z!="*"){var v=[];for(var u=0;y[u];u++){if(y[u].namespaceURI==z||y[u].tagUrn==z){v.push(y[u])}}y=v}}}return y};var q=function(t){return t.nodeType===9&&t.documentElement.nodeName!=="HTML"||!!t.ownerDocument&&t.ownerDocument.documentElement.nodeName!=="HTML"};l.expr.preFilter.TAG=function(w,u,v,t,y,z){var x=w[3];if(!z){if(s){x=x.toUpperCase()}else{x=x.toLowerCase()}}return[w[0],p(w[2]),x]};function c(t,u){return function(x){var v=x.namespaceURI?x.namespaceURI:x.tagUrn;var w=x.localName?x.localName:x.tagName;if(t=="*"||v==t||(t==""&&!v)){return((u=="*"&&x.nodeType==1)||w==u)}return false}}l.expr.filter.TAG=(b)?c:function(w,t){var u=t[1];var v=t[2];return c(u,v).call(this,w,null)};if(b){g("ATTR",/^\[[\x20\t\r\n\f]*(((?:\\.|[-\w]|[^\x00-\xa0])+\|)?((?:\\.|[-\w]|[^\x00-\xa0])+))[\x20\t\r\n\f]*(?:([*^$|!~]?=)[\x20\t\r\n\f]*(?:(['"])((?:\\.|[^\\])*?)\5|((?:\\.|[-\w]|[^\x00-\xa0])+\|)?((?:\\.|[-\w#]|[^\x00-\xa0])+)|)|)[\x20\t\r\n\f]*\]/)}else{g("ATTR",/\[\s*((?:((?:[\w\u00c0-\uFFFF\*_-]*\|)?)((?:[\w\u00c0-\uFFFF_-]|\\.)+)))\s*(?:(\S?=)\s*(['"]*)(.*?)\5|)\s*\]/)}l.expr.preFilter.ATTR=(b)?function(u,v,w){var t=u[1].replace(rbackslash,"");if(u[4]=="~="){u[6]=" "+u[6]+" "}u[5]=(u[6]||u[7]||"").replace(rbackslash,"");if(!u[2]||u[2]=="|"){u[2]=""}else{u[2]=p(u[2])}return u.slice(0,6)}:function(x,u,v,t,y,z){var w=x[3].replace(/\\/g,"");if(!z&&l.expr.attrMap[w]){x[3]=l.expr.attrMap[w]}if(x[4]=="~="){x[6]=" "+x[6]+" "}if(!x[2]||x[2]=="|"){x[2]=""}else{x[2]=p(x[2])}return x};var o=function(t,v,u){if(t==null){return v==="!="}if(!v){return true}t+="";return v==="="?t===u:v==="!="?t!==u:v==="^="?u&&t.indexOf(u)===0:v==="*="?u&&t.indexOf(u)>-1:v==="$="?u&&t.substr(t.length-u.length)===u:v==="~="?(" "+t+" ").indexOf(u)>-1:v==="|="?t===u||t.substr(0,u.length+1)===u+"-":false};function h(v,w,u,x,t){return function(E,C){if(w==""){var z=l(E).attr(u);return o(z,x,t)}else{if(w!="*"&&typeof E.getAttributeNS!="undefined"){return o(E.getAttributeNS(w,u),x,t)}var A=E.attributes;for(var B=0;A[B];B++){var D=A[B].localName;if(!D){D=A[B].nodeName;var y=D.indexOf(":");if(y>=0){D=D.substr(y+1)}}if(D==u){z=A[B].nodeValue;if(w=="*"||A[B].namespaceURI==w){if(o(z,x,t)){return true}}if(A[B].namespaceURI===""&&A[B].prefix){if(A[B].prefix==r[w]){if(o(z,x,t)){return true}}}}}return false}}}l.expr.filter.ATTR=(b)?h:function(y,v){var x=v[2];var u=v[3];var w=v[4];var t=v[6];return h(null,x,u,w,t).call(this,y,null)}})(jQuery);(function($){var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==="object"&&JSON.stringify?JSON.stringify:function(o){if(o===null){return"null"}var pairs,k,name,val,type=$.type(o);if(type==="undefined"){return undefined}if(type==="number"||type==="boolean"){return String(o)}if(type==="string"){return $.quoteString(o)}if(typeof o.toJSON==="function"){return $.toJSON(o.toJSON())}if(type==="date"){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month="0"+month}if(day<10){day="0"+day}if(hours<10){hours="0"+hours}if(minutes<10){minutes="0"+minutes}if(seconds<10){seconds="0"+seconds}if(milli<100){milli="0"+milli}if(milli<10){milli="0"+milli}return'"'+year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"."+milli+'Z"'}pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||"null")}return"["+pairs.join(",")+"]"}if(typeof o==="object"){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==="number"){name='"'+k+'"'}else{if(type==="string"){name=$.quoteString(k)}else{continue}}type=typeof o[k];if(type!=="function"&&type!=="undefined"){val=$.toJSON(o[k]);pairs.push(name+":"+val)}}}return"{"+pairs.join(",")+"}"}};$.evalJSON=typeof JSON==="object"&&JSON.parse?JSON.parse:function(str){return eval("("+str+")")};$.secureEvalJSON=typeof JSON==="object"&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered)){return eval("("+str+")")}throw new SyntaxError("Error parsing JSON, source is not valid.")};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+str+'"'}}(jQuery));(function(m,p,v,r,n){var t=v.createElement("div"),h=t.style,c="Transform",C=["O"+c,"ms"+c,"Webkit"+c,"Moz"+c],z=C.length,a,l,G="Float32Array" in p,J,w,F=/Matrix([^)]*)/,q=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,I="transform",K="transformOrigin",H="translate",f="rotate",s="scale",B="skew",b="matrix";while(z--){if(C[z] in h){m.support[I]=a=C[z];m.support[K]=a+"Origin";continue}}if(!a){m.support.matrixFilter=l=h.filter===""}m.cssNumber[I]=m.cssNumber[K]=true;if(a&&a!=I){m.cssProps[I]=a;m.cssProps[K]=a+"Origin";if(a=="Moz"+c){J={get:function(M,L){return(L?m.css(M,a).split("px").join(""):M.style[a])},set:function(L,M){L.style[a]=/matrix\([^)p]*\)/.test(M)?M.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,b+"$1$2px,$3px"):M}}}else{if(/^1\.[0-5](?:\.|$)/.test(m.fn.jquery)){J={get:function(M,L){return(L?m.css(M,a.replace(/^ms/,"Ms")):M.style[a])}}}}}else{if(l){J={get:function(P,O,L){var N=(O&&P.currentStyle?P.currentStyle:P.style),M,Q;if(N&&F.test(N.filter)){M=RegExp.$1.split(",");M=[M[0].split("=")[1],M[2].split("=")[1],M[1].split("=")[1],M[3].split("=")[1]]}else{M=[1,0,0,1]}if(!m.cssHooks[K]){M[4]=N?parseInt(N.left,10)||0:0;M[5]=N?parseInt(N.top,10)||0:0}else{Q=m._data(P,"transformTranslate",n);M[4]=Q?Q[0]:0;M[5]=Q?Q[1]:0}return L?M:b+"("+M+")"},set:function(R,S,N){var M=R.style,O,L,Q,P;if(!N){M.zoom=1}S=y(S);L=["Matrix(M11="+S[0],"M12="+S[2],"M21="+S[1],"M22="+S[3],"SizingMethod='auto expand'"].join();Q=(O=R.currentStyle)&&O.filter||M.filter||"";M.filter=F.test(Q)?Q.replace(F,L):Q+" progid:DXImageTransform.Microsoft."+L+")";if(!m.cssHooks[K]){if((P=m.transform.centerOrigin)){M[P=="margin"?"marginLeft":"left"]=-(R.offsetWidth/2)+(R.clientWidth/2)+"px";M[P=="margin"?"marginTop":"top"]=-(R.offsetHeight/2)+(R.clientHeight/2)+"px"}M.left=S[4]+"px";M.top=S[5]+"px"}else{m.cssHooks[K].set(R,S)}}}}}if(J){m.cssHooks[I]=J}w=J&&J.get||m.css;m.fx.step.transform=function(P){var O=P.elem,M=P.start,Q=P.end,U=P.pos,N="",S=100000,R,L,T,V;if(!M||typeof M==="string"){if(!M){M=w(O,a)}if(l){O.style.zoom=1}Q=Q.split("+=").join(M);m.extend(P,e(M,Q));M=P.start;Q=P.end}R=M.length;while(R--){L=M[R];T=Q[R];V=+false;switch(L[0]){case H:V="px";case s:V||(V="");N=L[0]+"("+r.round((L[1][0]+(T[1][0]-L[1][0])*U)*S)/S+V+","+r.round((L[1][1]+(T[1][1]-L[1][1])*U)*S)/S+V+")"+N;break;case B+"X":case B+"Y":case f:N=L[0]+"("+r.round((L[1]+(T[1]-L[1])*U)*S)/S+"rad)"+N;break}}P.origin&&(N=P.origin+N);J&&J.set?J.set(O,N,+true):O.style[a]=N};function y(N){N=N.split(")");var O=m.trim,R=-1,Q=N.length-1,T,L,M,P=G?new Float32Array(6):[],U=G?new Float32Array(6):[],S=G?new Float32Array(6):[1,0,0,1,0,0];P[0]=P[3]=S[0]=S[3]=1;P[1]=P[2]=P[4]=P[5]=0;while(++R<Q){T=N[R].split("(");L=O(T[0]);M=T[1];U[0]=U[3]=1;U[1]=U[2]=U[4]=U[5]=0;switch(L){case H+"X":U[4]=parseInt(M,10);break;case H+"Y":U[5]=parseInt(M,10);break;case H:M=M.split(",");U[4]=parseInt(M[0],10);U[5]=parseInt(M[1]||0,10);break;case f:M=g(M);U[0]=r.cos(M);U[1]=r.sin(M);U[2]=-r.sin(M);U[3]=r.cos(M);break;case s+"X":U[0]=+M;break;case s+"Y":U[3]=M;break;case s:M=M.split(",");U[0]=M[0];U[3]=M.length>1?M[1]:M[0];break;case B+"X":U[2]=r.tan(g(M));break;case B+"Y":U[1]=r.tan(g(M));break;case b:M=M.split(",");U[0]=M[0];U[1]=M[1];U[2]=M[2];U[3]=M[3];U[4]=parseInt(M[4],10);U[5]=parseInt(M[5],10);break}S[0]=P[0]*U[0]+P[2]*U[1];S[1]=P[1]*U[0]+P[3]*U[1];S[2]=P[0]*U[2]+P[2]*U[3];S[3]=P[1]*U[2]+P[3]*U[3];S[4]=P[0]*U[4]+P[2]*U[5]+P[4];S[5]=P[1]*U[4]+P[3]*U[5]+P[5];P=[S[0],S[1],S[2],S[3],S[4],S[5]]}return S}function u(O){var P,N,M,L=O[0],S=O[1],R=O[2],Q=O[3];if(L*Q-S*R){P=r.sqrt(L*L+S*S);L/=P;S/=P;M=L*R+S*Q;R-=L*M;Q-=S*M;N=r.sqrt(R*R+Q*Q);R/=N;Q/=N;M/=N;if(L*Q<S*R){L=-L;S=-S;M=-M;P=-P}}else{P=N=M=0}return[[H,[+O[4],+O[5]]],[f,r.atan2(S,L)],[B+"X",r.atan(M)],[s,[P,N]]]}function e(S,M){var P={start:[],end:[]},N=-1,L,O,Q,R;(S=="none"||E(S))&&(S="");(M=="none"||E(M))&&(M="");if(S&&M&&!M.indexOf("matrix")&&x(S).join()==x(M.split(")")[0]).join()){P.origin=S;S="";M=M.slice(M.indexOf(")")+1)}if(!S&&!M){return}if(!S||!M||A(S)==A(M)){S&&(S=S.split(")"))&&(L=S.length);M&&(M=M.split(")"))&&(L=M.length);while(++N<L-1){S[N]&&(O=S[N].split("("));M[N]&&(Q=M[N].split("("));R=m.trim((O||Q)[0]);D(P.start,o(R,O?O[1]:0));D(P.end,o(R,Q?Q[1]:0))}}else{P.start=u(y(S));P.end=u(y(M))}return P}function o(O,P){var M=+(!O.indexOf(s)),N,L=O.replace(/e[XY]/,"e");switch(O){case H+"Y":case s+"Y":P=[M,P?parseFloat(P):M];break;case H+"X":case H:case s+"X":N=1;case s:P=P?(P=P.split(","))&&[parseFloat(P[0]),parseFloat(P.length>1?P[1]:O==s?N||P[0]:M+"")]:[M,M];break;case B+"X":case B+"Y":case f:P=P?g(P):0;break;case b:return u(P?x(P):[1,0,0,1,0,0]);break}return[[L,P]]}function E(L){return q.test(L)}function A(L){return L.replace(/(?:\([^)]*\))|\s/g,"")}function D(M,L,N){while(N=L.shift()){M.push(N)}}function g(L){return ~L.indexOf("deg")?parseInt(L,10)*(r.PI*2/360):~L.indexOf("grad")?parseInt(L,10)*(r.PI/200):parseFloat(L)}function x(L){L=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(L);return[L[1],L[2],L[3],L[4],L[5],L[6]]}m.transform={centerOrigin:"margin"}})(jQuery,window,document,Math);(function(e){var s=e.extend,n="mousedown",t="mousemove",o="mouseup",r="touchstart",l="touchmove",u="touchend",g="touchcancel";function f(A,y,z){if(y.substr(0,5)!=="touch"){return e(A).unbind(y,z)}var B,x;for(x=0;x<w._binds.length;x++){if(w._binds[x].elem===A&&w._binds[x].type===y&&w._binds[x].func===z){if(document.addEventListener){A.removeEventListener(y,w._binds[x].fnc,false)}else{A.detachEvent("on"+y,w._binds[x].fnc)}w._binds.splice(x--,1)}}}function w(B,y,A,z){if(y.substr(0,5)!=="touch"){return e(B).bind(y,z,A)}var C,x;if(w[y]){return w[y].bind(B,y,A,z)}C=function(D){if(!D){D=window.event}if(!D.stopPropagation){D.stopPropagation=function(){this.cancelBubble=true}}D.data=z;A.call(B,D)};if(document.addEventListener){B.addEventListener(y,C,false)}else{B.attachEvent("on"+y,C)}w._binds.push({elem:B,type:y,func:A,fnc:C})}function h(y,x){var z={move:{x:0,y:0},offset:{x:0,y:0},position:{x:0,y:0},start:{x:0,y:0},affects:document.documentElement,stopPropagation:false,preventDefault:true,touch:true};s(z,x);z.element=y;w(y,n,v,z);if(z.touch){w(y,r,a,z)}}function m(x){f(x,n,n)}function v(x){x.data.position.x=x.pageX;x.data.position.y=x.pageY;x.data.start.x=x.pageX;x.data.start.y=x.pageY;x.data.event=x;if(x.data.onstart&&x.data.onstart.call(x.data.element,x.data)){return}if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.stopPropagation){x.stopPropagation()}w(x.data.affects,t,b,x.data);w(x.data.affects,o,q,x.data)}function b(x){if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.preventDefault){x.stopPropagation()}x.data.move.x=x.pageX-x.data.position.x;x.data.move.y=x.pageY-x.data.position.y;x.data.position.x=x.pageX;x.data.position.y=x.pageY;x.data.offset.x=x.pageX-x.data.start.x;x.data.offset.y=x.pageY-x.data.start.y;x.data.event=x;if(x.data.onmove){x.data.onmove.call(x.data.element,x.data)}}function q(x){if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.stopPropagation){x.stopPropagation()}f(x.data.affects,t,b);f(x.data.affects,o,q);x.data.event=x;if(x.data.onfinish){x.data.onfinish.call(x.data.element,x.data)}}function a(x){x.data.position.x=x.touches[0].pageX;x.data.position.y=x.touches[0].pageY;x.data.start.x=x.touches[0].pageX;x.data.start.y=x.touches[0].pageY;x.data.event=x;if(x.data.onstart&&x.data.onstart.call(x.data.element,x.data)){return}if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.stopPropagation){x.stopPropagation()}w(x.data.affects,l,p,x.data);w(x.data.affects,u,c,x.data)}function p(x){if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.stopPropagation){x.stopPropagation()}x.data.move.x=x.touches[0].pageX-x.data.position.x;x.data.move.y=x.touches[0].pageY-x.data.position.y;x.data.position.x=x.touches[0].pageX;x.data.position.y=x.touches[0].pageY;x.data.offset.x=x.touches[0].pageX-x.data.start.x;x.data.offset.y=x.touches[0].pageY-x.data.start.y;x.data.event=x;if(x.data.onmove){x.data.onmove.call(x.data.elem,x.data)}}function c(x){if(x.preventDefault&&x.data.preventDefault){x.preventDefault()}if(x.stopPropagation&&x.data.stopPropagation){x.stopPropagation()}f(x.data.affects,l,p);f(x.data.affects,u,c);x.data.event=x;if(x.data.onfinish){x.data.onfinish.call(x.data.element,x.data)}}w._binds=[];e.fn.grab=function(y,x){return this.each(function(){return h(this,y,x)})};e.fn.ungrab=function(x){return this.each(function(){return m(this,x)})}})(jQuery);PureCSSMatrix=(function(){var b=/deg$/;var f=/([0-9.\-e]+)/g;var g=/([a-zA-Z]+)\(([^\)]+)\)/g;function c(l){if(l&&l!==null&&l!="none"){if(l instanceof Matrix){this.setMatrix(l)}else{this.setMatrixValue(l)}}else{this.m=Matrix.I(3)}}c.prototype.setMatrix=function(l){this.m=l};function e(m){var l=parseFloat(h(m));if(m.match(b)){l=(2*Math.PI)*l/360}return l}c.prototype.setMatrixValue=function(o){var l=Matrix.I(3);var m;while((m=g.exec(o))!==null){var p=m[1].toLowerCase();var r=m[2].split(",");var n;if(p=="matrix"){n=Matrix.create([[parseFloat(r[0]),parseFloat(r[2]),parseFloat(h(r[4]))],[parseFloat(r[1]),parseFloat(r[3]),parseFloat(h(r[5]))],[0,0,1]])}else{if(p=="translate"){n=Matrix.I(3);n.elements[0][2]=parseFloat(h(r[0]));n.elements[1][2]=parseFloat(h(r[1]))}else{if(p=="scale"){var s=parseFloat(r[0]);var q;if(r.length>1){q=parseFloat(r[1])}else{q=s}n=Matrix.create([[s,0,0],[0,q,0],[0,0,1]])}else{if(p=="rotate"){n=Matrix.RotationZ(e(r[0]))}else{if(p=="skew"||p=="skewx"){n=Matrix.I(3);n.elements[0][1]=Math.tan(e(r[0]))}else{if(p=="skewy"){n=Matrix.I(3);n.elements[1][0]=Math.tan(e(r[0]))}else{console.log("Problem with setMatrixValue",p,r)}}}}}}l=l.multiply(n)}this.m=l};c.prototype.multiply=function(l){return new c(this.m.multiply(l.m))};c.prototype.inverse=function(){if(Math.abs(this.m.elements[0][0])<0.000001){this.m.elements[0][0]=0}return new c(this.m.inverse())};c.prototype.translate=function(l,n){var m=Matrix.I(3);m.elements[0][2]=l;m.elements[1][2]=n;return new c(this.m.multiply(m))};c.prototype.scale=function(n,m){var l=Matrix.create([[n,0,0],[0,m,0],[0,0,1]]);return new c(this.m.multiply(l))};c.prototype.rotate=function(l){var m=Matrix.RotationZ(l);return new c(this.m.multiply(m))};c.prototype.toString=function(){var m=this.m.elements;var l="";if($.browser.mozilla||$.browser.opera){l="px"}return"matrix("+a(m[0][0])+", "+a(m[1][0])+", "+a(m[0][1])+", "+a(m[1][1])+", "+a(m[0][2])+l+", "+a(m[1][2])+l+")"};c.prototype.elements=function(){var l=this.m.elements;return{a:l[0][0],b:l[1][0],c:l[0][1],d:l[1][1],e:l[0][2],f:l[1][2]}};function h(l){return l.match(f)}function a(l){return Number(l).toFixed(6)}return c})();if(!$.zoomooz){$.zoomooz={}}$.zoomooz.helpers=(function(c,b){var a=["-moz-","-webkit-","-o-","-ms-"];b.forEachPrefix=function(f,g){for(var e=0;e<a.length;e++){f(a[e])}if(g){f("")}};b.getElementTransform=function(e){var f;b.forEachPrefix(function(g){f=f||c(e).css(g+"transform")},true);return f};return b})(jQuery,{});(function(e){var q;var z;var h=/([0-9.\-e]+)/g;var b=/([a-z]+)\(([^\)]+)\)/g;var u=/deg$/;var s=e.zoomooz.helpers;var r={duration:450,easing:"ease",nativeanimation:false};var o;jQuery.cssHooks.MsTransform={set:function(C,D){C.style.msTransform=D}};jQuery.cssHooks.MsTransformOrigin={set:function(C,D){C.style.msTransformOrigin=D}};e.fn.animateTransformation=function(D,C,G,E){C=jQuery.extend({},r,C);var F=(e.browser.webkit&&C.nativeanimation);if(o){clearTimeout(o);o=null}if(F&&G){o=setTimeout(G,C.duration)}this.each(function(){var H=e(this);if(!D){D=new PureCSSMatrix()}var I=y(H);var J=l(I,A(D));if(F){H.css(m(B(J),C.duration,C.easing));if(E){E()}}else{a(H,I,J,C,G,E)}})};e.fn.setTransformation=function(C){this.each(function(){var D=e(this);var E=y(D);var F=l(E,A(C));D.css(m(B(F)))})};function m(C,E,H){var G={};s.forEachPrefix(function(I){G[I+"transform"]=C},true);if(E){var D=n(E/1000,6)+"s";G["-webkit-transition-duration"]=D;G["-o-transition-duration"]=D;G["-moz-transition-duration"]=D}if(H){var F=x(H);G["-webkit-transition-timing-function"]=F;G["-o-transition-timing-function"]=F;G["-moz-transition-timing-function"]=D}return G}function a(C,D,G,E,H,F){if(!D){D=A(new PureCSSMatrix())}q=(new Date()).getTime();if(z){clearInterval(z);z=null}if(E.easing){E.easingfunction=v(E.easing,E.duration)}t(C,D,G,E,H);if(F){F()}z=setInterval(function(){t(C,D,G,E,H)},1)}function t(C,I,F,E,H){var G=(new Date()).getTime()-q;var D;if(E.easingfunction){D=E.easingfunction(G/E.duration)}else{D=G/E.duration}C.css(m(B(f(I,F,D))));if(G>E.duration){clearInterval(z);z=null;D=1;if(H){H()}}}function A(O){var D=O.elements();var P=D.a,M=D.b,K=D.c,J=D.d,I=D.e,H=D.f;if(Math.abs(P*J-M*K)<0.01){console.log("fail!");return}var G=I,F=H;var N=Math.sqrt(P*P+M*M);P=P/N;M=M/N;var E=P*K+M*J;K-=P*E;J-=M*E;var L=Math.sqrt(K*K+J*J);K=K/L;J=J/L;E=E/L;if((P*J-M*K)<0){P=-P;M=-M;K=-K;J=-J;N=-N;L=-L}var C=Math.atan2(M,P);return{tx:G,ty:F,r:C,k:Math.atan(E),sx:N,sy:L}}function B(C){var D="";D+="translate("+n(C.tx,6)+"px,"+n(C.ty,6)+"px) ";D+="rotate("+n(C.r,6)+"rad) skewX("+n(C.k,6)+"rad) ";D+="scale("+n(C.sx,6)+","+n(C.sy,6)+")";return D}function x(C){if((C instanceof Array)){return"cubic-bezier("+n(C[0],6)+","+n(C[1],6)+","+n(C[2],6)+","+n(C[3],6)+")"}else{return C}}function v(D,E){var F=[];if((D instanceof Array)){F=D}else{switch(D){case"linear":F=[0,0,1,1];break;case"ease":F=[0.25,0.1,0.25,1];break;case"ease-in":F=[0.42,0,1,1];break;case"ease-out":F=[0,0,0.58,1];break;case"ease-in-out":F=[0.42,0,0.58,1];break}}var C=function(G){return c(G,F[0],F[1],F[2],F[3],E)};return C}function g(F,H,G,D,J){var C,I,E=((1-F)*(1-F)*(1-F));C=H*(3*F*F*(1-F))+D*(3*F*(1-F)*(1-F))+E;I=G*(3*F*F*(1-F))+J*(3*F*(1-F)*(1-F))+E;return{x:Math.abs(C),y:Math.abs(I)}}function c(Q,E,D,M,L,C){var P=0,T=0,G=0,N=0,R=0,F=0;function K(U){return((P*U+T)*U+G)*U}function J(U){return((N*U+R)*U+F)*U}function S(U){return(3*P*U+2*T)*U+G}function O(U){return 1/(200*U)}function I(U,V){return J(H(U,V))}function H(ab,ac){var aa,Z,Y,V,U,X;function W(ad){if(ad>=0){return ad}else{return 0-ad}}for(Y=ab,X=0;X<8;X++){V=K(Y)-ab;if(W(V)<ac){return Y}U=S(Y);if(W(U)<0.000001){break}Y=Y-V/U}aa=0;Z=1;Y=ab;if(Y<aa){return aa}if(Y>Z){return Z}while(aa<Z){V=K(Y);if(W(V-ab)<ac){return Y}if(ab>V){aa=Y}else{Z=Y}Y=(Z-aa)*0.5+aa}return Y}G=3*E;T=3*(M-E)-G;P=1-G-T;F=3*D;R=3*(L-D)-F;N=1-F-R;return I(Q,O(C))}function y(E){var D=s.getElementTransform(E);var F;if(!D){F=new PureCSSMatrix()}else{F=new PureCSSMatrix(D)}var C=A(F);C.r=p(D);return C}function p(G){var F=0;var D;while((D=b.exec(G))!==null){var H=D[1].toLowerCase();var I=D[2].split(",");if(H=="matrix"){var J=H+"("+D[2]+")";F+=A(new PureCSSMatrix(J)).r}else{if(H=="rotate"){var E=I[0];var C=parseFloat(w(E));if(E.match(u)){C=(2*Math.PI)*C/360}F+=C}}}return F}function l(C,D){if(Math.abs(C.r-D.r)>Math.PI){if(D.r<C.r){while(Math.abs(C.r-D.r)>Math.PI){D.r+=(2*Math.PI)}}else{while(Math.abs(C.r-D.r)>Math.PI){D.r-=(2*Math.PI)}}}return D}function f(C,F,G){var E={};for(var D in C){if(C.hasOwnProperty(D)){E[D]=C[D]+(F[D]-C[D])*G}}return E}function n(E,C){C=Math.abs(parseInt(C,10))||0;var D=Math.pow(10,C);return Math.round(E*D)/D}function w(C){return C.match(h)}})(jQuery);(function(l){var g=l.zoomooz.helpers;var o=["duration","easing","nativeanimation"];m();if(!l.zoomooz){l.zoomooz={}}l.zoomooz.setup=function(u){l.zoomooz.defaultSettings=jQuery.extend(p(),u)};l.fn.zoomSettings=function(u){var v;this.each(function(){var w=l(this);v=s(w,u)});return v};l.fn.zoomTo=function(v,u){this.each(function(){var w=l(this);if(!u){v=w.zoomSettings(v)}h(w,v);if(v.debug){if(l("#debug").length===0){l(v.root).append('<div id="debug"><div>')}else{l("#debug").html("")}r(w,v)}else{if(l("#debug").length!==0){l("#debug").html("")}}});return this};function s(v,A){var z=jQuery.extend({},A);if(!l.zoomooz.defaultSettings){l.zoomooz.setup()}var y=l.zoomooz.defaultSettings;var u=jQuery.extend({},z);for(var x in y){if(y.hasOwnProperty(x)&&!u[x]){u[x]=v.data(x)}}for(var w=0;w<o.length;w++){var x=o[w];if(!u[x]){u[x]=v.data(x)}}return jQuery.extend({},y,u)}function m(){var v=document.createElement("style");v.type="text/css";var u="";g.forEachPrefix(function(w){u+=w+"transform-origin: 0 0;"},true);v.innerHTML="html {height:100%;}.noScroll{overflow:hidden !important;}body.noScroll,html.noScroll body{margin-right:15px;}* {"+u+"}";document.getElementsByTagName("head")[0].appendChild(v)}function p(){return{targetsize:0.9,scalemode:"both",root:l(document.body),debug:false,animationendcallback:null,closeclick:false}}function h(y,w){var A=b(y,w);var x;var z=null;f(w.root);if(y[0]!==w.root[0]){var u=e(y,w.root).inverse();x=c(y,u,w);if(w.animationendcallback){z=function(){w.animationendcallback.call(y[0])}}}else{x=(new PureCSSMatrix()).translate(-A.x,-A.y);z=function(){var C=l(w.root);var B=A.elem;B.removeClass("noScroll");C.setTransformation(new PureCSSMatrix());C.data("original-scroll",null);l(document).off("touchmove");if(B[0]==document.body||B[0]==window){window.scrollTo(A.x,A.y)}else{B.scrollLeft(A.x);B.scrollTop(A.y)}if(w.animationendcallback){w.animationendcallback.call(y[0])}}}var v=null;if(A&&A.animationstartedcallback){v=A.animationstartedcallback}l(w.root).animateTransformation(x,w,z,v)}function b(w,v){var A=v.root;var u=A.parent();if(w[0]===A[0]){var z=A.data("original-scroll");if(z){return z}else{return{elem:u,x:0,"y:":0}}}else{if(!A.data("original-scroll")){var y=A.scrollTop();var B=A.scrollLeft();var w=A;if(!y){y=u.scrollTop();B=u.scrollLeft();w=u}var z={elem:w,x:B,y:y};A.data("original-scroll",z);l(document).on("touchmove",function(C){C.preventDefault()});var x="translate(-"+B+"px,-"+y+"px)";g.forEachPrefix(function(C){A.css(C+"transform",x)});w.addClass("noScroll");z.animationstartedcallback=function(){if(w[0]==document.body||w[0]==document){window.scrollTo(0,0)}else{w.scrollLeft(0);w.scrollTop(0)}};return z}}}function f(z){var A=l(z).parent();var w=A.width();var y=A.height();var u=w/2;var v=y/2;var x=q(u)+"px "+q(v)+"px";g.forEachPrefix(function(B){z.css(B+"transform-origin",x)})}function c(H,D,G){var L=G.targetsize;var K=G.scalemode;var u=G.root;var I=l(u).parent();var C=I.width();var E=I.height();var v=C/H.outerWidth();var x=E/H.outerHeight();var M;if(K=="width"){M=L*v}else{if(K=="height"){M=L*x}else{if(K=="both"){M=L*Math.min(v,x)}else{if(K=="scale"){M=L}else{console.log("wrong zoommode");return}}}}var B=(C-H.outerWidth()*M)/2;var y=(E-H.outerHeight()*M)/2;var F=C/2;var w=E/2;var z=-parseFloat(u.css("margin-left"))||0;var J=-parseFloat(u.css("margin-top"))||0;var A=(new PureCSSMatrix()).translate(z,J).translate(-F,-w).translate(B,y).scale(M,M).multiply(D).translate(F,w);return A}function t(v,u,w){return[v.a*u+v.c*w+v.e,v.b*u+v.d*w+v.f]}function r(v,u){var w=e(v,u.root).elements();n(t(w,0,0));n(t(w,0,v.outerHeight()));n(t(w,v.outerWidth(),v.outerHeight()));n(t(w,v.outerWidth(),0))}function n(w){var u="width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";u+="left:"+w[0]+"px;top:"+w[1]+"px;";var v='<div class="debuglabel" style="'+u+'"></div>';l("#debug").append(v)}function e(C,G){var J=C[0];if(!J||!J.ownerDocument){return null}var I=new PureCSSMatrix();var v;if(J===J.ownerDocument.body){var L=jQuery.offset.bodyOffset(J);v=new PureCSSMatrix();v=v.translate(L.left,L.top);I=I.multiply(v);return I}var A;if(jQuery.offset.initialize){jQuery.offset.initialize();A={fixedPosition:jQuery.offset.supportsFixedPosition,doesNotAddBorder:jQuery.offset.doesNotAddBorder,doesAddBorderForTableAndCells:jQuery.support.doesAddBorderForTableAndCells,subtractsBorderForOverflowNotVisible:jQuery.offset.subtractsBorderForOverflowNotVisible}}else{A=jQuery.support}var u=J.offsetParent;var M=J.ownerDocument;var y;var K=M.documentElement;var B=M.body;var H=G[0];var F=M.defaultView;var x;if(F){x=F.getComputedStyle(J,null)}else{x=J.currentStyle}var D=J.offsetTop;var w=J.offsetLeft;var z=a().translate(w,D);z=z.multiply(a(J));I=z.multiply((I));while((J=J.parentNode)&&J!==H){D=0;w=0;if(A.fixedPosition&&x.position==="fixed"){break}y=F?F.getComputedStyle(J,null):J.currentStyle;D-=J.scrollTop;w-=J.scrollLeft;if(J===u){D+=J.offsetTop;w+=J.offsetLeft;if(A.doesNotAddBorder&&!(A.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.nodeName))){D+=parseFloat(y.borderTopWidth)||0;w+=parseFloat(y.borderLeftWidth)||0}u=J.offsetParent}if(A.subtractsBorderForOverflowNotVisible&&y.overflow!=="visible"){D+=parseFloat(y.borderTopWidth)||0;w+=parseFloat(y.borderLeftWidth)||0}x=y;if(J.offsetParent==H){D-=parseFloat(l(J.offsetParent).css("margin-top"))||0;w-=parseFloat(l(J.offsetParent).css("margin-left"))||0}z=a().translate(w,D);z=z.multiply(a(J));I=z.multiply(I)}D=0;w=0;if(x.position==="relative"||x.position==="static"){D+=B.offsetTop;w+=B.offsetLeft}if(A.fixedPosition&&x.position==="fixed"){D+=Math.max(K.scrollTop,B.scrollTop);w+=Math.max(K.scrollLeft,B.scrollLeft)}var E=(new PureCSSMatrix()).translate(w,D);I=I.multiply(E);return I}function q(u){return Number(u).toFixed(6)}function a(v){var u=g.getElementTransform(v);if(!u){return new PureCSSMatrix()}else{return new PureCSSMatrix(u)}}})(jQuery);(function(b){if(!b.zoomooz){b.zoomooz={}}var a=b.zoomooz.helpers;b.fn.zoomTarget=function(f){this.each(function(){var g=b(this).zoomSettings(f);c(b(this),b(this),g)})};function c(f,n,g){f.addClass("zoomTarget");if(!g.animationendcallback){if(!g.closeclick){g.animationendcallback=function(){b(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");f.addClass("selectedZoomTarget zoomNotClickable")}}else{g.animationendcallback=function(){b(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");f.addClass("selectedZoomTarget")}}}var m=n.closest(".zoomContainer");if(m.length!=0){g.root=m}var h=g.root;if(!h.hasClass("zoomTarget")){var l=h.zoomSettings({});l.animationendcallback=function(){var o=b(this);b(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");o.addClass("selectedZoomTarget zoomNotClickable");o.parent().addClass("selectedZoomTarget zoomNotClickable")};c(h,h,l);c(h.parent(),h,l);h.click()}f.on("click",function(o){if(g.closeclick&&n.hasClass("selectedZoomTarget")){g.root.click()}else{n.zoomTo(g)}o.stopPropagation()})}function e(){var f=document.createElement("style");f.type="text/css";function g(h){var l="-webkit-touch-callout: "+(h?"default":"none")+";";a.forEachPrefix(function(m){l+=m+"user-select:"+(h?"text":"none")+";"},true);return l}f.innerHTML=".zoomTarget{"+g(false)+"}.zoomTarget:hover{cursor:pointer!important;}.zoomNotClickable{"+g(true)+"}.zoomNotClickable:hover{cursor:auto!important;}.zoomContainer{position:relative;padding:1px;margin:-1px;}";document.getElementsByTagName("head")[0].appendChild(f)}e();b(document).ready(function(){b(".zoomTarget").zoomTarget()})})(jQuery);(function(a){if(!a.zoomooz){a.zoomooz={}}a.fn.zoomContainer=function(b){};a(document).ready(function(){a(".zoomContainer").zoomContainer()})})(jQuery);var Sylvester={version:"0.1.3",precision:0.000001};function Matrix(){}Matrix.prototype={dup:function(){return Matrix.create(this.elements)},canMultiplyFromLeft:function(a){var b=a.elements||a;if(typeof(b[0][0])=="undefined"){b=Matrix.create(b).elements}return(this.elements[0].length==b.length)},multiply:function(s){var l=s.modulus?true:false;var p=s.elements||s;if(typeof(p[0][0])=="undefined"){p=Matrix.create(p).elements}if(!this.canMultiplyFromLeft(p)){return null}var f=this.elements.length,g=f,n,b,e=p[0].length,h;var r=this.elements[0].length,a=[],o,m,q;do{n=g-f;a[n]=[];b=e;do{h=e-b;o=0;m=r;do{q=r-m;o+=this.elements[n][q]*p[q][h]}while(--m);a[n][h]=o}while(--b)}while(--f);var p=Matrix.create(a);return l?p.col(1):p},isSquare:function(){return(this.elements.length==this.elements[0].length)},toRightTriangular:function(){var g=this.dup(),e;var b=this.elements.length,c=b,f,h,l=this.elements[0].length,a;do{f=c-b;if(g.elements[f][f]==0){for(j=f+1;j<c;j++){if(g.elements[j][f]!=0){e=[];h=l;do{a=l-h;e.push(g.elements[f][a]+g.elements[j][a])}while(--h);g.elements[f]=e;break}}}if(g.elements[f][f]!=0){for(j=f+1;j<c;j++){var m=g.elements[j][f]/g.elements[f][f];e=[];h=l;do{a=l-h;e.push(a<=f?0:g.elements[j][a]-g.elements[f][a]*m)}while(--h);g.elements[j]=e}}}while(--b);return g},determinant:function(){if(!this.isSquare()){return null}var f=this.toRightTriangular();var c=f.elements[0][0],e=f.elements.length-1,a=e,b;do{b=a-e+1;c=c*f.elements[b][b]}while(--e);return c},isSingular:function(){return(this.isSquare()&&this.determinant()===0)},augment:function(n){var l=n.elements||n;if(typeof(l[0][0])=="undefined"){l=Matrix.create(l).elements}var f=this.dup(),m=f.elements[0].length;var c=f.elements.length,e=c,h,a,b=l[0].length,g;if(c!=l.length){return null}do{h=e-c;a=b;do{g=b-a;f.elements[h][m+g]=l[h][g]}while(--a)}while(--c);return f},inverse:function(){if(!this.isSquare()||this.isSingular()){return null}var c=this.elements.length,e=c,l,h;var m=this.augment(Matrix.I(c)).toRightTriangular();var n,o=m.elements[0].length,a,g,b;var q=[],f;do{l=c-1;g=[];n=o;q[l]=[];b=m.elements[l][l];do{a=o-n;f=m.elements[l][a]/b;g.push(f);if(a>=e){q[l].push(f)}}while(--n);m.elements[l]=g;for(h=0;h<l;h++){g=[];n=o;do{a=o-n;g.push(m.elements[h][a]-m.elements[l][a]*m.elements[h][l])}while(--n);m.elements[h]=g}}while(--c);return Matrix.create(q)},setElements:function(l){var o,a=l.elements||l;if(typeof(a[0][0])!="undefined"){var e=a.length,g=e,b,c,m;this.elements=[];do{o=g-e;b=a[o].length;c=b;this.elements[o]=[];do{m=c-b;this.elements[o][m]=a[o][m]}while(--b)}while(--e);return this}var f=a.length,h=f;this.elements=[];do{o=h-f;this.elements.push([a[o]])}while(--f);return this}};Matrix.create=function(a){var b=new Matrix();return b.setElements(a)};Matrix.I=function(g){var f=[],a=g,e,c,b;do{e=a-g;f[e]=[];c=a;do{b=a-c;f[e][b]=(e==b)?1:0}while(--c)}while(--g);return Matrix.create(f)};(function(f,h,m,n,b){var l={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(s){for(var p=0;p<s.length;p++){var q=s[p].string;var r=s[p].prop;this.versionSearchString=s[p].versionSearch||s[p].identity;if(q){if(q.indexOf(s[p].subString)!=-1){return s[p].identity}}else{if(r){return s[p].identity}}}},searchVersion:function(q){var p=q.indexOf(this.versionSearchString);if(p==-1){return}return parseFloat(q.substring(p+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:h.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};l.init();var o={MSIE:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"}},Firefox:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}},Chrome:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}},Safari:{Mac:{ctrlKey:true,altKey:false,metaKey:false,shiftKey:true,which:70,string:"^&#x2318;F",alt:"Control+Command+F"}},Opera:{Windows:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Linux:{ctrlKey:false,altKey:false,metaKey:false,shiftKey:false,which:122,string:"F11",alt:"F11"},Mac:{ctrlKey:false,altKey:false,metaKey:true,shiftKey:true,which:70,string:"&#x21E7;&#x2318;F",alt:"Shift+Command+F"}},};var g=function(){return(m.clientHeight==n&&m.clientWidth==b)||h.fullScreen||(h.outerHeight==n&&h.outerWidth==b)||(l.browser=="Safari"&&h.outerHeight==(n-40)&&h.outerWidth==b)},c=f(h);var a=o[l.browser][l.OS];var e={shortcut:a.string,longform:a.alt};c.data("fullscreen-state",g()).data("fullscreen-key",e).resize(function(){var p=g();if(c.data("fullscreen-state")&&!p){c.data("fullscreen-state",p).trigger("fullscreen-toggle",[false]).trigger("fullscreen-off")}else{if(!c.data("fullscreen-state")&&p){c.data("fullscreen-state",p).trigger("fullscreen-toggle",[true]).trigger("fullscreen-on")}}}).keydown(function(p){if(a&&p.ctrlKey==a.ctrlKey&&p.altKey==a.altKey&&p.metaKey==a.metaKey&&p.shiftKey==a.shiftKey&&p.which==a.which){c.trigger("fullscreen-key",[a.string,a.alt])}})})(jQuery,this,document.documentElement,screen.height,screen.width);(function(b,a,c){(function(e){if(typeof define==="function"&&define.amd){define(["jquery","imagesloaded"],e)}else{if(jQuery&&!jQuery.fn.qtip){e(jQuery)}}}(function(at){var Q=true,G=false,ae=null,Z="x",W="y",L="width",ay="height",q="top",e="left",au="bottom",n="right",I="center",v="flip",V="flipinvert",r="shift",z,az,ak,h,aF={},s="qtip",E="data-hasqtip",ac="data-qtip-id",aj=["ui-widget","ui-tooltip"],y="."+s,ad="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),B=s+"-fixed",O=s+"-default",M=s+"-focus",aE=s+"-hover",T=s+"-disabled",aD="_replacedByqTip",F="oldtitle",aC;BROWSER={ie:(function(){var C=3,X=a.createElement("div");while((X.innerHTML="<!--[if gt IE "+(++C)+"]><i></i><![endif]-->")){if(!X.getElementsByTagName("i")[0]){break}}return C>4?C:NaN}()),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||G};function aw(Y,X,aG,C){this.id=aG;this.target=Y;this.tooltip=ae;this.elements=elements={target:Y};this._id=s+"-"+aG;this.timers={img:{}};this.options=X;this.plugins={};this.cache=cache={event:{},target:at(),disabled:G,attr:C,onTooltip:G,lastClass:""};this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=G}az=aw.prototype;az.render=function(aI){if(this.rendered||this.destroyed){return this}var aL=this,aN=this.options,X=this.cache,C=this.elements,aK=aN.content.text,aH=aN.content.title,aG=aN.content.button,aJ=aN.position,Y="."+this._id+" ",aM=[];at.attr(this.target[0],"aria-describedby",this._id);this.tooltip=C.tooltip=tooltip=at("<div/>",{id:this._id,"class":[s,O,aN.style.classes,s+"-pos-"+aN.position.my.abbrev()].join(" "),width:aN.style.width||"",height:aN.style.height||"",tracking:aJ.target==="mouse"&&aJ.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":G,"aria-describedby":this._id+"-content","aria-hidden":Q}).toggleClass(T,this.disabled).attr(ac,this.id).data(s,this).appendTo(aJ.container).append(C.content=at("<div />",{"class":s+"-content",id:this._id+"-content","aria-atomic":Q}));this.rendered=-1;this.positioning=Q;if(aH){this._createTitle();if(!at.isFunction(aH)){aM.push(this._updateTitle(aH,G))}}if(aG){this._createButton()}if(!at.isFunction(aK)){aM.push(this._updateContent(aK,G))}this.rendered=Q;this._setWidget();at.each(aN.events,function(aO,aP){at.isFunction(aP)&&tooltip.bind((aO==="toggle"?["tooltipshow","tooltiphide"]:["tooltip"+aO]).join(Y)+Y,aP)});at.each(aF,function(aP){var aO;if(this.initialize==="render"&&(aO=this(aL))){aL.plugins[aP]=aO}});this._assignEvents();at.when.apply(at,aM).then(function(){aL._trigger("render");aL.positioning=G;if(!aL.hiddenDuringWait&&(aN.show.ready||aI)){aL.toggle(Q,X.event,G)}aL.hiddenDuringWait=G});z.api[this.id]=this;return this};az.destroy=function(C){if(this.destroyed){return this.target}function X(){if(this.destroyed){return}this.destroyed=Q;var Y=this.target,aG=Y.attr(F);if(this.rendered){this.tooltip.stop(1,0).find("*").remove().end().remove()}at.each(this.plugins,function(aH){this.destroy&&this.destroy()});clearTimeout(this.timers.show);clearTimeout(this.timers.hide);this._unassignEvents();Y.removeData(s).removeAttr(ac).removeAttr("aria-describedby");if(this.options.suppress&&aG){Y.attr("title",aG).removeAttr(F)}this._unbind(Y);this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=ae;delete z.api[this.id]}if(C!==Q&&this.rendered){tooltip.one("tooltiphidden",at.proxy(X,this));!this.triggering&&this.hide()}else{X.call(this)}return this.target};function A(C){return C===ae||at.type(C)!=="object"}function P(C){return !(at.isFunction(C)||(C&&C.attr)||C.length||(at.type(C)==="object"&&(C.jquery||C.then)))}function w(Y){var X,aH,aG,C;if(A(Y)){return G}if(A(Y.metadata)){Y.metadata={type:Y.metadata}}if("content" in Y){X=Y.content;if(A(X)||X.jquery||X.done){X=Y.content={text:(aH=P(X)?G:X)}}else{aH=X.text}if("ajax" in X){aG=X.ajax;C=aG&&aG.once!==G;delete X.ajax;X.text=function(aK,aJ){var aL=aH||at(this).attr(aJ.options.content.attr)||"Loading...",aI=at.ajax(at.extend({},aG,{context:aJ})).then(aG.success,ae,aG.error).then(function(aM){if(aM&&C){aJ.set("content.text",aM)}return aM},function(aO,aM,aN){if(aJ.destroyed||aO.status===0){return}aJ.set("content.text",aM+": "+aN)});return !C?(aJ.set("content.text",aL),aI):aL}}if("title" in X){if(!A(X.title)){X.button=X.title.button;X.title=X.title.text}if(P(X.title||G)){X.title=G}}}if("position" in Y&&A(Y.position)){Y.position={my:Y.position,at:Y.position}}if("show" in Y&&A(Y.show)){Y.show=Y.show.jquery?{target:Y.show}:Y.show===Q?{ready:Q}:{event:Y.show}}if("hide" in Y&&A(Y.hide)){Y.hide=Y.hide.jquery?{target:Y.hide}:{event:Y.hide}}if("style" in Y&&A(Y.style)){Y.style={classes:Y.style}}at.each(aF,function(){this.sanitize&&this.sanitize(Y)});return Y}h=az.checks={builtin:{"^id$":function(aG,aH,X,Y){var aI=X===Q?z.nextid:X,C=s+"-"+aI;if(aI!==G&&aI.length>0&&!at("#"+C).length){this._id=C;if(this.rendered){this.tooltip[0].id=this._id;this.elements.content[0].id=this._id+"-content";this.elements.title[0].id=this._id+"-title"}}else{aG[aH]=Y}},"^prerender":function(X,Y,C){C&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(X,Y,C){this._updateContent(C)},"^content.attr$":function(Y,aG,C,X){if(this.options.content.text===this.target.attr(X)){this._updateContent(this.target.attr(C))}},"^content.title$":function(X,Y,C){if(!C){return this._removeTitle()}C&&!this.elements.title&&this._createTitle();this._updateTitle(C)},"^content.button$":function(X,Y,C){this._updateButton(C)},"^content.title.(text|button)$":function(X,Y,C){this.set("content."+Y,C)},"^position.(my|at)$":function(X,Y,C){"string"===typeof C&&(X[Y]=new ak(C,Y==="at"))},"^position.container$":function(X,Y,C){this.tooltip.appendTo(C)},"^show.ready$":function(X,Y,C){C&&(!this.rendered&&this.render(Q)||this.toggle(Q))},"^style.classes$":function(Y,aG,C,X){this.tooltip.removeClass(X).addClass(C)},"^style.width|height":function(X,Y,C){this.tooltip.css(Y,C)},"^style.widget|content.title":function(){this._setWidget()},"^style.def":function(X,Y,C){this.tooltip.toggleClass(O,!!C)},"^events.(render|show|move|hide|focus|blur)$":function(X,Y,C){tooltip[(at.isFunction(C)?"":"un")+"bind"]("tooltip"+Y,C)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var C=this.options.position;tooltip.attr("tracking",C.target==="mouse"&&C.adjust.mouse);this._unassignEvents();this._assignEvents()}}};function am(C,aG){var X=0,aI,Y=C,aH=aG.split(".");while(Y=Y[aH[X++]]){if(X<aH.length){aI=Y}}return[aI||C,aH.pop()]}az.get=function(X){if(this.destroyed){return this}var Y=am(this.options,X.toLowerCase()),C=Y[0][Y[1]];return C.precedance?C.string():C};function ab(aG,X){var Y,aH,C;for(Y in this.checks){for(aH in this.checks[Y]){if(C=(new RegExp(aH,"i")).exec(aG)){X.push(C);if(Y==="builtin"||this.plugins[Y]){this.checks[Y][aH].apply(this.plugins[Y]||this,X)}}}}}var x=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,t=/^prerender|show\.ready/i;az.set=function(aH,aI){if(this.destroyed){return this}var aJ=this.rendered,C=G,aG=this.options,Y=this.checks,X;if("string"===typeof aH){X=aH;aH={};aH[X]=aI}else{aH=at.extend({},aH)}at.each(aH,function(aL,aM){if(!aJ&&!t.test(aL)){delete aH[aL];return}var aN=am(aG,aL.toLowerCase()),aK;aK=aN[0][aN[1]];aN[0][aN[1]]=aM&&aM.nodeType?at(aM):aM;C=x.test(aL)||C;aH[aL]=[aN[0],aN[1],aM,aK]});w(aG);this.positioning=Q;at.each(aH,at.proxy(ab,this));this.positioning=G;if(this.rendered&&this.tooltip[0].offsetWidth>0&&C){this.reposition(aG.position.target==="mouse"?ae:this.cache.event)}return this};az._update=function(aH,aG,C){var Y=this,X=this.cache;if(!this.rendered||!aH){return G}if(at.isFunction(aH)){aH=aH.call(this.elements.target,X.event,this)||""}if(at.isFunction(aH.then)){X.waiting=Q;return aH.then(function(aI){X.waiting=G;return Y._update(aI,aG)},ae,function(aI){return Y._update(aI,aG)})}if(aH===G||(!aH&&aH!=="")){return G}if(aH.jquery&&aH.length>0){aG.children().detach().end().append(aH.css({display:"block"}))}else{aG.html(aH)}X.waiting=Q;return(at.fn.imagesLoaded?aG.imagesLoaded():at.Deferred().resolve(at([]))).done(function(aI){X.waiting=G;if(aI.length&&Y.rendered&&Y.tooltip[0].offsetWidth>0){Y.reposition(X.event,!aI.length)}}).promise()};az._updateContent=function(X,C){this._update(X,this.elements.content,C)};az._updateTitle=function(X,C){if(this._update(X,this.elements.title,C)===G){this._removeTitle(G)}};az._createTitle=function(){var C=this.elements,X=this._id+"-title";if(C.titlebar){this._removeTitle()}C.titlebar=at("<div />",{"class":s+"-titlebar "+(this.options.style.widget?aA("header"):"")}).append(C.title=at("<div />",{id:X,"class":s+"-title","aria-atomic":Q})).insertBefore(C.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(Y){at(this).toggleClass("ui-state-active ui-state-focus",Y.type.substr(-4)==="down")}).delegate(".qtip-close","mouseover mouseout",function(Y){at(this).toggleClass("ui-state-hover",Y.type==="mouseover")});if(this.options.content.button){this._createButton()}};az._removeTitle=function(C){var X=this.elements;if(X.title){X.titlebar.remove();X.titlebar=X.title=X.button=ae;if(C!==G){this.reposition()}}};az.reposition=function(aV,aS){if(!this.rendered||this.positioning||this.destroyed){return this}this.positioning=Q;var aR=this.cache,aH=this.tooltip,aY=this.options.position,a0=aY.target,aP=aY.my,aQ=aY.at,aX=aY.viewport,aN=aY.container,aT=aY.adjust,X=aT.method.split(" "),aW=aH.outerWidth(G),aU=aH.outerHeight(G),aJ=0,aK=0,Y=aH.css("position"),aZ={left:0,top:0},C=aH[0].offsetWidth>0,aO=aV&&aV.type==="scroll",aG=at(b),a1=aN[0].ownerDocument,aM=this.mouse,aL,aI;if(at.isArray(a0)&&a0.length===2){aQ={x:e,y:q};aZ={left:a0[0],top:a0[1]}}else{if(a0==="mouse"&&((aV&&aV.pageX)||aR.event.pageX)){aQ={x:e,y:q};aV=aM&&aM.pageX&&(aT.mouse||!aV||!aV.pageX)?aM:(aV&&(aV.type==="resize"||aV.type==="scroll")?aR.event:aV&&aV.pageX&&aV.type==="mousemove"?aV:(!aT.mouse||this.options.show.distance)&&aR.origin&&aR.origin.pageX?aR.origin:aV)||aV||aR.event||aM||{};if(Y!=="static"){aZ=aN.offset()}if(a1.body.offsetWidth!==(b.innerWidth||a1.documentElement.clientWidth)){aI=at(a1.body).offset()}aZ={left:aV.pageX-aZ.left+(aI&&aI.left||0),top:aV.pageY-aZ.top+(aI&&aI.top||0)};if(aT.mouse&&aO){aZ.left-=aM.scrollX-aG.scrollLeft();aZ.top-=aM.scrollY-aG.scrollTop()}}else{if(a0==="event"&&aV&&aV.target&&aV.type!=="scroll"&&aV.type!=="resize"){aR.target=at(aV.target)}else{if(a0!=="event"){aR.target=at(a0.jquery?a0:elements.target)}}a0=aR.target;a0=at(a0).eq(0);if(a0.length===0){return this}else{if(a0[0]===a||a0[0]===b){aJ=BROWSER.iOS?b.innerWidth:a0.width();aK=BROWSER.iOS?b.innerHeight:a0.height();if(a0[0]===b){aZ={top:(aX||a0).scrollTop(),left:(aX||a0).scrollLeft()}}}else{if(aF.imagemap&&a0.is("area")){aL=aF.imagemap(this,a0,aQ,aF.viewport?X:G)}else{if(aF.svg&&a0[0].ownerSVGElement){aL=aF.svg(this,a0,aQ,aF.viewport?X:G)}else{aJ=a0.outerWidth(G);aK=a0.outerHeight(G);aZ=a0.offset()}}}}if(aL){aJ=aL.width;aK=aL.height;aI=aL.offset;aZ=aL.position}aZ=this.reposition.offset(a0,aZ,aN);if((BROWSER.iOS>3.1&&BROWSER.iOS<4.1)||(BROWSER.iOS>=4.3&&BROWSER.iOS<4.33)||(!BROWSER.iOS&&Y==="fixed")){aZ.left-=aG.scrollLeft();aZ.top-=aG.scrollTop()}if(!aL||(aL&&aL.adjustable!==G)){aZ.left+=aQ.x===n?aJ:aQ.x===I?aJ/2:0;aZ.top+=aQ.y===au?aK:aQ.y===I?aK/2:0}}}aZ.left+=aT.x+(aP.x===n?-aW:aP.x===I?-aW/2:0);aZ.top+=aT.y+(aP.y===au?-aU:aP.y===I?-aU/2:0);if(aF.viewport){aZ.adjusted=aF.viewport(this,aZ,aY,aJ,aK,aW,aU);if(aI&&aZ.adjusted.left){aZ.left+=aI.left}if(aI&&aZ.adjusted.top){aZ.top+=aI.top}}else{aZ.adjusted={left:0,top:0}}if(!this._trigger("move",[aZ,aX.elem||aX],aV)){return this}delete aZ.adjusted;if(aS===G||!C||isNaN(aZ.left)||isNaN(aZ.top)||a0==="mouse"||!at.isFunction(aY.effect)){aH.css(aZ)}else{if(at.isFunction(aY.effect)){aY.effect.call(aH,this,at.extend({},aZ));aH.queue(function(a2){at(this).css({opacity:"",height:""});if(BROWSER.ie){this.style.removeAttribute("filter")}a2()})}}this.positioning=G;return this};az.reposition.offset=function(aG,aK,X){if(!X[0]){return aK}var aN=at(aG[0].ownerDocument),aJ=!!BROWSER.ie&&a.compatMode!=="CSS1Compat",aM=X[0],Y,aI,C,aH;function aL(aP,aO){aK.left+=aO*aP.scrollLeft();aK.top+=aO*aP.scrollTop()}do{if((aI=at.css(aM,"position"))!=="static"){if(aI==="fixed"){C=aM.getBoundingClientRect();aL(aN,-1)}else{C=at(aM).position();C.left+=(parseFloat(at.css(aM,"borderLeftWidth"))||0);C.top+=(parseFloat(at.css(aM,"borderTopWidth"))||0)}aK.left-=C.left+(parseFloat(at.css(aM,"marginLeft"))||0);aK.top-=C.top+(parseFloat(at.css(aM,"marginTop"))||0);if(!Y&&(aH=at.css(aM,"overflow"))!=="hidden"&&aH!=="visible"){Y=at(aM)}}}while((aM=aM.offsetParent));if(Y&&(Y[0]!==aN[0]||aJ)){aL(Y,1)}return aK};var ag=(ak=az.reposition.Corner=function(X,C){X=(""+X).replace(/([A-Z])/," $1").replace(/middle/gi,I).toLowerCase();this.x=(X.match(/left|right/i)||X.match(/center/)||["inherit"])[0].toLowerCase();this.y=(X.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();this.forceY=!!C;var Y=X.charAt(0);this.precedance=(Y==="t"||Y==="b"?W:Z)}).prototype;ag.invert=function(X,C){this[X]=this[X]===e?n:this[X]===n?e:C||this[X]};ag.string=function(){var C=this.x,X=this.y;return C===X?C:this.precedance===W||(this.forceY&&X!=="center")?X+" "+C:C+" "+X};ag.abbrev=function(){var C=this.string().split(" ");return C[0].charAt(0)+(C[1]&&C[1].charAt(0)||"")};ag.clone=function(){return new ak(this.string(),this.forceY)};az.toggle=function(aI,aQ){var aO=this.cache,X=this.options,aH=this.tooltip;if(aQ){if((/over|enter/).test(aQ.type)&&(/out|leave/).test(aO.event.type)&&X.show.target.add(aQ.target).length===X.show.target.length&&aH.has(aQ.relatedTarget).length){return this}aO.event=at.extend({},aQ)}this.waiting&&!aI&&(this.hiddenDuringWait=Q);if(!this.rendered){return aI?this.render(1):this}else{if(this.destroyed||this.disabled){return this}}var aG=aI?"show":"hide",aN=this.options[aG],aM=this.options[!aI?"show":"hide"],aS=this.options.position,aK=this.options.content,aP=this.tooltip.css("width"),C=this.tooltip[0].offsetWidth>0,aJ=aI||aN.target.length===1,aL=!aQ||aN.target.length<2||aO.target[0]===aQ.target,aR,aU,Y,aT;if((typeof aI).search("boolean|number")){aI=!C}aR=!aH.is(":animated")&&C===aI&&aL;aU=!aR?!!this._trigger(aG,[90]):ae;if(aU!==G&&aI){this.focus(aQ)}if(!aU||aR){return this}at.attr(aH[0],"aria-hidden",!!!aI);if(aI){aO.origin=at.extend({},this.mouse);if(at.isFunction(aK.text)){this._updateContent(aK.text,G)}if(at.isFunction(aK.title)){this._updateTitle(aK.title,G)}if(!aC&&aS.target==="mouse"&&aS.adjust.mouse){at(a).bind("mousemove."+s,this._storeMouse);aC=Q}if(!aP){aH.css("width",aH.outerWidth(G))}this.reposition(aQ,arguments[2]);if(!aP){aH.css("width","")}if(!!aN.solo){(typeof aN.solo==="string"?at(aN.solo):at(y,aN.solo)).not(aH).not(aN.target).qtip("hide",at.Event("tooltipsolo"))}}else{clearTimeout(this.timers.show);delete aO.origin;if(aC&&!at(y+'[tracking="true"]:visible',aN.solo).not(aH).length){at(a).unbind("mousemove."+s);aC=G}this.blur(aQ)}after=at.proxy(function(){if(aI){if(BROWSER.ie){aH[0].style.removeAttribute("filter")}aH.css("overflow","");if("string"===typeof aN.autofocus){at(this.options.show.autofocus,aH).focus()}this.options.show.target.trigger("qtip-"+this.id+"-inactive")}else{aH.css({display:"",visibility:"",opacity:"",left:"",top:""})}this._trigger(aI?"visible":"hidden")},this);if(aN.effect===G||aJ===G){aH[aG]();after()}else{if(at.isFunction(aN.effect)){aH.stop(1,1);aN.effect.call(aH,this);aH.queue("fx",function(aV){after();aV()})}else{aH.fadeTo(90,aI?1:0,after)}}if(aI){aN.target.trigger("qtip-"+this.id+"-inactive")}return this};az.show=function(C){return this.toggle(Q,C)};az.hide=function(C){return this.toggle(G,C)};az.focus=function(aG){if(!this.rendered||this.destroyed){return this}var aI=at(y),aH=this.tooltip,Y=parseInt(aH[0].style.zIndex,10),X=z.zindex+aI.length,C;if(!aH.hasClass(M)){if(this._trigger("focus",[X],aG)){if(Y!==X){aI.each(function(){if(this.style.zIndex>Y){this.style.zIndex=this.style.zIndex-1}});aI.filter("."+M).qtip("blur",aG)}aH.addClass(M)[0].style.zIndex=X}}return this};az.blur=function(C){if(!this.rendered||this.destroyed){return this}this.tooltip.removeClass(M);this._trigger("blur",[this.tooltip.css("zIndex")],C);return this};az.disable=function(C){if(this.destroyed){return this}if("boolean"!==typeof C){C=!(this.tooltip.hasClass(T)||this.disabled)}if(this.rendered){this.tooltip.toggleClass(T,C).attr("aria-disabled",C)}this.disabled=!!C;return this};az.enable=function(){return this.disable(G)};az._createButton=function(){var X=this,aH=this.elements,aG=aH.tooltip,Y=this.options.content.button,C=typeof Y==="string",aI=C?Y:"Close tooltip";if(aH.button){aH.button.remove()}if(Y.jquery){aH.button=Y}else{aH.button=at("<a />",{"class":"qtip-close "+(this.options.style.widget?"":s+"-icon"),title:aI,"aria-label":aI}).prepend(at("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"}))}aH.button.appendTo(aH.titlebar||aG).attr("role","button").click(function(aJ){if(!aG.hasClass(T)){X.hide(aJ)}return G})};az._updateButton=function(C){if(!this.rendered){return G}var X=this.elements.button;if(C){this._createButton()}else{X.remove()}};function aA(C){return aj.concat("").join(C?"-"+C+" ":" ")}az._setWidget=function(){var C=this.options.style.widget,aG=this.elements,Y=aG.tooltip,X=Y.hasClass(T);Y.removeClass(T);T=C?"ui-state-disabled":"qtip-disabled";Y.toggleClass(T,X);Y.toggleClass("ui-helper-reset "+aA(),C).toggleClass(O,this.options.style.def&&!C);if(aG.content){aG.content.toggleClass(aA("content"),C)}if(aG.titlebar){aG.titlebar.toggleClass(aA("header"),C)}if(aG.button){aG.button.toggleClass(s+"-icon",!C)}};function K(C){if(this.tooltip.hasClass(T)){return G}clearTimeout(this.timers.show);clearTimeout(this.timers.hide);var X=at.proxy(function(){this.toggle(Q,C)},this);if(this.options.show.delay>0){this.timers.show=setTimeout(X,this.options.show.delay)}else{X()}}function g(aG){if(this.tooltip.hasClass(T)){return G}var X=at(aG.relatedTarget),C=X.closest(y)[0]===this.tooltip[0],Y=X[0]===this.options.show.target[0];clearTimeout(this.timers.show);clearTimeout(this.timers.hide);if(this!==X[0]&&(this.options.position.target==="mouse"&&C)||(this.options.hide.fixed&&((/mouse(out|leave|move)/).test(aG.type)&&(C||Y)))){try{aG.preventDefault();aG.stopImmediatePropagation()}catch(aH){}return}var aI=at.proxy(function(){this.toggle(G,aG)},this);if(this.options.hide.delay>0){this.timers.hide=setTimeout(aI,this.options.hide.delay)}else{aI()}}function l(C){if(this.tooltip.hasClass(T)||!this.options.hide.inactive){return G}clearTimeout(this.timers.inactive);this.timers.inactive=setTimeout(at.proxy(function(){this.hide(C)},this),this.options.hide.inactive)}function ah(C){if(this.rendered&&this.tooltip[0].offsetWidth>0){this.reposition(C)}}az._storeMouse=function(C){this.mouse={pageX:C.pageX,pageY:C.pageY,type:"mousemove",scrollX:b.pageXOffset||a.body.scrollLeft||a.documentElement.scrollLeft,scrollY:b.pageYOffset||a.body.scrollTop||a.documentElement.scrollTop}};az._bind=function(C,Y,aI,aH,X){var aG="."+this._id+(aH?"-"+aH:"");Y.length&&at(C).bind((Y.split?Y:Y.join(aG+" "))+aG,at.proxy(aI,X||this))};az._unbind=function(C,X){at(C).unbind("."+this._id+(X?"-"+X:""))};var aa="."+s;function ap(C,X,Y){at(a.body).delegate(C,(X.split?X:X.join(aa+" "))+aa,function(){var aG=z.api[at.attr(this,ac)];aG&&!aG.disabled&&Y.apply(aG,arguments)})}at(function(){ap(y,["mouseenter","mouseleave"],function(X){var aG=X.type==="mouseenter",Y=at(X.currentTarget),aH=at(X.relatedTarget||X.target),C=this.options;if(aG){this.focus(X);Y.hasClass(B)&&!Y.hasClass(T)&&clearTimeout(this.timers.hide)}else{if(C.position.target==="mouse"&&C.hide.event&&C.show.target&&!aH.closest(C.show.target[0]).length){this.hide(X)}}Y.toggleClass(aE,aG)});ap("["+ac+"]",ad,l)});az._trigger=function(X,C,Y){var aG=at.Event("tooltip"+X);aG.originalEvent=(Y&&at.extend({},Y))||this.cache.event||ae;this.triggering=Q;this.tooltip.trigger(aG,[this].concat(C||[]));this.triggering=G;return !aG.isDefaultPrevented()};az._assignEvents=function(){var aP=this.options,aM=aP.position,aO=this.tooltip,aI=aP.show.target,aL=aP.hide.target,aJ=aM.container,Y=aM.viewport,aH=at(a),aG=at(a.body),aK=at(b),X=aP.show.event?at.trim(""+aP.show.event).split(" "):[],aN=aP.hide.event?at.trim(""+aP.hide.event).split(" "):[],C=[];if(/mouse(out|leave)/i.test(aP.hide.event)&&aP.hide.leave==="window"){this._bind(aH,["mouseout","blur"],function(aQ){if(!/select|option/.test(aQ.target.nodeName)&&!aQ.relatedTarget){this.hide(aQ)}})}if(aP.hide.fixed){aL=aL.add(aO.addClass(B))}else{if(/mouse(over|enter)/i.test(aP.show.event)){this._bind(aL,"mouseleave",function(){clearTimeout(this.timers.show)})}}if((""+aP.hide.event).indexOf("unfocus")>-1){this._bind(aJ.closest("html"),["mousedown","touchstart"],function(aT){var aS=at(aT.target),aR=this.rendered&&!this.tooltip.hasClass(T)&&this.tooltip[0].offsetWidth>0,aQ=aS.parents(y).filter(this.tooltip[0]).length>0;if(aS[0]!==this.target[0]&&aS[0]!==this.tooltip[0]&&!aQ&&!this.target.has(aS[0]).length&&aR){this.hide(aT)}})}if("number"===typeof aP.hide.inactive){this._bind(aI,"qtip-"+this.id+"-inactive",l);this._bind(aL.add(aO),z.inactiveEvents,l,"-inactive")}aN=at.map(aN,function(aR){var aQ=at.inArray(aR,X);if((aQ>-1&&aL.add(aI).length===aL.length)){C.push(X.splice(aQ,1)[0]);return}return aR});this._bind(aI,X,K);this._bind(aL,aN,g);this._bind(aI,C,function(aQ){(this.tooltip[0].offsetWidth>0?g:K).call(this,aQ)});this._bind(aI.add(aO),"mousemove",function(aT){if("number"===typeof aP.hide.distance){var aS=this.cache.origin||{},aR=this.options.hide.distance,aQ=Math.abs;if(aQ(aT.pageX-aS.pageX)>=aR||aQ(aT.pageY-aS.pageY)>=aR){this.hide(aT)}}this._storeMouse(aT)});if(aM.target==="mouse"){if(aM.adjust.mouse){if(aP.hide.event){this._bind(aI,["mouseenter","mouseleave"],function(aQ){this.cache.onTarget=aQ.type==="mouseenter"})}this._bind(aH,"mousemove",function(aQ){if(this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(T)&&this.tooltip[0].offsetWidth>0){this.reposition(aQ)}})}}if(aM.adjust.resize||Y.length){this._bind(at.event.special.resize?Y:aK,"resize",ah)}if(aM.adjust.scroll){this._bind(aK.add(aM.container),"scroll",ah)}};az._unassignEvents=function(){var C=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],b,a];if(this.rendered){this._unbind(at([]).pushStack(at.grep(C,function(X){return typeof X==="object"})))}else{at(C[0]).unbind("."+this._id+"-create")}};function af(aG,X,C){var aH,aQ,aL,Y,aO,aI=at(a.body),aN=aG[0]===a?aI:aG,aM=(aG.metadata)?aG.metadata(C.metadata):ae,aP=C.metadata.type==="html5"&&aM?aM[C.metadata.name]:ae,aJ=aG.data(C.metadata.name||"qtipopts");try{aJ=typeof aJ==="string"?at.parseJSON(aJ):aJ}catch(aK){}Y=at.extend(Q,{},z.defaults,C,typeof aJ==="object"?w(aJ):ae,w(aP||aM));aQ=Y.position;Y.id=X;if("boolean"===typeof Y.content.text){aL=aG.attr(Y.content.attr);if(Y.content.attr!==G&&aL){Y.content.text=aL}else{return G}}if(!aQ.container.length){aQ.container=aI}if(aQ.target===G){aQ.target=aN}if(Y.show.target===G){Y.show.target=aN}if(Y.show.solo===Q){Y.show.solo=aQ.container.closest("body")}if(Y.hide.target===G){Y.hide.target=aN}if(Y.position.viewport===Q){Y.position.viewport=aQ.container}aQ.container=aQ.container.eq(0);aQ.at=new ak(aQ.at,Q);aQ.my=new ak(aQ.my);if(aG.data(s)){if(Y.overwrite){aG.qtip("destroy")}else{if(Y.overwrite===G){return G}}}aG.attr(E,X);if(Y.suppress&&(aO=aG.attr("title"))){aG.removeAttr("title").attr(F,aO).attr("title","")}aH=new aw(aG,Y,X,!!aL);aG.data(s,aH);aG.one("remove.qtip-"+X+" removeqtip.qtip-"+X,function(){var aR;if((aR=at(this).data(s))){aR.destroy()}});return aH}z=at.fn.qtip=function(X,aI,aJ){var aK=(""+X).toLowerCase(),aH=ae,C=at.makeArray(arguments).slice(1),aG=C[C.length-1],Y=this[0]?at.data(this[0],s):ae;if((!arguments.length&&Y)||aK==="api"){return Y}else{if("string"===typeof X){this.each(function(){var aL=at.data(this,s);if(!aL){return Q}if(aG&&aG.timeStamp){aL.cache.event=aG}if(aI&&(aK==="option"||aK==="options")){if(aJ!==c||at.isPlainObject(aI)){aL.set(aI,aJ)}else{aH=aL.get(aI);return G}}else{if(aL[aK]){aL[aK].apply(aL,C)}}});return aH!==ae?aH:this}else{if("object"===typeof X||!arguments.length){Y=w(at.extend(Q,{},X));return z.bind.call(this,Y,aG)}}}};z.bind=function(X,C){return this.each(function(aI){var aG,Y,aH,aK,aJ,aM;aM=at.isArray(X.id)?X.id[aI]:X.id;aM=!aM||aM===G||aM.length<1||z.api[aM]?z.nextid++:aM;aK=".qtip-"+aM+"-create";aJ=af(at(this),aM,X);if(aJ===G){return Q}else{z.api[aM]=aJ}aG=aJ.options;at.each(aF,function(){if(this.initialize==="initialize"){this(aJ)}});Y={show:aG.show.target,hide:aG.hide.target};aH={show:at.trim(""+aG.show.event).replace(/ /g,aK+" ")+aK,hide:at.trim(""+aG.hide.event).replace(/ /g,aK+" ")+aK};if(/mouse(over|enter)/i.test(aH.show)&&!/mouse(out|leave)/i.test(aH.hide)){aH.hide+=" mouseleave"+aK}Y.show.bind("mousemove"+aK,function(aN){aJ._storeMouse(aN);aJ.cache.onTarget=Q});function aL(aO){function aN(){aJ.render(typeof aO==="object"||aG.show.ready);Y.show.add(Y.hide).unbind(aK)}if(aJ.disabled){return G}aJ.cache.event=at.extend({},aO);aJ.cache.target=aO?at(aO.target):[c];if(aG.show.delay>0){clearTimeout(aJ.timers.show);aJ.timers.show=setTimeout(aN,aG.show.delay);if(aH.show!==aH.hide){Y.hide.bind(aH.hide,function(){clearTimeout(aJ.timers.show)})}}else{aN()}}Y.show.bind(aH.show,aL);if(aG.show.ready||aG.prerender){aL(C)}})};z.api={};at.each({attr:function(C,aH){if(this.length){var X=this[0],aG="title",Y=at.data(X,"qtip");if(C===aG&&Y&&"object"===typeof Y&&Y.options.suppress){if(arguments.length<2){return at.attr(X,F)}if(Y&&Y.options.content.attr===aG&&Y.cache.attr){Y.set("content.text",aH)}return this.attr(F,aH)}}return at.fn["attr"+aD].apply(this,arguments)},clone:function(X){var aG=at([]),Y="title",C=at.fn["clone"+aD].apply(this,arguments);if(!X){C.filter("["+F+"]").attr("title",function(){return at.attr(this,F)}).removeAttr(F)}return C}},function(X,Y){if(!Y||at.fn[X+aD]){return Q}var C=at.fn[X+aD]=at.fn[X];at.fn[X]=function(){return Y.apply(this,arguments)||C.apply(this,arguments)}});if(!at.ui){at["cleanData"+aD]=at.cleanData;at.cleanData=function(C){for(var X=0,Y;(Y=at(C[X])).length;X++){if(Y.attr(E)){try{Y.triggerHandler("removeqtip")}catch(aG){}}}at["cleanData"+aD].apply(this,arguments)}}z.version="2.1.1";z.nextid=0;z.inactiveEvents=ad;z.zindex=15000;z.defaults={prerender:G,id:G,overwrite:Q,suppress:Q,content:{text:Q,attr:"title",title:G,button:G},position:{my:"top left",at:"bottom right",target:G,container:G,viewport:G,adjust:{x:0,y:0,mouse:Q,scroll:Q,resize:Q,method:"flipinvert flipinvert"},effect:function(X,Y,C){at(this).animate(Y,{duration:200,queue:G})}},show:{target:G,event:"mouseenter",effect:Q,delay:90,solo:G,ready:G,autofocus:G},hide:{target:G,event:"mouseleave",effect:Q,delay:0,fixed:G,inactive:G,leave:"window",distance:G},style:{classes:"",widget:G,width:G,height:G,def:Q},events:{render:ae,move:ae,show:ae,hide:ae,toggle:ae,visible:ae,hidden:ae,focus:ae,blur:ae}};var m,S=".qtip-tip",N="margin",ax="border",ar="color",an="background-color",ai="transparent",aq=" !important",av=!!a.createElement("canvas").getContext,f=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;function U(C){return C.charAt(0).toUpperCase()+C.slice(1)}var D={},H=["Webkit","O","Moz","ms"];function o(aG,aJ){var C=aJ.charAt(0).toUpperCase()+aJ.slice(1),Y=(aJ+" "+H.join(C+" ")+C).split(" "),aI,aH,X=0;if(D[aJ]){return aG.css(D[aJ])}while((aI=Y[X++])){if((aH=aG.css(aI))!==c){return D[aJ]=aI,aH}}}function J(C,X){return parseInt(o(C,X),10)}if(!av){createVML=function(C,Y,X){return"<qtipvml:"+C+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(Y||"")+' style="behavior: url(#default#VML); '+(X||"")+'" />'}}function ao(X,C){this._ns="tip";this.options=C;this.offset=C.offset;this.size=[C.width,C.height];this.init((this.qtip=X))}at.extend(ao.prototype,{init:function(Y){var C,X;X=this.element=Y.elements.tip=at("<div />",{"class":s+"-tip"}).prependTo(Y.tooltip);if(av){C=at("<canvas />").appendTo(this.element)[0].getContext("2d");C.lineJoin="miter";C.miterLimit=100;C.save()}else{C=createVML("shape",'coordorigin="0,0"',"position:absolute;");this.element.html(C+C);Y._bind(at("*",X).add(X),["click","mousedown"],function(aG){aG.stopPropagation()},this._ns)}Y._bind(Y.tooltip,"tooltipmove",this.reposition,this._ns,this);this.create()},_swapDimensions:function(){this.size[0]=this.options.height;this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width;this.size[1]=this.options.height},_useTitle:function(C){var X=this.qtip.elements.titlebar;return X&&(C.y===q||(C.y===I&&this.element.position().top+(this.size[1]/2)+this.options.offset<X.outerHeight(Q)))},_parseCorner:function(C){var X=this.qtip.options.position.my;if(C===G||X===G){C=G}else{if(C===Q){C=new ak(X.string())}else{if(!C.string){C=new ak(C);C.fixed=Q}}}return C},_parseWidth:function(Y,X,C){var aG=this.qtip.elements,aH=ax+U(X)+"Width";return(C?J(C,aH):(J(aG.content,aH)||J(this._useTitle(Y)&&aG.titlebar||aG.content,aH)||J(tooltip,aH)))||0},_parseRadius:function(C){var X=this.qtip.elements,Y=ax+U(C.y)+U(C.x)+"Radius";return BROWSER.ie<9?0:J(this._useTitle(C)&&X.titlebar||X.content,Y)||J(X.tooltip,Y)||0},_invalidColour:function(C,aG,X){var Y=C.css(aG);return !Y||(X&&Y===C.css(X))||f.test(Y)?G:Y},_parseColours:function(aH){var aJ=this.qtip.elements,aI=this.element.css("cssText",""),aG=ax+U(aH[aH.precedance])+U(ar),X=this._useTitle(aH)&&aJ.titlebar||aJ.content,Y=this._invalidColour,C=[];C[0]=Y(aI,an)||Y(X,an)||Y(aJ.content,an)||Y(tooltip,an)||aI.css(an);C[1]=Y(aI,aG,ar)||Y(X,aG,ar)||Y(aJ.content,aG,ar)||Y(tooltip,aG,ar)||tooltip.css(aG);at("*",aI).add(aI).css("cssText",an+":"+ai+aq+";"+ax+":0"+aq+";");return C},_calculateSize:function(aM){var aK=aM.precedance===W,X=this.options[aK?"height":"width"],aN=this.options[aK?"width":"height"],aJ=aM.abbrev()==="c",C=X*(aJ?0.5:1),aG=Math.pow,aO=Math.round,aL,aI,aP,Y=Math.sqrt(aG(C,2)+aG(aN,2)),aH=[(this.border/C)*Y,(this.border/aN)*Y];aH[2]=Math.sqrt(aG(aH[0],2)-aG(this.border,2));aH[3]=Math.sqrt(aG(aH[1],2)-aG(this.border,2));aL=Y+aH[2]+aH[3]+(aJ?0:aH[0]);aI=aL/Y;aP=[aO(aI*X),aO(aI*aN)];return aK?aP:aP.reverse()},_calculateTip:function(aI){var aG=this.size[0],X=this.size[1],Y=Math.ceil(aG/2),aH=Math.ceil(X/2),C={br:[0,0,aG,X,aG,0],bl:[0,0,aG,0,0,X],tr:[0,X,aG,0,aG,X],tl:[0,0,0,X,aG,X],tc:[0,X,Y,0,aG,X],bc:[0,0,aG,0,Y,X],rc:[0,0,aG,aH,0,X],lc:[aG,0,aG,X,0,aH]};C.lt=C.br;C.rt=C.bl;C.lb=C.tr;C.rb=C.tl;return C[aI.abbrev()]},create:function(){var C=this.corner=(av||BROWSER.ie)&&this._parseCorner(this.options.corner);if((this.enabled=!!this.corner&&this.corner.abbrev()!=="c")){this.qtip.cache.corner=C.clone();this.update()}this.element.toggle(this.enabled);return this.corner},update:function(aN,aJ){if(!this.enabled){return this}var C=this.qtip.elements,aM=this.element,aR=aM.children(),aQ=this.options,aP=this.size,aS=aQ.mimic,aO=Math.round,aI,X,Y,aL,aG,aK,aH;if(!aN){aN=this.qtip.cache.corner||this.corner}if(aS===G){aS=aN}else{aS=new ak(aS);aS.precedance=aN.precedance;if(aS.x==="inherit"){aS.x=aN.x}else{if(aS.y==="inherit"){aS.y=aN.y}else{if(aS.x===aS.y){aS[aN.precedance]=aN[aN.precedance]}}}}X=aS.precedance;if(aN.precedance===Z){this._swapDimensions()}else{this._resetDimensions()}aI=this.color=this._parseColours(aN);if(aI[1]!==ai){aH=this.border=this._parseWidth(aN,aN[aN.precedance]);if(aQ.border&&aH<1){aI[0]=aI[1]}this.border=aH=aQ.border!==Q?aQ.border:aH}else{this.border=aH=0}aL=this._calculateTip(aS);aK=this.size=this._calculateSize(aN);aM.css({width:aK[0],height:aK[1],lineHeight:aK[1]+"px"});if(aN.precedance===W){aG=[aO(aS.x===e?aH:aS.x===n?aK[0]-aP[0]-aH:(aK[0]-aP[0])/2),aO(aS.y===q?aK[1]-aP[1]:0)]}else{aG=[aO(aS.x===e?aK[0]-aP[0]:0),aO(aS.y===q?aH:aS.y===au?aK[1]-aP[1]-aH:(aK[1]-aP[1])/2)]}if(av){aR.attr(L,aK[0]).attr(ay,aK[1]);Y=aR[0].getContext("2d");Y.restore();Y.save();Y.clearRect(0,0,3000,3000);Y.fillStyle=aI[0];Y.strokeStyle=aI[1];Y.lineWidth=aH*2;Y.translate(aG[0],aG[1]);Y.beginPath();Y.moveTo(aL[0],aL[1]);Y.lineTo(aL[2],aL[3]);Y.lineTo(aL[4],aL[5]);Y.closePath();if(aH){if(tooltip.css("background-clip")==="border-box"){Y.strokeStyle=aI[0];Y.stroke()}Y.strokeStyle=aI[1];Y.stroke()}Y.fill()}else{aL="m"+aL[0]+","+aL[1]+" l"+aL[2]+","+aL[3]+" "+aL[4]+","+aL[5]+" xe";aG[2]=aH&&/^(r|b)/i.test(aN.string())?BROWSER.ie===8?2:1:0;aR.css({coordsize:(aP[0]+aH)+" "+(aP[1]+aH),antialias:""+(aS.string().indexOf(I)>-1),left:aG[0]-(aG[2]*Number(X===Z)),top:aG[1]-(aG[2]*Number(X===W)),width:aP[0]+aH,height:aP[1]+aH}).each(function(aT){var aU=at(this);aU[aU.prop?"prop":"attr"]({coordsize:(aP[0]+aH)+" "+(aP[1]+aH),path:aL,fillcolor:aI[0],filled:!!aT,stroked:!aT}).toggle(!!(aH||aT));!aT&&aU.html(createVML("stroke",'weight="'+(aH*2)+'px" color="'+aI[1]+'" miterlimit="1000" joinstyle="miter"'))})}if(aJ!==G){this.calculate(aN)}},calculate:function(aK){if(!this.enabled){return G}var aL=this,C=this.qtip.elements,aJ=this.element,X=this.options.offset,Y=this.qtip.tooltip.hasClass("ui-widget"),aI={},aG,aM,aH;aK=aK||this.corner;aG=aK.precedance;aM=this._calculateSize(aK);aH=[aK.x,aK.y];if(aG===Z){aH.reverse()}at.each(aH,function(aQ,aP){var aN,aR,aO;if(aP===I){aN=aG===W?e:q;aI[aN]="50%";aI[N+"-"+aN]=-Math.round(aM[aG===W?0:1]/2)+X}else{aN=aL._parseWidth(aK,aP,C.tooltip);aR=aL._parseWidth(aK,aP,C.content);aO=aL._parseRadius(aK);aI[aP]=Math.max(-aL.border,aQ?aR:(X+(aO>aN?aO:-aN)))}});aI[aK[aG]]-=aM[aG===Z?0:1];aJ.css({margin:"",top:"",bottom:"",left:"",right:""}).css(aI);return aI},reposition:function(aG,aL,aO,aM){if(!this.enabled){return}var X=aL.cache,aQ=this.corner.clone(),aP=aO.adjusted,C=aL.options.position.adjust.method.split(" "),Y=C[0],aI=C[1]||C[0],aH={left:G,top:G,x:0,y:0},aJ,aK={},aN;if(this.corner.fixed!==Q){if(Y===r&&aQ.precedance===Z&&aP.left&&aQ.y!==I){aQ.precedance=aQ.precedance===Z?W:Z}else{if(Y!==r&&aP.left){aQ.x=aQ.x===I?(aP.left>0?e:n):(aQ.x===e?n:e)}}if(aI===r&&aQ.precedance===W&&aP.top&&aQ.x!==I){aQ.precedance=aQ.precedance===W?Z:W}else{if(aI!==r&&aP.top){aQ.y=aQ.y===I?(aP.top>0?q:au):(aQ.y===q?au:q)}}if(aQ.string()!==X.corner.string()&&(X.cornerTop!==aP.top||X.cornerLeft!==aP.left)){this.update(aQ,G)}}aJ=this.calculate(aQ,aP);if(aJ.right!==c){aJ.left=-aJ.right}if(aJ.bottom!==c){aJ.top=-aJ.bottom}aJ.user=this.offset;if(aH.left=(Y===r&&!!aP.left)){if(aQ.x===I){aK[N+"-left"]=aH.x=aJ[N+"-left"]-aP.left}else{aN=aJ.right!==c?[aP.left,-aJ.left]:[-aP.left,aJ.left];if((aH.x=Math.max(aN[0],aN[1]))>aN[0]){aO.left-=aP.left;aH.left=G}aK[aJ.right!==c?n:e]=aH.x}}if(aH.top=(aI===r&&!!aP.top)){if(aQ.y===I){aK[N+"-top"]=aH.y=aJ[N+"-top"]-aP.top}else{aN=aJ.bottom!==c?[aP.top,-aJ.top]:[-aP.top,aJ.top];if((aH.y=Math.max(aN[0],aN[1]))>aN[0]){aO.top-=aP.top;aH.top=G}aK[aJ.bottom!==c?au:q]=aH.y}}this.element.css(aK).toggle(!((aH.x&&aH.y)||(aQ.x===I&&aH.y)||(aQ.y===I&&aH.x)));aO.left-=aJ.left.charAt?aJ.user:Y!==r||aH.top||!aH.left&&!aH.top?aJ.left:0;aO.top-=aJ.top.charAt?aJ.user:aI!==r||aH.left||!aH.left&&!aH.top?aJ.top:0;X.cornerLeft=aP.left;X.cornerTop=aP.top;X.corner=aQ.clone()},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns);if(this.qtip.elements.tip){this.qtip.elements.tip.find("*").remove().end().remove()}}});m=aF.tip=function(C){return new ao(C,C.options.style.tip)};m.initialize="render";m.sanitize=function(C){if(C.style&&"tip" in C.style){opts=C.style.tip;if(typeof opts!=="object"){opts=C.style.tip={corner:opts}}if(!(/string|boolean/i).test(typeof opts.corner)){opts.corner=Q}}};h.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create();this.qtip.reposition()},"^style.tip.(height|width)$":function(C){this.size=size=[C.width,C.height];this.update();this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}};at.extend(Q,z.defaults,{style:{tip:{corner:Q,mimic:G,width:6,height:6,border:Q,offset:0}}});aF.polys={polygon:function(X,aN){var aO={width:0,height:0,position:{top:10000000000,right:0,bottom:0,left:10000000000},adjustable:G},aI=0,aJ,aM=[],aL=1,aK=1,aH=0,Y=0,aG,C;aI=X.length;while(aI--){aJ=[parseInt(X[--aI],10),parseInt(X[aI+1],10)];if(aJ[0]>aO.position.right){aO.position.right=aJ[0]}if(aJ[0]<aO.position.left){aO.position.left=aJ[0]}if(aJ[1]>aO.position.bottom){aO.position.bottom=aJ[1]}if(aJ[1]<aO.position.top){aO.position.top=aJ[1]}aM.push(aJ)}aG=aO.width=Math.abs(aO.position.right-aO.position.left);C=aO.height=Math.abs(aO.position.bottom-aO.position.top);if(aN.abbrev()==="c"){aO.position={left:aO.position.left+(aO.width/2),top:aO.position.top+(aO.height/2)}}else{while(aG>0&&C>0&&aL>0&&aK>0){aG=Math.floor(aG/2);C=Math.floor(C/2);if(aN.x===e){aL=aG}else{if(aN.x===n){aL=aO.width-aG}else{aL+=Math.floor(aG/2)}}if(aN.y===q){aK=C}else{if(aN.y===au){aK=aO.height-C}else{aK+=Math.floor(C/2)}}aI=aM.length;while(aI--){if(aM.length<2){break}aH=aM[aI][0]-aO.position.left;Y=aM[aI][1]-aO.position.top;if((aN.x===e&&aH>=aL)||(aN.x===n&&aH<=aL)||(aN.x===I&&(aH<aL||aH>(aO.width-aL)))||(aN.y===q&&Y>=aK)||(aN.y===au&&Y<=aK)||(aN.y===I&&(Y<aK||Y>(aO.height-aK)))){aM.splice(aI,1)}}}aO.position={left:aM[0][0],top:aM[0][1]}}return aO},rect:function(Y,X,aH,aG,C){return{width:Math.abs(aH-Y),height:Math.abs(aG-X),position:{left:Math.min(Y,aH),top:Math.min(X,aG)}}},_angles:{tc:3/2,tr:7/4,tl:5/4,bc:1/2,br:1/4,bl:3/4,rc:2,lc:1,c:0},ellipse:function(X,aK,aI,aH,aG){var aJ=aF.polys._angles[aG.abbrev()],Y=aI*Math.cos(aJ*Math.PI),C=aH*Math.sin(aJ*Math.PI);return{width:(aI*2)-Math.abs(Y),height:(aH*2)-Math.abs(C),position:{left:X+Y,top:aK+C},adjustable:G}},circle:function(C,aG,Y,X){return aF.polys.ellipse(C,aG,Y,Y,X)}};aF.svg=function(aK,aJ,aM,aG){var aL=at(a),Y=aJ[0],aN={},X,aI,aH,C;while(!Y.getBBox){Y=Y.parentNode}if(!Y.getBBox||!Y.parentNode){return G}switch(Y.nodeName){case"rect":aH=aF.svg.toPixel(Y,Y.x.baseVal.value,Y.y.baseVal.value);C=aF.svg.toPixel(Y,Y.x.baseVal.value+Y.width.baseVal.value,Y.y.baseVal.value+Y.height.baseVal.value);aN=aF.polys.rect(aH[0],aH[1],C[0],C[1],aM);break;case"ellipse":case"circle":aH=aF.svg.toPixel(Y,Y.cx.baseVal.value,Y.cy.baseVal.value);aN=aF.polys.ellipse(aH[0],aH[1],(Y.rx||Y.r).baseVal.value,(Y.ry||Y.r).baseVal.value,aM);break;case"line":case"polygon":case"polyline":points=Y.points||[{x:Y.x1.baseVal.value,y:Y.y1.baseVal.value},{x:Y.x2.baseVal.value,y:Y.y2.baseVal.value}];for(aN=[],i=-1,len=points.numberOfItems||points.length;++i<len;){next=points.getItem?points.getItem(i):points[i];aN.push.apply(aN,aF.svg.toPixel(Y,next.x,next.y))}aN=aF.polys.polygon(aN,aM);break;default:aI=Y.getBBox();mtx=Y.getScreenCTM();root=Y.farthestViewportElement||Y;if(!root.createSVGPoint){return G}point=root.createSVGPoint();point.x=aI.x;point.y=aI.y;tPoint=point.matrixTransform(mtx);aN.position={left:tPoint.x,top:tPoint.y};point.x+=aI.width;point.y+=aI.height;tPoint=point.matrixTransform(mtx);aN.width=tPoint.x-aN.position.left;aN.height=tPoint.y-aN.position.top;break}aN.position.left+=aL.scrollLeft();aN.position.top+=aL.scrollTop();return aN};aF.svg.toPixel=function(aI,Y,aJ){var aH=aI.getScreenCTM(),aG=aI.farthestViewportElement||aI,X,C;if(!aG.createSVGPoint){return G}C=aG.createSVGPoint();C.x=Y;C.y=aJ;X=C.matrixTransform(aH);return[X.x,X.y]};var R,p,u="qtip-modal",al="."+u;p=function(){var aL=this,aJ={},X,Y,aI,C;function aH(aO){if(at.expr[":"].focusable){return at.expr[":"].focusable}var aM=!isNaN(at.attr(aO,"tabindex")),aR=aO.nodeName&&aO.nodeName.toLowerCase(),aQ,aP,aN;if("area"===aR){aQ=aO.parentNode;aP=aQ.name;if(!aO.href||!aP||aQ.nodeName.toLowerCase()!=="map"){return false}aN=at("img[usemap=#"+aP+"]")[0];return !!aN&&aN.is(":visible")}return(/input|select|textarea|button|object/.test(aR)?!aO.disabled:"a"===aR?aO.href||aM:aM)}function aG(aM){if(aJ.length<1&&aM.length){aM.not("body").blur()}else{aJ.first().focus()}}function aK(aN){if(!C.is(":visible")){return}var aP=at(aN.target),aO=X.tooltip,aM=aP.closest(y),aQ;aQ=aM.length<1?G:(parseInt(aM[0].style.zIndex,10)>parseInt(aO[0].style.zIndex,10));if(!aQ&&aP.closest(y)[0]!==aO[0]){aG(aP)}Y=aN.target===aJ[aJ.length-1]}at.extend(aL,{init:function(){C=aL.elem=at("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return G}}).hide();function aM(){var aN=at(this);C.css({height:aN.height(),width:aN.width()})}at(b).bind("resize"+al,aM);aM();at(a.body).bind("focusin"+al,aK);at(a).bind("keydown"+al,function(aN){if(X&&X.options.show.modal.escape&&aN.keyCode===27){X.hide(aN)}});C.bind("click"+al,function(aN){if(X&&X.options.show.modal.blur){X.hide(aN)}});return aL},update:function(aM){X=aM;if(aM.options.show.modal.stealfocus!==G){aJ=aM.tooltip.find("*").filter(function(){return aH(this)})}else{aJ=[]}},toggle:function(aR,aM,aO){var aQ=at(a.body),aU=aR.tooltip,aW=aR.options.show.modal,aV=aW.effect,aS=aM?"show":"hide",aN=C.is(":visible"),aP=at(al).filter(":visible:not(:animated)").not(aU),aT;aL.update(aR);if(aM&&aW.stealfocus!==G){aG(at(":focus"))}C.toggleClass("blurs",aW.blur);if(aM){C.css({left:0,top:0}).appendTo(a.body)}if((C.is(":animated")&&aN===aM&&aI!==G)||(!aM&&aP.length)){return aL}C.stop(Q,G);if(at.isFunction(aV)){aV.call(C,aM)}else{if(aV===G){C[aS]()}else{C.fadeTo(parseInt(aO,10)||90,aM?1:0,function(){if(!aM){C.hide()}})}}if(!aM){C.queue(function(aX){C.css({left:"",top:""});if(!at(al).length){C.detach()}aX()})}aI=aM;if(X.destroyed){X=ae}return aL}});aL.init()};p=new p();function aB(X,C){this.options=C;this._ns="-modal";this.init((this.qtip=X))}at.extend(aB.prototype,{init:function(X){var C=X.tooltip;if(!this.options.on){return this}X.elements.overlay=p.elem;C.addClass(u).css("z-index",aF.modal.zindex+at(al).length);X._bind(C,["tooltipshow","tooltiphide"],function(aH,aG,aJ){var Y=aH.originalEvent;if(aH.target===C[0]){if(Y&&aH.type==="tooltiphide"&&/mouse(leave|enter)/.test(Y.type)&&at(Y.relatedTarget).closest(overlay[0]).length){try{aH.preventDefault()}catch(aI){}}else{if(!Y||(Y&&!Y.solo)){this.toggle(aH,aH.type==="tooltipshow",aJ)}}}},this._ns,this);X._bind(C,"tooltipfocus",function(aI,aH){if(aI.isDefaultPrevented()||aI.target!==C[0]){return}var aJ=at(al),aG=aF.modal.zindex+aJ.length,Y=parseInt(C[0].style.zIndex,10);p.elem[0].style.zIndex=aG-1;aJ.each(function(){if(this.style.zIndex>Y){this.style.zIndex-=1}});aJ.filter("."+M).qtip("blur",aI.originalEvent);C.addClass(M)[0].style.zIndex=aG;p.update(aH);try{aI.preventDefault()}catch(aK){}},this._ns,this);X._bind(C,"tooltiphide",function(Y){if(Y.target===C[0]){at(al).filter(":visible").not(C).last().qtip("focus",Y)}},this._ns,this)},toggle:function(C,X,Y){if(C&&C.isDefaultPrevented()){return this}p.toggle(this.qtip,!!X,Y)},destroy:function(){this.qtip.tooltip.removeClass(u);this.qtip._unbind(this.qtip.tooltip,this._ns);p.toggle(this.qtip,G);delete this.qtip.elements.overlay}});R=aF.modal=function(C){return new aB(C,C.options.show.modal)};R.sanitize=function(C){if(C.show){if(typeof C.show.modal!=="object"){C.show.modal={on:!!C.show.modal}}else{if(typeof C.show.modal.on==="undefined"){C.show.modal.on=Q}}}};R.zindex=z.zindex-200;R.initialize="render";h.modal={"^show.modal.(on|blur)$":function(){this.destroy();this.init();this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}};at.extend(Q,z.defaults,{show:{modal:{on:G,effect:Q,blur:Q,stealfocus:Q,escape:Q}}})}))}(window,document));(function(m){var f="0.4.2",n="hasOwnProperty",b=/[\.\/]/,a="*",h=function(){},g=function(q,p){return q-p},e,l,o={n:{}},c=function(p,F){p=String(p);var y=o,v=l,A=Array.prototype.slice.call(arguments,2),C=c.listeners(p),B=0,x=false,s,r=[],w={},t=[],q=e,D=[];e=p;l=0;for(var u=0,E=C.length;u<E;u++){if("zIndex" in C[u]){r.push(C[u].zIndex);if(C[u].zIndex<0){w[C[u].zIndex]=C[u]}}}r.sort(g);while(r[B]<0){s=w[r[B++]];t.push(s.apply(F,A));if(l){l=v;return t}}for(u=0;u<E;u++){s=C[u];if("zIndex" in s){if(s.zIndex==r[B]){t.push(s.apply(F,A));if(l){break}do{B++;s=w[r[B]];s&&t.push(s.apply(F,A));if(l){break}}while(s)}else{w[s.zIndex]=s}}else{t.push(s.apply(F,A));if(l){break}}}l=v;e=q;return t.length?t:null};c._events=o;c.listeners=function(p){var x=p.split(b),v=o,B,w,q,t,A,s,u,y,z=[v],r=[];for(t=0,A=x.length;t<A;t++){y=[];for(s=0,u=z.length;s<u;s++){v=z[s].n;w=[v[x[t]],v[a]];q=2;while(q--){B=w[q];if(B){y.push(B);r=r.concat(B.f||[])}}}z=y}return r};c.on=function(p,s){p=String(p);if(typeof s!="function"){return function(){}}var u=p.split(b),t=o;for(var q=0,r=u.length;q<r;q++){t=t.n;t=t.hasOwnProperty(u[q])&&t[u[q]]||(t[u[q]]={n:{}})}t.f=t.f||[];for(q=0,r=t.f.length;q<r;q++){if(t.f[q]==s){return h}}t.f.push(s);return function(v){if(+v==+v){s.zIndex=+v}}};c.f=function(q){var p=[].slice.call(arguments,1);return function(){c.apply(null,[q,null].concat(p).concat([].slice.call(arguments,0)))}};c.stop=function(){l=1};c.nt=function(p){if(p){return new RegExp("(?:\\.|\\/|^)"+p+"(?:\\.|\\/|$)").test(e)}return e};c.nts=function(){return e.split(b)};c.off=c.unbind=function(q,v){if(!q){c._events=o={n:{}};return}var x=q.split(b),w,z,r,t,A,s,u,y=[o];for(t=0,A=x.length;t<A;t++){for(s=0;s<y.length;s+=r.length-2){r=[s,1];w=y[s].n;if(x[t]!=a){if(w[x[t]]){r.push(w[x[t]])}}else{for(z in w){if(w[n](z)){r.push(w[z])}}}y.splice.apply(y,r)}}for(t=0,A=y.length;t<A;t++){w=y[t];while(w.n){if(v){if(w.f){for(s=0,u=w.f.length;s<u;s++){if(w.f[s]==v){w.f.splice(s,1);break}}!w.f.length&&delete w.f}for(z in w.n){if(w.n[n](z)&&w.n[z].f){var p=w.n[z].f;for(s=0,u=p.length;s<u;s++){if(p[s]==v){p.splice(s,1);break}}!p.length&&delete w.n[z].f}}}else{delete w.f;for(z in w.n){if(w.n[n](z)&&w.n[z].f){delete w.n[z].f}}}w=w.n}}};c.once=function(p,q){var r=function(){c.unbind(p,r);return q.apply(this,arguments)};return c.on(p,r)};c.version=f;c.toString=function(){return"You are running Eve "+f};(typeof module!="undefined"&&module.exports)?(module.exports=c):(typeof define!="undefined"?(define("eve",[],function(){return c})):(m.eve=c))})(this);(function(){function aT(E){if(aT.is(E,"function")){return aq?E():eve.on("raphael.DOMload",E)}else{if(aT.is(E,bf)){return aT._engine.create[bI](aT,E.splice(0,3+aT.is(E[0],aN))).add(E)}else{var b=Array.prototype.slice.call(arguments,0);if(aT.is(b[b.length-1],"function")){var g=b.pop();return aq?g.call(aT._engine.create[bI](aT,b)):eve.on("raphael.DOMload",function(){g.call(aT._engine.create[bI](aT,b))})}else{return aT._engine.create[bI](aT,arguments)}}}}aT.version="2.1.0";aT.eve=eve;var aq,a=/[, ]+/,by={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},bt=/\{(\d+)\}/g,bL="prototype",am="hasOwnProperty",aC={doc:document,win:window},u={was:Object.prototype[am].call(aC.win,"Raphael"),is:aC.win.Raphael},bH=function(){this.ca=this.customAttributes={}},a6,bq="appendChild",bI="apply",bG="concat",ab="createTouch" in aC.doc,aZ="",aS=" ",bJ=String,H="split",U="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[H](aS),bz={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},bM=bJ.prototype.toLowerCase,aw=Math,o=aw.max,bo=aw.min,ay=aw.abs,br=aw.pow,aX=aw.PI,aN="number",al="string",bf="array",a7="toString",bb="fill",a3=Object.prototype.toString,bB={},l="push",f=aT._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,C=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,ax={"NaN":1,"Infinity":1,"-Infinity":1},c=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,aj=aw.round,B="setAttribute",ap=parseFloat,W=parseInt,bv=bJ.prototype.toUpperCase,t=aT._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},au=aT._availableAnimAttrs={blur:aN,"clip-rect":"csv",cx:aN,cy:aN,fill:"colour","fill-opacity":aN,"font-size":aN,height:aN,opacity:aN,path:"path",r:aN,rx:aN,ry:aN,stroke:"colour","stroke-opacity":aN,"stroke-width":aN,transform:"transform",width:aN,x:aN,y:aN},ae=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,bk=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,p={hs:1,rg:1},bi=/,?([achlmqrstvxz]),?/gi,a2=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,ak=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,aR=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,aY=aT._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,aW={},bs=function(E,g){return E.key-g.key},w=function(E,g){return ap(E)-ap(g)},K=function(){},bD=function(b){return b},aB=aT._rectPath=function(b,S,g,E,R){if(R){return[["M",b+R,S],["l",g-R*2,0],["a",R,R,0,0,1,R,R],["l",0,E-R*2],["a",R,R,0,0,1,-R,R],["l",R*2-g,0],["a",R,R,0,0,1,-R,-R],["l",0,R*2-E],["a",R,R,0,0,1,R,-R],["z"]]}return[["M",b,S],["l",g,0],["l",0,E],["l",-g,0],["z"]]},M=function(b,R,E,g){if(g==null){g=E}return[["M",b,R],["m",0,-g],["a",E,g,0,1,1,0,2*g],["a",E,g,0,1,1,0,-2*g],["z"]]},P=aT._getPath={path:function(b){return b.attr("path")},circle:function(g){var b=g.attrs;return M(b.cx,b.cy,b.r)},ellipse:function(g){var b=g.attrs;return M(b.cx,b.cy,b.rx,b.ry)},rect:function(g){var b=g.attrs;return aB(b.x,b.y,b.width,b.height,b.r)},image:function(g){var b=g.attrs;return aB(b.x,b.y,b.width,b.height)},text:function(b){var g=b._getBBox();return aB(g.x,g.y,g.width,g.height)},set:function(b){var g=b._getBBox();return aB(g.x,g.y,g.width,g.height)}},N=aT.mapPath=function(bQ,bN){if(!bN){return bQ}var bO,S,E,b,bP,R,g;bQ=Y(bQ);for(E=0,bP=bQ.length;E<bP;E++){g=bQ[E];for(b=1,R=g.length;b<R;b+=2){bO=bN.x(g[b],g[b+1]);S=bN.y(g[b],g[b+1]);g[b]=bO;g[b+1]=S}}return bQ};aT._g=aC;aT.type=(aC.win.SVGAngle||aC.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");if(aT.type=="VML"){var aG=aC.doc.createElement("div"),aJ;aG.innerHTML='<v:shape adj="1"/>';aJ=aG.firstChild;aJ.style.behavior="url(#default#VML)";if(!(aJ&&typeof aJ.adj=="object")){return(aT.type=aZ)}aG=null}aT.svg=!(aT.vml=aT.type=="VML");aT._Paper=bH;aT.fn=a6=bH.prototype=aT.prototype;aT._id=0;aT._oid=0;aT.is=function(g,b){b=bM.call(b);if(b=="finite"){return !ax[am](+g)}if(b=="array"){return g instanceof Array}return(b=="null"&&g===null)||(b==typeof g&&g!==null)||(b=="object"&&g===Object(g))||(b=="array"&&Array.isArray&&Array.isArray(g))||a3.call(g).slice(8,-1).toLowerCase()==b};function Z(E){if(Object(E)!==E){return E}var g=new E.constructor;for(var b in E){if(E[am](b)){g[b]=Z(E[b])}}return g}aT.angle=function(S,bO,E,bN,g,R){if(g==null){var b=S-E,bP=bO-bN;if(!b&&!bP){return 0}return(180+aw.atan2(-bP,-b)*180/aX+360)%360}else{return aT.angle(S,bO,g,R)-aT.angle(E,bN,g,R)}};aT.rad=function(b){return b%360*aX/180};aT.deg=function(b){return b*180/aX%360};aT.snapTo=function(g,R,b){b=aT.is(b,"finite")?b:10;if(aT.is(g,bf)){var E=g.length;while(E--){if(ay(g[E]-R)<=b){return g[E]}}}else{g=+g;var S=R%g;if(S<b){return R-S}if(S>g-b){return R-S+g}}return R};var h=aT.createUUID=(function(b,g){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b,g).toUpperCase()}})(/[xy]/g,function(E){var g=aw.random()*16|0,b=E=="x"?g:(g&3|8);return b.toString(16)});aT.setWindow=function(b){eve("raphael.setWindow",aT,aC.win,b);aC.win=b;aC.doc=aC.win.document;if(aT._engine.initWin){aT._engine.initWin(aC.win)}};var bh=function(E){if(aT.vml){var b=/^\s+|\s+$/g;var S;try{var bN=new ActiveXObject("htmlfile");bN.write("<body>");bN.close();S=bN.body}catch(bO){S=createPopup().document.body}var g=S.createTextRange();bh=aI(function(bP){try{S.style.color=bJ(bP).replace(b,aZ);var bQ=g.queryCommandValue("ForeColor");bQ=((bQ&255)<<16)|(bQ&65280)|((bQ&16711680)>>>16);return"#"+("000000"+bQ.toString(16)).slice(-6)}catch(bR){return"none"}})}else{var R=aC.doc.createElement("i");R.title="Rapha\xebl Colour Picker";R.style.display="none";aC.doc.body.appendChild(R);bh=aI(function(bP){R.style.color=bP;return aC.doc.defaultView.getComputedStyle(R,aZ).getPropertyValue("color")})}return bh(E)},aK=function(){return"hsb("+[this.h,this.s,this.b]+")"},O=function(){return"hsl("+[this.h,this.s,this.l]+")"},z=function(){return this.hex},a0=function(bN,S,E){if(S==null&&aT.is(bN,"object")&&"r" in bN&&"g" in bN&&"b" in bN){E=bN.b;S=bN.g;bN=bN.r}if(S==null&&aT.is(bN,al)){var R=aT.getRGB(bN);bN=R.r;S=R.g;E=R.b}if(bN>1||S>1||E>1){bN/=255;S/=255;E/=255}return[bN,S,E]},a4=function(bN,S,E,bO){bN*=255;S*=255;E*=255;var R={r:bN,g:S,b:E,hex:aT.rgb(bN,S,E),toString:z};aT.is(bO,"finite")&&(R.opacity=bO);return R};aT.color=function(b){var g;if(aT.is(b,"object")&&"h" in b&&"s" in b&&"b" in b){g=aT.hsb2rgb(b);b.r=g.r;b.g=g.g;b.b=g.b;b.hex=g.hex}else{if(aT.is(b,"object")&&"h" in b&&"s" in b&&"l" in b){g=aT.hsl2rgb(b);b.r=g.r;b.g=g.g;b.b=g.b;b.hex=g.hex}else{if(aT.is(b,"string")){b=aT.getRGB(b)}if(aT.is(b,"object")&&"r" in b&&"g" in b&&"b" in b){g=aT.rgb2hsl(b);b.h=g.h;b.s=g.s;b.l=g.l;g=aT.rgb2hsb(b);b.v=g.b}else{b={hex:"none"};b.r=b.g=b.b=b.h=b.s=b.v=b.l=-1}}}b.toString=z;return b};aT.hsb2rgb=function(bO,bR,bP,S){if(this.is(bO,"object")&&"h" in bO&&"s" in bO&&"b" in bO){bP=bO.b;bR=bO.s;bO=bO.h;S=bO.o}bO*=360;var bN,bQ,g,E,b;bO=(bO%360)/60;b=bP*bR;E=b*(1-ay(bO%2-1));bN=bQ=g=bP-b;bO=~~bO;bN+=[b,E,0,0,E,b][bO];bQ+=[E,b,b,E,0,0][bO];g+=[0,0,E,b,b,E][bO];return a4(bN,bQ,g,S)};aT.hsl2rgb=function(bP,bR,bN,S){if(this.is(bP,"object")&&"h" in bP&&"s" in bP&&"l" in bP){bN=bP.l;bR=bP.s;bP=bP.h}if(bP>1||bR>1||bN>1){bP/=360;bR/=100;bN/=100}bP*=360;var bO,bQ,g,E,b;bP=(bP%360)/60;b=2*bR*(bN<0.5?bN:1-bN);E=b*(1-ay(bP%2-1));bO=bQ=g=bN-b/2;bP=~~bP;bO+=[b,E,0,0,E,b][bP];bQ+=[E,b,b,E,0,0][bP];g+=[0,0,E,b,b,E][bP];return a4(bO,bQ,g,S)};aT.rgb2hsb=function(bQ,bP,E){E=a0(bQ,bP,E);bQ=E[0];bP=E[1];E=E[2];var bO,bN,R,bR;R=o(bQ,bP,E);bR=R-bo(bQ,bP,E);bO=(bR==0?null:R==bQ?(bP-E)/bR:R==bP?(E-bQ)/bR+2:(bQ-bP)/bR+4);bO=((bO+360)%6)*60/360;bN=bR==0?0:bR/R;return{h:bO,s:bN,b:R,toString:aK}};aT.rgb2hsl=function(E,bP,bS){bS=a0(E,bP,bS);E=bS[0];bP=bS[1];bS=bS[2];var bT,bO,bR,bQ,bN,R;bQ=o(E,bP,bS);bN=bo(E,bP,bS);R=bQ-bN;bT=(R==0?null:bQ==E?(bP-bS)/R:bQ==bP?(bS-E)/R+2:(E-bP)/R+4);bT=((bT+360)%6)*60/360;bR=(bQ+bN)/2;bO=(R==0?0:bR<0.5?R/(2*bR):R/(2-2*bR));return{h:bT,s:bO,l:bR,toString:O}};aT._path2string=function(){return this.join(",").replace(bi,"$1")};function bm(R,E){for(var b=0,g=R.length;b<g;b++){if(R[b]===E){return R.push(R.splice(b,1)[0])}}}function aI(R,g,b){function E(){var S=Array.prototype.slice.call(arguments,0),bO=S.join("\u2400"),bN=E.cache=E.cache||{},bP=E.count=E.count||[];if(bN[am](bO)){bm(bP,bO);return b?b(bN[bO]):bN[bO]}bP.length>=1000&&delete bN[bP.shift()];bP.push(bO);bN[bO]=R[bI](g,S);return b?b(bN[bO]):bN[bO]}return E}var bx=aT._preload=function(E,g){var b=aC.doc.createElement("img");b.style.cssText="position:absolute;left:-9999em;top:-9999em";b.onload=function(){g.call(this);this.onload=null;aC.doc.body.removeChild(this)};b.onerror=function(){aC.doc.body.removeChild(this)};aC.doc.body.appendChild(b);b.src=E};function at(){return this.hex}aT.getRGB=aI(function(b){if(!b||!!((b=bJ(b)).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:at}}if(b=="none"){return{r:-1,g:-1,b:-1,hex:"none",toString:at}}!(p[am](b.toLowerCase().substring(0,2))||b.charAt()=="#")&&(b=bh(b));var S,g,E,bO,R,bQ,bP,bN=b.match(C);if(bN){if(bN[2]){bO=W(bN[2].substring(5),16);E=W(bN[2].substring(3,5),16);g=W(bN[2].substring(1,3),16)}if(bN[3]){bO=W((bQ=bN[3].charAt(3))+bQ,16);E=W((bQ=bN[3].charAt(2))+bQ,16);g=W((bQ=bN[3].charAt(1))+bQ,16)}if(bN[4]){bP=bN[4][H](bk);g=ap(bP[0]);bP[0].slice(-1)=="%"&&(g*=2.55);E=ap(bP[1]);bP[1].slice(-1)=="%"&&(E*=2.55);bO=ap(bP[2]);bP[2].slice(-1)=="%"&&(bO*=2.55);bN[1].toLowerCase().slice(0,4)=="rgba"&&(R=ap(bP[3]));bP[3]&&bP[3].slice(-1)=="%"&&(R/=100)}if(bN[5]){bP=bN[5][H](bk);g=ap(bP[0]);bP[0].slice(-1)=="%"&&(g*=2.55);E=ap(bP[1]);bP[1].slice(-1)=="%"&&(E*=2.55);bO=ap(bP[2]);bP[2].slice(-1)=="%"&&(bO*=2.55);(bP[0].slice(-3)=="deg"||bP[0].slice(-1)=="\xb0")&&(g/=360);bN[1].toLowerCase().slice(0,4)=="hsba"&&(R=ap(bP[3]));bP[3]&&bP[3].slice(-1)=="%"&&(R/=100);return aT.hsb2rgb(g,E,bO,R)}if(bN[6]){bP=bN[6][H](bk);g=ap(bP[0]);bP[0].slice(-1)=="%"&&(g*=2.55);E=ap(bP[1]);bP[1].slice(-1)=="%"&&(E*=2.55);bO=ap(bP[2]);bP[2].slice(-1)=="%"&&(bO*=2.55);(bP[0].slice(-3)=="deg"||bP[0].slice(-1)=="\xb0")&&(g/=360);bN[1].toLowerCase().slice(0,4)=="hsla"&&(R=ap(bP[3]));bP[3]&&bP[3].slice(-1)=="%"&&(R/=100);return aT.hsl2rgb(g,E,bO,R)}bN={r:g,g:E,b:bO,toString:at};bN.hex="#"+(16777216|bO|(E<<8)|(g<<16)).toString(16).slice(1);aT.is(R,"finite")&&(bN.opacity=R);return bN}return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:at}},aT);aT.hsb=aI(function(R,E,g){return aT.hsb2rgb(R,E,g).hex});aT.hsl=aI(function(E,g,b){return aT.hsl2rgb(E,g,b).hex});aT.rgb=aI(function(S,R,E){return"#"+(16777216|E|(R<<8)|(S<<16)).toString(16).slice(1)});aT.getColor=function(g){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:g||0.75},b=this.hsb2rgb(E.h,E.s,E.b);E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})}return b.hex};aT.getColor.reset=function(){delete this.start};function bd(E,bN){var S=[];for(var g=0,b=E.length;b-2*!bN>g;g+=2){var R=[{x:+E[g-2],y:+E[g-1]},{x:+E[g],y:+E[g+1]},{x:+E[g+2],y:+E[g+3]},{x:+E[g+4],y:+E[g+5]}];if(bN){if(!g){R[0]={x:+E[b-2],y:+E[b-1]}}else{if(b-4==g){R[3]={x:+E[0],y:+E[1]}}else{if(b-2==g){R[2]={x:+E[0],y:+E[1]};R[3]={x:+E[2],y:+E[3]}}}}}else{if(b-4==g){R[3]=R[2]}else{if(!g){R[0]={x:+E[g],y:+E[g+1]}}}}S.push(["C",(-R[0].x+6*R[1].x+R[2].x)/6,(-R[0].y+6*R[1].y+R[2].y)/6,(R[1].x+6*R[2].x-R[3].x)/6,(R[1].y+6*R[2].y-R[3].y)/6,R[2].x,R[2].y])}return S}aT.parsePathString=function(b){if(!b){return null}var E=aa(b);if(E.arr){return a1(E.arr)}var R={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},g=[];if(aT.is(b,bf)&&aT.is(b[0],bf)){g=a1(b)}if(!g.length){bJ(b).replace(a2,function(bN,S,bQ){var bP=[],bO=S.toLowerCase();bQ.replace(aR,function(bS,bR){bR&&bP.push(+bR)});if(bO=="m"&&bP.length>2){g.push([S][bG](bP.splice(0,2)));bO="l";S=S=="m"?"l":"L"}if(bO=="r"){g.push([S][bG](bP))}else{while(bP.length>=R[bO]){g.push([S][bG](bP.splice(0,R[bO])));if(!R[bO]){break}}}})}g.toString=aT._path2string;E.arr=a1(g);return g};aT.parseTransformString=aI(function(g){if(!g){return null}var E={r:3,s:4,t:2,m:6},b=[];if(aT.is(g,bf)&&aT.is(g[0],bf)){b=a1(g)}if(!b.length){bJ(g).replace(ak,function(S,R,bP){var bO=[],bN=bM.call(R);bP.replace(aR,function(bR,bQ){bQ&&bO.push(+bQ)});b.push([R][bG](bO))})}b.toString=aT._path2string;return b});var aa=function(g){var b=aa.ps=aa.ps||{};if(b[g]){b[g].sleep=100}else{b[g]={sleep:100}}setTimeout(function(){for(var E in b){if(b[am](E)&&E!=g){b[E].sleep--;!b[E].sleep&&delete b[E]}}});return b[g]};aT.findDotsAtSegment=function(g,b,b6,b4,bO,S,bR,bP,bZ){var bW=1-bZ,b1=br(bW,3),b2=br(bW,2),bT=bZ*bZ,bQ=bT*bZ,bV=b1*g+b2*3*bZ*b6+bW*3*bZ*bZ*bO+bQ*bR,bS=b1*b+b2*3*bZ*b4+bW*3*bZ*bZ*S+bQ*bP,b0=g+2*bZ*(b6-g)+bT*(bO-2*b6+g),bY=b+2*bZ*(b4-b)+bT*(S-2*b4+b),b5=b6+2*bZ*(bO-b6)+bT*(bR-2*bO+b6),b3=b4+2*bZ*(S-b4)+bT*(bP-2*S+b4),bX=bW*g+bZ*b6,bU=bW*b+bZ*b4,R=bW*bO+bZ*bR,E=bW*S+bZ*bP,bN=(90-aw.atan2(b0-b5,bY-b3)*180/aX);(b0>b5||bY<b3)&&(bN+=180);return{x:bV,y:bS,m:{x:b0,y:bY},n:{x:b5,y:b3},start:{x:bX,y:bU},end:{x:R,y:E},alpha:bN}};aT.bezierBBox=function(g,b,R,E,bQ,bO,bN,S){if(!aT.is(g,"array")){g=[g,b,R,E,bQ,bO,bN,S]}var bP=bc.apply(null,g);return{x:bP.min.x,y:bP.min.y,x2:bP.max.x,y2:bP.max.y,width:bP.max.x-bP.min.x,height:bP.max.y-bP.min.y}};aT.isPointInsideBBox=function(g,b,E){return b>=g.x&&b<=g.x2&&E>=g.y&&E<=g.y2};aT.isBBoxIntersect=function(E,g){var b=aT.isPointInsideBBox;return b(g,E.x,E.y)||b(g,E.x2,E.y)||b(g,E.x,E.y2)||b(g,E.x2,E.y2)||b(E,g.x,g.y)||b(E,g.x2,g.y)||b(E,g.x,g.y2)||b(E,g.x2,g.y2)||(E.x<g.x2&&E.x>g.x||g.x<E.x2&&g.x>E.x)&&(E.y<g.y2&&E.y>g.y||g.y<E.y2&&g.y>E.y)};function bl(b,bO,bN,S,R){var E=-3*bO+9*bN-9*S+3*R,g=b*E+6*bO-12*bN+6*S;return b*g-3*bO+3*bN}function s(bZ,S,bY,E,bX,g,bU,b,bR){if(bR==null){bR=1}bR=bR>1?1:bR<0?0:bR;var bS=bR/2,bT=12,bO=[-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],bW=[0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],R=0;for(var bV=0;bV<bT;bV++){var bP=bS*bO[bV]+bS,bQ=bl(bP,bZ,bY,bX,bU),b0=bl(bP,S,E,g,b),bN=bQ*bQ+b0*b0;R+=bW[bV]*aw.sqrt(bN)}return bS*R}function F(E,bT,g,bS,b,bQ,bV,bP,bR){if(bR<0||s(E,bT,g,bS,b,bQ,bV,bP)<bR){return}var bU=1,R=bU/2,bN=bU-R,S,bO=0.01;S=s(E,bT,g,bS,b,bQ,bV,bP,bN);while(ay(S-bR)>bO){R/=2;bN+=(S<bR?1:-1)*R;S=s(E,bT,g,bS,b,bQ,bV,bP,bN)}return bN}function Q(R,bU,E,bS,b,bR,bW,bQ){if(o(R,E)<bo(b,bW)||bo(R,E)>o(b,bW)||o(bU,bS)<bo(bR,bQ)||bo(bU,bS)>o(bR,bQ)){return}var bP=(R*bS-bU*E)*(b-bW)-(R-E)*(b*bQ-bR*bW),bO=(R*bS-bU*E)*(bR-bQ)-(bU-bS)*(b*bQ-bR*bW),S=(R-E)*(bR-bQ)-(bU-bS)*(b-bW);if(!S){return}var bV=bP/S,bT=bO/S,bN=+bV.toFixed(2),g=+bT.toFixed(2);if(bN<+bo(R,E).toFixed(2)||bN>+o(R,E).toFixed(2)||bN<+bo(b,bW).toFixed(2)||bN>+o(b,bW).toFixed(2)||g<+bo(bU,bS).toFixed(2)||g>+o(bU,bS).toFixed(2)||g<+bo(bR,bQ).toFixed(2)||g>+o(bR,bQ).toFixed(2)){return}return{x:bV,y:bT}}function aA(g,b){return ah(g,b)}function v(g,b){return ah(g,b,1)}function ah(b5,b4,b3){var R=aT.bezierBBox(b5),g=aT.bezierBBox(b4);if(!aT.isBBoxIntersect(R,g)){return b3?0:[]}var bY=s.apply(0,b5),bX=s.apply(0,b4),bP=~~(bY/5),bO=~~(bX/5),bV=[],bU=[],E={},b6=b3?0:[];for(var b0=0;b0<bP+1;b0++){var bW=aT.findDotsAtSegment.apply(aT,b5.concat(b0/bP));bV.push({x:bW.x,y:bW.y,t:b0/bP})}for(b0=0;b0<bO+1;b0++){bW=aT.findDotsAtSegment.apply(aT,b4.concat(b0/bO));bU.push({x:bW.x,y:bW.y,t:b0/bO})}for(b0=0;b0<bP;b0++){for(var bZ=0;bZ<bO;bZ++){var b2=bV[b0],b=bV[b0+1],b1=bU[bZ],bN=bU[bZ+1],bT=ay(b.x-b2.x)<0.001?"y":"x",bS=ay(bN.x-b1.x)<0.001?"y":"x",S=Q(b2.x,b2.y,b.x,b.y,b1.x,b1.y,bN.x,bN.y);if(S){if(E[S.x.toFixed(4)]==S.y.toFixed(4)){continue}E[S.x.toFixed(4)]=S.y.toFixed(4);var bR=b2.t+ay((S[bT]-b2[bT])/(b[bT]-b2[bT]))*(b.t-b2.t),bQ=b1.t+ay((S[bS]-b1[bS])/(bN[bS]-b1[bS]))*(bN.t-b1.t);if(bR>=0&&bR<=1&&bQ>=0&&bQ<=1){if(b3){b6++}else{b6.push({x:S.x,y:S.y,t1:bR,t2:bQ})}}}}}return b6}aT.pathIntersection=function(g,b){return G(g,b)};aT.pathIntersectionNumber=function(g,b){return G(g,b,1)};function G(E,b,bZ){E=aT._path2curve(E);b=aT._path2curve(b);var bX,bN,bW,R,bU,bO,g,bR,b3,b2,b4=bZ?0:[];for(var bV=0,bP=E.length;bV<bP;bV++){var b1=E[bV];if(b1[0]=="M"){bX=bU=b1[1];bN=bO=b1[2]}else{if(b1[0]=="C"){b3=[bX,bN].concat(b1.slice(1));bX=b3[6];bN=b3[7]}else{b3=[bX,bN,bX,bN,bU,bO,bU,bO];bX=bU;bN=bO}for(var bT=0,bY=b.length;bT<bY;bT++){var b0=b[bT];if(b0[0]=="M"){bW=g=b0[1];R=bR=b0[2]}else{if(b0[0]=="C"){b2=[bW,R].concat(b0.slice(1));bW=b2[6];R=b2[7]}else{b2=[bW,R,bW,R,g,bR,g,bR];bW=g;R=bR}var bQ=ah(b3,b2,bZ);if(bZ){b4+=bQ}else{for(var bS=0,S=bQ.length;bS<S;bS++){bQ[bS].segment1=bV;bQ[bS].segment2=bT;bQ[bS].bez1=b3;bQ[bS].bez2=b2}b4=b4.concat(bQ)}}}}}return b4}aT.isPointInsidePath=function(g,b,R){var E=aT.pathBBox(g);return aT.isPointInsideBBox(E,b,R)&&G(g,[["M",b,R],["H",E.x2+10]],1)%2==1};aT._removedFactory=function(b){return function(){eve("raphael.log",null,"Rapha\xebl: you are calling to method \u201c"+b+"\u201d of removed object",b)}};var ao=aT.pathBBox=function(bW){var bQ=aa(bW);if(bQ.bbox){return Z(bQ.bbox)}if(!bW){return{x:0,y:0,width:0,height:0,x2:0,y2:0}}bW=Y(bW);var bT=0,bS=0,S=[],g=[],E;for(var bO=0,bV=bW.length;bO<bV;bO++){E=bW[bO];if(E[0]=="M"){bT=E[1];bS=E[2];S.push(bT);g.push(bS)}else{var bP=bc(bT,bS,E[1],E[2],E[3],E[4],E[5],E[6]);S=S[bG](bP.min.x,bP.max.x);g=g[bG](bP.min.y,bP.max.y);bT=E[5];bS=E[6]}}var b=bo[bI](0,S),bU=bo[bI](0,g),bN=o[bI](0,S),R=o[bI](0,g),bR={x:b,y:bU,x2:bN,y2:R,width:bN-b,height:R-bU};bQ.bbox=Z(bR);return bR},a1=function(g){var b=Z(g);b.toString=aT._path2string;return b},aE=aT._pathToRelative=function(R){var bP=aa(R);if(bP.rel){return a1(bP.rel)}if(!aT.is(R,bf)||!aT.is(R&&R[0],bf)){R=aT.parsePathString(R)}var bS=[],bU=0,bT=0,bX=0,bW=0,E=0;if(R[0][0]=="M"){bU=R[0][1];bT=R[0][2];bX=bU;bW=bT;E++;bS.push(["M",bU,bT])}for(var bO=E,bY=R.length;bO<bY;bO++){var b=bS[bO]=[],bV=R[bO];if(bV[0]!=bM.call(bV[0])){b[0]=bM.call(bV[0]);switch(b[0]){case"a":b[1]=bV[1];b[2]=bV[2];b[3]=bV[3];b[4]=bV[4];b[5]=bV[5];b[6]=+(bV[6]-bU).toFixed(3);b[7]=+(bV[7]-bT).toFixed(3);break;case"v":b[1]=+(bV[1]-bT).toFixed(3);break;case"m":bX=bV[1];bW=bV[2];default:for(var bN=1,bQ=bV.length;bN<bQ;bN++){b[bN]=+(bV[bN]-((bN%2)?bU:bT)).toFixed(3)}}}else{b=bS[bO]=[];if(bV[0]=="m"){bX=bV[1]+bU;bW=bV[2]+bT}for(var S=0,g=bV.length;S<g;S++){bS[bO][S]=bV[S]}}var bR=bS[bO].length;switch(bS[bO][0]){case"z":bU=bX;bT=bW;break;case"h":bU+=+bS[bO][bR-1];break;case"v":bT+=+bS[bO][bR-1];break;default:bU+=+bS[bO][bR-2];bT+=+bS[bO][bR-1]}}bS.toString=aT._path2string;bP.rel=a1(bS);return bS},y=aT._pathToAbsolute=function(bT){var E=aa(bT);if(E.abs){return a1(E.abs)}if(!aT.is(bT,bf)||!aT.is(bT&&bT[0],bf)){bT=aT.parsePathString(bT)}if(!bT||!bT.length){return[["M",0,0]]}var bZ=[],bO=0,bN=0,bR=0,bQ=0,R=0;if(bT[0][0]=="M"){bO=+bT[0][1];bN=+bT[0][2];bR=bO;bQ=bN;R++;bZ[0]=["M",bO,bN]}var bY=bT.length==3&&bT[0][0]=="M"&&bT[1][0].toUpperCase()=="R"&&bT[2][0].toUpperCase()=="Z";for(var bS,b,bW=R,bP=bT.length;bW<bP;bW++){bZ.push(bS=[]);b=bT[bW];if(b[0]!=bv.call(b[0])){bS[0]=bv.call(b[0]);switch(bS[0]){case"A":bS[1]=b[1];bS[2]=b[2];bS[3]=b[3];bS[4]=b[4];bS[5]=b[5];bS[6]=+(b[6]+bO);bS[7]=+(b[7]+bN);break;case"V":bS[1]=+b[1]+bN;break;case"H":bS[1]=+b[1]+bO;break;case"R":var S=[bO,bN][bG](b.slice(1));for(var bV=2,bX=S.length;bV<bX;bV++){S[bV]=+S[bV]+bO;S[++bV]=+S[bV]+bN}bZ.pop();bZ=bZ[bG](bd(S,bY));break;case"M":bR=+b[1]+bO;bQ=+b[2]+bN;default:for(bV=1,bX=b.length;bV<bX;bV++){bS[bV]=+b[bV]+((bV%2)?bO:bN)}}}else{if(b[0]=="R"){S=[bO,bN][bG](b.slice(1));bZ.pop();bZ=bZ[bG](bd(S,bY));bS=["R"][bG](b.slice(-2))}else{for(var bU=0,g=b.length;bU<g;bU++){bS[bU]=b[bU]}}}switch(bS[0]){case"Z":bO=bR;bN=bQ;break;case"H":bO=bS[1];break;case"V":bN=bS[1];break;case"M":bR=bS[bS.length-2];bQ=bS[bS.length-1];default:bO=bS[bS.length-2];bN=bS[bS.length-1]}}bZ.toString=aT._path2string;E.abs=a1(bZ);return bZ},bK=function(g,R,b,E){return[g,R,b,E,b,E]},bp=function(g,R,bO,S,b,E){var bN=1/3,bP=2/3;return[bN*g+bP*bO,bN*R+bP*S,bN*b+bP*bO,bN*E+bP*S,b,E]},ag=function(bV,cq,b4,b2,bW,bQ,R,bU,cp,bX){var b1=aX*120/180,b=aX/180*(+bW||0),b8=[],b5,cm=aI(function(cs,cv,cr){var cu=cs*aw.cos(cr)-cv*aw.sin(cr),ct=cs*aw.sin(cr)+cv*aw.cos(cr);return{x:cu,y:ct}});if(!bX){b5=cm(bV,cq,-b);bV=b5.x;cq=b5.y;b5=cm(bU,cp,-b);bU=b5.x;cp=b5.y;var g=aw.cos(aX/180*bW),bS=aw.sin(aX/180*bW),ca=(bV-bU)/2,b9=(cq-cp)/2;var ck=(ca*ca)/(b4*b4)+(b9*b9)/(b2*b2);if(ck>1){ck=aw.sqrt(ck);b4=ck*b4;b2=ck*b2}var E=b4*b4,cd=b2*b2,cf=(bQ==R?-1:1)*aw.sqrt(ay((E*cd-E*b9*b9-cd*ca*ca)/(E*b9*b9+cd*ca*ca))),bZ=cf*b4*b9/b2+(bV+bU)/2,bY=cf*-b2*ca/b4+(cq+cp)/2,bP=aw.asin(((cq-bY)/b2).toFixed(9)),bO=aw.asin(((cp-bY)/b2).toFixed(9));bP=bV<bZ?aX-bP:bP;bO=bU<bZ?aX-bO:bO;bP<0&&(bP=aX*2+bP);bO<0&&(bO=aX*2+bO);if(R&&bP>bO){bP=bP-aX*2}if(!R&&bO>bP){bO=bO-aX*2}}else{bP=bX[0];bO=bX[1];bZ=bX[2];bY=bX[3]}var bT=bO-bP;if(ay(bT)>b1){var b0=bO,b3=bU,bR=cp;bO=bP+b1*(R&&bO>bP?1:-1);bU=bZ+b4*aw.cos(bO);cp=bY+b2*aw.sin(bO);b8=ag(bU,cp,b4,b2,bW,0,R,b3,bR,[bO,b0,bZ,bY])}bT=bO-bP;var bN=aw.cos(bP),co=aw.sin(bP),S=aw.cos(bO),cn=aw.sin(bO),cb=aw.tan(bT/4),ce=4/3*b4*cb,cc=4/3*b2*cb,cl=[bV,cq],cj=[bV+ce*co,cq-cc*bN],ci=[bU+ce*cn,cp-cc*S],cg=[bU,cp];cj[0]=2*cl[0]-cj[0];cj[1]=2*cl[1]-cj[1];if(bX){return[cj,ci,cg][bG](b8)}else{b8=[cj,ci,cg][bG](b8).join()[H](",");var b6=[];for(var ch=0,b7=b8.length;ch<b7;ch++){b6[ch]=ch%2?cm(b8[ch-1],b8[ch],b).y:cm(b8[ch],b8[ch+1],b).x}return b6}},ai=function(g,b,R,E,bQ,bP,bO,bN,bR){var S=1-bR;return{x:br(S,3)*g+br(S,2)*3*bR*R+S*3*bR*bR*bQ+br(bR,3)*bO,y:br(S,3)*b+br(S,2)*3*bR*E+S*3*bR*bR*bP+br(bR,3)*bN}},bc=aI(function(R,g,bN,S,bY,bX,bU,bR){var bW=(bY-2*bN+R)-(bU-2*bY+bN),bT=2*(bN-R)-2*(bY-bN),bQ=R-bN,bP=(-bT+aw.sqrt(bT*bT-4*bW*bQ))/2/bW,bO=(-bT-aw.sqrt(bT*bT-4*bW*bQ))/2/bW,bS=[g,bR],bV=[R,bU],E;ay(bP)>"1e12"&&(bP=0.5);ay(bO)>"1e12"&&(bO=0.5);if(bP>0&&bP<1){E=ai(R,g,bN,S,bY,bX,bU,bR,bP);bV.push(E.x);bS.push(E.y)}if(bO>0&&bO<1){E=ai(R,g,bN,S,bY,bX,bU,bR,bO);bV.push(E.x);bS.push(E.y)}bW=(bX-2*S+g)-(bR-2*bX+S);bT=2*(S-g)-2*(bX-S);bQ=g-S;bP=(-bT+aw.sqrt(bT*bT-4*bW*bQ))/2/bW;bO=(-bT-aw.sqrt(bT*bT-4*bW*bQ))/2/bW;ay(bP)>"1e12"&&(bP=0.5);ay(bO)>"1e12"&&(bO=0.5);if(bP>0&&bP<1){E=ai(R,g,bN,S,bY,bX,bU,bR,bP);bV.push(E.x);bS.push(E.y)}if(bO>0&&bO<1){E=ai(R,g,bN,S,bY,bX,bU,bR,bO);bV.push(E.x);bS.push(E.y)}return{min:{x:bo[bI](0,bV),y:bo[bI](0,bS)},max:{x:o[bI](0,bV),y:o[bI](0,bS)}}}),Y=aT._path2curve=aI(function(bX,bS){var bQ=!bS&&aa(bX);if(!bS&&bQ.curve){return a1(bQ.curve)}var R=y(bX),bT=bS&&y(bS),bU={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},bN=function(bZ,b0){var bY,b1;if(!bZ){return["C",b0.x,b0.y,b0.x,b0.y,b0.x,b0.y]}!(bZ[0] in {T:1,Q:1})&&(b0.qx=b0.qy=null);switch(bZ[0]){case"M":b0.X=bZ[1];b0.Y=bZ[2];break;case"A":bZ=["C"][bG](ag[bI](0,[b0.x,b0.y][bG](bZ.slice(1))));break;case"S":bY=b0.x+(b0.x-(b0.bx||b0.x));b1=b0.y+(b0.y-(b0.by||b0.y));bZ=["C",bY,b1][bG](bZ.slice(1));break;case"T":b0.qx=b0.x+(b0.x-(b0.qx||b0.x));b0.qy=b0.y+(b0.y-(b0.qy||b0.y));bZ=["C"][bG](bp(b0.x,b0.y,b0.qx,b0.qy,bZ[1],bZ[2]));break;case"Q":b0.qx=bZ[1];b0.qy=bZ[2];bZ=["C"][bG](bp(b0.x,b0.y,bZ[1],bZ[2],bZ[3],bZ[4]));break;case"L":bZ=["C"][bG](bK(b0.x,b0.y,bZ[1],bZ[2]));break;case"H":bZ=["C"][bG](bK(b0.x,b0.y,bZ[1],b0.y));break;case"V":bZ=["C"][bG](bK(b0.x,b0.y,b0.x,bZ[1]));break;case"Z":bZ=["C"][bG](bK(b0.x,b0.y,b0.X,b0.Y));break}return bZ},b=function(bY,bZ){if(bY[bZ].length>7){bY[bZ].shift();var b0=bY[bZ];while(b0.length){bY.splice(bZ++,0,["C"][bG](b0.splice(0,6)))}bY.splice(bZ,1);bV=o(R.length,bT&&bT.length||0)}},E=function(b2,b1,bZ,bY,b0){if(b2&&b1&&b2[b0][0]=="M"&&b1[b0][0]!="M"){b1.splice(b0,0,["M",bY.x,bY.y]);bZ.bx=0;bZ.by=0;bZ.x=b2[b0][1];bZ.y=b2[b0][2];bV=o(R.length,bT&&bT.length||0)}};for(var bP=0,bV=o(R.length,bT&&bT.length||0);bP<bV;bP++){R[bP]=bN(R[bP],bU);b(R,bP);bT&&(bT[bP]=bN(bT[bP],g));bT&&b(bT,bP);E(R,bT,bU,g,bP);E(bT,R,g,bU,bP);var bO=R[bP],bW=bT&&bT[bP],S=bO.length,bR=bT&&bW.length;bU.x=bO[S-2];bU.y=bO[S-1];bU.bx=ap(bO[S-4])||bU.x;bU.by=ap(bO[S-3])||bU.y;g.bx=bT&&(ap(bW[bR-4])||g.x);g.by=bT&&(ap(bW[bR-3])||g.y);g.x=bT&&bW[bR-2];g.y=bT&&bW[bR-1]}if(!bT){bQ.curve=a1(R)}return bT?[R,bT]:R},null,a1),x=aT._parseDots=aI(function(bQ){var bP=[];for(var S=0,bR=bQ.length;S<bR;S++){var b={},bO=bQ[S].match(/^([^:]*):?([\d\.]*)/);b.color=aT.getRGB(bO[1]);if(b.color.error){return null}b.color=b.color.hex;bO[2]&&(b.offset=bO[2]+"%");bP.push(b)}for(S=1,bR=bP.length-1;S<bR;S++){if(!bP[S].offset){var g=ap(bP[S-1].offset||0),E=0;for(var R=S+1;R<bR;R++){if(bP[R].offset){E=bP[R].offset;break}}if(!E){E=100;R=bR}E=ap(E);var bN=(E-g)/(R-S+1);for(;S<R;S++){g+=bN;bP[S].offset=g+"%"}}}return bP}),aM=aT._tear=function(b,g){b==g.top&&(g.top=b.prev);b==g.bottom&&(g.bottom=b.next);b.next&&(b.next.prev=b.prev);b.prev&&(b.prev.next=b.next)},ar=aT._tofront=function(b,g){if(g.top===b){return}aM(b,g);b.next=null;b.prev=g.top;g.top.next=b;g.top=b},r=aT._toback=function(b,g){if(g.bottom===b){return}aM(b,g);b.next=g.bottom;b.prev=null;g.bottom.prev=b;g.bottom=b},I=aT._insertafter=function(g,b,E){aM(g,E);b==E.top&&(E.top=g);b.next&&(b.next.prev=g);g.next=b.next;g.prev=b;b.next=g},aV=aT._insertbefore=function(g,b,E){aM(g,E);b==E.bottom&&(E.bottom=g);b.prev&&(b.prev.next=g);g.prev=b.prev;b.prev=g;g.next=b},bn=aT.toMatrix=function(E,b){var R=ao(E),g={_:{transform:aZ},getBBox:function(){return R}};aQ(g,b);return g.matrix},V=aT.transformPath=function(g,b){return N(g,bn(g,b))},aQ=aT._extractTransform=function(g,b2){if(b2==null){return g._.transform}b2=bJ(b2).replace(/\.{3}|\u2026/g,g._.transform||aZ);var bU=aT.parseTransformString(b2),bS=0,bQ=0,bP=0,bW=1,bV=1,b3=g._,bX=new aH;b3.transform=bU||[];if(bU){for(var bY=0,bR=bU.length;bY<bR;bY++){var bT=bU[bY],b=bT.length,S=bJ(bT[0]).toLowerCase(),b1=bT[0]!=S,bO=b1?bX.invert():0,b0,R,bZ,E,bN;if(S=="t"&&b==3){if(b1){b0=bO.x(0,0);R=bO.y(0,0);bZ=bO.x(bT[1],bT[2]);E=bO.y(bT[1],bT[2]);bX.translate(bZ-b0,E-R)}else{bX.translate(bT[1],bT[2])}}else{if(S=="r"){if(b==2){bN=bN||g.getBBox(1);bX.rotate(bT[1],bN.x+bN.width/2,bN.y+bN.height/2);bS+=bT[1]}else{if(b==4){if(b1){bZ=bO.x(bT[2],bT[3]);E=bO.y(bT[2],bT[3]);bX.rotate(bT[1],bZ,E)}else{bX.rotate(bT[1],bT[2],bT[3])}bS+=bT[1]}}}else{if(S=="s"){if(b==2||b==3){bN=bN||g.getBBox(1);bX.scale(bT[1],bT[b-1],bN.x+bN.width/2,bN.y+bN.height/2);bW*=bT[1];bV*=bT[b-1]}else{if(b==5){if(b1){bZ=bO.x(bT[3],bT[4]);E=bO.y(bT[3],bT[4]);bX.scale(bT[1],bT[2],bZ,E)}else{bX.scale(bT[1],bT[2],bT[3],bT[4])}bW*=bT[1];bV*=bT[2]}}}else{if(S=="m"&&b==7){bX.add(bT[1],bT[2],bT[3],bT[4],bT[5],bT[6])}}}}b3.dirtyT=1;g.matrix=bX}}g.matrix=bX;b3.sx=bW;b3.sy=bV;b3.deg=bS;b3.dx=bQ=bX.e;b3.dy=bP=bX.f;if(bW==1&&bV==1&&!bS&&b3.bbox){b3.bbox.x+=+bQ;b3.bbox.y+=+bP}else{b3.dirtyT=1}},n=function(g){var b=g[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":if(g.length==4){return[b,0,g[2],g[3]]}else{return[b,0]}case"s":if(g.length==5){return[b,1,1,g[3],g[4]]}else{if(g.length==3){return[b,1,1]}else{return[b,1]}}}},aD=aT._equaliseTransform=function(S,R){R=bJ(R).replace(/\.{3}|\u2026/g,S);S=aT.parseTransformString(S)||[];R=aT.parseTransformString(R)||[];var b=o(S.length,R.length),bQ=[],bR=[],E=0,g,bN,bP,bO;for(;E<b;E++){bP=S[E]||n(R[E]);bO=R[E]||n(bP);if((bP[0]!=bO[0])||(bP[0].toLowerCase()=="r"&&(bP[2]!=bO[2]||bP[3]!=bO[3]))||(bP[0].toLowerCase()=="s"&&(bP[3]!=bO[3]||bP[4]!=bO[4]))){return}bQ[E]=[];bR[E]=[];for(g=0,bN=o(bP.length,bO.length);g<bN;g++){g in bP&&(bQ[E][g]=bP[g]);g in bO&&(bR[E][g]=bO[g])}}return{from:bQ,to:bR}};aT._getContainer=function(b,S,E,R){var g;g=R==null&&!aT.is(b,"object")?aC.doc.getElementById(b):b;if(g==null){return}if(g.tagName){if(S==null){return{container:g,width:g.style.pixelWidth||g.offsetWidth,height:g.style.pixelHeight||g.offsetHeight}}else{return{container:g,width:S,height:E}}}return{container:1,x:b,y:S,width:E,height:R}};aT.pathToRelative=aE;aT._engine={};aT.path2curve=Y;aT.matrix=function(E,g,bO,bN,S,R){return new aH(E,g,bO,bN,S,R)};function aH(E,g,bO,bN,S,R){if(E!=null){this.a=+E;this.b=+g;this.c=+bO;this.d=+bN;this.e=+S;this.f=+R}else{this.a=1;this.b=0;this.c=0;this.d=1;this.e=0;this.f=0}}(function(E){E.add=function(bX,bU,bS,bQ,bO,bN){var S=[[],[],[]],R=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],bW=[[bX,bS,bO],[bU,bQ,bN],[0,0,1]],bV,bT,bR,bP;if(bX&&bX instanceof aH){bW=[[bX.a,bX.c,bX.e],[bX.b,bX.d,bX.f],[0,0,1]]}for(bV=0;bV<3;bV++){for(bT=0;bT<3;bT++){bP=0;for(bR=0;bR<3;bR++){bP+=R[bV][bR]*bW[bR][bT]}S[bV][bT]=bP}}this.a=S[0][0];this.b=S[1][0];this.c=S[0][1];this.d=S[1][1];this.e=S[0][2];this.f=S[1][2]};E.invert=function(){var S=this,R=S.a*S.d-S.b*S.c;return new aH(S.d/R,-S.b/R,-S.c/R,S.a/R,(S.c*S.f-S.d*S.e)/R,(S.b*S.e-S.a*S.f)/R)};E.clone=function(){return new aH(this.a,this.b,this.c,this.d,this.e,this.f)};E.translate=function(R,S){this.add(1,0,0,1,R,S)};E.scale=function(S,bO,R,bN){bO==null&&(bO=S);(R||bN)&&this.add(1,0,0,1,R,bN);this.add(S,0,0,bO,0,0);(R||bN)&&this.add(1,0,0,1,-R,-bN)};E.rotate=function(S,R,bP){S=aT.rad(S);R=R||0;bP=bP||0;var bO=+aw.cos(S).toFixed(9),bN=+aw.sin(S).toFixed(9);this.add(bO,bN,-bN,bO,R,bP);this.add(1,0,0,1,-R,-bP)};E.x=function(R,S){return R*this.a+S*this.c+this.e};E.y=function(R,S){return R*this.b+S*this.d+this.f};E.get=function(R){return +this[bJ.fromCharCode(97+R)].toFixed(4)};E.toString=function(){return aT.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()};E.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"};E.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]};function g(R){return R[0]*R[0]+R[1]*R[1]}function b(R){var S=aw.sqrt(g(R));R[0]&&(R[0]/=S);R[1]&&(R[1]/=S)}E.split=function(){var S={};S.dx=this.e;S.dy=this.f;var bO=[[this.a,this.c],[this.b,this.d]];S.scalex=aw.sqrt(g(bO[0]));b(bO[0]);S.shear=bO[0][0]*bO[1][0]+bO[0][1]*bO[1][1];bO[1]=[bO[1][0]-bO[0][0]*S.shear,bO[1][1]-bO[0][1]*S.shear];S.scaley=aw.sqrt(g(bO[1]));b(bO[1]);S.shear/=S.scaley;var R=-bO[0][1],bN=bO[1][1];if(bN<0){S.rotate=aT.deg(aw.acos(bN));if(R<0){S.rotate=360-S.rotate}}else{S.rotate=aT.deg(aw.asin(R))}S.isSimple=!+S.shear.toFixed(9)&&(S.scalex.toFixed(9)==S.scaley.toFixed(9)||!S.rotate);S.isSuperSimple=!+S.shear.toFixed(9)&&S.scalex.toFixed(9)==S.scaley.toFixed(9)&&!S.rotate;S.noRotation=!+S.shear.toFixed(9)&&!S.rotate;return S};E.toTransformString=function(R){var S=R||this[H]();if(S.isSimple){S.scalex=+S.scalex.toFixed(4);S.scaley=+S.scaley.toFixed(4);S.rotate=+S.rotate.toFixed(4);return(S.dx||S.dy?"t"+[S.dx,S.dy]:aZ)+(S.scalex!=1||S.scaley!=1?"s"+[S.scalex,S.scaley,0,0]:aZ)+(S.rotate?"r"+[S.rotate,0,0]:aZ)}else{return"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}})(aH.prototype);var X=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);if((navigator.vendor=="Apple Computer, Inc.")&&(X&&X[1]<4||navigator.platform.slice(0,2)=="iP")||(navigator.vendor=="Google Inc."&&X&&X[1]<8)){a6.safari=function(){var b=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){b.remove()})}}else{a6.safari=K}var T=function(){this.returnValue=false},bF=function(){return this.originalEvent.preventDefault()},ba=function(){this.cancelBubble=true},aL=function(){return this.originalEvent.stopPropagation()},aF=(function(){if(aC.doc.addEventListener){return function(bN,R,E,g){var b=ab&&bz[R]?bz[R]:R,S=function(bT){var bS=aC.doc.documentElement.scrollTop||aC.doc.body.scrollTop,bU=aC.doc.documentElement.scrollLeft||aC.doc.body.scrollLeft,bO=bT.clientX+bU,bV=bT.clientY+bS;if(ab&&bz[am](R)){for(var bQ=0,bR=bT.targetTouches&&bT.targetTouches.length;bQ<bR;bQ++){if(bT.targetTouches[bQ].target==bN){var bP=bT;bT=bT.targetTouches[bQ];bT.originalEvent=bP;bT.preventDefault=bF;bT.stopPropagation=aL;break}}}return E.call(g,bT,bO,bV)};bN.addEventListener(b,S,false);return function(){bN.removeEventListener(b,S,false);return true}}}else{if(aC.doc.attachEvent){return function(bN,R,E,g){var S=function(bQ){bQ=bQ||aC.win.event;var bP=aC.doc.documentElement.scrollTop||aC.doc.body.scrollTop,bR=aC.doc.documentElement.scrollLeft||aC.doc.body.scrollLeft,bO=bQ.clientX+bR,bS=bQ.clientY+bP;bQ.preventDefault=bQ.preventDefault||T;bQ.stopPropagation=bQ.stopPropagation||ba;return E.call(g,bQ,bO,bS)};bN.attachEvent("on"+R,S);var b=function(){bN.detachEvent("on"+R,S);return true};return b}}}})(),bg=[],bA=function(bP){var bS=bP.clientX,bR=bP.clientY,bU=aC.doc.documentElement.scrollTop||aC.doc.body.scrollTop,bV=aC.doc.documentElement.scrollLeft||aC.doc.body.scrollLeft,E,R=bg.length;while(R--){E=bg[R];if(ab){var bN=bP.touches.length,S;while(bN--){S=bP.touches[bN];if(S.identifier==E.el._drag.id){bS=S.clientX;bR=S.clientY;(bP.originalEvent?bP.originalEvent:bP).preventDefault();break}}}else{bP.preventDefault()}var g=E.el.node,b,bO=g.nextSibling,bT=g.parentNode,bQ=g.style.display;aC.win.opera&&bT.removeChild(g);g.style.display="none";b=E.el.paper.getElementByPoint(bS,bR);g.style.display=bQ;aC.win.opera&&(bO?bT.insertBefore(g,bO):bT.appendChild(g));b&&eve("raphael.drag.over."+E.el.id,E.el,b);bS+=bV;bR+=bU;eve("raphael.drag.move."+E.el.id,E.move_scope||E.el,bS-E.el._drag.x,bR-E.el._drag.y,bS,bR,bP)}},e=function(E){aT.unmousemove(bA).unmouseup(e);var g=bg.length,b;while(g--){b=bg[g];b.el._drag={};eve("raphael.drag.end."+b.el.id,b.end_scope||b.start_scope||b.move_scope||b.el,E)}bg=[]},bj=aT.el={};for(var az=U.length;az--;){(function(b){aT[b]=bj[b]=function(E,g){if(aT.is(E,"function")){this.events=this.events||[];this.events.push({name:b,f:E,unbind:aF(this.shape||this.node||aC.doc,b,E,g||this)})}return this};aT["un"+b]=bj["un"+b]=function(R){var E=this.events||[],g=E.length;while(g--){if(E[g].name==b&&E[g].f==R){E[g].unbind();E.splice(g,1);!E.length&&delete this.events;return this}}return this}})(U[az])}bj.data=function(g,R){var E=aW[this.id]=aW[this.id]||{};if(arguments.length==1){if(aT.is(g,"object")){for(var b in g){if(g[am](b)){this.data(b,g[b])}}return this}eve("raphael.data.get."+this.id,this,E[g],g);return E[g]}E[g]=R;eve("raphael.data.set."+this.id,this,R,g);return this};bj.removeData=function(b){if(b==null){aW[this.id]={}}else{aW[this.id]&&delete aW[this.id][b]}return this};bj.hover=function(R,b,E,g){return this.mouseover(R,E).mouseout(b,g||E)};bj.unhover=function(g,b){return this.unmouseover(g).unmouseout(b)};var bw=[];bj.drag=function(g,bN,S,b,E,R){function bO(bQ){(bQ.originalEvent||bQ).preventDefault();var bP=aC.doc.documentElement.scrollTop||aC.doc.body.scrollTop,bR=aC.doc.documentElement.scrollLeft||aC.doc.body.scrollLeft;this._drag.x=bQ.clientX+bR;this._drag.y=bQ.clientY+bP;this._drag.id=bQ.identifier;!bg.length&&aT.mousemove(bA).mouseup(e);bg.push({el:this,move_scope:b,start_scope:E,end_scope:R});bN&&eve.on("raphael.drag.start."+this.id,bN);g&&eve.on("raphael.drag.move."+this.id,g);S&&eve.on("raphael.drag.end."+this.id,S);eve("raphael.drag.start."+this.id,E||b||this,bQ.clientX+bR,bQ.clientY+bP,bQ)}this._drag={};bw.push({el:this,start:bO});this.mousedown(bO);return this};bj.onDragOver=function(b){b?eve.on("raphael.drag.over."+this.id,b):eve.unbind("raphael.drag.over."+this.id)};bj.undrag=function(){var b=bw.length;while(b--){if(bw[b].el==this){this.unmousedown(bw[b].start);bw.splice(b,1);eve.unbind("raphael.drag.*."+this.id)}}!bw.length&&aT.unmousemove(bA).unmouseup(e)};a6.circle=function(b,R,E){var g=aT._engine.circle(this,b||0,R||0,E||0);this.__set__&&this.__set__.push(g);return g};a6.rect=function(b,bN,g,R,S){var E=aT._engine.rect(this,b||0,bN||0,g||0,R||0,S||0);this.__set__&&this.__set__.push(E);return E};a6.ellipse=function(b,S,R,E){var g=aT._engine.ellipse(this,b||0,S||0,R||0,E||0);this.__set__&&this.__set__.push(g);return g};a6.path=function(b){b&&!aT.is(b,al)&&!aT.is(b[0],bf)&&(b+=aZ);var g=aT._engine.path(aT.format[bI](aT,arguments),this);this.__set__&&this.__set__.push(g);return g};a6.image=function(S,b,bN,g,R){var E=aT._engine.image(this,S||"about:blank",b||0,bN||0,g||0,R||0);this.__set__&&this.__set__.push(E);return E};a6.text=function(b,R,E){var g=aT._engine.text(this,b||0,R||0,bJ(E));this.__set__&&this.__set__.push(g);return g};a6.set=function(g){!aT.is(g,"array")&&(g=Array.prototype.splice.call(arguments,0,arguments.length));var b=new an(g);this.__set__&&this.__set__.push(b);b.paper=this;b.type="set";return b};a6.setStart=function(b){this.__set__=b||this.set()};a6.setFinish=function(g){var b=this.__set__;delete this.__set__;return b};a6.setSize=function(g,b){return aT._engine.setSize.call(this,g,b)};a6.setViewBox=function(b,S,g,R,E){return aT._engine.setViewBox.call(this,b,S,g,R,E)};a6.top=a6.bottom=null;a6.raphael=aT;var bu=function(E){var S=E.getBoundingClientRect(),bQ=E.ownerDocument,bN=bQ.body,b=bQ.documentElement,R=b.clientTop||bN.clientTop||0,bO=b.clientLeft||bN.clientLeft||0,bP=S.top+(aC.win.pageYOffset||b.scrollTop||bN.scrollTop)-R,g=S.left+(aC.win.pageXOffset||b.scrollLeft||bN.scrollLeft)-bO;return{y:bP,x:g}};a6.getElementByPoint=function(g,bP){var bO=this,E=bO.canvas,bN=aC.doc.elementFromPoint(g,bP);if(aC.win.opera&&bN.tagName=="svg"){var S=bu(E),R=E.createSVGRect();R.x=g-S.x;R.y=bP-S.y;R.width=R.height=1;var b=E.getIntersectionList(R,null);if(b.length){bN=b[b.length-1]}}if(!bN){return null}while(bN.parentNode&&bN!=E.parentNode&&!bN.raphael){bN=bN.parentNode}bN==bO.canvas.parentNode&&(bN=E);bN=bN&&bN.raphael?bO.getById(bN.raphaelid):null;return bN};a6.getById=function(g){var b=this.bottom;while(b){if(b.id==g){return b}b=b.next}return null};a6.forEach=function(E,b){var g=this.bottom;while(g){if(E.call(b,g)===false){return this}g=g.next}return this};a6.getElementsByPoint=function(b,E){var g=this.set();this.forEach(function(R){if(R.isPointInside(b,E)){g.push(R)}});return g};function A(){return this.x+aS+this.y}function av(){return this.x+aS+this.y+aS+this.width+" \xd7 "+this.height}bj.isPointInside=function(b,E){var g=this.realPath=this.realPath||P[this.type](this);return aT.isPointInsidePath(g,b,E)};bj.getBBox=function(g){if(this.removed){return{}}var b=this._;if(g){if(b.dirty||!b.bboxwt){this.realPath=P[this.type](this);b.bboxwt=ao(this.realPath);b.bboxwt.toString=av;b.dirty=0}return b.bboxwt}if(b.dirty||b.dirtyT||!b.bbox){if(b.dirty||!this.realPath){b.bboxwt=0;this.realPath=P[this.type](this)}b.bbox=ao(N(this.realPath,this.matrix));b.bbox.toString=av;b.dirty=b.dirtyT=0}return b.bbox};bj.clone=function(){if(this.removed){return null}var b=this.paper[this.type]().attr(this.attr());this.__set__&&this.__set__.push(b);return b};bj.glow=function(bO){if(this.type=="text"){return null}bO=bO||{};var E={width:(bO.width||10)+(+this.attr("stroke-width")||1),fill:bO.fill||false,opacity:bO.opacity||0.5,offsetx:bO.offsetx||0,offsety:bO.offsety||0,color:bO.color||"#000"},bN=E.width/2,R=this.paper,b=R.set(),S=this.realPath||P[this.type](this);S=this.matrix?N(S,this.matrix):S;for(var g=1;g<bN+1;g++){b.push(R.path(S).attr({stroke:E.color,fill:E.fill?E.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(E.width/bN*g).toFixed(3),opacity:+(E.opacity/bN).toFixed(3)}))}return b.insertBefore(this).translate(E.offsetx,E.offsety)};var a9={},m=function(g,b,S,R,bQ,bP,bO,bN,E){if(E==null){return s(g,b,S,R,bQ,bP,bO,bN)}else{return aT.findDotsAtSegment(g,b,S,R,bQ,bP,bO,bN,F(g,b,S,R,bQ,bP,bO,bN,E))}},a8=function(b,g){return function(bW,S,bN){bW=Y(bW);var bS,bR,E,bO,R="",bV={},bT,bQ=0;for(var bP=0,bU=bW.length;bP<bU;bP++){E=bW[bP];if(E[0]=="M"){bS=+E[1];bR=+E[2]}else{bO=m(bS,bR,E[1],E[2],E[3],E[4],E[5],E[6]);if(bQ+bO>S){if(g&&!bV.start){bT=m(bS,bR,E[1],E[2],E[3],E[4],E[5],E[6],S-bQ);R+=["C"+bT.start.x,bT.start.y,bT.m.x,bT.m.y,bT.x,bT.y];if(bN){return R}bV.start=R;R=["M"+bT.x,bT.y+"C"+bT.n.x,bT.n.y,bT.end.x,bT.end.y,E[5],E[6]].join();bQ+=bO;bS=+E[5];bR=+E[6];continue}if(!b&&!g){bT=m(bS,bR,E[1],E[2],E[3],E[4],E[5],E[6],S-bQ);return{x:bT.x,y:bT.y,alpha:bT.alpha}}}bQ+=bO;bS=+E[5];bR=+E[6]}R+=E.shift()+E}bV.end=R;bT=b?bQ:g?bV:aT.findDotsAtSegment(bS,bR,E[0],E[1],E[2],E[3],E[4],E[5],1);bT.alpha&&(bT={x:bT.x,y:bT.y,alpha:bT.alpha});return bT}};var aU=a8(1),L=a8(),af=a8(0,1);aT.getTotalLength=aU;aT.getPointAtLength=L;aT.getSubpath=function(g,R,E){if(this.getTotalLength(g)-E<0.000001){return af(g,R).end}var b=af(g,E,1);return R?af(b,R).end:b};bj.getTotalLength=function(){if(this.type!="path"){return}if(this.node.getTotalLength){return this.node.getTotalLength()}return aU(this.attrs.path)};bj.getPointAtLength=function(b){if(this.type!="path"){return}return L(this.attrs.path,b)};bj.getSubpath=function(g,b){if(this.type!="path"){return}return aT.getSubpath(this.attrs.path,g,b)};var q=aT.easing_formulas={linear:function(b){return b},"<":function(b){return br(b,1.7)},">":function(b){return br(b,0.48)},"<>":function(bP){var R=0.48-bP/1.04,E=aw.sqrt(0.1734+R*R),b=E-R,bO=br(ay(b),1/3)*(b<0?-1:1),bN=-E-R,S=br(ay(bN),1/3)*(bN<0?-1:1),g=bO+S+0.5;return(1-g)*3*g*g+g*g*g},backIn:function(g){var b=1.70158;return g*g*((b+1)*g-b)},backOut:function(g){g=g-1;var b=1.70158;return g*g*((b+1)*g+b)+1},elastic:function(b){if(b==!!b){return b}return br(2,-10*b)*aw.sin((b-0.075)*(2*aX)/0.3)+1},bounce:function(R){var g=7.5625,E=2.75,b;if(R<(1/E)){b=g*R*R}else{if(R<(2/E)){R-=(1.5/E);b=g*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);b=g*R*R+0.9375}else{R-=(2.625/E);b=g*R*R+0.984375}}}return b}};q.easeIn=q["ease-in"]=q["<"];q.easeOut=q["ease-out"]=q[">"];q.easeInOut=q["ease-in-out"]=q["<>"];q["back-in"]=q.backIn;q["back-out"]=q.backOut;var ad=[],aP=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){setTimeout(b,16)},bE=function(){var bO=+new Date,bW=0;for(;bW<ad.length;bW++){var b2=ad[bW];if(b2.el.removed||b2.paused){continue}var R=bO-b2.start,bU=b2.ms,bT=b2.easing,bX=b2.from,bR=b2.diff,g=b2.to,bQ=b2.t,bN=b2.el,bS={},b,b0={},b4;if(b2.initstatus){R=(b2.initstatus*b2.anim.top-b2.prev)/(b2.percent-b2.prev)*bU;b2.status=b2.initstatus;delete b2.initstatus;b2.stop&&ad.splice(bW--,1)}else{b2.status=(b2.prev+(b2.percent-b2.prev)*(R/bU))/b2.anim.top}if(R<0){continue}if(R<bU){var E=bT(R/bU);for(var bV in bX){if(bX[am](bV)){switch(au[bV]){case aN:b=+bX[bV]+E*bU*bR[bV];break;case"colour":b="rgb("+[J(aj(bX[bV].r+E*bU*bR[bV].r)),J(aj(bX[bV].g+E*bU*bR[bV].g)),J(aj(bX[bV].b+E*bU*bR[bV].b))].join(",")+")";break;case"path":b=[];for(var bZ=0,bP=bX[bV].length;bZ<bP;bZ++){b[bZ]=[bX[bV][bZ][0]];for(var bY=1,b1=bX[bV][bZ].length;bY<b1;bY++){b[bZ][bY]=+bX[bV][bZ][bY]+E*bU*bR[bV][bZ][bY]}b[bZ]=b[bZ].join(aS)}b=b.join(aS);break;case"transform":if(bR[bV].real){b=[];for(bZ=0,bP=bX[bV].length;bZ<bP;bZ++){b[bZ]=[bX[bV][bZ][0]];for(bY=1,b1=bX[bV][bZ].length;bY<b1;bY++){b[bZ][bY]=bX[bV][bZ][bY]+E*bU*bR[bV][bZ][bY]}}}else{var b3=function(b5){return +bX[bV][b5]+E*bU*bR[bV][b5]};b=[["m",b3(0),b3(1),b3(2),b3(3),b3(4),b3(5)]]}break;case"csv":if(bV=="clip-rect"){b=[];bZ=4;while(bZ--){b[bZ]=+bX[bV][bZ]+E*bU*bR[bV][bZ]}}break;default:var S=[][bG](bX[bV]);b=[];bZ=bN.paper.customAttributes[bV].length;while(bZ--){b[bZ]=+S[bZ]+E*bU*bR[bV][bZ]}break}bS[bV]=b}}bN.attr(bS);(function(b7,b5,b6){setTimeout(function(){eve("raphael.anim.frame."+b7,b5,b6)})})(bN.id,bN,b2.anim)}else{(function(b7,b6,b5){setTimeout(function(){eve("raphael.anim.frame."+b6.id,b6,b5);eve("raphael.anim.finish."+b6.id,b6,b5);aT.is(b7,"function")&&b7.call(b6)})})(b2.callback,bN,b2.anim);bN.attr(g);ad.splice(bW--,1);if(b2.repeat>1&&!b2.next){for(b4 in g){if(g[am](b4)){b0[b4]=b2.totalOrigin[b4]}}b2.el.attr(b0);aO(b2.anim,b2.el,b2.anim.percents[0],null,b2.totalOrigin,b2.repeat-1)}if(b2.next&&!b2.stop){aO(b2.anim,b2.el,b2.next,null,b2.totalOrigin,b2.repeat)}}}aT.svg&&bN&&bN.paper&&bN.paper.safari();ad.length&&aP(bE)},J=function(b){return b>255?255:b<0?0:b};bj.animateWith=function(g,R,E,b,bO,bT){var bN=this;if(bN.removed){bT&&bT.call(bN);return bN}var bR=E instanceof bC?E:aT.animation(E,b,bO,bT),bQ,bP;aO(bR,bN,bR.percents[0],null,bN.attr());for(var S=0,bS=ad.length;S<bS;S++){if(ad[S].anim==R&&ad[S].el==g){ad[bS-1].start=ad[S].start;break}}return bN};function a5(bV,R,g,bU,bT,bP){var bQ=3*R,bS=3*(bU-R)-bQ,b=1-bQ-bS,bO=3*g,bR=3*(bT-g)-bO,bW=1-bO-bR;function bN(bX){return((b*bX+bS)*bX+bQ)*bX}function E(bX,bZ){var bY=S(bX,bZ);return((bW*bY+bR)*bY+bO)*bY}function S(bX,b4){var b3,b2,b0,bY,b1,bZ;for(b0=bX,bZ=0;bZ<8;bZ++){bY=bN(b0)-bX;if(ay(bY)<b4){return b0}b1=(3*b*b0+2*bS)*b0+bQ;if(ay(b1)<0.000001){break}b0=b0-bY/b1}b3=0;b2=1;b0=bX;if(b0<b3){return b3}if(b0>b2){return b2}while(b3<b2){bY=bN(b0);if(ay(bY-bX)<b4){return b0}if(bX>bY){b3=b0}else{b2=b0}b0=(b2-b3)/2+b3}return b0}return E(bV,1/(200*bP))}bj.onAnimation=function(b){b?eve.on("raphael.anim.frame."+this.id,b):eve.unbind("raphael.anim.frame."+this.id);return this};function bC(S,E){var g=[],R={};this.ms=E;this.times=1;if(S){for(var b in S){if(S[am](b)){R[ap(b)]=S[b];g.push(ap(b))}}g.sort(w)}this.anim=R;this.top=g[g.length-1];this.percents=g}bC.prototype.delay=function(g){var b=new bC(this.anim,this.ms);b.times=this.times;b.del=+g||0;return b};bC.prototype.repeat=function(g){var b=new bC(this.anim,this.ms);b.del=this.del;b.times=aw.floor(o(g,0))||1;return b};function aO(b6,E,b,b4,bO,bS){b=ap(b);var cd,bN,bR,ce=[],bY,bX,S,b0=b6.ms,b5={},R={},bU={};if(b4){for(b9=0,bT=ad.length;b9<bT;b9++){var cb=ad[b9];if(cb.el.id==E.id&&cb.anim==b6){if(cb.percent!=b){ad.splice(b9,1);bR=1}else{bN=cb}E.attr(cb.totalOrigin);break}}}else{b4=+R}for(var b9=0,bT=b6.percents.length;b9<bT;b9++){if(b6.percents[b9]==b||b6.percents[b9]>b4*b6.top){b=b6.percents[b9];bX=b6.percents[b9-1]||0;b0=b0/b6.top*(b-bX);bY=b6.percents[b9+1];cd=b6.anim[b];break}else{if(b4){E.attr(b6.anim[b6.percents[b9]])}}}if(!cd){return}if(!bN){for(var b2 in cd){if(cd[am](b2)){if(au[am](b2)||E.paper.customAttributes[am](b2)){b5[b2]=E.attr(b2);(b5[b2]==null)&&(b5[b2]=t[b2]);R[b2]=cd[b2];switch(au[b2]){case aN:bU[b2]=(R[b2]-b5[b2])/b0;break;case"colour":b5[b2]=aT.getRGB(b5[b2]);var b3=aT.getRGB(R[b2]);bU[b2]={r:(b3.r-b5[b2].r)/b0,g:(b3.g-b5[b2].g)/b0,b:(b3.b-b5[b2].b)/b0};break;case"path":var bP=Y(b5[b2],R[b2]),bW=bP[1];b5[b2]=bP[0];bU[b2]=[];for(b9=0,bT=b5[b2].length;b9<bT;b9++){bU[b2][b9]=[0];for(var b8=1,ca=b5[b2][b9].length;b8<ca;b8++){bU[b2][b9][b8]=(bW[b9][b8]-b5[b2][b9][b8])/b0}}break;case"transform":var cg=E._,cf=aD(cg[b2],R[b2]);if(cf){b5[b2]=cf.from;R[b2]=cf.to;bU[b2]=[];bU[b2].real=true;for(b9=0,bT=b5[b2].length;b9<bT;b9++){bU[b2][b9]=[b5[b2][b9][0]];for(b8=1,ca=b5[b2][b9].length;b8<ca;b8++){bU[b2][b9][b8]=(R[b2][b9][b8]-b5[b2][b9][b8])/b0}}}else{var b1=(E.matrix||new aH),cc={_:{transform:cg.transform},getBBox:function(){return E.getBBox(1)}};b5[b2]=[b1.a,b1.b,b1.c,b1.d,b1.e,b1.f];aQ(cc,R[b2]);R[b2]=cc._.transform;bU[b2]=[(cc.matrix.a-b1.a)/b0,(cc.matrix.b-b1.b)/b0,(cc.matrix.c-b1.c)/b0,(cc.matrix.d-b1.d)/b0,(cc.matrix.e-b1.e)/b0,(cc.matrix.f-b1.f)/b0]}break;case"csv":var g=bJ(cd[b2])[H](a),bQ=bJ(b5[b2])[H](a);if(b2=="clip-rect"){b5[b2]=bQ;bU[b2]=[];b9=bQ.length;while(b9--){bU[b2][b9]=(g[b9]-b5[b2][b9])/b0}}R[b2]=g;break;default:g=[][bG](cd[b2]);bQ=[][bG](b5[b2]);bU[b2]=[];b9=E.paper.customAttributes[b2].length;while(b9--){bU[b2][b9]=((g[b9]||0)-(bQ[b9]||0))/b0}break}}}}var bZ=cd.easing,b7=aT.easing_formulas[bZ];if(!b7){b7=bJ(bZ).match(c);if(b7&&b7.length==5){var bV=b7;b7=function(ch){return a5(ch,+bV[1],+bV[2],+bV[3],+bV[4],b0)}}else{b7=bD}}S=cd.start||b6.start||+new Date;cb={anim:b6,percent:b,timestamp:S,start:S+(b6.del||0),status:0,initstatus:b4||0,stop:false,ms:b0,easing:b7,from:b5,diff:bU,to:R,el:E,callback:cd.callback,prev:bX,next:bY,repeat:bS||b6.times,origin:E.attr(),totalOrigin:bO};ad.push(cb);if(b4&&!bN&&!bR){cb.stop=true;cb.start=new Date-b0*b4;if(ad.length==1){return bE()}}if(bR){cb.start=new Date-cb.ms*b4}ad.length==1&&aP(bE)}else{bN.initstatus=b4;bN.start=new Date-bN.ms*b4}eve("raphael.anim.start."+E.id,E,b6)}aT.animation=function(S,g,bO,bN){if(S instanceof bC){return S}if(aT.is(bO,"function")||!bO){bN=bN||bO||null;bO=null}S=Object(S);g=+g||0;var R={},E,b;for(b in S){if(S[am](b)&&ap(b)!=b&&ap(b)+"%"!=b){E=true;R[b]=S[b]}}if(!E){return new bC(S,g)}else{bO&&(R.easing=bO);bN&&(R.callback=bN);return new bC({100:R},g)}};bj.animate=function(R,b,bN,S){var g=this;if(g.removed){S&&S.call(g);return g}var E=R instanceof bC?R:aT.animation(R,b,bN,S);aO(E,g,E.percents[0],null,g.attr());return g};bj.setTime=function(g,b){if(g&&b!=null){this.status(g,bo(b,g.ms)/g.ms)}return this};bj.status=function(S,R){var g=[],E=0,b,bN;if(R!=null){aO(S,this,-1,bo(R,1));return this}else{b=ad.length;for(;E<b;E++){bN=ad[E];if(bN.el.id==this.id&&(!S||bN.anim==S)){if(S){return bN.status}g.push({anim:bN.anim,status:bN.status})}}if(S){return 0}return g}};bj.pause=function(g){for(var b=0;b<ad.length;b++){if(ad[b].el.id==this.id&&(!g||ad[b].anim==g)){if(eve("raphael.anim.pause."+this.id,this,ad[b].anim)!==false){ad[b].paused=true}}}return this};bj.resume=function(g){for(var b=0;b<ad.length;b++){if(ad[b].el.id==this.id&&(!g||ad[b].anim==g)){var E=ad[b];if(eve("raphael.anim.resume."+this.id,this,E.anim)!==false){delete E.paused;this.status(E.anim,E.status)}}}return this};bj.stop=function(g){for(var b=0;b<ad.length;b++){if(ad[b].el.id==this.id&&(!g||ad[b].anim==g)){if(eve("raphael.anim.stop."+this.id,this,ad[b].anim)!==false){ad.splice(b--,1)}}}return this};function ac(g){for(var b=0;b<ad.length;b++){if(ad[b].el.paper==g){ad.splice(b--,1)}}}eve.on("raphael.remove",ac);eve.on("raphael.clear",ac);bj.toString=function(){return"Rapha\xebl\u2019s object"};var an=function(b){this.items=[];this.length=0;this.type="set";if(b){for(var g=0,E=b.length;g<E;g++){if(b[g]&&(b[g].constructor==bj.constructor||b[g].constructor==an)){this[this.items.length]=this.items[this.items.length]=b[g];this.length++}}}},be=an.prototype;be.push=function(){var R,b;for(var g=0,E=arguments.length;g<E;g++){R=arguments[g];if(R&&(R.constructor==bj.constructor||R.constructor==an)){b=this.items.length;this[b]=this.items[b]=R;this.length++}}return this};be.pop=function(){this.length&&delete this[this.length--];return this.items.pop()};be.forEach=function(R,b){for(var g=0,E=this.items.length;g<E;g++){if(R.call(b,this.items[g],g)===false){return this}}return this};for(var D in bj){if(bj[am](D)){be[D]=(function(b){return function(){var g=arguments;return this.forEach(function(E){E[b][bI](E,g)})}})(D)}}be.attr=function(g,bN){if(g&&aT.is(g,bf)&&aT.is(g[0],"object")){for(var b=0,S=g.length;b<S;b++){this.items[b].attr(g[b])}}else{for(var E=0,R=this.items.length;E<R;E++){this.items[E].attr(g,bN)}}return this};be.clear=function(){while(this.length){this.pop()}};be.splice=function(R,bO,bP){R=R<0?o(this.length+R,0):R;bO=o(0,bo(this.length-R,bO));var E=[],b=[],g=[],S;for(S=2;S<arguments.length;S++){g.push(arguments[S])}for(S=0;S<bO;S++){b.push(this[R+S])}for(;S<this.length-R;S++){E.push(this[R+S])}var bN=g.length;for(S=0;S<bN+E.length;S++){this.items[R+S]=this[R+S]=S<bN?g[S]:E[S-bN]}S=this.items.length=this.length-=bO-bN;while(this[S]){delete this[S++]}return new an(b)};be.exclude=function(E){for(var b=0,g=this.length;b<g;b++){if(this[b]==E){this.splice(b,1);return true}}};be.animate=function(E,b,bO,bQ){(aT.is(bO,"function")||!bO)&&(bQ=bO||null);var bN=this.items.length,R=bN,bR,bP=this,S;if(!bN){return this}bQ&&(S=function(){!--bN&&bQ.call(bP)});bO=aT.is(bO,al)?bO:S;var g=aT.animation(E,b,bO,S);bR=this.items[--R].animate(g);while(R--){this.items[R]&&!this.items[R].removed&&this.items[R].animateWith(bR,g,g)}return this};be.insertAfter=function(g){var b=this.items.length;while(b--){this.items[b].insertAfter(g)}return this};be.getBBox=function(){var b=[],bN=[],g=[],R=[];for(var E=this.items.length;E--;){if(!this.items[E].removed){var S=this.items[E].getBBox();b.push(S.x);bN.push(S.y);g.push(S.x+S.width);R.push(S.y+S.height)}}b=bo[bI](0,b);bN=bo[bI](0,bN);g=o[bI](0,g);R=o[bI](0,R);return{x:b,y:bN,x2:g,y2:R,width:g-b,height:R-bN}};be.clone=function(E){E=this.paper.set();for(var b=0,g=this.items.length;b<g;b++){E.push(this.items[b].clone())}return E};be.toString=function(){return"Rapha\xebl\u2018s set"};aT.registerFont=function(g){if(!g.face){return g}this.fonts=this.fonts||{};var R={w:g.w,face:{},glyphs:{}},E=g.face["font-family"];for(var bO in g.face){if(g.face[am](bO)){R.face[bO]=g.face[bO]}}if(this.fonts[E]){this.fonts[E].push(R)}else{this.fonts[E]=[R]}if(!g.svg){R.face["units-per-em"]=W(g.face["units-per-em"],10);for(var S in g.glyphs){if(g.glyphs[am](S)){var bN=g.glyphs[S];R.glyphs[S]={w:bN.w,k:{},d:bN.d&&"M"+bN.d.replace(/[mlcxtrv]/g,function(bP){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bP]||"M"})+"z"};if(bN.k){for(var b in bN.k){if(bN[am](b)){R.glyphs[S].k[b]=bN.k[b]}}}}}}return g};a6.getFont=function(bP,bQ,g,R){R=R||"normal";g=g||"normal";bQ=+bQ||{normal:400,bold:700,lighter:300,bolder:800}[bQ]||400;if(!aT.fonts){return}var S=aT.fonts[bP];if(!S){var E=new RegExp("(^|\\s)"+bP.replace(/[^\w\d\s+!~.:_-]/g,aZ)+"(\\s|$)","i");for(var b in aT.fonts){if(aT.fonts[am](b)){if(E.test(b)){S=aT.fonts[b];break}}}}var bN;if(S){for(var bO=0,bR=S.length;bO<bR;bO++){bN=S[bO];if(bN.face["font-weight"]==bQ&&(bN.face["font-style"]==g||!bN.face["font-style"])&&bN.face["font-stretch"]==R){break}}}return bN};a6.print=function(bO,bN,b,bR,bS,b1,g){b1=b1||"middle";g=o(bo(g||0,1),-1);var b0=bJ(b)[H](aZ),bX=0,bZ=0,bV=aZ,b2;aT.is(bR,b)&&(bR=this.getFont(bR));if(bR){b2=(bS||16)/bR.face["units-per-em"];var R=bR.face.bbox[H](a),bQ=+R[0],E=R[3]-R[1],S=0,bT=+R[1]+(b1=="baseline"?E+(+bR.face.descent):E/2);for(var bW=0,bP=b0.length;bW<bP;bW++){if(b0[bW]=="\n"){bX=0;bY=0;bZ=0;S+=E}else{var bU=bZ&&bR.glyphs[b0[bW-1]]||{},bY=bR.glyphs[b0[bW]];bX+=bZ?(bU.w||bR.w)+(bU.k&&bU.k[b0[bW]]||0)+(bR.w*g):0;bZ=1}if(bY&&bY.d){bV+=aT.transformPath(bY.d,["t",bX*b2,S*b2,"s",b2,b2,bQ,bT,"t",(bO-bQ)/b2,(bN-bT)/b2])}}}return this.path(bV).attr({fill:"#000",stroke:"none"})};a6.add=function(R){if(aT.is(R,"array")){var E=this.set(),g=0,S=R.length,b;for(;g<S;g++){b=R[g]||{};by[am](b.type)&&E.push(this[b.type]().attr(b))}}return E};aT.format=function(g,E){var b=aT.is(E,bf)?[0][bG](E):arguments;g&&aT.is(g,al)&&b.length-1&&(g=g.replace(bt,function(S,R){return b[++R]==null?aZ:b[R]}));return g||aZ};aT.fullfill=(function(){var E=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,g=function(bN,S,bO){var R=bO;S.replace(b,function(bR,bQ,bP,bT,bS){bQ=bQ||bT;if(R){if(bQ in R){R=R[bQ]}typeof R=="function"&&bS&&(R=R())}});R=(R==null||R==bO?bN:R)+"";return R};return function(S,R){return String(S).replace(E,function(bO,bN){return g(bO,bN,R)})}})();aT.ninja=function(){u.was?(aC.win.Raphael=u.is):delete Raphael;return aT};aT.st=be;(function(R,g,E){if(R.readyState==null&&R.addEventListener){R.addEventListener(g,E=function(){R.removeEventListener(g,E,false);R.readyState="complete"},false);R.readyState="loading"}function b(){(/in/).test(R.readyState)?setTimeout(b,9):aT.eve("raphael.DOMload")}b()})(document,"DOMContentLoaded");u.was?(aC.win.Raphael=aT):(Raphael=aT);eve.on("raphael.DOMload",function(){aq=true})})();window.Raphael.svg&&function(p){var e="hasOwnProperty",G=String,r=parseFloat,u=parseInt,g=Math,H=g.max,w=g.abs,l=g.pow,h=/[, ]+/,D=p.eve,v="",n=" ";var s="http://www.w3.org/1999/xlink",C={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},y={};p.toString=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version};var m=function(J,E){if(E){if(typeof J=="string"){J=m(J)}for(var I in E){if(E[e](I)){if(I.substring(0,6)=="xlink:"){J.setAttributeNS(s,I.substring(6),G(E[I]))}else{J.setAttribute(I,G(E[I]))}}}}else{J=p._g.doc.createElementNS("http://www.w3.org/2000/svg",J);J.style&&(J.style.webkitTapHighlightColor="rgba(0,0,0,0)")}return J},a=function(Q,U){var S="linear",I=Q.id+U,O=0.5,M=0.5,K=Q.node,E=Q.paper,W=K.style,J=p._g.doc.getElementById(I);if(!J){U=G(U).replace(p._radial_gradient,function(Z,X,aa){S="radial";if(X&&aa){O=r(X);M=r(aa);var Y=((M>0.5)*2-1);l(O-0.5,2)+l(M-0.5,2)>0.25&&(M=g.sqrt(0.25-l(O-0.5,2))*Y+0.5)&&M!=0.5&&(M=M.toFixed(5)-0.00001*Y)}return v});U=U.split(/\s*\-\s*/);if(S=="linear"){var N=U.shift();N=-r(N);if(isNaN(N)){return null}var L=[0,0,g.cos(p.rad(N)),g.sin(p.rad(N))],T=1/(H(w(L[2]),w(L[3]))||1);L[2]*=T;L[3]*=T;if(L[2]<0){L[0]=-L[2];L[2]=0}if(L[3]<0){L[1]=-L[3];L[3]=0}}var R=p._parseDots(U);if(!R){return null}I=I.replace(/[\(\)\s,\xb0#]/g,"_");if(Q.gradient&&I!=Q.gradient.id){E.defs.removeChild(Q.gradient);delete Q.gradient}if(!Q.gradient){J=m(S+"Gradient",{id:I});Q.gradient=J;m(J,S=="radial"?{fx:O,fy:M}:{x1:L[0],y1:L[1],x2:L[2],y2:L[3],gradientTransform:Q.matrix.invert()});E.defs.appendChild(J);for(var P=0,V=R.length;P<V;P++){J.appendChild(m("stop",{offset:R[P].offset?R[P].offset:P?"100%":"0%","stop-color":R[P].color||"#fff"}))}}}m(K,{fill:"url(#"+I+")",opacity:1,"fill-opacity":1});W.fill=v;W.opacity=1;W.fillOpacity=1;return 1},b=function(I){var E=I.getBBox(1);m(I.pattern,{patternTransform:I.matrix.invert()+" translate("+E.x+","+E.y+")"})},c=function(S,U,N){if(S.type=="path"){var E=G(U).toLowerCase().split("-"),R=S.paper,af=N?"end":"start",W=S.node,T=S.attrs,M=T["stroke-width"],aa=E.length,K="classic",Z,J,P,X,V,O=3,ab=3,Q=5;while(aa--){switch(E[aa]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":K=E[aa];break;case"wide":ab=5;break;case"narrow":ab=2;break;case"long":O=5;break;case"short":O=2;break}}if(K=="open"){O+=2;ab+=2;Q+=2;P=1;X=N?4:1;V={fill:"none",stroke:T.stroke}}else{X=P=O/2;V={fill:T.stroke,stroke:"none"}}if(S._.arrows){if(N){S._.arrows.endPath&&y[S._.arrows.endPath]--;S._.arrows.endMarker&&y[S._.arrows.endMarker]--}else{S._.arrows.startPath&&y[S._.arrows.startPath]--;S._.arrows.startMarker&&y[S._.arrows.startMarker]--}}else{S._.arrows={}}if(K!="none"){var I="raphael-marker-"+K,ae="raphael-marker-"+af+K+O+ab;if(!p._g.doc.getElementById(I)){R.defs.appendChild(m(m("path"),{"stroke-linecap":"round",d:C[K],id:I}));y[I]=1}else{y[I]++}var L=p._g.doc.getElementById(ae),Y;if(!L){L=m(m("marker"),{id:ae,markerHeight:ab,markerWidth:O,orient:"auto",refX:X,refY:ab/2});Y=m(m("use"),{"xlink:href":"#"+I,transform:(N?"rotate(180 "+O/2+" "+ab/2+") ":v)+"scale("+O/Q+","+ab/Q+")","stroke-width":(1/((O/Q+ab/Q)/2)).toFixed(4)});L.appendChild(Y);R.defs.appendChild(L);y[ae]=1}else{y[ae]++;Y=L.getElementsByTagName("use")[0]}m(Y,V);var ad=P*(K!="diamond"&&K!="oval");if(N){Z=S._.arrows.startdx*M||0;J=p.getTotalLength(T.path)-ad*M}else{Z=ad*M;J=p.getTotalLength(T.path)-(S._.arrows.enddx*M||0)}V={};V["marker-"+af]="url(#"+ae+")";if(J||Z){V.d=Raphael.getSubpath(T.path,Z,J)}m(W,V);S._.arrows[af+"Path"]=I;S._.arrows[af+"Marker"]=ae;S._.arrows[af+"dx"]=ad;S._.arrows[af+"Type"]=K;S._.arrows[af+"String"]=U}else{if(N){Z=S._.arrows.startdx*M||0;J=p.getTotalLength(T.path)-Z}else{Z=0;J=p.getTotalLength(T.path)-(S._.arrows.enddx*M||0)}S._.arrows[af+"Path"]&&m(W,{d:Raphael.getSubpath(T.path,Z,J)});delete S._.arrows[af+"Path"];delete S._.arrows[af+"Marker"];delete S._.arrows[af+"dx"];delete S._.arrows[af+"Type"];delete S._.arrows[af+"String"]}for(V in y){if(y[e](V)&&!y[V]){var ac=p._g.doc.getElementById(V);ac&&ac.parentNode.removeChild(ac)}}}},z={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},o=function(N,L,M){L=z[G(L).toLowerCase()];if(L){var J=N.attrs["stroke-width"]||"1",E={round:J,square:J,butt:0}[N.attrs["stroke-linecap"]||M["stroke-linecap"]]||0,K=[],I=L.length;while(I--){K[I]=L[I]*J+((I%2)?1:-1)*E}m(N.node,{"stroke-dasharray":K.join(",")})}},A=function(S,aa){var W=S.node,T=S.attrs,Q=W.style.visibility;W.style.visibility="hidden";for(var V in aa){if(aa[e](V)){if(!p._availableAttrs[e](V)){continue}var U=aa[V];T[V]=U;switch(V){case"blur":S.blur(U);break;case"href":case"title":case"target":var Y=W.parentNode;if(Y.tagName.toLowerCase()!="a"){var L=m("a");Y.insertBefore(L,W);L.appendChild(W);Y=L}if(V=="target"){Y.setAttributeNS(s,"show",U=="blank"?"new":U)}else{Y.setAttributeNS(s,V,U)}break;case"cursor":W.style.cursor=U;break;case"transform":S.transform(U);break;case"arrow-start":c(S,U);break;case"arrow-end":c(S,U,1);break;case"clip-rect":var I=G(U).split(h);if(I.length==4){S.clip&&S.clip.parentNode.parentNode.removeChild(S.clip.parentNode);var J=m("clipPath"),X=m("rect");J.id=p.createUUID();m(X,{x:I[0],y:I[1],width:I[2],height:I[3]});J.appendChild(X);S.paper.defs.appendChild(J);m(W,{"clip-path":"url(#"+J.id+")"});S.clip=X}if(!U){var R=W.getAttribute("clip-path");if(R){var Z=p._g.doc.getElementById(R.replace(/(^url\(#|\)$)/g,v));Z&&Z.parentNode.removeChild(Z);m(W,{"clip-path":v});delete S.clip}}break;case"path":if(S.type=="path"){m(W,{d:U?T.path=p._pathToAbsolute(U):"M0,0"});S._.dirty=1;if(S._.arrows){"startString" in S._.arrows&&c(S,S._.arrows.startString);"endString" in S._.arrows&&c(S,S._.arrows.endString,1)}}break;case"width":W.setAttribute(V,U);S._.dirty=1;if(T.fx){V="x";U=T.x}else{break}case"x":if(T.fx){U=-T.x-(T.width||0)}case"rx":if(V=="rx"&&S.type=="rect"){break}case"cx":W.setAttribute(V,U);S.pattern&&b(S);S._.dirty=1;break;case"height":W.setAttribute(V,U);S._.dirty=1;if(T.fy){V="y";U=T.y}else{break}case"y":if(T.fy){U=-T.y-(T.height||0)}case"ry":if(V=="ry"&&S.type=="rect"){break}case"cy":W.setAttribute(V,U);S.pattern&&b(S);S._.dirty=1;break;case"r":if(S.type=="rect"){m(W,{rx:U,ry:U})}else{W.setAttribute(V,U)}S._.dirty=1;break;case"src":if(S.type=="image"){W.setAttributeNS(s,"href",U)}break;case"stroke-width":if(S._.sx!=1||S._.sy!=1){U/=H(w(S._.sx),w(S._.sy))||1}if(S.paper._vbSize){U*=S.paper._vbSize}W.setAttribute(V,U);if(T["stroke-dasharray"]){o(S,T["stroke-dasharray"],aa)}if(S._.arrows){"startString" in S._.arrows&&c(S,S._.arrows.startString);"endString" in S._.arrows&&c(S,S._.arrows.endString,1)}break;case"stroke-dasharray":o(S,U,aa);break;case"fill":var M=G(U).match(p._ISURL);if(M){J=m("pattern");var P=m("image");J.id=p.createUUID();m(J,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});m(P,{x:0,y:0,"xlink:href":M[1]});J.appendChild(P);(function(ab){p._preload(M[1],function(){var ac=this.offsetWidth,ad=this.offsetHeight;m(ab,{width:ac,height:ad});m(P,{width:ac,height:ad});S.paper.safari()})})(J);S.paper.defs.appendChild(J);m(W,{fill:"url(#"+J.id+")"});S.pattern=J;S.pattern&&b(S);break}var K=p.getRGB(U);if(!K.error){delete aa.gradient;delete T.gradient;!p.is(T.opacity,"undefined")&&p.is(aa.opacity,"undefined")&&m(W,{opacity:T.opacity});!p.is(T["fill-opacity"],"undefined")&&p.is(aa["fill-opacity"],"undefined")&&m(W,{"fill-opacity":T["fill-opacity"]})}else{if((S.type=="circle"||S.type=="ellipse"||G(U).charAt()!="r")&&a(S,U)){if("opacity" in T||"fill-opacity" in T){var E=p._g.doc.getElementById(W.getAttribute("fill").replace(/^url\(#|\)$/g,v));if(E){var N=E.getElementsByTagName("stop");m(N[N.length-1],{"stop-opacity":("opacity" in T?T.opacity:1)*("fill-opacity" in T?T["fill-opacity"]:1)})}}T.gradient=U;T.fill="none";break}}K[e]("opacity")&&m(W,{"fill-opacity":K.opacity>1?K.opacity/100:K.opacity});case"stroke":K=p.getRGB(U);W.setAttribute(V,K.hex);V=="stroke"&&K[e]("opacity")&&m(W,{"stroke-opacity":K.opacity>1?K.opacity/100:K.opacity});if(V=="stroke"&&S._.arrows){"startString" in S._.arrows&&c(S,S._.arrows.startString);"endString" in S._.arrows&&c(S,S._.arrows.endString,1)}break;case"gradient":(S.type=="circle"||S.type=="ellipse"||G(U).charAt()!="r")&&a(S,U);break;case"opacity":if(T.gradient&&!T[e]("stroke-opacity")){m(W,{"stroke-opacity":U>1?U/100:U})}case"fill-opacity":if(T.gradient){E=p._g.doc.getElementById(W.getAttribute("fill").replace(/^url\(#|\)$/g,v));if(E){N=E.getElementsByTagName("stop");m(N[N.length-1],{"stop-opacity":U})}break}default:V=="font-size"&&(U=u(U,10)+"px");var O=V.replace(/(\-.)/g,function(ab){return ab.substring(1).toUpperCase()});W.style[O]=U;S._.dirty=1;W.setAttribute(V,U);break}}}t(S,aa);W.style.visibility=Q},F=1.2,t=function(E,L){if(E.type!="text"||!(L[e]("text")||L[e]("font")||L[e]("font-size")||L[e]("x")||L[e]("y"))){return}var Q=E.attrs,J=E.node,S=J.firstChild?u(p._g.doc.defaultView.getComputedStyle(J.firstChild,v).getPropertyValue("font-size"),10):10;if(L[e]("text")){Q.text=L.text;while(J.firstChild){J.removeChild(J.firstChild)}var K=G(L.text).split("\n"),I=[],O;for(var M=0,R=K.length;M<R;M++){O=m("tspan");M&&m(O,{dy:S*F,x:Q.x});O.appendChild(p._g.doc.createTextNode(K[M]));J.appendChild(O);I[M]=O}}else{I=J.getElementsByTagName("tspan");for(M=0,R=I.length;M<R;M++){if(M){m(I[M],{dy:S*F,x:Q.x})}else{m(I[0],{dy:0})}}}m(J,{x:Q.x,y:Q.y});E._.dirty=1;var N=E._getBBox(),P=Q.y-(N.y+N.height/2);P&&p.is(P,"finite")&&m(I[0],{dy:P})},x=function(I,E){var K=0,J=0;this[0]=this.node=I;I.raphael=true;this.id=p._oid++;I.raphaelid=this.id;this.matrix=p.matrix();this.realPath=null;this.paper=E;this.attrs=this.attrs||{};this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1};!E.bottom&&(E.bottom=this);this.prev=E.top;E.top&&(E.top.next=this);E.top=this;this.next=null},q=p.el;x.prototype=q;q.constructor=x;p._engine.path=function(E,K){var I=m("path");K.canvas&&K.canvas.appendChild(I);var J=new x(I,K);J.type="path";A(J,{fill:"none",stroke:"#000",path:E});return J};q.rotate=function(I,E,K){if(this.removed){return this}I=G(I).split(h);if(I.length-1){E=r(I[1]);K=r(I[2])}I=r(I[0]);(K==null)&&(E=K);if(E==null||K==null){var J=this.getBBox(1);E=J.x+J.width/2;K=J.y+J.height/2}this.transform(this._.transform.concat([["r",I,E,K]]));return this};q.scale=function(L,J,E,K){if(this.removed){return this}L=G(L).split(h);if(L.length-1){J=r(L[1]);E=r(L[2]);K=r(L[3])}L=r(L[0]);(J==null)&&(J=L);(K==null)&&(E=K);if(E==null||K==null){var I=this.getBBox(1)}E=E==null?I.x+I.width/2:E;K=K==null?I.y+I.height/2:K;this.transform(this._.transform.concat([["s",L,J,E,K]]));return this};q.translate=function(I,E){if(this.removed){return this}I=G(I).split(h);if(I.length-1){E=r(I[1])}I=r(I[0])||0;E=+E||0;this.transform(this._.transform.concat([["t",I,E]]));return this};q.transform=function(I){var J=this._;if(I==null){return J.transform}p._extractTransform(this,I);this.clip&&m(this.clip,{transform:this.matrix.invert()});this.pattern&&b(this);this.node&&m(this.node,{transform:this.matrix});if(J.sx!=1||J.sy!=1){var E=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":E})}return this};q.hide=function(){!this.removed&&this.paper.safari(this.node.style.display="none");return this};q.show=function(){!this.removed&&this.paper.safari(this.node.style.display="");return this};q.remove=function(){if(this.removed||!this.node.parentNode){return}var I=this.paper;I.__set__&&I.__set__.exclude(this);D.unbind("raphael.*.*."+this.id);if(this.gradient){I.defs.removeChild(this.gradient)}p._tear(this,I);if(this.node.parentNode.tagName.toLowerCase()=="a"){this.node.parentNode.parentNode.removeChild(this.node.parentNode)}else{this.node.parentNode.removeChild(this.node)}for(var E in this){this[E]=typeof this[E]=="function"?p._removedFactory(E):null}this.removed=true};q._getBBox=function(){if(this.node.style.display=="none"){this.show();var E=true}var J={};try{J=this.node.getBBox()}catch(I){}finally{J=J||{}}E&&this.hide();return J};q.attr=function(E,Q){if(this.removed){return this}if(E==null){var N={};for(var P in this.attrs){if(this.attrs[e](P)){N[P]=this.attrs[P]}}N.gradient&&N.fill=="none"&&(N.fill=N.gradient)&&delete N.gradient;N.transform=this._.transform;return N}if(Q==null&&p.is(E,"string")){if(E=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient}if(E=="transform"){return this._.transform}var O=E.split(h),K={};for(var L=0,S=O.length;L<S;L++){E=O[L];if(E in this.attrs){K[E]=this.attrs[E]}else{if(p.is(this.paper.customAttributes[E],"function")){K[E]=this.paper.customAttributes[E].def}else{K[E]=p._availableAttrs[E]}}}return S-1?K:K[O[0]]}if(Q==null&&p.is(E,"array")){K={};for(L=0,S=E.length;L<S;L++){K[E[L]]=this.attr(E[L])}return K}if(Q!=null){var I={};I[E]=Q}else{if(E!=null&&p.is(E,"object")){I=E}}for(var R in I){D("raphael.attr."+R+"."+this.id,this,I[R])}for(R in this.paper.customAttributes){if(this.paper.customAttributes[e](R)&&I[e](R)&&p.is(this.paper.customAttributes[R],"function")){var M=this.paper.customAttributes[R].apply(this,[].concat(I[R]));this.attrs[R]=I[R];for(var J in M){if(M[e](J)){I[J]=M[J]}}}}A(this,I);return this};q.toFront=function(){if(this.removed){return this}if(this.node.parentNode.tagName.toLowerCase()=="a"){this.node.parentNode.parentNode.appendChild(this.node.parentNode)}else{this.node.parentNode.appendChild(this.node)}var E=this.paper;E.top!=this&&p._tofront(this,E);return this};q.toBack=function(){if(this.removed){return this}var I=this.node.parentNode;if(I.tagName.toLowerCase()=="a"){I.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild)}else{if(I.firstChild!=this.node){I.insertBefore(this.node,this.node.parentNode.firstChild)}}p._toback(this,this.paper);var E=this.paper;return this};q.insertAfter=function(E){if(this.removed){return this}var I=E.node||E[E.length-1].node;if(I.nextSibling){I.parentNode.insertBefore(this.node,I.nextSibling)}else{I.parentNode.appendChild(this.node)}p._insertafter(this,E,this.paper);return this};q.insertBefore=function(E){if(this.removed){return this}var I=E.node||E[0].node;I.parentNode.insertBefore(this.node,I);p._insertbefore(this,E,this.paper);return this};q.blur=function(I){var E=this;if(+I!==0){var J=m("filter"),K=m("feGaussianBlur");E.attrs.blur=I;J.id=p.createUUID();m(K,{stdDeviation:+I||1.5});J.appendChild(K);E.paper.defs.appendChild(J);E._blur=J;m(E.node,{filter:"url(#"+J.id+")"})}else{if(E._blur){E._blur.parentNode.removeChild(E._blur);delete E._blur;delete E.attrs.blur}E.node.removeAttribute("filter")}};p._engine.circle=function(I,E,M,L){var K=m("circle");I.canvas&&I.canvas.appendChild(K);var J=new x(K,I);J.attrs={cx:E,cy:M,r:L,fill:"none",stroke:"#000"};J.type="circle";m(K,J.attrs);return J};p._engine.rect=function(J,E,O,I,M,N){var L=m("rect");J.canvas&&J.canvas.appendChild(L);var K=new x(L,J);K.attrs={x:E,y:O,width:I,height:M,r:N||0,rx:N||0,ry:N||0,fill:"none",stroke:"#000"};K.type="rect";m(L,K.attrs);return K};p._engine.ellipse=function(I,E,N,M,L){var K=m("ellipse");I.canvas&&I.canvas.appendChild(K);var J=new x(K,I);J.attrs={cx:E,cy:N,rx:M,ry:L,fill:"none",stroke:"#000"};J.type="ellipse";m(K,J.attrs);return J};p._engine.image=function(J,N,E,O,I,M){var L=m("image");m(L,{x:E,y:O,width:I,height:M,preserveAspectRatio:"none"});L.setAttributeNS(s,"href",N);J.canvas&&J.canvas.appendChild(L);var K=new x(L,J);K.attrs={x:E,y:O,width:I,height:M,src:N};K.type="image";return K};p._engine.text=function(I,E,M,L){var K=m("text");I.canvas&&I.canvas.appendChild(K);var J=new x(K,I);J.attrs={x:E,y:M,"text-anchor":"middle",text:L,font:p._availableAttrs.font,stroke:"none",fill:"#000"};J.type="text";A(J,J.attrs);return J};p._engine.setSize=function(I,E){this.width=I||this.width;this.height=E||this.height;this.canvas.setAttribute("width",this.width);this.canvas.setAttribute("height",this.height);if(this._viewBox){this.setViewBox.apply(this,this._viewBox)}return this};p._engine.create=function(){var K=p._getContainer.apply(0,arguments),I=K&&K.container,O=K.x,N=K.y,J=K.width,P=K.height;if(!I){throw new Error("SVG container not found.")}var E=m("svg"),M="overflow:hidden;",L;O=O||0;N=N||0;J=J||512;P=P||342;m(E,{height:P,version:1.1,width:J,xmlns:"http://www.w3.org/2000/svg"});if(I==1){E.style.cssText=M+"position:absolute;left:"+O+"px;top:"+N+"px";p._g.doc.body.appendChild(E);L=1}else{E.style.cssText=M+"position:relative";if(I.firstChild){I.insertBefore(E,I.firstChild)}else{I.appendChild(E)}}I=new p._Paper;I.width=J;I.height=P;I.canvas=E;I.clear();I._left=I._top=0;L&&(I.renderfix=function(){});I.renderfix();return I};p._engine.setViewBox=function(M,K,O,E,I){D("raphael.setViewBox",this,this._viewBox,[M,K,O,E,I]);var Q=H(O/this.width,E/this.height),L=this.top,P=I?"meet":"xMinYMin",J,N;if(M==null){if(this._vbSize){Q=1}delete this._vbSize;J="0 0 "+this.width+n+this.height}else{this._vbSize=Q;J=M+n+K+n+O+n+E}m(this.canvas,{viewBox:J,preserveAspectRatio:P});while(Q&&L){N="stroke-width" in L.attrs?L.attrs["stroke-width"]:1;L.attr({"stroke-width":N});L._.dirty=1;L._.dirtyT=1;L=L.prev}this._viewBox=[M,K,O,E,!!I];return this};p.prototype.renderfix=function(){var M=this.canvas,E=M.style,L;try{L=M.getScreenCTM()||M.createSVGMatrix()}catch(K){L=M.createSVGMatrix()}var J=-L.e%1,I=-L.f%1;if(J||I){if(J){this._left=(this._left+J)%1;E.left=this._left+"px"}if(I){this._top=(this._top+I)%1;E.top=this._top+"px"}}};p.prototype.clear=function(){p.eve("raphael.clear",this);var E=this.canvas;while(E.firstChild){E.removeChild(E.firstChild)}this.bottom=this.top=null;(this.desc=m("desc")).appendChild(p._g.doc.createTextNode("Created with Rapha\xebl "+p.version));E.appendChild(this.desc);E.appendChild(this.defs=m("defs"))};p.prototype.remove=function(){D("raphael.remove",this);this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var E in this){this[E]=typeof this[E]=="function"?p._removedFactory(E):null}};var B=p.st;for(var f in q){if(q[e](f)&&!B[e](f)){B[f]=(function(E){return function(){var I=arguments;return this.forEach(function(J){J[E].apply(J,I)})}})(f)}}}(window.Raphael);window.Raphael.vml&&function(p){var f="hasOwnProperty",J=String,r=parseFloat,l=Math,G=l.round,M=l.max,H=l.min,w=l.abs,z="fill",m=/[, ]+/,F=p.eve,A=" progid:DXImageTransform.Microsoft",o=" ",u="",I={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},n=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,L=/-?[^,\s-]+/g,e="position:absolute;left:0;top:0;width:1px;height:1px",b=21600,D={path:1,rect:1,image:1},v={circle:1,ellipse:1},g=function(W){var T=/[ahqstv]/ig,O=p._pathToAbsolute;J(W).match(T)&&(O=p._path2curve);T=/[clmz]/g;if(O==p._pathToAbsolute&&!J(W).match(T)){var S=J(W).replace(n,function(aa,ac,Y){var ab=[],X=ac.toLowerCase()=="m",Z=I[ac];Y.replace(L,function(ad){if(X&&ab.length==2){Z+=ab+I[ac=="m"?"l":"L"];ab=[]}ab.push(G(ad*b))});return Z+ab});return S}var U=O(W),N,E;S=[];for(var Q=0,V=U.length;Q<V;Q++){N=U[Q];E=U[Q][0].toLowerCase();E=="z"&&(E="x");for(var P=1,R=N.length;P<R;P++){E+=G(N[P]*b)+(P!=R-1?",":u)}S.push(E)}return S.join(o)},s=function(P,O,N){var E=p.matrix();E.rotate(-P,0.5,0.5);return{dx:E.x(O,N),dy:E.y(O,N)}},t=function(V,U,T,Q,P,R){var ad=V._,X=V.matrix,E=ad.fillpos,W=V.node,S=W.style,O=1,N="",Z,ab=b/U,aa=b/T;S.visibility="hidden";if(!U||!T){return}W.coordsize=w(ab)+o+w(aa);S.rotation=R*(U*T<0?-1:1);if(R){var ac=s(R,Q,P);Q=ac.dx;P=ac.dy}U<0&&(N+="x");T<0&&(N+=" y")&&(O=-1);S.flip=N;W.coordorigin=(Q*-ab)+o+(P*-aa);if(E||ad.fillsize){var Y=W.getElementsByTagName(z);Y=Y&&Y[0];W.removeChild(Y);if(E){ac=s(R,X.x(E[0],E[1]),X.y(E[0],E[1]));Y.position=ac.dx*O+o+ac.dy*O}if(ad.fillsize){Y.size=ad.fillsize[0]*w(U)+o+ad.fillsize[1]*w(T)}W.appendChild(Y)}S.visibility="visible"};p.toString=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version};var c=function(E,S,N){var U=J(S).toLowerCase().split("-"),Q=N?"end":"start",O=U.length,R="classic",T="medium",P="medium";while(O--){switch(U[O]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":R=U[O];break;case"wide":case"narrow":P=U[O];break;case"long":case"short":T=U[O];break}}var V=E.node.getElementsByTagName("stroke")[0];V[Q+"arrow"]=R;V[Q+"arrowlength"]=T;V[Q+"arrowwidth"]=P},B=function(ad,an){ad.attrs=ad.attrs||{};var ai=ad.node,ar=ad.attrs,Z=ai.style,V,al=D[ad.type]&&(an.x!=ar.x||an.y!=ar.y||an.width!=ar.width||an.height!=ar.height||an.cx!=ar.cx||an.cy!=ar.cy||an.rx!=ar.rx||an.ry!=ar.ry||an.r!=ar.r),ac=v[ad.type]&&(ar.cx!=an.cx||ar.cy!=an.cy||ar.r!=an.r||ar.rx!=an.rx||ar.ry!=an.ry),av=ad;for(var aa in an){if(an[f](aa)){ar[aa]=an[aa]}}if(al){ar.path=p._getPath[ad.type](ad);ad._.dirty=1}an.href&&(ai.href=an.href);an.title&&(ai.title=an.title);an.target&&(ai.target=an.target);an.cursor&&(Z.cursor=an.cursor);"blur" in an&&ad.blur(an.blur);if(an.path&&ad.type=="path"||al){ai.path=g(~J(ar.path).toLowerCase().indexOf("r")?p._pathToAbsolute(ar.path):ar.path);if(ad.type=="image"){ad._.fillpos=[ar.x,ar.y];ad._.fillsize=[ar.width,ar.height];t(ad,1,1,0,0,0)}}"transform" in an&&ad.transform(an.transform);if(ac){var Q=+ar.cx,O=+ar.cy,U=+ar.rx||+ar.r||0,T=+ar.ry||+ar.r||0;ai.path=p.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",G((Q-U)*b),G((O-T)*b),G((Q+U)*b),G((O+T)*b),G(Q*b))}if("clip-rect" in an){var N=J(an["clip-rect"]).split(m);if(N.length==4){N[2]=+N[2]+(+N[0]);N[3]=+N[3]+(+N[1]);var ab=ai.clipRect||p._g.doc.createElement("div"),au=ab.style;au.clip=p.format("rect({1}px {2}px {3}px {0}px)",N);if(!ai.clipRect){au.position="absolute";au.top=0;au.left=0;au.width=ad.paper.width+"px";au.height=ad.paper.height+"px";ai.parentNode.insertBefore(ab,ai);ab.appendChild(ai);ai.clipRect=ab}}if(!an["clip-rect"]){ai.clipRect&&(ai.clipRect.style.clip="auto")}}if(ad.textpath){var ap=ad.textpath.style;an.font&&(ap.font=an.font);an["font-family"]&&(ap.fontFamily='"'+an["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,u)+'"');an["font-size"]&&(ap.fontSize=an["font-size"]);an["font-weight"]&&(ap.fontWeight=an["font-weight"]);an["font-style"]&&(ap.fontStyle=an["font-style"])}if("arrow-start" in an){c(av,an["arrow-start"])}if("arrow-end" in an){c(av,an["arrow-end"],1)}if(an.opacity!=null||an["stroke-width"]!=null||an.fill!=null||an.src!=null||an.stroke!=null||an["stroke-width"]!=null||an["stroke-opacity"]!=null||an["fill-opacity"]!=null||an["stroke-dasharray"]!=null||an["stroke-miterlimit"]!=null||an["stroke-linejoin"]!=null||an["stroke-linecap"]!=null){var aj=ai.getElementsByTagName(z),aq=false;aj=aj&&aj[0];!aj&&(aq=aj=K(z));if(ad.type=="image"&&an.src){aj.src=an.src}an.fill&&(aj.on=true);if(aj.on==null||an.fill=="none"||an.fill===null){aj.on=false}if(aj.on&&an.fill){var S=J(an.fill).match(p._ISURL);if(S){aj.parentNode==ai&&ai.removeChild(aj);aj.rotate=true;aj.src=S[1];aj.type="tile";var E=ad.getBBox(1);aj.position=E.x+o+E.y;ad._.fillpos=[E.x,E.y];p._preload(S[1],function(){ad._.fillsize=[this.offsetWidth,this.offsetHeight]})}else{aj.color=p.getRGB(an.fill).hex;aj.src=u;aj.type="solid";if(p.getRGB(an.fill).error&&(av.type in {circle:1,ellipse:1}||J(an.fill).charAt()!="r")&&a(av,an.fill,aj)){ar.fill="none";ar.gradient=an.fill;aj.rotate=false}}}if("fill-opacity" in an||"opacity" in an){var R=((+ar["fill-opacity"]+1||2)-1)*((+ar.opacity+1||2)-1)*((+p.getRGB(an.fill).o+1||2)-1);R=H(M(R,0),1);aj.opacity=R;if(aj.src){aj.color="none"}}ai.appendChild(aj);var W=(ai.getElementsByTagName("stroke")&&ai.getElementsByTagName("stroke")[0]),at=false;!W&&(at=W=K("stroke"));if((an.stroke&&an.stroke!="none")||an["stroke-width"]||an["stroke-opacity"]!=null||an["stroke-dasharray"]||an["stroke-miterlimit"]||an["stroke-linejoin"]||an["stroke-linecap"]){W.on=true}(an.stroke=="none"||an.stroke===null||W.on==null||an.stroke==0||an["stroke-width"]==0)&&(W.on=false);var ah=p.getRGB(an.stroke);W.on&&an.stroke&&(W.color=ah.hex);R=((+ar["stroke-opacity"]+1||2)-1)*((+ar.opacity+1||2)-1)*((+ah.o+1||2)-1);var ae=(r(an["stroke-width"])||1)*0.75;R=H(M(R,0),1);an["stroke-width"]==null&&(ae=ar["stroke-width"]);an["stroke-width"]&&(W.weight=ae);ae&&ae<1&&(R*=ae)&&(W.weight=1);W.opacity=R;an["stroke-linejoin"]&&(W.joinstyle=an["stroke-linejoin"]||"miter");W.miterlimit=an["stroke-miterlimit"]||8;an["stroke-linecap"]&&(W.endcap=an["stroke-linecap"]=="butt"?"flat":an["stroke-linecap"]=="square"?"square":"round");if(an["stroke-dasharray"]){var ag={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};W.dashstyle=ag[f](an["stroke-dasharray"])?ag[an["stroke-dasharray"]]:u}at&&ai.appendChild(W)}if(av.type=="text"){av.paper.canvas.style.display=u;var ak=av.paper.span,af=100,P=ar.font&&ar.font.match(/\d+(?:\.\d*)?(?=px)/);Z=ak.style;ar.font&&(Z.font=ar.font);ar["font-family"]&&(Z.fontFamily=ar["font-family"]);ar["font-weight"]&&(Z.fontWeight=ar["font-weight"]);ar["font-style"]&&(Z.fontStyle=ar["font-style"]);P=r(ar["font-size"]||P&&P[0])||10;Z.fontSize=P*af+"px";av.textpath.string&&(ak.innerHTML=J(av.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Y=ak.getBoundingClientRect();av.W=ar.w=(Y.right-Y.left)/af;av.H=ar.h=(Y.bottom-Y.top)/af;av.X=ar.x;av.Y=ar.y+av.H/2;("x" in an||"y" in an)&&(av.path.v=p.format("m{0},{1}l{2},{1}",G(ar.x*b),G(ar.y*b),G(ar.x*b)+1));var X=["x","y","text","font","font-family","font-weight","font-style","font-size"];for(var am=0,ao=X.length;am<ao;am++){if(X[am] in an){av._.dirty=1;break}}switch(ar["text-anchor"]){case"start":av.textpath.style["v-text-align"]="left";av.bbx=av.W/2;break;case"end":av.textpath.style["v-text-align"]="right";av.bbx=-av.W/2;break;default:av.textpath.style["v-text-align"]="center";av.bbx=0;break}av.textpath.style["v-text-kern"]=true}},a=function(E,V,Y){E.attrs=E.attrs||{};var W=E.attrs,P=Math.pow,Q,R,T="linear",U=".5 .5";E.attrs.gradient=V;V=J(V).replace(p._radial_gradient,function(ab,ac,aa){T="radial";if(ac&&aa){ac=r(ac);aa=r(aa);P(ac-0.5,2)+P(aa-0.5,2)>0.25&&(aa=l.sqrt(0.25-P(ac-0.5,2))*((aa>0.5)*2-1)+0.5);U=ac+o+aa}return u});V=V.split(/\s*\-\s*/);if(T=="linear"){var N=V.shift();N=-r(N);if(isNaN(N)){return null}}var S=p._parseDots(V);if(!S){return null}E=E.shape||E.node;if(S.length){E.removeChild(Y);Y.on=true;Y.method="none";Y.color=S[0].color;Y.color2=S[S.length-1].color;var Z=[];for(var O=0,X=S.length;O<X;O++){S[O].offset&&Z.push(S[O].offset+o+S[O].color)}Y.colors=Z.length?Z.join():"0% "+Y.color;if(T=="radial"){Y.type="gradientTitle";Y.focus="100%";Y.focussize="0 0";Y.focusposition=U;Y.angle=0}else{Y.type="gradient";Y.angle=(270-N)%360}E.appendChild(Y)}return 1},y=function(N,E){this[0]=this.node=N;N.raphael=true;this.id=p._oid++;N.raphaelid=this.id;this.X=0;this.Y=0;this.attrs={};this.paper=E;this.matrix=p.matrix();this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1};!E.bottom&&(E.bottom=this);this.prev=E.top;E.top&&(E.top.next=this);E.top=this;this.next=null};var q=p.el;y.prototype=q;q.constructor=y;q.transform=function(Q){if(Q==null){return this._.transform}var S=this.paper._viewBoxShift,R=S?"s"+[S.scale,S.scale]+"-1-1t"+[S.dx,S.dy]:u,V;if(S){V=Q=J(Q).replace(/\.{3}|\u2026/g,this._.transform||u)}p._extractTransform(this,R+Q);var W=this.matrix.clone(),Y=this.skew,O=this.node,U,P=~J(this.attrs.fill).indexOf("-"),E=!J(this.attrs.fill).indexOf("url(");W.translate(-0.5,-0.5);if(E||P||this.type=="image"){Y.matrix="1 0 0 1";Y.offset="0 0";U=W.split();if((P&&U.noRotation)||!U.isSimple){O.style.filter=W.toFilter();var T=this.getBBox(),N=this.getBBox(1),Z=T.x-N.x,X=T.y-N.y;O.coordorigin=(Z*-b)+o+(X*-b);t(this,1,1,Z,X,0)}else{O.style.filter=u;t(this,U.scalex,U.scaley,U.dx,U.dy,U.rotate)}}else{O.style.filter=u;Y.matrix=J(W);Y.offset=W.offset()}V&&(this._.transform=V);return this};q.rotate=function(N,E,P){if(this.removed){return this}if(N==null){return}N=J(N).split(m);if(N.length-1){E=r(N[1]);P=r(N[2])}N=r(N[0]);(P==null)&&(E=P);if(E==null||P==null){var O=this.getBBox(1);E=O.x+O.width/2;P=O.y+O.height/2}this._.dirtyT=1;this.transform(this._.transform.concat([["r",N,E,P]]));return this};q.translate=function(N,E){if(this.removed){return this}N=J(N).split(m);if(N.length-1){E=r(N[1])}N=r(N[0])||0;E=+E||0;if(this._.bbox){this._.bbox.x+=N;this._.bbox.y+=E}this.transform(this._.transform.concat([["t",N,E]]));return this};q.scale=function(Q,O,E,P){if(this.removed){return this}Q=J(Q).split(m);if(Q.length-1){O=r(Q[1]);E=r(Q[2]);P=r(Q[3]);isNaN(E)&&(E=null);isNaN(P)&&(P=null)}Q=r(Q[0]);(O==null)&&(O=Q);(P==null)&&(E=P);if(E==null||P==null){var N=this.getBBox(1)}E=E==null?N.x+N.width/2:E;P=P==null?N.y+N.height/2:P;this.transform(this._.transform.concat([["s",Q,O,E,P]]));this._.dirtyT=1;return this};q.hide=function(){!this.removed&&(this.node.style.display="none");return this};q.show=function(){!this.removed&&(this.node.style.display=u);return this};q._getBBox=function(){if(this.removed){return{}}return{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}};q.remove=function(){if(this.removed||!this.node.parentNode){return}this.paper.__set__&&this.paper.__set__.exclude(this);p.eve.unbind("raphael.*.*."+this.id);p._tear(this,this.paper);this.node.parentNode.removeChild(this.node);this.shape&&this.shape.parentNode.removeChild(this.shape);for(var E in this){this[E]=typeof this[E]=="function"?p._removedFactory(E):null}this.removed=true};q.attr=function(E,V){if(this.removed){return this}if(E==null){var S={};for(var U in this.attrs){if(this.attrs[f](U)){S[U]=this.attrs[U]}}S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;S.transform=this._.transform;return S}if(V==null&&p.is(E,"string")){if(E==z&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient}var T=E.split(m),P={};for(var Q=0,X=T.length;Q<X;Q++){E=T[Q];if(E in this.attrs){P[E]=this.attrs[E]}else{if(p.is(this.paper.customAttributes[E],"function")){P[E]=this.paper.customAttributes[E].def}else{P[E]=p._availableAttrs[E]}}}return X-1?P:P[T[0]]}if(this.attrs&&V==null&&p.is(E,"array")){P={};for(Q=0,X=E.length;Q<X;Q++){P[E[Q]]=this.attr(E[Q])}return P}var N;if(V!=null){N={};N[E]=V}V==null&&p.is(E,"object")&&(N=E);for(var W in N){F("raphael.attr."+W+"."+this.id,this,N[W])}if(N){for(W in this.paper.customAttributes){if(this.paper.customAttributes[f](W)&&N[f](W)&&p.is(this.paper.customAttributes[W],"function")){var R=this.paper.customAttributes[W].apply(this,[].concat(N[W]));this.attrs[W]=N[W];for(var O in R){if(R[f](O)){N[O]=R[O]}}}}if(N.text&&this.type=="text"){this.textpath.string=N.text}B(this,N)}return this};q.toFront=function(){!this.removed&&this.node.parentNode.appendChild(this.node);this.paper&&this.paper.top!=this&&p._tofront(this,this.paper);return this};q.toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);p._toback(this,this.paper)}return this};q.insertAfter=function(E){if(this.removed){return this}if(E.constructor==p.st.constructor){E=E[E.length-1]}if(E.node.nextSibling){E.node.parentNode.insertBefore(this.node,E.node.nextSibling)}else{E.node.parentNode.appendChild(this.node)}p._insertafter(this,E,this.paper);return this};q.insertBefore=function(E){if(this.removed){return this}if(E.constructor==p.st.constructor){E=E[0]}E.node.parentNode.insertBefore(this.node,E.node);p._insertbefore(this,E,this.paper);return this};q.blur=function(E){var N=this.node.runtimeStyle,O=N.filter;O=O.replace(x,u);if(+E!==0){this.attrs.blur=E;N.filter=O+o+A+".Blur(pixelradius="+(+E||1.5)+")";N.margin=p.format("-{0}px 0 0 -{0}px",G(+E||1.5))}else{N.filter=O;N.margin=0;delete this.attrs.blur}};p._engine.path=function(P,N){var Q=K("shape");Q.style.cssText=e;Q.coordsize=b+o+b;Q.coordorigin=N.coordorigin;var R=new y(Q,N),E={fill:"none",stroke:"#000"};P&&(E.path=P);R.type="path";R.path=[];R.Path=u;B(R,E);N.canvas.appendChild(Q);var O=K("skew");O.on=true;Q.appendChild(O);R.skew=O;R.transform(u);return R};p._engine.rect=function(N,S,Q,T,O,E){var U=p._rectPath(S,Q,T,O,E),P=N.path(U),R=P.attrs;P.X=R.x=S;P.Y=R.y=Q;P.W=R.width=T;P.H=R.height=O;R.r=E;R.path=U;P.type="rect";return P};p._engine.ellipse=function(N,E,S,R,Q){var P=N.path(),O=P.attrs;P.X=E-R;P.Y=S-Q;P.W=R*2;P.H=Q*2;P.type="ellipse";B(P,{cx:E,cy:S,rx:R,ry:Q});return P};p._engine.circle=function(N,E,R,Q){var P=N.path(),O=P.attrs;P.X=E-Q;P.Y=R-Q;P.W=P.H=Q*2;P.type="circle";B(P,{cx:E,cy:R,r:Q});return P};p._engine.image=function(N,E,T,R,U,P){var W=p._rectPath(T,R,U,P),Q=N.path(W).attr({stroke:"none"}),S=Q.attrs,O=Q.node,V=O.getElementsByTagName(z)[0];S.src=E;Q.X=S.x=T;Q.Y=S.y=R;Q.W=S.width=U;Q.H=S.height=P;S.path=W;Q.type="image";V.parentNode==O&&O.removeChild(V);V.rotate=true;V.src=E;V.type="tile";Q._.fillpos=[T,R];Q._.fillsize=[U,P];O.appendChild(V);t(Q,1,1,0,0,0);return Q};p._engine.text=function(E,S,R,T){var P=K("shape"),V=K("path"),O=K("textpath");S=S||0;R=R||0;T=T||"";V.v=p.format("m{0},{1}l{2},{1}",G(S*b),G(R*b),G(S*b)+1);V.textpathok=true;O.string=J(T);O.on=true;P.style.cssText=e;P.coordsize=b+o+b;P.coordorigin="0 0";var N=new y(P,E),Q={fill:"#000",stroke:"none",font:p._availableAttrs.font,text:T};N.shape=P;N.path=V;N.textpath=O;N.type="text";N.attrs.text=J(T);N.attrs.x=S;N.attrs.y=R;N.attrs.w=1;N.attrs.h=1;B(N,Q);P.appendChild(O);P.appendChild(V);E.canvas.appendChild(P);var U=K("skew");U.on=true;P.appendChild(U);N.skew=U;N.transform(u);return N};p._engine.setSize=function(O,E){var N=this.canvas.style;this.width=O;this.height=E;O==+O&&(O+="px");E==+E&&(E+="px");N.width=O;N.height=E;N.clip="rect(0 "+O+" "+E+" 0)";if(this._viewBox){p._engine.setViewBox.apply(this,this._viewBox)}return this};p._engine.setViewBox=function(R,Q,S,O,P){p.eve("raphael.setViewBox",this,this._viewBox,[R,Q,S,O,P]);var E=this.width,U=this.height,V=1/M(S/E,O/U),T,N;if(P){T=U/O;N=E/S;if(S*T<E){R-=(E-S*T)/2/T}if(O*N<U){Q-=(U-O*N)/2/N}}this._viewBox=[R,Q,S,O,!!P];this._viewBoxShift={dx:-R,dy:-Q,scale:V};this.forEach(function(W){W.transform("...")});return this};var K;p._engine.initWin=function(O){var N=O.document;N.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!N.namespaces.rvml&&N.namespaces.add("rvml","urn:schemas-microsoft-com:vml");K=function(P){return N.createElement("<rvml:"+P+' class="rvml">')}}catch(E){K=function(P){return N.createElement("<"+P+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}};p._engine.initWin(p._g.win);p._engine.create=function(){var O=p._getContainer.apply(0,arguments),E=O.container,U=O.height,V,N=O.width,T=O.x,S=O.y;if(!E){throw new Error("VML container not found.")}var Q=new p._Paper,R=Q.canvas=p._g.doc.createElement("div"),P=R.style;T=T||0;S=S||0;N=N||512;U=U||342;Q.width=N;Q.height=U;N==+N&&(N+="px");U==+U&&(U+="px");Q.coordsize=b*1000+o+b*1000;Q.coordorigin="0 0";Q.span=p._g.doc.createElement("span");Q.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";R.appendChild(Q.span);P.cssText=p.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",N,U);if(E==1){p._g.doc.body.appendChild(R);P.left=T+"px";P.top=S+"px";P.position="absolute"}else{if(E.firstChild){E.insertBefore(R,E.firstChild)}else{E.appendChild(R)}}Q.renderfix=function(){};return Q};p.prototype.clear=function(){p.eve("raphael.clear",this);this.canvas.innerHTML=u;this.span=p._g.doc.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";this.canvas.appendChild(this.span);this.bottom=this.top=null};p.prototype.remove=function(){p.eve("raphael.remove",this);this.canvas.parentNode.removeChild(this.canvas);for(var E in this){this[E]=typeof this[E]=="function"?p._removedFactory(E):null}return true};var C=p.st;for(var h in q){if(q[f](h)&&!C[f](h)){C[h]=(function(E){return function(){var N=arguments;return this.forEach(function(O){O[E].apply(O,N)})}})(h)}}}(window.Raphael);(function(){window.ScaleRaphael=function(c,f,b){var h=(typeof c=="string")?document.getElementById(c):c;if(!h.style.position){h.style.position="relative"}h.style.width=f+"px";h.style.height=b+"px";h.style.overflow="hidden";var e;if(Raphael.type=="VML"){h.innerHTML="<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup'></rvml:group>";e=document.getElementById("vmlgroup")}else{h.innerHTML="<div id='svggroup'></div>";e=document.getElementById("svggroup")}var g=new Raphael(e,f,b);var a;if(Raphael.type=="SVG"){g.canvas.setAttribute("viewBox","0 0 "+f+" "+b)}else{a=h.getElementsByTagName("div")[0]}g.changeSize=function(y,t,m,n){n=!n;var v=y/f;var p=t/b;var o=v<p?v:p;var l=parseInt(b*o);var s=parseInt(f*o);if(Raphael.type=="VML"){var r=document.getElementsByTagName("textpath");for(var q in r){var z=r[q];if(z.style){if(!z._fontSize){var x=z.style.font.split("px");z._fontSize=parseInt(x[0]);z._font=x[1]}z.style.font=z._fontSize*o+"px"+z._font}}var u;if(s<l){u=s*1000/f}else{u=l*1000/b}u=parseInt(u);e.style.width=u+"px";e.style.height=u+"px";if(n){e.style.left=parseInt((y-s)/2)+"px";e.style.top=parseInt((t-l)/2)+"px"}a.style.overflow="visible"}if(n){s=y;l=t}h.style.width=s+"px";h.style.height=l+"px";g.setSize(s,l);if(m){h.style.position="absolute";h.style.left=parseInt((y-s)/2)+"px";h.style.top=parseInt((t-l)/2)+"px"}};g.scaleAll=function(l){g.changeSize(f*l,b*l)};g.changeSize(f,b);g.w=f;g.h=b;return g}})();if(typeof exports==="undefined"){exports={}}if(typeof require!=="function"){require=function(a){return exports}}(function(){var F=function(aD){var aF=arguments[0],aC=1,aE=arguments[aC];while(aE){aF=aF.slice(0,-1)+aE.slice(1);aE=arguments[++aC]}return aF},v=function(aC){return"(?:"+aC+")"},c="[A-Za-z]",M="[\\x0D]",g="[0-9]",af="[\\x22]",at=F(g,"[A-Fa-f]"),ai="[\\x0A]",ac="[\\x20]",ak=v("%"+at+at),au="[\\:\\/\\?\\#\\[\\]\\@]",al="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",J=F(au,al),Q=F(c,g,"[\\-\\.\\_\\~]"),e=v(c+F(c,g,"[\\+\\-\\.]")+"*"),p=v(v(ak+"|"+F(Q,al,"[\\:]"))+"*"),U=v(v("25[0-5]")+"|"+v("2[0-4]"+g)+"|"+v("1"+g+g)+"|"+v("[1-9]"+g)+"|"+g),ar=v(U+"\\."+U+"\\."+U+"\\."+U),L=v(at+"{1,4}"),aw=v(v(L+"\\:"+L)+"|"+ar),ap=v(F(Q,al,"[\\:]")+"+"),R=v("v"+at+"+\\."+F(Q,al,"[\\:]")+"+"),aq=v("\\["+v(ap+"|"+R)+"\\]"),aB=v(v(ak+"|"+F(Q,al))+"*"),f=v(aq+"|"+ar+"|"+aB),Y=v(g+"*"),l=v(v(p+"@")+"?"+f+v("\\:"+Y)+"?"),r=v(ak+"|"+F(Q,al,"[\\:\\@]")),W=v(r+"*"),aj=v(r+"+"),ah=v(v(ak+"|"+F(Q,al,"[\\@]"))+"+"),a=v(v("\\/"+W)+"*"),q=v("\\/"+v(aj+a)+"?"),ax=v(ah+a),aA=v(aj+a),b=v(""),m=v(a+"|"+q+"|"+ax+"|"+aA+"|"+b),s=v(v(r+"|[\\/\\?]")+"*"),X=v(v(r+"|[\\/\\?]")+"*"),av=v(v("\\/\\/"+l+a)+"|"+q+"|"+aA+"|"+b),aa=v(e+"\\:"+av+v("\\?"+s)+"?"+v("\\#"+X)+"?"),P=v(v("\\/\\/"+l+a)+"|"+q+"|"+ax+"|"+b),u=v(P+v("\\?"+s)+"?"+v("\\#"+X)+"?"),w=v(aa+"|"+u),ay=v(e+"\\:"+av+v("\\?"+s)+"?"),t=new RegExp("^"+v("("+aa+")|("+u+")")+"$"),ao=new RegExp("^("+e+")\\:"+v(v("\\/\\/("+v("("+p+")@")+"?("+f+")"+v("\\:("+Y+")")+"?)")+"?("+a+"|"+q+"|"+aA+"|"+b+")")+v("\\?("+s+")")+"?"+v("\\#("+X+")")+"?$"),N=new RegExp("^(){0}"+v(v("\\/\\/("+v("("+p+")@")+"?("+f+")"+v("\\:("+Y+")")+"?)")+"?("+a+"|"+q+"|"+ax+"|"+b+")")+v("\\?("+s+")")+"?"+v("\\#("+X+")")+"?$"),G=new RegExp("^("+e+")\\:"+v(v("\\/\\/("+v("("+p+")@")+"?("+f+")"+v("\\:("+Y+")")+"?)")+"?("+a+"|"+q+"|"+aA+"|"+b+")")+v("\\?("+s+")")+"?$"),O=new RegExp("^"+v("\\#("+X+")")+"?$"),H=new RegExp("^"+v("("+p+")@")+"?("+f+")"+v("\\:("+Y+")")+"?$"),am=new RegExp(F("[^]",c,g,"[\\+\\-\\.]"),"g"),ab=new RegExp(F("[^\\%\\:]",Q,al),"g"),az=new RegExp(F("[^\\%]",Q,al),"g"),S=new RegExp(F("[^\\%\\/\\:\\@]",Q,al),"g"),Z=new RegExp(F("[^\\%\\/\\@]",Q,al),"g"),C=new RegExp(F("[^\\%]",Q,al,"[\\:\\@\\/\\?]"),"g"),K=C,V=new RegExp(F("[^]",Q,al),"g"),I=new RegExp(Q,"g"),x=new RegExp(F("[^\\%]",Q,J),"g"),T=new RegExp(ak+"+","g"),o=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/i,E=/^\.\.?\//,D=/^\/\.(\/|$)/,B=/^\/\.\.(\/|$)/,z=/^\.\.?$/,y=/^\/?.*?(?=\/|$)/,A=("").match(/(){0}/)[1]===undefined,n=function(aC){var aD=aC.charCodeAt(0);if(aD<128){return"%"+aD.toString(16).toUpperCase()}else{if((aD>127)&&(aD<2048)){return"%"+((aD>>6)|192).toString(16).toUpperCase()+"%"+((aD&63)|128).toString(16).toUpperCase()}else{return"%"+((aD>>12)|224).toString(16).toUpperCase()+"%"+(((aD>>6)&63)|128).toString(16).toUpperCase()+"%"+((aD&63)|128).toString(16).toUpperCase()}}},an=function(aF){var aC="",aD=0,aG,aE;while(aD<aF.length){aG=parseInt(aF.substr(aD+1,2),16);if(aG<128){aE=String.fromCharCode(aG);if(aE.match(I)){aC+=aE}else{aC+=aF.substr(aD,3)}aD+=3}else{if((aG>191)&&(aG<224)){aC+=aF.substr(aD,6);aD+=6}else{aC+=aF.substr(aD,9);aD+=9}}}return aC},h=function(aG){var aD="",aF=0,aH,aE,aC;while(aF<aG.length){aH=parseInt(aG.substr(aF+1,2),16);if(aH<128){aD+=String.fromCharCode(aH);aF+=3}else{if((aH>191)&&(aH<224)){aE=parseInt(aG.substr(aF+4,2),16);aD+=String.fromCharCode(((aH&31)<<6)|(aE&63));aF+=6}else{aE=parseInt(aG.substr(aF+4,2),16);aC=parseInt(aG.substr(aF+7,2),16);aD+=String.fromCharCode(((aH&15)<<12)|((aE&63)<<6)|(aC&63));aF+=9}}}return aD},ae=function(aC){return aC===undefined?"undefined":(aC===null?"null":Object.prototype.toString.call(aC).split(" ").pop().split("]").shift().toLowerCase())},ag=function(){this.errors=[]},ad=exports;ag.prototype={scheme:undefined,authority:undefined,userinfo:undefined,host:undefined,port:undefined,path:undefined,query:undefined,fragment:undefined,reference:undefined,errors:undefined};ad.SCHEMES={};ad.parse=function(aG,aC){var aF,aE=new ag(),aD;aG=aG?aG.toString():"";aC=aC||{};if(aC.reference==="suffix"){aG=(aC.scheme?aC.scheme+":":"")+"//"+aG}aF=aG.match(t);if(aF){if(aF[1]){aF=aG.match(ao)}else{aF=aG.match(N)}}if(!aF){if(!aC.tolerant){aE.errors.push("URI is not strictly valid.")}aF=aG.match(o)}if(aF){if(A){aE.scheme=aF[1];aE.authority=aF[2];aE.userinfo=aF[3];aE.host=aF[4];aE.port=parseInt(aF[5],10);aE.path=aF[6]||"";aE.query=aF[7];aE.fragment=aF[8];if(isNaN(aE.port)){aE.port=aF[5]}}else{aE.scheme=aF[1]||undefined;aE.authority=(aG.indexOf("//")!==-1?aF[2]:undefined);aE.userinfo=(aG.indexOf("@")!==-1?aF[3]:undefined);aE.host=(aG.indexOf("//")!==-1?aF[4]:undefined);aE.port=parseInt(aF[5],10);aE.path=aF[6]||"";aE.query=(aG.indexOf("?")!==-1?aF[7]:undefined);aE.fragment=(aG.indexOf("#")!==-1?aF[8]:undefined);if(isNaN(aE.port)){aE.port=(aG.match(/\/\/.*\:(?:\/|\?|\#|$)/)?aF[4]:undefined)}}if(!aE.scheme&&!aE.authority&&!aE.path&&!aE.query){aE.reference="same-document"}else{if(!aE.scheme){aE.reference="relative"}else{if(!aE.fragment){aE.reference="absolute"}else{aE.reference="uri"}}}if(aC.reference&&aC.reference!=="suffix"&&aC.reference!==aE.reference){aE.errors.push("URI is not a "+aC.reference+" reference.")}aD=ad.SCHEMES[(aE.scheme||aC.scheme||"").toLowerCase()];if(aD&&aD.parse){aD.parse(aE,aC)}}else{aE.errors.push("URI can not be parsed.")}return aE};ad._recomposeAuthority=function(aD){var aC=[];if(aD.userinfo!==undefined||aD.host!==undefined||typeof aD.port==="number"){if(aD.userinfo!==undefined){aC.push(aD.userinfo.toString().replace(ab,n));aC.push("@")}if(aD.host!==undefined){aC.push(aD.host.toString().toLowerCase().replace(az,n))}if(typeof aD.port==="number"){aC.push(":");aC.push(aD.port.toString(10))}}return aC.length?aC.join(""):undefined};ad.removeDotSegments=function(aD){var aC=[],aE;while(aD.length){if(aD.match(E)){aD=aD.replace(E,"")}else{if(aD.match(D)){aD=aD.replace(D,"/")}else{if(aD.match(B)){aD=aD.replace(B,"/");aC.pop()}else{if(aD==="."||aD===".."){aD=""}else{aE=aD.match(y)[0];aD=aD.slice(aE.length);aC.push(aE)}}}}}return aC.join("")};ad.serialize=function(aG,aC){var aE=[],aD,aF;aC=aC||{};aD=ad.SCHEMES[aG.scheme||aC.scheme];if(aD&&aD.serialize){aD.serialize(aG,aC)}if(aC.reference!=="suffix"&&aG.scheme){aE.push(aG.scheme.toString().toLowerCase().replace(am,""));aE.push(":")}aG.authority=ad._recomposeAuthority(aG);if(aG.authority!==undefined){if(aC.reference!=="suffix"){aE.push("//")}aE.push(aG.authority);if(aG.path&&aG.path.charAt(0)!=="/"){aE.push("/")}}if(aG.path){aF=ad.removeDotSegments(aG.path.toString().replace(/%2E/ig,"."));if(aG.scheme){aF=aF.replace(S,n)}else{aF=aF.replace(Z,n)}if(aG.authority===undefined){aF=aF.replace(/^\/\//,"/%2F")}aE.push(aF)}if(aG.query){aE.push("?");aE.push(aG.query.toString().replace(C,n))}if(aG.fragment){aE.push("#");aE.push(aG.fragment.toString().replace(K,n))}return aE.join("").replace(T,an).replace(/%[0-9A-Fa-f]{2}/g,function(aH){return aH.toUpperCase()})};ad.resolveComponents=function(aE,aD,aC,aG){var aF=new ag();if(!aG){aE=ad.parse(ad.serialize(aE,aC),aC);aD=ad.parse(ad.serialize(aD,aC),aC)}aC=aC||{};if(!aC.tolerant&&aD.scheme){aF.scheme=aD.scheme;aF.authority=aD.authority;aF.userinfo=aD.userinfo;aF.host=aD.host;aF.port=aD.port;aF.path=ad.removeDotSegments(aD.path);aF.query=aD.query}else{if(aD.authority!==undefined){aF.authority=aD.authority;aF.userinfo=aD.userinfo;aF.host=aD.host;aF.port=aD.port;aF.path=ad.removeDotSegments(aD.path);aF.query=aD.query}else{if(!aD.path){aF.path=aE.path;if(aD.query!==undefined){aF.query=aD.query}else{aF.query=aE.query}}else{if(aD.path.charAt(0)==="/"){aF.path=ad.removeDotSegments(aD.path)}else{if(aE.authority!==undefined&&!aE.path){aF.path="/"+aD.path}else{if(!aE.path){aF.path=aD.path}else{aF.path=aE.path.slice(0,aE.path.lastIndexOf("/")+1)+aD.path}}aF.path=ad.removeDotSegments(aF.path)}aF.query=aD.query}aF.authority=aE.authority;aF.userinfo=aE.userinfo;aF.host=aE.host;aF.port=aE.port}aF.scheme=aE.scheme}aF.fragment=aD.fragment;return aF};ad.resolve=function(aE,aD,aC){return ad.serialize(ad.resolveComponents(ad.parse(aE,aC),ad.parse(aD,aC),aC,true),aC)};ad.normalize=function(aD,aC){if(typeof aD==="string"){return ad.serialize(ad.parse(aD,aC),aC)}else{if(ae(aD)==="object"){return ad.parse(ad.serialize(aD,aC),aC)}}return aD};ad.equal=function(aE,aD,aC){if(typeof aE==="string"){aE=ad.serialize(ad.parse(aE,aC),aC)}else{if(ae(aE)==="object"){aE=ad.serialize(aE,aC)}}if(typeof aD==="string"){aD=ad.serialize(ad.parse(aD,aC),aC)}else{if(ae(aD)==="object"){aD=ad.serialize(aD,aC)}}return aE===aD};ad.escapeComponent=function(aC){return aC&&aC.toString().replace(V,n)};ad.unescapeComponent=function(aC){return aC&&aC.toString().replace(T,h)};exports.pctEncChar=n;exports.pctDecChars=h;exports.Components=ag;exports.URI=ad;exports.pctEncChar=n;exports.pctDecChars=h;exports.Components=ag;exports.URI={SCHEMES:ad.SCHEMES,parse:ad.parse,removeDotSegments:ad.removeDotSegments,serialize:ad.serialize,resolveComponents:ad.resolveComponents,resolve:ad.resolve,normalize:ad.normalize,equal:ad.equal,escapeComponent:ad.escapeComponent,unescapeComponent:ad.unescapeComponent}}());(function(){var n=require("../uri"),l=n.URI,p=n.pctEncChar,b="(?:[0-9A-Za-z][0-9A-Za-z\\-]{1,31})",e="(?:\\%[0-9A-Fa-f]{2})",f="[0-9A-Za-z\\(\\)\\+\\,\\-\\.\\:\\=\\@\\;\\$\\_\\!\\*\\'\\/\\?\\#]",a="(?:(?:"+e+"|"+f+")+)",m=new RegExp("^urn\\:("+b+")$"),g=new RegExp("^("+b+")\\:("+a+")$"),c=/^([^\:]+)\:(.*)/,h=/[\x00-\x20\\\"\&\<\>\[\]\^\`\{\|\}\~\x7F-\xFF]/g,o=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;l.SCHEMES.urn={parse:function(t,r){var u=t.path.match(g),q,s;if(!u){if(!r.tolerant){t.errors.push("URN is not strictly valid.")}u=t.path.match(c)}if(u){q="urn:"+u[1].toLowerCase();s=l.SCHEMES[q];if(!s){s=l.SCHEMES[q]={}}if(!s.serialize){s.serialize=l.SCHEMES.urn.serialize}t.scheme=q;t.path=u[2];if(s.parse){s.parse(t,r)}}else{t.errors.push("URN can not be parsed.")}return t},serialize:function(s,r){var q=s.scheme||r.scheme,t;if(q&&q!=="urn"){var t=q.match(m);if(!t){t=["urn:"+q,q]}s.scheme="urn";s.path=t[1]+":"+(s.path?s.path.replace(h,p):"")}return s}};l.SCHEMES["urn:uuid"]={serialize:function(r,q){if(!q.tolerant&&(!r.path||!r.path.match(o))){r.scheme=undefined}return l.SCHEMES.urn.serialize(r,q)}}}());var exports=exports||this,require=require||function(){return exports};(function(){var m=require("./uri/uri").URI,f={},E="0123456789abcdef".split(""),o,s,D,h;function e(F){return F===undefined?"undefined":(F===null?"null":Object.prototype.toString.call(F).split(" ").pop().split("]").shift().toLowerCase())}function p(){}function x(F){p.prototype=F||{};return new p()}function b(J,I,H){var F={},G;for(G in J){if(J[G]!==f[G]){F[G]=I.call(H,J[G],G,J)}}return F}o=function(G,J,I){var F=0,K=G.length,H=new Array(K);for(;F<K;++F){H[F]=J.call(I,G[F],F,G)}return H};if(Array.prototype.map){o=function(F,H,G){return Array.prototype.map.call(F,H,G)}}s=function(G,J,I){var F=0,K=G.length,H=[];for(;F<K;++F){if(J.call(I,G[F],F,G)){H[H.length]=G[F]}}return H};if(Array.prototype.filter){s=function(F,H,G){return Array.prototype.filter.call(F,H,G)}}D=function(G,H){var F=0,I=G.length;for(;F<I;++F){if(G[F]===H){return F}}return -1};if(Array.prototype.indexOf){D=function(F,G){return Array.prototype.indexOf.call(F,G)}}function z(F){return F!==undefined&&F!==null?(F instanceof Array&&!F.callee?F:(typeof F.length!=="number"||F.split||F.setInterval||F.call?[F]:Array.prototype.slice.call(F))):[]}function r(H){var F=[],G;switch(e(H)){case"object":for(G in H){if(H[G]!==f[G]){F[F.length]=G}}break;case"array":for(G=H.length-1;G>=0;--G){F[G]=G}break}return F}function g(F,G){if(D(F,G)===-1){F.push(G)}return F}function t(F,H){var G=D(F,H);if(G>-1){F.splice(G,1)}return F}function y(){return[E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],"-",E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],"-4",E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],"-",E[(Math.floor(Math.random()*16)&3)|8],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],"-",E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)],E[Math.floor(Math.random()*16)]].join("")}function B(F){return encodeURIComponent(F).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")}function a(F){if(typeof F==="string"&&F.indexOf("#")===-1){F+="#"}return F}function w(F){if(F instanceof A){return F.getURI()}switch(e(F)){case"undefined":case"null":case"boolean":case"number":case"string":return F;case"object":return b(F,w);case"array":return o(F,w);default:return F.toString()}}function c(G,J,F,I,H){Error.call(this,I);this.uri=G instanceof A?G.getURI():G;this.schemaUri=J instanceof A?J.getURI():J;this.attribute=F;this.message=I;this.description=I;this.details=H}c.prototype=new Error();c.prototype.constructor=c;c.prototype.name="InitializationError";function u(){this.errors=[];this.validated={}}u.prototype.addError=function(G,J,F,I,H){this.errors.push({uri:G instanceof A?G.getURI():G,schemaUri:J instanceof A?J.getURI():J,attribute:F,message:I,details:w(H)})};u.prototype.registerValidation=function(G,F){if(!this.validated[G]){this.validated[G]=[F]}else{this.validated[G].push(F)}};u.prototype.isValidatedBy=function(G,F){return !!this.validated[G]&&D(this.validated[G],F)!==-1};function A(H,G,I,F){if(G instanceof A){if(typeof F!=="string"){F=G._fd}if(typeof I!=="string"){I=G._uri}G=G._value}if(typeof I!=="string"){I="urn:uuid:"+y()+"#"}else{if(I.indexOf(":")===-1){I=a(m.resolve("urn:uuid:"+y()+"#",I))}}this._env=H;this._value=G;this._uri=I;this._fd=F||this._env._options.defaultFragmentDelimiter}A.prototype.getEnvironment=function(){return this._env};A.prototype.getType=function(){return e(this._value)};A.prototype.getValue=function(){return this._value};A.prototype.getURI=function(){return this._uri};A.prototype.resolveURI=function(F){return a(m.resolve(this._uri,F))};A.prototype.getPropertyNames=function(){return r(this._value)};A.prototype.getProperty=function(F){var G=this._value?this._value[F]:undefined;if(G instanceof A){return G}return new A(this._env,G,this._uri+this._fd+B(F),this._fd)};A.prototype.getProperties=function(){var G=e(this._value),F=this;if(G==="object"){return b(this._value,function(I,H){if(I instanceof A){return I}return new A(F._env,I,F._uri+F._fd+B(H),F._fd)})}else{if(G==="array"){return o(this._value,function(I,H){if(I instanceof A){return I}return new A(F._env,I,F._uri+F._fd+B(H),F._fd)})}}};A.prototype.getValueOfProperty=function(F){if(this._value){if(this._value[F] instanceof A){return this._value[F]._value}return this._value[F]}};A.prototype.equals=function(F){if(F instanceof A){return this._value===F._value}return this._value===F};function C(I,G){var H,F;if(I instanceof A){I=I.getValue()}switch(e(I)){case"object":if(G){H={};for(F in I){if(I[F]!==f[F]){H[F]=C(I[F],G)}}return H}else{return x(I)}break;case"array":if(G){H=new Array(I.length);F=I.length;while(--F>=0){H[F]=C(I[F],G)}return H}else{return Array.prototype.slice.call(I)}break;default:return I}}function v(H,G,J,I){var F;A.call(this,H,G,J);if(I===true){this._schema=this}else{if(G instanceof v&&!(I instanceof v)){this._schema=G._schema}else{this._schema=I instanceof v?I:this._env.getDefaultSchema()||this._env.createEmptySchema()}}F=this._schema.getValueOfProperty("fragmentResolution");if(F==="dot-delimited"){this._fd="."}else{if(F==="slash-delimited"){this._fd="/"}}return this.rebuild()}v.prototype=x(A.prototype);v.prototype.getSchema=function(){var F=this._refs&&this._refs.describedby,G;if(F){G=F&&this._env.findSchema(F);if(G){if(!G.equals(this._schema)){this._schema=G;this.rebuild()}}else{if(this._env._options.enforceReferences){throw new c(this,this._schema,"{describedby}","Unknown schema reference",F)}}}return this._schema};v.prototype.getAttribute=function(I,H){var G,L,K,F,J=this.getSchema();if(!H&&this._attributes&&this._attributes.hasOwnProperty(I)){return this._attributes[I]}G=J.getProperty("properties").getProperty(I);L=G.getValueOfProperty("parser");K=this.getProperty(I);if(typeof L==="function"){F=L(K,G,H);if(!H&&this._attributes){this._attributes[I]=F}return F}return K.getValue()};v.prototype.getAttributes=function(){var H,J,G,F,K,I=this.getSchema();if(!this._attributes&&this.getType()==="object"){H=this.getProperties();J=I.getProperty("properties");this._attributes={};for(G in H){if(H[G]!==f[G]){F=J&&J.getProperty(G);K=F&&F.getValueOfProperty("parser");if(typeof K==="function"){this._attributes[G]=K(H[G],F)}else{this._attributes[G]=H[G].getValue()}}}}return C(this._attributes,false)};v.prototype.getLink=function(G,F){var H=this.getAttribute("links",[G,F]);if(H&&H.length&&H[H.length-1]){return H[H.length-1]}};v.prototype.validate=function(F,H,K,L,I){var G=this.getSchema(),J=G.getValueOfProperty("validator");if(!(F instanceof A)){F=this.getEnvironment().createInstance(F)}if(!(H instanceof u)){H=new u()}if(this._env._options.validateReferences&&this._refs){if(this._refs.describedby&&!this._env.findSchema(this._refs.describedby)){H.addError(this,this._schema,"{describedby}","Unknown schema reference",this._refs.describedby)}if(this._refs.full&&!this._env.findSchema(this._refs.full)){H.addError(this,this._schema,"{full}","Unknown schema reference",this._refs.full)}}if(typeof J==="function"&&!H.isValidatedBy(F.getURI(),this.getURI())){H.registerValidation(F.getURI(),this.getURI());J(F,this,G,H,K,L,I)}return H};function l(G){return function F(){var I=this,H=[],K=I._refs&&I._refs.full,J;while(K){J=I._env.findSchema(K);if(J){if(J._value===I._value){break}I=J;H.push(K);K=I._refs&&I._refs.full;if(H.indexOf(K)>-1){break}}else{if(I._env._options.enforceReferences){throw new c(I,I._schema,"{full}","Unknown schema reference",K)}else{K=null}}}return G.apply(I,arguments)}}(function(){var F;for(F in v.prototype){if(v.prototype[F]!==f[F]&&e(v.prototype[F])==="function"){v.prototype[F]=l(v.prototype[F])}}}());v.prototype.rebuild=function(){var F=this,G=F.getSchema().getValueOfProperty("initializer");F._refs=null;F._attributes=null;if(typeof G==="function"){F=G(F)}F._env._schemas[F._uri]=F;F.getAttributes();return F};v.prototype.setReference=function(F,G){if(!this._refs){this._refs={}}this._refs[F]=this.resolveURI(G)};v.prototype.getReference=function(F){return this._refs&&this._refs[F]};function n(J,G,L){var I=e(J),H=e(G),K,F;if(H==="undefined"){return C(J,true)}else{if(I==="undefined"||H!==I){return C(G,true)}else{if(H==="object"){if(J instanceof v){J=J.getAttributes()}if(G instanceof v){G=G.getAttributes();if(G["extends"]&&L&&G["extends"] instanceof v){G["extends"]=[G["extends"]]}}K=C(J,true);for(F in G){if(G[F]!==f[F]){K[F]=n(J[F],G[F],L)}}return K}else{return C(G,true)}}}}function q(){this._id=y();this._schemas={};this._options={};this.createSchema({},true,"urn:jsv:empty-schema#")}q.prototype.clone=function(){var F=new q();F._schemas=x(this._schemas);F._options=x(this._options);return F};q.prototype.createInstance=function(G,F){F=a(F);if(G instanceof A&&(!F||G.getURI()===F)){return G}return new A(this,G,F)};q.prototype.createSchema=function(H,G,F){F=a(F);if(H instanceof v&&(!F||H._uri===F)&&(!G||H.getSchema().equals(G))){return H}return new v(this,H,F,G)};q.prototype.createEmptySchema=function(){return this._schemas["urn:jsv:empty-schema#"]};q.prototype.findSchema=function(F){return this._schemas[a(F)]};q.prototype.setOption=function(F,G){this._options[F]=G};q.prototype.getOption=function(F){return this._options[F]};q.prototype.setDefaultFragmentDelimiter=function(F){if(typeof F==="string"&&F.length>0){this._options.defaultFragmentDelimiter=F}};q.prototype.getDefaultFragmentDelimiter=function(){return this._options.defaultFragmentDelimiter};q.prototype.setDefaultSchemaURI=function(F){if(typeof F==="string"){this._options.defaultSchemaURI=a(F)}};q.prototype.getDefaultSchema=function(){return this.findSchema(this._options.defaultSchemaURI)};q.prototype.validate=function(M,L){var F,I,H,G=new u();try{F=this.createInstance(M);G.instance=F}catch(K){G.addError(K.uri,K.schemaUri,K.attribute,K.message,K.details)}try{I=this.createSchema(L);G.schema=I;H=I.getSchema();G.schemaSchema=H}catch(J){G.addError(J.uri,J.schemaUri,J.attribute,J.message,J.details)}if(H){H.validate(I,G)}if(G.errors.length){return G}return I.validate(F,G)};q.prototype._checkForInvalidInstances=function(L,H){var O=[],J=[[H,this._schemas[H]]],F=0,N,G,M,I,K;while(F++<L&&J.length){N=J.shift();G=N[0];M=N[1];if(M instanceof v){if(this._schemas[M._uri]!==M){O.push("Instance "+G+" does not match "+M._uri)}else{I=M.getAttributes();for(K in I){if(I[K]!==f[K]){J.push([G+"/"+B(K),I[K]])}}}}else{if(e(M)==="object"){I=M;for(K in I){if(I.hasOwnProperty(K)){J.push([G+"/"+B(K),I[K]])}}}else{if(e(M)==="array"){I=M;for(K=0;K<I.length;++K){J.push([G+"/"+B(K),I[K]])}}}}}return O.length?O:F};h={_environments:{},_defaultEnvironmentID:"",isJSONInstance:function(F){return F instanceof A},isJSONSchema:function(F){return F instanceof v},createEnvironment:function(F){F=F||this._defaultEnvironmentID;if(!this._environments[F]){throw new Error("Unknown Environment ID")}return this._environments[F].clone()},Environment:q,registerEnvironment:function(G,F){G=G||(F||0)._id;if(G&&!this._environments[G]&&F instanceof q){F._id=G;this._environments[G]=F}},setDefaultEnvironmentID:function(F){if(typeof F==="string"){if(!this._environments[F]){throw new Error("Unknown Environment ID")}this._defaultEnvironmentID=F}},getDefaultEnvironmentID:function(){return this._defaultEnvironmentID},typeOf:e,createObject:x,mapObject:b,mapArray:o,filterArray:s,searchArray:D,toArray:z,keys:r,pushUnique:g,popFirst:t,clone:C,randomUUID:y,escapeURIComponent:B,formatURI:a,inherits:n,InitializationError:c};this.JSV=h;exports.JSV=h;require("./environments")}());(function(){var n={},p=require("./jsv").JSV,G,w,l,A,m,f,c,z,o,B,q,e,b,y,r,D,s,a,F,v,t,g,x,E,C,u;G={string:function(H,I){return H.getType()==="string"},number:function(H,I){return H.getType()==="number"},integer:function(H,I){return H.getType()==="number"&&H.getValue()%1===0},"boolean":function(H,I){return H.getType()==="boolean"},object:function(H,I){return H.getType()==="object"},array:function(H,I){return H.getType()==="array"},"null":function(H,I){return H.getType()==="null"},any:function(H,I){return true}};w=new p.Environment();w.setOption("validateReferences",true);w.setOption("enforceReferences",false);w.setOption("strict",false);l={"$schema":"http://json-schema.org/draft-00/hyper-schema#",id:"http://json-schema.org/draft-00/schema#",type:"object",properties:{type:{type:["string","array"],items:{type:["string",{"$ref":"#"}]},optional:true,uniqueItems:true,"default":"any",parser:function(H,I){var J;if(H.getType()==="string"){return H.getValue()}else{if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I.getEnvironment().findSchema(I.resolveURI("#")))}else{if(H.getType()==="array"){J=I.getValueOfProperty("parser");return p.mapArray(H.getProperties(),function(K){return J(K,I)})}}}return"any"},validator:function(R,K,S,M,Q,T,H){var I=p.toArray(K.getAttribute("type")),P,N,O,L,J;if(R.getType()!=="undefined"&&I&&I.length){J=S.getValueOfProperty("typeValidators")||{};for(P=0,N=I.length;P<N;++P){O=I[P];if(p.isJSONSchema(O)){L=p.createObject(M);L.errors=[];L.validated=p.clone(M.validated);if(O.validate(R,L,Q,T,H).errors.length===0){return true}}else{if(J[O]!==n[O]&&typeof J[O]==="function"){if(J[O](R,M)){return true}}else{return true}}}M.addError(R,K,"type","Instance is not a required type",I);return false}return true},typeValidators:G},properties:{type:"object",additionalProperties:{"$ref":"#"},optional:true,"default":{},parser:function(I,J,H){var K=I.getEnvironment(),L=J.getEnvironment();if(I.getType()==="object"){if(H){return K.createSchema(I.getProperty(H),L.findSchema(J.resolveURI("#")))}else{return p.mapObject(I.getProperties(),function(M){return K.createSchema(M,L.findSchema(J.resolveURI("#")))})}}return{}},validator:function(N,J,O,K,L,P,H){var I,M;if(N.getType()==="object"){I=J.getAttribute("properties");for(M in I){if(I[M]!==n[M]&&I[M]){I[M].validate(N.getProperty(M),K,N,J,M)}}}}},items:{type:[{"$ref":"#"},"array"],items:{"$ref":"#"},optional:true,"default":{},parser:function(H,I){if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I.getEnvironment().findSchema(I.resolveURI("#")))}else{if(H.getType()==="array"){return p.mapArray(H.getProperties(),function(J){return J.getEnvironment().createSchema(J,I.getEnvironment().findSchema(I.resolveURI("#")))})}}return H.getEnvironment().createEmptySchema()},validator:function(R,I,S,J,Q,T,H){var N,M,P,K,O,L;if(R.getType()==="array"){N=R.getProperties();M=I.getAttribute("items");L=I.getAttribute("additionalProperties");if(p.typeOf(M)==="array"){for(P=0,K=N.length;P<K;++P){O=M[P]||L;if(O!==false){O.validate(N[P],J,R,I,P)}else{J.addError(R,I,"additionalProperties","Additional items are not allowed",O)}}}else{O=M||L;for(P=0,K=N.length;P<K;++P){O.validate(N[P],J,R,I,P)}}}}},optional:{type:"boolean",optional:true,"default":false,parser:function(H,I){return !!H.getValue()},validator:function(H,M,J,I,L,N,K){if(H.getType()==="undefined"&&!M.getAttribute("optional")){I.addError(H,M,"optional","Property is required",false)}},validationRequired:true},additionalProperties:{type:[{"$ref":"#"},"boolean"],optional:true,"default":{},parser:function(H,I){if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I.getEnvironment().findSchema(I.resolveURI("#")))}else{if(H.getType()==="boolean"&&H.getValue()===false){return false}}return H.getEnvironment().createEmptySchema()},validator:function(P,J,Q,K,N,R,H){var L,I,M,O;if(P.getType()==="object"){L=J.getAttribute("additionalProperties");I=J.getAttribute("properties")||{};M=P.getProperties();for(O in M){if(M[O]!==n[O]&&M[O]&&I[O]===n[O]){if(p.isJSONSchema(L)){L.validate(M[O],K,P,J,O)}else{if(L===false){K.addError(P,J,"additionalProperties","Additional properties are not allowed",L)}}}}}}},requires:{type:["string",{"$ref":"#"}],optional:true,parser:function(H,I){if(H.getType()==="string"){return H.getValue()}else{if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I.getEnvironment().findSchema(I.resolveURI("#")))}}},validator:function(H,N,J,I,M,O,K){var L;if(H.getType()!=="undefined"&&M&&M.getType()!=="undefined"){L=N.getAttribute("requires");if(typeof L==="string"){if(M.getProperty(L).getType()==="undefined"){I.addError(H,N,"requires",'Property requires sibling property "'+L+'"',L)}}else{if(p.isJSONSchema(L)){L.validate(M,I)}}}}},minimum:{type:"number",optional:true,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(N,I,O,J,L,P,H){var K,M;if(N.getType()==="number"){K=I.getAttribute("minimum");M=I.getAttribute("minimumCanEqual");if(typeof K==="number"&&(N.getValue()<K||(M===false&&N.getValue()===K))){J.addError(N,I,"minimum","Number is less than the required minimum value",K)}}}},maximum:{type:"number",optional:true,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(N,J,O,L,M,P,H){var I,K;if(N.getType()==="number"){I=J.getAttribute("maximum");K=J.getAttribute("maximumCanEqual");if(typeof I==="number"&&(N.getValue()>I||(K===false&&N.getValue()===I))){L.addError(N,J,"maximum","Number is greater than the required maximum value",I)}}}},minimumCanEqual:{type:"boolean",optional:true,requires:"minimum","default":true,parser:function(H,I){if(H.getType()==="boolean"){return H.getValue()}return true}},maximumCanEqual:{type:"boolean",optional:true,requires:"maximum","default":true,parser:function(H,I){if(H.getType()==="boolean"){return H.getValue()}return true}},minItems:{type:"integer",optional:true,minimum:0,"default":0,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}return 0},validator:function(H,N,K,I,M,O,L){var J;if(H.getType()==="array"){J=N.getAttribute("minItems");if(typeof J==="number"&&H.getProperties().length<J){I.addError(H,N,"minItems","The number of items is less than the required minimum",J)}}}},maxItems:{type:"integer",optional:true,minimum:0,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(H,N,J,I,M,O,L){var K;if(H.getType()==="array"){K=N.getAttribute("maxItems");if(typeof K==="number"&&H.getProperties().length>K){I.addError(H,N,"maxItems","The number of items is greater than the required maximum",K)}}}},pattern:{type:"string",optional:true,format:"regex",parser:function(H,I){if(H.getType()==="string"){return H.getValue()}},validator:function(N,I,O,J,M,P,H){var L;try{L=new RegExp(I.getAttribute("pattern"));if(N.getType()==="string"&&L&&!L.test(N.getValue())){J.addError(N,I,"pattern","String does not match pattern",L.toString())}}catch(K){J.addError(I,O,"pattern","Invalid pattern",I.getValueOfProperty("pattern"))}}},minLength:{type:"integer",optional:true,minimum:0,"default":0,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}return 0},validator:function(H,N,K,I,M,O,L){var J;if(H.getType()==="string"){J=N.getAttribute("minLength");if(typeof J==="number"&&H.getValue().length<J){I.addError(H,N,"minLength","String is less than the required minimum length",J)}}}},maxLength:{type:"integer",optional:true,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(H,N,K,J,M,O,L){var I;if(H.getType()==="string"){I=N.getAttribute("maxLength");if(typeof I==="number"&&H.getValue().length>I){J.addError(H,N,"maxLength","String is greater than the required maximum length",I)}}}},"enum":{type:"array",optional:true,minItems:1,uniqueItems:true,parser:function(H,I){if(H.getType()==="array"){return H.getValue()}},validator:function(O,J,P,K,N,Q,I){var H,M,L;if(O.getType()!=="undefined"){H=J.getAttribute("enum");if(H){for(M=0,L=H.length;M<L;++M){if(O.equals(H[M])){return true}}K.addError(O,J,"enum","Instance is not one of the possible values",H)}}}},title:{type:"string",optional:true},description:{type:"string",optional:true},format:{type:"string",optional:true,parser:function(H,I){if(H.getType()==="string"){return H.getValue()}},validator:function(N,I,O,J,L,P,H){var K,M;if(N.getType()==="string"){K=I.getAttribute("format");M=O.getValueOfProperty("formatValidators");if(typeof K==="string"&&M[K]!==n[K]&&typeof M[K]==="function"&&!M[K].call(this,N,J)){J.addError(N,I,"format","String is not in the required format",K)}}},formatValidators:{}},contentEncoding:{type:"string",optional:true},"default":{type:"any",optional:true},maxDecimal:{type:"integer",optional:true,minimum:0,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(N,J,O,L,M,P,H){var K,I;if(N.getType()==="number"){K=J.getAttribute("maxDecimal");if(typeof K==="number"){I=N.getValue().toString(10).split(".")[1];if(I&&I.length>K){L.addError(N,J,"maxDecimal","The number of decimal places is greater than the allowed maximum",K)}}}}},disallow:{type:["string","array"],items:{type:"string"},optional:true,uniqueItems:true,parser:function(H,I){if(H.getType()==="string"||H.getType()==="array"){return H.getValue()}},validator:function(R,J,S,L,P,T,H){var N=p.toArray(J.getAttribute("disallow")),O,M,Q,I,K;if(R.getType()!=="undefined"&&N&&N.length){I=S.getValueOfProperty("typeValidators")||{};for(O=0,M=N.length;O<M;++O){Q=N[O];if(p.isJSONSchema(Q)){K=p.createObject(L);K.errors=[];K.validated=p.clone(L.validated);if(Q.validate(R,K,P,T,H).errors.length===0){L.addError(R,J,"disallow","Instance is a disallowed type",N);return false}}else{if(I[Q]!==n[Q]&&typeof I[Q]==="function"){if(I[Q](R,L)){L.addError(R,J,"disallow","Instance is a disallowed type",N);return false}}}}return true}return true},typeValidators:G},"extends":{type:[{"$ref":"#"},"array"],items:{"$ref":"#"},optional:true,"default":{},parser:function(H,I){if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I.getEnvironment().findSchema(I.resolveURI("#")))}else{if(H.getType()==="array"){return p.mapArray(H.getProperties(),function(J){return J.getEnvironment().createSchema(J,I.getEnvironment().findSchema(I.resolveURI("#")))})}}},validator:function(O,I,P,J,N,Q,H){var L=I.getAttribute("extends"),M,K;if(L){if(p.isJSONSchema(L)){L.validate(O,J,N,Q,H)}else{if(p.typeOf(L)==="array"){for(M=0,K=L.length;M<K;++M){L[M].validate(O,J,N,Q,H)}}}}}}},optional:true,"default":{},fragmentResolution:"dot-delimited",parser:function(H,I){if(H.getType()==="object"){return H.getEnvironment().createSchema(H,I)}},validator:function(Q,J,R,K,P,S,I){var T=J.getPropertyNames(),O,L,M=R.getAttribute("properties"),N=Q.getEnvironment().getOption("strict"),H;for(O in M){if(M[O]!==n[O]){if(M[O].getValueOfProperty("validationRequired")){p.pushUnique(T,O)}if(N&&M[O].getValueOfProperty("deprecated")){p.popFirst(T,O)}}}for(O=0,L=T.length;O<L;++O){if(M[T[O]]!==n[T[O]]){H=M[T[O]].getValueOfProperty("validator");if(typeof H==="function"){H(Q,J,M[T[O]],K,P,S,I)}}}}};A={"$schema":"http://json-schema.org/draft-00/hyper-schema#",id:"http://json-schema.org/draft-00/hyper-schema#",properties:{links:{type:"array",items:{"$ref":"links#"},optional:true,parser:function(K,N,J){var M,I=N.getValueOfProperty("items")["$ref"],O=N.getEnvironment().findSchema(I),H=O&&O.getValueOfProperty("parser"),L;J=p.toArray(J);if(typeof H==="function"){M=p.mapArray(K.getProperties(),function(P){return H(P,O)})}else{M=p.toArray(K.getValue())}if(J[0]){M=p.filterArray(M,function(P){return P.rel===J[0]})}if(J[1]){L=N.getValueOfProperty("selfReferenceVariable");M=p.mapArray(M,function(R){var P=J[1],Q=R.href;Q=Q.replace(/\{(.+)\}/g,function(W,V,U,S){var T;if(V===L){T=P.getValue()}else{T=P.getValueOfProperty(V)}return T!==undefined?String(T):""});return Q?p.formatURI(P.resolveURI(Q)):Q})}return M},selfReferenceVariable:"-this"},fragmentResolution:{type:"string",optional:true,"default":"dot-delimited"},root:{type:"boolean",optional:true,"default":false},readonly:{type:"boolean",optional:true,"default":false},pathStart:{type:"string",optional:true,format:"uri",validator:function(H,M,J,I,L,O,K){var N;if(H.getType()!=="undefined"){N=M.getAttribute("pathStart");if(typeof N==="string"){if(H.getURI().indexOf(N)!==0){I.addError(H,M,"pathStart","Instance's URI does not start with "+N,N)}}}}},mediaType:{type:"string",optional:true,format:"media-type"},alternate:{type:"array",items:{"$ref":"#"},optional:true}},links:[{href:"{$ref}",rel:"full"},{href:"{$schema}",rel:"describedby"},{href:"{id}",rel:"self"}],initializer:function(I){var J,K,H;J=I._schema.getLink("describedby",I);if(J&&I._schema._uri!==J){I.setReference("describedby",J)}J=I._schema.getLink("self",I);if(p.typeOf(J)==="string"){I._uri=p.formatURI(J)}J=I._schema.getLink("full",I);if(J&&I._uri!==J){I.setReference("full",J)}K=I.getAttribute("extends");if(p.isJSONSchema(K)){H=p.inherits(K,I,true);I=I._env.createSchema(H,I._schema,I._uri)}return I}};m={"$schema":"http://json-schema.org/draft-00/hyper-schema#",id:"http://json-schema.org/draft-00/links#",type:"object",properties:{href:{type:"string"},rel:{type:"string"},method:{type:"string","default":"GET",optional:true},enctype:{type:"string",requires:"method",optional:true},properties:{type:"object",additionalProperties:{"$ref":"hyper-schema#"},optional:true,parser:function(J,K,I){var L=J.getEnvironment(),M=K.getEnvironment(),H=K.getValueOfProperty("additionalProperties")["$ref"];if(J.getType()==="object"){if(I){return L.createSchema(J.getProperty(I),M.findSchema(K.resolveURI(H)))}else{return p.mapObject(J.getProperties(),function(N){return L.createSchema(N,M.findSchema(K.resolveURI(H)))})}}}}},parser:function(H,J){var I=J.getProperty("properties");if(H.getType()==="object"){return p.mapObject(H.getProperties(),function(M,L){var K=I.getProperty(L),N=K&&K.getValueOfProperty("parser");if(typeof N==="function"){return N(M,K)}return M.getValue()})}return H.getValue()}};w.setOption("defaultFragmentDelimiter",".");w.setOption("defaultSchemaURI","http://json-schema.org/draft-00/schema#");f=w.createSchema(l,true,"http://json-schema.org/draft-00/schema#");c=w.createSchema(p.inherits(f,w.createSchema(A,true,"http://json-schema.org/draft-00/hyper-schema#"),true),true,"http://json-schema.org/draft-00/hyper-schema#");w.setOption("defaultSchemaURI","http://json-schema.org/draft-00/hyper-schema#");z=w.createSchema(m,c,"http://json-schema.org/draft-00/links#");o=p.inherits(l,{"$schema":"http://json-schema.org/draft-01/hyper-schema#",id:"http://json-schema.org/draft-01/schema#"});B=p.inherits(A,{"$schema":"http://json-schema.org/draft-01/hyper-schema#",id:"http://json-schema.org/draft-01/hyper-schema#"});q=p.inherits(m,{"$schema":"http://json-schema.org/draft-01/hyper-schema#",id:"http://json-schema.org/draft-01/links#"});w.setOption("defaultSchemaURI","http://json-schema.org/draft-01/schema#");e=w.createSchema(o,true,"http://json-schema.org/draft-01/schema#");b=w.createSchema(p.inherits(e,w.createSchema(B,true,"http://json-schema.org/draft-01/hyper-schema#"),true),true,"http://json-schema.org/draft-01/hyper-schema#");w.setOption("defaultSchemaURI","http://json-schema.org/draft-01/hyper-schema#");y=w.createSchema(q,b,"http://json-schema.org/draft-01/links#");r=p.inherits(o,{"$schema":"http://json-schema.org/draft-02/hyper-schema#",id:"http://json-schema.org/draft-02/schema#",properties:{uniqueItems:{type:"boolean",optional:true,"default":false,parser:function(H,I){return !!H.getValue()},validator:function(Q,J,R,K,P,S,H){var O,N,L,M,I;if(Q.getType()==="array"&&J.getAttribute("uniqueItems")){O=Q.getProperties();for(N=0,L=O.length-1;N<L;++N){for(M=N+1,I=O.length;M<I;++M){if(O[N].equals(O[M])){K.addError(Q,J,"uniqueItems","Array can only contain unique items",{x:N,y:M})}}}}}},maxDecimal:{deprecated:true},divisibleBy:{type:"number",minimum:0,minimumCanEqual:false,optional:true,parser:function(H,I){if(H.getType()==="number"){return H.getValue()}},validator:function(O,K,P,L,N,Q,H){var J,M,I;if(O.getType()==="number"){J=K.getAttribute("divisibleBy");if(J===0){L.addError(O,K,"divisibleBy","Nothing is divisible by 0",J)}else{if(J!==1){M=O.getValue();I=Math.max((M.toString().split(".")[1]||" ").length,(J.toString().split(".")[1]||" ").length);I=parseFloat(((M/J)%1).toFixed(I));if(0<I&&I<1){L.addError(O,K,"divisibleBy","Number is not divisible by "+J,J)}}}}}}},fragmentResolution:"slash-delimited"});D=p.inherits(B,{id:"http://json-schema.org/draft-02/hyper-schema#",properties:{fragmentResolution:{"default":"slash-delimited"}}});s=p.inherits(q,{"$schema":"http://json-schema.org/draft-02/hyper-schema#",id:"http://json-schema.org/draft-02/links#",properties:{targetSchema:{"$ref":"hyper-schema#",parser:b.getAttribute("parser")}}});w.setOption("defaultFragmentDelimiter","/");w.setOption("defaultSchemaURI","http://json-schema.org/draft-02/schema#");a=w.createSchema(r,true,"http://json-schema.org/draft-02/schema#");F=w.createSchema(p.inherits(a,w.createSchema(D,true,"http://json-schema.org/draft-02/hyper-schema#"),true),true,"http://json-schema.org/draft-02/hyper-schema#");w.setOption("defaultSchemaURI","http://json-schema.org/draft-02/hyper-schema#");v=w.createSchema(s,F,"http://json-schema.org/draft-02/links#");function h(Q,H,I,R){var J={},O,M,N,L,P;if(Q.getType()==="object"){O=H.getAttribute("patternProperties");L=Q.getProperties();for(M in O){if(O[M]!==n[M]){N=null;try{N=new RegExp(M)}catch(K){if(I){I.addError(H,R,"patternProperties","Invalid pattern",M)}}if(N){for(P in L){if(L[P]!==n[P]&&N.test(P)){J[P]=J[P]?p.pushUnique(J[P],O[M]):[O[M]]}}}}}}return J}t=p.inherits(r,{"$schema":"http://json-schema.org/draft-03/schema#",id:"http://json-schema.org/draft-03/schema#",properties:{patternProperties:{type:"object",additionalProperties:{"$ref":"#"},"default":{},parser:a.getValueOfProperty("properties")["properties"]["parser"],validator:function(O,I,P,J,M,Q,H){var K,N,L;if(O.getType()==="object"){K=h(O,I,J,P);for(N in K){if(K[N]!==n[N]){L=K[N].length;while(L--){K[N][L].validate(O.getProperty(N),J,O,I,N)}}}}}},additionalProperties:{validator:function(Q,J,R,K,O,S,H){var M,I,N,L,P;if(Q.getType()==="object"){M=J.getAttribute("additionalProperties");I=J.getAttribute("properties")||{};N=Q.getProperties();L=h(Q,J);for(P in N){if(N[P]!==n[P]&&N[P]&&I[P]===n[P]&&L[P]===n[P]){if(p.isJSONSchema(M)){M.validate(N[P],K,Q,J,P)}else{if(M===false){K.addError(Q,J,"additionalProperties","Additional properties are not allowed",M)}}}}}}},items:{validator:function(R,J,S,K,Q,T,I){var N,M,P,L,O,H;if(R.getType()==="array"){N=R.getProperties();M=J.getAttribute("items");H=J.getAttribute("additionalItems");if(p.typeOf(M)==="array"){for(P=0,L=N.length;P<L;++P){O=M[P]||H;if(O!==false){O.validate(N[P],K,R,J,P)}else{K.addError(R,J,"additionalItems","Additional items are not allowed",O)}}}else{O=M||H;for(P=0,L=N.length;P<L;++P){O.validate(N[P],K,R,J,P)}}}}},additionalItems:{type:[{"$ref":"#"},"boolean"],"default":{},parser:a.getValueOfProperty("properties")["additionalProperties"]["parser"],validator:function(P,J,Q,K,O,R,I){var H,M,N,L;if(P.getType()==="array"&&J.getProperty("items").getType()==="undefined"){H=J.getAttribute("additionalItems");M=P.getProperties();if(H!==false){for(N=0,L=M.length;N<L;++N){H.validate(M[N],K,P,J,N)}}else{if(M.length){K.addError(P,J,"additionalItems","Additional items are not allowed",H)}}}}},optional:{validationRequired:false,deprecated:true},required:{type:"boolean","default":false,parser:function(H,I){return !!H.getValue()},validator:function(H,M,J,I,L,N,K){if(H.getType()==="undefined"&&M.getAttribute("required")){I.addError(H,M,"required","Property is required",true)}}},requires:{deprecated:true},dependencies:{type:"object",additionalProperties:{type:["string","array",{"$ref":"#"}],items:{type:"string"}},"default":{},parser:function(I,J,H){function K(M){var L=M.getType();if(L==="string"||L==="array"){return M.getValue()}else{if(L==="object"){return M.getEnvironment().createSchema(M,J.getEnvironment().findSchema(J.resolveURI("#")))}}}if(I.getType()==="object"){if(H){return K(I.getProperty(H))}else{return p.mapObject(I.getProperties(),K)}}return{}},validator:function(R,J,S,K,P,T,H){var M,Q,I,N,O,L;if(R.getType()==="object"){M=J.getAttribute("dependencies");for(Q in M){if(M[Q]!==n[Q]&&R.getProperty(Q).getType()!=="undefined"){I=M[Q];N=p.typeOf(I);if(N==="string"){if(R.getProperty(I).getType()==="undefined"){K.addError(R,J,"dependencies",'Property "'+Q+'" requires sibling property "'+I+'"',M)}}else{if(N==="array"){for(O=0,L=I.length;O<L;++O){if(R.getProperty(I[O]).getType()==="undefined"){K.addError(R,J,"dependencies",'Property "'+Q+'" requires sibling property "'+I[O]+'"',M)}}}else{if(p.isJSONSchema(I)){I.validate(R,K)}}}}}}}},minimumCanEqual:{deprecated:true},maximumCanEqual:{deprecated:true},exclusiveMinimum:{type:"boolean","default":false,parser:function(H,I){return !!H.getValue()}},exclusiveMaximum:{type:"boolean","default":false,parser:function(H,I){return !!H.getValue()}},minimum:{validator:function(N,I,O,J,M,P,H){var K,L;if(N.getType()==="number"){K=I.getAttribute("minimum");L=I.getAttribute("exclusiveMinimum")||(!N.getEnvironment().getOption("strict")&&!I.getAttribute("minimumCanEqual"));if(typeof K==="number"&&(N.getValue()<K||(L===true&&N.getValue()===K))){J.addError(N,I,"minimum","Number is less than the required minimum value",K)}}}},maximum:{validator:function(N,J,O,K,M,P,H){var I,L;if(N.getType()==="number"){I=J.getAttribute("maximum");L=J.getAttribute("exclusiveMaximum")||(!N.getEnvironment().getOption("strict")&&!J.getAttribute("maximumCanEqual"));if(typeof I==="number"&&(N.getValue()>I||(L===true&&N.getValue()===I))){K.addError(N,J,"maximum","Number is greater than the required maximum value",I)}}}},contentEncoding:{deprecated:true},divisibleBy:{exclusiveMinimum:true},disallow:{items:{type:["string",{"$ref":"#"}]},parser:r.properties["type"]["parser"]},id:{type:"string",format:"uri"},"$ref":{type:"string",format:"uri"},"$schema":{type:"string",format:"uri"}},dependencies:{exclusiveMinimum:"minimum",exclusiveMaximum:"maximum"},initializer:function(I){var M,N,H,K=I.getValueOfProperty("$schema"),J=I.getValueOfProperty("$ref"),L=I.getValueOfProperty("id");if(K){M=I.resolveURI(K);I.setReference("describedby",M)}if(L){M=I.resolveURI(L);if(p.typeOf(M)==="string"){I._uri=p.formatURI(M)}}if(J){M=I.resolveURI(J);I.setReference("full",M)}N=I.getAttribute("extends");if(p.isJSONSchema(N)){H=p.inherits(N,I,true);I=I._env.createSchema(H,I._schema,I._uri)}return I}});g=p.inherits(D,{"$schema":"http://json-schema.org/draft-03/hyper-schema#",id:"http://json-schema.org/draft-03/hyper-schema#",properties:{links:{selfReferenceVariable:"@"},root:{deprecated:true},contentEncoding:{deprecated:false},alternate:{deprecated:true}}});x=p.inherits(s,{"$schema":"http://json-schema.org/draft-03/hyper-schema#",id:"http://json-schema.org/draft-03/links#",properties:{href:{required:true,format:"link-description-object-template"},rel:{required:true},properties:{deprecated:true},schema:{"$ref":"http://json-schema.org/draft-03/hyper-schema#"}}});w.setOption("defaultSchemaURI","http://json-schema.org/draft-03/schema#");E=w.createSchema(t,true,"http://json-schema.org/draft-03/schema#");C=w.createSchema(p.inherits(E,w.createSchema(g,true,"http://json-schema.org/draft-03/hyper-schema#"),true),true,"http://json-schema.org/draft-03/hyper-schema#");w.setOption("defaultSchemaURI","http://json-schema.org/draft-03/hyper-schema#");u=w.createSchema(x,true,"http://json-schema.org/draft-03/links#");w.setOption("latestJSONSchemaSchemaURI","http://json-schema.org/draft-03/schema#");w.setOption("latestJSONSchemaHyperSchemaURI","http://json-schema.org/draft-03/hyper-schema#");w.setOption("latestJSONSchemaLinksURI","http://json-schema.org/draft-03/links#");w._schemas["http://json-schema.org/schema#"]=E;w._schemas["http://json-schema.org/hyper-schema#"]=C;w._schemas["http://json-schema.org/links#"]=u;p.registerEnvironment("json-schema-draft-03",w);if(!p.getDefaultEnvironmentID()||p.getDefaultEnvironmentID()==="json-schema-draft-01"||p.getDefaultEnvironmentID()==="json-schema-draft-02"){p.setDefaultEnvironmentID("json-schema-draft-03")}}());(function(g){var p,C="",w=Math.PI,l=w/2,n="ontouchstart" in window,c=(n)?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"},x={backward:["bl","tl"],forward:["br","tr"],all:["tl","bl","tr","br"]},m=["single","double"],f={page:1,gradients:true,duration:600,acceleration:true,display:"double",when:null},a={folding:null,corners:"forward",cornerSize:100,gradients:true,duration:600,acceleration:true},B=6,v={0:{top:0,left:0,right:"auto",bottom:"auto"},1:{top:0,right:0,left:"auto",bottom:"auto"}},t=function(G,F,H,E){return{css:{position:"absolute",top:G,left:F,overflow:E||"hidden","z-index":H||"auto"}}},r=function(K,J,I,H,G){var E=1-G,F=E*E*E,L=G*G*G;return h(Math.round(F*K.x+3*G*E*E*J.x+3*G*G*E*I.x+L*H.x),Math.round(F*K.y+3*G*E*E*J.y+3*G*G*E*I.y+L*H.y))},D=function(E){return E/180*w},s=function(E){return E/w*180},h=function(E,F){return{x:E,y:F}},q=function(E,G,F){return(p&&F)?" translate3d("+E+"px,"+G+"px, 0px) ":" translate("+E+"px, "+G+"px) "},z=function(E){return" rotate("+E+"deg) "},e=function(F,E){return Object.prototype.hasOwnProperty.call(E,F)},u=function(){var F=["Moz","Webkit","Khtml","O","ms"],E=F.length,G="";while(E--){if((F[E]+"Transform") in document.body.style){G="-"+F[E].toLowerCase()+"-"}}return G},b=function(Q,G,F,L,R){var U,O=[];if(C=="-webkit-"){for(U=0;U<R;U++){O.push("color-stop("+L[U][0]+", "+L[U][1]+")")}Q.css({"background-image":"-webkit-gradient(linear, "+G.x+"% "+G.y+"%,  "+F.x+"% "+F.y+"%, "+O.join(",")+" )"})}else{G={x:G.x/100*Q.width(),y:G.y/100*Q.height()};F={x:F.x/100*Q.width(),y:F.y/100*Q.height()};var P=F.x-G.x,N=F.y-G.y,V=Math.atan2(N,P),H=V-Math.PI/2,T=Math.abs(Q.width()*Math.sin(H))+Math.abs(Q.height()*Math.cos(H)),E=Math.sqrt(N*N+P*P),J=h((F.x<G.x)?Q.width():0,(F.y<G.y)?Q.height():0),K=Math.tan(V),I=-1/K,M=(I*J.x-J.y-K*G.x+G.y)/(I-K),W={x:M,y:I*M-I*J.x+J.y},S=(Math.sqrt(Math.pow(W.x-G.x,2)+Math.pow(W.y-G.y,2)));for(U=0;U<R;U++){O.push(" "+L[U][1]+" "+((S+E*L[U][0])*100/T)+"%")}Q.css({"background-image":C+"linear-gradient("+(-V)+"rad,"+O.join(",")+")"})}},A={init:function(G){if(p===undefined){p="WebKitCSSMatrix" in window||"MozPerspective" in document.body.style;C=u()}var E,H=this.data(),F=this.children();G=g.extend({width:this.width(),height:this.height()},f,G);H.opts=G;H.pageObjs={};H.pages={};H.pageWrap={};H.pagePlace={};H.pageMv=[];H.totalPages=G.pages||0;if(G.when){for(E in G.when){if(e(E,G.when)){this.bind(E,G.when[E])}}}this.css({position:"relative",width:G.width,height:G.height});this.turn("display",G.display);if(p&&!n&&G.acceleration){this.transform(q(0,0,true))}for(E=0;E<F.length;E++){this.turn("addPage",F[E],E+1)}this.turn("page",G.page);x=g.extend({},x,G.corners);g(this).bind(c.start,function(J){for(var I in H.pages){if(e(I,H.pages)&&y._eventStart.call(H.pages[I],J)===false){return false}}});g(document).bind(c.move,function(J){for(var I in H.pages){if(e(I,H.pages)){y._eventMove.call(H.pages[I],J)}}}).bind(c.end,function(J){for(var I in H.pages){if(e(I,H.pages)){y._eventEnd.call(H.pages[I],J)}}});H.done=true;return this},addPage:function(E,I){var F=false,H=this.data(),G=H.totalPages+1;if(I){if(I==G){I=G;F=true}else{if(I>G){throw new Error('It is impossible to add the page "'+I+'", the maximum value is: "'+G+'"')}}}else{I=G;F=true}if(I>=1&&I<=G){if(H.done){this.turn("stop")}if(I in H.pageObjs){A._movePages.call(this,I,1)}if(F){H.totalPages=G}H.pageObjs[I]=g(E).addClass("turn-page p"+I);A._addPage.call(this,I);if(H.done){this.turn("update")}A._removeFromDOM.call(this)}return this},_addPage:function(I){var H=this.data(),F=H.pageObjs[I];if(F){if(A._necessPage.call(this,I)){if(!H.pageWrap[I]){var E=(H.display=="double")?this.width()/2:this.width(),G=this.height();F.css({width:E,height:G});H.pagePlace[I]=I;H.pageWrap[I]=g("<div/>",{"class":"turn-page-wrapper",page:I,css:{position:"absolute",overflow:"hidden",width:E,height:G}}).css(v[(H.display=="double")?I%2:0]);this.append(H.pageWrap[I]);H.pageWrap[I].prepend(H.pageObjs[I])}if(!I||A._setPageLoc.call(this,I)==1){A._makeFlip.call(this,I)}}else{H.pagePlace[I]=0;if(H.pageObjs[I]){H.pageObjs[I].remove()}}}},hasPage:function(E){return E in this.data().pageObjs},_makeFlip:function(F){var E=this.data();if(!E.pages[F]&&E.pagePlace[F]==F){var H=E.display=="single",G=F%2;E.pages[F]=E.pageObjs[F].css({width:(H)?this.width():this.width()/2,height:this.height()}).flip({page:F,next:(H&&F===E.totalPages)?F-1:((G||H)?F+1:F-1),turn:this,duration:E.opts.duration,acceleration:E.opts.acceleration,corners:(H)?"all":((G)?"forward":"backward"),backGradient:E.opts.gradients,frontGradient:E.opts.gradients}).flip("disable",E.disabled).bind("pressed",A._pressed).bind("released",A._released).bind("start",A._start).bind("end",A._end).bind("flip",A._flip)}return E.pages[F]},_makeRange:function(){var G,F=this.data(),E=this.turn("range");for(G=E[0];G<=E[1];G++){A._addPage.call(this,G)}},range:function(I){var E,J,G,H=this.data();I=I||H.tpage||H.page;var F=A._view.call(this,I);if(I<1||I>H.totalPages){throw new Error('"'+I+'" is not a page for range')}F[1]=F[1]||F[0];if(F[0]>=1&&F[1]<=H.totalPages){E=Math.floor((B-2)/2);if(H.totalPages-F[1]>F[0]){J=Math.min(F[0]-1,E);G=2*E-J}else{G=Math.min(H.totalPages-F[1],E);J=2*E-G}}else{J=B-1;G=B-1}return[Math.max(1,F[0]-J),Math.min(H.totalPages,F[1]+G)]},_necessPage:function(F){if(F===0){return true}var E=this.turn("range");return F>=E[0]&&F<=E[1]},_removeFromDOM:function(){var F,E=this.data();for(F in E.pageWrap){if(e(F,E.pageWrap)&&!A._necessPage.call(this,F)){A._removePageFromDOM.call(this,F)}}},_removePageFromDOM:function(G){var F=this.data();if(F.pages[G]){var E=F.pages[G].data();if(E.f&&E.f.fwrapper){E.f.fwrapper.remove()}F.pages[G].remove();delete F.pages[G]}if(F.pageObjs[G]){F.pageObjs[G].remove()}if(F.pageWrap[G]){F.pageWrap[G].remove();delete F.pageWrap[G]}delete F.pagePlace[G]},removePage:function(F){var E=this.data();if(E.pageObjs[F]){this.turn("stop");A._removePageFromDOM.call(this,F);delete E.pageObjs[F];A._movePages.call(this,F,-1);E.totalPages=E.totalPages-1;A._makeRange.call(this);if(E.page>E.totalPages){this.turn("page",E.totalPages)}}return this},_movePages:function(J,I){var G,F=this.data(),H=F.display=="single",E=function(M){var K=M+I,L=K%2;if(F.pageObjs[M]){F.pageObjs[K]=F.pageObjs[M].removeClass("page"+M).addClass("page"+K)}if(F.pagePlace[M]&&F.pageWrap[M]){F.pagePlace[K]=K;F.pageWrap[K]=F.pageWrap[M].css(v[(H)?0:L]).attr("page",K);if(F.pages[M]){F.pages[K]=F.pages[M].flip("options",{page:K,next:(H||L)?K+1:K-1,corners:(H)?"all":((L)?"forward":"backward")})}if(I){delete F.pages[M];delete F.pagePlace[M];delete F.pageObjs[M];delete F.pageWrap[M];delete F.pageObjs[M]}}};if(I>0){for(G=F.totalPages;G>=J;G--){E(G)}}else{for(G=J;G<=F.totalPages;G++){E(G)}}},display:function(G){var F=this.data(),H=F.display;if(G){if(g.inArray(G,m)==-1){throw new Error('"'+G+'" is not a value for display')}if(G=="single"){if(!F.pageObjs[0]){this.turn("stop").css({overflow:"hidden"});F.pageObjs[0]=g("<div />",{"class":"turn-page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this)}}else{if(F.pageObjs[0]){this.turn("stop").css({overflow:""});F.pageObjs[0].remove();delete F.pageObjs[0]}}F.display=G;if(H){var E=this.turn("size");A._movePages.call(this,1,0);this.turn("size",E.width,E.height).turn("update")}return this}else{return H}},animating:function(){return this.data().pageMv.length>0},disable:function(F){var H,G=this.data(),E=this.turn("view");G.disabled=F===undefined||F===true;for(H in G.pages){if(e(H,G.pages)){G.pages[H].flip("disable",F?g.inArray(H,E):false)}}return this},size:function(G,E){if(G&&E){var I=this.data(),F=(I.display=="double")?G/2:G,H;this.css({width:G,height:E});if(I.pageObjs[0]){I.pageObjs[0].css({width:F,height:E})}for(H in I.pageWrap){if(!e(H,I.pageWrap)){continue}I.pageObjs[H].css({width:F,height:E});I.pageWrap[H].css({width:F,height:E});if(I.pages[H]){I.pages[H].css({width:F,height:E})}}this.turn("resize");return this}else{return{width:this.width(),height:this.height()}}},resize:function(){var F,E=this.data();if(E.pages[0]){E.pageWrap[0].css({left:-this.width()});E.pages[0].flip("resize",true)}for(F=1;F<=E.totalPages;F++){if(E.pages[F]){E.pages[F].flip("resize",true)}}},_removeMv:function(G){var E,F=this.data();for(E=0;E<F.pageMv.length;E++){if(F.pageMv[E]==G){F.pageMv.splice(E,1);return true}}return false},_addMv:function(F){var E=this.data();A._removeMv.call(this,F);E.pageMv.push(F)},_view:function(F){var E=this.data();F=F||E.page;if(E.display=="double"){return(F%2)?[F-1,F]:[F,F+1]}else{return[F]}},view:function(G){var F=this.data(),E=A._view.call(this,G);return(F.display=="double")?[(E[0]>0)?E[0]:0,(E[1]<=F.totalPages)?E[1]:0]:[(E[0]>0&&E[0]<=F.totalPages)?E[0]:0]},stop:function(G){var F,H,I=this.data(),E=I.pageMv;I.pageMv=[];if(I.tpage){I.page=I.tpage;delete I.tpage}for(F in E){if(!e(F,E)){continue}H=I.pages[E[F]].data().f.opts;y._moveFoldingPage.call(I.pages[E[F]],null);I.pages[E[F]].flip("hideFoldedPage");I.pagePlace[H.next]=H.next;if(H.force){H.next=(H.page%2===0)?H.page-1:H.page+1;delete H.force}}this.turn("update");return this},pages:function(E){var G=this.data();if(E){if(E<G.totalPages){for(var F=E+1;F<=G.totalPages;F++){this.turn("removePage",F)}if(this.turn("page")>E){this.turn("page",E)}}G.totalPages=E;return this}else{return G.totalPages}},_fitPage:function(G,E){var F=this.data(),H=this.turn("view",G);if(F.page!=G){this.trigger("turning",[G,H]);if(g.inArray(1,H)!=-1){this.trigger("first")}if(g.inArray(F.totalPages,H)!=-1){this.trigger("last")}}if(!F.pageObjs[G]){return}F.tpage=G;this.turn("stop",E);A._removeFromDOM.call(this);A._makeRange.call(this);this.trigger("turned",[G,H])},_turnPage:function(I){var J,F,H=this.data(),E=this.turn("view"),K=this.turn("view",I);if(H.page!=I){this.trigger("turning",[I,K]);if(g.inArray(1,K)!=-1){this.trigger("first")}if(g.inArray(H.totalPages,K)!=-1){this.trigger("last")}}if(!H.pageObjs[I]){return}H.tpage=I;this.turn("stop");A._makeRange.call(this);if(H.display=="single"){J=E[0];F=K[0]}else{if(E[1]&&I>E[1]){J=E[1];F=K[0]}else{if(E[0]&&I<E[0]){J=E[0];F=K[1]}}}if(H.pages[J]){var G=H.pages[J].data().f.opts;H.tpage=F;if(G.next!=F){G.next=F;H.pagePlace[F]=G.page;G.force=true}if(H.display=="single"){H.pages[J].flip("turnPage",(K[0]>E[0])?"br":"bl")}else{H.pages[J].flip("turnPage")}}},page:function(F){F=parseInt(F,10);var E=this.data();if(F>0&&F<=E.totalPages){if(!E.done||g.inArray(F,this.turn("view"))!=-1){A._fitPage.call(this,F)}else{A._turnPage.call(this,F)}return this}else{return E.page}},next:function(){var E=this.data();return this.turn("page",A._view.call(this,E.page).pop()+1)},previous:function(){var E=this.data();return this.turn("page",A._view.call(this,E.page).shift()-1)},_addMotionPage:function(){var G=g(this).data().f.opts,F=G.turn,E=F.data();G.pageMv=G.page;A._addMv.call(F,G.pageMv);E.pagePlace[G.next]=G.page;F.turn("update")},_start:function(J,G,F){var H=G.turn.data(),E=g.Event("start");J.stopPropagation();G.turn.trigger(E,[G,F]);if(E.isDefaultPrevented()){J.preventDefault();return}if(H.display=="single"){var I=F.charAt(1)=="l";if((G.page==1&&I)||(G.page==H.totalPages&&!I)){J.preventDefault()}else{if(I){G.next=(G.next<G.page)?G.next:G.page-1;G.force=true}else{G.next=(G.next>G.page)?G.next:G.page+1}}}A._addMotionPage.call(this)},_end:function(K,I){var H=g(this),J=H.data().f,G=J.opts,F=G.turn,E=F.data();K.stopPropagation();if(I||E.tpage){if(E.tpage==G.next||E.tpage==G.page){delete E.tpage;A._fitPage.call(F,E.tpage||G.next,true)}}else{A._removeMv.call(F,G.pageMv);F.turn("update")}},_pressed:function(){var I,G=g(this),H=G.data().f,F=H.opts.turn,E=F.data().pages;for(I in E){if(I!=H.opts.page){E[I].flip("disable",true)}}return H.time=new Date().getTime()},_released:function(H,E){var F=g(this),G=F.data().f;H.stopPropagation();if((new Date().getTime())-G.time<200||E.x<0||E.x>g(this).width()){H.preventDefault();G.opts.turn.data().tpage=G.opts.next;G.opts.turn.turn("update");g(F).flip("turnPage")}},_flip:function(){var E=g(this).data().f.opts;E.turn.trigger("turn",[E.next])},calculateZ:function(P){var H,K,N,F,O,J=this,G=this.data(),M=this.turn("view"),I=M[0]||M[1],E={pageZ:{},partZ:{},pageV:{}},L=function(R){var Q=J.turn("view",R);if(Q[0]){E.pageV[Q[0]]=true}if(Q[1]){E.pageV[Q[1]]=true}};for(H=0;H<P.length;H++){K=P[H];N=G.pages[K].data().f.opts.next;F=G.pagePlace[K];L(K);L(N);O=(G.pagePlace[N]==N)?N:K;E.pageZ[O]=G.totalPages-Math.abs(I-O);E.partZ[F]=G.totalPages*2+Math.abs(I-O)}return E},update:function(){var I,H=this.data();if(H.pageMv.length&&H.pageMv[0]!==0){var G,J=this.turn("calculateZ",H.pageMv),F=this.turn("view",H.tpage);if(H.pagePlace[F[0]]==F[0]){G=F[0]}else{if(H.pagePlace[F[1]]==F[1]){G=F[1]}}for(I in H.pageWrap){if(!e(I,H.pageWrap)){continue}H.pageWrap[I].css({display:(J.pageV[I])?"":"none","z-index":J.pageZ[I]||0});if(H.pages[I]){H.pages[I].flip("z",J.partZ[I]||null);if(J.pageV[I]){H.pages[I].flip("resize")}if(H.tpage){H.pages[I].flip("disable",true)}}}}else{for(I in H.pageWrap){if(!e(I,H.pageWrap)){continue}var E=A._setPageLoc.call(this,I);if(H.pages[I]){H.pages[I].flip("disable",H.disabled||E!=1).flip("z",null)}}}},_setPageLoc:function(G){var F=this.data(),E=this.turn("view");if(G==E[0]||G==E[1]){F.pageWrap[G].css({"z-index":F.totalPages,display:""});return 1}else{if((F.display=="single"&&G==E[0]+1)||(F.display=="double"&&G==E[0]-2||G==E[1]+2)){F.pageWrap[G].css({"z-index":F.totalPages-1,display:""});return 2}else{F.pageWrap[G].css({"z-index":0,display:"none"});return 0}}}},y={init:function(E){if(E.gradients){E.frontGradient=true;E.backGradient=true}this.data({f:{}});this.flip("options",E);y._addPageWrapper.call(this);return this},setData:function(F){var E=this.data();E.f=g.extend(E.f,F);return this},options:function(E){var F=this.data().f;if(E){y.setData.call(this,{opts:g.extend({},F.opts||a,E)});return this}else{return F.opts}},z:function(F){var E=this.data().f;E.opts["z-index"]=F;E.fwrapper.css({"z-index":F||parseInt(E.parent.css("z-index"),10)||0});return this},_cAllowed:function(){return x[this.data().f.opts.corners]||this.data().f.opts.corners},_cornerActivated:function(J){if(J.originalEvent===undefined){return false}J=(n)?J.originalEvent.touches:[J];var H=this.data().f,L=H.parent.offset(),G=this.width(),F=this.height(),K={x:Math.max(0,J[0].pageX-L.left),y:Math.max(0,J[0].pageY-L.top)},I=H.opts.cornerSize,E=y._cAllowed.call(this);if(K.x<=0||K.y<=0||K.x>=G||K.y>=F){return false}if(K.y<I){K.corner="t"}else{if(K.y>=F-I){K.corner="b"}else{return false}}if(K.x<=I){K.corner+="l"}else{if(K.x>=G-I){K.corner+="r"}else{return false}}return(g.inArray(K.corner,E)==-1)?false:K},_c:function(F,E){E=E||0;return({tl:h(E,E),tr:h(this.width()-E,E),bl:h(E,this.height()-E),br:h(this.width()-E,this.height()-E)})[F]},_c2:function(E){return{tl:h(this.width()*2,0),tr:h(-this.width(),0),bl:h(this.width()*2,this.height()),br:h(-this.width(),this.height())}[E]},_foldingPage:function(F){var E=this.data().f.opts;if(E.folding){return E.folding}else{if(E.turn){var G=E.turn.data();if(G.display=="single"){return(G.pageObjs[E.next])?G.pageObjs[0]:null}else{return G.pageObjs[E.next]}}}},_backGradient:function(){var F=this.data().f,E=F.opts.turn,G=F.opts.backGradient&&(!E||E.data().display=="single"||(F.opts.page!=2&&F.opts.page!=E.data().totalPages-1));if(G&&!F.bshadow){F.bshadow=g("<div/>",t(0,0,1)).css({position:"",width:this.width(),height:this.height()}).appendTo(F.parent)}return G},resize:function(G){var I=this.data().f,H=this.width(),E=this.height(),F=Math.round(Math.sqrt(Math.pow(H,2)+Math.pow(E,2)));if(G){I.wrapper.css({width:F,height:F});I.fwrapper.css({width:F,height:F}).children(":first-child").css({width:H,height:E});I.fpage.css({width:E,height:H});if(I.opts.frontGradient){I.ashadow.css({width:E,height:H})}if(y._backGradient.call(this)){I.bshadow.css({width:H,height:E})}}if(I.parent.is(":visible")){I.fwrapper.css({top:I.parent.offset().top,left:I.parent.offset().left});if(I.opts.turn){I.fparent.css({top:-I.opts.turn.offset().top,left:-I.opts.turn.offset().left})}}this.flip("z",I.opts["z-index"])},_addPageWrapper:function(){var I,H=this.data().f,K=this.parent();if(!H.wrapper){var G=this.css("left"),J=this.css("top"),F=this.width(),L=this.height(),M=Math.round(Math.sqrt(Math.pow(F,2)+Math.pow(L,2)));H.parent=K;H.fparent=(H.opts.turn)?H.opts.turn.data().fparent:g("#turn-fwrappers");if(!H.fparent){var E=g("<div/>",{css:{"pointer-events":"none"}}).hide();E.data().flips=0;if(H.opts.turn){E.css(t(-H.opts.turn.offset().top,-H.opts.turn.offset().left,"auto","visible").css).appendTo(H.opts.turn);H.opts.turn.data().fparent=E}else{E.css(t(0,0,"auto","visible").css).attr("id","turn-fwrappers").appendTo(g("body"))}H.fparent=E}this.css({position:"absolute",top:0,left:0,bottom:"auto",right:"auto"});H.wrapper=g("<div/>",t(0,0,this.css("z-index"))).appendTo(K).prepend(this);H.fwrapper=g("<div/>",t(K.offset().top,K.offset().left)).hide().appendTo(H.fparent);H.fpage=g("<div/>",{css:{cursor:"default"}}).appendTo(g("<div/>",t(0,0,0,"visible")).appendTo(H.fwrapper));if(H.opts.frontGradient){H.ashadow=g("<div/>",t(0,0,1)).appendTo(H.fpage)}y.setData.call(this,H);y.resize.call(this,true)}},_fold:function(U){var L=this,ad=0,J=0,Z,O,I,G,F,R,K,P=h(0,0),Y=h(0,0),E=h(0,0),T=this.width(),Q=this.height(),ab=y._foldingPage.call(this),X=Math.tan(J),ae=this.data().f,aa=ae.opts.acceleration,W=ae.wrapper.height(),S=y._c.call(this,U.corner),N=U.corner.substr(0,1)=="t",H=U.corner.substr(1,1)=="l",V=function(){var ao=h((S.x)?S.x-U.x:U.x,(S.y)?S.y-U.y:U.y),al=(Math.atan2(ao.y,ao.x)),ap;J=l-al;ad=s(J);ap=h((H)?T-ao.x/2:U.x+ao.x/2,ao.y/2);var ag=J-Math.atan2(ap.y,ap.x),af=Math.max(0,Math.sin(ag)*Math.sqrt(Math.pow(ap.x,2)+Math.pow(ap.y,2)));E=h(af*Math.sin(J),af*Math.cos(J));if(J>l){E.x=E.x+Math.abs(E.y*Math.tan(al));E.y=0;if(Math.round(E.x*Math.tan(w-J))<Q){U.y=Math.sqrt(Math.pow(Q,2)+2*ap.x*ao.x);if(N){U.y=Q-U.y}return V()}}if(J>l){var am=w-J,an=W-Q/Math.sin(am);P=h(Math.round(an*Math.cos(am)),Math.round(an*Math.sin(am)));if(H){P.x=-P.x}if(N){P.y=-P.y}}O=Math.round(E.y/Math.tan(J)+E.x);var ak=T-O,ai=ak*Math.cos(J*2),ah=ak*Math.sin(J*2);Y=h(Math.round((H?ak-ai:O+ai)),Math.round((N)?ah:Q-ah));R=ak*Math.sin(J);var ac=y._c2.call(L,U.corner),aj=Math.sqrt(Math.pow(ac.x-U.x,2)+Math.pow(ac.y-U.y,2));K=(aj<T)?aj/T:1;if(ae.opts.frontGradient){F=R>100?(R-100)/R:0;I=h(R*Math.sin(l-J)/Q*100,R*Math.cos(l-J)/T*100);if(N){I.y=100-I.y}if(H){I.x=100-I.x}}if(y._backGradient.call(L)){G=h(R*Math.sin(J)/T*100,R*Math.cos(J)/Q*100);if(!H){G.x=100-G.x}if(!N){G.y=100-G.y}}E.x=Math.round(E.x);E.y=Math.round(E.y);return true},M=function(ai,ah,ak,aj){var ag=["0","auto"],al=(T-W)*ak[0]/100,af=(Q-W)*ak[1]/100,am={left:ag[ah[0]],top:ag[ah[1]],right:ag[ah[2]],bottom:ag[ah[3]]},ac=(aj!=90&&aj!=-90)?(H?-1:1):0;ak=ak[0]+"% "+ak[1]+"%";L.css(am).transform(z(aj)+q(ai.x+ac,ai.y,aa),ak);ae.fpage.parent().css(am);ae.wrapper.transform(q(-ai.x+al-ac,-ai.y+af,aa)+z(-aj),ak);ae.fwrapper.transform(q(-ai.x+P.x+al,-ai.y+P.y+af,aa)+z(-aj),ak);ae.fpage.parent().transform(z(aj)+q(ai.x+Y.x-P.x,ai.y+Y.y-P.y,aa),ak);if(ae.opts.frontGradient){b(ae.ashadow,h(H?100:0,N?100:0),h(I.x,I.y),[[F,"rgba(0,0,0,0)"],[((1-F)*0.8)+F,"rgba(0,0,0,"+(0.2*K)+")"],[1,"rgba(255,255,255,"+(0.2*K)+")"]],3,J)}if(y._backGradient.call(L)){b(ae.bshadow,h(H?0:100,N?0:100),h(G.x,G.y),[[0.8,"rgba(0,0,0,0)"],[1,"rgba(0,0,0,"+(0.3*K)+")"],[1,"rgba(0,0,0,0)"]],3)}};switch(U.corner){case"tl":U.x=Math.max(U.x,1);V();M(E,[1,0,0,1],[100,0],ad);ae.fpage.transform(q(-Q,-T,aa)+z(90-ad*2),"100% 100%");ab.transform(z(90)+q(0,-Q,aa),"0% 0%");break;case"tr":U.x=Math.min(U.x,T-1);V();M(h(-E.x,E.y),[0,0,0,1],[0,0],-ad);ae.fpage.transform(q(0,-T,aa)+z(-90+ad*2),"0% 100%");ab.transform(z(270)+q(-T,0,aa),"0% 0%");break;case"bl":U.x=Math.max(U.x,1);V();M(h(E.x,-E.y),[1,1,0,0],[100,100],-ad);ae.fpage.transform(q(-Q,0,aa)+z(-90+ad*2),"100% 0%");ab.transform(z(270)+q(-T,0,aa),"0% 0%");break;case"br":U.x=Math.min(U.x,T-1);V();M(h(-E.x,-E.y),[0,1,1,0],[0,100],ad);ae.fpage.transform(z(90-ad*2),"0% 0%");ab.transform(z(90)+q(0,-Q,aa),"0% 0%");break}ae.point=U},_moveFoldingPage:function(E){var G=this.data().f,F=y._foldingPage.call(this);if(F){if(E){if(!G.fpage.children()[G.ashadow?"1":"0"]){y.setData.call(this,{backParent:F.parent()});G.fpage.prepend(F)}}else{if(G.backParent){G.backParent.prepend(F)}}}},_showFoldedPage:function(L,G){var H=y._foldingPage.call(this),F=this.data(),K=F.f;if(!K.point||K.point.corner!=L.corner){var J=g.Event("start");this.trigger(J,[K.opts,L.corner]);if(J.isDefaultPrevented()){return false}}if(H){if(G){var I=this,E=(K.point&&K.point.corner==L.corner)?K.point:y._c.call(this,L.corner,1);this.animatef({from:[E.x,E.y],to:[L.x,L.y],duration:500,frame:function(M){L.x=Math.round(M[0]);L.y=Math.round(M[1]);y._fold.call(I,L)}})}else{y._fold.call(this,L);if(F.effect&&!F.effect.turning){this.animatef(false)}}if(!K.fwrapper.is(":visible")){K.fparent.show().data().flips++;y._moveFoldingPage.call(this,true);K.fwrapper.show();if(K.bshadow){K.bshadow.show()}}return true}return false},hide:function(){var F=this.data().f,E=y._foldingPage.call(this);if((--F.fparent.data().flips)===0){F.fparent.hide()}this.css({left:0,top:0,right:"auto",bottom:"auto"}).transform("","0% 100%");F.wrapper.transform("","0% 100%");F.fwrapper.hide();if(F.bshadow){F.bshadow.hide()}E.transform("","0% 0%");return this},hideFoldedPage:function(E){var F=this.data().f;if(!F.point){return}var H=this,N=F.point,G=function(){F.point=null;H.flip("hide");H.trigger("end",[false])};if(E){var J=y._c.call(this,N.corner),I=(N.corner.substr(0,1)=="t"),M=(I)?Math.min(0,N.y-J.y)/2:Math.max(0,N.y-J.y)/2,L=h(N.x,N.y+M),K=h(J.x,J.y-M);this.animatef({from:0,to:1,frame:function(O){var P=r(N,L,K,J,O);N.x=P.x;N.y=P.y;y._fold.call(H,N)},complete:G,duration:800,hiding:true})}else{this.animatef(false);G()}},turnPage:function(G){var F=this,H=this.data().f;G={corner:(H.corner)?H.corner.corner:G||y._cAllowed.call(this)[0]};var I=H.point||y._c.call(this,G.corner,(H.opts.turn)?H.opts.turn.data().opts.elevation:0),E=y._c2.call(this,G.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(J){var K=r(I,I,E,E,J);G.x=K.x;G.y=K.y;y._showFoldedPage.call(F,G)},complete:function(){F.trigger("end",[true])},duration:H.opts.duration,turning:true});H.corner=null},moving:function(){return"effect" in this.data()},isTurning:function(){return this.flip("moving")&&this.data().effect.turning},_eventStart:function(F){var E=this.data().f;if(!E.disabled&&!this.flip("isTurning")){E.corner=y._cornerActivated.call(this,F);if(E.corner&&y._foldingPage.call(this,E.corner)){y._moveFoldingPage.call(this,true);this.trigger("pressed",[E.point]);return false}else{E.corner=null}}},_eventMove:function(H){var G=this.data().f;if(!G.disabled){H=(n)?H.originalEvent.touches:[H];if(G.corner){var I=G.parent.offset();G.corner.x=H[0].pageX-I.left;G.corner.y=H[0].pageY-I.top;y._showFoldedPage.call(this,G.corner)}else{if(!this.data().effect&&this.is(":visible")){var F=y._cornerActivated.call(this,H[0]);if(F){var E=y._c.call(this,F.corner,G.opts.cornerSize/2);F.x=E.x;F.y=E.y;y._showFoldedPage.call(this,F,true)}else{y.hideFoldedPage.call(this,true)}}}}},_eventEnd:function(){var F=this.data().f;if(!F.disabled&&F.point){var E=g.Event("released");this.trigger(E,[F.point]);if(!E.isDefaultPrevented()){y.hideFoldedPage.call(this,true)}}F.corner=null},disable:function(E){y.setData.call(this,{disabled:E});return this}},o=function(G,E,F){if(!F[0]||typeof(F[0])=="object"){return E.init.apply(G,F)}else{if(E[F[0]]&&F[0].toString().substr(0,1)!="_"){return E[F[0]].apply(G,Array.prototype.slice.call(F,1))}else{throw F[0]+" is an invalid value"}}};g.extend(g.fn,{flip:function(F,E){return o(this,y,arguments)},turn:function(E){return o(this,A,arguments)},transform:function(F,E){var G={};if(E){G[C+"transform-origin"]=E}G[C+"transform"]=F;return this.css(G)},animatef:function(M){var H=this.data();if(H.effect){clearInterval(H.effect.handle)}if(M){if(!M.to.length){M.to=[M.to]}if(!M.from.length){M.from=[M.from]}if(!M.easing){M.easing=function(O,P,N,R,Q){return R*Math.sqrt(1-(P=P/Q-1)*P)+N}}var G,L=[],K=M.to.length,J=this,E=M.fps||30,F=-E,I=function(){var O,N=[];F=Math.min(M.duration,F+E);for(O=0;O<K;O++){N.push(M.easing(1,F,M.from[O],L[O],M.duration))}M.frame((K==1)?N[0]:N);if(F==M.duration){clearInterval(H.effect.handle);delete H.effect;J.data(H);if(M.complete){M.complete()}}};for(G=0;G<K;G++){L.push(M.to[G]-M.from[G])}H.effect=M;H.effect.handle=setInterval(I,E);this.data(H);I()}else{delete H.effect}}});g.isTouch=n})(jQuery);Array.prototype.contains=function(b){var a=this.length;while(a--){if(this[a]===b){return true}}return false};Array.prototype.clear=function(){var a=this.length;while(a--){this[a]=0}};var timeDiff={start:function(){d=new Date();time=d.getTime()},end:function(){d=new Date();return(d.getTime()-time)}};function Sudoku(){this.matrix=new Array(81);this.matrix.clear();this.level=0;this.shuffle=function(q){for(var m=0;m<9;m++){for(var g=0;g<9;g++){q[m*9+g]=(m*3+Math.floor(m/3)+g)%9+1}}for(var m=0;m<42;m++){var o=Math.ceil(Math.random()*9);var n;do{n=Math.ceil(Math.random()*9)}while(o==n);for(var v=0;v<9;v++){for(var e=0;e<e;k++){if(q[v*9+e]==o){q[v*9+e]=n}else{if(q[v*9+e]==n){q[v*9+e]=o}}}}}for(var p=0;p<42;p++){var t=Math.floor(Math.random()*3);var r=Math.floor(Math.random()*3);for(var v=0;v<9;v++){var l=this.matrix[v*9+(t*3+p%3)];this.matrix[v*9+(t*3+p%3)]=this.matrix[v*9+(r*3+p%3)];this.matrix[v*9+(r*3+p%3)]=l}}for(var u=0;u<42;u++){var h=Math.floor(Math.random()*3);var f=Math.floor(Math.random()*3);for(var v=0;v<9;v++){var l=this.matrix[v*9+(u%3*3+h)];this.matrix[v*9+(u%3*3+h)]=this.matrix[v*9+(u%3*3+f)];this.matrix[v*9+(u%3*3+f)]=l}}for(var u=0;u<42;u++){var b=Math.floor(Math.random()*3);var a=Math.floor(Math.random()*3);for(var e=0;e<9;e++){var l=this.matrix[(u%3*3+b)*9+e];this.matrix[(u%3*3+b)*9+e]=this.matrix[(u%3*3+a)*9+e];this.matrix[(u%3*3+a)*9+e]=l}}};this.maskBoardEasy=function(e,a){var g,f,b;for(g=0;g<81;g++){a[g]=e[g]}for(var g=0;g<3;g++){for(var f=0;f<3;f++){for(var b=0;b<5;b++){var h;do{h=Math.floor(Math.random()*9)}while(a[(g*3+Math.floor(h/3))*9+f*3+h%3]==0);a[(g*3+Math.floor(h/3))*9+f*3+h%3]=0}}}};this.getAvailable=function(m,n,h){var f,e,o,b,a,l;var g=new Array(9);g.clear();o=Math.floor(n/9);b=n%9;for(f=0;f<9;f++){e=o*9+f;if(m[e]>0){g[m[e]-1]=1}}for(f=0;f<9;f++){e=f*9+b;if(m[e]>0){g[m[e]-1]=1}}a=o-o%3;l=b-b%3;for(f=a;f<a+3;f++){for(e=l;e<l+3;e++){if(m[f*9+e]>0){g[m[f*9+e]-1]=1}}}e=0;if(h!=null){for(f=0;f<9;f++){if(g[f]==0){h[e++]=f+1}}}else{for(f=0;f<9;f++){if(g[f]==0){e++}}return e}if(e==0){return 0}for(f=0;f<18;f++){a=Math.floor(Math.random()*e);l=Math.floor(Math.random()*e);o=h[a];h[a]=h[l];h[l]=o}return e};this.getCell=function(b){var a=-1,g=10,e,c;var f=new Array(9);f.clear();for(e=0;e<81;e++){if(b[e]==0){c=this.getAvailable(b,e,null);if(c<g){g=c;a=e}if(g==1){break}}}return a};this.solve=function(b){var f,e,c=0;var a=this.getCell(b);if(a==-1){return 1}var g=new Array(9);g.clear();e=this.getAvailable(b,a,g);for(f=0;f<e;f++){b[a]=g[f];if(this.solve(b)==1){return 1}}b[a]=0;return 0};this.enumSolutions=function(b){var f,e,c=0;var a=this.getCell(b);if(a==-1){return 1}var g=new Array(9);g.clear();e=this.getAvailable(b,a,g);for(f=0;f<e;f++){b[a]=g[f];c+=this.enumSolutions(b);if(c>1){break}}b[a]=0;return c};this.maskBoard=function(q,w){var x,s,p,l,y,m=0,A,o=0,b,B;var h=new Array(9);h.clear();var z=new Array(81);z.clear();w.clear();do{do{b=Math.floor(Math.random()*81)}while((w[b]!=0)||(z[b]!=0));B=q[b];x=this.getAvailable(w,b,null);if(x>1){var u,f=Math.floor(b/9),e=b%9;u=0;for(x=0;x<9;x++){if(x==e){continue}s=f*9+x;if(w[s]>0){continue}A=this.getAvailable(w,s,h);for(s=0;s<A;s++){if(h[s]==B){u++;break}h[s]=0}}if(u>0){u=0;for(x=0;x<9;x++){if(x==f){continue}s=x*9+e;if(w[s]>0){continue}A=this.getAvailable(w,s,h);for(s=0;s<A;s++){if(h[s]==B){u++;break}h[s]=0}}if(u>0){u=0;l=f-f%3;y=e-e%3;for(x=l;x<l+3;x++){for(s=y;s<y+3;s++){if((x==f)&&(s==e)){continue}p=x*9+s;if(w[p]>0){continue}A=this.getAvailable(w,p,h);for(p=0;p<A;p++){if(h[p]==B){u++;break}h[p]=0}}}if(u>0){w[b]=B;o++}}}}z[b]=1;m++}while(m<81);do{do{b=Math.floor(Math.random()*81)}while((w[b]==0)||(z[b]==0));B=w[b];var g=this;var v=0;w[b]=0;v=this.enumSolutions(w);if(v>1){w[b]=B}z[b]=0;o--}while(o>0)};this._checkVal=function(a,l,e,h){var f,b,g,m;for(f=0;f<9;f++){if((f!=e)&&(a[l*9+f]==h)){return false}}for(f=0;f<9;f++){if((f!=l)&&(a[f*9+e]==h)){return false}}g=l-l%3;m=e-e%3;for(f=g;f<g+3;f++){for(b=m;b<m+3;b++){if(((f!=l)||(b!=e))&&(a[f*9+b]==h)){return false}}}return true};this.checkVal=function(c,a,b){return this._checkVal(this.matrix,c,a,b)};this.setVal=function(c,a,b){this.matrix[c*9+a]=b};this.getVal=function(b,a){return this.matrix[b*9+a]};this._newGame=function(){var c,e=0;var b=new Array(81);this.matrix.clear();this.solve(this.matrix);if(this.level==0){this.maskBoardEasy(this.matrix,b)}else{this.maskBoard(this.matrix,b);if(this.level==1){for(c=0;c<4;c++){do{var a=Math.floor(Math.random()*81)}while(b[a]!=0);b[a]=this.matrix[a]}}}this.save=this.matrix;this.matrix=b;timeDiff.start()};this.done;this._doHints=function(e,b,c,g){if(g>0){do{cell=Math.floor(Math.random()*81)}while((b[cell]==0)||(c[cell]==0));val=b[cell];var f=this;var a=0;b[cell]=0;a=this.enumSolutions(b);if(a>1){b[cell]=val}c[cell]=0;g--;var f=this;setTimeout(function(){f._doHints(e,b,c,g)},50)}else{this.save=this.matrix;this.matrix=b;this.done()}};this._doMask=function(q,v){var w,s,p,l,x,m=0,z,o=0,b,A;var h=new Array(9);h.clear();var y=new Array(81);y.clear();v.clear();do{do{b=Math.floor(Math.random()*81)}while((v[b]!=0)||(y[b]!=0));A=q[b];w=this.getAvailable(v,b,null);if(w>1){var u,f=Math.floor(b/9),e=b%9;u=0;for(w=0;w<9;w++){if(w==e){continue}s=f*9+w;if(v[s]>0){continue}z=this.getAvailable(v,s,h);for(s=0;s<z;s++){if(h[s]==A){u++;break}h[s]=0}}if(u>0){u=0;for(w=0;w<9;w++){if(w==f){continue}s=w*9+e;if(v[s]>0){continue}z=this.getAvailable(v,s,h);for(s=0;s<z;s++){if(h[s]==A){u++;break}h[s]=0}}if(u>0){u=0;l=f-f%3;x=e-e%3;for(w=l;w<l+3;w++){for(s=x;s<x+3;s++){if((w==f)&&(s==e)){continue}p=w*9+s;if(v[p]>0){continue}z=this.getAvailable(v,p,h);for(p=0;p<z;p++){if(h[p]==A){u++;break}h[p]=0}}}if(u>0){v[b]=A;o++}}}}y[b]=1;m++}while(m<81);var g=this;setTimeout(function(){g._doHints(q,v,y,o)},50)};this.newGame=function(){var c,e=0;var b=new Array(81);this.matrix.clear();this.solve(this.matrix);if(this.level==0){this.maskBoardEasy(this.matrix,b);this.save=this.matrix;this.matrix=b;timeDiff.start();this.done()}else{this._doMask(this.matrix,b);if(this.level==1){for(c=0;c<4;c++){do{var a=Math.floor(Math.random()*81)}while(b[a]!=0);b[a]=this.matrix[a]}}}};this.solveGame=function(){this.matrix=this.save};this.gameFinished=function(){for(var b=0;b<9;b++){for(var a=0;a<9;a++){var c=this.matrix[b*9+a];if((c==0)||(this._checkVal(this.matrix,b,a,c)==false)){return 0}}}return timeDiff.end()}};/*!
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
	
})(jQuery);/*!
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
/*!
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
/*!
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
/*! JsRender v1.0pre: http://github.com/BorisMoore/jsrender */
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