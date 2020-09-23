const apiKey = "c2889b12ee617ea787319a19a98a5906"
const currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
// const weatherForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
const city = document.getElementById('city')
const date = document.getElementById('date')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')

const tempFeelsLike = document.getElementById('feelsLike')
const sunrise = document.getElementById('sunriseTO')
const sunset = document.getElementById('sunsetTO')

//Fetch with JSON
fetch(currentWeatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        currentWeatherToday(json)
    })

const currentWeatherToday = (json) => {
    temperature.innerHTML = json.main.temp.toFixed(0.5)
    city.innerHTML = json.name
    date.innerHTML = new Date().toLocaleString('en-CA')
    description.innerHTML = json.weather[0].description
    tempFeelsLike.innerHTML = json.main.feels_like.toFixed(0.5)

    const sunriseToronto = new Date(json.sys.sunrise * 1000)
    const sunriseTorontoTime = sunriseToronto.toLocaleTimeString('en-CA', { timeStyle: 'short' })
    sunrise.innerHTML = sunriseTorontoTime

    const sunsetToronto = new Date(json.sys.sunset * 1000)
    const sunsetTorontoTime = sunsetToronto.toLocaleTimeString([], { timeStyle: 'short' })
    sunset.innerHTML = sunsetTorontoTime
}

