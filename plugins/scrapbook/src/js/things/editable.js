//= require "thing"
//= require "modal"

var Editable = Thing.extend({
    init: function() {
        this.onchanged = $.noop;
        this.editor = $("<div>").addClass("editable-editor");
        this.pane = $("<div>").addClass("editable-pane");
        this.element.append(this.pane).append(this.editor);
        this.setSlot('content', Thing.empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        var self = this;
        var schema = value._schema;
        this.editor.empty();
        if(!schema) {
            // pouzit radsi json editor
        } else {
            this.editor.jsonform({schema: value._schema, value: value.options, name: __("Properties")+" - "+value._type});
            this.editor.jsonform('change', function() {
                self._save(true);
            });
            this.editor.jsonform('save', function() {
                self._save();
            });
        }
        this.pane.html(value.get());
        return this;
    },
    _save: function(stay) {
        var self = this;
        // value changed in editor...
        var newVal = self.editor.jsonform('value');
        self.getSlot('content').setOptions(newVal);
        if(!stay) self.onchanged(newVal);
    },
    _klass: "editable thing",
    _type: "editable",
    _defaults: {}
}, {
    edit: function(thing, changed) {
        var edt = new Editable();
        edt.setSlot('content', thing.copy());
        var modal = Modal.show(edt, {height: 630, minHeight: 630, width: 840, minWidth: 840, resizable: false, draggable: true, title:__('Properties')});
        edt.onchanged = function(newVal) {
            modal.close();
            if(changed) changed(newVal);
        };
    }
});


