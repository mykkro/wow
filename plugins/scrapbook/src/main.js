module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var ExportBookViewer = require("./js/things/ExportBookViewer")

    var path = require("path")

    var bookman_log = function(data) {
      console.log(data);
    }

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
            var importName = appName || "notfound"
            var src = "/imports/" + importName + "/book.json"
            $.getJSON(src).done(function(book) {
                alert("Received book data!")
                var bookView = new ExportBookViewer({data:book, fullscreen:true, logger: bookman_log, url:"https://nit.felk.cvut.cz/~myrousz/escrapbook-v3/books/view/34"});
                bookView.init();
            })

            // widgetizer...
            ////widgetize($(".widget"));


            /* continue when finished */
            if (next) next(this)
        }
    })
    return page

}
