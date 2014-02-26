var RaphanoidGame = Game.extend({

  init: function(cb) {
    this.paperDiv = $("<div>").attr("id", "paper").appendTo($("#tab-game"))
    this.paper = null
    if(cb) cb()
  },
  start: function(cb) {
    // initialization...
    this.paperDiv.empty()
    this.paper = Raphael("paper", 400, 400);
    this.screen = new Raphanoid.Screen(this.paper, Raphanoid.screens[0]);
    this.screen.init(this.paper);
    if(cb) cb()
  },
  stop: function(cb) {
    this.screen.stop()
    if(cb) cb()
  },
  quit: function(cb) {
    this.stop(cb)
  }


})