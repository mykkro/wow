var Decorator = require("./Decorator")

var ShadowDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
	this.base();
        var br = this.options['h-shadow']+" "+this.options['v-shadow']+" "+this.options.blur+" "+this.options.spread+" "+this.options.color;
        this.element.css('box-shadow',br);
        this.element.css('-webkit-box-shadow',br);
    },
    _klass: "shadow-decorator decorator thing",
    _type: "shadow-decorator",
    _defaults: {
        'h-shadow': "5px",
        'v-shadow': "5px",
        blur: "5px",
        spread: "5px",
        color: "#666"
    },
    _schema: {
       "type":"object",
       "properties":{
          "h-shadow":{
             "type":"string",
             "required":true
          },
          "v-shadow":{
             "type":"string",
             "required":true
          },
          "blur":{
             "type":"string",
             "required":true
          },
          "spread":{
             "type":"string",
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = ShadowDecorator

