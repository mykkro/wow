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
