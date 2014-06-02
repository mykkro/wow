var Thing = require("./Thing")

var RaphaelThing = Thing.extend({
    refresh: function() {
        var o = this.options;
        var div = $("<div>");
        this.element.html(div);
        var paper = Raphael(div.get(0), "100%","100%");
        paper.setViewBox(0, 0, o.width, o.height, true);
        this.canvas = paper;
    },
    _klass: "raphael-thing thing",
    _type: "raphael-thing",
    _defaults: {
        width: 100,
        height: 100
    },
    _schema: {
       "type":"object",
       "description":"RaphaelThing properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RaphaelThing
