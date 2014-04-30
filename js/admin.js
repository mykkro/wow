	$(document).ready(function() {

	    $.playable('soundmanager/swf/')

	    var mustache = require('mustache');
	    var Base = require('basejs');
	    var url = require('url')
	    var path = require('path')

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
	    var userId = "555"
	    var adminId = "123"
	    var page = 1

	        function ext(url) {
	            return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf("."))
	        }

	        function afterDrop(url) {
	            $("#radiourl-textfield").val(url)
	            $("#radiotitle-textfield").val(url)
	        }

	        function cancel(e) {
	            if (e.preventDefault) e.preventDefault(); // required by FF + Safari
	            return false; // required by IE
	        }

	        function drop(e) {
	            $(this).removeClass("error").removeClass("accepted")
	            e.preventDefault();
	            var found = false;
	            var types = e.dataTransfer.types
	            for (var i = 0; i < types.length; i++) {
	                if (types[i] == "text/uri-list") {
	                    found = true;
	                    break;
	                }
	            }
	            var out = ""
	            var url = null
	            if (!found) {
	                // not a link...
	                $(this).html("Not a link")
	                $(this).addClass("error")
	            } else {
	                url = e.dataTransfer.getData("Text")
	                var extension = ext(url).toLowerCase()
	                if (extension == ".mp3" || extension == ".ogg") {
	                    var link = $('<a href="' + url + '" />').text(url)
	                    $(this).html(link).addClass("accepted")
	                    link.playable()
	                    afterDrop(url)
	                } else {
	                    $(this).html("Unsupported link type")
	                    $(this).addClass("error")
	                }
	            }
	            return false;
	        }

	    var RadioPanel = require("./admin/RadioPanel")(Widgetizer, i18n, dialogs)
	    var VideoPanel = require("./admin/VideoPanel")(Widgetizer, i18n, dialogs)
	    var ImportPanel = require("./admin/ImportPanel")(Widgetizer, i18n, dialogs)

	    var vp = new VideoPanel(adminId)
	    var ip = new ImportPanel(adminId)
	    var rp = new RadioPanel(adminId)

		var tabber1 = new Yetii({
			id: 'tabs-container-1',
			active: 1,
			tabclass: 'ui-tabs-panel'
		});

		// create GUI...

	    $("#radio-dropzone")
	        .bind('drop', drop)
	        .bind('dragover', cancel)
	        .bind('dragenter', cancel)
	        .bind('dragleave', cancel);


	    $('#video-dropzone').youTubeDrop({
	        dropped: function(videoId) {
	            console.log("Dropped!", videoId)
	            $("#videoid-textfield").val(videoId)
	        }
	    })

	})
