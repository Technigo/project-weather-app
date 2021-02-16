// All the DOM selectors stored as short variables
const body = document.getElementById("body")
const shortDescription = document.getElementById("shortDescription")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const description = document.getElementById("description")
const forecast = document.getElementById("forecast")
const weatherIcon = document.getElementById("weatherIcon")
const searchBox= document.getElementById("searchbox")
const currentLocationText = document.getElementById("currentLocationText")
const forecastTemp = document.getElementById("forecastTemp")
const forecastDay = document.getElementById("forecastDay")
const currentLocationIcon = document.getElementById("currentLocationIcon")
const magnifyingGlassIcon = document.getElementById("searchWrapper")
const searchLocationBtn = document.getElementById("searchLocationBtn")
const userLocationInput = document.getElementById("userLocationInput")

// Global variables
const weekdays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
const API_KEY = "fd4c88b297db1abd3f5aaffe170147b6";
let city = "";

const handleCityInput = (city) => {
  let API_urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=se&APPID=" + API_KEY;
  let API_urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=se&APPID=" + API_KEY;
  fetchWeatherData(API_urlCurrent);
  fetchWeatherForecast(API_urlForecast)
  currentLocationText.innerHTML = city
}

const fetchWeatherData = (API_url) => {
  fetch(API_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      setCurrentWeather(json)
    })
}
const fetchWeatherForecast = (API_urlForecast) => {
  fetch(API_urlForecast)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      setCurrentWeatherForecast(json)
    })

  const setCurrentWeatherForecast = (WeatherForecast) => {
    forecastTemperature(WeatherForecast)
  }
}

const forecastTemperature = (forecastData) => {
  let filteredData = forecastData.list.filter((item) => item.dt_txt.includes("12:00"))

  filteredData.forEach(item => forecastTemp.innerHTML += `
    <li>
      <img class="forecast-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"/> 
      ${item.main.temp} &deg;C
    </li>
  ` ); 
  filteredData.forEach(item => forecastDay.innerHTML += `
    <li>
      ${weekdays[new Date(item.dt_txt).getDay()]}
    </li>
  `)
}

const setCurrentWeather = (weatherData) => {
  let sunrise = weatherData.sys.sunrise
  let sunset = weatherData.sys.sunset
  let conditionId = weatherData.weather[0].id

  currentSunriseSunset(sunrise, "rise");
  currentSunriseSunset(sunset, "set");
  currentTemperature(weatherData);
  currentWeatherCondition(weatherData);
  weatherBackground(conditionId)
}

const currentTemperature = (weatherData) => {
  temperature.innerHTML = `| ${weatherData.main.temp} &deg;C`
}

const currentSunriseSunset = (sun, condition) => {
  condition === "rise" ?
    sunrise.innerHTML = `Sol upp: ${toLocalTime(sun)} | ` :
    sunset.innerHTML = `Sol ned: ${toLocalTime(sun)}`
}

const toLocalTime = (sun) => {
  let unixToLocalTime = new Date(sun * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return unixToLocalTime;
}

const currentWeatherCondition = (weatherData) => {
  let wIcon = weatherData.weather[0].icon

  shortDescription.innerHTML = weatherData.weather[0].description + " "
  weatherIcon.src = "https://openweathermap.org/img/wn/" + wIcon + "@2x.png"
}

const weatherBackground = (id) => {
  let condition = ""

  if (id === 800) {
    condition = "sunny"
  } else if (id >= 200 && id <= 232) {
    condition = "stormy"
  } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    condition = "rainy"
  } else if (id >= 600 && id <= 622) {
    condition = "snowy"
  } else if (id >= 801 && id <= 804) {
    condition = "cloudy"
  } else {
    condition = "other";
  }
  body.classList.add(condition)
}

const clearAll = () => {
  forecastDay.innerHTML = ""
  forecastTemp.innerHTML = ""
  body.className = ""
  userLocationInput.value = ""
}

// Eventlisteners
currentLocationIcon.addEventListener("click", () => {})

searchLocationBtn.addEventListener("click", (event) => {
  event.preventDefault()
  handleCityInput(userLocationInput.value)
  searchBox.classList.toggle("active")
  clearAll() 
})

magnifyingGlassIcon.addEventListener("click", () => {
  searchBox.classList.toggle("active")
})