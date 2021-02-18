// Import scripts
import { getWeatherToday, getForecastElement } from "./scripts/elements.js";

// DOM Elements
const weatherToday = document.getElementById("weatherToday");
const headerContainer = document.getElementById("headerContainer");
const sideMenu = document.getElementById("sideMenu");
const forecastContainer = document.getElementById("forecast");

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
      const weatherData = {
        temp: data.main.temp.toFixed(1),
        // type: data.weather[0].description,
        type: {
          icon: data.weather[0].icon,
          main: data.weather[0].main,
          description: data.weather[0].description,
        },
        city: CITY,
        sunrise: sunTimes[0],
        sunset: sunTimes[1],
      };
      weatherToday.innerHTML += getWeatherToday(weatherData);

      // DEBUG: remove on submission
      console.log(data);
      console.log(weatherData);
    })
    .catch((err) => console.log(`Error was thrown: ${err.message}`));
};

const fetchWeatherForecast = () => {
  fetch(`${API_URL}forecast?q=${CITY}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      const forecastDataList = filterForecastData(data.list);

      forecastDataList.forEach((forecast) => {
        forecastContainer.innerHTML += getForecastElement(forecast);
      });

      // DEBUG: remove on submission
      console.log(data);
      console.log(forecastDataList);
    });
};

const filterForecastData = (data) => {
  let forecastDataList = [];

  const middayForecasts = data.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });

  middayForecasts.forEach((forecast) => {
    forecastDataList.push({
      day: getDayOfWeek(forecast.dt_txt).toUpperCase(),
      type: {
        icon: forecast.weather[0].icon,
        main: forecast.weather[0].main,
        description: forecast.weather[0].description,
      },
      minTemp: forecast.main.temp_min.toFixed(0),
      maxTemp: forecast.main.temp_max.toFixed(0),
    });
  });

  return forecastDataList;
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

const getDayOfWeek = (date) => {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat("default", { weekday: "short" }).format(dateObj);
};

const toggleSideMenu = () => {
  sideMenu.classList.toggle("open");
};

/* EXECUTE PAGE LOAD FUNCTIONS */
fetchWeatherToday();
fetchWeatherForecast();

/* EVENT LISTENERS */
headerContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "btnSideMenu") {
    toggleSideMenu();
  }
});

sideMenu.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "btnClose") {
    toggleSideMenu();
  }
});
