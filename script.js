const cityName = document.getElementById("city-name")
const temperature = document.getElementById("temperature")
const weather = document.getElementById("weather")
const sunriseTime = document.getElementById("sunrise-time")
const sunsetTime = document.getElementById("sunset-time")
const forecast = document.getElementById("forecast-container")
const todaysWeather = document.getElementById("todays-weather")

fetch ("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})
.then((json) => {
    const temp = Math.round(json.main.temp * 10) / 10
    const typeOfWeather = json.weather[0].description
    const timeOfSunrise = new Date((json.sys.sunrise + json.timezone)*1000).toLocaleTimeString("sv-US",{hour:"2-digit",minute:"2-digit"})
    const timeOfSunset = new Date((json.sys.sunset + json.timezone)*1000).toLocaleTimeString("sv-US",{hour:"2-digit",minute:"2-digit"})
    cityName.innerHTML=json.name
    todaysWeather.innerHTML=`<p>${typeOfWeather} | ${temp}°C</p>
    <p>Sunrise: ${timeOfSunrise}</p> <p>Sunset: ${timeOfSunset}</p>`
    sunsetTime.innerHTML=json.sys.sunset
    console.log(json)
})

fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=cd2e520714b56e5fd7e92da11e1db7f3")
.then((response) => {
    return response.json()
})

.then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log('filter',filteredForecast)
    for (let i = 0; i < 5; i++) {
        const days = new Date((filteredForecast[i].dt_txt)).toLocaleDateString("en-US",{weekday:"short"})
        const forecastTemp = Math.round(filteredForecast[i].main.temp * 10) / 10
        const icon = filteredForecast[i].weather[0].icon
        forecast.innerHTML+=`<p>${days}<img src="http://openweathermap.org/img/wn/${icon}@2x.png">${forecastTemp}°C</p>`
    console.log(json)}
})

