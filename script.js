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
    .then((current) => {
        const currentWeatherObject = generateCurrentWeatherInfo(current);
        currentWeatherInfo.innerHTML += generateHTMLForCurrentWeatherInfo(currentWeatherObject);
        cityHeader.innerHTML = current.name;
    });

//------------Create weather info from response---------------------
//------------Current weather info template-------------------------

class WeatherTemplate {
   constructor(dateDay, weatherDescription, temperature, temperatureFeelsLike, sunriseTime, sunsetTime) {
        this.dateDay = dateDay; 
        this.weatherDescription = weatherDescription;
        this.temperature = temperature;
        this.temperatureFeelsLike = temperatureFeelsLike;
        this.sunriseTime = sunriseTime;
        this.sunsetTime = sunsetTime;
    };
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
const generateCurrentWeatherInfo = current => {
    const currentWeatherObject = new WeatherTemplate(
        current.weather[0].main,
        current.main.temp.toFixed(1),
        current.main.feels_like.toFixed(1),
        getSunOutTime(current.sys.sunrise),
        getSunOutTime(current.sys.sunset)
    );
    return currentWeatherObject;
};
//-------------------Data consuming approach, doing it anyway-----------------
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
    .then(forecast => {
        console.log(forecast);
        const forecastWeatherObject = generateForecastWeatherInfo(forecast); 
        forecastInfo.innerHTML += generateHTMLForForecastWeatherInfo(forecastWeatherObject);
    });

const getDateDay = data => {
    const dateDay = new Date(data * 1000)
    return dateDay.toLocaleDateString('en-GB', {
        weekday: 'short'
    });
};

const generateForecastWeatherInfo = (forecast) => {
    const filteredForecast = forecast.list.filter(item => 
        item.dt_txt.includes('12:00'));  // array with data from 12:00 each day.
    const forecastTest = filteredForecast.map(item => {
        return new WeatherTemplate(
            getDateDay(item.dt),
            item.main.temp.toFixed(1),
            item.main.feels_like.toFixed(1),
            item.main.feels_like.toFixed(1)
        );
    });
    console.log(forecastTest)
};

const generateHTMLForForecastWeatherInfo = forecastWeatherObject => {
    for (const [index, item] of forecastWeatherObject.entries()) {
        forecastInfo[index].querySelector('.forecast-info-day').innerText = item.dateDayString;
        forecastInfo[index].querySelector('.forecast-info-temp').innerText = item.temperature;
        forecastInfo[index].querySelector('.forecast-info-feels-like').innerText = item.tempFeelsLike;
    };
}

