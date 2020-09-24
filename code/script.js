const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4923c0389d55c333ad872dc8b7b3e880"

const cityElement = document.getElementById("city")
const tempElement = document.getElementById("temp")
const iconElement = document.getElementById("icon")
const descriptionElement = document.getElementById("description")
const sunriseElement = document.getElementById("sunrise")
const sunsetElement = document.getElementById("sunset")

const forecastTableElement = document.getElementById("forecastTable")
const forecastDayElement = document.getElementById("forecastDay")
const forecastIconElement = document.getElementById("forecastIcon")
const forecastTempElement = document.getElementById("forecastTemp")
const lastElement = document.getElementById("last")

fetch(weatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((weather) => {
        generateWeather(weather) // use map to create new object, check Wed code session
    })
    .catch((error) => {
        console.log("Fetch error", error)
    })

fetch(forecastUrl)
    .then((response) => {
        return response.json()
    })
    .then((forecast) => {
        generateForecast(forecast) // use map to create new object
    })
    .catch((error) => {
        console.log("Fetch error", error)
    })

const generateWeather = weather => {
    const icon = getIcon(weather.weather[0].icon)

    handleTime(weather.sys.sunrise, weather.sys.sunset)
    const sunrise = time[0]
    const sunset = time[1]

    cityElement.innerHTML = weather.name
    tempElement.innerHTML = `${Math.round(weather.main.temp)}°`
    iconElement.innerHTML = `<img src='${icon}'>`
    descriptionElement.innerHTML = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)
    sunriseElement.innerHTML = `Sunrise: ${sunrise} `
    sunsetElement.innerHTML = `Sunset: ${sunset} `
}

const generateForecast = forecast => {
    const noonForecast = forecast.list.filter(item => item.dt_txt.includes('12:00')) // filter already in fetch?

    noonForecast.forEach((forecast) => {
        forecastTableElement.innerHTML += generateHTML(forecast)
    })
}

const generateHTML = (forecast) => { // superproud if this! felt like a mountain but after support and help from classmates it was suddenly doable.
    handleDay(forecast.dt)
    const day = shortForecastDay

    const icon = getIcon(forecast.weather[0].icon)

    let forecastHTML = ''
    forecastHTML += `<li class="forecast-row">`
    forecastHTML += `<p>${day}</p> `
    forecastHTML += `<div><img src='${icon}'></div > `
    forecastHTML += `<p>${Math.round(forecast.main.temp)}°</p > `
    forecastHTML += `</li> `
    return (forecastHTML)
}

const handleTime = (sunrise, sunset) => {
    const sunriseDate = new Date(sunrise * 1000)
    const sunsetDate = new Date(sunset * 1000)
    const options = { hour: '2-digit', minute: '2-digit' }
    const sunriseTime = sunriseDate.toLocaleTimeString([], options)
    const sunsetTime = sunsetDate.toLocaleTimeString([], options)
    return time = [sunriseTime, sunsetTime] // did I just return TWO arguments from a function??
}

const handleDay = day => {
    const forecastDate = new Date(day * 1000)
    const forecastDay = forecastDate.toString()
    return shortForecastDay = forecastDay.substring(0, 3)
}

const getIcon = icon => { // YES!! I made the icon work! Without having to do endless conditionals based on weather/temperature..
    const iconUrl1 = 'http://openweathermap.org/img/wn/'
    const iconUrl2 = '@2x.png'
    return icon = iconUrl1.concat(icon.concat(iconUrl2))
}