var tungus = require('tungus');
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

/* test of timestamps */
/* from: https://github.com/drudge/mongoose-timestamp */
mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  var UserSchema = new Schema({
      username: String
  });
  UserSchema.plugin(timestamps);
  var User = mongoose.model('User', UserSchema)

  var user = new User({username: 'Prince'});
  user.save(function (err) {
    console.log(user.createdAt); // Should be approximately now
    console.log(user.createdAt === user.updatedAt); // true
    // Wait 1 second and then update the user
    setTimeout( function () {
      user.username = 'Symbol';
      user.save( function (err) {
        console.log(user.updatedAt); // Should be approximately createdAt + 1 second
        console.log(user.createdAt < user.updatedAt); // true
      });
    }, 1000);
  });
})





