// DOM-Selectors
const todaysTemperature = document.getElementById("todays-temperature");
const weatherLocation = document.getElementById("weather-location");
const todaysWeather = document.getElementById("todays-weather");
const todaysSunrise = document.getElementById("todays-sunrise");
const todaysSunset = document.getElementById("todays-sunset");

// Weather Today API
// https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

// Creating parts of URL
const BASE_TODAY_URL = "https://api.openweathermap.org/data/2.5/weather?";
const city = "Lundsberg,Sweden";
const API_KEY = "ebcad7517d4d5102daa2078b4d1b8409";

const weatherTodayURL = `${BASE_TODAY_URL}q=${city}&units=metric&APPID=${API_KEY}`;

console.log(weatherTodayURL);

fetch(weatherTodayURL)
  .then((response) => {
    return response.json();
  })
  .then((weatherTodayData) => {
    // Update html with todays temperature, rounded in a h1 with degrees celsius after it
    todaysTemperature.innerHTML = `
    <p> ${weatherTodayData.main.temp.toFixed(1)} </p>
    <p> °C </p> `;
    // testing the todaysTemperature
    console.log("todays temperature:", weatherTodayData.main.temp.toFixed(1));
    // Update html with weather-location-name in h1
    weatherLocation.innerHTML = `
    <p> ${weatherTodayData.name} </p>`;
    // testing the weatherLocation-name
    console.log("name:", weatherTodayData.name);
    // Update html with todays weather in a p
    weatherTodayData.weather.forEach((weather) => {
      todaysWeather.innerHTML = `
      <p> ${weather.description} </p>`;
      // testing the weatherdescription
      console.log(weather);
      console.log(weather.description);
    });
    console.log("Weatherdata:", weatherTodayData);
  });
