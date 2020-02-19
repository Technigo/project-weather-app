// API URL's
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe'
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe'

// DOM selectors
const weatherBackground = document.getElementById('weather')
const cityContainer = document.getElementById('city')
const weatherPic = document.getElementById('weatherImage')
const tempContainer = document.getElementById('temp')
const descriptionContainer = document.getElementById('description')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')
const forecastContainer = document.getElementById('forecast')
const currentTime = new Date().toLocaleTimeString()

// Global variable
let weatherIcon

// Current weather
fetch(weatherURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // variables
    const cityName = json.name
    const currentTemp = `${json.main.temp.toFixed(1)}&#730`
    const currentWeatherDescription = json.weather[0].description
    const maxTemp = json.main.temp_max.toFixed(1)
    const minTemp = json.main.temp_min.toFixed(1)
    const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const weatherId = json.weather[0].id
    let dayTime

    // Determine if it is day or night, used when picking background and icon
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      dayTime = true
    }

    // Determine which weather icon to display
    if (weatherId === 800 && dayTime) {
      weatherIcon = '<img src"./assets/white/039-sun.png" alt="sun">' //Clear day sun
    } else if (weatherId === 800 && !dayTime) {
      weatherIcon = '<img src="./assets/white/024-night-4.png" alt="moon">' //Clear night moon
    } else if (weatherId === 801 && dayTime) {
      weatherIcon = '<img src="./assets/white/038-cloudy-3.png" alt="sun and cloud">' //Few clouds day
    } else if (weatherId === 801 && !dayTime) {
      weatherIcon = '<img src="./assets/white/002-cloud-1.png" alt="sun and cloud">' //Few clouds night
    } else if (weatherId === 802) {
      weatherIcon = '<img src="./assets/white/011-cloudy.png" alt="two clouds">' //Scattered clouds
    } else if (weatherId === 803 || weatherId === 804) {
      weatherIcon = '<img src="./assets/white/001-cloud.png" alt="cloud">' //Broken or overcast clouds
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherIcon = '<img src="./assets/white/017-fog.png" alt="cloud with fog">' //Atmosphere mist, dust, fog etc.
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherIcon = '<img src="./assets/white/006-snowy.png" alt="cloud with snow">' //Snow
    } else if (weatherId >= 300 && weatherId < 600) {
      weatherIcon = '<img src="./assets/white/003-rainy.png" alt="cloud with rain">' //Rain
    } else if (weatherId >= 200 && weatherId < 300) {
      weatherIcon = '<img src="./assets/white/045-thunder.png" alt="thunder">' //Thunderstorm
    }

    // Determine which background to display
    if (weatherId === 800 && dayTime) {
      weatherBackground.classList.add("clear-day")
    } else if (weatherId === 800 && !dayTime) {
      weatherBackground.classList.add("clear-night")
    } else if (weatherId === 801 && dayTime || weatherId === 802 && dayTime) {
      weatherBackground.classList.add("cloud-day")
    } else if (weatherId === 801 && !dayTime || weatherId === 802 && !dayTime) {
      weatherBackground.classList.add("cloud-night")
    } else if (weatherId === 803 || weatherId === 804) {
      weatherBackground.classList.add("overcast")
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherBackground.classList.add("fog")
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherBackground.classList.add("snow")
    } else if (weatherId >= 300 && weatherId < 600) {
      weatherBackground.classList.add("rain")
    } else if (weatherId >= 200 && weatherId < 300) {
      weatherBackground.classList.add("thunder")
    }

    // Return and set innerHTML properties
    cityContainer.innerHTML = cityName
    tempContainer.innerHTML = currentTemp
    descriptionContainer.innerHTML = `${currentWeatherDescription} | ${maxTemp}&#730 / <span class="min-temp">${minTemp}&#730</span>`
    sunriseContainer.innerHTML += sunriseTime
    sunsetContainer.innerHTML += sunsetTime
    weatherPic.innerHTML = `${weatherIcon}`
  })

  .catch((err) => {
    console.log("caught error", err)
  })

// 5-day forecast
fetch(forecastURL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // Filter the api list to only display UTC 12:00
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((day) => {
      // Variables
      const dayOfWeek = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })
      const weatherId = day.weather[0].id

      // Determine which weather icon to display
      if (weatherId === 800) {
        weatherIcon = '<img src="./assets/color/039-sun.png" alt="sun">' //Clear day sun
      } else if (weatherId === 801) {
        weatherIcon = '<img src="./assets/color/038-cloudy-3.png" alt="sun and cloud">' //Few clouds
      } else if (weatherId === 802) {
        weatherIcon = '<img src="./assets/color/011-cloudy.png" alt="two clouds">' //Scattered clouds
      } else if (weatherId === 803 || weatherId === 804) {
        weatherIcon = '<img src="./assets/color/001-cloud.png" alt="cloud">' //Broken or overcast clouds
      } else if (weatherId >= 700 && weatherId < 800) {
        weatherIcon = '<img src="./assets/color/017-fog.png" alt="cloud with fog">' //Atmosphere mist, dust, fog etc.
      } else if (weatherId >= 600 && weatherId < 700) {
        weatherIcon = '<img src="./assets/color/006-snowy.png" alt="cloud with snow">' //Snow
      } else if (weatherId >= 300 && weatherId < 600) {
        weatherIcon = '<img src="./assets/color/003-rainy.png" alt="cloud with rain">' //Rain
      } else if (weatherId >= 200 && weatherId < 300) {
        weatherIcon = '<img src="./assets/color/045-thunder.png" alt="thunder">' //Thunderstorm
      }

      // Return and set innerHTML properties
      forecastContainer.innerHTML +=
        `<section class="dayForecast">
          <h2>${dayOfWeek.toUpperCase()}</h2>
          <p>${weatherIcon}</p>
          <p>${day.main.temp.toFixed(1)}&#730</p>
        </section>`
    })
  })

  .catch((err) => {
    console.log("caught error", err)
  })

// Function used to toggle credits
function toggle() {
  this.classList.toggle("active")
}

document.getElementById("credit").onclick = toggle
