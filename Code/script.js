const theCity = document.getElementById("city")
const theTemperature = document.getElementById("temperature")
const theTodaysWeather = document.getElementById("todaysWeather")
const theWeeklyForecast = document.getElementById("weeklyForecast")

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0cd5fdd065f4fb92c2718ca6e5aa8e02`)

.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json)
   
   theCity.innerHTML = `<h2> ${json.name}<h2/>`
   theTemperature.innerHTML += `<h2>${Math.floor(json.main.temp)}°C</h2>`
   theTodaysWeather.innerHTML += `<h2>${json.weather[0].description}</h2>`

})

.catch((err) => {
    console.log('caught error', err)
})
