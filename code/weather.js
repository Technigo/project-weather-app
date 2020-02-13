const currentWeather = document.getElementById('currentWeather')
const forecastWeather = document.getElementById('forecast')

const forecast = []
const weather = {}
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// const weatherAPI = ''
// const forecastAPI = ''

//01b7bdc37404b6f3860ddce923c61a11
// My API links with API keys
const weatherNow = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"

fetch(weatherNow)
  .then(response => {
    return response.json()
  
  .then(json => {
    console.log(json)
    console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    // console.log(weather.temp = (Math.round(json.main.temp * 10) / 10))
    // console.log(weather.city = json.name)
    // console.log(weather.id = json.weather[0].id)
  })

  })