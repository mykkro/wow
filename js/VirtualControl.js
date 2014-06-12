var EventTarget = require("./EventTarget")

// virtual control device
// 4 direction buttons
// select (activate/forward/ok) button
// back (cancel, home) button
// play, pause, stop buttons
// only press event
var VirtualControl = EventTarget.extend({
    keys: {
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        DOWN: "down",
        SELECT: "select",
        HOME: "home",
        PLAY: "play",
        PAUSE: "pause",
        STOP: "stop"
    },
    press: function(control) {
        this.fire({
            type: "press",
            control: control
        })
    }
})

module.exports = VirtualControl
