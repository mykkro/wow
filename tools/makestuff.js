/* create entities after clean installation */
/* use fixture files */

var fixtures = [
	{ "type":"admin", "name":"defaultAdmin", "file":"admin.default.json" },
	{ "type":"location", "name":"defaultLocation", "file":"location.vienna.json", "autowire": {"ownerAdminId":"defaultAdmin._id"} }, 
	{ "type":"shortcut", "name":"appsLink", "file":"shortcut.apps.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}}, 
	{ "type":"shortcut", "name":"radioLink", "file":"shortcut.netradio.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}}, 
	{ "type":"shortcut", "name":"youtubeLink", "file":"shortcut.youtubesearch.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"theme", "name":"defaultTheme", "file":"theme.default.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"preset", "name":"defaultPreset", "file":"preset.default.json", "autowire": {"ownerAdminId":"defaultAdmin._id", "themeId": "defaultTheme._id", "button1LinkId": "appsLink._id", "button2LinkId": "radioLink._id", "button3LinkId": "youtubeLink._id"}}, 
	{ "type":"user", "name":"passwordlessUser", "file":"user.withoutpass.json", "autowire": {"ownerAdminId":"defaultAdmin._id", "locationId": "defaultLocation._id", "presetId": "defaultPreset._id"}}, 
	{ "type":"user", "name":"passwordedUser", "file":"user.withpass.json", "autowire": {"ownerAdminId":"defaultAdmin._id", "locationId": "defaultLocation._id", "presetId": "defaultPreset._id"} }
]

var entities = {}

/* load fixture data */
var _ = require("lodash")
var API = require("../lib/api/API")
var Q = require("q")

_.each(fixtures, function(f) {
	f.data = require("./fixtures/"+f.type+"/"+f.file)
	if(f.name) {
		f.data._fixtureName = f.name
	}
})

// TODO rollback fixture creation if somewhere something fails

var autowireData = function(data, aw, ents) {
	for(var key in aw) {
		var tgt = aw[key].split(".")
		var tgtName = tgt[0]
		var tgtVar = tgt[1]
		var value = parseInt(ents[tgtName][tgtVar])
		data[key] = value
	}
	return data
}

var create = function(fixture, entities, next) {
	var data = fixture.data
	if(fixture.autowire) {
		autowireData(data, fixture.autowire, entities)
	}
	API[fixture.type].create(data, function(err, res) {
		if(err) {
			next(err)
		} else {
			var dt = res[0]
			entities[fixture.name] = dt
			next(null, dt)
		}
	})
}


var processItem = function(next) {
	if(fixtures.length) {
		var fix = fixtures.shift()
		create(fix, entities, function(err, dt) {
			if(err) {
				next(err)
			} else {
				processItem(next)
			}
		})
	} else {
		next()
	}
}

/****************************************************************************************************/

// 1. check if we aren't already installed -
// by testing whether we have the default admin in the database...
// 

var doInstall = function(next) {
	var defaultAdminData = require("./fixtures/admin/admin.default.json")
	var username = defaultAdminData.username

	API.admin.findp({username:username}).done(function(admins) {
		if(admins.length>0) {
			// there is already an admin with this username!
			console.log("It seems that the DB entities are already installed!")
			next()
		} else {
			// create the default data...
			console.log("Creating default admin, users and presets...")
			processItem(next)
		}
	})
}


doInstall(function(err, data) {
	if(err) {
		console.error("Error during installation!")
		console.error(err)
	} else {
		console.log("Installation successful!")
	}
})



