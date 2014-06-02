var Thing = require("./Thing")

var Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
        /*
        if(this.parent) this.element.html(
            $("<div>").text(this.parent.getType()+"#"+this.name)
        );
        */
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Empty
