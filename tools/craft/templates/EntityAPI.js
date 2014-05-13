/* File autogenerated by craft {{datetime}} */

var fs = require('fs'); 
var path = require("path")
var NodeAPI = require("./NodeAPI")

var _{{varname}} = null
var {{varname}} = function() {
	if(!_{{varname}}) 
		_{{varname}} = require("../dao/{{daoname}}")
	return new (_{{varname}})
}
var _{{tplvarname}} = null
var {{tplvarname}} = function() {
	if(!_{{tplvarname}}) 
		_{{tplvarname}} = fs.readFileSync(path.join(__dirname, "../../templates/nodes/{{name}}.default.html"), "utf8")
	return _{{tplvarname}}
}

var {{apiname}} = NodeAPI.extend({
	constructor: function() {
		this.base("{{name}}", {{varname}}, {{tplvarname}})
	},
	getThumbnailUri: function() {
		return null
	}
})

module.exports = {{apiname}}