var Base = require("basejs")

var Slot = Base.extend({
    constructor: function(parent, name) {
        this.name = name;
        this.parent = parent;
        this.element = $("<div>").addClass("mykkro-slot").attr('data-name', name);
        this.thing = null;
    },
    empty: function() {
        this.element.empty();
        this.thing = null;
    },
    set: function(thing) {
        this.element.empty().append(thing.get());
        this.thing = thing;
    },
    get: function() {
        return this.thing;
    }
});

module.exports = Slot
