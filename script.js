const city = document.getElementById("city")
const forecast = document.getElementById("forecast-container")
const todaysWeather = document.getElementById("todays-weather")
const container = document.getElementById("container")

fetch ("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temp = Math.round(json.main.temp * 10) / 10
    const typeOfWeather = json.weather[0].description
    const timeOfSunrise = new Date((json.sys.sunrise + json.timezone) * 1000).toLocaleTimeString("sv-US", {hour:"2-digit", minute:"2-digit"})
    const timeOfSunset = new Date((json.sys.sunset + json.timezone) * 1000).toLocaleTimeString("sv-US", {hour:"2-digit", minute:"2-digit"})
    const nameOfCity = json.name
    city.innerHTML=`<h1>${nameOfCity}</h1>`
    todaysWeather.innerHTML=`
      <p>${typeOfWeather} | ${temp}°C</p>
      <p>Sunrise: ${timeOfSunrise}</p> 
      <p>Sunset: ${timeOfSunset}</p>
    `
  })
  .catch (error => {
    console.error(error)
    todaysWeather.innerHTML="Ups something went wrong!" + error
  })

fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    for (let i = 0; i < 5; i++) {
      const days = new Date((filteredForecast[i].dt_txt)).toLocaleDateString("en-US", {weekday:"short"})
      const forecastTemp = Math.round(filteredForecast[i].main.temp * 10) / 10
      const icon = filteredForecast[i].weather[0].icon
      forecast.innerHTML +=`
        <p class="forecast-paragraph">${days} <img src="https://openweathermap.org/img/wn/${icon}@2x.png">${forecastTemp}°C</p>
      `
    }
  })
  .catch (error => {
    console.error(error)
    forecast.innerHTML="Ups something went wrong!" + error
  })
