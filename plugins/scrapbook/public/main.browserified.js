require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Base = require("basejs")
var url = require("url")

var BasicLayer = require("./basiclayer")
var SoftwareKeyboard = require("./softwarekeyboard")

/**
 * ## Generic class for all pages.
 */
var BasePage = BasicLayer.extend({
    constructor: function(Wow, options) {
        this.base(Wow, options)
        this.overlays = []
        this.overlayGroup = document.getElementById("overlaygroup")
    },
    showSoftwareKeybard: function(onEntered) {
        var sk = new SoftwareKeyboard(this.wow)
        var self = this
        sk.onClosed = function() {
            self.removeOverlay(sk)
        }
        sk.onTextEntered = function(txt) {
            self.removeOverlay(sk)
            if (onEntered) onEntered(txt)
        }
        this.addOverlay(sk)
    },
    parseUrl: function(myUrl) {
        return url.parse(myUrl, true)
    },
    formatUrl: function(q) {
        return url.format(q)
    },
    updateBrowserQuery: function(changes) {
        var parsedUrl = url.parse(window.location.href, true)
        for(key in changes) {
            parsedUrl.query[key] = changes[key]
        }
        parsedUrl.search = null
        window.History.replaceState({}, "", url.format(parsedUrl))
    },
    getQueryString: function(dpage) {
        var parsedUrl = url.parse(window.location.href, true)
        var pg = parseInt(parsedUrl.query.page || 1)
        if (dpage) pg += dpage
        if (pg < 1) pg = 1
        parsedUrl.query.page = pg
        parsedUrl.search = null
        return url.format(parsedUrl)
    },
    goTo: function(url) {
        window.location.href = url
    },
    goBack: function() {
        window.history.go(-1)
    },
    goToPreviousPage: function() {
        this.goTo(this.getQueryString(-1))
    },
    goToNextPage: function() {
        this.goTo(this.getQueryString(1))
    },
    // TODO take lang info from this page's query string
    // or i18n object
    goToImportPage: function(name) {
        this.goTo("/plugins/app?importname=" + name + "&lang=de")
    },
    goToGameAppPage: function(name) {
        this.goTo("/plugins/game?importname=" + name + "&lang=de")
    },
    goToRuleGamePage: function(name) {
        this.goTo("/plugins/rulegame?importname=" + name + "&lang=de")
    },
    goToAppPage: function(name, apptype) {
        var targetName = name
        var targetApptype = apptype
        if (targetName) {
            if (targetApptype == "wow/app/game") {
                this.goToGameAppPage(targetName)
            } else if (targetApptype == "wow/app/rulegame") {
                this.goToRuleGamePage(targetName)
            } else {
                this.goToImportPage(targetName)
            }
        }
    },
    goToHomePage: function() {
        this.goTo("/plugins/homepage")
    },
    goToVideoPage: function(ytId) {
        this.goTo("/plugins/youtubevideo?id=" + ytId)
    },
    handleEvent: function(evt) {
        for (var i = this.overlays.length - 1; i >= 0; i--) {
            if (!this.overlays[i].transparent && this.overlays[i].visible) {
                this.overlays[i].handleEvent(evt)
                return
            }
        }
        this.base(evt)
    },
    // overlays should not be reused...
    addOverlay: function(o) {
        this.overlays.push(o)
        $(o.paperElement()).appendTo($(this.overlayGroup))
        o.show()
    },
    // overlays should not be reused...
    removeOverlay: function(o) {
        o.hide()
        $(o.paperElement()).detach()
        var idx = this.overlays.indexOf(o)
        if (idx != -1) {
            this.overlays.splice(idx, 1)
        }
    },
    removeOverlays: function() {
        $(this.overlayGroup).empty()
        this.overlays = []
    }

})

module.exports = BasePage

},{"./basiclayer":2,"./softwarekeyboard":5,"basejs":6,"url":14}],2:[function(require,module,exports){
var Base = require("basejs")

var BasicLayer = Base.extend({
    constructor: function(Wow, options) {
        this.options = options || {}
        this.wow = Wow
        this.wtr = Wow.Widgetizer
        this.SVG = this.wtr.SVGDoc
        var klass = "wow-overlay"
        if (this.options.cssClass) klass += " " + this.options.cssClass
        this.paper = this.SVG.group().attr("class", klass)
    },
    paperElement: function() {
        return this.paper.node;
    },
    getWidget: function(name) {
        if (typeof name == "string") {
            return this.wtr.get(name)
        } else {
            var el = $(name)
            if (el.data("wow") && el.attr("id")) {
                return this.wtr.get("#" + el.attr("id"))
            } else {
                return null // DOM element is not a widget
            }
        }
    },
    handleEvent: function(evt) {
        switch (evt.device) {
            case "virtual":
                this.onVirtualControl(evt)
                break
            case "keyboard":
                this.onKeyboard(evt)
                break
            case "gamepad":
                this.onGamepad(evt)
                break
            case "mouse":
                this.onMouse(evt)
                break
            default:
                this.onEvent(evt)
        }
    },
    onVirtualControl: function(evt) {
        // handle virtual controller...
        //console.log(evt)
    },
    onEvent: function(evt) {
        // handler for other devices...
        //console.log(evt)
    },
    onKeyboard: function(evt) {
        // handler for keyboard
        //console.log(evt)
    },
    onGamepad: function(evt) {
        // handler for keyboard
        //console.log(evt)
    },
    onMouse: function(evt) {
        // handler for mouse
        //console.log(evt)
    }
})

module.exports = BasicLayer

},{"basejs":6}],3:[function(require,module,exports){
var BasicLayer = require("./basiclayer")

var Overlay = BasicLayer.extend({
    constructor: function(Wow, options) {
        this.base(Wow, options)
        // set this to true if you wish to pass events through
        this.transparent = this.options.transparent
        if (!this.transparent) {
            this.paper.rect(960, 600).attr("class", "wow-overlay-background")
        } else {
            this.paper.attr("class", this.paper.attr("class") + " transparent")
        }
        this.hide()
    },
    init: function(data, next) {
        this.base(data, next)
    },
    show: function() {
        this.setVisible(true)
    },
    hide: function() {
        this.setVisible(false)
    },
    setVisible: function(flag) {
        this.visible = flag
        if (flag) this.paper.show();
        else this.paper.hide()
    }
})

module.exports = Overlay

},{"./basiclayer":2}],4:[function(require,module,exports){
module.exports = function($, Base) {

    var SelectChain = Base.extend({
        /* widgets: an array of DOM/jQuery elements representing widgets */
        constructor: function(widgets, currentIndex) {
            this.widgets = [];
            if (widgets) {
                for (var i = 0; i < widgets.length; i++) this.append(widgets[i])
            }
            this.currentIndex = currentIndex || 0
            this.update()
        },
        copy: function() {
            return new SelectChain(this.widgets, this.currentIndex)
        },
        append: function(el) {
            this.widgets.push(el)
            return this
        },
        clear: function() {
            this.unselect()
            this.currentIndex = 0
            this.widgets = []
        },
        /* select either by index or by element */
        select: function(index) {
            if (typeof index == "number") {
                this.currentIndex = index
            } else {
                var i = this.widgets.length - 1
                while (i >= 0) {
                    if (this.widgets[i] == index) break
                    i--
                }
                this.currentIndex = i
            }
            this.update()
            return this
        },
        selectPrevious: function() {
            if (this.currentIndex >= 0) {
                this.currentIndex =
                    this.widgets.length ? ((this.currentIndex + this.widgets.length - 1) % this.widgets.length) : 0
                this.update()
            }
            return this
        },
        selectNext: function() {
            if (this.currentIndex >= 0) {
                this.currentIndex =
                    this.widgets.length > 0 ? ((this.currentIndex + 1) % this.widgets.length) : 0
                this.update()
            }
            return this
        },
        unselect: function() {
            this.currentIndex = -1
            this.update()
            return this
        },
        show: function() {
            this.update()
            this.hidden = false
        },
        hide: function() {
            for (var i = 0; i < this.widgets.length; i++) {
                var el = this.widgets[i]
                $(el).removeClass("glow2")
            }
            this.hidden = true
            return this
        },
        update: function() {
            for (var i = 0; i < this.widgets.length; i++) {
                var el = this.widgets[i]
                if (i == this.currentIndex) {
                    $(el).addClass("glow2")
                } else {
                    $(el).removeClass("glow2")
                }
            }
            return this
        },
        current: function() {
            return (this.widgets.length && !this.hidden) ? this.widgets[this.currentIndex] : null
        }
    })

    return SelectChain

}

},{}],5:[function(require,module,exports){
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

        this.size = 60
        this.gap = 5
        this.selectChain = new SelectChain()
        this.useLayout("DeutschColor")
    },
    useLayout: function(layoutName) {
        this.layout = SoftwareKeyboard.layouts[layoutName]
        this.mapping = SoftwareKeyboard.mappings[layoutName]
        this.keyboard = this.drawKeyboard(this.layout)
        this.textfieldBack = this.paper.rect(500, 50).attr({
            rx: this.gap,
            ry: this.gap
        }).move(230, 105).attr("fill", "#eee")
        this.textfield = this.paper.text("").attr({
            "class": "softkey-textfield",
            "text-anchor": "middle",
            "font-weight": "bold",
            "font-size": 40
        }).move(480, 100)
        this.setText("")
    },
    setText: function(text) {
        this.text = text
        $(this.textfield.node).find("tspan").text(text)
    },
    drawKeyboard: function(layout) {
        var self = this
        var grp = this.paper.group()
        var rect = grp.rect().attr("rx", this.gap).attr("ry", this.gap)
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
        var ndx = 0
        var backcolor = "#eeeeee"
        var maxw = 0
        var maxh = 0
        var rr = 0
        self.keys = {}
        self.keysArray = []
        _.each(layout, function(row, i) {
            x = 0
            if (!(row instanceof Array)) {
                backcolor = row.backcolor
            } else {
                _.each(row, function(key, j) {
                    if (typeof(key) == "string") {
                        // create a key...
                        var keyid = "key" + (ndx++)
                        self.keys[keyid] = self.drawKey(grp, keyid, key, {
                            x: x,
                            y: y,
                            w: w,
                            h: h,
                            c: c,
                            t: t,
                            a: a,
                            f: f,
                            x2: x2,
                            y2: y2,
                            w2: w2,
                            h2: h2,
                            index: ndx,
                            row: rr
                        })
                        self.keysArray.push(self.keys[keyid])
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
                        if (key.w) w = key.w
                        if (key.h) h = key.h
                        if (key.x) x += key.x
                        if (key.y) y += key.y
                        if (key.f) f = key.f
                        if (key.a) a = key.a
                        if (key.c) c = key.c
                        if (key.t) t = key.t
                        if (key.x2) x2 = key.x2
                        if (key.y2) y2 = key.y2
                        if (key.h2) h2 = key.h2
                        if (key.w2) w2 = key.w2
                    }
                    maxw = Math.max(maxw, x)
                })
            }
            y++
            rr++
            maxh = y
        })
        this.rows = maxh
        this.columns = maxw
        rect.attr("fill", backcolor)
        var wwww = maxw * (this.size + this.gap) + this.gap
        var hhhh = maxh * (this.size + this.gap) + this.gap
        rect.attr("width", wwww)
        rect.attr("height", hhhh)
        rect.move(-this.gap, -this.gap)
        grp.move((960 - wwww) / 2, 170)
        var self = this
        $(grp.node).find(".keywrapper").each(function() {
            var el = $(this)
            el.click(function() {
                self.selectChain.select(el.get(0))
                self.pressKey()
            })
        })
        this.selectChain.update()
        return grp
    },
    drawKey: function(root, keyid, label, opts) {
        var size = this.size
        var gap = this.gap
        var grp = root.group().attr("class", "keywrapper")
        var ww = opts.w * size + (opts.w - 1) * gap
        var hh = opts.h * size + (opts.h - 1) * gap
        grp.rect(ww, hh).attr({
            "class": "key",
            "rx": 10,
            "ry": 10,
            "fill": opts.c
        })
        if (opts.h2 && opts.w2) {
            var ww2 = opts.w2 * size + (opts.w2 - 1) * gap
            var hh2 = opts.h2 * size + (opts.h2 - 1) * gap
            var xx2 = opts.x2 * size + (opts.x2) * gap
            var yy2 = opts.y2 * size + (opts.y2) * gap
            grp.rect(ww2, hh2).attr({
                "class": "key",
                "rx": 10,
                "ry": 10,
                "fill": opts.c
            }).move(xx2, yy2)
        }
        var lines = label.split("\n")
        var label1 = ""
        var label2 = ""
        lines = _.filter(lines, function(e) {
            return e.trim() != "";
        })
        if (lines.length > 0) {
            label1 = lines[0].trim()
            grp.text(lines[0]).attr({
                "class": "label",
                "fill": opts.t,
                "font-size": Math.round(opts.f * 2.5),
                "text-anchor": "middle"
            }).x((ww - gap) / 2).y((hh - gap) * 0.2)
            if (lines.length >= 2) {
                label2 = lines[1].trim()
                grp.text(lines[1]).attr({
                    "class": "label",
                    "fill": opts.t,
                    "font-size": Math.round(opts.a * 2.5),
                    "text-anchor": "middle"
                }).x((ww - gap) / 2).y((hh - gap) * 0.7)
            }
        }
        grp.attr("data-keyid", keyid)
        grp.move((size + gap) * opts.x, (size + gap) * opts.y)
        return $.extend(opts, {
            svg: grp,
            element: grp.node,
            label: label,
            label1: label1,
            label2: label2
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
        alert(text)
    },
    findBelowKey: function(key) {
        var ndx = key.index
        var row = key.row
        var x = key.x
        var w = key.w
        do {
            ndx++
            if (ndx >= this.keysArray.length) ndx = 0
            var key2 = this.keysArray[ndx]
            if (key2.row != row && !(key.x + key.w <= key2.x || key2.x + key2.w <= key.x)) break
        } while (ndx != key.index)
        return this.keysArray[ndx]
    },
    findAboveKey: function(key) {
        var ndx = key.index
        var row = key.row
        var x = key.x
        var w = key.w
        do {
            ndx--
            if (ndx < 0) ndx = this.keysArray.length - 1
            var key2 = this.keysArray[ndx]
            if (key2.row != row && !(key.x + key.w <= key2.x || key2.x + key2.w <= key.x)) break
        } while (ndx != key.index)
        return this.keysArray[ndx]
    },
    pressKey: function() {
        var key = this.getSelectedKey()
        var txt = this.text
        var instr = this.mapping[key.label]
        switch (instr) {
            case "backspace":
                txt = txt.slice(0, -1)
                break
            case "enter":
                this.onClosed()
                this.onTextEntered(this.text)
                break;
            case "space":
                txt += " "
                break
            case "escape":
                this.onClosed()
                return
            default:
                txt += key.label1
        }
        // is it number or letter?
        this.setText(txt)
    },
    onVirtualControl: function(evt) {
        var self = this
        switch (evt.control) {
            case "up":
                var key = this.getSelectedKey()
                var key2 = this.findAboveKey(key)
                this.selectChain.select(key2.element)
                break;
            case "down":
                var key = this.getSelectedKey()
                var key2 = this.findBelowKey(key)
                this.selectChain.select(key2.element)
                break;
            case "home":
                // works like escape key
                this.onClosed()
                break;
            case "left":
                this.selectChain.selectPrevious()
                break;
            case "right":
                this.selectChain.selectNext()
                break;
            case "select":
                this.pressKey()
                break;
        }
    }

}, {
    layouts: {
        // let's use layouts from http://www.keyboard-layout-editor.com/
        "Numeric": [
            ["Num Lock", "/", "*", "-"],
            ["7\nHome", "8\n↑", "9\nPgUp", {
                h: 2
            }, "+"],
            ["4\n←", "5", "6\n→"],
            ["1\nEnd", "2\n↓", "3\nPgDn", {
                h: 2
            }, "Enter"],
            [{
                w: 2
            }, "0\nIns", ".\nDel"]
        ],
        "ANSI 104": [
            ["Esc", {
                "x": 1
            }, "F1", "F2", "F3", "F4", {
                "x": 0.5
            }, "F5", "F6", "F7", "F8", {
                "x": 0.5
            }, "F9", "F10", "F11", "F12", {
                "x": 0.5
            }, "PrtSc", "Scroll Lock", "Pause\nBreak"],
            [{
                "y": 0.5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", {
                "w": 2
            }, "Backspace", {
                "x": 0.5
            }, "Insert", "Home", "PgUp", {
                "x": 0.5
            }, "Num Lock", "/", "*", "-"],
            [{
                "w": 1.5
            }, "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", {
                "w": 1.5
            }, "|\n\\", {
                "x": 0.5
            }, "Delete", "End", "PgDn", {
                "x": 0.5
            }, "7\nHome", "8\n↑", "9\nPgUp", {
                "h": 2
            }, "+"],
            [{
                "w": 1.75
            }, "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n'", {
                "w": 2.25
            }, "Enter", {
                "x": 4
            }, "4\n←", "5", "6\n→"],
            [{
                "w": 2.25
            }, "Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", {
                "w": 2.75
            }, "Shift", {
                "x": 1.5
            }, "↑", {
                "x": 1.5
            }, "1\nEnd", "2\n↓", "3\nPgDn", {
                "h": 2
            }, "Enter"],
            [{
                "w": 1.25
            }, "Ctrl", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Alt", {
                "w": 6.25
            }, "", {
                "w": 1.25
            }, "Alt", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Menu", {
                "w": 1.25
            }, "Ctrl", {
                "x": 0.5
            }, "←", "↓", "→", {
                "x": 0.5,
                "w": 2
            }, "0\nIns", ".\nDel"]
        ],
        "ANSI 104 (big-ass enter)": [
            ["Esc", {
                "x": 1
            }, "F1", "F2", "F3", "F4", {
                "x": 0.5
            }, "F5", "F6", "F7", "F8", {
                "x": 0.5
            }, "F9", "F10", "F11", "F12", {
                "x": 0.5
            }, "PrtSc", "Scroll Lock", "Pause\nBreak"],
            [{
                "y": 0.5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", "|\n\\", "Back Space", {
                "x": 0.5
            }, "Insert", "Home", "PgUp", {
                "x": 0.5
            }, "Num Lock", "/", "*", "-"],
            [{
                "w": 1.5
            }, "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", {
                "w": 1.5,
                "h": 2,
                "w2": 2.25,
                "h2": 1,
                "x2": -0.75,
                "y2": 1
            }, "Enter", {
                "x": 0.5
            }, "Delete", "End", "PgDn", {
                "x": 0.5
            }, "7\nHome", "8\n↑", "9\nPgUp", {
                "h": 2
            }, "+"],
            [{
                "w": 1.75
            }, "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n'", {
                "x": 6.25
            }, "4\n←", "5", "6\n→"],
            [{
                "w": 2.25
            }, "Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", {
                "w": 2.75
            }, "Shift", {
                "x": 1.5
            }, "↑", {
                "x": 1.5
            }, "1\nEnd", "2\n↓", "3\nPgDn", {
                "h": 2
            }, "Enter"],
            [{
                "w": 1.25
            }, "Ctrl", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Alt", {
                "w": 6.25
            }, "", {
                "w": 1.25
            }, "Alt", {
                "w": 1.25
            }, "Win", {
                "w": 1.25
            }, "Menu", {
                "w": 1.25
            }, "Ctrl", {
                "x": 0.5
            }, "←", "↓", "→", {
                "x": 0.5,
                "w": 2
            }, "0\nIns", ".\nDel"]
        ],
        "Dark": [{
                backcolor: "#222222"
            },
            [{
                c: "#7b9b48",
                t: "#e4dedd",
                p: "DSA",
                a: 7,
                f: 4
            }, "ESC", {
                x: 1,
                c: "#483527",
                f: 3
            }, "F1", "F2", "F3", "F4", {
                x: 0.5,
                c: "#733636"
            }, "F5", "F6", "F7", "F8", {
                x: 0.5,
                c: "#483527"
            }, "F9", "F10", "F11", "F12", {
                x: 0.5,
                c: "#733636"
            }, "PRINT", {
                f: 2
            }, "SCROLL LOCK", {
                f: 3
            }, "PAUSE\nBreak"],
            [{
                y: 0.5,
                c: "#483527",
                a: 5,
                f: 5
            }, "~\n`", "!\n1", "@\n2", "#\n3", "$\n4", "%\n5", "^\n6", "&\n7", "*\n8", "(\n9", ")\n0", "_\n-", "+\n=", {
                c: "#733636",
                a: 7,
                f: 3,
                w: 2
            }, "BACK SPACE", {
                x: 0.5
            }, "INS", "HOME", "PAGE UP", {
                x: 0.5
            }, "NUM LOCK", {
                f: 6
            }, "/", "*", "&ndash;"],
            [{
                f: 3,
                w: 1.5
            }, "TAB", {
                c: "#483527",
                f: 8
            }, "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", {
                a: 5,
                f: 5
            }, "{\n[", "}\n]", {
                w: 1.5
            }, "|\n\\", {
                x: 0.5,
                c: "#733636",
                a: 7,
                f: 3
            }, "DEL", "END", "PAGE DOWN", {
                x: 0.5,
                c: "#483527",
                f: 8
            }, "7\nHome", "8\nâ†‘", "9\nPgUp", {
                c: "#733636",
                f: 6,
                h: 2
            }, "+"],
            [{
                f: 3,
                w: 1.75
            }, "CAPS LOCK", {
                c: "#483527",
                f: 8
            }, "A", "S", "D", "F", "G", "H", "J", "K", "L", {
                a: 5,
                f: 5
            }, ":\n;", "\"\n'", {
                c: "#7b9b48",
                a: 7,
                f: 3,
                w: 2.25
            }, "RETURN", {
                x: 4,
                c: "#483527",
                f: 8
            }, "4\nâ† ", "5", "6\nâ†’"],
            [{
                c: "#733636",
                f: 3,
                w: 2.25
            }, "SHIFT", {
                c: "#483527",
                f: 8
            }, "Z", "X", "C", "V", "B", "N", "M", {
                a: 5,
                f: 5
            }, "<\n,", ">\n.", "?\n/", {
                c: "#733636",
                a: 7,
                f: 3,
                w: 2.75
            }, "SHIFT", {
                x: 1.5,
                f: 6
            }, "&#9652;", {
                x: 1.5,
                c: "#483527",
                f: 8
            }, "1\nEnd", "2\nâ†“", "3\nPgDn", {
                c: "#733636",
                f: 3,
                h: 2
            }, "ENTER"],
            [{
                w: 1.25
            }, "CTRL", {
                w: 1.25
            }, "WIN", {
                w: 1.25
            }, "ALT", {
                c: "#483527",
                p: "DSA SPACE",
                w: 6.25
            }, "", {
                c: "#733636",
                p: "DSA",
                w: 1.25
            }, "ALT", {
                w: 1.25
            }, "WIN", {
                w: 1.25
            }, "MENU", {
                w: 1.25
            }, "CTRL", {
                x: 0.5,
                f: 6
            }, "&#9666;", "&#9662;", "&#9656;", {
                x: 0.5,
                c: "#483527",
                f: 8,
                w: 2
            }, "0\nIns", ".\nDel"]
        ],
        "Deutsch": [
            [{
                a: 5,
                f: 8
            }, "\n\n\n\n\n\n1", "\n\n\n\n\n\n2", "\n\n\n\n\n\n3", "\n\n\n\n\n\n4", "\n\n\n\n\n\n5", "\n\n\n\n\n\n6", "\n\n\n\n\n\n7", "\n\n\n\n\n\n8", "\n\n\n\n\n\n9", "\n\n\n\n\n\n0", "\n\n\n\n\n\nß", {
                f: 9,
                w: 2
            }, "←\n←\n\n\n\n\n←"],
            [{
                x: 0.5,
                f: 8
            }, "\n\n\n\n\n\nQ", "\n\n\n\n\n\nW", "\n\n\n\n\n\nE", "\n\n\n\n\n\nR", "\n\n\n\n\n\nT", "\n\n\n\n\n\nZ", "\n\n\n\n\n\nU", "\n\n\n\n\n\nI", "\n\n\n\n\n\nO", "\n\n\n\n\n\nP", "\n\n\n\n\n\nÜ", {
                x: 0.25,
                f: 9,
                w: 1.25,
                h: 2,
                w2: 1.5,
                h2: 1,
                x2: -0.25
            }, "\n\n\n\n\n\n↵"],
            [{
                x: 0.75,
                f: 8
            }, "\n\n\n\n\n\nA", "\n\n\n\n\n\nS", "\n\n\n\n\n\nD", "\n\n\n\n\n\nF", "\n\n\n\n\n\nG", "\n\n\n\n\n\nH", "\n\n\n\n\n\nJ", "\n\n\n\n\n\nK", "\n\n\n\n\n\nL", "\n\n\n\n\n\nÖ", "\n\n\n\n\n\nÄ"],
            [{
                x: 1.25
            }, "\n\n\n\n\n\nY", "\n\n\n\n\n\nX", "\n\n\n\n\n\nC", "\n\n\n\n\n\nV", "\n\n\n\n\n\nB", "\n\n\n\n\n\nN", "\n\n\n\n\n\nM", {
                x: 0.25,
                a: 4,
                f: 9,
                w: 0.75
            }, "\n,", {
                w: 0.75
            }, "\n.", {
                a: 5,
                f: 8
            }, "←", "→", {
                f: 6
            }, "\n\n\n\n\n\nEntf"],
            [{
                x: 3.75,
                a: 4,
                f: 3,
                w: 6.25
            }, ""]
        ],
        "DeutschColor": [
            [{
                c: "#CD96CD",
                a: 5,
                f: 8
            }, "\n\n\n\n\n\n1", "\n\n\n\n\n\n2", "\n\n\n\n\n\n3", "\n\n\n\n\n\n4", "\n\n\n\n\n\n5", "\n\n\n\n\n\n6", "\n\n\n\n\n\n7", "\n\n\n\n\n\n9", "\n\n\n\n\n\n0", {
                c: "#FFD39B"
            }, "\n\n\n\n\n\nß", {
                c: "#FF6A6A",
                f: 9,
                w: 3
            }, "←\n←\n\n\n\n\n←"],
            [{
                x: 0.5,
                c: "#FFD39B",
                f: 8
            }, "\n\n\n\n\n\nQ", "\n\n\n\n\n\nW", "\n\n\n\n\n\nE", "\n\n\n\n\n\nR", "\n\n\n\n\n\nT", "\n\n\n\n\n\nZ", "\n\n\n\n\n\nU", "\n\n\n\n\n\nI", "\n\n\n\n\n\nO", "\n\n\n\n\n\nP", "\n\n\n\n\n\nÜ", {
                x: 0.25,
                c: "#32CD32",
                f: 9,
                w: 1.25,
                h: 2,
                w2: 1.5,
                h2: 1,
                x2: -0.25
            }, "\n\n\n\n\n\n↵"],
            [{
                x: 0.75,
                c: "#FFD39B",
                f: 8
            }, "\n\n\n\n\n\nA", "\n\n\n\n\n\nS", "\n\n\n\n\n\nD", "\n\n\n\n\n\nF", "\n\n\n\n\n\nG", "\n\n\n\n\n\nH", "\n\n\n\n\n\nJ", "\n\n\n\n\n\nK", "\n\n\n\n\n\nL", "\n\n\n\n\n\nÖ", "\n\n\n\n\n\nÄ"],
            [{
                x: 1.25
            }, "\n\n\n\n\n\nY", "\n\n\n\n\n\nX", "\n\n\n\n\n\nC", "\n\n\n\n\n\nV", "\n\n\n\n\n\nB", "\n\n\n\n\n\nN", "\n\n\n\n\n\nM", {
                x: 0.25,
                a: 4,
                f: 9,
                w: 0.75
            }, "\n,", {
                w: 0.75
            }, "\n.", {
                c: "#79CDCD",
                a: 5,
                f: 8
            }, "←", "→", {
                c: "#FF6A6A",
                f: 6
            }, "\n\n\n\n\n\nEntf"],
            [{
                x: 3.75,
                c: "#FFD39B",
                a: 4,
                f: 3,
                w: 6.25
            }, ""]
        ]
    },
    mappings: {
        "Deutsch": {
            "\n\n\n\n\n\nEntf": "escape",
            "←\n←\n\n\n\n\n←": "backspace",
            "\n\n\n\n\n\n↵": "enter",
            "": "space"
        },
        "DeutschColor": {
            "\n\n\n\n\n\nEntf": "escape",
            "←\n←\n\n\n\n\n←": "backspace",
            "\n\n\n\n\n\n↵": "enter",
            "": "space"
        },
        "Dark": {
            "ESC": "escape",
            "BACK SPACE": "backspace",
            "RETURN": "enter",
            "": "space"
        },
        "Numeric": {
            "Num Lock": "numlock",
            "Enter": "enter"
        }
    }
})

module.exports = SoftwareKeyboard

},{"./overlay":3,"./selectchain":4,"basejs":6,"underscore":7}],6:[function(require,module,exports){
/*
  Based on Base.js 1.1a (c) 2006-2010, Dean Edwards
  Updated to pass JSHint and converted into a module by Kenneth Powers
  License: http://www.opensource.org/licenses/mit-license.php
*/
/*global define:true module:true*/
/*jshint eqeqeq:true*/
(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define !== 'undefined' && typeof define.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Base', this, function () {
  // Base Object
  var Base = function () {};

  // Implementation
  Base.extend = function (_instance, _static) { // subclass
    var extend = Base.prototype.extend;
    // build the prototype
    Base._prototyping = true;
    var proto = new this();
    extend.call(proto, _instance);
    proto.base = function () {
      // call this method from any other method to invoke that method's ancestor
    };
    delete Base._prototyping;
    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function () {
        if (!Base._prototyping) {
          if (this._constructing || this.constructor === klass) { // instantiation
            this._constructing = true;
            constructor.apply(this, arguments);
            delete this._constructing;
          } else if (arguments[0] !== null) { // casting
            return (arguments[0].extend || extend).call(arguments[0], proto);
          }
        }
      };
    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function (type) {
      return (type === 'object') ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialization
    if (typeof klass.init === 'function') klass.init();
    return klass;
  };

  Base.prototype = {
    extend: function (source, value) {
      if (arguments.length > 1) { // extending with a name/value pair
        var ancestor = this[source];
        if (ancestor && (typeof value === 'function') && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() !== value.valueOf()) && /\bbase\b/.test(value)) {
          // get the underlying method
          var method = value.valueOf();
          // override
          value = function () {
            var previous = this.base || Base.prototype.base;
            this.base = ancestor;
            var returnValue = method.apply(this, arguments);
            this.base = previous;
            return returnValue;
          };
          // point to the underlying method
          value.valueOf = function (type) {
            return (type === 'object') ? value : method;
          };
          value.toString = Base.toString;
        }
        this[source] = value;
      } else if (source) { // extending with an object literal
        var extend = Base.prototype.extend;
        // if this object has a customized extend method then use it
        if (!Base._prototyping && typeof this !== 'function') {
          extend = this.extend || extend;
        }
        var proto = {
          toSource: null
        };
        // do the "toString" and other methods manually
        var hidden = ['constructor', 'toString', 'valueOf'];
        // if we are prototyping then include the constructor
        for (var i = Base._prototyping ? 0 : 1; i < hidden.length; i++) {
          var h = hidden[i];
          if (source[h] !== proto[h])
            extend.call(this, h, source[h]);
        }
        // copy each of the source object's properties to this object
        for (var key in source) {
          if (!proto[key]) extend.call(this, key, source[key]);
        }
      }
      return this;
    }
  };

  // initialize
  Base = Base.extend({
    constructor: function () {
      this.extend(arguments[0]);
    }
  }, {
    ancestor: Object,
    version: '1.1',
    forEach: function (object, block, context) {
      for (var key in object) {
        if (this.prototype[key] === undefined) {
          block.call(context, object[key], key, object);
        }
      }
    },
    implement: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
          // if it's a function, call it
          arguments[i](this.prototype);
        } else {
          // add the interface using the extend method
          this.prototype.extend(arguments[i]);
        }
      }
      return this;
    },
    toString: function () {
      return String(this.valueOf());
    }
  });

  // Return Base implementation
  return Base;
});

},{}],7:[function(require,module,exports){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}],8:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("FWaASH"))
},{"FWaASH":9}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],10:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],13:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":11,"./encode":12}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":10,"querystring":13}],15:[function(require,module,exports){
var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")
var Empty = require("./Empty")

var AudioDecorator = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    init: function() {
        this.slot = $("<div>").addClass("slot");
        this.setSlot('content', new Empty());
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.audio.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.audio.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        // regenerate player...
        this.refresh();
        this.onStop();
    },
    _kill: function() {
        this.audio.get(0).pause();
        this.audio.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.audio.get(0).volume = vol / 100.0;
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.slot.html(value.get());
        return this;
    },
    _addSource: function(uri, type) {
        if(uri) $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.audio);
    },
    refresh: function() {
        this.base();
        var self = this;
        this.audio = $("<audio>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.slot)
            .append(this.pane)
            .append(this.audio);

        // incorrect... and unnecessary: this.audio.remove("source");
        this.audio.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg') ? this.options.uri : '';
            this.options.mp3 = (ext == 'mp3') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'audio/ogg; codecs="vorbis"');
        this._addSource(this.options.mp3, 'audio/mpeg; codecs="mp3"');
        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
    },
    _klass: "audio-decorator decorator thing",
    _type: "audio-decorator",
    _defaults: {
        'ogg': "",
        'mp3': "",
        'uri': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
       "type":"object",
       "properties":{
          "uri":{
             "type":"string",
             "format": "my-voice-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "volume":{
             "type":"integer",
             "required":true // TODO
          },
          "autoplay":{
             "type":"boolean",
             "required":true // TODO
          },
          "loop":{
             "type":"boolean",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});


module.exports = AudioDecorator
},{"./CenteringDecorator":20,"./Empty":23,"./PlayerControls":32,"./Thing":40}],16:[function(require,module,exports){
var Decorator = require("./Decorator")

var BackgroundDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        if(this.options['image']) 
            this.element.css('background-image','url("'+this.options['image']+'")');
        else 
            this.element.css('background-image','');
        this.element.css('background-position',this.options['position']);
        this.element.css('background-repeat',this.options['repeat']);
        this.element.css('background-color',this.options['color']);
        this.element.css('background-size',this.options['size']);
    },
    _klass: "background-decorator decorator thing",
    _type: "background-decorator",
    _defaults: {
        'image': "",
        'repeat': 'no-repeat',
        'position': 'center center',
        'color': 'white',
        'size': 'cover'
    },
    _schema: {
       "type":"object",
       "properties":{
          "image":{
             "type":"string",
             "format": "my-image-uri",
            // TODO vadi mu kdyz je to false - option se neda rozkliknout
             "required":true
          },
          "repeat":{
             "enum": ["repeat","no-repeat","repeat-x","repeat-y"],
             "type":"string",
             "required":true // TODO
          },
          "position":{
             "type":"string",
             "required":true // TODO
          },
          "size":{
             "type":"string",
             "enum": ["cover","contain"],
             "required":true // TODO
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = BackgroundDecorator


},{"./Decorator":22}],17:[function(require,module,exports){
var GrowableLayout = require("./GrowableLayout")

var Book = GrowableLayout.extend({
    currentPage: 0,
    init: function() {
        this.base();
        console.log("Book created")
        console.log(this)
    },
    refresh: function() {
        this.base();
    },
    // TODO tohle se muze zavolat jen pokud jsou stranky uz vlozena do DOMu
    makeDisplay: function() {
        var self = this;
	    // kniha = <div class="mykkro-book> <div class="mykkro-slot"> .. </div>
	    this.element.addClass(this.options.display);
	    switch(this.options.display) {
	      case 'basic':
	        // add page numbers...
	        break;
	      case "turnable":
	        this.element.turn({gradients: true, acceleration: true});
            this.element.bind("start", function(ev, pageObject, corner) { 
                self.onTurnStart(ev, pageObject, corner); })
            this.element.bind("turning", function(ev, page, pageObject) { 
                self.onTurning(ev, page, pageObject); })
            this.element.bind("turned", function(ev, page, view) { 
                self.onTurned(ev, page, view); })
            this.element.bind("end", function(ev, pageObject, turned) { 
                self.onTurnEnd(ev, pageObject, turned); })
	        break;
	    }
    },
    _setPage: function(page) {
        if(!this.currentPage) {
            // page 1 became visible
            this.onPageVisibilityChange(page, true);
        }
        else if(this.currentPage>>1 == page>>1) {
            // je videt porad stejna dvoustrana
        } else {            
            // visibility changed
            var oldPages = 2*(Math.floor(this.currentPage / 2));
            var newPages = 2*(Math.floor(page / 2));
            this.onPageVisibilityChange(oldPages, false);
            this.onPageVisibilityChange(oldPages+1, false);
            this.onPageVisibilityChange(newPages, true);
            this.onPageVisibilityChange(newPages+1, true);
        }
        this.currentPage = page;
        // notifikovat stranky pokud se jejich viditelnost zmenila
        this.onPageChange(page);
    },
    // TODO udelat si na to taky bind funkci
    onPageVisibilityChange: function(page, visible) {
        if(typeof(page)=='function') this._onPageVisibilityChange = page;  
        else {
            // mame takovou stranku?
            var name = page-1;
            if(this.slots[name]) {
                this._updatePageVisibility(page, visible);
                if(this._onPageVisibilityChange) this._onPageVisibilityChange(page, visible);
            }
        }
    },
    _updatePageVisibility: function(page, visible) {
        // pri zviditelneni musim refereshnout vsechny audio-decoratory a video-thingy
        // pri zneviditelneni vypnout jejich playback
        //log("Page: "+page+" visibility: "+visible);
        var name = page-1;
        var thing = this.slots[name];
        var media = [];
        thing.findSlotsByType('audio-decorator', media);
        thing.findSlotsByType('video-thing', media)
        //log(audio.length+","+video.length);
        if(visible) {
            // page became visible...
            for(var i=0; i<media.length; i++) {
                media[i].refresh();
                if(media[i].options['autoplay']) {
                    media[i].play();
                }
            }
        } else {
            // TODO stop only if playing...
            for(var i=0; i<media.length; i++) media[i]._kill();
        }
    },
    onPageChange: function(ev) {
        if(typeof(ev)=='function') this._onPageChange = ev;  
        else {
            if(this._onPageChange) this._onPageChange(ev);
        }
    },
    onInit: function(ev) {
        if(typeof(ev)=='function') this._onInit = ev;  
        else {
            this._setPage(1);
            if(this._onInit) this._onInit();
        }
    },
    onExit: function(ev) {
        if(typeof(ev)=='function') this._onExit = ev;  
        else {
            if(this._onExit) this._onExit();
        }
    },
    onTurnStart: function(ev, pageObject, corner) {
        if(typeof(ev)=='function') this._onTurnStart = ev;  
        else {
            if(this._onTurnStart) this._onTurnStart(ev, pageObject, corner);
        }
    }, 
    onTurning: function(ev, page, pageObject) {
        if(typeof(ev)=='function') this._onTurning = ev;  
        else {
            if(this._onTurning) this._onTurning(ev, page, pageObject);
        }
    }, 
    onTurned: function(ev, page, view) { 
        if(typeof(ev)=='function') this._onTurned = ev;  
        else {
            this._setPage(page);
            if(this._onTurned) this._onTurned(ev, page, view);
        }
    }, 
    onTurnEnd: function(ev, pageObject, turned) { // nefunguje
        if(typeof(ev)=='function') this._onTurnEnd = ev;  
        else {
            if(this._onTurnEnd) this._onTurnEnd(ev, pageObject, corner);
        }
    }, 
    _klass: "book growable-layout layout thing",
    _type: "book",
    _defaults: {
        "title": "My Book",
	    "display": "basic"
    },
    _schema: {
       "type":"object",
       "properties":{
          "title":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = Book

},{"./GrowableLayout":26}],18:[function(require,module,exports){
var Base = require("basejs")
var Thing = require("./Thing")
var Things = require("./Things")


// TODO udelat z toho Thing
// TODO k ikonam pridat tooltipy

var BookViewer = Base.extend({
    constructor: function(options) {
        this.bookData = options.data;
        this.bookUrl = options.url;
        this.eventUrl = options.eventUrl;
        this.fullscreen = options.fullscreen;
        this.logger = options.logger;
        this.showquitbutton = options.showquitbutton;
        this.defaultWidth = 920;
        this.defaultHeight = 600;
        this.tools = {};
        this.bookContent = null;
        this.eventHistory = [];
        this.targetDiv = "#content"
    },
    makeIcon: function(icon, title) {
        return $("<div>").addClass('icon icon-48 icon-'+icon).css('display','inline-block').attr("title", title);
    },
    makeTool: function(icon, label, left/*bool*/, top, click) {
        this.tools[icon] = this.makeIcon(icon, label).css({position:'absolute', top: top}).css(left ? {'left':'6px'}:{'right':'6px'}).click(click).appendTo($("#book-wrapper"));
        return this.tools[icon];
    },
    showIcon: function(icon, enable) {
        if(enable) this.tools[icon].show() ; else this.tools[icon].hide();
    },
    turnNext: function() {
        this.bookContent.get().turn("next");
    },
    turnPrevious: function() {
        this.bookContent.get().turn("previous");
    },
    turnFirst: function() {
        this.bookContent.get().turn("page", 1);
    },
    goHome: function() {
        this.logEvent('book_close', this.bookUrl);
        window.location.href = this.bookUrl;
    },
    // v Chrome to nejak nefunguje...
    close: function() {
        this.logEvent('book_close', this.bookUrl);
        window.open('','_self','');
        window.close();
    },
    closeBook: function() {
        // normal viewer only turns to page 1
        this.turnFirst()
    },
    _setPageBackgrounds: function(bookContent, o) {
        var totalPages = bookContent.length()
        for(var i=0; i<totalPages; i++) {
            var slot = bookContent.nth(i)
            var elem = slot.element
            var css = { "background-size": "cover", "background-color": "white"}
            if(i==0) {
                // first page
                css["background-image"] = 'url('+o.frontpage_image_url+')'
            } else if(i == totalPages-1 && i%2!=0) {
                // last page, must be odd
                css["background-image"] = 'url('+o.backpage_image_url+')'
            } else if(i%2==0) {
                // even page
                css["background-image"] = 'url('+o.evenpage_image_url+')'
            } else {
                // odd page
                css["background-image"] = 'url('+o.oddpage_image_url+')'
            }
            elem.css(css)
        }
    },
    _makeWrapper: function(o) {
        return $("<div>")
            .attr("id", "book-wrapper")
            .css('position','relative')
            .css("background-image", 'url('+o.background_image_url+')')
    },
    _makeReferences: function(bookContent) {
        // gather references...
        var refs = [];
        bookContent.findSlotsByType('ref-decorator', refs);
        for(var i=0; i<refs.length; i++) {
            refs[i].options.label = (i+1)+""
            refs[i].refresh()
        }
        // TODO find reference-page layout and fill it by reference info...
        var reflists = [];
        bookContent.findSlotsByType('ref-list', reflists);
        // only the first will be used; later: we can split reference items into multiple ref lists
        if(reflists.length>0) {
            reflists[0].setReferences(refs);
        }
    },
    _monitorMediaEvents: function(bookContent) {
        // find audio and video Things and monitor their play, stop, pause, kill events
        var media = [];
        var self = this;
        bookContent.findSlotsByType('audio-decorator', media);
        bookContent.findSlotsByType('video-thing', media);
        for(var i=0; i<media.length; i++) {
            var m = media[i]; 
            var src = m.options.uri;           
            (function(){
                m.onPlay(function() { self.logEvent('book_media_play', src); });
                m.onPause(function() { self.logEvent('book_media_pause', src); });
                m.onStop(function() { self.logEvent('book_media_stop', src); });
                m.onKill(function() { self.logEvent('book_media_kill', src); });
            })();
        }
    },
    init: function() {
        /* display book... */
        var self = this;
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        var o = this.bookData.options      
        // create wrapper...
        var wrapper = this._makeWrapper(o);
        wrapper.appendTo(this.targetDiv);
        this.bookContent = Things.create(this.bookData, {"display":"turnable"});

        this._setPageBackgrounds(this.bookContent, o)
        this._makeReferences(this.bookContent)
        this._monitorMediaEvents(this.bookContent)
        
        // init book...
        this.bookContent.onInit();
        $("#book-wrapper").css({width:width+"px", height:height+"px"}).html(this.bookContent.get());
        this.bookContent.makeDisplay();

        // events...
        $(window).unload(function() {
            self.bookContent.onExit(); // TODO tohle mi nejak nefunguje...
        });
        $(window).resize(function() {
            if(self.fullscreen) {
                self.updateToolbar(self.recreate());
            }
        });
        $(window).bind("fullscreen-toggle", function(e, state) {
            self.setFullscreen(state);
        });
        this.bookContent.get().bind("turned", function(event, page, view) {
            self.updateToolbar();
            self.logEvent('book_page_turn', self.bookUrl, self.bookContent.get().turn("page"));
        });
        this.makeTool('turn-right', __('Previous page'), true, '50%', function() { self.turnPrevious();});
        this.makeTool('turn-left', __('Next page'), false, '50%', function() { self.turnNext();});
        if(this.showquitbutton!="no") {
            this.makeTool('closebook', __('Close book'), false, '16px', function() { self.closeBook();});
            // reduce close icon in size...
            this.tools['closebook'].css({top: '16px', width: "24px", height: "24px"});
        }

        // update icons...
        $("#book-wrapper >.icon-turn-left").css("background-image", 'url('+o.turnleft_image_url+')')
        $("#book-wrapper >.icon-turn-right").css("background-image", 'url('+o.turnright_image_url+')')

        this.updateToolbar();
        this.logEvent('book_open', this.bookUrl);
    },
    logEvent: function(type, src, data) {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        this.logSingleEvent({"type":type,"src":src,"data":data,"timestamp":timestamp});
        if(type == 'book_close') {  
            // flush events...
            this.flushEventLog();
        }
    },
    logSingleEvent: function(evt) {
        if(this.logger) {
            this.logger(evt)
        }
        this.eventHistory.push(evt);
        if(this.eventUrl) {
            Common.postJsonData(this.eventUrl+".json", evt);
        }
    },
    flushEventLog: function() {
        // TODO odesilat eventy pres AJAX
        console.log(JSON.stringify(this.eventHistory, null, 4));
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.bookContent.get().turn('disable', true);
        if(this.fullscreen) {
            $("#book-wrapper").appendTo($("#fullscreen"));
            $("#container").hide();
            $("#fullscreen").show();            
        } else {
            $("#book-wrapper").appendTo($("#content"));
            $("#container").show();
            $("#fullscreen").hide();

        }
        this.bookContent.get().turn('disable', false);
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    },
    recreate: function() {
        var width = this.defaultWidth;
        var height = this.defaultHeight;
        // kniha je velka 800x560 - pomer stran cca 1:sqrt(2) ~ 1:1.428
        if(this.fullscreen) {
            var ww = $(window).width();
            var hh = $(window).height();
            var scaleFactor = ww/width;
            var scaleFactor2 = hh/height;
            var scale = Math.min(scaleFactor, scaleFactor2);
            width = /*Math.floor(width*scale);*/ww;
            height = /*Math.floor(height*scale);*/hh;
        } 
        // resize wrapper and pages...
        $("#book-wrapper").css({width:width+"px", height:height+"px"});
        if(this.fullscreen) {
            // na okrajich musi zbyt 8% mista; to odpovida 60px 
            var sidex = Math.max(Math.floor(width*0.08), 60);
            var newWidth = width - 2*sidex;
            var newHeight = Math.floor(newWidth/1.428);
            var maxHeight = height-40;
            if(newHeight > maxHeight) {
                newWidth = Math.floor(newWidth*maxHeight/newHeight);
                newHeight = maxHeight;
            }
        } else {
            var newWidth = width - 120;
            var newHeight = height - 40;
        }
        this.bookContent.get().turn('size', newWidth, newHeight);
        return newWidth;
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit
        //this.showIcon('fullscreen-on', !this.fullscreen);
        //this.showIcon('fullscreen-off', this.fullscreen);
        
        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+3*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            //this.tools['fullscreen-on'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            //this.tools['fullscreen-off'].css({top: (20+iconSize)+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['closebook'].css({top: '16px', width: iconSizeHalf+"px", height: iconSizeHalf+"px"});
            //if(this.bookUrl) this.tools['home'].css({top: '16px', width: iconSize+"px", height: iconSize+"px"});
        }
    }
});

module.exports = BookViewer

},{"./Thing":40,"./Things":41,"basejs":6}],19:[function(require,module,exports){
var Decorator = require("./Decorator")

// TODO sloucit nejak s rounded decoratorem
var BorderDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('border-width', this.options['width']);
        this.element.css('border-style',this.options['style']);
        this.element.css('border-color',this.options['color']);
    },
    _klass: "border-decorator decorator thing",
    _type: "border-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black'
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "style":{
             "type":"string",
             "enum": ["none","solid","dotted","dashed","double","groove","ridge","inset","outset"],
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = BorderDecorator

},{"./Decorator":22}],20:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

var CenteringDecorator = Thing.extend({
    init: function() {
        this.inner = $("<div>").addClass('content-inner').appendTo(
            $("<div>").addClass('center3').appendTo(
                $("<div>").addClass('center2').appendTo(
                    this.element
                )
            )
        );
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.inner.html(value.get());
        return this;
    },
    // options changed...
    refresh: function() {
        this.base();
        this.element.css('text-align',this.options['x-align']);
        this.element.children(".center2").css('vertical-align',this.options['y-align']);
        this.inner.css('width',this.options['content-width']);
        this.inner.css('height',this.options['content-height']);
    },
    _klass: "centering-decorator decorator thing",
    _type: "centering-decorator",
    _defaults: {
        'x-align': "center",
        'y-align': 'center',
        'content-width': '',
        'content-height': ''
    },
    _schema: {
       "type":"object",
       "properties":{
          "x-align":{
             "enum": ["left","center","right"],
             "type":"string",
             "required":true // TODO
          },
          "y-align":{
             "enum": ["top","middle","bottom"],
             "type":"string",
             "required":true // TODO
          },
          "content-width":{
             "type":"string",
             "required":true // TODO
          },
          "content-height":{
             "type":"string",
             "required":true // TODO
          }
       },
       "additionalProperties":true
    }
});

module.exports = CenteringDecorator

},{"./Empty":23,"./Thing":40}],21:[function(require,module,exports){
var RaphaelThing = require("./RaphaelThing")

// TODO kdyz zmenim parametry hodin a ulozim, nepromitne se to do inputu

var Clock = RaphaelThing.extend({
    refresh: function() {
        this.base();
        var 
            o = this.options,
            size = o.size,
            canvas = this.canvas,
            clock = canvas.circle(size*.5,size*.5, size * .475);
        clock.attr({"fill":o.fillColor,"stroke":o.strokeColor,"stroke-width":(size*.025)})
        var hour_sign;
        for(i=0;i<12;i++){
            var start_x = size*.5+Math.round((size*.4)*Math.cos(30*i*Math.PI/180));
            var start_y = size*.5+Math.round((size*.4)*Math.sin(30*i*Math.PI/180));
            var end_x = size*.5+Math.round((size*.45)*Math.cos(30*i*Math.PI/180));
            var end_y = size*.5+Math.round((size*.45)*Math.sin(30*i*Math.PI/180));
            hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
        }
        this.hour_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.25) + "");
        this.hour_hand.attr({stroke: o.hourHandColor, "stroke-width": size*.03});
        this.minute_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.2) + "");
        this.minute_hand.attr({stroke: o.minuteHandColor, "stroke-width": size*.02});
        this.second_hand = canvas.path("M" + size*.5 + " " + (size*.55) + "L" + size*.5 + " " + (size*.125) + "");
        this.second_hand.attr({stroke: o.secondHandColor, "stroke-width": size*.01});
        var pin = canvas.circle(size*.5, size*.5, size*.025);
        pin.attr("fill", o.pinColor);

        var self = this;
        var updater = function() {
            self.update();
        };
        updater();
        setInterval(updater,1000); 
    },
    update: function() {
        var self = this,
            size = this.options.size,
            now = new Date(),
            hours = now.getHours(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds(),
            cc = ","+(size*.5)+","+(size*.5);
        self.hour_hand.transform('r'+(30*hours+(minutes/2.5))+cc);
        self.minute_hand.transform('r'+(6*minutes)+cc);
        self.second_hand.transform('r'+(6*seconds)+cc);
    },
    _klass: "clock raphael-thing thing",
    _type: "clock",
    _defaults: {
        width: 100,
        height: 100,
        size: 100,
        fillColor: "white", 
        strokeColor: "black", 
        pinColor: "gray",
        hourHandColor:"black", 
        minuteHandColor:"black",
        secondHandColor:"black"
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "size":{
             "type":"integer",
             "required":true
          },
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "fillColor":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "strokeColor": { "type": "string", "required": true, "format": "color" },
          "pinColor": { "type": "string", "required": true, "format": "color" },
          "hourHandColor": { "type": "string", "required": true, "format": "color" },
          "minuteHandColor": { "type": "string", "required": true, "format": "color" },
          "secondHandColor": { "type": "string", "required": true, "format": "color" }
       },
       "additionalProperties":true
    }
});

module.exports = Clock

},{"./RaphaelThing":33}],22:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

// decorator = thing with a single slot named 'content'

// TODO podedit toto vsechno od 'Decorator'
// kvuli reverzibilite dekoratoru by bylo dobre kdyby kazdy menil css properties 'wrapper' divu
var Decorator = Thing.extend({
    init: function() {
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.html(value.get());
        return this;
    },
    unwrap: function() {
        this.replaceWith(this.getSlot('content'));
    },
    _klass: "decorator thing",
    _type: "decorator"
});


module.exports = Decorator
















},{"./Empty":23,"./Thing":40}],23:[function(require,module,exports){
var Thing = require("./Thing")

var Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
        /*
        if(this.parent) this.element.html(
            $("<div>").text(this.parent.getType()+"#"+this.name)
        );
        */
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Empty

},{"./Thing":40}],24:[function(require,module,exports){
var BookViewer = require("./BookViewer")

var ExportBookViewer = BookViewer.extend({
    constructor: function(options) {
        this.base(options);
        this.targetDiv = "#fullscreen"
    },
    init: function() {
        this.base()
        this.setFullscreen(true);
    },
    closeBook: function() {
        // export viewer closes the book
        this.close()
    },
    updateToolbar: function(gapWidth) {
        var page = this.bookContent.get().turn("page");
        var pages = this.bookContent.get().turn("pages");
        this.showIcon('turn-right', page>1);
        this.showIcon('turn-left', page<(pages-pages%2)); // kdyz ma kniha 3 strany, uz nejde druha otocit

        if(gapWidth) {
            var gapSize = 60;
            if(this.fullscreen) {
                gapSize += Math.floor(($("#book-wrapper").width() - gapWidth)/2);
            }
            var hh = this.bookContent.get().height();
            var iconSize = Math.min(gapSize - 12, 240);
            var iconSizeHalf = Math.floor(iconSize/2);
            var hh2 = Math.max(Math.floor(hh/2-iconSize/2), 28+2*iconSize);
            this.tools['turn-right'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['turn-left'].css({top: hh2+'px', width: iconSize+"px", height: iconSize+"px"});
            this.tools['closebook'].css({top: '16px', width: iconSizeHalf+"px", height: iconSizeHalf+"px"});
        }
    },
    setFullscreen: function(full) {
        this.fullscreen = full;
        this.updateToolbar(this.recreate());
        this.logEvent('book_fullscreen', this.bookUrl, full);
        return full;    
    }
});

module.exports = ExportBookViewer


},{"./BookViewer":18}],25:[function(require,module,exports){
var Layout = require("./Layout")
var Empty = require("./Empty")

var GridLayout = Layout.extend({
    init: function() {
        // TODO create grid and slots
        this.cellCount = 0;
        this.cells = {};
        for(var i=0; i<this.options.rows; i++) {
            for(var j=0; j<this.options.columns; j++) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
        }
    },
    // options changed...
    refresh: function() {
        this.base();
        var gap = this.options.gap;
        var cols = this.options.columns;
        var rows = this.options.rows;
        if(cols*rows != this.cellCount) {
          // resize grid...
          if(cols*rows < this.cellCount) {
            // truncate array...
            while(this.cellCount > rows*cols) {
                this.cellCount--;
                this.removeSlot(this.cellCount)
            }
          } else {
            // expand array by adding new elements
            while(this.cellCount<rows*cols) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
          }          
        }
        var ww = Math.round(10*(100 - (cols-1)*gap)/cols)/10;
        var hh = Math.round(10*(100 - (rows-1)*gap)/rows)/10;
        var xx = 0;
        var yy = 0;
        var ndx = 0;
        for(var i=0; i<rows; i++) {
            for(var j=0; j<cols; j++) {
                this.cells[ndx].css({
                    "width": ww+"%",
                    "height": hh+"%",
                    "left": xx+"%",
                    "top": yy+"%"
                });
                ndx++;
                xx += ww + gap;
            }
            xx = 0;
            yy += hh + gap;
        }
    },
    setSlot: function(key, value) {
        if(!!this.cells[key]) {
          this.base(key, value);
          this.cells[key].empty().append(value.get());
        }
        return this;
    },
    removeSlot: function(key) {
        if(this.hasSlot(key)) {
          this.cells[key].remove()
          delete this.cells[key]                
          this.base(key);
        }
    },
    _klass: "grid-layout layout thing",
    _type: "grid-layout",
    _defaults: {
        rows: 3, // nemelo by se menit za behu
        columns: 3, // nemelo by se menit za behu
        gap: 2 // v procentech
    },
    _schema: {
       "type":"object",
       "properties":{
          "rows":{
             "type":"integer",
             "required":true
          },
          "columns":{
             "type":"integer",
             "required":true
          },
          "gap":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = GridLayout


},{"./Empty":23,"./Layout":30}],26:[function(require,module,exports){
var Layout = require("./Layout")
var Slot = require("./Slot")

// TODO metody na prohazovani elementu - move to front/back, move up, move down
// TODO metody insert/delete?
// TODO -> DynamicLayout


var GrowableLayout = Layout.extend({
    init: function() {
        this.cells = []; // v tomto poradi budou v this.element!
        this.cellMap = {}; 
    },
    // remove all slots
    // TODO obsolete, use removeSlots instead
    clear: function() {
        this.element.empty();
        this.cells = [];
        this.cellMap = {};
    },
    length: function() {
        return this.cells.length;
    },
    first: function() {
        return this.cells.length ? this.cells[0] : undefined;
    },
    last: function() {
        return this.cells.length ? this.cells[this.cells.length-1] : undefined;
    },
    nth: function(ndx) {
        return (ndx>=0 && ndx<this.cells.length) ? this.cells[ndx] : undefined;
    },
    isEmpty: function() {
        return this.cells.length;
    },
    // dynamically add slot
    add: function(thing) {        
        var ndx = this.cells.length;
        var slot = new Slot(this, ndx);
        slot.element.appendTo(this.element);
        this.cells.push(slot);
        this.cellMap[ndx] = slot;
        this.setSlot(ndx, thing);
        return slot;
    },
    setSlot: function(key, value) {
        // TODO implement hasSlot
        this.base(key, value);
        this.cellMap[key].set(value);
        return this;
    },
    removeSlots: function() {
        // remove slot content...
        this.clearSlots(); 
        // remove slots proper...
        this.element.empty();
        this.slots = {};
        this.cells = [];
        this.cellMap = {};
    },
    setSlots: function(slots) {
        // remove existing slots...
        this.removeSlots();
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.add(slots[key]);
            }
        }
    },
    _klass: "growable-layout layout thing",
    _type: "growable-layout",
    _defaults: {
        "css": "" //"mykkro-flow-layout"
    },
    _schema: {
       "type":"object",
       "properties":{
          "css":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }
});

module.exports = GrowableLayout



},{"./Layout":30,"./Slot":38}],27:[function(require,module,exports){
var Thing = require("./Thing")

var Html = Thing.extend({
    init: function() {
        this.inner = $("<div>");
        this.element.html(this.inner);
    },
    refresh: function() {
        this.base();
        this.inner.html(this.options.html).attr('class',this.options.innerCss);
    },
    _klass: "html thing",
    _type: "html",
    _defaults: {
        html: ""
    },
    _schema: {
       "type":"object",
       "description":"Html properties",
       "properties":{
          "html":{
             "type":"string",
             "required":true
          },
          "css":{
             "type":"string",
             "required":false
          },
          "innerCss":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }

});

module.exports = Html


},{"./Thing":40}],28:[function(require,module,exports){
var Thing = require("./Thing")

var Imager = Thing.extend({
    refresh: function() {
        var img = $("<div>")
            .css("background-image",'url("'+this.options.url+'")')
            .css('background-position',this.options['position'])
            .css('background-repeat',this.options['repeat'])
            .css('background-color',this.options['color'])
            .css('background-size',this.options['size'])
            .css('-moz-background-size',this.options['size'])
            .css('-webkit-background-size',this.options['size']);
        this.element.html(img);
    },
    _klass: "imager thing",
    _type: "imager",
    _defaults: {
        "url": "images/demo/australie1.jpg",
        "repeat": "no-repeat",
        "position": "center center",
        "color": "white",
        "size": "cover" 
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "color": {
			    "type":"string",
			    "id": "color",
			    "required":true,
                "format": "color"
		    },
		    "position": {
			    "type":"string",
			    "id": "position",
			    "required":true
		    },
		    "repeat": {
			    "type":"string",
			    "id": "repeat",
			    "required":true
		    },
		    "size": {
			    "type":"string",
			    "id": "size",
                "enum":["cover","contain"],
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "my-image-uri",
			    "required":true
		    }
	    }
    }

});

module.exports = Imager

},{"./Thing":40}],29:[function(require,module,exports){
var Decorator = require("./Decorator")

var InsetDecorator = Decorator.extend({
    refresh: function() {
	this.base();
        this.element.css('padding',this.options.top+'% '+this.options.right+"% "+this.options.bottom+"% "+this.options.left+"%");
    },
    _klass: "inset-decorator decorator thing",
    _type: "inset-decorator",
    _defaults: {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
    },
    _schema: {
	"type":"object",
	"$schema": "http://json-schema.org/draft-03/schema",
	"properties":{
		"bottom": {
			"type":"number",
			"id": "bottom",
			"required":true
		},
		"left": {
			"type":"number",
			"id": "left",
			"required":true
		},
		"right": {
			"type":"number",
			"id": "right",
			"required":true
		},
		"top": {
			"type":"number",
			"id": "top",
			"required":true
		}
	},
       "additionalProperties":true
    }

});


module.exports = InsetDecorator
},{"./Decorator":22}],30:[function(require,module,exports){
var Thing = require("./Thing")

var Layout = Thing.extend({
    _klass: "layout thing",
    _type: "layout"
});

module.exports = Layout








},{"./Thing":40}],31:[function(require,module,exports){
var Decorator = require("./Decorator")

var OpacityDecorator = Decorator.extend({
    refresh: function() {
      this.base();
      this.element.css('opacity',this.options.opacity);
    },
    _klass: "opacity-decorator decorator thing",
    _type: "opacity-decorator",
    _defaults: {
        opacity: 0.8
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "opacity":{
             "type":"number",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = OpacityDecorator
},{"./Decorator":22}],32:[function(require,module,exports){
var Thing = require("./Thing")

var PlayerControls = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    init: function() {
        var self = this;
        var cont = $("<div>").addClass('controls').appendTo(this.element);
        this._playBtn = $("<button>")
            .addClass("play").append($("<span>").text("Play"))
            .appendTo(cont).click(function() { self.onPlay(); });
        this._pauseBtn = $("<button>")
            .addClass("pause").append($("<span>").text("Pause"))
            .appendTo(cont).click(function() { self.onPause(); });
        this._stopBtn = $("<button>")
            .addClass("stop").append($("<span>").text("Stop"))
            .appendTo(cont).click(function() { self.onStop(); });
        this.controls = cont;
        this.playing = false;
        this.paused = false;
    },
    refresh: function() {
        this.base();
        this.controls.toggleClass('playing', this.playing);
        this._playBtn.prop('disabled', this.playing);
        this._pauseBtn.prop('disabled', !this.playing);
        this._stopBtn.prop('disabled', !(this.playing/* || this.paused*/));    
        if(this.playing) {
            this._playBtn.hide();
            this._pauseBtn.show();
        } else {
            this._playBtn.show();
            this._pauseBtn.hide();
        }        
        if(this.playing/* || this.paused*/) {
            this._stopBtn.show();
        } else {
            this._stopBtn.hide();
        }
    },
    updateGui: function(playing, paused) {
        this.playing = playing;
        this.paused = paused;
        this.refresh();
    },
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this.updateGui(true, false);
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this.updateGui(false, true);
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this.updateGui(false, false);
            this._onstop(kb);
        }
    },
    _klass: "player-controls thing",
    _type: "player-controls",
    _defaults: {
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
	    }
    }
});

module.exports = PlayerControls

},{"./Thing":40}],33:[function(require,module,exports){
var Thing = require("./Thing")

var RaphaelThing = Thing.extend({
    refresh: function() {
        var o = this.options;
        var div = $("<div>");
        this.element.html(div);
        var paper = Raphael(div.get(0), "100%","100%");
        paper.setViewBox(0, 0, o.width, o.height, true);
        this.canvas = paper;
    },
    _klass: "raphael-thing thing",
    _type: "raphael-thing",
    _defaults: {
        width: 100,
        height: 100
    },
    _schema: {
       "type":"object",
       "description":"RaphaelThing properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RaphaelThing

},{"./Thing":40}],34:[function(require,module,exports){
var Thing = require("./Thing")
var Empty = require("./Empty")

var RefDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>").addClass("mykkro-ref-decorator-content")
        this._control = $("<a>").addClass('ref-link mykkro-ref-decorator-control')
        this._tooltip = $("<div>").addClass("hidden ref-tooltip")
        this.element.append(
            this._content,
            this._tooltip,
            this._control
        )
        this._control.qtip({content: { text: this._tooltip } })
        this.setSlot('content', new Empty())
    },
    refresh: function() {
        this.base()
        var label = this.options.label || "?"
        var src = this.options.source
        this._tooltip.empty().append($("<p>").text(__("Originally from:")))
        // TODO tohle nejak blbne...
        //if(Common.isValidUrl(src)) {
        if(src.startsWith("http")) {
            this._tooltip.append(
                $("<p>").append($("<a>").attr("href", src).text(src))
            )
            this._control.text(label).attr("href", src)
        } else {
            this._tooltip.append(
                $("<p>").text(src)
            )
            this._control.text(label).attr("href", "#").click(function() { return false;})
        }
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this._content.html(value.get());
        return this;
    },
    showToolbar: function() {
        this.options.hidden = false;
        this.refresh();
    },
    hideToolbar: function() {
        this.options.hidden = true;
        this.refresh();
    },
    /*
    serialize: function() {
        return this.getSlot('content').serialize();
    },
    */
    // pouziva se toto nekde?
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    /* ref decorator won't be editable */
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "ref-decorator thing",
    _type: "ref-decorator",
    _defaults: {
        label: null,
        source: "http://www.google.com"
    },
    _schema: {
       "type":"object",
       "properties":{
          "label":{
             "type":"string",
             "required":false
          },
          "source":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RefDecorator

},{"./Empty":23,"./Thing":40}],35:[function(require,module,exports){
var Thing = require("./Thing")

var RefList = Thing.extend({
    init: function() {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
    },
    refresh: function() {
        this.base();
    },
    // refs = array of ref decorator objects
    setReferences: function(refs) {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
      var list = $("<ul>").appendTo(this.element)
      if(refs) {
        for(var i=0; i<refs.length; i++) {
          list.append(this.makeReference(refs[i], i))
        }
      } else {
        this.element.append($("<p>").text(__("No references found.")))
      }
    },
    makeReference: function(ref, index) {
      return $("<li>").append(
        $("<span>").addClass("ref-link").text(index+1),
        $("<span>").addClass("ref-label").text(ref.options.source)
      )
    },
    _klass: "ref-list thing",
    _type: "ref-list",
    _defaults: {
    },
    _schema: {
       "type":"object",
       "description":"References List properties",
       "properties":{
       },
       "additionalProperties":true
    }

});

module.exports = RefList
},{"./Thing":40}],36:[function(require,module,exports){
var BorderDecorator = require("./BorderDecorator")

var RoundedDecorator = BorderDecorator.extend({
    refresh: function() {
        this.base();
        var br = this.options.radius;
        // TODO individualne vsechny 4 rohy
        this.element.css('border-radius',br);
        this.element.css('-webkit-border-radius',br);
        this.element.css('-moz-border-radius',br);
    },
    _klass: "rounded-decorator decorator thing",
    _type: "rounded-decorator",
    _defaults: {
        'width': "1px",
        'style': 'solid',
        'color': 'black',
        radius: "5%"
    },
    _schema: {
       "type":"object",
       "properties":{
          "width":{
             "type":"string",
             "required":true
          },
          "style":{
             "type":"string",
             "enum": ["none","solid","dotted","dashed","double","groove","ridge","inset","outset"],
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "radius":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = RoundedDecorator


},{"./BorderDecorator":19}],37:[function(require,module,exports){
var Decorator = require("./Decorator")

var ShadowDecorator = Decorator.extend({
    // options changed...
    refresh: function() {
	this.base();
        var br = this.options['h-shadow']+" "+this.options['v-shadow']+" "+this.options.blur+" "+this.options.spread+" "+this.options.color;
        this.element.css('box-shadow',br);
        this.element.css('-webkit-box-shadow',br);
    },
    _klass: "shadow-decorator decorator thing",
    _type: "shadow-decorator",
    _defaults: {
        'h-shadow': "5px",
        'v-shadow': "5px",
        blur: "5px",
        spread: "5px",
        color: "#666"
    },
    _schema: {
       "type":"object",
       "properties":{
          "h-shadow":{
             "type":"string",
             "required":true
          },
          "v-shadow":{
             "type":"string",
             "required":true
          },
          "blur":{
             "type":"string",
             "required":true
          },
          "spread":{
             "type":"string",
             "required":true
          },
          "color":{
             "type":"string",
             "format": "color",
             "required":true
          }
       },
       "additionalProperties":true
    }
});


module.exports = ShadowDecorator


},{"./Decorator":22}],38:[function(require,module,exports){
var Base = require("basejs")

var Slot = Base.extend({
    constructor: function(parent, name) {
        this.name = name;
        this.parent = parent;
        this.element = $("<div>").addClass("mykkro-slot").attr('data-name', name);
        this.thing = null;
    },
    empty: function() {
        this.element.empty();
        this.thing = null;
    },
    set: function(thing) {
        this.element.empty().append(thing.get());
        this.thing = thing;
    },
    get: function() {
        return this.thing;
    }
});

module.exports = Slot

},{"basejs":6}],39:[function(require,module,exports){
var Html = require("./Html")

var TextThing = Html.extend({
    refresh: function() {
        this.base();
        var o = this.options;
        if(o['h-align'] && o['h-align'] != 'center') this.inner.addClass(o['h-align']);
        if(o['v-align'] && o['v-align'] != 'center') this.inner.addClass(o['v-align']);
        this.inner.css('font-size', o['font-size']);
        this.inner.css('font-family', o['font-family']);
    },
    _klass: "text-thing html thing",
    _type: "text-thing",
    _defaults: {
        "html": "",
        "css": "",
        "h-align": "center",
        "v-align": "center",
        "font-size": "20px",
        "font-family": "Georgia, serif"
    },
    _schema: {
       "type":"object",
       "properties":{
          "html":{
             "type":"string",
	     "format":"richtext",
             "required":true
          },
          "h-align":{
             "type":"string",
             "enum":["left","center","right"],
             "required":false
          },
          "v-align":{
             "type":"string",
             "enum":["top","center","bottom"],
             "required":false
          },
          "font-size":{
             "type":"string",
             "enum":["50%","60%","75%", "85%", "100%", "120%", "150%", "175%", "200%", "250%"],
             "required":false
          },
          "font-family":{
             "type":"string",
             "enum":[
'Arial,Arial,Helvetica,sans-serif',
'Arial Black,Arial Black,Gadget,sans-serif',
'Comic Sans MS,Comic Sans MS,cursive',
'Courier New,Courier New,Courier,monospace',
'Georgia,Georgia,serif',
'Impact,Charcoal,sans-serif',
'Lucida Console,Monaco,monospace',
'Lucida Sans Unicode,Lucida Grande,sans-serif',
'Palatino Linotype,Book Antiqua,Palatino,serif',
'Tahoma,Geneva,sans-serif',
'Times New Roman,Times,serif',
'Trebuchet MS,Helvetica,sans-serif',
'Verdana,Geneva,sans-serif' 
],
             /*"format":"font",*/
             "required":false
          }
       },
       "additionalProperties":true
    }
});


module.exports = TextThing
},{"./Html":27}],40:[function(require,module,exports){
var Base = require("basejs")

Array.prototype.toObject = function() {
    var out = {};
    for(var i=0; i<this.length; i++) {
        out[i] = this[i];
    }
    return out;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var DEBUG = false

var _Empty
// kazda 'vec' ma options (s defaultni hodnotou) a slots
var Thing = Base.extend({
    constructor: function(options, slots) {
        this.options = $.extend({}, this.defaults(), options);        
        this.tid = Thing.tid++;
        Thing.things[this.tid] = this;
        this.element = $("<div>").addClass(this.getClass()).attr("data-tid", this.tid);
        if(DEBUG) {
            this.element.css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));
        }
        this.slots = {};
        this.parent = null;
        this.name = null;
        // initializing...
	    this.slotChanged($.noop);
        this.init();
        this.setSlots(slots);
        // display update
        this.refresh();
    },
    copy: function() {
        return Thing.create(this.serialize());
    },
    remove: function() {
        this.replaceWith(new _Empty());        
    },
    replaceWith: function(thing) {
        if(this.parent) {
            this.parent.setSlot(this.name, thing);
            this.parent = null;
            this.name = null;           
            Thing.things[this.tid] = null;
        }
    },
    // obali this dekoratorem
    decorate: function(deco) {
        if(this.parent) {
            var par = this.parent;
            var slot = this.name;
            deco.setSlot('content', this);
            par.setSlot(slot, deco);
            return deco;
        }
    },
    serialize: function() {
        var slots = {};
        var numslots = 0;
        for(var key in this.slots) {
            slots[key] = this.slots[key].serialize();
            numslots++;
        }
        var obj = {
            type: this.getType(),
            options: this.options
        };
        if(numslots) obj.slots = slots
        return obj;
    },
    getType: function() {
        return this._type;
    },
    getClass: function() {
        return this._klass.split(" ").map(function(a){return "mykkro-"+a;}).join(" ");
    },
    init: function() {
        // create structure and variables
    },
    refresh: function() {
        // options changed...
        this.element.attr('class','');
        this.element.addClass(this.getClass());
        this.element.addClass(this.options.css);
    },
    get: function() {
        return this.element;
    },
    defaults: function() {
        return this._defaults;
    },
    // muzeme se dostat takhle i ke slotu ve slotu
    content: function(key, value) {
        var ndx = key.indexOf(".");
        if(ndx>=0) {
            // odkazujeme se na slot ve slotu
            var newKey = key.substring(0,ndx);
            var rest = key.substring(ndx+1);
            return this.getSlot(newKey).content(rest, value);
        }
        if(this.hasSlot(key)) {
            if(value) {
                // setter
                this.setSlot(key, value);
                return this;
            } else {
                // getter
                return this.getSlot(key);
            }
        } else {
            // unknown slot!
            return null;
        }
    },
    hasSlot: function(key) {
        return !!this.slots[key];
    },
    getSlot: function(key) {
        return this.slots[key];
    },
    setSlot: function(key, thing) {
        this.slots[key] = thing;
        thing._setParent(this, key);
        // DOM manipulation - to be overridden
	    this.slotChanged(key);
        return this;
    },
    removeSlot: function(key) {
        delete this.slots[key]
    },
    clearSlots: function() {
        for(var key in this.slots) {
            this.setSlot(key, new _Empty());
        }
    },
    setOptions: function(opts) {
        this.options = $.extend(this.options, opts);
        this.refresh();
	    this.slotChanged('options');
    },
    setSlots: function(slots) {
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.setSlot(key, slots[key]);
            }
        }
    },
    _setParent: function(parent, key) {
        this.parent = parent;
        this.name = key;
    },
    isEmpty: function() {
        return this.getType() == "empty";
    },
    slotChanged: function(arg) {
        if(typeof arg == "function") {
            this.onslotchanged = arg;
        } else {
            return this.onslotchanged(this, arg);
        }
    },    
    // bez parametru vraci rekurzivne vsechny sloty
    findSlots: function(predicate, out) {
        if(!predicate) predicate = function() { return true; };
        if(!out) out = [];
        if(predicate(this)) out.push(this);
        for(var key in this.slots) {
            this.slots[key].findSlots(predicate, out);
        }
        return out;
    },
    findEmptySlots: function(out) {
        return this.findSlots(function(thing) { return thing.isEmpty(); }, out)
    },
    findSlotsByType: function(type, out) {
        return this.findSlots(function(thing) { return thing.getType() == type; }, out)
    },
    getTree: function() {
        var node = { type: this.getType(), children: {} };
        for(var key in this.slots) {
            node.children[key] = this.slots[key].getTree();
        }
        return node;
    },
    _toggleTreeView: function(node) {
        node.children(".slots").toggleClass('collapsed');
    },
    // TODO mohlo by si to pamatovat expands/collapse mezi updaty
    /* example decorator:
        decorator = function(thing, node) {
            $("<div>").addClass("toolz").insertAfter(node.find(">h2"));
        };
    */
    getTreeView: function(decorator) {
        var self = this;
        var node = $("<div>").addClass('node').attr('data-type', this.getType()).attr('data-tid', this.tid);
        var hdr = $("<h2>").text(this.getType()).appendTo(node);
        var slots = $("<div>").addClass('slots').appendTo(node);
        hdr.click(function() {
            self._toggleTreeView(node);
        });
        for(var key in this.slots) {
            (function(){
                var subtree = self.slots[key].getTreeView(decorator);
                var subheading = $("<h3>").text(key).click(function() {
                    $(this).toggleClass('collapsed');
                    self._toggleTreeView(subtree);
                });
                slots.append(subheading);
                slots.append(subtree);
            })();
        }
        node.append($("<div>").addClass('clear'));
        if(decorator) decorator(this, node);
        return node;
    },
    _type: "thing",
    _defaults: {
        "css": ""
    },
    _klass: "thing",
    _schema: {
       "type":"object",
       "properties":{
       },
       "additionalProperties":true
    }

}, {
    tid: 0,
    things: {}
});

_Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Thing

},{"basejs":6}],41:[function(require,module,exports){
var Thing = require("./Thing")

var convertUri = function(uri, baseUri) {
    // if uri starts with '/' or 'http://', leave it be
    // else prepend baseUri
    return baseUri + "/" + uri
}

var Things = {
    klasses: {
        "audio-decorator": require("./AudioDecorator"),
        "book": require("./Book"),
        "background-decorator": require("./BackgroundDecorator"),
        "border-decorator": require("./BorderDecorator"),
        "clock": require("./Clock"),
        "empty": require("./Empty"),
        "grid-layout": require("./GridLayout"),
        "growablelayout": require("./GrowableLayout"),
        "imager": require("./Imager"),
        "inset-decorator": require("./InsetDecorator"),
        "layout": require("./Layout"),
        "opacity-decorator": require("./OpacityDecorator"),
        "ref-decorator": require("./RefDecorator"),
        "ref-list": require("./RefList"),
        "rounded-decorator": require("./RoundedDecorator"),
        "shadow-decorator": require("./ShadowDecorator"),
        "text-thing": require("./TextThing"),
        "tubeplayer-thing": require("./TubeplayerThing"),
        "video-thing": require("./VideoThing"),
    },
    create: function(def, opts) {
        if(!def) {
            return new Empty();
        }
        // udelat deserializaci
        // { type, options, slots }
        var klassName = def.type.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
        klassName = klassName.capitalize();
        var klazz = Things.klasses[def.type];
        if(!klazz) {
            throw new Error("Unknown thing type: "+def.type)
        }
        var slots = def.slots;
        var oid = def.id;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.create(slots[key]);
        }
        var thing = new klazz($.extend(def.options, opts), slots);
        thing.oid = oid
        return thing
    },
    convertURIs: function(def, baseUri) {
        if(!def || !baseUri) {
            return def
        }
        var out = $.extend({}, def)
        var type = out.type
        if(type == "imager") {
            out.options.url = convertUri(out.options.url, baseUri)
            // console.log("Imager: ", def)
        } else if(type == "audio-decorator") {
            out.options.uri = convertUri(out.options.uri, baseUri)
            // console.log("Audio: ", def)
        } else if(type == "video-thing") {
            out.options.uri = convertUri(out.options.uri, baseUri)
            // console.log("Video: ", def)
        }
        var slots = out.slots;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.convertURIs(slots[key], baseUri);
        }
        return out
    }    
}


module.exports = Things

},{"./AudioDecorator":15,"./BackgroundDecorator":16,"./Book":17,"./BorderDecorator":19,"./Clock":21,"./Empty":23,"./GridLayout":25,"./GrowableLayout":26,"./Imager":28,"./InsetDecorator":29,"./Layout":30,"./OpacityDecorator":31,"./RefDecorator":34,"./RefList":35,"./RoundedDecorator":36,"./ShadowDecorator":37,"./TextThing":39,"./Thing":40,"./TubeplayerThing":42,"./VideoThing":43}],42:[function(require,module,exports){
var Thing = require("./Thing")

$.tubeplayer.defaults.afterReady = function($player) {
    console.log($player)
    // TODO resize only single player
	$(".tubeplayer-wrapper").resize()
}

var TubeplayerThing = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    thumbnailUrl: function() {
        return $.jYoutube(this.options.name, 'small');
    },
    init: function() {
    	this.wrapper = $("<div>").addClass("tubeplayer-wrapper")
        this.glasspane = $("<div>").addClass("tubeplayer-glasspane")        
        var self = this
		self.wrapper.resize(function(e) {
			console.log("Resizing! width="+self.wrapper.width()+", height="+self.wrapper.height())
			self.adjustPlayerSize()
		})        
		console.log("Initialized!")
    },
    play: function() {
        this._play();
    },
    _play: function() {
        this.player.tubeplayer("play")
        this.onPlay();
    },
    _pause: function() {
        this.player.tubeplayer("pause")
        this.onPause();
    },
    _stop: function() {
        this.player.tubeplayer("stop")
        this.onStop();
    },
    _kill: function() {
        this.player.tubeplayer("destroy")
        this.player.remove()
        this.player = null
        this.onKill();
    },
    _setVolume: function(vol) {
        this.player.tubeplayer("volume", vol)
    },
    adjustPlayerSize: function() {
    	var self = this    	
    	console.log("Adjusting player size! width="+self.wrapper.width()+", height="+self.wrapper.height())
        self.player.tubeplayer("size", {
			width: self.wrapper.width(), 
			height: self.wrapper.height()
		})
    },
    refresh: function() {
        this.base();
        if(this.player) {
            //this.player.tubeplayer("destroy")
            this.player.remove()
            this.player = null
        }
        this.player = $("<div>").addClass("tubeplayer-container")
        this.element.html(this.wrapper.empty().append(
            this.player
            // this.glasspane
        ))
        var self = this;
        var o = self.options
		self.player.tubeplayer({
			allowFullScreen: false,
			autoPlay: false,
			showControls: 0,
            initialVideo: o.name,
            preferredQuality: o.quality,
            autoPlay: o.autoplay,
            onPlayerUnstarted: function(){},
			onPlay: function(id){}, // after the play method is called
			onPause: function(){}, // after the pause method is called
			onStop: function(){}, // after the player is stopped
			onSeek: function(time){}, // after the video has been seeked to a defined point
			onMute: function(){}, // after the player is muted
			onUnMute: function(){} // after the player is unmuted
		})		
        // console.log(self.player.tubeplayer("player"))
        self._setVolume(o.volume)
    },
    _klass: "tubeplayer-thing thing",
    _type: "tubeplayer-thing",
    _defaults: {
        "name": "ydRAb9cwHnA",
        'quality': "default",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "name": {
			    "type":"string",
                "format": "string",
			    "required":true
    	    },
		    "quality": {
			    "type":"string",
                "format": "string",
			    "required":true
    	    },
            "volume":{
                "type":"integer",
                "required":true // TODO
            },
            "autoplay":{
                "type":"boolean",
                "required":true // TODO
            },
            "loop":{
                "type":"boolean",
                "required":true // TODO
            }
	    }
    }

});

module.exports = TubeplayerThing
},{"./Thing":40}],43:[function(require,module,exports){
var Thing = require("./Thing")
var PlayerControls = require("./PlayerControls")
var CenteringDecorator = require("./CenteringDecorator")

var VideoThing = Thing.extend({
    _onplay: $.noop,
    _onpause: $.noop,
    _onstop: $.noop,
    _onkill: $.noop,
    onPlay: function(kb) {
        if(typeof kb == 'function') {
            this._onplay = kb;
        } else {
            this._onplay(kb);
        }
    },
    onPause: function(kb) {
        if(typeof kb == 'function') {
            this._onpause = kb;
        } else {
            this._onpause(kb);
        }
    },
    onStop: function(kb) {
        if(typeof kb == 'function') {
            this._onstop = kb;
        } else {
            this._onstop(kb);
        }
    },
    onKill: function(kb) {
        if(typeof kb == 'function') {
            this._onkill = kb;
        } else {
            this._onkill(kb);
        }
    },
    init: function() {
    },
    play: function() {
        this._play();
        this.player.updateGui(true, false);
    },
    _play: function() {
        this.video.get(0).play();
        this.onPlay();
    },
    _pause: function() {
        this.video.get(0).pause();
        this.onPause();
    },
    _stop: function() {
        //this.video.get(0).pause();
        //this.video.get(0).currentTime = 0;
        // regenerate player...
        this.refresh();  // TODO udelat to lepe
        this.onStop();
    },
    _kill: function() {
        this.video.get(0).pause();
        this.video.get(0).src = "";
        this.onKill();
    },
    _setVolume: function(vol) {
        // HTML5 volume is between 0 and 1
        this.video.get(0).volume = vol / 100.0;
    },
    _addSource: function(uri, type) {
        if(uri) {
            $("<source>").attr({src:uri, type: type, preload: false/**/}).appendTo(this.video);
        }
    },
    refresh: function() {
        this.base();
        var self = this;
        this.video = $("<video>");
        this.player = new PlayerControls();  
        this.player.onPlay(function() { self._play(); });
        this.player.onPause(function() { self._pause(); });
        this.player.onStop(function() { self._stop(); });
        var cc = new CenteringDecorator({},{content: this.player});
        this.pane = cc.get();
        this.pane.addClass("player");
        this.element.empty()
            .append(this.video)
            .append(this.pane);

        this.video.prop('loop', this.options.loop);
        if(this.options.uri) {            
            var ext = this.options.uri.split('.').pop();
            this.options.ogg = (ext == 'ogg' || ext == 'ogv') ? this.options.uri : '';
            this.options.mp4 = (ext == 'mp4') ? this.options.uri : '';
            this.options.webm = (ext == 'webm') ? this.options.uri : '';
        }
        this._addSource(this.options.ogg, 'video/ogg; codecs="theora, vorbis"');
        this._addSource(this.options.mp4, 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        this._addSource(this.options.webm, 'video/webm; codecs="vp8, vorbis"');
        ////this.video.get(0).src = this.options.uri;
        // TODO tohle nejak zlobi v Chrome, pri znovuvytvareni videi... ale ve FF to zda se funguje

        // HTML5 volume is between 0 and 1
        this._setVolume(this.options.volume);
        this.video.on('canplay canplaythrough', function(){
            console.log('canplay event fired');
        });
    },
    _klass: "video-thing thing",
    _type: "video-thing",
    _defaults: {
        "uri": "",
        'ogg': "",
        'mp4': "",
        'webm': "",
        'autoplay': false,
        'loop': false,
        'volume': 50
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "uri": {
			    "type":"string",
                "format": "my-video-uri",
			    "required":true
    	    },
            "volume":{
                "type":"integer",
                "required":true // TODO
            },
            "autoplay":{
                "type":"boolean",
                "required":true // TODO
            },
            "loop":{
                "type":"boolean",
                "required":true // TODO
            }
	    }
    }

});


/*

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('vid');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var cw = canvas.clientWidth;
    var ch = canvas.clientHeight;
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context);
    },false);

},false);

var mode = 'stretch';
function draw(v,c) {
    var canvas = document.getElementById('canvas');
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if(v.paused || v.ended) return false;
    if(mode == 'stretch') {
        c.drawImage(v,0,0,w,h); //-> stretch
    } else if(mode == 'cover') {
        // TODO tady je neco spatne
        var sx=0, sy=0, sw=v.width, sh=v.height;
        if(sw/sh < w/h) {
            sy = (sh - h*sw/w)/2;
            sh = h*sw/w;
        } else {
            sx = (sw - w*sh/h)/2;
            sw = w*sh/h;
        }
        c.drawImage(v,sx,sy,sw,sh,0,0,w,h); 
    } else { // contain
        var ww = v.width;
        var hh = v.height;
        var x = y = 0;
        if(ww/hh < w/h) {
            x = (w-ww*h/hh)/2;
            c.drawImage(v,x,0,ww*h/hh,h); 
        } else {
            y = (h-hh*w/ww)/2;
            c.drawImage(v,0,y,w,hh*w/ww); 
        }
    }
    setTimeout(draw,20,v,c);
}

<canvas id="canvas"></canvas>

*/

module.exports = VideoThing

},{"./CenteringDecorator":20,"./PlayerControls":32,"./Thing":40}],"pagescript":[function(require,module,exports){
module.exports=require('HJD/OK');
},{}],"HJD/OK":[function(require,module,exports){
module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var ExportBookViewer = require("./js/things/ExportBookViewer")
    var Things = require("./js/things/Things")

    var path = require("path")

    var bookman_log = function(data) {
      console.log(data);
    }

    var page = BasePage.extend({
        init: function(data, next) {
            var url = require("url")
            var appName = data.query.importname
            var self = this

            /* use data to modify page */
            var quitBtn = this.getWidget("quitButton")
            var favButton = this.getWidget("favButton")
            var unfavButton = this.getWidget("unfavButton")

            function setFavState(flag) {
                if (flag) {
                    favButton.disable()
                    unfavButton.enable()
                } else {
                    favButton.enable()
                    unfavButton.disable()
                }
            }
            /*
			FavApps.starred(userId, appId, function(err, data) {
				setFavState(!err && data)
			})
			favButton.click(function() {
				FavApps.star(userId, appId, function(err, data) {
					if(!err) setFavState(true)
				})					
			})
			unfavButton.click(function() {
				FavApps.unstar(userId, appId, function(err, data) {
					if(!err) setFavState(false)
				})					
			})
*/
            quitBtn.click(function() {
                // move back to previous page...
                self.goBack()
            })

            var baseUrl = "/imports/" + appName
            var metadataUrl = baseUrl + "/book.json"

            $.getJSON(metadataUrl).done(function(book) {
                // convert all relative URIs
                book = Things.convertURIs(book, baseUrl)
                // create book view...
                var bookView = new ExportBookViewer({data:book, fullscreen:true, logger: bookman_log, url:"https://nit.felk.cvut.cz/~myrousz/escrapbook-v3/books/view/34"});
                bookView.init();
                /* continue when finished */
                if (next) next(self)
            }).fail(function(err) {
                console.error(err)
                if (next) next(self)
            })

        }
    })
    return page

}

},{"../../../js/BasePage":1,"./js/things/ExportBookViewer":24,"./js/things/Things":41,"path":8,"url":14}]},{},["HJD/OK"])