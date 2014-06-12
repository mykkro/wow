
var Base = require("basejs")

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

module.exports = SelectChain
