var http = require('http');
var https = require('https');
var youtube = require('youtube-feeds')

var UserVideos = require("../dao/uservideos")
var FavVids = require("../dao/favoritevideos")

module.exports = {
    hello: function(params, cb) {
        /* each rpc method has two arguments: */
        /* params - a params map */
        /* cb - function(error, result) */
        cb(null, {"greeting": "hello "+params.name})
    },
    /* params: userId, videoId */
	videoIsStarred: function(params, cb) {
		FavVids.starred(params.userId, params.videoId, cb)
	},
    /* params: userId, videoId */
	videoStar: function(params, cb) {
		FavVids.star(params.userId, params.videoId, cb)
	},
    /* params: userId, videoId */
	videoUnstar: function(params, cb) {
		FavVids.unstar(params.userId, params.videoId, cb)
	},
	/* no params - yet... */
	// TODO add params latitude, longitude
	// https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20"
	weatherInfo: function(params, cb) {
		var url = 'https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20'
		https.get(url, function(res) {
		    var body = '';
		    res.on('data', function(chunk) {
		        body += chunk;
		    });

		    res.on('end', function() {
		        var fbResponse = JSON.parse(body)
		        cb(null, fbResponse)
		    });
		}).on('error', function(e) {
		   cb(e)
		});
	},
	youTubeSearch: function(params, cb) {
		youtube.feeds.videos(params, cb)
	},
	youTubeVideoInfo: function(params, cb) {
		youtube.video(params.videoId, cb)
	},
	/* params: adminId, page (1..N) */
	userVideosList: function(params, cb) {
		var q = {}
		if(params.userId) q.userId = params.userId
		if(params.adminId) q.adminId = params.adminId
		var page = params.page || 1
		var itemsPerPage = params.itemsPerPage || 6	
		UserVideos.listNewest(q, itemsPerPage*(page-1), itemsPerPage, cb)
	},
	favVideosList: function(params, cb) {
		var q = {}
		if(params.userId) q.userId = params.userId
		if(params.adminId) q.adminId = params.adminId		
		var page = params.page || 1
		var itemsPerPage = params.itemsPerPage || 6	
		FavVids.listNewest(q, itemsPerPage*(page-1), itemsPerPage, cb)
	},
	/* params: adminId, userId, videoId, title */
	userVideosAdd: function(params, cb) {
		UserVideos.add(params.adminId, params.userId, params.videoId, params.title, cb)
	},
	/* params: adminId, userId, videoId */
	userVideosRemove: function(params, cb) {
		UserVideos.remove(params.adminId, params.userId, params.videoId, cb)
	}

}
