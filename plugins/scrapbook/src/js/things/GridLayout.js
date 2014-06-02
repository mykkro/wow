var Layout = require("./Layout")
var Empty = require("./Empty")

var GridLayout = Layout.extend({
    init: function() {
        // TODO create grid and slots
        this.cellCount = 0;
        this.cells = {};
        for(var i=0; i<this.options.rows; i++) {
            for(var j=0; j<this.options.columns; j++) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
        }
    },
    // options changed...
    refresh: function() {
        this.base();
        var gap = this.options.gap;
        var cols = this.options.columns;
        var rows = this.options.rows;
        if(cols*rows != this.cellCount) {
          // resize grid...
          if(cols*rows < this.cellCount) {
            // truncate array...
            while(this.cellCount > rows*cols) {
                this.cellCount--;
                this.removeSlot(this.cellCount)
            }
          } else {
            // expand array by adding new elements
            while(this.cellCount<rows*cols) {
                // create slot
                this.cells[this.cellCount] = $("<div>").appendTo(this.element);                
                // set slot value
                this.setSlot(this.cellCount, new Empty());
                this.cellCount++;
            }
          }          
        }
        var ww = Math.round(10*(100 - (cols-1)*gap)/cols)/10;
        var hh = Math.round(10*(100 - (rows-1)*gap)/rows)/10;
        var xx = 0;
        var yy = 0;
        var ndx = 0;
        for(var i=0; i<rows; i++) {
            for(var j=0; j<cols; j++) {
                this.cells[ndx].css({
                    "width": ww+"%",
                    "height": hh+"%",
                    "left": xx+"%",
                    "top": yy+"%"
                });
                ndx++;
                xx += ww + gap;
            }
            xx = 0;
            yy += hh + gap;
        }
    },
    setSlot: function(key, value) {
        if(!!this.cells[key]) {
          this.base(key, value);
          this.cells[key].empty().append(value.get());
        }
        return this;
    },
    removeSlot: function(key) {
        if(this.hasSlot(key)) {
          this.cells[key].remove()
          delete this.cells[key]                
          this.base(key);
        }
    },
    _klass: "grid-layout layout thing",
    _type: "grid-layout",
    _defaults: {
        rows: 3, // nemelo by se menit za behu
        columns: 3, // nemelo by se menit za behu
        gap: 2 // v procentech
    },
    _schema: {
       "type":"object",
       "properties":{
          "rows":{
             "type":"integer",
             "required":true
          },
          "columns":{
             "type":"integer",
             "required":true
          },
          "gap":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

module.exports = GridLayout

