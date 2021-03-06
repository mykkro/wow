module.exports = function(app, api, passport) {
	var UserAPI = api.user
	var _ = require("lodash")

    //
    // Fills out password if left blank (necessary for passwordless accounts).
    //
    var passwordFillerMiddleware = function(req, res, next) {
        if(!req.body.password) req.body.password = 'x'
        next();
    }

    app.get("/userlogin", function(req, res) {
      var locale = req.query.lang || 'en'
      UserAPI.find({}, function(err, users) {
        if(err) {
           res.status(500);
           res.send(err.message);
        } else {
          _.each(users, function(u) {
            u.avatarUri = UserAPI.getThumbnailUri(u) || UserAPI.getTypeThumbnailUri()
          })     
          var status = req.flash('loginstatus')
          status = status ? status[0] : null
          console.log("Login status:", status)
          res.render('userlogin', {users: users, locale:locale, loginstatus:status})
        }
      })
    })

    app.get('/login', function(req, res) {
      res.redirect('/userlogin')
    });

    app.post('/login',
      passwordFillerMiddleware,
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/loginFailure'
      })
    );
     
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
    });

    app.get('/loginFailure', function(req, res, next) {
      req.flash('loginstatus', 'Failed to authenticate')
      res.redirect("/userlogin")
    });
   
}