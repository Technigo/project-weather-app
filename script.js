// import { API_KEY } from './api.js';
// const API_KEY = 'aac4bb6aff926b7baee4aa5fc6f5e50e';
// const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kaxholmen,Sweden&units=metric&appid=${API_KEY}';

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kaxholmen,Sweden&units=metric&appid=aac4bb6aff926b7baee4aa5fc6f5e50e';

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=aac4bb6aff926b7baee4aa5fc6f5e50e';
const city = document.getElementById('name');
const date = document.getElementById('day')
    // const temperature = document.getElementById('degrees');
    // const description = document.getElementById('weather-type');
    // const sunRise = document.getElementById('rise');
    // const sunSet = document.getElementById('set');
    // const forecast = document.getElementById('5days');
const iconElem = document.getElementById('icon');


fetch(weatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {
        city.innerHTML = currentWeather.name;
        document.getElementById('degrees').innerHTML = `${currentWeather.main.temp.toFixed(1)} °C`;
        document.getElementById('weather-type').innerHTML = currentWeather.weather[0].description;
        const weatherPicID = currentWeather.weather[0].icon;
        weatherPic.src = `./assets/${weatherPicID}.png`;

        const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
        const sunriseTimeString = sunriseTime.toLocaleTimeString('sv-SE', {
            timestyle: 'long',
            hour12: false,

        });
        document.getElementById('rise').innerHTML += sunriseTimeString;


        const sunsetTime = new Date(currentWeather.sys.sunset * 1000);
        const sunsetTimeString = sunsetTime.toLocaleTimeString('sv-SE', {
            timestyle: 'long',
            hour12: false,
        });

        document.getElementById('set').innerHTML += sunsetTimeString;
        console.log(sunsetTimeString);

        console.log(currentWeather);


    });

const weekDays = () => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    return dayName;

}

date.innerHTML = weekDays();

const today = () => {
    const months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    return `  ${formatted_date}`;
}

date.innerHTML += today();


fetch(forecastUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentForecast) => {
        // console.log(currentForecast);
        const filteredForecast = currentForecast.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredForecast);

        filteredForecast.forEach(item => {
            let temperature = (item.main.temp).toFixed(1);
            let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "long" })
            document.getElementById('5days').innerHTML += `<p>${weekday} ${temperature} °C </p>`;
            document.getElementById('forecastIcon').innerHTML += `<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"/>`

            // const forecastIconID = item.weather[0].icon;
            // forecastIcon.src += `./assets/${forecastIconID}.png`;
        })

    });