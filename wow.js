#!/usr/bin/env node
var argv = require('yargs').argv;
var path = require("path")
var fs = require("fs-extra")

var params = argv._

function printUsage() {
	console.log("Usage: ")
	console.log("  wow.js plugin install [name]")
	console.log("  wow.js plugin unnstall [name]")
}

var pluginsFile = path.join(__dirname, "/plugins/plugins.json")

function pluginInstall(name, opts, next) {
	var json = fs.readFileSync(pluginsFile, "utf8")
	var pcfg = JSON.parse(json)
	if(name in pcfg.plugins) {
		console.error("Plugin already installed!")
		next()
	} else {
		// install the plugin
		// we look for plugin cfg file...
		var cfg = require("./plugins/"+name+"/wowplugin.json")
		require("./plugins/"+name+"/scripts/install")(cfg, function(err) {
			if(err) next(err);
			else {
				// modify plugins file
				pcfg.plugins[name] = { "enabled": true }
				var json = JSON.stringify(pcfg, null, 2)
				fs.writeFileSync(pluginsFile, json, "utf8")
				next()
			}
		})
	}
}

function pluginUninstall(name, opts, next) {
	var json = fs.readFileSync(pluginsFile, "utf8")
	var pcfg = JSON.parse(json)
	if(!(name in pcfg.plugins)) {
		console.error("Plugin not installed!")
		next()
	} else {
		// uninstall the plugin
		// we look for plugin cfg file...
		var cfg = require("./plugins/"+name+"/wowplugin.json")
		require("./plugins/"+name+"/scripts/uninstall")(cfg, function(err) {
			if(err) next(err);
			else {
				// modify plugins file
				delete pcfg.plugins[name]
				var json = JSON.stringify(pcfg, null, 2)
				fs.writeFileSync(pluginsFile, json, "utf8")
				next()
			}
		})
	}
}

function pluginSetEnabled(name, enabled, next) {
	var json = fs.readFileSync(pluginsFile, "utf8")
	var pcfg = JSON.parse(json)
	if(!(name in pcfg.plugins)) {
		console.error("Plugin not installed!")
		next()
	} else {
		// modify plugins file
		pcfg.plugins[name].enabled = enabled
		var json = JSON.stringify(pcfg, null, 2)
		fs.writeFileSync(pluginsFile, json, "utf8")
		next()
	}
}

function pluginCommand(params, next) {
	if(params.length != 2) {
		printUsage();
	}
	var cmd = params[0]
	var name = params[1]
	var opts = {}
	switch(cmd) {
		case "install":
			pluginInstall(name, opts, next)
			break;
		case "uninstall":
			pluginUninstall(name, opts, next)
			break;
		case "enable":
			pluginSetEnabled(name, true, next)
			break;
		case "disable":
			pluginSetEnabled(name, false, next)
			break;
		default:
			console.error("Unknown command: "+cmd)
	}
}


/***************************************************************************************************/
if(params.length == 0) {
	printUsage();
}

var cmd = params.shift()

switch(cmd) {
	case "plugin":
		pluginCommand(params, console.log)
		break;
	default:
		console.error("Unknown command: "+cmd)
}