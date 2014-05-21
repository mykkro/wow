/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _presetDAO = null
var presetDAO = function() {
	if(!_presetDAO) 
		_presetDAO = require("../dao/PresetDAO")
	return new (_presetDAO)
}
var _presetTpl = null
var presetTpl = function() {
	if(!_presetTpl) 
		_presetTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/preset.default.html"), "utf8")
	return _presetTpl
}

var PresetAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("preset", presetDAO, presetTpl, {"color":"#bcd"})
	},
	getThumbnailUri: function(data) {		
		return null
	}
})

module.exports = PresetAPI