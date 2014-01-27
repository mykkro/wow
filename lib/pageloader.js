module.exports = function(window, $, SVG, i18n) {

    var mustache = require('mustache');
    var Widgetizer = require("../js/widgetizer")(window, $)
    
    var PageLoader = {
        /* loads page view and script */
        loadPage: function(pageInfo, data, next) {
          var scriptName = pageInfo.script || pageInfo.view
          var pageName = pageInfo.view
          var allData = $.extend(data, pageInfo)
          $.get("pages/"+pageName+".wow").done(function(response) {        
            var html = mustache.to_html(response, allData);
            $('#top-wrapper').html(html);  
            /* load basic widgets used by this page... */
            Widgetizer.useCommonWidgets()
            /* transform wow:markup to SVG and widgets */
            var node = window.document
            Widgetizer.widgetize(node, function() {
              /* widgetization complete! */
              var scr = require("../pages/"+scriptName+".js")(window, $, SVG, i18n)
              scr.init(Widgetizer, allData, next)
            })

          }).fail(function(err) {
            alert("Error loading view: "+pageName)
          })
        },
        /* call this after page init... */
        fixBackspace: function() {
          // FIX to prevent backspace key from doing "go back to previous page"
          // from: http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
          
          /*
           * this swallows backspace keys on any non-input element.
           * stops backspace -> back
           */
          var rx = /INPUT|SELECT|TEXTAREA/i;

          $(window.document).bind("keydown keypress", function(e){
            if( e.which == 8 ){ // 8 == backspace
              if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
              }
            }
          });
        }
    }


  var page = {
    init: function(data, next) {

    }
  }


    return PageLoader

}
