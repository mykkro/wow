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
    }, settings);

    var afterDrop = settings.dropped || $.noop

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

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();
        var types = e.dataTransfer.types
        var tm = {}
        for(var i=0; i<types.length; i++) tm[types[i]] = true
        var out = {}
        if("text/uri-list" in tm) {
            // we got link!
            if("text/plain" in tm) {
                // we got link (URL)...
                out.type = "link"
                out.subtype = "general"
                out.url = e.dataTransfer.getData("text/plain")
                if(isYouTubeUrl(out.url)) {
                    // extract youtube ID
                    var ytId = youtube_parser(out.url)
                    if(ytId) {
                        out.subtype = "youtube"
                        out.videoId = ytId
                    }
                } else if(checkImageUrl(out.url)) {
                    // we have an image!
                    // TODO better test with <img src> construction
                    out.subtype = "image"
                } else {
                    // other classes....
                }
            } else if("text/html" in tm) {
                // we got <img src="..."/>
                var html = e.dataTransfer.getData("text/html")
                var regex =  /<img.*?src="(.*?)"/
                out.type = "link"
                out.url = regex.exec(html)[1];
                if(!out.url) {
                    console.error("Not an image!", html)
                } else {
                    out.subtype = "image"
                }
            }           
        } else if("text/html" in tm) {
            out.type = "text"
            out.html = e.dataTransfer.getData("text/html")
            out.text = e.dataTransfer.getData("text/plain")
        } else {
            // something else...
            console.error("Don't know what to do with this...", types)
        }
        $(this).html(display(out))
        afterDrop(out)
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
