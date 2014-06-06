module.exports = function(prefix, app, Auth, API) {

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}

	// define additional routes here...
	app.get(prefix+"/api", function(req, res) {
		res.send("Hello, world!")
	}),

	app.post(prefix+"/star/:ytId", Auth.isAuthenticatedAsUser, function(req, res) {
		var ytId = req.params.ytId
		var userId = parseInt(req.user.user._id)
		API.favoriteYouTube.starById(userId, ytId, function(err, rr) {
	    	out(res, err, true)
	  	})
	});	

	app.post(prefix+"/unstar/:ytId", Auth.isAuthenticatedAsUser, function(req, res) {
		var ytId = req.params.ytId
		var userId = parseInt(req.user.user._id)
		API.favoriteYouTube.unstarById(userId, ytId, function(err, rr) {
	    	out(res, err, false)
	  	})
	});	

	app.get(prefix+"/starred/:ytId", Auth.isAuthenticatedAsUser, function(req, res) {
		var ytId = req.params.ytId
		var userId = parseInt(req.user.user._id)
		API.favoriteYouTube.starredById(userId, ytId, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	

}
