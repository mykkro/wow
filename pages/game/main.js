module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var SvgHelper = require("../../js/svghelper")(window)
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

	var path = require("path")

	function loadCss(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}


var GameUI = Base.extend({
  constructor: function(game) {
    this.game = game
    this.playing = false
    this.paused = false
    var self = this
    game.setLogger(function(name, value) {
      self.updateLogs(name, value)
    })
    this.logs = {}
    this.initLogs()    

    /* initializes a controller... */
    this.controller = new GameKeyboardController()
    this.game.setController(this.controller)
  },
  initLogs: function() {
    var logs = this.game.availableLogs()
    var cont = $(".container .info .logs")
    for(var name in logs) {      
      this.logs[name] = MiniLog.create(name, logs[name])
      cont.append(this.logs[name].element)
    }
  },
  updateLogs: function(name, value) {
    console.log(name+"="+value)
    this.logs[name].update(value)
  },
  showTab: function(name) {
    $(".tabs .tab").hide()
    $("#tab-"+name).show()
  },
  updateUI: function() {
    var playing = this.playing
    var paused = this.paused
    $("button.game-new").prop("disabled", playing && !paused)
    $("button.game-quit").prop("disabled", !playing)
    $("button.game-pause").prop("disabled", paused || !playing)
    $("button.game-restart").prop("disabled", !playing)
    $("button.game-settings").prop("disabled", playing)
    $("button.game-rules").prop("disabled", playing && !paused)
    $("button.game-scores").prop("disabled", playing && !paused)
    $("button.game-info").prop("disabled", playing && !paused)
  },
  startGame: function() {
    var self = this
    if(!self.playing) {
      // start game...
      Splash.removeAll()
      //alertify.success(__("Starting game..."));
      new Splash({
        text:__("Starting game..."),
        delay: 2000,
        overlay: true,
        after: function() {
          self.game.start(function() {
            self.playing = true;
            self.updateUI()
            self.showTab("game")
          })
        }
      })
    } else if(self.paused) {
      self.resumeGame()
    }
  },
  quitGame: function() {
    var self = this
    // quit game...
    Splash.removeAll()
    this.game.quit(function() {
      self.playing = false;
      self.updateUI()
      self.showTab("info")
    })
  },
  pauseGame: function() {
    Splash.removeAll()
    var self = this
    self.game.pause(function() {
      self.paused = true;
      self.updateUI()
      self.showTab("game")
      new Splash({
        text:__("Paused"),
        overlay: true,
        hideOnClick: true,
        after: function() {
          self.resumeGame()
        }
      })
    })
  },
  resumeGame: function() {
    Splash.removeAll()
    var self = this
    self.game.resume(function() {
      self.paused = false;
      self.updateUI()
      self.showTab("game")
    })
  },
  restartGame: function() {
    var self = this
    Splash.removeAll()
    new Splash({
      text:__("Starting game..."),
      delay: 2000,
      overlay: true,
      after: function() {
        self.game.restart(function() {
          self.playing = true;
          self.paused = false;
          self.updateUI()
          self.showTab("game")  
        })
      }
    })
  },
  showGameInfo: function() {
    Splash.removeAll()
    this.showTab("info")
  },
  showGameRules: function() {
    Splash.removeAll()
    this.showTab("rules")
  },
  showGameScores: function() {
    Splash.removeAll()
    this.showTab("scores")
  },
  gameSettings: function() {
    Splash.removeAll()
    this.showTab("settings")
  },
  init: function() {
    var self = this

    // initialization...
    self.game.init(function() {
      console.log("Game initialized!")
      self.playing = false
      self.paused = false
      self.updateUI()
      self.showGameInfo()

      $("button.game-new").click(function() { self.startGame(); })
      $("button.game-quit").click(function() { self.quitGame(); })
      $("button.game-restart").click(function() { self.restartGame(); })
      $("button.game-pause").click(function() { self.pauseGame(); })
      $("button.game-info").click(function() { self.showGameInfo(); })
      $("button.game-rules").click(function() { self.showGameRules(); })
      $("button.game-scores").click(function() { self.showGameScores(); })
      $("button.game-settings").click(function() { self.gameSettings(); })

      $(".container").zoomTo({targetsize: 1, duration:1});
    })
  }
})


	var GamePage = BasePage.extend({
		init: function(data, next) {
			var server = this.wtr.rpc
			var self = this
			var appName = data.query.importname
			//var appUrl = "/imports/"+ appName+ "/"
			/**/var appUrl = "/test/samplegame/"
		    var locale = data.query.lang || 'en'
		    var defaultLocaleUrl = "lang/labels."+locale+".json"
		    var localeUrl = "lang/"+locale+".json"
		    var metadataUrl = "wow.json"

		    var scriptUrl = "app.js"
		    var styleUrl = "style.css"

		    loadCss(appUrl+styleUrl)

			var quitBtn = this.getWidget("quitButton")
			var mySwitcher = this.getWidget("mySwitcher")
			mySwitcher.setActive("infoTab")

			quitBtn.click(function() {
				// move back to previous page...
				self.goBack()
			})
			
			var buttons = _.object(_.map([
				"homeButton",
				"newGameButton",
				"pauseButton",
				"restartButton",
				"quitGameButton",
				"infoButton",
				"rulesButton",
				"scoreButton",
				"settingsButton"
			], function(x){return [x, self.getWidget(x)]}))
			console.log(buttons)

			buttons.homeButton.click(function() {
				self.goToHomePage()
			})
			buttons.newGameButton.click(function() {
				showTab("gameTab")
			})
			buttons.pauseButton.click(function() {
				showTab("gameTab")
			})
			buttons.restartButton.click(function() {
				showTab("gameTab")
			})
			buttons.quitGameButton.click(function() {
				showTab("infoTab")
			})
			buttons.infoButton.click(function() {
				showTab("infoTab")
			})
			buttons.rulesButton.click(function() {
				showTab("rulesTab")
			})
			buttons.scoreButton.click(function() {
				showTab("scoresTab")
			})
			buttons.settingsButton.click(function() {
				showTab("settingsTab")
			})		

			function showTab(name) {
				$(".game-overlay").hide()
				mySwitcher.setActive(name)
				if(name == "gameTab") {
					$("#gameOverlay").show()
				} else if(name == "settingsTab") {
					$("#gameSettingsOverlay").show()
				}
			}	

		    $.when(
		    	$.getJSON(appUrl+metadataUrl), 
		    	$.getJSON(appUrl+defaultLocaleUrl), 
		    	$.getJSON(appUrl+localeUrl),
 				$.get(appUrl+"templates/form-settings-schema"),
    			$.get(appUrl+"templates/form-settings-options"),
    			$.getScript(appUrl+scriptUrl)
		    ).done(function(meta, dl, l, t1, t2, sc1) {

		      	var metadata = meta[0]
		      	var localedata = $.extend({},l[0],dl[0])
		      	var dd = {wow:metadata, translated:localedata}

		        var formSchemaTpl = t1[0]
		        var formOptionsTpl = t2[0]

		        var formSchema = JSON.parse(Mustache.render(formSchemaTpl, dd))
		        var formOptions = JSON.parse(Mustache.render(formOptionsTpl, dd))

		        console.log(formSchema, formOptions)

		      	// translate labels...
		      	for(var key in buttons) {
		      		var btn = buttons[key]
		      		var el = $(btn.element).find("tspan")
		      		el.text(dd.translated.labels[el.text()])
		      	}
		      	$("#infoDiv").text(dd.translated.info)
		      	$("#rulesDiv").text(dd.translated.rules)

				var previewUrl = appUrl + "preview.png"
				$("#infoImg").attr("src", previewUrl)

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

		        var MyClass = window[metadata.className]
		        var game = new MyClass()
		        var gui = new GameUI(game)    

		        console.log("Ready!")
		        gui.init()

				/* continue when finished */
				if(next) next(self)
			})

		}
	})
	return GamePage

}