var Base = require("basejs")
var GameWithRules = require("../../js/rulegame/GameWithRules")
var GridController = require("../../js/game/GridController.js")

var MyGame = GameWithRules.extend({
    constructor: function(options, root, gamedata, appUrl) {
        this.base(options, root, gamedata, appUrl);
        this.boardWidth = 1000
        this.boardHeight = 1000
    },
    start: function(cb) {
        var self = this
        console.log("Starting custom rule-based game...")
        this.base(cb)
        var pos = this.getCurrentPosition()
        this.gridCtl = new GridController({
            width: this.symbols.VALID.width,
            height: this.symbols.VALID.height,
            x: pos.x,
            y: pos.y,
            changed: function() {
                self.updateSelection(self.symbols.VALID)
            },
            selected: function(row, col) {
                self.cellSelected(col, row)
            }
        })
        // call this to trigger change event to draw selection box
        this.gridCtl.select(pos.y, pos.x)
    },
    onVirtualControl: function(evt) {
        console.log("MyGame controller event: ", evt)
        if(this.isGameOver()) {
            if(evt.type=="press" && evt.control=="select") {
                // kill prompt...
                this.gameOverPrompt.hide()
            }
        } else if(this.isFinished()) {
            if(evt.type=="press" && evt.control=="select") {
                // kill prompt...
                this.finishedPrompt.hide()
            }
        } else {
            this.gridCtl.onVirtualControl(evt)
        }
    },
    isValidSelection: function(valid) {
        return valid.rows[this.gridCtl.row][this.gridCtl.col]
    },
    // show selection box    
    // parameters: grid size, position, valid?
    updateSelection: function(valid) {
        var rows = valid.height
        var cols = valid.width
        var width = this.boardWidth
        var height = this.boardHeight
        var ww = width / cols
        var hh = height / rows
        console.log("Updating selection...")
        var mainsvg = d3.select("#svgmain")
        mainsvg.selectAll(".svgselector").remove()
        mainsvg.append("rect").attr({   
            'class': 'svgselector' + (this.isValidSelection(valid) ? ' valid' : ''),
            x: ww*this.gridCtl.col,
            y: hh*this.gridCtl.row,
            width: ww,
            height: hh
        })

    },
    updateBoard: function(state, valid) {
        var self = this
        var gamedata = this.gameData
        var mainsvg = d3.select("#svgmain")
        mainsvg.selectAll(".svgboard").remove();
        var width = this.boardWidth
        var height = this.boardHeight
        var rows = state.height
        var cols = state.width
        var board = mainsvg.append("g").attr("class", "svgboard")
        _.each(state.rows, function(row, i) {
            _.each(row, function(col, j) {
                var ww = width / cols
                var hh = height / rows
                var xx = j * ww
                var yy = i * hh
                var uri = gamedata.pieces[col].uri
                var picUrl = self.getResourceUri(uri)
                board.append("image").attr({
                    "xlink:href": picUrl,
                    width: ww,
                    height: hh,
                    x: xx,
                    y: yy,
                    preserveAspectRatio: "none"
                })
                if (valid.rows[i][j]) {
                    board.append("rect").attr({
                        width: ww,
                        height: hh,
                        x: xx,
                        y: yy,
                        "fill": "cyan",
                        "fill-opacity": 0.3
                    }).on("click", function() {
                        console.log("Click!")
                        self.gridCtl.select(i,j)
                        self.cellSelected(j, i)
                    })
                }
            })
        })
        //this.updateSelection(valid)
    }
})

module.exports = MyGame