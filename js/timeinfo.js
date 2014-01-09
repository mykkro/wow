// from: http://www.ericbullington.com/articles/2012/10/27/d3-oclock
var fields = function() {
  var currentTime, hour, minute, second;
  currentTime = new Date();
  second = currentTime.getSeconds();
  minute = currentTime.getMinutes();
  hour = currentTime.getHours() + minute / 60;
  return [
    {
      "unit": "seconds",
      "numeric": second
    }, {
      "unit": "minutes",
      "numeric": minute
    }, {
      "unit": "hours",
      "numeric": hour
    }
  ];
};

module.exports = fields