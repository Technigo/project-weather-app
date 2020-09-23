import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=${API_KEY}`
const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`;
const currentWeatherInfo = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
const forecastWeatherInfo = document.querySelector('.forecast-weather-info-textbox');

//---------------------------------Fetch API current weather---------------------
fetch(currentWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        currentWeatherInfo.innerHTML += generateHTMLForCurrentWeatherInfo(currentWeather);
        cityHeader.innerHTML = currentWeather.name;
    });

//-------------Function to generate HTML for current weather info on top of page-----
const generateHTMLForCurrentWeatherInfo = currentWeather => {
    const weatherDescription = currentWeather.weather[0].main;       
    const currentTemperature = currentWeather.main.temp.toFixed(1); //rounding to 1 decimal
    const currentWeatherFeelsLike = currentWeather.main.feels_like.toFixed(1);
    const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
    const sunriseTimeString = sunriseTime.toLocaleTimeString('sv-SE', {
       timestyle: 'long',
       hour12: false,
       hour: '2-digit', 
       minute:'2-digit'
    });

    const sunsetTime = new Date(currentWeather.sys.sunset * 1000);
    const sunsetTimeString = sunsetTime.toLocaleTimeString('sv-SE', {
        timestyle: 'short',
        hour12: false,
        hour: '2-digit', 
        minute:'2-digit',
    });

    let currentWeatherInfoHTML = '';
    currentWeatherInfoHTML += `<p class="weather-info-text">${weatherDescription}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">${currentTemperature}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">° feels like: ${currentWeatherFeelsLike}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunrise: ${sunriseTimeString}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunset: ${sunsetTimeString}</p>`;
    return currentWeatherInfoHTML;
};

//--------------------

fetch(forecastWeatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((forecastWeather) => {
        console.log(forecastWeather);
        forecastWWeatherInfo.innerHTML += generateHTMLForForecastWeatherInfo(forecastWeather);
    });

    //-------------Function to generate HTML for current weather info on top of page-----
//  const generateHTMLForForecastWeatherInfo = forecastWeather => {

//  }