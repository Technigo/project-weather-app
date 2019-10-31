const currentWeather = document.getElementById("currentWeather")

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })

.then((json) => {
  const unixTimestampSunrise = json.sys.sunrise
  const unixTimestampSunset = json.sys.sunset
  const sunrise = new Date(unixTimestampSunrise * 1000)
  const sunset = new Date(unixTimestampSunset * 1000)
  const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
  const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

  currentWeather.innerHTML += `<h3>Today's weather in:<br>${json.name}</h3>`
  currentWeather.innerHTML += `<h1>${Math.round(json.main.temp)}°C </h1>`
  currentWeather.innerHTML += `<h2>${json.weather[0].description}</h2>`
  currentWeather.innerHTML += `Sunrise: ${sunriseTime} <br>Sunset: ${sunsetTime}`
})


//  Five day forecast 

const fiveDayForecast = document.getElementById("fiveDayForecast")
const handleFiveDayForecast = (json) => {
  console.log(json)
  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    console.log(date)
  })

  fetch("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
    .then((response) => {
      return response.json()
    })
    .then(handleFiveDayForecast)
    .catch((err) => console.log(err.message))
}