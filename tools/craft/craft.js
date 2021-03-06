/**
 * Craft the application skeleton.
 *
 * CLI options:
 * --html	Generate index.html file.
 * --dao 	Generate DAO files.
 * --api 	Generate API.js
 * --rest 	Generate REST.js
 * --apiclasses
 * --templates
 * --css
 * --all	Generate all of the above
 */

// # example usage:
// 
// # generate all for entities preset,video
// node craft.js --all --nodes=video,preset
// 
// # rebuild the GUI with all entities
// node craft.js --html --templat --css --rest --api

var fs = require("fs-extra")
var path = require("path")
var merge = require("merge")
var mustache = require("mustache")
var _ = require("underscore")
var cfg = require("./craft.json")
var escape = require('escape-html');

var JsonUtils = require("../../js/util/JsonUtils")

var outDir = path.join(__dirname, 'output')

var daoTpl = fs.readFileSync("templates/DAO.js", "utf8")
var apiTpl = fs.readFileSync("templates/API.js", "utf8")
var entityApiTpl = fs.readFileSync("templates/EntityAPI.js", "utf8")
var restTpl = fs.readFileSync("templates/REST.js", "utf8")
var cssTpl = fs.readFileSync("templates/nodes.css", "utf8")




function capFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var daoName = function(name) {
	return capFirst(name) + "DAO"
}

var apiName = function(name) {
	return capFirst(name) + "API"
}

var templateName = function(name) {
	return capFirst(name) + "Tpl"
}

var craftManifest = function(name, node, options) {
	var targetDir = path.join(outDir, 'entity')
	fs.mkdirpSync(targetDir)
	fs.writeFileSync(path.join(targetDir, name+".schema.json"), JSON.stringify(node.entity.schema, null, 2), "utf8")
	fs.writeFileSync(path.join(targetDir, name+".defaults.json"), JSON.stringify(node.entity.defaults, null, 2), "utf8")
}

var craftDAO = function(name, node, options) {
	var targetDir = path.join(outDir, 'lib', 'dao')
	fs.mkdirpSync(targetDir)
	var dname = daoName(name)
	var tname = templateName(name)
	var content = mustache.render(daoTpl, {
		name:name,
		description:node.description,
		daoName:dname,
		templateName: tname,
		collectionName: node.entity.collectionName
	})
	fs.writeFileSync(path.join(targetDir, dname+ ".js"), content, "utf8")
}

var craftAPI = function(nodes) {
	var targetDir = path.join(outDir, 'lib', 'api')
	fs.mkdirpSync(targetDir)
	var daos = _.map(nodes, function(n) {
		// console.log(n) 
		return { 
			name: n.name, 
			daoname: daoName(n.name), 
			apiname: apiName(n.name), 
			varname: n.name + "DAO", 
			tplname: templateName(n.name), 
			tplvarname: n.name + "Tpl",
			parentClass: n.node.indexed ? "IndexedNodeAPI" : "NodeAPI",
			opts: JSON.stringify({color:n.node.color})
		}
	})
	var content = mustache.render(apiTpl, {daos: daos})
	fs.writeFileSync(path.join(targetDir, "API.js"), content, "utf8")
	if(argv.apiclasses || argv.all) {
		for(var key in daos) {
			var n = daos[key]
			var content = mustache.render(entityApiTpl, n)
			fs.writeFileSync(path.join(targetDir, apiName(n.name)+".js"), content, "utf8")
		}
	}
}

var craftCSS = function(nodes) {
	var targetDir = path.join(outDir, 'public', 'css')
	fs.mkdirpSync(targetDir)
	var content = mustache.render(cssTpl, {nodes: nodes})
	fs.writeFileSync(path.join(targetDir, "nodes.css"), content, "utf8")
}

var craftREST = function(nodes) {
	var targetDir = path.join(outDir, 'lib', 'api')
	fs.mkdirpSync(targetDir)
	var daos = _.map(nodes, function(n) { 
		return { name: n.name, thumbnail: n.thumbnail }
	})
	var content = mustache.render(restTpl, {daos: daos})
	fs.writeFileSync(path.join(targetDir, "REST.js"), content, "utf8")
}

// TODO process options stored in viewOpts
var craftNodeTemplate = function(name, view, schema, viewOpts) {
	var fields = viewOpts.options.fields
	var props = schema.properties
	//console.log("Craft node template: ", name, view)
	//console.log(fields, props)
	var out = []
	out.push('<!-- Template autogenerated by craft -->')
	out.push('<div class="node node-'+name+'">')
	for(var prop in props) {
		var ppp = props[prop]
		var title = ppp.title || prop
		out.push('<div class="field field-'+prop+'">')
		out.push('<span class="title">'+escape(title)+'</span>')
		out.push('<span class="value">{{'+prop+'}}</span>')
		out.push('</div>')
	}
	out.push("</div>")
	out = out.join("\n")
	var filename = name+"."+view+".html"
	fs.writeFileSync(path.join(templateDir, filename), out, "utf8")	
}

var craftNodeTemplates = function(n) {
	var name = n.node.name
	var schema = n.node.entity.schema
	var views = n.node.views
	for(var view in views) {
		craftNodeTemplate(name, view, schema, views[view])
	}
}

var craftTemplates = function(nodes) {
	_.each(nodes, function(n) {
		craftNodeTemplates(n)
	})
}

var craft = function(name, node, options) {
	console.log('Crafting '+name)
	craftManifest(name, node, options)
	if(argv.dao || argv.all) craftDAO(name, node, options)

}

/**************************************************/
var argv = require('yargs').argv;
// --nodes=preset,audio ... limit crafting only to these nodes
var cls = argv.nodes ? argv.nodes.split(",") : null
if(cls) {
	var out = {}
	_.each(cls, function(c) { out[c] = 1})
	cls = out	
}

var webDir = path.join(outDir, 'public')
var jsDir = path.join(webDir, 'js')
var cssDir = path.join(webDir, 'css')
var uploadDir = path.join(outDir, 'uploads', 'images')
var fileUploadDir = path.join(outDir, 'uploads', 'files')
var fileUploadThumbDir = path.join(outDir, 'uploads', 'files', 'thumbs')
var templateDir = path.join(outDir, 'templates', 'nodes')
fs.mkdirpSync(webDir)
fs.mkdirpSync(jsDir)
fs.mkdirpSync(cssDir)
fs.mkdirpSync(uploadDir)
fs.mkdirpSync(fileUploadDir)
fs.mkdirpSync(fileUploadThumbDir)
fs.mkdirpSync(templateDir)

var nodes = []
for(var nodeName in cfg.nodes) {
	var node = cfg.nodes[nodeName]
	var opts = merge(cfg.options, node.options)
	if(!cls || nodeName in cls) {
		craft(nodeName, node, opts)
		nodes.push({name: nodeName, node:node, options:opts, thumbnail:node.thumbnail})
	}
}

if(argv.api || argv.all) craftAPI(nodes)
if(argv.rest || argv.all) craftREST(nodes)
if(argv.templates || argv.all) craftTemplates(nodes)
if(argv.css || argv.all) craftCSS(nodes)

if(argv.html || argv.all) {
	// write out index.html file
	var indexTpl = fs.readFileSync("templates/index.html", "utf8")
	var out = mustache.render(indexTpl, {
		tabs: _.map(nodes, function(n, i) {
			return {
				index: i+1,
				title: n.node.title,
				name: n.name,
				thumbnail: n.thumbnail,
				defaultData: JSON.stringify(n.node.entity.defaults, null, 2),
				schema: JSON.stringify(n.node.entity.schema, null, 2),
				viewParams: JSON.stringify(n.node.views.default, null, 2),
				formParams: JSON.stringify(n.node.forms.add, null, 2),
				editFormParams: JSON.stringify(n.node.forms.edit || n.node.forms.add, null, 2)
				// schemaView: JsonUtils.highlight(n.node.entity.schema),
				// defaultsView: JsonUtils.highlight(n.node.entity.defaults)
			}
		})	
	})
	fs.writeFileSync(path.join(webDir, "index.html"), out, "utf8")
}
