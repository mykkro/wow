var googleapis = require('googleapis');
var _ = require("underscore")

// server key for using google apis
var key = "AIzaSyAKgAw1fZhkyGl7g_SllISjiMi1QQjsv-Y"

googleapis
    .discover('youtube', 'v3')
    .execute(function(err, client) {
      var params = {
          part: 'snippet',
          maxResults: 10,
          order: 'viewCount',
          q: 'mtg',
          chart: 'mostPopular'
      };
      var req1 = client.youtube.search.list(params).withApiKey(key);
      req1.execute(function (err, response) {
        console.log(_.map(response.items, function(item) {
          return item.snippet.title
        }))
      })
    });