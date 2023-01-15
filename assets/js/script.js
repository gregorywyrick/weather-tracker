var cities = [];

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var searchContainerEl = document.querySelector("#search-container");
var historicalSearchesEl = document.querySelector("#historical-searches");
var currentWeatherEl = document.querySelector(".current-weather");
var cityNameEl = document.querySelector("#city-name");
var currentDateEl = document.querySelector("#current-date");
var weatherIconEl = document.querySelector(".weather-icon");
var currentTempEl = document.querySelector("#current-temp");
var currentHumidEl = document.querySelector("#current-humid");
var currentWindEl = document.querySelector("#current-wind");
var forecastContainerParentEl = document.querySelector("#forecast-container");
var forecastContainerEl = document.querySelector(".forecast-weather");

var getCityCoords = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=718908fbd7f74c0aac0bd0ff69325a23&units=imperial";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;

                getCurrentWeather(data);
                callForecastApi(latitude, longitude);

                var city = data.name;
                if (!cities.includes(city)) {
                    cities.push(city);
                }
                saveCities();

                addHistoricalSearch(city);

            })
        } else {
            alert("Error: City Not Found. Please enter a valid city name.")
        }
    });
};