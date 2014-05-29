module.exports = function(app, Auth) {
	var fs = require("fs-extra")
	var mustache = require('mustache')

	app.get('/admin', Auth.isAuthenticatedAsAdmin, function(req, res) {
    var admin = req.user.admin
    res.render('admin', { layout: 'master', profileTitle: admin.title, profileUri: '/admin/'+admin._id+'/view' })
  })

}