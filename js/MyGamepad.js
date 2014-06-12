module.exports = function(window, $, Gamepad) {

    var EventTarget = require("./EventTarget")

    /* custom class wrapper for gamepads */
    var MyGamepad = EventTarget.extend({
        constructor: function() {
            this.base()
            this.gamepad = new Gamepad();

            var self = this

            this.gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
                // connected!
                console.log('Connected', device);
                self.fire($.extend({
                    type: "connect"
                }, device))
            });

            this.gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
                // disconnected!
                console.log('Disconnected', device);
                self.fire($.extend({
                    type: "disconnect"
                }, device))
                if (this.gamepad.count() == 0) {
                    console.log("No gamepads available.")
                }
            });

            this.gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
                self.fire($.extend({
                    type: "press"
                }, e))
            });

            this.gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
                self.fire($.extend({
                    type: "release"
                }, e))
            });

            this.gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
                self.fire($.extend({
                    type: "axis"
                }, e))
            });

            if (!this.gamepad.init()) {
                console.log('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
            } else {
                console.log("Gamepad initialized!")
            }
        }
    })


    return MyGamepad
}
