/**
 * Craft the test single-page application.
 *
 */

var fs = require("fs-extra")
var path = require("path")
var merge = require("merge")
var mustache = require("mustache")
var _ = require("underscore")
var escape = require('escape-html');
var JsonUtils = require("../js/util/JsonUtils")

var argv = require('yargs').argv;

console.log(argv)

if(argv._.length != 2) {
	console.log("Usage: "+argv.$0+ " [APPTYPE] [APPNAME]")
}

var appType = argv._[0]
var appName = argv._[1]
var title = argv.title || appName

var srcDir = path.join(__dirname, "appskels", appType)
var outDir = path.join(__dirname, "../test")
var outPath = path.join(outDir, appName)

if(!fs.existsSync(srcDir)) {
	console.error("Unknown application type: "+appType)
	var contents = fs.readdirSync(path.join(__dirname, "appskels"))
	console.log("Available application types:", contents.join(","))
	process.exit(1)
}


if(fs.existsSync(outPath)) {
	console.error("Output directory already exists!")
	process.exit(1)
}

fs.copy(srcDir, outPath, function(err) {
	if(err) {
		console.error(err)
	} else {
		console.log("Directory copied!")
	}
})

// TODO Mustache template substitution 
// - package.json
// - index.html
