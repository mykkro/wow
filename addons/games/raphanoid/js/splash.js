var Splash = function(options) {
  this.options = options
  this.overlay = $("<div>").addClass("splash-overlay")
  this.div = $("<div>").addClass("splash").text(options.text)
  this.div.appendTo(this.overlay)
  this.overlay.appendTo($("body"))
  var self = this
  if(options.hideOnClick) {
	this.overlay.click(function() {
		self.hide()
	})/*.keydown(function (e) {
		self.hide()
    })*/
  } else {
	setTimeout(function() {
		self.hide()
	},  options.delay || 1000)
  }
}

Splash.prototype.hide = function() {
  	if(this.overlay) {
	    this.overlay.remove()
	    this.overlay = null
	    if(this.options.after) this.options.after()
	}
}
