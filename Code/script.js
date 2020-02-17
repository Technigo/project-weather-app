// APIs links
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=1c5c00b108885200d83efb308cec13d8"
const forecastWeatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=helsinki&appid=1c5c00b108885200d83efb308cec13d8"

// Data storage
const weather = {}
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// DOM elements
const header = document.getElementById('header')
const headerCaption = document.getElementById('headerCaption')
const figure = document.getElementById('figure')
const forecastWeather = document.getElementById('forecast')


/*  ---- CURRENT WEATHER ---- */

// Fetch data of current weather
fetch(currentWeatherAPI)

  .then((response) => {
    return response.json()
  })

  .then((jsonFile) => {
    weather.location = jsonFile.name
    weather.temp = (jsonFile.main.temp / 100).toFixed(1)
    weather.description = jsonFile.weather[0].description
    weather.code = jsonFile.weather[0].id

    let sunrise = new Date((jsonFile.sys.sunrise + jsonFile.timezone) * 1000)
    weather.sunriseTime = sunrise
    sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short', timeZone: "UTC" })
    weather.sunrise = sunriseTime

    let sunset = new Date((jsonFile.sys.sunset + jsonFile.timezone) * 1000)
    sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short', timeZone: "UTC" })
    weather.sunset = sunsetTime

    let currentTime = new Date()
    weather.day = currentTime.toLocaleTimeString([], { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Helsinki" })

    printWeather()
  })

// Print current weather onto DOM
const printWeather = () => {
  header.innerHTML = `
    <h2>${weather.day}</h2>
    <h1>Weather in ${weather.location}</h1>
    `
  headerCaption.innerHTML = `
    <img src="/Assets/Icons/temperature.png" alt=""> ${weather.temp} &#8451;
    <img src="/Assets/Icons/sunrise.png" alt="">${weather.sunrise}
    <img src="/Assets/Icons/sunset.png" alt="">${weather.sunset}
    `
  weatherImage()
}

// Weather images
const weatherImage = () => {
  let code = weather.code
  if (code < 300) {
    figure.innerHTML = `<img src="/Assets/thunder.png" alt="">`
    figureCaption.innerHTML = `Not sure if just a thunderstorm, or if we're being invaded by Russia. However, stay inside it will be ${weather.description}!`
  }
  else if (code < 600) {
    figure.innerHTML = `<img src="/Assets/rainy.png" alt="">`
    figureCaption.innerHTML = `Why does Snoop Dog always have an umbrella? Fo'Drizzle! Yo, you should too, it will be ${weather.description} fo'shizzle!`
  }
  else if (code < 700) {
    figure.innerHTML = `<img src="/Assets/snowy.png" alt="">`
    figureCaption.innerHTML = `Hipster ice: I was water before it got cool. Soo, just for your information, it will be some ${weather.description}`
  }
  else if (code < 800) {
    figure.innerHTML = `<img src="/Assets/windy.png" alt="">`
    figureCaption.innerHTML = `Here in ${weather.location} you're mostly experiencing some ${weather.description}`
  }
  else if (code == 800) {
    figure.innerHTML = `<img src="/Assets/sunny.png" alt="">`
    figureCaption.innerHTML = `Here in ${weather.location} you're mostly experiencing some ${weather.description}`
  }
  else {
    figure.innerHTML = `<img src="/Assets/cloudy.png" alt="">`
    figureCaption.innerHTML = `Oh, for crying out cloud! You're mostly experiencing some ${weather.description} today.`
  }
}


/*  ---- FORECAST WEATHER ---- */

// Fetch data of forecast weather
fetch(forecastWeatherAPI)
  .then((response) => {
    return response.json()
  })
  .then((jsonFile) => {
    const filteredJsonFile = jsonFile.list.filter(item => item.dt_txt.includes('12:00'))

    filteredJsonFile.forEach(day => {
      const date = new Date(day.dt * 1000)
      let weekDay = days[date.getDay()]
      forecastWeather.innerHTML += `
      <div class="weekday">
      <p>${weekDay}</p>
      <p>${(day.main.temp / 100).toFixed(2)} &#8451;</p>
      <p>${day.weather[0].description}</p>
      </div>`
    })
  })


/*  ---- BACKGROUND ANIMATION ---- */
