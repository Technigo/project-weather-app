// Imports
import { handleForecastData, handleWeatherData } from "./weather.js";

// Globals
const API_KEY = "00cf2e54cabfd29c16426be71518c00a";
const SUFFIX = `&units=metric&APPID=${API_KEY}`;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

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
export const getDataFromApi = async (URL, dataHandler) => {
  try {
    // Show loader before making the asynchronous call
    showLoader();

    const res = await fetch(URL);

    if (!res.ok) {
      console.log("Network response was not ok");
      hideLoader();
      return null;
    }

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

export const handleWeatherUrl = async (city = "") => {
  try {
    // Show loader before making the asynchronous call
    showLoader();

    if (city) {
      const WEATHER_CITY_URL = `${BASE_URL}weather?q=${city}${SUFFIX}`;
      const FORECAST_CITY_URL = `${BASE_URL}forecast?q=${city}${SUFFIX}`;
      await getDataFromApi(WEATHER_CITY_URL, handleWeatherData);
      await getDataFromApi(FORECAST_CITY_URL, handleForecastData);
    } else {
      const coords = await getGeolocation();

      // Save long and lat in variable
      const lat = coords.latitude;
      const lon = coords.longitude;

      const WEATHER_BASE_URL = `${BASE_URL}weather?lat=${lat}&lon=${lon}${SUFFIX}`;
      await getDataFromApi(WEATHER_BASE_URL, handleWeatherData);

      const FORECAST_BASE_URL = `${BASE_URL}forecast?lat=${lat}&lon=${lon}${SUFFIX}`;
      await getDataFromApi(FORECAST_BASE_URL, handleForecastData);
    }
  } catch (error) {
    console.error("Error in handleWeatherUrl:", error);
  }
};

handleWeatherUrl();
