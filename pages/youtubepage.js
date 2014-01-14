module.exports = function(window, $, SVG) {


		var youtube = require('youtube-feeds')

		var showSearchResults = function(err, data) {
			console.log("Showing search results...")
			if(err) console.error(err)
			else {
				var total = data.totalItems
				var start = data.startIndex
				var pagesize = data.itemsPerPage
				var items = data.items
				console.log("Showing results "+start+"-"+(start+items.length-1)+" from "+total+" total")			
				console.log(data)
				for(var i=0; i<items.length; i++) {
					showItem(items[i])
				}
			}
		}

		var showItem = function(data) {
			console.log("category: "+data.category)
			console.log("id: "+data.id)
			console.log("title: "+data.title)
			/*
			var thumbUrl = data.thumbnail.sqDefault
			// var thumbUrl = "http://img.youtube.com/vi/"+data.id+"/default.jpg"
			var thumb = $("<img>").attr("src", thumbUrl)
			var out = $("<div>")
				.append($("<h3>").text(data.title))
				.append(thumb)
			$("div.main").append(out)


			var preview = $("<img>").attr("src", "http://img.youtube.com/vi/"+data.id+"/0.jpg")
			$("div.main").append(preview)
			*/

		}

		var searchYouTubeVideos = function(data, next) {
			console.log("Searching for YouTube videos")
			console.log(data)
			if(data.q) {
				youtube.feeds.videos(data, next)
			} else {
				next("No search criteria given")
			}
		}

	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			var node = window.document
			Widgetizer.widgetize(node, function() {
				/* widgetization complete! */

				var quitBtn = Widgetizer.get("quitButton")
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				Widgetizer.get("homeButton").click(function() {
					// move back to main page
					window.location = "gui.html"
				})
				var query = data.query.query
				var page = parseInt(data.query.page || 1)
				if(query) {
					Widgetizer.get("searchTextbox").val(query)				
					searchYouTubeVideos({q:query, 'max-results':6, 'start-index':1+(page-1)*6}, showSearchResults)
				}
				Widgetizer.get("searchButton").click(function() {
					var query = Widgetizer.get("searchTextbox").val()
					// TODO get page info from querystring
					searchYouTubeVideos({q:query, 'max-results':6, 'start-index':1+(page-1)*6}, showSearchResults)
				})

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}