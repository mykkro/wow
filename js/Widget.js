var Base = require("basejs")


var Widget = Base.extend({
    constructor: function(data) {
        this.element = data.element
        this.type = data.type
        this.id = data.id
        this.name = data.name
        this.bounds = data.bounds
        this.dim = data.dim
        //this.setClass("glow2", true)
    },
    click: function(cb) {
        var self = this
        $(this.element).click(function() {
            if (self.isEnabled()) cb()
        })
    },
    disable: function() {
        $(this.element).addClass("disabled")
    },
    enable: function() {
        $(this.element).removeClass("disabled")
    },
    setEnabled: function(flag) {
        if (flag) {
            this.enable()
        } else {
            this.disable()
        }
    },
    isEnabled: function() {
        return !this.hasClass("disabled")
    },
    setHighlighted: function(flag) {
        this.setClass("glow2", flag)
    },
    isHighlighted: function() {
        return this.hasClass("glow2")
    },
    setClass: function(klass, flag) {
        if (flag) {
            $(this.element).addClass(klass)
        } else {
            $(this.element).removeClass(klass)
        }
    },
    hasClass: function(klass) {
        return $(this.element).hasClass(klass)
    }
})

module.exports = Widget
