var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")

var VideoThing = Thing.extend({
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
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.video.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.video.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        //this.video.get(0).pause();
        //this.video.get(0).currentTime = 0;
        // regenerate player...
        this.refresh();  // TODO udelat to lepe
        this.onStop();
    },
    _kill: function() {
        this.video.get(0).pause();
        this.video.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.video.get(0).volume = vol / 100.0;
    },
    _addSource: function(uri, type) {
        if(uri) {
            $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.video);
        }
    },
    refresh: function() {
        this.base();
        var self = this;
        this.video = $("<video>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.video)
            .append(this.pane);

        this.video.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg' || ext == 'ogv') ? this.options.uri : '';
            this.options.mp4 = (ext == 'mp4') ? this.options.uri : '';
            this.options.webm = (ext == 'webm') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'video/ogg; codecs="theora, vorbis"');
        this._addSource(this.options.mp4, 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        this._addSource(this.options.webm, 'video/webm; codecs="vp8, vorbis"');
        ////this.video.get(0).src = this.options.uri;
        // TODO tohle nejak zlobi v Chrome, pri znovuvytvareni videi... ale ve FF to zda se funguje

        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
        this.video.on('canplay canplaythrough', function(){
            console.log('canplay event fired');
        });
    },
    _klass: "video-thing thing",
    _type: "video-thing",
    _defaults: {
        "uri": "",
        'ogg': "",
        'mp4': "",
        'webm': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "uri": {
			    "type":"string",
                "format": "my-video-uri",
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
	    }
    }

});


/*

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('vid');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var cw = canvas.clientWidth;
    var ch = canvas.clientHeight;
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context);
    },false);

},false);

var mode = 'stretch';
function draw(v,c) {
    var canvas = document.getElementById('canvas');
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if(v.paused || v.ended) return false;
    if(mode == 'stretch') {
        c.drawImage(v,0,0,w,h); //-> stretch
    } else if(mode == 'cover') {
        // TODO tady je neco spatne
        var sx=0, sy=0, sw=v.width, sh=v.height;
        if(sw/sh < w/h) {
            sy = (sh - h*sw/w)/2;
            sh = h*sw/w;
        } else {
            sx = (sw - w*sh/h)/2;
            sw = w*sh/h;
        }
        c.drawImage(v,sx,sy,sw,sh,0,0,w,h); 
    } else { // contain
        var ww = v.width;
        var hh = v.height;
        var x = y = 0;
        if(ww/hh < w/h) {
            x = (w-ww*h/hh)/2;
            c.drawImage(v,x,0,ww*h/hh,h); 
        } else {
            y = (h-hh*w/ww)/2;
            c.drawImage(v,0,y,w,hh*w/ww); 
        }
    }
    setTimeout(draw,20,v,c);
}

<canvas id="canvas"></canvas>

*/

module.exports = VideoThing
