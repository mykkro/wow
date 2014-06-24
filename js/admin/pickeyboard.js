/**
 * Image keyboard plugin.
 *
 * Myrousz 2014
 *
 * MIT license.
 */
$.fn.picKeyboard = function(settings) {

    settings = $.extend({
        maxchars: 3,
        show: true,
        switchable: false
        // additional options:
        // input
        // onenter
    }, settings);

    var buffer = ""
    var display, keys

    var setBuffer = function(buf) {
        buffer = buf
        // update buffer
        console.log("Updating buffer: " + buffer)
        if (settings.input) {
            $(settings.input).val(buffer)
        }
        display.empty()
        for (var i = 0; i < buffer.length; i++) {
            var c = buffer.charAt(i)
                // find the correct class...
            var ndx = c.charCodeAt(0)
            display.append(picKey(ndx - 48, c))
        }
    }
    var onkey = function(ch) {
        if (buffer.length < settings.maxchars) {
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
        if (settings.onenter) {
            settings.onenter(buffer)
        }
    }
    var onescape = function() {
        keys.hide()
        if (settings.onescape) {
            settings.onescape()
        }
    }

    var picKey = function(i, ch) {
        return $("<div>").addClass("pickey").attr("data-index", i).attr("data-char", ch).append(
            $("<div>").addClass("pickey-img").addClass("fruit-icon-" + i),
            $("<div>").addClass("pickey-char").text(ch)
        )
    }

    var picKeyboard = function() {
        var out = $("<div>").addClass("pickeyboard")
        display = $("<div>").addClass("display")
        if (settings.switchable) {
            display.click(function() {
                keys.toggle()
            })
        }
        if (settings.input) {
            settings.input.hide()
            setBuffer($(settings.input).val())
        }

        keys = $("<div>").addClass("keys")
        if (!settings.show) {
            keys.hide()
        }
        // add keys
        for (var i = 0; i < 10; i++) {
            var c = String.fromCharCode(i + 48)
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
        keys.append($("<div>").addClass("pickey").addClass("icon-cross").click(onescape))
        keys.append($("<div>").addClass("pickey").addClass("icon-check").click(onenter))
        out.append(display)
        out.append(keys)
        return out
    }

    return this.each(
        function() {
            var $this = $(this);
            $this.html(picKeyboard())
        }
    );
};
