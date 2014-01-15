module.exports = function(window) {

var sessionStorage = window.sessionStorage

var Auth = {
	login: function(username, password, cb) {
		this.authenticateUser(username, password, function(err, userdata) {
			if(!err) {
				sessionStorage.loggedUser = userdata.username
				sessionStorage.loggedUserId = userdata.id
				if(cb) cb(null, userdata)
			} else {
				if(cb) cb(err)
			}
		})
	},
	logout: function(cb) {
		delete sessionStorage.loggedUser
		delete sessionStorage.loggedUserId
		if(cb) cb()
	},
	authenticateUser: function(username, password, cb) {
		if(password=="pass") {
			cb(null, {username:username, id:555})
		}
	},
	getLoggedUser: function(cb) {
		if(sessionStorage.loggedUser) {
			// TODO wrap by User model
			return {username:sessionStorage.loggedUser, id:sessionStorage.loggedUserId}
		} else return null
	}
}

return Auth
}