// Imports
import { handleWeatherData } from "./weather.js";

// Globals
const loading = document.getElementById("loading");
const API_KEY = "00cf2e54cabfd29c16426be71518c00a";
const SUFFIX = `&units=metric&APPID=${API_KEY}`;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

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
  loading.innerText = "Loading...";
};

const hideLoader = () => {
  loading.innerText = "";
};

// Fetch data from Openweather Api
const getWeatherData = async () => {
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

    // Handle the weather logic
    handleWeatherData(data);

    hideLoader();
    return data;
  } catch (err) {
    hideLoader();
    console.log("Catching error", err);
  }
};

getWeatherData();
