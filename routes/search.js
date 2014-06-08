var _ = require("lodash")

module.exports = function(app, api, Auth) {

	function escapeRegExp(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}	

	/* parameter can be string or array of strings */
	// TODO handle LIKE queries and ignoring case
	var constructQuery = function(qs) {
		var query = {}
		if(typeof(qs) == "string") {
			qs = [ qs ]
		}
		var types = []
		_.each(qs, function(querystr) {
			var parts = querystr.split(":")
			if(parts.length==2) {
				var key = parts[0]
				var what = parts[1]
				// some fields are treated as numbers...
				if(key == "eid" || key=="_id" || key=="ownerAdminId") {
					what = parseInt(what)
				}
				if(key == "title" || key == "description") {
					what = { '$regex': escapeRegExp(what), "$options": "i" }
				}
				// we can have multiple types...
				if(key == "type") {
					types.push(what)					
				} else {
					query[key] = what
				}
			}
		})
		if(types.length) {
			if(types.length == 1) {
				query['type'] = types[0]
			} else {
				var $or = []
				_.each(types, function(t) {
					$or.push({type:t})
				})
				query['$or'] = $or
			}
		}
		return query
	}

	/* parameter can be string or array of strings */
	// TODO error handling
	var constructSort = function(ss) {
		var sort = {}
		if(typeof(ss) == "string") {
			ss = [ ss ]
		}
		_.each(ss, function(sortstr) {
			var parts = sortstr.split(":")
			if(parts.length==2) {
				var key = parts[0]
				var how = parts[1] == 'asc' ? 1 : -1
				sort[key] = how
			}
		})
		return sort
	}

	// very simple search API
	// example usage:

	// curl -X GET "http://localhost:9999/api/search?skip=3&limit=6&sort=title:asc&sort=created:desc&query=title:Pokus&query=type:article"
	// curl -X GET "http://localhost:9999/api/search?&limit=6&sort=title:asc&sort=created:desc&query=type:netRadio"

	// query has these parameters:
	//   query (multiple) -> key:value
	//   sort (multiple)  -> key:asc or key:desc
	// 	 limit
	//   skip
	app.get('/api/search', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var query = req.query
		var ownerAdminId = req.user.admin._id
		// TODO search also items owned by other admins or by admin...
		var qq = constructQuery(query.query)
		qq.ownerAdminId = ownerAdminId
		// assemble query object...
		var q = {
			limit: parseInt(query.limit || 10),
			skip: parseInt(query.skip || 0),
			query: qq,
			sort: constructSort(query.sort)
		}
		console.log("Searching:", q)
		// TODO handle fail condition
		api.findNodes(q).done(function(data) {
			out(res, null, data)
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