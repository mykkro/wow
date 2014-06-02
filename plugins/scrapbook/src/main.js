module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var ExportBookViewer = require("./js/things/ExportBookViewer")
    var Things = require("./js/things/Things")

    var path = require("path")

    var bookman_log = function(data) {
      console.log(data);
    }

    var ScrapbookPage = BasePage.extend({
        init: function(data, next) {
            var url = require("url")
            var appName = data.query.importname
            var self = this

            /* use data to modify page */
            var quitBtn = this.getWidget("quitButton")
            var favButton = this.getWidget("favButton")
            var unfavButton = this.getWidget("unfavButton")

            function setFavState(flag) {
                if (flag) {
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

            var baseUrl = "/imports/" + appName
            var metadataUrl = baseUrl + "/book.json"

            $.getJSON(metadataUrl).done(function(book) {
                // convert all relative URIs
                book = Things.convertURIs(book, baseUrl)
                // create book view...
                var bookView = new ExportBookViewer({data:book, fullscreen:true, logger: bookman_log, url:"https://nit.felk.cvut.cz/~myrousz/escrapbook-v3/books/view/34"});
                bookView.init();
                // continue when finished 
                if (next) next(self)
            }).fail(function(err) {
                console.error(err)
                if (next) next(self)
            })
        }
    })
    return ScrapbookPage

}
