module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc
    var fs = require("fs")
    // TODO use path module?
    var template = fs.readFileSync(__dirname + "/../../templates/previews/youtubevideo.html")

    var YouTubeVideoPanel = Panel.extend({
        constructor: function(adminId) {
            this.base($("#video-list"), template)
            this.adminId = adminId
            this.searchArgs = {
                page: 1,
                adminId: adminId
            }
            var self = this
            $("#add-video-btn").click(function() {
                self.addUserVideo()
            })
            $('#video-dropzone').youTubeDrop({
                dropped: function(videoId) {
                    console.log("Dropped!", videoId)
                    $("#videoid-textfield").val(videoId)
                }
            })
        },
        getItemsDB: function(args, next) {
            server("userVideosList", args, next)
        },
        showItems: function(data) {
            console.log("VideoPanel.showItems", data)
            // we need only the array part...
            this.base(data.items)
        },
        showItem: function(item) {
            var out = this.base(item)
            out.append(this.makeRemoveButton(item._id, out))
            out.find("img").click(function() {
                window.location.href = "/pages/video?id=" + item.id
            })
            return out
        },
        removeItemDB: function(id, next) {
            // remove record from database...
            server("userVideosRemove", {
                adminId: this.adminId,
                userId: 555, /// TODO!
                videoId: id
            }, next)
        },
        addUserVideo: function() {
            var userId = $("#videouser-textfield").val()
            var videoId = $("#videoid-textfield").val()
            if (userId && videoId) {
                var self = this
                    // get metadata for video ID... 
                server("youTubeVideoInfo", {
                    videoId: videoId
                }, function(err, data) {
                    if (!err) {
                        server("userVideosAdd", {
                            adminId: this.adminId,
                            userId: userId,
                            videoId: videoId,
                            title: data.result.title
                        }, function(err, res) {
                            console.log(res)
                            self.refreshView()
                        })
                    }
                })
            }
        }
    })

    return YouTubeVideoPanel
}
