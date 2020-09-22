import {API_KEY} from './api-key.js';

const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=${API_KEY}`
const weatherInfoTop = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
fetch(currentWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        console.log(currentWeather);
        weatherInfoTop.innerHTML += generateHTMLForWeatherInfoTop(currentWeather);
        cityHeader.innerHTML = currentWeather.name;
        
    });

const generateHTMLForWeatherInfoTop = currentWeather => {
    const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
    const sunriseTimeString = sunriseTime.toLocaleTimeString('sv-SE', {
       timestyle: 'long',
       hour12: false,
       hour: '2-digit', 
       minute:'2-digit'
    });
    console.log(sunriseTimeString);

    const sunsetTime = new Date(currentWeather.sys.sunset * 1000);
    const sunsetTimeString = sunsetTime.toLocaleTimeString('sv-SE', {
        timestyle: 'short',
        hour12: false,
        hour: '2-digit', 
        minute:'2-digit'
    });
    console.log(sunsetTimeString);
    const weatherDescription = currentWeather.weather[0].main;       
    const currentTemperature = currentWeather.main.temp.toFixed(1); //rounding to 1 decimal
    console.log(currentTemperature);
    const currentWeatherFeelsLike = currentWeather.main.feels_like.toFixed(1);
    const sunUp = currentWeather.sys.sunrise;
    const sunDown = currentWeather.sys.sunset;
}

const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`

fetch(forecastWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((forecastWeather) => {
        console.log(forecastWeather);
    });