// SCRIPT FOR WEATHER APP
/* import {apiKey} from './api.js'; This doesn't work on netlify*/

const apiKey = '277afbd3cf32e0e8cc059dd7cb8bcb95';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jönköping,Sweden&units=metric&APPID=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Jönköping,Sweden&units=metric&APPID=${apiKey}`;
const weatherImage = document.getElementById('weatherImage');


// Script for todays weather in Jönköping
const todaysWeather = document.getElementById('todaysWeather');

fetch(weatherUrl) //Fetching data
     .then((response) => {
         return response.json(); //Returning json
     })
     .then((weatherInfo) => { //Fetching weather icon, but changing them to other choosen icons
        const weatherImageID = weatherInfo.weather[0].icon;
        weatherImage.src = `./img/${weatherImageID}.png`;
    
        weatherInfo.weather.forEach((currentWeather) => { // Showing content in index.html
            todaysWeather.innerHTML += `<h1> ${weatherInfo.name} </h1>`
            todaysWeather.innerHTML += `<p>Current weather: ${currentWeather.main} | ${currentWeather.description}</p>`
            todaysWeather.innerHTML += `<p>Temperature: ${weatherInfo.main.temp.toFixed(1)} °C | Feels like: ${weatherInfo.main.feels_like.toFixed(1)} °C</p>`

            //Functionality for showing time for sunrise and sunset in the correct way
            const sunrise = new Date(weatherInfo.sys.sunrise * 1000); 
            const sunriseTime = (sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            todaysWeather.innerHTML += `<p>Sunrise: ${sunriseTime} </p>`

            const sunset = new Date(weatherInfo.sys.sunset * 1000);
            const sunsetTime = (sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            todaysWeather.innerHTML += `<p>Sunset: ${sunsetTime} </p>`

        });
    });


    // Script for five day forecast, Jönköping
    const forecastContainer = document.getElementById('forecastContainer');

    fetch(forecastUrl) //Fetching data
    .then((response) => {
        return response.json(); //Returning json
    })
    .then((json) => { //Filtering the list array in weather forecast
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
        filteredForecast.forEach((forecastDay) => {
            forecastContainer.innerHTML += forecastInfo(forecastDay);
        });
    })
    
    const forecastInfo = day => { // Function to get the weekdays to show in the right format
        const weekdayUnix = day.dt;
        const weekdayLong = new Date(weekdayUnix * 1000);
        const newWeekday = weekdayLong.toLocaleDateString('en-US', {weekday: 'long'});
    
        //Get forecast weather description
        const descriptionForecast = day.weather[0].description; 
        
        //Get forecast temperature
        const maxTemp = day.main.temp_max.toFixed();
        
        let forecastContent = '' // Showing content in index.html
        forecastContent += `<p class="forecast-day">${newWeekday} | ${descriptionForecast} | ${maxTemp}°C</p>`;
        return forecastContent;
        };