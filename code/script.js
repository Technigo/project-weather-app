////////// DOM Selectors //////////
const container = document.getElementById("container")
const temperature = document.getElementById("temperature")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const forecastSection = document.getElementById("forecast-section")
const date = document.getElementById("date")

////////// Get time and date and display in app //////////
const currentDate = new Date().toLocaleDateString()
const currentTime = new Date().toLocaleTimeString()

date.innerHTML = `${currentDate} ${currentTime}`

console.log(`Current time is ${currentTime}`)

////////// API URL storing //////////
//General URL
const urlWeatherData = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
//My API key
const API_KEY = "206e380881feb4fbbb5f8d99cb75f06d"



const fetchWeatherData = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=206e380881feb4fbbb5f8d99cb75f06d')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
    console.log(json)
    })
    }
    
    fetchWeatherData()
