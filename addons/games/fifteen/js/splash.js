var Splash = function(options) {
  var overlay = $("<div>").addClass("splash-overlay")
  var div = $("<div>").addClass("splash").text(options.text)
  div.appendTo(overlay)
  overlay.appendTo($("body"))
  setTimeout(function() {
    overlay.remove()
    if(options.after) options.after()
  }, options.delay || 1000)
}
