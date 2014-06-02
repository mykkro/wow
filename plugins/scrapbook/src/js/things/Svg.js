var Thing = require("./Thing")

var Svg = Thing.extend({
    init: function() {
    },
    refresh: function() {
        this.base();
        this.element.html(this.options.svg);
    },
    _klass: "svg thing",
    _type: "svg",
    _defaults: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'
    },
    _schema: {
       "type":"object",
       "description":"Svg properties",
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


module.exports = Svg