var Thing = require("./Thing")

var CanvasThing = Thing.extend({
    init: function() {
        var o = this.options;
        var self = this;
        this.canvas = $("<canvas>").appendTo(this.element).attr({width:o.width, height:o.height});
        // pouziva CSS transformaci, rastr je porad stejne velky
        if(o.autoscale) {
            this.element.resize(function() {
                var el = $(this);
                var o = self.options;
                var zoom = Math.min(el.width()/o.width, el.height()/o.height);
                el.css({
                    "-moz-transform": "scale("+zoom+")", 
                    "-webkit-transform": "scale("+zoom+")", 
                    "-moz-transform-origin":"0px 0px", 
                    "-webkit-transform-origin":"0px 0px"
                });
            });
        }
        // zvetsuje fyzicky pocet pixelu rastru
        if(o.autoresize) {
            this.element.resize(function() {
                var el = $(this);
                var ww = el.width();
                var hh = el.height();
                if(o.keepaspectratio) { var asp = o.width/o.height; if(ww/hh > asp) ww = hh*asp; else hh = ww/asp; }
                self.canvas.attr({
                    "width": ww, 
                    "height": hh
                });
                self.refresh();
            });
            var el = this.element;
            var ww = el.width();
            var hh = el.height();
            if(o.keepaspectratio) { var asp = o.width/o.height; if(ww/hh > asp) ww = hh*asp; else hh = ww/asp; }
            this.canvas.attr({
                "width": ww, 
                "height": hh
            });            
        }
    },
    refresh: function() {
        var context = this.canvas.get(0).getContext('2d');
        if (context) {
            this.draw(context, this.canvas.width() || this.options.width, this.canvas.height() || this.options.height);
        }
    },
    draw: function(g, w, h) {
        /* by default, draws only rectangle... */
        g.strokeRect(0,  0, w, h);
    },
    _klass: "canvas-thing thing",
    _type: "canvas-thing",
    _defaults: {
        width: 100,
        height: 100,
        autoscale: false,
        autoresize: true,
        keepaspectratio: true
    },
    _schema: {
       "type":"object",
       "description":"CanvasThing properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "autoscale":{
             "type":"boolean",
             "required":false
          }
       },
       "additionalProperties":true
    }

});

module.exports = CanvasThing