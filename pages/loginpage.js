module.exports = function(window, $, SVG, i18n) {

	function tzLogin() {
		//window.alert("TZ!")
		window.location = baseUrl + "?view=homepage"
	}

	function adminLogin() {
		//window.alert("Admin!")
		window.location = "admin.html"
	}
	var baseUrl;
	var page = {
		init: function(data, next) {
			baseUrl = data.baseUrl
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* do something... */
				$("[name=tzlogin] .overlay").click(tzLogin)
				$("[name=adminlogin] .overlay").click(adminLogin)

				/* continue when finished */
				if(next) next(page)
			})
		}
	}
	return page

}