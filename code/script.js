////////// DOM Selectors //////////
const container = document.getElementById("container")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecastSection = document.getElementById("forecast-section")
const date = document.getElementById("date")

////////// Get time + date and display in app //////////
const currentDate = new Date().toLocaleDateString()
const currentTime = new Date().toLocaleTimeString()

date.innerHTML = `${currentDate} ${currentTime}`

////////// API URL storing //////////
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const API_KEY = "206e380881feb4fbbb5f8d99cb75f06d" //query param
const cityName = "Stockholm" //path param
const forecastURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

/////Display city name in app
city.innerHTML = cityName

//Function to fetch information for the current weather

const fetchWeatherData = () => {
  fetch(`${BASE_URL}${cityName}&appid=${API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)

      //One decimal as per instructions
      const temp = json.main.temp.toFixed(1)
      //Weather description
      const weatherDescription = json.weather[0].description
      //Modify HTML
      temperature.innerHTML = `${temp}`
      weather.innerHTML = `${weatherDescription}`
      console.log("temp:", temp)
      console.log("weather:", weatherDescription)
      console.log("city:", cityName)
    })
}

fetchWeatherData()
