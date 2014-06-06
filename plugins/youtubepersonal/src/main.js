module.exports = function(Wow) {
    var $ = Wow.$
    var i18n = Wow.i18n
    var userId = '555'
    var VideosPage = require("../../../js/VideosPage")(Wow)

    var UserVideosPage = VideosPage.extend({
        createControls: function(data) {
            var self = this
            this.base(data)
            var favVidButton = self.getWidget("favVidButton")
            var searchVidButton = self.getWidget("searchVidButton")
            favVidButton.click(function() {
                self.goTo("/plugins/youtubefavorite")
            })
            searchVidButton.click(function() {
                self.goTo("/plugins/youtubesearch")
            })
            self.selectChain.append(favVidButton.element)
            self.selectChain.append(searchVidButton.element)
        },
        searchIt: function(q, next) {
            var self = this
            var page = parseInt(q.page || 1)
            self.updateBrowserQuery({
                page: page
            })
            var skip = ((page-1)*6)
            $.getJSON("/api/youTubeVideo/personal?skip="+skip+"&limit=6").done(function(items) {
                console.log("Found items: ", items)
                var total = items.length
                if(total==6) total=7
                var obj = {totalItems: total, startIndex: 1+skip, itemsPerPage: 6, items: items} 
                self.displayResults(page, obj, next)
            })
        }
    })
    return UserVideosPage

}
