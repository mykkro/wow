module.exports = function(app, Auth) {
	var fs = require("fs-extra")
	var mustache = require('mustache')

	app.get('/admin', Auth.isAuthenticatedAsAdmin, function(req, res) {
    res.render('admin', { layout: 'master' })
  })

}