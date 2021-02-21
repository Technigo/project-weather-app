// API's
const todaysUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Göteborg&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Göteborg&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'

// DOM
const body = document.body
const containerToday = document.getElementById('containerToday')
const containerForecast = document.getElementById('containerForecast')
const weatherText = document.getElementById('weatherText')

// Function to show weekdays in iOS - if not used it shows them as undefined
const returnWeekday = (date) => {
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const inputDate = new Date(date.replace(' ', 'T'))
    return weekdayNames[inputDate.getDay()]
}

// API fetch today's weather
fetch(todaysUrl)
    .then(response => {
        if (response.ok) {
        return response.json()
        } else {
            throw 'Oops, something went wrong.'
        }
    })
    .then((json) => {

        // Variables to display weather data
        const city = json.name.toUpperCase()
        const cityName = json.name
        const temp = json.main.temp.toFixed(1)
        const timezoneOffset = new Date().getTimezoneOffset() * 60
        const sunrise = new Date((json.sys.sunrise + json.timezone + timezoneOffset) * 1000).toLocaleString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const sunset = new Date((json.sys.sunset + json.timezone + timezoneOffset) * 1000).toLocaleString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const weatherType = json.weather[0].main
        const weatherDescription = json.weather[0].description
        const wIcon = json.weather[0].icon

        // HTML weather text for tablet and desktop, also changes bg color depending on weather type
        switch (weatherType) {
            case 'Clouds':
                body.classList.add('cloudy')
                weatherText.innerHTML = `
                <p>Clouds are covering ${cityName}. Let's hope they'll be gone soon!</p>`
                break
            case 'Clear':
                body.classList.add('clear')
                weatherText.innerHTML = `
                <p>It's clear skies in ${cityName}. Put your sun glasses on and get outside!</p>`
                break
            case 'Snow':
                body.classList.add('snowy')
                weatherText.innerHTML = `
                <p>It's snowy in ${cityName}. Gather your friends and go out and make some snow angels!</p>`
                break
            case 'Rain':
                body.classList.add('rainy')
                weatherText.innerHTML = `
                <p>It's rainy in ${cityName}. Let's stay inside and binge watch Netflix!</p>`
                break
            case 'Drizzle':
                body.classList.add('drizzly')
                weatherText.innerHTML = `
                <p>It drizzles in ${cityName}. Let's stay inside and binge watch Netflix!</p>`
                break
            default:
                body.classList.add('grey')
                weatherText.innerHTML = `
                <p>Not the greatest weather in ${cityName}. Let's cosy up inside!</p>`
                break
        }
        
        // HTML today's weather
        containerToday.innerHTML = `
        <section class="weather">
        <div class="temp_city_weather">
        <div class="temp_city">
        <h1>${temp}°C</h1>
        <h2>${city}</h2>
        <p>${weatherDescription}</p>
        </div>
        <img src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />
        </div>
        <div class="sunrise_sunset">
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
        </div>
        </section>`
    })
    
    .catch(error => {
        containerToday.innerHTML = `
        <p>${error}</p>`
    })

// API fetch 5 day forecast

fetch(forecastUrl)
    .then(response => {
        if (response.ok) {
        return response.json()
        } else {
            throw 'Oops, something went wrong.'
        }
    })
    .then((data) => {
        
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
        filteredForecast.forEach(data => {
        
        const forecastTemp = data.main.temp.toFixed(1)
        const wIcon = data.weather[0].icon
        const weekday = returnWeekday(data.dt_txt)

        // HTML forecast weather
        containerForecast.innerHTML += `
        <section class="forecast">
        <p>${weekday}</p>
        <div class="forecast_weather_temp">
        <div class="forecast_weather_temp">
        <img class="forecast_icon" src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />
        <p class="forecast_temp">${forecastTemp}°C</p>
        </div>
        </section>`
    })
})
    .catch(error => {
        containerForecast.innerHTML = `
        <p>${error}</p>`
    })