module.exports = function(window, $, SVG, i18n) {

    var mustache = require('mustache');
    
    var PageLoader = {
        /* loads page view and script */
        loadPage: function(pageInfo, data, next) {
          var scriptName = pageInfo.script || pageInfo.view
          var pageName = pageInfo.view
          var allData = $.extend(data, pageInfo)
          console.log(allData)
           $.get("pages/"+pageName+".wow").done(function(response) {        
            var html = mustache.to_html(response, allData);
            $('#top-wrapper').html(html);     
            var scr = require("../pages/"+scriptName+".js")(window, $, SVG, i18n)
            scr.init(allData, next)
          }).fail(function(err) {
            alert("Error loading view: "+pageName)
          })
        }
    }

    return PageLoader

}
