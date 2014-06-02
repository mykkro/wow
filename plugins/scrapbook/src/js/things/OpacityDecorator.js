var Decorator = require("./Decorator")

var OpacityDecorator = Decorator.extend({
    refresh: function() {
      this.base();
      this.element.css('opacity',this.options.opacity);
    },
    _klass: "opacity-decorator decorator thing",
    _type: "opacity-decorator",
    _defaults: {
        opacity: 0.8
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "opacity":{
             "type":"number",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = OpacityDecorator