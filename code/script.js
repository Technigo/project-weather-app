const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const mainElement = document.getElementById("main") // might use to decide image/background image
const descriptionElement = document.getElementById("description") // might not use
//const iconElement = document.getElementById("icon") // is this an icon??? how to use?
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")

fetch(weatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((weather) => {
        cityElement.innerHTML = weather.name
        tempElement.innerHTML = `${Math.round(weather.main.temp)}°C`//round to one decimal, or 0
        //descriptionElement.innerHTML = weather.weather[0].description
        mainElement.innerHTML = weather.weather[0].main
        sunriseElement.innerHTML = `Sunrise: ${weather.sys.sunrise} ` // need to format
        //console.log(weather.sys.sunset) 
        sunsetElement.innerHTML = `Sunset: ${weather.sys.sunset} `
        //console.log(weather.sys.sunrise) 
    })
    .catch((error) => {
        console.log("Error", error)
    })