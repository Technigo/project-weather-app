// API's
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'

// DOM
const containerToday = document.getElementById('container')
const containerForecast = document.getElementById('containerForecast')

// fetching API's
fetch(apiUrl)
    //process response  
    .then((response) => {
        return response.json()
    })
    //converts json data
    .then((json) => {
        // all variables to display weather data
        let city = json.name
        let temp = json.main.temp.toFixed(1)
        let weatherType = json.weather[0].description
        let sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
            timeStyle: 'short'
        })
        let sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
            timeStyle: 'short'
        })


        // HTML today's weather
        let weatherHTML = ''
        weatherHTML += `<section class="weather">`
        weatherHTML += `<h2>${temp}</h2>`
        weatherHTML += `<h1>${city}</h1>`
        weatherHTML += `<p>${weatherType}</p>`
        weatherHTML += `<p>Sunrise: ${sunrise}`
        weatherHTML += `<p>Sunset: ${sunset}`

        containerToday.innerHTML += weatherHTML
    })


fetch(forecastUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        filteredForecast.forEach(data => {
            let forecastMinTemp = data.main.temp_min.toFixed(1)
            let forecastMaxTemp = data.main.temp_max.toFixed(1)
            //let forecastWeatherType = data.main.weather.description
            console.log(forecastMinTemp, forecastMaxTemp /*, forecastWeatherType*/ )


            // HTML today's weather
            let forecastHTML = ''
            forecastHTML += `<section class="forecast">`
            forecastHTML += `<p>${forecastMinTemp}</p>`
            forecastHTML += `<p>${forecastMaxTemp}</p>`
            //forecastHTML += `<p>${weatherType}</p>`
            forecastHTML += `</section>`

            containerForecast.innerHTML += forecastHTML
        })
    })