var Game = Base.extend({
  // options
  constructor: function(options) {
    this.options = options || {}
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
  stop: function(cb) {
    this.log("status", "stop")
    if(cb) cb()
  },
  quit: function(cb) {
    this.log("status", "quit")
    this.stop(cb)
  },
  availableLogs: function() {
    return {
      // map of available logs
      status: { "label": "Status", "type": "string", "defaultValue": "", "visible": false },
      score: { "label": "Score", "type": "integer", "defaultValue": 0, "visible": true }
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
      delay: 2000,
      overlay: true,
      hideOnClick: true,
      after: function() {
        if(cb) cb()
      }
    })
  }  
})

