/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _netRadioDAO = null
var netRadioDAO = function() {
	if(!_netRadioDAO) 
		_netRadioDAO = require("../dao/NetRadioDAO")
	return new (_netRadioDAO)
}
var _netRadioTpl = null
var netRadioTpl = function() {
	if(!_netRadioTpl) 
		_netRadioTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/netRadio.default.html"), "utf8")
	return _netRadioTpl
}

var NetRadioAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("netRadio", netRadioDAO, netRadioTpl, {"color":"#def"})
	},
	getThumbnailUri: function(data) {		
		return null
	}
})

module.exports = NetRadioAPI