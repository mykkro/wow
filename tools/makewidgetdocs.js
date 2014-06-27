var path = require("path")
var fs = require("fs")
var mustache = require("mustache")
var _ = require("lodash")

var wdata = require("../docs/widgets/wowwidgets.json")


var loadTpl = function(name) {
	return fs.readFileSync("templates/widget-docs/"+name+".mustache", "utf8")
}

var widgetTpl = loadTpl("widget")
var tagTpl = loadTpl("tag")
var attrTpl = loadTpl("attribute")
var headerTpl = loadTpl("header")
var footerTpl = loadTpl("footer")

var processHeader = function() {
	return  mustache.render(headerTpl, {});
}

var processFooter = function() {
	return  mustache.render(footerTpl, {});
}

var processWidget = function(widget) {
	var out = processTag(widget)
	var attrs = processAttrs(widget.attributes)
	var data = {
		title: widget.title,
		description: widget.description,
		version: widget.version,
		author: widget.author,
		tag: out,
		attrs: attrs
	}
	return mustache.render(widgetTpl, data);
}

var processAttrs = function(attrs) {
	var out = []
	for(var key in attrs) {
		out.push(processAttr(key, attrs[key]))
	}
	return out.join("")
}

var processAttr = function(key, attr) {
	var type = attr.type || 'string'
	var data = {
		name: key,
		title: attr.title,
		description: attr.description,
		type: type,
		required: attr.required,
		isrequired: attr.required ? " required" : "",
		default: attr.default
	}
	return mustache.render(attrTpl, data);
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
var out = []
out.push(processHeader())
out.push('<div class="widgets-info">')
for(var key in wdata) {
	var widget = wdata[key]
	out.push(processWidget(widget))
}
out.push('</div>')
out.push(processFooter())

out = out.join("\n")
console.log(out)

fs.writeFileSync("../docs/widgets/widgetdocs.html", out, "utf8")
