// APIs links
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=1c5c00b108885200d83efb308cec13d8"
const forecastWeatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=helsinki&appid=1c5c00b108885200d83efb308cec13d8"

// Data storage
const weather = {}
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


// DOM elements
const currentWeather = document.getElementById('current')
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

    let sunrise = new Date((jsonFile.sys.sunrise + jsonFile.timezone) * 1000)
    weather.sunriseTime = sunrise
    sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short', timeZone: "UTC" })
    weather.sunrise = sunriseTime

    let sunset = new Date((jsonFile.sys.sunset + jsonFile.timezone) * 1000)
    sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short', timeZone: "UTC" })
    weather.sunset = sunsetTime

    printWeather()
  })

// Print current weather onto DOM
const printWeather = () => {
  currentWeather.innerHTML = `
      <div>
          ${weather.location}
          ${weather.temp}
          ${weather.description}
          ${weather.sunrise}
          ${weather.sunset}

      </div>
    `
}

// Weather images



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
