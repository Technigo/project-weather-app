const cityName = document.querySelector('#city')
const todaysWeatherContainer = document.querySelector('#todaysWeather')
const forecastContainer = document.querySelector('#forecast')


const selectCity = () => {

  const citySelectBox = document.querySelector('#cities')
  let userCity = citySelectBox.options[citySelectBox.selectedIndex].value

  // Remove intro text after button is clicked
  const introText = document.querySelector('#intro')
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

      // Change body background color depending on current temperature
      const setBgColor = (bgCol) => {
        document.body.style.backgroundColor = bgCol
      }

      const currentTemp = +json.main.temp.toFixed(0)

      if (currentTemp < -10) {
        setBgColor('var(--color-cold)')
      } else if (currentTemp < -5) {
        setBgColor('var(--color-cool)')
      } else if (currentTemp <= 0) {
        setBgColor('var(--color-minus)')
      } else if (currentTemp < 10) {
        setBgColor('var(--color-plus)')
      } else if (currentTemp <= 20) {
        setBgColor('var(--color-warm)')
      } else {
        setBgColor('var(--color-hot)')
      }

      // Capitalize first letter of string
      const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }

      // Show icon based on weather description
      const weatherIcon = () => {
        switch (json.weather[0].main) {
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

      // Print out to DOM
      todaysWeatherContainer.innerHTML = `
        <h1 id="city">${json.name}</h1>
        <h2 id="temperature">${json.main.temp.toFixed(1)}° <div class="icon">${weatherIcon()}</div></h2>
        <h3 id="description">${capitalize(json.weather[0].description)}</h3>
        <p>Wind: ${json.wind.speed.toFixed(1)} m/s</p>
        <p>Sunrise: ${timeFormat(json.sys.sunrise)}</p>
        <p>Sunset: ${timeFormat(json.sys.sunset)}</p>
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
          <td>${day.wind.speed.toFixed(1)}m/s</td>
        </tr>`
      })

    })
    .catch((err) => {
      console.log('oops error', err)
    })

}

document.querySelector('#pickCityButton').addEventListener('click', selectCity)


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