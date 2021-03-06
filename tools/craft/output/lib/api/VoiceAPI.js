/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _voiceDAO = null
var voiceDAO = function() {
	if(!_voiceDAO) 
		_voiceDAO = require("../dao/VoiceDAO")
	return new (_voiceDAO)
}
var _voiceTpl = null
var voiceTpl = function() {
	if(!_voiceTpl) 
		_voiceTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/voice.default.html"), "utf8")
	return _voiceTpl
}

var VoiceAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("voice", voiceDAO, voiceTpl, {"color":"#dff"})
	},
	getThumbnailUri: function(data) {		
		return this.thumbFromUUID(data.voiceUUID)
	}
})

module.exports = VoiceAPI