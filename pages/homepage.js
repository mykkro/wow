module.exports = function(window, $, SVG, i18n) {
	
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
		window.location = baseUrl + "?view=bookcategoriespage"
	}
	function gamesActivated() {
		window.location = baseUrl + "?view=radiopage"
	}
	function entertainmentActivated() {
		window.location = baseUrl + "?view=youtubepage"
	}
	
	// not visible - probably hidden under SVG?
	function showQuitDialog() {
		var Dialog = require('modal-dialog');
		Dialog.styles = false
		Dialog.classes = {
		    container: 'modal_dialog',
		    title: 'title',
		    header: 'header',
		    content: 'content',
		    footer: 'footer',
		    info: 'info',
		    buttons: 'buttons',
		    button: 'button',
		};
		var d = new Dialog(window.jQuery);
		d.title = '<b>'+i18n.__('Exit')+'</b>';
		d.content = i18n.__('Are you sure?');
		d.info = '';
		d.addButton(i18n.__('Yes'), function() {
		    // alert('Yes button was clicked');
			// Quit current app
			gui.App.quit();

		    d.hide();
		});
		d.addButton(i18n.__('No'), function() {
		    // alert('No button was clicked');
		    d.hide();
		});
		$("#btn1").click(function() {
			d.show();
		})
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

				$(".hiddenQuitButton").click(function() {
					var state = window.confirm(i18n.__("This will quit the application. Are you sure?"))
					if(state) gui.App.quit()
				})

				/* continue when finished */
				if(next) next(page)
			})
			
			
		}
	}
	return page

}