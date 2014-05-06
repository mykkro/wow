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
        maxUploadFilesize: 10000000
    }, settings);

    var afterDrop = settings.dropped || $.noop

    function uploadFile(file, cb) {
        // Open our formData Object
        var formData = new FormData();
     
        // Append our file to the formData object
        formData.append('file', file);
     
        // Create our XMLHttpRequest Object
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                   var obj = JSON.parse(xhr.responseText);
                   // return result...
                   if(obj.error) {
                        cb(obj.error)
                   } else {
                        cb(null, obj)
                   }
                } else {
                    cb("Server error: "+xhr.status);         
                }
            }
        };
        xhr.onerror = function () { 
            cb("Server error: "+xhr.status); 
        };         
        // Open our connection using the POST method
        xhr.open("POST", '/upload');
     
        // Send the file
        xhr.send(formData);
    }

    var display = function(out) {
        if(out.type == "link") {
            if(out.subtype == "image") {
                return $("<img>").attr("src", out.url)
            } else if(out.subtype == "youtube") {
                var code = '<object type="application/x-shockwave-flash" style="width:450px; height:366px;" data="http://www.youtube.com/v/'+out.videoId+'"><param name="movie" value="http://www.youtube.com/v/'+out.videoId+'" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /></object>'
                return $(code)
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
        return(uu.match(/\.(jpeg|jpg|gif|png)$/) != null);
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

    var dropIt = function(dt, cb) {
        var types = dt.types
        var tm = {}
        for(var i=0; i<types.length; i++) tm[types[i]] = true
        if("text/uri-list" in tm) {
            handleLink(dt, tm, cb)
        } else if("text/html" in tm) {
            handleRichText(dt, cb)
        } else if("text/plain" in tm) {
            handlePlainText(dt, cb)
        } else if("Files" in tm) {
            handleFile(dt, cb)
        } else {
            // something else...
            cb("Don't know what to do with this..." + types.join(","))
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

    function handleDirectLink(dt, cb) {
        var out = {}
        out.type = "link"
        out.subtype = "general"
        out.url = dt.getData("text/plain")
        if(isYouTubeUrl(out.url)) {
            // extract youtube ID
            var ytId = youtube_parser(out.url)
            if(ytId) {
                out.subtype = "youtube"
                out.videoId = ytId
                cb(null, out)
            } else {
                // youtube ID not found...
                cb("YouTube ID not found!")
            }
        } else if(checkImageUrl(out.url)) {
            // we have an image!
            // TODO better test with <img src> construction
            out.subtype = "image"
            cb(null, out)
        } else {
            // other classes....
            cb(null, out)
        }
    }

    function handleWrappedImageLink(dt, cb) {
        var out = {}
        var html = dt.getData("text/html")
        var regex =  /<img.*?src="(.*?)"/
        out.type = "link"
        out.url = regex.exec(html)[1];
        if(!out.url) {
            cb("Not an image! " + html)
        } else {
            out.subtype = "image"
            cb(null, out)
        }
    }

    function handleLink(dt, tm, cb) {
        var out = {}
        if("text/plain" in tm) {
            // we got link (URL)...
            handleDirectLink(dt, cb)
        } else if("text/html" in tm) {
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
                cb("File too big for upload!")
            } else {
                uploadFile(files[0], function(err, fileData) {
                    if(!err) {
                        cb(null, { type: "file", uploaded: fileData})
                    } else {
                        cb(err)
                    }
                })                
            }
        } else {
            // multiple files
            cb("Only single file uploads supported!")
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
            }
        })
        return false;
      }

    return this.each(
        function() {
            var $this = $(this);
            $this
                .bind('drop', drop)
                .bind('dragover', cancel)
                .bind('dragenter', cancel)
                .bind('dragleave', cancel);
        }
    );
};
