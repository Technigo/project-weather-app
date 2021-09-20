
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f'

const weatherContainer = document.getElementById('weather-container')

fetch(API_URL)
.then((response) => response.json())
.then((data) => {
    console.log('DATA!', data)
    weatherContainer.innerHTML += `
    <h1>City: ${data.name}</h1>
    <h2>Temperature: ${data.main.temp.toFixed(1)} C°</h2>
    <h2>Type of weather: ${data.weather[0].description}</h2>`

})

.catch((error) => console.error(error))



