	$(document).ready(function() {
		var mustache = require('mustache');
		var Base = require('basejs');
		var url = require('url')
		var path = require('path')

		var Widgetizer = require("./widgetizer")(window, $)
		var i18n = new(require("./i18n"))({
          locales: ['en', 'de', 'cz'],
          defaultLocale: 'en'
        })
        i18n.setLocale('de')
		var dialogs = require("./dialogs")($, i18n)

		var server = Widgetizer.rpc
/*	
		var fs = require('fs');
		var gui = require('nw.gui');
		var Auth  = require("./lib/auth")(window)
		var Imports = require("./lib/dao/imports")		
		var UserVideos = require("./lib/dao/uservideos")

		var url = require("url")
    	var parsedUrl = url.parse(window.location.href, true)
      	var page = parsedUrl.query.page || 1
		var userId = Auth.getLoggedUser().id
		*/
		var userId = 555
		var adminId = 123
		var page = 1

		var VideoPanel = Base.extend({
			constructor: function() {
				var self = this
		  		$("#add-video-btn").click(function() {
		  			self.addUserVideo()
		  		})
				self.refreshVideosView()
			},
			getVideos: function(cb) {
				server("userVideosList", {adminId:adminId, page:page}, cb)
			},
			showVideos: function(data) {
				var root = $("#video-list").empty()
				if(data && data.items) {
					for(var i=0; i<data.items.length; i++) {
						root.append(this.showVideo(data.items[i]))
					}
				}
			},
			showVideo: function(item) {	
				var self = this
				var tpl = '<h3>{{title}}</h3><img width="120" height="90" src="http://img.youtube.com/vi/{{id}}/default.jpg"><button>Remove</button>'
				var html = mustache.to_html(tpl, item)
				var previewUri = "http://img.youtube.com/vi/"+item.id+"/default.jpg"
				var out = $("<div>").html(html)
				out.find("img").click(function() {
					window.location.href= "/pages/video?id="+item.id
				})
				out.find("button").click(function() {
					self.showRemoveDialog(function() {
						// confirmed...
						self.removeVideo(userId, item.id, out)
					})
				})
				return out
			},
			removeVideo: function(userId, videoId, div) {
				// remove record from database...
				server("userVideosRemove", {adminId:adminId, userId:userId, videoId:videoId}, function(err, res) {
					if(err) console.error(err);
					else {
						div.fadeOut("slow")
					}
				})
			},
			addUserVideo: function() {
				var userId = $("#videouser-textfield").val()
				var videoId = $("#videoid-textfield").val()
				if(userId && videoId) {
					var self = this
					// get metadata for video ID... 
					server("youTubeVideoInfo", {videoId:videoId}, function(err, data) {
						if(!err) {
							server("userVideosAdd", {adminId:adminId, userId:userId, videoId:videoId, title:data.result.title}, function(err, res) {
								console.log(res)
								self.refreshVideosView()
							})
						}				
					})
				}
			},
			showRemoveDialog: function(cb) {
				dialogs.removeDialog(function(reallyRemove) {
					if(reallyRemove) cb()
				})
			},
			refreshVideosView: function() {
				var self = this
				self.getVideos(function(err, data) {
					console.log(data)
					if(!err) self.showVideos(data.result)
				})					
			}
		})
/*
		var getImports = function(cb) {
			Imports.listNewest({adminId:adminId}, 10*(page-1), 10, cb)
		}

		var showImports = function(data) {
			console.log(data)
			var root = $("#import-list").empty()
			if(data) {
				for(var i=0; i<data.length; i++) {
					root.append(showItem(data[i]))
				}
			}
		}
*/
/*
		var showItem = function(item) {
			var previewUri = "assets/misc/nopreview.svg"
			if(item.preview) {
				var appBaseUri = "file://" + path.join(Storage.importDir, item.importName)			
				previewUri = appBaseUri + "/" + item.preview
			}
			var out = $("<div>").append(
				$("<h3>").text(item.title),
				$("<div>").text("Created: "+item.created),
				$("<img>").attr({
					"width":100,
					"height":100,
					"src": previewUri
				}).click(function() {
					window.location.href= "index.html?view=apppage&importname="+item.importName
				}),
				$("<button>").text("Remove").click(function() {
					showRemoveDialog(function() {
						// confirmed...
						removeItem(item._id.id, item.importName, out)
					})
				})
			)
			return out
		}
*/
/*		
		var removeItem = function(id, importName, div) {
			// remove record from database...
			Imports.remove(id, function(err, res) {
				if(err) console.error(err);
				else {
					console.log("Removing directory...")
					var dir = path.join(Storage.importDir, importName)
					// remove dir with its contents...
					fs.remove(dir, function(err) {
						if(err) console.error(err);
						else {
							console.log("Deleted successfully!")
							// TODO flash message
							//refreshImportsView()
							div.fadeOut("slow")
						}
						
					})
				}
			})
		}
*/
/*
		var fs = require("fs-extra")
		var unzip = require("unzip")
		var temp = require("temp")
		var Manifest =  require("./lib/manifest")
		var Storage = require("./lib/storage")
		var Hashids = require('hashids'),
		hashids = new Hashids('this is my salt', 8);
		
		// ensure that some directories exist...
		Storage.init()
		
function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}
	var fileSelected = function(path, next) {
		if(getExtension(path) != "zip") {
			console.log("Must be a .zip archive")
			return
		}
		Manifest.loadFromArchive(path, function(err, res) {
			if(err) {
				/// manifest missing or invalid 
				console.log("Failed to load manifest file")
				console.error(err)
				// TODO show prompt with "are you sure?" and a form with default manifest 
				// create default manifest and continue importing... 
				next(path, {})
			} else {
				// manifest ok 
				console.log("Manifest loaded successfully.")
				console.log(res)
				next(path, res)
			}
		})
	}
												  
	var unpackArchive = function(path, dirPath, next) {
			fs.createReadStream(path)
				.pipe(unzip.Extract({ path: dirPath }))
				.on("close", next)
	}
				  
	var importArchive = function(path, m) {
		console.log("Importing archive from "+path)
		console.log("With manifest: ", m)
		temp.mkdir('wowimport', function(err, dirPath) {
			console.log("Created temporary directory "+dirPath)
			unpackArchive(path, dirPath, function(err) {
				if(err) {
					console.log("Archive unpacking failed")
					console.error(err)
					// TODO remove temporary directory
					// must set tracking for temp dir
					temp.cleanup()
				} else {
					console.log("Archive unpacked successfully!")
					finalizeImport(dirPath, m)
				}
			})
		});				
	}
	
	// when doing imports after the first, crud.create returns sometimes with empty ID
	// until fixed, the page should be refreshed after each import
	// or.. do not reuse the import form
	var finalizeImport = function(dirPath, m, copy) {
		console.log("App is unpacked and ready at "+dirPath)
		console.log("Preparing to import...")
		console.log("Manifest:", m)
		var data = m
		Imports.create(adminId, data, function(err, res) {
		if(!err) {
			console.log("Data inserted! ID="+res._id)
			console.log(res)
			var newName = hashids.encrypt(res._id.id)
			console.log(newName)
			var newPath = path.join(Storage.importDir, newName)
			var fun = function(err) {
				if(!err) {
					res.importName = newName
					// update entry in database...
					Imports.update(res, function(err, res2) {
						console.log("Import completed successfully.")
						console.log(res)		
						refreshImportsView()
						// signal that import finished OK 
					})
				}
			}
			if(copy) 
				fs.copy(dirPath, newPath, fun); 
			else 
				fs.rename(dirPath, newPath, fun);
		}
		})
	}

	var importFromDirectory = function(dir) {
		// is it a directory?
		////window.alert(dir)
		// load manifest or create one...

		if (fs.existsSync(path.join(dir, "index.html"))) {
			// Do something
			////window.alert("Found index.html")
			var m = {}
			finalizeImport(dir, m, true)
		} else {
			window.alert("Index.html not found!")
		}
	}
*/	


/*
	var refreshImportsView = function() {
		getImports(function(err, data) {
			showImports(data)
		})					
	}
*/
/*
		var importPathAdded = function(p) {
			// get manifest from file...
			fileSelected(p, function(p, manifest) {
				console.log("Import path added: "+p)
				console.log("With manifest:",manifest)
				
				manifest.adminId = adminId
				manifest.originalPath = p
				manifest.originalName = path.basename(p, '.zip')
				importArchive(p, manifest)
			})
		}
					
		// initialization

		  var chooser = $('#fileDialog')
		  chooser.change(function(evt) {
		      importPathAdded($(this).val());
		  });
		  var chooser2 = $('#dirDialog')
		  chooser2.change(function(evt) {
		      importFromDirectory($(this).val());
		  });

		  $("#add-import-btn").click(function() {
		  	chooser.trigger("click")
		  })
		  
		  $("#add-import-dir-btn").click(function() {
		  	chooser2.trigger("click")
		  })
		  refreshImportsView()
*/
		var vp = new VideoPanel()  
	})
