/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var presetDAO = new (require("../dao/PresetDAO"))

var ShortcutAPI = require("./ShortcutAPI")
var ThemeAPI = require("./ThemeAPI")
var Q = require("q")

var PresetAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("preset", presetDAO, {"color":"#bcd"})
		this.sapi = new ShortcutAPI()
		this.tapi = new ThemeAPI()
	},
	getThumbnailUri: function(data) {		
		return null
	},
	get: function(id, next) {
		var self = this
		this.base(id, function(err, preset) {
			if(err) next(err);
			else if(!preset) next(null, null);
			else {
				Q.all([
					self.sapi.getp(preset.button1LinkId),
					self.sapi.getp(preset.button2LinkId),
					self.sapi.getp(preset.button3LinkId),
					self.tapi.getp(preset.themeId)
				]).spread(function(link1, link2, link3, theme) {
					preset.button1Link = link1
					preset.button2Link = link2
					preset.button3Link = link3
					preset.theme = theme
					next(null, preset)
				})
			}
		})
	}
})

module.exports = PresetAPI
