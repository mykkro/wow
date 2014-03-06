var GameController = Base.extend({
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
