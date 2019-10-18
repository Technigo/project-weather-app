const container = document.getElementById('mainContainer')
const timeSunsetContainer = document.getElementById("sunsetContainer")
const timeSunriseContainer = document.getElementById("sunriseContainer")


fetch ("http://api.openweathermap.org/data/2.5/weather?q=Tromso,Norway&units=metric&APPID=1e0ba400cf88bae424b5895f500ae7c9")

    .then((response) => {
        return response.json()
    })

    .then((json) => {
        cityContainer.innerHTML = `<h1>${json.name}</h1>`
        leftContainer.innerHTML = `<h1>${json.main.temp}°C</h1>`
        rightContainer.innerHTML = `<h1>${json.weather[0].description}</h1>`
        
    let sunsetInMilliseconds = json.sys.sunset
    let sunsetTime = new Date(sunsetInMilliseconds).toLocaleTimeString()
        timeSunsetContainer.innerHTML = `<p>Sunset: ${sunsetTime}</p>`

    let sunriseInMilliseconds = json.sys.sunrise
    let sunriseTime = new Date(sunriseInMilliseconds).toLocaleTimeString()
        timeSunriseContainer.innerHTML = `<p>Sunrise: ${sunriseTime}</p>`

})
   
