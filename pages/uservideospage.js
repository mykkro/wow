module.exports = function(window, $, SVG, i18n) {
	var url = require('url');	

	var page = {
		init: function(Widgetizer, data, next) {
			var document = window.document
			var SvgHelper = Widgetizer.SvgHelper
			var UserVideos = require('../lib/dao/uservideos')
			var truncate = require('html-truncate');
			var svgsvg = document.getElementById("svg")
			var resultGrp
			var leftBtn
			var rightBtn
			var textBox

			var updateBrowserQuery = function(page, query) {
				var newQuery = "?view=uservideospage&page="+page
				window.History.replaceState({}, "", newQuery)
			}

			/* update GUI with search results */
			/* also update left/right button status */
			var showSearchResults = function(err, data) {
				console.log("Showing search results...")
				if(err) console.error(err);
				else {
					if(!data || !data.items) {
						// show empty set...
						data = {totalItems:0, startIndex:1, itemsPertPage:6, items:[]}
					}				
					var total = data.totalItems
					var start = data.startIndex
					var pagesize = data.itemsPerPage
					var items = data.items
					console.log("Showing results "+start+"-"+(start+items.length-1)+" from "+total+" total")			
					console.log(data)					
					/* empty group... */
					while( resultGrp.hasChildNodes() ){
	    				resultGrp.removeChild(resultGrp.lastChild);
					}
					for(var i=0; i<6; i++) {
						var item = null
						if(i<items.length) item = items[i]
						resultGrp.appendChild(showItem(item, i))
					}
					var leftEnabled = (page>1)
					var rightEnabled = (start-1+items.length<total)
					leftBtn.setEnabled(leftEnabled)
					rightBtn.setEnabled(rightEnabled)
				}
			}

			var getQueryString = function(dpage) {
				var parsedUrl = url.parse(window.location.href, true)
				parsedUrl.query.query = textBox.val()
				var pg = parseInt(parsedUrl.query.page || 1)
				if(dpage) pg += dpage
				if(pg<1) pg=1
				parsedUrl.query.page = pg
				parsedUrl.search = null
				return url.format(parsedUrl)
			}


			var goToPreviousPage = function() {
				var href = getQueryString(-1)
				window.location.href = href
			}

			var goToNextPage = function() {
				var href = getQueryString(1)
				window.location.href = href
			}

			var colors = ["#330099", "#f8c300", "#dd1379", "#dd1379", "#330099", "#f8c300"]

			var showItem = function(data, index) {
				var column = index%3
				var row = Math.floor(index/3)	
				var tx = 160 + column*223
				var ty = 36 + row*223		
				var rect = SvgHelper.rect({ry: 35, rx:35, height:195, width:195, fill:"#fff", stroke:colors[index], "stroke-width":5})
				var items = [rect]
				var klass = "youtube-result"
				if(data) {
					var label = truncate(data.title, 20)
					var thumbUrl = data.thumbnail.sqDefault
					var thumb = SvgHelper.image({x:7, y:20, width:180, height:120, src:thumbUrl})
					var txt = SvgHelper.text(label, {x:97, y: 170, "text-anchor":"middle"})
					items = [rect, thumb, txt]
					$(thumb).click(function() {
						// go to video page...
						goToVideoPage(data.id)
					})
				} else {
					klass += " disabled"
				}
				return SvgHelper.group({"class":klass, transform: "translate("+tx+", "+ty+")"}, items)
			}

			var goToVideoPage = function(ytId) {
				window.location.href = "index.html?view=videopage&id="+ytId
			}

			var searchIt = function(page) {
				updateBrowserQuery(page)
				UserVideos.listNewest({/*userId:userId*/}, (page-1)*6, 6, showSearchResults) 
			}

			resultGrp = SvgHelper.group({"class":"youtube-results"})
			svgsvg.appendChild(resultGrp)
			leftBtn = Widgetizer.get("leftButton")
			rightBtn = Widgetizer.get("rightButton")	
			textBox = Widgetizer.get("searchTextbox")

			leftBtn.click(goToPreviousPage)
			rightBtn.click(goToNextPage)

			showSearchResults()

			/* bind events... */
			var quitBtn = Widgetizer.get("quitButton")
			quitBtn.click(function() {
				// move back to previous page...
				window.history.go(-1)
			})
			Widgetizer.get("homeButton").click(function() {
				// move back to main page
				window.location = "index.html?view=homepage"
			})
			var page = parseInt(data.query.page || 1)
			searchIt(page)

			/* continue when finished */
			if(next) next(page)
		}
	}
	return page

}