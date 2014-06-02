//= require "thing"

var ContextmenuDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>")
            .addClass("mykkro-contextmenu-decorator-content")
            .appendTo(this.element);
        this.setSlot('content', Thing.empty());
    },
    refresh: function() {
	    this.base();
        if(this.options.hidden) {
            this.element.toolbar({tools:{}});
        } else {
            this.element.toolbar({tools:this.options.tools});
        }
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this._content.html(value.get());
        return this;
    },
    showToolbar: function() {
        this.options.hidden = false;
        this.refresh();
    },
    hideToolbar: function() {
        this.options.hidden = true;
        this.refresh();
    },
    serialize: function() {
        // toolbar decorator se nebude serializovat (aspon automaticky ne)
        return this.getSlot('content').serialize();
    },
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "contextmenu-decorator thing",
    _type: "contextmenu-decorator",
    _defaults: {
        tools: {}
    } 
});

