var Decorator = require("./Decorator")

var InsetDecorator = Decorator.extend({
    refresh: function() {
	this.base();
        this.element.css('padding',this.options.top+'% '+this.options.right+"% "+this.options.bottom+"% "+this.options.left+"%");
    },
    _klass: "inset-decorator decorator thing",
    _type: "inset-decorator",
    _defaults: {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
    },
    _schema: {
	"type":"object",
	"$schema": "http://json-schema.org/draft-03/schema",
	"properties":{
		"bottom": {
			"type":"number",
			"id": "bottom",
			"required":true
		},
		"left": {
			"type":"number",
			"id": "left",
			"required":true
		},
		"right": {
			"type":"number",
			"id": "right",
			"required":true
		},
		"top": {
			"type":"number",
			"id": "top",
			"required":true
		}
	},
       "additionalProperties":true
    }

});


module.exports = InsetDecorator