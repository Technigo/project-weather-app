const header = document.getElementById("header")
const main = document.getElementById("main")
const container = document.getElementById("container")

const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID="
const APP_KEY = "8be7a87323d320c7bae11d84fa0a7c61"
const URL = URL_BASE+APP_KEY

let city = ""
let weatherType = ""
let temperatureNow = ""

header.innerHTML = `
Hej
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

fetchData ()
