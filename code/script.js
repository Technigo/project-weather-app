const container = document.getElementById('weatherAPI')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik,Iceland&units=metric&APPID=3ecdc5b9e327b76e7806233ffc0a935f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    
    container.innerHTML = `<p>${json.weather[0].description} | ${json.main.temp.toFixed(1)}°</p>`
    container.innerHTML += `<p>feels like: ${json.main.feels_like.toFixed(1)}°</p>`
    container.innerHTML += `<p>The temperature in ${json.name} is currently ${json.main.temp.toFixed(1)}°, feels like ${json.main.feels_like.toFixed(1)}°</p>`
  
    const timestampSunrise = json.sys.sunrise
    const timestampSunset = json.sys.sunset

    let sunrise = new Date (timestampSunrise * 1000)
    let sunset = new Date (timestampSunset * 1000)

    let sunriseTime = sunrise.toLocaleTimeString(undefined, { timeStyle: 'short'})
    let sunsetTime = sunset.toLocaleTimeString(undefined, {timeStyle: 'short'})

    container.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`
    container.innerHTML += `<p>Sunset: ${sunsetTime}</p>`
  })

    
    // container.innerHTML += `Sunrise: ${Date.prototype.getHours(json.sys.sunrise)}`
 