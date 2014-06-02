var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")
var Empty = require("./Empty")

var AudioDecorator = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    init: function() {
        this.slot = $("<div>").addClass("slot");
        this.setSlot('content', new Empty());
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.audio.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.audio.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        // regenerate player...
        this.refresh();
        this.onStop();
    },
    _kill: function() {
        this.audio.get(0).pause();
        this.audio.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.audio.get(0).volume = vol / 100.0;
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.slot.html(value.get());
        return this;
    },
    _addSource: function(uri, type) {
        if(uri) $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.audio);
    },
    refresh: function() {
        this.base();
        var self = this;
        this.audio = $("<audio>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.slot)
            .append(this.pane)
            .append(this.audio);

        // incorrect... and unnecessary: this.audio.remove("source");
        this.audio.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg') ? this.options.uri : '';
            this.options.mp3 = (ext == 'mp3') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'audio/ogg; codecs="vorbis"');
        this._addSource(this.options.mp3, 'audio/mpeg; codecs="mp3"');
        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
    },
    _klass: "audio-decorator decorator thing",
    _type: "audio-decorator",
    _defaults: {
        'ogg': "",
        'mp3': "",
        'uri': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
       "type":"object",
       "properties":{
          "uri":{
             "type":"string",
             "format": "my-voice-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "volume":{
             "type":"integer",
             "required":true // TODO
          },
          "autoplay":{
             "type":"boolean",
             "required":true // TODO
          },
          "loop":{
             "type":"boolean",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});


module.exports = AudioDecorator