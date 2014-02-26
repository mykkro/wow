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
    var self = this
    this.stop(function() {
      self.start(cb)  
    })
    
  },
  stop: function() {
    if(cb) cb()
  },
  quit: function(cb) {
    this.stop(cb)
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


