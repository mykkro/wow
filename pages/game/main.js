module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

	var path = require("path")

	var page = BasePage.extend({
		init: function(data, next) {
			var server = this.wtr.rpc
			var self = this
			/* use data to modify page */
			var quitBtn = this.getWidget("quitButton")
			var newGameBtn = this.getWidget("newGameButton")
			var mySwitcher = this.getWidget("mySwitcher")
			mySwitcher.setActive(1)
			newGameBtn.disable()
			quitBtn.click(function() {
				// move back to previous page...
				self.goBack()
			})
			
			/* continue when finished */
			if(next) next(this)
		}
	})
	return page

}