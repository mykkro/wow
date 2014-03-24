var googleapis = require('googleapis');
var _ = require("underscore")

// server key for using google apis
var key = "AIzaSyAKgAw1fZhkyGl7g_SllISjiMi1QQjsv-Y"
var browserkey = "AIzaSyCAkY3UgE20Htr-yKq8rqFGkjIAT4bvCb4"

var ids = ["xZY43QSx3Fk", "38hnsgqf8O0"]

console.log("Searching for videos: id="+ids[0])

// the same as: 
// curl -X GET "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAKgAw1fZhkyGl7g_SllISjiMi1QQjsv-Y&part=id,snippet"


googleapis
    .discover('youtube', 'v3')
    .execute(function(err, client) {
      var params = {
          part: 'id,snippet',
          type: "video",
          maxResults: 1,
          q: ids[0],
          chart: 'mostPopular'
      };
      var params2 = {
          part: 'id,snippet',
          type: "video",
          maxResults: 1,
          q: ids[1],
          chart: 'mostPopular'
      };
      var req1 = client.youtube.search.list(params).withApiKey(key);
      var req2 = client.youtube.search.list(params2).withApiKey(key);
      req1.execute(function (err, response) {
        console.log(_.map(response.items, function(item) {
          return item.snippet.title+" ("+JSON.stringify(item.id)+")"
        }))
      })
      req2.execute(function (err, response) {
        console.log(_.map(response.items, function(item) {
          return item.snippet.title+" ("+JSON.stringify(item.id)+")"
        }))
      })
    });
