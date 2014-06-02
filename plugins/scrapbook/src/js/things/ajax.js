//= require "decorator"

var Ajax = Decorator.extend({
    init: function() {
        this.loaded($.noop);
        this.received(function(data) { return data; });
        this.transform(function(data) { return Thing.create(data); })
        this.base();
        this.reload();
    },
    reload: function() {
        var url = this.options.url;
        var self = this;
        if(url) {
            $.ajax({
              url: url,
              dataType: 'json',
              //data: data,
              success: function(data) {
                var thing = self.transform(self.received(data));
                self.setSlot('content', thing);
                self.loaded(thing);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // TODO dat tam misto toho chyb. panel
                alert("AJAX failed! "+textStatus);
              }
            });
        }
        if(this.options.reloadInterval) {
            var fun = function() { self.reload(); };
            setTimeout(fun, 1000*this.options.reloadInterval);
        }
    },
    loaded: function(arg) {
        if(typeof arg == 'function') {
            this.onloaded = arg;
        } else {
            return this.onloaded(arg);
        }
    },
    received: function(arg) {
        if(typeof arg == 'function') {
            this.onreceive = arg;
        } else {
            return this.onreceive(arg);
        }
    },
    transform: function(arg) {
        if(typeof arg == 'function') {
            this.ontransform = arg;
        } else {
            return this.ontransform(arg);
        }
    },
    _klass: "ajax thing",
    _type: "ajax",
    _defaults: {
        url: '', //"testing/thing.json",
        reloadInterval: 0 //60 // in seconds
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "reloadInterval": {
			    "type":"integer",
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "uri",
			    "required":true
		    }
	    }
    }
});



