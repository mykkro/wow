var Decorator = require("./Decorator")

// TODO sloucit nejak s rounded decoratorem
var BorderDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('border-width', this.options['width']);
        this.element.css('border-style',this.options['style']);
        this.element.css('border-color',this.options['color']);
    },
    _klass: "border-decorator decorator thing",
    _type: "border-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black'
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
          }
       },
       "additionalProperties":true
    }
});

module.exports = BorderDecorator
