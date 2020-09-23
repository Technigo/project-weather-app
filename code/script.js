const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const iconElement = document.getElementById("icon")
const descriptionElement = document.getElementById("description")
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
        console.log("JSON not fetched", error)
    })

const generateHTML = weather => {
    handleTime(weather.sys.sunrise, weather.sys.sunset)
    const sunrise = time[0]
    const sunset = time[1]

    const icon = getIcon(weather.weather[0].icon)

    cityElement.innerHTML = weather.name
    tempElement.innerHTML = `${Math.round(weather.main.temp)}°`
    iconElement.innerHTML = `<img src='${icon}'>` // this can't be the way to do it
    descriptionElement.innerHTML = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)
    sunriseElement.innerHTML = `Sunrise: ${sunrise} `
    sunsetElement.innerHTML = `Sunset: ${sunset} `
}

const handleTime = (sunrise, sunset) => {
    const sunriseDate = new Date(sunrise * 1000)
    const sunsetDate = new Date(sunset * 1000)
    const options = { hour: '2-digit', minute: '2-digit' }
    const sunriseTime = sunriseDate.toLocaleTimeString([], options)
    const sunsetTime = sunsetDate.toLocaleTimeString([], options)
    return time = [sunriseTime, sunsetTime] // did I just return TWO arguments from a function??
}

const getIcon = icon => { // YES!! I made the icon work! Without having to do endless conditionals based on weather/temperature..
    const iconUrl1 = 'http://openweathermap.org/img/wn/'
    const iconUrl2 = '@2x.png'
    return icon = iconUrl1.concat(icon.concat(iconUrl2))
}