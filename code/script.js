const container = document.getElementById("weather")

const sunStatus = document.getElementById("sunStatus")

const sunRise = document.getElementById("sunRise")
const sunSet = document.getElementById("sunSet")

const weatherForecast = "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en"
// console.log(weatherForecast)

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,se&units=metric&APPID=44527f8be39feab9d034d48604c6b81d&lang=en')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    //console.log(json) // checking the json from open weather
    container.innerHTML = `<h1>${json.name} & Temp is: ${json.main.temp.toFixed(1)}°C (using toFixed)</h1>`
    json.weather.forEach((sky) => {
      container.innerHTML += `<h1>Weather type is: ${sky.description} </h1>`
    });
    // sunStatus.innerHTML = `<h1>Sunrise: ${json.sys.sunrise} and Sunset: ${json.sys.sunset}</h1>`
    // console.log(weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    // console.log(weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' }))
    sunRise.innerHTML = (weather.sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
      timeStyle: 'short'
    }))
    sunSet.innerHTML = (weather.sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
      timeStyle: 'short'
    }))
  })

