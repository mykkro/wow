// extracts form options from craft.json and install them to entity/forms directory.

var craft = require("./craft.json")

var processNode = function(type, node) { 
	for(var name in node.forms) { processForm(type, name, node.forms[name])} 
}

var processForm = function(type, name, form) { 
	var outfile = type+"."+name+".json"; 
	console.log(outfile); 
	var json = JSON.stringify(form, null, 2); 
	var fs = require("fs"); 
	fs.writeFileSync("../../entity/forms/"+outfile, json, "utf8"); 
}

for(var type in craft.nodes) { 
	processNode(type, craft.nodes[type]) 
}
