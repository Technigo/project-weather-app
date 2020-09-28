import { API_KEY } from "./api_key.js";
// Store API URL's
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Orebro,Sweden&units=metric&APPID=${API_KEY}`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Orebro,Sweden&units=metric&APPID=${API_KEY}`;

// Declare variables
const location = document.getElementById("location");
const currentTemperature = document.getElementById("currentTemperature");
const feelsLikeTemperature = document.getElementById("feelsLikeTemperature");
const todayMax = document.getElementById("todayMax");
const todayMin = document.getElementById("todayMin");
const weatherDescription = document.getElementById("weatherDescription");
const weatherImage = document.getElementById("weatherImage");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const fiveDayForeCast = document.getElementsByClassName("one-day-container");

// Fetch current weather
fetch(weatherApiUrl)
  .then((response) => {
    return response.json();
  })
  .then((weatherToday) => {
    location.innerHTML = weatherToday.name;
    // If you would like to display the temperature with a decimal, you can change to toFixed(1)
    currentTemperature.innerHTML = weatherToday.main.temp.toFixed();
    feelsLikeTemperature.innerHTML = weatherToday.main.feels_like.toFixed();
    todayMax.innerHTML = weatherToday.main.temp_max.toFixed();
    todayMin.innerHTML = weatherToday.main.temp_min.toFixed();

    // Get image icon name from API
    const weatherIcon = weatherToday.weather[0].icon;
    weatherImage.src = `./assets/${weatherIcon}.png`;

    weatherDescription.innerHTML = weatherToday.weather[0].description;

    // Get time in ms, present as local time in format [hh:mm]
    sunrise.innerHTML = new Date(
      weatherToday.sys.sunrise * 1000
    ).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    sunset.innerHTML = new Date(
      weatherToday.sys.sunset * 1000
    ).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });

// Fetch five day forecast
fetch(forecastApiUrl)
  .then((response) => {
    return response.json();
  })
  .then((forecast) => {
    // Filter the forecast list array to only get the info from 12:00 each day.
    const filteredForecast = forecast.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );

    const newWeek = filteredForecast.map((day) => {
      const weekday = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const description = day.weather[0].description;
      const weatherImage = day.weather[0].icon;
      const temperature = day.main.temp.toFixed();

      return { weekday, weatherImage, description, temperature };
    });

    newWeek.forEach((item, index) => {
      fiveDayForeCast[index].querySelector(".weekday").innerText = item.weekday;
      fiveDayForeCast[index].querySelector(
        ".weather-image"
      ).src = `./assets/${item.weatherImage}.png`;
      fiveDayForeCast[index].querySelector(".forecast-temperature").innerText =
        item.temperature;
    });
  });

const displaySearch = () => {
  const locationInput = document.getElementById("locationInput");
  locationInput.classList.toggle("active");
};
