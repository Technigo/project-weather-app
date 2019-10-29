//const container1 = document.getElementById("todaysWeather")
const theTemperature = document.getElementById("temperature")
const theWeatherSummary = document.getElementById("weatherSummary")
const theCity = document.getElementById("city")
const theImage = document.getElementById("weatherImage")
const sunriseAndSunset = document.getElementById("sunUpSunDown")
const theWeekdays = document.getElementById("weekdayForecast")
const theTemperatureForecast = document.getElementById("temperatureForecast")

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

    theTemperature.innerHTML += `${Math.floor(json.main.temp)}°C`
    theWeatherSummary.innerHTML += `${json.weather[0].main}`
    theCity.innerHTML += `${json.name}`

    sunriseAndSunset.innerHTML += `Sunrise at ${sunriseTime} | Sunset at ${sunsetTime}`

    const id = json.weather[0].id
    //const id = 200
    if (id >= 200 && id <= 232) {
      theImage.src = "images/lightning.png"
    } else if (id >= 300 && id <= 531) {
      theImage.src = "images/rain.png"
    } else if (id >= 600 && id <= 622) {
      theImage.src = "images/snow.png"
    } else if (id >= 701 && id <= 781) {
      theImage.src = "images/fog.png"
    } else if (id === 800) {
      theImage.src = "images/sun.png"
    } else if (id === 801) {
      theImage.src = "images/clouds-sun.png"
    } else if (id === 802) {
      theImage.src = "images/clouds-little sun.png"
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
    const unixTimestampToday = json.list[0].dt
    var today = new Date(unixTimestampToday * 1000)

    var options = { weekday: "long" }
    const weekday = new Intl.DateTimeFormat("en-US", options).format(today)

    theWeekdays.innerHTML += `${weekday}`
  })
