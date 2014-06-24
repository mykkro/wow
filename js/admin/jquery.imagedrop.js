/**
 * Simple image drop plugin.
 *
 * Myrousz 2014
 *
 * MIT license.
 */
$.fn.imageDrop = function(settings) {
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
        e.stopPropagation();
        e.preventDefault();
        var types = e.dataTransfer.types
        var found = $.inArray(types, "text/uri-list");
        var out = ""
        var url = null
        if (!found) {
            // not a link...
            out = "Not a link"
        } else {
            // TODO handle also images from file sources and as text/html
            url = e.dataTransfer.getData("text/plain")
            out = $('<img src="' + url + '" />')
        }
        $(this).html(out)
        if (url) afterDrop(url)
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
