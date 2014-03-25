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
			var url = require("url")
          	var appName = data.query.importname
			var appId = appName
			var userId = "555"		
			var self = this
			
			/* use data to modify page */
			var quitBtn = this.getWidget("quitButton")
			var favButton = this.getWidget("favButton")
			var unfavButton = this.getWidget("unfavButton")
			function setFavState(flag) {
				if(flag) {
					favButton.disable()
					unfavButton.enable()
				} else {
					favButton.enable()
					unfavButton.disable()
				}
			}
			/*
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
*/
			quitBtn.click(function() {
				// move back to previous page...
				self.goBack()
			})
			var importName = appName || "notfound"
			var src = "/imports/"+ importName+ "/index.html"
			//window.alert(src)
			// TODO automatic iframe resizing... 
			// ERROR: sometimes the application will not show, page refresh necessary
			//setTimeout(function() {
				$("#iframe-wrapper").empty().append(
					$("<iframe nwfaketop nwdisable>").attr({
						width: "100%",
						height: "100%",
						src: src + "?showquitbutton=no&lang=de",
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
			if(next) next(this)
		}
	})
	return page

}