const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const mainElement = document.getElementById("main") // might use to decide image/background image
const descriptionElement = document.getElementById("description") // might not use
const iconElement = document.getElementById("icon") // is this an icon??? how to use?
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")

fetch(weatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((weather) => {
        generateHTML(weather) // use map to create new object, check Wed code session
    })
    .catch((error) => {
        console.log("Error", error)
    })

const generateHTML = weather => {
    handleTime(weather.sys.sunrise, weather.sys.sunset)
    const sunrise = time[0]
    const sunset = time[1]

    const icon = getIcon(weather.weather[0].icon)
    //console.log(weather.weather[0].icon)
    console.log(icon)

    cityElement.innerHTML = weather.name
    sunriseElement.innerHTML = `Sunrise: ${sunrise} ` // need to format
    sunsetElement.innerHTML = `Sunset: ${sunset} `
    tempElement.innerHTML = `${weather.main.temp.toFixed(1)}°` //should I round directly here insteaad?
    iconElement.innerHTML = `<img src='${icon}'>`
    descriptionElement.innerHTML = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)
    //mainElement.innerHTML = weather.weather[0].main
}

const handleTime = (sunrise, sunset) => {
    const sunriseDate = new Date(sunrise * 1000)
    const sunsetDate = new Date(sunset * 1000)
    const options = { hour: '2-digit', minute: '2-digit' }
    const sunriseTime = sunriseDate.toLocaleTimeString([], options)
    const sunsetTime = sunsetDate.toLocaleTimeString([], options)
    console.log(sunriseTime)
    console.log(sunsetTime)
    return time = [sunriseTime, sunsetTime]
}

const getIcon = icon => {
    const iconUrl1 = 'http://openweathermap.org/img/wn/'
    const iconUrl2 = '@2x.png'
    return icon = iconUrl1.concat(icon.concat(iconUrl2))
}