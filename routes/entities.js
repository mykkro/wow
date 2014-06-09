/* File autogenerated by craft  */

var _ = require("lodash")
var fs = require("fs-extra")
var merge = require("merge")

module.exports = function(app, api, Auth) {


	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}

	var renderView = function(name, req, res) {
		api[name].get(req.params.id, function(err, rr) {
	    	if(!err) {
	    		if(!rr) {
	    			res.status(404)
	    			res.end('not found')
	    			return
	    		}
				var tpl = api[name].renderView(rr)
				res.render('nodeview', { 
					layout: 'master', 
					view: tpl, 
					title: rr.title,
					created: rr.created,
					tags: rr.tags,
					description: rr.description,
					typeThumbnailUrl: api[name].getTypeThumbnailUri(),
					typeTitle: api[name].metadata.title,
					thumbnailUrl: api[name].getThumbnailUri(rr) || api[name].getTypeThumbnailUri()
				 })
    			// res.send(tpl)
    		} else {
    			console.error(err)
    			res.status(500);
    			res.end('error')
    		}
	  	})	
	}		

	var renderPreview = function(name, req, res) {
		api[name].get(req.params.id, function(err, rr) {
	    	if(!err) {
	    		if(!rr) {
	    			res.status(404)
	    			res.end('not found')
	    			return
	    		}
	    		var opts = null
	    		if(req.query.view) {
	    			opts = { previewType: req.query.view }
	    		}
				var tpl = api[name].renderPreview(rr, opts)
    			res.send(tpl)
    		} else {
    			console.error(err)
    			res.status(500);
    			res.end('error')
    		}
	  	})	
	}		
	
	// common functionality for all API calls
	// returned data are in JSON
	app.use("/api", function(req, res, next) {
		res.type('application/json');
		next()
	})
	
	// get entity schema, default vals object and other useful stuff
	app.get('/api/:type/metainfo', function(req, res) {
		var metainfo = api[req.params.type].getMetaInfo()
	    out(res, null, metainfo)
	})

	app.get('/api/:type/search', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var ownerAdminId = req.user.admin._id		
		var type = req.params.type
		var query = req.query
		var q = {
			limit: parseInt(query.limit || 10),
			skip: parseInt(query.skip || 0),
			sort: { 'title': 'asc' },
			query: { ownerAdminId: ownerAdminId }
		}
	 	console.log("Finding items: "+type)
	 	api[type].findWithOptions(q, function(err, rr) {
	    	out(res, err, rr)
	  	})		  	
	});

	app.get('/api/:type/count', function(req, res) {
		var type = req.params.type
	 	api[type].count(req.query, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	app.get('/api/:type/personal', Auth.isAuthenticatedAsUser, function(req, res) {
		var type = req.params.type
		var query = req.query
		var userId = parseInt(req.user.user._id)
		var q = {
			limit: parseInt(query.limit || 10),
			skip: parseInt(query.skip || 0),
			sort: { 'title': 'asc' },
			query: { type: type, userId: userId }
		}
	 	console.log("Finding personal items: "+type)
	 	api.favorite.findWithOptions(q, function(err, rr) {
	 		var ids = _.map(rr, function(r) {return r.eid})
	 		api[type].getMultip(ids).done(function(items) {
	 			out(res, null, items)	
	 		})
	  	})		  	
	});

	app.get('/api/:type/favorite', Auth.isAuthenticatedAsUser, function(req, res) {
		var type = req.params.type
		var query = req.query
		var userId = parseInt(req.user.user._id)
		var q = {
			limit: parseInt(query.limit || 10),
			skip: parseInt(query.skip || 0),
			sort: { 'title': 'asc' },
			query: { type: type, userId: userId, favorite: true }
		}
	 	console.log("Finding favorite items: "+type)
	 	api.favorite.findWithOptions(q, function(err, rr) {
	 		var ids = _.map(rr, function(r) {return r.eid})
	 		api[type].getMultip(ids).done(function(items) {
	 			out(res, null, items)	
	 		})
	 	})
	});

	// TODO specific routes for image, video, voice
	app.get('/api/:type/:id', function(req, res) {
		var type = req.params.type
	 	api[type].get(req.params.id, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	app.delete('/api/:type/:id', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var type = req.params.type
	 	api[type].delete(req.params.id, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	app.put('/api/:type/:id', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var type = req.params.type
		var ownerAdminId = parseInt(req.user.admin._id)
		// TODO check if the resource is mine...
		// TODO make this as middleware
		var data = req.body
		api[type].set(req.params.id, data, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	
	 
	app.post('/api/:type/new', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var type = req.params.type
		var data = merge({}, req.body)
		data.ownerAdminId = parseInt(req.user.admin._id)
		api[type].create(data, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	

	app.get('/thumbs/:type',function(req,res) {
		var type = req.params.type
		res.writeHead(302, {location: "/assets/thumbs/"+type+".png" });
		res.end();
	});

	// generated REST wrappers for entity 'admin'

	app.get('/admin/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/admin" });
		res.end();
	});

	app.get('/admin/:id/view',function(req,res) {
		// return default view...		
		renderView("admin", req, res)
	});

	app.get('/admin/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("admin", req, res)
	});

	// generated REST wrappers for entity 'app'

	app.get('/app/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/app" });
		res.end();
	});

	app.get('/app/:id/view',function(req,res) {
		// return default view...		
		renderView("app", req, res)
	});

	app.get('/app/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("app", req, res)
	});

	// generated REST wrappers for entity 'article'

	app.get('/article/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/article" });
		res.end();
	});

	app.get('/article/:id/view',function(req,res) {
		// return default view...		
		renderView("article", req, res)
	});

	app.get('/article/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("article", req, res)
	});

	// generated REST wrappers for entity 'image'

	app.get('/image/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/image" });
		res.end();
	});

	app.get('/image/:id/view',function(req,res) {
		// return default view...		
		renderView("image", req, res)
	});

	app.get('/image/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("image", req, res)
	});

	// generated REST wrappers for entity 'video'

	app.get('/video/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/video" });
		res.end();
	});

	app.get('/video/:id/view',function(req,res) {
		// return default view...		
		renderView("video", req, res)
	});

	app.get('/video/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("video", req, res)
	});

	// generated REST wrappers for entity 'voice'

	app.get('/voice/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/voice" });
		res.end();
	});

	app.get('/voice/:id/view',function(req,res) {
		// return default view...		
		renderView("voice", req, res)
	});

	app.get('/voice/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("voice", req, res)
	});

	// generated REST wrappers for entity 'json'

	app.get('/json/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/json" });
		res.end();
	});

	app.get('/json/:id/view',function(req,res) {
		// return default view...		
		renderView("json", req, res)
	});

	app.get('/json/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("json", req, res)
	});

	// generated REST wrappers for entity 'netRadio'

	app.get('/netRadio/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/netRadio" });
		res.end();
	});

	app.get('/netRadio/:id/view',function(req,res) {
		// return default view...		
		renderView("netRadio", req, res)
	});

	app.get('/netRadio/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("netRadio", req, res)
	});

	// generated REST wrappers for entity 'user'

	app.get('/user/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/user" });
		res.end();
	});

	app.get('/user/:id/view',function(req,res) {
		// return default view...		
		renderView("user", req, res)
	});

	app.get('/user/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("user", req, res)
	});

	// generated REST wrappers for entity 'usergroup'

	app.get('/usergroup/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/usergroup" });
		res.end();
	});

	app.get('/usergroup/:id/view',function(req,res) {
		// return default view...		
		renderView("usergroup", req, res)
	});

	app.get('/usergroup/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("usergroup", req, res)
	});

	// generated REST wrappers for entity 'album'

	app.get('/album/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/album" });
		res.end();
	});

	app.get('/album/:id/view',function(req,res) {
		// return default view...		
		renderView("album", req, res)
	});

	app.get('/album/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("album", req, res)
	});

	// generated REST wrappers for entity 'scrapbook'

	app.get('/scrapbook/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/scrapbook" });
		res.end();
	});

	app.get('/scrapbook/:id/view',function(req,res) {
		// return default view...		
		renderView("scrapbook", req, res)
	});

	app.get('/scrapbook/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("scrapbook", req, res)
	});

	// generated REST wrappers for entity 'youTubeVideo'

	app.get('/youTubeVideo/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/youTubeVideo" });
		res.end();
	});

	app.get('/youTubeVideo/:id/view',function(req,res) {
		// return default view...		
		renderView("youTubeVideo", req, res)
	});

	app.get('/youTubeVideo/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("youTubeVideo", req, res)
	});

	// generated REST wrappers for entity 'preset'

	app.get('/preset/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/preset" });
		res.end();
	});

	app.get('/preset/:id/view',function(req,res) {
		// return default view...		
		renderView("preset", req, res)
	});

	app.get('/preset/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("preset", req, res)
	});

	// generated REST wrappers for entity 'location'

	app.get('/location/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/location" });
		res.end();
	});

	app.get('/location/:id/view',function(req,res) {
		// return default view...		
		renderView("location", req, res)
	});

	app.get('/location/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("location", req, res)
	});

	// generated REST wrappers for entity 'theme'

	app.get('/theme/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/theme" });
		res.end();
	});

	app.get('/theme/:id/view',function(req,res) {
		// return default view...		
		renderView("theme", req, res)
	});

	app.get('/theme/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("theme", req, res)
	});

	// generated REST wrappers for entity 'shortcut'

	app.get('/shortcut/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/shortcut" });
		res.end();
	});

	app.get('/shortcut/:id/view',function(req,res) {
		// return default view...		
		renderView("shortcut", req, res)
	});

	app.get('/shortcut/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("shortcut", req, res)
	});

	// generated REST wrappers for entity 'file'

	app.get('/file/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/file" });
		res.end();
	});

	app.get('/file/:id/view',function(req,res) {
		// return default view...		
		renderView("file", req, res)
	});

	app.get('/file/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("file", req, res)
	});

	// generated REST wrappers for entity 'entity'

	app.get('/entity/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/entity" });
		res.end();
	});

	app.get('/entity/:id/view',function(req,res) {
		// return default view...		
		renderView("entity", req, res)
	});

	app.get('/entity/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("entity", req, res)
	});

	// generated REST wrappers for entity 'albumNode'

	app.get('/albumNode/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/albumNode" });
		res.end();
	});

	app.get('/albumNode/:id/view',function(req,res) {
		// return default view...		
		renderView("albumNode", req, res)
	});

	app.get('/albumNode/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("albumNode", req, res)
	});

	// generated REST wrappers for entity 'userFavNode'

	app.get('/userFavNode/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/userFavNode" });
		res.end();
	});

	app.get('/userFavNode/:id/view',function(req,res) {
		// return default view...		
		renderView("userFavNode", req, res)
	});

	app.get('/userFavNode/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("userFavNode", req, res)
	});

	// generated REST wrappers for entity 'usergroupUser'

	app.get('/usergroupUser/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/usergroupUser" });
		res.end();
	});

	app.get('/usergroupUser/:id/view',function(req,res) {
		// return default view...		
		renderView("usergroupUser", req, res)
	});

	app.get('/usergroupUser/:id/preview',function(req,res) {
		// return default view...		
		renderPreview("usergroupUser", req, res)
	});


}