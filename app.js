var cityName = "Detroit";
var owapikey = "9f9caf703d8d509f42ad240169e9fa5a";

function displayWeather() {
    var openWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=9f9caf703d8d509f42ad240169e9fa5a";
    $.ajax({
        url: openWeather,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $(".cityName").text(response.city.name);
        $("#wb1").text("Temperature: " + response.list[0].main.temp +"°F")
    })
}

displayWeather();