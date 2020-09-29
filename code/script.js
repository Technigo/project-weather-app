const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const iconElement = document.getElementById("icon")
const descriptionElement = document.getElementById("description")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")
const forecastTableElement = document.getElementById("forecastTable")

fetch(weatherUrl)
  .then(response => {
    return response.json()
  })
  .then(json => {
    const weather = {
      city: json.name,
      temp: Math.round(json.main.temp),
      icon: getIconUrl(json.weather[0].icon),
      description: json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1),
      sunrise: convertToTime(json.sys.sunrise),
      sunset: convertToTime(json.sys.sunset)
    }
    displayWeather(weather)
  })
  .catch(error => {
    console.log("Error fetching weather data", error)
    // alert("Weather data error")
  })

fetch(forecastUrl)
  .then(response => {
    return response.json()
  })
  .then(json => {
    const filteredForecasts = json.list.filter(item => item.dt_txt.includes("12:00"))
    const forecasts = filteredForecasts.map(item => {
      const day = convertToDay(item.dt)
      const icon = getIconUrl(item.weather[0].icon)
      const temp = Math.round(item.main.temp)
      return { day, icon, temp }
    })
    displayForecast(forecasts)
  })
  .catch(error => {
    console.log("Error fetching forecast data", error)
    // alert("Forecast data error")
  })

const displayWeather = weather => {
  cityElement.innerHTML = weather.city
  tempElement.innerHTML = `${weather.temp}°`
  iconElement.innerHTML = `<img src='${weather.icon}'>`
  descriptionElement.innerHTML = weather.description
  sunriseElement.innerHTML = `Sunrise: ${weather.sunrise} `
  sunsetElement.innerHTML = `Sunset: ${weather.sunset} `
}

const displayForecast = forecasts => {
  forecasts.forEach((forecast) => {
    forecastTableElement.innerHTML += generateHTML(forecast)
  })
}

const generateHTML = forecast => {
  let forecastHTML = ""
  forecastHTML += `<li class="forecast-row">`
  forecastHTML += `<p>${forecast.day}</p> `
  forecastHTML += `<div><img src='${forecast.icon}'></div > `
  forecastHTML += `<p class="temp">${forecast.temp}°</p > `
  forecastHTML += `</li> `
  return forecastHTML
}

const convertToTime = timeStamp => (new Date(timeStamp * 1000)).toLocaleTimeString([], options = { hour: "2-digit", minute: "2-digit" })

const convertToDay = timeStamp => (new Date(timeStamp * 1000)).toLocaleString("en-GB", options = { weekday: "short" })

const getIconUrl = iconId => `https://openweathermap.org/img/wn/${iconId}@2x.png`