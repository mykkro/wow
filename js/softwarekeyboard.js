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
		this.useLayout("Numeric")		
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
		var keys = []
		// layout is array of rows (lines)
		var x = 0
		var y = 0
		var w = 1
		var h = 1
		var ndx = 1
		self.keys = []
		_.each(layout, function(row, i) {
			x = 0
			_.each(row, function(key, j) {
				if(typeof(key)=="string") {
					// create a key...
					var keyid = "key"+(ndx++)
					var kk = self.drawKey(grp, keyid, key, w, h).move(x*70, y*70)
					self.keys[keyid] = {
						svg: kk,
						element: kk.node,
						label: key,
						x: x,
						y: y,
						w: w,
						h: w
					}
					self.selectChain.append(kk.node)
					x += w
					w = 1
					h = 1
				} else {
					// object data - set for next key...
					if(key.w) w = key.w
					if(key.h) h = key.h
					if(key.x) x += key.x
					if(key.y) y += key.y
				}

			})
			y++
		}) 
		this.selectChain.update()
		return grp
	},
	drawKey: function(root, keyid, label, width, height) {
		var grp = root.group()
		var ww = width*60+(width-1)*10
		var hh = height*60+(height-1)*10
		grp.rect(ww, hh).attr({
			"class": "key",
			"rx": 10,
			"ry": 10
		})
		grp.text(label).attr({
			"class": "label",
		}).x(ww/2)
		grp.attr("data-keyid", keyid)
		return grp
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
		"en": {

		},
		"de": {

		}
	}	
})

module.exports = SoftwareKeyboard
