var express = require('express');
var app = express();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret = 'keyboard cat'

app.use(express.json());
app.use(express.urlencoded());
app.configure(function(){
   	app.use(express.json());
	app.use(express.urlencoded());   
	app.use(express.methodOverride());
    app.use(express.cookieParser());
	// We are going to protect /api routes with JWT
	app.use('/api', expressJwt({secret: secret}));
});
 
var API = require("./EmployeeAPI")

app.get('/api/empl/:name', function(req, res) {
  	res.type('application/json');
  /**/console.log(req.params, req.query, req.body)
  	var name = req.params.name;
 	var out = API.getEmployee(name)	
	res.json(out);
});

app.delete('/api/empl/:name', function(req, res) {
  	res.type('application/json');
  /**/console.log(req.params, req.query, req.body)
  	var name = req.params.name;
 	var out = API.deleteEmployee(name)	
	res.json(out);
});

app.put('/api/empl/:name', function(req, res) {
  /**/console.log(req.params, req.query, req.body)
	var data = req.body;
	var name = req.params.name;
	var out = API.createNamedEmployee(name, data)
	res.send(out);		
});	
 
app.post('/api/empl/new', function(req, res) {
  /**/console.log(req.params, req.query, req.body)
	console.log('user ' + req.user.email + ' is calling /api/restricted');
	var data = req.body;
	var out = API.createEmployee(data)
	res.send(out);		
});	

// See: https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/

/*
 * Test it: 
 * 	curl -X POST -d 'username=john.doe&password=foobar' localhost:9999/authenticate
 * Response: access token
 * 	{ "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obkBkb2UuY29tIiwiaWQiOjEyMywiaWF0IjoxMzk5MTIwMjI5LCJleHAiOjEzOTkxMzgyMjl9.yhxp4_SOmY_Zxi37odcgJkbaLceAAqWyCwZQu5bbsks" }
 * Test restricted API:
 * 	curl -X PUT -d '{"hello": "world"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obkBkb2UuY29tIiwiaWQiOjEyMywiaWF0IjoxMzk5MTIwMjI5LCJleHAiOjEzOTkxMzgyMjl9.yhxp4_SOmY_Zxi37odcgJkbaLceAAqWyCwZQu5bbsks" localhost:9999/api/empl/mykkrousz
 */
app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
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
