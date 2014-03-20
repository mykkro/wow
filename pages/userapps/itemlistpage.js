module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var SvgHelper = require("../../js/svghelper")(window)
	var url = require("url")
	var Base = require("basejs")
	var SelectChain = require("../../js/selectchain")($, Base)
	var truncate = require('html-truncate');

	var ItemListPage = BasePage.extend({
		colors: [
			"#330099", "#f8c300", "#dd1379", "#dd1379", "#330099", "#f8c300"
		],
		init: function(Widgetizer, data, next) {
			var document = window.document
			var svgsvg = document.getElementById("svg")

			var self = this
			self.selectChain = new SelectChain()					
			
			self.resultGrp = SvgHelper.group({"class":"youtube-results"})
			self.leftBtn = Widgetizer.get("leftButton")
			self.rightBtn = Widgetizer.get("rightButton")	
			self.textBox = Widgetizer.get("searchTextbox")
			self.homeButton = Widgetizer.get("homeButton")

			self.leftBtn.click(function() {
				self.goToPreviousPage()
			})
			self.rightBtn.click(function() {
				self.goToNextPage()
			})
			self.homeButton.click(function() {
				self.goToHomePage()
			})
			svgsvg.appendChild(self.resultGrp)
			var page = parseInt(data.query.page || 1)
			self.searchIt(Widgetizer, page, function(results) {
				console.log("Displaying results: ", results)
			})

			/* continue when finished */
			if(next) next(this)
		},
		/* create a plain widget from a SVG element. Returns Promise. */
		widgetize: function(Widgetizer, el) {
			var deferred = $.Deferred()
			Widgetizer.makePlainWidget(el, function(w) {
				deferred.resolve(w)
			})
			return deferred.promise()
		},
		selectPrevious: function() {
			this.selectChain.selectPrevious()
		},
		selectNext: function() {
			this.selectChain.selectNext()
		},
		activateSelected: function() {
			// to be implemented in subclass...
			var target = $(this.selectChain.current())
			console.log("Selected: "+target)
		},
		searchIt: function(Widgetizer, page) {
			// to be implemented in subclass...
			// TODO callback after all items are widgetized
		},
		showItem: function(data, index) {
			// to be implemented in subclass...
			return SvgHelper.group({}, [])
		},
		/* update GUI with search results */
		/* also update left/right button status */
		showSearchResults: function(SvgHelper, page, data) {
			var self = this
			data = (data) ? {
				// TODO change server query to return similar results as youtube search...
				totalItems: 7,
				startIndex: 1,
				itemsPerPage: 6,
				items: data.result
			} : {totalItems:0, startIndex:1, itemsPerPage:6, items:[]}	
			var total = data.totalItems
			var start = data.startIndex
			var pagesize = data.itemsPerPage
			var items = data.items
			console.log("Showing results "+start+"-"+(start+items.length-1)+" from "+total+" total")			
			console.log(data)					
			/* empty group... */
			while( self.resultGrp.hasChildNodes() ){
				self.resultGrp.removeChild(self.resultGrp.lastChild);
			}
			for(var i=0; i<6; i++) {
				var item = null
				if(i<items.length) item = items[i]
				self.resultGrp.appendChild(self.showItem(item, i))
			}
			var leftEnabled = (page>1)
			var rightEnabled = (start-1+items.length<total)
			self.leftBtn.setEnabled(leftEnabled)
			self.rightBtn.setEnabled(rightEnabled)
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
					case "up":
						this.selectPrevious()
						break;
					case "down":
						this.selectNext()
						break;
					case "select":
						this.activateSelected()
						break;
				}
			}
		}
	})

	return ItemListPage

}