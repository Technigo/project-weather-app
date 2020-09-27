import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const API_URL_CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_FORECAST_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&appid=${API_KEY}`;
const currentWeatherInfo = document.querySelector('.weather-info-textbox');
const cityHeader = document.querySelector('.city');
const forecastInfo = document.querySelectorAll('.forecast-info-textbox');
const HTML = document.querySelector("html");


//---------------------------------Fetch API current weather---------------------
fetch(API_URL_CURRENT_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then((current) => {
        console.log(current);
        const currentWeatherObject = generateCurrentWeatherInfo(current);
        currentWeatherInfo.innerHTML += generateHTMLForCurrentWeatherInfo(currentWeatherObject);
        getWeatherColorIconTitle(currentWeatherObject.weatherDescription, current);
        cityHeader.innerHTML = current.name;
    });

//---------------------Create weather info from response--------------------------
//-------------------------Template for weather info------------------------------
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

//------------------Function to generate wanted time from the API-------------------
const getSunOutTime = data => {
    const sunTime = new Date(data * 1000)
    return sunTime.toLocaleTimeString('sv-SE', {
        timestyle: 'long',
        hour12: false,
        hour: '2-digit', 
        minute:'2-digit'
    });
};

//----------Function to change colors in HTML depending on current weather--------
const getWeatherColorIconTitle = (data, item) => {
    const weatherIcon = document.querySelector("#weatherIcon");
    const weatherTitle = document.querySelector('.weather-info-main-title');
    if (data === "Rain" || data === "Drizzle") {
        HTML.classList.add("rain");
        weatherIcon.src = "./icons/rain.svg";
        weatherTitle.innerText = `Don't forget your umbrella. It's wet in ${item.name} today.`
    } else if (data === "Clear") {
        HTML.classList.add("sun");
        weatherIcon.src = "./icons/sun.svg";
        weatherTitle.innerText = `Get your sunnies on. ${item.name} is looking rather great today.`
    } else if (data === "Clouds") {
        HTML.classList.add("clouds");
        weatherIcon.src = "./icons/cloud.svg";
        weatherTitle.innerText = `Light a fire and get cosy. ${item.name} is looking grey today.`
    };
};

//-----------Function to generate HTML for current weather info on top of page----------
const generateCurrentWeatherInfo = current => {
    const currentWeatherObject = new WeatherTemplate(
        getDateDay(current.dt),
        current.weather[0].main,
        current.main.temp.toFixed(0),
        current.main.feels_like.toFixed(0),
        getSunOutTime(current.sys.sunrise),
        getSunOutTime(current.sys.sunset)
    );
    return currentWeatherObject;
};

//-----------------------Data consuming approach, doing it anyway-----------------------
const generateHTMLForCurrentWeatherInfo = currentWeatherObject => {
    let currentWeatherInfoHTML = '';
    currentWeatherInfoHTML += `<h5 class="weather-info-title">${currentWeatherObject.weatherDescription}</h5>`;
    currentWeatherInfoHTML += `<h5 class="weather-info-title">${currentWeatherObject.temperature}°</h5>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">feels like ${currentWeatherObject.temperatureFeelsLike}°</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">sunrise ${currentWeatherObject.sunriseTime}</p>`;
    currentWeatherInfoHTML += `<p class="weather-info-text">sunset ${currentWeatherObject.sunsetTime}</p>`;
    return currentWeatherInfoHTML;
};
//-------------------------------Fetch API forecast weather-------------------------------
fetch(API_URL_FORECAST_WEATHER)
    .then((response) => {
        return response.json();
    })
    .then(forecastResponse => {
        const forecasts = generateForecastWeatherInfo(forecastResponse); 
        forecastInfo.innerHTML += generateHTMLForForecastWeatherInfo(forecasts);
    });

//-----------------------Function to generate wanted date from the API-----------------------
const getDateDay = data => {
    const dateDay = new Date(data * 1000)
    return dateDay.toLocaleDateString('en-GB', {
        weekday: 'short'
    });
};

//----Function to generate an array of objects for the filtered forecast info using the WeatherTemplate class----
const generateForecastWeatherInfo = forecast => {
    const filteredForecast = forecast.list.filter(item => 
        item.dt_txt.includes('12:00'));  // array with data from 12:00 each day.
    const forecastTemplates = filteredForecast.map(item => {
        return new WeatherTemplate(
            getDateDay(item.dt),
            item.weather[0].main,
            item.main.temp.toFixed(1),
            item.main.feels_like.toFixed(1),
            null,
            null,
        );
    });
    return forecastTemplates;
};

//---------------------------Function go generate HTML forecast info----------------------------
const generateHTMLForForecastWeatherInfo = forecasts => {
    for (const [index, item] of forecasts.entries()) {
        forecastInfo[index].querySelector('.forecast-info-day').innerText = item.dateDay;
        forecastInfo[index].querySelector('.forecast-info-temp').innerText = `${item.temperature}°`;
        forecastInfo[index].querySelector('.forecast-info-feels-like').innerText = `${item.temperatureFeelsLike}°`;
        forecastInfo[index].querySelector('.forecast-info-icon').src = getWeatherIcons(item.weatherDescription)
    };
}

//-----------------------------Function to get forecast info icon---------------
const getWeatherIcons = (weather) => {
        if (weather === "Rain" || weather === "Drizzle") {
            return "./icons/rain.svg"
        } else if (weather === "Clear") {
            return "./icons/sun.svg"
        } else if (weather === "Clouds") {
            return "./icons/cloud.svg"
        };
    };