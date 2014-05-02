var fs = require("fs-extra")
var path = require("path")
var merge = require("merge")
var mustache = require("mustache")
var _ = require("underscore")
var cfg = require("./craft.json")

var JsonUtils = require("../../js/util/JsonUtils")

var outDir = path.join(__dirname, 'output')

var daoTpl = fs.readFileSync("templates/dao.js", "utf8")

function capFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var daoName = function(name) {
	return capFirst(name) + "DAO"
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
	var content = mustache.render(daoTpl, {
		name:name,
		description:node.description,
		daoName:dname,
		collectionName: node.entity.collectionName
	})
	fs.writeFileSync(path.join(targetDir, dname+ ".js"), content, "utf8")
}

var craft = function(name, node, options) {
	console.log('Crafting '+name)
	craftManifest(name, node, options)
	craftDAO(name, node, options)

}

/**************************************************/
var webDir = path.join(outDir, 'public')
var jsDir = path.join(webDir, 'js')
var cssDir = path.join(webDir, 'css')
fs.mkdirpSync(webDir)
fs.mkdirpSync(jsDir)
fs.mkdirpSync(cssDir)

var nodes = []
for(var nodeName in cfg.nodes) {
	var node = cfg.nodes[nodeName]
	var opts = merge(cfg.options, node.options)
	craft(nodeName, node, opts)
	nodes.push({name: nodeName, node:node, options:opts})
}

// write out index.html file
var indexTpl = fs.readFileSync("templates/index.html", "utf8")
var out = mustache.render(indexTpl, {
	tabs: _.map(nodes, function(n, i) {
		return {
			index: i+1,
			title: n.node.title,
			name: n.name,
			defaultData: JSON.stringify(n.node.entity.defaults, null, 2),
			schema: JSON.stringify(n.node.entity.schema, null, 2),
			formParams: JSON.stringify(n.node.forms.add, null, 2),
			schemaView: JsonUtils.highlight(n.node.entity.schema),
			defaultsView: JsonUtils.highlight(n.node.entity.defaults)
		}
	})	
})
fs.writeFileSync(path.join(webDir, "index.html"), out, "utf8")