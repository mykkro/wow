module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../js/BasePage")

    return BasePage.extend({
        init: function(data, next) {
            $("g[name=quitButton]").click(function() {
                // move back to previous page...
                window.history.go(-1)
            })

            /* continue when finished */
            if (next) next(this)
        }
    })
}
