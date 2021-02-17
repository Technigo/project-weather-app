// API's
const todaysUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'

// DOM
const containerToday = document.getElementById('containerToday')
const containerForecast = document.getElementById('containerForecast')



// API today's weather
fetch(todaysUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // variables to display weather data
        let city = json.name.toUpperCase()
        let temp = json.main.temp.toFixed(1)
        let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        

        
        let wIcon = json.weather[0].icon
        
        // HTML today's weather
        let weatherHTML = ''
        weatherHTML += `<section class="weather">`
        weatherHTML += `<div class="temp_city_weather">`
        weatherHTML += `<div class="temp_city">`
        weatherHTML += `<h1>${temp}°C</h1>`
        weatherHTML += `<h2>${city}</h2>`
        weatherHTML += `</div>`
        weatherHTML += `<img src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />`
        weatherHTML += `</div>`
        weatherHTML += `<div class="sunrise_sunset">`
        weatherHTML += `<p>Sunrise: ${sunrise}`
        weatherHTML += `<p>Sunset: ${sunset}`
        weatherHTML += `</div>`
        weatherHTML += `</section>`
        
        containerToday.innerHTML += weatherHTML
    })

// API 5 day forecast
fetch(forecastUrl)
    .then((response) => {
            return response.json()
    })
    .then((data) => {
        
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
        filteredForecast.forEach(data => {
        let wIcon = data.weather[0].icon
        
        // displays the forecast weekday
        let theDate = new Date(data.dt_txt)
        let weekday = new Array(theDate)
        weekday[0] = 'Sunday'
        weekday[1] = 'Monday'
        weekday[2] = 'Tuesday'
        weekday[3] = 'Wednesday'
        weekday[4] = 'Thursday'
        weekday[5] = 'Friday'
        weekday[6] = 'Saturday'
        let forecastDate = weekday[theDate.getDay()]

        let forecastTemp = data.main.temp.toFixed(1)
        
        // HTML forecast weather
        let forecastHTML = ''
        forecastHTML += `<section class="forecast">`
        forecastHTML += `<p>${forecastDate}</p>`
        forecastHTML += `<div class="forecast_weather_temp">`
        forecastHTML += `<img class="forecast_icon" src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />`
        forecastHTML += `<p class="forecast_temp">${forecastTemp}°C</p>`
        forecastHTML += `</div>`
        forecastHTML += `</section>`

        containerForecast.innerHTML += forecastHTML
        })
    })

