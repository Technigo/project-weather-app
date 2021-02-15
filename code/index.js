//DOM selectors
let cityName = document.getElementById('cityname')
let temperature = document.getElementById('temperature')
let typeOfWeather = document.getElementById('type-of-weather')
let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')
let forecast = document.getElementById('forecast')




// Global variable
let APIurl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'
let forecastAPIUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d9c815de89c599852c7f57690e69d99'

fetch(APIurl)
    .then((response) => {
        return response.json()
        console.log(response)
    })
    .then((weatherData) => {
        console.log(weatherData)
        let time = new Date(weatherData.sys.sunrise).getTime()
        console.log(time)
        cityName.innerHTML = `${weatherData.name}`

        temperature.innerHTML = `${(weatherData.main.temp).toFixed(1)}`
        typeOfWeather.innerHTML = `${weatherData.weather[0].description}`
        sunrise.innerHTML = `${(weatherData.sys.sunrise)}`
    })

fetch(forecastAPIUrl)
    .then((response) => {
        return response.json()
    })
    .then((forecastData) => {
        const filteredForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)
        console.log(forecastData.list[0].main.temp_min)
        forecastData.forEach(() => {
            forecast.innerHTML += `
            <p>Temp min: ${forecastData.list[0].main.temp_min} , Temp max: ${forecastData.list[0].main.temp_max}</p>
        `
        })
    })