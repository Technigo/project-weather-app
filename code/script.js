const apiKey = '380f07f94efb48727a6ae5c8f7d15f5d';
const apiStockholm = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';
const apiFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=380f07f94efb48727a6ae5c8f7d15f5d';

//Weather Variables
const city = document.getElementById('city');
const weatherDescription = document.getElementById('weatherDescription');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const fiveDays = document.getElementById('fiveDays');
const temperatures = document.getElementById('temperatures');

fetch(apiStockholm)
    .then((response) => {
        return response.json();
})

.then((weatherObject) => {
    city.innerHTML = weatherObject.name;
    console.log(weatherObject);
    weatherDescription.innerHTML = weatherObject.weather[0].description.toUpperCase()
    temperatures.innerHTML = weatherObject.main.temp.toFixed(0.5)
    // sunrise.innerHTML = weatherObject.sys.sunrise
    // sunset.innerHTML = weatherObject.sys.sunset

    let sunrise = weatherObject.sys.sunrise;
    let sunriseDate = new Date(sunrise*1000);

    sunrise.innerHTML = `<h2> Sunrise: ${sunriseDate} </h2>`

    let sunset = weatherObject.sys.sunset;
    let sunsetDate = new Date(sunset*1000);

    sunset.innerHTML = `<h2> Sunset:${sunsetDate} </h2>`
    console.log()
})






// fetch(apiFiveDaysForecast)
//     .then((response) => {
//         return response.json();
// })

// // Five days forecast
// .then((weatherObject) => {
//     fiveDays.innerHTML = weatherObject.list.dt
