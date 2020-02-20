const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d563e29445b827968160d0c39a96cdcd'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d563e29445b827968160d0c39a96cdcd'
const weatherSection = document.getElementById('weatherSection')
//const weatherContainer = document.getElementsByClassName('weatherContainer')

fetch(weatherUrl)
  .then(res => res.json())

  .then(weather => {
    //console.log(weather)
    //console.log(weather.name)
    const timecodeSunrise = weather.sys.sunrise
    const timecodeSunset = weather.sys.sunset

    let sunrise = new Date(timecodeSunrise * 1000)
    let sunset = new Date(timecodeSunset * 1000)

    let sunriseTime = sunrise.toLocaleTimeString('is', {
      timeStyle: 'short',
      hour12: false
    })
    let sunsetTime = sunset.toLocaleTimeString('is', {
      timeStyle: 'short',
      hour12: false
    })

    weatherSection.innerHTML = `
      <h1 class="weather-header">The weather in: ${weather.name}</h1>
      <p class="temperature">temp: ${weather.main.temp.toFixed(1)}</p>
      <p class="sun">sunrise: ${sunriseTime} sunset: ${sunsetTime}</p>
      `


    if (weather.main.temp < 10) {
      weatherSection.classList.toggle("cold")
    } else {
      weatherSection.classList.toggle("warm")
    }
  })

fetch(forecastUrl)
  .then((respons) => {
    return respons.json()
  })
  .then((json) => {
    filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach(day => {

    })
  })