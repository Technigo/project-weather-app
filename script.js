const cities = ['San Jose', 'New York', 'Los Angeles', 'Taipei', 'Gothenburg']
let currentIndex = 0

const API_KEY = "248332e11aac477643699fc267736540"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?"
const city = "Stockholm"
const URL = `${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`
const FORECAST_URL = `${FORECAST_BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`

//DOM selectors
const cityName = document.getElementById("city-name")
const weather = document.getElementById("current-weather")
const temperature = document.getElementById("current-temperature")
const sunriseElement = document.getElementById("sunrise-time")
const sunsetElement = document.getElementById("sunset-time")
const weatherIcon = document.getElementById("main-icon")
const forecastContainer = document.getElementById('forecast')
const searchInput = document.getElementById('search-input')
const searchIcon = document.getElementById('input-search-icon')
const arrowIcon = document.getElementById('arrow')

// Function to capitalize first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Function to format timestamp properly
const formatTime = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

// Display today's weather
const updateHTML = (data) => {

  const currentCity = data.name
  const currentWeather = capitalizeFirstLetter(data.weather[0].description)
  const currentTemp = Math.round(data.main.temp)
  const timezoneOffset = data.timezone
  const sunriseTimestamp = formatTime(data.sys.sunrise, timezoneOffset)
  const sunsetTimestamp = formatTime(data.sys.sunset, timezoneOffset)
  const currentIcon = data.weather[0].icon

  cityName.innerText = currentCity
  weather.innerText = currentWeather
  temperature.innerHTML = `${currentTemp}`
  sunriseElement.innerText = sunriseTimestamp
  sunsetElement.innerText = sunsetTimestamp
  weatherIcon.src = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
}

// Display 5 day forecast
const updateForecastHTML = (data) => {
  forecastContainer.innerHTML = '' // Clear previous forecast
  const forecastArray = data.list

  // Group forecasts by day
  const dailyForecasts = {}
  forecastArray.forEach(entry => {
    const date = new Date(entry.dt * 1000)
    const day = date.toLocaleDateString('en-SE', { weekday: 'short' })
    const today = new Date().toLocaleDateString('en-SE', { weekday: 'short' })
    if (day === today) return // Skip today's forecast
    if (!dailyForecasts[day]) {
      dailyForecasts[day] = []
    }
    dailyForecasts[day].push(entry)
  })

  // Process each day's forecast
  Object.keys(dailyForecasts).forEach(day => {
    const forecasts = dailyForecasts[day]
    let tempHigh = -Infinity
    let tempLow = Infinity
    let icon = forecasts[0].weather[0].icon

    forecasts.forEach(forecast => {
      if (forecast.main.temp_max > tempHigh) {
        tempHigh = forecast.main.temp_max
      }
      if (forecast.main.temp_min < tempLow) {
        tempLow = forecast.main.temp_min
      }
    })

    const forecastRow = document.createElement('div')
    forecastRow.classList.add('forecast-row')
    forecastRow.innerHTML = `
          <div class="forecast-day">${day}</div>
          <div class="forecast-icon">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt=${forecasts[0].weather[0].description}>
          </div>
          <div class="forecast-temp">${Math.round(tempHigh)} / ${Math.round(tempLow)}°C</div>
          `
    forecastContainer.appendChild(forecastRow)
  })
}

// Toggle search icon to reveal search bar
const toggleSearch = () => {
  const toggleIcon = document.getElementById('toggle-icon')
  const searchBox = document.getElementById('search-box')

  // Toggle search box visiblity
  if (searchBox.classList.contains('hidden')) {
    searchBox.classList.remove('hidden')
    searchBox.classList.add('show')
  } else {
    searchBox.classList.remove('show')
    searchBox.classList.add('hidden')
  }
  // Switch between search and close icon
  if (toggleIcon.classList.contains('fa-search')) {
    toggleIcon.classList.remove('fa-search')
    toggleIcon.classList.add('fa-times')
  } else {
    toggleIcon.classList.remove('fa-times')
    toggleIcon.classList.add('fa-search')
  }
}

// Fetch and display weather data for a searched city
const fetchWeatherData = (city) => {
  const SEARCH_URL = `${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`
  const SEARCH_FORECAST_URL = `${FORECAST_BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`

  fetch(SEARCH_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      updateHTML(data)
    })
    .catch(error => console.error('Error:', error))


  fetch(SEARCH_FORECAST_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      updateForecastHTML(data)
    })
    .catch(error => console.error('Error:', error))
}

// Event listener for search input
const addSearchEventListener = (element, eventType) => {
  element.addEventListener(eventType, () => {
    const searchCity = searchInput.value;
    fetchWeatherData(searchCity);
    searchInput.value = ''
  });
};

addSearchEventListener(searchIcon, 'click');

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    fetchWeatherData(searchInput.value);
    searchInput.value = ''
  }
});

// Cycle through city array
const cycleCities = () => {
  fetchWeatherData(cities[currentIndex])
  currentIndex = (currentIndex + 1) % cities.length
}

arrowIcon.addEventListener('click', cycleCities)

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    updateHTML(data) //Call updateHTML with the fetched data
  })
  .catch(error => console.error('Error:', error))

fetch(FORECAST_URL)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    updateForecastHTML(data)
  })
  .catch(error => console.error('Error:', error))

