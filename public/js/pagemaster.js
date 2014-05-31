// pagemaster.js

  $(document).ready(function() {
        var pageInfo = require("pageinfo")(window)
        console.log(pageInfo)
        var i18n = new(require("i18n"))({
          locales: ['en', 'de', 'cz'],
          defaultLocale: 'en'
        })
        i18n.setLocale('de')
        moment.lang('de')

        window.i18n = i18n

        /* detect and initialize input devices... */

        // virtual control device
        // 4 direction buttons
        // select (activate/forward/ok) button
        // back (cancel, home) button
        // play, pause, stop buttons
        // only press event
        var VirtualControl = require("virtualcontrol")
        var myControl = new VirtualControl()


        var MyGamepad = require("mygamepad")(window, $, Gamepad)
        var myGamepad = new MyGamepad()
        myGamepad.addListener("press", function(evt) {
          // delegate gamepad events to virtual control device...
          switch(evt.control) {
            case "DPAD_LEFT": 
              myControl.press("left")
              break
            case "DPAD_RIGHT": 
              myControl.press("right")
              break
            case "DPAD_UP": 
              myControl.press("up")
              break
            case "DPAD_DOWN": 
              myControl.press("down")
              break
            case "SELECT_BACK": 
            case "FACE_1": 
              myControl.press("select")
              break
            case "START_FORWARD": 
            case "HOME": 
              myControl.press("home")
              break
            case "FACE_4": 
              myControl.press("play")
              break
            case "FACE_2": 
              myControl.press("pause")
              break
            case "FACE_3": 
              myControl.press("stop")
              break
          }
        })

        $(window.document)
          .bind("keydown", function(e) {
            switch(e.keyCode) {
              case 37: 
                myControl.press("left")
                break
              case 39: 
                myControl.press("right")
                break
              case 38: 
                myControl.press("up")
                break
              case 40: 
                myControl.press("down")
                break
              case 13: 
                myControl.press("select")
                break
              case 27: 
              case 77: 
                myControl.press("home")
                break
              case 80: 
                myControl.press("play")
                break
              case 90: 
                myControl.press("pause")
                break
              case 83: 
                myControl.press("stop")
                break
            }
          })

        // create widgetizer and load widgets
        var Widgetizer = require("widgetizer")(window, $, SVG)

        /* Global utility object holding useful things together */
        var Wow = {
          window: window,
          $: $,
          _: _,
          i18n: i18n,
          SVG: SVG,
          moment: moment,
          Widgetizer: Widgetizer,
          preset: preset,
          location: location
        }

        var pageClass = require("pagescript")(Wow)
        var page = new pageClass(Wow)
        var allData = pageInfo
        Widgetizer.useCommonWidgets()
        Widgetizer.widgetize(document, function() {
            page.init(allData, function(pg) {

                myControl.addListener("press", function(evt) {
                  pg.handleEvent($.extend({"device":"virtual"}, evt))
                })
                
                myGamepad.addListener("press release axis", function(evt) {
                  pg.handleEvent($.extend({"device":"gamepad"}, evt))
                })


                /*
                 * this swallows backspace keys on any non-input element.
                 * stops backspace -> back
                 */
                var rx = /INPUT|SELECT|TEXTAREA/i;

                // attach input devices to the page controller
                $(window.document)
                  .bind("keydown keypress keyup", function(e) {
                    pg.handleEvent($.extend({"device":"keyboard"}, e))
                    // FIX to prevent backspace key from doing "go back to previous page"
                    // from: http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
                    if( e.which == 8 ){ // 8 == backspace
                      if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                        e.preventDefault();
                      }
                    }
                });

            })
        })

  })