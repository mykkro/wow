module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var SvgHelper = require("../../js/svghelper")(window)
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")

	var path = require("path")

	function loadCss(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}

	var GamePage = BasePage.extend({
		init: function(data, next) {
			var server = this.wtr.rpc
			var self = this
			var appName = data.query.importname
			//var appUrl = "/imports/"+ appName+ "/"
			/**/var appUrl = "/test/samplegame/"
		    var locale = data.query.lang || 'en'
		    var defaultLocaleUrl = "lang/labels."+locale+".json"
		    var localeUrl = "lang/"+locale+".json"
		    var metadataUrl = "wow.json"

		    var scriptUrl = "app.js"
		    var styleUrl = "style.css"

		    loadCss(appUrl+styleUrl)

			var quitBtn = this.getWidget("quitButton")
			var mySwitcher = this.getWidget("mySwitcher")
			mySwitcher.setActive("infoTab")

			quitBtn.click(function() {
				// move back to previous page...
				self.goBack()
			})
			
			var buttons = _.object(_.map([
				"homeButton",
				"newGameButton",
				"pauseButton",
				"restartButton",
				"quitGameButton",
				"infoButton",
				"rulesButton",
				"scoreButton",
				"settingsButton"
			], function(x){return [x, self.getWidget(x)]}))
			console.log(buttons)

			buttons.homeButton.click(function() {
				self.goToHomePage()
			})
			buttons.newGameButton.click(function() {
				showTab("gameTab")
			})
			buttons.pauseButton.click(function() {
				showTab("gameTab")
			})
			buttons.restartButton.click(function() {
				showTab("gameTab")
			})
			buttons.quitGameButton.click(function() {
				showTab("infoTab")
			})
			buttons.infoButton.click(function() {
				showTab("infoTab")
			})
			buttons.rulesButton.click(function() {
				showTab("rulesTab")
			})
			buttons.scoreButton.click(function() {
				showTab("scoresTab")
			})
			buttons.settingsButton.click(function() {
				showTab("settingsTab")
			})		

			function showTab(name) {
				$(".game-overlay").hide()
				mySwitcher.setActive(name)
				if(name == "gameTab") {
					$("#gameOverlay").show()
				} else if(name == "settingsTab") {
					$("#gameSettingsOverlay").show()
				}
			}	

		    $.when(
		    	$.getJSON(appUrl+metadataUrl), 
		    	$.getJSON(appUrl+defaultLocaleUrl), 
		    	$.getJSON(appUrl+localeUrl),
 				$.get(appUrl+"templates/form-settings-schema"),
    			$.get(appUrl+"templates/form-settings-options"),
    			$.getScript(appUrl+scriptUrl)
		    ).done(function(meta, dl, l, t1, t2, sc1) {

		      	var metadata = meta[0]
		      	var localedata = $.extend({},l[0],dl[0])
		      	var dd = {wow:metadata, translated:localedata}

		        var formSchemaTpl = t1[0]
		        var formOptionsTpl = t2[0]

		        var formSchema = JSON.parse(Mustache.render(formSchemaTpl, dd))
		        var formOptions = JSON.parse(Mustache.render(formOptionsTpl, dd))

		        console.log(formSchema, formOptions)

		      	// translate labels...
		      	for(var key in buttons) {
		      		var btn = buttons[key]
		      		var el = $(btn.element).find("tspan")
		      		el.text(dd.translated.labels[el.text()])
		      	}
		      	$("#infoDiv").text(dd.translated.info)
		      	$("#rulesDiv").text(dd.translated.rules)

				var previewUrl = appUrl + "preview.png"
				$("#infoImg").attr("src", previewUrl)

				// initialize settings form...
			  	$(".game-settings").alpaca({
			    	"schema": formSchema,
			    	"options": formOptions
			    })


				console.log("WOW metadata loaded")
				console.log(dd)

		  	    /* localization function... */
		        window.__ = function(str) {
		          return localedata.labels[str] || str
		        }

		        var MyClass = window[metadata.className]
		        var game = new MyClass()
		        var gui = new GameUI(game)    

		        console.log("Ready!")
		        gui.init()

				/* continue when finished */
				if(next) next(self)
			})

		}
	})
	return GamePage

}