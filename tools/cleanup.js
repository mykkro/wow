// cleanup.js

// removes all orphaned entities (entities without nodes).

var API = require("../lib/api/API")
var _ = require("lodash")
var Q = require("q")

var findNodes = function(d) {
	var deferred = Q.defer();
	API.findEntities(d).done(function(data) {
		var promises = _.map(data, function(dd) { return API.getNode(dd.type, dd.eid) })
		Q.all(promises).done(function(nodes) {
			// combine with IDs from data
			console.log(data)
			console.log(nodes)
			_.each(data, function(d, i) {
				d.hasNode = !!nodes[i]
			})
			deferred.resolve(data);
		})
	})
	return deferred.promise;
}


findNodes({query:{}, limit:100000}).done(function(items) {
	var idsWithoutNodes = _.map(_.filter(items, function(it) { return !it.hasNode }), function(it) { return it._id })
	console.log("node items:", idsWithoutNodes)
	// delete all entities that have no nodes...
	API.entity.deleteItems({_id: {$in: idsWithoutNodes}}, console.log)
})

