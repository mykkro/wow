/* wow server */

// !!!!!! static files and assets invoke the user deserialization in auth middleware
// // https://github.com/jaredhanson/passport/issues/14
// it seems that order of express/static and other middlewares matters VERY much

var path = require("path")
var http = require('http');
var mustache = require('mustache')
var fs = require("fs-extra")
var mv = require('mv')
var uuid = require('node-uuid');
var merge = require("merge")
//var io = require('socket.io')
var _ = require("lodash")

var cfg = require("./lib/config/server.json")
var memwatchingEnabled = cfg.devel.memwatching
var tracingEnabled = cfg.devel.tracing

var express = require('express')
  , app = express()
  , server = http.createServer(app)
  //, io = require('socket.io').listen(server);

// express middlewares
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session      = require('express-session')
var errorhandler = require('errorhandler')
var favicon = require('serve-favicon');
var passport = require("passport");
var SessionStore = require("sessionstore")
var multer  = require('multer')
var morgan  = require('morgan')

// wow APIs and middlewares
var API = require("./lib/api/API")
var REST = require("./lib/api/REST")
var Storage = require("./lib/Storage")
var Auth = require("./lib/middleware/auth")

var WowServer = {
	port: 9999,
	chrome: null,
	start: function(afterInit) {
		var self = this
    Auth.setup(passport, API.user, API.admin)

    var allowedFiletypes = {
      "jpg":1, 
      "png":1, 
      "gif":1, 
      "svg": 1,
      "jpeg":1, 
      "avi":1, 
      "mp4":1, 
      "ogv": 1, 
      "webm":1, 
      "3gp":1, 
      "mov": 1, 
      "flv": 1,
      "mpg": 1,
      "mpeg": 1,
      "wav": 1,
      "ogg": 1,
      "mp3": 1,
      "zip": 1,
      "pdf": 1,
      "m4v": 1
    }

    var allowedFilesize = 50000000
    var plugins = require("./routes/plugins")(app, express, Auth, API)
    var pages = require("./routes/pages")(app, express, Auth)

    // view engine setup
    app.engine('mustache', require('hogan-express'))
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/views/mustache');
    app.set('layout', 'layout') 
    app.set('partials', {
      "admin-nav": "admin-nav",
      "nodepreview-head": 'nodepreview-head'
    })

    // middlewares setup
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());   
    app.use(multer())	  
    app.use(cookieParser());

    // request logging...
    app.use(morgan('dev'))

    // static resources...
    app.use(express.static(__dirname + '/public'));
    app.use('/uploads',express.static(Storage.uploadDir));
    app.use("/imports", express.static(Storage.importDir))
    app.use("/locales", express.static(__dirname+"/locales"))
    app.use("/userdata", express.static(__dirname+"/userdata"))
    pages.static()
    plugins.static()


    // session and passport setup
    app.use(session({
        secret: 'keyboard cat'
    }))
    app.use(passport.initialize());
    app.use(passport.session());


    // REST APIs of data entities
    REST(app, API)

    //
    // configure routes...
    // 
    app.post("/shutdown", function(req, res) {
      // if started with browser, kill it...
      if(WowServer.chrome) WowServer.chrome.kill()
    })

    app.get("/", Auth.isAuthenticated, function(req, res) { 
        if(req.user.admin) {
          // logged in as admin...
          res.redirect('/admin');
        } else {
          // logged in as user
          res.redirect('/plugins/homepage');
        }
    });

    
    require("./routes/logging")(app, API, Auth)
    require("./routes/rpc")(app)
    require("./routes/search")(app, API)
    require("./routes/youtubesearch")(app, API)
    require("./routes/admin")(app, Auth)
    require("./routes/loginlogout")(app, API, passport)
    require("./routes/upload")(app, Storage, {allowedExtensions:allowedFiletypes, maxFilesize:allowedFilesize})
    pages.routes()
    plugins.routes()

	  // error handler middleware...
	  // NOTE: express-trace collides with errorhandler...
	  if(cfg.mode == "devel" && !tracingEnabled) {
  		app.use(errorhandler()); 
	  }


/*
    io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
*/

	// apply express-trace middleware...
	if(cfg.mode == "devel" && tracingEnabled) {
		require('express-trace')(app);
	}

    Storage.init(function() {
      var port = 9999
      server.listen(port, function() {
        console.log('Listening on port '+port);
        if(afterInit) afterInit(self)
      });
    })
	
	// detection of memory leaks...
	// TODO enable/disable memwatch based on command line argument
	if(cfg.mode == "devel" && memwatchingEnabled) {
		var memwatch = require("memwatch")
		
		memwatch.on('leak', function(info) { 
			console.log("Possible memory leak detected!")
			console.log(info)
		});

		memwatch.on('stats', function(stats) { 
			console.log("Heap usage:")
			console.log(stats)
		});
	}
	
  },
  stop: function(cb) {
    server.close(cb)
  }

}

module.exports = WowServer
