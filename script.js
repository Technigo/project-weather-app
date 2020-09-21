import {API_KEY} from './api-key.js';

const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=${API_KEY}`

fetch(currentWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        console.log(currentWeather);
    });

const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`

fetch(forecastWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((forecastWeather) => {
        console.log(forecastWeather);
    });