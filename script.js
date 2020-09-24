import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const API_URL_CURRENT_WEATHER = `http://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST_WEATHER = `http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`;
const currentWeatherInfo = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
const forecastInfo = document.querySelectorAll('.forecast-weather-info-textbox');

//---------------------------------Fetch API current weather---------------------
fetch(API_URL_CURRENT_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        const currentWeatherObject = generateCurrentWeatherInfo(currentWeather);
        currentWeatherInfo.innerHTML += generateHTMLForCurrentWeatherInfo(currentWeatherObject);
        cityHeader.innerHTML = currentWeather.name;
    });

//------------Create weather info from response---------------------
//------------Current weather info template-------------------------

class currentWeatherTemplate {
   constructor(weatherDescription, currentTemperature, currentWeatherFeelsLike, sunriseTime, sunsetTime) {
     this.weatherDescription = weatherDescription;
     this.currentTemperature = currentTemperature;
     this.currentWeatherFeelsLike = currentWeatherFeelsLike;
     this.sunriseTime = sunriseTime;
     this.sunsetTime = sunsetTime;
    }
};

const getSunOutTime = data => {
    const sunTime = new Date(data * 1000)
    return sunTime.toLocaleTimeString('sv-SE', {
        timestyle: 'long',
        hour12: false,
        hour: '2-digit', 
        minute:'2-digit'
     })
    }
    //-------------Function to generate HTML for current weather info on top of page-----
//const generateHTMLForCurrentWeatherInfo = currentWeather => {
const generateCurrentWeatherInfo = currentWeather => {
    const currentWeatherObject = new currentWeatherTemplate(
        currentWeather.weather[0].main,
        currentWeather.main.temp.toFixed(1),
        currentWeather.main.feels_like.toFixed(1),
        getSunOutTime(currentWeather.sys.sunrise),
        getSunOutTime(currentWeather.sys.sunset)
    );
    return currentWeatherObject;
};
//Data consuming approach
const generateHTMLForCurrentWeatherInfo = currentWeatherObject => {
    let currentWeatherInfoHTML = '';
    currentWeatherInfoHTML += `<p class="weather-info-text">${currentWeatherObject.weatherDescription}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">${currentWeatherObject.currentTemperature}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">° feels like: ${currentWeatherObject.currentWeatherFeelsLike}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunrise: ${currentWeatherObject.sunriseTime}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunset: ${currentWeatherObject.sunsetTime}</p>`;
    return currentWeatherInfoHTML;
};

//--------------------Fetch API forecast weather---------------------

fetch(API_URL_FORECAST_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then(forecastWeather => {
        console.log(forecastWeather);
        generateHTMLForForecastWeatherInfo(forecastWeather);
    });

    const generateHTMLForForecastWeatherInfo = forecastWeather => {
    const filteredForecast = forecastWeather.list.filter(item => 
        item.dt_txt.includes('12:00'));  // array with data from 12:00 each day.
    const newForecast = filteredForecast.map(forecast => {
        const dateDay = new Date(forecast.dt * 1000);
        const dateDayString = dateDay.toLocaleDateString('en-GB', {
            weekday: 'short',
        });
        const temperature = forecast.main.temp.toFixed(1);
        const tempFeelsLike = forecast.main.feels_like.toFixed(1);

        return { dateDayString, temperature, tempFeelsLike };
    });

    for (const [index, everyItem] of newForecast.entries()) {
        forecastInfo[index].querySelector('.forecast-info-day').innerText = everyItem.dateDayString;
        forecastInfo[index].querySelector('.forecast-info-temp').innerText = everyItem.temperature;
        forecastInfo[index].querySelector('.forecast-info-feels-like').innerText = everyItem.tempFeelsLike;
    };
};
   