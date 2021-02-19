//API VARIABLES
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'
const apiUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=Kuala%20Lumpur&units=metric&appid=5527a65cb469b1aa0aae3017c8ea2460'

//DOM SELECTORS
const summary = document.getElementById('summary')
const mainInformation = document.getElementById('mainInformation')
const icon = document.getElementById('icon')
const infoText = document.getElementById('infoText')
const forecastContainer = document.getElementById('forecastContainer')

//GLOBAL VARIABLES
let temperature

//CURRENT WEATHER
fetch(apiUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    json.weather.map((weather) => {
      temperature = json.main.temp
      const sunriseDate = new Date((json.sys.sunrise + json.timezone) * 1000) 
      const sunsetDate = new Date((json.sys.sunset + json.timezone) * 1000)
      summary.innerHTML += `
        <p>${weather.description} | ${temperature.toFixed(0)} &#8451;</p>
        <p>sunrise ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}</p>
        <p>sunset ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}</p>`
    })

    const { id } = json.weather[0] 
    if (id < 250) {
      icon.innerHTML += `<img src="assets/thunder.svg">`
      mainInformation.innerHTML += `<h2>Enjoy the fireworks, the thunder are rollin in ${json.name}!</h2>`
    } else if (id < 550) {
      icon.innerHTML += `<img src="assets/rain.svg">`
      mainInformation.innerHTML += `<h2>Take your umbrella out in ${json.name} and dance in the rain!</h2>`
    } else if (id < 650) {
      icon.innerHTML += `<img src="assets/snowy.svg">`
      mainInformation.innerHTML += `<h2>The snow is falling in ${json.name} get out there and make a snowman!</h2>`
    } else if (id < 700) {
      icon.innerHTML += `<img src="assets/hazecloud.svg">`
      mainInformation.innerHTML += `<h2>Bring a good mood and clear the haze in ${json.name}!</h2>`
    } else if (id == 800) {
      icon.innerHTML += `<img src="assets/sun.svg">`  
      mainInformation.innerHTML += `<h2>Soak up the sun in ${json.name}, but don't forget the sunblock!</h2>`
    } else if (id > 800) {
      icon.innerHTML += `<img src="assets/cloud.svg">`
      mainInformation.innerHTML += `<h2>It's looking grey today in ${json.name}. Put on a colorful shirt!</h2>`
    } else {
      icon.innerHTML += `<img src="assets/whirlpool.svg">`
      mainInformation.innerHTML += `<h2>The weather is crazy in ${json.name} today.. Stay inside!</h2>`
    }
  })
  .catch(err => {
    console.error(err)
    summary.innerHTML = `Error! ${err}`
  })

//FORECAST - WEATHER NEXT 5 DAYS
fetch(apiUrlForecast)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const timezone = json.city.timezone
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.map((forecast) => {
      const mainTemperature = forecast.main.temp.toFixed(0)
      const weatherDiscription = forecast.weather[0].description 
      const forecastDate = new Date((forecast.dt + timezone) * 1000)
      const forecastDay = forecastDate.toLocaleDateString('en-US', {weekday: 'long'})
      
      forecastContainer.innerHTML += `
        <p class="forecast"> 
        <span>${forecastDay}</span> 
        <span>${weatherDiscription}</span> 
        <span>${mainTemperature} &#8451</span>
        </p>`
    })
  })
  .catch(err => {
    console.error(err)
    forecast.innerHTML = `Error! ${err}`
  })
