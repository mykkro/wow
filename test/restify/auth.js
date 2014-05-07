var express = require('express');
var flash = require('connect-flash');
var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var users = [
    { id: 1, username: 'myrousz', password: 'pass', email: 'bob@example.com' }
  , { id: 2, username: 'john', password: 'doe', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// API functions...
var API = require("./EmployeeAPI")

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger());
    app.use(express.json());
    app.use(express.urlencoded());   
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);    

    /* shorthand more RESTful api */
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
     
    /* Passport auth */
    app.get('/', function(req, res){
      console.log(req)
      res.render('index', { user: req.user });
    });

    app.get('/flash', function(req, res){
      req.flash('info', 'Flash is back!')
      res.redirect('/');
    });

    app.get('/account', ensureAuthenticated, function(req, res){
      res.render('account', { user: req.user });
    });

    app.get('/login', function(req, res){
      res.render('login', { user: req.user, message: "Hello!"});
    });


    app.post('/login',
      passport.authenticate('local', { successRedirect: '/',
                                       failureRedirect: '/login',
                                       failureFlash: true })
    );

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });    

});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(process.env.PORT || 9999);

// Test it:
// GET:    
// 	curl -X GET localhost:9999/empl/mykkrousz
// DELETE: 
// 	curl -X DELETE localhost:9999/empl/mykkrousz
// POST:   
// 	curl -d '{"hello": "world"}' -H "Content-Type: application/json" localhost:9999/empl/new
// PUT:    
// 	 curl -X PUT -d '{"hello": "world"}' -H "Content-Type: application/json" localhost:9999/empl/mykkrousz
