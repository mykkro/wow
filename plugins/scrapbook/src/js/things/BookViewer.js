var Base = require("basejs")
var Thing = require("./Thing")
var Things = require("./Things")


// TODO udelat z toho Thing
// TODO k ikonam pridat tooltipy

var BookViewer = Base.extend({
    constructor: function(options) {
        this.bookData = options.data;
        this.bookUrl = options.url;
        this.eventUrl = options.eventUrl;
        this.fullscreen = options.fullscreen;
        this.logger = options.logger;
        this.showquitbutton = options.showquitbutton;
        this.defaultWidth = 920;
        this.defaultHeight = 600;
        this.tools = {};
        this.bookContent = null;
        this.eventHistory = [];
        this.targetDiv = "#content"
    },
    makeIcon: function(icon, title) {
        return $("<div>").addClass('icon icon-48 icon-'+icon).css('display','inline-block').attr("title", title);
    },
    makeTool: function(icon, label, left/*bool*/, top, click) {
        this.tools[icon] = this.makeIcon(icon, label).css({position:'absolute', top: top}).css(left ? {'left':'6px'}:{'right':'6px'}).click(click).appendTo($("#book-wrapper"));
        return this.tools[icon];
    },
    showIcon: function(icon, enable) {
        if(enable) this.tools[icon].show() ; else this.tools[icon].hide();
    },
    turnNext: function() {
        this.bookContent.get().turn("next");
    },
    turnPrevious: function() {
        this.bookContent.get().turn("previous");
    },
    turnFirst: function() {
        this.bookContent.get().turn("page", 1);
    },
    goHome: function() {
        this.logEvent('book_close', this.bookUrl);
        window.location.href = this.bookUrl;
    },
    // v Chrome to nejak nefunguje...
    close: function() {
        this.logEvent('book_close', this.bookUrl);
        window.open('','_self','');
        window.close();
    },
    closeBook: function() {
        // normal viewer only turns to page 1
        this.turnFirst()
    },
    _setPageBackgrounds: function(bookContent, o) {
        var totalPages = bookContent.length()
        for(var i=0; i<totalPages; i++) {
            var slot = bookContent.nth(i)
            var elem = slot.element
            var css = { "background-size": "cover", "background-color": "white"}
            if(i==0) {
                // first page
                css["background-image"] = 'url('+o.frontpage_image_url+')'
            } else if(i == totalPages-1 && i%2!=0) {
                // last page, must be odd
                css["background-image"] = 'url('+o.backpage_image_url+')'
            } else if(i%2==0) {
                // even page
                css["background-image"] = 'url('+o.evenpage_image_url+')'
            } else {
                // odd page
                css["background-image"] = 'url('+o.oddpage_image_url+')'
            }
            elem.css(css)
        }
    },
    _makeWrapper: function(o) {
        return $("<div>")
            .attr("id", "book-wrapper")
            .css('position','relative')
            .css("background-image", 'url('+o.background_image_url+')')
    },
    _makeReferences: function(bookContent) {
        // gather references...
        var refs = [];
        bookContent.findSlotsByType('ref-decorator', refs);
        for(var i=0; i<refs.length; i++) {
            refs[i].options.label = (i+1)+""
            refs[i].refresh()
        }
        // TODO find reference-page layout and fill it by reference info...
        var reflists = [];
        bookContent.findSlotsByType('ref-list', reflists);
        // only the first will be used; later: we can split reference items into multiple ref lists
        if(reflists.length>0) {
            reflists[0].setReferences(refs);
        }
    },
    _monitorMediaEvents: function(bookContent) {
        // find audio and video Things and monitor their play, stop, pause, kill events
        var media = [];
        var self = this;
        bookContent.findSlotsByType('audio-decorator', media);
        bookContent.findSlotsByType('video-thing', media);
        for(var i=0; i<media.length; i++) {
            var m = media[i]; 
            var src = m.options.uri;           
            (function(){
                m.onPlay(function() { self.logEvent('book_media_play', src); });
                m.onPause(function() { self.logEvent('book_media_pause', src); });
                m.onStop(function() { self.logEvent('book_media_stop', src); });
                m.onKill(function() { self.logEvent('book_media_kill', src); });
            })();
        }
    },
    init: function() {
        /* display book... */
        var self = this;
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        var o = this.bookData.options      
        // create wrapper...
        var wrapper = this._makeWrapper(o);
        wrapper.appendTo(this.targetDiv);
        this.bookContent = Things.create(this.bookData, {"display":"turnable"});

        this._setPageBackgrounds(this.bookContent, o)
        this._makeReferences(this.bookContent)
        this._monitorMediaEvents(this.bookContent)
        
        // init book...
        this.bookContent.onInit();
        $("#book-wrapper").css({width:width+"px", height:height+"px"}).html(this.bookContent.get());
        this.bookContent.makeDisplay();

        // events...
        $(window).unload(function() {
            self.bookContent.onExit(); // TODO tohle mi nejak nefunguje...
        });
        $(window).resize(function() {
            if(self.fullscreen) {
                self.updateToolbar(self.recreate());
            }
        });
        $(window).bind("fullscreen-toggle", function(e, state) {
            self.setFullscreen(state);
        });
        this.bookContent.get().bind("turned", function(event, page, view) {
            self.updateToolbar();
            self.logEvent('book_page_turn', self.bookUrl, self.bookContent.get().turn("page"));
        });
        this.makeTool('turn-right', __('Previous page'), true, '50%', function() { self.turnPrevious();});
        this.makeTool('turn-left', __('Next page'), false, '50%', function() { self.turnNext();});
        if(this.showquitbutton!="no") {
            this.makeTool('closebook', __('Close book'), false, '16px', function() { self.closeBook();});
            // reduce close icon in size...
            this.tools['closebook'].css({top: '16px', width: "24px", height: "24px"});
        }

        // update icons...
        $("#book-wrapper >.icon-turn-left").css("background-image", 'url('+o.turnleft_image_url+')')
        $("#book-wrapper >.icon-turn-right").css("background-image", 'url('+o.turnright_image_url+')')

        this.updateToolbar();
        this.logEvent('book_open', this.bookUrl);
    },
    logEvent: function(type, src, data) {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        this.logSingleEvent({"type":type,"src":src,"data":data,"timestamp":timestamp});
        if(type == 'book_close') {  
            // flush events...
            this.flushEventLog();
        }
    },
    logSingleEvent: function(evt) {
        if(this.logger) {
            this.logger(evt)
        }
        this.eventHistory.push(evt);
        if(this.eventUrl) {
            Common.postJsonData(this.eventUrl+".json", evt);
        }
    },
    flushEventLog: function() {
        // TODO odesilat eventy pres AJAX
        console.log(JSON.stringify(this.eventHistory, null, 4));
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.bookContent.get().turn('disable', true);
        if(this.fullscreen) {
            $("#book-wrapper").appendTo($("#fullscreen"));
            $("#container").hide();
            $("#fullscreen").show();            
        } else {
            $("#book-wrapper").appendTo($("#content"));
            $("#container").show();
            $("#fullscreen").hide();

        }
        this.bookContent.get().turn('disable', false);
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    },
    recreate: function() {
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        // kniha je velka 800x560 - pomer stran cca 1:sqrt(2) ~ 1:1.428
        if(this.fullscreen) {
            var ww = $(window).width();
            var hh = $(window).height();
            var scaleFactor = ww/width;
            var scaleFactor2 = hh/height;
            var scale = Math.min(scaleFactor, scaleFactor2);
            width = /*Math.floor(width*scale);*/ww;
            height = /*Math.floor(height*scale);*/hh;
        } 
        // resize wrapper and pages...
        $("#book-wrapper").css({width:width+"px", height:height+"px"});
        if(this.fullscreen) {
            // na okrajich musi zbyt 8% mista; to odpovida 60px 
            var sidex = Math.max(Math.floor(width*0.08), 60);
            var newWidth = width - 2*sidex;
            var newHeight = Math.floor(newWidth/1.428);
            var maxHeight = height-40;
            if(newHeight > maxHeight) {
                newWidth = Math.floor(newWidth*maxHeight/newHeight);
                newHeight = maxHeight;
            }
        } else {
            var newWidth = width - 120;
            var newHeight = height - 40;
        }
        this.bookContent.get().turn('size', newWidth, newHeight);
        return newWidth;
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit
        //this.showIcon('fullscreen-on', !this.fullscreen);
        //this.showIcon('fullscreen-off', this.fullscreen);
        
        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+3*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            //this.tools['fullscreen-on'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            //this.tools['fullscreen-off'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['closebook'].css({top: '16px', width: iconSizeHalf+"px", height: iconSizeHalf+"px"});
            //if(this.bookUrl) this.tools['home'].css({top: '16px', width: iconSize+"px", height: iconSize+"px"});
        }
    }
});

module.exports = BookViewer
