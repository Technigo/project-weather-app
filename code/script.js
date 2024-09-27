
//API URL and Endpoints
const BaseURL = "https://api.openweathermap.org/data/2.5/weather?"
const api_key = ""
const city = "Stockholm,Sweden"

const todayURL = `${BaseURL}q=${city}&units=metric&APPID=${api_key}`
const forecastBaseURL = "https://api.openweathermap.org/data/2.5/forecast?"
const forecastURL = `${forecastBaseURL}q=${city}&units=metric&APPID=${api_key}`

// DOM Selectors
const cityName = document.getElementById("city")
const temperature = document.getElementById("temp")
const sunriseTime = document.getElementById("sunrise")
const sunsetTime = document.getElementById("sunset")
