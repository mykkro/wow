//Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
//Modified by Myrousz 2014
//MIT License

var Base = require("basejs")

var EventTarget = Base.extend({
    constructor: function() {
        this._listeners = {};
    },
    addListener: function(type, listener) {
        var types = type.split(" ")
        for (var i = 0; i < types.length; i++) {
            type = types[i]
            if (typeof this._listeners[type] == "undefined") {
                this._listeners[type] = [];
            }
            this._listeners[type].push(listener);
        }
    },
    fire: function(event) {
        if (typeof event == "string") {
            event = {
                type: event
            };
        }
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) { //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type, listener) {
        var types = type.split(" ")
        for (var i = 0; i < types.length; i++) {
            type = types[i]
            if (this._listeners[type] instanceof Array) {
                var listeners = this._listeners[type];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
})

module.exports = EventTarget
