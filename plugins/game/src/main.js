module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var SvgHelper = require("../../../js/SvgHelper")
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var Commons = require("../../../js/Commons")

    var path = require("path")

    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    var SelectChain = require("../../../js/SelectChain")


    var GamePage = BasePage.extend({
        init: function(data, next) {
            var server = this.wtr.rpc
            var self = this
            var appName = data.query.importname
            var devel = data.query.devel
            var appUrl = devel ? "/addons/games/"+appName+"/" : "/imports/" + appName + "/"
            var settingsUrl = "/api/settings/"+appName
            var locale = Wow.locale
            var defaultLocaleUrl = "lang/labels." + locale + ".json"
            var localeUrl = "lang/" + locale + ".json"
            var metadataUrl = "wow.json"

            var scriptUrl = "app.js"
            var styleUrl = "style.css"

            loadCss(appUrl + styleUrl)

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
                        $("#gameOverlay").show()
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
                $.getJSON(settingsUrl),
                $.get(appUrl + "templates/form-settings-schema"),
                $.get(appUrl + "templates/form-settings-options"),
                $.getScript(appUrl + scriptUrl)
            ).done(function(meta, dl, l, st, t1, t2, sc1) {
                var metadata = meta[0]
                var localedata = $.extend({}, l[0], dl[0])
                var appSettings = st[0]
                appSettings = appSettings ? appSettings.settings : {}
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

                var defaultConfig = {}
                for(var key in formSchema.properties) {
                    var val = formSchema.properties[key].default
                    if(val) defaultConfig[key] = val
                }
                console.log("Default config: ", defaultConfig)
                console.log("App settings: ", appSettings)
                appSettings = $.extend(defaultConfig, appSettings)

                // initialize settings form...
                $(".game-settings").alpaca({
                    "schema": formSchema,
                    "options": formOptions,
                    data: appSettings,
                    postRender: function(control) {
                        var applyBtn = $(".game-settings-form button[name=apply]")
                        applyBtn.click(function() {
                            console.log("Submit clicked!")
                            // clicked on submit button...
                            if(!control.isValid()) {
                                // form is not valid!
                                console.log("Form not valid!")
                                return false
                            }
                            var vals = control.getValue()
                            self.game.config(vals)
                            // store settings to DB...
                            Commons.doAjax("POST", settingsUrl, vals, function(err, res) {
                                if(err) console.error(err);
                                else console.log(res)
                            })
                            return false;
                        })
                    }
                })


                console.log("WOW metadata loaded")
                console.log(dd)

                /* localization function... */
                window.__ = function(str) {
                    return localedata.labels[str] || str
                }

                var MyClass = window[metadata.className]
                var opts = {}
                var root = $(".game-container")
                var game = new MyClass(opts, root, appUrl)
                    //var gui = new GameUI(game, self)    
                self.game = game
                self.game.config(defaultConfig)
                self.playing = false
                self.paused = false
                game.setLogger(function(name, value) {
                    self.updateLogs(name, value)
                })
                game.onGameOver = function() {
                    console.log("game.js onGameOver")
                    self.quitGame()
                }
                game.onFinished = function() {
                    console.log("game.js onFinished")
                    self.quitGame()
                }
                self.logs = {}
                self.initLogs()

                console.log("Ready!")
                //gui.init()
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

                self.game.init(function() {
                    console.log("Game initialized!")
                    self.playing = false
                    self.paused = false
                    self.updateUI()
                    self.showGameInfo()
                    $(".game-viewport").resize()
                    self.selectChain.select(buttons.newGameButton.element)
                })

                /* continue when finished */
                if (next) next(self)
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
    return GamePage

}
