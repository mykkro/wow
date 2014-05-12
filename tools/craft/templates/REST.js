/* File autogenerated by craft {{datetime}} */

module.exports = function(app, api) {


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

{{#daos}}
	// generated REST wrappers for entity '{{name}}'

	// api.{{name}}.find
	app.get('/api/{{name}}/search', function(req, res) {
	 	api.{{name}}.find(req.query, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	// api.{{name}}.count
	app.get('/api/{{name}}/count', function(req, res) {
	 	api.{{name}}.count(req.query, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	// api.{{name}}.get
	app.get('/api/{{name}}/:id', function(req, res) {
	 	api.{{name}}.get(req.params.id, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	// api.{{name}}.delete
	app.delete('/api/{{name}}/:id', function(req, res) {
	 	api.{{name}}.delete(req.params.id, function(err, rr) {
	    	out(res, err, rr)
	  	})	
	});

	// api.{{name}}.update
	app.put('/api/{{name}}/:id', function(req, res) {
		//api.{{name}}.update(req.params.id, req.body, function(err, rr) {
		api.{{name}}.set(req.params.id, req.body, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	
	 
	// api.{{name}}.create
	app.post('/api/{{name}}/new', function(req, res) {
		api.{{name}}.create(req.body, function(err, rr) {
	    	out(res, err, rr)
	  	})
	});	

	app.get('/thumbs/{{name}}',function(req,res) {
		res.writeHead(302, {location: "{{{thumbnail}}}" });
		res.end();
	});

	app.get('/{{name}}/:id/thumb',function(req,res) {
		var id = req.params.id
		console.log("Thumbnail: "+id)
		// default thumbnail:
		res.writeHead(302, {location: "/thumbs/{{name}}" });
		res.end();
	});

	app.get('/{{name}}/:id/view',function(req,res) {
		// return default view...		
		renderView("{{name}}", req, res)
	});

{{/daos}}
}