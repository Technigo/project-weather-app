// SCRIPT FOR WEATHER APP
import {API_KEY} from './key.js';
import {API_URL} from './key.js'

// Script for todays weather in Jönköping
const todaysWeather = document.getElementById('todaysWeather');

fetch(API_URL)
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