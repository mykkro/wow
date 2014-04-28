module.exports = function(Wow) {
    var $ = Wow.$
    var i18n = Wow.i18n
    var userId = '555'
    var VideosPage = require("../../js/videospage")(Wow)

    var FavVideosPage = VideosPage.extend({
        createControls: function(data) {
            this.base()
            var self = this
            var searchVidButton = self.getWidget("searchVidButton")
            var userVidButton = self.getWidget("userVidButton")
            userVidButton.click(function() {
                self.goTo("/pages/uservideos")
            })
            searchVidButton.click(function() {
                self.goTo("/pages/searchvideos")
            })
            self.selectChain.append(userVidButton.element)
            self.selectChain.append(searchVidButton.element)
        },
        searchIt: function(page, next) {
            var self = this
            self.updateBrowserQuery(page)
            self.wtr.rpc("favVideosList", {
                userId: userId,
                page: page
            }, function(err, data) {
                if (!err) {
                    data = data.result
                    self.displayResults(page, data, next)
                }
            })
        }
    })
    return FavVideosPage

}
