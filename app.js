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
        // PULLS DATA FOR TODAY'S WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
        $("#weather-icon0").attr("src", icon);
        $("#current-weather").text(response.list[0].weather[0].main);
        $("#current-temp").text("Temperature: " + response.list[0].main.temp + "°F");
        $("current-humidity").text("Humidity: " + response.list[0].main.temp + "%");
        $("current-wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        // A FOR DAY 1 WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
        $("#weather-icon1").attr("src", icon);
        $("#current-weather").text(response.list[4].weather[0].main);
        $("#weather1").text(response.list[4].weather[0].main);
        $("#temp1").text("Temp: " + response.list[4].main.temp + "°F");
        $("#humidity1").text("Humidity: " + response.list[4].main.temp + "%");
        // PULLS DATA FOR DAY 2 WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + "@2x.png");
        $("#weather-icon2").attr("src", icon);
        $("#current-weather").text(response.list[12].weather[0].main);
        $("#weather2").text(response.list[12].weather[0].main);
        $("#temp2").text("Temp: " + response.list[12].main.temp + "°F");
        $("#humidity2").text("Humidity: " + response.list[12].main.temp + "%");
        // PULLS DATA FOR DAY 3 WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + "@2x.png");
        $("#weather-icon3").attr("src", icon);
        $("#current-weather").text(response.list[20].weather[0].main);
        $("#weather3").text(response.list[20].weather[0].main);
        $("#temp3").text("Temp: " + response.list[20].main.temp + "°F");
        $("#humidity3").text("Humidity: " + response.list[20].main.temp + "%");
        // PULLS DATA FOR DAY 4 WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + "@2x.png");
        $("#weather-icon4").attr("src", icon);
        $("#current-weather").text(response.list[28].weather[0].main);
        $("#weather4").text(response.list[28].weather[0].main);
        $("#temp4").text("Temp: " + response.list[28].main.temp + "°F");
        $("#humidity4").text("Humidity: " + response.list[28].main.temp + "%");
        // PULLS DATA FOR DAY 5 WEATHER
        var icon = ("https://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + "@2x.png");
        $("#weather-icon5").attr("src", icon);
        $("#current-weather").text(response.list[36].weather[0].main);
        $("#weather5").text(response.list[36].weather[0].main);
        $("#temp5").text("Temp: " + response.list[36].main.temp + "°F");
        $("#humidity5").text("Humidity: " + response.list[36].main.temp + "%");
    })
}