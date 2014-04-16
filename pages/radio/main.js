module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../js/basepage")
    return BasePage.extend({
        init: function(data, next) {
            /* widgetization complete! */
            this.getWidget("quitButton").click(function() {
                // move back to previous page...
                window.history.go(-1)
            })

            /* continue when finished */
            if (next) next(this)
        }
    })

}
