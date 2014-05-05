var fs = require("fs-extra")
var mv = require("mv")
var Uuid = require("node-uuid")
var Path = require("path")

var FileDAO = require("./dao/FileDAO")
var dao = new FileDAO()

function getExtension(filename) {
    var ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var Uploader = {
	dao: dao,
	maxFilesize: 10000000,
	uploadDir: Path.join(__dirname, "../uploads/files"),

	/**
	 * Get file info by its UUID.
	 * @param {string} uuid
	 * @param {function} cb
	 */
	get: function(uuid, cb) {
		dao.findOne({uuid:uuid}, cb)
	},
	/**
	 * Removes file by its UUID.
	 * @param {string} uuid
	 * @param {function} cb
	 */
	remove: function(uuid, cb) {
		dao.findOne({uuid: uuid}, function(err, file) {
			if(err) {
				cb(err)
			} else if(!file) {
				cb(new Error("File not found"))
			} else {
				fs.unlink(file.path, function(err2) {
					if(err2) {
						cb(err2)
					} else {
						dao.removeItems({uuid:uuid}, cb)
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
		// ownerAdminId*, moveFile, created, title, description, originalFilename, path*, type
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
				if(size > self.maxFilesize) {
					cb(new Error("File too big (has "+size+" bytes, the limit is "+self.maxFilesize+" bytes)."))
				} else {
					// we can copy the file to the storage!
					// console.log("Got a file!  path="+path+" size="+size)
					var uuid = Uuid.v4()
					var ext = getExtension(path)
					var newPath = Path.join(self.uploadDir, uuid + "." + ext)
					var transfer = (params.moveFile) ? mv : fs.copy
					transfer(path, newPath, function (err) {
					  if (err) {
					    cb(new Error((params.moveFile) ? "File move failed" : "File copy failed"))
					  } else {
					  	var data = {
					  		ownerAdminId: params.ownerAdminId,
					  		title: params.title || Path.basename(path),
					  		description: params.description || '',
					  		originalFilename: Path.basename(path),
					  		path: newPath,
					  		size: size,
					  		type: params.type || 'application/octet-stream',
					  		uuid: uuid
					  	}
					  	dao.create(data, function(err, res) {
					  		if(err) {
					  			cb(err)
					  		} else {
					  			cb(null, res)
					  		}
					  	})
					  }
					});
				}
			} 
		});
	}
}

module.exports = Uploader