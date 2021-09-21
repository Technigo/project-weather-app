
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=affe19113e10ebc0685623d229879d1f'

const weatherContainer = document.getElementById('weather-container')

fetch(API_URL)
.then((response) => response.json())
.then((data) => {
// This function adds a zero in case the time units consist of only one digit 
    const addZero = sec => {
        if (sec < 10) {
            sec = '0' + sec;
        }
        return sec
    }

    let sunriseTime = new Date(data.sys.sunrise)
    let sunsetTime = new Date(data.sys.sunset)
    let formattedHourSunrise = addZero(sunriseTime.getHours()) + ':' + addZero(sunriseTime.getMinutes()) + ':' + addZero(sunriseTime.getSeconds()) 
    let formattedHourSunset = addZero(sunsetTime.getHours()) + ':' +
    addZero(sunsetTime.getMinutes()) + ':' + addZero(sunsetTime.getSeconds()) 

    weatherContainer.innerHTML += `
    <h1>City: ${data.name}</h1>
    <h2>Temperature: ${data.main.temp.toFixed(1)} C°</h2>
    <h2>Type of weather: ${data.weather[0].description}</h2>
    <h2>Sunrise: ${formattedHourSunrise}</h2>
    <h2>Sunset: ${formattedHourSunset}</h2>
    `
})
.catch((error) => console.error(error))
