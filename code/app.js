// Import scripts
import { getWeatherToday } from "./scripts/elements.js";

// DOM Elements
const weatherToday = document.getElementById("weatherToday");

// Global variables
const API_KEY = "a184167860dd69b553e449fca6814afb",
  API_URL = "https://api.openweathermap.org/data/2.5/",
  CITY = "La Motte";

/* FUNCTIONS */
const fetchWeatherToday = () => {
  fetch(`${API_URL}weather?q=${CITY}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      let weatherData = {
        temp: data.main.temp.toFixed(1),
        type: data.weather[0].description,
        city: CITY,
        sunrise: "",
        sunset: "",
      };
      weatherToday.innerHTML = getWeatherToday(weatherData);
      // DEBUG: remove on submission
      console.log(data);
      console.log(weatherData);
    })
    .catch((err) => console.log(`Error was thrown: ${err.message}`));
};

/* EXECUTE PAGE LOAD FUNCTIONS */
fetchWeatherToday();
