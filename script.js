import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const API_URL_CURRENT_WEATHER = `http://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST_WEATHER = `http://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`;
const currentWeatherInfo = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
const forecastInfo = document.getElementsByClassName('forecast-weather-info-textbox');

//---------------------------------Fetch API current weather---------------------
fetch(API_URL_CURRENT_WEATHER)
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
//Data consuming approach
    let currentWeatherInfoHTML = '';
    currentWeatherInfoHTML += `<p class="weather-info-text">${weatherDescription}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">${currentTemperature}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">° feels like: ${currentWeatherFeelsLike}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunrise: ${sunriseTimeString}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">Sunset: ${sunsetTimeString}</p>`;
    return currentWeatherInfoHTML;
};

//--------------------Fetch API forecast weather---------------------

fetch(API_URL_FORECAST_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then(forecastWeather => {
        console.log(forecastWeather);
//      // filteredForecast is now an array with only the data from 12:00 each day.
        const filteredForecast = forecastWeather.list.filter(item => 
            item.dt_txt.includes('12:00'));
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

        console.log(newForecast);

    });
   