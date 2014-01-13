var path = require("path")
var fs = require('fs-extra')
var CRUD = require("./crud")
var Engine = require('tingodb')()

// the user dir is the same as in 
// require('nw.gui').App.dataPath

var approot = (function() {
	// under Windows:
	if(process.platform == "win32") {
		return process.env.LOCALAPPDATA
	} else if(process.platform == "linux") {
		return process.env.HOME
	} else {
		throw "Unsupported platform: " + process.platform
	}
})()

var userdir = path.join(approot, "wow")
var uploaddir = path.join(userdir, "uploads")
var importdir = path.join(userdir, "imports")
var dbdir = path.join(userdir, "tingodb")

var Storage = {
	userDir: userdir,
	uploadDir: uploaddir,
	importDir: importdir,
	dbDir: dbdir,
	/* if directory does not exist, create it... */
	ensureDir: function(dir, next) {
		fs.mkdirs(dir, next)
	},
	dirExists: function(d, next) {
		fs.stat(d, function (er, s) { next(!er && s.isDirectory()) })
	},
	/* creates data directories if not present */
	init: function(next)  {
		var self = this;
		this.ensureDir(this.userDir, function(err) {
			if(!err) self.ensureDir(self.uploadDir, function(err) {
				if(!err) self.ensureDir(self.importDir, function(err) {
					if(!err) self.ensureDir(self.dbDir, next)
					else next(err)
				}) 
				else next(err)
			}) 
			else next(err)
		})
	},
	crud: function(collectionName) {
		if(!collectionName) collectionName = "default"
		var db = new Engine.Db(this.dbDir, {});
		var collection = db.collection(collectionName + ".tingodb");
		var crud = new CRUD(collection)
		return crud
	}
	
}

module.exports = Storage