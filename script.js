// Fetch data from the weather API
const API_KEY = "0544757e153b183d75a7a72598c90d82"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

// DOM Selectors
const searchIcon = document.getElementById("searchIcon")
const sideMenu = document.getElementById("sideMenu")
const closeButton = document.getElementById("closeButton")
const inputLocation = document.getElementById("inputLocation")
const searchButton = document.getElementById("searchButton")
const weatherData = document.getElementById("weatherData")
const forecast = document.querySelector(".weather-forecast")
const favButton = document.getElementById("favButton")

let favCities = ["Stockholm", "Beijing", "Paris", "London", "Dubai", "Tokyo"]
let currentFavIndex = 0

// Utility: Toggle element visibility
function toggleElementVisibility(element, state) {
  element.style.display = state ? state : element.style.display === "none" ? "flex" : "none"
}

// Toggle search menu
function toggleSearchMenu() {
  toggleElementVisibility(searchIcon, "none")
  toggleElementVisibility(sideMenu)
}

// Create API URL
const createApiUrl = (endpoint, city) =>
  `${BASE_URL}${endpoint}?q=${city}&units=metric&appid=${API_KEY}`

// Fetch data from the weather API
function fetchWeather(city) {
  Promise.all([
    fetchData(createApiUrl("weather", city)),
    fetchData(createApiUrl("forecast", city))
  ]).then(([weatherData, forecastData]) => {
    updateWeatherUI(weatherData)
    updateForecastUI(forecastData)
  })
}

// Unified fetch function with error handling
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found")
      return response.json()
    })
    .catch(error => {
      console.error(error)
      alert("City not found. Please check your input.")
      throw error
    })
}

// Utility: Format time in 24-hour format
const formatTime = (unixTime) =>
  new Date(unixTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

// Utility: Round temperature
const roundTemperature = temp => Math.floor(temp)

// Utility: Capitalize first letter of a string
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

// Update weather data on the UI
function updateWeatherUI(data) {
  const temp = roundTemperature(data.main.temp)
  const weatherDescription = capitalizeFirstLetter(data.weather[0].description)
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  weatherData.innerHTML = `
    <h1 id="currentTemp">${temp}<span>ºC</span></h1>
    <h2 id="currentCity">${data.name}</h2>
    <h3 id="typeOfWeather">
      ${weatherDescription}
      <img src="${iconUrl}" alt="Weather Icon" class="current-weather-icon" />
    </h3>
    <h4 id="currentTime">Current Time: ${formatTime(data.dt)}</h4>
    <h5 id="sunriseAndSunset">Sunrise: ${formatTime(data.sys.sunrise)} | Sunset: ${formatTime(data.sys.sunset)}</h5>
  `

  dayToNight(data.dt, data.sys.sunrise, data.sys.sunset)
}

// Day/Night Background Update
const dayToNight = (currentTime, sunrise, sunset) => {
  weatherContainer.style.background =
    currentTime < sunrise || currentTime > sunset
      ? "linear-gradient(180deg, #323667 0%, #6B6EA8 100%)"
      : "" // Default to CSS value for day
}

// Update forecast data on the UI
function updateForecastUI(forecastData) {
  forecast.innerHTML = "" // Clear the forecast section

  forecastData.list
    .filter((_, index) => index % 8 === 0) // Only take one forecast entry per day
    .forEach(forecastEntry => {
      const day = new Date(forecastEntry.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short"
      })
      const iconUrl = `http://openweathermap.org/img/wn/${forecastEntry.weather[0].icon}@2x.png`
      const temp = `${roundTemperature(forecastEntry.main.temp)}°C`
      const windSpeed = `${forecastEntry.wind.speed} m/s`

      const forecastHTML = `
        <div class="forecast-day">
          <p>${day}</p>
          <img src="${iconUrl}" alt="Weather Icon" class="forecast-weather-icon">
          <p>${temp}</p>
          <p>${windSpeed}</p>
        </div>
      `
      forecast.insertAdjacentHTML("beforeend", forecastHTML)
    })
}

// Validate search input and trigger weather fetch
function startSearch() {
  const city = inputLocation.value.trim()
  if (city) {
    fetchWeather(city)
    inputLocation.value = "" // Clear input field after search
  } else {
    alert("Please enter a city name.")
  }
}

// Fetch weather data for the next favorite city
function fetchFavCityWeather() {
  fetchWeather(favCities[currentFavIndex])
  currentFavIndex = (currentFavIndex + 1) % favCities.length // Cycle to the next city
}

// Debounce function to prevent too many API calls
const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(func, delay)
  }
}

// Add event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  searchIcon.addEventListener("click", toggleSearchMenu)
  closeButton.addEventListener("click", toggleSearchMenu)
  searchButton.addEventListener("click", debounce(startSearch, 500)) // Debounced search
  favButton.addEventListener("click", fetchFavCityWeather)

  // Fetch initial weather data for the first favorite city
  fetchWeather(favCities[0])
})
