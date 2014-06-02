var Thing = require("./Thing")

var Imager = Thing.extend({
    refresh: function() {
        var img = $("<div>")
            .css("background-image",'url("'+this.options.url+'")')
            .css('background-position',this.options['position'])
            .css('background-repeat',this.options['repeat'])
            .css('background-color',this.options['color'])
            .css('background-size',this.options['size'])
            .css('-moz-background-size',this.options['size'])
            .css('-webkit-background-size',this.options['size']);
        this.element.html(img);
    },
    _klass: "imager thing",
    _type: "imager",
    _defaults: {
        "url": "images/demo/australie1.jpg",
        "repeat": "no-repeat",
        "position": "center center",
        "color": "white",
        "size": "cover" 
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "color": {
			    "type":"string",
			    "id": "color",
			    "required":true,
                "format": "color"
		    },
		    "position": {
			    "type":"string",
			    "id": "position",
			    "required":true
		    },
		    "repeat": {
			    "type":"string",
			    "id": "repeat",
			    "required":true
		    },
		    "size": {
			    "type":"string",
			    "id": "size",
                "enum":["cover","contain"],
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "my-image-uri",
			    "required":true
		    }
	    }
    }

});

module.exports = Imager
