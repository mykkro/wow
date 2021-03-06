/* File autogenerated by craft  */

var fs = require('fs'); 
var path = require("path")
var NodeAPI = require("./NodeAPI")
var EntityAPI = require("./EntityAPI")

var albumNodeDAO = new (require("../dao/AlbumNodeDAO"))

var AlbumNodeAPI = NodeAPI.extend({
	constructor: function() {
		this.base("albumNode", albumNodeDAO, {"color":"#ced"})
		this.eapi = new EntityAPI()
	},
	getThumbnailUri: function(data) {		
		return null
	},
	// keeps only one entry of each value type (adminId, nodeId)
	addToAlbum: function(albumId, nodeId, next) {
		var self = this
		this.eapi.getp(nodeId).done(function(data) {
			if(!data) {
				next(new Error("Node not found!"))
			} else {
				self.removeFromAlbum(albumId, nodeId, function(err, res) {
					if(err) next(err);
					else {
						var entry = {
							albumId: albumId,
							nodeId: nodeId,
							entityType: data.type,
							entityId: data.eid
						}
						self.create(entry, next)	
					}
				})
				
			}
		})

	},
	removeFromAlbum: function(albumId, nodeId, next) {
		this.deleteItems({albumId: albumId, nodeId:nodeId}, next)
	},
	getContents: function(albumId, next) {
		this.find({albumId: albumId}, next)
	}
})

module.exports = AlbumNodeAPI
