require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/9Q6Zj":[function(require,module,exports){
"use strict";

var Base = require("basejs")
var Splash = require("./Splash")

var Game = Base.extend({
    // options
    constructor: function(options, root, appUrl) {
        this.options = options || {}
        this.root = root
        this.appUrl = appUrl
        this.controller = null
    },
    init: function(cb) {
        // do some initialization...
        this.log("status", "initialize")
        if (cb) cb()
    },
    start: function(cb) {
        // start the game...
        this.log("status", "start")
        if (cb) cb()
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
        if (cb) cb()
    },
    resume: function(cb) {
        this.log("status", "resume")
        if (cb) cb()
    },
    stop: function(cb) {
        this.log("status", "stop")
        if (cb) cb()
    },
    quit: function(cb) {
        this.log("status", "quit")
        this.stop(cb)
    },
    onVirtualControl: function(evt) {
        console.log("Controller Event: ", evt)
    },
    getResourceUri: function(uri) {
        return (uri && uri.charAt(0) == "/") ? uri : this.appUrl + uri
    },
    availableLogs: function() {
        return {
            // map of available logs
            status: {
                "label": __("Status"),
                "type": "string",
                "defaultValue": "",
                "visible": false
            },
            score: {
                "label": __("Score"),
                "type": "integer",
                "defaultValue": 0,
                "visible": true
            }
        }
    },
    log: function(name, value) {
        if (this.options.logger) {
            this.options.logger(name, value)
        }
    },
    setLogger: function(logger) {
        this.options.logger = logger
    },
    prompt: function(text, options, cb) {
        return new Splash({
            text: text,
            delay: options.delay,
            overlay: true,
            hideOnClick: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    startGamePrompt: function(cb) {
        return new Splash({
            text: __("Starting game..."),
            delay: 2000,
            overlay: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    pauseGamePrompt: function(cb) {
        return new Splash({
            text: __("Paused"),
            overlay: true,
            hideOnClick: true,
            after: function() {
                if (cb) cb()
            }
        })
    },
    quitGamePrompt: function(cb) {
        return this.prompt(__("Game over"), {}, cb)
    },
    levelUpPrompt: function(cb) {
        return this.prompt(__("Well done!"), {}, cb)
    },
    hidePrompt: function() {
        Splash.removeAll()
    }
})

module.exports = Game

},{"./Splash":7,"basejs":12}],"Game":[function(require,module,exports){
module.exports=require('/9Q6Zj');
},{}],"GridController":[function(require,module,exports){
module.exports=require('Qz+ab4');
},{}],"Qz+ab4":[function(require,module,exports){
var Base = require("basejs")

var GridController = Base.extend({
    constructor: function(opts) {
        this.width = opts.width || 10
        this.height = opts.height || 10
        this.selected = opts.selected
        this.changed = opts.changed,
        this.row = opts.row || 0
        this.col = opts.col || 0
    },
    select: function(row, col) {
        this.row = row
        this.col = col
        this.onSelectionChanged(row, col)
    },
    onVirtualControl: function(evt) {
        var r = this.row
        var c = this.col
        if (evt.type == "press") {
            switch (evt.control) {
                case 'up':
                    r = (r + this.height - 1) % this.height
                    break
                case 'down':
                    r = (r + 1) % this.height
                    break
                case 'left':
                    c = (c + this.width - 1) % this.width
                    break
                case 'right':
                    c = (c + 1) % this.width
                    break
                case 'select':
                    this.onSelect(r, c)
                    return
            }
        }
        this.row = r
        this.col = c
        this.onSelectionChanged(r, c)
    },
    onSelectionChanged: function(row, col) {
        console.log("selection changed!")
        if (this.changed) {
            this.changed(row, col)
        }
    },
    onSelect: function(row, col) {
        console.log("selected! row=" + row + " col=" + col)
        if (this.selected) {
            this.selected(row, col)
        }
    }
})


module.exports = GridController

},{"basejs":12}],"MiniLog":[function(require,module,exports){
module.exports=require('0D1Aa+');
},{}],"0D1Aa+":[function(require,module,exports){
"use strict";

var Base = require("basejs")

var MiniLog = Base.extend({
    constructor: function(name, logInfo) {
        this.info = logInfo
        this.name = name
        this.element = $("<div>").addClass("log")
        if (!logInfo.visible) this.element.addClass("hidden")
        this.init()
        this.element.append(
            $("<span>").addClass("label").text(this.info.label + ": "),
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
        if (name == "lives") {
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
        var innerWidth = Math.round(value * 32) // size of the heart icon
        this.valueElement.find(".lifebar").css("width", innerWidth)
    }
})

module.exports = MiniLog

},{"basejs":12}],7:[function(require,module,exports){
"use strict";

var Splash = function(options) {
    this.options = options
    this.overlay = $("<div>").addClass("splash-overlay")
    this.div = $("<div>").addClass("splash").text(options.text)
    this.div.appendTo(this.overlay)
    this.overlay.appendTo($("body"))
    var self = this
    if (options.hideOnClick) {
        this.overlay.click(function() {
            self.hide()
        })
        /*.keydown(function (e) {
		self.hide()
    })*/
    }
    if (options.delay) {
        setTimeout(function() {
            self.hide()
        }, options.delay)
    }
}

Splash.prototype.hide = function() {
    if (this.overlay) {
        this.overlay.remove()
        this.overlay = null
        if (this.options.after) this.options.after()
    }
}

Splash.removeAll = function() {
    $(".splash-overlay").remove()
}

module.exports = Splash

},{}],"Util":[function(require,module,exports){
module.exports=require('8RkSAW');
},{}],"8RkSAW":[function(require,module,exports){
"use strict";

var Util = {
    /**
     * Finds whether line enters x>value halfplane
     * returns t value: [x'y'] = [x+t*dx, y+t*dy], t in <0,1>
     * return value: t or -1 if there is no intersection
     */
    findIntersectionWithXPlusHalfplane: function(x, y, dx, dy, value) {
        if (dx !== 0 && x < value && x + dx > value) {
            return (value - x) / dx;
        } else {
            // no intersection...
            return -1;
        }
    },
    findIntersectionWithXHalfplane: function(x, y, dx, dy, sign, value) {
        return (sign > 0) ? Util.findIntersectionWithXPlusHalfplane(x, y, dx, dy, value) : Util.findIntersectionWithXPlusHalfplane(-x, y, -dx, dy, value);
    },
    /**
     * Finds whether line enters specified halfplane (x>value, x<value, y>value, y<value)
     *
     * @param sign 1 or -1
     * @param direction if true, X halfplane; if false, Y halfplane
     */
    findIntersectionWithHalfplane: function(x, y, dx, dy, sign, direction, value) {
        return direction ? Util.findIntersectionWithXHalfplane(x, y, dx, dy, sign, value) : Util.findIntersectionWithXHalfplane(y, -x, dy, -dx, sign, direction ? -value : value);
    },
    normalizeVector: function(x, y) {
        var sz = Math.sqrt(x * x + y * y);
        return {
            x: x / sz,
            y: y / sz
        };
    }
};

module.exports = Util

},{}],"Watches":[function(require,module,exports){
module.exports=require('JnjsU8');
},{}],"JnjsU8":[function(require,module,exports){
"use strict";

var Base = require("basejs")

var Watches = Base.extend({
    constructor: function(paper) {
        this.paper = paper;
        this.watches = {};
        this.watchCount = 0;
    },
    put: function(name, value) {
        if (this.watches[name]) {
            this.update(name, value);
        } else {
            this.add(name, value);
        }
    },
    add: function(name, value) {
        var watch = this.paper.text(10, 10 + this.watchCount * 16, name + "=" + value).attr("text-anchor", "start");
        this.watches[name] = watch;
        this.watchCount++;
    },
    update: function(name, value) {
        this.watches[name].attr("text", name + "=" + value);
    }
});

module.exports = Watches

},{"basejs":12}],12:[function(require,module,exports){
/*
  Based on Base.js 1.1a (c) 2006-2010, Dean Edwards
  Updated to pass JSHint and converted into a module by Kenneth Powers
  License: http://www.opensource.org/licenses/mit-license.php
*/
/*global define:true module:true*/
/*jshint eqeqeq:true*/
(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define !== 'undefined' && typeof define.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Base', this, function () {
  // Base Object
  var Base = function () {};

  // Implementation
  Base.extend = function (_instance, _static) { // subclass
    var extend = Base.prototype.extend;
    // build the prototype
    Base._prototyping = true;
    var proto = new this();
    extend.call(proto, _instance);
    proto.base = function () {
      // call this method from any other method to invoke that method's ancestor
    };
    delete Base._prototyping;
    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function () {
        if (!Base._prototyping) {
          if (this._constructing || this.constructor === klass) { // instantiation
            this._constructing = true;
            constructor.apply(this, arguments);
            delete this._constructing;
          } else if (arguments[0] !== null) { // casting
            return (arguments[0].extend || extend).call(arguments[0], proto);
          }
        }
      };
    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function (type) {
      return (type === 'object') ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialization
    if (typeof klass.init === 'function') klass.init();
    return klass;
  };

  Base.prototype = {
    extend: function (source, value) {
      if (arguments.length > 1) { // extending with a name/value pair
        var ancestor = this[source];
        if (ancestor && (typeof value === 'function') && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() !== value.valueOf()) && /\bbase\b/.test(value)) {
          // get the underlying method
          var method = value.valueOf();
          // override
          value = function () {
            var previous = this.base || Base.prototype.base;
            this.base = ancestor;
            var returnValue = method.apply(this, arguments);
            this.base = previous;
            return returnValue;
          };
          // point to the underlying method
          value.valueOf = function (type) {
            return (type === 'object') ? value : method;
          };
          value.toString = Base.toString;
        }
        this[source] = value;
      } else if (source) { // extending with an object literal
        var extend = Base.prototype.extend;
        // if this object has a customized extend method then use it
        if (!Base._prototyping && typeof this !== 'function') {
          extend = this.extend || extend;
        }
        var proto = {
          toSource: null
        };
        // do the "toString" and other methods manually
        var hidden = ['constructor', 'toString', 'valueOf'];
        // if we are prototyping then include the constructor
        for (var i = Base._prototyping ? 0 : 1; i < hidden.length; i++) {
          var h = hidden[i];
          if (source[h] !== proto[h])
            extend.call(this, h, source[h]);
        }
        // copy each of the source object's properties to this object
        for (var key in source) {
          if (!proto[key]) extend.call(this, key, source[key]);
        }
      }
      return this;
    }
  };

  // initialize
  Base = Base.extend({
    constructor: function () {
      this.extend(arguments[0]);
    }
  }, {
    ancestor: Object,
    version: '1.1',
    forEach: function (object, block, context) {
      for (var key in object) {
        if (this.prototype[key] === undefined) {
          block.call(context, object[key], key, object);
        }
      }
    },
    implement: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
          // if it's a function, call it
          arguments[i](this.prototype);
        } else {
          // add the interface using the extend method
          this.prototype.extend(arguments[i]);
        }
      }
      return this;
    },
    toString: function () {
      return String(this.valueOf());
    }
  });

  // Return Base implementation
  return Base;
});

},{}]},{},["/9Q6Zj","Qz+ab4","0D1Aa+","8RkSAW","JnjsU8"])