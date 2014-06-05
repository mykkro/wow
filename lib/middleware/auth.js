var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs")

var Auth = {
  setup: function(passport, UserAPI, AdminAPI) {
    passport.use(new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },  
      function(username, password, done) {
        console.log("middleware/auth: authenticating user "+username)
        // do we have an admin with this username?
        AdminAPI.findOne({ username : username }, function(err, admin) {
            if(err) { return done(err); }
            if(!admin) {
              // try to log in as user...
              UserAPI.findOne({ username : username }, function(err, user) {
                  if(err) { return done(err); }
                  if(!user){
                      return done(null, false, { message: 'Incorrect username.' });
                  }
                  if (user.usesPassword && !bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                  }
                  return done(null, { user: user});        
              });
            } else if (!bcrypt.compareSync(password, admin.password)) {
              return done(null, false, { message: 'Incorrect password.' });
            } else {
              return done(null, { admin: admin} );        
            }
        });
    }));

    passport.serializeUser(function(user, done) {
      console.log("middleware/auth: serializing user...")
        if(user.admin) {
          done(null, "admin#"+user.admin._id);
        } else {
          done(null, "user#"+user.user._id);
        }
    });


    passport.deserializeUser(function(key, done) {
      console.log("middleware/auth: deserializing user "+key)
      if(key.indexOf("admin#") === 0) {
        // deserialize as admin...
        var id = parseInt(key.substr(6))
        AdminAPI.get(id, function(err,admin) {
          if(err) done(err);
          done(null,{admin:admin});
        })      
      } else {
        // deserialize as user...
        var id = parseInt(key.substr(5))
        UserAPI.get(id, function(err,user) {
          if(err) done(err);
          done(null,{user:user});
        })      
      }     
    });
  },
  isAuthenticated: function (req, res, next) {
      console.log("middleware/auth: isAuthenticated", req.url)
      if(req.isAuthenticated()){
          next();
      } else {
          res.redirect("/login");
      }
  },
  isAuthenticatedAsUser: function (req, res, next) {
      console.log("middleware/auth: isAuthenticatedAsUser", req.url)
      if(req.isAuthenticated() && req.user.user){
          next();
      } else {
          res.redirect("/login");
      }
  },
  isAuthenticatedAsAdmin: function (req, res, next) {
      console.log("middleware/auth: isAuthenticatedAsAdmin", req.url)
      if(req.isAuthenticated() && req.user.admin){
          next();
      } else {
          res.redirect("/login");
      }
  }
}

module.exports = Auth