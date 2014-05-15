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
        // accept and exclude parameters can be strings or arrays of strings
        // and are optional
        // by default: all is accepted, nothing is excluded
        accept: null, // if set, only those types are accepted 'image' '*'
        exclude: null, // if set, those types are not accepted ['text','image']
        // automatically download video and image links
        downloadLinkContent: true,
        // events...
        dropped: null,
        uploaded: null,
        uuid: null
    }, settings);

    // not intelligent, but quick'n'dirty
    var getAllSubtypes = function(type) {
        switch(type) {
            case '*': 
                return {'link':1, 'youtubelink':1, 'imagelink':1, 'videolink':1, 'audiolink':1, 'pdflink':1, 'ziplink':1, 'text':1, 'plaintext':1, 'richtext':1, 'file':1, 'image':1, 'audio':1, 'video':1, 'pdf':1, 'zip':1}            
            case 'file': 
                return {'file':1, 'image':1, 'audio':1, 'video':1, 'pdf':1, 'zip':1}            
            case 'link': 
                return {'link':1, 'youtubelink':1, 'imagelink':1, 'videolink':1, 'audiolink': 1, 'pdflink': 1, 'ziplink': 1}            
            case 'text': 
                return {'text':1, 'plaintext':1, 'richtext':1}            
            default:
                return {}
        }
    }

    var setAccExcType = function(type, out, val) {
        // get all subtypes of the type
        out[type] = val
        var st = getAllSubtypes(type)
        for(var key in st) {
            out[key] = val
        }
        return out
    }

    var setAccExcTypes = function(types, out, val) {
        if(types) {
            if(typeof(types) == "string") {
                var types = types.split(",")
                for(var i=0; i<types.length; i++) {
                    setAccExcType(types[i], out, val)
                }
            } else {
                // we expect object...
                for(var key in types) {
                    setAccExcType(types[key], out, val)
                }
            }
        }
        return out
    }

    // TODO fill those arrays
    var acceptedTypes = {'file':1, 'link':1, 'youtubelink':1, 'imagelink':1, 'videolink':1, 'text':1, 'plaintext':1, 'richtext':1, 'file':1, 'image':1, 'audio':1, 'video':1, 'pdf':1, 'zip':1}
    var excludedTypes = {}
    if(settings.accept) {
        acceptedTypes = {}
        setAccExcTypes(settings.accept, acceptedTypes, 1)
    }
    if(settings.exclude) {
        excludedTypes = {}
        setAccExcTypes(settings.exclude, excludedTypes, 1)
    }
    console.log("Accepted:", acceptedTypes, "Excluded:", excludedTypes)

    /* process 'accept' and 'exclude' options */
    function isAccepted(type) {
        // type is accepted if it is in the accept list and it isn't in exclude list
        return (type in acceptedTypes && !(type in excludedTypes))
    }

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
            if(out.uploaded) {
                // we have associated uploaded data...
                var src = out.uploaded.thumbnailUri
                return makeImage(src)
            }
            if(out.subtype == "image") {
                var src = out.url 
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
        return(uu.match(/\.(m4v|ogv|webm|mov|avi|mp4|3gp|flv)$/) != null);
    }

    var checkAudioUrl = function(url) {
        var uu = url.toLowerCase()
        return(uu.match(/\.(ogg|weba|mp3|wav|aac)$/) != null);
    }

    var checkZipUrl = function(url) {
        var uu = url.toLowerCase()
        return(uu.match(/\.(zip)$/) != null);
    }

    var checkPdfUrl = function(url) {
        var uu = url.toLowerCase()
        return(uu.match(/\.(pdf)$/) != null);
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
        if("text/uri-list" in tm && (isAccepted("link") || isAccepted("youtubelink") || isAccepted("imagelink") || isAccepted("videolink") || isAccepted("audiolink") || isAccepted("ziplink") || isAccepted("pdflink")))  {
            handleLink(dt, tm, cb)
            return
        } 
        if("text/html" in tm && (isAccepted("text") || isAccepted("richtext"))) {
            handleRichText(dt, cb)
            return
        } 
        if("text/plain" in tm && (isAccepted("text") || isAccepted("plaintext"))) {
            handlePlainText(dt, cb)
            return
        } 
        if("Files" in tm && (isAccepted("file") || isAccepted("audio") || isAccepted("video") || isAccepted("image") || isAccepted("pdf") || isAccepted("zip"))) {
            handleFile(dt, cb)
            return
        } else {
            // dropped something that is not supported
            flash("Not allowed here", cb)
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
        if(isYouTubeUrl(out.url) && isAccepted("youtubelink")) {
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
        if(checkImageUrl(out.url) && isAccepted("imagelink")) {
            // we have an image!
            // TODO better test with <img src> construction
            out.subtype = "image"
            if(settings.downloadLinkContent) {
                handleImage(out, cb)
            } else {
                cb(null, out)
            }
            return
		} 
        if(checkVideoUrl(out.url) && isAccepted("videolink")) {
			// video
			out.subtype = "video"
            if(settings.downloadLinkContent) {
                handleVideo(out, cb)
            } else {
                cb(null, out)
            }
            return
        } 
        if(checkAudioUrl(out.url) && isAccepted("audiolink")) {
            // video
            out.subtype = "audio"
            if(settings.downloadLinkContent) {
                handleAudio(out, cb)
            } else {
                cb(null, out)
            }
            return
        } 
        if(checkZipUrl(out.url) && isAccepted("ziplink")) {
            // video
            out.subtype = "zip"
            if(settings.downloadLinkContent) {
                handleZip(out, cb)
            } else {
                cb(null, out)
            }
            return
        } 
        if(checkPdfUrl(out.url) && isAccepted("pdflink")) {
            // video
            out.subtype = "pdf"
            if(settings.downloadLinkContent) {
                handlePdf(out, cb)
            } else {
                cb(null, out)
            }
            return
        } 
        // other classes....
        cb(null, out)
    }

    function handleImage(info, cb) {
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

	function handleVideo(info, cb) {
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

    function handleAudio(info, cb) {
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

    function handleZip(info, cb) {
        downloadFile(info.url, lastUUID, function(err, res) {
            if(err) cb(err);
            else cb(null, $.extend(info, {uploaded:res}))
        })
    }

    function handlePdf(info, cb) {
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
        if("text/html" in tm && isAccepted("imagelink")) {
            // we got <img src="..."/>
            handleWrappedImageLink(dt, cb)           
        }                  
    }

    function doUpload(file, subtype, cb) {
        uploadFile(file, function(err, fileData) {
            if(err) {
                return flash(err, cb)
            }
            // remember UUID!
            lastUUID = fileData.uuid
            return cb(null, { type: "file", subtype: subtype, uploaded: fileData})
        })    
    }

    function handleFile(dt, cb) {
        var files = dt.files
        if(files.length == 1) {
            // single file
            // upload it!
            if(files[0].size > settings.maxUploadFilesize) {
                return flash("File too big for upload!", cb)
            } 
            if((files[0].type in imageMimetypes) && isAccepted("image")) {
                // proceed with upload
                return doUpload(files[0], "image", cb)
            }
            if((files[0].type in audioMimetypes) && isAccepted("audio")) {
                return doUpload(files[0], "audio", cb)
            }
            if((files[0].type in videoMimetypes) && isAccepted("video")) {
                return doUpload(files[0], "video", cb)
            }        
            if(files[0].type == 'application/zip' && isAccepted("zip")) {
                return doUpload(files[0], "zip", cb)
            }        
            if(files[0].type == 'application/pdf' && isAccepted("pdf")) {
                return doUpload(files[0], "pdf", cb)
            }        
            return flash("Not accepted here: "+files[0].type, cb)            
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
