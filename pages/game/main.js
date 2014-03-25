module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var SvgHelper = require("../../js/svghelper")(window)
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

	var path = require("path")

	var GamePage = BasePage.extend({
		init: function(data, next) {
			var server = this.wtr.rpc
			var self = this
			var appName = data.query.importname
			//var appUrl = "/imports/"+ appName+ "/"
			/**/var appUrl = "/test/samplegame/"
		    var locale = data.query.lang || 'en'
		    var defaultLocaleUrl = "lang/labels."+locale+".json"
		    var localeUrl = "lang/"+locale+".json"
		    var metadataUrl = "wow.json"

			var quitBtn = this.getWidget("quitButton")
			var newGameBtn = this.getWidget("newGameButton")
			var mySwitcher = this.getWidget("mySwitcher")
			mySwitcher.setActive(1)
			newGameBtn.disable()
			quitBtn.click(function() {
				// move back to previous page...
				self.goBack()
			})
			
			var buttons = _.object(_.map([
				"newGameButton",
				"pauseButton",
				"restartButton",
				"quitGameButton",
				"infoButton",
				"rulesButton",
				"scoreButton",
				"settingsButton"
			], function(x){return [x, self.getWidget(x)]}))
			console.log(buttons)

		    $.when(
		    	$.getJSON(appUrl+metadataUrl), 
		    	$.getJSON(appUrl+defaultLocaleUrl), 
		    	$.getJSON(appUrl+localeUrl)
		    ).done(function(meta, dl, l) {

		      	var metadata = meta[0]
		      	var localedata = $.extend({},l[0],dl[0])
		      	var dd = {wow:metadata, translated:localedata}

		      	// translate labels...
		      	for(var key in buttons) {
		      		var btn = buttons[key]
		      		var el = $(btn.element).find("tspan")
		      		el.text(dd.translated.labels[el.text()])
		      	}

				console.log("WOW metadata loaded")
				console.log(dd)
				var previewUrl = appUrl + "preview.png"
				var img = SvgHelper.image({x:300, y:50, width:200, height: 200, src:previewUrl})
				document.getElementById("previewTab").appendChild(img)

				/* continue when finished */
				if(next) next(self)
			})

		}
	})
	return GamePage

}