var RaphanoidGame = Game.extend({

  init: function(cb) {
    var paperDiv = $("<div>").attr("id", "paper").appendTo($("#tab-game"))

    // initialization...
    var paper = Raphael("paper", 400, 400);
    var as = new Raphanoid.Screen(paper, Raphanoid.screens[0]);
    as.init(paper);

    if(cb) cb()
  },
  start: function(cb) {
    if(cb) cb()
  },
  stop: function(cb) {
    if(cb) cb()
  },
  quit: function(cb) {
    this.stop(cb)
  }


})