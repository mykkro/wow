var Decorator = require("./Decorator")

var Page = Decorator.extend({
    // options changed...
    refresh: function() {
        this.element.css({
          'width': this.options['width'],
          'height': this.options['height'],
          'background-size': 'cover',
          'background-image': 'url('+this.options['background_url']+')'
        })
    },
    _klass: "page decorator thing",
    _type: "page",
    _defaults: {
        'width': '500px',
        'height': '700px',
        'background_url': ''
    },
    _schema: {
       "type":"object",
       "description":"Page properties",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = Page