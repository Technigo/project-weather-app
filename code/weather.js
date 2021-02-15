// All the DOM selectors stored as short variables
const shortDescription = document.getElementById("shortDescription")
const body = document.getElementById("body")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const icon = document.getElementById("icon")
const weatherIcon = document.getElementById("weatherIcon");
// Global variables
const API_KEY = "fd4c88b297db1abd3f5aaffe170147b6";
let city = "Stockholm";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=se&APPID=" + API_KEY;

const fetchWeatherData = () => {
  fetch(API_URL).then((response) => {
    return response.json()
  }).then((json) => {
    currentTemperature(json);
    let sunrise = json.sys.sunrise
    let sunset = json.sys.sunset
    currentSunriseOrSunset(sunrise)
    currentSunriseOrSunset(sunset)
    currentWeatherCondition(json)
    weatherConditionIcon(json)
  })
}

const currentTemperature = (weatherData) => {
  temperature.innerHTML = weatherData.main.temp
}

const currentSunriseOrSunset = (sun) => {
  let setSun = new Date(sun * 1000);
  let hours = "0" + setSun.getHours();
  let minutes = "0" + setSun.getMinutes();

  hours < 014 ?
    (
      sunrise.innerHTML = `Sunrise: ${hours.substr(-2)}:${minutes.substr(-2)}`
    ) : (
      sunset.innerHTML = `Sunset: ${hours.substr(-2)}:${minutes.substr(-2)}`
    );
}

const currentWeatherCondition = (weatherData) => {
  shortDescription.innerHTML = weatherData.weather[0].description
}

const weatherConditionIcon = (weatherData) => {
  let wIcon = weatherData.weather[0].icon
  weatherIcon.src = "https://openweathermap.org/img/wn/" + wIcon + "@2x.png"
}

fetchWeatherData();