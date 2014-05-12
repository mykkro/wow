var fs = require("fs-extra")
var mv = require("mv")
var Uuid = require("node-uuid")
var Path = require("path")
var Storage = require("./Storage")
var Thumbbot = require("./my-thumbbot")
var mime = require('mime');
var Base = require("basejs")
var merge = require("merge")

var FileDAO = require("./dao/FileDAO")

function getExtension(filename) {
    var ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var Uploader = Base.extend({
	defaults: {
		maxFilesize: 10000000,
		uploadDir: Storage.uploadDir,
	},
	constructor: function(opts) {
		this.opts = merge({}, this.defaults, opts)
		this.dao = new FileDAO()
	},
	/**
	 * Get file info by its UUID.
	 * @param {string} uuid
	 * @param {function} cb
	 */
	get: function(uuid, cb) {
		this.dao.findOne({uuid:uuid}, cb)
	},
	/**
	 * Removes file by its UUID.
	 * @param {string} uuid
	 * @param {function} cb
	 */
	remove: function(uuid, cb) {
		var self = this
		this.dao.findOne({uuid: uuid}, function(err, file) {
			if(err) {
				return cb(err)
			}
			if(!file) {
				// nothing to delete!
				console.error("UUID not found")
				return cb()
			} 
			fs.unlink(file.path, function(err2) {
				if(err2) {
					// delete file failed
					console.error("Failed to delete file: "+file.path)
				}
				if(file.thumbnailPath) {
					fs.unlink(file.thumbnailPath, function(err3) {
						if(err3) {
							// delete thumbnail failed
							console.error("Failed to delete thumbnail: "+file.thumbnailPath)
						}
					})
				}
				self.dao.removeItems({uuid:uuid}, cb)						
			})
		})
	},
	/**
	 * Check if a given file points to a file suitable for upload.
	 * @param {string} path The path to a file
	 * @param {function} cb Callback function(err, res)
	 */
	checkPath: function(path, cb) {
		var self = this
		if(!path) {
			return cb(new Error("Path parameter missing"))
		}
		fs.stat(path, function(err, stats) { 
			if(err || !stats.isFile()) { 
				cb(new Error("File not found"))
			} else { 
				// got a file!
				var size = stats.size
				if(size > self.opts.maxFilesize) {
					cb(new Error("File too big (has "+size+" bytes, the limit is "+self.opts.maxFilesize+" bytes)."))
				} else {
					cb(null, { size: size })
				}
			}
		})
	},
	/**
	 * Removes an existing entry with given UUID. If no UUID is given, just passes control to callback function.
	 * @param {string} uuid
	 */
	ensureRemoved: function(uuid, cb) {
		if(!uuid) {
			cb()
		} else {
			this.remove(uuid, cb)
		}
	},
	makeThumbnail: function(srcPath, uuid, originalFilename, cb) {
		var self = this
	  	var dstPath = Path.join(self.opts.uploadDir, "thumbs", uuid + ".png") 
	  	var bot = new Thumbbot(srcPath, dstPath)
	  	bot.set({width: 100, height: 100, method: 'resize', originalFilename: originalFilename})
	  	// create thumbnail...
	  	bot.snap(function(err) {
	  		if(err) {
	  			// TODO use default thumbnail based on file extension
		  		cb(null, {thumbnailPath: "dummy.png"})
	  		} else {
	  			cb(null, {thumbnailPath: dstPath})
	  		}
	  	})
	},
	/**
	 * Add file to storage. Return its uuid.
	 */
	copy: function(params, cb) {
		// params object may contain these fields:
		// (required fields are denoted with *)
		// ownerAdminId*, uuid, moveFile, created, title, description, originalFilename, path*, type
		var self = this
		var path = params.path
		self.checkPath(path, function(err, fi) {
			if(err) {
				return cb(err)
			}
			// we can upload a file...
			var uuid = params.uuid || Uuid.v4()
			console.log("Uploader.copy: uuid="+uuid)
			self.ensureRemoved(params.uuid, function(err) {
				if(err) {
					return cb(err)
				} 
				var size = fi.size
				var ext = getExtension(path).toLowerCase()
				var newPath = Path.join(self.opts.uploadDir, uuid + "." + ext)
				var transfer = (params.moveFile) ? mv : fs.copy
				transfer(path, newPath, function (err) {
				  if (err) {
				    cb(new Error((params.moveFile) ? "File move failed" : "File copy failed"))
				  } else {
				  	// file successfully copied...
			  		var mimetype = mime.lookup(newPath)
				  	var srcPath = newPath
				  	self.makeThumbnail(srcPath, uuid, params.originalFilename, function(err, tb) {
				  		if(err) {
				  			return cb(err)
				  		} 
			  			// store it into the DB!
					  	var data = {
					  		ownerAdminId: params.ownerAdminId,
					  		title: params.title || params.originalFilename,
					  		description: params.description || '',
					  		originalFilename: params.originalFilename,
					  		path: newPath,
					  		thumbnailPath: tb.thumbnailPath,
					  		size: size,
					  		type: params.type || mimetype,
					  		uuid: uuid
					  	}
					  	self.dao.create(data, function(err, res) {
					  		if(err) {
					  			return cb(err)
					  		} 
					  		cb(null, res[0])
					  	})
				  	})
				  }
				});
			}) 
		});
	}
})

module.exports = Uploader