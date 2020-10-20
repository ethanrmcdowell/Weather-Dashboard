var cityName;
var citiesList = [];

$("#date0").text(moment().format("dddd" + ", " + "LL"));

reloadWeather();
showList();

// EVENT LISTENENER FOR SUBMIT BUTTON
$("#city-button").click(function (event) {
    event.preventDefault();
    cityName = $("#city-input").val().trim();
    if (cityName === "") {
        alert("Please enter a city.");
    } else if (citiesList.length >= 5) {
        citiesList.shift();
        citiesList.push(cityName);
        saveCities();
        displayWeather();
        showList();
    } else {
        citiesList.push(cityName);
        saveCities();
        displayWeather();
        showList();
    }
});

// EVENT LISTENER FOR LIST OF PREV SEARCHED CITIES, CHANGES TO SHOW WEATHER FOR CLICKED CITY
$(".city-list").click(function() {
    cityName = $(this).attr("data-name");
    displayWeather()
    console.log(cityName);
})

// FUNCTION TO BUILD A LIST OF PREVIOUSLY SEARCHED CITIES
function showCities() {
    $("#city-list").empty();
    $("#city-input").val("");
    for (i = 0; i < citiesList.length; i++) {
        var item = $("<a>");
        item.addClass("city-list");
        item.attr("data-name", citiesList[i]);
        item.text(citiesList[i]);
        $("#city-list").prepend(item);
    }
}

// FUNCTION TO PULL THE LAST 5 SEARCHED CITIES FROM LOCAL STORAGE
// THEN RUN PREVIOUS FUNCTION WITH THIS DATA
function showList() {
    var storedCities = JSON.parse(localStorage.getItem("citiesList"));
    if (storedCities !== null) {
        citiesList = storedCities;
    }
    showCities();
}

// SAVES THE CURRENT CITY AS WELL AS AN ARRAY OF THE LAST 5 CITIES YOU SEARCHED FOR INTO LOCAL STORAGE
function saveCities() {
    localStorage.setItem("currentCity", JSON.stringify(cityName));
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
}

// IF YOU PREVIOUSLY SEARCHED FOR YOUR CITY, IT WILL GET THAT FROM LOCAL STORAGE UPON PAGE LOAD/RELOAD
function reloadWeather() {
    var storedWeather = localStorage.getItem("currentCity");
    if (storedWeather !== null) {
        cityName = JSON.parse(storedWeather);
        displayWeather();
    }
}

// MAIN FUNCTION FOR FILLING OUT CURRENT WEATHER DATA & 5-DAY FORECAST
async function displayWeather() {
    // OPENWEATHER FORECAST API CALL
    var openWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9f9caf703d8d509f42ad240169e9fa5a";
    await $.ajax({
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
        $("#current-humidity").text("Humidity: " + response.list[0].main.temp + "%");
        $("#current-wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        var latitude = response.city.coord.lat;
        var longitude = response.city.coord.lon;
        var uvurl = "http://api.openweathermap.org/data/2.5/uvi?lat="+ latitude +"&lon="+ longitude +"&appid=9f9caf703d8d509f42ad240169e9fa5a";
        $.ajax({
            url: uvurl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("#uv-text").text("UV Index: ")
            $("#current-uv").text(response.value);
            if (response.value <= 2.99){
                $("#current-uv").addClass("uv-low");
            } else if (response.value >= 3 && response.value <=5.99){
                $("#current-uv").addClass("uv-moderate");
            } else if (response.value >= 6 && response.value <= 7.99){
                $("#current-uv").addClass("uv-high");
            } else if (response.value >= 8 && response.value <= 10){
                $("#current-uv").addClass("uv-vhigh");
            } else {
                $("#current-uv").addClass("uv-extreme");
            }
        })
        // A FOR DAY 1 WEATHER
        $("#date1").text(moment().add(1, "days").format("LL"));
        var icon = ("https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
        $("#weather-icon1").attr("src", icon);
        $("#current-weather").text(response.list[4].weather[0].main);
        $("#weather1").text(response.list[4].weather[0].main);
        $("#temp1").text("Temp: " + response.list[4].main.temp + "°F");
        $("#humidity1").text("Humidity: " + response.list[4].main.temp + "%");
        // PULLS DATA FOR DAY 2 WEATHER
        $("#date2").text(moment().add(2, "days").format("LL"));
        var icon = ("https://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + "@2x.png");
        $("#weather-icon2").attr("src", icon);
        $("#current-weather").text(response.list[12].weather[0].main);
        $("#weather2").text(response.list[12].weather[0].main);
        $("#temp2").text("Temp: " + response.list[12].main.temp + "°F");
        $("#humidity2").text("Humidity: " + response.list[12].main.temp + "%");
        // PULLS DATA FOR DAY 3 WEATHER
        $("#date3").text(moment().add(3, "days").format("LL"));
        var icon = ("https://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + "@2x.png");
        $("#weather-icon3").attr("src", icon);
        $("#current-weather").text(response.list[20].weather[0].main);
        $("#weather3").text(response.list[20].weather[0].main);
        $("#temp3").text("Temp: " + response.list[20].main.temp + "°F");
        $("#humidity3").text("Humidity: " + response.list[20].main.temp + "%");
        // PULLS DATA FOR DAY 4 WEATHER
        $("#date4").text(moment().add(4, "days").format("LL"));
        var icon = ("https://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + "@2x.png");
        $("#weather-icon4").attr("src", icon);
        $("#current-weather").text(response.list[28].weather[0].main);
        $("#weather4").text(response.list[28].weather[0].main);
        $("#temp4").text("Temp: " + response.list[28].main.temp + "°F");
        $("#humidity4").text("Humidity: " + response.list[28].main.temp + "%");
        // PULLS DATA FOR DAY 5 WEATHER
        $("#date5").text(moment().add(5, "days").format("LL"));
        var icon = ("https://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + "@2x.png");
        $("#weather-icon5").attr("src", icon);
        $("#current-weather").text(response.list[36].weather[0].main);
        $("#weather5").text(response.list[36].weather[0].main);
        $("#temp5").text("Temp: " + response.list[36].main.temp + "°F");
        $("#humidity5").text("Humidity: " + response.list[36].main.temp + "%");
    })
}