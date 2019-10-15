const container = document.getElementById("cityName") // Name of the city
const cityWeather = document.getElementById("weather") // Weather
const timeForSunRise = document.getElementById("sunRise") // Time for sunrise
const timeForSunSet = document.getElementById("sunSet") // Time for sunset
fetch ("http://api.openweathermap.org/data/2.5/weather?q=Tromso,Norway&APPID=1e0ba400cf88bae424b5895f500ae7c9")
    .then((response) => {
        return response.json()
})
.then ((json) => {
    container.innerHTML =`<h2> ${json.name}</h2>`

})


fetch ("http://api.openweathermap.org/data/2.5/weather?q=Tromso,Norway&APPID=1e0ba400cf88bae424b5895f500ae7c9")
    .then((response) => {
        return response.json()
})
.then ((json) => {
    cityWeather.innerHTML =`<h1> ${json.main.temp} degrees and the skies are ${json.weather.description}</h1>`

})
fetch ("http://api.openweathermap.org/data/2.5/weather?q=Tromso,Norway&APPID=1e0ba400cf88bae424b5895f500ae7c9")
    .then((response) => {
        return response.json()
})
.then ((json) => {
    timeForSunRise.innerHTML =`<p> Sun rises: ${json.sys.sunrise}</p>`

})

fetch ("http://api.openweathermap.org/data/2.5/weather?q=Tromso,Norway&APPID=1e0ba400cf88bae424b5895f500ae7c9")
.then((response) => {
    return response.json()
})
.then ((json) => {
timeForSunSet.innerHTML =`<p> Sun sets:${json.sys.sunset}</p>`

})