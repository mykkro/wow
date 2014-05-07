var express = require('express');
var app = express();
 
// !! beware: bodyparser 
// As of express 3.4.0 (connect 2.9.0) bodyParser is deprecated
//
// All servers using express.bodyParser are vulnerable to an attack which creates an unlimited number of temp files on the server, potentially filling up all the disk space, which is likely to cause the server to hang.
// See: http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
// 
app.configure(function(){
    app.use(express.bodyParser());    
});
 
app.get('/employee/getEmployee/:name', function(req, res) {
  res.type('application/json');
  var name = req.params.name;
  console.log("Parameter: " + name);
 
	employee = new Object();
	employee.name = name;
	employee.age = 25;
	employee.deparment = "HR";
	employee.wage = 15000.00;	
	
	address = new Object();
	address.city = "Massachusetts";
	address.state = "Springfield";
	address.street = "Evergreen";
	address.zip = 66450;
	
	employee.address = address;
	
	res.json(employee);
});
 
app.post('/employee/postEmployee', function(req, res) {
	var employee = req.body;
	console.log("Got request: " + JSON.stringify(employee));
	res.send(employee);		
});	
 
app.listen(process.env.PORT || 9999);

// Test it:
// curl -X GET localhost:9999/employee/getEmployee/mykkro
// curl -X POST -d 'num=123&message=hello' localhost:9999/employee/postEmployee

