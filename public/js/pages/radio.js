require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"pHJsX/":[function(require,module,exports){
module.exports = function(window, $, SVG, i18n) {
	return {
		init: function(Widgetizer, data, next) {
			/* widgetization complete! */
			Widgetizer.get("quitButton").click(function() {
				// move back to previous page...
				window.history.go(-1)
			})

			/* continue when finished */
			if(next) next(this)
		}
	}

}
},{}],"pagescript":[function(require,module,exports){
module.exports=require('pHJsX/');
},{}]},{},["pHJsX/"])