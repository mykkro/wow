module.exports = function(Widgetizer, i18n, dialogs) {

	var Base = require('basejs');
    var mustache = require('mustache');
    
	var server = Widgetizer.rpc

	var RadioPanel = Base.extend({
	    constructor: function(adminId) {
	        var self = this
	        this.adminId = adminId
	        $("#add-radio-btn").click(function() {
	            self.addUserRadio()
	        })
	        self.refreshRadiosView()
	    },
	    getRadios: function(cb) {
	    	/**/var page = 1/**/
	        server("userRadiosList", {
	            adminId: this.adminId,
	            page: page
	        }, cb)
	    },
	    showRadios: function(data) {
	        console.log("show radios: ", data)
	        var root = $("#radio-list").empty()
	        if (data && data.items) {
	            for (var i = 0; i < data.items.length; i++) {
	                root.append(this.showRadio(data.items[i]))
	            }
	        }
	    },
	    showRadio: function(item) {
	        var self = this
	        var tpl = '<span><a href="{{url}}">{{title}}</a></span><button>Remove</button>'
	        var html = mustache.to_html(tpl, item)
	        var out = $("<div>").html(html)
	        out.find("a").playable()
	        out.find("button").click(function() {
	            self.showRemoveDialog(function() {
	                // confirmed...
	                self.removeRadio(item.userId, item.url, out)
	            })
	        })
	        return out
	    },
	    removeRadio: function(userId, url, div) {
	        // remove record from database...
	        server("userRadiosRemove", {
	            adminId: this.adminId,
	            userId: userId,
	            url: url
	        }, function(err, res) {
	            if (err) console.error(err);
	            else {
	                div.fadeOut("slow")
	            }
	        })
	    },
	    addUserRadio: function() {
	        var userId = $("#radiouser-textfield").val()
	        var url = $("#radiourl-textfield").val()
	        var title = $("#radiotitle-textfield").val()
	        if (userId && url) {
	            var self = this
	            server("userRadiosAdd", {
	                adminId: this.adminId,
	                userId: userId,
	                url: url,
	                title: title
	            }, function(err, res) {
	                console.log(res)
	                self.refreshRadiosView()
	            })
	        }
	    },
	    showRemoveDialog: function(cb) {
	        dialogs.removeDialog(function(reallyRemove) {
	            if (reallyRemove) cb()
	        })
	    },
	    refreshRadiosView: function() {
	        var self = this
	        self.getRadios(function(err, data) {
	            console.log(data)
	            if (!err) self.showRadios(data.result)
	        })
	    }
	})

	return RadioPanel
}