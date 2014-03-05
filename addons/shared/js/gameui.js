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
      alertify.success("Starting game...");
      new Splash({
        text:"Starting game...",
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
        text:"Paused",
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
    Splash.removeAll()
    var self = this
    self.game.restart(function() {
      self.playing = true;
      self.paused = false;
      self.updateUI()
      self.showTab("game")  
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

      //$(".container").zoomTo({targetsize: 1, duration:1});
    })
  }
})
