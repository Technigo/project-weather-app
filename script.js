// this is the API variable for the main weather 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'
// this is the API variable for the 5 days forecast
const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=292db829ecfe6c13a596b799caf9289f'
const API_MONTREAL = 'https://api.openweathermap.org/data/2.5/weather?q=Montreal,Canada&units=metric&lang=fr&APPID=f1099e35a6194bceb628758a90cd792b'
const API_MEJILLONES = 'https://api.openweathermap.org/data/2.5/weather?q=Mejillones,Chile&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'
const API_BANJALUKA = 'https://api.openweathermap.org/data/2.5/weather?q=BanjaLuka,Bosnia&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'
// DOM selectors 
const todaysWeather = document.getElementById('todaysWeather')
const todaysAdvice = document.getElementById('todaysAdvice')
const forecast = document.getElementById('forecast')
const montreal = document.getElementById('montreal')
const mejillones = document.getElementById('mejillones')
const banjaluka = document.getElementById('banjaluka')

// we fetch the main weather and with the help of json we display it
fetch(API_WEATHER)
    // we ask for the response from the API
    .then((response) => response.json())
    // we say what we want to be done with the response  
    .then((json) => {
        // weather and temp are injected in HTML, we also rounded the value to show no decimal
        // with one decimal: actualTemperature.innerHTML = `${Math.round(json.main.temp * 10) / 10}`
        todaysWeather.innerHTML += `
            <p>${json.weather[0].description} | ${Math.round(json.main.temp)}°</p>
        `
        const sunrise = new Date(json.sys.sunrise * 1000)
        const sunset = new Date(json.sys.sunset * 1000)
        const sunriseHours = sunrise.getHours() < 10 ? "0" + sunrise.getHours() : sunrise.getHours()
        const sunriseMinutes = sunrise.getMinutes() < 10 ? "0" + sunrise.getMinutes() : sunrise.getMinutes()
        const sunsetHours = sunset.getHours() < 10 ? "0" + sunset.getHours() : sunset.getHours()
        const sunsetMinutes = sunset.getMinutes() < 10 ? "0" + sunset.getMinutes() : sunset.getMinutes()

        todaysWeather.innerHTML += `
            <p>sunrise ${sunriseHours}.${sunriseMinutes}</p>
            <p>sunset ${sunsetHours}.${sunsetMinutes}</p>
        `

        // today's advice is injected in HTML
        // conditional is quite simply done: cloudy style if "cloud" is in description, sunny style if "clear", rainy for the rest.
        if (json.weather[0].main.includes('Clear')) {
            document.body.style.backgroundColor = '#F7E9B9'
            document.body.style.color = '#2A5510'
            todaysAdvice.innerHTML = `
                <h1>
                    <img src="./design/icons/sunglasses.svg" class="weather-icon" alt="sunglasses">
                    <br>
                    <span>Get your sunnies on. ${json.name} is looking rather great today.</span>
                </h1>
            `
        } else if (json.weather[0].main.includes('Cloud')) {
            document.body.style.backgroundColor = '#F4F7F8'
            document.body.style.color = '#F47775'
            todaysAdvice.innerHTML = `
                <h1>
                    <img src="./design/icons/cloud.svg" class="weather-icon" alt="cloud">
                    <br>
                    <span>Light a fire and get cosy. ${json.name} is looking grey today.</span>
                </h1>
            `
        } else {
            document.body.style.backgroundColor = '#A3DEF7'
            document.body.style.color = '#164A68'
            todaysAdvice.innerHTML = `
                <h1>
                    <img src="./design/icons/umbrella.svg" class="weather-icon" alt="umbrella">
                    <br>
                    <span>Don't forget your umbrella. It's wet in ${json.name} today.</span>
                </h1>
            `
        }
    })

fetch(API_FORECAST)
    .then((response) => response.json())
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        filteredForecast.forEach((day) => {
            const options1 = { weekday: 'short' }
            const options2 = { weekday: 'long' }
            // forecast is injected in HTML, we also rounded the value to show no decimal
            // with one decimal: ${Math.round(day.main.temp * 10) / 10}
            // adds the weekdays in two ways, short and long format, example mon or monday
            forecast.innerHTML += `
                <p class="forecast-day" id="forecastDay"><span class="short-day">${new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000).toLowerCase()}</span><span class="long-day">${new Intl.DateTimeFormat('en-GB', options2).format(day.dt * 1000).toLowerCase()}</span><span class="forecast-description">${day.weather[0].description}</span><span>${Math.round(day.main.temp)}°</span></p>
            ` 
        })
    })

// adds 3 forecast cities 
fetch(API_MONTREAL)
    .then((response) => response.json())
    .then((json) => {
        montreal.innerHTML = `
            <p>${json.name}</p>
            <p>${Math.round(json.main.temp)}°</p>
        `
    })

fetch(API_MEJILLONES)
    .then((response) => response.json())
    .then((json) => {
        mejillones.innerHTML = `
            <p>${json.name}</p>
            <p>${Math.round(json.main.temp)}°</p>
        `
    })

fetch(API_BANJALUKA)
    .then((response) => response.json())
    .then((json) => {
        banjaluka.innerHTML = `
            <p>${json.name}</p>
            <p>${Math.round(json.main.temp)}°</p>
        `
    })