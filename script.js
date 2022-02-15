// this is the API variable for the main weather 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'
// const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=LasVegas,USA&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'

// this is the API variable for the 5 day forecast
const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=292db829ecfe6c13a596b799caf9289f'

// these 3 are the DOM selectors 
const actualWeather = document.getElementById('actualWeather')
const actualTemperature = document.getElementById('actualTemperature')
const todaysAdvice = document.getElementById('todaysAdvice')

fetch(API_WEATHER)
    .then((response) => response.json())
    .then((json) => {
        actualWeather.innerHTML = `${json.weather[0].description}`
        actualTemperature.innerHTML = `${Math.round(json.main.temp)}°`        
// conditional is quite simply done: cloudy style if "cloud" is in description, sunny style if "clear", rainy for the rest.
        if (json.weather[0].description.includes('clear')) {
            document.body.style.backgroundColor = '#F7E9B9'
            document.body.style.color = '#2A5510'
            todaysAdvice.innerHTML = `
            <img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" class="" id="weatherIconSun"> 
            <h1 class="advice" id="advice">
                <span class="city" id="city">Get your sunnies on. ${json.name} is looking rather great today.</span>
            </h1>
        `
        } else if (json.weather[0].description.includes('cloud')) {
            document.body.style.backgroundColor = '#F4F7F8'
            document.body.style.color = '#F47775'
            todaysAdvice.innerHTML = `
            <img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" class="" id="weatherIconCloud"> 
            <h1 class="advice" id="advice">
                <span class="city" id="city">Light a fire and get cosy. ${json.name} is looking grey today.</span>
            </h1>
        `
        } else {
            document.body.style.backgroundColor = '#A3DEF7'
            document.body.style.color = '#164A68'
            todaysAdvice.innerHTML = `
            <img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" class="" id="weatherIconRain"> 
            <h1 class="advice" id="advice">
                <span class="city" id="city">Don't forget your umbrella. It's wet in ${json.name} today.</span>
            </h1>
        `
        }
    })

    // added the forecast part from the forecast branch to check the styling for this section
    fetch(API_FORECAST)
    .then((response) => response.json())
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        filteredForecast.forEach((day) => {
            const options1 = { weekday: 'short' }
            // forecast is injected in HTML, we also rounded the value to show no decimal
            // with one decimal: ${Math.round(day.main.temp * 10) / 10}
            forecast.innerHTML +=
                `<div class="day-container" id="firstDay">
            <p class="forecastDay"><span>${new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000).toLowerCase()}</span><span>${Math.round(day.main.temp)}°</span></p>
        </div>`
        })
    })