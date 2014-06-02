var Thing = require("./Thing")

var PlayerControls = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    init: function() {
        var self = this;
        var cont = $("<div>").addClass('controls').appendTo(this.element);
        this._playBtn = $("<button>")
            .addClass("play").append($("<span>").text("Play"))
            .appendTo(cont).click(function() { self.onPlay(); });
        this._pauseBtn = $("<button>")
            .addClass("pause").append($("<span>").text("Pause"))
            .appendTo(cont).click(function() { self.onPause(); });
        this._stopBtn = $("<button>")
            .addClass("stop").append($("<span>").text("Stop"))
            .appendTo(cont).click(function() { self.onStop(); });
        this.controls = cont;
        this.playing = false;
        this.paused = false;
    },
    refresh: function() {
        this.base();
        this.controls.toggleClass('playing', this.playing);
        this._playBtn.prop('disabled', this.playing);
        this._pauseBtn.prop('disabled', !this.playing);
        this._stopBtn.prop('disabled', !(this.playing/* || this.paused*/));    
        if(this.playing) {
            this._playBtn.hide();
            this._pauseBtn.show();
        } else {
            this._playBtn.show();
            this._pauseBtn.hide();
        }        
        if(this.playing/* || this.paused*/) {
            this._stopBtn.show();
        } else {
            this._stopBtn.hide();
        }
    },
    updateGui: function(playing, paused) {
        this.playing = playing;
        this.paused = paused;
        this.refresh();
    },
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this.updateGui(true, false);
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this.updateGui(false, true);
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this.updateGui(false, false);
            this._onstop(kb);
        }
    },
    _klass: "player-controls thing",
    _type: "player-controls",
    _defaults: {
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
	    }
    }
});

module.exports = PlayerControls
