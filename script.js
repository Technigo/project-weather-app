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
        let city = json.name
        let temp = json.main.temp.toFixed(1)
        let weatherType = json.weather[0].description
        let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        
         
        
        // HTML today's weather
        let weatherHTML = ''
        weatherHTML += `<section class="weather">`
        weatherHTML += `<div class="temp_city_weather">`
        weatherHTML += `<div class="temp_city">`
        weatherHTML += `<h2>${temp}°C</h2>`
        weatherHTML += `<h1>${city}</h1>`
        weatherHTML += `</div>`
        weatherHTML += `<p>${weatherType}</p>`
        weatherHTML += `</div>`
        //weatherHTML +=  `<img src="${currentCondition}/>`
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
        console.log(forecastDate)

        let forecastTemp = data.main.temp.toFixed(1)
        let forecastWeatherType = data.weather[0].description
        
        // HTML forecast weather
        let forecastHTML = ''
        forecastHTML += `<section class="forecast">`
        forecastHTML += `<p>${forecastDate}</p>`
        forecastHTML += `<p>${forecastWeatherType}</p>`
        forecastHTML += `<p>${forecastTemp}°C</p>`
        forecastHTML += `</section>`

        containerForecast.innerHTML += forecastHTML
        })
    })

