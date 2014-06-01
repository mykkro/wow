module.exports = function(prefix, app, Auth) {

	var SearchQueryUtil = require("../src/searchqueryutil")
	var QueryBuilder = require("../../../lib/QueryBuilder")
	var API = require("../../../lib/api/API")
	var _ = require("lodash")

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
		var qb = new QueryBuilder()
		var limit = qq.itemsPerPage || 10
		var skip = ((qq.page || 1) - 1) * limit

		var conds = []
		// add type condition...
		if(qq.type) {
			if(qq.type.length==1) {
				conds.push(qb.eq('type', qq.type[0]))
			} else {
				var typeConds = _.map(qq.type, function(t) { return qb.eq('type', t)})
				conds.push(qb.or(typeConds))
			}
		}
		if(qq.query) {
			conds.push(qb.or([
				qb.regex('title', qq.query), 
				qb.regex('description', qq.query)
			]))
		}
		var qcond = {}
		if(conds.length==1) {
			qcond = conds[0]
		} else if(conds.length>1) {
			qcond = qb.and(conds)
		}

		// TODO:
		// -- tags
		// -- favorites
		// -- dates
		
		var qobj = qb.limit(limit).skip(skip).sort('title', true).cond(qcond).q()
		console.log(qobj)
		API.findNodes(qobj).done(function(data) {
			out(res, null, {items: data, query: qobj})
		})

	})
}
