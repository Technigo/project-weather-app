// const container = document.getElementById("main");
// const launchCountHeader = document.getElementById("launchCount");

const apiCurrent = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=8174b34f755933df367987fbb0eefd50';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8174b34f755933df367987fbb0eefd50';
const weatherCurrent = document.getElementById("weatherCurrent");
const weatherForecast = document.getElementById("weatherForecast");
const city = document.getElementById("city");
const temperatureMin = document.getElementById("temperatureMin");
const temperatureMax = document.getElementById("temperatureMax");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  
fetch(apiCurrent)
  .then((response) => {
    return response.json()
  .then((json) => {
    console.log(json)
    console.log(weather.city = json.name)
    console.log(weather.temperatureMin = json.main.temp_min)
    console.log(weather.temperatureMax = json.main.temp_max)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    city.innerHTML = weather.city
    temperatureMin.innerHTML = weather.temperatureMin
    temperatureMax.innerHTML = weather.temperatureMax
    sunrise.innerHTML = weather.sunrise
    sunset.innerHTML = weather.sunset
  })
  }) 

fetch(apiForecast)
    .then((response) => {
      return response.json()
    .then((json) => {
      console.log(json)
    })
    })

