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
