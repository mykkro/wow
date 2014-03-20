module.exports = function(Wow) {
	var $ = Wow.$
	var i18n = Wow.i18n
	var userId = '555'
	var VideosPage = require("../../js/videospage")(Wow)

	var UserVideosPage = VideosPage.extend({
		createControls: function(data) {
			var self = this
			this.base(data)
			var favVidButton = self.getWidget("favVidButton")
			var searchVidButton = self.getWidget("searchVidButton")
			favVidButton.click(function() {
				self.goTo("/pages/favvideos")
			})
			searchVidButton.click(function() {
				self.goTo("/pages/searchvideos")
			})
			self.selectChain.append(favVidButton.element)
			self.selectChain.append(searchVidButton.element)
		},
		searchIt: function(page, next) {
			var self = this
			self.updateBrowserQuery(page)
			self.wtr.rpc("userVideosList", {userId:userId, page:page}, function(err, data) {	
				if(!err) {					
					data = data.result
					self.displayResults(page, data, next)
				}
			}) 
		}
	})
	return UserVideosPage

}