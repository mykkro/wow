/* create entities after clean installation */
/* use fixture files */

var fixtures = [
	{ "type":"admin", "name":"defaultAdmin", "file":"admin.default.json" },
	{ "type":"location", "name":"defaultLocation", "file":"location.vienna.json", "autowire": {"ownerAdminId":"defaultAdmin._id"} }, 
	{ "type":"shortcut", "name":"homepageLink", "file":"shortcut.homepage.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"shortcut", "name":"appsLink", "file":"shortcut.apps.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}}, 
	{ "type":"shortcut", "name":"radioLink", "file":"shortcut.netradio.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}}, 
	{ "type":"shortcut", "name":"pianoLink", "file":"shortcut.piano.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"shortcut", "name":"youtubeLink", "file":"shortcut.youtubesearch.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"shortcut", "name":"youtubePersLink", "file":"shortcut.youtubepersonal.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"shortcut", "name":"youtubeFavLink", "file":"shortcut.youtubefavorite.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"shortcut", "name":"shortcutsLink", "file":"shortcut.shortcuts.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio1", "file": "netRadio.antenne1.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio2", "file": "netRadio.klassik.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio3", "file": "netRadio.kronhit.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio4", "file": "netRadio.ostseewelle.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio5", "file": "netRadio.radio21.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio6", "file": "netRadio.radioffn.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio7", "file": "netRadio.sport1.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
	{ "type":"netRadio", "name": "radio8", "file": "netRadio.zusa.json", "autowire": {"ownerAdminId":"defaultAdmin._id"}},
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
var Storage = require("../lib/Storage")

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

// check if we aren't already installed -
// by testing whether we have the default admin in the database...

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


// exported function
module.exports = function(err, next) {
	Storage.init(function() {
		doInstall(function(err, data) {
			if(err) {
				console.error("Error during installation!")
				if(next) next(err)
			} else {
				console.log("Installation successful!")
				if(next) next()
			}
		})
	})
}


