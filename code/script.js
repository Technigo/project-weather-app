
const city = document.getElementById('city');
const currentTemperature = document.getElementById('currentTemperature');
const weatherType = document.getElementById('weatherType');
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d8d53e0c0365a01e3359eb496ea9fef';
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLikeTemp = document.getElementById('feelsLikeTemp');
//const sunrise = document.getElementById('sunrise');
const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');

fetch(apiUrl)
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
