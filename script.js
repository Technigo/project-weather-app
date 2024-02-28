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

fetchData ()
