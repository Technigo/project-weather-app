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
      temp: json.main.temp,
      iconId: json.weather[0].icon,
      description: json.weather[0].description,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset
    }

    const modifiedWeather = modifyWeather(weather)
    displayWeather(modifiedWeather)

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
      const day = item.dt
      const iconId = item.weather[0].icon
      const temp = item.main.temp
      return {
        day, iconId, temp
      }
    })

    // const modifiedForecasts = forecasts.forEach(forecast => {
    //   modifyForecast(forecast)
    // })
    // displayForecasts(modifiedForecasts)

    displayForecast(forecasts)

  })
  .catch(error => {
    console.log("Error fetching forecast data", error)
    // alert("Forecast data error")
  })

const modifyWeather = weather => {
  const city = weather.city
  const temp = Math.round(weather.temp)
  const iconUrl = getIconUrl(weather.iconId)
  const description = weather.description.charAt(0).toUpperCase() + weather.description.slice(1)

  const time = convertTime(weather.sunrise, weather.sunset)
  const sunrise = time.sunriseTime
  const sunset = time.sunsetTime

  return { city, temp, iconUrl, description, sunrise, sunset }
}

const displayWeather = weather => {
  cityElement.innerHTML = weather.city
  tempElement.innerHTML = `${weather.temp}°`
  iconElement.innerHTML = `<img src='${weather.iconUrl}'>`
  descriptionElement.innerHTML = weather.description
  sunriseElement.innerHTML = `Sunrise: ${weather.sunrise} `
  sunsetElement.innerHTML = `Sunset: ${weather.sunset} `
}

// const modifyForecast = forecast => {
//   const day = handleDay(forecast.day)
//   const iconUrl = getIconUrl(forecast.iconId)
//   const temp = Math.round(forecast.temp)
//   return { day, iconUrl, temp }
// }

const displayForecast = forecasts => {
  forecasts.forEach((forecast) => {
    forecastTableElement.innerHTML += generateHTML(forecast)
  })
}

const generateHTML = forecast => {
  const day = convertDay(forecast.day)

  const iconUrl = getIconUrl(forecast.iconId)
  const temp = Math.round(forecast.temp)

  let forecastHTML = ""
  forecastHTML += `<li class="forecast-row">`
  forecastHTML += `<p>${day}</p> `
  forecastHTML += `<div><img src='${iconUrl}'></div > `
  forecastHTML += `<p class="temp">${temp}°</p > `
  forecastHTML += `</li> `
  return (forecastHTML)
}

const convertTime = (sunrise, sunset) => {
  const sunriseDate = new Date(sunrise * 1000)
  const sunsetDate = new Date(sunset * 1000)
  const options = { hour: "2-digit", minute: "2-digit" }
  const sunriseTime = sunriseDate.toLocaleTimeString([], options)
  const sunsetTime = sunsetDate.toLocaleTimeString([], options)
  return time = { sunriseTime, sunsetTime }
}

const convertDay = day => {
  const forecastDate = new Date(day * 1000)
  const options = { weekday: "short" }
  const forecastDay = forecastDate.toLocaleString("en-GB", options)
  return forecastDay
}

const getIconUrl = iconId => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`
  return iconUrl
}