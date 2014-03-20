module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var SvgHelper = require("../../js/svghelper")(window)
	var url = require("url")
	var truncate = require('html-truncate');

	var ItemListPage = require("./itemlistpage")(Wow)

	var UserAppsPage = ItemListPage.extend({
		init: function(Widgetizer, data, next) {
			this.base(Widgetizer, data, next)
		},
		activateSelected: function() {
			var target = $(this.selectChain.current())
			var targetName = target.find(".youtube-result").data("name")
			if(targetName) this.goToImportPage(targetName)
		},
		// TODO callback after all items are widgetized
		searchIt: function(Widgetizer, page, next) {
			var self = this
			self.updateBrowserQuery(page)
			Widgetizer.rpc("importsList", {/*userId:userId, */page:page}, function(err, data) {
				if(!err) {
					self.selectChain.clear()
					self.showSearchResults(Widgetizer.SvgHelper, page, data)
					/* create plain widgets from results... */
					var promises = $(".youtube-result").map(function() {
						var $this = $(this)
						var el = $this.get(0)
						return self.widgetize(Widgetizer, el)
					})
					$.when.apply($, promises).then(function() {
						var results = Array.prototype.slice.call(arguments)
						_.each(results, function(w) {
							/* attach events... */
							self.selectChain.append(w.element)					
							var name = $(w.element).find(".youtube-result").data("name")
							if(name) {
								$(w.element).click(function() {
									self.goToImportPage(name)			
								})
							}
						})
						self.selectChain.update()
						if(next) next(results)
					})
				}

			}) 
		},
		showItem: function(data, index) {
			var self = this
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
	})
	return UserAppsPage

}