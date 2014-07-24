module.exports = function(prefix, app, Auth, API) {

	var SearchQueryUtil = require("./searchqueryutil")
	var QueryBuilder = require("../../../lib/QueryBuilder")
	var _ = require("lodash")
	var url = require("url")

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}

	/**
	 * Changes pathname of an url as well as adds type=TYPE to querystring
	 * @param  {string} myUrl    
	 * @param  {string} type   
	 * @param  {string} pathname
	 * @return {string} 
	 */
	var editUrl = function(myUrl, type, pathname) {
		var q = url.parse(myUrl, true)
		q.search = null
		q.query.type = type
		q.pathname = pathname
		return url.format(q)
	}

	var editAppUrl = function(myUrl, apptype, pathname) {
		var q = url.parse(myUrl, true)
		q.search = null
		q.query.type = 'app'
		q.query.apptype = apptype
		q.pathname = pathname
		return url.format(q)
	}

	var redirectToSearch = function(req, res, type) {
		var targetUrl = editUrl(req.url, type, prefix+'/index')
		res.redirect(targetUrl)
	}

	var redirectToAppSearch = function(req, res, apptype) {
		var targetUrl = editAppUrl(req.url, apptype, prefix+'/index')
		res.redirect(targetUrl)
	}

	app.get(prefix+"/images", function(req, res) {
		redirectToSearch(req, res, "image")
	})

	app.get(prefix+"/apps", function(req, res) {
		redirectToSearch(req, res, "app")
	})

	app.get(prefix+"/books", function(req, res) {
		redirectToAppSearch(req, res, "wow/scrapbook")
	})

	app.get(prefix+"/games", function(req, res) {
		redirectToAppSearch(req, res, "wow/game|wow/app/game|wow/app/rulegame")
	})

	app.get(prefix+"/videos", function(req, res) {
		redirectToSearch(req, res, "video")
	})

	app.get(prefix+"/voices", function(req, res) {
		redirectToSearch(req, res, "voice")
	})

	app.get(prefix+"/youtubevideos", function(req, res) {
		redirectToSearch(req, res, "youTubeVideo")
	})

	app.get(prefix+"/shortcuts", function(req, res) {
		redirectToSearch(req, res, "shortcut")
	})

	// common functionality for all API calls
	// returned data are in JSON
	app.use(prefix+"/api", function(req, res, next) {
		res.type('application/json');
		next()
	})

	function doSearch(req, res, qq, skip, limit, entityIDs) {
		var conds = []
		var qb = new QueryBuilder()
		// add type condition...
		console.log("doSearch", qq)
		if(qq.type) {
			if(qq.type.length==1) {
				conds.push(qb.eq('type', qq.type[0]))
			} else {
				var typeConds = _.map(qq.type, function(t) { return qb.eq('type', t)})
				conds.push(qb.or(typeConds))
			}
		}
		/* app specific stuff */
		if(qq.apptype) {
			if(qq.apptype.length==1) {
				conds.push(qb.eq('apptype', qq.apptype[0]))
			} else {
				var typeConds = _.map(qq.apptype, function(t) { return qb.eq('apptype', t)})
				conds.push(qb.or(typeConds))
			}
		}
		if(qq.query) {
			conds.push(qb.or([
				qb.regex('title', qq.query), 
				qb.regex('description', qq.query)
			]))
		}
		if(entityIDs) {
			console.log("Search only in these entity IDs:", entityIDs)
			conds.push(qb.inArray("_id", entityIDs))
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
		API.findNodes(qobj).then(
			function(data) {
				out(res, null, {
					totalItems: skip+data.length+1, // set this so it looks like there is yet another next item in collection after these results...
					startIndex: skip+1,
					itemsPerPage: limit,
					items: data, 
					query: qobj
				})
			},
			function(err) {
				// something bad happened...
				out(res, err)
			}
		)
	}

	// define additional routes here...
	app.get(prefix+"/api/search", Auth.isAuthenticatedAsUser, function(req, res) {
		// get all search data from querystring...
		var qq = SearchQueryUtil.getDataFromQueryObj(req.query)
		// add user ID to filter results relevant to this user...
		qq.userId = req.user.user._id
		// search it!
		var limit = qq.itemsPerPage || 6
		var skip = ((qq.page || 1) - 1) * limit

		if(qq.favorite) {
			// get list of user's favorite IDs
			var fapi = API.favorite
			fapi.getUserFavoriteIDs(qq.userId, null, function(err, favIDs) {
				if(err) {
					out(res, err)
				} else {
					// search within favorites
					doSearch(req, res, qq, skip, limit, favIDs)
				}
			})			
		} else if(qq.personal) {
			// get list of user's favorite IDs
			var fapi = API.favorite
			fapi.getUserEntityIDs(qq.userId, null, function(err, favIDs) {
				if(err) {
					out(res, err)
				} else {
					// search within favorites
					doSearch(req, res, qq, skip, limit, favIDs)
				}
			})			
		} else {
			doSearch(req, res, qq, skip, limit, null)	
		}
		
	})
}
