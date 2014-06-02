//= require "thing"

var SvgEditor = Thing.extend({
    change: function(arg) {
        if(typeof arg == 'function') {
            this.onchange = arg;
        } else {
            this.onchange(arg);
        }
    },
    init: function() {
        var self = this;
        self.onchange = $.noop;
        self.frame = $('<iframe src="'+baseUrl+'testing/svgedit">').attr('width',self.options.width).attr('height', self.options.height);
        self.frame.ready(function() {
            // http://code.google.com/p/svg-edit/wiki/TipsAndTricks
            // waiting for real load
            (function(){
                try {
                    var cw = self.frame[0].contentWindow;
                    var md = cw.methodDraw;
                    md.ready(function() {     
                        cw.svgCanvas.setSvgString(self.options.svg);
                    });        
                    md.addExtension("server_opensave", {
                        callback: function() {
                            md.setCustomHandlers({
	                            save: function(win, data) {
		                            self.options.svg = data;
                                    self.onchange(data);
	                            }
                            });
                        }
                    });
                }
                catch (Ex){
                    setTimeout(arguments.callee, 1000);
                }
            })();
        });
        self.frame.appendTo(self.element);
    },
    refresh: function() {
        this.base();
    },
    _klass: "svg-editor thing",
    _type: "svg-editor",
    _defaults: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100"></svg>',
        width: "800px",
        height: "600px"
    },
    _schema: {
       "type":"object",
       "description":"SvgEditor properties",
       "properties":{
          "svg":{
             "type":"string",
             "required":true
          },
          "width":{
             "type":"string",
             "required":false
          },
          "height":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});

