const apiKey = '380f07f94efb48727a6ae5c8f7d15f5d';
const apiStockholm = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';
const apiFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';

//Weather Variables
const city = document.getElementById('city');
const weatherDescription = document.getElementById('weatherDescription');
const sunset = document.getElementById('sunset');
const sunrise = document.getElementById('sunrise');
const fiveDays = document.getElementById('fiveDays');
const temperatures = document.getElementById('temperatures');

fetch(apiStockholm)
    .then((response) => {
        return response.json();
})

// City name
.then((weatherObject) => {
    city.innerHTML = weatherObject.name;
    console.log(weatherObject);
    weatherDescription.innerHTML = weatherObject.weather[0].description
    temperatures.innerHTML = weatherObject.main.temp.toFixed(0.5)
    sunrise.innerHTML = weatherObject.sys.sunrise
    sunset.innerHTML = weatherObject.sys.sunset
    console.log(weatherObject)

// fetch(apiFiveDaysForecast)
//     .then((response) => {
//         return response.json();
// })

// // Five days forecast
// .then((weatherObject) => {
//     fiveDays.innerHTML = weatherObject.list.dt
})