var FavoriteAPI = require("./FavoriteAPI")

var YouTubeAPI = require("./YouTubeVideoAPI")

var FavoriteYouTubeVideoAPI = FavoriteAPI.extend({
	constructor: function() {
		this.base()
		this.ytapi = new YouTubeAPI()
	},
	starById: function(userId, ytId, cb) {
		var self = this
		self.ytapi.findOne({"ytId":ytId}, function(err, video) {
			if(err) {
				cb(err)
			} else {
				if(video) {
					// video found!
					console.log("Video found!")
					self.eapi.getByEidp(video._id, 'youTubeVideo').done(function(vid) {
						self.star(userId, parseInt(vid._id), cb)
					})
				} else {
					// video not found... we will create one
					self.ytapi.create({
						ownerAdminId: -1,
						tags: [],
						ytId: ytId
					}, function(err, newVideo) {
						if(err) {
							cb(err)
						} else {
							console.log("Video created!")							
							self.eapi.getByEidp(newVideo[0]._id, 'youTubeVideo').done(function(vid) {
								self.star(userId, parseInt(vid._id), cb)
							})
						}
					})
				}
			}
		})
	},
	unstarById: function(userId, ytId, cb) {
		var self = this
		self.ytapi.findOne({"ytId":ytId}, function(err, video) {
			if(err) {
				cb(err)
			} else {
				if(video) {
					// video found!
					console.log("Video found!")
					self.eapi.getByEidp(video._id, 'youTubeVideo').done(function(vid) {
						self.unstar(userId, parseInt(vid._id), cb)
					})
				} else {
					// video not found... do nothing
					cb()
				}
			}
		})
	},
	starredById: function(userId, ytId, cb) {
		var self = this
		self.ytapi.findOne({"ytId":ytId}, function(err, video) {
			if(err) {
				cb(err)
			} else {
				if(!video) {
					// it is not in list and thus cannot be starred
					cb(null, false)
				} else {
					// get entity ID...
					self.eapi.getByEidp(video._id, 'youTubeVideo').done(function(vid) {
						self.starred(userId, parseInt(vid._id), cb)
					})					
				}
			}
		})
	}
})

module.exports = FavoriteYouTubeVideoAPI