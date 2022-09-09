const container = document.getElementById('main-container')
const city = document.getElementById('city')
const forecast = document.getElementById ('forecastContainer')


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
.then((response) => {
    return response.json()
})
.then((json) => {
    container.innerHTML = `<p>${Math.round(json.main.temp * 10)/10}</p>`
    city.innerHTML += `<p>${json.name}<p>`
    container.innerHTML += `<p>${json.weather[0].description}</p>`
})


//Get the days for the forecast weather
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); 
    return dates.toLocaleDateString('en', {weekday: 'long', day:'numeric'}); 
    }

    
const fetchWeatherForecast = () => {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d5df19d6f5f0e0c58e9f1a6d07022e47")
        .then ((response) => {
        return response.json()
    })
        .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))  
        forecast.innerHTML += `
        <div id = "dayOne">
            <div class="day">${getDay(filteredForecast[1].dt)}</div>
            <div class="description">${filteredForecast[1].weather[0].description}</div>
            <div class="temp">${filteredForecast[1].main.temp.toFixed(1)}</div>

        </div>

        <div id = "dayTwo">
            <div class="day">${getDay(filteredForecast[2].dt)}</div>
            <div class="description">${filteredForecast[2].weather[0].description}</div>
            <div class="temp">${filteredForecast[2].main.temp.toFixed(1)}</div>

        </div>
        
        <div id = "dayThree">
            <div class="day">${getDay(filteredForecast[3].dt)}</div>
            <div class="description">${filteredForecast[3].weather[0].description}</div>
            <div class="temp">${filteredForecast[3].main.temp.toFixed(1)}</div>

        </div>
        
        <div id = "dayFour">
            <div class="day">${getDay(filteredForecast[4].dt)}</div>
            <div class="description">${filteredForecast[4].weather[0].description}</div>
            <div class="temp">${filteredForecast[4].main.temp.toFixed(1)}</div>

        </div>`
        
    })
    
}

fetchWeatherForecast ()

    
 