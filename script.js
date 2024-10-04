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

let favCities = ["Stockholm", "Paris", "London", "Dubai", "Beijing", "Tokyo"]
let currentFavIndex = 0

// Utility: Toggle element visibility
const toggleElementVisibility = (element, state) => {
  element.style.display = state ? state : element.style.display === "none" ? "flex" : "none"
}

// Toggle search menu and icon
const toggleSearchMenu = () => {
  toggleElementVisibility(sideMenu)
  toggleElementVisibility(searchIcon)
}

// Event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  searchIcon.addEventListener("click", () => {
    toggleElementVisibility(searchIcon, "none") // Hide search icon
    toggleElementVisibility(sideMenu, "flex") // Show the side menu
  })

  closeButton.addEventListener("click", () => {
    toggleElementVisibility(sideMenu, "none") // Hide the side menu
    toggleElementVisibility(searchIcon, "block") // Show the search icon again
  })

  searchButton.addEventListener("click", debounce(startSearch, 500)) // Debounced search
  favButton.addEventListener("click", fetchFavCityWeather)

  // Fetch initial weather data for the first favorite city
  fetchWeather(favCities[0])
})

// Create API URL
const createApiUrl = (endpoint, city) =>
  `${BASE_URL}${endpoint}?q=${city}&units=metric&appid=${API_KEY}`

// Fetch weather data
const fetchWeather = city => {
  Promise.all([
    fetchData(createApiUrl("weather", city)),
    fetchData(createApiUrl("forecast", city))
  ]).then(([weatherData, forecastData]) => {
    updateWeatherUI(weatherData)
    updateForecastUI(forecastData)
  })
}

// Unified fetch function with error handling
const fetchData = url => fetch(url)
  .then(response => {
    if (!response.ok) throw new Error("City not found")
    return response.json()
  })
  .catch(error => {
    alert("City not found. Please check your input.")
    throw error
  })

// Utility: Format time in 24-hour format using the correct timezone
const formatTime = (unixTime, timezoneOffset) => {
  const localTime = new Date((unixTime + timezoneOffset) * 1000)
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false})
}

// Update weather data in the UI
const updateWeatherUI = data => {
  const temp = Math.floor(data.main.temp)
  const weatherDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const timezoneOffset = data.timezone // Use the timezone offset for the city

  weatherData.innerHTML = `
    <h1>${temp}<span>ºC</span></h1>
    <h2>${data.name}</h2>
    <h3>
      ${weatherDescription}
      <img src="${iconUrl}" alt="Weather Icon" class="current-weather-icon">
    </h3>
    <h4>Current Time: ${formatTime(data.dt,timezoneOffset)}</h4>
    <h5>Sunrise: ${formatTime(data.sys.sunrise, timezoneOffset)} | Sunset: ${formatTime(data.sys.sunset, timezoneOffset)}</h5>
  `
  dayToNight(data.dt, data.sys.sunrise, data.sys.sunset, timezoneOffset)
}

// Day/Night Background Update
const dayToNight = (currentTime, sunrise, sunset, timezoneOffset) => {
  const adjustedCurrentTime = currentTime + timezoneOffset
  const adjustedSunrise = sunrise + timezoneOffset
  const adjustedSunset = sunset + timezoneOffset  
  
  weatherContainer.style.background = adjustedCurrentTime < adjustedSunrise || adjustedCurrentTime > adjustedSunset
    ? "linear-gradient(180deg, #323667 0%, #6B6EA8 100%)"
    : "" // Default to CSS value for day
}

// Update forecast data in the UI
const updateForecastUI = forecastData => {
  forecast.innerHTML = "" // Clear the forecast section
  forecastData.list.filter((_, index) => index % 8 === 0).forEach(entry => {
    const day = new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
    const iconUrl = `http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`
    const temp = `${Math.floor(entry.main.temp)}°C`
    const windSpeed = `${entry.wind.speed} m/s`

    forecast.insertAdjacentHTML("beforeend", `
      <div class="forecast-day">
        <p>${day}</p>
        <img src="${iconUrl}" alt="Weather Icon" class="forecast-weather-icon">
        <p>${temp}</p>
        <p>${windSpeed}</p>
      </div>
    `)
  })
}

// Validate search input and trigger weather fetch
const startSearch = () => {
  const city = inputLocation.value.trim()
  if (city) {
    fetchWeather(city)
    inputLocation.value = "" // Clear input field after search
  } else {
    alert("Please enter a city name.")
  }
}

// Fetch weather for next favorite city
const fetchFavCityWeather = () => {
  // Increment the index first, so the first click moves to the next city
  currentFavIndex = (currentFavIndex + 1) % favCities.length
  fetchWeather(favCities[currentFavIndex])
}

// Debounce function
const debounce = (func, delay) => {
  let debounceTimer
  return () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(func, delay)
  }
}
