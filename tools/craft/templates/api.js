var merge = require("merge")

{{#daos}}
var _{{varname}} = null
var {{varname}} = function() {
	if(!_{{varname}}) 
		_{{varname}} = new (require("../dao/{{daoname}}"))
	return _{{varname}}
}
{{/daos}}

var API = {
	{{#daos}}
	{{name}}: {
		create: function(data, next) {
			{{varname}}().create(data, next)
		},
		set: function(id, data, next) {
			{{varname}}().set(id, data, next)
		},
		update: function(id, data, next) {
			var newData = merge(data, {_id:id})
			{{varname}}().update(newData, next)
		},
		delete: function(id, next) {
			{{varname}}().remove(id, next)
		},
		get: function(id, next) {
			{{varname}}().get(id, next)
		},
		find: function(data, next) {
			{{varname}}().findItems(data, next)
		},
		count: function(data, next) {
			{{varname}}().countItems(data, next)
		}
	},
	{{/daos}}
}

module.exports = API