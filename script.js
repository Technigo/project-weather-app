
//"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=343b966846b558ccc45becaa3d348154"
//const URL = `${BASE_URL}${word}?key=${API_KEY}`
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154"
const API_KEY = "343b966846b558ccc45becaa3d348154"

const typeOfWeather = document.getElementById("typeOfWeather")
const cityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")


const getWeatherData = () => {
    fetch(`${BASE_URL}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    const sunriseData = data.sys.sunrise
    const sunriseHour = new Date(sunriseData*1000).getHours()
    const sunriseMinutes = new Date(sunriseData*1000).getMinutes()
    const sunriseTime = (`${sunriseHour}:${sunriseMinutes}`)

    const sunsetData = data.sys.sunset
    const sunsetHour = new Date(sunsetData*1000).getHours()
    const sunsetMinutes = new Date(sunsetData*1000).getMinutes()
    const sunsetTime = (`${sunsetHour}:${sunsetMinutes}`)

    typeOfWeather.innerHTML = `${data.weather[0].main}`
    cityName.innerHTML = `${data.name}`
    temperature.innerHTML = `${data.main.temp.toFixed(1)}`
    sunrise.innerHTML = `Sunrise at ${sunriseTime}`
    sunset.innerHTML = `Sunset at ${sunsetTime}`
    console.log(data)
    })  
    } 
getWeatherData()

