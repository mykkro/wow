/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _playlistDAO = null
var playlistDAO = function() {
	if(!_playlistDAO) 
		_playlistDAO = require("../dao/PlaylistDAO")
	return new (_playlistDAO)
}

var PlaylistAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("playlist", playlistDAO, {"color":"#fed"})
	},
	getThumbnailUri: function(data) {		
		return null
	}
})

module.exports = PlaylistAPI