module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var SvgHelper = require("../../js/svghelper")(window)
    var i18n = Wow.i18n
    var BasePage = require("../../js/basepage")
    var path = require("path")
    var Base = require("basejs")
    var SelectChain = require("../../js/selectchain")($, Base)
    var RuleParser = require("../../js/rulegame/RuleParser")
    var GameWithRules = require("../../js/rulegame/GameWithRules")
    var MiniLog = require("../../js/game/MiniLog")


    var MyGame = GameWithRules.extend({
        constructor: function(options, root, gamedata, appUrl) {
            this.base(options, root, gamedata);
            this.appUrl = appUrl
            this.selectedRow = 0
            this.selectedColumn = 0
            this.boardWidth = 1000
            this.boardHeight = 1000
        },
        start: function(cb) {
            console.log("Starting custom rule-based game...")
            this.base(cb)
            this.boardRows = this.symbols.VALID.height
            this.boardColumns = this.symbols.VALID.width
            this.updateSelection(this.symbols.VALID)
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
                var r = this.selectedRow
                var c = this.selectedColumn
                if(evt.type=="press") {
                    switch(evt.control) {
                        case 'up': 
                            r = (r+this.boardRows-1)%this.boardRows
                            break
                        case 'down': 
                            r = (r+1)%this.boardRows
                            break
                        case 'left': 
                            c = (c+this.boardColumns-1)%this.boardColumns
                            break
                        case 'right': 
                            c = (c+1)%this.boardColumns
                            break
                        case 'select': 
                            this.cellSelected(c, r)
                            return
                    }
                }
                this.selectedRow = r
                this.selectedColumn = c
                this.updateSelection(this.symbols.VALID)
            }
        },
        isValidSelection: function(valid) {
            return valid.rows[this.selectedRow][this.selectedColumn]
        },
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
                    x: ww*this.selectedColumn,
                    y: hh*this.selectedRow,
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
                    var picUrl = (uri.charAt(0) == "/") ? uri : self.appUrl + uri
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
                            self.selectedRow = i
                            self.selectedColumn = j
                            self.updateSelection(valid)
                            self.cellSelected(j, i)
                        })
                    }
                })
            })
            this.updateSelection(valid)
        }
    })



    var RuleGamePage = BasePage.extend({
        init: function(data, next) {
            var server = this.wtr.rpc
            var self = this
            var appName = data.query.importname
            var appUrl = "/imports/" + appName + "/"
            var locale = data.query.lang || 'en'
            var defaultLocaleUrl = "lang/labels." + locale + ".json"
            var localeUrl = "lang/" + locale + ".json"
            var metadataUrl = "wow.json"

            var mySwitcher = this.getWidget("mySwitcher")
            mySwitcher.setActive("infoTab")

            var buttons = _.object(_.map([
                "homeButton",
                "backButton",
                "newGameButton",
                "pauseButton",
                "restartButton",
                "quitGameButton",
                "infoButton",
                "rulesButton",
                "scoreButton",
                "settingsButton"
            ], function(x) {
                return [x, self.getWidget(x)]
            }))
            console.log(buttons)

            self.selectChain = new SelectChain()
            for (var key in buttons) self.selectChain.append(buttons[key].element)


                function showTab(name) {
                    $(".game-overlay").hide()
                    $(".nav-tabs .tab").removeClass("activeTab")
                    mySwitcher.setActive(name)
                    switch (name) {
                        case "gameTab":
                            $(".nav-game").addClass("activeTab")
                            break;
                        case "settingsTab":
                            $("#gameSettingsOverlay").show()
                            $(".nav-settings").addClass("activeTab")
                            break;
                        case "rulesTab":
                            $(".nav-rules").addClass("activeTab")
                            break;
                        case "scoresTab":
                            $(".nav-scores").addClass("activeTab")
                            break;
                        case "infoTab":
                            $(".nav-info").addClass("activeTab")
                            break;
                    }
                }

            self.showTab = showTab
            $.when(
                $.getJSON(appUrl + metadataUrl),
                $.getJSON(appUrl + defaultLocaleUrl),
                $.getJSON(appUrl + localeUrl),
                $.get(appUrl + "templates/form-settings-schema"),
                $.get(appUrl + "templates/form-settings-options")
            ).done(function(meta, dl, l, t1, t2) {
                var metadata = meta[0]
                var localedata = $.extend({}, l[0], dl[0])
                var dd = {
                    wow: metadata,
                    translated: localedata
                }

                var formSchemaTpl = t1[0]
                var formOptionsTpl = t2[0]

                var formSchema = JSON.parse(Mustache.render(formSchemaTpl, dd))
                var formOptions = JSON.parse(Mustache.render(formOptionsTpl, dd))

                console.log(formSchema, formOptions)

                // translate labels...
                for (var key in buttons) {
                    var btn = buttons[key]
                    var el = $(btn.element).find("tspan")
                    el.text(dd.translated.labels[el.text()])
                }
                $("#infoDiv").text(dd.translated.info)
                $("#rulesDiv").text(dd.translated.rules)

                var previewUrl = appUrl + "preview.png"
                $("#infoImg").attr("src", previewUrl)

                $(".game-info .title").text(dd.translated.title)

                // initialize settings form...
                $(".game-settings").alpaca({
                    "schema": formSchema,
                    "options": formOptions
                })


                console.log("WOW metadata loaded")
                console.log(dd)

                /* localization function... */
                window.__ = function(str) {
                    return localedata.labels[str] || str
                }

                // initialization...

                buttons.homeButton.click(function() {
                    self.selectChain.select(buttons.homeButton.element)
                    self.goToHomePage()
                })
                buttons.backButton.click(function() {
                    self.selectChain.select(buttons.backButton.element)
                    self.goBack()
                })
                buttons.newGameButton.click(function() {
                    self.selectChain.select(buttons.newGameButton.element)
                    self.playGame()
                })
                buttons.pauseButton.click(function() {
                    self.selectChain.select(buttons.pauseButton.element)
                    self.pauseGame();
                })
                buttons.restartButton.click(function() {
                    self.selectChain.select(buttons.restartButton.element)
                    self.restartGame();
                })
                buttons.quitGameButton.click(function() {
                    self.selectChain.select(buttons.quitGameButton.element)
                    self.quitGame()
                })
                buttons.infoButton.click(function() {
                    self.selectChain.select(buttons.infoButton.element)
                    self.showGameInfo();
                })
                buttons.rulesButton.click(function() {
                    self.selectChain.select(buttons.rulesButton.element)
                    self.showGameRules();
                })
                buttons.scoreButton.click(function() {
                    self.selectChain.select(buttons.scoreButton.element)
                    self.showGameScores();
                })
                buttons.settingsButton.click(function() {
                    self.selectChain.select(buttons.settingsButton.element)
                    self.gameSettings();
                })

                $(".game-viewport").resize(function() {
                    var el = $(this)
                    var w = el.width()
                    var h = el.height()
                    var tw = 740
                    var th = 480
                    var cover = false
                    var scale = cover ? Math.max(w / tw, h / th) : Math.min(w / tw, h / th)
                    var ww = tw * scale
                    var hh = th * scale
                    var x = 0 //(w-tw)/2
                    var y = 0 //(h-th)/2
                    var mtr = "matrix(" + scale + ",0,0," + scale + "," + x + "," + y + ")"
                    el.children("div").css("-webkit-transform", mtr)
                }).resize()

                self.buttons = buttons

                // game load...

                // TODO get baseUrl from gameUrl
                function getUrl(resource) {
                    return appUrl + resource
                }


                function ruleParser(contents, breaking) {
                    var body = contents.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ");
                    var compiled = RuleParser.parse(body)
                    return {
                        type: "rule",
                        source: body,
                        content: compiled,
                        breaking: breaking
                    }
                }

                // 1. get game url
                var gameUrl = getUrl("description.json")

                var gameData = {}
                $.getJSON(gameUrl).done(function(data) {
                    // game data loaded!
                    gameData.description = data

                    // show thumbnail
                    var thumbnailUrl = getUrl(data.thumbnailUri)
                    $("#info").append(
                        $("<h2>").text(data.name),
                        $("<div>").text(data.rules),
                        $("<img>").attr("src", thumbnailUrl)
                    )

                    $.when(
                        $.getJSON(getUrl(data.piecesUri)),
                        $.getJSON(getUrl(data.levelsUri)),
                        $.getJSON(getUrl(data.settingsUri)),
                        $.getJSON(getUrl(data.rulesUri))
                    ).done(function(aa, bb, cc, dd) {
                        var pieces = aa[0]
                        var levels = bb[0]
                        var settings = cc[0]
                        var rules = dd[0]
                        // display all pieces in a table...
                        console.log(rules)
                        gameData.pieces = pieces.pieces
                        gameData.settings = settings
                        gameData.levels = levels.levels
                        gameData.rules = _.map(rules.rules, function(rr) {
                            return ruleParser(rr.contents, rr.
                                break)
                        })

                        // levels:
                        if (levels.levels.length == 0) {
                            alert("Game has no levels defined!")
                        } else {
                            console.log("Loading first level...")
                            var levelUrl = getUrl(levels.levels[0].uri)
                            $.getJSON(levelUrl).done(function(lvlData) {
                                console.log("Level info loaded!")
                                var layoutUrl = getUrl(lvlData.layoutUri)
                                $.getJSON(layoutUrl).done(function(lvlLayout) {
                                    console.log("Level layout loaded!")

                                    gameData.currentLevel = {
                                        info: lvlData,
                                        layout: lvlLayout
                                    }
                                    var opts = {}
                                    var root = $(".game-container")
                                    var game = new MyGame(opts, root, gameData, appUrl)

                                    self.game = game
                                    self.playing = false
                                    self.paused = false
                                    game.setLogger(function(name, value) {
                                        self.updateLogs(name, value)
                                    })
                                    game.onGameOver = function() {
                                        console.log("rulegame.js onGameOver")
                                        self.quitGame()
                                    }
                                    game.onFinished = function() {
                                        console.log("rulegame.js onFinished")
                                        self.quitGame()
                                    }
                                    self.logs = {}
                                    self.initLogs()

                                    console.log("Ready!")

                                    self.game.init(function() {
                                        console.log("Game initialized!")
                                        self.playing = false
                                        self.paused = false
                                        self.updateUI()
                                        self.showGameInfo()
                                        $(".game-viewport").resize()
                                        self.selectChain.select(buttons.newGameButton.element)
                                    })

                                    //game.start()      
                                    //playGame(gameData)

                                })

                            })
                        }
                    })



                    /* continue when finished */
                    if (next) next(self)


                })


                // game initialization...

            })

        },
        updateUI: function() {
            var playing = this.playing
            var paused = this.paused
            this.buttons.newGameButton.setEnabled(!playing || paused)
            this.buttons.quitGameButton.setEnabled(playing)
            this.buttons.pauseButton.setEnabled(!(paused || !playing))
            this.buttons.restartButton.setEnabled(playing)
            this.buttons.settingsButton.setEnabled(!playing)
            this.buttons.rulesButton.setEnabled(!(playing && !paused))
            this.buttons.scoreButton.setEnabled(!(playing && !paused))
            this.buttons.infoButton.setEnabled(!(playing && !paused))
        },
        initLogs: function() {
            var logs = this.game.availableLogs()
            var cont = $(".game-info .logs")
            for (var name in logs) {
                this.logs[name] = MiniLog.create(name, logs[name])
                cont.append(this.logs[name].element)
            }
        },
        updateLogs: function(name, value) {
            console.log(name + "=" + value)
            this.logs[name].update(value)
        },
        showGameInfo: function() {
            this.game.hidePrompt()
            this.showTab("infoTab")
        },
        showGameRules: function() {
            this.game.hidePrompt()
            this.showTab("rulesTab")
        },
        showGameScores: function() {
            this.game.hidePrompt()
            this.showTab("scoresTab")
        },
        gameSettings: function() {
            this.game.hidePrompt()
            this.showTab("settingsTab")
        },
        playGame: function() {
            if (!this.playing) {
                this.startGame()
            } else if (this.paused) {
                this.resumeGame()
            }
        },
        startGame: function() {
            var self = this
            if (!self.playing) {
                // start game...
                this.game.hidePrompt()
                this.game.startGamePrompt(function() {
                    self.game.start(function() {
                        self.playing = true;
                        self.updateUI()
                        self.showTab("gameTab")
                    })
                })
            } else if (self.paused) {
                self.resumeGame()
            }
        },
        quitGame: function() {
            var self = this
            // quit game...
            this.game.hidePrompt()
            this.game.quit(function() {
                self.playing = false;
                self.updateUI()
                self.showTab("infoTab")
            })
        },
        pauseGame: function() {
            this.game.hidePrompt()
            var self = this
            self.game.pause(function() {
                self.paused = true;
                self.updateUI()
                self.showTab("gameTab")
                self.game.pauseGamePrompt(function() {
                    self.resumeGame()
                })
            })
        },
        resumeGame: function() {
            this.game.hidePrompt()
            var self = this
            self.game.resume(function() {
                self.paused = false;
                self.updateUI()
                self.showTab("gameTab")
            })
        },
        restartGame: function() {
            this.game.hidePrompt()
            var self = this
            this.game.startGamePrompt(function() {
                self.game.start(function() {
                    self.playing = true
                    self.paused = false
                    self.updateUI()
                    self.showTab("gameTab")
                })
            })
        },
        activateSelected: function() {
            var target = $(this.selectChain.current())
            $(target).click()
        },
        onVirtualControl: function(evt) {
            var self = this
            if (this.playing && !this.paused) {
                switch (evt.control) {
                    case "pause":
                        this.pauseGame()
                        break;
                    case "stop":
                        this.quitGame()
                        break;
                    default:
                        // ingame controller...
                        this.game.onVirtualControl(evt)
                        break;
                }
            } else {
                switch (evt.control) {
                    case "play":
                        if (this.playing && this.paused) {
                            this.resumeGame()
                        }
                        break;
                    case "stop":
                        if (this.playing) this.quitGame()
                        break;
                    case "home":
                        this.goToHomePage()
                        break;
                    case "up":
                        this.selectChain.selectPrevious()
                        break;
                    case "down":
                        this.selectChain.selectNext()
                        break;
                    case "select":
                        this.activateSelected()
                        break;
                }
            }
        }
    })
    return RuleGamePage

}
