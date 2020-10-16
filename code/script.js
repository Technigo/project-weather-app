//APIs for current weather & forecast
const currentWeather_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';
const forecast_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';


//current weather variables
const city = document.getElementById('city');
const currentTemperature = document.getElementById('current-temperature');
const weatherType = document.getElementById('weather-type');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemp = document.getElementById('feels-like-temp');
const minTemp = document.getElementById('min-temp');
const maxTemp = document.getElementById('max-temp');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const currentDay = document.getElementById('current-day');
const currentWeatherIcon = document.getElementById('current-weather-icon');
const today = new Date();
const now = `${today.getFullYear()} - ${today.getMonth()+1} ${today.getDate()}`;
currentDay.innerHTML = `Today ${now}`;

//forecast weather variables
const forecastDay = document.getElementById('forecast-day');
const forecastFeelsLikeTemp = document.getElementById('forecast-feels-like-temp');
const forecastWeatherIcon = document.getElementById('forecast-weather-icon');


//current weather

fetch(currentWeather_API_URL)
.then(response => {
    return response.json();
})
.then((weatherObject) => {
    humidity.innerHTML = `Humidity: ${weatherObject.main.humidity}`;
    windSpeed.innerHTML =`Wind ${weatherObject.wind.speed} m/s`;
    feelsLikeTemp.innerHTML = `Feels like ${Math.floor(weatherObject.main.feels_like)}°`;
    minTemp.innerHTML = `Min ${Math.floor(weatherObject.main.temp_min)}°`;
    maxTemp.innerHTML = `Max ${Math.floor(weatherObject.main.temp_max)}°`;
    const icon1 = weatherObject.weather[0].icon;
    const sunrise = weatherObject.sys.sunrise;
    sunset = weatherObject.sys.sunset;
    city.innerHTML = weatherObject.name;
    currentTemperature.innerHTML = `${weatherObject.main.temp.toFixed(1)}°`;
    currentWeatherIcon.src = 'https://openweathermap.org/img/wn/' + icon1 + '@2x.png';
    weatherType.innerHTML = weatherObject.weather[0].description; 
    //converting the data given UNIX (in seconds) to milliseconds which is used in JS
    sunriseTime.innerHTML = `Sunrise:  ${new Date(sunrise * 1000).toLocaleTimeString('sv-SE',{hour: '2-digit', minute: '2-digit'})}`;
    sunsetTime.innerHTML = `Sunset: ${new Date(sunset * 1000).toLocaleTimeString('sv-SE',{hour: '2-digit', minute: '2-digit'})}`;
});

//five-day forecast

fetch(forecast_API_URL)
.then(response => {
    return response.json();
})
.then((forecastObject) => {
    const listArray = forecastObject.list;
    const filteredForecast = listArray.filter(item => 
        item.dt_txt.includes('12:00'));
        filteredForecast.map(day => {
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString('en-SE', {
                weekday: 'long',
                day: 'numeric'
            });
            forecastDay.innerHTML += `<p>${dayName}</p> `; 
            const temp = Math.floor(day.main.feels_like);
            forecastFeelsLikeTemp.innerHTML += `<p>${temp}° </p>`;
            forecastWeatherIcon.innerHTML += `<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" />`;
        });
     }); 