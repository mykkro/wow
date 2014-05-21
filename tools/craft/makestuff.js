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
// // TODO this creates links with the same ID!
var link1 = sapi.createp({title:"Books", uri:"/pages/bookcategories"})
var link2 = sapi.createp({title:"Radio", uri:"/pages/netradio"})
var link3 = sapi.createp({title:"Apps", uri:"/pages/apps"})
var link4 = sapi.createp({title:"YouTube", uri:"/pages/searchvideos"})

// TODO I need those to execute in sequence
var links = Q.all([link1, link2, link3, link4])


Q.all([loc, theme, links]).done(function(data) {
	console.log(data)
	var ll = data[0][0]
	var theme = data[1][0]
	var links = _.map(data[2], function(x) { return x[0] })
	console.log(ll, theme, links)
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

