// APIs links
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=1c5c00b108885200d83efb308cec13d8"

// Data storage
const weather = {}


// Fetch data

fetch(currentWeatherAPI)

  .then((response) => {
    return response.json()
  })

  .then((jsonFile) => {
    weather.city = jsonFile.name
    weather.temp = (jsonFile.main.temp / 100).toFixed(1)
    weather.description = jsonFile.weather[0].description
    console.log(weather)
  })



