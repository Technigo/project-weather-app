const temperature = document.getElementById('temperature')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weeklyForecastContainer = document.getElementById('weekly-forecast-container')

const currentWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID='
// Forecast 
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='
const apiKey = '3addfde144e16d817dcc3a5e9a46ea59' 

// fetch API
fetch (currentWeatherApiUrl + apiKey) 
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
        temperature.innerHTML = Math.round(json.main.temp)
    })
    .catch ((err) => {
        console.log('caught error', err)
    })