module.exports = function(window) {

var sessionStorage = window.sessionStorage

var Auth = {
	login: function(username, password, cb) {
		this.authenticateUser(username, password, function(passed) {
			if(passed) {
				sessionStorage.loggedUser = username
				if(cb) cb()
			} else {
				if(cb) cb("Unable to authenticate")
			}
		})
	},
	logout: function(cb) {
		sessionStorage.loggedUser = null
		if(cb) cb()
	},
	authenticateUser: function(username, password, cb) {
		cb(password=="pass")
	},
	getLoggedUser: function(cb) {
		return sessionStorage.loggedUser
	}
}

return Auth
}