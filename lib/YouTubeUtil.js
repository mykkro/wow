var googleapis = require('googleapis');
var _ = require("underscore")
var moment = require("moment")

// server key for using google apis
var key = "AIzaSyAKgAw1fZhkyGl7g_SllISjiMi1QQjsv-Y"
var browserkey = "AIzaSyCAkY3UgE20Htr-yKq8rqFGkjIAT4bvCb4"

// the same as: 
// curl -X GET "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAKgAw1fZhkyGl7g_SllISjiMi1QQjsv-Y&part=id,snippet"

/**
 * ## YouTubeUtil
 * YouTube Utility class.
 */
var YouTubeUtil = {
  /**
   * ## YouTubeUtil.wrapItem
   * @param  {object} item data as received from youtube.video.list service
   * @return {object} simplified video descriptor, compatible with UserVideo DAO.
   */
  wrapItem: function(data) {
    var ytId = (typeof data.id == "string") ? data.id : data.id.videoId
    var out = {
      ytId: ytId,
      title: data.snippet.title,
      description: data.snippet.description,
      url: "http://www.youtube.com/watch?v="+ytId,
      thumbnailUrl: "http://i3.ytimg.com/vi/" + ytId + "/default.jpg",
    }
    if(data.statistics) {
      out.viewCount = parseInt(data.statistics.viewCount)
      out.likeCount = parseInt(data.statistics.likeCount)
      out.dislikeCount = parseInt(data.statistics.dislikeCount)
      out.favoriteCount = parseInt(data.statistics.favoriteCount)
      out.commentCount = parseInt(data.statistics.commentCount)
    }
    if(data.contentDetails) {
      out.duration = moment.duration(data.contentDetails.duration).asSeconds()
    }
    return out
  },
  /**
   * ## YouTubeUtil.info
   * Retrieves ionformation about a YouTube video based on its YouTube ID.
   * @param  {string}   ytId the YouTube ID of the video.
   * @param  {function} next callback function(err, result)
   */
  info: function(ytId, next) {
    var self = this
    googleapis.discover('youtube', 'v3')
      .execute(function(err, client) {
        var params = {
            part: 'id,snippet,statistics,contentDetails', 
            maxResults: 1,
            id: ytId
        };
        // !!! must be youtube.videos.list instead of youtube.search.list
        var req1 = client.youtube.videos.list(params).withApiKey(key);
        req1.execute(function(err, response) {
            if(err) { 
              next(err) 
            } else {
              if(response.items.length < 1) {
                next("Video not found")
              } else {
                var data = response.items[0]
                next(null, self.wrapItem(data))
              }
            }
        })          
    })
  },
  /**
   * ## YouTubeUtil.search
   * Searches YouTube for videos.
   * @param  {object}   opts The query object. Supported fields: order, pageSize, pageToken, query.
   * @param  {function} next Callback function(err, res)
   */
  search: function(opts, next) {
    var self = this
    googleapis.discover('youtube', 'v3')
        .execute(function(err, client) {
          var params = {
              part: 'id,snippet',
              type: "video",
              order: opts.order || "rating",
              maxResults: opts.pageSize || 5,
              pageToken: opts.pageToken,
              q: opts.query,
              chart: 'mostPopular'
          };
          var req1 = client.youtube.search.list(params).withApiKey(key);
          req1.execute(function (err, response) {
            if(err) {
              next(err)
            } else {
              console.log(response)
              var nextPageToken = response.nextPageToken
              var prevPageToken = response.prevPageToken
              var items = _.map(response.items, function(i) {
                return self.wrapItem(i)
              })
              next(null, {
                  // page tokens for pagination...
                  nextPageToken: nextPageToken,
                  prevPageToken: prevPageToken,
                  // list of items - sans statistics and duration
                  // TODO batch retrieve statistics and duration
                  items: items
              })
            }
          })
        });

  }
}

module.exports = YouTubeUtil

// REPL testing
/*
  var YouTubeUtil = require("./lib/YouTubeUtil")
  //YouTubeUtil.info("1_cSUTOZP7Y", console.log) // OK
  //YouTubeUtil.info("-G_4nJLNXA0", console.log) // OK with Youtube API v3

  YouTubeUtil.search({query:"mtg"}, console.log)

*/

