var Game = Base.extend({
  // options

  init: function(cb) {
    // do some initialization...
    if(cb) cb()
  },
  start: function(cb) {
    // start the game...
    if(cb) cb()
  },
  restart: function(cb) {
    // restart game
    this.start(cb)
  },
  quit: function(cb) {
    // cleanup...
    if(cb) cb()
  }
})

var Splash = function(options) {
  var overlay = $("<div>").addClass("splash-overlay")
  var div = $("<div>").addClass("splash").text(options.text)
  div.appendTo(overlay)
  overlay.appendTo($("body"))
  setTimeout(function() {
    overlay.remove()
    if(options.after) options.after()
  }, options.delay || 1000)
}


// UI - put into a class...

function showTab(name) {
  $(".tabs .tab").hide()
  $("#tab-"+name).show()

}

function updateUI(playing) {
  $("button.game-new").prop("disabled", playing)
  $("button.game-quit").prop("disabled", !playing)
  $("button.game-restart").prop("disabled", !playing)
  $("button.game-settings").prop("disabled", playing)
  $("button.game-rules").prop("disabled", playing)
  $("button.game-scores").prop("disabled", playing)
  $("button.game-info").prop("disabled", playing)
}


function runGame(game) {

    function startGame() {
      // start game...
      alertify.success("Starting game...");
      Splash({
        text:"Starting game...",
        delay: 2000,
        overlay: true,
        after: function() {
          game.start(function() {
            playing = true;
            updateUI(playing)
            showTab("game")
          })
        }
      })

    }

    function quitGame() {
      // quit game...
      game.quit(function() {
        playing = false;
        updateUI(playing)
        showTab("info")
      })
    }

    function restartGame() {
      game.restart(function() {
        playing = true;
        updateUI(playing)
        showTab("game")
      
      })
    }

    function showGameInfo() {
      showTab("info")
    }

    function showGameRules() {
      showTab("rules")
    }

    function showGameScores() {
      showTab("scores")
    }

    function gameSettings() {
      showTab("settings")
    }

    // initialization...
    game.init(function() {
      console.log("Game initialized!")
      var playing = false
      updateUI(playing)
      showGameInfo()

      $("button.game-new").click(startGame)
      $("button.game-quit").click(quitGame)
      $("button.game-restart").click(restartGame)
      $("button.game-info").click(showGameInfo)
      $("button.game-rules").click(showGameRules)
      $("button.game-scores").click(showGameScores)
      $("button.game-settings").click(gameSettings)

      $(".container").zoomTo({targetsize: 1, duration:1});
    })
}
