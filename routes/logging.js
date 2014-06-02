module.exports = function(app, api, Auth) {

	var moment = require("moment")

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}
	
	//
	// log API
	//
	
	// Send log data. 
	// test with:
	// 
	// curl -H "Content-Type: application/json" -d'{"type":"user.login","withPassword":false}' http://localhost:9999/api/log
	// 
	app.post('/api/log', Auth.isAuthenticated, function(req, res) {
		var data = req.body
		// add timestamp
		var now = moment()
		data.timestamp = data.timestamp || now.unix()
		// add user ID
		if(req.user.admin) {
			data.adminId = req.user.admin._id
		} else if(req.user.user) {
			data.userId = req.user.user._id
		}
		console.log("Inserting log data: ",data)
		// TODO log validation based on spec.
		api.log.create(data, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	


}