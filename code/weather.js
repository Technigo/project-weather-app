const currentWeather = document.getElementById('currentWeather')
const forecastWeather = document.getElementById('forecast')

const forecast = []
const weather = {}
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const weatherAPI = ''
const forecastAPI = ''

//01b7bdc37404b6f3860ddce923c61a11

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=01b7bdc37404b6f3860ddce923c61a11"
  )
  .then(response => {
    return response.json()

  .then(json => {
    console.log(json)
  })
  })