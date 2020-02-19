//API
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Umea,se&APPID=30014767311a3c96ba7b2be3dae96ec4`


// DOM Selectors
const weatherSection = document.getElementById('weatherSection')



fetch(weatherUrl)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    weatherSection.innerHTML =
      `<h1>${json.name}</h1>

      <p>Prepare for ${json.weather[0].main}</p>

      <p>${json.main.temp.toFixed(1)} °</p>

      <p>${json.wind.speed} m/s</p>


    
    `




  })