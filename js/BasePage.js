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
        for (key in changes) {
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
