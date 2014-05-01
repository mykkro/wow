var Base = require("basejs")

var GridController = Base.extend({
    constructor: function(opts) {
        this.width = opts.width || 10
        this.height = opts.height || 10
        this.selected = opts.selected
        this.changed = opts.changed,
        this.row = opts.row || 0
        this.col = opts.col || 0
    },
    select: function(row, col) {
        this.row = row
        this.col = col
        this.onSelectionChanged(row, col)
    },
    onVirtualControl: function(evt) {
        var r = this.row
        var c = this.col
        if (evt.type == "press") {
            switch (evt.control) {
                case 'up':
                    r = (r + this.height - 1) % this.height
                    break
                case 'down':
                    r = (r + 1) % this.height
                    break
                case 'left':
                    c = (c + this.width - 1) % this.width
                    break
                case 'right':
                    c = (c + 1) % this.width
                    break
                case 'select':
                    this.onSelect(r, c)
                    return
            }
        }
        this.row = r
        this.col = c
        this.onSelectionChanged(r, c)
    },
    onSelectionChanged: function(row, col) {
        console.log("selection changed!")
        if (this.changed) {
            this.changed(row, col)
        }
    },
    onSelect: function(row, col) {
        console.log("selected! row=" + row + " col=" + col)
        if (this.selected) {
            this.selected(row, col)
        }
    }
})


module.exports = GridController
