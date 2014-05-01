	$(document).ready(function() {

	    $.playable('soundmanager/swf/')

	    var Widgetizer = require("./widgetizer")(window, $, SVG)
	    var i18n = new(require("./i18n"))({
	        locales: ['en', 'de', 'cz'],
	        defaultLocale: 'en'
	    })
	    i18n.setLocale('de')
	    var dialogs = require("./dialogs")($, i18n)

	    var server = Widgetizer.rpc

	    /*	
		var fs = require('fs');
		var gui = require('nw.gui');
		var Auth  = require("./lib/auth")(window)
		var Imports = require("./lib/dao/imports")		
		var UserVideos = require("./lib/dao/uservideos")

		var url = require("url")
    	var parsedUrl = url.parse(window.location.href, true)
      	var page = parsedUrl.query.page || 1
		var userId = Auth.getLoggedUser().id
		*/

	    // create tabs
	    var tabber1 = new Yetii({
	        id: 'tabs-container-1',
	        active: 1,
	        tabclass: 'ui-tabs-panel'
	    });

	    // create panels
	    var RadioPanel = require("./admin/RadioPanel")(Widgetizer, i18n, dialogs)
	    var YouTubeVideoPanel = require("./admin/YouTubeVideoPanel")(Widgetizer, i18n, dialogs)
	    var AppPanel = require("./admin/AppPanel")(Widgetizer, i18n, dialogs)
	    var ImagePanel = require("./admin/ImagePanel")(Widgetizer, i18n, dialogs)

	    // TODO change this
	    var adminId = 123; 

	    var vp = new YouTubeVideoPanel(adminId)
	    var ip = new AppPanel(adminId)
	    var rp = new RadioPanel(adminId)
	    var imgp = new ImagePanel(adminId)

	})
