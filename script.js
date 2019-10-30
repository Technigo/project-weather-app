const currentWeatherSect = document.getElementById("currentWeatherSect")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    currentWeatherSect.innerHTML += `<h3>${json.name}</h3>`
    currentWeatherSect.innerHTML += `<h1>${Math.round(json.main.temp)}°C </h1>`
    currentWeatherSect.innerHTML += `<p>${json.weather[0].description}</p>`
  })
const fiveDaysForeCastSect = document.getElementById("fiveDaysForeCastSect")
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=395e18f0b5a692062416becf9c89b0c7")
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    fiveDaysForeCastSect.innerHTML += `Hello`
  })