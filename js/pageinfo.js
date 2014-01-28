var url = require('url')
var path = require('path')

module.exports = function(window) {
    var loc = window.location.href
    var parsedUrl = url.parse(loc, true)
    var query = parsedUrl.query
    var hash = parsedUrl.hash

    return {
      view: query.view || "loginpage",
      script: query.view || "loginpage",
      query: query,
      hash: hash,
      baseUrl: url.format({
        protocol:parsedUrl.protocol, 
        pathname:parsedUrl.pathname
      })
    }

}