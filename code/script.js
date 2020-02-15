const container = document.getElementById('todaysWeather')
const containerFiveDays = document.getElementById('fiveDaysWeather')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    const temp = json.main.temp
    const tempRounded = temp.toFixed(0.1)

    json.weather.forEach((today) => {
      container.innerHTML = `<p>${tempRounded} °C ${today.description}</p>`
    })
    container.innerHTML += `<h1>Todays weather in: ${json.name}</h1>`

    /**********SUNRISE & SUNSET**********/
    const theSunrise = json.sys.sunrise
    const theSunset = json.sys.sunset

    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(theSunrise * 1000)
    const sunset = new Date(theSunset * 1000)

    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

    container.innerHTML += `<p>Sunrise: ${sunriseTime}<p>`
    container.innerHTML += `<p>Sunset: ${sunsetTime}<p>`
  })

//Five days forecast

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Majorna,Sweden&units=metric&APPID=150f4ff6ea1bf24cf1f0e1bdecefa90f')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    //filtrerar ut dagarna kl
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))


    containerFiveDays.innerHTML = "";

    filteredForecast.forEach(day => {
      const date = new Date(day.dt * 1000)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = weekdays[date.getDay()];

      containerFiveDays.innerHTML += `<p>${dayOfWeek} ${day.weather[0].description} ${day.main.temp.toFixed(0)} °C </p>`
    })
  })