var BorderDecorator = require("./BorderDecorator")

var RoundedDecorator = BorderDecorator.extend({
    refresh: function() {
        this.base();
        var br = this.options.radius;
        // TODO individualne vsechny 4 rohy
        this.element.css('border-radius',br);
        this.element.css('-webkit-border-radius',br);
        this.element.css('-moz-border-radius',br);
    },
    _klass: "rounded-decorator decorator thing",
    _type: "rounded-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black',
        radius: "5%"
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "style":{
             "type":"string",
             "enum": ["none","solid","dotted","dashed","double","groove","ridge","inset","outset"],
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "radius":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = RoundedDecorator

