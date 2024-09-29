// c0a43477116d9adc8d5acc553c3b7227
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// URL = base url + word + api_key



// API
const API_KEY = "c0a43477116d9adc8d5acc553c3b7227"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const city = "Stockholm"
const URL = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
// &units=metric
console.log(URL)


// DOM selectors
const currentWeatherIcon = document.getElementById("weather-icon")
const currentTemperature = document.getElementById("currentTemperature")
const thisCity = document.getElementById("thisCity")
const currentTime = document.getElementById("currentTime")
const currentWeatherText = document.getElementById("currentWeatherText")
const sunContainer = document.getElementById("sunContainer")
// const forecastContainer = document.getElementById("forcastContainer")

thisCity.innerHTML = city

// const updateHTML = (data) => {}

getCurrentWeather = () => {
    fetch(URL) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

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
            sunContainer.innerText = sunriseTimeFormatted

            const sunsetTimeFormatted = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log(sunsetTimeFormatted)
            sunContainer.innerText += sunsetTimeFormatted
            




        })
}

getCurrentWeather()
