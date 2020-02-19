const introText = document.querySelector('#intro')
const citySelectBox = document.querySelector('#cities')
const city = document.querySelector('#city')
const temp = document.querySelector('#temperature')
const description = document.querySelector('#description')
const wind = document.querySelector('#wind')
const todaysWeatherTable = document.querySelector('#today')
const forecastContainer = document.querySelector('#forecast')

// Add random background color to body just for fun
const randomColor = Math.floor(Math.random() * 16777215).toString(16);
const randomBgColor = `#${randomColor}`
document.body.style.backgroundColor = randomBgColor

const selectCity = () => {
  let userCity = citySelectBox.options[citySelectBox.selectedIndex].value

  // Remove intro text after button is clicked
  if (introText) introText.remove()

  // Todays weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity},Sweden&units=metric&APPID=302165d90858a8a500d4198d9bc63d2b`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {

      // Convert milliseconds to HH:MM
      const timeFormat = (ms) => {
        let time = new Date(ms * 1000).toLocaleTimeString([], {
          timeStyle: 'short'
        })
        return time
      }

      // Remove all classes from body
      document.body.className = ''
      document.body.style = ''

      // Change body background color depending on current temperature
      const currentTemp = +json.main.temp.toFixed(0)

      if (currentTemp < -10) {
        document.body.classList.add('bg-color-cold')
      } else if (currentTemp < -5) {
        document.body.classList.add('bg-color-cool')
      } else if (currentTemp <= 0) {
        document.body.classList.add('bg-color-minus')
      } else if (currentTemp < 10) {
        document.body.classList.add('bg-color-plus')
      } else if (currentTemp <= 20) {
        document.body.classList.add('bg-color-warm')
      } else {
        document.body.classList.add('bg-color-hot')
      }

      // Capitalize first letter of string
      const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }

      // Print out to DOM
      city.innerHTML = json.name
      temp.innerHTML = `${json.main.temp.toFixed(1)}° <div class="icon">${weatherIcon(json.weather[0].main)}</div>`
      description.innerHTML = capitalize(json.weather[0].description)

      todaysWeatherTable.innerHTML = `
        <tr><td>Wind:</td><td>${json.wind.speed.toFixed(1)} m/s</td></tr>
        <tr><td>Sunrise:</td><td>${timeFormat(json.sys.sunrise)}</td></tr>
        <tr><td>Sunset:</td><td>${timeFormat(json.sys.sunset)}</td></tr>
      `
    })
    .catch((err) => {
      console.log('oops error', err)
    })


  // 5 day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=metric&appid=302165d90858a8a500d4198d9bc63d2b`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      // Filter the forecast list array to get info from 06:00 each day
      const filteredForecast = json.list.filter(item => item.dt_txt.includes('06:00'))

      forecastContainer.innerHTML = ''

      // Loops through filteredForecast
      filteredForecast.forEach(day => {

        // Return weekday
        let date = new Date(day.dt * 1000)
        let weekday = date.toLocaleDateString('en-US', {
          weekday: 'short'
        })

        forecastContainer.innerHTML += `
          <tr>
            <td>${weekday} </td>
            <td>${day.main.temp.toFixed(1)}° </td>
            <td>${weatherIcon(day.weather[0].main)}</td>
            <td>${day.wind.speed.toFixed(1)}m/s</td>
          </tr>`
      })

    })
    .catch((err) => {
      console.log('oops error', err)
    })

}

citySelectBox.addEventListener('change', selectCity)


// Show icon based on weather description
const weatherIcon = (description) => {
  switch (description) {
    case 'Clear':
      return '🌤'
      break
    case 'Clouds':
      return '☁️'
      break
    case 'Drizzle':
      return '⛈'
      break
    case 'Rain':
      return '🌧'
      break
    case 'Snow':
      return '🌨'
      break
    case 'Thunderstorm':
      return '🌩'
      break
    default:
      return '🌫'
  }
}

/*
// Geolocation test – getLocation() returns url with coordinates of current location

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

const showPosition = (position) => {
  let coordLat = position.coords.latitude
  let coordLong = position.coords.longitude
  let newApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordLat}&lon=${coordLong}&appid=302165d90858a8a500d4198d9bc63d2b`

  console.log(newApiUrl)
  return newApiUrl
}

getLocation()

// Geo location button on click
document.querySelector('#geo').addEventListener('click', btnClicked)
*/