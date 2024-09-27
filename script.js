// Fetch data from the weather API
const API_KEY = "25d9e6e78d809a9dee3803bd737c523d"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const URL_WEATHER = `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
const URL_FORECAST = `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`

console.log(URL_WEATHER)
console.log(URL_FORECAST)
// alert("Oops, city not found! Check your spelling please.")

// DOM selectors
const searchIcon = document.getElementById("searchIcon")
const sideMenu = document.getElementById("sideMenu")
const closeButton = document.getElementById("closeButton")
const inputLocation = document.getElementById("inputLocation")
const searchButton = document.getElementById("searchButton")
const mainIcon = document.getElementById("mainIcon")
const weatherData = document.getElementById("weatherData")
const currentTemp = document.getElementById("currentTemp")
const currentCity = document.getElementById("currentCity")
const typeOfWeather = document.getElementById("typeOfWeather")
const time = document.getElementById("time")
const sunTimes = document.getElementById("sunTimes")
const forecast = document.getElementById("forecast")
const weekIcon = document.getElementById("weekIcon")
const weekTemp = document.getElementById("weekTemp")
const weekWindSpeed = document.getElementById("weekWindSpeed")
const breathingButton = document.getElementById("breathingButton")

let favCities = ["Stockholm", "Paris", "London", "Dubai", "Beijing", "Tokyo"]

// Function to fetch weather data for favorite city

