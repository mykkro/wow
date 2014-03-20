module.exports = function(Wow) {
	var $ = Wow.$
	var i18n = Wow.i18n
	var userId = '555'
	var VideosPage = require("../../js/videospage")(Wow)
	var window = Wow.window
	var url = require("url")

	var SearchVideosPage = VideosPage.extend({
		init: function(Widgetizer, data, next) {
			var self = this
			// additional controls...
			var page = parseInt(data.query.page || 1)
			self.page = page
			self.query = data.query.query
			self.textBox = Widgetizer.get("searchTextbox")
			self.textBox.onEnterPressed = function() {
				self.searchIt(Widgetizer, page)
			}
			Widgetizer.get("searchButton").click(function() {
				self.searchIt(Widgetizer, page)
			})
			this.base(Widgetizer, data, next)
		},
		updateView: function(Widgetizer, data) {
			var self = this
			var query = data.query.query || ""
			var page = parseInt(data.query.page || 1)
			if(query) {
				self.textBox.val(query)				
				self.searchIt(Widgetizer, page, function(results) {
					console.log("Displaying results: ", results)
				})
			} else {
				self.displayResults(Widgetizer, page, null)
			}
		},
		getQueryString: function(dpage) {
			var self = this
			var parsedUrl = url.parse(window.location.href, true)
			parsedUrl.query.query = self.textBox.val()
			var pg = parseInt(parsedUrl.query.page || 1)
			if(dpage) pg += dpage
			if(pg<1) pg=1
			parsedUrl.query.page = pg
			parsedUrl.search = null
			return url.format(parsedUrl)
		},
		updateBrowserQuery: function(page, query) {
			var newQuery = "?page="+page+"&query="+encodeURIComponent(query)
			window.History.replaceState({}, "", newQuery)
		},
		searchIt: function(Widgetizer, page, next) {
			var self = this
			var query = self.textBox.val()
			self.updateBrowserQuery(page, query)
			self.searchYouTubeVideos(Widgetizer, {q:query, 'max-results':6, 'start-index':1+(page-1)*6}, function(err, data) {	
				if(!err) {			
					self.displayResults(Widgetizer, page, data, next)
				}
			}) 
		},
		searchYouTubeVideos: function(Widgetizer, data, next) {
			console.log("Searching for YouTube videos")
			console.log(data)
			if(data.q) {
				Widgetizer.rpc("youTubeSearch", data, function(err, res) {
					if(err) next(err);
					else next(null, res.result)
				})
			} else {
				next("No search criteria given")
			}
		},
		handleEvent: function(evt) {
			if(evt.device == "virtual") {
				// TODO controls will work only if the text box is not selected
				switch(evt.control) {
					case "left":
						//if(self.leftBtn.isEnabled())
						//	this.goToPreviousPage()
						break;
					case "right":
						//if(self.rightBtn.isEnabled())
						//	this.goToNextPage()
						break;
					case "home":
						//this.goToHomePage()
						break;
					case "up":
						this.selectPrevious()
						break;
					case "down":
						this.selectNext()
						break;
					case "select":
						//this.activateSelected()
						break;
				}
			}
		}

	})
	return SearchVideosPage

}
