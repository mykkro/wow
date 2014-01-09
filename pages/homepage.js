module.exports = function(window, $, SVG) {
	
	// CalendarTextDaytime
	// CalendarTextYearNo
	// CalendarTextMonthName
	// CalendarTextDayNo
	// CalendarTextDayName

	var timeinfo = require("../js/timeinfo")
	var moment = require('moment');
	moment.lang('de')
	
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
	console.log(data, hours, mins, secs)
      $("#ClockSecondHand").attr("transform", "rotate("+secs+")")
      $("#ClockMinuteHand").attr("transform", "rotate("+mins+")")
      $("#ClockHourHand").attr("transform", "rotate("+hours+")")
    }
	
	var page = {
		init: function(data, next) {
			var Widgetizer = require("../js/widgetizer")(window, $)
			/* load basic widgets used by this page... */
			Widgetizer.uses(["piechart", "box", "grid", "flow", "textbox", "viewport", "image", "text"])
			/* transform wow:markup to SVG and widgets */
			Widgetizer.widgetize(window.document, function() {
				/* widgetization complete! */
				/* use data to modify page */				
				updateCalendar()
				updateClock()
				// update calendar each minute...
				window.setInterval(updateCalendar, 60*1000)
				window.setInterval(updateClock, 1000)
				/* continue when finished */
				if(next) next(page)
			})
			
			
		}
	}
	return page

}