var Thing = require("./Thing")
var Empty = require("./Empty")

var Modal = Thing.extend({
    init: function() {
        this.setSlot('content', new Empty());
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.element.html($("<p>").html(value.get()));
        this.refresh();
        return this;
    },
    _fullOpts: function() {
      return $.extend({modal: true}, this.options)
    },
    show: function() {
        var self = this;
	    $(self.element).dialog(this._fullOpts());
	    $(self.element).dialog('open');
    },
    close: function() {
	    $(this.element).dialog('close');
    },
    refresh: function() {
    	$(this.element).dialog(this._fullOpts());
    },
    _klass: "modal thing",
    _type: "modal",
    _defaults: {
        autoOpen: false,
        minHeight: 608, // 560,  
        minWidth: 760, //740
        title: 'Dialog',
        closeOnEscape: true
    },
    _schema: {
       "type":"object",
       "properties":{
          "title": {
             "type": "string",
             "required": false
          },
          "autoOpen":{
             "type":"boolean",
             "required":true
          },
          "minHeight":{
             "type":"string",
             "required":true
          },
          "minWidth":{
             "type":"string",
             "required":true
          }
       },
       "additionalProperties":true
    }

}, {
    show: function(thing, opts) {
        var modal = new Modal(opts);
        modal.content('content',thing);
        modal.show();
        return modal;
    }
});

module.exports = Modal