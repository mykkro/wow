  $(document).ready(function() {
  


    /* client version of i18n */
    var i18n = new(require("./js/i18n"))({
        locales: ['en', 'de', 'cz'],
        defaultLocale: 'en'
    })
    i18n.setLocale('de')

    /* raw URL data */
    var pageInfo = require("./js/pageinfo")(window)

    /* Custom page data - eg. loaded from database */
    var pageData = {
    }

    var PageLoader = require("./js/pageloader")(window, $, SVG, i18n)

    /* Do it! */
    PageLoader.loadPage(pageInfo, pageData, function(ctrl) {
      console.log("Page loaded successfully!")
      console.log(pageData)      
    })
    
          
  })
