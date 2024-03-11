var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var currentUvindex = $("#uv-Index");
var cityName = $("#location");
var cloudsIndex = $("#clouds-Index");
var maxTemp = $("#max-temp");
var cityLat;
var cityLon;

var currentWeatherSection = function(cityName) {
    // get and use data from open weather current weather api end point
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            cityLon = response.coord.lon;
            cityLat = response.coord.lat;
            // Call the function to fetch detailed weather data here
            fetchWeatherData(cityLat, cityLon);
        });
};

var fetchWeatherData = function(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            currentUvindex.text(data.current.uvi);
            cloudsIndex.text(data.current.clouds);
            maxTemp.text(data.daily[0].temp.max + " F");

            var currentUvIndex = $("#current-uv-index");
            currentUvIndex.text("UV Index: " + data.current.uvi);

            var currentNumber = $("#current-number");
            currentNumber.text(data.current.uvi);
        })
        .catch(function(error) {
            console.log("Error fetching data:", error);
        });
};

$("#search").on("click", function() {
    var location = cityName.val();
    console.log(location);
    currentWeatherSection(location);
});

