// to be used as constructor
var i18n = function(data) {	
	this.locales = data.locales
	this.defaultLocale = data.defaultLocale
	this.__ = function(str) {
		return str		
	}
	this.setLocale = function(loc) {
		// TODO
	}
}
module.exports = i18n