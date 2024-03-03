
//"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=343b966846b558ccc45becaa3d348154"
//const URL = `${BASE_URL}${word}?key=${API_KEY}`
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154"
const API_KEY = "343b966846b558ccc45becaa3d348154"
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154"

const typeOfWeather = document.getElementById("typeOfWeather")
const cityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const fiveDays = document.getElementById("fiveDays")


const getWeatherData = () => {
    fetch(`${BASE_URL}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    //variables for sunrise
    const sunriseData = data.sys.sunrise
    const sunriseHour = new Date(sunriseData*1000).getHours()
    const sunriseMinutes = new Date(sunriseData*1000).getMinutes()
    const sunriseTime = (`${sunriseHour}:${sunriseMinutes}`)

    //variables for sunset
    const sunsetData = data.sys.sunset
    const sunsetHour = new Date(sunsetData*1000).getHours()
    const sunsetMinutes = new Date(sunsetData*1000).getMinutes()
    const sunsetTime = (`${sunsetHour}:${sunsetMinutes}`)

    typeOfWeather.innerHTML = `${data.weather[0].main}`
    cityName.innerHTML = `${data.name}`
    temperature.innerHTML = `${data.main.temp.toFixed(1)}°`
    sunrise.innerHTML = `sunrise ${sunriseTime}`
    sunset.innerHTML = `sunset ${sunsetTime}`
    })  
    } 
getWeatherData()

//Five days weather forecast 
const getWeatherForecast = () => {
    fetch(`${FORECAST_URL}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    const weekday = [...data.list].filter((data) =>{
        return data.dt_txt.endsWith("12:00:00")
    })

weekday.forEach((data) => {
    const fromUnix = data.dt * 1000
    const currentDate = new Date(fromUnix)
    const fiveDaysList = currentDate.toLocaleDateString('en-US', {weekday: 'short'})
    const temperatureFiveDays = data.main.temp.toFixed(0)


        fiveDays.innerHTML += `
        <li>
        <span>
        ${fiveDaysList}
        ${temperatureFiveDays}°
        </span>
        </li>
        `
    })
})
}

getWeatherForecast()

    