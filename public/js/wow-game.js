var Game = Base.extend({
  // options
  constructor: function(options) {
    this.options = options || {}
    this.controller = null
  },  
  init: function(cb) {
    // do some initialization...
    this.log("status", "initialize")
    if(cb) cb()
  },
  start: function(cb) {
    // start the game...
    this.log("status", "start")
    if(cb) cb()
  },
  restart: function(cb) {
    // restart game
    this.log("status", "restart")
    var self = this
    this.stop(function() {
      self.start(cb)  
    })
    
  },
  pause: function(cb) {
    // restart game
    this.log("status", "pause")
    if(cb) cb()
  },
  resume: function(cb) {
    this.log("status", "resume")
    if(cb) cb()
  },
  stop: function(cb) {
    this.log("status", "stop")
    if(cb) cb()
  },
  quit: function(cb) {
    this.log("status", "quit")
    this.stop(cb)
  },
  setController: function(controller) {
    var self = this
    this.controller = controller
    this.controller.addListener(function(name, eventType) {
      self.controllerEvent(name, eventType)
    })
  },
  controllerEvent: function(name, eventType) {
    console.log("Game controller: "+name+","+eventType)
  },
  availableLogs: function() {
    return {
      // map of available logs
      status: { "label": __("Status"), "type": "string", "defaultValue": "", "visible": false },
      score: { "label": __("Score"), "type": "integer", "defaultValue": 0, "visible": true }
    }
  },
  log: function(name, value) {
    if(this.options.logger) {
      this.options.logger(name, value)
    }
  },
  setLogger: function(logger) {
    this.options.logger = logger
  },
  prompt: function(text, options, cb) {
    return new Splash({
      text:text,
      delay: options.delay,
      overlay: true,
      hideOnClick: true,
      after: function() {
        if(cb) cb()
      }
    })
  }  
})


;var GameController = Base.extend({
  constructor: function() {
    this.listeners = []
  },
  removeListeners: function() {
    this.listeners = []
  },
  addListener: function(listener) {
    this.listeners.push(listener)
  },
  emit: function(name, eventType) {
    for(var i=0; i<this.listeners.length; i++) {
      this.listeners[i](name, eventType)
    }
  }
})

var GameKeyboardController = GameController.extend({
  constructor: function() {
    this.base()
    var self = this
    $('body').keydown(function (e) {
        switch (e.which) {
              case 32: // space
              case 13:
                  self.emit("activate", "down")
                  break;
          case 38:
                  self.emit("up", "down")
                  break;
          case 27:
                  self.emit("escape", "down")
                  break;
          case 40:
                  self.emit("down", "down")
                  break;
          case 37:
                  self.emit("left", "down")
                  break;
          case 39:
                  self.emit("right", "down")
                  break;
        }
      });    
    $('body').keyup(function (e) {
        switch (e.which) {
              case 32: // space
              case 13:
                  self.emit("activate", "up")
                  break;
          case 38:
                  self.emit("up", "up")
                  break;
          case 27:
                  self.emit("escape", "up")
                  break;
          case 40:
                  self.emit("down", "up")
                  break;
          case 37:
                  self.emit("left", "up")
                  break;
          case 39:
                  self.emit("right", "up")
                  break;
        }
      });    
  }
})
;
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
;var MiniLog = Base.extend({
  constructor: function(name, logInfo) {
      this.info = logInfo
      this.name = name
      this.element = $("<div>").addClass("log")
      if(!logInfo.visible) this.element.addClass("hidden")
      this.init()
      this.element.append(
        $("<span>").addClass("label").text(this.info.label+": "),
        this.valueElement
      )      
      this.update(logInfo.defaultValue)
  },
  init: function() {
      this.valueElement = $("<span>").addClass(this.name)
  },
  update: function(value) {
     this.valueElement.text(value)
  }
}, {
  create: function(name, logInfo) {
    if(name=="lives") {
      return new LivesMiniLog(name, logInfo)
    }
    return new MiniLog(name, logInfo)
  }
})

var LivesMiniLog = MiniLog.extend({
  constructor: function(name, logInfo) {
    this.base(name, logInfo)
  },
  init: function() {
    this.valueElement = $('<div class="lifebar-wrapper"><div class="lifebar"></div></div>')
  },
  update: function(value) {
    console.log("LivesMiniLog!")
    var innerWidth = Math.round(value*32) // size of the heart icon
    this.valueElement.find(".lifebar").css("width", innerWidth)
  }
})
;var Splash = function(options) {
  this.options = options
  this.overlay = $("<div>").addClass("splash-overlay")
  this.div = $("<div>").addClass("splash").text(options.text)
  this.div.appendTo(this.overlay)
  this.overlay.appendTo($("body"))
  var self = this
  if(options.hideOnClick) {
	this.overlay.click(function() {
		self.hide()
	})/*.keydown(function (e) {
		self.hide()
    })*/
  } 
  if(options.delay) {
	setTimeout(function() {
		self.hide()
	},  options.delay)
  }
}

Splash.prototype.hide = function() {
  	if(this.overlay) {
	    this.overlay.remove()
	    this.overlay = null
	    if(this.options.after) this.options.after()
	}
}

Splash.removeAll = function() {
	$(".splash-overlay").remove()
}
;var Util = {
    /**
     * Finds whether line enters x>value halfplane
     * returns t value: [x'y'] = [x+t*dx, y+t*dy], t in <0,1>
     * return value: t or -1 if there is no intersection
     */
    findIntersectionWithXPlusHalfplane: function (x, y, dx, dy, value) {
        if (dx !== 0 && x < value && x + dx > value) {
            return (value - x) / dx;
        } else {
            // no intersection...
            return -1;
        }
    },
    findIntersectionWithXHalfplane: function (x, y, dx, dy, sign, value) {
        return (sign > 0) ? Util.findIntersectionWithXPlusHalfplane(x, y, dx, dy, value) : Util.findIntersectionWithXPlusHalfplane(-x, y, -dx, dy, value);
    },
    /**
     * Finds whether line enters specified halfplane (x>value, x<value, y>value, y<value)
     *
     * @param sign 1 or -1
     * @param direction if true, X halfplane; if false, Y halfplane
     */
    findIntersectionWithHalfplane: function (x, y, dx, dy, sign, direction, value) {
        return direction ? Util.findIntersectionWithXHalfplane(x, y, dx, dy, sign, value) : Util.findIntersectionWithXHalfplane(y, -x, dy, -dx, sign, direction ? -value : value);
    },
	normalizeVector: function(x, y) {
		var sz = Math.sqrt(x*x+y*y);
		return { x: x/sz, y: y/sz };
	}	
};
;var Watches = Base.extend({
    constructor: function (paper) {
        this.paper = paper;
        this.watches = {};
        this.watchCount = 0;
    },
    put: function (name, value) {
        if (this.watches[name]) {
            this.update(name, value);
        } else {
            this.add(name, value);
        }
    },
    add: function (name, value) {
        var watch = this.paper.text(10, 10 + this.watchCount * 16, name + "=" + value).attr("text-anchor", "start");
        this.watches[name] = watch;
        this.watchCount++;
    },
    update: function (name, value) {
        this.watches[name].attr("text", name + "=" + value);
    }
});
