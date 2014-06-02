var Base = require("basejs")

Array.prototype.toObject = function() {
    var out = {};
    for(var i=0; i<this.length; i++) {
        out[i] = this[i];
    }
    return out;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var DEBUG = false

var _Empty
// kazda 'vec' ma options (s defaultni hodnotou) a slots
var Thing = Base.extend({
    constructor: function(options, slots) {
        this.options = $.extend({}, this.defaults(), options);        
        this.tid = Thing.tid++;
        Thing.things[this.tid] = this;
        this.element = $("<div>").addClass(this.getClass()).attr("data-tid", this.tid);
        if(DEBUG) {
            this.element.css("background-color", '#'+Math.floor(Math.random()*16777215).toString(16));
        }
        this.slots = {};
        this.parent = null;
        this.name = null;
        // initializing...
	    this.slotChanged($.noop);
        this.init();
        this.setSlots(slots);
        // display update
        this.refresh();
    },
    copy: function() {
        return Thing.create(this.serialize());
    },
    remove: function() {
        this.replaceWith(new _Empty());        
    },
    replaceWith: function(thing) {
        if(this.parent) {
            this.parent.setSlot(this.name, thing);
            this.parent = null;
            this.name = null;           
            Thing.things[this.tid] = null;
        }
    },
    // obali this dekoratorem
    decorate: function(deco) {
        if(this.parent) {
            var par = this.parent;
            var slot = this.name;
            deco.setSlot('content', this);
            par.setSlot(slot, deco);
            return deco;
        }
    },
    serialize: function() {
        var slots = {};
        var numslots = 0;
        for(var key in this.slots) {
            slots[key] = this.slots[key].serialize();
            numslots++;
        }
        var obj = {
            type: this.getType(),
            options: this.options
        };
        if(numslots) obj.slots = slots
        return obj;
    },
    getType: function() {
        return this._type;
    },
    getClass: function() {
        return this._klass.split(" ").map(function(a){return "mykkro-"+a;}).join(" ");
    },
    init: function() {
        // create structure and variables
    },
    refresh: function() {
        // options changed...
        this.element.attr('class','');
        this.element.addClass(this.getClass());
        this.element.addClass(this.options.css);
    },
    get: function() {
        return this.element;
    },
    defaults: function() {
        return this._defaults;
    },
    // muzeme se dostat takhle i ke slotu ve slotu
    content: function(key, value) {
        var ndx = key.indexOf(".");
        if(ndx>=0) {
            // odkazujeme se na slot ve slotu
            var newKey = key.substring(0,ndx);
            var rest = key.substring(ndx+1);
            return this.getSlot(newKey).content(rest, value);
        }
        if(this.hasSlot(key)) {
            if(value) {
                // setter
                this.setSlot(key, value);
                return this;
            } else {
                // getter
                return this.getSlot(key);
            }
        } else {
            // unknown slot!
            return null;
        }
    },
    hasSlot: function(key) {
        return !!this.slots[key];
    },
    getSlot: function(key) {
        return this.slots[key];
    },
    setSlot: function(key, thing) {
        this.slots[key] = thing;
        thing._setParent(this, key);
        // DOM manipulation - to be overridden
	    this.slotChanged(key);
        return this;
    },
    removeSlot: function(key) {
        delete this.slots[key]
    },
    clearSlots: function() {
        for(var key in this.slots) {
            this.setSlot(key, new _Empty());
        }
    },
    setOptions: function(opts) {
        this.options = $.extend(this.options, opts);
        this.refresh();
	    this.slotChanged('options');
    },
    setSlots: function(slots) {
        if(slots) {
            // pokud je parametr pole, udelat z nej objekt
            if($.isArray(slots)) slots = slots.toObject();
            for(var key in slots) {
                this.setSlot(key, slots[key]);
            }
        }
    },
    _setParent: function(parent, key) {
        this.parent = parent;
        this.name = key;
    },
    isEmpty: function() {
        return this.getType() == "empty";
    },
    slotChanged: function(arg) {
        if(typeof arg == "function") {
            this.onslotchanged = arg;
        } else {
            return this.onslotchanged(this, arg);
        }
    },    
    // bez parametru vraci rekurzivne vsechny sloty
    findSlots: function(predicate, out) {
        if(!predicate) predicate = function() { return true; };
        if(!out) out = [];
        if(predicate(this)) out.push(this);
        for(var key in this.slots) {
            this.slots[key].findSlots(predicate, out);
        }
        return out;
    },
    findEmptySlots: function(out) {
        return this.findSlots(function(thing) { return thing.isEmpty(); }, out)
    },
    findSlotsByType: function(type, out) {
        return this.findSlots(function(thing) { return thing.getType() == type; }, out)
    },
    getTree: function() {
        var node = { type: this.getType(), children: {} };
        for(var key in this.slots) {
            node.children[key] = this.slots[key].getTree();
        }
        return node;
    },
    _toggleTreeView: function(node) {
        node.children(".slots").toggleClass('collapsed');
    },
    // TODO mohlo by si to pamatovat expands/collapse mezi updaty
    /* example decorator:
        decorator = function(thing, node) {
            $("<div>").addClass("toolz").insertAfter(node.find(">h2"));
        };
    */
    getTreeView: function(decorator) {
        var self = this;
        var node = $("<div>").addClass('node').attr('data-type', this.getType()).attr('data-tid', this.tid);
        var hdr = $("<h2>").text(this.getType()).appendTo(node);
        var slots = $("<div>").addClass('slots').appendTo(node);
        hdr.click(function() {
            self._toggleTreeView(node);
        });
        for(var key in this.slots) {
            (function(){
                var subtree = self.slots[key].getTreeView(decorator);
                var subheading = $("<h3>").text(key).click(function() {
                    $(this).toggleClass('collapsed');
                    self._toggleTreeView(subtree);
                });
                slots.append(subheading);
                slots.append(subtree);
            })();
        }
        node.append($("<div>").addClass('clear'));
        if(decorator) decorator(this, node);
        return node;
    },
    _type: "thing",
    _defaults: {
        "css": ""
    },
    _klass: "thing",
    _schema: {
       "type":"object",
       "properties":{
       },
       "additionalProperties":true
    }

}, {
    tid: 0,
    things: {}
});

_Empty = Thing.extend({
    refresh: function() {
        this.element.empty();
    },
    _setParent: function(parent, key) {
        this.base(parent, key);
        this.refresh();
    },
    _klass: "empty thing",
    _type: "empty"
});

module.exports = Thing
