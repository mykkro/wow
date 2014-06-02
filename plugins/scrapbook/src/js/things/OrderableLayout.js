var GrowableLayout = require("./GrowableLayout")

// TODO metody na prohazovani elementu - move to front/back, move up, move down
// TODO metody insert/delete?
// TODO -> DynamicLayout
// TODO ze by se to poradi slotu dalo ulozit?
var OrderableLayout = GrowableLayout.extend({
    init: function() {
        this.cells = []; // v tomto poradi budou v this.element!
        this.cellMap = {}; 
    },
    // what muze byt Slot nebo Thing
    getSlotIndex: function(what) {
        if(what && typeof what === 'object') {
            for(var i=0; i<this.cells.length; i++) {
                if(this.cells[i] == what || this.cells[i].get() == what) return i;
            }
            return -1;
        } else {
            if(what>=0 && what < this.cells.length) return what;
            return -1;
        }
    },
    moveSlotUp: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>0) {
            // swap slots 'i-1' and 'i'
            this.swapSlots(slot-1, slot);
        }
    },
    moveSlotDown: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>=0 && slot<this.cells.length-1) {
            // swap slots 'i' and 'i+1'
            this.swapSlots(slot, slot+1);
        }
    },
    moveSlotToTop: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>0) {
            this.swapSlots(0, slot);
        }
    },
    moveSlotToBottom: function(slot) {
        slot = this.getSlotIndex(slot);
        if(slot>=0 && slot<this.cells.length-1) {
            this.swapSlots(slot, this.cells.length-1);
        }
    },
    swapSlots: function(slot1, slot2) {
        slot1 = this.getSlotIndex(slot1);
        slot2 = this.getSlotIndex(slot2);
        if(slot1 != slot2) {
            // prohodit to v DOM...
            this.cells[slot1].element.swap(this.cells[slot2].element);
            var tmp = this.cells[slot1];
            this.cells[slot1] = this.cells[slot2];
            this.cells[slot2] = tmp;
        }
    },
    shuffle: function() {
        var len = this.cells.length;
        for (var i = len-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            this.swapSlots(randomIndex, i);
        }
    },
    remove: function(what) {        
        var ndx = this.getSlotIndex(what);
        if(ndx>=0) {
            var slot = this.cells[ndx];
            this.cellMap[slot.name] = null;
            // remove from array
            this.cells.remove(ndx);
            // remove from DOM
            slot.element.remove();
            this.refresh();
        }
    },
    _klass: "orderable-layout growable-layout layout thing",
    _type: "orderable-layout",
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


module.exports = OrderableLayout