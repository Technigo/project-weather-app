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
      const sunTimes = formatTime([data.sys.sunrise, data.sys.sunset]);
      let weatherData = {
        temp: data.main.temp.toFixed(1),
        type: data.weather[0].description,
        city: CITY,
        sunrise: sunTimes[0],
        sunset: sunTimes[1],
      };
      weatherToday.innerHTML = getWeatherToday(weatherData);
      // DEBUG: remove on submission
      console.log(data);
      console.log(weatherData);
    })
    .catch((err) => console.log(`Error was thrown: ${err.message}`));
};

const formatTime = (times) => {
  let formattedTimes = [];
  times.forEach((time) => {
    const date = new Date(time * 1000).toTimeString();
    const dateStrings = date.split(":");
    formattedTimes.push(`${dateStrings[0]}:${dateStrings[1]}`);
  });
  return formattedTimes;
};

/* EXECUTE PAGE LOAD FUNCTIONS */
fetchWeatherToday();
