// API information
import { API_KEY } from "./api.js";

const API_URL_TODAY = `http://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;
const API_URL_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;

// General 
const containerCity = document.getElementById('city');
const containerToday = document.getElementById('today');
const containerForecast = document.getElementById('forecast');

// fetches weather data from today
fetch(API_URL_TODAY)
.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json)
    const city = json.name;
    const sunrise = json.sys.sunrise;
    const sunset = json.sys.sunset;
    

    // Add HTML content for city
    containerCity.innerHTML = `<p>Presenting the weather in ${city}</p>`;
    

    // Add HTML content for todays weather
    containerTemp.innerHTML = `<p>The temperature is ${json.main.temp} degrees Celsius</p>`;
    containerDescription.innerHTML = `<p>Description: ${json.weather[0].description}</p>`;

    containerToday.innerHTML = generateHTMLForSunTimes(sunrise);
    containerToday.innerHTML += generateHTMLForSunTimes(sunset);
});

// Function to generate todays weather
const generateHTMLForSunTimes = (sunrise) => {
    // create time strings for todays weather
    const sunTime = new Date(sunrise * 1000);
    const sunTimeString = sunTime.toLocaleTimeString('sv-SE', {
        timestyle: 'short',
        hour12: false,
    });
    return sunTimeString;
};

// fetches data from forecast
fetch(API_URL_FORECAST)
.then((response) => {
    return response.json( )
})
.then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    console.log(filteredForecast);

    filteredForecast.forEach((day) => {
        containerForecast.innerHTML += generateHTMLForForecast(day);
    });  
});

// Function to generate HTML for forecast information
const generateHTMLForForecast = (day) => {
    const forecastDate = new Date(day.dt_txt);
    const forecastDateString = forecastDate.toLocaleDateString('sv-SE', {
        weekday: 'short',
    });

    let forecastHTML = '';
    forecastHTML += `<section class="forecast">`;
    forecastHTML += `<img src="">`;
    forecastHTML += `<p>${forecastDateString}, ${day.weather[0].description}</p>`;
    forecastHTML += `</section>`;
    return forecastHTML;
};

