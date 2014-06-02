var Thing = require("./Thing")
var Empty = require("./Empty")

var Templated = Thing.extend({
    refresh: function() {
        var tmpl = $.templates( "#"+this.options.template+"Template" );
        var html = tmpl.render(this.options);
        this.element.html(html);
        this.element.find("[data-slot]").each(function() { 
            $(this).html(new Empty().get()); 
        });
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.find("[data-slot='"+key+"']").html(value.get());
        return this;
    },
    _klass: "templated thing",
    _type: "templated",
    _defaults: {
        template: "demo",
        name: "Myrousz"
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "template": {
			    "type":"string",
			    "required":true
		    },
		    "name": {
			    "type":"string",
			    "required":true
		    }
	    }
    }
});

module.exports = Templated
