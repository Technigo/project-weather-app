/* Variables for selected DOM elements*/
const weatherContainer = document.getElementById('weather-container')
const todaysTemp = document.getElementById('todays-temp')
const city = document.getElementById('city')
const forecast = document.getElementById ('forecastContainer')
const todaysWeather = document.getElementById('todays-weather')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const API_KEY ='1e44a1eb4b1cc06a35110dc386aa96bd';


//fetches todays weather (placed in the weather-container div)

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=${API_KEY}`)
.then((response) => {
    return response.json()
})
.then((json) => {
   // console.log(json)
    todaysTemp.innerHTML = `<h1>${Math.round(json.main.temp * 10)/10}℃</h1>` //rounds temperature to 1 decimal
    city.innerHTML += `<h2>${json.name}<h2>`
    todaysWeather.innerHTML += `<p>${json.weather[0].description}</p>`
    sunrise.innerHTML += `<p>Sunrise: ${convertTime(json.sys.sunrise)}<p>` 
    sunset.innerHTML += `<p>Sunset: ${convertTime(json.sys.sunset)}<p>`
})

 //converts the time that is in milliseconds to hours and minutes
 const convertTime = (milliseconds) => {
    let unitTime = milliseconds * 1000;
    let date = new Date(unitTime).toLocaleTimeString([], {
        hour: '2-digit', minute:'2-digit'
    });
    return date
}