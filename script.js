const cityName = document.getElementById("city-name")
const temperature = document.getElementById("temperature")
const weather = document.getElementById("weather")
const sunriseTime = document.getElementById("sunrise-time")
const sunsetTime = document.getElementById("sunset-time")
const forecast = document.getElementById("forecast")
const todaysWeather = document.getElementById("todays-weather")

fetch ("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})
.then((json) => {
    cityName.innerHTML=json.name
    todaysWeather.innerHTML=`${weather} | ${temperature}`
    temperature=Math.round(json.main.temp * 10) / 10
    weather=json.weather[0].description
    sunriseTime.innerHTML=json.sys.sunrise
    sunsetTime.innerHTML=json.sys.sunset
    console.log(json)
})

fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})

.then((json) => {
    for (let i = 0; i < 5; i++) {
        forecast.innerHTML+=`<p>${json.list[i].main.temp_max}</p>`
    console.log(json)}
})