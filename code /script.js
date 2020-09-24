// SCRIPT FOR WEATHER APP

// Script for todays weather in Jönköping
const todaysWeather = document.getElementById('todaysWeather');

fetch('http://api.openweathermap.org/data/2.5/weather?q=Jonkoping,Sweden&units=metric&APPID=277afbd3cf32e0e8cc059dd7cb8bcb95')
     .then((response) => {
         return response.json()
     })
     .then((json) => {
        todaysWeather.innerHTML = `<h2>${json.name}</h2>`

        json.weather.forEach((currentWeather) => {
            todaysWeather.innerHTML += `<p>The weather in ${json.name}: ${currentWeather.main}, ${currentWeather.description}</p>`
        });
        todaysWeather.innerHTML += `<p>The temperature is ${json.main.temp.toFixed(1)} °C</p>`
     });