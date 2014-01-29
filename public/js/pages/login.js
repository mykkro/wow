require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"kriAor":[function(require,module,exports){
module.exports = function(window, $, SVG, i18n) {

	function tzLogin() {
		//window.alert("TZ!")
		window.location = "/pages/home"
	}

	function adminLogin() {
		//window.alert("Admin!")
		window.location = "/admin"
	}
	var baseUrl;
	
	var page = {
		init: function(Widgetizer, data, next) {
			/* do something... */
			$("[name=tzlogin] .overlay").click(tzLogin)
			$("[name=adminlogin] .overlay").click(adminLogin)

			/* continue when finished */
			if(next) next(page)
		}
	}
	return page

}
},{}],"pagescript":[function(require,module,exports){
module.exports=require('kriAor');
},{}]},{},["kriAor"])