const weatherContainer = document.getElementById('weatherContainer')
const topContainer = document.getElementById('topContainer')
const weatherForecast = document.getElementById('weatherForecast')
const todaysDate = document.getElementById('todaysDate')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


// This is the API key for OpenWeatherMap.org - Stockholm (YK)
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bcc357d81ce23673e3a8e92322d840f2')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        weatherContainer.innerHTML = `<h1>This is the weather in ${json.name}</h1>`
        console.log(json)
     json.stations.forEach((stations) => {
        weatherContainer.innerHTML += `<p>${stations.Stockholm}</p>`
        weatherContainer.innerHTML += `<p>${stations.main}</p>`
        })
    })