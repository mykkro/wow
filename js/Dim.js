'use strict';

var Base = require("basejs")

var Dim = Base.extend({
    constructor: function(w, h) {
        this.width = w
        this.height = h
    }
})

module.exports = Dim
