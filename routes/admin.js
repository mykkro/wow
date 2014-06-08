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
			profileUri: '/admin/'+admin._id+'/view',
			editableNodes: JSON.stringify(nodes)
		})
	})

}