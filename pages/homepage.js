module.exports = function(window, $, SVG) {
	
	// CalendarTextDaytime
	// CalendarTextYearNo
	// CalendarTextMonthName
	// CalendarTextDayNo
	// CalendarTextDayName

	var weatherUri = "https://api.forecast.io/forecast/936df2f9a7b50fa0bd9006b85fdb9ece/48.14,16.20"
	
	
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
	
	var timeinfo = require("../js/timeinfo")
	var moment = require('moment');
	moment.lang('de')
	
	function updateWeatherInfo() {
		// get weather info...
		$.getJSON(weatherUri).done(function(data) {
		console.log(data)
			var temp = Math.round(fah2cel(data.currently.temperature))
			var icon = data.currently.icon
			$("#MeteoIcon").text(icon2char(icon))
			$("#MeteoTemperature").text(temp)
			$("#MeteoUnit").text('*')
		})

	}
	
	function updateCalendar() {
		console.log("Updating calendar...")
		var now = moment()
		var currentLangData = moment.langData()
		var calendar = {
			dayName: currentLangData.weekdays(now).toUpperCase(),
			day: now.format("D"),
			monthName: now.format("MMMM").toUpperCase(),
			year: now.format("YYYY"),
			dayPartName: (now.format("A")=="AM") ? "VORMITTAG" : "NACHMITTAG"
		}
		$("#CalendarTextYearNo tspan").text(calendar.year)
		$("#CalendarTextMonthName tspan").text(calendar.monthName)
		$("#CalendarTextDayNo tspan").text(calendar.day)
		$("#CalendarTextDayName tspan").text(calendar.dayName)
		$("#CalendarTextDaytime tspan").text(calendar.dayPartName)
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
		window.location = baseUrl + "?view=bookcategoriespage"
	}
	function gamesActivated() {
		window.location = baseUrl + "?view=radiopage"
	}
	function entertainmentActivated() {
		window.location = baseUrl + "?view=youtubepage"
	}
	
	var page = {
		init: function(data, next) {
			baseUrl = data.baseUrl
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.useCommonWidgets()
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* widgetization complete! */
				/* use data to modify page */				
				updateCalendar()
				updateClock()
				updateWeatherInfo()
				// update calendar each minute...
				window.setInterval(updateCalendar, 60*1000)
				window.setInterval(updateClock, 1000)
				window.setInterval(updateWeatherInfo, 10*60*1000)

				$("#Button01 .overlay").click(myBooksActivated)
				$("#Button02 .overlay").click(gamesActivated)
				$("#Button03 .overlay").click(entertainmentActivated)

				/* continue when finished */
				if(next) next(page)
			})
			
			
		}
	}
	return page

}