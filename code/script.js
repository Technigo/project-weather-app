const weatherData = document.getElementById("weatherdata")
const weatherToday = document.getElementById("weather-today")
const weatherForecast = document.getElementById("weather-forecast")

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351"
const API_Forecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=cityname&units=metric&APPID=5caaaf25021b2d7aa4d206126b6a3351"
const getData = () => {
  //made global function so we can call from different areas in the code

  fetch(API_URL.replace("cityname", currentCity))
    .then((response) => response.json())
    .then((data) => {
      //users local timezone offset
      let usersTimeZoneOffset = new Date().getTimezoneOffset() * 60

      //create variables for localtime, sunset and sunrise in current weather city
      //with users timezineoffset to handle ex CET
      let localTimeNow = new Date(Date.now() + (data.timezone * 1000) + (usersTimeZoneOffset * 1000))
      let localTimeSunrise = new Date((data.sys.sunrise * 1000) + (data.timezone * 1000) + (usersTimeZoneOffset * 1000))
      let localTimeSunset = new Date((data.sys.sunset * 1000) + (data.timezone * 1000) + (usersTimeZoneOffset * 1000))

      weatherToday.innerHTML = /* html */ `
      <div class="weather-container-div">
      <p id="city-now">${data.name}</p>
      <p id="temp-now">${data.main.temp.toFixed(1)}°C</p>
      <p id="weather-now">${data.weather[0].description}</p>
      <div class="sunrise-sunset">
      <span id="smaller-text">sunrise</span>
      <span id="smaller-text">
        ${localTimeSunrise.toLocaleTimeString([], { timeStyle: "short" })}
      </span>
      <span id="smaller-text">sunset</span>
      <span id="smaller-text">
        ${localTimeSunset.toLocaleTimeString([], { timeStyle: "short" })}
      </span>
          </div>
      </div>
      `
      // toFixed(1) rounds the temp to one decimal
      // time

      let isNight = localTimeNow > localTimeSunset || localTimeNow < localTimeSunrise
      temp = data.main.temp
      const mobil = window.matchMedia("(max-width: 769px)")

      if (isNight) {
        document.body.classList.add('night')
        document.body.classList.remove('day')
      }
      else {
        document.body.classList.add('day')
        document.body.classList.remove('night')
      }

      if (mobil.matches) {
        const nav = document.getElementById("nav")

        if (isNight) {
          nav.style.background = "var(--nightphone)"
          weatherToday.style.backgroundImage = "var(--imgn)"
          weatherToday.style.backgroundSize = "cover"
          weatherToday.style.color = "white"
        } else {
          nav.style.background = "var(--dayphone)"
          weatherToday.style.backgroundImage = "var(--imgd)"
          weatherToday.style.backgroundSize = "cover"
          weatherToday.style.color = "black"
        }
      } else {
        if (temp >= 25 && temp <= 65) {
          if (isNight) {
            weatherToday.style.background = "var(--hotnight)"
            weatherToday.style.color = "var(--textcolornight)"
          } else {
            weatherToday.style.background = "var(--hot)"
          }
        }
        if (temp >= 0 && temp <= 24) {
          if (isNight) {
            weatherToday.style.background = "var(--moderatenight)"
          } else {
            weatherToday.style.background = "var(--moderate)"
          }
        }

        if (temp >= -40 && temp <= -1) {
          if (isNight) {
            weatherToday.style.background = "var(--coldnight)"
          } else {
            weatherToday.style.background = "var(--cold)"
          }
        }
      }
    })
    .catch((error) => console.error("Error: ", error))
    .finally(() => console.log("Request done"))

  fetch(API_Forecast.replace("cityname", currentCity))
    .then((res) => res.json())
    .then((forecast) => {
      const filteredForecast = forecast.list.filter((day) =>
        day.dt_txt.includes("12:00")
      )
      weatherForecast.innerHTML = ""

      filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
        const weekTemp = day.main.temp.toFixed(0)

        weatherForecast.innerHTML += `<p id = "smaller-text" > ${dayName}</p>
        <p id="smaller-text">🌡️${weekTemp}°C</p>
        <p id="smaller-text">Feels like ${day.main.feels_like.toFixed(1)}°C</p>
        <img id="day-night-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon
          }@2x.png"/>`
      })
    })
}

//Forecast is showing the upcoming 5 days
const handleWeatherApiResponse = (forecastForCity) => {
  weatherToday.innerHTML = `
  <p>City: ${forecastForCity.name}</p>
  <p>Temp: ${forecastForCity.main.temp.toFixed(1)}°C</p>
  <p>Weather: ${forecastForCity.weather[0].description}</p>`
}

//Activating the Hamburger Menu to select another city
const onCityChanged = (event) => {
  document.querySelector(".menu-btn").checked = false
  currentCity = event.target.dataset.cityname
  getData()
}

//Setting the default city
const getDefaultCity = () => {
  let cities = document.querySelectorAll("[data-cityname]")
  return cities[0].dataset.cityname //dataset is an object with all data attributes inside https://www.w3schools.com/tags/att_global_data.asp
}

//choose a city in the Hamburger Menu on click
const initializeCitySelector = () => {
  let cities = document.querySelectorAll("[data-cityname]")
  cities.forEach((element) => {
    element.addEventListener("click", onCityChanged)
  })
}

initializeCitySelector()
let currentCity = getDefaultCity() //a function to get default city
getData()
