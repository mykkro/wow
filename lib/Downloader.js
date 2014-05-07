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
var Magic = require('mmmagic').Magic;
var download = require('download');

function getExtension(filename) {
    var ext = Path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

var Downloader = Base.extend({
	defaults: {
		maxFilesize: 10000000,
		downloadDir: Storage.downloadDir,
		allowedExtensions: {
			'jpg':1, 'png':1, 'jpeg':1, 'gif':1
		}
	},
	constructor: function(opts) {
		this.opts = merge({}, this.defaults, opts)
	},
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
	// TODO limit download size
	downloadTo: function(resourceUrl, targetPath, cb) {
		var origname = Path.basename(url.parse(resourceUrl).path)
 		var src = {
            url: resourceUrl,
            name: Path.basename(targetPath)
        };
        var dest = Path.dirname(targetPath)
        var dl = download(src, dest);
        var size = 0
        var mime = 'application/octet-stream'
        dl.on('response', function(res) {
        	mime = res.headers['content-type'];
        	size = res.headers['content-length']
        })
        dl.on('close', function () {
            cb(null, { 
            	size: size,
            	name: origname,
            	type: mime,
            	path: targetPath, 
            	originalFilename: origname 
            });
	    });
        dl.on('error', function (err) {
            cb(err);
        });
   	}
})

module.exports = Downloader