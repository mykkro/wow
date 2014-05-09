var path = require("path")
var fs = require('fs-extra')
var Engine = require('tingodb')()
var os = require("os")
var tmp = require("tmp")

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
var thumbsdir = path.join(userdir, "uploads", "thumbs")
var importdir = path.join(userdir, "imports")
var dbdir = path.join(userdir, "tingodb")

/**
 * ## Storage
 *
 * File storage utility class
 */
var Storage = {
	appDir: approot,
	userDir: userdir,
	uploadDir: uploaddir,
	downloadDir: os.tmpdir(),
	thumbsDir: thumbsdir,
	importDir: importdir,
	dbDir: dbdir,
	/**
 	 * ## Storage.prototype.ensureDir
	 * Checks if directory does exist, if not, creates it.
	 * @param {string} dir Path to the directory
	 * @param {function} next Callback function(err, result)
	 */
	ensureDir: function(dir, next) {
		fs.mkdirs(dir, next)
	},
	/**
 	 * ## Storage.prototype.dirExists
	 * Checks if a file exists and if it is a directory.
	 * @param {string} d Directory path
	 * @param {function} next Callback function(err, result)
	 */
	dirExists: function(d, next) {
		fs.stat(d, function (er, s) { next(!er && s.isDirectory()) })
	},
	/**
 	 * ## Storage.prototype.init
	 * Initializes the storage. Creates data directories if not present.
	 * This should be called after installing the application.
	 * @param {function} next Callback function(err, result)
	 */
	init: function(next)  {
		var self = this;
		this.ensureDir(this.userDir, function(err) {
			if(!err) self.ensureDir(self.uploadDir, function(err) {
				if(!err) self.ensureDir(self.thumbsDir, function(err) {
					if(!err) self.ensureDir(self.importDir, function(err) {
						if(!err) self.ensureDir(self.dbDir, next)
						else next(err)
					}) 
					else next(err)
				}) 
				else next(err)
			})
			else next(err)
		})
	},
	/**
	 * ## Storage.prototype.collection
	 * Returns the TingoDB collection with given name.
	 * @param {string} collectionName
	 * @return {object} a TingoDB collection
	 */
	collection: function(collectionName) {
		if(!collectionName) collectionName = "default"
		var db = new Engine.Db(this.dbDir, {});
		return db.collection(collectionName + ".tingodb");
	}
	
}

module.exports = Storage