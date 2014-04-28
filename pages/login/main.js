module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../js/basepage")
    var Base = require("basejs")
    var SelectChain = require("../../js/selectchain")($, Base)

        function tzLogin() {
            //window.alert("TZ!")
            window.location = "/pages/home"
        }

        function adminLogin() {
            //window.alert("Admin!")
            window.location = "/admin"
        }
    var baseUrl;

    return BasePage.extend({
        init: function(data, next) {
            /* do something... */
            $("[name=tzlogin] .overlay").click(tzLogin)
            $("[name=adminlogin] .overlay").click(adminLogin)

            this.selectChain = new SelectChain([
                $("[name=tzlogin]").get(0),
                $("[name=adminlogin]").get(0)
            ])

            /* continue when finished */
            if (next) next(this)
        },
        onVirtualControl: function(evt) {
            switch (evt.control) {
                case "up":
                    this.selectChain.selectPrevious()
                    break;
                case "down":
                    this.selectChain.selectNext()
                    break;
                case "select":
                    var el = this.selectChain.current()
                    $(el).find(".overlay").click()
                    this.selectChain.update()
                    break;
            }
        }
    })

}
