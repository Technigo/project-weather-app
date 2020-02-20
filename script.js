//API
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=30014767311a3c96ba7b2be3dae96ec4`


// DOM Selectors
const weatherHeader = document.getElementById('weatherHeader')
const weatherSection = document.getElementById('weatherSection')
const cityDropDown = document.getElementById('cityDropDown')



const showWheater = city => {
  fetch(weatherUrl)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      const icon = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`
      weatherSection.innerHTML = ` 
      <h1>${json.name}</h1> 
      <img class="weatherIcon" id="icon" src=${icon} alt="Weather icon"/>    
      <p class="description">${json.weather[0].main}</p>  
      <h2>${json.main.temp.toFixed(0)} °</h2>
      <img class="sunUp" id="upSun" src='assets/sunrise.png' alt="Sunrise icon"/>
      <p class="sunUpData">${json.sys.sunrise}</p>
      <img class="sunDown" id"downSun" src='assets/sunset.png' alt="Sunset icon"/>
      <p class="sunDownData">${json.sys.sunset}</p>
      <img class="windImage" id='windIcon' src='assets/wind.png' alt="wind icon"/>
      <p class="windData">${json.wind.speed} m/s</p>
      `

    })
}

cityDropDown.addEventListener("change", () => showWheater(cityDropDown.value))