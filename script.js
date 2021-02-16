// API's
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'

// DOM
const containerToday = document.getElementById('containerToday')
const containerForecast = document.getElementById('containerForecast')

// fetching API's
fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // variables for today's date
        let time = new Date()
        let date = time.toDateString()

        // all variables to display weather data
        let city = json.name
        let temp = json.main.temp.toFixed(1)
        let weatherType = json.weather[0].description
        let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {timeStyle: 'short'})
        
        // HTML today's weather
        let weatherHTML = ''
        weatherHTML += `<section class="weather">`
        weatherHTML += `<h2>${date}</h2>`
        weatherHTML += `<h2>${temp}</h2>`
        weatherHTML += `<h1>${city}</h1>`
        weatherHTML += `<p>${weatherType}</p>`
        weatherHTML += `<div class="sunrise_sunset">`
        weatherHTML += `<p>Sunrise: ${sunrise}`
        weatherHTML += `<p>Sunset: ${sunset}`
        weatherHTML += `</div>`
        
        containerToday.innerHTML += weatherHTML
    })

// fetch nästa API här
fetch(forecastUrl)
    .then((response) => {
            return response.json()
    })
    .then((data) => {
    
        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
        filteredForecast.forEach(data => {
        //let forecastDate = data.dt_txt
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
        forecastHTML += `<p>${forecastTemp}</p>`
        forecastHTML += `</section>`

        containerForecast.innerHTML += forecastHTML
        })
    })

