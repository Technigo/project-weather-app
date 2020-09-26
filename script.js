import {API_KEY} from './api-key.js';

//--------------------------------General variables-------------------------------
const API_URL_CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=${API_KEY}`
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
        getWeatherColorIcon(currentWeatherObject.weatherDescription, current);
 //       console.log(isWeatherColors());
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

//------------------Weather objects--------------
// const rain = {
//     description: "Rain",
//     icon: "./icons/rain.svg"
// };

// const sun = {
//     description: "Clear",
//     icon: "./icons/sun.svg"
// };

// const cloud = {
//     description: "Clouds",
//     icon: "./icons.cloud.svg"
// };

// const myWeather = {
//     weather: null,
//     icon: null
// }

// //----------------------Weathers array----------------------
// const weathers = {
//     'rain': rain,
//     'sun': sun,
//     'cloud': cloud
// };



// const checkWeathers = data => {
//     if (data === "Rain" || data === "Drizzle") {
//         return rain;
//     } else if (data === "Clear") {
//         return sun;
//     } else if (data === "Clouds" || data === "Atmosphere" || data === "Thunderstorm") {
//         return cloud;
//     };
// };

//----------------------Weather Functions

// const pickWeather = () => {
//     myWeather.weather = currentWeatherObjet.weatherDescription,

// }

//----------Function to change colors in HTML depending on current weather--------
const getWeatherColorIcon = (data, item) => {
    const weatherIcon = document.querySelector("#weatherIcon");
    const weatherTitle = document.querySelector('.weather-info-main-title');
//    const isWeather = checkWeathers(data);
    if (data === "Rain") {
        HTML.classList.add("rain");
        weatherIcon.src = "./icons/rain.svg";
  //      weatherTitle.innerText = `Light a fire and get cosy. ${current.name} is looking grey today.`
    } else if (data === "Sun") {
        HTML.classList.add("sun");
        weatherIcon.src = "./icons/sun.svg";
    } else if (data === "Clouds") {
        HTML.classList.add("clouds");
        weatherIcon.src = "./icons/cloud.svg";
        weatherTitle.innerText = `Light a fire and get cosy. ${item.name} is looking grey today.`
    };
    console.log(data);
};


//-----------Function to generate HTML for current weather info on top of page----------
const generateCurrentWeatherInfo = current => {
    const currentWeatherObject = new WeatherTemplate(
        getDateDay(current.dt),
        current.weather[0].main,
        current.main.temp.toFixed(1),
        current.main.feels_like.toFixed(1),
        getSunOutTime(current.sys.sunrise),
        getSunOutTime(current.sys.sunset)
    );
    console.log(currentWeatherObject)
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
        console.log(forecastResponse);
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
    console.log(forecastTemplates);
    return forecastTemplates;
};

//---------------------------Function go generate HTML forecast info----------------------------
const generateHTMLForForecastWeatherInfo = forecasts => {
    for (const [index, item] of forecasts.entries()) {
        forecastInfo[index].querySelector('.forecast-info-day').innerText = item.dateDay;
        forecastInfo[index].querySelector('.forecast-info-temp').innerText = `${item.temperature}°`;
        forecastInfo[index].querySelector('.forecast-info-feels-like').innerText = `${item.temperatureFeelsLike}°`;
    };
}

