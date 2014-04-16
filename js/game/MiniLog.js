var Base = require("basejs")

var MiniLog = Base.extend({
    constructor: function(name, logInfo) {
        this.info = logInfo
        this.name = name
        this.element = $("<div>").addClass("log")
        if (!logInfo.visible) this.element.addClass("hidden")
        this.init()
        this.element.append(
            $("<span>").addClass("label").text(this.info.label + ": "),
            this.valueElement
        )
        this.update(logInfo.defaultValue)
    },
    init: function() {
        this.valueElement = $("<span>").addClass(this.name)
    },
    update: function(value) {
        this.valueElement.text(value)
    }
}, {
    create: function(name, logInfo) {
        if (name == "lives") {
            return new LivesMiniLog(name, logInfo)
        }
        return new MiniLog(name, logInfo)
    }
})

var LivesMiniLog = MiniLog.extend({
    constructor: function(name, logInfo) {
        this.base(name, logInfo)
    },
    init: function() {
        this.valueElement = $('<div class="lifebar-wrapper"><div class="lifebar"></div></div>')
    },
    update: function(value) {
        console.log("LivesMiniLog!")
        var innerWidth = Math.round(value * 32) // size of the heart icon
        this.valueElement.find(".lifebar").css("width", innerWidth)
    }
})

module.exports = MiniLog
