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
				cb(err)
			} else if(!file) {
				cb(new Error("File not found"))
			} else {
				fs.unlink(file.path, function(err2) {
					if(err2) {
						// delete file failed
						cb(err2)
					} else {
						if(file.thumbnailPath) {
							fs.unlink(file.thumbnailPath, function(err3) {
								if(err3) {
									// delete thumbnail failed
									console.error("Failed to delete thumbnail")
								}
							})
						}
						self.dao.removeItems({uuid:uuid}, cb)						
					}
				})
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
		if(!path) 
			return cb(new Error("Path parameter missing"))
		fs.stat(path, function(err, stats) { 
			if(err || !stats.isFile()) { 
				cb(new Error("File not found"))
			} else { 
				// got a file!
				var size = stats.size
				if(size > self.opts.maxFilesize) {
					cb(new Error("File too big (has "+size+" bytes, the limit is "+self.opts.maxFilesize+" bytes)."))
				} else {
					// we can copy the file to the storage!
					// console.log("Got a file!  path="+path+" size="+size)
					var uuid = params.uuid || Uuid.v4()
					var doNothing = function(uuid, cb) { cb() }
					var fun = (params.uuid) ? self.remove : doNothing
					fun(uuid, function(err) {
						if(err) {
							cb(err)
						} else {
							var ext = getExtension(path)
							var newPath = Path.join(self.opts.uploadDir, uuid + "." + ext)
							var transfer = (params.moveFile) ? mv : fs.copy
							transfer(path, newPath, function (err) {
							  if (err) {
							    cb(new Error((params.moveFile) ? "File move failed" : "File copy failed"))
							  } else {
							  	// file successfully copied...
						  		var mimetype = mime.lookup(newPath)
							  	var srcPath = newPath
							  	var dstPath = Path.join(self.opts.uploadDir, "thumbs", uuid + ".png") 
							  	var bot = new Thumbbot(srcPath, dstPath)
							  	bot.set({width: 100, height: 100, method: 'resize'})
							  	// create thumbnail...
							  	bot.snap(function(err) {
							  		var thumbnailPath = null
							  		if(err) {
							  			console.error("Thumbnail generation failed")
							  		} else {
							  			console.log("Thumbnail generated: "+dstPath)
							  			thumbnailPath = dstPath
							  		}
								  	var data = {
								  		ownerAdminId: params.ownerAdminId,
								  		title: params.title || Path.basename(path),
								  		description: params.description || '',
								  		originalFilename: Path.basename(path),
								  		path: newPath,
								  		thumbnailPath: thumbnailPath,
								  		size: size,
								  		type: params.type || mimetype,
								  		uuid: uuid
								  	}
								  	self.dao.create(data, function(err, res) {
								  		if(err) {
								  			cb(err)
								  		} else {
								  			cb(null, res[0])
								  		}
								  	})
							  	})
							  }
							});
						}
					})
				}
			} 
		});
	}
})

module.exports = Uploader