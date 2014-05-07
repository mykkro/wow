var express = require('express');
var app = express();
 
// !! beware: bodyparser 
// As of express 3.4.0 (connect 2.9.0) bodyParser is deprecated
//
// All servers using express.bodyParser are vulnerable to an attack which creates an unlimited number of temp files on the server, potentially filling up all the disk space, which is likely to cause the server to hang.
// See: http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
// 
app.configure(function(){
   	app.use(express.json());
	app.use(express.urlencoded());   
	app.use(express.methodOverride());
    app.use(express.cookieParser());
});
 
var API = require("./EmployeeAPI")

app.get('/empl/:name', function(req, res) {
  	res.type('application/json');
  	var name = req.params.name;
 	var out = API.getEmployee(name)	
	res.json(out);
});

app.delete('/empl/:name', function(req, res) {
  	res.type('application/json');
  	var name = req.params.name;
 	var out = API.deleteEmployee(name)	
	res.json(out);
});

app.put('/empl/:name', function(req, res) {
	var data = req.body;
	var name = req.params.name;
	var out = API.createNamedEmployee(name, data)
	res.send(out);		
});	
 
app.post('/empl/new', function(req, res) {
	var data = req.body;
	var out = API.createEmployee(data)
	res.send(out);		
});	
 
app.listen(process.env.PORT || 9999);

// Test it:
// GET:    
// 	curl -X GET localhost:9999/empl/mykkrousz
// DELETE: 
// 	curl -X DELETE localhost:9999/empl/mykkrousz
// POST:   
// 	curl -X POST -d '{"hello": "world"}' -H "Content-Type: application/json" localhost:9999/empl/new
// PUT:    
// 	curl -X PUT -d '{"hello": "world"}' -H "Content-Type: application/json" localhost:9999/empl/mykkrousz
