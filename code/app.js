// Import scripts
import { getWeatherToday, getForecastElement } from "./scripts/elements.js";

// DOM Elements
const weatherToday = document.getElementById("weatherToday");
const headerContainer = document.getElementById("headerContainer");
const navBar = document.getElementById("navBar");
const forecastContainer = document.getElementById("forecast");

// Global variables
const API_KEY = "a184167860dd69b553e449fca6814afb",
  API_URL = "https://api.openweathermap.org/data/2.5/";

let city = "La Motte";

/* FUNCTIONS */
const fetchWeatherToday = () => {
  weatherToday.innerHTML = "";
  fetch(`${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}`)
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
        city: city,
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
  forecast.innerHTML = "";
  fetch(`${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`)
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
    const dayOfWeek = getDayOfWeek(forecast.dt_txt).toUpperCase();
    forecastDataList.push({
      day: dayOfWeek,
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

const getDayOfWeek = (date) => {
  let _date = formatIOSDate(date);
  const dateStrings = new Date(_date).toString().split(" ");
  return dateStrings[0];
};

function formatIOSDate(date) {
  return new Date(date.replace(/-/g, "/"));
}
const formatTime = (times) => {
  let formattedTimes = [];
  times.forEach((time) => {
    const date = new Date(time * 1000).toTimeString();
    const dateStrings = date.split(":");
    formattedTimes.push(`${dateStrings[0]}:${dateStrings[1]}`);
  });
  return formattedTimes;
};

const toggleNavBar = () => {
  navBar.classList.toggle("open");
};
const toggleMoreInfo = () => {
  forecast.classList.toggle("close");
  headerContainer.classList.toggle("expanded");
  headerContainer.querySelector("#sunTimes").classList.toggle("expanded");
  headerContainer
    .querySelector(".btn-round#showMore")
    .classList.toggle("expanded");
  headerContainer.querySelector("img#showMore").classList.toggle("turn");
};

const changeCity = (newCity) => {
  city = newCity;
  fetchWeatherForecast();
  fetchWeatherToday();
};

const toggleCityLinks = (target) => {
  navBar.querySelectorAll("a").forEach((link) => {
    link.setAttribute("current", false);
  });
  target.setAttribute("current", true);
};

/* EXECUTE PAGE LOAD FUNCTIONS */
fetchWeatherToday();
fetchWeatherForecast();

/* EVENT LISTENERS */
headerContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "btnSideMenu") {
    toggleNavBar();
  } else if (target.id === "showMore") {
    toggleMoreInfo();
  }
});

navBar.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "btnClose") {
    toggleNavBar();
  } else if (target.hasAttribute("current")) {
    changeCity(target.innerText);
    toggleCityLinks(target);
  }
});

// listCities.addEventListener("click", (event) => {
//   const target = event.target;
//   console.log(target);
// });
