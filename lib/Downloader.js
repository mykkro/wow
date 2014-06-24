var fs = require("fs-extra")
var mv = require("mv")
var Path = require("path")
var Storage = require("./Storage")
var mime = require('mime');
var tmp = require("tmp")
var url = require("url")
var Base = require("basejs")
var merge = require("merge")
var http = require("http")
var request = require('request');
var progress = require('request-progress');

function getExtension(filename) {
    var ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

/**
 * ## Downloader
 *
 * Utility class for handling file downloads.
 */
var Downloader = Base.extend({
	defaults: {
		maxFilesize: 50000000,
		downloadDir: Storage.downloadDir,
		allowedExtensions: {
			'jpg':1, 'png':1, 'jpeg':1, 'gif':1, 'svg': 1
		}
	},
	constructor: function(opts) {
		this.opts = merge({}, this.defaults, opts)
	},
	/**
 	 * ## Downloader.prototype.download
	 * Downloads a file from URL and stores it as temporary file
	 * On success, returns result object: { size, name, type, path, originalFilename }
	 * @param {string} resourceUrl
	 * @param {function} cb Callback function(err, result)
	 */
	download: function(resourceUrl, cb) {
		var self = this
		var pu = url.parse(resourceUrl)
		var path = pu.path
		var ext = getExtension(path).toLowerCase()
		if(!(ext in this.opts.allowedExtensions)) {
			cb(new Error("Invalid file type: "+ext))
		} else {
			tmp.tmpName(function(err, filename) {
	    		if (err) {
	    			cb(err)
	    		} else {
	    			var targetPath = filename + "." + ext
	    			self.downloadTo(resourceUrl, targetPath, cb)
	    		}
			});
		}
	},
	/**
 	 * ## Downloader.prototype.downloadTo
	 * Downloads a file from URL and stores it under targetPath.
	 * On success, returns result object: { size, name, type, path, originalFilename }
	 * @param {string} resourceUrl
	 * @param {string} targetPath Callback function(err, result)
	 * @param {function} cb Callback function(err, result)
	 */
	downloadTo: function(resourceUrl, targetPath, cb) {
		// TODO limit download size
		var self = this
		var origname = Path.basename(url.parse(resourceUrl).path)
 		var src = {
            url: resourceUrl,
            name: Path.basename(targetPath)
        };
        var size = 0
        var mime = 'application/octet-stream'
        var dest = targetPath
        var aborted = false

        // download with progress monitoring...
        var req = request(resourceUrl)
		var dl = progress(req, {
		    throttle: 2000,  // Throttle the progress event to 2000ms, defaults to 1000ms
		    delay: 1000      // Only start to emit after 1000ms delay, defaults to 0ms
		})
		.on('progress', function (state) {
		    console.log('received size in bytes', state.received);
		    // The properties bellow can be null if response does not contain
		    // the content-length header
		    console.log('total size in bytes', state.total);
		    console.log('percent', state.percent);
		})
		.on('error', function (err) {
		    cb(err);
		})
		.on('end', function (err) {
			if(err) {
				cb(err);
				return
			}
        	if(aborted) {
        		cb(new Error("Download aborted!"))
        		return
        	}
        	// all ok...
        	console.log("Downloading finished!")
		    cb(null, { 
            	size: size,
            	name: origname,
            	type: mime,
            	path: targetPath, 
            	originalFilename: origname 
            });
		})
		.on('response', function(res) {
		    mime = res.headers['content-type'];
        	size = res.headers['content-length']
        	console.log("Downloading file: src="+src.url+" mime="+mime+" size="+size)
        	if(size > self.opts.maxFilesize) {
        		// file too big, we must abort request
        		console.log("File too big, aborting request...")
        		aborted = true
        		req.abort()        		
        	}
		})
		.pipe(fs.createWriteStream(dest))
   	}
})

module.exports = Downloader