const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ca210ff292f62f57af6fe6f0033eb208'

const cityElement = document.getElementById("city")
const temperatureElement = document.getElementById("temperature")
const descriptionElement = document.getElementById("description")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")
const forecastListElement = document.getElementById("forecastList")
const iconElement = document.getElementById("icon")


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    renderWeather(data)
    renderForecast(data)
  })
  .catch(error => {
    console.error(error)
    alert("Failed to load data")
  })

const renderWeather = data => {
  cityElement.innerHTML = data.city.name
  temperatureElement.innerHTML = `${Math.round(data.list[0].main.temp)}°`
  iconElement.innerHTML = `
    <div>
      <img src='${getIconUrl(data.list[0].weather[0].icon)}'>
    </div>
  `
  renderSunriseSunset(data.city.sunrise, data.city.sunset)
}

const renderForecast = forecast => {
  const noonForecastItems = forecast.list.filter(item => item.dt_txt.includes('12:00'))

  noonForecastItems.forEach(item => {
    forecastListElement.innerHTML += generateNoonForecast(item)
  })
}

const generateNoonForecast = item => `
    <li class="forecast-row">
      <p>${formatDay(item.dt)}</p>
      <div><img src='${getIconUrl(item.weather[0].icon)}'></div> 
      <p class="temperature">${Math.round(item.main.temp)}°</p> 
    </li>
  `

const renderSunriseSunset = (sunriseSeconds, sunsetSeconds) => {
  const sunriseDate = new Date(sunriseSeconds * 1000)
  const sunsetDate = new Date(sunsetSeconds * 1000)
  const options = { hour: '2-digit', minute: '2-digit' }
  const sunriseTimeString = sunriseDate.toLocaleTimeString([], options)
  const sunsetTimeString = sunsetDate.toLocaleTimeString([], options)
  sunriseElement.innerHTML = `Sunrise: ${sunriseTimeString}`
  sunsetElement.innerHTML = `Sunset: ${sunsetTimeString}`
}

const formatDay = day => {
  const forecastDate = new Date(day * 1000)
  const forecastDay = forecastDate.toString()
  shortForecastDay = forecastDay.substring(0, 3)
  return shortForecastDay
}

const getIconUrl = iconName => `https://openweathermap.org/img/wn/${iconName}@2x.png`
