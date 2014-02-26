var GameUI = Base.extend({
  constructor: function(game) {
    this.game = game
    this.playing = false
  },
  showTab: function(name) {
    $(".tabs .tab").hide()
    $("#tab-"+name).show()
  },
  updateUI: function() {
    var playing = this.playing
    $("button.game-new").prop("disabled", playing)
    $("button.game-quit").prop("disabled", !playing)
    $("button.game-restart").prop("disabled", !playing)
    $("button.game-settings").prop("disabled", playing)
    $("button.game-rules").prop("disabled", playing)
    $("button.game-scores").prop("disabled", playing)
    $("button.game-info").prop("disabled", playing)
  },
  startGame: function() {
    var self = this
    // start game...
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
  },
  quitGame: function() {
    var self = this
    // quit game...
    this.game.quit(function() {
      self.playing = false;
      self.updateUI()
      self.showTab("info")
    })
  },
  restartGame: function() {
    var self = this
    self.game.restart(function() {
      self.playing = true;
      self.updateUI()
      self.showTab("game")  
    })
  },
  showGameInfo: function() {
    this.showTab("info")
  },
  showGameRules: function() {
    this.showTab("rules")
  },
  showGameScores: function() {
    this.showTab("scores")
  },
  gameSettings: function() {
    this.showTab("settings")
  },
  init: function() {
    var self = this

    // initialization...
    self.game.init(function() {
      console.log("Game initialized!")
      self.playing = false
      self.updateUI()
      self.showGameInfo()

      $("button.game-new").click(function() { self.startGame(); })
      $("button.game-quit").click(function() { self.quitGame(); })
      $("button.game-restart").click(function() { self.restartGame(); })
      $("button.game-info").click(function() { self.showGameInfo(); })
      $("button.game-rules").click(function() { self.showGameRules(); })
      $("button.game-scores").click(function() { self.showGameScores(); })
      $("button.game-settings").click(function() { self.gameSettings(); })

      $(".container").zoomTo({targetsize: 1, duration:1});
    })
  }
})
