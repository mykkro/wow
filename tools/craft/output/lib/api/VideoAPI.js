/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _videoDAO = null
var videoDAO = function() {
	if(!_videoDAO) 
		_videoDAO = require("../dao/VideoDAO")
	return new (_videoDAO)
}
var _videoTpl = null
var videoTpl = function() {
	if(!_videoTpl) 
		_videoTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/video.default.html"), "utf8")
	return _videoTpl
}

var VideoAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("video", videoDAO, videoTpl, {"color":"#fdf"})
	},
	getThumbnailUri: function(data) {		
		return null
	}
})

module.exports = VideoAPI