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
        process.nextTick(function () {
          console.log("middleware/auth: authenticating user "+username)
          // do we have an admin with this username?
          AdminAPI.findOne({ username : username }, function(err, admin) {
              if(err) { return done(err); }
              if(!admin) {
                // try to log in as user...
                UserAPI.getByUsername(username, function(err, user) {
                    if(err) { return done(err); }
                    if(!user){
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    // password entered incorrectly, or password was given when none was needed
                    ////console.log("User:",username,user,password)
                    if ((user.usesPassword && !bcrypt.compareSync(password, user.password)) /*|| (!user.usesPassword && password)*/) {
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
        });
    }));

    // this works!
    // application still hangs up, but quite a bit later
    passport.serializeUser(function(user, done) {
      done(null, user);
    });


    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

/*
    passport.serializeUser(function(user, done) {
      console.log("middleware/auth: serializing user...")
        if(user.admin) {
          done(null, "admin#"+user.admin._id);
        } else {
          done(null, "user#"+user.user._id);
        }
    });


    passport.deserializeUser(function(key, done) {
      //console.log("middleware/auth: deserializing user "+key)
      // tried this to avert hangup after several authenticated requests
      // but doesn't help
      // when the issue occurs, the .get method seems to never return
      ////process.nextTick(function () {
        if(key.indexOf("admin#") === 0) {
          // deserialize as admin...
          var id = parseInt(key.substr(6))
          console.log("middleware/auth: deserializing admin "+id)
          AdminAPI.get(id, function(err,admin) {
            //console.log("middleware/auth: got admin")
            done(err, err ? null : {admin:admin});
          })      
        } else {
          // deserialize as user...
          var id = parseInt(key.substr(5))
          console.log("middleware/auth: deserializing user "+id)
          UserAPI.get(id, function(err,user) {
            //console.log("middleware/auth: got user")
            done(err, err ? null : {user:user});
          })      
        }
      ////});     
    });
*/
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