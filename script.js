// API's
const todaysUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Göteborg,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Göteborg,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'

// DOM
const body = document.body
const containerToday = document.getElementById('containerToday')
const containerForecast = document.getElementById('containerForecast')
const weatherText = document.getElementById('weatherText')

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
        let city = json.name.toUpperCase()
        let cityName = json.name
        let temp = json.main.temp.toFixed(1)
        let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        let sunset = new Date(json.sys.sunset * 1000).toLocaleString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        //([], {timeStyle: 'short'})
        let weatherType = json.weather[0].main
        let wIcon = json.weather[0].icon

        // HTML weather text for tablet and desktop
        const moodGenerator = () => {
            if (weatherType === "Clouds") {
                body.classList.add = 'cloudy'
                weatherText.innerHTML = `<p>Clouds are covering ${cityName}. Let's hope they'll be gone soon!</p>`
            } else if (weatherType === "Clear") {
                body.classList.add = 'clear'
                weatherText.innerHTML = `<p>It's sunny in ${cityName}. Put your sun glasses on and get outside!</p>`
            } else if (weatherType === "Snow") {
                body.classList.add = 'snowy'
                weatherText.innerHTML = `<p>It's snowy in ${cityName}. Gather your friends and go out and make some snow angels!</p>`
            } else if (weatherType === "Rain") {
                body.classList.add = 'rainy'
                weatherText.innerHTML = `<p>It's rainy in ${cityName}. Let's stay inside and binge watch Netflix!</p>`
            } else if (weatherType === "Drizzle") {
                body.classList.add = 'drizzly'
                weatherText.innerHTML = `<p>It drizzles in ${cityName}. Let's stay inside and binge watch Netflix!</p>`
            } else {
                body.classList.add = 'bad'
                weatherText.innerHTML = `<p>Bad weather in ${cityName}. Let's get cosy!</p>`
            }  
        } 
        moodGenerator()

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

    .catch(error => {
        containerToday.innerHTML = `<p>${error}</p>`
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
        
        let forecastTemp = data.main.temp.toFixed(1)
        let wIcon = data.weather[0].icon
        
        // Displays the forecast weekday
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
        let newDate = new Date(forecastDate.replace(' ', 'T'));

        // HTML forecast weather
        let forecastHTML = ''
        forecastHTML += `<section class="forecast">`
        forecastHTML += `<p>${newDate}</p>`
        forecastHTML += `<div class="forecast_weather_temp">`
        forecastHTML += `<img class="forecast_icon" src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />`
        forecastHTML += `<p class="forecast_temp">${forecastTemp}°C</p>`
        forecastHTML += `</div>`
        forecastHTML += `</section>`

        containerForecast.innerHTML += forecastHTML
        })
    })

    .catch(error => {
        containerForecast.innerHTML = `<p>${error}</p>`
    })

