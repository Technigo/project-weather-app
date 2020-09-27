// API key import
import { API_KEY } from "./api.js";

const API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;
const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;

// General variables 
const containerCity = document.getElementById('city');
const containerToday = document.getElementById('today');
const containerForecast = document.getElementById('forecast');

// Object containing styles with weather id's as keys
const weatherObject = {
    80: {
        imgName: 'Clouds',
        gradientBack: 'linear-gradient(#654ea3, #eaafc8)'
    },
    8: {
        imgName: 'Clear',
        gradientBack: 'linear-gradient(#f12711, #f5af19)'
    },
        
    7: {
        imgName: 'Fog',
        gradientBack: 'linear-gradient(#2C3E50, #4CA1AF)'
    },
    6: {
        imgName: 'Snow',
        gradientBack: 'linear-gradient(#000428, #004e92)'
    },
    5: {
        imgName: 'Rain',
        gradientBack: 'linear-gradient(#4e54c8, #8f94fb)'
    },
    3: {
        imgName: 'Drizzle',
        gradientBack: 'linear-gradient(#7F7FD5, #91EAE4)'
    },
    2: {
        imgName: 'Thunder',
        gradientBack: 'linear-gradient(#141E30, #243B55)'
    }
};

// fetches weather data from today
fetch(API_URL_TODAY)
.then((response) => {
    return response.json();
})
.then((json) => {
    const city = json.name;
    const weather = json.weather[0]; //object
    const id = weather.id; // number

    const weatherDetailed = weather.description;
    const sunrise = json.sys.sunrise;
    const sunset = json.sys.sunset;
   
    // Adds HTML content for todays weather
    containerToday.innerHTML = `<p>${weatherDetailed}</p>`; // Weather description
    containerToday.innerHTML += `<p>sunrise ${generateHTMLForSunTimes(sunrise)}</p>`; // Sunrise
    containerToday.innerHTML += `<p>sunset ${generateHTMLForSunTimes(sunset)}</p>`; // Sunset

    // Object.keys(weatherObject) - Returns array of objects keys
    // .reverse() - orders the keys in reverse order
    // .find - finds the key in the object that matches the current weather id
    const currentWeatherKey = Object.keys(weatherObject).reverse().find(key => 
        id.toString().startsWith(key));
   
    // weatherInfo is an object containing the current styling picked in weatherObject
    const weatherInfo = weatherObject[currentWeatherKey]; //Looks for current key in object

    // Set styling/info depending on weather
    document.getElementById('icon').src = generateImageUrl(weatherInfo.imgName);
    document.getElementById('city').innerText = `${city} ${json.main.temp}°C`;
    document.getElementById('header').style.backgroundImage = weatherInfo.gradientBack;
    document.getElementById('footer').style.backgroundImage = weatherInfo.gradientBack;
    
});

// Generate the url for the image
const generateImageUrl = (weather) => {
    return `./assets/${weather || 'Unknown'}.png`;
};


// Function to generate time for sunset/sunrise
const generateHTMLForSunTimes = (timeStamp) => {
    // create time strings for todays weather
    const sunTime = new Date(timeStamp * 1000);
    return sunTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit', 
        minute: '2-digit'
    });
};


// fetches data from forecast
fetch(API_URL_FORECAST)
.then((response) => {
    return response.json();
})
    .then((json) => {
        
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')); // Array with data from 12

    filteredForecast.forEach((day) => {
        containerForecast.innerHTML += generateHTMLForForecast(day);
    });  
        
});

//Function to generate HTML for forecast information
const generateHTMLForForecast = (day) => {
    const forecastDate = new Date(day.dt_txt);
    const forecastDateString = forecastDate.toLocaleDateString('en-US', {
        weekday: 'short',
    });

    let forecastHTML = '';
    forecastHTML += `<section class="forecast">`;
    forecastHTML += `<p>${forecastDateString}</p>`;
    forecastHTML += `<p>${Math.round(day.main.temp)}°C</p>`;
    forecastHTML += `</section>`;
    return forecastHTML;
};

