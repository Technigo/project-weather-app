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
const forecastContainer = document.getElementById("forecastContainer")

forThisCity.innerHTML = city

const updateHTMLForcast = (data) => {

// Array to hold the daily forecasts
const dailyForecasts = [];
console.log(dailyForecasts)
    // Loop through the forecast list and extract data for every 24 hours, at 00:00
    for (let i = 0; i < data.list.length; i += 8) {  // 8 intervals per day (3-hour intervals). I'm using the 00:00 (first) weather data
        const forecast = data.list[i];

        const date = new Date(forecast.dt_txt)

        // Extract the day of the week (e.g., Monday, Tuesday, etc.)
        const dayOfWeek = date.toLocaleDateString('en', { weekday: 'short' })

        // const date = forecast.dt_txt.split(" ")[0]; // Extract date
        const temp = Math.round(forecast.main.temp); // Extract temperature
        const wind = forecast.wind.speed; // Extract weather description
        const icon = forecast.weather[0].icon // Extract weather icon

        dailyForecasts.push({ 
            dayOfWeek, 
            temp, 
            wind, 
            icon: `http://openweathermap.org/img/wn/${icon}@2x.png` 
        })
    }

    // Clear previous content in the container
    forecastContainer.innerHTML = ""

    // Loop through the daily forecasts and create HTML elements for each one
    dailyForecasts.forEach(forecast => {
        const forecastElement = document.createElement("div");  // Creates a new div element for each day's forecast
        forecastElement.innerHTML = `
            <div class="forecast-day">
                <h3>${forecast.dayOfWeek}</h3>   <!-- Display the day -->
                <img src="${forecast.icon}" alt="Weather icon">
                <p>${forecast.temp}°C</p> 
                <p>${forecast.wind}m/s</p>
            </div>
            `

        forecastContainer.appendChild(forecastElement)
    });
}

const getForcast = () => {
    fetch(URL_FORCAST) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

           updateHTMLForcast(data) 
        })
        .catch(error => {
            console.error("Error fetching forecast:", error)
            forecastContainer.innerHTML = "<p>Failed to load the weather data. Please try again later.</p>"
        })
}

// Update HTML for Current Weather(container)
const updateHTMLCurrent = (data) => {

    // Get and extract the icon for current weather
    const viewCurrentWeatherIcon = data.weather[0].icon

    
    // Current temp in given city
    const viewCurrentTemperature = Math.round(data.main.temp)
    currentTemperature.innerHTML = `
    <h1>${viewCurrentTemperature}</h1>
    <p>°C</p>
    `
    
    // Current time in chosen city
    const viewCurrentTime = new Date()
    
    const currentTimeFormatted = viewCurrentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    currentTime.innerHTML = `
    Time: ${currentTimeFormatted}
    `
    
    // Current weather info
    const viewWeatherInfoText = data.weather[0].description
    // currentWeatherText.innerText = viewWeatherInfoText
    currentWeatherText.innerHTML = `
    <h4>${viewWeatherInfoText}</h4>
    <img src="http://openweathermap.org/img/wn/${viewCurrentWeatherIcon}@2x.png" alt="current weather icon">
    `
    
    // sunContainer
    // Calculate the time to normal-person-readeable
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    const sunsetTime = new Date (data.sys.sunset * 1000)
    
    // const timeNow = new Date()

    // Format h and min time into a 2 digit nr = 00:00
    const sunriseTimeFormatted = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTimeFormatted = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    sunContainer.innerHTML = `
    <h4>Sunrise ${sunriseTimeFormatted}</h4>
    <h4>Sunset ${sunsetTimeFormatted}</h4>
    `

    getForcast()
}

getCurrentWeather = () => {
    fetch(URL_WEATHER) 
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
            updateHTMLCurrent(data)
        })
}

getCurrentWeather()
