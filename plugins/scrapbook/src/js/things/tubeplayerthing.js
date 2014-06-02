//= require "thing"

$.tubeplayer.defaults.afterReady = function($player) {
    console.log($player)
    // TODO resize only single player
	$(".tubeplayer-wrapper").resize()
}

var TubeplayerThing = Thing.extend({
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
    thumbnailUrl: function() {
        return $.jYoutube(this.options.name, 'small');
    },
    init: function() {
    	this.wrapper = $("<div>").addClass("tubeplayer-wrapper")
        this.glasspane = $("<div>").addClass("tubeplayer-glasspane")        
        var self = this
		self.wrapper.resize(function(e) {
			console.log("Resizing! width="+self.wrapper.width()+", height="+self.wrapper.height())
			self.adjustPlayerSize()
		})        
		console.log("Initialized!")
    },
    play: function() {
        this._play();
    },
    _play: function() {
        this.player.tubeplayer("play")
        this.onPlay();
    },
    _pause: function() {
        this.player.tubeplayer("pause")
        this.onPause();
    },
    _stop: function() {
        this.player.tubeplayer("stop")
        this.onStop();
    },
    _kill: function() {
        this.player.tubeplayer("destroy")
        this.player.remove()
        this.player = null
        this.onKill();
    },
    _setVolume: function(vol) {
        this.player.tubeplayer("volume", vol)
    },
    adjustPlayerSize: function() {
    	var self = this    	
    	console.log("Adjusting player size! width="+self.wrapper.width()+", height="+self.wrapper.height())
        self.player.tubeplayer("size", {
			width: self.wrapper.width(), 
			height: self.wrapper.height()
		})
    },
    refresh: function() {
        this.base();
        if(this.player) {
            //this.player.tubeplayer("destroy")
            this.player.remove()
            this.player = null
        }
        this.player = $("<div>").addClass("tubeplayer-container")
        this.element.html(this.wrapper.empty().append(
            this.player
            // this.glasspane
        ))
        var self = this;
        var o = self.options
		self.player.tubeplayer({
			allowFullScreen: false,
			autoPlay: false,
			showControls: 0,
            initialVideo: o.name,
            preferredQuality: o.quality,
            autoPlay: o.autoplay,
            onPlayerUnstarted: function(){},
			onPlay: function(id){}, // after the play method is called
			onPause: function(){}, // after the pause method is called
			onStop: function(){}, // after the player is stopped
			onSeek: function(time){}, // after the video has been seeked to a defined point
			onMute: function(){}, // after the player is muted
			onUnMute: function(){} // after the player is unmuted
		})		
        // console.log(self.player.tubeplayer("player"))
        self._setVolume(o.volume)
    },
    _klass: "tubeplayer-thing thing",
    _type: "tubeplayer-thing",
    _defaults: {
        "name": "ydRAb9cwHnA",
        'quality': "default",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "name": {
			    "type":"string",
                "format": "string",
			    "required":true
    	    },
		    "quality": {
			    "type":"string",
                "format": "string",
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
