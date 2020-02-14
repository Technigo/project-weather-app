const userLocation = document.getElementById('location')
const tempDegees = document.getElementById('tempDegrees')
const tempDescription = document.getElementById('tempDescription')
const tempFeelsLike = document.getElementById('tempFeelsLike')
//const sunriseTime = document.getElementById('sunrise')
//const sunsetTime = document.getElementById('sunset')
const days = document.getElementById('days')
const minTemp = document.getElementById('minTemp')
const maxTemp = document.getElementById('maxTemp')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=10c15495461885dfddf7c2f3846d4e30')
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    console.log(json)
    userLocation.innerHTML = `${json.name}`
    tempDegrees.innerHTML = `${json.main.temp.toFixed(1)}°C`
    tempFeelsLike.innerHTML += `${json.main.feels_like.toFixed(1)}°C`

    json.weather.forEach((weather) => {
      tempDescription.innerHTML = `${weather.description}`
    })

    // SUNSET AND SUNRISE TIME ?? 
    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset
    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
    sunr.innerHTML += `${sunriseTime}`
    suns.innerHTML += `${sunsetTime}`
  })







