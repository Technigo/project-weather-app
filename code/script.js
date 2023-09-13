"use strict";

// DOM selectors
const weatherData = document.getElementById('weather-container');

let weatherDescription = document.getElementById("weather-description");

// Global variables

//const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21"; // old

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "89d1a944a381d671e0d7eca3b8362f21";
const city = "Stockholm,Sweden";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`

// https://api.openweathermap.org/data/2.5/weather?

// holding the weather data object from openweather.com
let weatherObject;

// Functions

const fetchWeather = () => {
    fetch(URL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            console.log(data)
            weatherObject = data
            // console.log(weatherObject)
        })
    setTimeout(() => { insertWeatherdescription() }, 500);

};

//bla

// 1.st try to retrieve data from api
// const retrieveWeatherdata = ()=>{
//     setTimeout(() => (weatherData.innerHTML =  `<p>${weatherObject.base}</p>`), 500);
// retrieveWeatherdescription();
// }

const insertWeatherdescription = () => {
    weatherDescription.innerHTML = `${weatherObject.weather[0].description}`;
}
//
// Event listeners

// Code starts here
fetchWeather();

// setTimeout(() => {
//     console.log(weatherObject);
//     console.log(weatherObject.weather[0].description);
// }, 1000);




