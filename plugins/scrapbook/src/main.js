module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var ExportBookViewer = require("./js/things/ExportBookViewer")
    var Things = require("./js/things/Things")
    var Base = require("basejs")
    var SelectChain = require("../../../js/selectchain")($, Base)

    var path = require("path")

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

            this.selectChain = new SelectChain([
                quitBtn.element
            ])

            var baseUrl = "/imports/" + appName
            var metadataUrl = baseUrl + "/book.json"

            var bookView
            $.getJSON(metadataUrl).done(function(book) {
                // convert all relative URIs
                book = Things.convertURIs(book, baseUrl)
                // create book view...
                bookView = new ExportBookViewer({data:book, fullscreen:true, logger: Wow.logger, uuid: appName});
                bookView.init();
                self.bookView = bookView
                // continue when finished 
                if (next) next(self)
            }).fail(function(err) {
                console.error(err)
                if (next) next(self)
            })
        },
        onVirtualControl: function(evt) {
            switch (evt.control) {
                case "home":
                    this.goToHomePage()
                    break;
                case "left":
                    this.bookView.turnNext()
                    break;
                case "right":
                    this.bookView.turnPrevious()
                    break;
                case "up":
                    this.selectChain.selectPrevious()
                    break;
                case "down":
                    this.selectChain.selectNext()
                    break;
                case "select":
                    $(this.selectChain.current()).click()
                    this.selectChain.update()
                    break;
            }
        }

    })
    return ScrapbookPage

}
