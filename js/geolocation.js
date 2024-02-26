import { handleForecastData } from "./weather.js";

// Globals
const apiKey = "00cf2e54cabfd29c16426be71518c00a";
const suffix = `&units=metric&APPID=${apiKey}`;

export const fetchWeatherDataByCity = async (position) => {
  let URL;

  const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  URL = `${apiURL}lat=${lat}&lon=${lon}${suffix}`;

  try {
    const response = await fetch(URL);
    const apiData = await response.json();

    handleForecastData(apiData);
    return;
  } catch (error) {
    console.log("Fetch error: " + error);
    // alert("Oops, city not fount! Check your spelling please!");
  }
};

// Check if geolocation is available in browser
export const getGeolocationData = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // If successful, resolve the promise with the position
        resolve(position);

        // Call fetchWeatherDataByCity with the obtained position
        fetchWeatherDataByCity(position);
      },
      (error) => {
        // If an error occurs, reject the promise with the error
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000,
      }
    );
  });
};
