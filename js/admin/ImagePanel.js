module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc
    var fs = require("fs")
    // TODO use path module?
    var template = fs.readFileSync(__dirname + "/../../templates/previews/image.html")

    var ext = require("../util/UriUtils").ext

    function afterDrop(url) {
        $("#imageurl-textfield").val(url)
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
            if (extension == ".jpg" || extension == ".png") {
                var link = $('<a href="' + url + '" />').text(url)
                $(this).html(link).addClass("accepted")
                afterDrop(url)
            } else {
                $(this).html("Unsupported link type")
                $(this).addClass("error")
            }
        }
        return false;
    }


    var ImagePanel = Panel.extend({
        constructor: function(adminId) {
            this.base($("#image-list"), template)
            this.adminId = adminId
            this.searchArgs = {
                page: 1,
                adminId: adminId
            }
            var self = this
            $("#add-image-btn").click(function() {
                self.addUserImage()
            })
            $("#image-dropzone")
                .bind('drop', drop)
                .bind('dragover', cancel)
                .bind('dragenter', cancel)
                .bind('dragleave', cancel);
        },
        getItemsDB: function(cb) {
            server("userImagesList", this.searchArgs, cb)
        },
        removeItemDB: function(id, next) {
            server("userImagesRemove", id, next)
        },
        addUserImage: function() {
            var userId = $("#imageuser-textfield").val()
            var url = $("#imageurl-textfield").val()
            var title = $("#imagetitle-textfield").val()
            var description = $("#imagedescr-textarea").val()
            if (userId && url) {
                var self = this
                server("userImagesAdd", {
                    adminId: this.adminId,
                    userId: userId,
                    fromUrl: url,
                    title: title
                }, function(err, res) {
                    console.log(res)
                    self.refreshView()
                })
            }
        }
    })

    return ImagePanel
}
