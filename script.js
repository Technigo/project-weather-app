
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=343b966846b558ccc45becaa3d348154"
const API_KEY = "343b966846b558ccc45becaa3d348154"
//"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=343b966846b558ccc45becaa3d348154"
const word = "weatherforecast"
//const URL = `${BASE_URL}${word}?key=${API_KEY}`

const typeOfWeather = document.getElementById("typeOfWeather")
const cityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")

//const fetchWeather = () => {
    fetch(`${BASE_URL}`)
    .then((response) => {
        return response.json()
    }) 
    .then((data) => {
    //console.log(data.results[0].name)
    console.log(data)
    })

getWeatherData = () => {
    fetch(`${BASE_URL}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
    typeOfWeather.innerHTML = `${data.weather[0].description}`
    cityName.innerHTML = `${data.name}`
    temperature.innerHTML = `${data.main.temp}`
    console.log(data)
}) 
}
getWeatherData()
//<h1>The weather is ${""} in ${"city"} today`