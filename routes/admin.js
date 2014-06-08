module.exports = function(app, api, Auth) {
	var fs = require("fs-extra")
	var mustache = require('mustache')
	var _ = require("lodash")

	var nodes = [ "image", "article", "user", "app", "location", "netRadio", "preset", "scrapbook", "shortcut", "theme", "video", "voice", "youTubeVideo" ]
	nodes = _.map(nodes, function(name) {
		return {
			"name": name,
			"title": api[name].metadata.title,
			"thumbnailUri": api[name].getTypeThumbnailUri(),
			"matainfoUri": "/api/"+name+"/metainfo"
		}
	})
		
	app.get('/admin', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var admin = req.user.admin
		res.render('admin', { 
			layout: 'master', 
			profileTitle: admin.title, 
			profileUri: '/admin/admin/'+admin._id+'/view',
			editableNodes: JSON.stringify(nodes),
			mode: "list"
		})
	})

	var renderNodePage = function(req, res, mode) {
		var admin = req.user.admin
		var type = req.params.type
		var id = parseInt(req.params.id)

		api[type].get(id, function(err, rr) {
	    	if(!err) {
	    		if(!rr) {
	    			res.status(404)
	    			res.end('not found')
	    			return
	    		}
				var tpl = api[type].renderView(rr)
				res.render('admin', { 
					layout: 'master', 
					profileTitle: admin.title, 
					profileUri: '/admin/admin/'+admin._id+'/view',
					editableNodes: JSON.stringify(nodes),
					mode: mode,
					nodeType: type,
					nodeId: parseInt(req.params.id),
					nodeView: tpl,
					node: JSON.stringify(rr),
					title: rr.title,
					created: rr.created,
					tags: rr.tags,
					description: rr.description,
					typeThumbnailUrl: api[type].getTypeThumbnailUri(),
					typeTitle: api[type].metadata.title,
					thumbnailUrl: api[type].getThumbnailUri(rr) || api[type].getTypeThumbnailUri()
				})
    		} else {
    			console.error(err)
    			res.status(500);
    			res.end('error')
    		}
	  	})	
	}

	app.get('/admin/:type/:id/view', Auth.isAuthenticatedAsAdmin, function(req, res) {
		renderNodePage(req, res, "view")
	})

	app.get('/admin/:type/:id/edit', Auth.isAuthenticatedAsAdmin, function(req, res) {
		renderNodePage(req, res, "edit")
	})

}