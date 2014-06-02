var Layout = require("./Layout")
var Slot = require("./Slot")

// TODO metody na prohazovani elementu - move to front/back, move up, move down
// TODO metody insert/delete?
// TODO -> DynamicLayout


var GrowableLayout = Layout.extend({
    init: function() {
        this.cells = []; // v tomto poradi budou v this.element!
        this.cellMap = {}; 
    },
    // remove all slots
    // TODO obsolete, use removeSlots instead
    clear: function() {
        this.element.empty();
        this.cells = [];
        this.cellMap = {};
    },
    length: function() {
        return this.cells.length;
    },
    first: function() {
        return this.cells.length ? this.cells[0] : undefined;
    },
    last: function() {
        return this.cells.length ? this.cells[this.cells.length-1] : undefined;
    },
    nth: function(ndx) {
        return (ndx>=0 && ndx<this.cells.length) ? this.cells[ndx] : undefined;
    },
    isEmpty: function() {
        return this.cells.length;
    },
    // dynamically add slot
    add: function(thing) {        
        var ndx = this.cells.length;
        var slot = new Slot(this, ndx);
        slot.element.appendTo(this.element);
        this.cells.push(slot);
        this.cellMap[ndx] = slot;
        this.setSlot(ndx, thing);
        return slot;
    },
    setSlot: function(key, value) {
        // TODO implement hasSlot
        this.base(key, value);
        this.cellMap[key].set(value);
        return this;
    },
    removeSlots: function() {
        // remove slot content...
        this.clearSlots(); 
        // remove slots proper...
        this.element.empty();
        this.slots = {};
        this.cells = [];
        this.cellMap = {};
    },
    setSlots: function(slots) {
        // remove existing slots...
        this.removeSlots();
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.add(slots[key]);
            }
        }
    },
    _klass: "growable-layout layout thing",
    _type: "growable-layout",
    _defaults: {
        "css": "" //"mykkro-flow-layout"
    },
    _schema: {
       "type":"object",
       "properties":{
          "css":{
             "type":"string",
             "required":false
          }
       },
       "additionalProperties":true
    }
});

module.exports = GrowableLayout


