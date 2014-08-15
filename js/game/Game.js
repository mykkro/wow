"use strict";

var Base = require("basejs")
var Splash = require("./Splash")

var Game = Base.extend({
    // options
    constructor: function(options, root, appUrl) {
        this.options = options || {}
        this.root = root
        this.appUrl = appUrl
        this.controller = null
        this.settings = {}
		this.paused = false
		this.started = false
    },
    // set game config (difficulty etc.)
    config: function(settings) {
        console.log("Setting game configuration for next game...", settings)
        this.settings = settings
    },
    init: function(cb) {
        // do some initialization...
        this.log("status", "initialize")
        if (cb) cb()
    },
    start: function(cb) {
        // start the game...
        this.log("status", "start")
		this.started = true
        if (cb) cb()
    },
	/* utility method */
    restart: function(cb) {        
        this.log("status", "restart")
        var self = this
        this.stop(function() {
            self.start(cb)
        })

    },
    pause: function(cb) {
        this.paused = true
        this.log("status", "pause")
        if (cb) cb()
    },
    resume: function(cb) {
		this.paused = false
        this.log("status", "resume")
        if (cb) cb()
    },
    stop: function(cb) {
        this.log("status", "stop")
		this.started = false
        if (cb) cb()
    },
	/* utility method */
    quit: function(cb) {
        this.log("status", "quit")
        this.stop(cb)
    },
    onVirtualControl: function(evt) {
        console.log("Controller Event: ", evt)
    },
    onKeyboard: function(evt) {
        // console.log("Keyboard Event: ", evt)
    },
    getResourceUri: function(uri) {
        return (uri && uri.charAt(0) == "/") ? uri : this.appUrl + uri
    },
    availableLogs: function() {
        return {
            // map of available logs
            status: {
                "label": __("Status"),
                "type": "string",
                "defaultValue": "",
                "visible": false
            },
            score: {
                "label": __("Score"),
                "type": "integer",
                "defaultValue": 0,
                "visible": true
            }
        }
    },
    log: function(name, value) {
        if (this.options.logger) {
            this.options.logger(name, value)
        }
    },
    setLogger: function(logger) {
        this.options.logger = logger
    },
    prompt: function(text, options, cb) {
        return new Splash({
            text: text,
            delay: options.delay,
            overlay: true,
            hideOnClick: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    startGamePrompt: function(cb) {
        return new Splash({
            text: __("Starting game..."),
            delay: 2000,
            overlay: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    pauseGamePrompt: function(cb) {
        return new Splash({
            text: __("Paused"),
            overlay: true,
            hideOnClick: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    quitGamePrompt: function(cb) {
        return this.prompt(__("Game over"), {}, cb)
    },
    levelUpPrompt: function(cb) {
        return this.prompt(__("Well done!"), {}, cb)
    },
    hidePrompt: function() {
        Splash.removeAll()
    }
})

module.exports = Game
