var bookman_log = function(data) {
  console.log(data);
}

if(bookman_connector && bookman_connector.connectorUrl) {
    console.log("Logging is available, target is "+bookman_connector.connectorUrl)
    var serialize = function(obj) {
      var str = [];
      for(var p in obj)
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }
    // use iframe...
    bookman_log = function(data) {
        var iframe = $("<iframe>").attr("src", bookman_connector.connectorUrl + "?" + serialize(data))
        $("#iframe-target").html(iframe)
    }
    $(function() {
      $("body").append('<div id="iframe-target" style="display:none">')
    })
} else {
    console.log("Logging is not available")
}
