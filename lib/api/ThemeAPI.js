/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var themeDAO = new (require("../dao/ThemeDAO"))

var ThemeAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("theme", themeDAO, {"color":"#bab"})
	},
	getThumbnailUri: function(data) {		
		return null
	}
})

module.exports = ThemeAPI
