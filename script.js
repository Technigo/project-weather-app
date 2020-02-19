//API
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=30014767311a3c96ba7b2be3dae96ec4`


// DOM Selectors
const weatherSection = document.getElementById('weatherSection')






fetch(weatherUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    const icon = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`
    weatherSection.innerHTML = `
    
      <img class="weatherIcon" src=${icon} />
      <h1>${json.name}</h1>
      <p>${json.main.temp.toFixed(0)} °</p>
      <p>Weather: ${json.weather[0].main}</p>
      <img class="windImage" id='windIcon' src='assets/wind.png' alt="wind icon"/>
      <p class="windData">${json.wind.speed} m/s</p>`




  })