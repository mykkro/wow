//= require "thing"

var SoftKeyboard = Thing.extend({
    init: function() {
        this.keys = {};
        this.onkeypress = $.noop;
    },
    refresh: function() {
        var kbd = $("<div>");
        var rows = this.options.rows;
        var cols = this.options.rows;
        for(var key in this.options.keys) {
            var k = this.options.keys[key];
            var kk = this._makeKey(key, k).appendTo(kbd);
            this.keys[key] = kk;
        }
        this.element.html(kbd);
    },
    getKeyButton: function(key) {
        return {"name":key, "button":this.keys[key], "key":this.options.keys[key]};
    },
    _makeKey: function(name, k) {
        var self = this;
        var o = this.options;
        var top = Math.floor(100*k.top/o.rows) + "%";
        var left = Math.floor(100*k.left/o.columns) + "%";
        var ww = k.size || k.width;
        var hh = k.size || k.height;
        var mm = 2;
        var width = Math.floor(100*ww/o.columns) + "%";
        var height = Math.floor(100*hh/o.rows) + "%";
        var div = $("<button>").addClass("key key-"+name).css({'top':top, 'left':left, 'width':width, 'height':height}).append($("<div>").text(k.label));
        div.click(function() {
            if(k['switch']) {
                div.toggleClass("active");
            }
            self.keyPressed(self.getKeyButton(name));
        });
        return div;
    },
    keyPressed: function(kb) {
        if(typeof kb == 'function') {
            this.onkeypress = kb;
        } else {
            this.onkeypress(kb);
        }
    },
    getSwitchState: function(name) {
        if(this.options.keys[name] && this.options.keys[name]['switch']) {
            return this.keys[name].hasClass("active");
        } else {
            return false;
        }
    },    
    _klass: "soft-keyboard thing",
    _type: "soft-keyboard",
    _defaults: {
        "rows": 8,
        "columns": 20,
        "keys": {
            "q" : { "left":0, "top":0, "size":2, "label":"Q"},
            "w" : { "left":2, "top":0, "size":2, "label":"W"},
            "e" : { "left":4, "top":0, "size":2, "label":"E"},
            "r" : { "left":6, "top":0, "size":2, "label":"R"},
            "t" : { "left":8, "top":0, "size":2, "label":"T"},
            "y" : { "left":10, "top":0, "size":2, "label":"Y"},
            "u" : { "left":12, "top":0, "size":2, "label":"U"},
            "i" : { "left":14, "top":0, "size":2, "label":"I"},
            "o" : { "left":16, "top":0, "size":2, "label":"O"},
            "p" : { "left":18, "top":0, "size":2, "label":"P"},
            "a" : { "left":1, "top":2, "size":2, "label":"A"},
            "s" : { "left":3, "top":2, "size":2, "label":"S"},
            "d" : { "left":5, "top":2, "size":2, "label":"D"},
            "f" : { "left":7, "top":2, "size":2, "label":"F"},
            "g" : { "left":9, "top":2, "size":2, "label":"G"},
            "h" : { "left":11, "top":2, "size":2, "label":"H"},
            "j" : { "left":13, "top":2, "size":2, "label":"J"},
            "k" : { "left":15, "top":2, "size":2, "label":"K"},
            "l" : { "left":17, "top":2, "size":2, "label":"L"},
            "caps" : { "left":0, "top":4, "width":3, "height":2, "label":__("caps"), "switch":true},
            "z" : { "left":3, "top":4, "size":2, "label":"Z"},
            "x" : { "left":5, "top":4, "size":2, "label":"X"},
            "c" : { "left":7, "top":4, "size":2, "label":"C"},
            "v" : { "left":9, "top":4, "size":2, "label":"V"},
            "b" : { "left":11, "top":4, "size":2, "label":"B"},
            "n" : { "left":13, "top":4, "size":2, "label":"N"},
            "m" : { "left":15, "top":4, "size":2, "label":"M"},
            "del" : { "left":17, "top":4, "width":3, "height":2, "label":__("del")},
            "nums" : { "left":0, "top":6, "width":4, "height":2, "label":__("?123")},
            "comma" : { "left":4, "top":6, "width":3, "height":2, "label":","},
            "space" : { "left":7, "top":6, "width":6, "height":2, "label":__("space")},
            "dot" : { "left":13, "top":6, "width":3, "height":2, "label":"."},
            "enter" : { "left":16, "top":6, "width":4, "height":2, "label":__("enter")}
        }
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "rows": {
			    "type":"integer",
			    "required":true
		    },
		    "columns": {
			    "type":"integer",
			    "required":true
		    }
	    }
    }
});

