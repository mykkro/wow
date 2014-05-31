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

function readJsonFile(path) {
	var json = fs.readFileSync(path, "utf8")
	return JSON.parse(json)	
}

function writeJsonFile(path, data) {
	var json = JSON.stringify(data, null, 2)
	fs.writeFileSync(path, json, "utf8")
}

function pluginCreate(name, opts, next) {
	// 1. determine whether the plugin doesn't already exist
	var pluginsDir = path.join(__dirname, "/plugins")
	var newPluginDir = path.join(pluginsDir, name)
	if (fs.existsSync(newPluginDir)) {
    	// Do something
    	console.error("Plugin already exists!")
    	next(new Error("Plugin already exists!"))
   	} else {
   		var pluginSkeletonDir = path.join(pluginsDir, '.plugin')
   		fs.copy(pluginSkeletonDir, newPluginDir, function (err) {
		  if (err) {
		    next(err);
		  } else {
		  	// create proper metadata files - wowplugin.json and package.json
		  	var wowplugin = readJsonFile(path.join(pluginSkeletonDir, "wowplugin.json"))
		  	var pkg = readJsonFile(path.join(pluginSkeletonDir, "package.json"))
		  	wowplugin.name = name
		  	pkg.name = "wow-plugin-"+name
		  	writeJsonFile(path.join(newPluginDir, "wowplugin.json"), wowplugin)
		  	writeJsonFile(path.join(newPluginDir, "package.json"), pkg)
		  	console.log("Plugin "+name+" created!")
		  	next()
		  }
		});
   	}
}

function pluginInstall(name, opts, next) {
	var pcfg = readJsonFile(pluginsFile)
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
				writeJsonFile(pluginsFile, pcfg)
				next()
			}
		})
	}
}

function pluginUninstall(name, opts, next) {
	var pcfg = readJsonFile(pluginsFile)
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
				writeJsonFile(pluginsFile, pcfg)
				next()
			}
		})
	}
}

function pluginSetEnabled(name, enabled, next) {
	var pcfg = readJsonFile(pluginsFile)
	if(!(name in pcfg.plugins)) {
		console.error("Plugin not installed!")
		next()
	} else {
		// modify plugins file
		pcfg.plugins[name].enabled = enabled
		writeJsonFile(pluginsFile, pcfg)
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
		case "create":
			pluginCreate(name, opts, next)
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