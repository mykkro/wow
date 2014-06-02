var Decorator = require("./Decorator")

var BackgroundDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        if(this.options['image']) 
            this.element.css('background-image','url("'+this.options['image']+'")');
        else 
            this.element.css('background-image','');
        this.element.css('background-position',this.options['position']);
        this.element.css('background-repeat',this.options['repeat']);
        this.element.css('background-color',this.options['color']);
        this.element.css('background-size',this.options['size']);
    },
    _klass: "background-decorator decorator thing",
    _type: "background-decorator",
    _defaults: {
        'image': "",
        'repeat': 'no-repeat',
        'position': 'center center',
        'color': 'white',
        'size': 'cover'
    },
    _schema: {
       "type":"object",
       "properties":{
          "image":{
             "type":"string",
             "format": "my-image-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "repeat":{
             "enum": ["repeat","no-repeat","repeat-x","repeat-y"],
             "type":"string",
             "required":true // TODO
          },
          "position":{
             "type":"string",
             "required":true // TODO
          },
          "size":{
             "type":"string",
             "enum": ["cover","contain"],
             "required":true // TODO
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = BackgroundDecorator

