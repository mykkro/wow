module.exports = function(Wow) {
	var window = Wow.window
	var $ = Wow.$
	var SVG = Wow.SVG
	var i18n = Wow.i18n
	var BasePage = require("../../js/basepage")
	var Base = require("basejs")
	var SelectChain = require("../../js/selectchain")($, Base)
	
	// CalendarTextDaytime
	// CalendarTextYearNo
	// CalendarTextMonthName
	// CalendarTextDayNo
	// CalendarTextDayName

	var weatherUri = "https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20"
	
	var gui = window.gui
	
	var fah2cel = function(temp) {
		return (temp -32) * 5 / 9;
	}
	
	var icon2char = function(icon) {
		var map = {
			"cloudy": "N",
			"clear-day": "B",
			"clear-night": "2",
			"rain": "R",
			"snow": "W",
			"sleet": "X",
			"wind": "S",
			"fog": "L",
			"partly-cloudy-day": "H",
			"partly-cloudy-night": "4"
		}
		return map[icon] || "A"
	}
	
	var timeinfo = require("../../js/timeinfo")
	var moment = Wow.moment
	
	function updateCalendar() {
		console.log("Updating calendar...")
		var now = moment()
		var hour = now.hour()
		var currentLangData = moment.langData()
		var dayPartName = (now.format("A")=="AM") ? i18n.__("morning") : i18n.__("afternoon")
		if(hour>=11 && hour<13) dayPartName=i18n.__("midday")
		var calendar = {
			dayName: currentLangData.weekdays(now).toUpperCase(),
			day: now.format("D"),
			monthName: now.format("MMMM").toUpperCase(),
			year: now.format("YYYY"),
			dayPartName: dayPartName
		}
		$("#CalendarTextYearNo tspan").text(calendar.year)
		$("#CalendarTextMonthName tspan").text(calendar.monthName)
		$("#CalendarTextDayNo tspan").text(calendar.day)
		$("#CalendarTextDayName tspan").text(calendar.dayName)
		$("#CalendarTextDaytime tspan").text(calendar.dayPartName.toUpperCase())
	}
	
	function getDayPart() {
		// TODO (morning, noon, adfternoon, evening, night)
	}
	
	function updateClock() {
      var data = timeinfo();
	  var 
		hours = -90+360*(data[2].numeric/12.0), 
		mins = -90+360*(data[1].numeric/60.0),
		secs = -90+360*(data[0].numeric/60.0)
      $("#ClockSecondHand").attr("transform", "rotate("+secs+")")
      $("#ClockMinuteHand").attr("transform", "rotate("+mins+")")
      $("#ClockHourHand").attr("transform", "rotate("+hours+")")
    }

	var baseUrl;
	
	function myBooksActivated() {
		window.location = "/pages/bookcategories"
	}
	function myRadiosActivated() {
		window.location = "/pages/netradio"
	}
	function gamesActivated() {
		window.location = "/pages/userapps"
	}
	function entertainmentActivated() {
		window.location = "/pages/searchvideos"
	}

	var dialogs = require("../../js/dialogs")($, i18n)
	
	function showQuitDialog() {
		dialogs.quitDialog(function(reallyQuit) {
			if(reallyQuit) {
				$.post("/shutdown")
			}
		})
	}

	return BasePage.extend({
		init: function(data, next) {
			var server = this.wtr.rpc

			// set labels...
			$("#labelTodayWeather").text(i18n.__("Today's weather").toUpperCase())
			$("#labelTodayIs").text(i18n.__("Today is").toUpperCase())
			$("#labelYear").text(i18n.__("year").toUpperCase())

			var updateWeatherInfo = function() {
				// get weather info...
				server("weatherInfo", {}, function(err, resp) {
					var data = resp.result
					/**/console.log(data)
					var temp = Math.round(fah2cel(data.currently.temperature))
					var icon = data.currently.icon
					$("#MeteoIcon").text(icon2char(icon))
					$("#MeteoTemperature").text(temp)
					$("#MeteoUnit").text('*')
				})

			}

			baseUrl = data.baseUrl
			/* use data to modify page */				
			updateCalendar()
			updateClock()
			updateWeatherInfo()
			// update calendar each minute...
			window.setInterval(updateCalendar, 60*1000)
			window.setInterval(updateClock, 1000)
			window.setInterval(updateWeatherInfo, 10*60*1000)

			this.getWidget("navButton01").setCaption(i18n.__("Radio").toUpperCase()).click(myRadiosActivated)
			this.getWidget("navButton02").setCaption(i18n.__("Entertainment").toUpperCase()).click(gamesActivated)
			this.getWidget("navButton03").setCaption(i18n.__("Videos").toUpperCase()).click(entertainmentActivated)

			$(".hiddenQuitButton").click(function() {
				showQuitDialog()
				//var state = window.confirm(i18n.__("This will quit the application. Are you sure?"))
				//if(state) gui.App.quit()
			})

			// create selection chain
			this.selectChain = new SelectChain($(".wow-widget.bigbutton"))

			/* continue when finished */
			if(next) next(this)
			
		},
		selectPrevious: function() {
			this.selectChain.selectPrevious()
		},
		selectNext: function() {
			this.selectChain.selectNext()
		},
		activateSelected: function() {
			var target = $(this.selectChain.current())
			$(target).click()
		},
		onVirtualControl: function(evt) {
			switch(evt.control) {
				case "up":
					this.selectPrevious()
					break;
				case "down":
					this.selectNext()
					break;
				case "select":
					this.activateSelected()
					break;
			}
		}
	})

}