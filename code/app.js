/* ----------------------------- Import scripts ----------------------------- */

import { getWeatherToday, getForecastElement } from "./scripts/elements.js";
import { getCities } from "./scripts/cities.js";

/* ------------------------------ DOM Elements ------------------------------ */

const weatherToday = document.getElementById("weatherToday");
const headerContainer = document.getElementById("headerContainer");
const navBar = document.getElementById("navBar");
const forecastContainer = document.getElementById("forecast");

/* ---------------------------- Global variables ---------------------------- */

const API_KEY = "a184167860dd69b553e449fca6814afb",
  API_URL = "https://api.openweathermap.org/data/2.5/onecall?";
let weatherData = {},
  forecastSize = 6;

// set the default city
weatherData.city = getCities("La Motte");

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

/** This function fetches weather data from onecall api endpoint.
 * Then insert relevant data into global weatherData object
 */
const fetchWeatherData = () => {
  fetch(
    `${API_URL}lat=${weatherData.city.position.lat}&lon=${weatherData.city.position.long}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherData["current"] = data.current;
      // makes sure we only add a certtain number of forecast days.
      weatherData["daily"] = data.daily.slice(1, forecastSize).map((item) => item);
      // weatherData obj is now ready! Time to trigger the draw functions
      drawWeatherToday();
      drawForecast();
    })
    .catch((err) => console.log(`Error was thrown: ${err.message}`));
};

/** This function uses the weather data obj to draw todays weather */
const drawWeatherToday = () => {
  // 1. clear any data on the element
  weatherToday.innerHTML = "";
  // 2. Format any relevant data
  const sunTimes = formatTime([weatherData.current.sunrise, weatherData.current.sunset]);
  weatherData.current.sunrise = sunTimes[0];
  weatherData.current.sunset = sunTimes[1];
  weatherData.current.temp = weatherData.current.temp.toFixed(1);

  // Insert data into element
  weatherToday.innerHTML += getWeatherToday(weatherData.current, weatherData.city);
};

/** This function uses the weather data obj to draw the forecast */
const drawForecast = () => {
  // 1. clear any data on the element
  forecast.innerHTML = "";
  // 2. Loop through the daily forecasts
  // a. format any relevant data
  // b. insert data into forecast element
  weatherData.daily.forEach((dailyForecast, index) => {
    const dayOfWeek = getDayOfWeek(dailyForecast.dt).toUpperCase();
    weatherData.daily[index]["day"] = dayOfWeek;
    weatherData.daily[index].temp.min = weatherData.daily[index].temp.min.toFixed(0);
    weatherData.daily[index].temp.max = weatherData.daily[index].temp.max.toFixed(0);
    forecast.innerHTML += getForecastElement(dailyForecast);
  });
};

/** This function formats the epoch date strings into a week day string */
const getDayOfWeek = (date) => {
  // 1. format the epoch date string to readable date format
  let _date = new Date(date * 1000).toString();
  // 2. only return the first word (which is the day of the week)
  return _date.split(" ")[0];
};

/** This function formats the epoch time string to readable format */
const formatTime = (times) => {
  let formattedTimes = [];
  times.forEach((time) => {
    const date = new Date(time * 1000).toTimeString();
    const dateStrings = date.split(":");
    formattedTimes.push(`${dateStrings[0]}:${dateStrings[1]}`);
  });
  return formattedTimes;
};

/** This function toggles the side navbar open and close  */
const toggleNavBar = () => {
  navBar.classList.toggle("open");
};

/** This function toggles expanded view of current weather data */
const toggleMoreInfo = () => {
  forecast.classList.toggle("close");
  headerContainer.classList.toggle("expanded");
  headerContainer.querySelector("#sunTimes").classList.toggle("expanded");
  headerContainer.querySelector("#moreInfo").classList.toggle("hidden");
  headerContainer.querySelector(".btn-round#showMore").classList.toggle("expanded");
  headerContainer.querySelector("img#showMore").classList.toggle("turn");
};

/** This function changes the weatherData city object based on selected city by user */
const changeCity = (newCity) => {
  // 1. clear the weatherData global variable
  weatherData = {};
  // 2. set the new city
  weatherData.city = getCities(newCity);
  // 3. Trigger the fetch data function to load new data on site
  fetchWeatherData();
};

/** This function toggles visual indication that a city is selected and currently viewed */
const toggleCityLinks = (target) => {
  navBar.querySelectorAll("a").forEach((link) => {
    link.setAttribute("current", false);
  });
  target.setAttribute("current", true);
};

/** This function uses geoLocation API to get current position */
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

/** This function is triggered by getLocation()
 *  1. It inserts the current location as a city object in weatherData
 *  2. Then it fetches the data for the location
 */
const showPosition = (pos) => {
  weatherData.city = {
    name: "My Location",
    position: {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    },
  };
  fetchWeatherData();
};

/* ------------------------------ ON PAGE LOAD ------------------------------ */

fetchWeatherData();

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

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
    if (target.innerText === "My Location") {
      getLocation();
    } else {
      changeCity(target.innerText);
    }
    toggleNavBar();
    toggleCityLinks(target);
  }
});
