const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b')
  .then((response) => {
    return response.json()
  })
  .then((weatherArray) => {
    console.log(weatherArray)
    //name of the city
    container.innerHTML = `<h1>${weatherArray.name}</h1>`
    //description of the weather
    weatherArray.weather.forEach((weatherInfo) => {
      container.innerHTML += `<p>${weatherInfo.description}</p>`
    })
    //temperature
    const temperature = Math.round(weatherArray.main.temp * 10) / 10
    container.innerHTML += `<h1>${temperature}</h1>`
    //sunrise and sunset
    const sunrise = new Date(weatherArray.sys.sunrise * 1000) // fetch the string of sunrise
    const sunriseTimeString = sunrise.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    const sunset = new Date(weatherArray.sys.sunset * 1000) // fetch the string of sunset
    const sunsetTimeString = sunset.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    container.innerHTML += `Sunrise ${sunriseTimeString} Sunset ${sunsetTimeString}`




  })




