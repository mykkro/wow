//= require "softkeyboard"

var SoftTextEditor = Thing.extend({
    init: function() {
        var self = this;
        this.onchange = $.noop;
        this.keyboard = new SoftKeyboard();
        this.keyboard.keyPressed(function(kb) {
            self._keyPressed(kb);
        });
        this.textfield = $("<textarea>").val(this.options.value).change(function() {
            self.options.value = $(this).val();
        });
        this.buttonOk = $("<button>").addClass('done').text(__("Done")).click(function() {
            self.change(self.textfield.val());
        });
        this.element
            .append($("<div>").addClass("textfield").append(this.textfield))
            .append($("<div>").addClass("btn").append(this.buttonOk))            
            .append(this.keyboard.get());
    },
    refresh: function() {
        this.textfield.val(this.options.value);
    },
    // TODO napojit
    change: function(arg) {
        if(typeof arg == 'function') {
            this.onchange = arg;
        } else {
            this.onchange(arg);
        }
    },
    _keyPressed: function(kb) {
        var cc = kb.name;
        switch(cc) {
            case 'caps': 
                this.capsLock = this.keyboard.getSwitchState('caps');
                break;
            case 'del':
                // delete last character
                this.options.value = this.options.value.slice(0, -1);
                this.refresh();
                break;
            case 'nums': 
                break;
            case 'enter':
                this.options.value += "\n";
                this.refresh();
                break;
            case 'comma':
                this.options.value += ",";
                this.refresh();
                break;
            case 'space':
                this.options.value += " ";
                this.refresh();
                break;
            case 'dot':
                this.options.value += ".";
                this.refresh();
                break;
            default:
                if(this.capsLock) {
                    // invert case...
                    cc = ( cc >= 'A' && cc <= 'Z' ) ? cc.toLowerCase() : cc.toUpperCase();
                }
                this.options.value += cc;
                this.refresh();
        }
    },
    _klass: "soft-text-editor thing",
    _type: "soft-text-editor",
    _defaults: {
        "value": ""
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "value": {
			    "type":"string",
			    "required":true
		    }
	    }
    }
});


