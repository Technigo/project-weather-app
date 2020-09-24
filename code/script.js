
//current weather variables
const city = document.getElementById('city');
const currentTemperature = document.getElementById('currentTemperature');
const weatherType = document.getElementById('weatherType');
const currentWeather_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';
const forecast_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLikeTemp = document.getElementById('feelsLikeTemp');
//const sunrise = document.getElementById('sunrise');
const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');

//forecast weather variables
const forecastDay = document.getElementById('forecastDay');
const forecastFeelsLikeTemp = document.getElementById('forecastFeelsLikeTemp');



//current weather

fetch(currentWeather_API_URL)
.then(response => {
    return response.json();
})
.then((weatherObject) => {
    //console.log(weatherObject);
    //console.log(weatherObject.main);
    humidity.innerHTML = `Humidity: ${weatherObject.main.humidity}`;
    windSpeed.innerHTML =`Wind ${weatherObject.wind.speed} m/s`;
    feelsLikeTemp.innerHTML = `Feels like ${Math.floor(weatherObject.main.feels_like)} °C`;
    minTemp.innerHTML = `Min ${Math.floor(weatherObject.main.temp_min)} °C`;
    maxTemp.innerHTML = `Max ${Math.floor(weatherObject.main.temp_max)} °C`;
    const sunrise = weatherObject.sys.sunrise;
    console.log(sunrise);
    //const sunriseTime = sunrise.toLocaleTimeString('sv-SE');
    sunset = weatherObject.sys.sunset;
    city.innerHTML = weatherObject.name;
    currentTemperature.innerHTML = `${Math.floor(weatherObject.main.temp)} °C`;
    weatherType.innerHTML = weatherObject.weather[0].description; 
    //converting the data given UNIX (in seconds) to milliseconds which is used in JS
    sunriseTime.innerHTML = `Sunrise:  ${new Date(sunrise * 1000).toLocaleTimeString('sv-SE',{hour: '2-digit', minute: '2-digit'})}`;
    sunsetTime.innerHTML = `Sunset: ${new Date(sunset * 1000).toLocaleTimeString('sv-SE',{hour: '2-digit', minute: '2-digit'})}`;
});

//forecast

fetch(forecast_API_URL)
.then(response => {
    return response.json();
})
.then((forecastObject) => {
    const listArray = forecastObject.list;
    console.log(listArray);
    const filteredForecast = listArray.filter(item => 
    item.dt_txt.includes('12:00'));
    console.log(filteredForecast);
    filteredForecast.map(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-SE', {
            weekday: 'long',
            day: 'numeric'
        })
       forecastDay.innerHTML += `<p>${dayName}</p> `;
       const temp = Math.floor(day.main.feels_like);
       forecastFeelsLikeTemp.innerHTML += `<p>${temp}°C </p>`;
    });
    
});