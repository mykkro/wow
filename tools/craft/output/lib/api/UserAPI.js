/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _userDAO = null
var userDAO = function() {
	if(!_userDAO) 
		_userDAO = require("../dao/UserDAO")
	return new (_userDAO)
}
var _userTpl = null
var userTpl = function() {
	if(!_userTpl) 
		_userTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/user.default.html"), "utf8")
	return _userTpl
}

var bcrypt = require("bcrypt-nodejs")

var delegate = require("../delegate")

var UserAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("user", userDAO, userTpl, {"color":"#cee"})
	},
	/* next = function(err, result) */
	create: function(data, next) {
		var self = this
		var aa = self
		var bb = self.base
		// this works!
		var func = delegate(self, self.base, data, next);
		if(data.username) {
			self.existsp(data.username).done(function(exists) {
				if(exists) {
					next(new Error("User already exists!"));
				} else {
					// create it...
					if(data.usesPassword) {
						var hash = bcrypt.hashSync(data.password)
						data.password = hash
					}
					func()
				}
			})
		} else {
			// username will be created from ID
			if(data.usesPassword) {
				var hash = bcrypt.hashSync(data.password)
				data.password = hash
			}
			self.base(data, function(err, res) {
				if(err) {
					next(err);
				} else {
					var data = res[0]
					data.username = "autouser-"+data._id
					self.update(data._id, data, function(err, res2) {
						if(err) next(err);
						else next(null, data)
					})
				}
			})
		}
	},
	getThumbnailUri: function(data) {		
		return this.thumbFromUUID(data.avatar)
	},
	exists: function(username, next) {
		this.countp({username:username}).done(function(cnt) {
			next(null, cnt>0)
		})
	},
	existsp: function(username, next) {
		return this.countp({username:username})
	}	
})

module.exports = UserAPI