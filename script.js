const currentContainer = document.getElementById('current')
const currentTemp = document.getElementById('temp-info')
const currentDescription = document.getElementById('weather-text')
const currentPic = document.getElementById('weather-icon')
const weatherHighlight = document.getElementById('weather-info')
const lightContainer = document.getElementById('sunlightAndDescription')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e6f81f7ee0b06f58ce16c675c25714c4')

  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temp = Math.round(json.main.temp)
    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunset = new Date(json.sys.sunset * 1000)
    const sunriseShort = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetShort = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    currentContainer.innerHTML = `<h2>${json.name}</h2>`
    currentTemp.innerHTML = `<h1>${temp}</h1>`
    lightContainer.innerHTML = `<p id="sunriseP"><img src="sunrise.png" width="60px">Sunrise <span>${sunriseShort}</span></p > <p id="sunsetP"><img src="sunset.png" width="60px">Sunset <span>${sunsetShort}</span></p>`

    json.weather.forEach((weather) => {
      currentDescription.innerHTML += `<p class="descriptionText"> ${weather.description}</p> `
      currentPic.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.icon}` + `@2x.png">`
    })


    if (temp >= 16) {
      weatherHighlight.style.color = "#ffa500"
    } else if (temp >= 15) {
      weatherHighlight.style.color = "white"
    }
    else if (temp <= 14) {
      weatherHighlight.style.color = "#4a6f83"
    } else if (temp <= 0) {
      weatherHighlight.style.color = "darkslategray"
    } else {
      curweatherHighlightrentTemp.style.color = "green"
    }

  })

const myOwnAvgFunction = (temps) => {
  return 0;
}

const handle5DayForecast = (json) => {

  const forecastDiv = document.getElementById('forecast')
  const dates = {}

  json.list.forEach((weather, i) => {
    const date = weather.dt_txt.split(' ')[0]

    if (dates[date]) {
      const selectedDates = dates[date];
      selectedDates.push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  const entries = Object.entries(dates);
  entries.forEach((item, index) => {
    if (index === 0) {
      return
    }
    const date = item[0]
    const weatherValues = item[1]
    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    const dates = new Date(item[0])
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    forecastDiv.innerHTML += `<li>${dayName[dates.getDay()]}: min ${minTemp.toFixed(1)} & max ${maxTemp.toFixed(1)} </li>`
  })
}

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e6f81f7ee0b06f58ce16c675c25714c4`)
  .then((res) => res.json())
  .then(handle5DayForecast)