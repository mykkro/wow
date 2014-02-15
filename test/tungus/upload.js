var util = require('util');
var path = require("path");
var fs = require("fs")
var tungus = require('tungus');
var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var filePluginLib = require('./mongoose-file-alt')(mongoose);

var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");

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

var SampleSchema = new Schema({
});
SampleSchema.plugin(filePlugin, {
    name: "attachment",
    upload_to: make_upload_to_model(uploads, 'attachments'),
    relative_to: uploads_base
});



mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  var SampleModel = mongoose.model("SampleModel", SampleSchema);

  var tmpFilePath = path.join(__dirname, 'tmp/mongoose-file-test')
  var uploadedDate = new Date()
  fs.writeFileSync(tmpFilePath, "Dummy content here.\n")

  var uploadedFile = {
    size: fs.statSync(tmpFilePath)['size'],
    path: tmpFilePath,
    name: 'dummy.txt',
    type: 'text/plain',
    hash: false,
    lastModifiedDate: uploadedDate
  }


    /* there seems to be some problems with updating fields, possibly with Tungus... */
    /* better alternative: create own plugin for uploading or fix this one... */

    /* this works - straight away, without id... */
    /*
    var Sample = new SampleModel()
    Sample.save(function(err, data) {
      if(err) throw err;
      console.log(data)
    })
    */

    /* retrieve file info... */
    /**/
    SampleModel.findById(3, function(err, data) {
      if(err) throw err;
      console.log(data)
      // change it - it will upload the file, but the attachment field is not saved... */
      /**/
      data.set("attachment.file", uploadedFile)
      data.markModified("attachment")
      data.save(function(err, data2) {
        if(err) throw err
        console.log(data2) // data2 is shown correctly, but it is not saved into DB
      })
/**/
    })
    /**/


/*
    fs.writeFileSync(tmpFilePath, "Another file.\n")
    var uploadedFile = {
      size: fs.statSync(tmpFilePath)['size'],
      path: tmpFilePath,
      name: 'another.txt',
      type: 'text/plain',
      hash: false,
      lastModifiedDate: uploadedDate
    }
    // this will change the uploaded file - but the attachment is unchanged 
    data.set("attachment.file", uploadedFile)
    data.save(function(err, data2) {
      if(err) throw(err);
      console.log(data2);
      // you can't remove file like this...
      // TODO change the plugin to support file removal
      data2.set("attachment.file", {})
      data2.save(function(err, data3) {
        if(err) throw(err);
        console.log(data3);
      })
    })
      */
  

/* this will upload the file, but not change/populate the attachment field */
/*
  var Sample = new SampleModel()
  Sample.save(function(err, data) {
    if(err) throw err;
    console.log(data)    
    data.set("attachment.file", uploadedFile)
    data.save(function(err, data2) {
      if(err) throw(err);
      console.log(data);
      console.log(data2);
    })
  })
*/

/**/
/*
  SampleModel.findById(22).populate('attachment').exec(function(err, data) {
    if(err) throw err;
    console.log(data)
  })
*/
})