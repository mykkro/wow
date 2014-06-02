var GrowableLayout = require("./GrowableLayout")

var Book = GrowableLayout.extend({
    currentPage: 0,
    init: function() {
        this.base();
        console.log("Book created")
        console.log(this)
    },
    refresh: function() {
        this.base();
    },
    // TODO tohle se muze zavolat jen pokud jsou stranky uz vlozena do DOMu
    makeDisplay: function() {
        var self = this;
	    // kniha = <div class="mykkro-book> <div class="mykkro-slot"> .. </div>
	    this.element.addClass(this.options.display);
	    switch(this.options.display) {
	      case 'basic':
	        // add page numbers...
	        break;
	      case "turnable":
	        this.element.turn({gradients: true, acceleration: true});
            this.element.bind("start", function(ev, pageObject, corner) { 
                self.onTurnStart(ev, pageObject, corner); })
            this.element.bind("turning", function(ev, page, pageObject) { 
                self.onTurning(ev, page, pageObject); })
            this.element.bind("turned", function(ev, page, view) { 
                self.onTurned(ev, page, view); })
            this.element.bind("end", function(ev, pageObject, turned) { 
                self.onTurnEnd(ev, pageObject, turned); })
	        break;
	    }
    },
    _setPage: function(page) {
        if(!this.currentPage) {
            // page 1 became visible
            this.onPageVisibilityChange(page, true);
        }
        else if(this.currentPage>>1 == page>>1) {
            // je videt porad stejna dvoustrana
        } else {            
            // visibility changed
            var oldPages = 2*(Math.floor(this.currentPage / 2));
            var newPages = 2*(Math.floor(page / 2));
            this.onPageVisibilityChange(oldPages, false);
            this.onPageVisibilityChange(oldPages+1, false);
            this.onPageVisibilityChange(newPages, true);
            this.onPageVisibilityChange(newPages+1, true);
        }
        this.currentPage = page;
        // notifikovat stranky pokud se jejich viditelnost zmenila
        this.onPageChange(page);
    },
    // TODO udelat si na to taky bind funkci
    onPageVisibilityChange: function(page, visible) {
        if(typeof(page)=='function') this._onPageVisibilityChange = page;  
        else {
            // mame takovou stranku?
            var name = page-1;
            if(this.slots[name]) {
                this._updatePageVisibility(page, visible);
                if(this._onPageVisibilityChange) this._onPageVisibilityChange(page, visible);
            }
        }
    },
    _updatePageVisibility: function(page, visible) {
        // pri zviditelneni musim refereshnout vsechny audio-decoratory a video-thingy
        // pri zneviditelneni vypnout jejich playback
        //log("Page: "+page+" visibility: "+visible);
        var name = page-1;
        var thing = this.slots[name];
        var media = [];
        thing.findSlotsByType('audio-decorator', media);
        thing.findSlotsByType('video-thing', media)
        //log(audio.length+","+video.length);
        if(visible) {
            // page became visible...
            for(var i=0; i<media.length; i++) {
                media[i].refresh();
                if(media[i].options['autoplay']) {
                    media[i].play();
                }
            }
        } else {
            // TODO stop only if playing...
            for(var i=0; i<media.length; i++) media[i]._kill();
        }
    },
    onPageChange: function(ev) {
        if(typeof(ev)=='function') this._onPageChange = ev;  
        else {
            if(this._onPageChange) this._onPageChange(ev);
        }
    },
    onInit: function(ev) {
        if(typeof(ev)=='function') this._onInit = ev;  
        else {
            this._setPage(1);
            if(this._onInit) this._onInit();
        }
    },
    onExit: function(ev) {
        if(typeof(ev)=='function') this._onExit = ev;  
        else {
            if(this._onExit) this._onExit();
        }
    },
    onTurnStart: function(ev, pageObject, corner) {
        if(typeof(ev)=='function') this._onTurnStart = ev;  
        else {
            if(this._onTurnStart) this._onTurnStart(ev, pageObject, corner);
        }
    }, 
    onTurning: function(ev, page, pageObject) {
        if(typeof(ev)=='function') this._onTurning = ev;  
        else {
            if(this._onTurning) this._onTurning(ev, page, pageObject);
        }
    }, 
    onTurned: function(ev, page, view) { 
        if(typeof(ev)=='function') this._onTurned = ev;  
        else {
            this._setPage(page);
            if(this._onTurned) this._onTurned(ev, page, view);
        }
    }, 
    onTurnEnd: function(ev, pageObject, turned) { // nefunguje
        if(typeof(ev)=='function') this._onTurnEnd = ev;  
        else {
            if(this._onTurnEnd) this._onTurnEnd(ev, pageObject, corner);
        }
    }, 
    _klass: "book growable-layout layout thing",
    _type: "book",
    _defaults: {
        "title": "My Book",
	    "display": "basic"
    },
    _schema: {
       "type":"object",
       "properties":{
          "title":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = Book
