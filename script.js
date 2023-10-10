/*
preeti - Sunrise and sunset (format time)
daniel - Weather forecast (5 day)

daniel - stretch - More cities (search?)
daniel - stretch - Use location
preeti - stretch - More data

Styling
  stretch - warm/cold
  stretch - Animations

*/

const APIKEY = "859d1c6268a1c95a2e2ded0c95483c8a";
const url = "https://api.openweathermap.org/data/2.5/weather/";

const currentWeather = document.getElementById("currentWeather");
const comment = document.getElementById("comment");
const additionalData = document.getElementById("additionalData");
const sunTime = document.getElementById("sunTime");
const forecast = document.getElementById("forecast");
const locations = document.getElementById("locations");

const fetchWeather = (param) => {
  fetch(url + param)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
}

const getCurrentWeather = (param) => {
  fetch(url + param)
    .then(response => response.json())
    .then((data) => {
      currentWeather.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].description} | ${Math.round(data.main.temp)} °C</p>`;
    })
    .catch((error) => {
      console.log(error);
    })
  // Preeti Additional weather data
}

const getSunTime = () => {
  // Preeti
}

const getForecast = () => {
  // Daniel
}

getCurrentWeather(`?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}`);


