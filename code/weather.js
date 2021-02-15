// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const weatherIcon = document.getElementById("weatherIcon");
const userLocationInput = document.getElementById("userLocationInput")
const searchLocationBtn = document.getElementById("searchLocationBtn")
const currentLocationText = document.getElementById("currentLocationText")
// Global variables
const API_KEY = "fd4c88b297db1abd3f5aaffe170147b6";
let city = "Stockholm";

const handleCityInput = (city) => {
  let API_url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=se&APPID=" + API_KEY;
  fetchWeatherData(API_url);
  currentLocationText.innerHTML = city
}

const fetchWeatherData = (API_url) => {
  fetch(API_url)
    .then((response) => {
    return response.json()
  })
    .then((json) => {
    setCurrentWeather(json)
  })
}

const setCurrentWeather = (weatherData) => {
  let sunrise = weatherData.sys.sunrise
  let sunset = weatherData.sys.sunset

  currentSunriseSunset(sunrise, "rise")
  currentSunriseSunset(sunset, "set")
  currentTemperature(weatherData);
  currentWeatherCondition(weatherData)
}

const currentTemperature = (weatherData) => {
  temperature.innerHTML = `${weatherData.main.temp} &deg;C`
}

const currentSunriseSunset = (sun, condition) => {
    condition === "rise"
    ? sunrise.innerHTML = `Soluppgång: ${toLocalTime(sun)}`
    : sunset.innerHTML = `Solnedgång: ${toLocalTime(sun)}`
}

const toLocalTime = (sun) => {
  let unixToLocalTime = new Date(sun*1000).toLocaleTimeString([], 
    {
      hour: '2-digit', minute:'2-digit', hour12: false
    });
  return unixToLocalTime;
}

const currentWeatherCondition = (weatherData) => {
  let wIcon = weatherData.weather[0].icon

  shortDescription.innerHTML = weatherData.weather[0].description
  weatherIcon.src = "https://openweathermap.org/img/wn/" + wIcon + "@2x.png"
}


searchLocationBtn.addEventListener("click", (event) => {
  event.preventDefault()
  handleCityInput(userLocationInput.value)
})