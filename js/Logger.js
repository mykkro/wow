var Base = require("basejs")

var Logger = Base.extend({
    constructor: function(opts) {
        console.log("Logger created:", opts)
    },
    log: function(data) {
        // TODO add some filter - which events are loggable (for this user)
        var opts = {
          url: "/api/log",
          type: "POST",
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        }
        $.ajax(opts).done(function(data) {
            // log sent OK
            console.log("Logger:", data[0])
        }).fail(function(err) {
            console.error(err)
        })
    }
})

module.exports = Logger
