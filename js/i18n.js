// to be used as constructor

var fs = require("fs")
var path = require("path")
var locdata = {
	cz: JSON.parse(fs.readFileSync(__dirname + "/../locales/cz.js")),
	de: JSON.parse(fs.readFileSync(__dirname + "/../locales/de.js")),
	en: JSON.parse(fs.readFileSync(__dirname + "/../locales/en.js"))
}

var i18n = function(data) {	
	this.locales = data.locales
	this.defaultLocale = data.defaultLocale
	this.__ = function(str) {
		return locdata[this.defaultLocale][str] || str
	}
	this.setLocale = function(loc) {
		this.defaultLocale = loc
	}
}
module.exports = i18n