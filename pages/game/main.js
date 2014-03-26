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

			var mySwitcher = this.getWidget("mySwitcher")
			mySwitcher.setActive("infoTab")
			
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

			function showTab(name) {
				$(".game-overlay").hide()
				mySwitcher.setActive(name)
				if(name == "gameTab") {
					$("#gameOverlay").show()
				} else if(name == "settingsTab") {
					$("#gameSettingsOverlay").show()
				}
			}	

      self.showTab = showTab

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

		        var MyClass = window[metadata.className]
            var opts = {}
            var root = $(".game-container")
		        var game = new MyClass(opts, root)
		        //var gui = new GameUI(game, self)    
            self.game = game
            self.playing = false
            self.paused = false
            game.setLogger(function(name, value) {
              self.updateLogs(name, value)
            })
            self.logs = {}
            self.initLogs()    

            // initializes a controller... 
            self.controller = new GameKeyboardController()
            self.game.setController(self.controller)
		        
            console.log("Ready!")
		        //gui.init()
            // initialization...

            buttons.homeButton.click(function() {
              self.goToHomePage()
            })
            buttons.newGameButton.click(function() {
              self.startGame()
            })
            buttons.pauseButton.click(function() {
              self.pauseGame();
            })
            buttons.restartButton.click(function() {
              self.restartGame();
            })
            buttons.quitGameButton.click(function() {
              self.quitGame()
            })
            buttons.infoButton.click(function() {
              self.showGameInfo();
            })
            buttons.rulesButton.click(function() {
              self.showGameRules();
            })
            buttons.scoreButton.click(function() {
              self.showGameScores();
            })
            buttons.settingsButton.click(function() {
              self.gameSettings();
            })    

            self.buttons = buttons

            self.game.init(function() {
              console.log("Game initialized!")
              self.playing = false
              self.paused = false
              self.updateUI()
              self.showGameInfo()



              //$(".container").zoomTo({targetsize: 1, duration:1});
            })

				/* continue when finished */
				if(next) next(self)
			})

		},
  updateUI: function() {
    var playing = this.playing
    var paused = this.paused
    this.buttons.newGameButton.setEnabled(!(playing && !paused))
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
    for(var name in logs) {      
      this.logs[name] = MiniLog.create(name, logs[name])
      cont.append(this.logs[name].element)
    }
  },
  updateLogs: function(name, value) {
    console.log(name+"="+value)
    this.logs[name].update(value)
  },
  showGameInfo: function() {
    Splash.removeAll()
    this.showTab("infoTab")
  },
  showGameRules: function() {
    Splash.removeAll()
    this.showTab("rulesTab")
  },
  showGameScores: function() {
    Splash.removeAll()
    this.showTab("scoresTab")
  },
  gameSettings: function() {
    Splash.removeAll()
    this.showTab("settingsTab")
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
            self.showTab("gameTab")
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
      self.showTab("infoTab")
    })
  },
  pauseGame: function() {
    Splash.removeAll()
    var self = this
    self.game.pause(function() {
      self.paused = true;
      self.updateUI()
      self.showTab("gameTab")
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
      self.showTab("gameTab")
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
          self.showTab("gameTab")  
        })
      }
    })
  },


	})
	return GamePage

}