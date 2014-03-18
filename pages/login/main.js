module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

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
		init: function(Widgetizer, data, next) {
			/* do something... */
			$("[name=tzlogin] .overlay").click(tzLogin)
			$("[name=adminlogin] .overlay").click(adminLogin)

			/* continue when finished */
			if(next) next(this)
		}
	})

}