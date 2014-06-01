module.exports = function(prefix, app, Auth) {

	var SearchQueryUtil = require("../src/searchqueryutil")

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}

	// common functionality for all API calls
	// returned data are in JSON
	app.use(prefix+"/api", function(req, res, next) {
		res.type('application/json');
		next()
	})

	// define additional routes here...
	app.get(prefix+"/api/search", Auth.isAuthenticatedAsUser, function(req, res) {
		// get all search data from querystring...
		var qq = SearchQueryUtil.getDataFromQueryObj(req.query)
		// add user ID to filter results relevant to this user...
		qq.userId = req.user.user._id
		// search it!
		console.log("Searching items based on query: ",qq)
		out(res, null, req.query)
	})
}
