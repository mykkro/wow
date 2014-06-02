var Layout = require("./Layout")

// TODO vertical split
var SplitLayout = Layout.extend({
    init: function() {
        this.first = $("<div>");
        this.second = $("<div>");
        this.element.append(this.first).append(this.second);
        this.setSlot('first', new Empty());
        this.setSlot('second', new Empty());
    },
    // options changed...
    refresh: function() {
        this.base();
        var first = this.options.ratio + "%";
        var gap = this.options.gap + "%";
        var xx = (this.options.ratio + this.options.gap) + "%";
        var second = (100 - this.options.ratio - this.options.gap) + "%";
        if(this.options.horizontal) {
            this.first.css("left","0px").css("top","0px").css("width",first).css('height','100%');
            this.second.css("left",xx).css("top","0px").css("width",second).css('height','100%');
        } else {
            this.first.css("left","0px").css("top","0px").css("height",first).css('width','100%');
            this.second.css("left","0px").css("top",xx).css("height",second).css('width','100%');
        }
    },
    setSlot: function(key, value) {
        // TODO implement hasSlot
        this.base(key, value);
        if(key=='first') {
            this.first.empty().append(value.get());
        }
        if(key=='second') {
            this.second.empty().append(value.get());
        }
        return this;
    },
    _klass: "split-layout layout thing",
    _type: "split-layout",
    _defaults: {
        ratio: 70, // v %
        gap: 2, // v %
        horizontal: false
    },
    _schema: {
       "type":"object",
       "properties":{
          "horizontal":{
             "type":"boolean",
             "required":true
          },
          "ratio":{
             "type":"integer",
             "required":true
          },
          "gap":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = SplitLayout
