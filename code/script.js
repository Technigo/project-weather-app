// Get time now to select style on first page
const date = new Date()
const hour = date.getHours()

// if statement to select background depending on day/night
if (hour >= 7 && hour <= 19) {
  body.classList.remove('night')
  body.classList.add('day')
} else if (hour > 19 && hour <= 24) {
  body.classList.add('night')
  body.classList.remove('day')
} else if (hour >= 00 && hour < 7) {
  body.classList.add('night')
  body.classList.remove('day')
} else {
  body.classList.remove('day')
  body.classList.remove('night')
}



// function for getting weather information of selected city
const showWeather = (city) => {

  //API urls
  const apiWeatherNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=4f8ae6784fc23b54e2eafb5042b5bd11`
  const apiWeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&units=metric&APPID=4f8ae6784fc23b54e2eafb5042b5bd11`

  // DOM selectors todays weather
  const header = document.getElementById('header')
  const citySelector = document.getElementById('citySelector')
  const weather1container = document.getElementById('weather1')
  const weather2container = document.getElementById('weather2')
  const sunContainer = document.getElementById('sun')

  // DOM selectors forecast
  const forecastHeader = document.getElementById('forecastHeader')
  const forecastDay = document.getElementById('forecastDay')
  const forecastTemperature = document.getElementById('forecastTemperature')
  const forecastDescription = document.getElementById('forecastDescription')
  const forecastIcon = document.getElementById('forecastIcon')
  const forecastWind = document.getElementById('forecastWind')

  // Fetch todays information of selected city
  fetch(apiWeatherNow)
    .then((response) => {
      return response.json()
    })
    .then((weatherNow) => {
      console.log(weatherNow)

      // VARIABLES

      // Day of today
      const dateStamp = new Date()
      const today = dateStamp.toLocaleDateString('en-gb', { weekday: 'long' })

      // Convert temperature to two decimals
      const temp = weatherNow.main.temp
      const tempRounded = Math.round(temp * 10) / 10

      // Concvert sunrise to hours and minutes
      const sunriseDate = new Date(weatherNow.sys.sunrise * 1000)
      const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      // Concvert sunset to hours and minutes
      const sunsetDate = new Date(weatherNow.sys.sunset * 1000)
      const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      // Set variable for icon
      const iconId = weatherNow.weather[0].icon
      const icon = `http://openweathermap.org/img/w/${iconId}.png`

      // CHANGING THE DOM

      // Remove classes when changing to new city
      body.classList.remove('day')
      body.classList.remove('night')
      body.classList.remove('cold')
      body.classList.remove('warm')
      body.classList.remove('hot')


      // Background color depending on temperature
      if (tempRounded < 10) {
        body.classList.add('cold')
      } else if (tempRounded >= 10 && tempRounded < 20) {
        body.classList.add('warm')
      } else {
        body.classList.add('hot')
      }


      // Add information to DOM depending on selected city

      // Add todays date
      weather1container.innerHTML = `
      <h2 class="today">${today}</h2>
      `
      // Add info about temperature, description of weather and icon
      weather2container.innerHTML = `
      <h1 class="todays-temp">${tempRounded} °C</h1>
      <h3 class="weather-description">${weatherNow.weather[0].description}</h3>
      <img class="weather-icon" src=${icon} />
      `

      // Add time for sunrise and sunset to the div sun
      sunContainer.innerHTML = `
      <h4>Sunrise ${sunriseTime}</h4>
      <h4>Sunset ${sunsetTime}</h4>
      `
    })


  // Forecast fetch

  fetch(apiWeatherForecast)
    .then((response) => {
      return response.json()
    })
    .then((forecastArray) => {

      // Filter the result to only get info for time 12.00
      const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'))

      // Clear DOM before adding new info from new selected city
      forecastHeader.innerHTML = ''
      forecastDay.innerHTML = ''
      forecastIcon.innerHTML = ''
      forecastDescription.innerHTML = ''
      forecastTemperature.innerHTML = ''
      forecastWind.innerHTML = ''


      // For each loop to get information from each day (item)
      filteredForecast.forEach((item) => {

        // Set variable for day (i.e. Mon, Tue, Wed etc)
        const date = new Date(item.dt_txt)
        const day = date.toLocaleDateString('en-gb', { weekday: 'short' })

        // Set variable for temperature
        const forecastTemp = item.main.temp
        const forecasTempRounded = Math.round(forecastTemp * 10) / 10

        // Set variable for desription of weather
        const description = item.weather[0].description

        // Set variable for wind speed
        const wind = item.wind.speed
        const windRounded = Math.round(wind * 10) / 10

        // Set variable for icon
        const iconIdForecast = item.weather[0].icon
        const iconForecast = `http://openweathermap.org/img/wn/${iconIdForecast}.png`

        // Print information to DOM
        forecastHeader.innerHTML = `<h3> 5 day forecast</h3>`
        forecastDay.innerHTML += `<p>${day}</p>`
        forecastIcon.innerHTML += `<img src=${iconForecast} />`
        forecastDescription.innerHTML += `<p>${description}</p>`
        forecastTemperature.innerHTML += `<p>${forecasTempRounded} °C</p>`
        forecastWind.innerHTML += `<p>${windRounded} mm/s</p>`
      })

    })

  // End tag of function for getting weather information of selected city in select/dropdown
}

// Invoke function for selected city
citySelector.addEventListener("change", () => showWeather(citySelector.value))

