module.exports = function(app, api, Auth) {
		
	app.get('/locale/:name', function(req, res) {
		var name = req.params.name
		res.send(name)		
	})

	app.get('/locale/:name/icon', function(req, res) {
		var name = req.params.name
		res.redirect('/assets/flags/'+name+'.svg')		
	})
}