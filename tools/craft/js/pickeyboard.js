   var picKeyboard = function(opts) {      
      var o = $.extend({
        maxchars: 3
      }, opts)
      var buffer = ""
      var picKey = function(i, ch) {
        return $("<div>").addClass("pickey").addClass("fruit-icon-"+i).attr("data-index", i).attr("data-char", ch)
      }
      var setBuffer = function(buf) {
        buffer = buf
        // update buffer
        console.log("Updating buffer: "+buffer)
        if(o.input) {
          $(o.input).val(buffer)
        }
        display.empty()
        for(var i=0; i<buffer.length; i++) {
          var c = buffer.charAt(i)
          // find the correct class...
          var ndx = c.charCodeAt(0)
          display.append(picKey(ndx-48, c))
        }
      }
      var onkey = function(ch) {
        if(buffer.length < o.maxchars) {
          setBuffer(buffer + ch)
        }
      }
      var onbackspace = function() {
        setBuffer(buffer.substring(0, buffer.length - 1))
      }
      var onclear = function() {
        setBuffer("")
      }
      var onenter = function() {
        keys.hide()
      }


      var out = $("<div>").addClass("pickeyboard")
      var display = $("<div>").addClass("display")
      display.click(function() {
        keys.show()
      })
      if(o.input) {
        setBuffer($(o.input).val())
      }

      var keys = $("<div>").addClass("keys")
      keys.hide()
      // add keys
      for(var i=0; i<10; i++) {
        var c = String.fromCharCode(i+48)
        var el = picKey(i, c)        
        el.click(function() {
          var $this = $(this)
          var ch = $this.attr("data-char")
          onkey(ch)
        })
        keys.append(el)        
      }
      keys.append($("<div>").addClass("pickey").addClass("icon-empty").click(onclear))
      keys.append($("<div>").addClass("pickey").addClass("icon-back").click(onbackspace))
      keys.append($("<div>").addClass("pickey").addClass("icon-check").click(onenter))
      out.append(display)
      out.append(keys)
      return out
    }