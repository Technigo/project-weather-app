//const container1 = document.getElementById("todaysWeather")
const theTemperature = document.getElementById("temperature")
const theWeatherSummary = document.getElementById("weatherSummary")
const theCity = document.getElementById("city")
const theImage = document.getElementById("weatherImage")
const theSunrise = document.getElementById("sunUp")
const theSunset = document.getElementById("sunDown")
const theWeekdays = document.getElementById("weekdayForecast")
const theTemperatureForecast = document.getElementById("temperatureForecast")
const theWeather = document.getElementById("weatherForecast")

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8c93692e6dae295a7a97fe22cff8e23c"
)
  .then(response => {
    return response.json()
  })

  .then(json => {
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" })

    theCity.innerHTML += `${json.name}`
    theTemperature.innerHTML += `${Math.floor(json.main.temp)}°C`
    theWeatherSummary.innerHTML += `${json.weather[0].description}`
    // for testing longer sentences
    //theWeatherSummary.innerHTML += `heavy shower rain and drizzle	`

    theSunrise.innerHTML += `Sunrise at ${sunriseTime}`
    theSunset.innerHTML += `Sunset at ${sunsetTime}`

    //const now = new Date(Date.now())
    const now = new Date(Date.now() - 54000000)

    const nightTime = now < sunrise || now > sunset

    if (nightTime) {
      document.body.style.backgroundColor = "#242525"
      document.body.style.color = "#c2e2e2"
    }

    //const id = json.weather[0].id
    const id = 801
    if (id >= 200 && id <= 232) {
      theImage.src = "images/lightning.png"
    } else if (id >= 300 && id <= 531) {
      theImage.src = "images/rain.png"
    } else if (id >= 600 && id <= 622) {
      theImage.src = "images/snow.png"
    } else if (id >= 701 && id <= 781) {
      theImage.src = "images/fog.png"
    } else if (id === 800) {
      if (nightTime) {
        theImage.src = "images/moon.png"
      } else {
        theImage.src = "images/sun.png"
      }
    } else if (id === 801) {
      if (nightTime) {
        theImage.src = "images/clouds-moon.png"
      } else {
        theImage.src = "images/clouds-sun.png"
      }
    } else if (id === 802) {
      if (nightTime) {
        theImage.src = "images/clouds-moon.png"
      } else {
        theImage.src = "images/clouds-little sun.png"
      }
    } else if (id === 803) {
      theImage.src = "images/clouds.png"
    } else if (id === 804) {
      theImage.src = "images/clouds-many.png"
    }
  })

fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8c93692e6dae295a7a97fe22cff8e23c"
)
  .then(response => {
    return response.json()
  })

  .then(json => {
    json.list.forEach(day => {
      const unixTimestamp = day.dt
      const time = new Date(unixTimestamp * 1000)

      if (time.getUTCHours() === 6) {
        const options = { weekday: "long" }
        const weekday = new Intl.DateTimeFormat("en-US", options).format(time)

        theWeekdays.innerHTML += `<div>${weekday}</div>`
        theTemperatureForecast.innerHTML += `<div>${Math.floor(
          day.main.temp
        )}°C</div>`
        theWeather.innerHTML += `<div>${day.weather[0].main}</div>`
      }
    })
  })
