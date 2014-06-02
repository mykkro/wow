var Thing = require("./Thing")
var Empty = require("./Empty")

var RefDecorator = Thing.extend({
    init: function() {
        this._content = $("<div>").addClass("mykkro-ref-decorator-content")
        this._control = $("<a>").addClass('ref-link mykkro-ref-decorator-control')
        this._tooltip = $("<div>").addClass("hidden ref-tooltip")
        this.element.append(
            this._content,
            this._tooltip,
            this._control
        )
        this._control.qtip({content: { text: this._tooltip } })
        this.setSlot('content', new Empty())
    },
    refresh: function() {
        this.base()
        var label = this.options.label || "?"
        var src = this.options.source
        this._tooltip.empty().append($("<p>").text(__("Originally from:")))
        // TODO tohle nejak blbne...
        //if(Common.isValidUrl(src)) {
        if(src.startsWith("http")) {
            this._tooltip.append(
                $("<p>").append($("<a>").attr("href", src).text(src))
            )
            this._control.text(label).attr("href", src)
        } else {
            this._tooltip.append(
                $("<p>").text(src)
            )
            this._control.text(label).attr("href", "#").click(function() { return false;})
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
    /*
    serialize: function() {
        return this.getSlot('content').serialize();
    },
    */
    // pouziva se toto nekde?
    getTree: function() {
        // skip the outer layer...
        return this.getSlot('content').getTree();
    },
    /* ref decorator won't be editable */
    getTreeView: function(decorator) {
        // skip the outer layer...
        return this.getSlot('content').getTreeView(decorator);
    },
    _klass: "ref-decorator thing",
    _type: "ref-decorator",
    _defaults: {
        label: null,
        source: "http://www.google.com"
    },
    _schema: {
       "type":"object",
       "properties":{
          "label":{
             "type":"string",
             "required":false
          },
          "source":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }

});

module.exports = RefDecorator
