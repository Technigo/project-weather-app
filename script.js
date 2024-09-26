const API_KEY = "248332e11aac477643699fc267736540"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const city = "San Jose"
const URL = `${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`

//DOM selectors
const cityName = document.getElementById("city-name")
const weather = document.getElementById("current-weather")
const temperature = document.getElementById("current-temperature")
const sunriseAndSunset = document.getElementById("sunrise-sunset-times")

// Function to capitalize first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Function to format timestamp properly
const formatTime = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const updateHTML = (data) => {

  const currentCity = data.name
  const currentWeather = capitalizeFirstLetter(data.weather[0].description)
  const currentTemp = data.main.temp.toFixed(1)
  const timezoneOffset = data.timezone
  const sunriseTimestamp = formatTime(data.sys.sunrise, timezoneOffset)
  const sunsetTimestamp = formatTime(data.sys.sunset, timezoneOffset)

  cityName.innerText = currentCity
  weather.innerText = currentWeather
  temperature.innerText = `${currentTemp}°C`
  sunriseAndSunset.innerText = `sunrise ${sunriseTimestamp} sunset: ${sunsetTimestamp}`
}

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    updateHTML(data) //Call updateHTML with the fetched data
  })
  .catch(error => console.error('Error:', error))

