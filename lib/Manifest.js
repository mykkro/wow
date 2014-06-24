var fs = require("fs")
var unzip = require("unzip")

/**
 * ## Manifest
 *
 * Utility class for handling (mostly) app manifests
 */
var Manifest = {
	filename: "wow.json",
	/* read archive manifest to JSON file... */	
	/* TODO trap errors when pointing to an nonexistent file
		or if the file is not a valid ZIP archive... 
	*/
	/**
 	 * ## Manifest.prototype.loadFromArchive
	 * Attempts to read manifest data from file wow.json (by default) from target zip archive.
	 * @param {string} archivePath Path to a zip archive
	 * @param {function} next Callback function (err, result). On success, result contains the contents of wow.json file.
	 */		
	loadFromArchive: function(archivePath, next) {
		var self = this
		var manifest = null
		var manifestError = "Manifest file missing"
		fs.createReadStream(archivePath)
		  .pipe(unzip.Parse())
		  .on('entry', function (entry) {
			var fileName = entry.path;
			var type = entry.type; // 'Directory' or 'File'
			var size = entry.size;
			if (!manifest && (fileName === self.filename)) {
			  var out = []
			  entry.on('data', function(data) {
				out.push(data)
			  }).on('end',function(err) {
				out = out.join()
				try {
					manifest = JSON.parse(out)
					manifestError = null
					/* we do not need to continue further... */
				}
				catch(e) {
					manifestError = "Manifest is not a valid JSON file!"
				}
			  });
			} else {
			  entry.autodrain();
			}
		  }).on("close", function(err) {
			if(err) next(err)
			else next(manifestError, manifest)
		  })
	}
}

module.exports = Manifest