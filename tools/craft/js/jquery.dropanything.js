/**
 * All-purpose drop-in plugin.
 * 
 * Myrousz 2014
 *
 * MIT license.
 */
$.fn.dropAnything = function (settings) {
    $.event.props.push('dataTransfer');

    settings = $.extend({
        // css: 'dropzone'
        maxUploadFilesize: 10000000,
        // accept only files
        filesOnly: false,
        // accept only zip archives
        zipOnly: false,
        // accept only images
        imagesOnly: false,
        // accept only audio files
        audioOnly: false,
        // accept only videos
        videoOnly: false,
        // accept only links
        linksOnly: false,
        // accept only YouTube links
        youtubeOnly: false,
        // automatically download video and image links
        downloadLinkContent: true,
        // events...
        dropped: null,
        uploaded: null,
        uuid: null
    }, settings);

    var imageMimetypes = {
        "image/jpeg":1,
        "image/png": 1,
        "image/gif": 1,
        "image/svg+xml": 1
    }

    var audioMimetypes = {
        "audio/wav":1,
        "audio/ogg": 1,
        "audio/mp3": 1
    }

    var videoMimetypes = {
        "video/3gpp": 1,
        "video/x-msvideo": 1,
        "video/x-flv": 1,
        "video/mp4": 1,
        "video/ogg": 1,
        "video/webm": 1
    }

    var afterDrop = settings.dropped || $.noop
    var afterFile = settings.uploaded || $.noop

    var lastUUID = settings.uuid
    var lastYouTubeId = settings.ytid
    var container

    function uploadFile(file, cb) {
        // Open our formData Object
        var formData = new FormData();
     
        // Append our file to the formData object
        formData.append('file', file);
        formData.append('uuid', lastUUID)

        // Create our XMLHttpRequest Object
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                   var obj = JSON.parse(xhr.responseText);
                   // return result...
                   if(obj.error) {
                        flash(obj.error, cb)
                   } else {
                        cb(null, obj)
                   }
                } else {
                    flash("Server error: "+xhr.status, cb);         
                }
            }
        };
        xhr.onerror = function () { 
            flash("Server error: "+xhr.status, $.noop); 
        };         
        // Open our connection using the POST method
        xhr.open("POST", '/upload');
     
        // Send the file
        xhr.send(formData);
    }

    function downloadFile(src, uuid, cb) {
        $.ajax({
          url: '/download',
          type: 'POST',
          data: JSON.stringify({url:src, uuid:uuid}),
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        }).then(function(res) {
          if(!res.error) {
            cb(null, res)
          } else {
            flash(res.error, cb)
          }
        })
    }

	var makeImage = function(src) {
		return $("<img>").attr("src", src)
	}
	
	var makeYouTubeEmbedCode = function(videoId) {
		return $('<object type="application/x-shockwave-flash" style="width:450px; height:366px;" data="http://www.youtube.com/v/'+videoId+'"><param name="movie" value="http://www.youtube.com/v/'+videoId+'" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /></object>')	
	}
		
	
    var display = function(out) {
        if(out.type == "link") {
            if(out.subtype == "image") {
                var src = out.uploaded ? out.uploaded.thumbnailUri : out.url 
                return makeImage(src)
            } else if(out.subtype == "video") {
                var src = out.uploaded.thumbnailUri
                return makeImage(src)
            } else if(out.subtype == "youtube") {
                return makeImage(out.thumbnailUrl)
            } else {
                // just a link
                return $("<a>").attr("href", out.url).text(out.url)
            }
        } else if(out.type == "text") {
            return out.html ? $("<div>").html(out.html) : $("<div>").text(out.text)
        } else if(out.type == "file") {
            return $("<img>").attr("src", out.uploaded.thumbnailUri)
        } else {
            return "Unsupported type: "+out.type
        }
    }

    var isYouTubeUrl = function(url) {
        return /((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9\-\.]+)\/?/.test(url)
    }

    var isImageUrl = function(url, callback) {
        $("<img>", {
            src: url,
            error: function() { callback(null, null); },
            load: function() { callback(null, url); }
        });
    }

    var checkImageUrl = function(url) {
        var uu = url.toLowerCase()
        return(uu.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
    }

    var checkVideoUrl = function(url) {
        var uu = url.toLowerCase()
        return(uu.match(/\.(ogv|webm|mov|avi|mp4|3gp|flv)$/) != null);
    }
	
    // http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        } else {
            return null
        }
    }

    function cancel(e) {
      if (e.preventDefault) e.preventDefault(); // required by FF + Safari
      return false; // required by IE
    }   

    /**
     * Display error flash message.
     */
    var flash = function(msg, cb) {
        var $this = $(this);
        var div = $("<div>")
            .css({"width":"100%", "height":"100%", "position":"absolute", "left":"0px", "top":"0px", "background": "#888"})
            .append(
                $("<img>")
                    .attr("src", "/assets/icons/no-entry.png")
                    .css({width: "80px", height: "80px", "position":"absolute", "top":"30px", "left":"50px"}),
                $("<p>")
                    .text(msg)
                    .css({position:"absolute", width: "100%", "text-align": "center", "left": "0px", "top": "120px"})
            )
        div.appendTo(container)
        div.fadeOut(3000, function() {
            div.remove();
        });
        cb(msg)
    }

    var dropIt = function(dt, cb) {
        var types = dt.types
        var tm = {}
        for(var i=0; i<types.length; i++) tm[types[i]] = true
        if("text/uri-list" in tm) {
            handleLink(dt, tm, cb)
            return
        } 
        if(settings.linksOnly || settings.youtubeOnly) {
            flash("Only links allowed", cb)
            return
        }
        if("text/html" in tm) {
            if(settings.filesOnly) {
                return flash("Only files allowed", cb)
            }
            handleRichText(dt, cb)
            return
        } 
        if("text/plain" in tm) {
            if(settings.filesOnly) {
                return flash("Only files allowed", cb)
            }
            handlePlainText(dt, cb)
            return
        } 
        if("Files" in tm) {
            handleFile(dt, cb)
            return
        } else {
            // something else...
            flash("Don't know what to do with this..." + types.join(","), cb)
        }
    }

    function handleRichText(dt, cb) {
        var out = {}
        out.type = "text"
        out.subtype = "html"
        out.html = dt.getData("text/html")
        out.text = dt.getData("text/plain")
        cb(null, out)
    }

    function handlePlainText(dt, cb) {
        var out = {}
        out.type = "text"
        out.subtype = "plain"
        out.text = dt.getData("text/plain")
        cb(null, out)
    }

	function getYouTubeThumbnail(videoId, opts) {
		var o = opts || {}
		var type = opts.type || 'default'
		// type can be one of:
		// default, 0, 1, 2, 3, hqdefault, mqdefault, sddefault, maxresdefault
		return "http://i3.ytimg.com/vi/"+videoId+"/"+type+".jpg"
	}
	
    function handleDirectLink(dt, cb) {
        var out = {}
        out.type = "link"
        out.subtype = "general"
        out.url = dt.getData("text/plain")
        if(isYouTubeUrl(out.url)) {
            if(settings.filesOnly) {
                return flash("Only files allowed", cb)
            }
            // extract youtube ID
            var ytId = youtube_parser(out.url)
            if(ytId) {
                out.subtype = "youtube"
                out.videoId = ytId
				out.thumbnailUrl = getYouTubeThumbnail(ytId, {type:"default"})
                cb(null, out)
            } else {
                // youtube ID not found...
                flash("YouTube ID not found!", cb)
            }
            return
        } 
        if(settings.youtubeOnly) {
            flash("Only YouTube links allowed!", cb)
            return
        }        
        if(checkImageUrl(out.url)) {
            // we have an image!
            // TODO better test with <img src> construction
            if(settings.audioOnly) {
                return flash("Only audio allowed", cb)
            }
            if(settings.videoOnly) {
                return flash("Only video allowed", cb)
            }
            out.subtype = "image"
            if(settings.downloadLinkContent) {
                handleImage(out, cb)
            } else {
                cb(null, out)
            }
            return
		} 
        if(checkVideoUrl(out.url)) {
			// video
            if(settings.imagesOnly) {
                return flash("Only images allowed", cb)
            }
            if(settings.audioOnly) {
                return flash("Only audio allowed", cb)
            }
			out.subtype = "video"
            if(settings.downloadLinkContent) {
                handleVideo(out, cb)
            } else {
                cb(null, out)
            }
            return
        } 
        if(settings.filesOnly) {
            return flash("Only files allowed", cb)
        }
        // other classes....
        cb(null, out)
    }

    function handleImage(info, cb) {
        // download the image and store it locally...
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

	function handleVideo(info, cb) {
        // download the image and store it locally...
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

    function handleWrappedImageLink(dt, cb) {
        var out = {}
        var html = dt.getData("text/html")
        var regex =  /<img.*?src="(.*?)"/
        out.type = "link"
        out.url = regex.exec(html)[1];
        if(!out.url) {
            flash("Not an image! " + html, cb)
        } else if(settings.downloadLinkContent) {
            out.subtype = "image"
            handleImage(out, cb)
        } else {
            cb(null, out)
        }
    }

    function handleLink(dt, tm, cb) {
        var out = {}
        if("text/plain" in tm) {
            // we got link (URL)...
            handleDirectLink(dt, cb)
            return
        } 
        if("text/html" in tm) {
            if(settings.youtubeOnly) {
                return flash("Only YouTube links allowed", cb)
            }
            // we got <img src="..."/>
            handleWrappedImageLink(dt, cb)           
        }                  
    }

    function handleFile(dt, cb) {
        var files = dt.files
        if(files.length == 1) {
            // single file
            // upload it!
            if(files[0].size > settings.maxUploadFilesize) {
                return flash("File too big for upload!", cb)
            } 
            if(settings.imagesOnly && !(files[0].type in imageMimetypes)) {
                return flash("Only images allowed.", cb)
            }
            if(settings.audioOnly && !(files[0].type in audioMimetypes)) {
                return flash("Only audio files allowed.", cb)
            }
            if(settings.videoOnly && !(files[0].type in videoMimetypes)) {
                return flash("Only video files allowed.", cb)
            }
            uploadFile(files[0], function(err, fileData) {
                if(err) {
                    return flash(err, cb)
                }
                // remember UUID!
                lastUUID = fileData.uuid
                return cb(null, { type: "file", uploaded: fileData})
            })                
        } else {
            // multiple files
            return flash("Only single file uploads supported!", cb)
        }
    }

    function drop(e) {
        var $this = $(this)
        e.stopPropagation();
        e.preventDefault();
        dropIt(e.dataTransfer, function(err, res) {
            if(err) {
                console.error(err)
            } else {
                $this.html(display(res))
                afterDrop(res)
                if(res.uploaded) {
                    afterFile(res.uploaded)
                }
            }
        })
        return false;
      }

    // TODO this will work well only if just one element is selected...
    return this.each(
        function() {
            var $this = $(this);
            container = $this            
            $this
                .css("position", "relative")
                .bind('drop', drop)
                .bind('dragover', cancel)
                .bind('dragenter', cancel)
                .bind('dragleave', cancel);
            if(lastUUID) {
                // display thumbnail associated with the UUID of the uploaded file
                var obj = {
                    type: "file",
                    uploaded: {
                        thumbnailUri: "/upload/"+lastUUID+"/thumb"
                    }
                }
                $this.html(display(obj))
            } else if(lastYouTubeId) {
                // display youTube thumbnail
                var obj = {
                    type: "link",
                    subtype: "youtube",
                    thumbnailUrl: getYouTubeThumbnail(lastYouTubeId, {type:"default"})
                }
                $this.html(display(obj))
            }
        }
    );
};
