var BookViewer = require("./BookViewer")

var ExportBookViewer = BookViewer.extend({
    constructor: function(options) {
        this.base(options);
        this.targetDiv = "#fullscreen"
    },
    init: function() {
        this.base()
        this.setFullscreen(true);
    },
    closeBook: function() {
        // export viewer closes the book
        this.close()
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit

        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+2*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
        }
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    }
});

module.exports = ExportBookViewer

