var GameUI = Base.extend({
  constructor: function(game) {
    this.game = game
    this.playing = false
    var self = this
    game.setLogger(function(name, value) {
      self.updateLogs(name, value)
    })
    this.initLogs()
  },
  initLogs: function() {
//    Score: <span class="score"></span> Lives: <span class="lives"></span>
    var logs = this.game.availableLogs()
    var cont = $(".container .info .logs")
    for(var name in logs) {      
      console.log(name+"="+logs[name].defaultValue)
      var div = $("<div>").addClass("log").appendTo(cont)
      if(!logs[name].visible) div.addClass("hidden")
      div.append($("<span>").addClass("label").text(logs[name].label+": "))
      div.append($("<span>").addClass(name))
      // very crude view...
      $(".container .info .logs ."+name).text(logs[name].defaultValue)
    }
  },
  updateLogs: function(name, value) {
    console.log(name+"="+value)
    // very crude view...
    $(".container .info .logs ."+name).text(value)
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
  restartGame: function() {
    Splash.removeAll()
    var self = this
    self.game.restart(function() {
      self.playing = true;
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
