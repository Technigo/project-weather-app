// this is the API variable for the main weather 
const API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f1099e35a6194bceb628758a90cd792b'
// this is the API variable for the 5 day forecast
const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=292db829ecfe6c13a596b799caf9289f'

// these 3 are the DOM selectors 
const actualWeather = document.getElementById('actualWeather')
const actualTemperature = document.getElementById('actualTemperature')
const todaysAdvice = document.getElementById('todaysAdvice')

// we fetch the main weather and with the help of json we display it
fetch(API_WEATHER)
    // we ask for the response from the API
    .then((response) => response.json())
    // we say what we want to be done with the response  
    .then((json) => {
        // console.log(json)
        // weather and temp are injected in HTML, we also rounded the value to show no decimal
        actualWeather.innerHTML = `${json.weather[0].description}`
        // with one decimal: actualTemperature.innerHTML = `${Math.round(json.main.temp * 10) / 10}`        
        actualTemperature.innerHTML = `${Math.round(json.main.temp)}°`
        // today's advice is injected in HTML
        todaysAdvice.innerHTML = `
            <img src="#" class="" id="weatherIcon"> 
            <h1 class="advice" id="advice">
                <span class="city" id="city">Its wet in ${json.name} bring an umbrella</span>
            </h1>
        `
    })

fetch(API_FORECAST)
    .then((response) => response.json())
    .then((json) => {
        // console.log(json)
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        // console.log(filteredForecast)

        filteredForecast.forEach((day) => {
            // console.log(day.main.temp)
            const options1 = { weekday: 'short' }
            // console.log(new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000))
            // forecast is injected in HTML, we also rounded the value to show no decimal
            // with one decimal: ${Math.round(day.main.temp * 10) / 10}
            // changed the h3 for p tag here as well so they are not bold
            forecast.innerHTML +=
                `<div class="day-container" id="firstDay">
            <p class="forecastDay"><span>${new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000).toLowerCase()}</span><span>${Math.round(day.main.temp)}°</span></p>
        </div>`
        })
    })