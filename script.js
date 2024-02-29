const body = document.getElementById("body")
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
    city = json.name
    weatherType = json.weather[0].main
    temperatureNow = Math.round(json.main.temp)
    switch (weatherType) {
        case "Clouds":
            body.setAttribute("class", "red-cloudy")
            main.innerHTML = `
            <img src="./design/design2/icons/noun_Cloud_1188486.svg" alt="Icon showing a cloud">
            <h1>Light a fire and get cosy. ${city} is looking grey today.</h1>
            `
            break
        case "Clear":
            body.setAttribute("class", "green-yellow-sunny")
            main.innerHTML = `
            <img src="./design/design2/icons/noun_Sunglasses_2055147.svg" alt="Icon showing a pair of sunglasses">
            <h1>Get your sunnies on. ${city} is looking rather great today.</h1>
            `
            break
        case "Rain":
            body.setAttribute("class", "blue-rainy");
            main.innerHTML = `
            <img src="./design/design2/icons/noun_Umbrella_2030530.svg" alt="Icon showing an umbrella">
            <h1>Don't forget your umbrella. It's wet in ${city} today.</h1>
            `
            break
        //Other weather types: Thunderstorm, Snow, Drizzle, Atmosphere
        default:
            main.innerHTML = `
            <h1>There is definately some kind of weather in ${city} today. Look out the window and you might find out what it is.</h1>
            `
    }
}


fetchData ()
