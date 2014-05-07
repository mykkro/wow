"use strict";

var Base = require("basejs")

var Watches = Base.extend({
    constructor: function(paper) {
        this.paper = paper;
        this.watches = {};
        this.watchCount = 0;
    },
    put: function(name, value) {
        if (this.watches[name]) {
            this.update(name, value);
        } else {
            this.add(name, value);
        }
    },
    add: function(name, value) {
        var watch = this.paper.text(10, 10 + this.watchCount * 16, name + "=" + value).attr("text-anchor", "start");
        this.watches[name] = watch;
        this.watchCount++;
    },
    update: function(name, value) {
        this.watches[name].attr("text", name + "=" + value);
    }
});

module.exports = Watches
