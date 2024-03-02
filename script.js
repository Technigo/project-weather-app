const actualWeather = document.getElementById('actualWeather')
const weatherDescription = document.getElementById('weatherDescription')
const forecastList = document.getElementById('forecastList')
const body = document.getElementById('body')
const navContainer = document.getElementById('navContainer')
const thunderAudio = document.getElementById('thunderAudio')
const rainAudio = document.getElementById('rainAudio')
const sunnyAudio = document.getElementById('sunnyAudio')
//variables
let currentDate
let currentDay
let currentTime
let API_URL = `https://api.openweathermap.org`
let API_KEY = `1c745605f5cf52ece2c729289e47acc7`
let lat = 47.3744489 //default
let lon = 8.5410422 //default

// added in HTML select and search bar
navContainer.innerHTML = `  <label for="favoriteCities">Choose a city :</label>
<select id="favoriteCities">
  <option  disabled selected value="city">City</option>
  <option value="rome">Rome</option>
  <option value="london">London</option>
  <option value="new-york">New York</option>
  <option value="cold-lake">Cold Lake</option>
</select>
<label for="searchCity">Search for a city :</label>
<input type="text" id="searchCity" placeholder="Enter city name">
<button>Search</button>`

// function to get the daily weather
const getWeather = (lat, lon) => {
  fetch(
    `${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const timezone = data.timezone // Get timezone data

      const weather = data.weather.map((condition) => condition.description)
      const mainKeyValues = Object.values(data.main)
      const temperature = Math.round(mainKeyValues[0])
      const sunriseTime = new Date(data.sys.sunrise * 1000)
      const sunsetTime = new Date(data.sys.sunset * 1000)

      // get time based on timezone to display as local time
      sunriseTime.setUTCSeconds(sunriseTime.getUTCSeconds() + timezone)
      sunsetTime.setUTCSeconds(sunsetTime.getUTCSeconds() + timezone)

      // fixed numbers
      const sunrise = `${sunriseTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${sunriseTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
      const sunset = `${sunsetTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${sunsetTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`

      // populate div=actualWeather
      actualWeather.innerHTML = `
      <h1>${data.name}</h1>

     <h2 class="weather-conditions">${weather} | ${temperature} ° </h2><p class="sunset-sunrise"> Sunrise ${sunrise} ⇈</p>
     <p class="sunset-sunrise"> Sunset ${sunset} ⇊</p>`

      const weatherConditions = data.weather.map((condition) => {
        return (weathergroup = condition.id)
      })

      // styled based on weather condition
      weatherConditions.forEach((condition) => {
        switch (true) {
          // HTML for thunderstorms
          case condition >= 200 && condition <= 232:
            document.body.style.backgroundColor = '#212f54'
            document.body.style.color = '#FFD43B'
            controls.style.display = 'none'
            document.getElementById('thunderAudio').controls = true
            document.getElementById('rainAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.remove('snow-day')
            body.classList.remove('cloudy-day')
            weatherDescription.innerHTML = `<i class="fa-solid fa-bolt fa-xl" style="color: #FFD43B;"></i><h3> Hold onto your hats.<br> ${data.name} is facing some stormy weather today.</h3>`
            thunderAudio.play()
            break

          // HTML for drizzle
          case condition >= 300 && condition <= 321:
            document.body.style.backgroundColor = '#e6638b'
            document.body.style.color = '#63E6BE'
            document.getElementById('rainAudio').controls = false
            document.getElementById('thunderAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.remove('snow-day')
            body.classList.remove('cloudy-day')
            weatherDescription.innerHTML = `<i class="fa-solid fa-cloud-rain fa-xl" style="color: #63E6BE;"></i><h3> Don't forget your raincoat.<br> ${data.name} is graced with a light drizzle today.</h3> `
            break

          // HTML for rainy days
          case condition >= 500 && condition <= 531:
            document.body.style.backgroundColor = '#BDE8FA'
            document.body.style.color = '#164A68'
            document.getElementById('rainAudio').controls = true
            document.getElementById('thunderAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.remove('snow-day')
            body.classList.remove('cloudy-day')
            weatherDescription.innerHTML = `<img src="./assets/noun_Umbrella_2030530.svg"><h3> Don't forget your umbrella. <br>It's wet in ${data.name} today.</h3> `
            rainAudio.play()

            break

          // HTML for snowy days
          case condition >= 600 && condition <= 622:
            document.body.style.backgroundColor = '#015C92'
            document.body.style.color = '#fcfcfc'
            document.getElementById('rainAudio').controls = false
            document.getElementById('thunderAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.add('snow-day')
            body.classList.remove('cloudy-day')
            weatherDescription.innerHTML = `<i class="fa-regular fa-snowflake fa-xl" style="color: #fcfcfc;"></i><h3> Put on your mittens. <br>${data.name} is looking quite enchanting today with its snowfall. </h3> `
            break

          // HTML for foggy/mist days
          case condition >= 701 && condition <= 781:
            document.body.style.backgroundColor = '#fbfafe'
            document.body.style.color = '#B197FC'
            document.getElementById('rainAudio').controls = false
            document.getElementById('thunderAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.remove('snow-day')
            body.classList.remove('cloudy-day')
            weatherDescription.innerHTML = `<i class="fa-solid fa-smog fa-xl" style="color: #B197FC;"></i><h3> Navigate through the mist.<br> ${data.name} is draped in a mysterious haze today. </h3> `
            break

          // HTML for sunny days
          case condition === 800:
            document.body.style.backgroundColor = '#F7E9B9'
            document.body.style.color = '#2A5510'
            body.classList.remove('snow-day')
            body.classList.remove('cloudy-day')
            document.getElementById('sunnyAudio').controls = true
            document.getElementById('rainAudio').controls = false
            document.getElementById('thunderAudio').controls = false
            weatherDescription.innerHTML = `<img src="./assets/noun_Sunglasses_2055147.svg"><h3> Get your sunnies on.<br> ${data.name} is looking rather great today. </h3>`
            sunnyAudio.play()
            break

          // HTML for cloudy days
          case condition >= 801 && condition <= 804:
            document.body.style.backgroundColor = 'white'
            document.body.style.color = '#F47775'
            document.getElementById('rainAudio').controls = false
            document.getElementById('thunderAudio').controls = false
            document.getElementById('sunnyAudio').controls = false
            body.classList.add('cloudy-day')
            body.classList.remove('snow-day')
            weatherDescription.innerHTML = `<img src="./assets/noun_Cloud_1188486.svg"><h3> Light a fire and get cozy.
            <br>${data.name} is looking grey today.</h3> `
            break
          default:
            console.log('error')
            break
        }
      })
    })
    .catch((error) => console.error(error))
}

// function to get forecast
const getForecast = (lat, lon) => {
  fetch(
    `${API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const weekDayFromTwelve = data.list.filter((item) => {
        const dateTime = item.dt_txt
        const fullDate = new Date(dateTime)
        const currentTime = fullDate.getUTCHours()

        return currentTime === 11 // Filter for 11:00:00
      })

      // convert the number of the date with name of the week
      const dates = weekDayFromTwelve.map((item) => {
        const dateTime = item.dt_txt
        const fullDate = new Date(dateTime)
        const currentDate = fullDate.getDay()
        console.log(currentDate)
        let currentDay
        switch (currentDate) {
          case 0:
            currentDay = `Sun`
            break
          case 1:
            currentDay = `Mon`

            break
          case 2:
            currentDay = `Tue`
            break
          case 3:
            currentDay = `Wed`
            break
          case 4:
            currentDay = `Thu`
            break
          case 5:
            currentDay = `Fri`
            break
          case 6:
            currentDay = `Sat`
            break
          default:
            console.log('error')
            break
        }
        return currentDay
      })

      // rounded actual temperature
      actualTemp = weekDayFromTwelve.map((condition) => {
        let valueTemp = Math.round(condition.main.temp)
        return valueTemp
      })

      // Clear existing content
      forecastList.innerHTML = ''

      // Loop through dates and actualTemp arrays simultaneously
      for (let i = 0; i < Math.min(dates.length, actualTemp.length); i++) {
        forecastList.innerHTML += `<div class=forecast-container><li>${dates[i]} </li><span> ${actualTemp[i]} °C </span></div>`
      }
    })

    .catch((error) => console.error(error))
}

getForecast(lat, lon)
getWeather(lat, lon)

//handle selected city
const handleCity = () => {
  const citySelect = document.getElementById('favoriteCities')

  citySelect.addEventListener('change', (event) => {
    const city = event.target.value
    // prevent audio to be played
    rainAudio.pause()
    sunnyAudio.pause()
    thunderAudio.pause()
    getWeatherCities(city)
  })
}

handleCity()

// handle city input
const handleCityInput = (event) => {
  event.preventDefault() // Prevent form submission
  const cityInput = document.getElementById('searchCity')
  const city = cityInput.value
  // prevent audio to be played
  rainAudio.pause()
  sunnyAudio.pause()
  thunderAudio.pause()
  // validation for cities
  if (/^[a-zA-Z\s-]+$/.test(city)) {
    getWeatherCities(city)
    cityInput.value = ''
  } else {
    console.log('Please enter a city name.')
  }
}

// event listener
const searchButton = document.querySelector('button')
searchButton.addEventListener('click', handleCityInput)

// fetched Geocoding API
const getWeatherCities = (city) => {
  fetch(`${API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      lat = data[0].lat
      lon = data[0].lon
      getForecast(lat, lon)
      getWeather(lat, lon)
    })
    .catch((error) => console.error(error))
}

// function to geolocate
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    body.innerHTML = 'Geolocation is not supported by this browser.'
  }
}

const showPosition = (position) => {
  lat = position.coords.latitude
  lon = position.coords.longitude
}
