module.exports = function(Wow) {
    var BasePage = require("../../js/BasePage")

    return BasePage.extend({
        init: function(data, next) {
            /* continue when finished */
            if (next) next(this)
        }
    })

}
