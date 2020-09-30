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
      icon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
      description: json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1),
      sunrise: (new Date(json.sys.sunrise * 1000)).toLocaleTimeString([], options = { hour: "2-digit", minute: "2-digit" }),
      sunset: (new Date(json.sys.sunset * 1000)).toLocaleTimeString([], options = { hour: "2-digit", minute: "2-digit" })
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
    const forecasts = json.list.filter(item => item.dt_txt.includes("12:00")).map(item => {
      const day = (new Date(item.dt * 1000)).toLocaleString("en-GB", options = { weekday: "short" })
      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      const temp = Math.round(item.main.temp)
      return { day, icon, temp }
    })
    forecasts.forEach(forecast => {
      forecastTableElement.innerHTML += displayForecast(forecast)
    })
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

const displayForecast = forecast => {
  let forecastHTML = ""
  forecastHTML += `<li class="forecast-row">`
  forecastHTML += `<p>${forecast.day}</p> `
  forecastHTML += `<img src='${forecast.icon}'>`
  forecastHTML += `<p class="temp">${forecast.temp}°</p > `
  forecastHTML += `</li> `
  return forecastHTML
}