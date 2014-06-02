var Thing = require("./Thing")

var Html = Thing.extend({
    init: function() {
        this.inner = $("<div>");
        this.element.html(this.inner);
    },
    refresh: function() {
        this.base();
        this.inner.html(this.options.html).attr('class',this.options.innerCss);
    },
    _klass: "html thing",
    _type: "html",
    _defaults: {
        html: ""
    },
    _schema: {
       "type":"object",
       "description":"Html properties",
       "properties":{
          "html":{
             "type":"string",
             "required":true
          },
          "css":{
             "type":"string",
             "required":false
          },
          "innerCss":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});

module.exports = Html

