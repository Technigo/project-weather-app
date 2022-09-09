/* Variables for selected DOM elements*/
const weatherContainer = document.getElementById('weather-container')
const todaysTemp = document.getElementById('todays-temp')
const city = document.getElementById('city')
const forecast = document.getElementById ('forecastContainer')
const todaysWeather = document.getElementById('todays-weather')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


//fetches todays weather (placed in the weatcher-container div)
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
.then((response) => {
    return response.json()
})
.then((json) => {
    todaysTemp.innerHTML = `<h1>${Math.round(json.main.temp * 10)/10}℃</h1>` //rounds temperature to 1 decimal
    city.innerHTML += `<h2>${json.name}<h2>`
    todaysWeather.innerHTML += `<p>${json.weather[0].description}</p>`
    sunrise.innerHTML += `<p>Sunrise: ${convertTime(json.sys.sunrise)}<p>` 
    sunset.innerHTML += `<p>Sunset: ${convertTime(json.sys.sunset)}<p>`
})


//Gets the days for the forecast weather
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); 
    return dates.toLocaleDateString('en', {weekday: 'long', day:'numeric'}); 
    }

    //fetches weather forecast for next 4 days (placed in the weather forecast div)
const fetchWeatherForecast = () => {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
        .then ((response) => {
        return response.json()
    })
        .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))   //filters so that we only get the temp from 12 o'clock
        forecast.innerHTML += `
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[1].dt)}</div>
            <div class="description">${filteredForecast[1].weather[0].description}</div>
            <div class="temp">${filteredForecast[1].main.temp.toFixed(1)}</div>

        </div>

        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[2].dt)}</div>
            <div class="description">${filteredForecast[2].weather[0].description}</div>
            <div class="temp">${filteredForecast[2].main.temp.toFixed(1)}</div>

        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[3].dt)}</div>
            <div class="description">${filteredForecast[3].weather[0].description}</div>
            <div class="temp">${filteredForecast[3].main.temp.toFixed(1)}</div>

        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[4].dt)}</div>
            <div class="description">${filteredForecast[4].weather[0].description}</div>
            <div class="temp">${filteredForecast[4].main.temp.toFixed(1)}</div>

        </div>`
        
    })
    
}

fetchWeatherForecast ()

 //converts the time that is in milliseconds to hours and minutes
const convertTime = (milliseconds) => {
    let unitTime = milliseconds * 1000;
    let date = new Date(unitTime).toLocaleTimeString([], {
        hour: '2-digit', minute:'2-digit'
    });
    return date
}