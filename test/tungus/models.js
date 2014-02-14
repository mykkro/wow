var express = require('express');
var tungus = require('tungus');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')
var http = require("http")

console.log('Running mongoose version %s', mongoose.version);

var AppModel = require("../../lib/models/app")(mongoose).App

/**
 * Connect to the console database on localhost with
 * the default port (27017)
 */

mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  createData();
 
 })

/**
 * Data generation
 */

function createData () {
  AppModel.create({
      name: 'MyApplication'      
    , title: 'My Application'
    , description: "Some description comes here..."
    , version: "1.0.0"
    , imported: new Date()
  }, function (err) {
    if (err) return done(err);
    example();
  })
}

/**
 * Population
 */

function example () {
  AppModel
  .findOne({ name: /^my/i })
  .exec(function (err, app) {
    if (err) return done(err);
    console.log(app);
    console.log(app.imported.toLocaleDateString());
  })
}


function done (err) {
  if (err) console.error(err);
  AppModel.remove(function () {    
      mongoose.disconnect();
  })
}
