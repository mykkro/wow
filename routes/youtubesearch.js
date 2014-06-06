var _ = require("lodash")

module.exports = function(app, api) {

	var YouTubeUtil = require("../lib/YouTubeUtil")


	// very simple youtube search API
	// test it:
	// curl -X GET "http://localhost:9999/api/ytsearch?query=mtg&pageSize=6&order=title&pageToken=CAUQAA"

	// query has these parameters:
	//   query -> string
	//   order
	// 	 pageSize
	//   pageToken
	app.get('/api/ytsearch', function(req, res) {
		var q = req.query
		// assemble query object...
		console.log("Searching YouTube video:", q)
		// TODO handle fail condition
		YouTubeUtil.search(q, function(err, data) {
			out(res, err, data)
		})

	})

	// test it:
	// curl -X GET http://localhost:9999/api/ytinfo/K4P96rZseF4
	app.get('/api/ytinfo/:id', function(req, res) {
		var id = req.params.id
		// assemble query object...
		console.log("Fetching YouTube video info:", id)
		// TODO handle fail condition
		YouTubeUtil.info(id, function(err, data) {
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