var RaphanoidGame = Game.extend({
  init: function(cb) {
    this.base()
    this.paperDiv = $("<div>").attr("id", "paper").appendTo($("#tab-game"))    
    this.paper = null
    if(cb) cb()
  },
  start: function(cb) {
    // initialization...
    this.base()
    this.paperDiv.empty()
    this.paper = Raphael("paper", 400, 400);
    this.screen = new Raphanoid.Screen(this.paper, this);
    this.screen.init(this.paper);
    if(cb) cb()
  },
  stop: function(cb) {
    this.base()
    this.screen.stop()
    if(cb) cb()
  },
  quit: function(cb) {
    this.base(cb)
  },
  availableLogs: function() {
    var logs = this.base()
    logs['lives'] = { "label": "Lives", "type": "integer", "defaultValue": 3, "visible": true }
    return logs
  }


})