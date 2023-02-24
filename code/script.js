
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
    todaysTemp.innerHTML = `<p>${Math.round(json.main.temp * 10)/10}℃</p>` //rounds temperature to 1 decimal
    city.innerHTML += `<p>${json.name}<p>`
    todaysWeather.innerHTML += `<p>${json.weather[0].main}</p>`
    sunrise.innerHTML += `<p>sunrise: ${convertTime(json.sys.sunrise)}<p>` 
    sunset.innerHTML += `<p>sunset: ${convertTime(json.sys.sunset)}<p>`
})

 //converts the time that is in milliseconds to hours and minutes
 const convertTime = (milliseconds) => {
    let unitTime = milliseconds * 1000;
    let date = new Date(unitTime).toLocaleTimeString([], {
        hour: '2-digit', minute:'2-digit'
    });
    return date
}

//Gets the days for the forecast weather
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); 
    return dates.toLocaleDateString('en', {weekday: 'short'}); 
    }

     //fetches weather forecast for next 5 days (placed in the forecastContainer)
const fetchWeatherForecast = () => {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
        .then ((response) => {
        return response.json()
    })
        .then((json) => {
            console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))   //filters so that we only get the temp from 12 o'clock

        forecast.innerHTML += `
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[0].dt)}</div>
            <div class="temp">${filteredForecast[0].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[1].dt)}</div>
            <div class="temp">${filteredForecast[1].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[2].dt)}</div>
            <div class="temp">${filteredForecast[2].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[3].dt)}</div>
            <div class="temp">${filteredForecast[3].main.temp.toFixed(0)}°</div>
        </div>
        
        <div class = "weekdays">
            <div class="day">${getDay(filteredForecast[4].dt)}</div>
            <div class="temp">${filteredForecast[4].main.temp.toFixed(0)}°</div>
        </div>`
        })
    }
    fetchWeatherForecast ()