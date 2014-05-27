module.exports = function(app, Auth) {
	var fs = require("fs-extra")
	var mustache = require('mustache')

	app.get('/admin', Auth.isAuthenticatedAsAdmin, function(req, res) {
      var view = fs.readFileSync("templates/admin.html", "utf8")
      var viewData = {}

      var viewHtml = mustache.to_html(view, viewData)
      var page = fs.readFileSync("templates/master.html", "utf8")
      var data = {query:req.query, content:viewHtml}
      var html = mustache.to_html(page, data); 
      res.send(html)
    })

}