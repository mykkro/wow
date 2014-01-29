var FavVids = require("../../lib/dao/favoritevideos")

module.exports = {

    '/api/video/isstarred/:userId/:videoId': function(req, res) {
    	var userId = req.params.userId
    	var videoId = req.params.videoId
		FavVids.starred(userId, videoId, function(err, starred) {
			if(err) {
				res.json({error:err})
			} else {
				res.json({starred:starred})
			}
		})
    },
    // TODO this does not seem to work - empty reply from server...
    // maybe params must be in POSTDATA?
    '/api/video/star/:userId/:videoId': {
     	methods: ['post'],
        middleware: [],
        fn: function(req, res){
	    	var userId = req.params.userId
	    	var videoId = req.params.videoId
			FavVids.star(userId, videoId, function(err, resp) {
				if(err) {
					res.json({error:err})
				} else {
					res.json({data:resp})
				}
			})
        }
     },
    '/api/video/unstar/:userId/:videoId': {
     	methods: ['post'],
        middleware: [],
        fn: function(req, res){
	    	var userId = req.params.userId
	    	var videoId = req.params.videoId
			FavVids.unstar(userId, videoId, function(err, resp) {
				if(err) {
					res.json({error:err})
				} else {
					res.json({data:resp})
				}
			})
        }
     }

};