module.exports = function(Wow) {

    var BasePage = require("../../js/BasePage")

    return BasePage.extend({
        init: function(data, next) {
            if (next) next(this)
        }
    })
}
