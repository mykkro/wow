/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var merge = require("merge")
var IndexedNodeAPI = require("./IndexedNodeAPI")
var YouTubeUtil = require("../YouTubeUtil")

var _youTubeVideoDAO = null
var youTubeVideoDAO = function() {
	if(!_youTubeVideoDAO) 
		_youTubeVideoDAO = require("../dao/YouTubeVideoDAO")
	return new (_youTubeVideoDAO)
}
var _youTubeVideoTpl = null
var youTubeVideoTpl = function() {
	if(!_youTubeVideoTpl) 
		_youTubeVideoTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/youTubeVideo.default.html"), "utf8")
	return _youTubeVideoTpl
}

var YouTubeVideoAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("youTubeVideo", youTubeVideoDAO, youTubeVideoTpl, {"color":"#ece"})
	},
	withInfo: function(d, next) {
		var data = merge({}, d)
		var ytId = data.ytId
		YouTubeUtil.info(ytId, function(err, res) {
			if(err) {
				return next(err)
			}
			data.title = data.title || res.title
			data.description = data.description || res.description
			data.url = res.url
			data.thumbnailUrl = res.thumbnailUrl
			data.viewCount = res.viewCount
			data.likeCount = res.likeCount
			data.favoriteCount = res.favoriteCount
			data.commentCount = res.commentCount
			data.duration = res.duration
			next(null, data)
		})
	},
	withUrls: function(d) {
		var data = merge({}, d)
		if(data.ytId) {
			data.url = YouTubeUtil.urlFromId(data.ytId)
			data.thumbnailUrl = YouTubeUtil.thumbFromId(data.ytId)
		}
		return data
	},
	create: function(data, next) {
		var self = this
		var data = this.withUrls(data)
		self.withInfo(data, function(err, newData) {
			if(err) {
				return next(err)
			}
			console.log("YouTube API data", newData)
			// but this won't work!
			//self.base(newData, next)
		})
		// TODO use async function to set title, description and statistics
		self.base(data, next)
	},
	set: function(id, data, next) {
		var self = this
		var data = this.withUrls(data)
		// TODO use async function to set title, description and statistics
		this.base(id, data, next)
	},
	update: function(id, data, next) {
		var self = this
		var data = this.withUrls(data)
		// TODO use async function to set title, description and statistics
		this.base(id, data, next)
	},	
	getThumbnailUri: function(data) {		
		return data.thumbnailUrl
	}
})

module.exports = YouTubeVideoAPI