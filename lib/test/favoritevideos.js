var FavVids = require("../dao/favoritevideos")

var userId = '555' // !!! userId must be string...
var adminId = '123' // !!! adminId must be string...

console.log("List IDs of most recent fav videos")
var data = {userId:userId}
var start = 1
var limit = 5
FavVids.listNewestIDs(data, start, limit, console.log)

console.log("List most recent fav videos")
FavVids.listNewest(data, start, limit, console.log)
