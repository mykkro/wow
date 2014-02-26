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


