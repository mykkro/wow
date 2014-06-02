var Thing = require("./Thing")
var Empty = require("./Empty")

var Clickable = Thing.extend({
    init: function() {
        this.pane = $("<div>").addClass("clickable-pane");
        this.setSlot('content', new Empty());
        this.click($.noop);
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.empty()
            .append(value.get())
            .append(this.pane);
        return this;
    },
    refresh: function() {
      this.base();
      this.pane.attr('title', this.options.tooltip);
    },
    click: function(arg) {
        if(arg) {
            this.onclick = arg;
            this.pane.click(this.onclick);
        } else {
            return this.onclick();
        }
    },
    _klass: "clickable thing",
    _type: "clickable",
    _defaults: {
      "tooltip": ""
    }
});

module.exports = Clickable
