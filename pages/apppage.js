module.exports = function(window, $, SVG, i18n) {

	var path = require("path")
	var Auth  = require("../lib/auth")(window)
	var Storage = require("../lib/storage")
	var url = require("url")
	var parsedUrl = url.parse(window.location.href, true)
	
	// ensure that some directories exist...
	Storage.init()

	var page = {
		init: function(data, next) {
			var W = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			W.useCommonWidgets()

			/* transform wow:markup to SVG and widgets */
			W.widgetize(window.document, function() {
				/* use data to modify page */
				var quitBtn = W.get("quitButton")
				var favButton = W.get("favButton")
				var unfavButton = W.get("unfavButton")
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				var importName = parsedUrl.query.importname || "notfound"
				var src = path.join(Storage.importDir, importName, "index.html")			
				$("#iframe-wrapper").html(
					$("<iframe nwfaketop nwdisable>").attr({
						width: 640,
						height: 390,
						src: src,
						frameborder: 0
					})
				)
				
				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}