module.exports = function(Wow) {
	var $ = Wow.$
	var i18n = Wow.i18n
	var userId = '555'
	var VideosPage = require("../../js/videospage")(Wow)

	var FavVideosPage = VideosPage.extend({
		searchIt: function(page, next) {
			var self = this
			self.updateBrowserQuery(page)
			self.wtr.rpc("favVideosList", {userId:userId, page:page}, function(err, data) {	
				if(!err) {					
					data = data.result
					self.displayResults(page, data, next)
				}
			}) 
		}
	})
	return FavVideosPage

}