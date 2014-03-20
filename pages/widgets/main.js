module.exports = function(Wow) {
	var BasePage = require("../../js/basepage")

	return BasePage.extend({
		init: function(data, next) {
			/* continue when finished */
			if(next) next(this)
		}
	})

}