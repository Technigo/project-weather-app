import { fetchWeatherDataByCity, fetchRandomWeather } from "./geolocation.js";

const weatherBtn = document.getElementById("btn-next-city");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const closeIcon = document.getElementById("close-icon");
const errorMessage = document.getElementById("error-message");

// Initially hide the search input
searchInput.style.opacity = 0;

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
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;

  if (isNaN(cityName)) {
    fetchWeatherDataByCity(cityName);
    errorMessage.style.opacity = "0";
  } else {
    errorMessage.style.opacity = "1";
    errorMessage.innerText = "Please select a city";
    return;
  }
});
