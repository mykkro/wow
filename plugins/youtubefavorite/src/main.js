module.exports = function(Wow) {
    var $ = Wow.$
    var i18n = Wow.i18n
    var userId = '555'
    var VideosPage = require("../../../js/VideosPage")(Wow)

    var FavVideosPage = VideosPage.extend({
        createControls: function(data) {
            this.base()
            var self = this
            var searchVidButton = self.getWidget("searchVidButton")
            var userVidButton = self.getWidget("userVidButton")
            userVidButton.click(function() {
                self.goTo("/plugins/youtubepersonal")
            })
            searchVidButton.click(function() {
                self.goTo("/plugins/youtubesearch")
            })
            self.selectChain.append(userVidButton.element)
            self.selectChain.append(searchVidButton.element)
        },
        searchIt: function(q, next) {
            var self = this
            var page = parseInt(q.page || 1)
            self.updateBrowserQuery({
                page: page
            })
            var skip = ((page-1)*6)
            $.getJSON("/api/youTubeVideo/favorite?skip="+skip+"&limit=6").done(function(items) {
                console.log("Found items: ", items)
                var total = items.length
                if(total==6) total=7
                var obj = {totalItems: total, startIndex: 1+skip, itemsPerPage: 6, items: items} 
                self.displayResults(page, obj, next)
            })
        }
    })
    return FavVideosPage

}
