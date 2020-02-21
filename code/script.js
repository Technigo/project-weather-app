const apiToday = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b'
const apiForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b'
const bodyContainer = document.getElementById('body')
const topContainer = document.getElementById('top-container')
const todayContainer = document.getElementById('todayname')
const todayWeatherContainer = document.getElementById('todayweather')
const sunriseContainer = document.getElementById('sunrisetime')
const sunsetContainer = document.getElementById('sunsettime')
const cityContainer = document.getElementById('citycontainer')
const forecastContainer = document.getElementById('forecast-container')


fetch(apiToday)
  .then((response) => {
    return response.json()
  })
  .then((weatherArray) => {
    console.log(weatherArray)
    //day
    const today = new Date(weatherArray.dt * 1000)
    const todayName = today.toLocaleDateString('en-SE', { weekday: 'long' })
    todayContainer.innerHTML += `<p>${todayName}</p>`
    //temperature
    const temperature = Math.round(weatherArray.main.temp * 10) / 10
    //description of the weather
    weatherArray.weather.forEach((weatherInfo) => {
      todayWeatherContainer.innerHTML += `<p>${weatherInfo.description} ⎮ ${temperature}°C</p>`
    })
    //sunrise and sunset
    const sunrise = new Date(weatherArray.sys.sunrise * 1000) // fetch the string of sunrise
    const sunriseTimeString = sunrise.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    const sunset = new Date(weatherArray.sys.sunset * 1000) // fetch the string of sunset
    const sunsetTimeString = sunset.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    sunriseContainer.innerHTML += `<p>Sunrise ${sunriseTimeString}</p>`
    sunsetContainer.innerHTML += `<p>Sunset ${sunsetTimeString}</p>`
    //toggle the background color, font color, the message and the weather icon depending on the weather description
    const backgroundToggle = () => {
      const weatherDescription = weatherArray.weather[0].description
      if (weatherDescription.includes("clouds") || weatherDescription.includes("snow")) {
        bodyContainer.classList.toggle("cloudy");
        cityContainer.innerHTML += `<img src="icons/cloudy.svg"> <h1> Light a fire and get cosy. ${weatherArray.name} is looking grey today.</h1>`
      }
      else if (weatherDescription.includes("rain")) {
        bodyContainer.classList.toggle("rainy");
        cityContainer.innerHTML += `<img src="icons/rainy.svg"> <h1> Don't forget your umbrella today. It's wet in ${weatherArray.name} today.</h1>`
      }
      else if (weatherDescription.includes("clear")) {
        bodyContainer.classList.toggle("sunny");
        cityContainer.innerHTML += `<img src="icons/sunny.svg"> <h1> Get your sunnies on. ${weatherArray.name} is looking rather great today.</h1>`
      }
    }
    backgroundToggle();
  })

fetch(apiForecast)
  .then((response) => {
    return response.json()
  })
  .then((forecastArray) => {
    const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    // make forEach function here
    filteredForecast.forEach((forecastArray) => {
      // define date here
      const forecastDay = new Date(forecastArray.dt_txt)
      const forcastDayString = forecastDay.toLocaleDateString('en-SE', { weekday: 'short' })
      // define the main temperature here
      const forecastTemp = Math.round(forecastArray.main.temp * 10) / 10
      // define the weather description here
      const forecastWeather = forecastArray.weather[0].description
      // define the weather icon here
      const weatherIcon = (forecastArray.weather[0].icon)
      // print out date, weather icon, weather description and the main temperature here
      forecastContainer.innerHTML += `<div class="forecast-box"><p>${forcastDayString}</p> <p><img src="http://openweathermap.org/img/w/${weatherIcon}.png"/></p> <p>${forecastWeather}</p> <p> ${forecastTemp}°C </p> </div>`
    })
  })




