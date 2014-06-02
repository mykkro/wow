var GrowableLayout = require("./GrowableLayout")

var SwitchLayout = GrowableLayout.extend({
    refresh: function() {
        this.base();
        var index = parseInt(this.options.index)+1;
        this.element.children().hide();
        this.element.find("div:nth-child("+index+")").show();
    },
    setIndex: function(ndx) {
        this.options.index = ndx;
        this.refresh();
    },
    add: function(thing) {
        var slot = this.base(thing);
        this.refresh();
        return slot;
    },
    _klass: "switch-layout growable-layout layout thing",
    _type: "switch-layout",
    _defaults: {
        "css": "", //"mykkro-flow-layout"
        index: 0
    },
    _schema: {
       "type":"object",
       "properties":{
          "css":{
             "type":"string",
             "required":false
          },
          "index":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = SwitchLayout