var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs")

var Auth = {
  setup: function(passport, UsersAPI) {
    passport.use(new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },  
      function(username, password, done) {
        UsersAPI.findOne({ username : username }, function(err, user) {
            if(err) { return done(err); }
            if(!user){
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.usesPassword && !bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);        
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {
        UsersAPI.get(id, function(err,user) {
          if(err) done(err);
          done(null,user);
        })
    });
  },
  isAuthenticated: function (req, res, next) {
      console.log("Auth: isAuthenticated: "+req.isAuthenticated())
      if(req.isAuthenticated()){
          next();
      }else{
          res.redirect("/login");
      }
  },
  userExist: function(req, res, next) {
      //User.count({
        //  email: req.body.email
      //}, function (err, count) {
        //  if (count === 0) {
              next();
          //} else {
            //  res.redirect("/signup");
          //}
      //});
  }
}

module.exports = Auth