const header = document.getElementById("header")
const main = document.getElementById("main")
const container = document.getElementById("container")

const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="
const APP_KEY = "8be7a87323d320c7bae11d84fa0a7c61"
const URL = URL_BASE+APP_KEY

let city = ""
let weatherType = ""
let temperatureNow = ""
let weekday = ""
let dayForecast = ""
let timeForecast = ""
let temperatureForecast = ""

header.innerHTML = `
<h1>Hej</h1>
`
const fetchData = () => {
    fetch (URL)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log (json)
            printWeatherInfo (json)
        })
        .catch((error) => {
            console.log (error)
        })
}

const printWeatherInfo = (json) => {
    city = json.name;
    weatherType = json.weather[0].description;
    temperatureNow = Math.round(json.main.temp);
    main.innerHTML = `
    There is ${weatherType} and ${temperatureNow} degrees in ${city} today.
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