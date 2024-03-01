// DOM selectors
const weatherNowContainer = document.getElementById('weather-now')
const forecastContainer = document.getElementById('forecast-container')
const backgroundDiv = document.getElementById('main')
const mainContainer = document.getElementById('main-container')
const searchButton = document.getElementById('search-btn')
const searchInput = document.getElementById('searchbar')

//Global scope
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?q='
const API_KEY = '9fd58fe4bdef8641db37b66e72207fcb'
const units = '&units=metric'
const URL = (city) => {
return `${BASE_URL}${city}${units}&appid=${API_KEY}`
}

const dayNames = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

//Fetching the API and converting to Json
const getData = (city) => {
  fetch(URL (city))
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      updateHtml(data)
      console.log(data)
      filterByTime(data)
    })
    .catch((error) => console.log(error))
  }

//default city when loading website
  getData('stockholm')


//Function to update HTML with forecast
const updateHtml = (data) => {
  const weather = data.list[0].weather[0].main
  const city = data.city.name
  const temp = Math.round(data.list[0].main.temp)
  //sunrise and sunset
  const rise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const set = new Date(data.city.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  weatherNowContainer.innerHTML = `<div class="title"><h2>${city}</h2></div>
  <div class="current-weather"><h1>${temp}<span> °C</span></h1>
  <h3>${weather}</h3></div>
  <div class="sunrise-sunset"><div class="up-n-down"><h4>Sunrise</h4><h4>Sunset</h4></div>
  <div class="time"><h4>${rise}</h4><h4>${set}</h4></div></div>`

  console.log(weather)
  styleAfterWeather(weather, temp)
}

//Function that styles the background and colors to fit weather
const styleAfterWeather = (weather, temp) => {
  if (weather === 'Clear' && temp >= 25) {
    backgroundDiv.style.backgroundImage = 'url(./design3/hot.desktop.16.9.jpg)'
  } else if (weather === 'Clouds') {
    backgroundDiv.style.backgroundImage = 'url(./design3/cloudy.desktop.16.9.jpg)'
  } else if (weather === 'Rain') {
    backgroundDiv.style.backgroundImage = 'url(./design3/rainy.desktop.16.9.jpg)'
  } else if (weather === 'Clear') {
    backgroundDiv.style.backgroundImage = 'url(./design3/sunny.desktop.16.9.jpg)'
  }
}

//mainContainer.style.backgroundColor = "rgba(197, 195, 191, 0.438)"
//   mainContainer.style.backgroundColor = "rgba(255, 223, 163, 0.438)"
//  mainContainer.style.backgroundColor = "rgba(0, 0, 0, 0.534)"
//mainContainer.style.backgroundColor = "rgba(255, 228, 174, 0.616)"

//Function to filter the arrays of daily forecast and only include each forecast at 12:00
const filterByTime = (data) => {
  const filteredForecast = data.list.filter((item) =>
    item.dt_txt.includes('12:00')
  )
  console.log(filteredForecast)
  forecastContainer.innerHTML = ''
  displayForecast(filteredForecast)
}

const displayForecast = (filteredForecast) => {
  filteredForecast.forEach((day) => {
    const forecastDate = new Date(day.dt * 1000)
    const dayIndex = forecastDate.getDay()
    const weekday = dayNames[dayIndex]
    const forecastTemp = Math.round(day.main.temp)
    console.log(weekday)
    forecastContainer.innerHTML += `<div class="weekday-temp"><div>${weekday}</div><div>${forecastTemp} °C</div></div>`
  })
}

const filterSearch = () => {
 const chosenCity = searchInput.value
 console.log(chosenCity)
  getData(chosenCity)
}

console.log(searchButton.addeventListener)
//Eventlisteners
searchButton.addEventListener('click', filterSearch())
searchInput.addEventListener('keyup', function (event) {
  if (event.key == "Enter") {
      filterSearch()
    }
  }
)