var express = require('express');
var tungus = require('tungus');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')
var http = require("http")

console.log('Running mongoose version %s', mongoose.version);

/**
 * Console schema
 */

var consoleSchema = Schema({
    name: String
  , manufacturer: String
  , released: Date
})
var Console = mongoose.model('Console', consoleSchema);

/**
 * Game schema
 */

var gameSchema = Schema({
    name: String
  , developer: String
  , released: Date
  , consoles: [{ type: Schema.Types.ObjectId, ref: 'Console' }]
})
var Game = mongoose.model('Game', gameSchema);

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
  Console.create({
      name: 'Nintendo 64'
    , manufacturer: 'Nintendo'
    , released: 'September 29, 1996'
  }, function (err, nintendo64) {
    if (err) return done(err);

    Game.create({
        name: 'Legend of Zelda: Ocarina of Time'
      , developer: 'Nintendo'
      , released: new Date('November 21, 1998')
      , consoles: [nintendo64]
    }, function (err) {
      if (err) return done(err);
      example();
    })
  })
}

/**
 * Population
 */

function example () {
  Game
  .findOne({ name: /^Legend of Zelda/ })
  .populate('consoles')
  .exec(function (err, ocinara) {
    if (err) return done(err);
    console.log(ocinara);

    console.log(
        '"%s" was released for the %s on %s'
      , ocinara.name
      , ocinara.consoles[0].name
      , ocinara.released.toLocaleDateString());

 
 // restify + mongoose
 // access later with: http://localhost:3000/api/v1/Consoles/
	var app = express();
	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		restify.serve(app, Game);
		restify.serve(app, Console);
	});

	http.createServer(app).listen(3000, function() {
		console.log("Express server listening on port 3000");
	});
 
 //done();
  })
}

function done (err) {
  if (err) console.error(err);
  Console.remove(function () {
    Game.remove(function () {
      mongoose.disconnect();
    })
  })
}