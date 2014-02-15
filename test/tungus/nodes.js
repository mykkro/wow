var util = require('util');
var tungus = require('tungus');
var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

  var AdminSchema = new Schema({
    // for subadmins this is not null...
    owner: { type: Schema.Types.ObjectId, ref: 'Admin' },
    fullname: String,
    email: String, // required, unique
    username: String, // required, unique
    password: String // required
  })
  AdminSchema.plugin(timestamps)

  var NodeSchema = new Schema({
      owner: { type: Schema.Types.ObjectId, ref: 'Admin' }, // required
      title: String,
      description: String,
      tags: { type : Array , "default" : [] }
  },{ collection : 'nodes', discriminatorKey : '_type' });
  NodeSchema.plugin(timestamps)

  var UserProfileSchema = NodeSchema.extend({
      fullname: String,
      gender: { type: String, enum: ['m', 'f'] }
  })

  var UserGroupSchema = NodeSchema.extend({
    password: String,
    passwordEnabled: Boolean
  })

  var ImageSchema = NodeSchema.extend({
  })

  var VideoSchema = NodeSchema.extend({
  })

  var YouTubeVideoSchema = NodeSchema.extend({
    ytId: String
  })

  var ImportedAppSchema = NodeSchema.extend({
    appId: String
  })

  var VoiceSchema = NodeSchema.extend({
  })

  var ArticleSchema = NodeSchema.extend({
    content: String
  })

mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  var AdminModel = mongoose.model('Admin', AdminSchema)
  var NodeModel = mongoose.model('Node', NodeSchema)
  var UserProfileModel = mongoose.model('UserProfile', UserProfileSchema)
  var ArticleModel = mongoose.model('Article', ArticleSchema)
/*
  // add an admin...
  var node = new AdminModel({fullname: 'YetBiggerBoss', username: 'admin', password: 'admin'});
  node.save(function (err, data) {
    if(!err) console.log(data);
  });
*/
/*
  // add an object...
  var node = new ArticleModel({owner: 2, title: 'Another Article', content: 'nothing here', tags: ["lorem", "ipsum"]});
  node.save(function (err, data) {
    if(!err) console.log(data);
  });
*/
/*
  // try to add a tag...
  NodeModel.findById(3, function(err, node) {
    if(err) throw err;
    console.log(node)
    node.tags.push("foo")
    node.save(function(err) {
      if(err) throw err
        console.log("Success!")
    })
  })
*/
/*
// find an admin...
AdminModel.findOne({}, function(err, admin) {
  if(err) throw err;
  console.log(admin)
  // create an article...
  var node = new ArticleModel({owner: admin, title: 'Yet Another Article', content: 'nothing here', tags: ["lorem", "ipsum"]});
  node.save(function (err, data) {
    if(!err) console.log(data);
  });
})
*/
/*
  NodeModel.find({}, function(err, nodes) {
    console.log("Nodes found:", nodes)

    // !!! this does not discriminate automatically...
    UserProfileModel.find({_type:"UserProfile"}, function(err, nodes) {
      console.log("Users found:", nodes)

      // !!! this does not discriminate automatically... (tungus does not support it?)
      ArticleModel.find({_type:"Article"}, function(err, nodes) {
        console.log("Articles found:", nodes)
      });

    });

  });
*/
})





