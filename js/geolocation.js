// Imports
import { handleForecastData, handleWeatherData } from "./weather.js";

// Globals
const API_KEY = "00cf2e54cabfd29c16426be71518c00a";
const SUFFIX = `&units=metric&APPID=${API_KEY}`;
const loader = document.getElementById("loader");
let loaderActive = false;

// Get the current position of the user
const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => reject(err)
    );
  });
};

// Show and hide loader while waiting for promise
const showLoader = () => {
  // Make sure to run the loader only once
  if (loaderActive) {
    return;
  }
  // Add letters to load and split them into an array to prepare for looping each letter
  const loaderLetters = "loading";
  const loaderArray = loaderLetters.split("");
  loader.style.display = "block";

  loaderArray.forEach((letter, i) => {
    loader.innerHTML += `
      <span class="let${i + 1}">${letter}</span>
    `;
  });

  loaderActive = true;
};

const hideLoader = () => {
  loader.style.display = "none";
};

// Fetch data from Openweather Api
export const getDataFromApi = async (BASE_URL, dataHandler) => {
  try {
    // Show loader before making the asynchronous call
    showLoader();

    // Get the coords from geolocation
    const coords = await getGeolocation();

    // Save long and lat in variabel
    const lat = coords.latitude;
    const lon = coords.longitude;

    // Buildning URL with lat & long
    const URL = `${BASE_URL}lat=${lat}&lon=${lon}${SUFFIX}`;

    const res = await fetch(URL);
    const data = await res.json();

    // Handle the weather logic for both forecast and current weather
    dataHandler(data);

    hideLoader();
    return data;
  } catch (err) {
    hideLoader();
    console.log("Catching error", err);
  }
};

// Using the fetch api function for both weather and forecast
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
getDataFromApi(WEATHER_BASE_URL, handleWeatherData);

const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?";
getDataFromApi(FORECAST_BASE_URL, handleForecastData);
