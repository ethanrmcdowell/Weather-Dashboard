var cityName;
var owapikey = "9f9caf703d8d509f42ad240169e9fa5a";

$("#today-text").text(moment().format("dddd" + ", " + "LL"));

$("#city-button").click(function () {
    cityName = $("#city-input").val();
    displayWeather(cityName);
})

function displayWeather() {
    var openWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9f9caf703d8d509f42ad240169e9fa5a";
    $.ajax({
        url: openWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".city-name").text(response.city.name);
        $("#current-weather").text(response.list[0].weather[0].main);
        $("#current-temp").text("Temperature: " + response.list[0].main.temp + "°F");
        $("#current-humidity").text("Humidity: " + response.list[0].main.temp + "%");
        $("#current-wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        var weather = response.list[0].weather[0].main;
        if (weather === "Rain") {
            var icon = $("<i class='fas fa-cloud-rain fa-2x'></i>");
            $("#weather-icon").html(icon);
        }
        if (weather === "Clear") {
            var icon = $("<i class='fas fa-sun fa-2x'></i>");
            $("#weather-icon").html(icon);
        }
        if (weather === "Clouds") {
            var icon = $("<i class='fas fa-cloud fa-2x'></i>");
            $("#weather-icon").html(icon);
        }
    })
}