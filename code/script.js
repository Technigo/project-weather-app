// API information
import { API_KEY } from "./api.js";

const API_URL_TODAY = `http://api.openweathermap.org/data/2.5/weather?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;
const API_URL_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?q=Karlstad,Sweden&units=metric&appid=${API_KEY}`;

// General variables / objects
const containerCity = document.getElementById('city');
const containerToday = document.getElementById('today');
const containerForecast = document.getElementById('forecast');


// fetches weather data from today
fetch(API_URL_TODAY)
.then((response) => {
    return response.json();
})
.then((json) => {
    const city = json.name;
    const weather = json.weather[0].main;
    const weatherDetailed = json.weather[0].description;
    const sunrise = json.sys.sunrise;
    const sunset = json.sys.sunset;
    
    // Add HTML content for todays weather
    containerToday.innerHTML = `<p>${weatherDetailed} | ${json.main.temp}°C</p>`;
    containerToday.innerHTML += `<p>sunrise ${generateHTMLForSunTimes(sunrise)}</p>`;
    containerToday.innerHTML += `<p>sunset ${generateHTMLForSunTimes(sunset)}</p>`;

    // Set styling for page
    document.getElementById('weatherMessage').innerHTML = generateFriendlyReminder(weather, city);
    document.getElementById('icon').src = generateImageUrl(weather);
    document.getElementById('body').style.backgroundColor = generateBackground(weather);
    document.getElementById('body').style.color = generateFontstyle(weather);
    
});

// Generate the url for the image
const generateImageUrl = (weather) => {
    if (weather === 'Clouds') {
        return './assets/Clouds.svg'
    } else if (weather === 'Clear') {
        return './assets/Clear.svg'
    } else if (weather === 'Rain') {
        return './assets/Rain.svg'
    } else if (weather === 'Snow') {
        return './assets/Snow.svg'
    } else if (weather === 'Thunderstorm') {
        return './assets/Thunder.svg'
    } else if (weather === 'Drizzle') {
        return './assets/Drizzle.svg'
    } else {
        return './assets/Drizzle.svg'
    }
};

// Generate the background color
const generateBackground = (weather) => {
    if (weather === 'Clouds') {
        return '#F4F7F8'
    } else if (weather === 'Clear') {
        return '#F7E9B9'
    } else if (weather === 'Rain') {
        return '#A3DEF7'
    } else if (weather === 'Snow') {
        return '#ffffff'
    } else if (weather === 'Thunderstorm') {
        return '#1e2021'
    } else if (weather === 'Drizzle') {
        return '#b7b8b8'
    } else {
        return '#36393c'
    }
};

// Generate the font color
const generateFontstyle = (weather) => {
    if (weather === 'Clouds') {
        return '#F47775'
    } else if (weather === 'Clear') {
        return '#2A5510'
    } else if (weather === 'Rain') {
        return '#164A68'
    } else if (weather === 'Snow') {
        return '#000000'
    } else if (weather === 'Thunderstorm') {
        return '#FFFF99'
    } else if (weather === 'Drizzle') {
        return '#A52A2A'
    } else {
        return '#9999ff'
    }
};

// Function to generate time for sunset/sunrise
const generateHTMLForSunTimes = (timeStamp) => {
    // create time strings for todays weather
    const sunTime = new Date(timeStamp * 1000);
    const sunTimeString = sunTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit', 
        minute: '2-digit'
    });
    return sunTimeString;
};


// Function to set friendly reminder depending of weather
const generateFriendlyReminder = (weather, city) => {
    if (weather === 'Clouds') {
        return `Light a fire and get cosy. ${city} is looking grey today`
    } else if (weather === 'Clear') {
        return `Get your sunnies on. ${city} is looking rather great today`
    } else if (weather === 'Snow') {
        return `Dress warm if you're heading out. ${city} is cold today.`
    } else if (weather === 'Rain') {
        return `Don't forget your umbrella. It's wet in ${city} today`
    } else if (weather === 'Drizzle') {
        return `Not raining, but close enough. ${city} isn't looking its best today.`
    } else if (weather === 'Thunderstorm') {
        return `Storm incoming. ${city} isn't looking its best today`
    } else {
        return `Be careful out there, the sight might not be the best in ${city} today.`
    }
};


// fetches data from forecast
fetch(API_URL_FORECAST)
.then((response) => {
    return response.json( )
})
.then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((day) => {
        containerForecast.innerHTML += generateHTMLForForecast(day);
    });  
});

// Function to generate HTML for forecast information
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

