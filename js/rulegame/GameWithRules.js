var Game = require("../game/Game")
var GridController = require("../game/GridController")

var GameWithRules = Game.extend({
    constructor: function(options, root, gameData, appUrl) {
        this.base(options, root, appUrl)
        console.log("Initializing rule-based game...")
        console.log(gameData)

        // initializing symbol table...
        this.gameData = gameData
        this.symbols = {}
    },

    start: function(cb) {
        console.log("Starting rule-based game...")
        var gameData = this.gameData
        var layout = gameData.currentLevel.layout
        this.symbols = {}
        for (var key in layout.items) {
            this.symbols[key] = $.extend(true, {}, layout.items[key])
        }
        // we expect there is only one state and valid matrix
        // we need to do a deep copy of arrays...
        this.symbols.STATE = $.extend(true, {}, layout.matrices.STATE[0]);
        this.symbols.VALID = $.extend(true, {}, layout.matrices.VALID[0]);
        this.gameover = false
        this.finished = false
        this.setLastPosition()
        this.updateBoard(this.symbols.STATE, this.symbols.VALID)
        this.base(cb)
    },

    onVirtualControl: function(evt) {
        console.log("Rule game controller event: ", evt)
    },

    updateBoard: function(state, valid) {
        // to be implemented in subclasses
    },

    onGameOver: function() {
        console.log("Game over!")
    },

    onFinished: function() {
        console.log("Finished!")
    },

    cellSelected: function(x, y) {
        var gamedata = this.gameData
        var valid = this.symbols.VALID
        if (valid.rows[y][x]) {
            console.log("Valid cell selected: " + x + "," + y)
            this.processValidMove(x, y)
        }
    },

    processValidMove: function(x, y) {
        var symbols = this.symbols
        symbols.Ax.value = x
        symbols.Ay.value = y
        this.processRules()
    },

    processRules: function() {
        var gamedata = this.gameData
        var symbols = this.symbols
        var rules = gamedata.rules
        var self = this
        console.log("Processing rules")
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i]
            if (this.processRule(rule.content, rule.breaking)) break
        }
        console.log("Rules processed!")
        // update board
        console.log(symbols)
        this.updateBoard(symbols.STATE, symbols.VALID)
        // compare state with some of final states...
        var finished = this.testFinalState()
        if (finished) {
            self.finished = true
            self.finishedPrompt = self.levelUpPrompt(function() {
                // quit the game...
                console.log("Finished the level!")
                self.finished = false
                self.finishedPrompt = null
                if (self.onFinished) {
                    self.onFinished()
                }
            })
        }
        var hasValidMoves = this.testValidMoves()
        if (!hasValidMoves) {
            // alert("game over!")
            self.gameover = true
            self.gameOverPrompt = self.quitGamePrompt(function() {
                // quit the game...
                console.log("Quitting the game!")
                self.gameover = false
                self.gameOverPrompt = null
                if (self.onGameOver) {
                    self.onGameOver()
                }
            })
        } else {
            this.setLastPosition()
        }

    },

    isGameOver: function() {
        return this.gameover
    },

    isFinished: function() {
        return this.finished
    },

    testValidMoves: function() {
        var gamedata = this.gameData
        var symbols = this.symbols
        var mt1 = symbols.VALID
        console.log("Testing valid states...")

        for (var i = 0; i < mt1.height; i++) {
            for (var j = 0; j < mt1.width; j++) {
                if (mt1.rows[i][j]) return true
            }
        }
        return false
    },

    testFinalState: function() {
        var gamedata = this.gameData
        var symbols = this.symbols
        var STATE = symbols.STATE
        var FINAL = gamedata.currentLevel.layout.matrices.FINAL
        console.log("Comparing state with final states...")
        for (var i = 0; i < FINAL.length; i++) {
            if (this.compareMatrix(STATE, FINAL[i])) {
                return true
            }
        }
        return false
    },

    compareMatrix: function(mt1, mt2) {
        if ((mt1.width != mt2.width) || (mt1.height != mt2.height) || (mt1.type != mt2.type)) return false
        for (var i = 0; i < mt1.height; i++) {
            for (var j = 0; j < mt1.width; j++) {
                if (mt1.rows[i][j] != "?" && mt2.rows[i][j] != "?") {
                    if (mt1.rows[i][j] != mt2.rows[i][j]) return false
                }
            }
        }
        return true
    },

    processRule: function(rule, breaking) {
        var symbols = this.symbols
        var self = this
        switch (rule.type) {
            case "set":
                return this.processSetRule(rule) && breaking
            case "if":
                return this.processIfRule(rule) && breaking
            case "block":
                _.each(rule.items, function(it) {
                    self.processRule(it);
                })
                return breaking
            default:
                throw "Unsupported rule type: " + rule.type
        }
    },

    processSetRule: function(rule, breaking) {
        console.log("Processing set rule", rule)
        var accessor = this.getRef(rule.left)
        var value = this.getIntValue(rule.right)
        accessor.set(value)
        return false
    },

    getRef: function(obj) {
        // reference may be: 
        // - string (direct reference)
        // - object type=indexedRef
        if (typeof obj == "string") {
            return this.getDirectRef(obj)
        } else {
            switch (obj.type) {
                case "indexedRef":
                    return this.getIndexedRef(obj)
                default:
                    throw "Unsupported reference type: " + obj.type
            }
        }
    },

    getDirectRef: function(obj) {
        var symbols = this.symbols
        return {
            set: function(value) {
                console.log("SET", obj, value)
                symbols[obj].value = value
            }
        }
    },

    getIndexedRef: function(obj) {
        var symbols = this.symbols
        var xIndex = this.getIntValue(obj.xIndex)
        var yIndex = this.getIntValue(obj.yIndex)
        return {
            set: function(value) {
                if (obj.ref == "VALID") {
                    value = (value == "true")
                }
                console.log("SET INDEXED", obj.ref, xIndex, yIndex, value)
                var arr = symbols[obj.ref].rows
                if (yIndex >= 0 && yIndex < arr.length && xIndex >= 0 && xIndex < arr[yIndex].length) {
                    arr[yIndex][xIndex] = value
                }
            },
            get: function() {
                var arr = symbols[obj.ref].rows
                if (yIndex >= 0 && yIndex < arr.length && xIndex >= 0 && xIndex < arr[yIndex].length) {
                    return arr[yIndex][xIndex]
                } else {
                    return null
                }
            }
        }
    },

    setLastPosition: function() {
        var symbols = this.symbols
        symbols.Px.value = symbols.Ax.value
        symbols.Py.value = symbols.Ay.value
    },

    getCurrentPosition: function() {
        return {
            x: this.symbols.Ax.value,
            y: this.symbols.Ay.value
        }
    },

    // values that can be found in index expressions (always integers)
    getIntValue: function(obj) {
        var symbols = this.symbols
        if (typeof(obj) == "object") {
            switch (obj.type) {
                case "add":
                    var left = this.getIntValue(obj.left)
                    var right = this.getIntValue(obj.right)
                    return left + right
                case "sub":
                    var left = this.getIntValue(obj.left)
                    var right = this.getIntValue(obj.right)
                    return left - right
                case "indexedRef":
                    return this.getIndexedRef(obj).get()
                default:
                    throw "Unsupported int value type: " + obj.type
            }
        } else {
            if (typeof obj == "string") {
                if (obj in symbols) {
                    return symbols[obj].value
                } else {
                    return obj
                }
            }
            return obj
        }
    },

    // values that can be found in conditions (always booleans)
    getBoolValue: function(obj) {
        var symbols = this.symbols
        if (typeof(obj) == "object") {
            switch (obj.type) {
                case "eq":
                    var left = this.getIntValue(obj.left)
                    var right = this.getIntValue(obj.right)
                    return left == right
                case "neq":
                    var left = this.getIntValue(obj.left)
                    var right = this.getIntValue(obj.right)
                    return left != right
                case "and":
                    var left = this.getBoolValue(obj.left)
                    var right = this.getBoolValue(obj.right)
                    return left && right
                case "or":
                    var left = this.getBoolValue(obj.left)
                    var right = this.getBoolValue(obj.right)
                    return left || right
                case "indexedRef":
                    return this.getIndexedRef(obj).get()
                default:
                    throw "Unsupported bool value type: " + obj.type
            }
        } else {
            if (typeof obj == "string") {
                if (obj in symbols) {
                    return symbols[obj].value
                } else if (obj == "true") {
                    return true
                } else if (obj == "false") {
                    return false
                } else {
                    return obj
                }
            }
            return obj
        }
    },

    processIfRule: function(rule, breaking) {
        console.log("Processing if rule", rule)
        var cond = this.getBoolValue(rule.condition)
        if (cond) {
            this.processRule(rule.then)
            return true
        } else if (rule['else']) {
            this.processRule(rule['else'])
            return false
        }
        return false
    }



})

module.exports = GameWithRules
