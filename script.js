//OpenWeatherMap API
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "86cc8fe4b24936e5560b67f7b96b6c03";
const urlCity = "Stockholm";
const URL = `${BASE_URL}${urlCity}&units=metric&APPID=${API_KEY}`;

// Forecast API
const FORECAST_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
let lat = "59.3326";
let lon = "18.0649";
const FORECAST_URL = `${FORECAST_BASE_URL}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//const FORECAST_URL =
("http://api.openweathermap.org/data/2.5/forecast?lat=18&lon=10&appid=86cc8fe4b24936e5560b67f7b96b6c03");

// DOM selectors
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const fetchWeather = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `<h2>${data.name}</h2>`;
      temp.innerHTML = `<h2>${data.main.temp}</h2>`;
      description.innerHTML = `<h2>${data.weather[0].main}</h2>`;
      city.innerHTML = `<h2>${data.name}</h2>`;
    })
    .catch((error) => console.log("Caught error:", error));
};
fetchWeather();

const fetchForecast = () => {
  fetch(FORECAST_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // city.innerHTML = `<h2>${data.name}</h2>`;
      // temp.innerHTML = `<h2>${data.main.temp}</h2>`;
      // description.innerHTML = `<h2>${data.weather[0].main}</h2>`;
      // city.innerHTML = `<h2>${data.name}</h2>`;
    })
    .catch((error) => console.log("Caught error:", error));
};
fetchForecast();
