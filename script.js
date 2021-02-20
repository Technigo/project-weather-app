// DOM selectors stored as short variables
const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const todaysDate = document.getElementById('todays-date')
const condition = document.getElementById('condition')
const iconToday = document.getElementById('icon-today')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const topContainer = document.getElementById('top-container')
const weeklyForecastContainer = document.getElementById('weekly-forecast-container')


// API related variable 
const currentWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID='
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='
const apiKey = '3addfde144e16d817dcc3a5e9a46ea59' 

// This function converts the data for time into a readable format. (t.ex sunrise time of day)
const timeCalculator = (timestamp) => {
    const dateObject = new Date((timestamp) * 1000).toLocaleTimeString([], {timeStyle: 'short'})
    return dateObject 
}
// This fetch collects data for the current city of Stockholm temperature, name, sunrise, sunset etc.
fetch (currentWeatherApiUrl + apiKey)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        todaysDate.innerHTML = new Date().toDateString();
        temperature.innerHTML = Math.round(json.main.temp)+ '°C'
        city.innerHTML = `<h1 class = city-local>${json.name}</h1>`
        iconToday.innerHTML = `<img src='http://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png'>`
        condition.innerHTML = `<p>${json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1)}</p>`
        sunrise.innerHTML = `<p>Sunrise ${timeCalculator(json.sys.sunrise)}</p>` // (json.sys.sunrise) filters into timestamp in TimeCalculator function
        sunset.innerHTML = `<p>Sunset ${timeCalculator(json.sys.sunset)}</p>`
    })
    .catch ((err) => {
        topContainer.innerHTML = `caught error: ${err}`
    })

// This function returns the name of day for the next 5 days for the weekly forecast fetch.
const getWeekday = (daysFromToday) => {
    const now = new Date()
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] 
    return week[now.getDay() + daysFromToday]
}
// Collect data from API for weekly forecast (5 days)  
fetch (forecastApiUrl + apiKey)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        for(let i = 0; i < 5; i++) {
            const iconUrl = `http://openweathermap.org/img/wn/${filteredForecast[i].weather[0].icon}@2x.png`
            weeklyForecastContainer.innerHTML += `
                <div class="day">
                    <p class="week-day-name">${getWeekday(i + 1)}</p>
                    <img src="${iconUrl}">
                    <p>${Math.round(filteredForecast[i].main.temp)}°C</p>
                </div>
            `
        }
    })
    .catch ((err) => {
        weeklyForecastContainer.innerHTML = `caught error: ${err}`
    })
