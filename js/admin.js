	$(document).ready(function() {

		$.playable('soundmanager/swf/')

		var mustache = require('mustache');
		var Base = require('basejs');
		var url = require('url')
		var path = require('path')

		var Widgetizer = require("./widgetizer")(window, $, SVG)
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
		var userId = "555"
		var adminId = "123"
		var page = 1
		
		var checkImageUrl = function(url, cb) {
			$.ajax({
			  type: "HEAD",
			  url : url,
			  success: function(message,text,response){
				 cb(response.getResponseHeader('Content-Type').indexOf("image")!=-1)
			  },
			  error: function() {
				cb()
			  }
			})		
		}
		
		var RadioPanel = Base.extend({
			constructor: function() {
				var self = this
		  		$("#add-radio-btn").click(function() {
		  			self.addUserRadio()
		  		})
				self.refreshRadiosView()
			},
			getRadios: function(cb) {
				server("userRadiosList", {adminId:adminId, page:page}, cb)
			},
			showRadios: function(data) {
				console.log("show radios: ",data)
				var root = $("#radio-list").empty()
				if(data && data.items) {
					for(var i=0; i<data.items.length; i++) {
						root.append(this.showRadio(data.items[i]))
					}
				}
			},
			showRadio: function(item) {	
				var self = this
				var tpl = '<span><a href="{{url}}">{{title}}</a></span><button>Remove</button>'
				var html = mustache.to_html(tpl, item)
				var out = $("<div>").html(html)
				out.find("a").playable()
				out.find("button").click(function() {
					self.showRemoveDialog(function() {
						// confirmed...
						self.removeRadio(item.userId, item.url, out)
					})
				})
				return out
			},
			removeRadio: function(userId, url, div) {
				// remove record from database...
				server("userRadiosRemove", {adminId:adminId, userId:userId, url:url}, function(err, res) {
					if(err) console.error(err);
					else {
						div.fadeOut("slow")
					}
				})
			},
			addUserRadio: function() {
				var userId = $("#radiouser-textfield").val()
				var url = $("#radiourl-textfield").val()
				var title = $("#radiotitle-textfield").val()
				if(userId && url) {
					var self = this
					server("userRadiosAdd", {adminId:adminId, userId:userId, url:url, title:title}, function(err, res) {
						console.log(res)
						self.refreshRadiosView()
					})
				}
			},
			showRemoveDialog: function(cb) {
				dialogs.removeDialog(function(reallyRemove) {
					if(reallyRemove) cb()
				})
			},
			refreshRadiosView: function() {
				var self = this
				self.getRadios(function(err, data) {
					console.log(data)
					if(!err) self.showRadios(data.result)
				})					
			}
		})


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

		var ImportPanel = Base.extend({
			constructor: function() {
				this.refreshImportsView()
			},
			refreshImportsView: function() {
				var self = this
				self.getImports(function(err, data) {
					self.showImports(data)
				})					
			},
			getImports: function(cb) {
				var self = this
				server("importsList", {/*adminId:adminId, */page:page}, function(err, data) {
					if(!err) self.showImports(data.result)
				})
			},
			showImports: function(data) {
				console.log(data)
				var root = $("#import-list").empty()
				if(data) {
					for(var i=0; i<data.length; i++) {
						root.append(this.showItem(data[i]))
					}
				}
			},
			goTo: function(url) {
				window.location.href = url
			},
			goToImportPage: function(name) {
				this.goTo("/pages/app?importname="+name+"&lang=de&showquitbutton=no")
			},
			goToGameAppPage: function(name) {
				this.goTo("/pages/game?importname="+name+"&lang=de")
			},			
			goToRuleGamePage: function(name) {
				this.goTo("/pages/rulegame?importname="+name+"&lang=de")
			},			
			showItem: function(item) {
				console.log(item)
				// TODO use mustache
				var self = this
				var previewUri = "/imports/" +item.importName + "/preview.png"				
				var out = $("<div>").append(
					$("<h3>").text(item.title),
					$("<div>").text("Created: "+item.created),
					$("<img>").attr({
						"width":100,
						"height":100,
						"src": previewUri
					}).click(function() {
						if(item.apptype == "wow/app/game") {
							self.goToGameAppPage(item.importName)
						} else if(item.apptype == "wow/app/rulegame") {
							self.goToRuleGamePage(item.importName)
						} else {
							self.goToImportPage(item.importName)
						}
					}),
					$("<button>").text("Remove").click(function() {
						self.showRemoveDialog(function() {
							// confirmed...
							self.removeItem(item._id, out)
						})
					})
				)
				checkImageUrl(previewUri, function(found) {
					if(!found) previewUri = "/assets/misc/nopreview.svg"
					out.find("img").attr("src", previewUri)
				})
				return out
			},
			removeItem: function(id, div) {
				// remove record from database...
				console.log("Removing item: "+id)
				server("importRemove", {id:id}, function(err, res) {
					if(err) console.error(err);
					else {
						div.fadeOut("slow")
					}
				})
			},
			showRemoveDialog: function(cb) {
				dialogs.removeDialog(function(reallyRemove) {
					if(reallyRemove) cb()
				})
			}

		})


		function ext(url) {
		    return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf("."))
		}

		function afterDrop(url) {
			$("#radiourl-textfield").val(url)
			$("#radiotitle-textfield").val(url)
		}

	    function cancel(e) {
	      if (e.preventDefault) e.preventDefault(); // required by FF + Safari
	      return false; // required by IE
	    }   

	    function drop(e) {
	    	$(this).removeClass("error").removeClass("accepted")
	        e.preventDefault();
	        var found = false;
	        var types = e.dataTransfer.types
	        for(var i=0;i<types.length; i++) {
	            if(types[i] == "text/uri-list") {
	                found = true;
	                break;
	            }
	        }
	        var out = ""
	        var url = null
	        if(!found) {
	            // not a link...
	            $(this).html("Not a link")
	            $(this).addClass("error")
	        } else {
	            url = e.dataTransfer.getData("Text")
	    		var extension = ext(url).toLowerCase()
	    		if(extension==".mp3" || extension==".ogg") {
	    			var link = $('<a href="'+url+'" />').text(url)
	    	    	$(this).html(link).addClass("accepted")
	    	    	link.playable()
			        afterDrop(url)
		        } else {
		        	$(this).html("Unsupported link type")
		            $(this).addClass("error")
		        }
	        }
	        return false;
	      }



		var vp = new VideoPanel()  
		var ip = new ImportPanel()
		var rp = new RadioPanel()

	    $("#radio-dropzone")
	    	.bind('drop', drop)
	        .bind('dragover', cancel)
	        .bind('dragenter', cancel)
	        .bind('dragleave', cancel);


	    $('#video-dropzone').youTubeDrop({
	        dropped: function(videoId) {
	            console.log("Dropped!",videoId)
	            $("#videoid-textfield").val(videoId)
	        }
	    })

	})
