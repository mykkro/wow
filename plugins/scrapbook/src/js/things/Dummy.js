var Html = require("./Html")

var Dummy = Html.extend({
    refresh: function() {
        this.base();
        this.element.css('width', this.options['width']);
        this.element.css('height',this.options['height']);
        this.element.css('color',this.options['color']);
        this.element.css('background-color',this.options['background-color']);
    },
    _klass: "dummy html thing",
    _type: "dummy",
    _defaults: {
        html: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim et est porttitor semper at vitae augue. Proin at nulla at dui mattis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem convallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare, tellus est consequat nunc, quis blandit elit odio eu arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidunt orci id commodo. Aliquam non magna quis tortor malesuada aliquam eget ut lacus. Nam ut vestibulum est. Praesent volutpat tellus in eros dapibus elementum. Nam laoreet risus non nulla mollis ac luctus felis dapibus. Pellentesque mattis elementum augue non sollicitudin. Nullam lobortis fermentum elit ac mollis. Nam ac varius risus. Cras faucibus euismod nulla, ac auctor diam rutrum sit amet. Nulla vel odio erat, ac mattis enim.",
        'width': "",
        'height': '',
        'color': '',
        'background-color': ''
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "height":{
             "type":"string",
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "background-color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = Dummy