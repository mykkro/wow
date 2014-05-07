/**
 * Simple YouTube drop plugin.
 * 
 * Myrousz 2014
 *
 * MIT license.
 */
$.fn.youTubeDrop = function (settings) {
    $.event.props.push('dataTransfer');

    settings = $.extend({
        // css: 'dropzone'
    }, settings);

    var afterDrop = settings.dropped || $.noop

    function cancel(e) {
      if (e.preventDefault) e.preventDefault(); // required by FF + Safari
      return false; // required by IE
    }   

    function drop(e) {
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
        var videoId = null
        if(!found) {
            // not a link...
            out = "Not a link"
        } else {
            var url = e.dataTransfer.getData("Text")
            // check if it is youtube link...
            var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid != null) {
                videoId = videoid[1]
                var thumbUrl = "http://i3.ytimg.com/vi/"+videoId+"/default.jpg"
                //var bigThumbUrl = "http://i3.ytimg.com/vi/"+videoid[1]+"/0.jpg"
                out = $('<img src="'+thumbUrl+'" />')
            } else { 
               out = "Not youtube url.";
            }
        }
        $(this).html(out)
        if(videoId) afterDrop(videoId)
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
