module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc

    var ImagePanel = Panel.extend({
        constructor: function(adminId) {
            this.base($("#image-list"))
            this.adminId = adminId
            this.searchArgs = {
                page: 1,
                adminId: adminId
            }
            var self = this
            $("#add-image-btn").click(function() {
                self.addUserImage()
            })
        },
        getItemsDB: function(args, next) {
            server("userImagesList", args, next)
        },
        showItem: function(item) {
            console.log("ImagePanel.showItem", item)
            var self = this
            var tpl = '<h3>{{title}}</h3><div>{{description}}</div><img width="120" height="90" src="{{url}}">'
            var html = mustache.to_html(tpl, item)
            var out = $("<div>").html(html)
            out.append(this.makeRemoveButton(item._id, out))
            out.find("img").click(function() {
                window.location.href = item.url
            })
            return out
        },
        removeItemDB: function(id, next) {
            // remove record from database...
            server("userImagesRemove", {
                adminId: this.adminId,
                userId: 555, /// TODO!
                videoId: id
            }, next)
        },
        addUserImage: function() {
            var userId = $("#imageuser-textfield").val()
            var title = $("#imagetitle-textfield").val()
            var description = $("#imagedesc-textarea").val()
            var imageUrl = $("#imageurl-textfield").val()
            if (userId && imageUrl) {
                server("userImagesAdd", {
                    adminId: this.adminId,
                    userId: userId,
                    fromUrl: url,
                    fromPath: null,
                    title: title,
                    description: description
                }, function(err, res) {
                    console.log(res)
                    self.refreshView()
                })
            }
        }
    })

    return ImagePanel
}
