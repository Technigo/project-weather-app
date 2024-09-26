// c0a43477116d9adc8d5acc553c3b7227
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// URL = base url + word + api_key

const API_KEY = "c0a43477116d9adc8d5acc553c3b7227"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

let city = "Stockholm"

const URL = `${BASE_URL}?q=${city}&appid=${API_KEY}`

console.log(URL)


// DOM selectors
const celcius = document.getElementById("temperature")
const cityName = document.getElementById("city")
const currentTime = document.getElementById("time")
const weatherIcon = document.getElementById("weather-icon")

cityName.innerHTML = city


fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data)

  })