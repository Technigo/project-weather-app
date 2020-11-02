import { API_KEY } from './api.js';

const input = document.querySelector('#search');
let cityName = '';
const city = document.getElementById('name');
const displayDay = document.getElementById('days');
const displayTemp = document.getElementById('temp');
const displayType = document.getElementById('description');
const displayIcon = document.getElementById('icon');

//displays the geo location as default
function geoLocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            position.timeout = .5
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geoLocationForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            const geoLocationWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            getWeatherForecast(geoLocationForecastAPI)
            getWeatherToday(geoLocationWeatherAPI)
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

//Change city on input and keypress
input.addEventListener('keypress', e => {

    if (e.keyCode === 13) {
        cityName = input.value;
        const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${API_KEY}`;
        const API_URL_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;
        getWeatherToday(API_URL_TODAY);
        getWeatherForecast(API_URL_FORECAST);
        displayDay.innerHTML = '';
    }
});

//fetch url for today's forecast
const getWeatherToday = (url) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((currentWeather) => {
            upDateWeather(currentWeather);
        })
        .catch((error) => {
            city.innerHTML = ('Oops! Try again');
            console.error(error);
        });
};

//Get today's weather and update temperature, weathertype and icon
const upDateWeather = (currentWeather) => {
    // let city = document.getElementById('name');
    city.innerHTML = `${currentWeather.name}, ${currentWeather.sys.country}`;
    document.getElementById('degrees').innerHTML = `${currentWeather.main.temp.toFixed(1)} °C`;
    const description = currentWeather.weather[0].description;
    document.getElementById('weather-type').innerHTML = description;
    const weatherPicID = currentWeather.weather[0].icon;
    document.getElementById('weatherPic').src = `./assets/${weatherPicID}.png`;
    const windSpeed = currentWeather.wind.speed;
    document.getElementById('wind-speed').innerHTML = `${windSpeed} m/s`;


    //update time of sunrise
    const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
    const sunriseTimeString = sunriseTime.toLocaleTimeString('sv-SE', { timestyle: 'long', hour: "2-digit", minute: "2-digit" });
    document.getElementById('sunrise').innerHTML = sunriseTimeString;

    //update time of sunset
    const sunsetTime = new Date(currentWeather.sys.sunset * 1000);
    const sunsetTimeString = sunsetTime.toLocaleTimeString('sv-SE', { timestyle: 'long', hour: "2-digit", minute: "2-digit" });
    document.getElementById('sunset').innerHTML = sunsetTimeString;
};


//get the name of the day
const weekDays = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];
    return dayName;
};

const date = document.getElementById('day');
date.innerHTML = weekDays();

//get today's date
const today = () => {
    const months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_datetime = new Date();
    const formatted_date = `${current_datetime.getDate()} ${months[current_datetime.getMonth()]} ${current_datetime.getFullYear()}`;
    return `  ${formatted_date}`;
};

date.innerHTML += today();

//get five days forecast and display it
const getWeatherForecast = (url) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((forecastArray) => {
            const filteredArray = forecastArray.list.filter(item => item.dt_txt.includes('12:00'));
            const forecast = filteredArray.map((item) => {
                const day = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "long" });
                const temperature = (item.main.temp).toFixed(1);
                const weatherType = item.weather[0].description;
                const image = `<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"/>`;
                displayDay.innerHTML += `<p class="forecast">${day}&nbsp &nbsp${image}&nbsp &nbsp${temperature} °C</p>`;
            });   
        });
};

geoLocate()