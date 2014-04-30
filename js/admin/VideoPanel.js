module.exports = function(Widgetizer, i18n, dialogs) {

	var Base = require('basejs');
    var mustache = require('mustache');
    
	var server = Widgetizer.rpc

    var VideoPanel = Base.extend({
        constructor: function(adminId) {
        	this.adminId = adminId
            var self = this
            $("#add-video-btn").click(function() {
                self.addUserVideo()
            })
            self.refreshVideosView()
        },
        getVideos: function(cb) {
        	var page = 1
            server("userVideosList", {
                adminId: this.adminId,
                page: page
            }, cb)
        },
        showVideos: function(data) {
            var root = $("#video-list").empty()
            if (data && data.items) {
                for (var i = 0; i < data.items.length; i++) {
                    root.append(this.showVideo(data.items[i]))
                }
            }
        },
        showVideo: function(item) {
            var self = this
            var tpl = '<h3>{{title}}</h3><img width="120" height="90" src="http://img.youtube.com/vi/{{id}}/default.jpg"><button>Remove</button>'
            var html = mustache.to_html(tpl, item)
            var previewUri = "http://img.youtube.com/vi/" + item.id + "/default.jpg"
            var out = $("<div>").html(html)
            out.find("img").click(function() {
                window.location.href = "/pages/video?id=" + item.id
            })
            out.find("button").click(function() {
                self.showRemoveDialog(function() {
                    // confirmed...
                    self.removeVideo(userId, item.id, out)
                })
            })
            return out
        },
        removeVideo: function(userId, videoId, div) {
            // remove record from database...
            server("userVideosRemove", {
                adminId: this.adminId,
                userId: userId,
                videoId: videoId
            }, function(err, res) {
                if (err) console.error(err);
                else {
                    div.fadeOut("slow")
                }
            })
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
                            self.refreshVideosView()
                        })
                    }
                })
            }
        },
        showRemoveDialog: function(cb) {
            dialogs.removeDialog(function(reallyRemove) {
                if (reallyRemove) cb()
            })
        },
        refreshVideosView: function() {
            var self = this
            self.getVideos(function(err, data) {
                console.log(data)
                if (!err) self.showVideos(data.result)
            })
        }
    })

	return VideoPanel
}