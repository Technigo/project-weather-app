"use strict";

const apiKey = "e57c9fd6de5974ecd857b3b40415a881"
// const location = "Alicante, ES"

const container = document.getElementById("weatherHeadline")
const container2 = document.getElementById("temperature")
const container3 = document.getElementById("sunriseSunset")




fetch("http://api.openweathermap.org/data/2.5/weather?q=Alicante,es&units=metric&APPID=e57c9fd6de5974ecd857b3b40415a881")
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    container.innerHTML = `<h1>${json.name}: <br>
    ${json.weather[0]["description"]}</h1 >`

    container2.innerHTML = `<h2> Temperature ${json.main.temp.toFixed(0)} C°</h2>`

    const unixTimestampSunrise = json.sys.sunrise
    const unixTimestampSunset = json.sys.sunset

    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    container3.innerHTML = `<h3> Sunrise ${sunriseTime} Sunset ${sunsetTime}</h3>`




  })


// *** 5 day prognosis *** //

const handle5DayForecast = (json) => {
  const forecastDiv = document.getElementById("forecast")
  const dates = {}

  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }

    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map((value) => value.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li> ${date} - min: ${minTemp.toFixed(0)}, max: ${maxTemp.toFixed(0)}</li > `
  })


}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Alicante, Spain&appid=${apiKey}&units=metric`)
  .then((res) => res.json())
  .then(handle5DayForecast)