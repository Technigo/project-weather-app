import { fetchWeatherDataByCity, fetchRandomWeather } from "./geolocation.js";

// Intialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const weatherBtn = document.getElementById("btn-next-city");

  // Add event listeners for weather button. Call funciton to fetch random weather data
  weatherBtn.addEventListener("click", () => {
    // Function that will generate different weather depending on the city;
    fetchRandomWeather();
  });
});
