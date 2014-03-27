var Game = Base.extend({
  // options
  constructor: function(options, root) {
    this.options = options || {}
    this.root = root
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
  onVirtualControl: function(evt) {
    console.log("Controller Event: ", evt)    
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
  },
  startGamePrompt: function(cb) {
    new Splash({
        text:__("Starting game..."),
        delay: 2000,
        overlay: true,
        after: function() {
          if(cb) cb()
        }
      })
  },
  pauseGamePrompt: function(cb) {
    new Splash({
      text:__("Paused"),
      overlay: true,
      hideOnClick: true,
      after: function() {
        if(cb) cb()
      }
    })
  },
  hidePrompt: function() {
    Splash.removeAll()    
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
