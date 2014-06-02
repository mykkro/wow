var Thing = require("./Thing")
var Empty = require("./Empty")

// decorator = thing with a single slot named 'content'

// TODO podedit toto vsechno od 'Decorator'
// kvuli reverzibilite dekoratoru by bylo dobre kdyby kazdy menil css properties 'wrapper' divu
var Decorator = Thing.extend({
    init: function() {
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.html(value.get());
        return this;
    },
    unwrap: function() {
        this.replaceWith(this.getSlot('content'));
    },
    _klass: "decorator thing",
    _type: "decorator"
});


module.exports = Decorator















