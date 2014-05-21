var LocationAPI = require("./output/lib/api/LocationAPI")
var lapi = new LocationAPI()
var ShortcutAPI = require("./output/lib/api/ShortcutAPI")
var sapi = new ShortcutAPI()
var PresetAPI = require("./output/lib/api/PresetAPI")
var papi = new PresetAPI()
var ThemeAPI = require("./output/lib/api/ThemeAPI")
var tapi = new ThemeAPI()
var Q = require("q")
var _ = require("lodash")

// TODO ERROR: links are created with same ID!!!

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




