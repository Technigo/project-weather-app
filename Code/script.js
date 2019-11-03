const theCity = document.getElementById("city")
const theTemperature = document.getElementById("temperature")
const thePic = document.getElementById("weatherPic")

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=0cd5fdd065f4fb92c2718ca6e5aa8e02`)

.then((response) => {
    return response.json();
})
.then((json) => {
    
   const theTodaysWeather = document.getElementById("todaysWeather")
   
   const unixTimeStampSunrise = json.sys.sunrise
   const unixTimeStampSunset = json.sys.sunset

   const sunrise = new Date(unixTimeStampSunrise * 1000)
   console.log()
   const sunset = new Date(unixTimeStampSunset * 1000)
   console.log()

   const sunriseHour = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
   console.log(sunriseHour)
   const sunsetHour = sunset.toLocaleTimeString([], { timeStyle: 'short'})
   console.log(sunsetHour)

   theCity.innerHTML = `<h2> ${json.name}<h2/>`
   theTemperature.innerHTML += `<h2>${Math.floor(json.main.temp)}°C</h2>`
   theTodaysWeather.innerHTML += `<h2>${json.weather[0].description}</h2>`
   theTodaysWeather.innerHTML += `<p>${sunriseHour}`
   theTodaysWeather.innerHTML += `<p>${sunsetHour}`

})

.catch((err) => {
    console.log('caught error', err)
})
