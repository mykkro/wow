module.exports = function(window, $, SVG) {


	var page = {
		init: function(data, next) {
			var document = window.document
			var Widgetizer = require("../js/widgetizer")(window, $)
			var SvgHelper = Widgetizer.SvgHelper
			var youtube = require('youtube-feeds')
			var truncate = require('html-truncate');
			var svgsvg = document.getElementById("svg")

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
						showItem(items[i], i)
					}
				}
			}

			var colors = ["#330099", "#f8c300", "#dd1379", "#dd1379", "#330099", "#f8c300"]

			var showItem = function(data, index) {
				var column = index%3
				var row = Math.floor(index/3)	
				var tx = 160 + column*223
				var ty = 36 + row*223			
				var label = truncate(data.title, 20)
				var thumbUrl = data.thumbnail.sqDefault
				var thumb = SvgHelper.image({x:7, y:20, width:180, height:120, src:thumbUrl})
				var rect = SvgHelper.rect({ry: 35, rx:35, height:195, width:195, fill:"#fff", stroke:colors[index], "stroke-width":5})
				var txt = SvgHelper.text(label, {x:97, y: 170, "text-anchor":"middle"})
				var grp = SvgHelper.group({"class":"youtube-results", transform: "translate("+tx+", "+ty+")"}, [rect, thumb, txt])
				svgsvg.appendChild(grp)
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

			var searchIt = function(page) {
				var query = Widgetizer.get("searchTextbox").val()
				// TODO get page info from querystring
				searchYouTubeVideos({q:query, 'max-results':6, 'start-index':1+(page-1)*6}, showSearchResults)				
			}

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
					searchIt(page)
				}
				Widgetizer.get("searchTextbox").onEnterPressed = function() {
					searchIt(page)
				}
				Widgetizer.get("searchButton").click(function() {
					searchIt(page)
				})

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}