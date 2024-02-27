// Imports
import { getWeatherContainer } from "./weather.js";

// Globals
const main = document.getElementById("main");
const loading = document.getElementById("loading");

const apiKey = "00cf2e54cabfd29c16426be71518c00a";
const suffix = `&units=metric&APPID=${apiKey}`;
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

const getWeatherData = (coords) => {
  let URL;

  const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  const lat = coords.latitude;
  const lon = coords.longitude;

  // Api request with the lat and lon for the current user.
  URL = `${apiURL}lat=${lat}&lon=${lon}${suffix}`;

  fetch(URL)
    .then((response) => {
      loading.innerText = "Loading...";
      return response.json();
    })
    .then((data) => {
      loading.innerText = "";
      // Function to get the main container
      getWeatherContainer(data);
    })
    .catch((err) => {
      loading.innerText = "";
      console.error("Error getting weather from api:", err.message);
    });
};

// Get the geolocation to get the current position of the user
const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    // Adding loader while waiting for geolocation
    loading.innerText = "Loading...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        loading.innerText = "";
        resolve(position.coords);
      },
      (error) => {
        loading.innerText = "";
        reject(error);
      }
    );
  });
};

// Usage
getGeolocation()
  .then((coords) => {
    getWeatherData(coords);
  })

  .catch((err) => {
    console.error("Error getting geolocation:", err.message);
  });
