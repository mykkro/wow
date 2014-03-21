var Overlay = require("./overlay")
var _ = require("underscore")
var Base = require("basejs")
var SelectChain = require("./selectchain")($, Base)


var SoftwareKeyboard = Overlay.extend({
	constructor: function(Wow, options) {
		options = options || {}
		options.cssClass = "softwarekeyboard"
		options.transparent = false
		this.base(Wow, options)

		this.selectChain = new SelectChain()
		this.useLayout("Deutsch")		
	},
	useLayout: function(layoutName) {
		var layout = SoftwareKeyboard.layouts[layoutName]
		if(!layout) {
			throw "Undefined keyboard layout: "+layoutName
		} else {
			this.drawKeyboard(layout)
		}
	},
	drawKeyboard: function(layout) {
		var self = this
		var grp = this.paper.group()
		var rect = grp.rect(960, 600)
		var keys = []
		// layout is array of rows (lines)
		var x = 0
		var y = 0
		var w = 1
		var h = 1
		var a = 6
		var f = 6
		var t = "#333"
		var c = "#fff"
		var x2 = 0
		var y2 = 0
		var w2 = 0
		var h2 = 0
		var ndx = 1
		var backcolor = "#eeeeee"
		self.keys = []
		_.each(layout, function(row, i) {
			x = 0
			if(!(row instanceof Array)) {
				backcolor = row.backcolor
			} else {
				_.each(row, function(key, j) {
					if(typeof(key)=="string") {
						// create a key...
						var keyid = "key"+(ndx++)
						self.keys[keyid] = self.drawKey(grp, keyid, key, {x:x, y:y, w:w, h:h, c:c, t:t, a:a, f:f, x2:x2, y2:y2, w2:w2, h2:h2})
						self.selectChain.append(self.keys[keyid].element)
						x += w
						w = 1
						h = 1
						w2 = 0
						h2 = 0
						x2 = 0
						y2 = 0
					} else {
						// object data - set for next key...
						if(key.w) w = key.w
						if(key.h) h = key.h
						if(key.x) x += key.x
						if(key.y) y += key.y
						if(key.f) f = key.f
						if(key.a) a = key.a
						if(key.c) c = key.c
						if(key.t) t = key.t
						if(key.x2) x2 = key.x2
						if(key.y2) y2 = key.y2
						if(key.h2) h2 = key.h2
						if(key.w2) w2 = key.w2
					}

				})
			}
			y++
		}) 
		rect.attr("fill", backcolor)
		this.selectChain.update()
		return grp
	},
	drawKey: function(root, keyid, label, opts) {
		var size = 50
		var gap = 10
		var grp = root.group()
		var ww = opts.w*size+(opts.w-1)*gap
		var hh = opts.h*size+(opts.h-1)*gap
		grp.rect(ww, hh).attr({
			"class": "key",
			"rx": 10,
			"ry": 10,
			"fill": opts.c
		})
		if(opts.h2 && opts.w2) {
			var ww2 = opts.w2*size+(opts.w2-1)*gap
			var hh2 = opts.h2*size+(opts.h2-1)*gap
			var xx2 = opts.x2*size+(opts.x2)*gap
			var yy2 = opts.y2*size+(opts.y2)*gap
			grp.rect(ww2, hh2).attr({
				"class": "key",
				"rx": 10,
				"ry": 10,
				"fill": opts.c
			}).move(xx2, yy2)
		}
		var lines = label.split("\n")
		lines = _.filter(lines, function(e) { return e.trim()!=""; })
		if(lines.length>0) {
			grp.text(lines[0]).attr({
				"class": "label",
				"fill": opts.t,
				"font-size": Math.round(opts.f*2.5),
				"text-anchor": "middle"
			}).x((ww-gap)/2).y((hh-gap)*0.2)
			if(lines.length>=2) {
				grp.text(lines[1]).attr({
					"class": "label",
					"fill": opts.t,
					"font-size": Math.round(opts.a*2.5),
					"text-anchor": "middle"
				}).x((ww-gap)/2).y((hh-gap)*0.7)
			}
		}
		grp.attr("data-keyid", keyid)
		grp.move((size+gap)*opts.x, (size+gap)*opts.y)
		return $.extend(opts, {
			svg: grp,
			element: grp.node,
			label: label
		})
	},
	init: function(data, next) {
		this.base(data, next)
	},
	getSelectedKey: function() {
		var keyElement = this.selectChain.current()
		return this.keys[$(keyElement).data("keyid")]
	},
	onClosed: function(text) {
		// this is called after the keyboard is closed
	},
	onTextEntered: function(text) {

	},
	onVirtualControl: function(evt) {
		var self = this
		switch(evt.control) {
			case "left":
				break;
			case "right":
				break;
			case "home":
				// works like escape key
				this.onClosed()
				break;
			case "up":
				this.selectChain.selectPrevious()
				break;
			case "down":
				this.selectChain.selectNext()
				break;
			case "select":
				var key = this.getSelectedKey()
				alert(key.label)
//				this.activateSelected()
				break;
		}
	}

}, {
	layouts: {
		// let's use layouts from http://www.keyboard-layout-editor.com/
		"Numeric": [
			["Num Lock","/","*","-"],
			["7\nHome","8\n↑","9\nPgUp",{h:2},"+"],
			["4\n←","5","6\n→"],
			["1\nEnd","2\n↓","3\nPgDn",{h:2},"Enter"],
			[{w:2},"0\nIns",".\nDel"]],
		"ANSI 104" : [
			["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12",{"x":0.5},"PrtSc","Scroll Lock","Pause\nBreak"],
			[{"y":0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{"w":2},"Backspace",{"x":0.5},"Insert","Home","PgUp",{"x":0.5},"Num Lock","/","*","-"],
			[{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5},"|\n\\",{"x":0.5},"Delete","End","PgDn",{"x":0.5},"7\nHome","8\n↑","9\nPgUp",{"h":2},"+"],
			[{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"w":2.25},"Enter",{"x":4},"4\n←","5","6\n→"],
			[{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift",{"x":1.5},"↑",{"x":1.5},"1\nEnd","2\n↓","3\nPgDn",{"h":2},"Enter"],
			[{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.5},"←","↓","→",{"x":0.5,"w":2},"0\nIns",".\nDel"]
		],
		"ANSI 104 (big-ass enter)" : [
			["Esc",{"x":1},"F1","F2","F3","F4",{"x":0.5},"F5","F6","F7","F8",{"x":0.5},"F9","F10","F11","F12",{"x":0.5},"PrtSc","Scroll Lock","Pause\nBreak"],
			[{"y":0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=","|\n\\","Back Space",{"x":0.5},"Insert","Home","PgUp",{"x":0.5},"Num Lock","/","*","-"],
			[{"w":1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{"w":1.5,"h":2,"w2":2.25,"h2":1,"x2":-0.75,"y2":1},"Enter",{"x":0.5},"Delete","End","PgDn",{"x":0.5},"7\nHome","8\n↑","9\nPgUp",{"h":2},"+"],
			[{"w":1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{"x":6.25},"4\n←","5","6\n→"],
			[{"w":2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{"w":2.75},"Shift",{"x":1.5},"↑",{"x":1.5},"1\nEnd","2\n↓","3\nPgDn",{"h":2},"Enter"],
			[{"w":1.25},"Ctrl",{"w":1.25},"Win",{"w":1.25},"Alt",{"w":6.25},"",{"w":1.25},"Alt",{"w":1.25},"Win",{"w":1.25},"Menu",{"w":1.25},"Ctrl",{"x":0.5},"←","↓","→",{"x":0.5,"w":2},"0\nIns",".\nDel"]
		],

		"cs": {

		},
		"cs-qwerty": {

		},
		"Dark": [
			{backcolor:"#222222"},
			[{c:"#7b9b48",t:"#e4dedd",p:"DSA",a:7,f:4},"ESC",{x:1,c:"#483527",f:3},"F1","F2","F3","F4",{x:0.5,c:"#733636"},"F5","F6","F7","F8",{x:0.5,c:"#483527"},"F9","F10","F11","F12",{x:0.5,c:"#733636"},"PRINT",{f:2},"SCROLL LOCK",{f:3},"PAUSE\nBreak"],
			[{y:0.5,c:"#483527",a:5,f:5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{c:"#733636",a:7,f:3,w:2},"BACK SPACE",{x:0.5},"INS","HOME","PAGE UP",{x:0.5},"NUM LOCK",{f:6},"/","*","&ndash;"],
			[{f:3,w:1.5},"TAB",{c:"#483527",f:8},"Q","W","E","R","T","Y","U","I","O","P",{a:5,f:5},"{\n[","}\n]",{w:1.5},"|\n\\",{x:0.5,c:"#733636",a:7,f:3},"DEL","END","PAGE DOWN",{x:0.5,c:"#483527",f:8},"7\nHome","8\nâ†‘","9\nPgUp",{c:"#733636",f:6,h:2},"+"],
			[{f:3,w:1.75},"CAPS LOCK",{c:"#483527",f:8},"A","S","D","F","G","H","J","K","L",{a:5,f:5},":\n;","\"\n'",{c:"#7b9b48",a:7,f:3,w:2.25},"RETURN",{x:4,c:"#483527",f:8},"4\nâ† ","5","6\nâ†’"],
			[{c:"#733636",f:3,w:2.25},"SHIFT",{c:"#483527",f:8},"Z","X","C","V","B","N","M",{a:5,f:5},"<\n,",">\n.","?\n/",{c:"#733636",a:7,f:3,w:2.75},"SHIFT",{x:1.5,f:6},"&#9652;",{x:1.5,c:"#483527",f:8},"1\nEnd","2\nâ†“","3\nPgDn",{c:"#733636",f:3,h:2},"ENTER"],
			[{w:1.25},"CTRL",{w:1.25},"WIN",{w:1.25},"ALT",{c:"#483527",p:"DSA SPACE",w:6.25},"",{c:"#733636",p:"DSA",w:1.25},"ALT",{w:1.25},"WIN",{w:1.25},"MENU",{w:1.25},"CTRL",{x:0.5,f:6},"&#9666;","&#9662;","&#9656;",{x:0.5,c:"#483527",f:8,w:2},"0\nIns",".\nDel"]],
		"Deutsch": [
			[{a:5,f:8},"\n\n\n\n\n\n1","\n\n\n\n\n\n2","\n\n\n\n\n\n3","\n\n\n\n\n\n4","\n\n\n\n\n\n5","\n\n\n\n\n\n6","\n\n\n\n\n\n7","\n\n\n\n\n\n9","\n\n\n\n\n\n0","\n\n\n\n\n\nß",{f:9,w:3},"←\n←\n\n\n\n\n←"],
			[{x:0.5,f:8},"\n\n\n\n\n\nQ","\n\n\n\n\n\nW","\n\n\n\n\n\nE","\n\n\n\n\n\nR","\n\n\n\n\n\nT","\n\n\n\n\n\nZ","\n\n\n\n\n\nU","\n\n\n\n\n\nI","\n\n\n\n\n\nO","\n\n\n\n\n\nP","\n\n\n\n\n\nÜ",{x:0.25,f:9,w:1.25,h:2,w2:1.5,h2:1,x2:-0.25},"\n\n\n\n\n\n↵"],
			[{x:0.75,f:8},"\n\n\n\n\n\nA","\n\n\n\n\n\nS","\n\n\n\n\n\nD","\n\n\n\n\n\nF","\n\n\n\n\n\nG","\n\n\n\n\n\nH","\n\n\n\n\n\nJ","\n\n\n\n\n\nK","\n\n\n\n\n\nL","\n\n\n\n\n\nÖ","\n\n\n\n\n\nÄ"],
			[{x:1.25},"\n\n\n\n\n\nY","\n\n\n\n\n\nX","\n\n\n\n\n\nC","\n\n\n\n\n\nV","\n\n\n\n\n\nB","\n\n\n\n\n\nN","\n\n\n\n\n\nM",{x:0.25,a:4,f:9,w:0.75},"\n,",{w:0.75},"\n.",{a:5,f:8},"←","→",{f:6},"\n\n\n\n\n\nEntf"],
			[{x:3.75,a:4,f:3,w:6.25},""]]
	}	
})

module.exports = SoftwareKeyboard
