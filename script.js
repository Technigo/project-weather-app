const container = document.getElementById('weather')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b')
  .then((response) => {
    return response.json()
  })
  .then((weatherArray) => {
    console.log(weatherArray)
    //name of the city
    container.innerHTML = `<h1>${weatherArray.name}</h1>`
    //day
    const today = new Date(weatherArray.dt * 1000)
    const todayName = today.toLocaleDateString('en-SE', { weekday: 'long' })
    container.innerHTML += `<h2>${todayName}</h2>`
    //description of the weather
    weatherArray.weather.forEach((weatherInfo) => {
      container.innerHTML += `<p>${weatherInfo.description}</p>`
    })
    //temperature
    const temperature = Math.round(weatherArray.main.temp * 10) / 10
    container.innerHTML += `<h2>${temperature}°C</h2>`
    //sunrise and sunset
    const sunrise = new Date(weatherArray.sys.sunrise * 1000) // fetch the string of sunrise
    const sunriseTimeString = sunrise.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    const sunset = new Date(weatherArray.sys.sunset * 1000) // fetch the string of sunset
    const sunsetTimeString = sunset.toLocaleTimeString('en-SE', { timeStyle: 'short' }) // make the time readable
    container.innerHTML += `<p>Sunrise ${sunriseTimeString} Sunset ${sunsetTimeString}</p>`
  })

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=0d132ddb58c8876e79d1539a65dccf8b')
  .then((response) => {
    return response.json()
  })
  .then((forecastArray) => {
    const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    // make forEach function here
    filteredForecast.forEach((forecastArray) => {
      // define date here
      const forecastDay = new Date(forecastArray.dt_txt)
      const forcastDayString = forecastDay.toLocaleDateString('en-SE', { weekday: 'long' })
      // define the main temperature here
      const forecastTemp = Math.round(forecastArray.main.temp * 10) / 10
      // define the weather description here
      const forecastWeather = forecastArray.weather[0].description
      // print out date, weather description and the main temperature heref
      container.innerHTML += `<p>${forcastDayString} - ${forecastWeather} , ${forecastTemp}°C</p>`

    })





  })




