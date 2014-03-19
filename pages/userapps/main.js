module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

	var url = require("url")

	var UserAppsPage = BasePage.extend({
		updateBrowserQuery: function(page, query) {
			var newQuery = "?page="+page
			window.History.replaceState({}, "", newQuery)
		},
		getQueryString: function(dpage) {
			var parsedUrl = url.parse(window.location.href, true)
			var pg = parseInt(parsedUrl.query.page || 1)
			if(dpage) pg += dpage
			if(pg<1) pg=1
			parsedUrl.query.page = pg
			parsedUrl.search = null
			return url.format(parsedUrl)
		},
		goToPreviousPage: function() {
			var href = this.getQueryString(-1)
			window.location.href = href
		},
		goToNextPage: function() {
			var href = this.getQueryString(1)
			window.location.href = href
		},
		goToImportPage: function(name) {
			window.location.href = "/pages/app?importname="+name
		},
		goToHomePage: function() {
			window.location = "/pages/home"
		},
		colors: [
			"#330099", "#f8c300", "#dd1379", "#dd1379", "#330099", "#f8c300"
		],
		init: function(Widgetizer, data, next) {
			var document = window.document
			var SvgHelper = Widgetizer.SvgHelper
			var server = Widgetizer.rpc
			var truncate = require('html-truncate');
			var svgsvg = document.getElementById("svg")
			var resultGrp
			var leftBtn
			var rightBtn
			var textBox

			var self = this


			/* update GUI with search results */
			/* also update left/right button status */
			self.showSearchResults = function(err, data) {
				console.log("Showing search results",data)
				if(err) console.error(err);
				else {
					data = (data) ? {
						// TODO change server query to return similar results as youtube search...
						totalItems: 7,
						startIndex: 1,
						itemsPerPage: 6,
						items: data.result
					} : {totalItems:0, startIndex:1, itemsPerPage:6, items:[]}
					console.log(data)		
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
						resultGrp.appendChild(self.showItem(item, i))
					}
					var leftEnabled = (page>1)
					var rightEnabled = (start-1+items.length<total)
					leftBtn.setEnabled(leftEnabled)
					rightBtn.setEnabled(rightEnabled)
				}
			}


			self.showItem = function(data, index) {
				console.log(data)
				var column = index%3
				var row = Math.floor(index/3)	
				var tx = 160 + column*223
				var ty = 36 + row*223		
				var rect = SvgHelper.rect({ry: 35, rx:35, height:195, width:195, fill:"#fff", stroke:self.colors[index], "stroke-width":5})
				var items = [rect]
				var obj = { 
					"class": "youtube-result", 
					transform: "translate("+tx+", "+ty+")"
				}
				if(data) {
					var label = data.title ? truncate(data.title, 20) : ""
					var thumbUrl = "/imports/"+data.importName+"/preview.png"
					var thumb = SvgHelper.image({x:7, y:20, width:180, height:120, src:thumbUrl})
					var txt = SvgHelper.text(label, {x:97, y: 170, "text-anchor":"middle"})
					items = [rect, thumb, txt]
					obj['data-name'] = data.importName
				} else {
					obj["class"] += " disabled"
				}
				return SvgHelper.group(obj, items)
			}


			self.searchIt = function(page) {
				self.updateBrowserQuery(page)
				server("importsList", {/*userId:userId, */page:page}, function(err, data) {
					self.showSearchResults(err, data)
					/* create plain widgets from results... */
					$(".youtube-result").each(function() {
						var $this = $(this)
						var el = $this.get(0)
						Widgetizer.makePlainWidget(el, function(w) {
							/* attach events... */
							var name = $this.data("name")
							if(name) {
								$this.click(function() {
									self.goToImportPage(name)			
								})
							}
						})
					})

				}) 
			}

			resultGrp = SvgHelper.group({"class":"youtube-results"})
			svgsvg.appendChild(resultGrp)
			leftBtn = Widgetizer.get("leftButton")
			rightBtn = Widgetizer.get("rightButton")	
			textBox = Widgetizer.get("searchTextbox")

			leftBtn.click(function() {
				self.goToPreviousPage()
			})
			rightBtn.click(function() {
				self.goToNextPage()
			})

			/* bind events... */
			Widgetizer.get("homeButton").click(function() {
				// move back to main page
				self.goToHomePage()
			})
			var page = parseInt(data.query.page || 1)
			self.searchIt(page)

			/* continue when finished */
			if(next) next(this)
		},
		handleEvent: function(evt) {
			if(evt.device == "virtual") {
				switch(evt.control) {
					case "left":
						this.goToPreviousPage()
						break;
					case "right":
						this.goToNextPage()
						break;
					case "home":
						this.goToHomePage()
						break;
				}
			}
		}
	})
	return UserAppsPage

}