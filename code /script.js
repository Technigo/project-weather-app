// SCRIPT FOR WEATHER APP
//import {apiKey} from './key.js';

const apiKey = '277afbd3cf32e0e8cc059dd7cb8bcb95';
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Jönköping,Sweden&units=metric&APPID=${apiKey}`;
const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Jönköping,Sweden&units=metric&APPID=${apiKey}`;


// Script for todays weather in Jönköping
const todaysWeather = document.getElementById('todaysWeather');

fetch(weatherUrl)
     .then((response) => {
         return response.json();
     })
     .then((weatherInfo) => {
        todaysWeather.innerHTML = weatherInfo.name;
        

        weatherInfo.weather.forEach((currentWeather) => {
            todaysWeather.innerHTML += `<p>The weather in ${weatherInfo.name}: ${currentWeather.main}, ${currentWeather.description} ${currentWeather.icon}</p>`
            todaysWeather.innerHTML += `<p>Temperature: ${weatherInfo.main.temp.toFixed(1)} °c (feels like: ${weatherInfo.main.feels_like.toFixed(1)} °c)</p>`

            const sunrise = new Date(weatherInfo.sys.sunrise * 1000);
            const sunriseTime = (sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            todaysWeather.innerHTML += `<p>Sunrise: ${sunriseTime} </p>`

            const sunset = new Date(weatherInfo.sys.sunset * 1000);
            const sunsetTime = (sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            todaysWeather.innerHTML += `<p>Sunset: ${sunsetTime} </p>`

        });
    });

    fetch(forecastUrl)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(json);
    });