module.exports = function(window, $, SVG, i18n) {

	var path = require("path")
	var Auth  = require("../lib/auth")(window)
	var FavApps = require("../lib/dao/favoriteapps")
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

			var url = require("url")
        	var parsedUrl = url.parse(window.location.href, true)
          	var appName = parsedUrl.query.importname
			var appId = appName
			var userId = Auth.getLoggedUser().id			
			
			/* transform wow:markup to SVG and widgets */
			W.widgetize(window.document, function() {
				/* use data to modify page */
				var quitBtn = W.get("quitButton")
				var favButton = W.get("favButton")
				var unfavButton = W.get("unfavButton")
				function setFavState(flag) {
					if(flag) {
						favButton.disable()
						unfavButton.enable()
					} else {
						favButton.enable()
						unfavButton.disable()
					}
				}
				FavApps.starred(userId, appId, function(err, data) {
					setFavState(!err && data)
				})
				favButton.click(function() {
					FavApps.star(userId, appId, function(err, data) {
						if(!err) setFavState(true)
					})					
				})
				unfavButton.click(function() {
					FavApps.unstar(userId, appId, function(err, data) {
						if(!err) setFavState(false)
					})					
				})
				quitBtn.click(function() {
					// move back to previous page...
					window.history.go(-1)
				})
				var importName = parsedUrl.query.importname || "notfound"
				var src = path.join(Storage.importDir, importName, "index.html")			
				//window.alert(src)
				// TODO automatic iframe resizing... 
				// ERROR: sometimes the application will not show, page refresh necessary
				//setTimeout(function() {
					$("#iframe-wrapper").empty().append(
						$("<iframe nwfaketop nwdisable>").attr({
							width: "100%",
							height: "100%",
							src: src + "?foo=bar",
							frameborder: 0
						}).load(function() {
							// reloading does not seem to help...
							//$(this).off('load')
							//$(this).get(0).contentWindow.location.reload();
						})
					)
					//document.getElementById("iframe-wrapper").reload(true);
				//}, 1000)
				
				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}