// Fetch data from the weather API
const API_KEY = "25d9e6e78d809a9dee3803bd737c523d"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const URL_WEATHER = `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
const URL_FORECAST = `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`

console.log(URL_WEATHER)
console.log(URL_FORECAST)
// alert("Oops, city not found! Check your spelling please.")

// DOM selectors
// const 
