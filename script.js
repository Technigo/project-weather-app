const header = document.getElementById("header")
const main = document.getElementById("main")
const container = document.getElementById("container")

const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="
const APP_KEY = "8be7a87323d320c7bae11d84fa0a7c61"
const URL = URL_BASE+APP_KEY



let city = ""
let weatherType = ""
let temperatureNow = ""
let sunriseData = ""
let sunsetData = ""
let weekday = ""
let dayForecast = ""
let timeForecast = ""
let temperatureForecast = ""

const fetchData = () => {
    fetch (URL)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            city = json.name
            weatherType = json.weather[0].main
            temperatureNow = json.main.temp.toFixed(1)
            printWeatherInfo (json)
            printSunInfo (json)
        })
        .catch((error) => {
            console.log (error)
        })
}

const printWeatherInfo = () => {
    main.innerHTML = `
    <h1>There is ${weatherType} and ${temperatureNow} degrees in ${city} today.</h1>
    `;
}

const printSunInfo = (json) => {
    sunriseData = json.sys.sunrise
    const sunriseHour = new Date(sunriseData*1000).getHours()
    const sunriseMinute = new Date(sunriseData*1000).getMinutes();
    const sunriseTime = `${sunriseHour}:${sunriseMinute}`
    sunsetData = json.sys.sunset
    const sunsetHour = new Date(sunsetData * 1000).getHours()
    const sunsetMinute = new Date(sunsetData * 1000).getMinutes();
    const sunsetTime = `${sunsetHour}:${sunsetMinute}`;
    header.innerHTML = `
    <p>${weatherType} | ${temperatureNow}°</p>
    <p>sunrise ${sunriseTime}</p>
    <p>sunset ${sunsetTime}</p>
    `;
}

const fetchForecast = () => {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${APP_KEY}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            json.list.forEach((update) => {
                printForecast (update)
            })
            console.log (json.list)
        })
}

const createDay = (day) => {    
    switch (day) {
        case 0:
            weekday = "sun"
            break
        case 1:
            weekday = "mon"
            break
        case 2:
            weekday = "tue"
            break
        case 3:
            weekday = "wed"
            break
        case 4:
            weekday = "thu"
            break
        case 5:
            weekday = "fri"
            break
        case 6:
            weekday = "sat"
            break
        default:
            weekday = "day"
    }    
}

const printForecast = (update) => {
    dayForecast = new Date(update.dt * 1000).getDay();
    createDay(dayForecast)
    const today = new Date().getDay()
    temperatureForecast = update.main.temp.toFixed(1)
    timeForecast = new Date(update.dt*1000).getHours()
    if (today !== dayForecast && timeForecast === 13 ){
        container.innerHTML += `
        <p>${weekday} ${temperatureForecast}°</p>
        `
    } else {
        console.log('test')
    }
}

fetchData ()
fetchForecast ()