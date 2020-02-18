const weatherBackground = document.getElementById('weather')
const cityContainer = document.getElementById('city')
const weatherPic = document.getElementById('weatherImage')
const tempContainer = document.getElementById('temp')
const descriptionContainer = document.getElementById('description')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')
const forecastContainer = document.getElementById('forecast')
const currentTime = new Date().toLocaleTimeString()
let weatherIcon

// Current weather
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // Display city name
    cityContainer.innerHTML = json.name

    // Display current temp
    tempContainer.innerHTML = `${json.main.temp.toFixed(1)}&#730`

    // Display current weather description
    descriptionContainer.innerHTML = `${json.weather[0].description} | ${json.main.temp_max.toFixed(1)}&#730 / <span class="min-temp">${json.main.temp_min.toFixed(1)}&#730</span>`

    // Display sunrise and sunset times
    const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    sunriseContainer.innerHTML += sunriseTime
    sunsetContainer.innerHTML += sunsetTime

    // Determine if it is day or night, used when picking background and icon
    let dayTime
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      dayTime = true
    }

    // Determine which weather icon to display
    const weatherId = json.weather[0].id

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

    weatherPic.innerHTML = `${weatherIcon}`

    // Determine which background to display
    if (weatherId === 800 && dayTime) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/clear-day.jpg")' //Clear day
    } else if (weatherId === 800 && !dayTime) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/clear-night.jpg")' //Clear night
    } else if (weatherId === 801 || weatherId === 802 && dayTime) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/cloud-day.jpg")' //Cloud day
    } else if (weatherId === 801 || weatherId === 802 && !dayTime) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/cloud-night.jpg")' //Cloud night
    } else if (weatherId === 803 || weatherId === 804) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/overcast.jpg")' //Broken or overcast clouds
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/fog.jpg")' //Atmosphere mist, dust, fog etc.
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/snow.jpg")' //Snow
    } else if (weatherId >= 300 && weatherId < 600) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/snow.jpg")' //Rain
    } else if (weatherId >= 200 && weatherId < 300) {
      weatherBackground.style.backgroundImage = 'url("./assets/backgrounds/rain.jpg")' //Thunderstorm
    }
  })

  .catch((err) => {
    console.log("caught error", err)
  })

// 5-day forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    // Filter the api list to only display UTC 12:00
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((day) => {
      // Used to display day of week later
      const dayOfWeek = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })

      // Used to display icon later
      const weatherId = day.weather[0].id

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

      // Display day, icon and temp in forecast section
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
