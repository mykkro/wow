module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var Base = require("basejs")
    var SelectChain = require("../../../js/SelectChain")


    return BasePage.extend({
        init: function(data, next) {
            var self = this
            var homeButton = this.getWidget("homeButton")
            var quitButton = this.getWidget("quitButton")

            /* widgetization complete! */
            quitButton.click(function() {
                // move back to previous page...
                window.history.go(-1)
            })
            homeButton.click(function() {
                // move back to previous page...
                window.location.href = "/plugins/homepage"
            })

            this.selectChain = new SelectChain([
                homeButton.element,
                quitButton.element
            ])

            /* continue when finished */
            if (next) next(this)
        },
        onVirtualControl: function(evt) {
            switch (evt.control) {
                case "home":
                    this.goToHomePage()
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

}
