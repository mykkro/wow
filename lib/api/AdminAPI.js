/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var IndexedNodeAPI = require("./IndexedNodeAPI")

var _adminDAO = null
var adminDAO = function() {
	if(!_adminDAO) 
		_adminDAO = require("../dao/AdminDAO")
	return new (_adminDAO)
}
var _adminTpl = null
var adminTpl = function() {
	if(!_adminTpl) 
		_adminTpl = fs.readFileSync(path.join(__dirname, "../../templates/nodes/admin.default.html"), "utf8")
	return _adminTpl
}

var AdminAPI = IndexedNodeAPI.extend({
	constructor: function() {
		this.base("admin", adminDAO, adminTpl)
	},
	getThumbnailUri: function(data) {	
		return this.thumbFromUUID(data.avatar)
	}
})

module.exports = AdminAPI