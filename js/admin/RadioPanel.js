module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc
    var fs = require("fs")
    // TODO use path module?
    var template = fs.readFileSync(__dirname + "/../../templates/previews/radio.html")

    var ext = require("../util/UriUtils").ext

    function afterDrop(url) {
        $("#radiourl-textfield").val(url)
        $("#radiotitle-textfield").val(url)
    }

    function cancel(e) {
        if (e.preventDefault) e.preventDefault(); // required by FF + Safari
        return false; // required by IE
    }

    function drop(e) {
        $(this).removeClass("error").removeClass("accepted")
        e.preventDefault();
        var found = false;
        var types = e.dataTransfer.types
        for (var i = 0; i < types.length; i++) {
            if (types[i] == "text/uri-list") {
                found = true;
                break;
            }
        }
        var out = ""
        var url = null
        if (!found) {
            // not a link...
            $(this).html("Not a link")
            $(this).addClass("error")
        } else {
            url = e.dataTransfer.getData("Text")
            var extension = ext(url).toLowerCase()
            if (extension == ".mp3" || extension == ".ogg") {
                var link = $('<a href="' + url + '" />').text(url)
                $(this).html(link).addClass("accepted")
                link.playable()
                afterDrop(url)
            } else {
                $(this).html("Unsupported link type")
                $(this).addClass("error")
            }
        }
        return false;
    }


    var RadioPanel = Panel.extend({
        constructor: function(adminId) {
            this.base($("#radio-list"), template)
            this.adminId = adminId
            this.searchArgs = {
                page: 1,
                adminId: adminId
            }
            var self = this
            $("#add-radio-btn").click(function() {
                self.addUserRadio()
            })
            $("#radio-dropzone")
                .bind('drop', drop)
                .bind('dragover', cancel)
                .bind('dragenter', cancel)
                .bind('dragleave', cancel);
        },
        getItemsDB: function(cb) {
            server("userRadiosList", this.searchArgs, cb)
        },
        showItem: function(item) {
            var out = this.base(item)
            out.find("a.playlink").playable()
            return out
        },
        removeItemDB: function(id, next) {
            // remove record from database...
            server("userRadiosRemove", id, next)
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
        }
    })

    return RadioPanel
}
