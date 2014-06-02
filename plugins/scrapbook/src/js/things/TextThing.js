var Html = require("./Html")

var TextThing = Html.extend({
    refresh: function() {
        this.base();
        var o = this.options;
        if(o['h-align'] && o['h-align'] != 'center') this.inner.addClass(o['h-align']);
        if(o['v-align'] && o['v-align'] != 'center') this.inner.addClass(o['v-align']);
        this.inner.css('font-size', o['font-size']);
        this.inner.css('font-family', o['font-family']);
    },
    _klass: "text-thing html thing",
    _type: "text-thing",
    _defaults: {
        "html": "",
        "css": "",
        "h-align": "center",
        "v-align": "center",
        "font-size": "20px",
        "font-family": "Georgia, serif"
    },
    _schema: {
       "type":"object",
       "properties":{
          "html":{
             "type":"string",
	     "format":"richtext",
             "required":true
          },
          "h-align":{
             "type":"string",
             "enum":["left","center","right"],
             "required":false
          },
          "v-align":{
             "type":"string",
             "enum":["top","center","bottom"],
             "required":false
          },
          "font-size":{
             "type":"string",
             "enum":["50%","60%","75%", "85%", "100%", "120%", "150%", "175%", "200%", "250%"],
             "required":false
          },
          "font-family":{
             "type":"string",
             "enum":[
'Arial,Arial,Helvetica,sans-serif',
'Arial Black,Arial Black,Gadget,sans-serif',
'Comic Sans MS,Comic Sans MS,cursive',
'Courier New,Courier New,Courier,monospace',
'Georgia,Georgia,serif',
'Impact,Charcoal,sans-serif',
'Lucida Console,Monaco,monospace',
'Lucida Sans Unicode,Lucida Grande,sans-serif',
'Palatino Linotype,Book Antiqua,Palatino,serif',
'Tahoma,Geneva,sans-serif',
'Times New Roman,Times,serif',
'Trebuchet MS,Helvetica,sans-serif',
'Verdana,Geneva,sans-serif' 
],
             /*"format":"font",*/
             "required":false
          }
       },
       "additionalProperties":true
    }
});


module.exports = TextThing