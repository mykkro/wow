var Thing = require("./Thing")
var Empty = require("./Empty")

var CenteringDecorator = Thing.extend({
    init: function() {
        this.inner = $("<div>").addClass('content-inner').appendTo(
            $("<div>").addClass('center3').appendTo(
                $("<div>").addClass('center2').appendTo(
                    this.element
                )
            )
        );
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.inner.html(value.get());
        return this;
    },
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('text-align',this.options['x-align']);
        this.element.children(".center2").css('vertical-align',this.options['y-align']);
        this.inner.css('width',this.options['content-width']);
        this.inner.css('height',this.options['content-height']);
    },
    _klass: "centering-decorator decorator thing",
    _type: "centering-decorator",
    _defaults: {
        'x-align': "center",
        'y-align': 'center',
        'content-width': '',
        'content-height': ''
    },
    _schema: {
       "type":"object",
       "properties":{
          "x-align":{
             "enum": ["left","center","right"],
             "type":"string",
             "required":true // TODO
          },
          "y-align":{
             "enum": ["top","middle","bottom"],
             "type":"string",
             "required":true // TODO
          },
          "content-width":{
             "type":"string",
             "required":true // TODO
          },
          "content-height":{
             "type":"string",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = CenteringDecorator
