const currentWeather = document.getElementById("currentWeather")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    currentWeather.innerHTML += `<h3>Today's weather in:<br>${json.name}</h3>`
    currentWeather.innerHTML += `<h1>${Math.round(json.main.temp)}°C </h1>`
    currentWeather.innerHTML += `<h2>${json.weather[0].description}</h2>`

    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset
    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
    currentWeather.innerHTML += `Sunrise: ${sunriseTime} <br>Sunset: ${sunsetTime}`
  })


const fiveDayForecast = document.getElementById("fiveDayForecast")
fetch("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    fiveDayForecast.innerHTML += `Hello`
  })