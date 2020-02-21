//API
//const weatherUrl =
// const forecastUrl =

// DOM Selectors
const weatherHeader = document.getElementById('weatherHeader')
const weatherSection = document.getElementById('weatherSection')
const cityDropDown = document.getElementById('cityDropDown')
const forecast = document.getElementById('forecast')



const showWheater = city => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=30014767311a3c96ba7b2be3dae96ec4`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {

      const sunriseTime = json.sys.sunrise
      const sundownTime = json.sys.sunset

      let sunrise = new Date(sunriseTime * 1000)
      let sundown = new Date(sundownTime * 1000)

      let sunUpTime = sunrise.toLocaleTimeString('is', {
        timestyle: 'short',
        hour12: false
      })
      let sunDownTime = sundown.toLocaleTimeString('is', {
        timestyle: 'short',
        hour12: false
      })

      const icon = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`
      weatherSection.innerHTML = ` 

      <h1>${json.name}</h1> 

      <p class="description">
      <img class="weatherIcon" id="icon" src=${icon} alt="Weather icon"/>
      ${json.weather[0].main}</p> 

      <h2>${json.main.temp.toFixed(0)} °</h2>   

      <p class="sunUpData"> <img class="sunUp" id="upSun" src='assets/sunrise.png' alt="Sunrise icon"/>
      ${sunUpTime}</p>  

      <p class="sunDownData"> <img class="sunDown" id"downSun" src='assets/sunset.png' alt="Sunset icon"/>
      ${sunDownTime}</p>

      <p class="windData"><img class="windImage" id='windIcon' src='assets/wind.png' alt="wind icon"/>
      ${json.wind.speed} m/s</p>
      `

    })
}

cityDropDown.addEventListener("change", () => showWheater(cityDropDown.value))

const showForecast = city => {
  fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=30014767311a3c96ba7b2be3dae96ec4`
    )
    .then((response) => {
      return response.json()
    })
    .then((json) => {

      const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))


      filteredForecast.forEach(day => {
        const weekday = new Date(day.dt_txt.replace(' ', 'T'))

        const weekdayName = weekday.toLocaleDateString('is', {
          weekday: 'long'
        })

        const temp = (day.main.temp)


        forecast.innerHTML += `
        <p>${weekdayName} ${temp.toFixed(1)}°</p>
         `
      })


    })




}


cityDropDown.addEventListener("change", () => showForecast(cityDropDown.value))