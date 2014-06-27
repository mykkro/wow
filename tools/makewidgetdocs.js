var path = require("path")
var fs = require("fs")
var mustache = require("mustache")
var _ = require("lodash")

var wdata = require("../docs/widgets/wowwidgets.json")


var widgetTpl = '<div class="widget-info"><h2>{{title}}</h2><div class="description">{{description}}</div><div class="author">Author: {{author}}</div><div class="version">Version: {{version}}</div><pre class="exampletag">{{tag}}</pre></div>'

var tagTpl = '<wow:{{name}}{{{attrs}}}>{{{contents}}}</wow:{{name}}>'

var processWidget = function(widget) {
	var out = processTag(widget)
	var data = {
		title: widget.title,
		description: widget.description,
		version: widget.version,
		author: widget.author,
		tag: out
	}
	var output = mustache.render(widgetTpl, data);
	console.log(output)
}

var processTag = function(tag) {
	var contentsOutput = ""
	var attrsOutput = ""

	for(var key in tag.attributes) {
		if(key != 'text') {
			var attr = tag.attributes[key]
			var type = attr.type || "string"
			var placeholder = "..."
			var value = attr.default || placeholder
			if(type == "string") value = "\"" + value + "\""
			attrsOutput += " "+ key+"="+value
		}
	}

	if(tag.usesContent == "elements") {
		contentsOutput = " ... put some elements here... "
	} else if(tag.usesContent == "widgets") {
		contentsOutput = " ... put some widgets here... "
	} else if(tag.usesContent == "tags") {
		contentsOutput = " ... put some markup here... "
	} else if(tag.usesContent == "text") {
		contentsOutput = " ... put some text here... "
	}
	return mustache.render(tagTpl, {name:tag.name, attrs: attrsOutput, contents: contentsOutput});

}

/////////////////////////////////////////////////////////
for(var key in wdata) {
	var widget = wdata[key]
	processWidget(widget)
}
