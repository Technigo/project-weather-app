import { fetchWeatherDataByCity, fetchRandomWeather } from "./geolocation.js";

// Intialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const weatherBtn = document.getElementById("btn-next-city");
  const searchInput = document.getElementById("search-input");
  const searchIcon = document.getElementById("search-icon");
  const closeIcon = document.getElementById("close-icon");
  const errorMessage = document.getElementById("error-message");

  // Eventlisteners for weather button. Call function to fetch random weather data
  weatherBtn.addEventListener("click", () => {
    // Function that will generate different weather depending on the city;
    fetchRandomWeather();
  });

  searchIcon.addEventListener("click", () => {
    searchIcon.style.display = "none";
    closeIcon.style.display = "block";
    searchInput.style.opacity = 1;
  });

  closeIcon.addEventListener("click", () => {
    searchIcon.style.display = "block";
    closeIcon.style.display = "none";
    searchInput.style.opacity = 0;
  });

  // Eventlistener that will get city from input and invoke and fetch weather
  searchInput.addEventListener("change", (e) => {
    let cityName = e.target.value;

    if (isNaN(cityName)) {
      fetchWeatherDataByCity(cityName);
      errorMessage.style.opacity = "0";
    } else {
      errorMessage.style.opacity = "1";
      errorMessage.innerText = "Please select a city";
      return;
    }
  });
});
