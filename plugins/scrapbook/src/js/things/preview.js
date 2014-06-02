//= require "decorator"

var Preview = Decorator.extend({
    // options changed...
    refresh: function() {
        this.element.css('width',this.options['width']);
        this.element.css('height',this.options['height']);
    },
    _klass: "preview decorator thing",
    _type: "preview",
    _defaults: {
        'width': '80px',
        'height': '110px',
        'label': 'preview',
        'description': ''
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          },
          "label":{
             "type":"string",
             "required":false
          },
          "description":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }
});

