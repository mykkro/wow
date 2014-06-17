var _ = require("lodash")
var merge = require("merge")

module.exports = function(app, api, Auth) {

	app.get('/api/settings/:appUUID', Auth.isAuthenticatedAsUser, function(req, res) {
		var userId = req.user.user._id
		var appUUID = req.params.appUUID
		console.log("Retrieving app config:", userId, appUUID)
		api.userAppSettings.pull(userId, appUUID, function(err, data) {
			out(res, err, data)
		})
	})

	app.post('/api/settings/:appUUID', Auth.isAuthenticatedAsUser, function(req, res) {
		var userId = req.user.user._id
		var appUUID = req.params.appUUID
		var settings = merge({}, req.body)
		api.userAppSettings.put(userId, appUUID, settings, function(err, data) {
			out(res, err, data)
		})
	})

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}    

	var sendError = function(res, msg, details) {
	    res.send({
	      error: msg,
	      details: details
	    })
	}

}