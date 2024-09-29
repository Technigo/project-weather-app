// c0a43477116d9adc8d5acc553c3b7227
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// URL = base url + word + api_key



// API
const API_KEY = "c0a43477116d9adc8d5acc553c3b7227"
const BASE_URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather"
const BASE_URL_FORCAST = "https://api.openweathermap.org/data/2.5/forecast"
const city = "Stockholm"
const URL_WEATHER = `${BASE_URL_CURRENT_WEATHER}?q=${city}&units=metric&appid=${API_KEY}`
const URL_FORCAST = `${BASE_URL_FORCAST}?q=${city}&units=metric&appid=${API_KEY}`

// &units=metric
console.log(URL_WEATHER)
console.log(URL_FORCAST)


// DOM selectors
const currentWeatherIcon = document.getElementById("weather-icon")
const currentTemperature = document.getElementById("currentTemperature")
const forThisCity = document.getElementById("thisCity")
const currentTime = document.getElementById("currentTime")
const currentWeatherText = document.getElementById("currentWeatherText")
const sunContainer = document.getElementById("sunContainer")
// const forecastContainer = document.getElementById("forcastContainer")

forThisCity.innerHTML = city

// const updateHTMLForcast = (data) => {}

const getForcast = () => {
    fetch(URL_FORCAST) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
            // updateHTMLfORCAST(data)
            
        })
}

// Update HTML for Current Weather(container)
const updateHTMLCurrent = (data) => {

    // Icon for current weather
    const viewCurrentWeatherIcon = data.weather[0].icon
    console.log(viewCurrentWeatherIcon)
    currentWeatherIcon.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${viewCurrentWeatherIcon}@2x.png" alt="current weather icon">
    `
    // Current temp in chosen city
    const viewCurrentTemperature = Math.round(data.main.temp)
    currentTemperature.innerText = viewCurrentTemperature
    
    // Current time in chosen city
    const viewCurrentTime = new Date()
    console.log("Now", viewCurrentTime)
    
    const currentTimeFormatted = viewCurrentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(currentTimeFormatted)
    currentTime.innerText = currentTimeFormatted
    
    // Current weather info
    const viewWeatherInfoText = data.weather[0].description
    currentWeatherText.innerText = viewWeatherInfoText
    console.log(viewWeatherInfoText)
    
    // sunContainer
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    console.log(sunriseTime)

    const sunsetTime = new Date (data.sys.sunset * 1000)
    console.log(sunriseTime)

    const timeNow = new Date()
    console.log(timeNow)
    
    const sunriseTimeFormatted = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(sunriseTimeFormatted)

    const sunsetTimeFormatted = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(sunsetTimeFormatted)

    sunContainer.innerHTML = `
    <h4>sunrise ${sunriseTimeFormatted}</h4>
    <h4>sunset ${sunsetTimeFormatted}</h4>
    `

    getForcast()


}

getCurrentWeather = () => {
    fetch(URL_WEATHER) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
            updateHTMLCurrent(data)
            // updateHTMLForcast(data)
        })
}

getCurrentWeather()
