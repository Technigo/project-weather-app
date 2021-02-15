const container = document.getElementById("container")
const cityName = document.getElementById("city-name")
const temperature = document.getElementById("temperature")
const weather = document.getElementById("weather")
const sunriseTime = document.getElementById("sunrise-time")
const sunsetTime = document.getElementById("sunset-time")
const forecast = document.getElementById("forecast")

fetch ("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})
.then((json) => {
    cityName.innerHTML=json.name
    temperature.innerHTML=Math.round(json.main.temp * 10) / 10
    weather.innerHTML=json.weather[0].description
    sunriseTime.innerHTML=json.sys.sunrise
    sunsetTime.innerHTML=json.sys.sunset
    console.log(json)
})

fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})
.then((json) => {
    forecast.innerHTML=json.list[0].main.temp_max
    console.log(json)
})