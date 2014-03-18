module.exports = function(window, $, Gamepad) {

  var Base = require("basejs")

  /* custom class wrapper for gamepads */
  var MyGamepad = Base.extend({
    constructor: function() {
        this.gamepad = new Gamepad();

        this.gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
          // connected!
          console.log('Connected', device);
        });

        this.gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
          // disconnected!
          console.log('Disconnected', device);
          if (this.gamepad.count() == 0) {
            console.log("No gamepads available.")
          }
        });

        this.gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
            console.log("Pressed: ", e)
        });
        
        this.gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
            console.log("Released: ", e)
        });

        this.gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
            console.log("Axis changed: ", e)
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