const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const mainElement = document.getElementById("main") // might use to decide image/background image
const descriptionElement = document.getElementById("description") // might not use
//const iconElement = document.getElementById("icon") // is this an icon??? how to use?
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")

const dateElement = document.getElementById("date")

fetch(weatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((weather) => {
        const temp = weather.main.temp.toFixed(1)

        const sunriseDate = new Date(weather.sys.sunrise * 1000)
        const sunsetDate = new Date(weather.sys.sunset * 1000)
        const options = { hour: '2-digit', minute: '2-digit' }
        const sunriseTime = sunriseDate.toLocaleTimeString([], options)
        const sunsetTime = sunsetDate.toLocaleTimeString([], options)

        cityElement.innerHTML = weather.name
        tempElement.innerHTML = `${temp}°` //should I round directly here insteaad?
        //descriptionElement.innerHTML = weather.weather[0].description
        mainElement.innerHTML = weather.weather[0].main
        sunriseElement.innerHTML = `Sunrise: ${sunriseTime} ` // need to format
        sunsetElement.innerHTML = `Sunset: ${sunsetTime} `





    })
    .catch((error) => {
        console.log("Error", error)
    })