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

console.log(fixtures)

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
			console.log("Created: ", dt)
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
		next(null, "All fixtures created!")
	}
}

processItem(console.log)


/*
var loc = {
	title: "Vienna",
	description: "Vienna",
	latitude: 48.15,
	longitude: 16.22
}

// create a Location object
var loc = lapi.createp(loc)

var theme = {
	title: "Default theme",
	backgroundUri: "/assets/backgrounds/default.svg",
	options: {}
}

var theme = tapi.createp(theme)

// create some links
var lll = []
sapi.createp({title:"Books", uri:"/pages/bookcategories"}).done(function(l1) {
	lll.push(l1[0])
	sapi.createp({title:"Radio", uri:"/pages/netradio"}).done(function(l2) {
		lll.push(l2[0])
		sapi.createp({title:"Apps", uri:"/pages/apps"}).done(function(l3) {
			lll.push(l3[0])
			sapi.createp({title:"YouTube", uri:"/pages/searchvideos"}).done(function(l4) {
				lll.push(l4[0])

				Q.all([loc, theme]).done(function(data) {
					console.log(data)
					var ll = data[0][0]
					var theme = data[1][0]
					var links = lll
					// create a preset... it has links!
					var preset = {
						title: "Default preset",
						"button1LinkId": parseInt(links[0]._id),
						"button2LinkId": parseInt(links[1]._id),
						"button3LinkId": parseInt(links[2]._id),
						"themeId": parseInt(theme._id)
					}
					papi.createp(preset).done(console.log)
				})


			})
		})
	})
})

*/


