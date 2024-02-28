//https://api.openweathermap.org/data/2.5/weather?q=Zurich,Switzerland&units=metric&appid=b34ca1ebc43d2420cd2a70a7d29aa6c4

const BASE_URL ="https://api.openweathermap.org/data/2.5/"
const API_KEY ="b34ca1ebc43d2420cd2a70a7d29aa6c4"
const place ="Zurich,Switzerland"
const units ="units=metric"
const dataType ="weather"

const URL = `${BASE_URL}${dataType}?q=${place}&${units}&appid=${API_KEY}`

const mainWeather = document.getElementById("main-weather")
const title = document.getElementById("title")
const sun = document.getElementById("sun")


const changeContainer = (json) => {
    const sunriseEpoch = json.sys.sunrise
    const sunriseHuman = new Date(sunriseEpoch * 1000)
    const sunriseHours = sunriseHuman.getHours().toString().padStart(2, "0")
    const sunriseMinutes = sunriseHuman.getMinutes().toString().padStart(2, "0")
    console.log(sunriseHuman)

    const sunsetEpoch = json.sys.sunset
    const sunsetHuman = new Date(sunsetEpoch * 1000)
    const sunsetHours = sunsetHuman.getHours().toString().padStart(2, "0")
    const sunsetMinutes = sunsetHuman.getMinutes().toString().padStart(2, "0")
    console.log(sunsetHuman)

    mainWeather.innerHTML = `${json.weather[0].main} | ${Math.round(json.main.temp)}`
    title.innerText = json.name
    sun.innerHTML = `
    sunrise ${sunriseHours}.${sunriseMinutes} <br>
    sunset ${sunsetHours}.${sunsetMinutes}`
}

const fetchData = () => {
    fetch(URL)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            changeContainer(json)
        })
        .catch((error) => {
            console.log(error)
        })
}

fetchData()

