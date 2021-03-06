$(document).ready(function () {
  var degSym = '°';
  var tempScale = 'F';
  var currentTemp = 0;

  var appId = "dda4410eedd7d5f741ca1b6a9dcea565";
  var api = "http://api.openweathermap.org/data/2.5/weather?";

  // initialize location and temperature labels
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var query = api +
      'lat=' + position.coords.latitude + '&' +
      'lon=' + position.coords.longitude +
      "&appid=" + appId;
      $.getJSON(query, function (json) {
        $("#location").text(json.name + ', ' + json.sys.country);
        currentTemp = json.main.temp;
        $("#temperature").text(kelvinToFahr(currentTemp) + '°F');
        $("#weather").empty();
        json.weather.map(function (weatherObj) {
          $("#weather").append("<i data-toggle=\"tooltip\" title=\"" +
          weatherObj.description +
          "\" class=\"wi wi-owm-" +
          weatherObj.id + "\"></i>");
        });
      });
    });
  }

  //setup convert button handler
  $("#convertBtn").click(function () {
    if (tempScale === 'F') {
      $("#temperature").text(kelvinToCels(currentTemp) + degSym + 'C');
      $("#convertBtn").text("Convert to Fahrenheit");
      tempScale = 'C';
    } else {
      $("#temperature").text(kelvinToFahr(currentTemp) + degSym + 'F');
      $("#convertBtn").text("Convert to Celsius");
      tempScale = 'F';
    }
  });
});

function kelvinToFahr(k) {
  return Math.floor(k * 9 / 5 - 459.67);
}

function kelvinToCels(k) {
  return Math.floor(k - 273.15);
}