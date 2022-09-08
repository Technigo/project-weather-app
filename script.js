const cityInput = document.getElementById("city-input");
const geo = document.getElementById("geo")
const todaysWeather = document.getElementById("todaysWeather")
const message = document.getElementById("message")
const weatherForecast = document.getElementById("weather-forecast")

//trying fetch to see if connection between HTML is working, we can choose another API later
fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log("it is working",json);
    })